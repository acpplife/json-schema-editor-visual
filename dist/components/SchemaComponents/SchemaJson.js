'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _FieldInput = require('./FieldInput');

var _FieldInput2 = _interopRequireDefault(_FieldInput);

require('./schemaJson.css');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../../utils.js');

var _index = require('../LocalProvider/index.js');

var _index2 = _interopRequireDefault(_index);

var _utils2 = require('../../utils');

var _utils3 = _interopRequireDefault(_utils2);

var _index3 = require('../MockSelect/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _antd.Form.Item;
var Option = _antd.Select.Option;
var TextArea = _antd.Input.TextArea;

var InputGroup = _antd.Input.Group;


var mapping = function mapping(name, data, showEdit, showAdv) {
  switch (data.type) {
    case 'array':
      return _react2.default.createElement(SchemaArray, { prefix: name, data: data, showEdit: showEdit, showAdv: showAdv });
      break;
    case 'object':
      var nameArray = [].concat(name, 'properties');
      return _react2.default.createElement(SchemaObject, { prefix: nameArray, data: data, showEdit: showEdit, showAdv: showAdv });
      break;
    default:
      return null;
  }
};

var SchemaArray = function (_PureComponent) {
  _inherits(SchemaArray, _PureComponent);

  function SchemaArray(props, context) {
    _classCallCheck(this, SchemaArray);

    var _this = _possibleConstructorReturn(this, (SchemaArray.__proto__ || Object.getPrototypeOf(SchemaArray)).call(this, props));

    _this.handleChangeType = function (value) {
      var prefix = _this.getPrefix();
      var key = [].concat(prefix, 'type');
      _this.Model.changeTypeAction({ key: key, value: value });
    };

    _this.handleChangeDesc = function (e) {
      var prefix = _this.getPrefix();
      var key = [].concat(prefix, 'description');
      var value = e.target.value;
      _this.Model.changeValueAction({ key: key, value: value });
    };

    _this.handleChangeMock = function (e) {
      var prefix = _this.getPrefix();
      var key = [].concat(prefix, 'mock');
      var value = e ? { mock: e } : '';
      _this.Model.changeValueAction({ key: key, value: value });
    };

    _this.handleAddChildField = function () {
      var prefix = _this.getPrefix();
      var keyArr = [].concat(prefix, 'properties');
      _this.Model.addChildFieldAction({ key: keyArr });
      _this.Model.setOpenValueAction({ key: keyArr, value: true });
    };

    _this.handleClickIcon = function () {
      var prefix = _this.getPrefix();
      // 数据存储在 properties.name.properties下
      var keyArr = [].concat(prefix, 'properties');
      _this.Model.setOpenValueAction({ key: keyArr });
    };

    _this.handleShowEdit = function (name, type) {
      var prefix = _this.getPrefix();
      _this.props.showEdit(prefix, name, _this.props.data.items[name], type);
    };

    _this.handleShowAdv = function () {
      _this.props.showAdv(_this.getPrefix(), _this.props.data.items);
    };

    _this._tagPaddingLeftStyle = {};
    _this.Model = context.Model.schema;
    return _this;
  }

  _createClass(SchemaArray, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var prefix = this.props.prefix;

      var length = prefix.filter(function (name) {
        return name != 'properties';
      }).length;
      this.__tagPaddingLeftStyle = {
        paddingLeft: 20 * (length + 1) + 'px'
      };
    }
  }, {
    key: 'getPrefix',
    value: function getPrefix() {
      return [].concat(this.props.prefix, 'items');
    }

    // 修改数据类型


    // 修改备注信息


    // 修改mock信息


    // 增加子节点

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          prefix = _props.prefix,
          showEdit = _props.showEdit,
          showAdv = _props.showAdv;

      var items = data.items;
      var prefixArray = [].concat(prefix, 'items');

      var prefixArrayStr = [].concat(prefixArray, 'properties').join(_utils.JSONPATH_JOIN_CHAR);
      var showIcon = this.context.getOpenValue([prefixArrayStr]);
      return !_underscore2.default.isUndefined(data.items) && _react2.default.createElement(
        'div',
        { className: 'array-type' },
        _react2.default.createElement(
          _antd.Row,
          { className: 'array-item-type', type: 'flex', justify: 'space-around', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            {
              span: this.context.isMock ? 10 : 12,
              className: 'col-item name-item col-item-name',
              style: this.__tagPaddingLeftStyle
            },
            _react2.default.createElement(
              _antd.Row,
              { type: 'flex', justify: 'space-around', align: 'middle' },
              _react2.default.createElement(
                _antd.Col,
                { span: 2, className: 'down-style-col' },
                items.type === 'object' ? _react2.default.createElement(
                  'span',
                  { className: 'down-style', onClick: this.handleClickIcon },
                  showIcon ? _react2.default.createElement(_antd.Icon, { className: 'icon-object', type: 'caret-down' }) : _react2.default.createElement(_antd.Icon, { className: 'icon-object', type: 'caret-right' })
                ) : null
              ),
              _react2.default.createElement(
                _antd.Col,
                { span: 22 },
                _react2.default.createElement(_antd.Input, { addonAfter: _react2.default.createElement(_antd.Checkbox, { disabled: true }), disabled: true, value: 'Items' })
              )
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 4, className: 'col-item col-item-type' },
            _react2.default.createElement(
              _antd.Select,
              {
                name: 'itemtype',
                className: 'type-select-style',
                onChange: this.handleChangeType,
                value: items.type
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
          this.context.isMock && _react2.default.createElement(
            _antd.Col,
            { span: 3, className: 'col-item col-item-mock' },
            _react2.default.createElement(_index4.default, {
              schema: items,
              showEdit: function showEdit() {
                return _this2.handleShowEdit('mock', items.type);
              },
              onChange: this.handleChangeMock
            })
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: this.context.isMock ? 4 : 5, className: 'col-item col-item-desc' },
            _react2.default.createElement(_antd.Input, {
              addonAfter: _react2.default.createElement(_antd.Icon, { type: 'edit', onClick: function onClick() {
                  return _this2.handleShowEdit('description');
                } }),
              placeholder: (0, _index2.default)('description'),
              value: items.description,
              onChange: this.handleChangeDesc
            })
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 3, className: 'col-item col-item-setting' },
            _react2.default.createElement(
              'span',
              { className: 'adv-set', onClick: this.handleShowAdv },
              _react2.default.createElement(
                _antd.Tooltip,
                { placement: 'top', title: (0, _index2.default)('adv_setting') },
                _react2.default.createElement(_antd.Icon, { type: 'setting' })
              )
            ),
            items.type === 'object' ? _react2.default.createElement(
              'span',
              { onClick: this.handleAddChildField },
              _react2.default.createElement(
                _antd.Tooltip,
                { placement: 'top', title: (0, _index2.default)('add_child_node') },
                _react2.default.createElement(_antd.Icon, { type: 'plus', className: 'plus' })
              )
            ) : null
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'option-formStyle' },
          mapping(prefixArray, items, showEdit, showAdv)
        )
      );
    }
  }]);

  return SchemaArray;
}(_react.PureComponent);

