In this document, a user refers to a developer using fleet, not an end user accessing the magento site. Users are primarily used to manage authentication and authorization.

Listing existing users
----

```
$ fleet auth user list
UUID                                 Email            Roles
-----------------------------------  ---------------  -------
4bb1538b-30f1-4017-9d82-6a5b3a407534 test@example.com Admin
```

The UUID is a unique identity generated for each user that never changes. However most actions accept an email as that is more readable.

Creating a user
----

You can add [roles](/how-to/auth/manage-roles) to a user when you create them, or you can do that separately. A user with no roles will not be authorized to do anything and has no authorization privileges.

```
$ fleet auth user create test@example.com
Added user: test@example.com
```

When adding multiple roles use a comma separated list:

```
$ fleet auth user create test@example.com --roles Developer,Accountant
$ fleet auth user create test@example.com --roles Developer
$ fleet auth user create test@example.com --roles "Developer, CertManager"
```

When you create a new user a verification email will be sent to their email address. The user needs to verify their account before they can do anything.

Verifying a user
----

Verifying a user will also create a [certificate](/how-to/auth/manage-certs) for them. The user whose email is being used needs to verify themself, this cannot be done for them. Verification requires an email address, a label for the certificate, and a [private key file](/how-to/auth/manage-certs#creating-an-auth-cert).

```
$ fleet auth user verify test@example.com mylabel
Please enter the verification token. End with EOF.
----------%<----------
```

You will then need to paste your verification token into the cli and a certificate will be printed out, e.g.:
```
$ fleet auth user verify test@example.com mylabel
Please enter the verification token. End with EOF.
----------%<----------
Cnm98A.ppWmKt7GNSA6hWxpjR1y_v6VIuk
---------->%-----------
```

This will save a key and cert in your config directory, usually ~/.config/anchorfleet. The files will be named mylabel.key and mylabel.crt.

Destroying a user
----

When a user is destroyed all of their [authentication certificates](/how-to/auth/manage-certs) are revoked. This is not reversible.

```
$ fleet auth user destroy test@example.com
Removed user: test@example.com and revoked certificates
```
