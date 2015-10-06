Magento's assets need to be stored in MySQL so that they are accessible from each application server. The use of Varnish as well as the presence of a CDN means that the performance impact of storing assets in the database is negligible.

### Preparation

MySQL media storage must first be enabled in Magento and the existing assets copied to the database from the filesystem. To do so, access the admin panel and navigate to `Configuration` -> `Advanced` -> `System` -> `Storage Configuration for Media`.

Once there, ensure that the following are configured:

* Media Storage: **Database**
* Select Media Database: **default_setup**
* Run: **Synchronize**

**Warning:** If Magento's assets are not stored in the database you may experience intermittent missing images around the site as some frontends may not have all images stored locally.

#### Ongoing Maintenance

Assets uploaded via the catalogue editor in Magento's admin panel will automatically be added to the database.

Third-party Magento modules are not always compliant with these interfaces so
we have provided a script that you can periodically via cron to add new media
from the **admin** node to the media database, and copy media from the database
to the **frontend** nodes.

If you wish to alter the behaviour you can provide your own script along with
your code instead.

See the [crontab documentation](/configuring-magento-for-fleet/customisation/#providing-a-crontab)

```no-highlight
# .crontab-admin
# This will copy updated files from admin's media directory to the database every minute
* * * * *    deploy  /usr/local/bin/is-fleet-node-active && nice -n 19 flock -n /tmp/magento_media_sync.lock -c '/usr/local/bin/magento_media_sync put >> /home/deploy/.fleet-webroot/var/log/media_sync.log'
```

```no-highlight
# .crontab-fe
# This will copy updated files from the database to each frontend every 5 minutes
*/5 * * * *    deploy  /usr/local/bin/is-fleet-node-active && nice -n 19 flock -n /tmp/magento_media_sync.lock -c '/usr/local/bin/magento_media_sync get >> /home/deploy/.fleet-webroot/var/log/media_sync.log'
```

**Warning**: If you use this script we recommend adding an index on `core_file_storage.upload_time` as this is used for finding the recently uploaded files and this can be slow without an index on this column.

```
CREATE INDEX IDX_CORE_FILE_STORAGE_UPLOAD_TIME ON core_file_storage (upload_time)
```


**Warning**: There is an issue with Magento's media database where it uses **case-insensitive** columns for file names, this means that if you have two files that have the same path other than the case.  
eg. `media/A/B.JPG` and `media/a/b.jpg` only one of these will be stored in the media database and when magento tries to load the other one it will result in an exception.  
You can avoid this issue by ensuring that there are no files with the same names with differing case, alternatively **ALTER** the `core_file_storage` and `core_directory_storage` table to use **BINARY** columns for `name`,`filename`,`directory` and `path`.

**Warning**: Magento's `core_file_storage.filename` and `core_directory_storage.name` are limited to 100 characters.
  If you have file with names longer than 100 characters may encounter duplicate key errors when synchronising media.
  To solve this, you can run:

```
ALTER TABLE core_file_storage MODIFY name VARCHAR(255)
ALTER TABLE core_directory_storage MODIFY name VARCHAR(255)
```

If you are running any Third-party Magento modules or custom code that stores media assets in non-standard media directories, ensure you add the directory to the **allowed_resources** list in the module's `etc/config.xml` or the frontend nodes will be unable to access the content.

Example `config.xml`:

```xml
<?xml version="1.0"?>
<config>
   <default>
      <system>
         <media_storage_configuration>
             <allowed_resources>
                <mymodule_folder>mymodule</mymodule_folder>
             </allowed_resources>
         <media_storage_configuration>
      </system>
   </default>
</config>
```
