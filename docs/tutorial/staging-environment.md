Fleet allows you to create *on demand* [environments](/how-to/manage-environments/) and restrict access using IP whitelists.

## Whitelist

Before creating a staging environment you may want to limit access via IP addresses using a *IP whitelist* like so:

```bash
$ fleet whitelist create staging
Created whitelist staging
Connection to aux.ancora.f.nchr.io closed.

$ fleet whitelist allow staging xx.xx.xx.xx # replace xx with your IP address
Connection to aux.ancora.f.nchr.io closed.

$ fleet whitelist describe staging
 - xx.xx.xx.xx/32
Connection to aux.ancora.f.nchr.io closed.
```

## Create

With the following command will create an *exact replica of the highly available production environment* taking the latest snapshot of the database and limiting access to the staging IP white list:

```bash
$ fleet env create staging --source-environment prod --whitelist staging
Environment staging is now being created
Connection to aux.ancora.f.nchr.io closed.
```

![](/tutorial/fleet-new-env.png)

Now you can list your environments and describe the staging environment - when you first create an environment no code releases are loaded  hence there are no URL endpoints:

```bash
$ fleet env list

name     status    release      releases  certificate    created                    updated
-------  --------  ---------  ----------  -------------  -------------------------  -------------------------
staging  RUNNING                       0  self-signed    2015-06-09 00:34:51+00:00  2015-06-09 00:35:27+00:00
prod     RUNNING   037205f             1  prod           2015-03-24 23:06:21+00:00  2015-06-03 05:35:30+00:00

$ fleet env describe staging

----------------  -------------------------
name              staging
status            RUNNING
whitelist         staging
ssl certificate   self-signed
created           2015-06-09 00:34:51+00:00
updated           2015-06-09 01:10:35+00:00
health check      OFF
tracked branches  fleet-deploy
previous release
autoscaling min   2
autoscaling max   2
----------------  -------------------------
Connection to aux.ancora.f.nchr.io closed.

```

## SQL Scripts

Everytime you create a new environment you may want to make some automatic changes in the database such as changing the Magento base URLs. Now you could connect to the database directly and update it manually like so:
```bash

$ fleet database connect staging

Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 87639
Server version: 5.6.22-log MySQL Community Server (GPL)

Copyright (c) 2000, 2015, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> use ancora;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> UPDATE core_config_data SET value = 'http://www.staging.ancora.f.nchr.io/' WHERE config_id = 10;
mysql> UPDATE core_config_data SET value = 'http://www.staging.ancora.f.nchr.io/' WHERE config_id = 11;

```

Or instead the preferred method automatically with Fleet using [SQL script(s)](/how-to/manage-sql-scripts/) passing the {{environment}} variable which in this case we had already pre-configured for you:

```bash
$ fleet config sql list
update-data-config
Connection to aux.ancora.f.nchr.io closed.

$ fleet config sql show update-data-config
----------%<-----------
USE ancora;
UPDATE core_config_data SET value = 'http://www.{{environment}}.ancora.f.nchr.io/' WHERE config_id = 10;
UPDATE core_config_data SET value = 'http://www.{{environment}}.ancora.f.nchr.io/' WHERE config_id = 11;
---------->%-----------
```

## Load Release

Now load the latest code release from your release library into staging like so:

```bash
$ fleet env load staging 8ef9d2f

Release 8ef9d2f is now being loaded into environment staging
Connection to aux.ancora.f.nchr.io closed.
```

![](/tutorial/fleet-load-release.png)

Describe the staging environment to see that your release has been loaded:

```bash
$ fleet env describe staging

----------------  -------------------------
name              staging
status            RUNNING
whitelist         staging
ssl certificate   self-signed
created           2015-06-09 00:34:51+00:00
updated           2015-06-09 01:10:35+00:00
health check      OFF
tracked branches  fleet-deploy
previous release
autoscaling min   2
autoscaling max   2
----------------  -------------------------

Releases:
name     status    loaded                     updated                      frontends
-------  --------  -------------------------  -------------------------  -----------
8ef9d2f  RUNNING   2015-06-09 01:16:22+00:00  2015-06-09 01:22:52+00:00            2
```
*Everytime you load a release into an environment we build a new front-end cluster of servers (typically two)*.

## Activate Release

Now activate your release so you can view it.

```bash
$ fleet env activate staging 8ef9d2f
Release 8ef9d2f is now being activated for environment staging
Connection to aux.ancora.f.nchr.io closed.
```

Now that your release has been activated Fleet has attached URL endpoints so you can preview your staging environment:

```bash
$ fleet env describe staging

----------------  -------------------------
name              staging
status            UPDATING
whitelist         staging
ssl certificate   self-signed
created           2015-06-09 00:34:51+00:00
updated           2015-06-09 01:33:02+00:00
health check      OFF
tracked branches  fleet-deploy
previous release  None
autoscaling min   2
autoscaling max   2
----------------  -------------------------

Releases:
name     status      loaded                     updated                      frontends
-------  ----------  -------------------------  -------------------------  -----------
8ef9d2f  ACTIVATING  2015-06-09 01:16:22+00:00  2015-06-09 01:22:52+00:00            2

Endpoints:
--------  ---------------------------------
admin     admin.staging.ancora.f.nchr.io
adminssh  adminssh.staging.ancora.f.nchr.io
www       www.staging.ancora.f.nchr.io
--------  ---------------------------------
Connection to aux.ancora.f.nchr.io closed.
```
Fleet has attached an www URL End point of [www.staging.ancora.f.nchr.io](http://www.staging.ancora.f.nchr.io) for your staging environment.

## Unit/User/Load Testing

Given *environents are all built off the same infrastructure template and machine image* you are guaranteed any unit/user or loading testing performed in staging will behave ecactly the same as in
production. Further to that each environment is totally independent of one another and you can create/destroy them on demand so testing seamlessly becomes part of the deployment process.

![](/tutorial/fleet-summary.png)

Our recommendations for tooling to use to test your store are: 

 * [https://blazemeter.com/](https://blazemeter.com/)
 * [https://www.blitz.io/](https://www.blitz.io/)

## Destroy

Once you've finished testing on staging and the client has approved the changes you can destroy your staging environment to help infrastructure costs then rollout your changes into production.

```bash
$ fleet env destroy staging

This will PERMANENTLY DESTROY environment staging!
Please review the details below:
----------------  -------------------------
name              staging
status            RUNNING
whitelist         staging
ssl certificate   self-signed
created           2015-06-09 00:34:51+00:00
updated           2015-06-09 01:33:02+00:00
health check      OFF
tracked branches  fleet-deploy
previous release  None
autoscaling min   2
autoscaling max   2
----------------  -------------------------

Releases:
name     status      loaded                     updated                      frontends
-------  ----------  -------------------------  -------------------------  -----------
8ef9d2f  * ACTIVE *  2015-06-09 01:16:22+00:00  2015-06-09 01:22:52+00:00            2

Endpoints:
--------  ---------------------------------
admin     admin.staging.ancora.f.nchr.io
adminssh  adminssh.staging.ancora.f.nchr.io
www       www.staging.ancora.f.nchr.io
--------  ---------------------------------
Enter the environments name to proceed or anything else to abort
> staging
Environment staging is now being destroyed
Connection to aux.ancora.f.nchr.io closed.
```