SchemaArray.contextTypes = {
  getOpenValue: _propTypes2.default.func,
  Model: _propTypes2.default.object,
  isMock: _propTypes2.default.bool
};

var SchemaItem = function (_PureComponent2) {
  _inherits(SchemaItem, _PureComponent2);

  function SchemaItem(props, context) {
    _classCallCheck(this, SchemaItem);

    var _this3 = _possibleConstructorReturn(this, (SchemaItem.__proto__ || Object.getPrototypeOf(SchemaItem)).call(this, props));

    _this3.handleChangeName = function (e) {
      var _this3$props = _this3.props,
          data = _this3$props.data,
          prefix = _this3$props.prefix,
          name = _this3$props.name;

      var value = e.target.value;

      if (data.properties[value] && _typeof(data.properties[value]) === 'object') {
        return _antd.message.error('The field "' + value + '" already exists.');
      }

      _this3.Model.changeNameAction({ value: value, prefix: prefix, name: name });
    };

    _this3.handleChangeDesc = function (e) {
      var prefix = _this3.getPrefix();
      var key = [].concat(prefix, 'description');
      var value = e.target.value;
      _this3.Model.changeValueAction({ key: key, value: value });
    };

    _this3.handleChangeMock = function (e) {
      var prefix = _this3.getPrefix();
      var key = [].concat(prefix, 'mock');
      var value = e ? { mock: e } : '';
      _this3.Model.changeValueAction({ key: key, value: value });
    };

    _this3.handleChangeType = function (e) {
      var prefix = _this3.getPrefix();
      var key = [].concat(prefix, 'type');
      _this3.Model.changeTypeAction({ key: key, value: e });
    };

    _this3.handleDeleteItem = function () {
      var _this3$props2 = _this3.props,
          prefix = _this3$props2.prefix,
          name = _this3$props2.name;

      var nameArray = _this3.getPrefix();
      _this3.Model.deleteItemAction({ key: nameArray });
      _this3.Model.enableRequireAction({ prefix: prefix, name: name, required: false });
    };

    _this3.handleShowEdit = function (editorName, type) {
      var _this3$props3 = _this3.props,
          data = _this3$props3.data,
          name = _this3$props3.name,
          showEdit = _this3$props3.showEdit;


      showEdit(_this3.getPrefix(), editorName, data.properties[name][editorName], type);
    };

    _this3.handleShowAdv = function () {
      var _this3$props4 = _this3.props,
          data = _this3$props4.data,
          name = _this3$props4.name,
          showAdv = _this3$props4.showAdv;

      showAdv(_this3.getPrefix(), data.properties[name]);
    };

    _this3.handleAddField = function () {
      var _this3$props5 = _this3.props,
          prefix = _this3$props5.prefix,
          name = _this3$props5.name;

      _this3.Model.addFieldAction({ prefix: prefix, name: name });
    };

    _this3.handleClickIcon = function () {
      var prefix = _this3.getPrefix();
      // 数据存储在 properties.xxx.properties 下
      var keyArr = [].concat(prefix, 'properties');
      _this3.Model.setOpenValueAction({ key: keyArr });
    };

    _this3.handleEnableRequire = function (e) {
      var _this3$props6 = _this3.props,
          prefix = _this3$props6.prefix,
          name = _this3$props6.name;

      var required = e.target.checked;
      // this.enableRequire(this.props.prefix, this.props.name, e.target.checked);
      _this3.Model.enableRequireAction({ prefix: prefix, name: name, required: required });
    };

    _this3._tagPaddingLeftStyle = {};
    // this.num = 0
    _this3.Model = context.Model.schema;
    return _this3;
  }

  _createClass(SchemaItem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var prefix = this.props.prefix;

      var length = prefix.filter(function (name) {
        return name != 'properties';
      }).length;
      this.__tagPaddingLeftStyle = {
        paddingLeft: 20 * (length + 1) + 'px'
      };
    }
  }, {
    key: 'getPrefix',
    value: function getPrefix() {
      return [].concat(this.props.prefix, this.props.name);
    }

    // 修改节点字段名


    // 修改备注信息


    // 修改mock 信息


    // 修改数据类型


    // 删除节点

    /*
    展示备注编辑弹窗
    editorName: 弹窗名称 ['description', 'mock']
    type: 如果当前字段是object || array showEdit 不可用
    */


    // 展示高级设置弹窗


    //  增加子节点


    // 控制三角形按钮


    // 修改是否必须

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          name = _props2.name,
          data = _props2.data,
          prefix = _props2.prefix,
          showEdit = _props2.showEdit,
          showAdv = _props2.showAdv;

      var value = data.properties[name];
      var prefixArray = [].concat(prefix, name);

      var prefixStr = prefix.join(_utils.JSONPATH_JOIN_CHAR);
      var prefixArrayStr = [].concat(prefixArray, 'properties').join(_utils.JSONPATH_JOIN_CHAR);
      var show = this.context.getOpenValue([prefixStr]);
      var showIcon = this.context.getOpenValue([prefixArrayStr]);
      return show ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Row,
          { type: 'flex', justify: 'space-around', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            {
              span: this.context.isMock ? 10 : 12,
              className: 'col-item name-item col-item-name',
              style: this.__tagPaddingLeftStyle
            },
            _react2.default.createElement(
              _antd.Row,
              { type: 'flex', justify: 'space-around', align: 'middle' },
              _react2.default.createElement(
                _antd.Col,
                { span: 2, className: 'down-style-col' },
                value.type === 'object' ? _react2.default.createElement(
                  'span',
                  { className: 'down-style', onClick: this.handleClickIcon },
                  showIcon ? _react2.default.createElement(_antd.Icon, { className: 'icon-object', type: 'caret-down' }) : _react2.default.createElement(_antd.Icon, { className: 'icon-object', type: 'caret-right' })
                ) : null
              ),
              _react2.default.createElement(
                _antd.Col,
                { span: 22 },
                _react2.default.createElement(_FieldInput2.default, {
                  addonAfter: _react2.default.createElement(
                    _antd.Tooltip,
                    { placement: 'top', title: (0, _index2.default)('required') },
                    _react2.default.createElement(_antd.Checkbox, {
                      onChange: this.handleEnableRequire,
                      checked: _underscore2.default.isUndefined(data.required) ? false : data.required.indexOf(name) != -1
                    })
                  ),
                  onChange: this.handleChangeName,
                  value: name
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
                onChange: this.handleChangeType,
                value: value.type
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
          this.context.isMock && _react2.default.createElement(
            _antd.Col,
            { span: 3, className: 'col-item col-item-mock' },
            _react2.default.createElement(_index4.default, {
              schema: value,
              showEdit: function showEdit() {
                return _this4.handleShowEdit('mock', value.type);
              },
              onChange: this.handleChangeMock
            })
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: this.context.isMock ? 4 : 5, className: 'col-item col-item-desc' },
            _react2.default.createElement(_antd.Input, {
              addonAfter: _react2.default.createElement(_antd.Icon, { type: 'edit', onClick: function onClick() {
                  return _this4.handleShowEdit('description');
                } }),
              placeholder: (0, _index2.default)('description'),
              value: value.description,
              onChange: this.handleChangeDesc
            })
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 3, className: 'col-item col-item-setting' },
            _react2.default.createElement(
              'span',
              { className: 'adv-set', onClick: this.handleShowAdv },
              _react2.default.createElement(
                _antd.Tooltip,
                { placement: 'top', title: (0, _index2.default)('adv_setting') },
                _react2.default.createElement(_antd.Icon, { type: 'setting' })
              )
            ),
            _react2.default.createElement(
              'span',
              { className: 'delete-item', onClick: this.handleDeleteItem },
              _react2.default.createElement(_antd.Icon, { type: 'close', className: 'close' })
            ),
            value.type === 'object' ? _react2.default.createElement(DropPlus, { prefix: prefix, name: name }) : _react2.default.createElement(
              'span',
              { onClick: this.handleAddField },
              _react2.default.createElement(
                _antd.Tooltip,
                { placement: 'top', title: (0, _index2.default)('add_sibling_node') },
                _react2.default.createElement(_antd.Icon, { type: 'plus', className: 'plus' })
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'option-formStyle' },
          mapping(prefixArray, value, showEdit, showAdv)
        )
      ) : null;
    }
  }]);

  return SchemaItem;
}(_react.PureComponent);

