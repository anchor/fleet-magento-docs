# Pushing out a change to your site

## Create staging environment

If we want to make some changes to our production site, we need to test them first
to make sure they're not going to break anything. Fortunately, Fleet allows us to
quickly create a new **environment** from a snapshot of our production site that
is completely separated, so if anything breaks in the staging environment, it's
not going to affect production.

```bash
$ fleet env create staging
# Environment staging is now being created
```

![](/getting-started/fleet-new-env.png)

This process can take some time, so sit back and relax for a bit.
You can check the status as it updates with `fleet env list`.

```bash
$ fleet env list
# name     status     release
# -------  ---------  -------
# prod     RUNNING    7ea2c5e
# staging  CREATING

```

Once the status has changed to `RUNNING` you can load the new release ready to test your site in
staging.

_Please note creating a new environment will build a separate cluster of machine instances, be sure to
[clean up](/getting-started/cleaning-up-environments/) environments to **save you money**._

## Testing

You can connect to your site via www.staging.myshop.f.nchr.io and confirm
that everything is working as expected.

## Pushing another change

Should something not be quite right with the change you pushed, you can make
some changes and create a new **release** then load that into the existing
staging environment.

```bash
edit file.php
git add file.php
git commit -m 'fixed things in file.php!'
git push origin fleet-deploy
# pushed commit d9dcdd7
```

This will trigger the creation of a new **release** for commit `d9dcdd7`.

You check the progress with:

```bash
$ fleet release list
# name     status
# -------  ---------
# 7ea2c5e  AVAILABLE
# d9dcdd7  CREATING

# wait for the release to complete creating

$ fleet release list
# name     status
# -------  ---------
# 7ea2c5e  AVAILABLE
# d9dcdd7  AVAILABLE

$ fleet env load staging d9dcdd7
# Release d9dcdd7 is now being loaded into environment staging

$ fleet env describe staging
------------------  -------------------------
name                staging
status              RUNNING
active release      7ea2c5e
activating release
whitelist           sg-0b740f6e
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
7ea2c5e        RUNNING
d9dcdd7        LOADING
-------------  -----------------------------------------------------------------------

# wait for the environment to complete loading

$ fleet env describe staging
------------------  -------------------------
name                staging
status              RUNNING
active release      7ea2c5e
activating release
whitelist           sg-0b740f6e
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
7ea2c5e        RUNNING
d9dcdd7        RUNNING
-------------  -----------------------------------------------------------------------

#activate the release
$ fleet env activate staging d9dcdd7
#The release is now being activated

$ fleet env describe staging
------------------  -------------------------
name                staging
status              RUNNING
active release      d9dcdd7
activating release
whitelist           sg-0b740f6e
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
7ea2c5e        RUNNING
d9dcdd7        RUNNING
-------------  -----------------------------------------------------------------------


```
_Please note loading a new release into an environment will create a separate front-end cluster of machine instances, be sure to
[clean up](/getting-started/cleaning-up-releases/) releases to **save you money**._

## Pushing change into production

Once you're happy with the change you can promote it into
production with no downtime at all.

![](/getting-started/fleet-promote-to-prod.png)

The new release is first loaded in the existing environment,
then activated.
Once this is complete, incoming requests then hit the new
release. The old release can be unloaded later, once the new
release is confirmed to be functioning.

```bash
$ fleet env load prod d9dcdd7
# Release d9dcdd7 is now being loaded into environment prod

$ fleet env describe prod
------------------  -------------------------
name                prod
status              RUNNING
active release      7ea2c5e
activating release
whitelist           sg-0b740f6e
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
7ea2c5e        RUNNING
d9dcdd7        LOADING
-------------  -----------------------------------------------------------------------

$ fleet env activate prod d9dcdd7
# Release d9dcdd7 is now being activated

$ fleet env describe prod
------------------  -------------------------
name                prod
status              RUNNING
active release      d9dcdd7
activating release
whitelist           sg-0b740f6e
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
7ea2c5e        RUNNING
d9dcdd7        ACTIVE
-------------  -----------------------------------------------------------------------
```

## Rollback

Should anything go wrong after pushing a change and you need to roll-back, just activate the old release again.

```bash
$ fleet env activate prod 7ea2c5e
# Release 7ea2c5e is now being activated

$ fleet env describe prod
------------------  -------------------------
name                prod
status              RUNNING
active release      7ea2c5e
activating release
whitelist           sg-0b740f6e
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
7ea2c5e        ACTIVE
d9dcdd7        RUNNING
-------------  -----------------------------------------------------------------------

```
