module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/require-prop-types': 'off',
    'space-before-function-paren': 'off',
    'no-console': 'off',
    'padded-blocks': 'off',
    'no-prototype-builtins': 'off',
    'semi': ['error', 'always']
  }
}
