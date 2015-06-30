This walkthrough assumes you have already signed up for your trial and received your Portal credentials via e-mail.  Please view the introduction(introduction.md) if you have not yet done so.

# Authenticate

First, authenticate yourself using your provided credentials at the [Fleet Portal](https://portal.anchorfleet.com)

# Bootstrap your trial

Your Fleet is currently empty, which is not very useful.

You'll need to create an initial environment to host your site. We've preloaded a snapshot and two release artefacts for use as a demo store.

## Create an environment

We'll begin by creating a new [environment](../what-is-fleet/what-is-fleet.md#environments):

1. Press the ``Create Environment`` button
1. You'll be presented with the following dialogue:
![Create Environment](/trial/bootstrap-prod.png)
1. The environment's name will be pre-populated to ``prod``.  Select the ``demo-magento`` snapshot from the list and select ``Create``.
1. Your first environment is now being created:
![Creating Environment](/trial/bootstrap-prod-creating.png)

At this point, the Fleet automatons are busy building all the requisite parts to run your first environment.  

You just created an ***entire application environment*** with a few button presses!

## Loading a release

Your trial's first environment has been provisioned, but no [release](../what-is-fleet/what-is-fleet.md#releases) has yet been loaded.

![Prod Empty](/trial/prod-empty.png)

To view the demo store, you'll first need to load and activate a release:

1. Select ``Load Release``
1. Select the release entitled ``Install Turpentine Extension`` with commit ID ``0a9999d``.
![Load Release 0a9999d](/trial/load-release-0a9999d.png)
1. Select ``Load``.
1. Your release will now be in ``Creating`` status.  At this point, Fleet is currently provisioning application servers from the build artefact associated with this release.
![Creating Release](/trial/loading-release.png)

## Activate a release

The application servers created from your release build artefact are now online, but not yet receiving traffic.

The final step to making this release live is to activate the release:

1. In the release list, inside the prod environment, select the ``0a999d`` release from the list.
![Activate Release](/trial/prod-activate.png)
1. Select ``Activate Release``.
1. Your environment will now move into ``Updating`` status whilst the release is made live.
![Prod Activating](/trial/prod-activating.png)

Your production environment is now live.


## Viewing your work

From scratch, you've just created an environment, loaded a release and subsequently activated it to receive traffic.

You can now access the live production environment and the active release in three ways:

* Using the public www endpoint.
* Using the administrative node's endpoint.
* By logging on to the administrative node by SSH.

Each of the required addresses are available in the portal:
![Prod Release Active](/trial/prod-release-active.png)

### Viewing the public website

To view the public website, simply click the address for the WWW endpoint, which should take the form of ``www.{env}.{fleet_id}.f.nchr.io``.  If this were your own website, you could set up a ``CNAME`` DNS record to this address for convenience.

### Viewing the administrative node

Fleet provisions a separate administrative node for every release.

The administrative node's WWW endpoint will take you directly to the administrative node.  This should take the form of ``admin.{env}.{fleet_id}.f.nchr.io``.

More interestingly however, is the administrative backend that Magento provides.  This is available at ``admin.{env}.{fleet_id}.f.nchr.io/admin/``.

The credentials to your administrative backend are as follows:

**Username**: ``admin``

**Password**: ``NCHqHiRF4b6a``

### Access the administrative node via SSH

Because Fleet provisions a separate administrative node for each release, you can use it to view and configure cron jobs.  The default Magento cron job is added automatically.

Because Fleet operates with **Immutable Infrastructure**, please note that _any changes made to the administrative node are ephemeral_.  The administrative node may be recycled at any moment, and a new one is provisioned with each release.

You can SSH into the administrative node as the ``deploy`` user, using the listed SSH address; this should take the form of ``adminssh.{env}.{fleet_id}.f.nchr.io``.

You will need to use the provided **SSH private key** along with the **SSH key passphrase** that was e-mailed to you.

e.g. ``ssh -i ~/.ssh/fleet_trial_ssh_key deploy@adminssh.{env}.{fleet_id}.f.nchr.io``

# Deploying a change

If you [view your Fleet demo store](#viewing-the-public-website) you'll notice that there's a broken image at the top.  This is less than ideal.

![Broken Image](/trial/broken-image.png)

To fix this, you'll need to deploy a new release.  Fortunately, we've pre-loaded a release with the right fix already.

You now can:

1. _Optionally_ [Create a new environment](#create-an-environment) to test the release outside of production.
1. **Load** the release into production and **activate** it.

Creating the new environment is recommended as part of a standard workflow, but we have a high degree of confidence this will work.

## Load the fixed release

1. In your production environment, select ``Load Release``
1. In the release list, select the release with commit ID ``5d04f61``, entitled ``Add demo store skin images``.
![Load Release 5d04f61](/trial/load-release-5d04f61.png)
1. Select ``Load``

The release will now move into ``Creating`` status.

![Creating 5d04f61](/trial/creating-5d04f61.png)

## Activate the fixed release

The Fleet automatons have now built the infrastructure to run your new release, but it isn't yet receiving traffic.

![](/trial/running-5d04f61.png)

To do so, we'll need to **activate** the release.

1. In the prod environment, select the **Running** release from the release list with commit ID ``5d04f61``.
![](/trial/activate-5d04f61.png)
1. Select ``Activate``
1. The **environment** will now move to **Updating** status whilst the release is activated.
![](/trial/prod-updating.png)

Fleet will now do a **zero downtime** cutover to the new release.  This change will be _transparent to customers_.

After the change has taken effect, the ``5d04f61`` release will list as **Running**

![](/trial/active-5d04f61.png)

## Check the change has taken effect

After the release is active, you should [view the public website](#viewing-the-public-website) to check the change has taken effect.

*Note:* Fleet uses DNS to switch between releases.  Your browser may cache an entry for a short time.

You should now see the updated site, with the fixed image header.

![](/trial/website-fixed.png)


## Rollback

Should anything go wrong after pushing a change and you need to roll-back, just activate the old release again.

## Cleaning up releases

Once you are happy that a new release is working in production, you can unload the old release to save you money.

1. Select the non-active release from the list.  This should be ``0a9999d``.
1. Select ``Unload``
![](/trial/release-unload.png)
1. The release will now move to ``Destroying`` status.
![](/trial/release-destroy.png)

Fleet will now shut down the application servers built from the specified release artefact so that they don't cost you money.
