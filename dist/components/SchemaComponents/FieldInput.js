'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FieldInput = function (_PureComponent) {
  _inherits(FieldInput, _PureComponent);

  function FieldInput(props) {
    _classCallCheck(this, FieldInput);

    var _this = _possibleConstructorReturn(this, (FieldInput.__proto__ || Object.getPrototypeOf(FieldInput)).call(this, props));

    _this.handleChange = function (e) {
      var value = e.target.value;
      _this.setState({
        value: value
      });
    };

    _this.onKeyup = function (e) {
      if (e.keyCode === 13) {
        if (e.target.value !== _this.props.value) return _this.props.onChange(e);
      }
    };

    _this.handleBlur = function (e) {
      if (e.target.value !== _this.props.value) return _this.props.onChange(e);
    };

    _this.state = {
      value: props.value
    };
    return _this;
  }

  _createClass(FieldInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var value = this.state.value;


      return _react2.default.createElement(_antd.Input, _extends({}, this.props, { value: value, onKeyUp: this.onKeyup, onBlur: this.handleBlur, onChange: this.handleChange }));
    }
  }]);

  return FieldInput;
}(_react.PureComponent);

FieldInput.propTypes = {
  onChange: _propTypes2.default.func,
  value: _propTypes2.default.string
};
exports.default = FieldInput;