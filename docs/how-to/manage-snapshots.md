Snapshots represent the state of an environment at a particular time.
They are used when creating a new environment to provide a known initial state.

Database snapshots are always taken. If you have NFS enabled for an environment
NFS snapshots will also be taken.

Automated snapshots are taken daily.

Snapshots are also saved whenever you destroy an environment, in case you want
to recreate the environment with the same state.

Listing existing snapshots
----

```
$ fleet snapshot list [--type {database,nfs}]
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
$ fleet snapshot create <environment> --name <snapshot_name> --type {database,nfs}
Snapshot <snapshot_name> is now being created
```

Deleting old snapshots
----

```
$ fleet snapshot destroy <snapshot_name> --type {database,nfs}
Snapshot <snapshot_name> is now being destroyed
```

Dumping the contents of a snapshot
----

While you cannot access the contents of a snapshot directly, you can create a new environment using the contents of a snapshot, then dump the database from that environment.

1. Create the new environment from the snapshot.

      ```
      $ fleet env create <env_name> --snapshot <snapshot_id>
      ```

2. Dump the contents of the database

      ```
      $ fleet database dump <env_name> > <snapshot_id>.sql
      ```

3. Cleanup the environment you just created

      ```
      $ fleet env destroy <env_name>
      ```

See [Manage Databases](/how-to/manage-databases#dumping-a-database) for more information.
