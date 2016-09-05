Here are some questions we've been asked regarding how Fleet handles Magento's
cache and sessions. Please don't hesitate to contact us if you have any others!

### How do I clear the cache?
You can clear the Magento Cache via the Magento Admin interface.

  * `System -> Cache -> Flush Magento Cache`
    * This will flush all cache entries from the current Release

  * `System -> Cache -> Flush Cache Storage`
    * This will flush all cache entries from all releases in the curent Environment.

You can also utilise the [Fleet
CLI](../how-to/manage-environments.md#flushing-caches-for-an-environment) to
clear the cache for a particular environment:

```
$ fleet env cache flush <environment_name>
Caches flushed for environment <environment_name>
```

Alternatively, you can do it directly via the Redis command line.

```
> ssh deploy@admin.prod.myfleet.f.nchr.io
> telnet redis-cache 6379
Trying 10.2.0.106...
Connected to fleet-benc-0d034-a.txzear.0001.apse2.cache.amazonaws.com.
Escape character is '^]'.
> flushall
+OK
> CTRL+]
telnet>
> CTRL+D
root@admin:~#
> CTRL+D
root@admin:~# logout
```

### Where are sessions stored?
In their own redis server, separate to that used for the cache.


### Where is the block cache stored?
In a redis server separate to that used for the sessions.


### Where is the full-page cache stored?
If the full-page cache is enabled it will be stored in the same
redis server as the block cache.

However, we strongly advise that you disable the full page cache in favour of
varnish. Using varnish will typically provide a significant boost to the
performance of your website.


### Why use Redis?
Since your store will be running across multiple application servers, the cache
and sessions need to be stored somewhere central, where all the servers can
access them.

In the case of sessions, this means that your customers will see their shopping
carts regardless of which server is processing their request. A secondary
benefit is that redis will automatically begin clearing out old sessions when it
gets full.

For the cache, this means that when Magento makes a change to the cache it will
automatically be picked up by all the application servers. New servers spawned
in response to autoscaling won't come up with an empty cache, meaning they won't
be slow at serving the first set of requests.

Using redis for cache and sessions also officially supported by Magento.


### Wouldn't using "sticky" load balancing solve the sessions problem?
Not entirely.

When the load balancer receives traffic for your store it will direct each
request to a randomly chosen healthy application server. Since it does this each
time, load will tend to be distributed evenly across all your servers.

If "sticky" load balancing is enabled then the load balancer remembers where it
sent previous requests from the same client and ensures that they continue to be
served by the same application server.

At first glance, it might look like this would mean that sessions could simply
be stored locally on each application server. However this would mean that some
or all of your customers would lose their sessions - and thus their shopping
carts - the next time you deployed a new release (thus creating a fresh set of
servers) or a server was destroyed as part of an autoscaling event.



### What happens if redis goes down?
This depends on whether you're using a single-az or multi-az fleet.

For multi-az fleets we deploy redis in a highly-available manner. This means
that in addition to the live redis that is actively serving requests there is
a passive standby server replicated from the active. If the live server dies the
passive will become active and begin serving requests while a new passive server
is created. This process is triggered automatically should redis go down and
typically completes within a few minutes.

In a single-az fleet there is only a single active redis server. Should this go
down it will automatically be replaced, though this process is somewhat slower
that for a multi-az fleet since an entirely new redis server must be
provisioned. This process typically completes within an hour.


### Will our cache and sessions be lost if redis goes down?
For a multi-az fleet: no. For a single-az fleet: possibly.

Redis is an in-memory cache - it stores its data in RAM so that it can be
accessed quickly. This means that data stored in redis will be lost if redis
stops running. Redis provides two ways of combating this.

The first is via its clustering system, used by multi-az fleets. This is
described in more detail in the answer to 'What happens if redis goes down'
above.

The second, used by single-az fleets, is to save its dataset to disk. Redis does
this by writing each change out to a file as it makes it, then replaying that
file the next time it starts up. This method works well if redis is simply
restarted, but if the redis server dies and is replaced (see 'What happens if
redis goes down' above) the save file will not be retained and all data in redis
will be lost.

### Is redis officially supported by Magento?
Support is available out of the box from 1.8 (CE) and 1.13 (EE) onwards.

For older versions a pair of plugins are required to add support for the
[cache](https://github.com/colinmollenhour/Cm_Cache_Backend_Redis) and
[sessions](https://github.com/colinmollenhour/Cm_RedisSession). These are the
same plugins that are included by default with 1.8/1.13.


### How many cache or sessions objects will fit in redis?
It's difficult to provide an estimate since the sizes of these objects vary.

The cache redis will easily contain the entire block cache, and likely all of
the full-page cache on all but the largest of stores.

Sessions stored in redis are automatically compressed. This means that *a lot*
of them can be stored - even on a very large site it is *extremely* unlikely
that an in-use session will be purged. The redis sessions plugin also implements
bot detection to prevent sessions created by crawlers from being stored.


### What will happen if the cache or sessions redis fills up?
It will evict the least-recently-used objects to free up memory, specifically
via redis' allkeys-lru policy. See [redis' documentation on the LRU cache](
http://redis.io/topics/lru-cache) for more information.

Note that the first objects to be evicted will be those least recently used, not
necessarily the oldest ones. This means that a newer cache entry for a less-used
part of the site will be removed before an older one for a commonly-used part.


### Why are the cache and sessions stored in separate redis servers?
The cache and sessions need to be stored separately so that sessions aren't
deleted when the cache is flushed. Redis has the concept of "databases" which
allow for this level of separation, but there are two problems with using
databases here.

When redis reaches its memory limit it will begin removing old data regardless
of which database it is in. You don't want to lose your sessions just because
your cache got too big!

Secondly, redis' clustering system doesn't support using multiple databases.
The ability to use clustering is vital since it allows your existing cache and
sessions to quickly be made available again should the server running redis go
down.
