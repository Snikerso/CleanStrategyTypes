import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts", // Wejściowy plik TypeScript
  output: [
    {
      file: "dist/index.js",
      format: "cjs", // CommonJS
    },
    {
      file: "dist/bundle.esm.js",
      format: "esm", // ECMAScript Module
      sourcemap: true,
    },
    {
      file: "dist/bundle.min.js",
      format: "iife", // IIFE (dla przeglądarek)
      name: "MyLibrary",
      plugins: [terser()],
    },
  ],
  plugins: [typescript()],
};
