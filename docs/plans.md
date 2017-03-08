# Fleet environment plans.


You can specify the environment size when creating a new environment.
Once created an environment's size cannot be modified.

See: [Managing Environments](how-to/manage-environments)

You can specify whether an environment is Multi-AZ (High Availablity) when creating it, note that this will increase the cost.

Multi-AZ is recommended only for production or mission critical environments.

## f1-small (Flotilla/Convoy)

| Role     | Type            | VCPUs | RAM GiB |
|----------|:---------------:|-------|:-------:|
| Varnish  | m3.medium       | 1     | 3.75    |
| Frontend | m3.medium       | 1     | 3.75    |
| Admin    | m3.medium       | 1     | 3.75    |
| Cache    | cache.m3.medium | 1     | 2.78    |
| Sessions | cache.m3.medium | 1     | 2.78    |
| Database | db.t2.medium    | 2     | 4       |

## f1-medium (Squadron)

| Role     | Type            | VCPUs | RAM GiB |
|----------|:---------------:|-------|:-------:|
| Varnish  | c4.large        | 2     | 3.75    |
| Frontend | c4.large        | 2     | 3.75    |
| Admin    | c4.large        | 2     | 3.75    |
| Cache    | cache.m3.medium | 1     | 2.78    |
| Sessions | cache.m3.medium | 1     | 2.78    |
| Database | db.r3.large     | 2     | 15      |

## f1-large (Armada)

| Role     | Type            | VCPUs | RAM GiB |
|----------|:---------------:|-------|:-------:|
| Varnish  | c4.xlarge       | 4     | 7.5     |
| Frontend | c4.large        | 2     | 3.75    |
| Admin    | c4.large        | 2     | 3.75    |
| Cache    | cache.m3.medium | 1     | 2.78    |
| Sessions | cache.m3.medium | 1     | 2.78    |
| Database | db.r3.xlarge    | 4     | 30.5    |

## f1-xlarge (Navy)

| Role     | Type            | VCPUs | RAM GiB |
|----------|:---------------:|-------|:-------:|
| Varnish  | c4.2xlarge      | 8     | 28      |
| Frontend | c4.2xlarge      | 8     | 28      |
| Admin    | c4.2xlarge      | 8     | 28      |
| Cache    | cache.m3.medium | 1     | 2.78    |
| Sessions | cache.m3.medium | 1     | 2.78    |
| Database | db.r3.2xlarge   | 8     | 61      |

