You can access inactive releases via SSH to preform maintenance or debugging:

 * ssh `deploy@adminssh.<release_id>.<environment>.<fleet name>.f.nchr.io`

You can also access inactive releases via the web:

 * `http://admin.<release_id>.<environment>.<fleet name>.f.nchr.io`
 * `http://www.<release_id>.<environment>.<fleet name>.f.nchr.io`

>  Note that you will need to [disable Magento's automatic base-URL redirects](/configuring-magento-for-fleet/disable-redirects/) to access
these URLS.
