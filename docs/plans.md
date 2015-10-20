# Plans

Fleet plans hardware specification page.

## Flotilla

| Role | No |  Type | CPU | Mem | Multi-AZ |
|----------|:---:|------|:---:|:---:|:---:|
| Varnish | 1 | m3.medium | 1 | 3.75 | N |
| Frontend | 2 |  m3.medium | 1 | 3.75 | Y |
| Admin | 1 | m3.medium |  1 | 3.75 | N |
| Aux | 1 | t2.small | 1 | 2 | N |
| Cache | 1 | cache.m3.medium | 1 | 2.78 | N |
| Sessions | 1 | cache.m3.medium | 1 | 2.78 | N |
| Database | 1 | db.t2.medium  | 2 | 4 | N |

## Convoy

| Role | No |  Type | CPU | Mem | Multi-AZ |
|----------|:---:|------|:---:|:---:|:---:|
| Varnish | 2 | m3.medium | 1 | 3.75 | Y |
| Frontend | 2 | m3.medium  | 1 | 3.75 | Y |
| Admin | 1 | m3.medium | 1 | 3.75 | N |
| Aux | 1 | t2.small | 1  | 2 | N |
| Cache | 2 | cache.m3.medium  | 1 | 2.78 | Y |
| Sessions | 2 | cache.m3.medium | 1 | 2.78 | Y |
| Database | 2 | db.t2.medium | 2 | 4 | Y |

## Squadron

| Role | No |  Type | CPU | Mem | Multi-AZ |
|----------|:---:|------|:---:|:---:|:---:|
| Varnish | 2 | c3.large | 2 | 3.75 | Y |
| Frontend | 2 | c3.large  | 2 | 3.75 | Y |
| Admin | 1 | c3.large | 2 | 3.75 | N |
| Aux | 1 | t2.small | 1  | 2 | N |
| Cache | 2 | cache.m3.medium | 1 | 2.78 | Y |
| Session | 2 | cache.m3.medium | 1 | 2.78  | Y |
| Database | 2 | db.r3.large | 2 | 15 | Y |

## Armada

| Role | No |  Type | CPU | Mem | Multi-AZ |
|----------|:---:|------|:---:|:---:|:---:|
| Varnish | 2 | c3.xlarge | 4 | 7.5 | Y |
| Frontend | 2 | c3.xlarge | 4 | 7.5  | Y |
| Admin | 1 | c3.xlarge | 4 | 7.5 | N |
| Aux | 1 | t2.small | 1  | 2 | N |
| Cache | 2 | cache.m3.medium | 1 | 2.78 | Y |
| Sessions | 2 | cache.m3.medium | 1 | 2.78 | Y |
| Database | 2 | db.r3.xlarge | 4 | 30.5 | Y |

## Navy

| Role | No |  Type | CPU | Mem | Multi-AZ |
|----------|:---:|------|:---:|:---:|:---:|
| Varnish | 2 | c3.2xlarge | 8 | 28  | Y |
| Frontend | 2 | c3.2xlarge | 8 | 28 | Y |
| Admin | 1 | c3.2xlarge | 8 | 28 | N |
| Aux | 1 | t2.small | 1  | 2 | N |
| Cache | 2 | cache.m3.medium  | 1 | 2.78 | Y |
| Sessions | 2 | cache.m3.medium | 1 | 2.78 | Y |
| Database | 2 | db.r3.2xlarge | 8 | 61 | Y |
