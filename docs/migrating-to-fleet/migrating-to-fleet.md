This procedure is a start-to-finish outlining a full migration from an external hosted Magento, to Fleet.

**XXX:** Look at DNS and SSL for these guys: sapphiregroup/naturalcandle/sneakyfisho/forumgroup

1. Follow the [Getting Started](../getting-started/getting-started.md) procedure to:
    * Configure your Magento installation in preparation for Fleet
    * Setup your git repo
    * Import your database
    * Do your first deployment

2. Test that everything works at a basic level

3. Cloudflare integration?

4. Enable caching and ensure it's well-behaved

5. [Order and install SSL certificates](../how-to/manage-certificates.md), and ensure they're working properly

6. DNS things
    * Verify that they have a DNS entry that points the root of the domain to `www`

7. Flip the switch and go live
    * FIXME: how and where is this done?

Go-live checklist
-----------------

This list should be a bunch of things that are already working. If you can tick
all the boxes, you're safe to go live on Fleet.

* Your *prod* environment:
    * is running
    * has a loaded release
    * has a suitable certificate associated with it (probably not self-signed)

    It should look something like this:

        deploy@aux-example:~$ fleet env list
        name    status    release      releases  certificate    created                    updated
        ------  --------  ---------  ----------  -------------  -------------------------  -------------------------
        prod    RUNNING   a1b2e3f             2  www_exmpl      2015-06-23 06:16:45+00:00  2015-07-20 05:15:31+00:00
