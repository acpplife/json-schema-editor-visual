'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

require('./index.css');

var _AceEditor = require('./components/AceEditor/AceEditor.js');

var _AceEditor2 = _interopRequireDefault(_AceEditor);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _reactRedux = require('react-redux');

var _SchemaJson = require('./components/SchemaComponents/SchemaJson.js');

var _SchemaJson2 = _interopRequireDefault(_SchemaJson);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils.js');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _SchemaOther = require('./components/SchemaComponents/SchemaOther.js');

var _SchemaOther2 = _interopRequireDefault(_SchemaOther);

var _index = require('./components/LocalProvider/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('./components/MockSelect/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _antd.Form.Item;
var Option = _antd.Select.Option;
var TextArea = _antd.Input.TextArea;

var TabPane = _antd.Tabs.TabPane;

var GenerateSchema = require('generate-schema/src/schemas/json.js');
var utils = require('./utils');

var jsonSchema = function (_React$Component) {
  _inherits(jsonSchema, _React$Component);

  function jsonSchema(props) {
    _classCallCheck(this, jsonSchema);

    var _this = _possibleConstructorReturn(this, (jsonSchema.__proto__ || Object.getPrototypeOf(jsonSchema)).call(this, props));

    _this.showModal = function () {
      _this.setState({
        visible: true
      });
    };

    _this.handleOk = function () {
      if (_this.importJsonType !== 'schema') {
        if (!_this.jsonData) {
          return _antd.message.error('json 数据格式有误');
        }

        var jsonData = GenerateSchema(_this.jsonData);
        _this.Model.changeEditorSchemaAction({ value: jsonData });
      } else {
        if (!_this.jsonSchemaData) {
          return _antd.message.error('json 数据格式有误');
        }
        _this.Model.changeEditorSchemaAction({ value: _this.jsonSchemaData });
      }
      _this.setState({ visible: false });
    };

    _this.handleCancel = function () {
      _this.setState({ visible: false });
    };

    _this.alterMsg = function () {
      // return message.error(LocalProvider('valid_json'));
    };

    _this.handleParams = function (e) {
      if (!e.text) return;
      // 将数据map 到store中
      if (e.format !== true) {
        return _this.alterMsg();
      }
      (0, _schema2.default)(e.jsonData);
      _this.Model.changeEditorSchemaAction({
        value: e.jsonData
      });
    };

    _this.changeType = function (key, value) {
      _this.Model.changeTypeAction({ key: [key], value: value });
    };

    _this.handleImportJson = function (e) {
      if (!e.text || e.format !== true) {
        return _this.jsonData = null;
      }
      _this.jsonData = e.jsonData;
    };

    _this.handleImportJsonSchema = function (e) {
      if (!e.text || e.format !== true) {
        return _this.jsonSchemaData = null;
      }
      _this.jsonSchemaData = e.jsonData;
    };

    _this.addChildField = function (key) {
      _this.Model.addChildFieldAction({ key: [key] });
      _this.setState({ show: true });
    };

    _this.clickIcon = function () {
      _this.setState({ show: !_this.state.show });
    };

    _this.changeValue = function (key, value) {
      if (key[0] === 'mock') {
        value = value ? { mock: value } : '';
      }
      _this.Model.changeValueAction({ key: key, value: value });
    };

    _this.handleEditOk = function (name) {
      _this.setState({
        editVisible: false
      });
      var value = _this.state[name];
      if (name === 'mock') {
        value = value ? { mock: value } : '';
      }
      _this.Model.changeValueAction({ key: _this.state.descriptionKey, value: value });
    };

    _this.handleEditCancel = function () {
      _this.setState({
        editVisible: false
      });
    };

    _this.showEdit = function (prefix, name, value, type) {
      var _this$setState;

      if (type === 'object' || type === 'array') {
        return;
      }
      var descriptionKey = [].concat(prefix, name);

      value = name === 'mock' ? value ? value.mock : '' : value;
      _this.setState((_this$setState = {
        editVisible: true
      }, _defineProperty(_this$setState, name, value), _defineProperty(_this$setState, 'descriptionKey', descriptionKey), _defineProperty(_this$setState, 'editorModalName', name), _this$setState));
    };

    _this.changeDesc = function (e, name) {
      _this.setState(_defineProperty({}, name, e));
    };

    _this.handleAdvOk = function () {
      if (_this.state.itemKey.length === 0) {
        _this.Model.changeEditorSchemaAction({
          value: _this.state.curItemCustomValue
        });
      } else {
        _this.Model.changeValueAction({
          key: _this.state.itemKey,
          value: _this.state.curItemCustomValue
        });
      }
      _this.setState({
        advVisible: false
      });
    };

    _this.handleAdvCancel = function () {
      _this.setState({
        advVisible: false
      });
    };

    _this.showAdv = function (key, value) {
      _this.setState({
        advVisible: true,
        itemKey: key,
        curItemCustomValue: value // 当前节点的数据信息
      });
    };

    _this.changeCustomValue = function (newValue) {
      _this.setState({
        curItemCustomValue: newValue
      });
    };

    _this.changeCheckBox = function (e) {
      _this.setState({ checked: e });
      _this.Model.requireAllAction({ required: e, value: _this.props.schema });
    };

    _this.alterMsg = (0, _utils.debounce)(_this.alterMsg, 2000);
    _this.state = {
      visible: false,
      show: true,
      editVisible: false,
      description: '',
      descriptionKey: null,
      advVisible: false,
      itemKey: [],
      curItemCustomValue: null,
      checked: false,
      editorModalName: '', // 弹窗名称desctiption | mock
      mock: ''
    };
    _this.Model = _this.props.Model.schema;
    _this.jsonSchemaData = null;
    _this.jsonData = null;
    return _this;
  }

  // json 导入弹窗


  _createClass(jsonSchema, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (typeof this.props.onChange === 'function' && this.props.schema !== nextProps.schema) {
        var oldData = JSON.stringify(this.props.schema || '');
        var newData = JSON.stringify(nextProps.schema || '');
        if (oldData !== newData) return this.props.onChange(newData);
      }
      if (this.props.data && this.props.data !== nextProps.data) {
        this.Model.changeEditorSchemaAction({ value: JSON.parse(nextProps.data) });
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var data = this.props.data;
      if (!data) {
        data = '{\n        "type": "object",\n        "title": "empty object",\n        "properties":{}\n      }';
      }
      this.Model.changeEditorSchemaAction({ value: JSON.parse(data) });
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      return {
        getOpenValue: function getOpenValue(keys) {
          return utils.getData(_this2.props.open, keys);
        },
        changeCustomValue: this.changeCustomValue,
        Model: this.props.Model,
        isMock: this.props.isMock
      };
    }

    // AceEditor 中的数据


    // 修改数据类型

    // 增加子节点


    // 修改备注信息


    // 备注/mock弹窗 点击ok 时

    /*
      展示弹窗modal
      prefix: 节点前缀信息
      name: 弹窗的名称 ['description', 'mock']
      value: 输入值
      type: 如果当前字段是object || array showEdit 不可用
    */


    // 修改备注/mock参数信息


    // 高级设置


    //  修改弹窗中的json-schema 值

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          visible = _state.visible,
          editVisible = _state.editVisible,
          description = _state.description,
          advVisible = _state.advVisible,
          type = _state.type,
          checked = _state.checked,
          editorModalName = _state.editorModalName;
      var schema = this.props.schema;


      var disabled = this.props.schema.type === 'object' || this.props.schema.type === 'array' ? false : true;

      return _react2.default.createElement(
        'div',
        { className: 'json-schema-react-editor' },
        _react2.default.createElement(
          _antd.Button,
          { className: 'import-json-button', type: 'primary', onClick: this.showModal },
          (0, _index2.default)('import_json')
        ),
        _react2.default.createElement(
          _antd.Modal,
          {
            maskClosable: false,
            visible: visible,
            title: (0, _index2.default)('import_json'),
            onOk: this.handleOk,
            onCancel: this.handleCancel,
            className: 'json-schema-react-editor-import-modal',
            okText: 'ok',
            cancelText: (0, _index2.default)('cancel'),
            footer: [_react2.default.createElement(
              _antd.Button,
              { key: 'back', onClick: this.handleCancel },
              (0, _index2.default)('cancel')
            ), _react2.default.createElement(
              _antd.Button,
              { key: 'submit', type: 'primary', onClick: this.handleOk },
              (0, _index2.default)('ok')
            )]
          },
          _react2.default.createElement(
            _antd.Tabs,
            {
              defaultActiveKey: 'json',
              onChange: function onChange(key) {
                _this3.importJsonType = key;
              }
            },
            _react2.default.createElement(
              TabPane,
              { tab: 'JSON', key: 'json' },
              _react2.default.createElement(_AceEditor2.default, { data: '', mode: 'json', onChange: this.handleImportJson })
            ),
            _react2.default.createElement(
              TabPane,
              { tab: 'JSON-SCHEMA', key: 'schema' },
              _react2.default.createElement(_AceEditor2.default, { data: '', mode: 'json', onChange: this.handleImportJsonSchema })
            )
          )
        ),
        _react2.default.createElement(
          _antd.Modal,
          {
            title: _react2.default.createElement(
              'div',
              null,
              (0, _index2.default)(editorModalName),
              '\xA0',
              editorModalName === 'mock' && _react2.default.createElement(
                _antd.Tooltip,
                { title: (0, _index2.default)('mockLink') },
                _react2.default.createElement(
                  'a',
                  {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    href: 'https://yapi.ymfe.org/documents/mock.html#\u65B9\u5F0F2.-json-schema'
                  },
                  _react2.default.createElement(_antd.Icon, { type: 'question-circle-o' })
                )
              )
            ),
            maskClosable: false,
            visible: editVisible,
            onOk: function onOk() {
              return _this3.handleEditOk(editorModalName);
            },
            onCancel: this.handleEditCancel,
            okText: (0, _index2.default)('ok'),
            cancelText: (0, _index2.default)('cancel')
          },
          _react2.default.createElement(TextArea, {
            value: this.state[editorModalName],
            placeholder: (0, _index2.default)(editorModalName),
            onChange: function onChange(e) {
              return _this3.changeDesc(e.target.value, editorModalName);
            },
            autosize: { minRows: 6, maxRows: 10 }
          })
        ),
        advVisible && _react2.default.createElement(
          _antd.Modal,
          {
            title: (0, _index2.default)('adv_setting'),
            maskClosable: false,
            visible: advVisible,
            onOk: this.handleAdvOk,
            onCancel: this.handleAdvCancel,
            okText: (0, _index2.default)('ok'),
            width: 780,
            cancelText: (0, _index2.default)('cancel'),
            className: 'json-schema-react-editor-adv-modal'
          },
          _react2.default.createElement(_SchemaOther2.default, { data: JSON.stringify(this.state.curItemCustomValue, null, 2) })
        ),
        _react2.default.createElement(
          _antd.Row,
          null,
          this.props.showEditor && _react2.default.createElement(
            _antd.Col,
            { span: 8 },
            _react2.default.createElement(_AceEditor2.default, {
              className: 'pretty-editor',
              mode: 'json',
              data: JSON.stringify(schema, null, 2),
              onChange: this.handleParams
            })
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: this.props.showEditor ? 16 : 24, className: 'wrapper object-style' },
            _react2.default.createElement(
              _antd.Row,
              { type: 'flex', align: 'middle' },
              _react2.default.createElement(
                _antd.Col,
                { span: this.props.isMock ? 10 : 12, className: 'col-item name-item col-item-name' },
                _react2.default.createElement(
                  _antd.Row,
                  { type: 'flex', justify: 'space-around', align: 'middle' },
                  _react2.default.createElement(
                    _antd.Col,
                    { span: 2, className: 'down-style-col' },
                    schema.type === 'object' ? _react2.default.createElement(
                      'span',
                      { className: 'down-style', onClick: this.clickIcon },
                      this.state.show ? _react2.default.createElement(_antd.Icon, { className: 'icon-object', type: 'caret-down' }) : _react2.default.createElement(_antd.Icon, { className: 'icon-object', type: 'caret-right' })
                    ) : null
                  ),
                  _react2.default.createElement(
                    _antd.Col,
                    { span: 22 },
                    _react2.default.createElement(_antd.Input, {
                      addonAfter: _react2.default.createElement(
                        _antd.Tooltip,
                        { placement: 'top', title: 'checked_all' },
                        _react2.default.createElement(_antd.Checkbox, {
                          checked: checked,
                          disabled: disabled,
                          onChange: function onChange(e) {
                            return _this3.changeCheckBox(e.target.checked);
                          }
                        })
                      ),
                      disabled: true,
                      value: 'root'
                    })
                  )
                )
              ),
              _react2.default.createElement(
                _antd.Col,
                { span: 4, className: 'col-item col-item-type' },
                _react2.default.createElement(
                  _antd.Select,
                  {
                    className: 'type-select-style',
                    onChange: function onChange(e) {
                      return _this3.changeType('type', e);
                    },
                    value: schema.type || 'object'
                  },
                  _utils.SCHEMA_TYPE.map(function (item, index) {
                    return _react2.default.createElement(
                      Option,
                      { value: item, key: index },
                      item
                    );
                  })
                )
              ),
              this.props.isMock && _react2.default.createElement(
                _antd.Col,
                { span: 3, className: 'col-item col-item-mock' },
                _react2.default.createElement(_index4.default, {
                  schema: schema,
                  showEdit: function showEdit() {
                    return _this3.showEdit([], 'mock', schema.mock, schema.type);
                  },
                  onChange: function onChange(value) {
                    return _this3.changeValue(['mock'], value);
                  }
                })
              ),
              _react2.default.createElement(
                _antd.Col,
                { span: this.props.isMock ? 4 : 5, className: 'col-item col-item-desc' },
                _react2.default.createElement(_antd.Input, {
                  addonAfter: _react2.default.createElement(_antd.Icon, {
                    type: 'edit',
                    onClick: function onClick() {
                      return _this3.showEdit([], 'description', _this3.props.schema.description);
                    }
                  }),
                  placeholder: 'description',
                  value: schema.description,
                  onChange: function onChange(e) {
                    return _this3.changeValue(['description'], e.target.value);
                  }
                })
              ),
              _react2.default.createElement(
                _antd.Col,
                { span: 3, className: 'col-item col-item-setting' },
                _react2.default.createElement(
                  'span',
                  { className: 'adv-set', onClick: function onClick() {
                      return _this3.showAdv([], _this3.props.schema);
                    } },
                  _react2.default.createElement(
                    _antd.Tooltip,
                    { placement: 'top', title: (0, _index2.default)('adv_setting') },
                    _react2.default.createElement(_antd.Icon, { type: 'setting' })
                  )
                ),
                schema.type === 'object' ? _react2.default.createElement(
                  'span',
                  { onClick: function onClick() {
                      return _this3.addChildField('properties');
                    } },
                  _react2.default.createElement(
                    _antd.Tooltip,
                    { placement: 'top', title: (0, _index2.default)('add_child_node') },
                    _react2.default.createElement(_antd.Icon, { type: 'plus', className: 'plus' })
                  )
                ) : null
              )
            ),
            this.state.show && _react2.default.createElement(_SchemaJson2.default, {
              data: this.props.schema,
              showEdit: this.showEdit,
              showAdv: this.showAdv
            })
          )
        )
      );
    }
  }]);

  return jsonSchema;
}(_react2.default.Component);

jsonSchema.childContextTypes = {
  getOpenValue: _propTypes2.default.func,
  changeCustomValue: _propTypes2.default.func,
  Model: _propTypes2.default.object,
  isMock: _propTypes2.default.bool
};

jsonSchema.propTypes = {
  data: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  showEditor: _propTypes2.default.bool,
  isMock: _propTypes2.default.bool,
  Model: _propTypes2.default.object
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    schema: state.schema.data,
    open: state.schema.open
  };
})(jsonSchema);