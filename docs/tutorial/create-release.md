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

Every time you create a release, Fleet will generate an artefact combining your
latest commit with Fleet's stored application image.  This artefact is
subsequently stored within the [release library](how-to/manage-releases/).

![](/getting-started/fleet-push-release.png)

There are three ways of registering a release with fleet.

 1. Automatically via the special *fleet-deploy* branch
 2. From a git object
 3. From an archive


### Via the fleet-deploy branch

If you've set up the fleet webhook in your git repository then releases will
automatically be created whenever code is pushed to the *fleet-deploy* branch.

For example, the following sequence of commands would merge code from the
*master* branch into the *fleet-deploy* branch and push it.

```bash
$ git checkout master
$ git commit -m 'Pushing out release 1.0.1' .
$ git checkout fleet-deploy
$ git merge master
$ git push
```

Once Fleet receives the webhook request it will pull your repository, make
an archive of the *fleet-deploy* branch and use that to create a release.

Please note that there are a few caveats to this method.

 * If multiple commits are pushed at the same time, only the latest will be
	registered as a release. If you need a release created from specific git
	revision then use the 'From a git object' method detailed below.
 * Transient errors on your git host, Fleet or the network inbetween may cause
	the webhook request to be missed. If this happens, you'll need to create the
	release manually. See 'From a git object' below.
 * Your code is archived directly from the contents of the repository. If your
	application requires a specific build process then you'll need to use the
	'From an archive' method detailed below.

### From a git object

Releases can also be created directly from specific git objects. This method is
useful if you host your repository somewhere that doesn't support webhooks, or
if you want more fine-grained control over which revisions are made into
releases.

To do so, run the `fleet release create` command and provide it an object name.

```bash
$ fleet release create {OBJECT}
```

The object can be anything that git understands as a reference to a commit,
including:

 * short revision hashes like `a2438fa1`
 * long revision hashes like `96268d0eb299291ba86a0f475c724b2f24464da4`
 * [tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) like `v1.0.1`
 * branches like `cool-new-feature`

The release will be created from an archive of your codebase, in exactly the
same way as it would with the *fleet-deploy* branch method. If your application
requires a specific build process then you'll need to use the 'From an archive'
method detailed below.


### From an archive

Some workflows may involve running the application through an external build
process. This might be for the purposes of testing, minification, [installing
dependencies with composer](https://getcomposer.org/) or anything else that a CI
system can accomplish.

Fleet provides support for these workflows by allowing an arbitrary archive to
be turned into a release. This means that you to run your code through your
build process and import the resulting archive directly into Fleet.

The archive doesn't need to have any special structure, Fleet will use the top
level as the webroot by default. See [Customization](
/configuring-magento-for-fleet/customisation/) if you wish to use a subdirectory
as the webroot.

To create a release from an archive, provide the URL of a .tar.gz file to the
`fleet release create` command.

```bash
$ fleet release create --url https://www.anchorfleet.com/foo.tar.gz {OBJECT}
```

Note that you still need to specify a git object. This object will be used to
generate a name and metadata for the resulting release. See the 'From a git
object' method above for details on what kind of objects are acceptable.

You'll likely wish to protect your tarball from unauthorized access. The IP
address which Fleet uses to retrieve your code is not guaranteed to remain
static, so we'd instead recommend one of the following solutions:

 * Set up HTTP basic authentication and include the username and password in
	the URL (`https://username:password@anchorfleet.com/foo.tar.gz`)
 * Store your code in S3 and grant access via a [pre-signed Amazon S3
 URL](http://docs.aws.amazon.com/AmazonS3/latest/dev/ShareObjectPreSignedURL.html)

In order to prevent your codebase being intercepted or modified before it gets
to fleet, we **strongly** recommend that you use HTTPS in your URL.


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
