(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ErrorModel'), require('../model/Body'), require('../model/Job'));
  } else {
    // Browser globals (root is window)
    if (!root.RedHatOpenInnovationLabsConsoleApi) {
      root.RedHatOpenInnovationLabsConsoleApi = {};
    }
    root.RedHatOpenInnovationLabsConsoleApi.JobApi = factory(root.RedHatOpenInnovationLabsConsoleApi.ApiClient, root.RedHatOpenInnovationLabsConsoleApi.ErrorModel, root.RedHatOpenInnovationLabsConsoleApi.Body, root.RedHatOpenInnovationLabsConsoleApi.Job);
  }
}(this, function(ApiClient, ErrorModel, Body, Job) {
  'use strict';

  /**
   * Job service.
   * @module api/JobApi
   * @version 0.1.0
   */

  /**
   * Constructs a new JobApi. 
   * @alias module:api/JobApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the addJob operation.
     * @callback module:api/JobApi~addJobCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a new Job
     * 
     * @param {Object} opts Optional parameters
     * @param {module:model/Body} opts.body Job object that needs to be added to the store
     * @param {module:api/JobApi~addJobCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.addJob = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = Object;

      return this.apiClient.callApi(
        '/Jobs', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }


    /**
     * Callback function to receive the result of the JobsIdGet operation.
     * @callback module:api/JobApi~JobsIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Job} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets a &#x60;Job&#x60; object by ID. 
     * @param {Integer} id Job ID
     * @param {module:api/JobApi~JobsIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Job}
     */
    this.jobsIdGet = function(id, callback) {
      var postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling JobsIdGet";
      }


      var pathParams = {
        'id': id
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = [];
      var accepts = [];
      var returnType = Job;

      return this.apiClient.callApi(
        '/Jobs/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
