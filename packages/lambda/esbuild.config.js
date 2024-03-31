import path from "node:path";

import { esbuildLambdaPlugin } from "@project/esbuild-lambda-plugin";
import * as esbuild from "esbuild";
import eslintPluginTsc from "esbuild-plugin-tsc";

const watchMode = process.argv.includes("--watch");
const isProduction = process.env.NODE_ENV === "production";

const config = {
  entryPoints: ["src/**/handler.ts"],
  entryNames: "[dir]/handler",
  metafile: true,
  bundle: true,
  minify: isProduction,
  minifyIdentifiers: false,
  platform: "node",
  sourcemap: true,
  target: "node20",
  outdir: "dist",
  format: "esm",
  external: ["aws-sdk"],
  logLevel: "info",
  plugins: [
    esbuildLambdaPlugin(),
    eslintPluginTsc({
      tsconfigPath: path.join(import.meta.dirname, "tsconfig.node.json")
    })
  ]
};

if (watchMode) {
  const context = await esbuild.context(config);
  await context.watch();
} else {
  await esbuild.build(config);
}