SchemaItem.contextTypes = {
  getOpenValue: _propTypes2.default.func,
  Model: _propTypes2.default.object,
  isMock: _propTypes2.default.bool
};

var SchemaObjectComponent = function (_Component) {
  _inherits(SchemaObjectComponent, _Component);

  function SchemaObjectComponent() {
    _classCallCheck(this, SchemaObjectComponent);

    return _possibleConstructorReturn(this, (SchemaObjectComponent.__proto__ || Object.getPrototypeOf(SchemaObjectComponent)).apply(this, arguments));
  }

  _createClass(SchemaObjectComponent, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (_underscore2.default.isEqual(nextProps.data, this.props.data) && _underscore2.default.isEqual(nextProps.prefix, this.props.prefix) && _underscore2.default.isEqual(nextProps.open, this.props.open)) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props3 = this.props,
          data = _props3.data,
          prefix = _props3.prefix,
          showEdit = _props3.showEdit,
          showAdv = _props3.showAdv;

      return _react2.default.createElement(
        'div',
        { className: 'object-style' },
        Object.keys(data.properties).map(function (name, index) {
          return _react2.default.createElement(SchemaItem, {
            key: index,
            data: _this6.props.data,
            name: name,
            prefix: prefix,
            showEdit: showEdit,
            showAdv: showAdv
          });
        })
      );
    }
  }]);

  return SchemaObjectComponent;
}(_react.Component);

