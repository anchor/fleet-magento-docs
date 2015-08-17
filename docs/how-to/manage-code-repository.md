Configuring Your Code Repository
----

The repository your Fleet is configured to use for building releases can be changed as needed.

You will need to ensure that the Fleet is authorised to access the new repository before you make the change.

```

$ fleet config repo
git@github.com:myuser/myrepo.git

$ fleet config repo git@github.com:myuser/mynewrepo.git
Set git repository to 'git@github.com:myuser/mynewrepo.git'
```

Viewing Your Fleet's Public Key
----

You can view the public half of the key Fleet uses to check out your code.

```
$ fleet config publickey
ssh-rsa AA...

```
