module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
    plugins: ['react-refresh', 'styled-components-a11y', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'react/function-component-definition': [
            'warn',
            {
                namedComponents: ['arrow-function'],
                unnamedComponents: ['arrow-function'],
            },
        ],
        'jsx-a11y/label-has-associated-control': [
            'error',
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
        'jsx-a11y/label-has-for': [
            'error',
            {
                required: {
                    some: ['nesting', 'id'],
                },
            },
        ],
        'jsx-a11y/alt-text': 'off',
        'no-param-reassign': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-underscore-dangle': 'off',
        'react/no-array-index-key': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-shadow': 'off',
    },
    settings: {
        'import/core-modules': ['vite', '@vitejs/plugin-react'],
    },
};
