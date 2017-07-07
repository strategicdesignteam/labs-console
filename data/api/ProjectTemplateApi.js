(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(
      require('../ApiClient'),
      require('../model/ProjectTemplate'),
      require('../model/ErrorModel')
    );
  }
  else {
    // Browser globals (root is window)
    if (!root.RedHatOpenInnovationLabsConsoleApi) {
      root.RedHatOpenInnovationLabsConsoleApi = {};
    }
    root.RedHatOpenInnovationLabsConsoleApi.ProjectTemplateApi = factory(
      root.RedHatOpenInnovationLabsConsoleApi.ApiClient,
      root.RedHatOpenInnovationLabsConsoleApi.ProjectTemplate,
      root.RedHatOpenInnovationLabsConsoleApi.ErrorModel
    );
  }
}(this, (ApiClient, ProjectTemplate, ErrorModel) => {
  /**
   * ProjectTemplate service.
   * @module api/ProjectTemplateApi
   * @version 0.1.0
   */

  /**
   * Constructs a new ProjectTemplateApi.
   * @alias module:api/ProjectTemplateApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  const exports = function (apiClient) {
    this.apiClient = apiClient || ApiClient.instance;

    /**
     * Callback function to receive the result of the addProjectTemplate operation.
     * @callback module:api/ProjectTemplateApi~addProjectTemplateCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a new project template
     *
     * @param {Object} opts Optional parameters
     * @param {module:model/ProjectTemplate} opts.body ProjectTemplate object that needs to be added to the store
     * @param {module:api/ProjectTemplateApi~addProjectTemplateCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.addProjectTemplate = function (opts, callback) {
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
        '/projectTemplates',
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
     * Callback function to receive the result of the deleteProjectTemplate operation.
     * @callback module:api/ProjectTemplateApi~deleteProjectTemplateCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Deletes a project template
     *
     * @param {Integer} id ProjectTemplate id to delete
     * @param {module:api/ProjectTemplateApi~deleteProjectTemplateCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteProjectTemplate = function (id, callback) {
      const postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling deleteProjectTemplate";
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
        '/projectTemplates/{id}',
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
     * Callback function to receive the result of the updateProjectTemplate operation.
     * @callback module:api/ProjectTemplateApi~updateProjectTemplateCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update an existing project template
     *
     * @param {Integer} id ProjectTemplate ID
     * @param {Object} opts Optional parameters
     * @param {module:model/ProjectTemplate} opts.body ProjectTemplate object that needs to be updated in the store
     * @param {module:api/ProjectTemplateApi~updateProjectTemplateCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.updateProjectTemplate = function (id, opts, callback) {
      opts = opts || {};
      const postBody = opts.body;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling updateProjectTemplate";
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
        '/projectTemplates/{id}',
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
     * Callback function to receive the result of the projectTemplateGet operation.
     * @callback module:api/ProjectTemplateApi~projectTemplateGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ProjectTemplate>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets &#x60;ProjectTemplate&#x60; objects.
     * @param {module:api/ProjectTemplateApi~projectTemplateGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ProjectTemplate>}
     */
    this.projectTemplateGet = function (callback) {
      const postBody = null;

      const pathParams = {};
      const queryParams = {};
      const headerParams = {};
      const formParams = {};

      const authNames = [];
      const contentTypes = [];
      const accepts = [];
      const returnType = [ProjectTemplate];

      return this.apiClient.callApi(
        '/projectTemplates',
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
     * Callback function to receive the result of the projectTemplateIdGet operation.
     * @callback module:api/ProjectTemplateApi~projectTemplateIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ProjectTemplate} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets a &#x60;ProjectTemplate&#x60; object by ID.
     * @param {Integer} id ProjectTemplate ID
     * @param {module:api/ProjectTemplateApi~projectTemplateIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ProjectTemplate}
     */
    this.projectTemplateIdGet = function (id, callback) {
      const postBody = null;

      // verify the required parameter 'id' is set
      if (id == undefined || id == null) {
        throw "Missing the required parameter 'id' when calling projectTemplateIdGet";
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
      const returnType = ProjectTemplate;

      return this.apiClient.callApi(
        '/projectTemplates/{id}',
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