var SchemaObject = (0, _reactRedux.connect)(function (state) {
  return {
    open: state.schema.open
  };
})(SchemaObjectComponent);

var DropPlus = function DropPlus(props, context) {
  var prefix = props.prefix,
      name = props.name,
      add = props.add;

  var Model = context.Model.schema;
  var menu = _react2.default.createElement(
    _antd.Menu,
    null,
    _react2.default.createElement(
      _antd.Menu.Item,
      null,
      _react2.default.createElement(
        'span',
        { onClick: function onClick() {
            return Model.addFieldAction({ prefix: prefix, name: name });
          } },
        (0, _index2.default)('sibling_node')
      )
    ),
    _react2.default.createElement(
      _antd.Menu.Item,
      null,
      _react2.default.createElement(
        'span',
        {
          onClick: function onClick() {
            Model.setOpenValueAction({ key: [].concat(prefix, name, 'properties'), value: true });
            Model.addChildFieldAction({ key: [].concat(prefix, name, 'properties') });
          }
        },
        (0, _index2.default)('child_node')
      )
    )
  );

  return _react2.default.createElement(
    _antd.Tooltip,
    { placement: 'top', title: (0, _index2.default)('add_node') },
    _react2.default.createElement(
      _antd.Dropdown,
      { overlay: menu },
      _react2.default.createElement(_antd.Icon, { type: 'plus', className: 'plus' })
    )
  );
};

DropPlus.contextTypes = {
  Model: _propTypes2.default.object
};

var SchemaJson = function SchemaJson(props) {
  var item = mapping([], props.data, props.showEdit, props.showAdv);
  return _react2.default.createElement(
    'div',
    { className: 'schema-content' },
    item
  );
};

exports.default = SchemaJson;