Snapshots represent the state of an environment at a particular time.
They are used when creating a new environment to provide a known initial state.

Automated snapshots are taken daily.

Snapshots are also saved whenever you destroy an environment, in case you want
to recreate the environment with the same state.

Listing existing snapshots
----

```
$ fleet snapshot list
name                      environment    status     size    type       created
------------------------  -------------  ---------  ------  ---------  -------------------------
1421200800                prod           AVAILABLE  100GB   AUTOMATED  2015-01-14 23:58:43+11:00
1421164800                test           AVAILABLE  100GB   AUTOMATED  2015-01-14 13:01:25+11:00
comtpldzc4mj              test           AVAILABLE  100GB   MANUAL     2015-01-14 12:49:01+11:00
prod-before-schema-update prod           AVAILABLE  100GB   MANUAL     2015-01-05 13:51:26+11:00
```

Creating a new snapshot
----

You can manually create new snapshots of an environment at any time.

```
$ fleet snapshot create <environment> --name <snapshot_name>
Snapshot <snapshot_name> is now being created
```

Deleting old snapshots
----

```
$ fleet snapshot destroy <snapshot_name>
Snapshot <snapshot_name> is now being destroyed
```
