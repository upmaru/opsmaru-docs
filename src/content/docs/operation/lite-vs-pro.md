---
title: Lite vs Pro
description: Uplink has 2 modes lite and pro. Here we take a look at the difference.
---

Uplink comes in 2 modes. Lite and Pro. Here we take a look at the difference.


## Lite

When you setup your cluster you will be setup with the `lite` version of uplink. This enables easy provisioning and will run the `uplink-caddy` router on a single node on your cluster. It doesn't use an external database (it has it's own internal postgresql instance).

## Pro

The `pro` version of uplink requires an external postgresql database. It can also run in more than single node on your cluster. This means the `pro` version provides redundancy for `uplink-caddy` which serves traffic to your apps.

### Future Plans

Given that uplink `pro` is backed by an external database this opens up many possibilities for what we can achieve.

+ **Vault** -  Will enable `enterprise` users to not store any secrets on OpsMaru cloud. With `vault` enabled on their cluster through uplink `pro` secret management becomes completely isolated to the customer's infrastructure. OpsMaru only serves as the front-end for adding / updating secrets, users have the option of 'flushing' secrets from OpsMaru, leaving the data only on their intenral vault.