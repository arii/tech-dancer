sed -i 's/\/\/ @ts-ignore - May not exist in standalone boomtick//g' boomtick-pkg/lib/impact-analysis-utils.ts
sed -i 's/\/\/ @ts-ignore//g' boomtick-pkg/lib/impact-analysis-utils.ts
sed -i 's/let getAllRoutes: any;/let getAllRoutes: () => { stubs: string[] };/g' boomtick-pkg/lib/impact-analysis-utils.ts
sed -i 's/getAllRoutes = require/getAllRoutes = require/g' boomtick-pkg/lib/impact-analysis-utils.ts
