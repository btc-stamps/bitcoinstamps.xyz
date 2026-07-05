#!/usr/bin/env python3
"""Apply native-reviewer GO fixes to PR #70 backfill translations. Literal replacements, count-checked."""
import sys, pathlib

# (relative_path, old, new, expected_min_count)
FIXES = [
    # --- fr ---
    ("docs/fr/blog/2023-05-kevin-first-src-20-token.md",
     "Stamp #18,516", "Stamp #18 516", 1),
    ("docs/fr/blog/2023-06-src-20-native-independence.md",
     "cette dépendance était un fil non attaché.",
     "cette dépendance était un point en suspens.", 1),
    ("docs/fr/blog/2024-03-olga-cheaper-larger-stamps.md",
     "Il réduit la taille des transactions d'environ moitié et les frais de 60 à 70 %.",
     "Elle réduit la taille des transactions d'environ moitié et les frais de 60 à 70 %.", 1),
    ("docs/fr/blog/2024-03-olga-cheaper-larger-stamps.md",
     "OLGA a été déployé en deux étapes",
     "OLGA a été déployée en deux étapes", 1),
    ("docs/fr/blog/2026-07-sip-registry-live.md",
     "C'est le foyer canonique et versionné de la façon dont le protocole",
     "C'est le lieu canonique et versionné qui décrit comment le protocole", 1),
    # --- pt ---
    ("docs/pt/blog/2026-07-sip-registry-live.md",
     "É o lar canónico e versionado de como o protocolo",
     "É o repositório canónico e versionado de como o protocolo", 1),
    ("docs/pt/blog/index.md",
     "os desenvolvedores do protocolo",
     "os programadores do protocolo", 1),
    # --- tr ---
    ("docs/tr/blog/2026-06-bitcoin-stamps-at-pepevault.md",
     "bir blokzincir üzerinde yaşayabileceğini",
     "bir blok zinciri üzerinde yaşayabileceğini", 1),
    # --- cs (new posts) ---
    ("docs/cs/blog/2024-03-olga-cheaper-larger-stamps.md",
     "classic stampy", "klasické stampy", 1),
    ("docs/cs/blog/2026-06-bitcoin-stamps-at-pepevault.md",
     "v Fuchs2", "ve Fuchs2", 1),
    # --- cs v1.9.1 glossary convergence (ruling A) ---
    ("docs/cs/blog/2026-07-indexer-v1.9.1.md",
     "prokletých známek (cursed stamps)",
     "prokletých stampů (cursed stamps)", 1),
    ("docs/cs/blog/2026-07-indexer-v1.9.1.md",
     "chybná klasifikace známky",
     "chybná klasifikace stampu", 1),
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
    print(f"OK ({n}x): {rel} :: {old[:40]!r} -> {new[:40]!r}")

sys.exit(1 if fail else 0)
