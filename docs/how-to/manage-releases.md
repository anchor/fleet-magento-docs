A release corresponds to a single version of your site's code.

Listing existing releases
----

Releases will be either creating or available.

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

Releases will automatically be created when you push to your `fleet-deploy`
branch. Alternatively you can manually create a release from a specific
commit.

```

$ fleet release create fe19e9a
Release 'fe19e9a' is now being created
```

Destroying an existing release
----

Once a release is no longer active or needed, you can destroy it.

This will delete the underlying images used and remove the release from your list.

```

$ fleet release destroy 33516fa
Release '33516fa' is being destroyed
```
