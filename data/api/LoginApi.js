(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(
      require('../ApiClient'), 
      require('../model/ErrorModel')
    );
  } else {
    // Browser globals (root is window)
    if (!root.RedHatOpenInnovationLabsConsoleApi) {
      root.RedHatOpenInnovationLabsConsoleApi = {};
    }
    root.RedHatOpenInnovationLabsConsoleApi.LoginApi = factory(
      root.RedHatOpenInnovationLabsConsoleApi.ApiClient, 
      root.RedHatOpenInnovationLabsConsoleApi.ErrorModel
    );
  }
}(this, function(ApiClient, ErrorModel) {
  'use strict';

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
  var exports = function(apiClient) {
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
     this.getCredentials = function(){
       if(!this.loggedInUser || !this.credentials){
          var hash = this.apiClient.getCookie('hash');
          if(hash){
            var credentials = {
              username: this.apiClient.getCookie('username'), 
              password: this.apiClient.getCookie('password'), 
              hash: hash
            }
            this.setCredentials(credentials);
          }
       }
     }

     /**
      * Sets the logged in user credentials to be used in all API requests
      */
     this.setCredentials = function (credentials){
       this.credentials = credentials;
       this.loggedInUser = credentials.username;
       this.hash = credentials.hash;
       this.apiClient.setCookie('username', credentials.username);
       this.apiClient.setCookie('password', credentials.password);
       this.apiClient.setCookie('hash', credentials.hash);
     }

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
    this.loginUser = function(opts, callback) {
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
        '/login', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Logouts a user by resetting credentials
     */
    this.logoutUser = function(){
      this.loggedInUser = null;
      this.credentials = null;
      this.hash = null;
      this.apiClient.setCookie('username', '');
      this.apiClient.setCookie('password', '');
      this.apiClient.setCookie('hash', '');
    }    
  };

  exports.instance = new exports();

  return exports;
}));
