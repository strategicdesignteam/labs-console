/**
 * Red Hat Open Innovation Labs API
 * A generic model to support automation at all levels of the application and infrastructure lifecycle.
 *
 * OpenAPI spec version: 0.3.0-alpha
 * Contact: rhc-open-innovation-labs@redhat.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.RedHatOpenInnovationLabsApi) {
      root.RedHatOpenInnovationLabsApi = {};
    }
    root.RedHatOpenInnovationLabsApi.ErrorModel = factory(root.RedHatOpenInnovationLabsApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ErrorModel model module.
   * @module model/ErrorModel
   * @version 0.3.0-alpha
   */

  /**
   * Constructs a new <code>ErrorModel</code>.
   * @alias module:model/ErrorModel
   * @class
   * @param message {String} 
   * @param code {Number} 
   */
  var exports = function(message, code) {
    var _this = this;

    _this['message'] = message;
    _this['code'] = code;
  };

  /**
   * Constructs a <code>ErrorModel</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ErrorModel} obj Optional instance to populate.
   * @return {module:model/ErrorModel} The populated <code>ErrorModel</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('code')) {
        obj['code'] = ApiClient.convertToType(data['code'], 'Number');
      }
    }
    return obj;
  }

  /**
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * @member {Number} code
   */
  exports.prototype['code'] = undefined;



  return exports;
}));

