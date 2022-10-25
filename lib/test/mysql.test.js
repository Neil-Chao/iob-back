"use strict";

var _mysql = _interopRequireDefault(require("mysql"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// var mysql = require('mysql');
var connection = _mysql["default"].createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'iob'
});
connection.connect();
connection.query('SELECT * from user', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
connection.end();