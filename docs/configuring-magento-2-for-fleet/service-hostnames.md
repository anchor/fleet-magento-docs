The MySQL and Redis backends must be configured correctly before you start
deploying to Fleet.

These are set in your `app/etc/local.xml` file

 * MySQL: `mysql`
 * Redis (Cache): `redis-cache`
 * Redis (Sessions): `redis-session`
 * Solr: `solr` (if enabled)

For configuring **Turpentine**:

 * Varnish Nodes: `varnish-0` and `varnish-1`
