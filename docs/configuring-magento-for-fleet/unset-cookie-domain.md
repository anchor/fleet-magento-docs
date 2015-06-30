[HTTP cookies](http://en.wikipedia.org/wiki/HTTP_cookie) are bound to a
particular domain. This tells the browser with which websites to associate
the cookie and thus which cookie it should send when connecting to a site.

Each environment in your Fleet will have its own domain. This means that we'll
need to ensure that each environment will have the correct cookie domain set, so
that vistors browsers can send the cookie specific to that environment.

The best way to do this is to tell Magento to automatically set the cookie
domain:

 1. Login to Magento's admin interface.
 1. Select `General`, then `Web`.
 1. Ensure that the `Cookie Domain` field is empty, then save your changes.

If you need a more specific cookie domain you could also set it on environment
vreation via an SQL script. Note though that if the cookie domain is not set
correctly then *shopping cards and session-related functions will not work
correctly.*
