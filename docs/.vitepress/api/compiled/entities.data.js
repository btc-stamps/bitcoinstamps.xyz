import { readFile, readdir } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// Get current directory for relative imports
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const docsDir = join(__dirname, '../../');
/**
 * Safe JSON parsing utilities with comprehensive error handling
 */
/**
 * Safely parse a JSON string with detailed error reporting
 */
function safeParseJSON(jsonString, fallback) {
    try {
        const parsed = JSON.parse(jsonString);
        return { data: parsed, success: true };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error';
        return {
            data: fallback,
            success: false,
            error: errorMessage
        };
    }
}
/**
 * Parse Vue.js-style array attributes with single quotes
 * Converts ['item1', 'item2'] to valid JSON
 * Handles nested quotes correctly
 */
function parseVueArrayAttribute(attributeValue) {
    if (!attributeValue) {
        return { data: [], success: true };
    }
    try {
        // Handle Vue-style arrays with single quotes
        let cleanValue = attributeValue.trim();
        // Remove outer quotes if present (attribute wrapping)
        if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
            (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
            cleanValue = cleanValue.slice(1, -1);
        }
        // Smart quote replacement: only replace quotes that delimit array items
        // Pattern: finds single quotes that are array element delimiters, not content quotes
        const jsonString = cleanValue.replace(/(\[|\,\s*)'([^']*)'(\s*\,|\s*\])/g, '$1"$2"$3');
        const result = safeParseJSON(jsonString, []);
        // If still failing, try a more aggressive approach
        if (!result.success) {
            // Split by array pattern and manually construct
            const arrayMatch = cleanValue.match(/^\[(.*)\]$/);
            if (arrayMatch) {
                const content = arrayMatch[1];
                // Split by comma but respect quotes
                const items = [];
                let current = '';
                let inQuotes = false;
                let quoteChar = '';
                for (let i = 0; i < content.length; i++) {
                    const char = content[i];
                    if ((char === '"' || char === "'") && !inQuotes) {
                        inQuotes = true;
                        quoteChar = char;
                    }
                    else if (char === quoteChar && inQuotes) {
                        inQuotes = false;
                        quoteChar = '';
                    }
                    else if (char === ',' && !inQuotes) {
                        if (current.trim()) {
                            // Remove surrounding quotes and add to array
                            const trimmed = current.trim();
                            const item = trimmed.startsWith("'") && trimmed.endsWith("'")
                                ? trimmed.slice(1, -1)
                                : trimmed.startsWith('"') && trimmed.endsWith('"')
                                    ? trimmed.slice(1, -1)
                                    : trimmed;
                            items.push(item);
                        }
                        current = '';
                        continue;
                    }
                    if (char !== quoteChar || inQuotes) {
                        current += char;
                    }
                }
                // Add last item
                if (current.trim()) {
                    const trimmed = current.trim();
                    const item = trimmed.startsWith("'") && trimmed.endsWith("'")
                        ? trimmed.slice(1, -1)
                        : trimmed.startsWith('"') && trimmed.endsWith('"')
                            ? trimmed.slice(1, -1)
                            : trimmed;
                    items.push(item);
                }
                return { data: items, success: true };
            }
        }
        return result;
    }
    catch (error) {
        return {
            data: [],
            success: false,
            error: `Failed to parse array attribute: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}
/**
 * Parse Vue.js-style object attributes with single quotes
 * Handles complex nested objects and arrays correctly
 */
function parseVueObjectAttribute(attributeValue, fallback) {
    if (!attributeValue) {
        return { data: fallback, success: true };
    }
    try {
        // Handle Vue-style objects with single quotes  
        let cleanValue = attributeValue.trim();
        // Remove outer quotes if present (attribute wrapping)
        if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
            (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
            cleanValue = cleanValue.slice(1, -1);
        }
        // Smart quote replacement for JavaScript object literals to JSON
        // This handles unquoted keys and single-quoted values
        let jsonString = cleanValue;
        // First, convert JavaScript object literal keys to quoted JSON keys
        // Match unquoted keys like "id:" and convert to "id":  
        jsonString = jsonString.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');
        // Then convert single quotes to double quotes for values
        // But be careful not to mess up already-quoted keys
        let quotedResult = '';
        let inQuotes = false;
        let quoteChar = '';
        for (let i = 0; i < jsonString.length; i++) {
            const char = jsonString[i];
            if (char === "'" && !inQuotes) {
                // Start of single-quoted string - convert to double quote
                quotedResult += '"';
                inQuotes = true;
                quoteChar = "'";
            }
            else if (char === "'" && inQuotes && quoteChar === "'") {
                // End of single-quoted string - convert to double quote
                quotedResult += '"';
                inQuotes = false;
                quoteChar = '';
            }
            else if (char === '"' && !inQuotes) {
                // Already double quote - keep as is
                quotedResult += char;
                inQuotes = true;
                quoteChar = '"';
            }
            else if (char === '"' && inQuotes && quoteChar === '"') {
                // End of double quoted string
                quotedResult += char;
                inQuotes = false;
                quoteChar = '';
            }
            else {
                // Regular character or character inside quotes
                quotedResult += char;
            }
        }
        jsonString = quotedResult;
        const result = safeParseJSON(jsonString, fallback);
        // If parsing still fails, try to extract as array manually
        if (!result.success && Array.isArray(fallback)) {
            try {
                // Handle array of objects like [{ id: 'x', name: 'y' }, ...]
                const arrayMatch = cleanValue.match(/^\[(.*)\]$/s);
                if (arrayMatch) {
                    const content = arrayMatch[1].trim();
                    const objects = [];
                    // Simple object splitting by },
                    const objectStrings = content.split(/},\s*{/);
                    for (let i = 0; i < objectStrings.length; i++) {
                        let objStr = objectStrings[i].trim();
                        // Add back braces if needed
                        if (i === 0 && !objStr.startsWith('{'))
                            objStr = '{' + objStr;
                        if (i === objectStrings.length - 1 && !objStr.endsWith('}'))
                            objStr = objStr + '}';
                        if (i > 0 && i < objectStrings.length - 1)
                            objStr = '{' + objStr + '}';
                        // Parse individual object with improved quote handling
                        const cleanObj = objStr.replace(/'([^']+)':/g, '"$1":').replace(/:\s*'([^']*)'/g, ':"$1"');
                        try {
                            const parsed = JSON.parse(cleanObj);
                            objects.push(parsed);
                        }
                        catch (e) {
                            console.warn(`Failed to parse object: ${objStr}`, e);
                        }
                    }
                    return { data: objects, success: true };
                }
            }
            catch (arrayError) {
                // Continue to error handling below
            }
        }
        return result;
    }
    catch (error) {
        return {
            data: fallback,
            success: false,
            error: `Failed to parse object attribute: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
    }
}
/**
 * Validate cultural significance value with type guard
 */
function isValidCulturalSignificance(value) {
    return ['low', 'medium', 'high'].includes(value);
}
/**
 * Type guard for entity relationship type
 * Normalizes space-separated to dash-separated format
 */
function isValidRelationshipType(value) {
    const validTypes = [
        'extends', 'optimizes', 'complements', 'requires', 'pioneered-by',
        'inspired-by', 'created-by', 'benefits', 'exemplified-by', 'strengthened-by',
        'originated-from', 'mascot-of', 'includes', 'implements', 'supports', 'identifies'
    ];
    // Normalize spaces to dashes for comparison
    const normalizedValue = value.replace(/\s+/g, '-').toLowerCase();
    return validTypes.includes(normalizedValue);
}
/**
 * Normalize relationship type from space-separated to dash-separated
 */
function normalizeRelationshipType(value) {
    const normalized = value.replace(/\s+/g, '-').toLowerCase();
    const validTypes = [
        'extends', 'optimizes', 'complements', 'requires', 'pioneered-by',
        'inspired-by', 'created-by', 'benefits', 'exemplified-by', 'strengthened-by',
        'originated-from', 'mascot-of', 'includes', 'implements', 'supports', 'identifies'
    ];
    return validTypes.includes(normalized) ? normalized : value;
}
/**
 * Extract ProtocolCard props from markdown files
 */
async function extractProtocolCards() {
    const protocols = [];
    const extractionErrors = [];
    // Find markdown files that might contain ProtocolCard components
    const markdownFiles = await findMarkdownFiles(docsDir);
    for (const file of markdownFiles) {
        try {
            const content = await readFile(file, 'utf-8');
            const protocolMatches = content.matchAll(/<ProtocolCard[^>]*>/gs);
            for (const match of protocolMatches) {
                const result = parseProtocolCard(match[0]);
                if (result.success && result.data) {
                    protocols.push(result.data);
                }
                else {
                    // Log parsing errors but don't throw - continue processing
                    const errorContext = `File: ${file}, Source: ${match[0].substring(0, 100)}...`;
                    extractionErrors.push(`${errorContext} - Errors: ${result.errors.join(', ')}`);
                    // For debugging: log the first few errors
                    if (extractionErrors.length <= 3) {
                        console.warn(`ProtocolCard parsing issues in ${file}:`, result.errors);
                    }
                }
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            extractionErrors.push(`Error reading file ${file}: ${errorMessage}`);
            console.warn(`Error reading file ${file}:`, error);
        }
    }
    // Log summary of extraction results
    if (extractionErrors.length > 0) {
        console.warn(`⚠️  ${extractionErrors.length} ProtocolCard parsing issues found. Check component syntax.`);
    }
    console.log(`✅ Successfully extracted ${protocols.length} protocol entities from ${markdownFiles.length} markdown files`);
    return protocols;
}
/**
 * Extract StructuredData entities for concepts
 */
async function extractStructuredDataEntities() {
    const concepts = [];
    // Add hardcoded KEVIN entity with rich metadata
    const kevin = {
        id: 'kevin',
        name: 'KEVIN',
        type: 'cultural-icon',
        description: 'The beloved mascot of Bitcoin Stamps, originating from the first SRC-20 token and evolving into a cultural symbol of community values',
        culturalSignificance: 'high',
        stampNumber: 6878,
        creator: 'Reinamora',
        creationDate: '2023-04-05',
        relationships: [
            { id: 'src-20', type: 'originated-from' },
            { id: 'bitcoin-stamps', type: 'mascot-of' }
        ],
        url: '/narratives/kevin-origin',
        culturalMetadata: {
            impact: 'Transformed from experimental art to beloved community mascot',
            significance: 'Symbol of authentic community building and artistic vision on Bitcoin',
            communitySize: 2300
        }
    };
    concepts.push(kevin);
    // Add Bitcoin Stamps ecosystem entity
    const bitcoinStamps = {
        id: 'bitcoin-stamps',
        name: {
            en: 'Bitcoin Stamps',
            fr: 'Bitcoin Stamps',
            es: 'Bitcoin Stamps',
            zh: 'Bitcoin Stamps'
        },
        type: 'protocol-ecosystem',
        description: {
            en: 'Immutable digital assets stored directly on the Bitcoin blockchain using various standards and protocols',
            fr: 'Actifs numériques immuables stockés directement sur la blockchain Bitcoin en utilisant diverses normes et protocoles',
            es: 'Activos digitales inmutables almacenados directamente en la blockchain de Bitcoin utilizando varios estándares y protocolos',
            zh: '使用各种标准和协议直接存储在比特币区块链上的不可变数字资产'
        },
        culturalSignificance: 'high',
        features: {
            en: ['Permanent storage', 'Bitcoin UTXO', 'Decentralized', 'Counterparty integration'],
            fr: ['Stockage permanent', 'UTXO Bitcoin', 'Décentralisé', 'Intégration Counterparty'],
            es: ['Almacenamiento permanente', 'UTXO Bitcoin', 'Descentralizado', 'Integración Counterparty'],
            zh: ['永久存储', 'Bitcoin UTXO', '去中心化', 'Counterparty 集成']
        },
        relationships: [
            { id: 'src-20', type: 'includes' },
            { id: 'src-101', type: 'includes' },
            { id: 'src-721', type: 'includes' },
            { id: 'olga', type: 'includes' },
            { id: 'kevin', type: 'mascot-of' }
        ],
        url: '/',
        culturalMetadata: {
            impact: {
                en: 'Revolutionary approach to permanent digital art on Bitcoin',
                fr: 'Approche révolutionnaire de l\'art numérique permanent sur Bitcoin',
                es: 'Enfoque revolucionario del arte digital permanente en Bitcoin',
                zh: '比特币上永久数字艺术的革命性方法'
            },
            significance: {
                en: 'Established new paradigm for blockchain-based digital assets with true permanence',
                fr: 'Établi un nouveau paradigme pour les actifs numériques basés sur blockchain avec une véritable permanence',
                es: 'Estableció un nuevo paradigma para los activos digitales basados en blockchain con verdadera permanencia',
                zh: '为基于区块链的数字资产建立了真正永久性的新范式'
            },
            communitySize: 50000
        }
    };
    concepts.push(bitcoinStamps);
    return concepts;
}
/**
 * Extract tool entities (like @btc-stamps/tx-builder)
 */
async function extractToolEntities() {
    const tools = [];
    // Add tx-builder SDK
    const txBuilder = {
        id: 'tx-builder',
        name: '@btc-stamps/tx-builder',
        type: 'sdk',
        description: 'TypeScript SDK for building Bitcoin Stamps transactions with support for all protocols',
        culturalSignificance: 'medium',
        features: ['Multi-protocol support', 'TypeScript definitions', 'OLGA optimization', 'Production-ready'],
        relationships: [
            { id: 'src-20', type: 'implements' },
            { id: 'src-721', type: 'implements' },
            { id: 'olga', type: 'supports' }
        ],
        url: '/developers/sdk',
        version: '1.0.0',
        languages: ['TypeScript', 'JavaScript'],
        installation: {
            npm: '@btc-stamps/tx-builder',
            github: 'https://github.com/btc-stamps/tx-builder',
            documentation: '/developers/sdk'
        }
    };
    tools.push(txBuilder);
    return tools;
}
/**
 * Parse ProtocolCard component props from markup with enhanced type safety
 */
function parseProtocolCard(markup) {
    const errors = [];
    try {
        // Extract protocol attribute (required)
        const protocolMatch = markup.match(/protocol="([^"]+)"/);
        if (!protocolMatch) {
            return {
                data: null,
                errors: ['Protocol attribute is required'],
                source: markup,
                success: false
            };
        }
        const protocol = protocolMatch[1];
        // Extract description (required)
        const descriptionMatch = markup.match(/description="([^"]+)"/);
        const description = descriptionMatch ? descriptionMatch[1] : '';
        if (!description) {
            errors.push('Description is missing or empty');
        }
        // Extract features array with safe parsing
        const featuresMatch = markup.match(/:features="(\[.*?\])"/s);
        let features = [];
        if (featuresMatch) {
            const featuresResult = parseVueArrayAttribute(featuresMatch[1]);
            if (featuresResult.success && featuresResult.data) {
                features = featuresResult.data;
            }
            else {
                errors.push(`Features parsing failed: ${featuresResult.error || 'Unknown error'}`);
            }
        }
        // Extract block height with validation
        const blockHeightMatch = markup.match(/:block-height="(\d+)"/);
        let blockHeight;
        if (blockHeightMatch) {
            const height = parseInt(blockHeightMatch[1]);
            if (isNaN(height) || height < 0) {
                errors.push('Invalid block height: must be a positive number');
            }
            else {
                blockHeight = height;
            }
        }
        // Extract and validate cultural significance
        const culturalSigMatch = markup.match(/cultural-significance="([^"]+)"/);
        let culturalSignificance = 'medium';
        if (culturalSigMatch) {
            if (isValidCulturalSignificance(culturalSigMatch[1])) {
                culturalSignificance = culturalSigMatch[1];
            }
            else {
                errors.push(`Invalid cultural significance: ${culturalSigMatch[1]}. Must be 'low', 'medium', or 'high'`);
            }
        }
        // Extract related protocols with safe parsing
        const relatedMatch = markup.match(/:related-protocols="(\[.*?\])"/s);
        let relationships = [];
        if (relatedMatch) {
            const relatedResult = parseVueObjectAttribute(relatedMatch[1], []);
            if (relatedResult.success && relatedResult.data) {
                relationships = relatedResult.data.map((r) => {
                    const relationshipType = r.relationship || 'related-to';
                    const normalizedType = normalizeRelationshipType(relationshipType);
                    if (!isValidRelationshipType(relationshipType)) {
                        errors.push(`Unknown relationship type: ${relationshipType}`);
                    }
                    return {
                        id: r.id || 'unknown',
                        type: normalizedType,
                        name: r.name
                    };
                }).filter(Boolean);
            }
            else {
                errors.push(`Related protocols parsing failed: ${relatedResult.error || 'Unknown error'}`);
            }
        }
        // Check for KEVIN legacy attribute
        const kevinLegacyMatch = markup.match(/kevin-legacy="([^"]+)"/);
        const hasKevinLegacy = kevinLegacyMatch && kevinLegacyMatch[1] === 'true';
        const protocolEntity = {
            id: protocol,
            name: getProtocolName(protocol),
            type: 'protocol',
            description,
            culturalSignificance,
            blockIntroduced: blockHeight,
            features,
            relationships,
            url: `/protocols/${protocol}`,
            ...(hasKevinLegacy && {
                kevinLegacy: {
                    pioneeredBy: true,
                    culturalImpact: 'High - established foundational patterns for Bitcoin Stamps ecosystem',
                    successPattern: 'Authentic artistic vision + community building + long-term commitment'
                }
            })
        };
        return {
            data: protocolEntity,
            errors,
            source: markup,
            success: errors.length === 0
        };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error';
        return {
            data: null,
            errors: [`Parsing exception: ${errorMessage}`],
            source: markup,
            success: false
        };
    }
}
/**
 * Get human-readable protocol name
 */
