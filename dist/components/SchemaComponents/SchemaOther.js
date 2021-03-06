'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

require('./schemaJson.css');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../../utils.js');

var _AceEditor = require('../AceEditor/AceEditor.js');

var _AceEditor2 = _interopRequireDefault(_AceEditor);

var _index = require('../LocalProvider/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextArea = _antd.Input.TextArea;

var Option = _antd.Select.Option;


var changeOtherValue = function changeOtherValue(value, name, data, change) {
  data[name] = value;
  change(data);
};

var SchemaString = function (_PureComponent) {
  _inherits(SchemaString, _PureComponent);

  function SchemaString(props, context) {
    _classCallCheck(this, SchemaString);

    var _this = _possibleConstructorReturn(this, (SchemaString.__proto__ || Object.getPrototypeOf(SchemaString)).call(this, props));

    _this.changeOtherValue = function (value, name, data) {
      data[name] = value;
      _this.context.changeCustomValue(data);
    };

    _this.changeEnumOtherValue = function (value, data) {
      var arr = value.split('\n');
      if (arr.length === 0 || arr.length == 1 && !arr[0]) {
        delete data.enum;
        _this.context.changeCustomValue(data);
      } else {
        data.enum = arr;
        _this.context.changeCustomValue(data);
      }
    };

    _this.changeEnumDescOtherValue = function (value, data) {
      data.enumDesc = value;
      _this.context.changeCustomValue(data);
    };

    _this.onChangeCheckBox = function (checked, data) {
      _this.setState({
        checked: checked
      });
      if (!checked) {
        delete data.enum;
        _this.context.changeCustomValue(data);
      }
    };

    _this.state = {
      checked: _underscore2.default.isUndefined(props.data.enum) ? false : true
    };
    _this.format = context.Model.__jsonSchemaFormat;
    return _this;
  }

  _createClass(SchemaString, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      if (this.props.data.enum !== nextprops.data.enum) {
        this.setState({
          checked: _underscore2.default.isUndefined(nextprops.data.enum) ? false : true
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var data = this.props.data;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'default-setting' },
          (0, _index2.default)('base_setting')
        ),
        _react2.default.createElement(
          _antd.Row,
          { className: 'other-row', type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 4, className: 'other-label' },
            (0, _index2.default)('default'),
            '\uFF1A'
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 20 },
            _react2.default.createElement(_antd.Input, {
              value: data.default,
              placeholder: (0, _index2.default)('default'),
              onChange: function onChange(e) {
                return _this2.changeOtherValue(e.target.value, 'default', data);
              }
            })
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { className: 'other-row', type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 12 },
            _react2.default.createElement(
              _antd.Row,
              { type: 'flex', align: 'middle' },
              _react2.default.createElement(
                _antd.Col,
                { span: 8, className: 'other-label' },
                (0, _index2.default)('minLength'),
                '\uFF1A'
              ),
              _react2.default.createElement(
                _antd.Col,
                { span: 16 },
                _react2.default.createElement(_antd.InputNumber, {
                  value: data.minLength,
                  placeholder: 'min.length',
                  onChange: function onChange(e) {
                    return _this2.changeOtherValue(e, 'minLength', data);
                  }
                })
              )
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 12 },
            _react2.default.createElement(
              _antd.Row,
              { type: 'flex', align: 'middle' },
              _react2.default.createElement(
                _antd.Col,
                { span: 8, className: 'other-label' },
                (0, _index2.default)('maxLength'),
                '\uFF1A'
              ),
              _react2.default.createElement(
                _antd.Col,
                { span: 16 },
                _react2.default.createElement(_antd.InputNumber, {
                  value: data.maxLength,
                  placeholder: 'max.length',
                  onChange: function onChange(e) {
                    return _this2.changeOtherValue(e, 'maxLength', data);
                  }
                })
              )
            )
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { className: 'other-row', type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 4, className: 'other-label' },
            _react2.default.createElement(
              'span',
              null,
              'Pattern\xA0',
              _react2.default.createElement(
                _antd.Tooltip,
                { title: (0, _index2.default)('pattern') },
                _react2.default.createElement(_antd.Icon, { type: 'question-circle-o', style: { width: '10px' } })
              ),
              '\xA0 :'
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 20 },
            _react2.default.createElement(_antd.Input, {
              value: data.pattern,
              placeholder: 'Pattern',
              onChange: function onChange(e) {
                return _this2.changeOtherValue(e.target.value, 'pattern', data);
              }
            })
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { className: 'other-row', type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 4, className: 'other-label' },
            _react2.default.createElement(
              'span',
              null,
              (0, _index2.default)('enum'),
              _react2.default.createElement(_antd.Checkbox, {
                checked: this.state.checked,
                onChange: function onChange(e) {
                  return _this2.onChangeCheckBox(e.target.checked, data);
                }
              }),
              ' ',
              ':'
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 20 },
            _react2.default.createElement(TextArea, {
              value: data.enum && data.enum.length && data.enum.join('\n'),
              disabled: !this.state.checked,
              placeholder: (0, _index2.default)('enum_msg'),
              autosize: { minRows: 2, maxRows: 6 },
              onChange: function onChange(e) {
                _this2.changeEnumOtherValue(e.target.value, data);
              }
            })
          )
        ),
        this.state.checked && _react2.default.createElement(
          _antd.Row,
          { className: 'other-row', type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 4, className: 'other-label' },
            _react2.default.createElement(
              'span',
              null,
              (0, _index2.default)('enum_desc')
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 20 },
            _react2.default.createElement(TextArea, {
              value: data.enumDesc,
              disabled: !this.state.checked,
              placeholder: (0, _index2.default)('enum_desc_msg'),
              autosize: { minRows: 2, maxRows: 6 },
              onChange: function onChange(e) {
                _this2.changeEnumDescOtherValue(e.target.value, data);
              }
            })
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { className: 'other-row', type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 4, className: 'other-label' },
            _react2.default.createElement(
              'span',
              null,
              'format :'
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 20 },
            _react2.default.createElement(
              _antd.Select,
              {
                showSearch: true,
                style: { width: 150 },
                value: data.format,
                dropdownClassName: 'json-schema-react-editor-adv-modal-select',
                placeholder: 'Select a format',
                optionFilterProp: 'children',
                optionLabelProp: 'value',
                onChange: function onChange(e) {
                  return _this2.changeOtherValue(e, 'format', data);
                },
                filterOption: function filterOption(input, option) {
                  return option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }
              },
              this.format.map(function (item) {
                return _react2.default.createElement(
                  Option,
                  { value: item.name, key: item.name },
                  item.name,
                  ' ',
                  _react2.default.createElement(
                    'span',
                    { className: 'format-items-title' },
                    item.title
                  )
                );
              })
            )
          )
        )
      );
    }
  }]);

  return SchemaString;
}(_react.PureComponent);

