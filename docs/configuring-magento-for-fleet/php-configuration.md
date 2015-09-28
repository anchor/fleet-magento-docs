PHP Configuration
--------------

To ensure your test and development environments behave similar to Fleet, use the following configurations for PHP:

 - Install and use the [identified software versions](/faq/software-versions/)
 - Remove or disable all opcode caching mechanisms (APC, Opcache, XCache, etc)


The following configuration values should be used in `php.ini`:

```
[PHP]
memory_limit=512M
realpath_cache_ttl=7200
realpath_cache_size=32k
```

The following PHP-FPM configurations should be used in `php-fpm.conf`

```
daemonize = no
process.max = 100
emergency_restart_threshold = 5
emergency_restart_interval = 1m
process_control_timeout = 5s
```

The following PHP-FPM pool configurations should be used in the default pool:

```
pm = dynamic

pm.max_children = 10
pm.min_spare_servers = 1
pm.max_spare_servers = 2
pm.max_requests = 1024
```
