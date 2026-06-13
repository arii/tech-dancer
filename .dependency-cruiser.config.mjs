/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  forbidden: [
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
      dependencyTypes: ["npm", "npm-dev", "npm-optional", "npm-peer", "npm-bundled", "npm-no-pkg"],
    },
    moduleSystems: ["es6", "cjs"],
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.app.json'
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    }
  }
};
