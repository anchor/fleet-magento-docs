A release corresponds to a single version of your site's code.

Listing existing releases
----

Releases will be either creating, available or failed.

```

$ fleet release list
name     status     modified                   message
-------  ---------  -------------------------  --------------------------------
5d5350b  CREATING   2015-01-15 06:14:40+00:00  Added tags to product descrip...
3e9554e  AVAILABLE  2015-01-08 00:05:51+00:00  Merged in test-feature- (pull...
4587705  AVAILABLE  2015-01-02 04:09:52+00:00  Installed Turpentine
33516fa  AVAILABLE  2014-12-31 03:58:47+00:00  Initial release
```

Creating a release
----

There are two ways of registering a release with fleet.

 1. From a git object
 2. From an archive

### From a git object

Releases can be created directly from specific git objects. This method is
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

The release will be created from an archive of your codebase. If your application
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

### Via the fleet-deploy branch

**Note:** This method has been **deprecated** and will be removed after **7th March 2016**. If you are currently using this method, you should plan your transition away before this date.

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
   revision then use the 'From a git object' method detailed above.
 * Transient errors on your git host, Fleet or the network inbetween may cause
   the webhook request to be missed. If this happens, you'll need to create the
   release manually. See 'From a git object' above.
 * Your code is archived directly from the contents of the repository. If your
   application requires a specific build process then you'll need to use the
   'From an archive' method detailed above.

Destroying an existing release
----

Once a release is no longer active or needed, you can destroy it.

This will delete the underlying images used and remove the release from your list.

```

$ fleet release destroy 33516fa
Release '33516fa' is being destroyed
```

Handling failed releases
----

When a release fails, it can be because of a number of reasons.

If there is a problem in the code being bundled into the release, a
[notification](/how-to/manage-notifications/) will be sent containing
an error message which should point to which part of the release process
failed.

Once the error has been corrected, you can create a new release with fixed
code.

If there is an internal Fleet problem causing the release to fail, no
notification will be sent to you. Anchor will automatically be notified,
and will resolve the issue.

If you would like status updates in the rare case that this happens, you can
contact [support](/support/).
