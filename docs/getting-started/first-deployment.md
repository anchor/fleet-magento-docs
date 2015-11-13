# First Deployment

This will walk you through the steps involved in going from an empty Fleet
to a working site.

This document is not intended to be a substitute for proper git documentation. It's highly recommended that you read [Pro Git](http://git-scm.com/book), available both in print and for free online.

## Push code to deployment branch

```bash
git checkout fleet-deploy
git merge master
git push origin fleet-deploy
```

When you push a commit to your **fleet-deploy branch**, the **hook** sends off a request
to the **aux node** to start it building a new **release** based off that code.

## Log in to the aux node

In order to complete Fleet operations, you'll need to test you can log into the **aux node**.
From here you can run `fleet` commands.

```bash
ssh -t deploy@aux.{fleet-id}.f.nchr.io
```

An easier way to access fleet is to set up an alias.
Future examples will assume you have aliased the `fleet` command

```bash
alias fleet='ssh -t -o LogLevel=QUIET deploy@aux.{fleet-id}.f.nchr.io --'
```

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
