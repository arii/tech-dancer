import fs from 'fs';

const generateTodo = () => {
  const reportPath = 'antipattern-report.txt';
  if (!fs.existsSync(reportPath)) {
    console.error(`Error: ${reportPath} not found.`);
    return;
  }

  const lines = fs.readFileSync(reportPath, 'utf8').split('\n');
  let todoContent = "# UI Anti-Pattern TODO List\n\n";
  todoContent += "This list is automatically generated from the `npm run audit` report. Fix these anti-patterns to adhere to the project design system.\n\n";

  let currentFile = null;

  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('>') || line.includes('Scanning') || line.includes('Anti-patterns detected')) {
      continue;
    }

    // Clean ANSI escape sequences
    const cleanLine = line.replace(/\x1b\[[0-9;]*m/g, '');

    if (cleanLine.startsWith('src/')) {
      currentFile = cleanLine;
      todoContent += `## ${currentFile}\n`;
    } else if (currentFile && cleanLine.startsWith('Line')) {
      todoContent += `- [ ] ${cleanLine}\n`;
    }
  }

  fs.writeFileSync('TODO_ANTIPATTERNS.md', todoContent);
  console.log("Successfully generated TODO_ANTIPATTERNS.md");
}

generateTodo();
