# What is an archive?
An archive is your application code and all of depedencies required by the application, compiled into a single file. In practice, it is a compressed tarball of your application files.

# How to create a release archive?
The archive file format that is compatible with fleet is .tar.gz. The manual process to create the file in a unix base system is to run the following command in your terminal:

`tar -C <path_to_your_code_directrory> -cvzf <archive_file_name> .`

So, as an example, if your code is in the `/home/dev/app/` directory of your local machine and you want to create an archive called `release.tar.gz`, the command is as follow:

```
$ tar -C /home/dev/app/ -cvzf release.tar.gz .
```

### Notes for Mac Users
In some cases, when the archive is created on a Mac OS, fleet will extract the archive with an extra .\_\* file for each files present in your archive. This is caused by AppleDouble file formats. You can remove this by appending `COPYFILE_DISABLE=1` in front of the tar command.

```
COPYFILE_DISABLE=1 tar -C /home/dev/app/ -cvzf release.tar.gz .
```

### Notes for Magento 2

With Magento 2 deployment, you will need to use an archive to create a release.

Our Magento 2 blueprint also expect the site to be serve from the /pub directory of your application. Assuming your application is going to be deployed on the top level directory of your repository, you will need to create a `.fleet/config` file with the following content:

```
webroot = pub/
``` 

You can read further about custom document root on the [Customisation](/configuring-magento-2-for-fleet/customisation/) page

Once you have installed all the dependencies of your application on your local development enviroment, you will need to bundle everything together to create an archive and [create a release from the archive](/how-to/manage-releases/#from-an-archive).
