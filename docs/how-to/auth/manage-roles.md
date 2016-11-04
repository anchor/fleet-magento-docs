Roles are groupings of [policies](/how-to/auth/manage-policies) that are assigned to [users](/how-to/auth/manage-users) to manage authorization.

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
$ fleet auth role create Admin
Added role: Admin
$ fleet auth role create Admin --policies AllowAll
Added role: Admin
$ fleet auth role create JuniorDev --policies "AllowEnvironments, AllowReleases, DenyProdEnv"
Added role: JuniorDev
```

Removing a role
----

```
$ fleet auth role destroy Admin
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
