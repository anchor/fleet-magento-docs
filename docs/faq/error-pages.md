### How do I configure error pages for my Fleet when an error occurs?

Magento on Fleet makes use of Apache's .htaccess system
where you can configure webserver directives.

If in your code you create a file called `.htaccess` in the **Document Root**
You can add directives to it like:

```
ErrorDocument <error code> <path relative to document root>
```

Eg. To show `500.html` when there is a `500 Internal Server Error` you would add the
following to your `.htaccess` file:

```
ErrorDocument 500 500.html
```


### How do I show an error page if my Fleet is down?

If there are no healthy frontends available due to some issue with your website
you can configure **CloudFlare** to serve requests instead.

See CloudFlare's documentation on how to use this feature:

 * [AlwaysOnline](https://support.cloudflare.com/hc/en-us/articles/200168006)
 * [Customising Error Pages](https://support.cloudflare.com/hc/en-us/articles/200172706-How-do-I-customize-CloudFlare-error-pages-)

