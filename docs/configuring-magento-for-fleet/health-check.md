Health Check
----

By default Fleet provides a basic health check for each frontend that
tests PHP is functioning correctly.

Should an instance fail this check the instance will be removed from
the load balancer, should it continue to fail the instance will be recycled
(terminated and another instance spawned in its place).

Providing a custom health check
----

You can provide your own health check along with your code.  
If you include a file named `fleet-health-check.php` in your document root.

This script will be moved to `/home/deploy/health-checks/fleet-health-check.php` and run periodically.  
You can check it manually by connecting to `http(s)://<yoursite>/fleet-health-check`.

You should ensure this script is not resource intensive.  
It must return a **HTTP 500** response if there are any issues, otherwise a **HTTP 200 OK** response.  
You must ensure that the script is able to run successfully even when run multiple times at once on the same instance.
