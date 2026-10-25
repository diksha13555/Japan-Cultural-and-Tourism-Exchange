"""Writes arigato.inline.html: index.html with assets/ inlined as data URIs (one offline file to merge)."""
import base64
from pathlib import Path
H = Path(__file__).parent
s = (H / "index.html").read_text(encoding="utf-8")
for name, mime in [("her-before.jpg", "image/jpeg"), ("her-after.jpg", "image/jpeg"), ("qr.svg", "image/svg+xml")]:
    s = s.replace(f'src="assets/{name}"', f'src="data:{mime};base64,{base64.b64encode((H / "assets" / name).read_bytes()).decode()}"')
assert "assets/" not in s
(H / "arigato.inline.html").write_text(s, encoding="utf-8")
print("ok", len(s) // 1024, "KB")
