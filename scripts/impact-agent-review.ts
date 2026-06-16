import fs from 'fs';
import path from 'path';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

function encodeImageToBase64(filePath: string): string {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const imageBuffer = fs.readFileSync(absolutePath);
  return `data:image/png;base64,${imageBuffer.toString('base64')}`;
}

async function analyzeUXFeedback() {
  // To prevent running multiple times: Check if we have already generated the UX analysis output.
  // We'll write to a new file so we know it's done.
  const agentReviewDonePath = path.join(process.cwd(), 'artifacts/impact-analysis/agent-review-done.txt');
  if (fs.existsSync(agentReviewDonePath)) {
    console.log("Agent review already completed. Skipping.");
    return;
  }

  const visualSummaryPath = path.join(process.cwd(), 'artifacts/visual-review/summary.json');
  if (!fs.existsSync(visualSummaryPath)) {
    console.log("No visual summary found. Skipping agent review.");
    return;
  }

  const visualData = JSON.parse(fs.readFileSync(visualSummaryPath, 'utf8'));
  const deploymentReviewPath = path.join(process.cwd(), 'artifacts/deployment-review.md');
  const domContext = fs.existsSync(deploymentReviewPath) ? fs.readFileSync(deploymentReviewPath, 'utf8') : 'No DOM context available.';

  const routesToReview = visualData.routes.filter(r => r.severity !== 'LOW');

  if (routesToReview.length > 0) {
     console.log(`🤖 Reviewing ${routesToReview.length} route(s) with Gemini...`);
     if (!process.env.GEMINI_API_KEY) {
         console.warn('⚠️ Agent review skipped: Missing GEMINI_API_KEY environment variable');
         // We do NOT exit with code 1 so we don't fail CI.
         return;
     }
  } else {
    console.log("No routes to review for agent. Skipping.");
    return;
  }

  const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-pro",
    maxOutputTokens: 2048,
  });

  const outputDir = path.join(process.cwd(), 'artifacts/impact-analysis');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  let agentReport = "## 🤖 Agent UX Review\n\n";

  for (const route of routesToReview) {
    if (!route.beforeCroppedPath || !route.afterCroppedPath) continue;

    const beforeImg = encodeImageToBase64(route.beforeCroppedPath);
    const afterImg = encodeImageToBase64(route.afterCroppedPath);

    const message = new HumanMessage({
      content: [
        {
          type: "text",
          text: `Analyze the UX impact of this deployment for the route: ${route.route}.
                 The visual difference is ${route.differencePercent.toFixed(2)}%.
                 Review the provided DOM changes and severity metrics: \n\n${domContext}\n\n
                 Compare the 'Before' and 'After' images. Does this change degrade the user experience?`
        },
        { type: "image_url", imageUrl: { url: beforeImg } },
        { type: "image_url", imageUrl: { url: afterImg } }
      ]
    });

    try {
        const res = await model.invoke([message]);
        console.log(`\nUX Analysis for ${route.route}:\n`, res.content);
        agentReport += `### Route: ${route.route}\n\n${res.content}\n\n`;
    } catch (err) {
        console.error(`Error invoking model for route ${route.route}:`, err);
        // Do not fail CI on agent error
    }
  }

  // Append to the deployment review or save separately
  if (fs.existsSync(deploymentReviewPath)) {
    fs.appendFileSync(deploymentReviewPath, "\n\n" + agentReport);
  } else {
    fs.writeFileSync(path.join(outputDir, 'agent-review.md'), agentReport);
  }

  fs.writeFileSync(agentReviewDonePath, "Done");
}

analyzeUXFeedback().catch(err => {
    console.error("Agent review threw an unexpected error:", err);
    // Do not fail CI on agent error
});
