#!/usr/bin/env python3
"""Apply native-reviewer GO fixes to PR #72 whitepaper translations. Literal, count-checked."""
import sys, pathlib

FIXES = [
    # --- tr ---
    ("docs/tr/blog/2026-02-whitepaper-released.md",
     "bileştirilebilir özyinelemenin", "birleştirilebilir özyinelemenin", 1),
    ("docs/tr/blog/2026-02-whitepaper-released.md",
     "inceltirdikten", "olgunlaştırdıktan", 1),
    # --- pt: formal register (você) ---
    ("docs/pt/blog/2026-02-whitepaper-released.md",
     "Se estás a construir sobre", "Se está a construir sobre", 1),
    ("docs/pt/blog/2026-02-whitepaper-released.md",
     "o whitepaper é a tua referência canónica", "o whitepaper é a sua referência canónica", 1),
    ("docs/pt/blog/2026-02-whitepaper-released.md",
     "Se és novo no protocolo", "Se é novo no protocolo", 1),
    ("docs/pt/blog/2026-02-whitepaper-released.md",
     "Junta-te à comunidade", "Junte-se à comunidade", 1),
    ("docs/pt/blog/2026-02-whitepaper-released.md",
     "e explora o ecossistema", "e explore o ecossistema", 1),
    # --- pt: number grouping (2,300 reads as 2.3 in pt-PT) ---
    ("docs/pt/blog/2026-02-whitepaper-released.md",
     "mais de 2,300 detentores", "mais de 2300 detentores", 1),
]

fail = False
for rel, old, new, minc in FIXES:
    p = pathlib.Path(rel)
    if not p.exists():
        print(f"MISSING FILE: {rel}"); fail = True; continue
    txt = p.read_text(encoding="utf-8")
    n = txt.count(old)
    if n < minc:
        print(f"NOT FOUND (need>={minc}, got {n}): {rel} :: {old!r}"); fail = True; continue
    p.write_text(txt.replace(old, new), encoding="utf-8")
    print(f"OK ({n}x): {rel.split('/')[1]} :: {old[:38]!r} -> {new[:38]!r}")

sys.exit(1 if fail else 0)
