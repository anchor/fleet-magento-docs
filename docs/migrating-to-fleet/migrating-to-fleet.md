This procedure is a start-to-finish outlining a full migration from an external hosted Magento, to Fleet.


Perform initial Magento config fixup
----

Taken from https://docs.anchor.net.au/system/fleet/Migrating-a-customer

1. [Disable automatic redirects to the Base URL](../configuring-magento-for-fleet/disable-redirects.md)
2. [Push all assets into the database](../configuring-magento-for-fleet/media-in-database.md)
3. Should [fix the cookie domain problem](../configuring-magento-for-fleet/unset-cookie-domain.md) too


Get your new Fleet
----

This is an internal process:

1. [Create the fleet](https://docs.anchor.net.au/system/fleet/Building-a-new-Fleet)
2. [Create the *prod* environment](https://docs.anchor.net.au/system/fleet/Create-a-new-environment)


Gitify your codebase
----

[Setup your git repo](../getting-started/configuring-revision-control.md) with the necessary branch and hooks.

It goes roughly like:

1. Have a copy of your Magento directory on your workstation (whatever goes in `public_html`, etc)
2. Make a git repo and push it to Github/Bitbucket, here's an example for Github:
    ```
    git init
    git add .
    git commit -m "first commit"
    git remote add origin git@github.com:YOURNAME/propitious-octo-tribble.git
    ```
3. Push to a repo on Github/Bitbucket: `git push -u origin master;  git branch fleet-deploy;  git push origin fleet-deploy`
4. Install the deployment key into your repo, this will allow Fleet to grab a copy of your code when you deploy
5. Add the post-receive hook to call the Fleet's aux box when you commit to the `fleet-deploy` branch


Add Redis
----

At some point we need to [setup Redis for sessions and caching](../configuring-magento-for-fleet/configure-cache-and-sessions.md)


Dump the DB
----

Make sure all media is synced to the DB, you should've done this earlier. This means that images and other store assets are stored as blobs in there.

Dump the DB:

```text
mysqldump --quick --complete-insert --quote-names magento | gzip > magento-database-dump.sql.gz
```

Put the dump on your workstation or somewhere convenient.


Import the DB
----

**XXX:** this will be easier once we have a nice DNS name for the admin box in the prod environment. At the moment you can use something like this, but it's fugly: `mysql.fleet-FLEETNAME-prod-chassis-1bj6v6kbcexqp.database.ancora.f.nchr.io`. Ideally you'd pass the DB dump to the aux box, then connect to RDS from there.

2. Send the dump to the admin box in the target environment. For the sake of migration, we assume that you're using the first environment, *prod*.  
  ```text
  scp  magento-database-dump.sql.gz  <admin-public-ip>:/root/
  ```
3. Login to the new MySQL instance that belongs to the environment.  
  ```text
  ssh <admin-public-ip>

  mysql -h mysql -u master -p<30-char-DBPassword-stored-in-the-cloud-config-bucket> mysql
  ```
4. Setup the new database and grant privileges  
  ```sql
  CREATE DATABASE magento ;

  GRANT ALL PRIVILEGES ON magento.* TO 'magento' IDENTIFIED BY 'magento' WITH GRANT OPTION ;
  FLUSH PRIVILEGES ;
  \q
  ```
5. Disable binary logging on the RDS instance. This is technically optional, but improves performances particularly with large imports. In accordance with this [AWS guide](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Importing.html), we'll disable binary logging for the duration of the import.
  1. Head to the AWS RDS console: https://console.aws.amazon.com/rds/home
  2. Select *Instances* from the menu on the left, then find your environment's MySQL instance in the list
  3. Instance Actions -> Modify
  4. Set the *Backup Retention Period* to 0 days, and tick the *Apply Immediately* checkbox at the bottom
  5. Click through and confirm your changes. You'll need to wait a bit for the changes to kick in, about 5-10min until the *DB Instance Status* on the dashboard changes from *Modifying* to *Available*.
6. Import the dump  
  ```shell
  zcat magento-database-dump.sql.gz  |  perl -pe 's/\sDEFINER=`[^`]+`@`[^`]+`/ DEFINER=CURRENT_USER()/'  |  mysql -h mysql -u magento -pmagento magento
  ```
  Because MySQL is a pain in the arse, we have to mangle the SQL a bit so that triggers can be created successfully.
7. Re-enable binary logging on the instance by following the same steps you used to disable logging, setting the Backup Retention Period back to 10 days (or whatever it was before you set it to 0).


Codebase and config
----

You put your code in a git repo earlier, right? Great! Let's patch the Magento config to work in the Fleet environment.

This assumes you already have Redis configured in Magento.

1. Update `app/etc/local.xml` with the new parameters:  
  ```diff
  --- a/app/etc/local.xml
  +++ b/app/etc/local.xml
  @@ -40,7 +40,7 @@
               </db>
               <default_setup>
                   <connection>
  -                    <host><![CDATA[localhost]]></host>
  +                    <host><![CDATA[mysql]]></host>
                       <username><![CDATA[magento]]></username>
                       <password><![CDATA[magento]]></password>
                       <dbname><![CDATA[magento]]></dbname>
  @@ -62,7 +62,7 @@
         <cache>
           <backend>Cm_Cache_Backend_Redis</backend>
           <backend_options>
  -          <server>localhost</server>
  +          <server>redis-cache</server>
             <port>6379</port>
             <database>0</database>
             <force_standalone>0</force_standalone>
  @@ -75,7 +75,7 @@
         </cache>
         <session_save><![CDATA[db]]></session_save>
         <redis_session>
  -          <host>localhost</host>
  +          <host>redis-session</host>
             <port>6379</port>
             <password></password>
             <timeout>2.5</timeout>
  ```
2. Commit to the new branch (`fleet-deploy`), push to Bithub, which should trigger a release-build on the aux box.


First deploy
----

1. Login to the aux box
2. `su - deploy`
3. `fleet env list` to find the new RELEASE_ID
4. `fleet env load prod $RELEASE_ID`
5. Wait a little while
6. `fleet env activate prod $RELEASE_ID`
7. Wait a littler while
8. Huge success!


View and testing
----

Hopefully your release was successful. You should now you have a couple of useful DNS names for testing and access:

* admin.fleet-ancora-prod.ancora.f.nchr.io
* www.fleet-ancora-prod.ancora.f.nchr.io


### Debone the configs

* Your images and static assets probably aren't working, you'll need to figure out what's going on there.








Cloudflare integration
----

Do we do that here?


Enable caching
----

Ensure it's well-behaved too. Is this the right place for it?


SSL certs
----

[Order and install SSL certificates](../how-to/manage-certificates.md), and ensure they're working properly


DNS things
----

Verify that they have a DNS entry that points the root of the domain to `www`


Go-live checklist
-----------------

This list should be a bunch of things that are already working. If you can tick
all the boxes, you're safe to go live on Fleet.

* Your *prod* environment:
    * is running
    * has a loaded release
    * has a suitable certificate associated with it (probably not self-signed)

    It should look something like this:

        deploy@aux-example:~$ fleet env list
        name    status    release      releases  certificate    created                    updated
        ------  --------  ---------  ----------  -------------  -------------------------  -------------------------
        prod    RUNNING   a1b2e3f             2  www_exmpl      2015-06-23 06:16:45+00:00  2015-07-20 05:15:31+00:00


Flip the switch and go live
----

FIXME: how and where is this done?

