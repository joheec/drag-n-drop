'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _renderer = require('./renderer.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var div = document.createElement('div');

(0, _ava2.default)('canDragAndDrop', function (t) {
  t.true((0, _renderer.canDragAndDrop)(div));
});

(0, _ava2.default)('hasFormData', function (t) {
  t.true((0, _renderer.hasFormData)(window));
});

(0, _ava2.default)('hasFileReader', function (t) {
  t.true((0, _renderer.hasFileReader)(window));
});

(0, _ava2.default)('canAdvanceUpload', function (t) {
  t.true((0, _renderer.canAdvanceUpload)(div, window));
});