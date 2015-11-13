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
present as slow page loads or errors.

Last Resort
--------

If none of the other troubleshooting steps are able to get things working
again, you have the option to [reboot the database server](/how-to/manage-databases/#rebooting-a-database).
