

# :rocket: Product Board Github Action


GitHub action that pull Github Issues into Product Board by simply trigger an webhook event when a github issue has been tagged with a specific label. This makes it easy to manage and sync your Github work with a Product Board-based workflow. You can customize the label to be used.
## Usage

Set the label you want to control the action with and you productboard token.

```yaml
jobs:
  productboard:
    if: github.event.label.name == 'to_productboard'
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: kjgarza/productboard-gh-action@v1
      with:
        milliseconds: 1000
        event: "github_issue"
        productboardtoken: ${{ PRODUCTBOARD_TOKEN }}
```

## LICENSE 📋
[Licensed under the MIT License (the "License")](./LICENSE);
