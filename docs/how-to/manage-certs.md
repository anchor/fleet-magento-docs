An authentication certificate ([ssl client certificate](https://en.wikipedia.org/wiki/Client_certificate)) is used by a [user](/how-to/manage-users) to identify who they are to fleet. A user can have multiple auth certs, for example one for their work computer, one for their home computer.

Auth certs have have a label so you can easily remember which is which.

Listing existing auth certs
----

By default, revoked certs are not shown.

```
$ fleet auth cert list
email             label
----------------  ---------
test@example.com  HomeComputer
```

Creating an auth cert
----

To create an auth cert you must specify an email corresponding to a user and a label to identify the cert:

```
$ fleet auth cert create test@example.com WorkComputer
$ fleet auth cert create test@example.com HomeComputer
```

This will create a key and cert file in your config directory with the same name as the label provided. It does this by sending a CSR ([Certificate Signing Request](https://en.wikipedia.org/wiki/Certificate_sigining_request)), sends it to the fleet and returns a signed crt.pem file ([x509 client cert](https://en.wikipedia.org/wiki/X.509)) but all you need to know is that you can use the result to authenticate yourself to fleet.

NB: the CSR is generated using your local installation of openssl. If openssl is not installed it won't work.

Revoking an auth cert
----

Revoke a user's auth cert by label:

```
$ fleet auth cert destroy test@example.com HomeComputer
Revoked label: HomeComputer for email: test@example.com
$ fleet auth cert destroy test@example.com 'Work Computer'
Revoked label: Work Computer for email: test@example.com
```

Expiry
----

Auth certs expire two years after being signed and will eventually need to be rotated.
