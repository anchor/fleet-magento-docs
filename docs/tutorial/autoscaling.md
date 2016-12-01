Fleet allows you to easily manage your autoscaling group whereby you can set a min/max of servers for a particular environment.

When you describe an environment you can see min/max server pool limits in place as well as how many frontends a particular release is currently running:
```bash
$ fleet env describe prod
----------------  -------------------------
name              prod
status            RUNNING
whitelist         allow-all
ssl certificate   prod
created           2015-03-24 23:06:21+00:00
updated           2015-06-30 05:53:09+00:00
recycling         ON
tracked branches  fleet-deploy
previous release
'autoscaling min   2'
'autoscaling max   4'
----------------  -------------------------

Releases:
name     status      loaded                     updated                      'frontends'
-------  ----------  -------------------------  -------------------------  -----------
037205f  * ACTIVE *  2015-06-30 05:37:51+00:00  2015-06-30 05:44:22+00:00            '2'

Endpoints:
--------  ------------------------------
admin     admin.prod.ancora.f.nchr.io
adminssh  adminssh.prod.ancora.f.nchr.io
www       www.prod.ancora.f.nchr.io
--------  ------------------------------
```

## Limits

In the event that you need to serve more traffic you can simply expand your server pool 'limits' from 2/4 (min/max) to say 4/10 servers like so:

```bash
$ fleet env autoscaling limits prod 4 10
```

There are resource limits in place on your Fleet account for the total number of instances you can run. At any point you can see for yourself how many instances you are running and what the current max number is set to by running:

```bash
$ fleet limits

name           current    max
---------      ---------  -----
instances      16         60
```

## Desired

Rather than waiting for your infratructure to automatically scale, you can explicitly set the 'desired' number of servers you want in place. In this example increasing it to six (6) for 'prod' environment:

```bash
$ fleet env autoscaling desired prod 6
```

Please note that once it hit the 'desired' number of front-end instances, the autoscalling will proceed as normal.

## Recycling

Within each environment you have the option to turn 'ON' instance recycling which means that in the event that any frontend node fails a health check it will be recycled.

```bash
$ fleet env prod recycling ON
$ fleet env describe prod
----------------  -------------------------
name              prod
status            RUNNING
whitelist         allow-all
ssl certificate   prod
created           2015-03-24 23:06:21+00:00
updated           2015-07-02 04:29:25+00:00
recycling         'ON'
tracked branches  fleet-deploy
previous release
autoscaling min   2
autoscaling max   4
----------------  -------------------------

Releases:
name     status      loaded                     updated                      frontends
-------  ----------  -------------------------  -------------------------  -----------
8ef9d2f  * ACTIVE *  2015-06-09 01:50:25+00:00  2015-06-29 05:07:55+00:00            2

Endpoints:
--------  ------------------------------
admin     admin.prod.ancora.f.nchr.io
adminssh  adminssh.prod.ancora.f.nchr.io
www       www.prod.ancora.f.nchr.io
--------  ------------------------------
```

We have a standard health check script stored on your frontend servers. It performs a basic check to make sure PHP is functioning correctly. You can read further about health checks under the configuration sections. For reference you can view the provided basic health check on the admin node:

```bash

$ ssh deploy@admin.prod.ancora.f.nchr.io
$ cat health-checks/fleet-health-check.php
<?php

if (extension_loaded('newrelic')) {
	// do not instrument this (it skews real production data)
	newrelic_ignore_transaction();
}

// Check that DNS/networking is functional
$CHECK_HOST = 'mysql';

$lookup_result = gethostbyname($CHECK_HOST);
// This isn't obvious, but gethostbyname returns the address passed
// to it if the lookup fails
if ($lookup_result === $CHECK_HOST) {
	http_response_code(500);
	echo "DNS lookup of ${CHECK_HOST} failed\n";
}

// conditionally include a release provided healtcheck
if(file_exists('/home/deploy/.fleet-webroot/fleet-health-check.php')) {
	chdir('/home/deploy/.fleet-webroot');
	include('fleet-health-check.php');
} else {
	echo 'OK';
}
```

