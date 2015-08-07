Set up New Relic Integration
---------------------

Fleet can integrate with your New Relic account to provide you
with insight into your application's performance.

You can set your New Relic licence for your Fleet with:

```
fleet config newrelic '<your newrelic licence key>'
Set NewRelic licence to '<your newrelic licence key>'.
This will apply only to newly loaded releases.
```

Any new releases loaded after this will report to NewRelic using the given licence key.
These will report with the Application Name: `fleet-<fleet name>-<environment>-<role>`.

You can disable New Relic for newly loaded releases with:

```
fleet config newrelic ''
Removed NewRelic licence.
This will apply only to newly loaded releases.
```

You can check the current licence key with:

```
fleet config newrelic
NewRelic licence is '<your newrelic licence key>'
```
