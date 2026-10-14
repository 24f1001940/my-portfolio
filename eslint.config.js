const js = require('@eslint/js');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'portfolio-clean.zip',
      'index-phase1.html',
      'style-phase2.css',
      'game/**',
      'courses/**'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        Buffer: 'readonly',
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        IntersectionObserver: 'readonly',
        MutationObserver: 'readonly',
        URL: 'readonly',
        FormData: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        performance: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn'
    }
  }
];
