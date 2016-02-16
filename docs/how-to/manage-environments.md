Environment management is the main functionality you will be interacting with.

This is the tool you will be using to push code through testing in non-production environments
and into production.


Creating a new environment
----

Environments can be created either as a copy of an existing environment, or as a fresh environment.
You can also specify a specific snapshot to be used to seed the database for the environment.

The size of the environment can be specified with `--size` followed by one of the [plan names](/plans).

You can choose whether a new environment will be HA (Multi-AZ) with `--ha` or
`--no-ha`.  
Multi-AZ environments are recommended only for production and mission critical
environments, as this significantly increases costs.

```
$ fleet env create [--snapshot SNAPSHOT | --no-snapshot] [--source-environment ENVIRONMENT | --no-source-environment] [--ssl-certificate CERT] [--whitelist WHITELIST] [--ha | --no-ha] [--size SIZE] [--protected] NAME
```

To create an environment 'staging' as a copy of your "default environment" with its latest snapshot
```
$ fleet env create staging
```

By default your "default environment" is 'prod', you change change this with

```
$ fleet config default-env prod2
Set default environment to 'prod2'
```

and check the current default with

```
$ fleet config default-env
Default environment is 'prod2'
```

To create an environment 'test' as a copy of 'staging' with a specific snapshot of 'prod'
```
$ fleet env create --snapshot prod-2015-01-01 --source-environment staging test
```

To create an environment 'test' as a copy of 'staging' with the latest snapshot of 'staging'
and using the 'devs' whitelist.
```
$ fleet env create --source-environment staging --whitelist devs test
```

To create an environment 'test' as a copy of 'prod' with the latest snapshot of your default environment,
with high availability disabled
```
$ fleet env create --no-ha test
```

Passing `--protected` will prevent the environment from being accidentally
destroyed, and having the active release unloaded. This is useful for production environments.

_Please note creating a new environment will build a separate cluster of machine instances, be sure to
[clean up](/getting-started/cleaning-up-environments/) environments to **save you money**._

Destroying an environment
----

When an environment is no longer needed, you can destroy it.

This shuts down all the resources associated with the environment and
saves a final snapshot in case you want to recreate the environment at a later
time.

```
$ fleet env destroy <environment_name>
```

Describing an environment
----

You can use the describe command to get a detailed view of an environment.
This includes all the loaded releases, properties of the environment and the
endpoints used to access the environment.

```
$ fleet env describe <environment_name>
```

```
$ fleet env describe prod
----------------  -------------------------
name              prod
status            RUNNING
whitelist         allow-all
ssl certificate   self-signed
created           2015-04-30 14:34:55+10:00
updated           2015-05-13 20:36:18+10:00
recycling         ON
size              f1-large
solr              OFF
maintenance mode  OFF
tracked branches  fleet-deploy
previous release  f7ac77a
autoscaling min   1
autoscaling max   2
ha                ON
workers/instance  100
----------------  -------------------------

Releases:
name     status      loaded                     updated                      frontends
-------  ----------  -------------------------  -------------------------  -----------
c341606  * ACTIVE *  2015-05-07 16:54:34+10:00  2015-05-12 16:25:58+10:00            1

Endpoints:
--------       ---------------------------------
admin          admin.prod.example.f.nchr.io
adminssh       adminssh.prod.example.f.nchr.io
adminwildcard  *.admin.prod.example.f.nchr.io
www            www.prod.example.f.nchr.io
wwwwildcard    *.www.prod.example.f.nchr.io
--------       ---------------------------------
```

Managing releases within an environment
----

Releases represent packaged versions of your site code.

Each release needs to be first 'loaded' into an environment to
create the resources required to serve the release. The release
then needs to be 'activated' to serve traffic.

Once a release is no longer required, it should be 'unloaded' to
release the resources used to run the release.

Loading a release
----

Loading a release creates the resources such as machine instances required to serve the release.

```
$ fleet env load <environment_name> <release_id>
```

So to load the release '2efc12' to the environment 'staging'
```
$ fleet env load staging 2efc12
```

_Please note loading a new release into an environment will create a separate cluster of machine instances, be sure to
[clean up](/getting-started/cleaning-up-releases/) inactive releases to **save you money**._

Activating a release
----

Activating a release makes it the release which receives traffic for an environment.

Only a single release can be active for an environment at any one time. When one release
is activated, the previously activated release will be deactivated automatically.

```
$ fleet env activate <environment_name> <release_id>
```

So to activate the release '2efc12' for the environment 'staging'
```
$ fleet env activate staging 2efc12
```

Deactivating a release
----

Deactivating a release will allow you to disable the active release for an environment from receiving traffic.

This operation cannot be performed on a protected environment.

```
$ fleet env deactivate <environment_name>
```

Unloading a release
----

Unloading a release will release all the resources used to run that release.
Until a release is unloaded, it is still running and consuming resources.

