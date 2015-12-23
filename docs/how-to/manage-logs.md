Fleet provides a log aggregation facility which allows you to view logs by environment and release.

Log Retention
----

The default retention period for all logs is 1 year.

Per-release logs (eg. apache/magento logs) are purged when the release is unloaded.
If you want to store logs after a release has been unloaded, you should first download
the logs before unloading the release.


Listing log groups
----

```
$ fleet log list
-----------  -------  ---------------------------
Environment  Release  Group
                      fleet-logs
prod         5d5350b  apache-000-deploy-access
prod         5d5350b  apache-000-deploy-error
prod         5d5350b  magento-magento-report
prod         5d5350b  magento-magento-system
prod         5d5350b  phpfpm-master-deploy-access
prod         5d5350b  phpfpm-master-deploy-slow
prod         5d5350b  autoscaling-logs
test         5d5350b  apache-000-deploy-access
test         5d5350b  apache-000-deploy-error
test         5d5350b  magento-magento-report
test         5d5350b  magento-magento-system
test         5d5350b  phpfpm-master-deploy-access
test         5d5350b  phpfpm-master-deploy-slow
test         5d5350b  autoscaling-logs
-----------  -------  ---------------------------
```

Viewing a log
----

You can view a particular log by passing the environment, release and group of the log. By default the last 24 hours of the log is shown.

```
$ fleet log view <environment> <release> <group> [--start-time YYYY-MM-DDTHH:MM:SS+ZZZZ] [--end-time YYYY-MM-DDTHH:MM:SS+ZZZZ]

$ fleet log view prod 5d5350b apache-000-deploy-access
...
```
