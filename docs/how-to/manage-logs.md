Fleet provides a log aggregation facility which allows you to view logs by environment and release.

Listing log groups
----

```
$ fleet log list
-----------  -------  ---------------------------
Environment  Release  Group
prod         5d5350b  apache-000-deploy-access
prod         5d5350b  apache-000-deploy-error
prod         5d5350b  magento-magento-report
prod         5d5350b  magento-magento-system
prod         5d5350b  phpfpm-master-deploy-access
prod         5d5350b  phpfpm-master-deploy-slow
test         5d5350b  apache-000-deploy-access
test         5d5350b  apache-000-deploy-error
test         5d5350b  magento-magento-report
test         5d5350b  magento-magento-system
test         5d5350b  phpfpm-master-deploy-access
test         5d5350b  phpfpm-master-deploy-slow
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