SchemaString.contextTypes = {
  changeCustomValue: _propTypes2.default.func,
  Model: _propTypes2.default.object
};

var SchemaNumber = function (_PureComponent2) {
  _inherits(SchemaNumber, _PureComponent2);

  function SchemaNumber(props) {
    _classCallCheck(this, SchemaNumber);

    var _this3 = _possibleConstructorReturn(this, (SchemaNumber.__proto__ || Object.getPrototypeOf(SchemaNumber)).call(this, props));

    _this3.onChangeCheckBox = function (checked, data) {
      _this3.setState({
        checked: checked
      });

      if (!checked) {
        delete data.enum;
        _this3.setState({ enum: '' });
        _this3.context.changeCustomValue(data);
      }
    };

    _this3.changeEnumOtherValue = function (value, data) {
      _this3.setState({ enum: value });
      var arr = value.split('\n');
      var enumLen = _this3.state.enum.split('\n').length;
      // 判断是否是删除操作
      if (enumLen > arr.length) {
        data.enum = arr.map(function (item) {
          return +item;
        });
        _this3.context.changeCustomValue(data);
      }
      if (arr.length === 0 || arr.length == 1 && !arr[0]) {
        delete data.enum;
        _this3.context.changeCustomValue(data);
      }
    };

    _this3.onEnterEnumOtherValue = function (value, data) {
      var arr = value.split('\n').map(function (item) {
        return +item;
      });
      data.enum = arr;
      _this3.context.changeCustomValue(data);
    };

    _this3.changeEnumDescOtherValue = function (value, data) {
      data.enumDesc = value;
      _this3.context.changeCustomValue(data);
    };

    _this3.state = {
      checked: _underscore2.default.isUndefined(props.data.enum) ? false : true,
      enum: _underscore2.default.isUndefined(props.data.enum) ? '' : props.data.enum.join('\n')
    };
    return _this3;
  }

  _createClass(SchemaNumber, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      var enumStr = _underscore2.default.isUndefined(this.props.data.enum) ? '' : this.props.data.enum.join('\n');
      var nextEnumStr = _underscore2.default.isUndefined(nextprops.data.enum) ? '' : nextprops.data.enum.join('\n');
      if (enumStr !== nextEnumStr) {
        this.setState({ enum: nextEnumStr });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var data = this.props.data;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'default-setting' },
          (0, _index2.default)('base_setting')
        ),
        _react2.default.createElement(
          _antd.Row,
          { className: 'other-row', type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 4, className: 'other-label' },
            (0, _index2.default)('default'),
            '\uFF1A'
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 20 },
            _react2.default.createElement(_antd.Input, {
              value: data.default,
              placeholder: (0, _index2.default)('default'),
              onChange: function onChange(e) {
                return changeOtherValue(e.target.value, 'default', data, _this4.context.changeCustomValue);
              }
            })
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { className: 'other-row', type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 12 },
            _react2.default.createElement(
              _antd.Row,
              { type: 'flex', align: 'middle' },
              _react2.default.createElement(
                _antd.Col,
                { span: 13, className: 'other-label' },
                _react2.default.createElement(
                  'span',
                  null,
                  'exclusiveMinimum\xA0',
                  _react2.default.createElement(
                    _antd.Tooltip,
                    { title: (0, _index2.default)('exclusiveMinimum') },
                    _react2.default.createElement(_antd.Icon, { type: 'question-circle-o', style: { width: '10px' } })
                  ),
                  '\xA0 :'
                )
              ),
              _react2.default.createElement(
                _antd.Col,
                { span: 11 },
                _react2.default.createElement(_antd.Switch, {
                  checked: data.exclusiveMinimum,
                  placeholder: 'exclusiveMinimum',
                  onChange: function onChange(e) {
                    return changeOtherValue(e, 'exclusiveMinimum', data, _this4.context.changeCustomValue);
                  }
                })
              )
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 12 },
            _react2.default.createElement(
              _antd.Row,
              { type: 'flex', align: 'middle' },
              _react2.default.createElement(
                _antd.Col,
                { span: 13, className: 'other-label' },
                _react2.default.createElement(
                  'span',
                  null,
                  'exclusiveMaximum\xA0',
                  _react2.default.createElement(
                    _antd.Tooltip,
                    { title: (0, _index2.default)('exclusiveMaximum') },
                    _react2.default.createElement(_antd.Icon, { type: 'question-circle-o', style: { width: '10px' } })
                  ),
                  '\xA0 :'
                )
              ),
              _react2.default.createElement(
                _antd.Col,
                { span: 11 },
                _react2.default.createElement(_antd.Switch, {
                  checked: data.exclusiveMaximum,
                  placeholder: 'exclusiveMaximum',
                  onChange: function onChange(e) {
                    return changeOtherValue(e, 'exclusiveMaximum', data, _this4.context.changeCustomValue);
                  }
                })
              )
            )
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { className: 'other-row', type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 12 },
            _react2.default.createElement(
              _antd.Row,
              { type: 'flex', align: 'middle' },
              _react2.default.createElement(
                _antd.Col,
                { span: 8, className: 'other-label' },
                (0, _index2.default)('minimum'),
                '\uFF1A'
              ),
              _react2.default.createElement(
                _antd.Col,
                { span: 16 },
                _react2.default.createElement(_antd.InputNumber, {
                  value: data.minimum,
                  placeholder: (0, _index2.default)('minimum'),
                  onChange: function onChange(e) {
                    return changeOtherValue(e, 'minimum', data, _this4.context.changeCustomValue);
                  }
                })
              )
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 12 },
            _react2.default.createElement(
              _antd.Row,
              { type: 'flex', align: 'middle' },
              _react2.default.createElement(
                _antd.Col,
                { span: 8, className: 'other-label' },
                (0, _index2.default)('maximum'),
                '\uFF1A'
              ),
              _react2.default.createElement(
                _antd.Col,
                { span: 16 },
                _react2.default.createElement(_antd.InputNumber, {
                  value: data.maximum,
                  placeholder: (0, _index2.default)('maximum'),
                  onChange: function onChange(e) {
                    return changeOtherValue(e, 'maximum', data, _this4.context.changeCustomValue);
                  }
                })
              )
            )
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { className: 'other-row', type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 4, className: 'other-label' },
            _react2.default.createElement(
              'span',
              null,
              (0, _index2.default)('enum'),
              _react2.default.createElement(_antd.Checkbox, {
                checked: this.state.checked,
                onChange: function onChange(e) {
                  return _this4.onChangeCheckBox(e.target.checked, data);
                }
              }),
              ' ',
              ':'
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 20 },
            _react2.default.createElement(TextArea
            // value={data.enum && data.enum.length && data.enum.join('\n')}
            , { value: this.state.enum,
              disabled: !this.state.checked,
              placeholder: (0, _index2.default)('enum_msg'),
              autosize: { minRows: 2, maxRows: 6 },
              onChange: function onChange(e) {
                _this4.changeEnumOtherValue(e.target.value, data);
              },
              onPressEnter: function onPressEnter(e) {
                return _this4.onEnterEnumOtherValue(e.target.value, data);
              }
            })
          )
        ),
        this.state.checked && _react2.default.createElement(
          _antd.Row,
          { className: 'other-row', type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 4, className: 'other-label' },
            _react2.default.createElement(
              'span',
              null,
              (0, _index2.default)('enum_desc'),
              ' \uFF1A'
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 20 },
            _react2.default.createElement(TextArea, {
              value: data.enumDesc,
              disabled: !this.state.checked,
              placeholder: (0, _index2.default)('enum_desc_msg'),
              autosize: { minRows: 2, maxRows: 6 },
              onChange: function onChange(e) {
                _this4.changeEnumDescOtherValue(e.target.value, data);
              }
            })
          )
        )
      );
    }
  }]);

  return SchemaNumber;
}(_react.PureComponent);

