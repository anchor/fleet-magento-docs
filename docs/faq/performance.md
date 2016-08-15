### My Magento site is slow, what can I do?

There are many possible things which can be done to improve the
performance of a Magento site.

We can't provide a comprehensive guide to performance tuning Magento,
but we've collected some suggestions to get you started.

#### Varnish ####

If at all possible, you should make use of Varnish. Varnish can both
improve your time to first byte and reduce the load on your frontend
instances, giving you better apparent performance, better ability to
scale, and in many cases lower costs for the same baseline load.

#### NewRelic ####

NewRelic can help you identify bottlenecks and slow paths in your code
and any database queries or external requests it makes, as such it is a
useful tool to assist in other optimisation work on your site.

#### Upgrade ####

Depending on the cause of poor performance, upgrading your Fleet could be a
viable solution. You can examine performance with either NewRelic or the assistance
of our support to determine if this would help.

#### Enabling Magento Flat Catalog ###

Magento's default database schema isn't optimised for reads, so enabling this
option allows an optimised cache of the product catalog to be generated. This
option will have greater benefit with more products and more attributes configured
in your store.
