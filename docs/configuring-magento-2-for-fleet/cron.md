You will need to configure the Magento cron script to be executed periodically.

You can do this by supplying a [crontab](/configuring-magento-2-for-fleet/customisation/#providing-a-crontab)
file which will be loaded into cron on your admin instance.

In most cases, you will want to run the standard magento cron handler on the
admin node only, and only if the release the admin node belongs to is active.

Example .crontab-admin:

```
*/5 * * * * /usr/local/bin/is-fleet-node-active && /home/deploy/app/public/bin/magento cron:run
```
