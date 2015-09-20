Database performance
--------------------

Database performance issues can be diagnosed using MySQL slow query
logging. This feature is enabled by default and configured to record
queries which take longer than `10` seconds to execute.

The slow query log is stored in the `mysql.slow_log` table on your
MySQL server. You can access this table using the
[`fleet database`](../how-to/manage-databases) command:

```
$ fleet database connect <environment>
mysql> SELECT query_time, sql_text FROM mysql.slow_log;
+------------+--------------------------------------+
| query_time | sql_text                             |
+------------+--------------------------------------+
| 00:00:40   | select * from catalog_product_entity |
+------------+--------------------------------------+
1 row in set (0.00 sec)
```

The MySQL slow query log table is managed automatically but you can
trigger a log rotation manually if required:

```
$ fleet database connect <environment>
mysql> CALL mysql.rds_rotate_slow_log;
Query OK, 0 rows affected (0.03 sec)
```

Database deadlocks
------------------

Some query patterns can trigger deadlocks in the database. This can
present as slow page loads or errors. Database deadlocks are recorded
in the logs:

```
$ fleet log view fleet-database-deadlock
Aug 21 03:19:17 aux-d47eca0a fleet-db-deadlocks: At 2015-08-20T23:09:25 mysql.<environment>.<fleet>.f.nchr.io deadlocked on magento.catalog (index: PRIMARY, user: master): update catalog set price = 10000;
```

You can also inspect the most recent deadlocks in an environment
(subject to the limits on MySQL's retention of this information):

```
$ fleet database deadlocks <environment>
ts	server	db	tbl	idx	user	hostname	txn_id	txn_time	query	victim
2015-08-20T23:09:25	mysql.<environment>.<fleet>.f.nchr.io	test innodb_deadlock_maker	PRIMARY	master		0	24	UPDATE catalog SET price = 10000; 0
```

Once it has occurred a deadlock will continue to be reported until
another deadlock becomes the new "latest deadlock". The logging
mechanism described above will automatically use this mechanism to
ensure each deadlock is logged once. If you would like to clear a
deadlock manually you can use the `--clear` argument:

```
$ fleet database deadlocks <environment>
ts	server	db	tbl	idx	user	hostname	txn_id	txn_time	query	victim
2015-08-20T23:09:25	mysql.<environment>.<fleet>.f.nchr.io	test innodb_deadlock_maker	PRIMARY	master		0	24	UPDATE catalog SET price = 10000; 0
$ fleet database deadlocks <environment>  --clear
ts	server	db	tbl	idx	user	hostname	txn_id	txn_time	query	victim
2015-08-20T23:09:25	mysql.<environment>.<fleet>.f.nchr.io	test innodb_deadlock_maker	PRIMARY	master		0	24	UPDATE catalog SET price = 10000; 0
$ fleet database deadlocks <environment>
ts	server	db	tbl	idx	user	hostname	txn_id	txn_time	query	victim
```

Last Resort
--------

If none of the other troubleshooting steps are able to get things working
again, you have the option to [reboot the database server](/how-to/manage-databases/#rebooting-a-database).
