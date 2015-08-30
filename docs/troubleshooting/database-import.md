Errors on database import
-------------------------

You may see an error similar to:
```
ERROR 1227 (42000) at line 1: Access denied; you need (at least one of) the SUPER privilege(s) for this operation
```

This is generally due to your SQL statements attempting to set the owner of an object you are creating.

For example:
```
CREATE DEFINER = `root`@`localhost` VIEW example_view AS SELECT * FROM example_table;
```

As setting a definer to a value other than CURRENT_USER is forbidden for users without SUPER privileges,
you will receive an access denied error. You should ensure that you are not attempting to set other owners for
objects you define.

The simplest way to avoid this error is to remove the DEFINER=<user> parts from your statements, falling back to
the default owner CURRENT_USER.

