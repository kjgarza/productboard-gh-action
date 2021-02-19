const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
  console.log('----------------------------------------------------------');
  try {
    // const event = core.getInput('event', { required: true });
    const productboardtoken = core.getInput('productboardtoken', { required: true });
    const url = `https://api.productboard.com/notes`;
    const octokit = github.context;
    const {issue} = octokit.payload;
    axios.defaults.headers.common = {'Authorization': `Bearer ${productboardtoken}`}


    console.log('issue : ', issue.title);

    const PayloadSchema = {
//       issueCreatedBy: issue.user.login,
//       issueTitle: `#${issue.number} ${issue.title}`,
//       issueDescription: `${issue.body}\n\n\n${issue.html_url}\n`
      title: `#${issue.number} ${issue.title}`,
      content: `${issue.body}\n\n\n${issue.html_url}\n\n Comments: ${issue.comments}`,
      customer_email: issue.user.login,
      display_url: `${issue.html_url}`,
      source: {
        "origin": `${issue.user.organizations_url}`,
        "record_id": "123"
      },
      tags: [
        "user story"
      ]
    };

    console.log('payload : ', PayloadSchema);


    // const iftttPayload = {
    //   value1: PayloadSchema['issueCreatedBy'],
    //   value2: PayloadSchema['issueTitle'],
    //   value3: PayloadSchema['issueDescription'],
    // };

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
