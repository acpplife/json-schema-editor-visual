'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _schema = require('../schema.js');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('underscore');

var fieldNum = 1;
exports.default = {
  state: {
    message: null,
    data: {
      title: '',
      type: 'object',
      properties: {},
      required: []
    },
    open: {
      properties: true
    }
  },

  changeEditorSchemaAction: function changeEditorSchemaAction(state, action) {
    (0, _schema2.default)(action.value);
    state.data = action.value;
  },

  changeNameAction: function changeNameAction(state, action, oldState) {
    var keys = action.prefix;
    var name = action.name;
    var value = action.value;
    var oldData = oldState.data;
    var parentKeys = _utils2.default.getParentKeys(keys);
    var parentData = _utils2.default.getData(oldData, parentKeys);
    var requiredData = [].concat(parentData.required || []);
    var propertiesData = _utils2.default.getData(oldData, keys);
    var newPropertiesData = {};

    var curData = propertiesData[name];
    var openKeys = [].concat(keys, value, 'properties').join(_utils2.default.JSONPATH_JOIN_CHAR);
    var oldOpenKeys = [].concat(keys, name, 'properties').join(_utils2.default.JSONPATH_JOIN_CHAR);
    if (curData.properties) {
      delete state.open[oldOpenKeys];
      state.open[openKeys] = true;
    }

    if (propertiesData[value] && _typeof(propertiesData[value]) === 'object') {
      return;
    }

    requiredData = requiredData.map(function (item) {
      if (item === name) return value;
      return item;
    });

    parentKeys.push('required');
    _utils2.default.setData(state.data, parentKeys, requiredData);

    for (var i in propertiesData) {
      if (i === name) {
        newPropertiesData[value] = propertiesData[i];
      } else newPropertiesData[i] = propertiesData[i];
    }

    _utils2.default.setData(state.data, keys, newPropertiesData);
  },

  changeValueAction: function changeValueAction(state, action) {
    var keys = action.key;
    if (action.value) {
      _utils2.default.setData(state.data, keys, action.value);
    } else {
      _utils2.default.deleteData(state.data, keys);
    }
  },

  changeTypeAction: function changeTypeAction(state, action, oldState) {
    var keys = action.key;
    var value = action.value;

    var parentKeys = _utils2.default.getParentKeys(keys);
    var oldData = oldState.data;
    var parentData = _utils2.default.getData(oldData, parentKeys);
    if (parentData.type === value) {
      return;
    }
    // let newParentData = utils.defaultSchema[value];
    var newParentDataItem = _utils2.default.defaultSchema[value];

    // 将备注过滤出来
    var parentDataItem = parentData.description ? { description: parentData.description } : {};
    var newParentData = Object.assign({}, newParentDataItem, parentDataItem);

    var newKeys = [].concat('data', parentKeys);
    _utils2.default.setData(state, newKeys, newParentData);
  },

  enableRequireAction: function enableRequireAction(state, action, oldState) {
    var keys = action.prefix;
    var parentKeys = _utils2.default.getParentKeys(keys);
    var oldData = oldState.data;
    var parentData = _utils2.default.getData(oldData, parentKeys);
    var requiredData = [].concat(parentData.required || []);
    var index = requiredData.indexOf(action.name);

    if (!action.required && index >= 0) {
      requiredData.splice(index, 1);
      parentKeys.push('required');
      if (requiredData.length === 0) {
        _utils2.default.deleteData(state.data, parentKeys);
      } else {
        _utils2.default.setData(state.data, parentKeys, requiredData);
      }
    } else if (action.required && index === -1) {
      requiredData.push(action.name);
      parentKeys.push('required');
      _utils2.default.setData(state.data, parentKeys, requiredData);
    }
  },

  requireAllAction: function requireAllAction(state, action, oldState) {
    // let oldData = oldState.data;
    var data = _utils2.default.cloneObject(action.value);
    _utils2.default.handleSchemaRequired(data, action.required);

    state.data = data;
  },

  deleteItemAction: function deleteItemAction(state, action, oldState) {
    var keys = action.key;

    var name = keys[keys.length - 1];
    var oldData = oldState.data;
    var parentKeys = _utils2.default.getParentKeys(keys);
    var parentData = _utils2.default.getData(oldData, parentKeys);
    var newParentData = {};
    for (var i in parentData) {
      if (i !== name) {
        newParentData[i] = parentData[i];
      }
    }

    _utils2.default.setData(state.data, parentKeys, newParentData);
  },

  addFieldAction: function addFieldAction(state, action, oldState) {
    var keys = action.prefix;
    var oldData = oldState.data;
    var name = action.name;
    var propertiesData = _utils2.default.getData(oldData, keys);
    var newPropertiesData = {};

    var parentKeys = _utils2.default.getParentKeys(keys);
    var parentData = _utils2.default.getData(oldData, parentKeys);
    var requiredData = [].concat(parentData.required || []);

    if (!name) {
      newPropertiesData = Object.assign({}, propertiesData);
      var ranName = 'field_' + fieldNum++;
      newPropertiesData[ranName] = _utils2.default.defaultSchema.string;
      requiredData.push(ranName);
    } else {
      for (var i in propertiesData) {
        newPropertiesData[i] = propertiesData[i];
        if (i === name) {
          var _ranName = 'field_' + fieldNum++;
          newPropertiesData[_ranName] = _utils2.default.defaultSchema.string;
          requiredData.push(_ranName);
        }
      }
    }
    _utils2.default.setData(state.data, keys, newPropertiesData);
    // add required
    parentKeys.push('required');
    _utils2.default.setData(state.data, parentKeys, requiredData);
  },
  addChildFieldAction: function addChildFieldAction(state, action, oldState) {
    var keys = action.key;
    var oldData = oldState.data;
    var propertiesData = _utils2.default.getData(oldData, keys);
    var newPropertiesData = {};

    newPropertiesData = Object.assign({}, propertiesData);
    var ranName = 'field_' + fieldNum++;
    newPropertiesData[ranName] = _utils2.default.defaultSchema.string;
    _utils2.default.setData(state.data, keys, newPropertiesData);

    // add required
    var parentKeys = _utils2.default.getParentKeys(keys);
    var parentData = _utils2.default.getData(oldData, parentKeys);
    var requiredData = [].concat(parentData.required || []);
    requiredData.push(ranName);
    parentKeys.push('required');
    _utils2.default.setData(state.data, parentKeys, requiredData);
  },

  setOpenValueAction: function setOpenValueAction(state, action, oldState) {
    var keys = action.key.join(_utils2.default.JSONPATH_JOIN_CHAR);

    var status = void 0;
    if (_.isUndefined(action.value)) {
      status = _utils2.default.getData(oldState.open, [keys]) ? false : true;
    } else {
      status = action.value;
    }
    _utils2.default.setData(state.open, [keys], status);
  }
};