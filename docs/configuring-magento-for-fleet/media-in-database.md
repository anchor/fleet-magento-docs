Magento's assets need to be stored in MySQL so that they are accessible from each application server. The use of Varnish as well as the presence of a CDN means that the performance impact of storing assets in the database is negligible.

### Preparation

MySQL media storage must first be enabled in Magento and the existing assets copied to the database from the filesystem. To do so, access the admin panel and navigate to `Configuration` -> `Advanced` -> `System` -> `Storage Configuration for Media`.

Once there, ensure that the following are configured:

* Media Storage: **Database**
* Select Media Database: **default_setup**
* Run: **Synchronize**

> **Warning:** If Magento's assets are not stored in the database you may experience intermittent missing images around the site as some frontends may not have all images stored locally.

#### Ongoing Maintenance

Assets uploaded via the catalogue editor in Magento's admin panel will automatically be added to the database.

> **Note**: We have configured a script that will run periodically to add new media from the **admin** node to the media database. This script will log to Magento's `var/log/media_sync.log`.

> **Warning**: There is an issue with Magento's media database where it uses **case-insensitive** columns for file names, this means that if you have two files that have the same path other than the case. eg. `media/A/B.JPG` and `media/a/b.jpg` only one of these will be stored in the media database and when magento tries to load the other one it will result in an exception. You can avoid this issue by ensuring that there are no files with the same names with differing case, alternatively **ALTER** the `core_file_storage` and `core_directory_storage` table to use **BINARY** columns for `name`,`filename`,`directory` and `path`.

> If you are running any Third-party Magento modules or custom code that stores media assets in non-standard media directories, ensure you add the directory to the **allowed_resources** list in the module's `etc/config.xml` or the frontend nodes will be unable to access the content.

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
