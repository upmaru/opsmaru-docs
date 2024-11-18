---
title: Deploy a Phoenix App
description: This guide will walk you through deploying a Phoenix application to OpsMaru.
---

Once you have provisioned your infrastructure by running it using terraform, the next step is getting your application deployed. This guide will show you how to configure your phoenix app for deployment.

:::note[Connect your repo]
Make sure you have [connected your repository](/docs/application/connect-repository/) to OpsMaru. You should see your app in the `Existing Apps` tab.
:::

Click on `Configure` on the target app you want to deploy.

![app directory](../../../../assets/application/app-directory.png)

## Elixir / Phoenix Build Pack

Elixir and Phoenix have similar build commands so they share the same build pack.

![build pack config](../../../../assets/application/phoenix/build-pack-config.png)

In this guide we're choosing the following:

+ base-elixir-phoenix
  + postgresql

If you don't see the add-on or pack you want to use, please [reach out](https://github.com/orgs/upmaru/discussions). We will work towards getting the add-on you want into our platform.

Choose the version of elixir you wish to use. We currently support 4 versions. Please make sure you've tested and made sure your application is compatible with the version you select.


## Configuration Generation

Once you click `Next` you'll be able to see a preview and breakdown of the configuration that will be delivered to your application.

![generated config](../../../../assets/application/phoenix/generated-config.png)

This configuration is meant as a starting point for your application. You can configure this further once it's submitted to your repository as a pull-request. 

You'll notice that the build command looks like the following:

```bash
export MIX_ENV=prod

mix local.hex --force
mix local.rebar --force
mix do deps.get --only prod

# npm --prefix ./assets install ./assets

# Comment out mix assets.deploy for non phoenix apps
mix assets.deploy

mix release
```

The build command for elixir projects and phoenix is actually the same `mix release`. The only difference is with phoenix you need to compile the assets. If you are not using phoenix simply comment out the un-necessary lines.



### App Name
When you generate an app whith underscore in the name for example axigbe_chat. You will get the follwing error 
when deploying 
```bash
cp: cannot stat '/home/runner/work/axigbe_chat/axigbe_chat/.apk/axigbecode/axigbe_chat/src/_build/prod/rel/axigbe-chat/*': No such file or directory
```
This error is due to `mix release`.  When running `mix release` it will generate `_build/prod/rel/axigbe_chat/` 
but the code generator is producing `_build/prod/rel/axigbe-chat/`

To fix this, you first have to change the `destinations:` config and the `binary` as well.
The destination folder becomes `_build/prod/rel/axigbe_chat/` and the binary should be `axigbe_chat`
not `axigbe-chat`
 
```bash
  destinations:
    - _build/prod/rel/axigbe_chat/*
```
and your run section should look like the following: 

```bash
run:
  name: axigbe-chat
  commands:
    - name: migrate
      binary: axigbe_chat
      call: "eval AxigbeChat.Release.Tasks.migrate"
    - name: console
      binary: axigbe_chat
      call: remote
    - binary: tail
      call: -f -n 100 /var/log/axigbe-chat/current
      name: logs
      path: /usr/bin
  services:
    - name: web
      binary: axigbe_chat
      start:
        call: start
```
 

 



Once you're happy merge your pull-request and the build process should begin.