### What version(s) of software X are available?

#### Magento 1.x

Debian Wheezy is used as the base for Fleet Magento 1.x, and updates are tracked as released upstream.

Our current versions of relevant software follow.

 - PHP: 5.4.x
 - MySQL: 5.6.x
 - Apache: 2.2.x
 - Varnish: 3.0.x
 - Redis: 2.8.x
 - Solr: 3.6.x

#### Magento 2.x

Debian Jessie is used as the base for Fleet Magento 2.x, and updates are tracked as released upstream.

Our current versions of relevant software follow.

 - PHP: 7.0.x
 - MySQL: 5.6.x
 - Apache: 2.4.x
 - Varnish: 4.0.x
 - Redis: 2.8.x

### Which PHP modules are available?

The following modules are currently available.

 - bcmath
 - bz2
 - calendar
 - Core
 - ctype
 - curl
 - date
 - dba
 - dom
 - ereg
 - exif
 - fileinfo
 - filter
 - ftp
 - gd
 - gettext
 - geoip
 - hash
 - iconv
 - imagick
 - imap
 - intl
 - ionCube Loader
 - json
 - libxml
 - mbstring
 - mcrypt
 - mhash
 - mysql
 - mysqli
 - mysqlnd
 - newrelic
 - openssl
 - pcntl
 - pcre
 - PDO
 - pdo_mysql
 - Phar
 - posix
 - redis
 - Reflection
 - session
 - shmop
 - SimpleXML
 - soap
 - sockets
 - SPL
 - standard
 - sysvmsg
 - sysvsem
 - sysvshm
 - tokenizer
 - wddx
 - xml
 - xmlreader
 - xmlwriter
 - xsl
 - zip
 - zlib

Additional PHP module installation is not currently supported by Anchor.

### How are software updates rolled out?

New images are generated weekly including any released updates to packages. These
updated images will be used for any newly created releases for your Fleet.

You can test the new versions in a staging environment as you would for your updates to
your website before pushing them into production.
