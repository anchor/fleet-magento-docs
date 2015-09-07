## How can I upload files to my Magento instance

You will need to use SFTP with key-based authentication.

You can [add the key](/how-to/manage-keys/#adding-a-key) then configure your integration to connect to the adminssh endpoint using SFTP.

## How can I connect to Magento's database server

There is no direct access to the database server from outside the Fleet environment.

You will need to set up an [SSH tunnel](/how-to/manage-databases/#using-an-ssh-tunnel) between the service attempting to connect to the database and the database.
