SSH keys are used to access both the Fleet control (aux) node and the admin node for each environment.

Any individual key can be given access to:
 * The Fleet commands
 * SSH access to admin nodes (for all, or a subset of environments)

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

Each key added has a policy associated with it which defines what it can be used for.

By default the key can be used for everything within Fleet.

You can pass the restrict-fleet argument to disable the key from being used to access
the Fleet command line interface.

You can pass the restrict-ssh argument to disable the key from being used to SSH to instances.

The ssh-allow-environments argument allows you to provide a whitelist of environments
which the key can be used to SSH to even if the restrict-ssh argument has been passed.

```
$ fleet key add [--restrict-fleet] [--restrict-ssh] [--ssh-allow-environments environment1 environment2 ... environmentn] key_name
```

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
$ fleet key describe Alex
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
