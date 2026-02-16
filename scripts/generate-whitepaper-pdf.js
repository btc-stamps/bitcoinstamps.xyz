#!/usr/bin/env node

/**
 * Generate Bitcoin Stamps Whitepaper PDF
 *
 * This script concatenates all whitepaper markdown files in the correct order
 * and creates a combined markdown that can be converted to PDF.
 *
 * Note: Due to ARM64 platform limitations with Puppeteer/Chrome, this script
 * creates a combined markdown file and provides instructions for PDF generation.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WHITEPAPER_DIR = path.join(__dirname, '../btc_stamps/docs/whitepaper');
const OUTPUT_DIR = path.join(__dirname, '../docs/public');
const OUTPUT_MD = path.join(OUTPUT_DIR, 'bitcoin-stamps-whitepaper-combined.md');

// Order of sections based on the table of contents in index.md
const SECTION_ORDER = [
  'index.md',
  'introduction.md',
  'architecture.md',
  'token-standards.md',
  'economics.md',
  'improvement-proposals.md',
  'implementation.md',
  'security.md',
  'future.md'
];

/**
 * Remove frontmatter from markdown content
 */
function removeFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n[\s\S]*?\n---\s*\n/;
  return content.replace(frontmatterRegex, '');
}

/**
 * Combine all whitepaper sections into a single markdown file
 */
function combineMarkdownFiles() {
  console.log('Bitcoin Stamps Whitepaper Generator\n');
  console.log('Combining whitepaper sections...');

  let combinedContent = '';
  let missingFiles = [];

  for (const filename of SECTION_ORDER) {
    const filepath = path.join(WHITEPAPER_DIR, filename);

    if (!fs.existsSync(filepath)) {
      missingFiles.push(filename);
      continue;
    }

    console.log(`  ✓ Adding: ${filename}`);
    let content = fs.readFileSync(filepath, 'utf8');

    // Remove frontmatter from all sections
    content = removeFrontmatter(content);

    // Add section to combined content with page break hint
    combinedContent += content;
    combinedContent += '\n\n---\n\n'; // Section separator
  }

  if (missingFiles.length > 0) {
    console.warn('\n⚠ Warning: Missing files:', missingFiles);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Write combined markdown
  fs.writeFileSync(OUTPUT_MD, combinedContent, 'utf8');
  const fileSize = (fs.statSync(OUTPUT_MD).size / 1024).toFixed(2);

  console.log(`\n✓ Combined markdown created: ${OUTPUT_MD}`);
  console.log(`  File size: ${fileSize} KB`);
  console.log('\nTo generate PDF from this markdown:');
  console.log('  1. Using pandoc (if available):');
  console.log(`     pandoc ${OUTPUT_MD} -o ${path.join(OUTPUT_DIR, 'bitcoin-stamps-whitepaper.pdf')} --pdf-engine=xelatex`);
  console.log('  2. Using online tools:');
  console.log('     - https://www.markdowntopdf.com/');
  console.log('     - https://pdf.online/markdown-to-pdf');
  console.log('  3. Using VS Code extension: "Markdown PDF"');
  console.log('\nFor now, the combined markdown is available for manual conversion.');

  return OUTPUT_MD;
}

/**
 * Create a simple HTML version as fallback
 */
function createHTMLVersion(mdPath) {
  console.log('\nCreating HTML version as fallback...');

  const mdContent = fs.readFileSync(mdPath, 'utf8');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bitcoin Stamps Protocol: A Technical Whitepaper</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      color: #333;
    }
    h1 { font-size: 28px; margin-top: 30px; }
    h2 { font-size: 24px; margin-top: 25px; }
    h3 { font-size: 20px; margin-top: 20px; }
    code {
      background-color: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    pre {
      background-color: #f4f4f4;
      padding: 12px;
      border-radius: 5px;
      overflow-x: auto;
    }
    pre code { background-color: transparent; padding: 0; }
    blockquote {
      border-left: 4px solid #ddd;
      padding-left: 16px;
      margin-left: 0;
      font-style: italic;
      color: #666;
    }
    hr { margin: 40px 0; border: 0; border-top: 2px solid #eee; }
    @media print {
      body { margin: 0; padding: 20px; }
      h1, h2, h3 { page-break-after: avoid; }
      pre, blockquote { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div style="white-space: pre-wrap; font-family: inherit;">${mdContent
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\`(.+?)\`/g, '<code>$1</code>')
    .replace(/^---$/gm, '<hr>')
  }</div>
  <script>
    // Allow browser print to PDF
    console.log('To save as PDF: Press Ctrl+P (Windows/Linux) or Cmd+P (Mac) and select "Save as PDF"');
  </script>
</body>
</html>`;

  const htmlPath = path.join(OUTPUT_DIR, 'bitcoin-stamps-whitepaper.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✓ HTML version created: ${htmlPath}`);
  console.log('  You can open this in a browser and print to PDF');
}

/**
 * Main execution
 */
function main() {
  try {
    const mdPath = combineMarkdownFiles();
    createHTMLVersion(mdPath);

    console.log('\n✓ Whitepaper files generated successfully!');
    console.log('\nNext steps:');
    console.log('  1. Review the combined markdown or HTML file');
    console.log('  2. Generate PDF using one of the suggested methods');
    console.log('  3. Place the final PDF at: docs/public/bitcoin-stamps-whitepaper.pdf');

  } catch (error) {
    console.error('\n✗ Error generating whitepaper files:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
