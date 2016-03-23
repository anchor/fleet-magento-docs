To accomodate the case where you are using Magento plugins which are
incompatible with assets being stored in the database, there is the
option to run an NFS server for shared file storage.

**Important:** The NFS node is *not* highly available. If NFS is used 
it can become a single point of failure for your environment. For this
reason we recommend using database storage for assets unless there is no
other option.

### Enabling and Disabling NFS

To enable NFS on an environment run `fleet env nfs <environment> ON`

A new NFS instance will be created. This will take
a few minutes before it is ready.

**Note:** Only releases loaded *after* NFS is enabled will be able to access NFS.

Later if you wish to disable NFS, you can run `fleet env nfs <environment> OFF`

### Using NFS

Once NFS is enabled for an environment, any releases newly loaded
into the environment will have a shared NFS volume available at
/nfs/shared.

In order to make use of NFS for storage of assets, you will need to
direct Magento to use the shared volume. The easiest way to do this
would be to create symbolic links in your codebase controlling which
directories are on the shared volume.

Any required subdirectories within the NFS volume should be configured
using [boot scripts](/configuring-magento-for-fleet/customisation/#running-scripts-on-instance-boot).
