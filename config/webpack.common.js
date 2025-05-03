import path, { resolve } from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import * as sass from "sass";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __build_dirname = path.resolve(__dirname, "../build");

export default {
  entry: {
    app: "./src/main.ts",
  },
  module: {
    rules: [
      // 1. Typescript: Load all .ts, .tsx file, then resolve and output as
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      // 2. CSS: Allow to import .css file in .js file
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // 3. Images: Allow to import images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        // 3.1 Images: Export copy images to build folder
        generator: {
          filename: "assets/images/[name]-[hash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      // 4. HTML: Allow to import .html file in .js file
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      inject: true,
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    modules: ["...", "/node_modules"],
  },
  output: {
    filename: "[name].main.js",
    path: __build_dirname,
    clean: true,
  },
};