SchemaNumber.contextTypes = {
  changeCustomValue: _propTypes2.default.func
};

var SchemaBoolean = function SchemaBoolean(props, context) {
  var data = props.data;

  var value = _underscore2.default.isUndefined(data.default) ? '' : data.default ? 'true' : 'false';
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'default-setting' },
      (0, _index2.default)('base_setting')
    ),
    _react2.default.createElement(
      _antd.Row,
      { className: 'other-row', type: 'flex', align: 'middle' },
      _react2.default.createElement(
        _antd.Col,
        { span: 4, className: 'other-label' },
        (0, _index2.default)('default'),
        '\uFF1A'
      ),
      _react2.default.createElement(
        _antd.Col,
        { span: 20 },
        _react2.default.createElement(
          _antd.Select,
          {
            value: value,
            onChange: function onChange(e) {
              return changeOtherValue(e === 'true' ? true : false, 'default', data, context.changeCustomValue);
            },
            style: { width: 200 }
          },
          _react2.default.createElement(
            Option,
            { value: 'true' },
            'true'
          ),
          _react2.default.createElement(
            Option,
            { value: 'false' },
            'false'
          )
        )
      )
    )
  );
};

SchemaBoolean.contextTypes = {
  changeCustomValue: _propTypes2.default.func
};

