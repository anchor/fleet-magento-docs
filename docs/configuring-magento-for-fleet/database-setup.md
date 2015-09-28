Database Setup
--------------

* Create your database: `echo 'CREATE DATABASE myshop;' | fleet database connect prod`
* Grant access to your user: `echo "GRANT ALL on myshop.* to 'myshop'@'%' IDENTIFIED BY 'mysecurepassword'" | fleet database connect prod`
* Import your database `fleet database connect prod myshop < myshop.sql`
* Tell Magento to use a custom admin url, as the Admin node is separate from your frontends.
```
echo "UPDATE core_config_data SET value = 'http://admin.prod.myshop.f.nchr.io/' WHERE path = 'admin/url/custom'" | fleet database connect prod myshop
echo "UPDATE core_config_data SET value = '1' WHERE path = 'admin/url/use_custom" | fleet database connect prod myshop
```

Once you've imported your database, loaded and activated an initial release
you'll be able to access Magento's admin panel at `https://admin.prod.myshop.f.nchr.io/admin/`.

MySQL Configuration
--------------

To ensure your test and development environments behave similar to Fleet, use the following MySQL configurations:

```
ft_min_word_len=4
innodb_io_capacity=200
innodb_open_files=4096
innodb_buffer_pool_instances=4
query_cache_type=0
query_cache_limit=0
query_cache_size=0
```
