## Going Live Checklist

 - Be ready to switch DNS over
      - Note that you **must** use a CNAME or ANAME/ALIAS record to point to the Fleet endpoints. Never use an A record to point at Fleet, as the IP addresses used will change.
 - Make sure you have a valid SSL certificate for the domain you will use installed and configured for your production environment.
 - Make sure Magento's base_url (and any other relevant settings) are configured to use the live domain.
 - Make sure your environment whitelist is not blocking end-user traffic.
 - Configure instance recycling to be ON.
 - Make sure your autoscaling configuration is appropriate for the expected traffic levels.
 - Ensure you have set up an appropriate [health check](/configuring-magento-for-fleet/health-check) for your application.
