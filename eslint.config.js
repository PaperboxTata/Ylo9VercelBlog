// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';
import tsPlugin from '@typescript-eslint/eslint-plugin';

// 共用配置
const common = {
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  rules: {
    // 通用规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};

export default [
  // 基础JS配置
  {
    ...js.configs.recommended,
    ...common,
  },
  
  // TypeScript 配置
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // 指定你的 tsconfig 路径
      },
    },
    rules: {
      ...tsPlugin.configs['recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  
  // Vue 配置
  {
    files: ['**/*.vue'],
    plugins: {
      vue: vuePlugin,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser, // Vue 文件中使用 TS 解析器
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...vuePlugin.configs['recommended'].rules,
      'vue/multi-word-component-names': 'off', // 允许单单词组件名
      'vue/no-setup-props-destructure': 'off', // 允许解构 props
    },
  },
  {
    files: ["vite.config.ts","renderer/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: false, // 禁用项目检查
      },
    },
  },
];