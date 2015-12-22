Log Aggregation
---------------

The default Magento logs 'system.log' and 'exception.log' and generated error reports are aggregated and made available via the Fleet CLI.

A single custom log file 'custom.log' is also aggregated.

If you want to gather logs, you should ensure they are written to one of the three aggregated log files.

If you are using a plugin which writes to a fixed filename, you can create a symlink at the name the plugin writes to pointing at the custom log file. (ln -s myplugin.log custom.log)

Each log entry should be prefixed by a timestamp in the format '%Y-%m-%dT%H:%M:%S%z' (eg. 2015-12-23T13:08:11+00:00'), which should be the default for Magento logging.
