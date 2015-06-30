Rolling out your new release into production is as simple as loading the release into the production environment and activating it.

## Rollout Changes

```bash
$ fleet env prod load 8ef9d2f

Release 8ef9d2f is now being loaded into environment prod

$ fleet env prod activate 8ef9d2f

Release 8ef9d2f is now being activated for environment prod
```

You will notice that within your environment it lists *autoscaling min/max server of 2/10* which means elastic computing is built into Fleet by default.

## Rollback Changes

The *exact same process* is used for rolling back releases as it is rolling out with Fleet - it's always good practice to leave the previous release loaded in production in the event that you need to
rollback quickly.

You can describe the prod environment to see available releases:
```bash
$ fleet env describe prod

----------------  -------------------------
name              prod
status            RUNNING
whitelist         allow-all
ssl certificate   prod
created           2015-03-24 23:06:21+00:00
updated           2015-06-09 02:49:21+00:00
health check      OFF
tracked branches  fleet-deploy
previous release
autoscaling min   2
autoscaling max   10
----------------  -------------------------

Releases:
name     status      loaded                     updated                      frontends
-------  ----------  -------------------------  -------------------------  -----------
8ef9d2f  * ACTIVE *  2015-06-09 01:50:25+00:00  2015-06-09 01:57:00+00:00            2
037205f  RUNNING     2015-03-26 07:28:21+00:00  2015-06-03 05:46:11+00:00            2

Endpoints:
--------  ------------------------------
admin     admin.prod.ancora.f.nchr.io
adminssh  adminssh.prod.ancora.f.nchr.io
www       www.prod.ancora.f.nchr.io
--------  ------------------------------
```
Then simply activate the previous release:
```bash
$ fleet env activate prod 037205f
Release 037205f is now being activated for environment prod
```
There you have it you've completed using continuous delivery with Fleet for a Magento store.
