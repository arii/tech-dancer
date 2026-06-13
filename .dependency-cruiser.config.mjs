/** @type {import('dependency-cruiser').IConfiguration} */
export default {
<<<<<<< HEAD
  forbidden: [
  ],
  options: {
    doNotFollow: {
      path: 'node_modules'
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json'
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    }
  }
=======
  options: {
    doNotFollow: {
      path: "node_modules",
      dependencyTypes: ["npm", "npm-dev", "npm-optional", "npm-peer", "npm-bundled", "npm-no-pkg"],
    },
    moduleSystems: ["es6", "cjs"],
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "tsconfig.app.json",
    },
  },
>>>>>>> a06bf116ea (feat: add deployment impact analysis tool)
};
