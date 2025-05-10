# 📁 farllir-tree

<div align="center">

[![npm version](https://img.shields.io/npm/v/farllir-tree.svg)](https://www.npmjs.com/package/farllir-tree)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

</div>

<div align="center">

[English](README.en.md) | [Español](README.es.md)

</div>

## 🌍 Available Languages / Idiomas Disponibles

- [English](README.en.md) - Full documentation in English
- [Español](README.es.md) - Documentación completa en Español

## 📦 Quick Install / Instalación Rápida

```bash
npm install -g farllir-tree
```

## 🚀 Quick Start / Inicio Rápido

```bash
# Basic usage / Uso básico
farllir-tree

# Show help / Mostrar ayuda
farllir-tree --help

# Show directory structure with depth limit / Mostrar estructura con límite de profundidad
farllir-tree . -d 2

# Show file sizes and dates / Mostrar tamaños y fechas
farllir-tree . -s -t

# Generate markdown report / Generar reporte en markdown
farllir-tree . -o report.md

# Multiple paths / Múltiples rutas
farllir-tree ./src ./lib -d 3

# Exclude folders / Excluir carpetas
farllir-tree . -e node_modules dist temp
```

## 📝 Description / Descripción

farllir-tree is an enhanced version of the tree command for Node.js, allowing you to list directory structures in an organized and customizable way.

farllir-tree es una versión mejorada del comando tree para Node.js, que permite listar la estructura de directorios de forma organizada y personalizable.

## ✨ Key Features / Características Principales

- 📊 Support for up to 4 simultaneous paths
- 🚫 Customizable folder exclusion
- 📏 Configurable depth limit
- 📦 File size visualization
- 📅 Modification date visualization
- 👁️ Hidden files support
- 📝 Markdown report generation
- 🎨 Enhanced visual interface with colors
- ⏳ Progress indicator
- 🌍 Multi-language support
- 🎯 Multiple output formats (tree/markdown)
- 🔍 Smart file filtering
- 📊 Detailed statistics in reports
- 🎨 Customizable output styles
- 🔄 Real-time progress updates

## 🛠️ Options / Opciones

| Option / Opción | Description / Descripción |
|----------------|--------------------------|
| `-e, --exclude <folders...>` | Folders to exclude (default: node_modules, .git) |
| `-d, --depth <number>` | Maximum tree depth |
| `-s, --size` | Show file sizes |
| `-t, --date` | Show modification dates |
| `-a, --all` | Show hidden files |
| `-o, --output <file>` | Save report as Markdown file |
| `-l, --lang <language>` | Output language (es/en) |
| `-f, --format <format>` | Output format (tree/markdown) |
| `-c, --color` | Enable colored output |

## 📊 Report Features / Características del Reporte

The generated Markdown report includes:
- 📁 Complete directory structure
- 📊 Detailed statistics:
  - Total files and directories
  - Total size
  - File type distribution
- 🕒 Generation date and time
- 🎨 Enhanced format with icons and sections
- 📋 List of excluded directories

## 🤝 Contributing / Contribuir

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

¡Las contribuciones son bienvenidas! Por favor, lee nuestra [Guía de Contribución](CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

## 📜 License / Licencia

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

Made with ❤️ by farllirs

</div> 
