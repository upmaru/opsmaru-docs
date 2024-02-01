---
title: PAKman Github Action
description: PAKman is a build system for building packages for your application.
---

PAKman is available to users as a github action. This guide will give you a breakdown of how PAKman works as a github action. When you use the Application setup in our app you will also get the deployment.yml configuration for your github actions.

```yaml title=".github/workflows/deployment.yml"
name: 'Deployment'

on:
  push:
    branches:
      - main
      - master
      - develop

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout'
        uses: actions/checkout@v4
        with:
          ref: ${{ github.ref }}
          fetch-depth: 0

      - name: Setup Pakman
        uses: upmaru/pakman@v8
        with:
          alpine: v3.19

      - name: Bootstrap Configuration
        run: |
          pakman bootstrap
        shell: alpine.sh {0}
        env:
          ABUILD_PRIVATE_KEY: ${{secrets.ABUILD_PRIVATE_KEY}}
          ABUILD_PUBLIC_KEY: ${{secrets.ABUILD_PUBLIC_KEY}}

      - name: 'Build Package'
        run: |
          cd "$GITHUB_WORKSPACE"/.apk/"$GITHUB_REPOSITORY" || exit

          abuild snapshot
          abuild -r
        shell: alpine.sh {0}

      - name: Upload Artifact
        uses: actions/upload-artifact@v4
        with:
          name: ${{ runner.arch }}
          path: /home/runner/packages

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    steps: 
      - name: Checkout
        uses: actions/checkout@v4

      - uses: actions/download-artifact@v4
        with: 
          path: /home/runner/artifacts

      - name: Setup Pakman
        uses: upmaru/pakman@v8
        with:
          alpine: v3.19

      - name: Merge Artifact
        run: |
          cp -R /home/runner/artifacts/X64/. /home/runner/packages/
          sudo zip -r /home/runner/packages.zip "$HOME"/packages
        shell: alpine.sh {0}

      - name: Push
        run: pakman push
        shell: alpine.sh {0}
        env:
          WORKFLOW_REF: ${{ github.ref }}
          WORKFLOW_SHA: ${{ github.sha }}
          INSTELLAR_ENDPOINT: https://opsmaru.com
          INSTELLAR_PACKAGE_TOKEN: ${{secrets.INSTELLAR_PACKAGE_TOKEN}}
          INSTELLAR_AUTH_TOKEN: ${{secrets.INSTELLAR_AUTH_TOKEN}}
```

## Build

In PAKman v8 the build and deploy steps are separate. This is to allow for a retry of the deployment without having to rebuild the package. This is important because the build process can be time consuming and we want to avoid unnecessary rebuilds.

### Setup Pakman

The `upmaru/pakman@v8` github action uses the `setup-alpine` action underneath. This basically sets up alpine linux as chroot inside the default ubuntu runtime in github actions. You can customize the version of alpine using the `with` option.

```yaml
- name: Setup Pakman
  uses: upmaru/pakman@v8
  with:
    alpine: v3.19
```

### Bootstrap

The `pakman bootstrap` command essentially reads the configuration from `instellar.yml` which is covered in the [previous page](/docs/build/pakman/), and renders all the configuration files necessary for the build.

We also pass the command 2 environment variables `ABUILD_PRIVATE_KEY` and `ABUILD_PUBLIC_KEY`. These keys were setup on your repository by OpsMaru automatically when you [connected your repository](/docs/application/connect-repository/) 😉.

```yaml
- name: Bootstrap Configuration
  run: |
    pakman bootstrap
  shell: alpine.sh {0}
  env:
    ABUILD_PRIVATE_KEY: ${{secrets.ABUILD_PRIVATE_KEY}}
    ABUILD_PUBLIC_KEY: ${{secrets.ABUILD_PUBLIC_KEY}}
```

### Build Package

In the next step the action will run `abuild` which is the tool used for building alpine packages.


```yaml
- name: 'Build Package'
  run: |
    cd "$GITHUB_WORKSPACE"/.apk/"$GITHUB_REPOSITORY" || exit

    abuild snapshot
    abuild -r
  shell: alpine.sh {0}
```

### Upload Artifact

This is a standard github action. All it does is upload the built artifact. The artifact is stored on github's storage, and will be evicted based on your configuration in github. This step is important because it prevents rebuilding when we need to retry a deployment as you'll see in the next section.

```yaml
- name: Upload Artifact
  uses: actions/upload-artifact@v4
  with:
    name: ${{ runner.arch }}
    path: /home/runner/packages
```

## Deploy

The `deploy` step pushes the package to your configured s3 compatible `storage`. This means your source code / builds never pass OpsMaru's infrastructure.

### Download Artifact

We download the artifact from the previous step.

```yaml
- uses: actions/download-artifact@v4
  with:
    path: /home/runner/artifacts
```

### Setup Pakman

Since we want to run pakman in alpine we'll setup PAKman again. This is not time consuming because PAKman utilizes caching on github action. If PAKman is already built it will simply load the cache. This is another feature of PAKman v8.

```yaml
- name: Setup Pakman
  uses: upmaru/pakman@v8
  with:
    alpine: v3.19
```

### Merge Artifact

In this step we take all the artifacts built as separate X64 or in the future arm architecture and we merge them into a single zip file.

```yaml
- name: Merge Artifact
  run: |
    cp -R /home/runner/artifacts/X64/. /home/runner/packages/
    sudo zip -r /home/runner/packages.zip "$HOME"/packages
  shell: alpine.sh {0}
```

### Push

This is the final step, we push all the necessary built files to your storage on your infrastructure.

```yaml
- name: Push
  run: pakman push
  shell: alpine.sh {0}
  env:
    WORKFLOW_REF: ${{ github.ref }}
    WORKFLOW_SHA: ${{ github.sha }}
    INSTELLAR_ENDPOINT: https://opsmaru.com
    INSTELLAR_PACKAGE_TOKEN: ${{secrets.INSTELLAR_PACKAGE_TOKEN}}
    INSTELLAR_AUTH_TOKEN: ${{secrets.INSTELLAR_AUTH_TOKEN}}
```


