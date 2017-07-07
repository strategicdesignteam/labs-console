exports.mock = {
  toString: 'bkr-hv01-guest08.dsal.lab.eng.bos.redhat.com',
  isCheckingIn: false,
  system_id: '527f8733-5ea3-4c1e-a9dc-18e281235d09',
  display_name: null,
  remote_branch: 'host-8-177-245.host.centralci.eng.rdu2.redhat.com',
  remote_leaf: '1000010007',
  account_number: '1212729',
  hostname: 'bkr-hv01-guest08.dsal.lab.eng.bos.redhat.com',
  parent_id: null,
  system_type_id: 105,
  last_check_in: '2017-05-30T09:20:43.000Z',
  stale_ack: false,
  type: 'machine',
  product: 'rhel',
  created_at: '2017-05-30T09:20:38.000Z',
  updated_at: '2017-05-30T09:20:43.000Z',
  unregistered_at: null,
  reports: [
    {
      details: {
        found_keys: [],
        rhel: 6,
        error_key: 'REDHAT_GPGKEY_NOT_INSTALLED'
      },
      id: 782951625,
      rule_id: 'hardening_gpg_pubkey|REDHAT_GPGKEY_NOT_INSTALLED',
      system_id: '527f8733-5ea3-4c1e-a9dc-18e281235d09',
      account_number: '1212729',
      uuid: 'ed38f426a87e41168b33232075c4504e',
      date: '2017-05-30T09:20:43.000Z',
      rule: {
        summary_html: '<p>Red Hat&#39;s product signing keys are not installed, preventing verification of new packages and updates from Red Hat.</p>\n',
        generic_html: '<p>This system does not have the appropriate Red Hat product signing key installed.</p>\n<p>Red Hat recommends you install the latest product signing key.</p>\n',
        more_info_html: '<ul>\n<li>The Red Hat Product Signing Keys <a href="https://access.redhat.com/security/team/key">Customer Portal page</a></li>\n<li>The Red Hat Security Blog post about <a href="https://access.redhat.com/blogs/766093/posts/1976693">Secure distribution of RPM packages</a></li>\n</ul>\n',
        severity: 'INFO',
        ansible: false,
        ansible_fix: false,
        ansible_mitigation: false,
        rule_id: 'hardening_gpg_pubkey|REDHAT_GPGKEY_NOT_INSTALLED',
        error_key: 'REDHAT_GPGKEY_NOT_INSTALLED',
        plugin: 'hardening_gpg_pubkey',
        description: 'Decreased security when Red Hat Product Signing Key not installed',
        summary: "Red Hat's product signing keys are not installed, preventing verification of new packages and updates from Red Hat.\n",
        generic: 'This system does not have the appropriate Red Hat product signing key installed.\n\nRed Hat recommends you install the latest product signing key.\n',
        reason: '<p>No Red Hat product signing keys were found on your system.</p>\n',
        type: null,
        more_info: '* The Red Hat Product Signing Keys [Customer Portal page](https://access.redhat.com/security/team/key)\n* The Red Hat Security Blog post about [Secure distribution of RPM packages](https://access.redhat.com/blogs/766093/posts/1976693)\n',
        active: true,
        node_id: null,
        category: 'Security',
        retired: false,
        reboot_required: false,
        publish_date: '2017-05-02T08:08:31.000Z',
        rec_impact: 1,
        rec_likelihood: 1,
        resolution: '<p>If this system still has the Red Hat product signing key file at <code>/etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release</code>, import it into the rpm database:</p>\n<pre><code># rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release\n</code></pre><p>If the file is missing, download it from RedHat directly:</p>\n<pre><code># curl --tlsv1.2 -o /etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release https://www.redhat.com/security/data/fd431d51.txt\n</code></pre><p>Verify the key&#39;s fingerprint:</p>\n<pre><code># grep fingerprint RPM-GPG-KEY-redhat-release\n      Key fingerprint = 567E 347A D004 4ADE 55BA  8A5F 199E 2F91 FD43 1D51\n</code></pre><p>If the fingerprint is correct, import the key as above:</p>\n<pre><code># rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-redhat-release\n</code></pre><p>Verify that the key is now installed:</p>\n<pre><code># rpm -q gpg-pubkey-fd431d51-4ae0493b\n gpg-pubkey-fd431d51-4ae0493b\n</code></pre>'
      },
      maintenance_actions: []
    },
    {
      details: {
        third_repos: {
          'beaker-tasks': {
            gpgcheck: '0',
            enabled: '1',
            name: 'beaker-tasks',
            baseurl: ['http://beaker.engineering.redhat.com/repos/3886857']
          },
          'beaker-HighAvailability': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/x86_64/os/HighAvailability'
            ],
            name: 'beaker-HighAvailability'
          },
          'beaker-LoadBalancer': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/x86_64/os/LoadBalancer'
            ],
            name: 'beaker-LoadBalancer'
          },
          'beaker-Server-SAP': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server-SAP/x86_64/os'
            ],
            name: 'beaker-Server-SAP'
          },
          'beaker-Server-SAPHANA-debuginfo': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server-SAPHANA/x86_64/debug'
            ],
            name: 'beaker-Server-SAPHANA-debuginfo'
          },
          'beaker-Server-debuginfo': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/x86_64/debug'
            ],
            name: 'beaker-Server-debuginfo'
          },
          'beaker-harness': {
            gpgcheck: '0',
            enabled: '1',
            name: 'beaker-harness',
            baseurl: [
              'http://beaker.engineering.redhat.com/harness/RedHatEnterpriseLinux6/'
            ]
          },
          'beaker-ResilientStorage': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/x86_64/os/ResilientStorage'
            ],
            name: 'beaker-ResilientStorage'
          },
          'beaker-Server': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/x86_64/os'
            ],
            name: 'beaker-Server'
          },
          'beaker-Server-optional': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/optional/x86_64/os'
            ],
            name: 'beaker-Server-optional'
          },
          'beaker-Server-SAPHANA': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server-SAPHANA/x86_64/os'
            ],
            name: 'beaker-Server-SAPHANA'
          },
          'beaker-Server-SAP-debuginfo': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server-SAP/x86_64/debug'
            ],
            name: 'beaker-Server-SAP-debuginfo'
          },
          'beaker-ScalableFileSystem': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/x86_64/os/ScalableFileSystem'
            ],
            name: 'beaker-ScalableFileSystem'
          },
          'beaker-Server-optional-debuginfo': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/optional/x86_64/debug'
            ],
            name: 'beaker-Server-optional-debuginfo'
          }
        },
        error_key: 'HARDENING_YUM_GPG_3RD_5',
        third_bad_repos_key: {
          'beaker-tasks': {
            gpgcheck: '0',
            enabled: '1',
            name: 'beaker-tasks',
            baseurl: ['http://beaker.engineering.redhat.com/repos/3886857']
          },
          'beaker-HighAvailability': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/x86_64/os/HighAvailability'
            ],
            name: 'beaker-HighAvailability'
          },
          'beaker-LoadBalancer': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/x86_64/os/LoadBalancer'
            ],
            name: 'beaker-LoadBalancer'
          },
          'beaker-Server-SAP': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server-SAP/x86_64/os'
            ],
            name: 'beaker-Server-SAP'
          },
          'beaker-Server-SAPHANA-debuginfo': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server-SAPHANA/x86_64/debug'
            ],
            name: 'beaker-Server-SAPHANA-debuginfo'
          },
          'beaker-Server-debuginfo': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/x86_64/debug'
            ],
            name: 'beaker-Server-debuginfo'
          },
          'beaker-harness': {
            gpgcheck: '0',
            enabled: '1',
            name: 'beaker-harness',
            baseurl: [
              'http://beaker.engineering.redhat.com/harness/RedHatEnterpriseLinux6/'
            ]
          },
          'beaker-ResilientStorage': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/x86_64/os/ResilientStorage'
            ],
            name: 'beaker-ResilientStorage'
          },
          'beaker-Server': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/x86_64/os'
            ],
            name: 'beaker-Server'
          },
          'beaker-Server-optional': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/optional/x86_64/os'
            ],
            name: 'beaker-Server-optional'
          },
          'beaker-Server-SAPHANA': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server-SAPHANA/x86_64/os'
            ],
            name: 'beaker-Server-SAPHANA'
          },
          'beaker-Server-SAP-debuginfo': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server-SAP/x86_64/debug'
            ],
            name: 'beaker-Server-SAP-debuginfo'
          },
          'beaker-ScalableFileSystem': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/x86_64/os/ScalableFileSystem'
            ],
            name: 'beaker-ScalableFileSystem'
          },
          'beaker-Server-optional-debuginfo': {
            gpgcheck: '0',
            enabled: '1',
            skip_if_unavailable: '1',
            baseurl: [
              'http://download.eng.bos.redhat.com/rel-eng/updates/RHEL-6.9/RHEL-6.9-updates-20170524.0/compose/Server/optional/x86_64/debug'
            ],
            name: 'beaker-Server-optional-debuginfo'
          }
        },
        rhel_bad_repos_key: {},
        sat_bad_repos: {},
        rhel_repos: {},
        rhel_bad_repos: {},
        third_bad_repos: {}
      },
      id: 782951645,
      rule_id: 'hardening_yum|HARDENING_YUM_GPG_3RD_5',
      system_id: '527f8733-5ea3-4c1e-a9dc-18e281235d09',
      account_number: '1212729',
      uuid: 'ed38f426a87e41168b33232075c4504e',
      date: '2017-05-30T09:20:43.000Z',
      rule: {
        summary_html: '<p>Recommended security practices for configuring yum repositories are not being followed. Package verification is\ndisabled for third-party yum repositories. Verification ensures that packages have not been altered from original\nsource.</p>\n',
        generic_html: '<p>Recommended security practices for configuring yum repositories are not being followed. Package verification is\ndisabled for third-party yum repositories. Verification ensures that packages have not been altered from original\nsource. The current settings might be required by your use case or needed for your other software configurations.\nHowever, any deviation from the recommended practices should be carefully considered.</p>\n<p>Red Hat recommends that you review the yum settings for all your reported servers, revise them, and leave detected,\npotentially problematic settings only where necessary.</p>\n',
        more_info_html: '<ul>\n<li><p>The Red Hat Product Signing Keys <a href="https://access.redhat.com/security/team/key">Customer Portal page</a></p>\n</li>\n<li><p>The Red Hat Security Blog post about <a href="https://access.redhat.com/blogs/766093/posts/1976693">Secure distribution of RPM packages</a></p>\n</li>\n<li><p>To learn more about yum, see &quot;<a href="https://access.redhat.com/solutions/9934">What is yum and how do I use it?</a></p>\n</li>\n<li><p>The Customer Portal page for the <a href="https://access.redhat.com/security/">Red Hat Security Team</a> contains more information about policies, procedures, and alerts for Red Hat products.</p>\n</li>\n<li><p>The Red Hat Security Team also maintains a frequently updated blog at <a href="https://securityblog.redhat.com">securityblog.redhat.com</a>.</p>\n</li>\n</ul>\n',
        severity: 'INFO',
        ansible: false,
        ansible_fix: false,
        ansible_mitigation: false,
        rule_id: 'hardening_yum|HARDENING_YUM_GPG_3RD_5',
        error_key: 'HARDENING_YUM_GPG_3RD_5',
        plugin: 'hardening_yum',
        description: 'Insecure updates from third-party yum repositories when GPG verification disabled',
        summary: 'Recommended security practices for configuring yum repositories are not being followed. Package verification is\ndisabled for third-party yum repositories. Verification ensures that packages have not been altered from original\nsource.\n',
        generic: 'Recommended security practices for configuring yum repositories are not being followed. Package verification is\ndisabled for third-party yum repositories. Verification ensures that packages have not been altered from original\nsource. The current settings might be required by your use case or needed for your other software configurations.\nHowever, any deviation from the recommended practices should be carefully considered.\n\nRed Hat recommends that you review the yum settings for all your reported servers, revise them, and leave detected,\npotentially problematic settings only where necessary.\n',
        reason: '<p>This host has yum repositories with disabled GPG verification or invalid GPG key.</p>\n<p> yum repositories with disabled GPG verification and invalid GPG key: <strong>beaker-tasks, beaker-HighAvailability, beaker-LoadBalancer, beaker-Server-SAP, beaker-Server-SAPHANA-debuginfo, beaker-Server-debuginfo, beaker-harness, beaker-ResilientStorage, beaker-Server, beaker-Server-optional, beaker-Server-SAPHANA, beaker-Server-SAP-debuginfo, beaker-ScalableFileSystem, beaker-Server-optional-debuginfo</strong> </p>\n<p>Red Hat recommends that you review the yum settings for all your reported servers, revise them, and leave detected,\npotentially problematic settings only where necessary.</p>\n',
        type: null,
        more_info: '* The Red Hat Product Signing Keys [Customer Portal page](https://access.redhat.com/security/team/key)\n\n* The Red Hat Security Blog post about [Secure distribution of RPM packages](https://access.redhat.com/blogs/766093/posts/1976693)\n\n* To learn more about yum, see "[What is yum and how do I use it?](https://access.redhat.com/solutions/9934)\n\n* The Customer Portal page for the [Red Hat Security Team](https://access.redhat.com/security/) contains more information about policies, procedures, and alerts for Red Hat products.\n\n* The Red Hat Security Team also maintains a frequently updated blog at [securityblog.redhat.com](https://securityblog.redhat.com).',
        active: true,
        node_id: null,
        category: 'Security',
        retired: false,
        reboot_required: false,
        publish_date: '2017-06-15T12:00:00.000Z',
        rec_impact: 1,
        rec_likelihood: 1,
        resolution: '<p>Red Hat recommends that you change the yum option <code>gpgcheck=0</code> to <code>gpgcheck=1</code> in files\n<code>/etc/yum.conf</code> and <code>/etc/yum.repods.d/*.repo</code>.</p>\n<p>Change the option <code>gpgcheck=0</code> to <code>gpgcheck=1</code> for following repositories:</p>\n<pre><code> beaker-tasks\n beaker-HighAvailability\n beaker-LoadBalancer\n beaker-Server-SAP\n beaker-Server-SAPHANA-debuginfo\n beaker-Server-debuginfo\n beaker-harness\n beaker-ResilientStorage\n beaker-Server\n beaker-Server-optional\n beaker-Server-SAPHANA\n beaker-Server-SAP-debuginfo\n beaker-ScalableFileSystem\n beaker-Server-optional-debuginfo\n</code></pre><p>For following repositories also examine the value of the option <code>gpgkey</code>:</p>\n<pre><code> beaker-tasks\n beaker-HighAvailability\n beaker-LoadBalancer\n beaker-Server-SAP\n beaker-Server-SAPHANA-debuginfo\n beaker-Server-debuginfo\n beaker-harness\n beaker-ResilientStorage\n beaker-Server\n beaker-Server-optional\n beaker-Server-SAPHANA\n beaker-Server-SAP-debuginfo\n beaker-ScalableFileSystem\n beaker-Server-optional-debuginfo\n</code></pre>'
      },
      maintenance_actions: []
    },
    {
      details: {
        INSTALLED_PACKAGE: 'cups-1.4.2-78.el6_9',
        error_key: 'HARDENING_CUPS_ENABLED_4',
        num_all_printers: 0,
        SERVICES_ENABLED: {
          cups: 'cups           \t0:off\t1:off\t2:on\t3:on\t4:on\t5:on\t6:off'
        },
        num_disabled_printers: 0,
        SERVICE_RUNNING: 'root      1406  0.0  0.0 189104  3524 ?        Ss   May29   0:00 cupsd'
      },
      id: 782951665,
      rule_id: 'hardening_cups_enabled|HARDENING_CUPS_ENABLED_4',
      system_id: '527f8733-5ea3-4c1e-a9dc-18e281235d09',
      account_number: '1212729',
      uuid: 'ed38f426a87e41168b33232075c4504e',
      date: '2017-05-30T09:20:43.000Z',
      rule: {
        summary_html: '<p>Printing service (CUPS) is enabled and/or running while not used.\nIt is recommended to turn off this service when it is not needed.\nDisabling of unused services hardens system from potential risks.</p>\n',
        generic_html: '<p>Unused services may increase attack surface to malicious applications present on the local host.\nBy disabling unused printing service (CUPS) a system can be hardened and protected against malicious application or future vulnerabilities found in this service.</p>\n<p>Running CUPS service (printing service) opens HTTP server on localhost on port <code>631</code> and file socket <code>/var/run/cups/cups.sock</code> (with default configuration). Both connections are accessible locally only, but with no additional authentication.</p>\n<p>Please select host for a specific resolution.</p>\n',
        more_info_html: '<ul>\n<li><a href="https://access.redhat.com/solutions/2099601">How do I keep CUPS from starting in RHEL 7?</a></li>\n<li>Security Guide for Red Hat Enterprise Linux 7\nSecurity Guide - <a href="https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Securing_Services.html">Section 4.3. Securing Services</a></li>\n<li>Security Guide for Red Hat Enterprise Linux 6\nSecurity Guide - <a href="https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-Security_Guide-Securing_Your_Network.html#sect-Security_Guide-Workstation_Security-Available_Network_Services">Chapter 2. Securing Your Network</a></li>\n<li><a href="https://access.redhat.com/articles/1189123">Common administrative commands in Red Hat Enterprise Linux 5, 6, and 7</a></li>\n<li>The Customer Portal page for the <a href="https://access.redhat.com/security/">Red Hat Security Team</a> contains more information about policies, procedures, and alerts for Red Hat Products.</li>\n<li>The Security Team also maintains a frequently updated blog at <a href="https://securityblog.redhat.com">securityblog.redhat.com</a>.</li>\n</ul>\n',
        severity: 'INFO',
        ansible: true,
        ansible_fix: true,
        ansible_mitigation: false,
        rule_id: 'hardening_cups_enabled|HARDENING_CUPS_ENABLED_4',
        error_key: 'HARDENING_CUPS_ENABLED_4',
        plugin: 'hardening_cups_enabled',
        description: 'Decreased security when CUPS is enabled and not used',
        summary: 'Printing service (CUPS) is enabled and/or running while not used.\nIt is recommended to turn off this service when it is not needed.\nDisabling of unused services hardens system from potential risks.\n',
        generic: 'Unused services may increase attack surface to malicious applications present on the local host.\nBy disabling unused printing service (CUPS) a system can be hardened and protected against malicious application or future vulnerabilities found in this service.\n\nRunning CUPS service (printing service) opens HTTP server on localhost on port `631` and file socket `/var/run/cups/cups.sock` (with default configuration). Both connections are accessible locally only, but with no additional authentication.\n\nPlease select host for a specific resolution.\n',
        reason: '<p>Unused printing service (CUPS) has been detected. <strong>The service is enabled and running while no printers are configured</strong>. Unused services are recommended to be turned off.</p>\n',
        type: null,
        more_info: '* [How do I keep CUPS from starting in RHEL 7?](https://access.redhat.com/solutions/2099601)\n* Security Guide for Red Hat Enterprise Linux 7\nSecurity Guide - [Section 4.3. Securing Services](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Securing_Services.html)\n* Security Guide for Red Hat Enterprise Linux 6\nSecurity Guide - [Chapter 2. Securing Your Network](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-Security_Guide-Securing_Your_Network.html#sect-Security_Guide-Workstation_Security-Available_Network_Services)\n* [Common administrative commands in Red Hat Enterprise Linux 5, 6, and 7](https://access.redhat.com/articles/1189123)\n* The Customer Portal page for the [Red Hat Security Team](https://access.redhat.com/security/) contains more information about policies, procedures, and alerts for Red Hat Products.\n* The Security Team also maintains a frequently updated blog at [securityblog.redhat.com](https://securityblog.redhat.com).\n',
        active: true,
        node_id: null,
        category: 'Security',
        retired: false,
        reboot_required: false,
        publish_date: '2017-05-02T08:08:31.000Z',
        rec_impact: 1,
        rec_likelihood: 1,
        resolution: '<p>Red Hat recommends to disable printing service (CUPS), if printing is not required.</p>\n<pre><code># service cups stop\n# chkconfig cups off\n</code></pre>'
      },
      maintenance_actions: []
    },
    {
      details: {
        INSTALLED_PACKAGE: 'cups-1.4.2-78.el6_9',
        error_key: 'HARDENING_CUPS_ENABLED_4',
        num_all_printers: 0,
        SERVICES_ENABLED: {
          cups: 'cups           \t0:off\t1:off\t2:on\t3:on\t4:on\t5:on\t6:off'
        },
        num_disabled_printers: 0,
        SERVICE_RUNNING: 'root      1406  0.0  0.0 189104  3524 ?        Ss   May29   0:00 cupsd'
      },
      id: 782951665,
      rule_id: 'hardening_cups_enabled|HARDENING_CUPS_ENABLED_4',
      system_id: '527f8733-5ea3-4c1e-a9dc-18e281235d09',
      account_number: '1212729',
      uuid: 'ed38f426a87e41168b33232075c4504e',
      date: '2017-05-30T09:20:43.000Z',
      rule: {
        summary_html: '<p>Printing service (CUPS) is enabled and/or running while not used.\nIt is recommended to turn off this service when it is not needed.\nDisabling of unused services hardens system from potential risks.</p>\n',
        generic_html: '<p>Unused services may increase attack surface to malicious applications present on the local host.\nBy disabling unused printing service (CUPS) a system can be hardened and protected against malicious application or future vulnerabilities found in this service.</p>\n<p>Running CUPS service (printing service) opens HTTP server on localhost on port <code>631</code> and file socket <code>/var/run/cups/cups.sock</code> (with default configuration). Both connections are accessible locally only, but with no additional authentication.</p>\n<p>Please select host for a specific resolution.</p>\n',
        more_info_html: '<ul>\n<li><a href="https://access.redhat.com/solutions/2099601">How do I keep CUPS from starting in RHEL 7?</a></li>\n<li>Security Guide for Red Hat Enterprise Linux 7\nSecurity Guide - <a href="https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Securing_Services.html">Section 4.3. Securing Services</a></li>\n<li>Security Guide for Red Hat Enterprise Linux 6\nSecurity Guide - <a href="https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-Security_Guide-Securing_Your_Network.html#sect-Security_Guide-Workstation_Security-Available_Network_Services">Chapter 2. Securing Your Network</a></li>\n<li><a href="https://access.redhat.com/articles/1189123">Common administrative commands in Red Hat Enterprise Linux 5, 6, and 7</a></li>\n<li>The Customer Portal page for the <a href="https://access.redhat.com/security/">Red Hat Security Team</a> contains more information about policies, procedures, and alerts for Red Hat Products.</li>\n<li>The Security Team also maintains a frequently updated blog at <a href="https://securityblog.redhat.com">securityblog.redhat.com</a>.</li>\n</ul>\n',
        severity: 'INFO',
        ansible: true,
        ansible_fix: true,
        ansible_mitigation: false,
        rule_id: 'hardening_cups_enabled|HARDENING_CUPS_ENABLED_4',
        error_key: 'HARDENING_CUPS_ENABLED_4',
        plugin: 'hardening_cups_enabled',
        description: 'Decreased security when CUPS is enabled and not used',
        summary: 'Printing service (CUPS) is enabled and/or running while not used.\nIt is recommended to turn off this service when it is not needed.\nDisabling of unused services hardens system from potential risks.\n',
        generic: 'Unused services may increase attack surface to malicious applications present on the local host.\nBy disabling unused printing service (CUPS) a system can be hardened and protected against malicious application or future vulnerabilities found in this service.\n\nRunning CUPS service (printing service) opens HTTP server on localhost on port `631` and file socket `/var/run/cups/cups.sock` (with default configuration). Both connections are accessible locally only, but with no additional authentication.\n\nPlease select host for a specific resolution.\n',
        reason: '<p>Unused printing service (CUPS) has been detected. <strong>The service is enabled and running while no printers are configured</strong>. Unused services are recommended to be turned off.</p>\n',
        type: null,
        more_info: '* [How do I keep CUPS from starting in RHEL 7?](https://access.redhat.com/solutions/2099601)\n* Security Guide for Red Hat Enterprise Linux 7\nSecurity Guide - [Section 4.3. Securing Services](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Securing_Services.html)\n* Security Guide for Red Hat Enterprise Linux 6\nSecurity Guide - [Chapter 2. Securing Your Network](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-Security_Guide-Securing_Your_Network.html#sect-Security_Guide-Workstation_Security-Available_Network_Services)\n* [Common administrative commands in Red Hat Enterprise Linux 5, 6, and 7](https://access.redhat.com/articles/1189123)\n* The Customer Portal page for the [Red Hat Security Team](https://access.redhat.com/security/) contains more information about policies, procedures, and alerts for Red Hat Products.\n* The Security Team also maintains a frequently updated blog at [securityblog.redhat.com](https://securityblog.redhat.com).\n',
        active: true,
        node_id: null,
        category: 'Availability',
        retired: false,
        reboot_required: false,
        publish_date: '2017-05-02T08:08:31.000Z',
        rec_impact: 1,
        rec_likelihood: 1,
        resolution: '<p>Red Hat recommends to disable printing service (CUPS), if printing is not required.</p>\n<pre><code># service cups stop\n# chkconfig cups off\n</code></pre>'
      },
      maintenance_actions: []
    },
    {
      details: {
        INSTALLED_PACKAGE: 'cups-1.4.2-78.el6_9',
        error_key: 'HARDENING_CUPS_ENABLED_4',
        num_all_printers: 0,
        SERVICES_ENABLED: {
          cups: 'cups           \t0:off\t1:off\t2:on\t3:on\t4:on\t5:on\t6:off'
        },
        num_disabled_printers: 0,
        SERVICE_RUNNING: 'root      1406  0.0  0.0 189104  3524 ?        Ss   May29   0:00 cupsd'
      },
      id: 782951665,
      rule_id: 'hardening_cups_enabled|HARDENING_CUPS_ENABLED_4',
      system_id: '527f8733-5ea3-4c1e-a9dc-18e281235d09',
      account_number: '1212729',
      uuid: 'ed38f426a87e41168b33232075c4504e',
      date: '2017-05-30T09:20:43.000Z',
      rule: {
        summary_html: '<p>Printing service (CUPS) is enabled and/or running while not used.\nIt is recommended to turn off this service when it is not needed.\nDisabling of unused services hardens system from potential risks.</p>\n',
        generic_html: '<p>Unused services may increase attack surface to malicious applications present on the local host.\nBy disabling unused printing service (CUPS) a system can be hardened and protected against malicious application or future vulnerabilities found in this service.</p>\n<p>Running CUPS service (printing service) opens HTTP server on localhost on port <code>631</code> and file socket <code>/var/run/cups/cups.sock</code> (with default configuration). Both connections are accessible locally only, but with no additional authentication.</p>\n<p>Please select host for a specific resolution.</p>\n',
        more_info_html: '<ul>\n<li><a href="https://access.redhat.com/solutions/2099601">How do I keep CUPS from starting in RHEL 7?</a></li>\n<li>Security Guide for Red Hat Enterprise Linux 7\nSecurity Guide - <a href="https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Securing_Services.html">Section 4.3. Securing Services</a></li>\n<li>Security Guide for Red Hat Enterprise Linux 6\nSecurity Guide - <a href="https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-Security_Guide-Securing_Your_Network.html#sect-Security_Guide-Workstation_Security-Available_Network_Services">Chapter 2. Securing Your Network</a></li>\n<li><a href="https://access.redhat.com/articles/1189123">Common administrative commands in Red Hat Enterprise Linux 5, 6, and 7</a></li>\n<li>The Customer Portal page for the <a href="https://access.redhat.com/security/">Red Hat Security Team</a> contains more information about policies, procedures, and alerts for Red Hat Products.</li>\n<li>The Security Team also maintains a frequently updated blog at <a href="https://securityblog.redhat.com">securityblog.redhat.com</a>.</li>\n</ul>\n',
        severity: 'INFO',
        ansible: true,
        ansible_fix: true,
        ansible_mitigation: false,
        rule_id: 'hardening_cups_enabled|HARDENING_CUPS_ENABLED_4',
        error_key: 'HARDENING_CUPS_ENABLED_4',
        plugin: 'hardening_cups_enabled',
        description: 'Decreased security when CUPS is enabled and not used',
        summary: 'Printing service (CUPS) is enabled and/or running while not used.\nIt is recommended to turn off this service when it is not needed.\nDisabling of unused services hardens system from potential risks.\n',
        generic: 'Unused services may increase attack surface to malicious applications present on the local host.\nBy disabling unused printing service (CUPS) a system can be hardened and protected against malicious application or future vulnerabilities found in this service.\n\nRunning CUPS service (printing service) opens HTTP server on localhost on port `631` and file socket `/var/run/cups/cups.sock` (with default configuration). Both connections are accessible locally only, but with no additional authentication.\n\nPlease select host for a specific resolution.\n',
        reason: '<p>Unused printing service (CUPS) has been detected. <strong>The service is enabled and running while no printers are configured</strong>. Unused services are recommended to be turned off.</p>\n',
        type: null,
        more_info: '* [How do I keep CUPS from starting in RHEL 7?](https://access.redhat.com/solutions/2099601)\n* Security Guide for Red Hat Enterprise Linux 7\nSecurity Guide - [Section 4.3. Securing Services](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Securing_Services.html)\n* Security Guide for Red Hat Enterprise Linux 6\nSecurity Guide - [Chapter 2. Securing Your Network](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-Security_Guide-Securing_Your_Network.html#sect-Security_Guide-Workstation_Security-Available_Network_Services)\n* [Common administrative commands in Red Hat Enterprise Linux 5, 6, and 7](https://access.redhat.com/articles/1189123)\n* The Customer Portal page for the [Red Hat Security Team](https://access.redhat.com/security/) contains more information about policies, procedures, and alerts for Red Hat Products.\n* The Security Team also maintains a frequently updated blog at [securityblog.redhat.com](https://securityblog.redhat.com).\n',
        active: true,
        node_id: null,
        category: 'Stability',
        retired: false,
        reboot_required: false,
        publish_date: '2017-05-02T08:08:31.000Z',
        rec_impact: 1,
        rec_likelihood: 1,
        resolution: '<p>Red Hat recommends to disable printing service (CUPS), if printing is not required.</p>\n<pre><code># service cups stop\n# chkconfig cups off\n</code></pre>'
      },
      maintenance_actions: []
    },
    {
      details: {
        INSTALLED_PACKAGE: 'cups-1.4.2-78.el6_9',
        error_key: 'HARDENING_CUPS_ENABLED_4',
        num_all_printers: 0,
        SERVICES_ENABLED: {
          cups: 'cups           \t0:off\t1:off\t2:on\t3:on\t4:on\t5:on\t6:off'
        },
        num_disabled_printers: 0,
        SERVICE_RUNNING: 'root      1406  0.0  0.0 189104  3524 ?        Ss   May29   0:00 cupsd'
      },
      id: 782951665,
      rule_id: 'hardening_cups_enabled|HARDENING_CUPS_ENABLED_4',
      system_id: '527f8733-5ea3-4c1e-a9dc-18e281235d09',
      account_number: '1212729',
      uuid: 'ed38f426a87e41168b33232075c4504e',
      date: '2017-05-30T09:20:43.000Z',
      rule: {
        summary_html: '<p>Printing service (CUPS) is enabled and/or running while not used.\nIt is recommended to turn off this service when it is not needed.\nDisabling of unused services hardens system from potential risks.</p>\n',
        generic_html: '<p>Unused services may increase attack surface to malicious applications present on the local host.\nBy disabling unused printing service (CUPS) a system can be hardened and protected against malicious application or future vulnerabilities found in this service.</p>\n<p>Running CUPS service (printing service) opens HTTP server on localhost on port <code>631</code> and file socket <code>/var/run/cups/cups.sock</code> (with default configuration). Both connections are accessible locally only, but with no additional authentication.</p>\n<p>Please select host for a specific resolution.</p>\n',
        more_info_html: '<ul>\n<li><a href="https://access.redhat.com/solutions/2099601">How do I keep CUPS from starting in RHEL 7?</a></li>\n<li>Security Guide for Red Hat Enterprise Linux 7\nSecurity Guide - <a href="https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Securing_Services.html">Section 4.3. Securing Services</a></li>\n<li>Security Guide for Red Hat Enterprise Linux 6\nSecurity Guide - <a href="https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-Security_Guide-Securing_Your_Network.html#sect-Security_Guide-Workstation_Security-Available_Network_Services">Chapter 2. Securing Your Network</a></li>\n<li><a href="https://access.redhat.com/articles/1189123">Common administrative commands in Red Hat Enterprise Linux 5, 6, and 7</a></li>\n<li>The Customer Portal page for the <a href="https://access.redhat.com/security/">Red Hat Security Team</a> contains more information about policies, procedures, and alerts for Red Hat Products.</li>\n<li>The Security Team also maintains a frequently updated blog at <a href="https://securityblog.redhat.com">securityblog.redhat.com</a>.</li>\n</ul>\n',
        severity: 'INFO',
        ansible: true,
        ansible_fix: true,
        ansible_mitigation: false,
        rule_id: 'hardening_cups_enabled|HARDENING_CUPS_ENABLED_4',
        error_key: 'HARDENING_CUPS_ENABLED_4',
        plugin: 'hardening_cups_enabled',
        description: 'Decreased security when CUPS is enabled and not used',
        summary: 'Printing service (CUPS) is enabled and/or running while not used.\nIt is recommended to turn off this service when it is not needed.\nDisabling of unused services hardens system from potential risks.\n',
        generic: 'Unused services may increase attack surface to malicious applications present on the local host.\nBy disabling unused printing service (CUPS) a system can be hardened and protected against malicious application or future vulnerabilities found in this service.\n\nRunning CUPS service (printing service) opens HTTP server on localhost on port `631` and file socket `/var/run/cups/cups.sock` (with default configuration). Both connections are accessible locally only, but with no additional authentication.\n\nPlease select host for a specific resolution.\n',
        reason: '<p>Unused printing service (CUPS) has been detected. <strong>The service is enabled and running while no printers are configured</strong>. Unused services are recommended to be turned off.</p>\n',
        type: null,
        more_info: '* [How do I keep CUPS from starting in RHEL 7?](https://access.redhat.com/solutions/2099601)\n* Security Guide for Red Hat Enterprise Linux 7\nSecurity Guide - [Section 4.3. Securing Services](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Securing_Services.html)\n* Security Guide for Red Hat Enterprise Linux 6\nSecurity Guide - [Chapter 2. Securing Your Network](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/6/html/Security_Guide/chap-Security_Guide-Securing_Your_Network.html#sect-Security_Guide-Workstation_Security-Available_Network_Services)\n* [Common administrative commands in Red Hat Enterprise Linux 5, 6, and 7](https://access.redhat.com/articles/1189123)\n* The Customer Portal page for the [Red Hat Security Team](https://access.redhat.com/security/) contains more information about policies, procedures, and alerts for Red Hat Products.\n* The Security Team also maintains a frequently updated blog at [securityblog.redhat.com](https://securityblog.redhat.com).\n',
        active: true,
        node_id: null,
        category: 'Performance',
        retired: false,
        reboot_required: false,
        publish_date: '2017-05-02T08:08:31.000Z',
        rec_impact: 1,
        rec_likelihood: 1,
        resolution: '<p>Red Hat recommends to disable printing service (CUPS), if printing is not required.</p>\n<pre><code># service cups stop\n# chkconfig cups off\n</code></pre>'
      },
      maintenance_actions: []
    }
  ]
};
