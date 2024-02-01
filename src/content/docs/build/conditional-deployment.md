---
title: Conditional Deployment
description: This guide shows you how to customize your deployment workflow to only deploy when a previous workflow succeeds.
---

The default out-of-the-box `deployment.yml` will deploy every time you push to one of the 3 branches and configured in the `push` section:

```yaml title=".github/workflows/deployment.yml"
on:
  push:
    branches:
      - main
      - master
      - develop
```

You can customize this based on your needs. You may have a CI workflow that runs tests and you only want to deploy when the tests pass. You can do this by configuring the `on` section to your `deployment.yml` file.

```yaml title=".github/workflows/deployment.yml"
on:
  workflow_run: 
    workflows: ["CI"]
    branches: [master, develop]
    types: 
      - completed
```

## Adding condition

In your `jobs` section you will also need to add an `if`

```yaml title=".github/workflows/deployment.yml"
jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
```

## Swapping out References

Given that the deployment will now be triggerd by another workflow instead of a push, the action will not have access to the correct `ref` and `sha`. We need to reference the `ref` and `sha` from the workflow that triggered the `deployment`.

You will also need to replace the following values:

+ From `${{ github.ref }}` to `${{ github.event.workflow_run.head_branch }}`.
+ From `${{ github.sha }}` to `${{ github.event.workflow_run.head_sha }}`.
