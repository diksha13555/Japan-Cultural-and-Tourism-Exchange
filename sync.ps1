# Refreshes this Git folder from the working project (D:\Japan_Hackathon_Final).
# Run it again after the film or the deck changes:  powershell -ExecutionPolicy Bypass -File .\sync.ps1
# It only copies files. It never touches the source folders, and never commits or pushes.

$ErrorActionPreference = 'Stop'
$src = 'D:\Japan_Hackathon_Final'           # the working project (source of every part)
$dst = $PSScriptRoot                         # this folder (D:\Japan_Hackathon_Git)

function Mirror($from, $to, [string[]]$xf = @(), [string[]]$xd = @()) {
  $args = @("$src\$from", "$dst\$to", '/MIR', '/NFL', '/NDL', '/NJH', '/NJS', '/NP', '/R:1', '/W:1')
  if ($xf.Count) { $args += '/XF'; $args += $xf }
  if ($xd.Count) { $args += '/XD'; $args += $xd }
  robocopy @args | Out-Null
  if ($LASTEXITCODE -ge 8) { throw "robocopy failed for $from (exit $LASTEXITCODE)" }
  Write-Host ("  {0,-34} -> {1}" -f $from, $to)
}
function CopyOne($from, $to) {
  New-Item -ItemType Directory -Force (Split-Path -Parent "$dst\$to") | Out-Null
  Copy-Item "$src\$from" "$dst\$to" -Force
  Write-Host ("  {0,-34} -> {1}" -f $from, $to)
}

Write-Host "Syncing from $src"
# Web parts (served by Vercel)
Mirror 'Final_Html'                'deck'      @('*.md', 'build.py') @('__pycache__')
Mirror 'Part1-Protoype_Itinerary'  'prototype' @('japan-tourism-prototype-prompt.md')
Mirror 'Part4-Arigato'             'finale'    @('prompt.md') @('__pycache__')
Mirror 'Part3-BMC\ws_3'            'business'  @('*.pyc') @('__pycache__')
CopyOne 'Part2-Video\TripDNA_Film.html' 'film\index.html'
# The MP4 (~80 MB) stays local as an offline backup: GitHub warns above 50 MB, and the HTML film above is the same film.

# Film pipeline: scripts and specs only. The large audio and images stay local.
Mirror 'Part2-Video\build' 'film\pipeline' @('*.wav', '*.mp3', '*.png', '*.jpg', '*.webp', '*.ttf', '*.pyc') @('voice', 'voice_samples', 'sfx', 'music', 'panels', 'panels_hd', 'panels_hd_orig', 'panels_orig', 'colour_src', 'assets', 'qa', 'fonts', '__pycache__')
CopyOne 'Part2-Video\SPEC.md'          'film\SPEC.md'
CopyOne 'Part2-Video\instructions.md'  'film\instructions.md'

# Docs (planning, context, checkpoint 1)
Mirror 'plan'               'docs\plan'
Mirror 'Interview_to_merge' 'docs\interviews'
CopyOne 'context.md'        'docs\context.md'
CopyOne 'Team_Details.txt'  'docs\Team_Details.txt'
CopyOne 'Final_Html\instructions.md' 'docs\deck_instructions.md'
CopyOne 'Japan-Cultural-and-Tourism-Exchange_git_NewContext\index_checkpoint1.html' 'docs\checkpoint1\index.html'
CopyOne 'OutofBounds_JapanHackPPT_old.pdf' 'docs\checkpoint1\OutofBounds_JapanHackPPT_old.pdf'

$mb = [math]::Round(((Get-ChildItem $dst -Recurse -File | Where-Object { $_.FullName -notmatch '\\\.git\\' } | Measure-Object Length -Sum).Sum / 1MB), 1)
Write-Host "Done. Folder size (without .git): $mb MB"
