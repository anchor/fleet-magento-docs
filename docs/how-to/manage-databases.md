Database management allows you to connect to and examine the state of an environment.
This is also used to load your initial database when not using snapshots.

## Connecting to a database

### Using the Fleet CLI

You can use the connect command to get a command line database shell for your environment.
Note: if connecting over SSH, you may need to pass the -t option to get a prompt.

```
$ fleet database connect <environment_name>
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 164504
Server version: 5.6.19-log MySQL Community Server (GPL)

Copyright (c) 2000, 2014, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

### Using an SSH tunnel

You can also utilise an [SSH
Tunnel](https://en.wikipedia.org/wiki/Tunneling_protocol#Secure_Shell_tunneling)
to connect to an environment's database from an external location.  This can be
be convenient when setting up external integrations that require direct
database access.

The SSH tunnel will allow you to connect to a remote Fleet environment's
database through a local port on your machine.

To set up an SSH tunnel:

1. [Add the public key](manage-keys.md) that corresponds to the private key you
   will utilise for the SSH connection.
1. [Describe](manage-environments.md#describing-an-environment) the environment
   in question to retrieve its `adminssh` address.  This will likely take the
   form of `adminssh.{env}.{fleet-id}.f.nchr.io`.
1. Create the SSH tunnel.  This example forwards local port `3333` to the
   remote database server and uses the `mysql` [service
   hostname](../configuring-magento-for-fleet/service-hostnames.md) that is
   available in each environment:  
   `ssh -L3333:mysql:3306 deploy@adminssh.{env}.{fleet-id}.f.nchr.io`

You can now connect to the remote database instance by opening a connection to
the local port you have specified.  For example, with the mysql command line
client:  
`mysql --protocol=TCP --host=localhost --port=3333 --user={USERNAME} --password {DBNAME}`

## Loading a database

```
$ fleet database connect <environment_name> <database_name> < database.sql
```

## Dumping a database

You can dump the contents of a database in SQL format. Note however that this
locks the database, which can make it unavailable to your app for an extended
period of time.

For this reason, **dumping the database in the production environment is not
recommended**. You should first create a snapshot of production, then dump the
database from there, as described below:

```
$ fleet snapshot create prod --name proddb
Snapshot proddb is now being created
```

It will take a few minutes for the snapshot to complete and become available
for use. Check the listing and wait for its status to change from `CREATING` to
`AVAILABLE`.

```
$ fleet snapshot list | grep proddb
```

Now create a temporary environment, using the snapshot you just created.
```
$ fleet env create --snapshot proddb proddbdump
Environment proddbdump is now being created
```

This will take some time, about 15-25 minutes. Check the environment listing
and wait for your new fleet to appear.

```
$ fleet env list | grep proddbdump
```

Once the environment is `RUNNING`, you can dump the database from the temporary
environment:

```
$ fleet database dump proddbdump [db_name]  > dump.sql

$ fleet env destroy --no-confirm proddbdump
Environment proddbdump is now being destroyed

$ fleet snapshot destroy proddb
Snapshot proddb is now being destroyed
```
