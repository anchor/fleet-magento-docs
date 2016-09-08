## Remote IPs

As end users never directly connect to the frontend web servers, the reported remote IP needs to be determined by examining a chain of headers provided by all proxies handling the traffic on the way to the frontend.

The way this is done on Fleet is to use the X-Forwarded-For header, where the first IP in the list which is not marked as a trusted proxy is used as the remote IP.

The list of trusted proxies is:

 * All addresses internal to the Fleet (Load balancers, Varnish)
 * Cloudflare (Note: for technical reasons, Fleet for Magento versions lower than 2.0 with Varnish disabled do not trust Cloudflare to present proxied IPs)
