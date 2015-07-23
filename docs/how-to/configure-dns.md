As part of the go-live process for your site you will need to update your DNS
records to point to your Fleet installation. For new sites this is part of the
setup process. For existing sites being migrated to Fleet, this is one of the
final, critical steps that you'll take.

This page assumes a basic understanding of DNS concepts and common record types
(A, CNAME, etc), and basic Fleet terminology (environments, releases).


Our example Fleet
----

For the purposes of explanation, we will use a fictional retailer named **Best
Pants**. Best Pants has a Fleet named `bestpants`, and two environments: `prod`
and `dev`. Best Pants uses bestpants.com for their website.


The records needed
----

Each environment has automatically-created internal DNS names. Using the `prod`
environment from *Best Pants* as our example, they are:

```
   admin.prod.bestpants.f.nchr.io
adminssh.prod.bestpants.f.nchr.io
    solr.prod.bestpants.f.nchr.io
     www.prod.bestpants.f.nchr.io
```

For the dev environment, there will likewise be `www.dev.bestpants.f.nchr.io`,
`admin.dev.bestpants.f.nchr.io`, etc.


Mapping real DNS names to internal DNS records
----

In order to be useful and accessible, hostnames in the bestpants.com domain are
mapped to the internal names with `CNAME` DNS records:

```
   admin.bestpants.com  ->     admin.prod.bestpants.f.nchr.io
adminssh.bestpants.com  ->  adminssh.prod.bestpants.f.nchr.io
    solr.bestpants.com  ->      solr.prod.bestpants.f.nchr.io
     www.bestpants.com  ->       www.prod.bestpants.f.nchr.io

         bestpants.com  ->       www.prod.bestpants.f.nchr.io
```

You might have noticed that the apex of the domain, `bestpants.com`, is a
special case mapping. This is due to a specification limitation, that CNAME
records aren't normally allowed for the apex of a domain (ie. the bare domain
name without a subdomain like `www`). We recommend using a provider that can
perform *flattening* and [accept a CNAME at the
apex](https://support.cloudflare.com/hc/en-us/articles/200169056-CNAME-Flattening-RFC-compliant-support-for-CNAME-at-the-root),
such as Cloudflare.


What to do
----

These steps will need to be done for each environment that you wish to use.

### If you are making a new site

If your site is new and living on Fleet from its inception, you can setup DNS
records for the environment straight away, as described above in *Mapping real
DNS names to internal DNS records*.


### If you are migrating an existing site to Fleet

In this case you do **not** want to change the DNS for your `prod` environment,
which will already be setup for your existing site. This will be one of the
last steps of the migration.

For other environments, such as `dev`, `testing`, and so on, these *should* be
setup immediately for your own convenience.

**TBC:** can you prepare here by dropping the TTLs?

**TBC:** do XYZ before DNS during migration

After doing XYZ, add the DNS CNAME records as described above in *Mapping real
DNS names to internal DNS records*. Once the DNS changes have propaged, your
new Fleet is now live.

**TBC:** after making the DNS changes, do ABC to complete the work.
