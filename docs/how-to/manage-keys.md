SSH keys are used to access both the Fleet control (aux) node and the admin node for each environment.

Note that any changes to keys may take up to five minutes to be propagated out to all nodes in your Fleet.

Listing existing keys
----

```
$ fleet key list
name     modified
-------  -------------------------
Alex     2015-01-05 04:41:17+00:00
Brett    2014-12-30 04:37:16+00:00
Charlie  2015-01-05 04:41:17+00:00

```

Adding a key
----

```
$ fleet key add Doug
Please enter your SSH public key. End with EOF.
ssh-rsa ..........
^D
Key Doug has been added
```

Viewing a key
----

```
$ fleet key show Alex
---------------
name      Alex
modified  2015-01-05 04:41:17+00:00
Key       ssh-rsa .....

```

Removing a key
----

```
$ fleet key remove Alex
Key 'Alex' has been removed
```
