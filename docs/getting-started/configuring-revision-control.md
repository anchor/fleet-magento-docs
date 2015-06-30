# Configuring revision control

New releases are uploaded to Fleet via a `git push` to a special branch in your existing revision control system. This in turn runs a hook that signals to Fleet that a new release is ready for processing.

![](/getting-started/fleet-push-release.png)

For this system to work you'll need to do three things:

 1. Create the fleet-deploy branch
 1. Create a user for Fleet
 1. Enable the hook

These steps only need to be performed once, unless you move to a new repository.

## Create fleet-deploy branch
Fleet will only create releases for revisions pushed to the branch ``fleet-deploy``.

#### From the command line

To create the new branch, run `git branch fleet-deploy; git push origin fleet-deploy`

You will need to create a BitBucket/GitHub user who has read-access
to your site's git repository. We will provide you with a **public key** which must be added to this user so we can grab your updated code to create **releases** when you push a change to the fleet-deploy branch.

## Install Deployment Key

For Fleet to be able to create releases from your code, it needs to be able to
pull from your repository.

Anchor will have provided you with a deployment key when you created your Fleet.

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

## Install Hooks

### BitBucket

 1. Repository -> Settings -> Integrations -> Hooks
 2. Select a hook: **POST**
 3. URL: ``http://aux.{fleet-id}.f.nchr.io:5000/``
 4. **Save**

![](/getting-started/bitbucket-post-hook.png)

### GitHub

 1. Repository -> Settings -> Webhooks & Services
 2. Add Webhook
 3. Payload URL: ``http://aux.{fleet-id}.f.nchr.io:5000/``
 4. Content type: application/json
 5. Select: "Just the push event."
 6. **Add webhook**

![](/getting-started/post-hook-github.png)
