# Configuring revision control

New releases are created in Fleet using the [fleet release create](/how-to/manage-releases#creating-a-release) command. This can create a release from any commit (tree-ish in git terminology).

![](/getting-started/fleet-push-release.png)

For this system to work you'll need to add your Fleet's public SSH key to allow it to clone your repository:

## Install Deployment Key

For Fleet to be able to create releases from your code, it needs to be able to
pull from your repository.

Anchor will have provided you with a deployment key when you created your Fleet.
You can also retrieve the key yourself using the _fleet config publickey_ command.

### BitBucket

 1. Repository -> Settings -> Deployment keys
 1. Press 'Add key'
 1. Choose a name for the key, anything is fine
 1. Paste the deploy key provided by Anchor
 1. Press 'Add key'

![](/getting-started/deploy-key-bitbucket1.png)

![](/getting-started/deploy-key-bitbucket2.png)

### GitHub

 1. Repository -> Settings -> Deploy keys
 1. Press 'Add deploy key'
 1. Give the key a title, anything is fine
 1. Paste the deploy key provided by Anchor
 1. Do not check 'Allow write access', Fleet only requires read access.
 1. Press 'Add key'

 ![](/getting-started/deploy-key-github1.png)
 ![](/getting-started/deploy-key-github2.png)
