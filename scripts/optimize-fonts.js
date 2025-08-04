#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, stat, rm } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const fontsDir = join(projectRoot, 'static', 'fonts', 'WOFF2');

const requiredFonts = new Set([
	'IosevkaAile-Light.woff2',
	'IosevkaAile-Regular.woff2',
	'IosevkaEtoile-Regular.woff2',
	'IosevkaEtoile-Bold.woff2'
]);

async function analyzeFonts() {
	const files = await readdir(fontsDir);
	const woff2Files = files.filter((f) => f.endsWith('.woff2'));

	let totalSize = 0;
	let requiredSize = 0;
	let unusedSize = 0;
	let unusedFiles = [];

	console.log('📊 Font Analysis Report\n');
	console.log('Required fonts:');

	for (const file of woff2Files) {
		const filePath = join(fontsDir, file);
		const stats = await stat(filePath);
		const sizeKB = Math.round(stats.size / 1024);

		totalSize += stats.size;

		if (requiredFonts.has(file)) {
			requiredSize += stats.size;
			console.log(`  ✅ ${file} (${sizeKB}KB)`);
		} else {
			unusedSize += stats.size;
			unusedFiles.push({ file, size: stats.size });
		}
	}

	console.log(`\nUnused fonts (${unusedFiles.length} files):`);
	unusedFiles.forEach(({ file, size }) => {
		console.log(`  ❌ ${file} (${Math.round(size / 1024)}KB)`);
	});

	console.log('\n📈 Size Summary:');
	console.log(`  Total fonts: ${Math.round(totalSize / 1024)}KB`);
	console.log(`  Required fonts: ${Math.round(requiredSize / 1024)}KB`);
	console.log(`  Unused fonts: ${Math.round(unusedSize / 1024)}KB`);
	console.log(`  Savings: ${Math.round((unusedSize / totalSize) * 100)}% reduction`);

	return { unusedFiles, totalSize, requiredSize, unusedSize };
}

async function removeUnusedFonts() {
	const { unusedFiles } = await analyzeFonts();

	console.log('\n🗑️  Removing unused fonts...');

	for (const { file } of unusedFiles) {
		const filePath = join(fontsDir, file);
		await rm(filePath);
		console.log(`  Removed: ${file}`);
	}

	console.log('\n✅ Font optimization complete!');
}

const command = process.argv[2];

if (command === 'clean') {
	removeUnusedFonts().catch(console.error);
} else {
	analyzeFonts().catch(console.error);
}
