During the lifetime of an environment, updates to parts of it may
become available.

Listing available updates for an environment
----

```
$ fleet updates list <environment>
Component    Opt-in status      Description
-----------  -----------------  ---------------------------------
database                        Upgrade to MySQL 1.2.3 is pending
```

Apply available updates for an environment
----

```
$ fleet updates apply <environment> <component>
Applied 2 updates to <environment>
```

Database updates will be applied at the next maintainance window. They
will appear in `fleet update list` until then.
