You can sign up for notifications to events releated to your Fleet.

The notifications will be delivered by email on important events such as:

 - Weekly usage report
 - Billing alarm threshold exceeded
 - Release creation failure
 - Creating or destroying an environment
 - Loading or unloading a release
 - Adding or removing keys
 - SQL script failure

People who should be subscribed to notifications:

 - Developers who are creating new releases
 - The person paying the bills
 - Anyone pushing new releases into production

Adding a notification recipient
----

Adds an email address to receive notification emails.

On adding an address, a confirmation will be sent which must be accepted to
begin receiving notifications.

```
$ fleet notifications add <address>
```

Listing notification recipients
----

```
$ fleet notifications list
```

Removing a notification recipient
----

```
$ fleet notifications remove <address>
```

Sending a notification
----

You can manually send a notification to all notification recipients.

```
$fleet notifications send <subject>
Enter the body of the message to send
End with EOF (^D)
----------%<-----------
    ...
^D
---------->%-----------
```
