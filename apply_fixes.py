#!/usr/bin/env python3
"""Apply native-reviewer GO fixes + cross-link localization to PR #73 (exchange + BitMart, 6 locales)."""
import re, sys, pathlib

EX = "2026-07-stamps-across-exchanges"
BM = "2025-12-kevin-stamp-bitmart-listing"
LOCALES = ["es", "fr", "zh", "tr", "pt", "cs"]

# --- literal reviewer fixes (file, old, new) ---
LITERAL = [
    (f"docs/es/blog/{BM}.md", "los venues nativos que leen", "los mercados nativos que leen"),
    (f"docs/pt/blog/{EX}.md", "tipo de média e asset ID", "tipo de media e asset ID"),
    (f"docs/pt/blog/{BM}.md", "nos venues nativos que leem", "nos mercados nativos que leem"),
    # zh optional polish (endorsed by native reviewer)
    (f"docs/zh/blog/{EX}.md", "遍布整个市场：", "遍及整个市场的各个层面："),
    (f"docs/zh/blog/{EX}.md", "一份向 Rare Pepe 文化致敬之作", "一件向 Rare Pepe 文化致敬之作"),
    (f"docs/zh/blog/{BM}.md", "一份向 Rare Pepe 文化致敬之作", "一件向 Rare Pepe 文化致敬之作"),
]

fail = False
for rel, old, new in LITERAL:
    p = pathlib.Path(rel)
    txt = p.read_text(encoding="utf-8")
    if txt.count(old) < 1:
        print(f"NOT FOUND: {rel} :: {old!r}"); fail = True; continue
    p.write_text(txt.replace(old, new), encoding="utf-8")
    print(f"OK literal: {rel.split('/')[1]}/{rel.split('/')[-1][:14]} :: {old[:26]!r}->{new[:26]!r}")

# --- zh date-spacing normalization (both zh files): close up digit/年月日 spacing ---
for rel in [f"docs/zh/blog/{EX}.md", f"docs/zh/blog/{BM}.md"]:
    p = pathlib.Path(rel)
    txt = p.read_text(encoding="utf-8")
    before = txt
    txt = re.sub(r"(\d)\s+([年月日])", r"\1\2", txt)
    txt = re.sub(r"([年月])\s+(\d)", r"\1\2", txt)
    if txt != before:
        p.write_text(txt, encoding="utf-8"); print(f"OK zh-dates: {rel.split('/')[-1]}")

# --- cross-link localization: /en/blog/<other> -> /<lang>/blog/<other> ---
for lang in LOCALES:
    for rel, other in [(f"docs/{lang}/blog/{EX}.md", BM), (f"docs/{lang}/blog/{BM}.md", EX)]:
        p = pathlib.Path(rel)
        if not p.exists():
            print(f"MISSING: {rel}"); fail = True; continue
        txt = p.read_text(encoding="utf-8")
        old = f"/en/blog/{other}"
        new = f"/{lang}/blog/{other}"
        if old in txt:
            p.write_text(txt.replace(old, new), encoding="utf-8")
            print(f"OK xlink: {rel} -> {new}")
        else:
            print(f"  (no /en xlink in {rel})")

sys.exit(1 if fail else 0)
