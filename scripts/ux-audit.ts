#!/usr/bin/env node
import path from 'path';
import { createUXAuditGraph } from './ux-auditor/graph';
import { saveAuditArtifacts, formatTerminalSummary } from './ux-auditor/reporter';
import { cleanupServer } from './ux-auditor/capture';
import type { UXAuditState } from './ux-auditor/types';

function parseArgs() {
  const args = process.argv.slice(2);

  const getArgValue = (flag: string): string | undefined => {
    const idx = args.indexOf(flag);
    if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('--')) {
      return args[idx + 1];
    }
    return undefined;
  };

  const route = getArgValue('--route') || args.find(a => a.startsWith('/') && !a.startsWith('--')) || '/services';
  const viewport = getArgValue('--viewport') || 'desktop';
  const output = getArgValue('--output');
  const allViewports = args.includes('--all-viewports') || args.includes('--all');
  const interactive = args.includes('--interactive') || args.includes('-i');
  const skipServer = args.includes('--skip-server');
  const maxIterations = parseInt(getArgValue('--max-iterations') || '3', 10);

  return {
    route,
    viewport,
    output,
    allViewports,
    interactive,
    skipServer,
    maxIterations
  };
}

async function main() {
  const config = parseArgs();
  const slug = config.route.replace(/\//g, '_').replace(/^_/, '') || 'home';

  console.log(`\n========================================================`);
  console.log(`🔍 TECH-DANCER UX AUDITOR (LangGraph & Design RAG)`);
  console.log(`========================================================`);
  console.log(`📍 Target Route:      ${config.route}`);
  console.log(`🖥️  Initial Viewport:  ${config.viewport}`);
  console.log(`🔄 Mode:              ${config.interactive ? 'Interactive CLI Loop' : config.allViewports ? 'Multi-Viewport Auto-Scan' : 'Single-Pass Overview'}`);
  console.log(`========================================================\n`);

  const graph = createUXAuditGraph({
    route: config.route,
    defaultViewport: config.viewport,
    allViewports: config.allViewports,
    interactive: config.interactive,
    maxIterations: config.maxIterations,
    captureOptions: {
      skipServer: config.skipServer,
      outputDir: config.output ? path.join(config.output, slug) : undefined
    }
  });

  const threadId = `ux-audit-${slug}-${Date.now()}`;
  const initialInput: Partial<UXAuditState> = {
    route: config.route,
    slug,
    selectedViewports: [config.viewport],
    messages: [],
    iterationCount: 0,
    maxIterations: config.maxIterations,
    expandedScans: {},
    currentHypotheses: [],
    isApproved: false,
    finalFindings: [],
    summaryMarkdown: '',
    overallScore: 100
  };

  try {
    const finalState = await graph.invoke(initialInput as any, {
      configurable: { thread_id: threadId }
    }) as UXAuditState;

    formatTerminalSummary(finalState);
    const { reportPath, jsonPath } = saveAuditArtifacts(finalState, config.output ? path.join(config.output, slug) : undefined);

    console.log(`\n📄 Markdown Report: file://${reportPath}`);
    console.log(`💾 JSON Data:       file://${jsonPath}`);
    console.log(`🎉 UX Audit completed successfully.\n`);
  } catch (err) {
    console.error('❌ UX Audit failed with error:', err);
    process.exitCode = 1;
  } finally {
    cleanupServer();
  }
}

process.on('SIGINT', () => {
  cleanupServer();
  process.exit(0);
});

main();
