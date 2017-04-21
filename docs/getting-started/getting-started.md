Fleet is simple to use, but requires a little bit of effort to set up.  Please first familiarise yourself with [what fleet is](../what-is-fleet/what-is-fleet.md).

## Configuring your application for Fleet

Certain applications may require a specific configuration to work optimally on Fleet.

See the instructions for your application below:

 * [Magento](../configuring-magento-for-fleet/introduction.md)
 * [Magento 2](../configuring-magento-2-for-fleet/introduction.md)

## Next steps

You'll then need to walk through:

 * [Accessing Your Fleet](accessing-your-fleet.md)
 * [Configuring Revision Control](configuring-revision-control.md)
 * [Your First Deployment](first-deployment.md)
 * [Pushing Out a Change](pushing-a-change.md)
 * [Cleaning Up Environments](cleaning-up-environments.md)
 * [Cleaning Up Releases](cleaning-up-releases.md)

## Summary

 * SSH to the **Aux node** to
   * Create a new release `fleet release create COMMIT`
   * View your Releases `fleet release list`
   * View your Environments `fleet env list`
   * Inspect an Environment `fleet env describe ENVNAME`
   * Create and destroy Environments `fleet env create ENVNAME`
   * Load Releases into Environments `fleet env load ENVNAME RELEASE`
   * Activate loaded Releases for Environments `fleet env activate ENVNAME RELEASE`
   * Destroy unneeded Environments `fleet env destroy ENVNAME`

![](/getting-started/fleet-summary.png)
