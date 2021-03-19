import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

const pkg = require("./package.json");

export default {
  input: "src/lib.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    postcss({ extract: true, inject: false }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      clean: true,
    }),
  ],
};
