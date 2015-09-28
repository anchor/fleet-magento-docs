Here are some questions regarding the Magento fleet application servers that
we've been asked. Please don't hesitate to contact us if you have any others!

The application servers are the pieces of the environment that actually run your
Magento code and serve the site to customers. You might also hear them referred
to as 'frontends' or 'web servers'.

### What stack is being used to run PHP?

[PHP-FPM](http://php-fpm.org/) running behind [Apache](
http://httpd.apache.org/).


### Which PHP modules are installed?
A basic set of modules required to run Magento will be installed by default.
These should be sufficient for most stores.

	* [curl](http://php.net/manual/en/book.curl.php)
	* [gd](http://php.net/manual/en/book.image.php)
	* [imagick](http://php.net/manual/en/book.imagick.php)
	* [intl](http://php.net/manual/en/book.intl.php)
   * [mcrypt](http://php.net/manual/en/book.mcrypt.php)
   * [mysqlnd](http://php.net/manual/en/book.mysqlnd.php)
   * [xsl](http://php.net/manual/en/book.xsl.php)

Please see the full [listing of installed PHP modules](/faq/software-versions/#which-php-modules-are-available).

### Can I SSH into the servers?
No. We can understand that this might seem like an unpleasant change to some
people - we really like having SSH access to things ourselves

The application servers are ephemeral: new ones may be created - and existing
ones destroyed - at any time. This can be in response to autoscaling rules,
monitoring alerts or physical hardware maintenance.

This means that any changes you are able to apply manually to an individual
application server should not be expected to persist.

### Are Redis client libraries installed?
No. Only the [Credis library](https://github.com/colinmollenhour/credis)—as bundled with [Cm_Cache_Backend_Redis](https://github.com/colinmollenhour/Cm_Cache_Backend_Redis) and [Cm_RedisSession](https://github.com/colinmollenhour/Cm_RedisSession)—is available for your Magento store to communicate with Redis. The predis and phpredis libraries are not currently supported on fleet.
