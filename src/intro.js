(function (global) {
"use strict";

var $          = require("abaaso"),
    crypto     = require("crypto"),
    fs         = require("fs"),
    mime       = require("mime"),
    moment     = require("moment"),
    url        = require("url"),
    util       = require("util"),
    zlib       = require("zlib"),
    REGEX_HALT = new RegExp("ReferenceError|" + $.label.error.invalidArguments),
    REGEX_BODY = /head|options/i,
    REGEX_GET  = /get|head|options/i,
    REGEX_DEL  = /del/i,
    REGEX_DEF  = /deflate/,
    REGEX_GZIP = /gzip/;
