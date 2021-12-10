module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'vuetify',
        'airbnb-base',
        'plugin:vue/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/vue',
        '@vue/typescript'
    ],
    rules: {

        'no-multiple-empty-lines': ["error", { "max": 1 }],
        'eqeqeq': ["error", "always"],
        'max-len': ['error', 180],
        'vue/no-dupe-keys': ['error'],
        'vue/name-property-casing': ['error', 'PascalCase'],
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        'parser': '@typescript-eslint/parser',
        'project': 'tsconfig.json',
        'tsconfigRootDir': './',
        'extraFileExtensions': ['.vue']
    },
}