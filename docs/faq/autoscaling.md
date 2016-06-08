
# What is autoscaling?

Autoscaling refers to a system where the resources allocated to an application
can be dynamically adjusted in response to load on the system.

In Fleet, autoscaling is applied to application server instances (Frontend
instances). This is designed to allow an application to scale across a
reasonable range of traffic levels. There will eventually be scalability
limits in regards to the backend (database) for a given size, so the Fleet size
should be chosen appropriately such that the database can serve the range of
loads expected.

Autoscaling in Fleet is designed to cope with the normal changes in traffic over a day, but is not
well suited to dealing with sudden spikes in load.

# How does autoscaling work?

In Fleet, autoscaling works by defining high and low watermarks for CPU load
which define the thresholds at which scaling actions are taken. Scaling actions
are to either remove a set number of instances at the low watermark, or to
increase the number of instances by a percentage at the high watermark.

Calculation of the CPU thresholds for purposes of comparison against the
watermarks are performed over a fixed period average, with samples taken
once per minute. This gives some protection against bursty traffic triggering
unnecessary scaling, but also means the system cannot quickly respond to
sudden traffic spikes without manual intervention.

# How can large traffic spikes be handled?

As the system cannot respond automatically quickly enough in response to sudden
large traffic spikes, care must be taken when traffic spikes are expected.

There are two common approaches to handling spikes.

The first is to [pre-warm the system](/how-to/manage-environments/#setting-the-number-of-active-frontends)
before performing actions which are likely to
generate spikes in traffic by manually increasing the number of instances available
to serve traffic. This approach is useful when the load spike can be predicted
such as before large customer mailouts or marketing activities.

The second is to maintain enough spare capacity in the system to deal with spikes.
This is the traditional method for dealing with traffic spikes when autoscaling is
not available and requires less manual intervention, but there is a corresponding
cost with maintaining the spare capacity.

Maintaining spare capacity can be done with a combination of
[maintaining a high minimum number of instances](/how-to/manage-environments/#changing-autoscaling-limits)
and [lowering the threshold](/how-to/manage-environments/#changing-the-autoscaling-thresholds)
determining when to scale up instances.
