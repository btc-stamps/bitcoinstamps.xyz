-- Translation Management Infrastructure Database Schema
-- SQLite database for Bitcoin Stamps documentation translation memory
-- Optimized for cultural preservation and workflow automation

-- Core translation memory table
CREATE TABLE translation_memory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_text TEXT NOT NULL,
    source_language VARCHAR(5) NOT NULL DEFAULT 'en',
    target_text TEXT NOT NULL,
    target_language VARCHAR(5) NOT NULL,
    context_hash TEXT NOT NULL, -- SHA256 of surrounding context
    source_file_path TEXT NOT NULL,
    cultural_significance TEXT DEFAULT 'medium' CHECK(cultural_significance IN ('high', 'medium', 'low')),
    quality_score REAL DEFAULT 0.0, -- 0.0 to 1.0
    fuzzy_match_threshold REAL DEFAULT 0.85,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    validated_at DATETIME,
    validator_notes TEXT,
    
    -- Cultural preservation metadata
    entity_references TEXT, -- JSON array of referenced entities
    cultural_context TEXT, -- JSON object with cultural metadata
    trinity_validation BOOLEAN DEFAULT FALSE, -- Special validation for Trinity narratives
    kevin_significance TEXT DEFAULT 'none' CHECK(kevin_significance IN ('none', 'mention', 'central')),
    rare_pepe_connection BOOLEAN DEFAULT FALSE,
    
    UNIQUE(source_text, target_language, context_hash)
);

-- Change detection and tracking
CREATE TABLE content_changes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_path TEXT NOT NULL,
    change_type TEXT NOT NULL CHECK(change_type IN ('created', 'modified', 'deleted', 'moved')),
    git_commit_hash TEXT,
    git_branch TEXT DEFAULT 'main',
    change_summary TEXT, -- Brief description of what changed
    detected_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    processed_at DATETIME,
    processing_status TEXT DEFAULT 'pending' CHECK(processing_status IN ('pending', 'processing', 'completed', 'failed')),
    
    -- Content analysis
    content_before TEXT,
    content_after TEXT,
    diff_text TEXT, -- Git diff output
    
    -- Cultural impact assessment
    affects_kevin BOOLEAN DEFAULT FALSE,
    affects_trinity BOOLEAN DEFAULT FALSE, -- mikeinspace, Arwyn, Reinamora narratives
    affects_rare_pepe BOOLEAN DEFAULT FALSE,
    cultural_priority TEXT DEFAULT 'medium' CHECK(cultural_priority IN ('low', 'medium', 'high', 'critical')),
    
    -- Translation workflow
    requires_retranslation BOOLEAN DEFAULT TRUE,
    affected_languages TEXT, -- JSON array of languages needing updates
);

-- Translation workflow state management
CREATE TABLE translation_workflows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    change_id INTEGER NOT NULL,
    source_language VARCHAR(5) NOT NULL DEFAULT 'en',
    target_language VARCHAR(5) NOT NULL,
    workflow_status TEXT DEFAULT 'pending' CHECK(workflow_status IN ('pending', 'in_progress', 'review', 'approved', 'rejected')),
    priority TEXT DEFAULT 'medium' CHECK(priority IN ('low', 'medium', 'high', 'urgent')),
    
    -- Progress tracking
    total_segments INTEGER DEFAULT 0,
    translated_segments INTEGER DEFAULT 0,
    validated_segments INTEGER DEFAULT 0,
    progress_percentage REAL DEFAULT 0.0,
    
    -- Cultural validation
    cultural_review_required BOOLEAN DEFAULT FALSE,
    cultural_reviewer TEXT, -- Username or identifier
    cultural_review_status TEXT DEFAULT 'pending' CHECK(cultural_review_status IN ('pending', 'approved', 'needs_revision')),
    cultural_review_notes TEXT,
    
    -- Automation metadata
    auto_translation_used BOOLEAN DEFAULT FALSE,
    human_review_required BOOLEAN DEFAULT TRUE,
    estimated_completion DATETIME,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    
    UNIQUE(change_id, target_language)
);

