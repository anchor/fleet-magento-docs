This walkthrough assumes you have already configured your CLI tooling by aliasing the ``fleet`` command.  Please re-visit the [introduction](introduction.md) if you have not yet done so.

# Bootstrap your trial

You'll need to create an initial environment to host your site. We've preloaded a snapshot for use as a demo store.

```bash
$ fleet env create --snapshot demo-magento --no-source-environment prod
```

This will create a new environment, restoring the database contents from the snapshot.

# Loading the first release

Our Fleet's production environment is currently sitting there doing nothing, so
let's make it get to work by loading a release into it.

![](/trial/fleet-load-release.png)

The **release name** is based on the **git commit id**.

When first pushing a new release, it will appear as **CREATING** as all the Machine Images are created. Once this is complete it will change to **AVAILABLE**, and you're ready to **load** it into an Environment.

Once we've picked the release we want to load: `0a9999d` in this case, we can
load it into an environment, in this case the `prod` environment.


## Inspect available releases

First we'll need to see which releases are available:

```bash
$ fleet release list
name     status     modified                   message
-------  ---------  -------------------------  ----------------------------
5d04f61  AVAILABLE  2015-04-15 01:03:08+00:00  Add demo store skin images
0a9999d  AVAILABLE  2015-04-15 01:02:32+00:00  Install Turpentine extension
```

## Load the release

```bash
$ fleet env load prod 0a9999d
# Release 0a9999d is now being loaded into environment prod


# You can always get a list of environments and see their current status with:
$ fleet env list
# name  status   release
# ----  -------  -------
# prod  LOADING  0a9999d

#And a list of which releases are loaded into an environment with:
$ fleet env describe prod
------------------  -------------------------
name                prod
status              RUNNING
active release
activating release
whitelist           allow-all
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
0a9999d        RUNNING
-------------  -----------------------------------------------------------------------

```

A status of **LOADING** means that the Release is being loaded into the Environment. When it's done it will change to **RUNNING**.


## Activating the Release

Once you have a release loaded, you can activate it to receive traffic. Only a single release can be active at any one time.

```bash
$ fleet env activate prod 0a9999d
#Release 0a9999d is now being activated for environment prod

$ fleet env describe prod
------------------  -------------------------
name                prod
status              RUNNING
active release      0a9999d
activating release
whitelist           allow-all
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
0a9999d        RUNNING
-------------  -----------------------------------------------------------------------

```

# Testing!

