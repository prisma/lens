import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";

function bundle(inputPath) {
  const input = path.basename(inputPath, ".ts");
  return {
    input: inputPath,
    output: [
      {
        file: `./dist/${input}.js`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `./dist/${input}.esm.js`,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      postcss(),
      resolve(),
      commonjs(),
      typescript(),
      copy({
        targets: [
          { src: "tailwind.config.js", dest: "dist", rename: "tailwind.js" },
        ],
      }),
    ],
  };
}

export default [bundle("./src/lib.ts"), bundle("./src/web.ts")];
