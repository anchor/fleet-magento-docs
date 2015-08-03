SSL certificates are a vital part of online business, to protects your
customers' information and comply with security standards. Fleet provides a way
to manage your SSL certificates and apply them on a per-environment basis.

Listing available certificates
----

```
$ fleet cert list
name                                  common name                  organization     expires                                uploaded
------------------------------------  ---------------------------  --------------   -------------------------------------  -------------------------
wildcard-15-jan                       www.mysite.com.au            My Site Pty Ltd  2021-11-17 12:33:09+11:00 (2525 days)  2015-01-16 12:34:16+11:00
```

Adding a new certificate
----

```
fleet cert add <cert_name>

$ fleet cert add wildcard-15-jan
Please enter certificate in PEM format. End with EOF.
-----BEGIN CERTIFICATE-----
    ...
-----END CERTIFICATE-----
^D
Please enter certificate chain in PEM format. End with EOF.
-----BEGIN CERTIFICATE-----
    ...
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
    ...
-----END CERTIFICATE-----
^D
-----BEGIN RSA PRIVATE KEY-----
    ...
-----END RSA PRIVATE KEY-----
^D
Certificate 'wildcard-15-jan' has been added
```

Removing a certificate
----

```
fleet cert remove <cert_name>

$ fleet cert remove wildcard-15-jan
Certificate 'wildcard-15-jan' has been removed
```

Using a certificate for an environment
----

```
fleet env cert <env_name> <cert_name>

$ fleet env cert prod wildcard-15-jan
```
