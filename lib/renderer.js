'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var canDragAndDrop = exports.canDragAndDrop = function canDragAndDrop(div) {
  return 'draggable' in div || 'ondragstart' in div && 'ondrop' in div;
};
var hasFormData = exports.hasFormData = function hasFormData(window) {
  return 'FormData' in window;
};
var hasFileReader = exports.hasFileReader = function hasFileReader(window) {
  return 'FileReader' in window;
};
var canAdvanceUpload = exports.canAdvanceUpload = function canAdvanceUpload(div, window) {
  return canDragAndDrop(div) && hasFormData(window) && hasFileReader(window);
};

var setupAdvanceUpload = function setupAdvanceUpload() {
  var div = document.createElement('div');
  if (!canAdvanceUpload(div, window)) return;
};
