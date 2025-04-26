# 1. How to config webpack

- [] Create entry point for webpack: index.js
- [] Config typescript loader to use Typescript `npm install --save-dev typescript ts-loader`
  - [] output filename = webpack output filename
  - [] change entry point to .ts
- [] Config webpack dev
  - [] Config webpack-dev-server `npm install --save-dev webpack-dev-server`
  - [] Config hot reload for .html
- [] Config webpack assets
  - [] CSS / SCSS
  - [] Images, icons, ...
  - [] Fonts
- [] Setup build command for webpack in package.json `"build": "webpack --config config/webpack.common.js --mode production"`
