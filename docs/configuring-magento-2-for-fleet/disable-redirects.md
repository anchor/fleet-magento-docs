Before pushing your site to Fleet, be sure to disable Magento's automatic Base URL Redirects which will cause problems when you
want to use multiple environments as Magento will redirect visitors to a canonical web address by default.

This feature needs to be *disabled* for sites running on Fleet in order for the Magento admin panel to be accessible in non-production environments. If left enabled, visitors to `admin.dev.myshop.f.nchr.io/admin` would be redirected back to `www.myshop.com`.

This can be disabled in by logging into Magento's admin panel, navigating to `Configuration` -> `General` -> `Web` -> `Url Options`, then updating the following settings:

* Auto-redirect to Base URL: **No**

Alternatively, you can disable it with the following SQL query:

`UPDATE core_config_data SET value = 0 where path = 'web/url/redirect_to_base';`
