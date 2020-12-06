"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDataByTableName = exports.execute_command_by_type = exports.getDirInfoByType = exports.addCmdToDb = exports.uploadData = exports.baseURL = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseURL = "http://127.0.0.1:8080/";
exports.baseURL = baseURL;
var config = {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
};

var uploadData = function uploadData(formData, pathPara) {
  return _axios["default"].post(baseURL + 'uploading/' + pathPara, formData, config);
};

exports.uploadData = uploadData;

var addCmdToDb = function addCmdToDb(formValues) {
  return _axios["default"].post(baseURL + 'command', formValues);
};

exports.addCmdToDb = addCmdToDb;

var getDirInfoByType = function getDirInfoByType(typeName) {
  return _axios["default"].get(baseURL + 'dir-data', {
    params: {
      type: typeName
    }
  });
};

exports.getDirInfoByType = getDirInfoByType;

var execute_command_by_type = function execute_command_by_type(formValues, cmdType) {
  return _axios["default"].post(baseURL + 'execute_command', formValues, {
    params: {
      cmd_type: cmdType
    }
  });
};

exports.execute_command_by_type = execute_command_by_type;

var getDataByTableName = function getDataByTableName(tableName) {
  return _axios["default"].get(baseURL + 'db_data', {
    params: {
      table_name: tableName
    }
  });
};

exports.getDataByTableName = getDataByTableName;
