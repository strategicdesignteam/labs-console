(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(
      require('../ApiClient'),
      require('../model/InfrastructurePipeline'),
      require('../model/ErrorModel')
    );
  }
  else {
    // Browser globals (root is window)
    if (!root.RedHatOpenInnovationLabsConsoleApi) {
      root.RedHatOpenInnovationLabsConsoleApi = {};
    }
    root.RedHatOpenInnovationLabsConsoleApi.InfrastructurePipelineApi = factory(
      root.RedHatOpenInnovationLabsConsoleApi.ApiClient,
      root.RedHatOpenInnovationLabsConsoleApi.InfrastructurePipeline,
      root.RedHatOpenInnovationLabsConsoleApi.ErrorModel
    );
  }
}(this, (ApiClient, InfrastructurePipeline, ErrorModel) => {
  /**
   * InfrastructurePipeline service.
   * @module api/InfrastructurePipelineApi
   * @version 0.1.0
   */

  /**
   * Constructs a new InfrastructurePipelineApi.
   * @alias module:api/InfrastructurePipelineApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  const exports = function (apiClient) {
    this.apiClient = apiClient || ApiClient.instance;

    /**
     * Callback function to receive the result of the addInfrastructurePipeline operation.
     * @callback module:api/InfrastructurePipelineApi~addInfrastructurePipelineCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a new infrastructure pipeline
     *
     * @param {Object} opts Optional parameters
     * @param {module:model/InfrastructurePipeline} opts.body InfrastructurePipeline object that needs to be added to the store
     * @param {module:api/InfrastructurePipelineApi~addInfrastructurePipelineCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.addInfrastructurePipeline = function (opts, callback) {
      opts = opts || {};
      const postBody = opts.body;

      const pathParams = {};
      const queryParams = {};
      const headerParams = {};
      const formParams = {};

      const authNames = [];
      const contentTypes = ['application/json'];
      const accepts = ['application/json'];
      const returnType = null;

      return this.apiClient.callApi(
        '/infrastructurePipelines',
        'POST',
        pathParams,
        queryParams,
        headerParams,
        formParams,
        postBody,
        authNames,
        contentTypes,
        accepts,
        returnType,
        callback
      );
    };

    /**
     * Callback function to receive the result of the deleteInfrastructurePipeline operation.
     * @callback module:api/InfrastructurePipelineApi~deleteInfrastructurePipelineCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Deletes a infrastructure pipeline
     *
     * @param {Integer} id InfrastructurePipeline id to delete
     * @param {module:api/InfrastructurePipelineApi~deleteInfrastructurePipelineCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteInfrastructurePipeline = function (id, callback) {
      const postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling deleteInfrastructurePipeline";
      }

      const pathParams = {
        id
      };
      const queryParams = {};
      const headerParams = {};
      const formParams = {};

      const authNames = [];
      const contentTypes = [];
      const accepts = ['application/json'];
      const returnType = null;

      return this.apiClient.callApi(
        '/infrastructurePipelines/{id}',
        'DELETE',
        pathParams,
        queryParams,
        headerParams,
        formParams,
        postBody,
        authNames,
        contentTypes,
        accepts,
        returnType,
        callback
      );
    };

    /**
     * Callback function to receive the result of the updateInfrastructurePipeline operation.
     * @callback module:api/InfrastructurePipelineApi~updateInfrastructurePipelineCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update an existing infrastructure pipeline
     *
     * @param {Integer} id InfrastructurePipeline ID
     * @param {Object} opts Optional parameters
     * @param {module:model/InfrastructurePipeline} opts.body InfrastructurePipeline object that needs to be updated in the store
     * @param {module:api/InfrastructurePipelineApi~updateInfrastructurePipelineCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.updateInfrastructurePipeline = function (id, opts, callback) {
      opts = opts || {};
      const postBody = opts.body;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling updateInfrastructurePipeline";
      }

      const pathParams = {
        id
      };
      const queryParams = {};
      const headerParams = {};
      const formParams = {};

      const authNames = [];
      const contentTypes = ['application/json'];
      const accepts = ['application/json'];
      const returnType = null;

      return this.apiClient.callApi(
        '/infrastructurePipelines/{id}',
        'PUT',
        pathParams,
        queryParams,
        headerParams,
        formParams,
        postBody,
        authNames,
        contentTypes,
        accepts,
        returnType,
        callback
      );
    };

    /**
     * Callback function to receive the result of the infrastructurePipelineGet operation.
     * @callback module:api/InfrastructurePipelineApi~infrastructurePipelineGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/InfrastructurePipeline>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets &#x60;InfrastructurePipeline&#x60; objects.
     * @param {module:api/InfrastructurePipelineApi~infrastructurePipelineGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/InfrastructurePipeline>}
     */
    this.infrastructurePipelineGet = function (callback) {
      const postBody = null;

      const pathParams = {};
      const queryParams = {};
      const headerParams = {};
      const formParams = {};

      const authNames = [];
      const contentTypes = [];
      const accepts = [];
      const returnType = [InfrastructurePipeline];

      return this.apiClient.callApi(
        '/infrastructurePipelines',
        'GET',
        pathParams,
        queryParams,
        headerParams,
        formParams,
        postBody,
        authNames,
        contentTypes,
        accepts,
        returnType,
        callback
      );
    };

    /**
     * Callback function to receive the result of the infrastructurePipelineIdGet operation.
     * @callback module:api/InfrastructurePipelineApi~infrastructurePipelineIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InfrastructurePipeline} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets a &#x60;InfrastructurePipeline&#x60; object by ID.
     * @param {Integer} id InfrastructurePipeline ID
     * @param {module:api/InfrastructurePipelineApi~infrastructurePipelineIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/InfrastructurePipeline}
     */
    this.infrastructurePipelineIdGet = function (id, callback) {
      const postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling infrastructurePipelineIdGet";
      }

      const pathParams = {
        id
      };
      const queryParams = {};
      const headerParams = {};
      const formParams = {};

      const authNames = [];
      const contentTypes = [];
      const accepts = [];
      const returnType = InfrastructurePipeline;

      return this.apiClient.callApi(
        '/infrastructurePipelines/{id}',
        'GET',
        pathParams,
        queryParams,
        headerParams,
        formParams,
        postBody,
        authNames,
        contentTypes,
        accepts,
        returnType,
        callback
      );
    };
  };

  return exports;
}));
