## Auth Concepts

Fleet has a concept of Users, AuthCerts, Roles and Policies.

AuthCerts are for authenticating users when they access their fleet to identify who they are. Your first AuthCert was creating in the [installing fleet](/getting-started/installing-fleet-tool) guide. For more info on creating and revoking your certs see [managing authentication certificates](/how-to/auth/manage-certs).

Roles and Policies are for authorizing users and dictating what they can and can't do. Policies are fine grained permissions which are grouped into Roles and applied to Users. For example you might have two policies `ViewEnvironments` and `ModifyReleases` which you combine into a role Developer, and apply to particular users.

The first user created will have the Admin Role, which grants all privileges. Every other user will have no Roles, thus no privileges upon creation. When you are creating a new user you need to remember to give them the necessary Roles.

### Creating a User

Create a new user like so:

```
$ fleet auth user add test@example.com
```

This will send a verification email to that address. Until the user is verified they will not be able to log in. Direct the new user to the docs on how to verify themselves [here](/how-to/auth/manage-users#verifying-a-user). For how to give them new permissions to work with the fleet once they _have_ logged in, read on.

### Giving a User Permissions

There are four roles available by default. These are:

* Admin - can do anything
* Auditor - can view billing reports and logs
* Developer - can view and modify fleet resources (environments, releases, etc)
* NoProd - denies modification privileges to environment named 'prod', overriding any access previously granted
* Manager - can create new users, roles and policies

You can give a user multiple roles, e.g. Developer and NoProd would allow them to modify most environments, but no the one named 'prod'.

You can add a role to a user with the [user add_role command](/how-to/auth/manage-roles):

```
$ fleet auth user add_role test@example.com Developer
```

For more info on creating custom roles and policies or inspecting them see [here](/how-to/auth/manage-roles) and [here](/how-to/auth/manage-policies) respectively.
