(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(
      require('../ApiClient'),
      require('../model/ErrorModel')
    );
  }
  else {
    // Browser globals (root is window)
    if (!root.RedHatOpenInnovationLabsConsoleApi) {
      root.RedHatOpenInnovationLabsConsoleApi = {};
    }
    root.RedHatOpenInnovationLabsConsoleApi.LoginApi = factory(
      root.RedHatOpenInnovationLabsConsoleApi.ApiClient,
      root.RedHatOpenInnovationLabsConsoleApi.ErrorModel
    );
  }
}(this, (ApiClient, ErrorModel) => {
  /**
   * Login service.
   * @module api/LoginApi
   * @version 0.1.0
   */

  /**
   * Constructs a new LoginApi.
   * @alias module:api/LoginApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  const exports = function (apiClient) {
    this.apiClient = apiClient || ApiClient.instance;

    /**
     * The logged in user
     */
    this.loggedInUser = null;

    /**
     * The logged in user credentials
     */
    this.credentials = null;

    /**
     * The logged in user hash
     */
    this.hash = null;

    /**
      * Check if the credentials exist
      */
    this.getCredentials = function () {
      if (!this.loggedInUser || !this.credentials) {
        const hash = this.apiClient.getCookie('hash');
        if (hash) {
          const credentials = {
            username: this.apiClient.getCookie('username'),
            password: this.apiClient.getCookie('password'),
            hash
          };
          this.setCredentials(credentials);
        }
      }
    };

    /**
      * Sets the logged in user credentials to be used in all API requests
      */
    this.setCredentials = function (credentials) {
      this.credentials = credentials;
      this.loggedInUser = credentials.username;
      this.hash = credentials.hash;
      this.apiClient.setCookie('username', credentials.username);
      this.apiClient.setCookie('password', credentials.password);
      this.apiClient.setCookie('hash', credentials.hash);
    };

    /**
     * Callback function to receive the result of the loginUser operation.
     * @callback module:api/LoginApi~loginUserCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Login user
     *
     * @param {Object} opts Optional parameters
     * @param {module:api/LoginApi~loginUserCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.loginUser = function (opts, callback) {
      opts = opts || {};
      const postBody = opts.body;

      const pathParams = {};
      const queryParams = {};
      const headerParams = {};
      const formParams = {};

      const authNames = [];
      const contentTypes = ['application/json'];
      const accepts = ['application/json'];
      const returnType = Object;

      return this.apiClient.callApi(
        '/login',
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
     * Logouts a user by resetting credentials
     */
    this.logoutUser = function () {
      this.loggedInUser = null;
      this.credentials = null;
      this.hash = null;
      this.apiClient.setCookie('username', '');
      this.apiClient.setCookie('password', '');
      this.apiClient.setCookie('hash', '');
    };
  };

  exports.instance = new exports();

  return exports;
}));
