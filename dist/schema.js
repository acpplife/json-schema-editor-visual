'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = handleSchema;

function handleType(schema) {
  if (!schema.type && schema.properties && _typeof(schema.properties) === 'object') {

    schema.type = 'object';
  }
}

function handleSchema(schema) {
  if (schema && !schema.type && !schema.properties) {
    schema.type = 'string';
  }
  handleType(schema);
  if (schema.type === "object") {
    if (!schema.properties) schema.properties = {};
    handleObject(schema.properties, schema);
  } else if (schema.type === "array") {
    if (!schema.items) schema.items = { type: 'string' };
    handleSchema(schema.items);
  } else {
    return schema;
  }
}

function handleObject(properties) {
  for (var key in properties) {
    handleType(properties[key]);
    if (properties[key].type === 'array' || properties[key].type === 'object') handleSchema(properties[key]);
  }
}