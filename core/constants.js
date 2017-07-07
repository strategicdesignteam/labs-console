/** currently es5 as this is also consumed by the backend Node 4 app */
Object.defineProperty(exports, '__esModule', {
  value: true
});

/* *
  Application Constants
 */
var constants = {
  app_title: 'Red Hat | Labs Console',
  bg_white: '#ffffff',
  bg_grey: '#f5f5f5',
  INFRASTRUCTURE_TYPES: {
    AWS: {
      KEY: 'Amazon Web Services',
      IMG_PATH: '/img/aws.svg'
    },
    OPENSTACK: {
      KEY: 'Red Hat OpenStack Platform',
      IMG_PATH: '/img/openstack.png'
    },
    GOOGLE_CLOUD: {
      KEY: 'Google Cloud Platform',
      IMG_PATH: '/img/google-cloud.png'
    },
    AZURE: {
      KEY: 'Microsoft Azure',
      IMG_PATH: '/img/azure.svg'
    },
    RHEV: {
      KEY: 'Red Hat Virtualization',
      IMG_PATH: '/img/shadowman.svg'
    },
    VMWARE: {
      KEY: 'VMware',
      IMG_PATH: '/img/vmware.png'
    }
  },
  ANSIBLE_JOB_STATUS: {
    PENDING: 'pending',
    RUNNING: 'running',
    FAILED: 'failed',
    CANCELLED: 'canceled',
    SUCCESSFUL: 'successful'
  },
  NOTIFICATION_TYPES: {
    INFRASTRUCTURE_BUILD: 1,
    INFRASTRUCTURE_DESTROY_BUILD: 2,
    INFRASTRUCTURE_PIPELINE_BUILD: 4
  }
};

exports.default = constants;
