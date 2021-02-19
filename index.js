const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
  console.log('----------------------------------------------------------');
  try {
    const productboardtoken = core.getInput('productboardtoken', { required: true });
    const url = `https://api.productboard.com/notes`;
    const octokit = github.context;
    const {issue} = octokit.payload;
    axios.defaults.headers.common = {'Authorization': `bearer ${productboardtoken}`}

    console.log('issue : ', issue);

    const content = issue.body +' Issue: ' + issue.html_url + ' Comments: ' + issue.comments;

    const PayloadSchema = {
      title: `#${issue.number} ${issue.title}`,
      content: `${content}`,
      customer_email: `${issue.user.login}@github.com`,
      display_url: `${issue.html_url}`,
      source: {
        "origin": `${issue.user.organizations_url}`,
        "record_id": `${issue.html_url}-${issue.number}`
      },
      tags: [
        "user story"
      ]
    };

    const {status, statusText, data} = await axios.post(url, PayloadSchema);

    console.log('response : ', statusText, status , data);

    return { statusText, status, data };
  }
  catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}

run()
