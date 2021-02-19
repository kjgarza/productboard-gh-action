const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

async function run() {
  console.log('----------------------------------------------------------');
  try {
    const event = core.getInput('event', { required: true });
    const key = core.getInput('key', { required: true });
    const url = `https://maker.ifttt.com/trigger/${event}/with/key/${key}`;
    const octokit = github.context;
    const {issue} = octokit.payload;

    console.log('issue : ffff ', issue.issue);

    const PayloadSchema = {
//       issueCreatedBy: issue.user.login,
//       issueTitle: `#${issue.number} ${issue.title}`,
//       issueDescription: `${issue.body}\n\n\n${issue.html_url}\n`
      title: `#${issue.number} ${issue.title}`,
      content: `${issue.body}\n\n\n${issue.html_url}\n`,
      customer_email: issue.user.login,
      display_url: "https://www.example.com/deskdesk/notes/123",
      source: {
        "origin": "deskdesk",
        "record_id": "123"
      },
      tags: [
        "3.0",
        "important",
        "experimental"
      ]
    };

    const iftttPayload = {
      value1: PayloadSchema['issueCreatedBy'],
      value2: PayloadSchema['issueTitle'],
      value3: PayloadSchema['issueDescription'],
    };

    const {status, statusText, data} = await axios.post(url, iftttPayload);
    console.log('response : ', statusText, status , data);

    return { statusText, status, data };
  }
  catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}

run()
