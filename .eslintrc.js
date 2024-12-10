module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: "module",
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:lit/recommended",
		"plugin:prettier/recommended",
	],
	plugins: ["@typescript-eslint", "lit", "prettier"],
	env: {
		browser: true,
		es2022: true,
	},
	rules: {
		"prettier/prettier": "error",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["warn"],
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
		},
	],
};
