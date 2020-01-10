module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: 'true'
    }
  },
  plugins: ['html', 'jsx-a11y', 'prettier', 'react'],
  extends: ['airbnb', 'prettier'],
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'no-useless-constructor': 'warn',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        specialLink: ['to']
      }
    ],
    'react/forbid-prop-types': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/prefer-stateless-function': 'warn',
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'warn' //off
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
