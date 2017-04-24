import CanvasConstants from './CanvasConstants'

export function infraImage (type) {
  switch(type){
    case CanvasConstants.INFRASTRUCTURE_TYPES.OPENSHIFT.KEY:
      return CanvasConstants.INFRASTRUCTURE_TYPES.OPENSHIFT.IMG_PATH;
    case CanvasConstants.INFRASTRUCTURE_TYPES.AWS.KEY:
      return CanvasConstants.INFRASTRUCTURE_TYPES.AWS.IMG_PATH;
    case CanvasConstants.INFRASTRUCTURE_TYPES.OPENSTACK.KEY:
      return CanvasConstants.INFRASTRUCTURE_TYPES.OPENSTACK.IMG_PATH;
    case CanvasConstants.INFRASTRUCTURE_TYPES.GOOGLE_CLOUD.KEY:
      return CanvasConstants.INFRASTRUCTURE_TYPES.GOOGLE_CLOUD.IMG_PATH;
    case CanvasConstants.INFRASTRUCTURE_TYPES.AZURE.KEY:
      return CanvasConstants.INFRASTRUCTURE_TYPES.AZURE.IMG_PATH;
    case CanvasConstants.INFRASTRUCTURE_TYPES.RHEV.KEY:
      return CanvasConstants.INFRASTRUCTURE_TYPES.RHEV.KEY;
    case CanvasConstants.INFRASTRUCTURE_TYPES.VMWARE.KEY:
      return CanvasConstants.INFRASTRUCTURE_TYPES.VMWARE.IMG_PATH;
    default:
      return CanvasConstants.INFRASTRUCTURE_TYPES.OPENSTACK.IMG_PATH;
  }
}