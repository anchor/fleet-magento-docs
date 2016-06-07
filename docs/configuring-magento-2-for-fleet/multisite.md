If you intend to run a multisite Magento store, there are a few things you will need to do.

## Configure store codes by domain

In order to tell Magento which store view to use, you will need to configure your
.htaccess file to pass the MAGE_RUN_CODE and MAGE_RUN_TYPE environment variables.

```
SetEnvIf Host (www\.)?mystore\.com MAGE_RUN_CODE=mystore
SetEnvIf Host (www\.)?mystore\.com MAGE_RUN_TYPE=website
SetEnvIf Host (www\.)?myotherstore\.com MAGE_RUN_CODE=myotherstore
SetEnvIf Host (www\.)?myotherstore\.com MAGE_RUN_TYPE=website
```

## Use the right SSL certificate

You will need to make sure that the SSL certificate you use is valid for all the domains
you want the Fleet to serve. Depending on the domains you intend to serve, either the domains
should be covered by a wildcard, or the domains should be listed as alternate names on
the certificate.
