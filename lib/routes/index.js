"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var router = (0, _express.Router)();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("hello, world!");
});
var _default = router;
exports["default"] = _default;