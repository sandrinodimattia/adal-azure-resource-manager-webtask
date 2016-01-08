# ADAL - Azure Resource Manager REST API sample Webtask

A webtask that shows how you can easily interact with the Azure Resource Manager REST API with ADAL and a Webtask. This will get an `accessToken` using ADAL which is then used to get the 5 first resources from your subscription.

## Configure Webtask

If you haven't configured Webtask on your machine run this first:

```
npm i -g wt-cli
wt init
```

> Requires at least node 0.10.40 - if you're running multiple version of node make sure to load the right version, e.g. "nvm use 0.10.40"

## Deployment

First you'll need to create the webtask in your own container:

```
wt create https://raw.githubusercontent.com/sandrinodimattia/adal-azure-resource-manager-webtask/master/task.js --name azure-rm-sample
```

This will return a url which you can then use as follows (eg: using Postman, by browsing to that url, ...):

```
https://webtask.it.auth0.com/api/run/wt-MY_WEBTASK_ACCOUNT/azure-rm-sample?AD_CLIENT_ID=YOUR_CLIENT_ID&AD_SERVICE_PRINCIPAL_PASSWORD=YOUR_PASSWORD&AD_TENANT_ID=YOUR_TENANT_ID&AZURE_SUBSCRIPTION_ID=YOUR_SUBSCRIPTION_ID
```

And finally the sample will return the five first records:

```
[
  {
    "id": "/subscriptions/e5a1d0a0-c791-xxxxxxxx/resourceGroups/a0-something/providers/Microsoft.ClassicCompute/domainNames/something-adfs",
    "name": "something-adfs",
    "type": "Microsoft.ClassicCompute/domainNames",
    "location": "westus"
  },
  {
    "id": "/subscriptions/e5a1d0a0-c791-xxxxxxxx/resourceGroups/a0-something/providers/Microsoft.ClassicCompute/domainNames/something-dc",
    "name": "something-dc",
    "type": "Microsoft.ClassicCompute/domainNames",
    "location": "westus"
  },
  {
    "id": "/subscriptions/e5a1d0a0-c791-xxxxxxxx/resourceGroups/a0-something/providers/Microsoft.ClassicCompute/domainNames/something-w5yobqsa",
    "name": "something-w5yobqsa",
    "type": "Microsoft.ClassicCompute/domainNames",
    "location": "westus"
  },
  {
    "id": "/subscriptions/e5a1d0a0-c791-xxxxxxxx/resourceGroups/a0-something/providers/Microsoft.ClassicCompute/virtualMachines/something-adfs",
    "name": "something-adfs",
    "type": "Microsoft.ClassicCompute/virtualMachines",
    "location": "westus"
  },
  {
    "id": "/subscriptions/e5a1d0a0-c791-xxxxxxxx/resourceGroups/a0-something/providers/Microsoft.ClassicCompute/virtualMachines/something-dc",
    "name": "something-dc",
    "type": "Microsoft.ClassicCompute/virtualMachines",
    "location": "westus"
  }
]
```
