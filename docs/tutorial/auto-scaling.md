Fleet allows you to easily manage your auto-scaling group whereby you can set a min/max of servers for a particular environment.

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

There are resources limits in place on your Fleet account for the total number of instances you can run. At any point you see for yourself how many instances you are running and what the current max amount is set to by running:

```bash
$ fleet limits

name           current    max
---------      ---------  -----
instances      16         60
```

## Desired

You have the option rather than waiting for your infrastructure to elastically scale you can explicitly set the 'desired' amount of servers you want in place. In this example increasing it to six (6) for production:

```bash
$ fleet env autoscaling desired prod 6
```

## Recycling

Within each environment you have the option to turn 'ON' instance recycling which in the event that any frontend node fails a health check it will be recycled.

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

We have a standard health check script stored on your frontends which for reference can be viewed on the admin node:

```bash

$ ssh deploy@adminssh.prod.ancora.f.nchr.io
$ cat health-checks/fleet-health-check.php

<?php

require('../app/public/app/Mage.php');

// Initialise Magento
Mage::app();

// Get a random value for tests
$rand = rand();

// Test database works
$product_id = Mage::getModel('catalog/product')->getCollection()->getAllIds(1);

// Test cache works
$cache = Mage::app()->getCacheInstance();
$cache->save($rand,'heathcheck',array(),5);
assert($cache->load('heathcheck') == $rand);
$cache->remove('healthcheck');

// Test sessions work
$session = Mage::getSingleton('core/session');
$session->setData('healthcheck',$rand);
assert($session->getData('healthcheck') == $rand);
$session->clear();

echo 'OK';

```
