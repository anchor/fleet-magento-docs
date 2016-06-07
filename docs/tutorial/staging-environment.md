Fleet allows you to create and destroy *on demand*
[environments](/how-to/manage-environments/) and optionally restrict access
using IP whitelists.

## Whitelist

You may optionally decide to limit access to a non-production environment.

```bash
$ fleet whitelist create office
Created whitelist office

$ fleet whitelist allow office xx.xx.xx.xx # replace xx with your IP address

$ fleet whitelist describe office
 - xx.xx.xx.xx/32
```

## Create

The following command will create an exact replica of the production
environment.  The latest database snapshot from the production environment will
be automatically loaded and a whitelist applied to restrict access to the
environment by IP.

```bash
$ fleet env create staging --source-environment prod --whitelist office
Environment staging is now being created
```

![](/tutorial/fleet-new-env.png)

You can now list the environments available to you and describe them.  Newly
created environments do not contain a release on first creation.  As such,
there are no public endpoint URLs to access.

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
whitelist         office
ssl certificate   self-signed
created           2015-06-09 00:34:51+00:00
updated           2015-06-09 01:10:35+00:00
health check      OFF
previous release
autoscaling min   2
autoscaling max   2
----------------  -------------------------

```

## SQL Scripts

Upon environment instantiation, requirement may exist to make updates to the
database to reflect the new environment.  For example, the Magento base URL
needs to be updated when you are accessing the application via a different
address.

Manual changes can be effected by connecting to the environment's database as
follows:
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

An alternative method makes use of Fleet's automatic [SQL
script](/how-to/manage-sql-scripts/) functionality.  When an environment is
instantiated, custom SQL can be automatically executed with templated
variables.  The `{{environment}}` variable is utilised in the following
example.  Use of the automated scripting mechanism is the preferred approach
and saves having to make manual changes with each new environment.

```bash
$ fleet config sql list
update-data-config

$ fleet config sql show update-data-config
----------%<-----------
USE ancora;
UPDATE core_config_data SET value = 'http://www.{{environment}}.ancora.f.nchr.io/' WHERE config_id = 10;
UPDATE core_config_data SET value = 'http://www.{{environment}}.ancora.f.nchr.io/' WHERE config_id = 11;
---------->%-----------
```

## Load Release

After an environment is created, a code revision can be loaded into it from the
release library.

```bash
$ fleet env load staging 8ef9d2f

Release 8ef9d2f is now being loaded into environment staging
```

![](/tutorial/fleet-load-release.png)

The environment can be described to verify the release is loaded:

```bash
$ fleet env describe staging

----------------  -------------------------
name              staging
status            RUNNING
whitelist         office
ssl certificate   self-signed
created           2015-06-09 00:34:51+00:00
updated           2015-06-09 01:10:35+00:00
health check      OFF
previous release
autoscaling min   2
autoscaling max   2
----------------  -------------------------

Releases:
name     status    loaded                     updated                      frontends
-------  --------  -------------------------  -------------------------  -----------
8ef9d2f  RUNNING   2015-06-09 01:16:22+00:00  2015-06-09 01:22:52+00:00            2
```
*A new cluster of servers is provisioned from an immutable artefact whenever a release is loaded.*

## Activate Release

A release must finally be activated such that it receives external traffic.

```bash
$ fleet env activate staging 8ef9d2f
Release 8ef9d2f is now being activated for environment staging
```

Post activation, the environment description will expose URL endpoints that can
be utilised to view the active release.

```bash
$ fleet env describe staging

----------------  -------------------------
name              staging
status            UPDATING
whitelist         office
ssl certificate   self-signed
created           2015-06-09 00:34:51+00:00
updated           2015-06-09 01:33:02+00:00
health check      OFF
previous release  None
autoscaling min   2
autoscaling max   2
----------------  -------------------------

Releases:
name     status      loaded                     updated                      frontends
-------  ----------  -------------------------  -------------------------  -----------
8ef9d2f  ACTIVATING  2015-06-09 01:16:22+00:00  2015-06-09 01:22:52+00:00            2

Endpoints:
--------       ---------------------------------
admin          admin.staging.ancora.f.nchr.io
adminssh       adminssh.staging.ancora.f.nchr.io
adminwildcard  *.admin.staging.ancora.f.nchr.io
www            www.staging.ancora.f.nchr.io
wwwwildcard    *.www.staging.ancora.f.nchr.io
--------       ---------------------------------
```

Fleet exposes a www endpoint for your staging environment.  In this case:
[www.staging.ancora.f.nchr.io](http://www.staging.ancora.f.nchr.io)

## Unit/User/Load Testing

Given *environments are all built off the same infrastructure template and machine image* you are guaranteed any unit/user or loading testing performed in staging will behave exactly the same as in
production. Further to that each environment is totally independent of one another and you can create/destroy them on demand so testing seamlessly becomes part of the deployment process.

Fleet instantiates environments using an identical blueprint to that of
production.  Likewise, releases represent immutable build artefacts that can be
used between environments.

Functional or load testing performed in a non-production environment will
operate to the same specification of the production environment.  Each
environment is independent and can be easily created or destroyed at will.

![](/tutorial/fleet-summary.png)

Anchor recommends the following tooling to facilitate load testing:

 * [https://blazemeter.com/](https://blazemeter.com/)
 * [https://www.blitz.io/](https://www.blitz.io/)

## Destroy

Once an environment has served its purpose, it may be destroyed.  Only pay for
the environment for as long as you require and promote your release to
production with confidence.

```bash
$ fleet env destroy staging

This will PERMANENTLY DESTROY environment staging!
Please review the details below:
----------------  -------------------------
name              staging
status            RUNNING
whitelist         office
ssl certificate   self-signed
created           2015-06-09 00:34:51+00:00
updated           2015-06-09 01:33:02+00:00
health check      OFF
previous release  None
autoscaling min   2
autoscaling max   2
----------------  -------------------------

Releases:
name     status      loaded                     updated                      frontends
-------  ----------  -------------------------  -------------------------  -----------
8ef9d2f  * ACTIVE *  2015-06-09 01:16:22+00:00  2015-06-09 01:22:52+00:00            2

Endpoints:
--------       ---------------------------------
admin          admin.staging.ancora.f.nchr.io
adminssh       adminssh.staging.ancora.f.nchr.io
adminwildcard  *.admin.staging.ancora.f.nchr.io
www            www.staging.ancora.f.nchr.io
wwwwildcard    *.www.staging.ancora.f.nchr.io
--------       ---------------------------------
Enter the environments name to proceed or anything else to abort
> staging
Environment staging is now being destroyed
```
