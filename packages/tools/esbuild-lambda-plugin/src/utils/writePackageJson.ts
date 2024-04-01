import { join } from "node:path";

import fs from "fs-extra";

import { BuildHandlerContext } from "./buildHandler.js";

export async function writePackageJson({ outDir, name }: BuildHandlerContext) {
  const packageJson = {
    name,
    version: "1.0.0",
    description: "Lambda function",
    main: `${name}.js`,
    type: "module",
    exports: {
      ".": `./${name}.js`
    }
  };

  await fs.writeJSON(join(outDir, "package.json"), packageJson, { spaces: 2 });
}
