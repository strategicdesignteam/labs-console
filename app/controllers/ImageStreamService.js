'use strict';

exports.addImageStream = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (ImageStream)
  **/
  // no response value expected for this operation
  res.end();
}

exports.deleteImageStream = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
  // no response value expected for this operation
  res.end();
}

exports.imageStreamsGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ {
  "name" : "aeiou",
  "id" : 123456789,
  "image_tags" : [ "aeiou" ]
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.imageStreamsIdGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  **/
    var examples = {};
  examples['application/json'] = {
  "name" : "aeiou",
  "id" : 123456789,
  "image_tags" : [ "aeiou" ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.updateImageStream = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (Long)
  * body (ImageStream)
  **/
  // no response value expected for this operation
  res.end();
}

