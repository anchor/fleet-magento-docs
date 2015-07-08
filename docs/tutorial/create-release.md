You should now clone the repository for the [demo Magento
store](http://www.prod.ancora.f.nchr.io) locally onto your work station and
make a commit.  Subsequently pushing your change to the remote will instruct
Fleet to build a new release.  This release is stored within the [release
library](how-to/manage-releases/).

## Clone

Download the code repository locally on your work station:

```bash
$ git clone git@bitbucket.org:ancora/demo-magento-store.git
```

## Commit Changes

Use your preferred text editor to modify the index.php file, in the example
below we are using *vim*:

```bash
$ cd ./demo-magento-store/
$ vim index.php # change text from release 1.0.0 to 1.0.1

1 <?php
2
3 echo "This a new release 1.0.1";
4
5 /**
6 * Magento
7 *
8 * NOTICE OF LICENSE
```

## Push Changes

You have two (2) options here you can either push out a release automatically
via the special *fleet-deploy* branch:

You can create releases in one of two ways:

Firstly, by committing to the `fleet-deploy` branch:

```bash
$ git commit -m 'Pushing out release 1.0.1' .
$ git checkout fleet-deploy
$ git merge master
$ git push
```

Or manually like so:

```bash
$ fleet release create {COMMIT_SHA}
```

Every time you create a release, Fleet will generate an artefact combining your
latest commit with Fleet's stored application image.  This artefact is
subsequently stored within the [release library](how-to/manage-releases/).

![](/getting-started/fleet-push-release.png)

## Release Library

Fleet exposes a release library which allows you to manage your releases so you
can load and activate them into environments. To view your releases simply run:
```bash
$ fleet release list

name    status    modified                  message
------- --------- ------------------------- -------------------------
8ef9d2f CREATING  2015-06-04 02:10:41+00:00 Pushing out release 1.0.1
037205f AVAILABLE 2015-03-26 07:07:29+00:00 Pushing out release 1.0.0
```
