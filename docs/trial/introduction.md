This walkthrough is intended for users who have received a trial USB key at Magento Imagine 2015.  Users with a key are entitled to a free Fleet trial.

# Pre-Requisites

To complete this walkthrough, you'll require the following:

- Your Fleet USB trial key.
- Your Fleet portal credentials, issued via e-mail after you have completed the sign up process.
- Your Fleet SSH key passphrase, issued via e-mail after you have completed the signup process.
- Your fleet SSH address, which will look like ``aux.abcd1234.f.nchr.io``.

If you have any issues with your trial, please despatch an e-mail to imagine@anchorfleet.com

## Interfacing with Fleet

There are two ways to interface with Fleet.  The online web portal, and the command line tooling.

### Using the Portal

After completing the trial sign up process, your portal access will be provisioned.  An e-mail will be despatched with your login details.

Visit the [Portal](https://portal.anchorfleet.com) and login.

### Using the CLI

#### Set up your private key

First, you'll need to copy the SSH private key, provided on your USB drive, to your local machine and fix the permissions.

This example assumes you're using OS X and standard paths.  You may need to adjust to suit for your local environment.

In your terminal, execute the following:
```
cp /Volumes/ANCHOR/fleet_trial_ssh_key ~/.ssh/fleet_trial_ssh_key
chmod 0600 ~/.ssh/fleet_trial_ssh_key
```

#### Create a shell alias

In order to complete Fleet operations, you'll need to test you can log into the **aux node**.
From here you can run `fleet` commands.  The `fleet` command runs remotely within your fleet and is implemented as a local shell alias.

Future examples will assume you have aliased the `fleet` command.  Be sure to substitute the Fleet address with that of your specific Fleet.

```bash
alias fleet='ssh -t -o LogLevel=QUIET -i ~/.ssh/fleet_trial_ssh_key deploy@aux.{your_fleet}.f.nchr.io --'
```

When you run this command, you will be prompted for the **SSH key passphrase**.  This will have been e-mailed to you upon signing up for your trial.

# Getting Started

There are two ways to complete your Fleet trial.

* Using the [Portal](walkthrough-portal.md)
* Using the [CLI](walkthrough-cli.md)

You can interchange between the different interface methods at any time.

This will walk you through the steps involved in bringing up a preconfigured demo store on your trial Fleet.

The code for the demo store used can be cloned from http://bitbucket.org/AnchorCat/demo-magento.git
