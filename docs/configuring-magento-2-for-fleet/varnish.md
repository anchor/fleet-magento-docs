The [Varnish HTTP accelerator](https://www.varnish-cache.org/) can drastically increase the speed at which pages are displayed to visitors by serving frequently-visited pages from a cache rather than requiring Magento to generate them every time. The Varnish server is installed and configured as part of Fleet, but Magento must be configured to make use of it.

Its use is optional, but highly recommended.
If you decide not to use Varnish, you should disable Varnish for your environment to reduce costs.

[Disable/Enable Varnish](/how-to/manage-environments/#enabling-and-disabling-varnish-for-an-environment)

If you are using Varnish, then it is advised you disable Magento Enterprise's Full Page Cache.

### Prerequisites

Magento 2 includes native support for Varnish.

Please follow the official Magento 2 Varnish documentation.

http://devdocs.magento.com/guides/v2.0/config-guide/varnish/config-varnish.html
http://devdocs.magento.com/guides/v2.0/config-guide/varnish/config-varnish-magento.html

### Magento Configuration

 * Full Page Cache
 * Caching Application: **Varnish Caching**
     * Varnish Configuration
         * Access list: **10.0.0.0/8**
         * Backend host: **127.0.0.1**
         * Backend port: **8080**
     * **Export VCL for Varnish 4**

This will download a file to your computer called `varnish.vcl`
Ensure that the `varnish.vcl` has the following in the `acl purge {` section:

```
acl purge {
  "10.0.0.0"/8;
}
```

You will also need to modify the `vcl_recv` sub to reject PURGE requests entering
via the Load Balancer.
These will appear to come from internal IPs but have the `X-Forwarded-For` header set:

```diff
 sub vcl_recv {
     if (req.method == "PURGE") {
         if (client.ip !~ purge) {
             return (synth(405, "Method not allowed"));
         }
+        if (req.http.X-Forwarded-For) {
+            // Restrict Purging to requests without X-Forwared-For set
+            return (synth(405, "Method not allowed"));
+        }
         if (!req.http.X-Magento-Tags-Pattern) {
             return (synth(400, "X-Magento-Tags-Pattern header required"));
         }
         ban("obj.http.X-Magento-Tags ~ " + req.http.X-Magento-Tags-Pattern);
         return (synth(200, "Purged"));
     }
```

This allows Varnish to accept Purge commands from only your Magento frontends.

You should place the this file in `.fleet/varnish.vcl` in your repository.
When loading a new release, Fleet will load this VCL file into Varnish.

To ensure old cached content is not shown after updates, Magento must be
configured to send Purge commands to Varnish when changes are made.

http://devdocs.magento.com/guides/v2.0/config-guide/varnish/use-varnish-cache.html

To make Magento aware of the Varnish servers, add the following section to `app/etc/env.php`:

```
  'http_cache_hosts' =>
  array (
    0 =>
    array (
      'host' => 'varnish-0',
      'port' => '80',
    ),
    1 =>
    array (
      'host' => 'varnish-1',
      'port' => '80',
    ),
  ),
```
