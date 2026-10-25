"""Colourise the grey manga panels locally on the GPU (Stable Diffusion 1.5 anime + ControlNet lineart_anime).

Only the *colour* of these images is used later: build_panels.py keeps the original line art & text and takes
chroma from here, so small drawing differences from the AI don't matter.
Usage (in an env with torch+diffusers):  python colorize_sd.py <models_dir> [panel numbers...] [--seeds 3]
Writes colour_src/cand/p<n>_s<seed>.png  (pick the best into colour_src/p<n>.png)
"""
import os, sys
import numpy as np
import torch
from PIL import Image, ImageFilter
from diffusers import StableDiffusionControlNetPipeline, ControlNetModel, AutoencoderKL, DPMSolverMultistepScheduler

HERE = os.path.dirname(os.path.abspath(__file__))
M = sys.argv[1]
args = [a for a in sys.argv[2:] if not a.startswith("--")]
SEEDS = int(sys.argv[sys.argv.index("--seeds") + 1]) if "--seeds" in sys.argv else 3
if "--seeds" in sys.argv:
    args = [a for a in args if a != str(SEEDS)]
PANELS = [int(a) for a in args] or list(range(1, 8))

# palette matches the pitch deck theme: torii red, sakura pink, gold, leaf green, sky blue on washi cream
STYLE = ("anime key visual, vivid saturated full-spectrum colors, crimson red accents, sakura pink, leaf green, sky blue, "
         "golden highlights, clean cel shading, bright, colorful, masterpiece, best quality, highly detailed")
PROMPTS = {
    1: "busy tokyo station concourse, young woman with chestnut brown hair, cream hoodie, black backpack, navy suitcase, "
       "green JR sign, warm yellow ceiling lights, commuters in navy blue and grey coats, teal and amber signboards",
    2: "close-up of a young woman with chestnut brown hair and pink hair clip, peach skin, brown eyes, cream hoodie, "
       "station signboard white with dark navy text, green emergency sign, soft blue daylight",
    3: "young woman with chestnut brown hair looking at a smartphone, train departures board dark navy with orange and white text, "
       "red Delayed label, busy station with warm lights and blue shadows",
    4: "hand holding a smartphone showing a travel app, mount fuji with snow, red torii gate, green pine trees, "
       "blue sky, pink sakura, glowing screen, light rays, pastel sky blue background",
    5: "happy young woman with chestnut brown hair, peach skin, pink blush, cream hoodie, holding smartphone with language menu, "
       "soft pink and sky blue background, sunlight",
    6: "young woman walking on a sunny train platform, chestnut brown hair, cream hoodie, black backpack, navy suitcase, "
       "silver commuter train with green stripe and bright headlights, blue sky, green signs, warm sunlight",
    7: "night festival street in tokyo, glowing red and orange paper lanterns, pink cherry blossoms, tokyo tower in red and white, "
       "red pagoda, happy young woman with chestnut brown hair in pink floral kimono, purple twilight sky, golden lights",
}
NEG = "monochrome, greyscale, grayscale, sepia, orange tint, yellow tint, warm color cast, single color, duotone, desaturated, muted colors, lowres, worst quality, low quality, jpeg artifacts, text, watermark"


def control_image(grey, size):
    """White line art on black, like the lineart_anime annotator produces."""
    g = grey.resize(size, Image.LANCZOS)
    a = np.asarray(g, np.float32)
    bg = np.asarray(g.filter(ImageFilter.MaxFilter(5)), np.float32)   # local paper level
    lines = np.clip((bg - a) * 2.2, 0, 255)                              # dark strokes relative to surroundings
    return Image.fromarray(lines.astype(np.uint8)).convert("RGB")


def fit(w, h, long=832):
    s = long / max(w, h)
    return int(w * s) // 8 * 8, int(h * s) // 8 * 8


def main():
    cn = ControlNetModel.from_pretrained(os.path.join(M, "cn"), torch_dtype=torch.float16, variant="fp16")
    vae = AutoencoderKL.from_pretrained(os.path.join(M, "vae"), torch_dtype=torch.float16)
    pipe = StableDiffusionControlNetPipeline.from_single_file(os.path.join(M, "anylora.safetensors"), controlnet=cn, vae=vae, config=os.path.join(M, "sd15cfg"),
                                                              torch_dtype=torch.float16, safety_checker=None)
    pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config, use_karras_sigmas=True)
    pipe.to("cuda")
    pipe.enable_attention_slicing()
    os.makedirs(os.path.join(HERE, "colour_src", "cand"), exist_ok=True)
    for n in PANELS:
        grey = Image.open(os.path.join(HERE, "panels", f"p{n}.jpg")).convert("L")
        size = fit(*grey.size, long=1024 if n == 7 else 832)
        ctrl = control_image(grey, size)
        ctrl.save(os.path.join(HERE, "colour_src", "cand", f"p{n}_control.png"))
        for seed in range(SEEDS):
            img = pipe(prompt=f"{STYLE}, {PROMPTS[n]}", negative_prompt=NEG, image=ctrl, width=size[0], height=size[1],
                       num_inference_steps=28, guidance_scale=7.5, controlnet_conditioning_scale=1.0,
                       clip_skip=2, generator=torch.Generator("cuda").manual_seed(1000 + seed)).images[0]
            img.save(os.path.join(HERE, "colour_src", "cand", f"p{n}_s{seed}.png"))
            print(f"p{n} seed {seed} done", flush=True)


main()
