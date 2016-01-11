## How are Fleet platform updates performed?

Fleet platform updates are in three parts, base image, CLI and infrastructure.

Keep an eye on the [changelog](/changelog) to see if there is any special handling you need to do
in order to receive a new feature or fix.

### Base images

These are the machine images used to build your releases.

The base images are rebuilt weekly to include security fixes and any new or changed features.

In order for your running sites to receive the updated images, you must create and load a new release.

### The Fleet CLI

This is updated automatically when a new version of Fleet is released.

Nothing needs to be done to receive updates to this component.

### Infrastructure

Infrastructure updates are rolled out with each Fleet release.

Where there are environment-level changes, we will update your prod environment automatically,
but any other environments must be destroyed and recreated in order to receive the updates.

Release-level changes will be received with the next loaded release.

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

Maintenance may not be performed every week, it will only be performed when necessary.

As these upgrades can require a restart of the services, if the environment undergoing maintenance
is not HA there may be short periods of downtime as the services are rebooted.
