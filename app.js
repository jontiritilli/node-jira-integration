const Jira = require('./jiraApi')();

(async () => {
  console.info('Starting retrieve')
  const issueNumber = 'MCM492'
  try {
    const issue = await Jira.findIssue(issueNumber)
    console.info('got issue', issue)
  } catch (e) {
    console.error('there was an issue', e)
  }
})()