Change Log
----------

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
* Log [Database deadlocks](troubleshooting/database/#database-deadlocks)

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
