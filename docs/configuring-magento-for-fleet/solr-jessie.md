**Note:** This documentation applies only if you are using a Debian Jessie-based Fleet.
If you are not using Jessie, see the [Solr](solr) page.


If you wish to use Magento Enterprise's [Solr](http://lucene.apache.org/solr/) Search on Fleet
you can enable Solr for your environment and configure Magento to use it.

### Enabling and Disabling Solr

To enable Solr on an Environment run `fleet env solr <environment> ON`

A new Solr instance will be created, this will take
a few minutes before it's ready.

**Note:** Only releases loaded *after* Solr is enabled will be able to access
Solr.

Later if you wish to disable Solr, you can run `fleet env solr <environment> OFF`


```sh
fleet env describe prod
----------------  -------------------------
name              prod
status            RUNNING
whitelist         test
ssl certificate   test
created           2015-04-30 14:34:55+10:00
updated           2015-07-23 16:31:53+10:00
health check      OFF
solr              ON                       # Solr now enabled
previous release  ecc1e5c
autoscaling min   1
autoscaling max   1
----------------  -------------------------

Releases:
name     status      loaded                     updated                      frontends
-------  ----------  -------------------------  -------------------------  -----------
784eb43  * ACTIVE *  2015-07-22 16:08:41+10:00  2015-07-22 16:14:03+10:00            1

Endpoints:
--------  ---------------------------------
admin     admin.prod.myshop.f.nchr.io
adminssh  adminssh.prod.myshop.f.nchr.io
solr      solr.prod.myshop.f.nchr.io      # New Solr Endpoint
www       www.prod.myshop.f.nchr.io
--------  ---------------------------------
```

You should now be able to ssh to `deploy@solr.prod.myshop.f.nchr.io`
If it doesn't work at first, keep trying, it can take a few minutes before the new instance
has fully booted. You can now log out.

### Configuring Solr

You can now upload your Solr configuration files to `/etc/solr/conf` via SFTP.
Once you've uploaded your configuration files, you can restart Solr.

**Note**: Solr configuration and data will not be cloned when you create a new environment.

### Starting and Stopping Solr

ssh to the deploy user at your Solr endpoint from `env describe`.

 * to check the current status of Solr run `sudo systemctl status jetty8`
 * to start a stopped Solr run `sudo systemctl start jetty8`
 * to restart a running Solr run `sudo systemctl restart jetty8`
 * to stop a running Solr run `sudo systemctl stop jetty8`
 * to view the log of the running Solr run `journalctl -u jetty8`

### Configuring Magento Enterprise to use Solr Search

Now from Magento, you can configure it to point at your Solr instance.

 1. Log into your Magento Admin.
 1. System > Configuration > Catalog > Catalog > Catalog Search
     1. Use the following settings:

        Setting              | Value
        -------              | -----
        Search Engine        | `Solr`
        Solr Server Hostname | `solr`
        Solr Server Port     | 8080

     1. Press "Test Connection"
        * If everything is working, you should see "**Successful! Test again?**"
        * If not, check the Solr logs for errors and ensure you are using the correct Solr configuration files.
     1. Press "Save Config"


### Configuring Magento for Solarium

 1. Log into your Magento Admin.
 1. System > Configuration > Catalog > Solarium Search
     1. Use the following settings:

        Setting        | Value
        -------        | -----
        Enabled        | `Yes`
        Hostname or IP | `solr`
        Port           | `8080`
        Path           | `/solr/`

     1. Press "Test Connection"
        * If everything is working, you should see "**Success**"
        * If not, check the Solr logs for errors and ensure you are using the correct Solr configuration files.
     1. Press "Save Config"

### Generating Solr Index
 1. Log into your Magento Admin.
 1. System > Index Management
     * Reindex "Catalog Search Index"
     * or from the adminssh endpoint under your Magento root directory, run `php shell/indexer.php --reindex catalogsearch_fulltext`
