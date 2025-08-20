// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  arrowParens: 'always',
  // Prettier v3 + ESM 環境ではプラグインはパッケージ名の文字列指定でOK
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/global.css',
  tailwindFunctions: ['clsx', 'twMerge', 'cn'],
};

export default config;
