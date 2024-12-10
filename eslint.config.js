import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import litPlugin from "eslint-plugin-lit";
import prettierPlugin from "eslint-plugin-prettier";

export default [
	{
		ignorePatterns: ["node_modules/", "dist/"],
	},
	{
		languageOptions: {
			parser: "@typescript-eslint/parser",
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: "module",
			},
			globals: {
				window: "readonly",
				document: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": typescriptEslintPlugin,
			lit: litPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			"prettier/prettier": "error",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": ["warn"],
			"lit/no-invalid-html": "error",
			"lit/no-legacy-template-syntax": "error",
		},
	},
	{
		files: ["*.ts", "*.tsx"],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/no-explicit-any": "warn",
		},
	},
];
