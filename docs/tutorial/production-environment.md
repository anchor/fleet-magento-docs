Releasing code to production is as simple as loading the pre-built release into
the environment and subsequently activating it.

## Rollout Changes

Load and activate your release.

```bash
$ fleet env prod load 8ef9d2f

Release 8ef9d2f is now being loaded into environment prod

$ fleet env prod activate 8ef9d2f

Release 8ef9d2f is now being activated for environment prod
```

## Rollback Changes

Activating a release will cause it to receive traffic.  Rolling back to a
previous release is achieved by activating it again.

Rolling back is significantly quicker if the previous release is still loaded
in the environment.  It is good practice to leave your previous release loaded
until you are satisfied you do not require an immediate rollback.

The production environment can be inspected to see available releases:
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

*Note* the autoscaling metrics in the prior description.  Fleet autoscales the
application tier by default.

To roll back, activate the previous release:
```bash
$ fleet env activate prod 037205f
Release 037205f is now being activated for environment prod
```
