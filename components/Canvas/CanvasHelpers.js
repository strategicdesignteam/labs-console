import constants from '../../core/constants';

export function infraImage(type) {
  switch (type) {
    case constants.INFRASTRUCTURE_TYPES.AWS.KEY:
      return constants.INFRASTRUCTURE_TYPES.AWS.IMG_PATH;
    case constants.INFRASTRUCTURE_TYPES.OPENSTACK.KEY:
      return constants.INFRASTRUCTURE_TYPES.OPENSTACK.IMG_PATH;
    case constants.INFRASTRUCTURE_TYPES.GOOGLE_CLOUD.KEY:
      return constants.INFRASTRUCTURE_TYPES.GOOGLE_CLOUD.IMG_PATH;
    case constants.INFRASTRUCTURE_TYPES.AZURE.KEY:
      return constants.INFRASTRUCTURE_TYPES.AZURE.IMG_PATH;
    case constants.INFRASTRUCTURE_TYPES.RHEV.KEY:
      return constants.INFRASTRUCTURE_TYPES.RHEV.IMG_PATH;
    case constants.INFRASTRUCTURE_TYPES.VMWARE.KEY:
      return constants.INFRASTRUCTURE_TYPES.VMWARE.IMG_PATH;
    default:
      return '/img/empty.png';
  }
}
