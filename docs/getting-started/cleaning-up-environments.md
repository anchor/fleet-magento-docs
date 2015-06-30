
# Cleaning up environments

Since each environment is using up resources and costing you money,
no need to keep them around once you're done testing.

When an environment is destroyed, a snapshot of the database is automatically taken.  This can be optionally used when creating new environments in future.

**Note**: You **cannot undo** this operation, however it is possible to recreate the state at this time by utilising the post-destruction snapshot and loading the same release.

```bash
$ fleet env destroy staging
# This will PERMANENTLY DESTROY environment staging!
# Please review the details below:
# ---------------  -------------------------
# name             staging
# status           RUNNING
# current release  d9dcdd7
# loading release  d9dcdd7
# created          2014-09-24 13:36:17+10:00
# updated          2014-09-24 15:00:56+10:00
# endpoints
# ---------------  -------------------------
# Enter the environment's name to destroy it, or anything else to
# abort
staging
# Environment staging is now being destroyed

$ fleet env list
# name     status      release
# -------  ----------  -----------
# prod     RUNNING     d9dcdd7
# staging  DESTROYING  d9dcdd7
```
