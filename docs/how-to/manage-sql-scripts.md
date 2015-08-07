SQL scripts configured here will be automatically run on new environments when they are
cloned from a snapshot.

If one of your scripts causes an error during environment creation, an error message will be sent
to the [Notification Queue](manage-notifications), and the environment creation will fail.

Templating
----

SQL scripts are processed as templates, to allow you to change the script behaviour based on the environment or domain of the environment.

The template language used is [Jinja2](http://jinja.pocoo.org/docs/dev/)

You can use the following variables in your templates:

 * `{{environment}}` - The name of the environment that is being created
 * `{{base_url}}` - Evaluates to https://ENVIRONMENT.FLEET-ID.f.nchr.io **with no trailing slash**

Each script must also specify the database to use before executing any queries.

Adding new scripts
----

Each script is downloaded from a URL at the time this command is run
and stored for later execution.

Scripts can either be loaded from a URL, or pasted in to the CLI.

If loaded from a URL, a copy will be taken at the time the script is created. Changes will not be picked up automatically.

```
fleet config sql add <script_name> [<script_url>]
```

```
$ fleet config sql add 00-disable-payment-processor http://my.host/script.sql
Saved script as 00-disable-payment-processor

$ fleet config sql add 10-clear-user-details
----------%<-----------
    ...
^D
---------->%-----------
Saved script as 10-clear-user-details
```
Note: scripts run in lexical order.

Listing currently configured scripts
----

```
$ fleet config sql list
00-disable-payment-processor
10-clear-user-details
```

Showing script contents
----

```
$ fleet config sql show 00-disable-payment-processor
----------%<-----------
-- (SAMPLE) disables payment processor usage

use magento;

update core_config_data set value = 'false' where path = 'use/payment/processor';

---------->%-----------
```

Removing a script
----

```
$ fleet config sql remove 00-disable-payment-processor
Deleted script 00-disable-payment-processor
```

Example Scripts
---

Updating URLs to match the environment

```
USE magento;

UPDATE core_config_data SET value = 'http://{{environment}}.mysite.f.nchr.io/' WHERE path = 'web/unsecure/base_url';
UPDATE core_config_data SET value = 'https://{{environment}}.mysite.f.nchr.io/' WHERE path = 'web/secure/base_url';

UPDATE core_config_data SET value = 'https://admin.{{environment}}.mysite.f.nchr.io/' WHERE path = 'admin/url/custom';

```
