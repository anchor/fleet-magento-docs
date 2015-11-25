Reports on Fleet usage can be accessed.

Viewing current billing estimate
----

This report will give you a breakdown of estimated costs per day,
further broken into AWS components as well as monthly to date totals
and end of month projections.

```
fleet report billing
Date               Total     EC2     RDS    Cache    Other
---------------  -------  ------  ------  -------  -------
2015-10-22         55.53   26.13   17.63    11.74     0.04
2015-10-23         76.95   37.75   23.50    15.65     0.05
2015-10-24         76.99   37.79   23.50    15.65     0.05
2015-10-25         76.99   37.79   23.50    15.65     0.05
2015-10-26         77.18   37.96   23.50    15.65     0.07
2015-10-27         80.89   41.67   23.50    15.65     0.07
2015-10-28         81.44   42.21   23.50    15.65     0.08
2015-10-29         81.21   41.64   23.50    16.00     0.07
2015-10-30         81.38   41.63   23.50    16.18     0.07
2015-10-31         81.40   41.65   23.50    16.18     0.07
Month AWS total   769.96  386.22  229.14   153.98     0.63
Fleet             307.99
Total            1077.95

2015-11-01         77.18   35.47   24.01    15.65     2.05
2015-11-02         81.21   41.50   24.01    15.65     0.05
2015-11-03         81.70   41.99   24.01    15.65     0.05
2015-11-04         73.15   32.70   24.51    15.88     0.06
2015-11-05         72.28   31.90   24.56    15.75     0.06
2015-11-06         79.99   32.40   30.63    16.90     0.06
2015-11-07         79.36   31.78   30.63    16.90     0.06
2015-11-08         80.68   32.03   30.63    17.95     0.06
2015-11-09         62.40   24.60   24.84    12.91     0.05
2015-11-10         46.11   17.41   19.01     9.65     0.04
Month AWS total   734.06  321.79  256.84   152.88     2.55
Fleet             293.63
Total            1027.69

End of month projections (30 Days)        Low    Median     High
------------------------------------  -------  --------  -------
AWS                                   2254.10   2299.47  2358.27
Fleet                                  901.64    919.79   943.31
Total                                 3155.75   3219.26  3301.58

Note: All prices are in USD and do not include GST or licence fees.
Note: These are only estimates, your final invoice may vary.

Last updated: 2015-11-11 03:56:02 UTC
```

You can also have this report sent out via the notification channel:
```
fleet report billing --output_mode notification
```

Setting a billing alarm
-----------------------

If you can't monitor the billing report yourself, Fleet can send you a [notification](/how-to/manage-notifications)
when your usage exceeds a threshold in USD.

The billing run is executed daily, and will notify you if the estimated current
spend exceeds the threshold you have configured.

The notification will be sent only the first time you exceed the threshold
each month, unless you have changed the threshold since being notified.

```
$ fleet config billing-alarm
No billing alarm has been set

$ fleet config billing-alarm 1000
Set billing alarm threshold to '1000'

$ fleet config billing-alarm
The current alarm threshold is '1000'

$ fleet config billing-alarm --unset
Removed billing alarm

$ fleet config billing-alarm
No billing alarm has been set
```

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

