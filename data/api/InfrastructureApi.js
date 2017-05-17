(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(
      require('../ApiClient'),
      require('../model/Infrastructure'),
      require('../model/ErrorModel')
    );
  }
  else {
    // Browser globals (root is window)
    if (!root.RedHatOpenInnovationLabsConsoleApi) {
      root.RedHatOpenInnovationLabsConsoleApi = {};
    }
    root.RedHatOpenInnovationLabsConsoleApi.InfrastructureApi = factory(
      root.RedHatOpenInnovationLabsConsoleApi.ApiClient,
      root.RedHatOpenInnovationLabsConsoleApi.Infrastructure,
      root.RedHatOpenInnovationLabsConsoleApi.ErrorModel
    );
  }
}(this, (ApiClient, Infrastructure, ErrorModel) => {
  /**
   * Infrastructure service.
   * @module api/InfrastructureApi
   * @version 0.1.0
   */

  /**
   * Constructs a new InfrastructureApi.
   * @alias module:api/InfrastructureApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  const exports = function (apiClient) {
    this.apiClient = apiClient || ApiClient.instance;

    /**
     * Callback function to receive the result of the addInfrastructure operation.
     * @callback module:api/InfrastructureApi~addInfrastructureCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a new infrastructure
     *
     * @param {Object} opts Optional parameters
     * @param {module:model/Infrastructure} opts.body Infrastructure object that needs to be added to the store
     * @param {module:api/InfrastructureApi~addInfrastructureCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.addInfrastructure = function (opts, callback) {
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
        '/infrastructures',
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
     * Callback function to receive the result of the deleteInfrastructure operation.
     * @callback module:api/InfrastructureApi~deleteInfrastructureCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Deletes a infrastructure
     *
     * @param {Integer} id Infrastructure id to delete
     * @param {module:api/InfrastructureApi~deleteInfrastructureCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteInfrastructure = function (id, callback) {
      const postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling deleteInfrastructure";
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
        '/infrastructures/{id}',
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
     * Callback function to receive the result of the updateInfrastructure operation.
     * @callback module:api/InfrastructureApi~updateInfrastructureCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update an existing infrastructure
     *
     * @param {Integer} id Infrastructure ID
     * @param {Object} opts Optional parameters
     * @param {module:model/Infrastructure} opts.body Infrastructure object that needs to be updated in the store
     * @param {module:api/InfrastructureApi~updateInfrastructureCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.updateInfrastructure = function (id, opts, callback) {
      opts = opts || {};
      const postBody = opts.body;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling updateInfrastructure";
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
        '/infrastructures/{id}',
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
     * Callback function to receive the result of the infrastructuresGet operation.
     * @callback module:api/InfrastructureApi~infrastructuresGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Infrastructure>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets &#x60;Infrastructure&#x60; objects.
     * @param {module:api/InfrastructureApi~infrastructuresGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Infrastructure>}
     */
    this.infrastructuresGet = function (callback) {
      const postBody = null;

      const pathParams = {};
      const queryParams = {};
      const headerParams = {};
      const formParams = {};

      const authNames = [];
      const contentTypes = [];
      const accepts = [];
      const returnType = [Infrastructure];

      return this.apiClient.callApi(
        '/infrastructures',
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
     * Callback function to receive the result of the infrastructuresIdGet operation.
     * @callback module:api/InfrastructureApi~infrastructuresIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Infrastructure} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets a &#x60;Infrastructure&#x60; object by ID.
     * @param {Integer} id Infrastructure ID
     * @param {module:api/InfrastructureApi~infrastructuresIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Infrastructure}
     */
    this.infrastructuresIdGet = function (id, callback) {
      const postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling infrastructuresIdGet";
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
      const returnType = Infrastructure;

      return this.apiClient.callApi(
        '/infrastructures/{id}',
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
