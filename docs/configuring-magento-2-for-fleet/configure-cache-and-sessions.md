In this step we'll configure Magento to store its sessions and cache in [Redis](http://redis.io), a fast key-value store. Using Redis, Magento will be able to share its cache and sessions between multiple application servers. As an added benefit, storing the cache and sessions in Redis provides a notable speed boost.

### Prerequisites

Magento 2 provides support for Redis out of the box for both cache and sessions.

### Configuration

Magento's `app/etc/env.php` config file must be modified so that Magento will use Redis for its sessions and cache.

Add the following stanza to the configuration in `env.php`. Be sure to **replace** any existing `cache` or `session` sections.


```php
  'session' =>
  array(
    'save' => 'redis',
    'save_path' => 'redis-session:6379',
  ),
  'cache' =>
  array(
    'frontend' =>
    array(
      'default' =>
      array(
        'backend' => 'Cm_Cache_Backend_Redis',
        'backend_options' =>
        array(
          'server' => 'redis-cache',
          'port' => 6379,
        ),
      ),
    ),
    'page_cache' =>
    array(
      'default' =>
      array(
        'backend' => 'Cm_Cache_Backend_Redis',
        'backend_options' =>
        array(
          'server' => 'redis-cache',
          'port' => 6379,
          'database' => '1',
        ),
      ),
    ),
  ),
```

### Magento Full Page Cache

If you use Magento Enterprise and make use of the Full Page Cache functionality, you will need to
configure it to store the cache in Redis as well.

