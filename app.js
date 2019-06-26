const Jira = require('./jiraApi')();
const argv = require('minimist')(process.argv.slice(2));


(async () => {
  console.info('Starting retrieve')
  const issueNumber = argv['issue'];
  try {
    const issue = await Jira.findIssue(issueNumber)
    console.info('got issue', issue)
  } catch (e) {
    console.error('there was an issue', e)
  }
})()