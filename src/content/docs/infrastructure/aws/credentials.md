---
title: Credentials
description: Retrieving your aws credentials.
---

To provision your aws resources you'll need to generate some credentials to put into your terraform configuration.

Head over to the `IAM` dashboard in AWS. Click on the `Users` link on the sidebar.

![IAM](../../../../assets/infrastructure/aws/user-iam.png)

## Create User

Click on the `Create user` button. 

![Create user](../../../../assets/infrastructure/aws/create-user.png)

This will bring you to a form, type in a `User name`, and proceed to the next screen.

### Attach Policy

![Attach user policy](../../../../assets/infrastructure/aws/user-attach-policy.png)

Click on the `Attach policies directly` option. Then search for `Admin` then select the `AdministratorAccess` and scroll down at hit `Next`.

## Create Credential

Next browse to the page of the user you just created.

