"""Ensure the blog's Daml excerpts are the code exercised by the companion tests."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent
article = (root.parents[1] / "content/blog/lehman-on-canton.md").read_text()
source = (root / "daml/Lehman.daml").read_text()
blocks = re.findall(r"```daml\n(.*?)\n```", article, re.DOTALL)
if len(blocks) != 3:
    raise SystemExit(f"Expected 3 Daml excerpts, found {len(blocks)}")
for index, block in enumerate(blocks, 1):
    if block.strip() not in source:
        raise SystemExit(f"Article Daml excerpt {index} differs from tested source")
print("All 3 article Daml excerpts match the tested source.")
