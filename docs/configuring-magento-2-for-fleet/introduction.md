For Magento to work correctly on Fleet:

 1. Configure the Magento cron job
 2. Disable automatic redirects
 3. Configure Magento to store its cache and sessions in redis
 4. Configure Magento to use varnish as a full-page cache
 5. Push assets into the database

As these steps are performed against Magento's database they do not need to be
performed every time you create a new environment.

Some of these steps will require that you access Magento's admin interface, while
others must be performed before you load your first release.
Assuming you've imported your database and activated a release you can reach
the admin interface at a URL like the one below.

```
https://admin.prod.FLEET-ID.f.nchr.io/admin/
```
