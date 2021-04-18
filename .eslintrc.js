module.exports = {
    root: true,
    extends: ["airbnb-typescript", "plugin:prettier/recommended"],
    env: {
        node: true,
        es2020: true
    },
    ignorePatterns: [
        "__tests__/**",
        "node_modules/**",
        "dist/**",
        "types/**",
    ],
    parserOptions: {
        project: "./tsconfig.json"
    },
    rules: {
        "no-console": "off",
        "consistent-return": "off"
    }
};