Configuring Fleet is quick and simple without the need to download any software.

## Public SSH Key

Firstly, we will require your public SSH key.  This can typically be found
within your home directory:

```bash
$ cat ~/.ssh/id_rsa.pub

ssh-rsa AAAAB3NzaC1ycAADAQABAAABAQCsMFrDJrS1OSRJEvnhaIccUXDImvK/+PweGw44nXGCF/Fa02bjNWNP
jI2aspb8nY/KcnDeyEVUAK+ahQkC6K7jKd5KzgHdKxwd7NjrEQwbwOUQnUkacHWmut8e6NELlylvO9qij9DHyp2J
/6HMZBoj2jLNrkoSGWqsRY+hMilRxf1GH6qLWuyJ1JGgDhULi6s9D8A3DgZSKuQqGly6TJpasdB1Oer/pMqGKv7H
kzZV97JNYTA/4t3r4AaEN2dxvEB4cRz6areSy0uPEnq0/BouT3zPMlvVZThI+oRkthojoNtvvxAg65HoveE5JCXL
fgXrIA+ZgRP9M3ekiP username@machine.domain.net.au

```

If you do not have a public key already, please run `ssh-keygen` at your prompt
and follow the instructions.

Once done, please mail us the output of your public key.  Your public key is
*public*, and is safe to share with external parties.  _Never_ send anyone your
private key.

## Repository

Fleet is compatible with [Github](https://github.com/),
[Stash](https://www.atlassian.com/software/stash) and
[Bitbucket](https://bitbucket.org).  This tutorial assumes that you are using
[Bitbucket](https://bitbucket.org/). There are only two (2) configurations
required to setup Fleet within your repository on Bitbucket.

*For this tutorial we have pre-configured this on our repository for you*.

### Web Hook

You will need to setup a POST receive hook within your repository like so:

 1. Repository -> Settings -> Integrations -> Hooks
 1. Select a hook: POST
 1. URL: http://aux.ancora.f.nchr.io:5000/
 1. Save

![](/tutorial/bitbucket-webhook.png)


### Deployment Key

Add the Fleet public SSH key to your deployment keys.

1. Repository -> Settings -> Deployment keys
2. Add key
3. Insert SSH key
4. Save

![](/tutorial/bitbucket-deployment-key.png)


### Enabling Fleet

No downloading of software required.  Simply run the following *alias* on your
workstation terminal to configure Fleet:

```bash
$ alias fleet='ssh -t -o LogLevel=QUIET deploy@aux.ancora.f.nchr.io --'
```

You may now view what [environments](/how-to/manage-environments/) you have
running and then describe the production (prod) environment to see the [www URL
endpoint](http://www.prod.ancora.f.nchr.io) with the following commands:

```bash
$ fleet env list

name    status    release   releases   certificate   created    updated
------  --------  --------- ---------- ------------- ---------- -------------------------
prod    RUNNING   037205f   1           prod         2015-03-24 2015-06-03

$ fleet env describe prod

---------------- -------------------------
name             prod
status           RUNNING
whitelist        allow-all
ssl              certificate prod
created          2015-03-24 23:06:21+00:00
updated          2015-06-03 05:35:30+00:00
health           check OFF
tracked          branches fleet-deploy
previous         release
autoscaling      min 2
autoscaling      max 10
---------------- -------------------------

Releases:
name    status     loaded     updated   frontends
------- ---------- ---------- --------- ---------
037205f * ACTIVE * 2015-03-26 2015-06-03 2

Endpoints:
--------       ---------------------------------
admin          admin.staging.ancora.f.nchr.io
adminssh       adminssh.staging.ancora.f.nchr.io
adminwildcard  *.admin.staging.ancora.f.nchr.io
www            www.staging.ancora.f.nchr.io
wwwwildcard    *.www.staging.ancora.f.nchr.io
--------       ---------------------------------
```

Fleet is now configured.  You have established that your production environment
is running and have exposed the production *www endpoint* for the [Ancora
Store](http://www.prod.ancora.f.nchr.io)