Your site should now be live at [www.prod.myshop.f.nchr.io](http://www.prod.myshop.f.nchr.io/).  You will need to correct `myshop` to match the name of your Fleet.

You can now log into the admin at [admin.prod.myshop.f.nchr.io](http://admin.prod.myshop.f.nchr.io/)
and make sure everything is working as expected and make any changes you need to
for production.

For the demo store, credentials are:  
username: admin  
password: NCHqHiRF4b6a

If you need to load data into your database you can connect to
[adminer.prod.myshop.f.nchr.io/](http://adminer.prod.myshop.f.nchr.io/) and upload your SQL.

If you're familiar with PhpMyAdmin, [Adminer](http://www.adminer.org/) works in much the same way.

 * Click **Import**
 * Choose Files: Select your SQL file.
 * Click **Execute**
 * Wait for the upload to complete

# Pushing out a change to your site

## Create staging environment

If we want to make some changes to our production site, we need to test them first
to make sure they're not going to break anything. Fortunately, Fleet allows us to
quickly create a new **environment** from a snapshot of our production site that
is completely separated, so if anything breaks in the staging environment, it's
not going to affect production.

This process may take 15 minutes or so.

![](/trial/fleet-new-env.png)

```bash
$ fleet env create staging
# Environment staging is now being created
```

You can check the status as it updates with `fleet env list`.

```bash
$ fleet env list
# name     status     release
# -------  ---------  -------
# prod     RUNNING    0a9999d
# staging  CREATING

```

Once the status has changed to `RUNNING` you can load the new release ready to test your site in
staging.

## Testing

You can connect to your site via the WWW endpoint, e.g. www.staging.myshop.f.nchr.io, and confirm
that everything is working as expected.

## Pushing another change

Should something not be quite right with the change you pushed, you can make
some changes and create a new **release** then load that into the existing
staging environment.

For the demo store we've set up for you, the first release is missing some images for the site logo.

You can go ahead and load the release containing the fix (5d04f61)

```bash
$ fleet env load staging 5d04f61
# Release 5d04f61 is now being loaded into environment staging

$ fleet env describe staging
------------------  -------------------------
name                staging
status              RUNNING
active release
activating release
whitelist           allow-all
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
5d04f61        LOADING
-------------  -----------------------------------------------------------------------

# wait for the environment to complete loading

$ fleet env describe staging
------------------  -------------------------
name                staging
status              RUNNING
active release
activating release
whitelist           allow-all
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
5d04f61        RUNNING
-------------  -----------------------------------------------------------------------

#activate the release
$ fleet env activate staging 5d04f61
#The release is now being activated

$ fleet env describe staging
------------------  -------------------------
name                staging
status              RUNNING
active release      5d04f61
activating release
whitelist           allow-all
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
5d04f61        RUNNING
-------------  -----------------------------------------------------------------------


```

# Pushing change into production

Once you're happy with the change you can promote it into
production with no downtime at all.

![](/trial/fleet-promote-to-prod.png)

The new release is first loaded in the existing environment,
then activated.
Once this is complete, incoming requests then hit the new
release. The old release can be unloaded later, once the new
release is confirmed to be functioning.

```bash
$ fleet env load prod 5d04f61
# Release 5d04f61 is now being loaded into environment prod

$ fleet env describe prod
------------------  -------------------------
name                prod
status              RUNNING
active release      0a9999d
activating release
whitelist           allow-all
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
0a9999d        RUNNING
5d04f61        LOADING
-------------  -----------------------------------------------------------------------

$ fleet env activate prod 5d04f61
# Release 5d04f61 is now being loaded into environment prod

$ fleet env describe prod
------------------  -------------------------
name                prod
status              RUNNING
active release      5d04f61
activating release
whitelist           allow-all
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
0a9999d        RUNNING
5d04f61        RUNNING
-------------  -----------------------------------------------------------------------
```

# Rollback

Should anything go wrong after pushing a change and you need to roll-back, just activate the old release again.

```bash
$ fleet env activate prod 0a9999d
# Release 0a9999d is now being loaded into environment prod

$ fleet env describe prod
------------------  -------------------------
name                prod
status              RUNNING
active release      0a9999d
activating release
whitelist           allow-all
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
0a9999d        RUNNING
5d04f61        RUNNING
-------------  -----------------------------------------------------------------------

```

# Cleaning up environments

Since each environment is using up resources and costing you money,
no need to keep them around once you're done testing.

**Note**: You **cannot undo** this, however you can always create a new environment and load the same release, but you'll lose anything that changed in the database, since the new environment will be created from a snapshot of production.

```bash
$ fleet env destroy staging
# This will PERMANENTLY DESTROY environment staging!
# Please review the details below:
# ---------------  -------------------------
# name             staging
# status           RUNNING
# current release  5d04f61
# loading release  5d04f61
# created          2014-09-24 13:36:17+10:00
# updated          2014-09-24 15:00:56+10:00
# endpoints
# ---------------  -------------------------
# Enter the environment's name to destroy it, or anything else to
# abort
staging
# Environment staging is now being destroyed

$ fleet env list
# name     status      release
# -------  ----------  -----------
# prod     RUNNING     5d04f61
# staging  DESTROYING  5d04f61
```

# Cleaning up releases

Once you are happy that a new release is working in production, you can unload the old release to save you money.

```bash
$ fleet env unload production 0a9999d

# Release 5d04f61 is now being unloaded from environment prod

$ fleet env describe prod
------------------  -------------------------
name                prod
status              RUNNING
active release      5d04f61
activating release
whitelist           allow-all
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
5d04f61        RUNNING
-------------  -----------------------------------------------------------------------
```

# Misc
## Adding SSH Keys

We'll preload your first SSH key so you can get in, after that you can add and remove keys at your leisure.

```bash
$ fleet key add testkey
Please enter your SSH public key. End with EOF.
----------%<-----------
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAz9ez0XtWR8exwSwmUdE5Gy8i1qoBa7vJI18hB+9FKpHvPK+7TUwxwtvdp2vBPfQcP2Pu4bL5EsWYwpCIQ2LlFeooqjeNIsoGxvqVmiNF+ax5uS83r3kzPVKhhoaT6PSj8zZY6JlzDUUA0TU9IrPDquV/u8YApixwP53z4hmcCI6QaVNF/1zrrxzDsJDSJxDXSSRIstE8YgsyNf8yrT3LNTjIp5zmHtnJzm24IuGqLGRRuONri5yPjB0393oSOs9yH1ex9YogeQBRlS7JTSb1Hqa0WIU8qrCt4HwMwSNHPUphTOB/nrpafmalA9XJcOYGPCMswSCPgGuJ7jT2HMREvw==
^D

$ fleet key list
# name      key            last_modified
# -------   ------------   -------------
# testkey   AAAAB3Nza...   ...

$ fleet key remove testkey
```
