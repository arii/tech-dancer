import { expectedResults } from "./expected-results.js";

console.log(JSON.stringify({ mode: "placeholder", fixtures: Object.keys(expectedResults) }, null, 2));
