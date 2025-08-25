-- Simple test schema
CREATE TABLE translation_memory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_text TEXT NOT NULL,
    target_text TEXT NOT NULL,
    cultural_significance TEXT DEFAULT 'medium' CHECK(cultural_significance IN ('high', 'medium', 'low'))
);