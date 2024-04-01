import { promisify } from "node:util";

import { zip } from "cross-zip";
import { remove } from "fs-extra";
import { globby } from "globby";

import { BuildHandlerContext } from "./buildHandler.js";

const zipFile = promisify(zip);

export async function zipAll({ outDir, zipPath }: BuildHandlerContext) {
  await remove(zipPath);
  const files = await globby(`${outDir}/**/*`, {
    dot: true
  });

  for (const file of files) {
    await zipFile(file, zipPath);
  }
}