If the release to be unloaded is active, it will first be deactivated automatically.
You cannot unload the active release for a protected environment.

```
$ fleet env unload <environment_name> <release_id>
```

Changing the SSL certificate used
----

```
$ fleet env cert <environment_name> <certificate_name>
```

Controlling unhealthy instance behaviour
----

When an instance is determined unhealthy via the health check, you can control what action
is taken.

You can either have the instance removed from the load balancer, or have the instance destroyed and recreated.

To turn on instance recycling for an environment:
```
$ fleet env recycling <environment_name> ON
```

To turn off instance recycling
```
$ fleet env recycling <environment_name> OFF
```

Changing autoscaling limits
---

You can change the maximum and minimum number of frontends to keep active for each release loaded
into an environment.

This will not change the number of frontends currently active, unless the current number lies outside
the new limits.

Note that you can [view autoscaling history through the logs](/how-to/manage-logs/#viewing-a-log).

```
$ fleet env autoscaling limits <environment_name> <minimum> <maximum>
```

Setting the number of active frontends
---

You can set the number of frontends to keep active immediately for a loaded release.
This can be used to prewarm a release before activating for production or in anticipation of increased traffic.

Note that autoscaling will proceed as normal once the new settings are applied.

```
$ fleet env autoscaling desired <environment_name> <release_id> <desired>
```

Changing the whitelist used for an environment
----

IP based whitelists can be used to restrict access to environments.

By default a whitelist named 'allow-all' is used which gives unrestricted access to your environment. This should generally be used for your production environment.

```
$ fleet env whitelist <environment_name> <whitelist_name>
```

Enabling and disabling Solr for an environment
----

Solr can be enabled or disabled on a per environment basis.


```
$ fleet env solr <environment_name> ON
Solr for Environment <environment_name> is now being turned ON
```

When Solr is ON a instance will be created in the specified environment
which can be accessed via the `solr` endpoint which will available to all
releases loaded after Solr is enabled.

```
$ fleet env solr <environment_name> OFF
Solr for Environment <environment_name> is now being turned OFF
```

This will disable Solr and destroy the environment's Solr instance.

See [Configuring Solr](../configuring-magento-for-fleet/solr) for full Solr configuration instructions.

Enabling and disabling Maintenance Mode for an environment
----

Maintenance Mode can be enabled or disabled on a per environment basis.


```
$ fleet env maintenance <environment_name> ON
Maintenance Mode for Environment <environment_name> is now being turned ON
```

When Maintenance Mode is ON, frontends and admin nodes will create `maintenance.flag` in the
[Document Root](../configuring-magento-for-fleet/customisation.md#using-a-custom-document-root).

**WARNING**: This change may take up to a minute to apply to all nodes, ensure
you wait until this time has lapsed before performing maintenance.


```
$ fleet env maintenance <environment_name> OFF
Maintenance Mode for Environment <environment_name> is now being turned OFF
```

When Maintenance Mode is OFF, frontends and admin nodes will remove `maintenance.flag` in the
[Document Root](../configuring-magento-for-fleet/customisation.md#using-a-custom-document-root).

This change may take up to a minute to apply to all nodes.

Set worker counts per instance
----

Set the number of application worker processes per instance.

You can additionally set this to `AUTO` which will use a default based on the
instance type, which should be suitable for most Magento installations, but
may require tuning for your particular application.

```
$ fleet env workers <environment_name> <workers_per_instance>
Workers per instance for Environment <environment_name> is set to <workers_per_instance>
This affects newly loaded releases only.
```

Flushing caches for an environment
----

Caches are maintained on a per environment basis and can be flushed
for all releases in an environment.

```
$ fleet env cache flush <environment_name>
Caches flushed for environment <environment_name>
```

Set up New Relic Integration
---------------------

Fleet can integrate with your New Relic account to provide you
with insight into your application's performance.

You can set your New Relic licence for an environment with:

```
fleet env newrelic '<env_name>' --newrelic-licence '<your newrelic licence key>'
Set NewRelic licence for '<env_name>' to '<your newrelic licence key>'.
This will apply only to newly loaded releases.
```

Any new releases loaded after this will report to NewRelic using the given licence key.
These will report with the Application Name: `fleet-<fleet name>-<environment>-<role>`.

You can disable New Relic for newly loaded releases with:

```
fleet env newrelic '<env_name>' --clear-newrelic-licence
Removed NewRelic licence.
This will apply only to newly loaded releases.
```

You can check the current licence key for an environment with:

```
fleet env describe '<env_name'>
...
newrelic          <key>
...
```

Controlling Protected status
----------------------------

The protected status is used to protect against destroying an environment or
removing the last active release for an environment. It should generally be
set to ON for the environment serving your production traffic.

You must turn the protected state to OFF before you can destroy an environment.

```
fleet env protected <environment_name> ON
The protected state for Environment <environment_name> is now being set to ON
```
