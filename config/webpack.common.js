import path, { resolve } from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as sass from "sass";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __build_dirname = path.resolve(__dirname, "../build");
export default {
  entry: {
    app: "./src/main.ts",
  },
  module: {
    // 1. Typescript: Load all .ts, .tsx file, then resolve and output as
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "src/index.html" })],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].main.js",
    path: __build_dirname,
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     title: "Production",
  //   }),
  // ],
  output: {
    filename: "[name].main.js",
    path: __build_dirname,
    clean: true,
  },
};
