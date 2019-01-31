'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mockEditor = require('./mockEditor');

var _mockEditor2 = _interopRequireDefault(_mockEditor);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModeMap = {
  javascript: 'ace/mode/javascript',
  json: 'ace/mode/json',
  text: 'ace/mode/text',
  xml: 'ace/mode/xml',
  html: 'ace/mode/html'
};

function isNotMatch(a, b) {
  try {
    a = JSON.parse(a);
    b = JSON.parse(b);
    return !_underscore2.default.isEqual(a, b);
  } catch (e) {
    return true;
  }
}

function getMode(mode) {
  return ModeMap[mode] || ModeMap.text;
}

var AceEditor = function (_React$PureComponent) {
  _inherits(AceEditor, _React$PureComponent);

  function AceEditor(props) {
    _classCallCheck(this, AceEditor);

    return _possibleConstructorReturn(this, (AceEditor.__proto__ || Object.getPrototypeOf(AceEditor)).call(this, props));
  }

  _createClass(AceEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.editor = (0, _mockEditor2.default)({
        container: this.editorElement,
        data: this.props.data,
        onChange: this.props.onChange,
        readOnly: this.props.readOnly,
        fullScreen: this.props.fullScreen
      });

      var mode = this.props.mode || 'javascript';
      this.editor.editor.getSession().setMode(getMode(mode));
      if (typeof this.props.callback === 'function') {
        this.props.callback(this.editor.editor);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.editor) return;

      if (isNotMatch(nextProps.data, this.props.data) && isNotMatch(this.editor.getValue(), nextProps.data)) {
        this.editor.setValue(nextProps.data);

        var mode = nextProps.mode || 'javascript';
        this.editor.editor.getSession().setMode(getMode(mode));
        this.editor.editor.clearSelection();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', {
        className: this.props.className,
        style: this.props.className ? undefined : this.props.style || { width: '100%', height: '200px' },
        ref: function ref(editor) {
          _this2.editorElement = editor;
        }
      });
    }
  }]);

  return AceEditor;
}(_react2.default.PureComponent);

AceEditor.propTypes = {
  data: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.string,
  mode: _propTypes2.default.string, //enum[json, text, javascript], default is javascript
  readOnly: _propTypes2.default.bool,
  callback: _propTypes2.default.func,
  style: _propTypes2.default.object,
  fullScreen: _propTypes2.default.bool,
  insertCode: _propTypes2.default.func
};

exports.default = AceEditor;