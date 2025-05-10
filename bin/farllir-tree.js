#!/usr/bin/env node

const { program } = require('commander');
const { generateTree } = require('../lib/index');
const ora = require('ora');
const { getTranslation } = require('../lib/languages');
const chalk = require('chalk');

program
  .version('1.1.0')
  .description(chalk.blue('farllir-tree:') + ' Una versión mejorada del comando tree para Node.js')
  .argument('[paths...]', 'Rutas a analizar (máximo 4)')
  .option('-e, --exclude <folders...>', 'Carpetas a excluir', ['node_modules', '.git'])
  .option('-d, --depth <number>', 'Profundidad máxima del árbol', parseInt)
  .option('-s, --size', 'Mostrar tamaños de archivos')
  .option('-t, --date', 'Mostrar fechas de modificación')
  .option('-a, --all', 'Mostrar archivos ocultos')
  .option('-o, --output <file>', 'Guardar reporte en archivo Markdown')
  .option('-l, --lang <language>', 'Idioma de la salida (es/en)', 'es')
  .option('-c, --color', 'Activar colores en la salida', true)
  .option('-f, --format <format>', 'Formato de salida (tree/markdown)', 'tree')
  .parse(process.argv);

const options = program.opts();
const paths = program.args;

// Validación de rutas
if (paths.length > 4) {
  console.error(chalk.red(getTranslation(options.lang, 'maxPathsError')));
  process.exit(1);
}

// Si no se proporcionan rutas, usar el directorio actual
if (paths.length === 0) {
  paths.push('.');
}

// Validación de formato
if (!['tree', 'markdown'].includes(options.format)) {
  console.error(chalk.red(getTranslation(options.lang, 'invalidFormat')));
  process.exit(1);
}

const spinner = ora({
  text: getTranslation(options.lang, 'generating'),
  color: 'blue'
}).start();

generateTree(paths, options)
  .then(result => {
    spinner.succeed(chalk.green(getTranslation(options.lang, 'success')));
    console.log(result);
  })
  .catch(error => {
    spinner.fail(chalk.red(getTranslation(options.lang, 'error')));
    console.error(chalk.red(error.message));
    process.exit(1);
  }); 