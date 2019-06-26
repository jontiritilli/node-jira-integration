const JiraApi = require('jira-client')
const config = require('./config/jira-config')

module.exports = function(conf = {}) {
  if((!conf.username && !config.user) || (!conf.password && !config.pass)) {
    throw new Error('Missing username or password. Please provide both.')
  }
  const jira = new JiraApi({
    protocol: conf.protocol || 'https',
    host: conf.host || 'tewebsolutions.atlassian.net',
    username: conf.username || config.user,
    password: conf.key || config.key,
    apiVersion: conf.apiVersion || '2',
    strictSSL:  conf.strictSSL || true
  });
  return jira;
}