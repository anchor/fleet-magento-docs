You can sign up for notifications to events releated to your Fleet.

The notifications will be delivered by email on important events such as:

 - Weekly usage report [resource_management]
 - Billing alarm threshold exceeded [billing]
 - Release creation failure [development]
 - Creating or destroying an environment [resource_management]
 - Loading or unloading a release [resource_management]
 - Adding or removing keys [user_management]
 - SQL script failure [development]



People who should be subscribed to notifications:

 - Developers who are creating new releases
 - The person paying the bills
 - Anyone pushing new releases into production

Adding a notification recipient
----

Adds an email address to receive notification emails.

The valid types can be listed by calling 'fleet notifications add --help'.

```
$ fleet notifications add --type <type> <address>
```

Listing notification recipients
----

```
$ fleet notifications list
```

Removing a notification recipient
----

```
$ fleet notifications remove --type <type> <address>
```

Sending a notification
----

You can manually send a notification to notification recipients for
a notification type.

```
$ fleet notifications send --type <type> <subject>
Enter the body of the message to send
End with EOF (^D)
----------%<-----------
    ...
^D
---------->%-----------
```
