Magento's sitemaps work by generating a file on a regular basis on each instance.

As frontends are generally not running the main Magento cron process, alternate
means need to be used for sitemaps.

There are several options which will work, which option is used will depend on the
requirements for your site.

### Scheduled generation

Each frontend can invoke the sitemap_generate job though cron, and on boot. This
will ensure the sitemap is generated when the frontend starts, and is updated at
a known interval after boot.

You will need a mechanism (such as the [Aoe_Scheduler](https://github.com/AOEpeople/Aoe_Scheduler/) plugin)
which allows execution of individual jobs from the command line.

Example cron fragment:

```
*/5 * * * * cd /home/deploy/.fleet-webroot && php scheduler.php -action runNow -code sitemap_generate
```

### Proxying to admin node

You can use mod_rewrite configured through .htaccess to proxy requests to the sitemap to the admin
node, where the standard Magento cron runs and generates the sitemap. This has the advantage of
ensuring the sitemap is always in sync across all frontends and admin node, and allows manual updates
of the sitemap to take effect immediately.

Note that this also means that the sitemap would be unavailable if the admin node is unavailable for
any reason.

Example .htaccess fragment:

```
RewriteCond %{SERVER_NAME} www\.(.*)
RewriteRule sitemap\.xml http://admin.%1/sitemap.xml [P]
```

### Scheduled fetch from admin node

You could use a script to fetch the sitemap from the admin node on a schedule, rather than generating
it locally on the frontends. This should result in less load on the database to generate sitemaps,
though the updates would then become dependent on the admin node's availability.

Example script (executed from crontab-fe)

```
#!/usr/bin/bash

ENVIRONMENT=$(/usr/local/bin/get-userdata-value fleet_environment)
wget -O /home/deploy/.fleet-webroot/sitemap.xml http://admin.${ENVIRONMENT}.myfleet.f.nchr.io/sitemap.xml
```
