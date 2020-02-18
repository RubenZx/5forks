module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json', // Required to have rules that rely on Types.
    tsconfigRootDir: './'
  },
  env: {
    es6: true,
    node: true,
    jest: true,
    'react-native/react-native': true
  },
  extends: [
    'airbnb',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint'
  ],
  plugins: ['react', 'react-native', 'react-hooks', 'import'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
      },

      typescript: {
        directory: './tsconfig.json'
      },
      'babel-plugin-root-import': {
        rootPathSuffix: 'app',
        rootPathPrefix: '~'
      },
      node: {
        extensions: ['.js', '.jsx', 'ts', '.tsx']
      }
    }
  },
  rules: {
    'import/extensions': [
      1,
      { png: 'always', svg: 'always', jpg: 'always', jpeg: 'always' }
    ],
    'import/no-unresolved': 'error',
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.jsx', '.tsx']
      }
    ],
    'react/prefer-stateless-function': 1,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,
    'react-native/no-raw-text': [1, { skip: ['Button'] }],
    '@typescript-eslint/explicit-function-return-type': [
      0,
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    '@typescript-eslint/no-use-before-define': [
      2,
      {
        functions: true,
        classes: true,
        variables: false
      }
    ],
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error']
      }
    ]
  }
}
