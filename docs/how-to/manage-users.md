In this document, a user refers to a developer using fleet, not an end user accessing the magento site. Users are primarily used to manage authentication and authorization.

Listing existing users
----

```
$ fleet auth user list
UUIDs                                 Emails            Roles
------------------------------------  ----------------  -------
4bb1538b-30f1-4017-9d82-6a5b3a407534  test@example.com  Admin
```

The UUID is a unique identity generated for each user that never changes. However most actions accept an email as that is more readable.

Creating a user
----

You can add [roles](/how-to/manage-roles) to a user when you create them, or you can do that separately. A user with no roles will not be authorized to do anything and has no authentication certificates.

```
$ fleet auth user add test@example.com
Added user: test@example.com
```

When adding roles use a comma separated list:

```
$ fleet auth user add test@example.com --roles Developer,Accountant
$ fleet auth user add test@example.com --roles Developer
$ fleet auth user add test@example.com --roles "Developer, CertManager"
```

Destroying a user
----

When a user is destroyed all of their [authentication certificates](/how-to/manage-certs) are revoked. This is not reversible.

```
$ fleet auth user remove test@example.com
Removed user: test@example.com and revoked certificates
```
