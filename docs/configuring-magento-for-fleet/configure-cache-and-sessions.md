In this step we'll configure Magento to store its sessions and cache in [Redis](http://redis.io), a fast key-value store. Using Redis, Magento will be able to share its cache and sessions between multiple application servers. As an added benefit, storing the cache and sessions in Redis provides a notable speed boost.

### Prerequisites

Magento provides support for Redis out of the box from versions **1.8** (Community) and **1.13** (Enterprise) onwards. Please follow the instructions in the section appropriate for your version of Magento.

#### Versions prior to CE 1.8 / EE 1.13

If you're using an older version of Magento you'll need to install the following extensions from Github:

* Cache: [Cm\_Cache\_Backend\_Redis](https://github.com/colinmollenhour/Cm_Cache_Backend_Redis)
* Sessions: [Cm\_RedisSession](https://github.com/colinmollenhour/Cm_RedisSession)

These are the [same extensions included with Magento 1.8 and 1.13 onwards](http://www.magentocommerce.com/knowledge-base/entry/redis-magento-ce-ee), they just need to be installed manually in older versions. Full installation instructions can be found on each extension's project page.

#### Versions since CE 1.8 / EE 1.13

The appropriate extensions are already included in newer Magento versions, but they need to be enabled. Follow the 'Configuring Magento To Use Redis' section in [Magento's Redis documentation](http://www.magentocommerce.com/knowledge-base/entry/redis-magento-ce-ee#config-mage).

### Configuration

Magento's `app/etc/local.xml` config file must be modified so that Magento will use Redis for its sessions and cache.

Add the following stanza to file after the close of the `</resources>` tag and before the close of `</global>`. Be sure to **replace** any existing `<cache>` or `<session_save>` or `<redis_session>` sections.

The stanza below is safe to copy directly into your `local.xml`, no customizations need to be made to it.

```xml
        <cache>
          <backend>Cm_Cache_Backend_Redis</backend>
          <backend_options>
            <server>redis-cache</server>
            <port>6379</port>
            <database>0</database>
            <force_standalone>0</force_standalone>
            <automatic_cleaning_factor>0</automatic_cleaning_factor>
            <compress_data>1</compress_data>
            <compress_tags>1</compress_tags>
            <compress_threshold>20480</compress_threshold>
            <compression_lib>gzip</compression_lib>
          </backend_options>
        </cache>
        <session_save><![CDATA[db]]></session_save>
        <redis_session>
            <host>redis-session</host>
            <port>6379</port>
            <password></password>
            <timeout>2.5</timeout>
            <persistent></persistent>
            <db>0</db>
        </redis_session>
```

**Note**: Ensure you are not setting `<config><global><cache><prefix>` as this is used by
Fleet to ensure each release is cached separately. When Magento caches objects,
each entry will be prefixed with the current Release ID.

### Magento Full Page Cache

If you use Magento Enterprise and make use of the Full Page Cache functionality, you will need to
configure it to store the cache in Redis as well.

Your full_page_cache section in app/etc/enterprise.xml should be updated to match the following.

```
<full_page_cache>
  <backend>Cm_Cache_Backend_Redis</backend>
  <backend_options>
    <server>redis-cache</server>
    <port>6379</port>
    <database>0</database>
    <force_standalone>0</force_standalone>
    <compress_data>0</compress_data>
    <compression_lib>gzip</compression_lib>
  </backend_options>
</full_page_cache>
```
