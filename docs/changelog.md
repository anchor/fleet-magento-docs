Change Log
----------

2015-11-25
----------
* Added `fleet updates` commands. Allows [scheduling updates for fleet components](how-to/updates/), at this point, only RDS.

2015-11-16
----------

* Added [billing report](how-to/access-reports/#viewing-current-billing-estimate)

2015-11-10
----------

* Support for [custom health checks](configuring-magento-for-fleet/health-check/).
* Added warning when loading a third release into an environment.
* Fleet cron fragments (under /etc/cron.d/) are now readable by the deploy user.
* Weekly Fleet usage reports now sent.
* Autoscaling history now exposed as a [log](how-to/manage-logs/).
* NewRelic license can now be unset if it was previously set.
* Performance improvements to [env describe](how-to/manage-environments/#describing-an-environment).
* Version number (--version) now has meaningful output.

2015-10-20
----------

* Now uses ALIAS records instead of CNAMEs reducing the number of DNS lookups.
* Wildcard endpoints are now available `*.www` and `*.admin`.
* Simplified health check to reduce unnecessary recycling.
* Added ability to [run scripts on instance boot](configuring-magento-for-fleet/customisation/#running-scripts-on-instance-boot).
* Now shows which environments releases are loaded in `fleet release list`.
* Fixed conflicting documentation about Environment name limits.
* Fixed loading VCL on release loading when using custom document root.
* Added command to send a report about Fleet resource usage. `fleet report usage`.

2015-10-12
----------

* Support for setting the number of [PHP workers per frontend](how-to/manage-environments/#set-worker-counts-per-instance).

2015-10-06
----------

* Prevent reporting data to NewRelic from healthcheck.
* HTTP Authorization headers now passed through to PHP.
* Documented multisite configuration.
* Implemented Magento [Maintenance Mode](how-to/manage-environments/#enabling-and-disabling-maintenance-mode-for-an-environment).
* Added ability to [reboot database server](how-to/manage-databases/#rebooting-a-database).
* Send notification on creating an environment or loading a release.
* Endpoints for inactive releases are now available.
* Installed xcache (PHP opcode cache).
* Installed phpredis.

2015-09-21
----------

* Install rsync on frontend nodes.
* Document default maintenance and backup windows. [link](faq/updates-and-maintenance)
* Bugfix for `fleet env create --no-snapshot`.
* Validate SSH keys on 'key add' using 'ssh-keygen'.

2015-09-14
----------

* Documented which functions will increase your spend.
* Allow Admin node to access Frontend loadbalancer, used for internal Magento API.
* Increase idle timeout for Admin ELB from 60 to 3600 seconds.
* Documented the Solr version we use (3.6.x)
* Ensure database snapshot names are unique.
* Install php5-geoip module
* Updated Solarium documentation to specify port and path.
* Increased httpd buffer size for requests with large headers.

2015-09-07
----------

* Errors reports for created releases are now more compact
* Bugfix for rate limiting retries
* `fleet release create` reports an error if public key is denied
* Log Database deadlocks

2015-08-25
----------

 * Export NewRelic Server Metrics
 * Follow logs `fleet log view -f` (updates every 60 seconds)
 * Bugfix for setting Solr endpoint when activating a release.
 * Warn when manually snapshotting non-HA environments, requires `--force`
 * Allow specifying `--ha` or `--no-ha` when [Creating an Environment](how-to/manage-environments/#creating-a-new-environment).
 * CLI now can show non-release-specific logs
 * Log [MySQL slow queries](troubleshooting/database/#database-performance)
 * Documentation about [CORS](faq/cors/)
 * Documentation for [Adminer](how-to/manage-databases/) Database GUI
