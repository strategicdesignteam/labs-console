'use strict';

var url = require('url');


var ImageStream = require('./ImageStreamService');


module.exports.addImageStream = function addImageStream (req, res, next) {
  ImageStream.addImageStream(req, res, next);
};

module.exports.deleteImageStream = function deleteImageStream (req, res, next) {
  ImageStream.deleteImageStream(req.params, res, next);
};

module.exports.imageStreamsGET = function imageStreamsGET (req, res, next) {
  ImageStream.imageStreamsGET(req.params, res, next);
};

module.exports.imageStreamsIdGET = function imageStreamsIdGET (req, res, next) {
  ImageStream.imageStreamsIdGET(req.params, res, next);
};

module.exports.updateImageStream = function updateImageStream (req, res, next) {
  ImageStream.updateImageStream(req, res, next);
};
