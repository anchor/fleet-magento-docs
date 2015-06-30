Fleet is a platform for managing multiple consistent environments. These environments can be created as they are needed and destroyed when their usefulness has ended.

Environments
------------
Environments are fully self-contained - each one has a copy of the entire stack necessary to run your application. The exact components inside the environment are dependent on your application, but will generally include things like a database server, session store, cache, application servers and load balancers.

The self-contained nature of environments means that they can safely be used to validate a new release or conduct performance testing without the risk of an outage on the production site.

Deploying code
--------------
Code is deployed by 'loading' a code release into a new or existing environment. The loading process is automated - once you've indicated which release you wish to load the environment will automatically load that release. Once a release has been loaded, it can be activated, which will direct traffic to the new release.

The switch between new and old release is atomic and zero downtime. The new release is prepared in parallel while the environment continues to run the old release. Once the preparation is complete the entire environment can be switched over at once. This means that there's no risk of some application servers finishing a deploy before others, nor of a failed deploy causing some servers to be left running a different version of the application to others.

Releases
--------
Releases are uploaded to Fleet via a push to a special branch of your git repository. When Fleet sees such a push it will pull down a copy of your code and make it ready for loading into an environment. This process will take few minutes, depending on the size of your codebase, but only needs to be done once for each release.
