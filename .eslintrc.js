module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['import', 'react', 'jsx-a11y', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier/react'
  ],
  rules: {
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: 'props|ownProps|state'
      }
    ],
    'no-useless-constructor': 'warn',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        specialLink: ['to']
      }
    ],
    'react/display-name': 'off',
    // Rules up for review
    'react/forbid-prop-types': 'warn',
    'react/prop-types': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/prefer-stateless-function': 'warn',
    'react/react-in-jsx-scope': 'warn',
    // Prettier
    'prettier/prettier': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
