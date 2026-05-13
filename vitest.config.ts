/// <reference types="vitest/config" />

import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "."),
        },
    },
    test: {
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
        globals: false,
        include: ['./src/**/*.spec.tsx'],

        coverage: {
            provider: "v8",
            reporter: ["text", "html", "lcov"],
            reportsDirectory: "./coverage",
            exclude: [
                "node_modules/**",
                ".next/**",
                "coverage/**",
                "**/*.spec.ts",
                "**/*.spec.tsx",
                "**/*.test.ts",
                "**/*.test.tsx",
                "**/*.config.ts",
                "**/*.config.js",
                "src/setupTests.ts",
                "**/*.d.ts",
                "**/types/**",
                "**/interfaces/**",
                "**/dtos/**"
            ]
        }
    }
})