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
If you include a file named `fleet-health-check.php` in your document root it
will be included by the default health check.

You can test it manually by connecting to `http(s)://<yoursite>/fleet-health-check`.

Please ensure your health check script meets the following requirements.

 * It must return HTTP 200 on success and HTTP 500 on failure.
 * It must be safe to run a large number of times in parallel, including on the same instance.
