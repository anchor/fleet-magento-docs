# Cleaning up releases

Once you are happy that a new release is working in production, you can unload the old release to save you money.

```bash
$ fleet env unload production 7ea2c5e

# Release d9dcdd7 is now being unloaded from environment prod

$ fleet env describe prod
------------------  -------------------------
name                prod
status              RUNNING
active release      d9dcdd7
activating release
whitelist           sg-0b740f6e
ssl certificate     9h87jcx1
created             2014-12-17 10:21:51+11:00
updated             2014-12-17 11:21:27+11:00
------------------  -------------------------

Releases:
-------------  -----------------------------------------------------------------------
d9dcdd7        RUNNING
-------------  -----------------------------------------------------------------------
```
