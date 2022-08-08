module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/valid-template-root': 0,
        'no-undef': 0,
        'vue/require-valid-default-prop': 2,
        'vue/no-unused-vars': 1,
        '@typescript-eslint/no-empty-function': 0,
        'vue/no-use-v-if-with-v-for': 0,
        'vue/multi-word-component-names': 0,
        '@typescript-eslint/no-inferrable-types': 1,
        'prefer-const': 0,
        '@typescript-eslint/ban-types': 0,
        'no-self-assign': 0
    },
}
