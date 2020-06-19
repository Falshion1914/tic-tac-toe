module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": ["airbnb-base", "plugin:prettier/recommended"],
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier" : "error",
        "eqeqeq" : "off",
        "no-plusplus" : "off",
        "camelcase" : "off",
        "no-undef" : "off",
        "prefer-rest-params" : "off",
        "func-names" : "off",
        "func-names" : "off",
        "prefer-destructuring" : "off",
        "no-use-before-define" : "off",
        "no-shadow" : "off",
    }
};
