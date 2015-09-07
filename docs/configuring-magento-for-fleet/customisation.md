You can customise the deployment of your Magento site if needed.

Using a custom document root
----

By default your store will be served from the top level directory of your
repository. This means that a request to your-website.com/index.php will
be routed to the index.php at the root of your repository.

In some cases you want to store your application under a subdirectory and
have that directory be used as the 'document root' of your site. For example,
the top level of your repository might include a 'mystore' directory containing
your your Magento site, as well as other files and directories that shouldn't
be publically accessible. In such a case, your-website.com/index.php should be
routed to mystore/index.php.

```
my_repo/
├── mystore/
│   ├── index.php
│   └── [...]
├── super_secret_stuff/
│   └── [...]
└──  README.txt
```

This can be accomplished by creating a `.fleet/config` file in the root of your
repository and specifying the desired root directory via the the `webroot`
option.

```INI
webroot = mystore/
```

The directory should be relative to the root of your repository. Multiple levels
of subdirectory are fine, as are leading and trailing slashes.

The structure of your repository would then be as below.

```
my_repo/
├── .fleet/
│   └── config
├── mystore/
│   ├── index.php
│   └── [...]
├── super_secret_stuff/
│   └── [...]
└──  README.txt
```

The custom root setting will be applied when you create a release. If you
provide an incorrectly formatted config file, choose a web root that doesn't
exist or isn't a directory then the release creation will fail.

Your site's web root will always be accessible via the /home/deploy/.fleet-webroot
symbolic link, even if you haven't specified a custom root directory. The
structure of your repository won't be changed, and all your other files will
still be accessible at /home/deploy/app/public.


Providing a crontab
----

You can supply a crontab file as a part of your codebase. The crontab should be placed in the root directory of your codebase.

If named *.crontab-admin*, the crontab will be installed on your admin node.

If named *.crontab-fe*, the crontab will be installed on all frontend nodes.

If you have tasks which should only be executed if the release is active, you can invoke  `/usr/local/bin/is-fleet-node-active`
to test that the node is active.

Your codebase will be available at /home/deploy/app/public/

For example:
```
*/5 * * * * /usr/local/bin/is-fleet-node-active && /home/deploy/app/public/do-something
```

All Fleet nodes use UTC time.

Note that the standard Magento cron is invoked independently of any provided crontab, you do not need to invoke it yourself.

Using a Fleet-specific local.xml
----

You can supply a local.xml which will only be used by Fleet if you prefer to keep different settings for different environments.

If under app/etc/ you name a file *local.xml-fleet* it will be renamed to *local.xml* on deployment.
