import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";


export default defineConfig([
    js.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        plugins: { js },
        extends: ["js/recommended"],
        rules: {
            "no-trailing-spaces": "error",
            "object-curly-spacing": ["error", "always"],
            "arrow-spacing": ["error", { before: true, after: true }],
            "no-console": "off"
        }
    },
    { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.node } },
    pluginReact.configs.flat.recommended,
    { ignores: ["dist/**"] }
]);
