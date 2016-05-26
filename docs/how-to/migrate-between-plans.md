In order to migrate to a new Fleet plan, you will need to migrate to a new environment.

This can be done in several ways.

You can either make use of Fleet's snapshotting capability to take a snapshot of your current production environment, then restore that snapshot to a new environment with the plan you want to migrate to, alternatively you can create a new environment in parallel to your existing environment and copy the database contents between the environments.

# Using Snapshots

This approach is relatively straightforward, but can involve up to an hour of downtime to perform the migration.

The idea with this approach is to use Fleet's snapshots to copy the state to a new environment of the desired plan
while maintaining the existing environment in a state ready to roll back if needed.

1. Turn on maintenance mode

      We need to prevent any more transactions entering the database before we begin the process.

      ```
      $ fleet env maintenance <source_env> ON
      ```

1. Take a snapshot of production

      ```
      $ fleet snapshot create <source_env> plan-migration
      ```

1. Create a new environment with the production snapshot

      ```
      $ fleet env create --size <size> --[no-]ha --source-environment <source_env> --snapshot plan-migration <dest_env>
      ```

1. Load and activate a release into the new environment

      You should load the same release as was previously active to reduce the chance unrelated changes
      introduce problems.

      ```
      $ fleet env load <dest_env> <release_id>
      $ fleet env activate <dest_env> <release_id>
      ```

1. Test to be sure the new environment is working as expected

      At this point you need to make the decision as to whether the new environment is ready to
      receive production traffic.

1. Turn on the protected status

      ```
      $ fleet env protected <dest_env> ON
      ```

1. Switch DNS to point at the new environment

      This will depend on your DNS provider. You will need to change your DNS to point at the endpoints for the new environment.

1. Mark the new environment as your default source environment

      This will mark the new environment as the default source environment when creating new environments.

      ```
      $ fleet config default-env <dest_env>
      ```

1. Cleanup

      Once traffic has been switched to the new environment, you can begin the cleanup process.

      This involves removing the created snapshot and the source environment.

      ```
      $ fleet snapshot destroy <snapshot_name>
      $ fleet env protected <source_env> OFF
      $ fleet env destroy <source_env>
      ```

# Using a database dump

This method allows a shorter duration of downtime, but involves a more complicated process to copy the database from one environment to another.

The idea with this approach is to create a new environment in parallel to the existing environment, and only disable access to the existing environment at the point you are ready to copy the database. This eliminates the delay in creating the snapshot and environment and loading the release.

1. Create a new environment using the latest prod snapshot

      ```
      $ fleet env create --size <size> --[no-]ha --source-environment <source_env> <dest_env>
      ```

1. Load and activate a release into the new environment

      You should load the same release as was previously active to reduce the chance unrelated changes
      introduce problems.

      ```
      $ fleet env load <dest_env> <release_id>
      $ fleet env activate <dest_env> <release_id>
      ```

1. Turn on maintenance mode

      We need to prevent any more transactions entering the database before we begin the process.

      ```
      $ fleet env maintenance <source_env> ON
      $ fleet env maintenance <dest_env> ON
      ```

1. Copy the database contents

      You will need to copy the database across. The best way to do this is to first
      [dump the source database](/how-to/manage-databases/#dumping-a-database), then
      load the database into the new environment.

      Make sure to clear the caches on the destination environment once the database has been loaded.

1. Test to be sure the new environment is working as expected

      At this point you need to make the decision as to whether the new environment is ready to
      receive production traffic.

1. Turn on the protected status

      ```
      $ fleet env protected <dest_env> ON
      ```

1. Switch DNS to point at the new environment

      This will depend on your DNS provider. You will need to change your DNS to point at the endpoints for the new environment.

1. Turn off maintenance mode for the new environment

      Now that the new environment is ready to process traffic, turn off maintenance mode.

      ```
         $ fleet env maintenance <dest_env> OFF
      ```

1. Mark the new environment as your default source environment

      This will mark the new environment as the default source environment when creating new environments.

      ```
      $ fleet config default-env <dest_env>
      ```

1. Cleanup

      Once traffic has been switched to the new environment, you can begin the cleanup process.

      This involves removing the source environment.

      ```
      $ fleet env protected <source_env> OFF
      $ fleet env destroy <source_env>
      ```
