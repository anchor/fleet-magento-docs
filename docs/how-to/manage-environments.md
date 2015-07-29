Environment management is the main functionality you will be interacting with.

This is the tool you will be using to push code through testing in non-production environments
and into production.


Creating a new environment
----

Environments can be created either as a copy of an existing environment, or as a fresh environment.
You can also specify a specific snapshot to be used to seed the database for the environment.

```
$ fleet env create [--snapshot SNAPSHOT | --no-snapshot] [--source-environment ENVIRONMENT | --no-source-environment] [--ssl-certificate CERT] [--whitelist WHITELIST] NAME
```

To create an environment 'staging' as a copy of 'prod' with the latest snapshot of 'prod'
```
$ fleet env create staging
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
tracked branches  fleet-deploy
previous release  f7ac77a
autoscaling min   1
autoscaling max   2
----------------  -------------------------

Releases:
name     status      loaded                     updated                      frontends
-------  ----------  -------------------------  -------------------------  -----------
c341606  * ACTIVE *  2015-05-07 16:54:34+10:00  2015-05-12 16:25:58+10:00            1

Endpoints:
--------  ---------------------------------
admin     admin.prod.example.f.nchr.io
adminssh  adminssh.prod.example.f.nchr.io
www       www.prod.example.f.nchr.io
--------  ---------------------------------
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

This operation cannot be performed on your production environment.

```
$ fleet env deactivate <environment_name>
```

Unloading a release
----

Unloading a release will release all the resources used to run that release.
Until a release is unloaded, it is still running and consuming resources.

If the release to be unloaded is active, it will first be deactivated automatically.
You cannot unload the active release for your production environment.

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

