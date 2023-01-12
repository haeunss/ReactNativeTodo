module.exports = {
  root: true,
  extends: '@react-native-community',
  env: {
    browser: true,
    es6: true,
    node: true,
},
extends: [
    'eslint:recommended',
    'airbnb',
    'prettier',
    'plugin:prettier/recommended',
],
rules: {
    'react/jsx-filename-extension': [
        'error',
        { extensions: ['.js', '.jsx'] },
    ],
},
};