var SchemaArray = function SchemaArray(props, context) {
  var data = props.data;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'default-setting' },
      (0, _index2.default)('base_setting')
    ),
    _react2.default.createElement(
      _antd.Row,
      { className: 'other-row', type: 'flex', align: 'middle' },
      _react2.default.createElement(
        _antd.Col,
        { span: 6, className: 'other-label' },
        _react2.default.createElement(
          'span',
          null,
          'uniqueItems\xA0',
          _react2.default.createElement(
            _antd.Tooltip,
            { title: (0, _index2.default)('unique_items') },
            _react2.default.createElement(_antd.Icon, { type: 'question-circle-o', style: { width: '10px' } })
          ),
          '\xA0 :'
        )
      ),
      _react2.default.createElement(
        _antd.Col,
        { span: 18 },
        _react2.default.createElement(_antd.Switch, {
          checked: data.uniqueItems,
          placeholder: 'uniqueItems',
          onChange: function onChange(e) {
            return changeOtherValue(e, 'uniqueItems', data, context.changeCustomValue);
          }
        })
      )
    ),
    _react2.default.createElement(
      _antd.Row,
      { className: 'other-row', type: 'flex', align: 'middle' },
      _react2.default.createElement(
        _antd.Col,
        { span: 12 },
        _react2.default.createElement(
          _antd.Row,
          { type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 12, className: 'other-label' },
            (0, _index2.default)('min_items'),
            '\uFF1A'
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 12 },
            _react2.default.createElement(_antd.InputNumber, {
              value: data.minItems,
              placeholder: 'minItems',
              onChange: function onChange(e) {
                return changeOtherValue(e, 'minItems', data, context.changeCustomValue);
              }
            })
          )
        )
      ),
      _react2.default.createElement(
        _antd.Col,
        { span: 12 },
        _react2.default.createElement(
          _antd.Row,
          { type: 'flex', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 12, className: 'other-label' },
            (0, _index2.default)('max_items'),
            '\uFF1A'
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 12 },
            _react2.default.createElement(_antd.InputNumber, {
              value: data.maxItems,
              placeholder: 'maxItems',
              onChange: function onChange(e) {
                return changeOtherValue(e, 'maxItems', data, context.changeCustomValue);
              }
            })
          )
        )
      )
    )
  );
};

SchemaArray.contextTypes = {
  changeCustomValue: _propTypes2.default.func
};

var mapping = function mapping(data) {
  return {
    string: _react2.default.createElement(SchemaString, { data: data }),
    number: _react2.default.createElement(SchemaNumber, { data: data }),
    boolean: _react2.default.createElement(SchemaBoolean, { data: data }),
    integer: _react2.default.createElement(SchemaNumber, { data: data }),
    array: _react2.default.createElement(SchemaArray, { data: data })
  }[data.type];
};

var handleInputEditor = function handleInputEditor(e, change) {
  if (!e.text) return;
  change(e.jsonData);
};

var CustomItem = function CustomItem(props, context) {
  var data = props.data;

  var optionForm = mapping(JSON.parse(data));

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      null,
      optionForm
    ),
    _react2.default.createElement(
      'div',
      { className: 'default-setting' },
      (0, _index2.default)('all_setting')
    ),
    _react2.default.createElement(_AceEditor2.default, {
      data: data,
      mode: 'json',
      onChange: function onChange(e) {
        return handleInputEditor(e, context.changeCustomValue);
      }
    })
  );
};

CustomItem.contextTypes = {
  changeCustomValue: _propTypes2.default.func
};

exports.default = CustomItem;