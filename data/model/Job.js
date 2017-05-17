(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  }
  else {
    // Browser globals (root is window)
    if (!root.RedHatOpenInnovationLabsConsoleApi) {
      root.RedHatOpenInnovationLabsConsoleApi = {};
    }
    root.RedHatOpenInnovationLabsConsoleApi.Job = factory(
      root.RedHatOpenInnovationLabsConsoleApi.ApiClient
    );
  }
}(this, (ApiClient) => {
  /**
   * The Job model module.
   * @module model/Job
   * @version 0.1.0
   */

  /**
   * Constructs a new <code>Job</code>.
   * @alias module:model/Job
   * @class
   */
  const exports = function () {
    const _this = this;
  };

  exports.constructFromObject = function (data, obj) {
    if (data) {
      obj = obj || new exports();
      obj = Object.assign(obj, data);
    }
    return obj;
  };

  return exports;
}));
