## Getting the Fleet Tool

The Fleet CLI tool uses the Fleet API (not currently documented) to control your fleet. To do so it requires that you:

1. Specify the hostname/location of your fleet.
1. Have an account with a verified email address and the requisite permissions.
1. Authenticate your requests with an SSL client certificate.

This guide will show you:

1. where to download the Fleet CLI tool
1. how verify your email address and get a signed SSL client certificate
1. how to set up a configuration file

### Downloading Fleet CLI Tool

Download the latest Fleet CLI tool from [HERE](TODO). It contains a [PEX](https://github.com/pantsbuild/pex) file that is run with the shebang `#!/usr/bin/env python2.7`. Run `env python2.7` to confirm you have a compatible version of python installed.

#### On Linux

Create a folder in `/opt` to store the fleet binary and add the location to PATH:

```
$ mkdir -p /opt/anchorfleet
$ mv fleet /opt/anchorfleet/.
$ echo 'export PATH=/opt/anchorfleet/:$PATH' >> ~/.bashrc
```

If you don't use bash remember to change the above commands to suit your shell, e.g. '~/.zshrc'.

#### On OSX

You can do the above for OSX if you wish however on OSX it is more conventional to put 3rd-party binaries in `/usr/local/bin`:

```
$ mkdir -p /usr/local/bin
$ mv fleet /usr/local/bin/.
$ echo $PATH | grep '/usr/local/bin' || echo 'export PATH=/usr/local/bin:$PATH' >> ~/.bash_profile
```

This only adds `/usr/local/bin` to PATH if it is not already in your PATH.

If you don't use bash remember to change the above commands to suit your shell, e.g. '~/.zshrc'. If your terminal program doesn't run a login shell remember to use `~/.bashrc` instead.

### Verifying your email address and getting a Certificate

At this stage we will assume your account has been created. If you are the admin of a new fleet, this will have been done when your fleet was created. Otherwise you may be a developer and an admin has already created your account. In both cases there should be an email in your account. For more info on creating a new account see [here](TODO).

The verification email you have received will contain a token that looks something like this: "Cnm9QQ.NEz8Pjzqq-FSPVQzpzdb_QN3yaE".

Before you use this token you will need know the hostname for your fleet. Say for example your fleet name is "myfleet", your hostname will be "myfleet.f.nchr.io".

Lastly you need a label for the certificate you are about to create. In this example we will label it "MyDesktop".

Assuming your email is test@example.com, we combine this to verify your account and create your cert like so:

```
$ fleet --host myfleet.f.nchr.io auth user verify test@example.com MyDesktop
<paste token: Cnm98A.ppWmKt7GNSA6hWxpjR1y_v6VIuk, and press ctrl+D>
```

If this step failed it is likely that your verification token has expired. You can have a new token resent to your inbox by running:

```
$ fleet --host myfleet.f.nchr.io auth user verify --resend-email test@example.com MyDesktop
<paste token: Cnm98A.ppWmKt7GNSA6hWxpjR1y_v6VIuk, and press ctrl+D>
```

Note the `--resend-email` flag. When the program pauses to wait for your token, check your inbox and use the newest token sent to you.

If it worked you now have a key and cert file in the configuration directory mentioned below.

### Set up a configuration directory

It can be annoying to always add the `--host` flag at the begining of every command. Likewise for adding `--key-file` and `--cert-file` which we would have to do for all future commands. That's why the fleet tool creates a configuration directory in `~/.config/anchorfleet/`.

Next we can create a config file so we don't have to specify:

```
$ cat <<CONFIG > ~/.config/anchorfleet/config.ini
[Fleet client]
host: myfleet.f.nchr.io
#cert-file: ~/.config/anchorfleet/default.crt
#key-file: ~/.config/anchorfleet/default.key
CONFIG
```

This creates a config file with the above contents in a format compatible with python's [config parser](https://docs.python.org/2/library/configparser.html) library. Note the commented out options and their default settings. By default the first key/cert pair you create will be symlinked to default.crt and default.key. You can uncomment and override these if you wish.

You now have the Fleet CLI Tool installed and configured with your verified account's certificate files. To see how to create new users and manage their permissions [click here](/getting-started/creating-users). To see how to use fleet to manage your magento site [click here](/getting-started/first-deployment).
