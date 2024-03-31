import { writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import zip from "cross-zip";
import { remove } from "fs-extra";
import { globby } from "globby";

const zipFile = promisify(zip.zip);

async function writePackageJson(dir, name) {
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

  await writeFile(path.join(dir, "package.json"), JSON.stringify(packageJson, null, 2));
}

async function zipHandler(dir, name) {
  const zipPath = path.join(dir, `${name}.zip`);

  await remove(path.join(dir, `${name}.zip`));
  const files = await globby(`${dir}/**/*`, {
    dot: true
  });

  for (const file of files) {
    await zipFile(file, path.join(dir, `${name}.zip`));
  }
}

async function buildHandler(file, options) {
  const name = path.basename(file, ".js");
  const dir = path.join(process.cwd(), path.dirname(file));

  await writePackageJson(dir, name);
  zipHandler(dir, name);
}

export function esbuildLambdaPlugin() {
  return {
    name: "esbuild-lambda-plugin",
    setup(build) {
      build.onStart(() => {
        const warnings = [];

        if (build.initialOptions.minifyIdentifiers) {
          warnings.push({
            text: `'minifyIdentifiers' is set to true but was forced to false.\n  It would break functions as the handler function would be renamed.`
          });
        }

        if (build.initialOptions.format && build.initialOptions.format !== "esm") {
          warnings.push({
            text: `'format' is set to ${build.initialOptions.format} but was forced to 'esm'.\n  'esm' produces the smallest files while still working.`
          });
        }

        return {
          warnings
        };
      });

      build.onEnd(async (result) => {
        Object.entries(result.metafile.outputs)
          .filter(([key]) => key.endsWith(".js"))
          .forEach(([output, options]) => {
            buildHandler(output, options);
          });

        // run localstack to upload the lambda function
        console.log("Build finished. Uploading to localstack...");
      });

      // build.initialOptions.target = "es5"
      build.initialOptions.format = "esm";
      // If identifiers are minified `handler` will be, and will break the function
      build.initialOptions.minifyIdentifiers = false;

      if (build.initialOptions.minify) {
        build.initialOptions.minify = false;
        build.initialOptions.minifyWhitespace = true;
        build.initialOptions.minifySyntax = true;
      }

      build.initialOptions.supported = {
        // The ES 7 exponentiation operator (**) is supported.
        "exponent-operator": true,
        // ES 6 template literals are supported: multiline strings, expression interpolation, and nesting templates.
        "template-literal": true,
        // ES 6 arrow functions are supported, and ES 6 rest parameter syntax is supported.
        arrow: true,
        "rest-argument": true,
        // ES 9 named capture groups are supported.
        "regexp-named-capture-groups": true,
        // Const and let statements are supported in v2.
        "const-and-let": true,
        // ES 6 await expressions are supported in v2.
        "async-await": true,
        ...build.initialOptions.supported
      };
    }
  };
}