function getProtocolName(id) {
    const names = {
        'src-20': 'SRC-20 Tokens',
        'src-101': 'SRC-101 Names',
        'src-721': 'SRC-721 NFTs',
        'olga': 'OLGA P2WSH Encoding',
        'network-security': 'Network Security'
    };
    return names[id] || id.toUpperCase();
}
/**
 * Recursively find all markdown files
 */
async function findMarkdownFiles(dir) {
    const files = [];
    try {
        const entries = await readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = join(dir, entry.name);
            if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
                const subFiles = await findMarkdownFiles(fullPath);
                files.push(...subFiles);
            }
            else if (entry.isFile() && extname(entry.name) === '.md') {
                files.push(fullPath);
            }
        }
    }
    catch (error) {
        console.warn(`Error reading directory ${dir}:`, error);
    }
    return files;
}
export default {
    // Watch for changes in markdown files and theme components
    watch: ['../../**/*.md', '../../theme/components/LEO/*.vue'],
    async load() {
        try {
            console.log('Generating entities from LEO components...');
            const [protocols, concepts, tools] = await Promise.all([
                extractProtocolCards(),
                extractStructuredDataEntities(),
                extractToolEntities()
            ]);
            const totalEntities = protocols.length + concepts.length + tools.length;
            const result = {
                entities: {
                    protocols,
                    concepts,
                    tools
                },
                metadata: {
                    totalEntities,
                    lastUpdated: new Date().toISOString(),
                    version: '1.0.0',
                    apiVersion: 'v1'
                }
            };
            console.log(`Generated ${totalEntities} entities from LEO components`);
            return result;
        }
        catch (error) {
            console.error('Error generating entities data:', error);
            // Fallback to existing static data if available
            try {
                const staticData = await readFile(join(docsDir, 'api/entities.json'), 'utf-8');
                return JSON.parse(staticData);
            }
            catch (fallbackError) {
                console.error('Error loading fallback data:', fallbackError);
                throw error;
            }
        }
    }
};
