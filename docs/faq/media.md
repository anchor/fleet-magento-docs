### How is Magento's media synchronised between servers?
They are stored on the same MySQL database server as is used for Magento's
catalog. This is Magento's officially-supported system for distributing media to
multiple application servers.



### How does the web server retrieve media from the database?
Images are still available from their usual URLs. When a request for one of
these URLs comes in and the image is not stored locally it will be redirected
to a Magento-provided `get.php` script by a rule configured in the `media/.htaccess` file.
`get.php` then downloads the image from the database and stores it locally under `media/`
and the image is served.


### How are catalog thumbnails handled?
Magento will automatically store these in the database if it is configured to
use the database for media.


### Does storing them in the database negatively impact performance?
In our testing, the real-world impact has been negligible.

Static assets will generally be cached in Varnish or a CDN. This means that in
practice Magento has little need to retrieve assets from the database.

As an example, a site receiving tens of thousands of queries per second to its
catalog was receiving less than one per second for media due to the positive
effect of caching.


### Why not use a network filesystem?
One of the goals of Fleet is to have all components be highly available if
possible. A truly highly-available filesystem is difficult to accomplish on most
cloud platforms, primarily due to the inability to reliably fence a failed node.
This makes traditional solutions such as [NFS](
http://en.wikipedia.org/wiki/Network_File_System) or [CIFS](
http://en.wikipedia.org/wiki/Server_Message_Block) unreliable.


### Why not use S3?
The ideal solution to the media problem would be to place media into an object
store, such as [Amazon S3](http://aws.amazon.com/s3/) or [Google Cloud
Storage](https://cloud.google.com/storage/), but Magento provides no support
out of the box for storing media in an external object store.

### Why not use an S3-backed filesystem?
There are numerous implementations of S3-backed filesystems. These include
[S3FS(1)](https://code.google.com/p/s3fs/), [S3FS(2)](
https://fedorahosted.org/s3fs/), [S3backer](
http://code.google.com/p/s3backer), [S3QL](
https://bitbucket.org/nikratio/s3ql/overview) and many others.

Our testing has shown that these tend to be slow (often significantly more so
than MySQL), far too unreliable for production use and often unsuited for
mounting on multiple servers simultaneously.

### I want to store assets in S3, and have a plugin to allow Magento to make use of S3.
You'll need to create an S3 bucket to use yourself, and configure Magento to make use of
the bucket for asset storage. The particular steps to configure this will depend on how
you have implemented S3 storage.

### Why are some images not appearing on my store?
Make sure when you're using Fleet to upload/sync media directly from the admin
node (`admin.{env}.{fleet-id}.f.nchr.io`) as opposed to through the application
servers (`www.{env}.{fleet-id}.f.nchr.io`).

In other words, only access the admin panel like so:

`admin.{env}.{fleet-id}.f.nchr.io/admin`

### Why do I get "Integrity constraint violation Duplicate entry" errors when synchronising?
This can occur when you have files or directories under your /media/ directory with the same
name but different case. Eg. `/media/catalog/product/a/` and `/media/catalog/product/A/` will
be both inserted, but the second one will violate the unique constraint on
directory names.

This can be avoided by either:

  1. removing/merging all duplicate files and directories
  1. modifying the database schema to use BINARY columns for `filename` and `directory` columns in the `core_file_storage` table, and `name` and `path` columns in the `core_directory_storage` table.
