#### I don't have a certificate, can you create one for me?

Yes! Anchor can handle the request and issuing of a certificate on your behalf.
Please contact us to find out which certificate will be suitable for your
business.


#### I would like to arrange my own certificate, can I provide my own?

Certainly. If you don't already have an issued certificate you will need to
generate a Certificate Signing Request (CSR) and have it signed by a
Certificate Authority (CA).

You'll need to start by generating a new private key and CSR. If you're working
on a Linux or OSX machine, you can use the first command detailed on this page:

[https://www.sslshopper.com/article-most-common-openssl-commands.html](https://www.sslshopper.com/article-most-common-openssl-commands.html)

```
$ openssl req -out CSR.csr -new -newkey rsa:2048 -nodes -keyout privateKey.key
```

You will be prompted for information to be included in the CSR. It's most
important to ensure the Common Name (CN) is correct; this is the URL that
visitors will see when they visit your site, eg. `www.mysite.com.au`

Once you have generated the private key and CSR you will need to keep these
files safe. The CSR will be sent to your CA so that they can issue your
certificate, while the private key will **only** be entered into Fleet, along
with the certificate (shown below in *Adding a new certificate*).


#### Can I have different certs for different parts of my site?

No, you can only have one certificate per environment, which means all
subdomains must be listed as [alternative
names](https://en.wikipedia.org/wiki/SubjectAltName) on the certificate.
[Wildcard certificates](https://en.wikipedia.org/wiki/Wildcard_certificate) are
also a suitable solution.
