## Getting the Fleet Tool

Thee Fleet CLI tool uses the Fleet API (not currently documented) to control your fleet. To do so it requires that you:

1. specify the hostname/location of your fleet
2. have an account with a verified email address and the requisite permissions
3. authenticate your requests with an SSL client certificate

You may configure all of this using cli flags or a configuration file.

This guide will show you:

1. where to download the Fleet CLI tool
2. how verify your email address and get a signed SSL client certificate
3. how to set up a configuration file and directory

### Downloading Fleet CLI Tool

Download the latest Fleet CLI tool from [HERE](TODO). For now add it to your PATH. In the future this may be available as a package on PyPI or something similar.

### Verifying your email address and getting a Certificate

At this stage we will assume your account has been created. If you are the admin of a new fleet, this will have been done when your fleet was created. Otherwise you may be a developer and an admin has already created your account. In both cases there should be an email in your account. For more info on creating a new account see [here](TODO).

The verification email you have received will contain a token that looks something like this: "Cnm9QQ.NEz8Pjzqq-FSPVQzpzdb_QN3yaE". Before you use this token you will need to create a private key using openssl:

```
$ openssl genrsa -out key.pem 4096
```

This will have created a file called key.pem. Never share the contents of this file with anyone.

You will also need to know the hostname for your fleet. Say for example your fleet name is "myfleet", your hostname will be "myfleet.f.nchr.io".

Lastly you need a label for the certificate you are about to create. This is a human readable name of your choosing. It's possible for a user to have multiple certs, possibly one for each device, so that if a device is lost or compromised it's certificate can be revoked. In this example we will label it "MyDesktop".

Assuming our email is test@example.com, we combine this to verify our account and create our cert like so:

```
$ fleet --host myfleet.f.nchr.io auth user verify test@example.com MyDesktop key.pem > cert.pem
<paste token: Cnm98A.ppWmKt7GNSA6hWxpjR1y_v6VIuk, and press ctrl+D>
```

NB: this reads your key file locally to create a CSR. Your key isn't sent anywhere.

Next, check that you've created a cert like so:

```
$ openssl x509 -text -noout -in cert.pem
```

If this step failed it is likely that your verification token has expired. You can have a new token resent to your inbox by running:

```
$ fleet --host myfleet.f.nchr.io auth user verify --resend-email test@example.com MyDesktop key.pem > cert.pem
<paste token: Cnm98A.ppWmKt7GNSA6hWxpjR1y_v6VIuk, and press ctrl+D>
```

Note the `--resend-email` flag. When the program pauses to wait for your token, check your inbox and use the newest token sent to you.

### Set up a configuration directory

It can be annoying to always add the `--host` flag at the begining of every command. Likewise for adding `--key-file` and `--cert-file` which we'll have to do for all future commands. That's why we allow for the use of a configuration directory.

By default fleet will look in `~/.config/anchorfleet`. Like all configuration options this can be overridden with a cli flag, in this case `--config`. Create the directory and move your key and cert files there:

```
$ mkdir -p ~/.config/anchorfleet
$ mv key.pem ~/.config/anchorfleet/
$ mv cert.pem ~/.config/anchorfleet/
```

Next we'll create the config file:

```
$ cat <<CONFIG > ~/.config/anchorfleet/config.ini
[Fleet client]
host: myfleet.f.nchr.io
#cert-file: ~/.config/anchorfleet/cert.pem
#key-file: ~/.config/anchorfleet/key.pem
CONFIG
```

This creates a file with the above contents in a format compatible with python's [config parser](https://docs.python.org/2/library/configparser.html) library. Note the commented out options and their default settings. You can uncomment and override these if you wish.

You now have the Fleet CLI Tool installed and configured with your verified account's certificate files. To see how to create new users and manage their permissions [click here](/getting-started/creating-users). To see how to use fleet to manage your magento site [click here](/getting-started/first-deployment).
