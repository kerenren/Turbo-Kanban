"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get_mock_files = exports.mock_files = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mock_files = [{
  key: 'photos/animals/cat in a hat.png',
  modified: +(0, _moment["default"])().subtract(1, 'hours'),
  size: 1.5 * 1024 * 1024
}, {
  key: 'photos/animals/kitten_ball.png',
  modified: +(0, _moment["default"])().subtract(3, 'days'),
  size: 545 * 1024
}, {
  key: 'photos/animals/elephants.png',
  modified: +(0, _moment["default"])().subtract(3, 'days'),
  size: 52 * 1024
}, {
  key: 'photos/funny fall.gif',
  modified: +(0, _moment["default"])().subtract(2, 'months'),
  size: 13.2 * 1024 * 1024
}, {
  key: 'photos/holiday.jpg',
  modified: +(0, _moment["default"])().subtract(25, 'days'),
  size: 85 * 1024
}, {
  key: 'documents/letter chunks.doc',
  modified: +(0, _moment["default"])().subtract(15, 'days'),
  size: 480 * 1024
}, {
  key: 'documents/export.pdf',
  modified: +(0, _moment["default"])().subtract(15, 'days'),
  size: 4.2 * 1024 * 1024
}];
exports.mock_files = mock_files;

var get_mock_files = function get_mock_files(filesInfo) {
  return filesInfo.map(function (fileInfo) {
    return {
      key: fileInfo['file_path'],
      modified: +(0, _moment["default"])().subtract(fileInfo['last_modified_sec'], 's'),
      size: fileInfo['size'] * 1024
    };
  });
};

exports.get_mock_files = get_mock_files;
