Reports on Fleet usage can be accessed.

Viewing current usage
----

This report will show all the currently running environments and releases,
along with the time they have been running.

```
fleet report usage

Currently running environments
------------------------------

Name     Running Duration    Created
-------  ------------------  -------------------------
prod     15 days, 1:43:44    2015-09-29 01:35:15+00:00
staging  1:07:29             2015-10-14 02:11:30+00:00

Currently running releases
--------------------------

Name     Environment    Running Duration    Created
-------  -------------  ------------------  -------------------------
daaf05e  prod           21:41:12            2015-10-13 05:37:47+00:00
d67bb49  prod           23:44:09            2015-10-13 03:34:50+00:00
daaf05e  staging        0:47:40             2015-10-14 02:31:19+00:00

```

You can also have this report sent out via the notification channel:
```
fleet report usage --output_mode notification
```

