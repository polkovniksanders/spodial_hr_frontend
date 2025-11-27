import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat"; // <--- ИМПОРТИРУЕМ ФИКС

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const nextConfig = fixupConfigRules(
  compat.extends("next/core-web-vitals", "next/typescript")
);

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    ignores: [".next/*", "node_modules/*"],
  },
  ...compat.extends("prettier")
];
export default eslintConfig;