Database management allows you to connect to and examine the state of an environment.
This is also used to load your initial database when not using snapshots.

Connecting to a database
----

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

Loading a database
---

```
$ fleet database connect <environment_name> <database_name> < database.sql
```

Dumping a database
----

You can dump the contents of a database in SQL format.

This can lock the database, as such dumps will not work on production environments.

```
$ fleet database dump prod db_name > dump.sql
```
