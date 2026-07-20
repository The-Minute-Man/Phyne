const { ESLint } = require('eslint');

async function run() {
  const eslint = new ESLint();
  const results = await eslint.lintFiles(['src/**/*.tsx', 'src/**/*.ts']);
  results.forEach(result => {
    if (result.errorCount > 0 || result.warningCount > 0) {
      console.log(result.filePath);
      result.messages.forEach(msg => {
        console.log(`  Line ${msg.line}: ${msg.message} (${msg.ruleId})`);
      });
    }
  });
}
run().catch(console.error);
