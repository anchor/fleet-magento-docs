### How do I allow Cross-Origin Resource Sharing (CORS) with Magento on Fleet?

You can do this via .htaccess for static files.

```
Header set Access-Control-Allow-Origin: <domainname>
```

For dynamic content you'll need to set headers via PHP.

Note that this must be done before any output is sent.
```
header('Access-Control-Allow-Origin: <domainname>');
```

You can specify `domainname` as `*` to allow any domain to access your site.

Note that it may be necessary to set other headers.

You can find more information about CORS at the following pages:

 * [HTTP access control (CORS) - MDN](http://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
 * [W3C Recommendation](http://www.w3.org/TR/cors/)
 * [CORS Wikipedia Page](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
