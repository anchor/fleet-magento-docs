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

* Full Page Cache
 * Caching Application: Varnish Caching
 * Varnish Configuration
  * Access list: 10.0.0.0/8
  * Backend host: 127.0.0.1
  * Backend port: 8080
 * Export VCL for Varnish 4

This will download a file called `varnish.vcl`

Place the this file in `.fleet/varnish.vcl` in your repository.
The file placed here will be installed into Varnish when you load a release.

To ensure old cached content is not shown after updates, Magento must be
configured to purge Varnish when changes are made.

http://devdocs.magento.com/guides/v2.0/config-guide/varnish/use-varnish-cache.html

Add the following section to `app/etc/env.php`:

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