-- Cultural entities tracking (Trinity, KEVIN, Rare Pepe references)
CREATE TABLE cultural_entities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_id TEXT NOT NULL, -- 'kevin', 'mikeinspace', 'arwyn', 'reinamora', etc.
    entity_name TEXT NOT NULL,
    entity_type TEXT NOT NULL CHECK(entity_type IN ('founder', 'mascot', 'protocol', 'cultural_icon', 'narrative')),
    cultural_significance TEXT DEFAULT 'high' CHECK(cultural_significance IN ('high', 'medium', 'low')),
    
    -- Translation requirements
    preserve_name BOOLEAN DEFAULT TRUE, -- Don't translate the name
    require_context BOOLEAN DEFAULT TRUE, -- Always provide cultural context
    translation_guidelines TEXT, -- Special instructions for translators
    
    -- References tracking
    mention_count INTEGER DEFAULT 0,
    last_mentioned DATETIME,
    
    -- Cultural metadata
    trinity_member BOOLEAN DEFAULT FALSE, -- mikeinspace, Arwyn, Reinamora
    rare_pepe_connected BOOLEAN DEFAULT FALSE,
    founding_story_element BOOLEAN DEFAULT FALSE,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(entity_id)
);

-- Translation validation rules and patterns
CREATE TABLE validation_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rule_name TEXT NOT NULL UNIQUE,
    rule_type TEXT NOT NULL CHECK(rule_type IN ('cultural_preservation', 'consistency', 'terminology', 'format')),
    source_pattern TEXT NOT NULL, -- Regex or exact text pattern
    target_pattern TEXT, -- Expected pattern in target language
    validation_function TEXT, -- JavaScript function name for custom validation
    
    -- Rule metadata
    applies_to_languages TEXT, -- JSON array of language codes
    severity TEXT DEFAULT 'warning' CHECK(severity IN ('error', 'warning', 'info')),
    error_message_template TEXT,
    
    -- Cultural context
    protects_entity TEXT, -- Entity ID this rule protects
    cultural_reason TEXT, -- Why this rule exists
    
    active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Translation segment cache for fuzzy matching
CREATE TABLE translation_segments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    segment_hash TEXT NOT NULL, -- Hash of normalized source text
    source_text TEXT NOT NULL,
    source_language VARCHAR(5) NOT NULL,
    target_text TEXT NOT NULL,
    target_language VARCHAR(5) NOT NULL,
    match_score REAL NOT NULL, -- Fuzzy match score (0.0 to 1.0)
    
    -- Context for better matching
    preceding_text TEXT, -- Text before this segment
    following_text TEXT, -- Text after this segment
    file_type TEXT, -- 'markdown', 'frontmatter', 'config', etc.
    content_type TEXT DEFAULT 'paragraph' CHECK(content_type IN ('title', 'heading', 'paragraph', 'list_item', 'code', 'metadata')),
    
    -- Usage statistics
    usage_count INTEGER DEFAULT 1,
    last_used DATETIME DEFAULT CURRENT_TIMESTAMP,
    confidence_score REAL DEFAULT 0.0,
    
    -- Cultural preservation
    contains_cultural_reference BOOLEAN DEFAULT FALSE,
    cultural_entities TEXT, -- JSON array of referenced entities
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(segment_hash, target_language)
);

-- Performance optimization indexes
CREATE INDEX idx_translation_memory_fuzzy ON translation_memory(source_language, target_language, cultural_significance);
CREATE INDEX idx_content_changes_cultural ON content_changes(cultural_priority, processing_status);
CREATE INDEX idx_workflows_active ON translation_workflows(workflow_status, priority, cultural_review_required);

-- Insert core cultural entities (Trinity + KEVIN + key entities)
INSERT INTO cultural_entities (entity_id, entity_name, entity_type, cultural_significance, preserve_name, trinity_member, rare_pepe_connected, founding_story_element, translation_guidelines) VALUES
('kevin', 'KEVIN', 'mascot', 'high', TRUE, FALSE, TRUE, TRUE, 'KEVIN must always be referenced in ALL CAPS. Preserve the connection to Rare Pepe culture and the first SRC-20 token story. Never translate the name KEVIN.'),
('mikeinspace', 'mikeinspace', 'founder', 'high', TRUE, TRUE, FALSE, TRUE, 'mikeinspace is the original dreamer and visionary founder. Preserve the lowercase formatting and connection to the first Bitcoin Stamp creation.'),
('arwyn', 'Arwyn', 'founder', 'high', TRUE, TRUE, TRUE, TRUE, 'Arwyn is the orchestrator and magician behind KEVIN. Preserve the connection to Rare Pepe culture and the Trinity formation story.'),
('reinamora', 'Reinamora', 'founder', 'high', TRUE, TRUE, FALSE, TRUE, 'Reinamora is the technical architect and protocol developer. Preserve the connection to all SRC protocol development.'),
('counterparty', 'Counterparty Protocol', 'protocol', 'high', FALSE, FALSE, TRUE, TRUE, 'Counterparty is the foundational protocol. Preserve the Flooneybin connection story where the Trinity first connected.'),
('flooneybin', 'Flooneybin', 'cultural_icon', 'high', TRUE, FALSE, TRUE, TRUE, 'Flooneybin is the meme project based on Joe Looney icon where Bitcoin Stamps founders first connected. Preserve this founding connection story.'),
('rare_pepe', 'Rare Pepe', 'cultural_icon', 'high', FALSE, FALSE, TRUE, TRUE, 'Rare Pepe culture is foundational to Bitcoin Stamps heritage. Preserve the cultural significance and connection to KEVIN''s origin.'),
('src-20', 'SRC-20', 'protocol', 'high', TRUE, FALSE, FALSE, TRUE, 'SRC-20 is the fungible token standard pioneered by KEVIN. Preserve the historical significance and KEVIN connection.'),
('bitcoin-stamps', 'Bitcoin Stamps', 'protocol', 'high', FALSE, FALSE, FALSE, TRUE, 'Bitcoin Stamps is the core metaprotocol ecosystem. Preserve the permanence and cultural narrative aspects.');

