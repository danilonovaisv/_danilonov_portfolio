import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: new URL('.', import.meta.url).pathname,
});

const sanitized = compat.extends('next/core-web-vitals').map((config) => {
  if (!config.plugins) return config;

  const plugins = Object.fromEntries(
    Object.entries(config.plugins).map(([key, value]) => {
      const { configs, ...rest } = value;
      return [key, rest];
    })
  );

  return { ...config, plugins };
});

export default [...sanitized];
