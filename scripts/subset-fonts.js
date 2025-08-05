import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Configuration
const BUILD_DIR = join(projectRoot, '.build');
const FONTS_DIR = join(BUILD_DIR, 'fonts', 'WOFF2');
const SOURCE_FONTS_DIR = join(projectRoot, 'static', 'fonts', 'WOFF2');

// Character sets to include (optimized for your content)
const LATIN_BASIC = 'U+0020-007F'; // Basic Latin (space through DEL)
const LATIN_SUPPLEMENT = 'U+00A0-00FF'; // Latin-1 Supplement
const UNICODE_RANGES = `${LATIN_BASIC},${LATIN_SUPPLEMENT}`;

// Font mapping
const FONT_FILES = [
  'IosevkaAile-Light.woff2',
  'IosevkaAile-Regular.woff2', 
  'IosevkaAile-Bold.woff2',
  'IosevkaEtoile-Regular.woff2'
];

/**
 * Check if pyftsubset is available
 */
async function checkPyftsubset() {
  const pyftsubsetPaths = [
    join(projectRoot, 'venv', 'bin', 'pyftsubset'), // Virtual environment
    'pyftsubset' // System-wide
  ];
  
  for (const path of pyftsubsetPaths) {
    try {
      await execAsync(`${path} --help`);
      return path;
    } catch (error) {
      continue;
    }
  }
  
  console.log('📦 pyftsubset not found. Run: python -m venv venv && source venv/bin/activate && pip install fonttools brotli');
  return false;
}

/**
 * Analyze built HTML/CSS files to extract actual character usage
 */
function analyzeCharacterUsage() {
  const chars = new Set();
  
  // Scan all HTML and CSS files in build directory
  function scanDirectory(dir) {
    const items = readdirSync(dir);
    
    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.html') || item.endsWith('.css') || item.endsWith('.js')) {
        try {
          const content = readFileSync(fullPath, 'utf8');
          // Extract all characters from content
          for (const char of content) {
            const code = char.charCodeAt(0);
            // Include printable ASCII and Latin-1
            if ((code >= 32 && code <= 126) || (code >= 160 && code <= 255)) {
              chars.add(char);
            }
          }
        } catch (error) {
          console.warn(`⚠️  Could not read ${fullPath}: ${error.message}`);
        }
      }
    }
  }
  
  try {
    scanDirectory(BUILD_DIR);
  } catch (error) {
    console.warn('⚠️  Could not analyze build directory, using default character set');
  }
  
  console.log(`📊 Found ${chars.size} unique characters in build output`);
  return chars;
}

/**
 * Subset a single font file
 */
async function subsetFont(fontPath, outputPath, unicodeRanges, pyftsubsetPath) {
  const fontName = fontPath.split('/').pop();
  console.log(`🔧 Subsetting ${fontName}...`);
  
  try {
    const cmd = [
      pyftsubsetPath,
      `"${fontPath}"`,
      `--output-file="${outputPath}"`,
      `--unicodes="${unicodeRanges}"`,
      '--layout-features="*"', // Keep layout features
      '--glyph-names',
      '--symbol-cmap',
      '--legacy-cmap',
      '--notdef-glyph',
      '--notdef-outline',
      '--recommended-glyphs',
      '--name-legacy',
      '--flavor=woff2'
    ].join(' ');
    
    await execAsync(cmd);
    
    // Compare file sizes
    const originalSize = statSync(fontPath).size;
    const subsetSize = statSync(outputPath).size;
    const savings = ((originalSize - subsetSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${fontName}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(subsetSize/1024/1024).toFixed(2)}MB (${savings}% reduction)`);
    
  } catch (error) {
    console.error(`❌ Failed to subset ${fontName}: ${error.message}`);
    throw error;
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🎯 Starting font subsetting process...\n');
  
  // Check if build directory exists
  try {
    statSync(BUILD_DIR);
  } catch (error) {
    console.error(`❌ Build directory not found: ${BUILD_DIR}`);
    console.log('💡 Run "npm run build" first to generate the build output');
    process.exit(1);
  }
  
  // Check if pyftsubset is available
  const pyftsubsetPath = await checkPyftsubset();
  if (!pyftsubsetPath) {
    console.error('❌ fonttools not available. Cannot subset fonts.');
    console.log('💡 Run: python -m venv venv && source venv/bin/activate && pip install fonttools brotli');
    process.exit(1);
  }
  
  // Analyze character usage in build output
  const usedChars = analyzeCharacterUsage();
  
  // Check if fonts directory exists in build
  try {
    statSync(FONTS_DIR);
  } catch (error) {
    console.error(`❌ Fonts directory not found in build: ${FONTS_DIR}`);
    process.exit(1);
  }
  
  let totalOriginalSize = 0;
  let totalSubsetSize = 0;
  
  // Process each font file
  for (const fontFile of FONT_FILES) {
    const sourcePath = join(SOURCE_FONTS_DIR, fontFile);
    const buildPath = join(FONTS_DIR, fontFile);
    const tempPath = join(FONTS_DIR, `${fontFile}.subset`);
    
    try {
      // Check if source font exists
      const originalSize = statSync(buildPath).size;
      totalOriginalSize += originalSize;
      
      // Subset the font
      await subsetFont(buildPath, tempPath, UNICODE_RANGES, pyftsubsetPath);
      
      // Replace original with subset version
      const subsetSize = statSync(tempPath).size;
      totalSubsetSize += subsetSize;
      
      // Rename subset file to replace original
      writeFileSync(buildPath, readFileSync(tempPath));
      
      // Clean up temp file
      try {
        await execAsync(`rm "${tempPath}"`);
      } catch (error) {
        // Ignore cleanup errors
      }
      
    } catch (error) {
      console.error(`❌ Failed to process ${fontFile}: ${error.message}`);
    }
  }
  
  // Summary
  const totalSavings = ((totalOriginalSize - totalSubsetSize) / totalOriginalSize * 100).toFixed(1);
  
  console.log('\n📈 Font Subsetting Summary:');
  console.log(`   Original total: ${(totalOriginalSize/1024/1024).toFixed(2)}MB`);
  console.log(`   Subset total:   ${(totalSubsetSize/1024/1024).toFixed(2)}MB`);
  console.log(`   Total savings:  ${totalSavings}% (${((totalOriginalSize-totalSubsetSize)/1024/1024).toFixed(2)}MB)`);
  console.log('\n✅ Font subsetting complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Font subsetting failed:', error.message);
    process.exit(1);
  });
}

export { main as subsetFonts };