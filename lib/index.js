const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { getTranslation } = require('./languages');

const DEFAULT_OPTIONS = {
  exclude: ['node_modules'],
  depth: Infinity,
  size: false,
  date: false,
  all: false,
  output: null,
  lang: 'es'
};

async function generateTree(paths, options = {}) {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const results = [];

  for (const dirPath of paths) {
    const absolutePath = path.resolve(dirPath);
    if (!await fs.pathExists(absolutePath)) {
      throw new Error(getTranslation(mergedOptions.lang, 'pathNotExists', { path: dirPath }));
    }

    const tree = await buildTree(absolutePath, '', mergedOptions);
    const stats = await calculateDirectoryStats(absolutePath, mergedOptions);
    results.push({
      path: dirPath,
      tree,
      stats
    });
  }

  // Generar salida para terminal
  const terminalOutput = formatTerminalOutput(results, mergedOptions);
  
  // Si hay archivo de salida, generar formato Markdown
  if (mergedOptions.output) {
    const markdownOutput = formatMarkdownOutput(results, mergedOptions);
    const outputPath = mergedOptions.output.endsWith('.md') 
      ? mergedOptions.output 
      : `${mergedOptions.output}.md`;
    await fs.writeFile(outputPath, markdownOutput);
  }

  return terminalOutput;
}

async function buildTree(dirPath, prefix, options, currentDepth = 0) {
  if (currentDepth > options.depth) return '';

  const entries = await fs.readdir(dirPath);
  let output = '';

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const fullPath = path.join(dirPath, entry);
    const stats = await fs.stat(fullPath);
    const isLast = i === entries.length - 1;

    if (!options.all && entry.startsWith('.')) continue;
    if (stats.isDirectory() && options.exclude.includes(entry)) continue;

    const prefixChar = isLast ? '└── ' : '├── ';
    const newPrefix = prefix + (isLast ? '    ' : '│   ');

    let entryInfo = entry;
    if (options.size) {
      entryInfo += ` (${formatSize(stats.size)})`;
    }
    if (options.date) {
      entryInfo += ` [${stats.mtime.toLocaleDateString()}]`;
    }

    output += prefix + prefixChar + entryInfo + '\n';

    if (stats.isDirectory()) {
      output += await buildTree(fullPath, newPrefix, options, currentDepth + 1);
    }
  }

  return output;
}

async function calculateDirectoryStats(dirPath, options) {
  let totalFiles = 0;
  let totalDirs = 0;
  let totalSize = 0;
  let fileTypes = new Map();

  async function processPath(currentPath) {
    const entries = await fs.readdir(currentPath);
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry);
      const stats = await fs.stat(fullPath);

      if (!options.all && entry.startsWith('.')) continue;
      if (stats.isDirectory() && options.exclude.includes(entry)) continue;

      if (stats.isDirectory()) {
        totalDirs++;
        await processPath(fullPath);
      } else {
        totalFiles++;
        totalSize += stats.size;
        const ext = path.extname(entry).toLowerCase() || 'sin extensión';
        fileTypes.set(ext, (fileTypes.get(ext) || 0) + 1);
      }
    }
  }

  await processPath(dirPath);
  return { totalFiles, totalDirs, totalSize, fileTypes };
}

function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

function formatTerminalOutput(results, options) {
  return results.map(result => {
    const header = chalk.bold(`\n${getTranslation(options.lang, 'structureOf')} ${result.path}\n`);
    return header + result.tree;
  }).join('\n');
}

function formatMarkdownOutput(results, options) {
  const lang = options.lang;
  const title = lang === 'es' ? 'Reporte de Estructura de Directorios' : 'Directory Structure Report';
  const generated = lang === 'es' ? 'Generado el' : 'Generated on';
  const stats = lang === 'es' ? 'Estadísticas' : 'Statistics';
  const totalFiles = lang === 'es' ? 'Total de Archivos' : 'Total Files';
  const totalDirs = lang === 'es' ? 'Total de Directorios' : 'Total Directories';
  const totalSize = lang === 'es' ? 'Tamaño Total' : 'Total Size';
  const fileTypes = lang === 'es' ? 'Tipos de Archivos' : 'File Types';
  const excluded = lang === 'es' ? 'Directorios Excluidos' : 'Excluded Directories';

  let output = `# 📁 ${title}\n\n`;
  output += `*${generated} ${new Date().toLocaleString()}*\n\n`;
  
  results.forEach(result => {
    output += `## 📂 ${result.path}\n\n`;
    output += '```tree\n';
    output += result.tree;
    output += '```\n\n';
    
    output += `### 📊 ${stats}\n\n`;
    output += `- ${totalFiles}: ${result.stats.totalFiles}\n`;
    output += `- ${totalDirs}: ${result.stats.totalDirs}\n`;
    if (options.size) {
      output += `- ${totalSize}: ${formatSize(result.stats.totalSize)}\n`;
    }
    
    output += `\n#### 📋 ${fileTypes}\n\n`;
    output += '| Extensión | Cantidad |\n';
    output += '|-----------|----------|\n';
    for (const [ext, count] of result.stats.fileTypes) {
      output += `| ${ext} | ${count} |\n`;
    }
    
    output += `\n#### 🚫 ${excluded}\n\n`;
    output += options.exclude.map(dir => `- \`${dir}\``).join('\n');
    
    output += '\n---\n\n';
  });

  return output;
}

module.exports = {
  generateTree
}; 