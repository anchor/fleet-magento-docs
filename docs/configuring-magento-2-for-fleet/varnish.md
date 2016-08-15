The [Varnish HTTP accelerator](https://www.varnish-cache.org/) can drastically increase the speed at which pages are displayed to visitors by serving frequently-visited pages from a cache rather than requiring Magento to generate them every time. The Varnish server is installed and configured as part of Fleet, but Magento must be configured to make use of it.

Its use is optional, but highly recommended.

If you are using Varnish, then you will need to disable Magento Enterprise's Full Page Cache.

### Prerequisites

Magento does not support Varnish out of the box. Support is instead provided by the free [Turpentine](http://www.magentocommerce.com/magento-connect/turpentine-varnish-cache.html) Magento extension.

Follow [the official instructions](https://github.com/nexcess/magento-turpentine/wiki/Installation) in order to install it. Since Varnish itself is already configured you'll only need to complete the 'Install this plugin' section.

### Configuration

Once Turpentine is installed it can be configured via Magento's admin panel.

You can then configure it within the Magento Admin under. Navigate to `System` -> `Configuration` -> `Turpentine` and apply the following settings.

Unless otherwise noted, these are the literal values that should be entered on the Turpentine configuration screen.

* Varnish Options
  * Servers
    * Varnish Version: **3.0.x**
    * Server List
       * **varnish-0:6082**
       * **varnish-1:6082**
* Caching Options
  * Backend
    * Backend Host: **127.0.0.1**
    * Backend Port: **8080**
