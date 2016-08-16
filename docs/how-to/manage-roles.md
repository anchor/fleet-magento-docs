Roles are groupings of [policies](/how-to/manage-policies) that are assigned to [users](/how-to/manage-users) to manage authorization.

Listing roles
----

```
$ fleet auth role list
Role       Policies
---------  ----------
Admin      AllowAll
JuniorDev  AllowAll, DenyProdEnv
```

Creating a role
----

You can optionally provide policies with a comma separated list to include in a role when you create it or you can add them later.

```bash
$ fleet auth role add Admin
Added role: Admin
$ fleet auth role add Admin --policies AllowAll
Added role: Admin
$ fleet auth role add JuniorDev --policies "AllowEnvironments, AllowReleases, DenyProdEnv"
Added role: JuniorDev
```

Removing a role
----

```
$ fleet auth role remove Admin
Removed role: Admin
```

Adding Policies to a role
----

```
$ fleet auth role add_policies JuniorDev AllowWhitelists,AllowSnapshots
Added policies: AllowWhitelists, AllowSnapshots to role: JuniorDev
```

Removing Policies from a role
----

```
$ fleet auth role remove_policies JuniorDev DenyProdEnv
Removed policies: DenyProdEnv from role: JuniorDev
```
