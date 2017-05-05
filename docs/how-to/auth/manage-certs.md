An authentication certificate ([ssl client certificate](https://en.wikipedia.org/wiki/Client_certificate)) is used by a [user](/how-to/auth/manage-users) to identify who they are to fleet. A user can have multiple auth certs, for example one for their work computer, one for their home computer.

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
```

This creates a key at ~/.config/anchorfleet/WorkComputer.key and sends a CSR ([Certificate Signing Request](https://en.wikipedia.org/wiki/Certificate_sigining_request)) to the fleet and returns a signed crt.pem file ([x509 client cert](https://en.wikipedia.org/wiki/X.509)). The crt is written to ~/.config/anchorfleet/WorkComputer.crt.

NB: the key and CSR are generated using your local installation of openssl. If openssl is not installed it won't work.

Revoking an auth cert
----

Revoke a user's auth cert by label:

```
$ fleet auth cert revoke test@example.com HomeComputer
Revoked label: HomeComputer for email: test@example.com
```

Expiry
----

Auth certs expire two years after being signed and will eventually need to be rotated. This means you'll need to create a new cert and then revoke the old cert.
