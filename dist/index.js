'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _App = require('./App.js');

var _App2 = _interopRequireDefault(_App);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _moox = require('moox');

var _moox2 = _interopRequireDefault(_moox);

var _schema = require('./models/schema');

var _schema2 = _interopRequireDefault(_schema);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (config.lang) _utils2.default.lang = config.lang;

  var Model = (0, _moox2.default)({
    schema: _schema2.default
  });
  if (config.format) {
    Model.__jsonSchemaFormat = config.format;
  } else {
    Model.__jsonSchemaFormat = _utils2.default.format;
  }

  if (config.mock) {
    Model.__jsonSchemaMock = config.mock;
  }

  var store = Model.getStore();

  var Component = function Component(props) {
    return _react2.default.createElement(
      _reactRedux.Provider,
      { store: store, className: 'wrapper' },
      _react2.default.createElement(_App2.default, _extends({ Model: Model }, props))
    );
  };

  Component.propTypes = {
    data: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    showEditor: _propTypes2.default.bool
  };
  return Component;
};