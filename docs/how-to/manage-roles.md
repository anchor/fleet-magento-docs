Roles are groupings of [policies](/how-to/manage-policies) that are assigned to [users](/how-to/manage-users) to manage authorization.

Listing roles
----

```
$ fleet auth role list
```

Creating a role
----

You can optionally provide policies with a comma separated list to include in a role when you create it or you can add them later.

```bash
$ fleet auth role create Admin
$ fleet auth role create Admin --policies AllowAll
$ fleet auth role create JuniorDev --policies "AllowEnvironments, AllowReleases, DenyProdEnv"
```

Removing a role
----

```
$ fleet auth role remove Admin
```

Adding Policies to a role
----

```
$ fleet auth role add_policies JuniorDev AllowWhitelists,AllowSnapshots
```

Removing Policies from a role
----

```
$ fleet auth role remove_policies JuniorDev DenyProdEnv
```
