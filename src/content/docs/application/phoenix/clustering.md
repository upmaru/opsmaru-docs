---
title: Clustering for your Elixir / Phoenix App
description: This guide will show you how to setup automated clustering for your Elixir / Phoenix application.
---

Elixir apps support clustering out of the box. Clustering can bring many advantages like:

+ Distributed Caching
+ Fault Tolerance
+ Distributing workload across cluster

## libcluster

If you wish to use clustering in your application please make sure you have `:libcluster` installed as a dependency. We also have a [hex package](https://hex.pm/packages/libcluster_uplink) that will make it easy for clustering your application.

```elixir
def deps do
  [
    {:libcluster, "~> 3.0"},
    {:libcluster_uplink, "~> 0.2.0"}
  ]
end
```

Then simpl add the following to your `config.exs` file.

```elixir
config :libcluster,
  topologies: [
    example: [
      strategy: Cluster.Strategy.Uplink,
      config: [
        app_name: "example-app"
      ]
    ]
  ]
```

This will enable automated clustering for your application inside the OpsMaru provisioned cluster.


