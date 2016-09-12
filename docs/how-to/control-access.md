## Controlling access

It is sometimes necessary to restrict access to your site or areas of your site.

These techniques are often used to restrict access to the admin interface of
the site.

For more information, the Apache [2.2](http://httpd.apache.org/docs/2.2/) or [2.4](http://httpd.apache.org/docs/2.4/) documentation should be used.

### Authentication

Authentication can be used to require only people who have been provided a set of credentials
to be able to access your site or parts of your site.

Example:

```
<Location "/">
   AuthType basic
   AuthUserFile "/home/deploy/app/public/authorised_users.htpasswd"
   Require valid-user
</Location>
```

### IP Whitelisting

You can use IP whitelisting to restrict access to only connections from known IP addresses.

Whitelisting is only useful when the [real IP](/faq/real-ips) of the connecting user is known.

Example (Apache 2.2):

```
<Location "/admin">
Order Deny,Allow
Deny from all
Allow from 1.2.3.4
Allow from 1.2.3.0/24
</Location>
```

Example (Apache 2.4):

```
<Location "/admin">
Require ip 1.2.3.4
Require ip 1.2.3.0/24
</Location>
```
