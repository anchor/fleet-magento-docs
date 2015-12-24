Log Aggregation
---------------

The default Magento logs 'system.log' and 'exception.log' and generated error reports are aggregated and made available via the Fleet CLI.

You can also configure additional logfiles to be aggregated through your fleet config file (.fleet/config).

Example:

```
log_files = custom_log_1.log, custom_log_2.log
```

Note that the logs must exist in the default var/log directory under Magento's webroot. Subdirectories are not supported.

Each log entry should be prefixed by a timestamp in the format '%Y-%m-%dT%H:%M:%S%z' (eg. 2015-12-23T13:08:11+00:00), which should be the default for Magento logging.
