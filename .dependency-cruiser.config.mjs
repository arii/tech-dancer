/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  options: {
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.app.json'
    },
    doNotFollow: {
      path: 'node_modules'
    },
    includeOnly: '^src'
  }
};
