Policies are JSON objects that describe what a user can or cannot do.

Policies Schema
----

An example policy:

```
{
	"name": "DenyProdEnv",
	"effect": "deny",
	"resource": ["environments"],
	"method": ["*"],
	"params": [{"env_name": "prod"}]
}
```

This is read as: "Do not allow any HTTP methods on the resource 'environments' with params `env_name = prod`".

| Key      | Required | Type     | Description                                                |
|----------|----------|----------|------------------------------------------------------------|
| name     | yes      | string   | For descriptive purposes.                                  |
| effect   | yes      | string   | Either "allow" or "deny"                                   |
| resource | no\*     | string[] | Resources to be affected by this policy, including "\*"    |
| method   | no\*     | string[] | HTTP methods to be affected by this policy, including "\*" |
| params   | no       | object[] | JSON objects to refine the policy further                 |

\*: *Although resource and method are optional, at least one of them must be present (either resource *or* method). When absent they both default to '\*'.*

For documentation of what resources are available, what the HTTP methods do for a given resource, and what params each method for each resource is, see the API documentation (coming soon).

Listing Policies
----

```
$ fleet auth policy list
Name
--------
AllowAll
DenyProdEnv
```

Only policy names are listed. To see the JSON object representing the policy use the describe command.

Describing Policies
----

```
$ fleet auth policy describe AllowAll
{
  "resource": [
    "*"
  ],
  "method": [
    "*"
  ],
  "name": "AllowAll",
  "effect": "Allow"
}
```

Adding Policies
---

Policies are added by redirecting a JSON policy object into the command:

```
$ cat > policy.json
{
  "resource": [
    "*"
  ],
  "method": [
    "*"
  ],
  "name": "DenyAll",
  "effect": "deny"
}
$ fleet auth policy add < policy.json
Added policy: DenyAll
```

If what you redirect in isn't valid JSON it'll be rejected.

Removing Policies
----

```
$ fleet auth policy remove DenyProdEnv
Removed policy: DenyAll
```