-- Insert core validation rules
INSERT INTO validation_rules (rule_name, rule_type, source_pattern, validation_function, applies_to_languages, severity, error_message_template, protects_entity, cultural_reason) VALUES
('kevin_capitalization', 'cultural_preservation', 'kevin', 'validateKevinCapitalization', '["fr","es","zh","tr"]', 'error', 'KEVIN must always be in ALL CAPS to preserve cultural significance', 'kevin', 'KEVIN is a proper noun representing the beloved community mascot'),
('trinity_preservation', 'cultural_preservation', '(mikeinspace|Arwyn|Reinamora)', 'validateTrinityNames', '["fr","es","zh","tr"]', 'error', 'Trinity founder names must be preserved exactly as written', 'trinity', 'The Trinity formation story is foundational to Bitcoin Stamps culture'),
('rare_pepe_context', 'cultural_preservation', 'Rare Pepe', 'validateRarePepeContext', '["fr","es","zh","tr"]', 'warning', 'Rare Pepe references should include cultural context explanation', 'rare_pepe', 'Rare Pepe culture is essential heritage that needs context for international audiences'),
('flooneybin_story', 'cultural_preservation', 'Flooneybin', 'validateFlooneybinContext', '["fr","es","zh","tr"]', 'warning', 'Flooneybin references should explain the founding connection story', 'flooneybin', 'Flooneybin is where the Trinity first connected - crucial founding narrative'),
('protocol_consistency', 'consistency', '(SRC-20|SRC-101|SRC-721|OLGA)', 'validateProtocolConsistency', '["fr","es","zh","tr"]', 'warning', 'Protocol names should be consistently formatted across translations', 'protocols', 'Maintain technical accuracy and consistency');

-- Create views for common queries
CREATE VIEW active_workflows AS
SELECT 
    tw.id,
    tw.target_language,
    tw.workflow_status,
    tw.priority,
    tw.progress_percentage,
    cc.file_path,
    cc.cultural_priority,
    cc.affects_kevin,
    cc.affects_trinity,
    tw.cultural_review_required
FROM translation_workflows tw
JOIN content_changes cc ON tw.change_id = cc.id
WHERE tw.workflow_status IN ('pending', 'in_progress', 'review');

CREATE VIEW cultural_validation_queue AS
SELECT 
    tw.id as workflow_id,
    tw.target_language,
    cc.file_path,
    cc.cultural_priority,
    ce.entity_name,
    ce.translation_guidelines
FROM translation_workflows tw
JOIN content_changes cc ON tw.change_id = cc.id
JOIN cultural_entities ce ON (
    (cc.affects_kevin AND ce.entity_id = 'kevin') OR
    (cc.affects_trinity AND ce.trinity_member = TRUE) OR
    (cc.affects_rare_pepe AND ce.rare_pepe_connected = TRUE)
)
WHERE tw.cultural_review_required = TRUE
AND tw.cultural_review_status = 'pending';

CREATE VIEW translation_stats AS
SELECT 
    target_language,
    COUNT(*) as total_translations,
    COUNT(CASE WHEN quality_score >= 0.9 THEN 1 END) as high_quality,
    COUNT(CASE WHEN cultural_significance = 'high' THEN 1 END) as cultural_significant,
    AVG(quality_score) as avg_quality,
    MAX(updated_at) as last_update
FROM translation_memory
GROUP BY target_language;