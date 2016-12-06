# First Deployment

This will walk you through the steps involved in going from an empty Fleet to a working site.

This document is not intended to be a substitute for proper git documentation. It's highly recommended that you read [Pro Git](http://git-scm.com/book), available both in print and for free online.

## Loading your database

You'll need to create an initial database and set up any required users to access the database.

```bash
$ fleet database connect prod
mysql> CREATE DATABASE application;
Query OK, 1 row affected (0.00 sec)

mysql> GRANT ALL PRIVILEGES ON application.* TO appuser@'%' IDENTIFIED BY '{password}';
Query OK, 0 rows affected (0.00 sec)

mysql> ^DBye
```

You can then load any required schema/data into your new database.

```bash
$ cat database.sql
use application;

-- Database contents

$ fleet database connect prod < database.sql

```

## Create your first release

A "release" is a combination of your code and our base images. Once a release is created, it becomes an immutable artefact and it will be consistent whenever you load it into an environment.

Depending on which application you are running, the recommended release creation method may be different.

### Magento 1

You can create a release straight from your git repo. You can just simply run the following command:
```bash
$ fleet release create master
```

Note that the "master" above refers to the name of a branch on git. You can use any branch to create a release.

### Magento 2

You will need to create an archive of your code and import it directly into fleet. The format of the archive file should be tar.gz. You can read more about creating an archive in our [FAQ](/faq/archive-for-release/) section. Once you created it, you will need to store in a location that is accessible by a url. Then you can create a release by running the following command:

```bash
$ fleet release create --url https://example.com/foo.tar.gz master
```
## Loading the first release

Our Fleet's production environment is currently sitting there doing nothing, so
let's make it get to work by loading a release into it.

First we'll need to see which releases are available:

```bash
$ fleet release list
# name     status
# -------  ---------
# 7ea2c5e  AVAILABLE
```

The **release name** is based on the **git commit id**.

When first pushing a new release, it will appear as **CREATING** as all the Machine Images are created. Once this is complete it will change to **AVAILABLE**, and you're ready to **load** it into an Environment.

Once we've picked the release we want to load: `7ea2c5e` in this case, we can
load it into an environment, in this case the `prod` environment.

![](/getting-started/fleet-load-release.png)

```bash
$ fleet env load prod 7ea2c5e
# Release 7ea2c5e is now being loaded into environment prod


# You can always get a list of environments and see their current status with:
$ fleet env list
# name  status   release
# ----  -------  -------
# prod  LOADING  7ea2c5e

#And a list of which releases are loaded into an environment with:
$ fleet env describe prod
------------------  -------------------------
name                prod
status              RUNNING
active release
activating release
whitelist           sg-12345678
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
7ea2c5e        RUNNING
-------------  -----------------------------------------------------------------------

```

A status of **LOADING** means that the Release is being loaded into the Environment. When it's done it will change to **RUNNING**.

Once you have a release loaded, you can activate it to receive traffic. Only a single release can be active at any one time.
```bash
$ fleet env activate prod 7ea2c5e
#Release 7ea2c5e is now being activated for environment prod

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
-------------  -----------------------------------------------------------------------

```
_Please note loading a new release into an environment will create a separate front-end cluster of machine instances, be sure to
[clean up](/getting-started/cleaning-up-releases/) releases to **save you money**._

## Testing!

Your site should now be live at ``http://www.prod.{fleet-id}.f.nchr.io/``.

You can now log into the admin at ``http://admin.prod.{fleet-id}.f.nchr.io/``
and make sure everything is working as expected and make any changes you need to
for production.
