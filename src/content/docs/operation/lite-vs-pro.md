---
title: Lite vs Pro
description: Uplink has 2 modes lite and pro. Here we take a look at the difference.
---

Uplink comes in 2 modes: Lite and Pro. Here we take a look at the difference.


## Lite

When you set up your cluster, you will be set up with the `lite` version of Uplink. This enables easy provisioning and will run the `uplink-caddy` router on a single node on your cluster. It doesn't use an external database (it has it's own internal postgresql instance).

## Pro

The `pro` version of Uplink requires an external postgresql database. It can also run in more than a single node on your cluster. This means the `pro` version provides redundancy for `uplink-caddy` which serves traffic to your apps.

### Future Plans

Given that Uplink `pro` is backed by an external database this opens up many possibilities for what we can achieve.

+ **Vault** -  `Vault` will let `enterprise` users avoid storing any secrets on OpsMaru cloud. With `vault` enabled on their cluster through Uplink `pro`, secret management becomes completely isolated to the customer's infrastructure. OpsMaru only serves as the front-end for adding / updating secrets and users have the option of 'flushing' secrets from OpsMaru, leaving the data only on their internal vault / infrastructure.
