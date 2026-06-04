export const expectedResults = {
  "merge-conflict-simple": {
    conflictFiles: ["src/App.tsx"],
    mutatedOriginalRepo: false,
  },
  "stale-branch": {
    conflictFiles: [],
    recommendedAction: "update-base-and-run-checks",
  },
  "failing-lighthouse": {
    success: false,
    failures: ["performance", "accessibility"],
  },
  "failing-playwright": {
    success: false,
    failedTests: [
      {
        title: "gear page renders affiliate disclosure",
        file: "tests/gear.spec.ts",
      },
    ],
  },
} as const;
