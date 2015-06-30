The MySQL and Redis backends must be configured correctly before you start deploying to Fleet, as the health checks used to determine whether nodes are available to serve traffic depend on those settings.

These are set in your `app/etc/local.xml` file

 * MySQL: `mysql`  
 * Redis (Cache): `redis-cache` 
 * Redis (Sessions): `redis-session`

For configuring **Turpentine**:

 * Varnish Nodes: `varnish-0` and `varnish-1`
