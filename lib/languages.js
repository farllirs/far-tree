const translations = {
  es: {
    generating: 'Generando estructura de carpetas...',
    success: 'Estructura generada exitosamente',
    error: 'Error al generar la estructura',
    structureOf: 'Estructura de:',
    pathNotExists: 'La ruta {path} no existe',
    maxPathsError: 'Se permiten máximo 4 rutas como parámetros'
  },
  en: {
    generating: 'Generating directory structure...',
    success: 'Structure generated successfully',
    error: 'Error generating structure',
    structureOf: 'Structure of:',
    pathNotExists: 'Path {path} does not exist',
    maxPathsError: 'Maximum 4 paths allowed as parameters'
  }
};

function getTranslation(lang, key, params = {}) {
  const translation = translations[lang]?.[key] || translations['en'][key];
  return translation.replace(/\{(\w+)\}/g, (_, param) => params[param] || '');
}

module.exports = {
  translations,
  getTranslation
}; 