const eslintPluginTsc = require("esbuild-plugin-tsc");

module.exports = [eslintPluginTsc({
  tsconfigPath: `${__dirname}/tsconfig.node.json`,
})];
