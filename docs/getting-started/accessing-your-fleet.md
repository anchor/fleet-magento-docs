# Accessing Your Fleet

In order to complete Fleet operations, you need to access the **aux node**. From here you can run the `fleet` commands.

## Log in to the aux node

Test you can log into the **aux node**.

```bash
ssh -t deploy@aux.{fleet-id}.f.nchr.io
```

An easier way to access fleet is to set up an alias.
Future examples will assume you have aliased the `fleet` command

```bash
alias fleet='ssh -t -o LogLevel=QUIET deploy@aux.{fleet-id}.f.nchr.io --'
```

Once you're done with the test and alias setup above, you should be able to type the following in your terminal and get the list of available commands

```bash
fleet -h
```

Should you need to add access to other people in your team, you can add their ssh keys with the following guide. If not, we'll move on to [configuring revision control](getting-started/configuring-revision-control/) so your fleet can access it.

## Adding SSH Keys

We'll preload your first SSH key so you can get in, after that you can add and remove keys at any time.

```bash
$ fleet key add testkey
Please enter your SSH public key. End with EOF.
----------%<-----------
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAz9ez0XtWR8exwSwmUdE5Gy8i1qoBa7vJI18hB+9FKpHvPK+7TUwxwtvdp2vBPfQcP2Pu4bL5EsWYwpCIQ2LlFeooqjeNIsoGxvqVmiNF+ax5uS83r3kzPVKhhoaT6PSj8zZY6JlzDUUA0TU9IrPDquV/u8YApixwP53z4hmcCI6QaVNF/1zrrxzDsJDSJxDXSSRIstE8YgsyNf8yrT3LNTjIp5zmHtnJzm24IuGqLGRRuONri5yPjB0393oSOs9yH1ex9YogeQBRlS7JTSb1Hqa0WIU8qrCt4HwMwSNHPUphTOB/nrpafmalA9XJcOYGPCMswSCPgGuJ7jT2HMREvw==
^D

$ fleet key list
# name      key            last_modified
# -------   ------------   -------------
# testkey   AAAAB3Nza...   ...

$ fleet key remove testkey
```
