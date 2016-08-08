## Auth Concepts

Fleet auth has a concept of Users, AuthCerts, Roles and Policies.

AuthCerts are for authenticating users when they access their fleet to identify who they are. Your first AuthCert was creating in the [installing fleet](/getting-started/installing-fleet-tool) guide. For more info on creating and revoking your certs see [managing authentication certificates](/how-to/manage-certs).

Roles and Policies are for authorizing users and dictating what they can and can't do. Policies are fine grained permissions which are grouped into Roles and applied to Users. For example you might have two policies ViewEnvironments and ModifyReleases which you combine into a role Developer, and apply to particular users.

The first user created will have admin privileges and every other user by default will have no privileges. When you are creating a new user you need to remember to give them the necessary permissions.

### Creating a User

Create a new user like so:

```
$ fleet auth user add test@example.com
```

This will send a verification email to that address.

### Giving a User Permissions

There are four roles available by default. These are:

1. Admin - can do anything
2. Reports - can view billing reports and logs
3. Developer - can view and modify fleet resources (environments, releases, etc)
4. NoProd - can NOT modify the production environment
5. Manager - can create new users, roles and policies

You can give a user multiple roles, e.g. Developer and NoProd would allow them to modify most environments, but no the one named 'prod'.

You can add a role to a user with the [user add_role command](/how-to/manage-roles):

```
$ fleet auth user add_role test@example.com Developer
```

For more info on creating custom roles and policies or inspecting them see [here](/how-to/manage-roles) and [here](/how-to/manage-policies) respectively.
