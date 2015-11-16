
## When are backups performed?

The backup window is for one hour, and by default is set to 13:00-14:00 UTC (23:00-00:00 AEST/GMT+10).

Contact support to have the backup window changed.

## What is backed up?

Backups are performed via the [snapshot](how-to/manage-snapshots/) mechanism.

Only the database contents are backed up, as all other data is considered ephemeral and can be recreated on demand.

## When are upgrades performed?

The maintenance window is for one hour once a week, and by default is set to Tuesdays, 14:00-15:00 UTC (00:00-01:00 AEST/GMT+10).

Contact support to have the maintenance window changed.

## What happens during a maintenance window?

During a maintenance window, automated upgrades to the underlying infrastructure are undertaken.

This includes such things as MySQL or Redis software version updates.

As these upgrades can require a restart of the services, if the environment undergoing maintenance
is not HA there may be short periods of downtime as the services are rebooted.
