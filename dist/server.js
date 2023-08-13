"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module2) {
    "use strict";
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/basic-auth/index.js
var require_basic_auth = __commonJS({
  "node_modules/basic-auth/index.js"(exports, module2) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    module2.exports = auth;
    module2.exports.parse = parse;
    var CREDENTIALS_REGEXP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/;
    var USER_PASS_REGEXP = /^([^:]*):(.*)$/;
    function auth(req) {
      if (!req) {
        throw new TypeError("argument req is required");
      }
      if (typeof req !== "object") {
        throw new TypeError("argument req is required to be an object");
      }
      var header = getAuthorization(req);
      return parse(header);
    }
    function decodeBase64(str) {
      return Buffer2.from(str, "base64").toString();
    }
    function getAuthorization(req) {
      if (!req.headers || typeof req.headers !== "object") {
        throw new TypeError("argument req is required to have headers property");
      }
      return req.headers.authorization;
    }
    function parse(string3) {
      if (typeof string3 !== "string") {
        return void 0;
      }
      var match = CREDENTIALS_REGEXP.exec(string3);
      if (!match) {
        return void 0;
      }
      var userPass = USER_PASS_REGEXP.exec(decodeBase64(match[1]));
      if (!userPass) {
        return void 0;
      }
      return new Credentials(userPass[1], userPass[2]);
    }
    function Credentials(name, pass) {
      this.name = name;
      this.pass = pass;
    }
  }
});

// node_modules/debug/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/debug/node_modules/ms/index.js"(exports, module2) {
    "use strict";
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      if (ms >= d) {
        return Math.round(ms / d) + "d";
      }
      if (ms >= h) {
        return Math.round(ms / h) + "h";
      }
      if (ms >= m) {
        return Math.round(ms / m) + "m";
      }
      if (ms >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
    }
    function plural(ms, n, name) {
      if (ms < n) {
        return;
      }
      if (ms < n * 1.5) {
        return Math.floor(ms / n) + " " + name;
      }
      return Math.ceil(ms / n) + " " + name + "s";
    }
  }
});

// node_modules/debug/src/debug.js
var require_debug = __commonJS({
  "node_modules/debug/src/debug.js"(exports, module2) {
    "use strict";
    exports = module2.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = require_ms();
    exports.names = [];
    exports.skips = [];
    exports.formatters = {};
    var prevTime;
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    function createDebug(namespace) {
      function debug() {
        if (!debug.enabled)
          return;
        var self = debug;
        var curr = +/* @__PURE__ */ new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%")
            return match;
          index++;
          var formatter = exports.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports.formatArgs.call(self, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace);
      if ("function" === typeof exports.init) {
        exports.init(debug);
      }
      return debug;
    }
    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (var i = 0; i < len; i++) {
        if (!split[i])
          continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      exports.enable("");
    }
    function enabled(name) {
      var i, len;
      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error)
        return val.stack || val.message;
      return val;
    }
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module2) {
    "use strict";
    exports = module2.exports = require_debug();
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
      if (!useColors2)
        return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match)
          return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem("debug");
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module2) {
    "use strict";
    var tty = require("tty");
    var util = require("util");
    exports = module2.exports = require_debug();
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.colors = [6, 2, 3, 4, 5, 1];
    exports.inspectOpts = Object.keys(process.env).filter(function(key) {
      return /^debug_/i.test(key);
    }).reduce(function(obj, key) {
      var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val))
        val = true;
      else if (/^(no|off|false|disabled)$/i.test(val))
        val = false;
      else if (val === "null")
        val = null;
      else
        val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
    if (1 !== fd && 2 !== fd) {
      util.deprecate(function() {
      }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
    }
    var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
    }
    exports.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var prefix = "  \x1B[3" + c + ";1m" + name + " \x1B[0m";
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push("\x1B[3" + c + "m+" + exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + name + " " + args[0];
      }
    }
    function log() {
      return stream.write(util.format.apply(util, arguments) + "\n");
    }
    function save(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function createWritableStdioStream(fd2) {
      var stream2;
      var tty_wrap = process.binding("tty_wrap");
      switch (tty_wrap.guessHandleType(fd2)) {
        case "TTY":
          stream2 = new tty.WriteStream(fd2);
          stream2._type = "tty";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        case "FILE":
          var fs = require("fs");
          stream2 = new fs.SyncWriteStream(fd2, { autoClose: false });
          stream2._type = "fs";
          break;
        case "PIPE":
        case "TCP":
          var net = require("net");
          stream2 = new net.Socket({
            fd: fd2,
            readable: false,
            writable: true
          });
          stream2.readable = false;
          stream2.read = null;
          stream2._type = "pipe";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        default:
          throw new Error("Implement me. Unknown stream file type!");
      }
      stream2.fd = fd2;
      stream2._isStdio = true;
      return stream2;
    }
    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    exports.enable(load());
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module2) {
    "use strict";
    if (typeof process !== "undefined" && process.type === "renderer") {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/depd/index.js
var require_depd = __commonJS({
  "node_modules/depd/index.js"(exports, module2) {
    "use strict";
    var relative = require("path").relative;
    module2.exports = depd;
    var basePath = process.cwd();
    function containsNamespace(str, namespace) {
      var vals = str.split(/[ ,]+/);
      var ns = String(namespace).toLowerCase();
      for (var i = 0; i < vals.length; i++) {
        var val = vals[i];
        if (val && (val === "*" || val.toLowerCase() === ns)) {
          return true;
        }
      }
      return false;
    }
    function convertDataDescriptorToAccessor(obj, prop, message) {
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      var value = descriptor.value;
      descriptor.get = function getter() {
        return value;
      };
      if (descriptor.writable) {
        descriptor.set = function setter(val) {
          return value = val;
        };
      }
      delete descriptor.value;
      delete descriptor.writable;
      Object.defineProperty(obj, prop, descriptor);
      return descriptor;
    }
    function createArgumentsString(arity) {
      var str = "";
      for (var i = 0; i < arity; i++) {
        str += ", arg" + i;
      }
      return str.substr(2);
    }
    function createStackString(stack) {
      var str = this.name + ": " + this.namespace;
      if (this.message) {
        str += " deprecated " + this.message;
      }
      for (var i = 0; i < stack.length; i++) {
        str += "\n    at " + stack[i].toString();
      }
      return str;
    }
    function depd(namespace) {
      if (!namespace) {
        throw new TypeError("argument namespace is required");
      }
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      var file = site[0];
      function deprecate(message) {
        log.call(deprecate, message);
      }
      deprecate._file = file;
      deprecate._ignored = isignored(namespace);
      deprecate._namespace = namespace;
      deprecate._traced = istraced(namespace);
      deprecate._warned = /* @__PURE__ */ Object.create(null);
      deprecate.function = wrapfunction;
      deprecate.property = wrapproperty;
      return deprecate;
    }
    function eehaslisteners(emitter, type) {
      var count = typeof emitter.listenerCount !== "function" ? emitter.listeners(type).length : emitter.listenerCount(type);
      return count > 0;
    }
    function isignored(namespace) {
      if (process.noDeprecation) {
        return true;
      }
      var str = process.env.NO_DEPRECATION || "";
      return containsNamespace(str, namespace);
    }
    function istraced(namespace) {
      if (process.traceDeprecation) {
        return true;
      }
      var str = process.env.TRACE_DEPRECATION || "";
      return containsNamespace(str, namespace);
    }
    function log(message, site) {
      var haslisteners = eehaslisteners(process, "deprecation");
      if (!haslisteners && this._ignored) {
        return;
      }
      var caller;
      var callFile;
      var callSite;
      var depSite;
      var i = 0;
      var seen = false;
      var stack = getStack();
      var file = this._file;
      if (site) {
        depSite = site;
        callSite = callSiteLocation(stack[1]);
        callSite.name = depSite.name;
        file = callSite[0];
      } else {
        i = 2;
        depSite = callSiteLocation(stack[i]);
        callSite = depSite;
      }
      for (; i < stack.length; i++) {
        caller = callSiteLocation(stack[i]);
        callFile = caller[0];
        if (callFile === file) {
          seen = true;
        } else if (callFile === this._file) {
          file = this._file;
        } else if (seen) {
          break;
        }
      }
      var key = caller ? depSite.join(":") + "__" + caller.join(":") : void 0;
      if (key !== void 0 && key in this._warned) {
        return;
      }
      this._warned[key] = true;
      var msg = message;
      if (!msg) {
        msg = callSite === depSite || !callSite.name ? defaultMessage(depSite) : defaultMessage(callSite);
      }
      if (haslisteners) {
        var err = DeprecationError(this._namespace, msg, stack.slice(i));
        process.emit("deprecation", err);
        return;
      }
      var format = process.stderr.isTTY ? formatColor : formatPlain;
      var output = format.call(this, msg, caller, stack.slice(i));
      process.stderr.write(output + "\n", "utf8");
    }
    function callSiteLocation(callSite) {
      var file = callSite.getFileName() || "<anonymous>";
      var line = callSite.getLineNumber();
      var colm = callSite.getColumnNumber();
      if (callSite.isEval()) {
        file = callSite.getEvalOrigin() + ", " + file;
      }
      var site = [file, line, colm];
      site.callSite = callSite;
      site.name = callSite.getFunctionName();
      return site;
    }
    function defaultMessage(site) {
      var callSite = site.callSite;
      var funcName = site.name;
      if (!funcName) {
        funcName = "<anonymous@" + formatLocation(site) + ">";
      }
      var context = callSite.getThis();
      var typeName = context && callSite.getTypeName();
      if (typeName === "Object") {
        typeName = void 0;
      }
      if (typeName === "Function") {
        typeName = context.name || typeName;
      }
      return typeName && callSite.getMethodName() ? typeName + "." + funcName : funcName;
    }
    function formatPlain(msg, caller, stack) {
      var timestamp = (/* @__PURE__ */ new Date()).toUTCString();
      var formatted = timestamp + " " + this._namespace + " deprecated " + msg;
      if (this._traced) {
        for (var i = 0; i < stack.length; i++) {
          formatted += "\n    at " + stack[i].toString();
        }
        return formatted;
      }
      if (caller) {
        formatted += " at " + formatLocation(caller);
      }
      return formatted;
    }
    function formatColor(msg, caller, stack) {
      var formatted = "\x1B[36;1m" + this._namespace + "\x1B[22;39m \x1B[33;1mdeprecated\x1B[22;39m \x1B[0m" + msg + "\x1B[39m";
      if (this._traced) {
        for (var i = 0; i < stack.length; i++) {
          formatted += "\n    \x1B[36mat " + stack[i].toString() + "\x1B[39m";
        }
        return formatted;
      }
      if (caller) {
        formatted += " \x1B[36m" + formatLocation(caller) + "\x1B[39m";
      }
      return formatted;
    }
    function formatLocation(callSite) {
      return relative(basePath, callSite[0]) + ":" + callSite[1] + ":" + callSite[2];
    }
    function getStack() {
      var limit = Error.stackTraceLimit;
      var obj = {};
      var prep = Error.prepareStackTrace;
      Error.prepareStackTrace = prepareObjectStackTrace;
      Error.stackTraceLimit = Math.max(10, limit);
      Error.captureStackTrace(obj);
      var stack = obj.stack.slice(1);
      Error.prepareStackTrace = prep;
      Error.stackTraceLimit = limit;
      return stack;
    }
    function prepareObjectStackTrace(obj, stack) {
      return stack;
    }
    function wrapfunction(fn, message) {
      if (typeof fn !== "function") {
        throw new TypeError("argument fn must be a function");
      }
      var args = createArgumentsString(fn.length);
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      site.name = fn.name;
      var deprecatedfn = new Function(
        "fn",
        "log",
        "deprecate",
        "message",
        "site",
        '"use strict"\nreturn function (' + args + ") {log.call(deprecate, message, site)\nreturn fn.apply(this, arguments)\n}"
      )(fn, log, this, message, site);
      return deprecatedfn;
    }
    function wrapproperty(obj, prop, message) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new TypeError("argument obj must be object");
      }
      var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
      if (!descriptor) {
        throw new TypeError("must call property on owner object");
      }
      if (!descriptor.configurable) {
        throw new TypeError("property must be configurable");
      }
      var deprecate = this;
      var stack = getStack();
      var site = callSiteLocation(stack[1]);
      site.name = prop;
      if ("value" in descriptor) {
        descriptor = convertDataDescriptorToAccessor(obj, prop, message);
      }
      var get = descriptor.get;
      var set = descriptor.set;
      if (typeof get === "function") {
        descriptor.get = function getter() {
          log.call(deprecate, message, site);
          return get.apply(this, arguments);
        };
      }
      if (typeof set === "function") {
        descriptor.set = function setter() {
          log.call(deprecate, message, site);
          return set.apply(this, arguments);
        };
      }
      Object.defineProperty(obj, prop, descriptor);
    }
    function DeprecationError(namespace, message, stack) {
      var error = new Error();
      var stackString;
      Object.defineProperty(error, "constructor", {
        value: DeprecationError
      });
      Object.defineProperty(error, "message", {
        configurable: true,
        enumerable: false,
        value: message,
        writable: true
      });
      Object.defineProperty(error, "name", {
        enumerable: false,
        configurable: true,
        value: "DeprecationError",
        writable: true
      });
      Object.defineProperty(error, "namespace", {
        configurable: true,
        enumerable: false,
        value: namespace,
        writable: true
      });
      Object.defineProperty(error, "stack", {
        configurable: true,
        enumerable: false,
        get: function() {
          if (stackString !== void 0) {
            return stackString;
          }
          return stackString = createStackString.call(this, stack);
        },
        set: function setter(val) {
          stackString = val;
        }
      });
      return error;
    }
  }
});

// node_modules/ee-first/index.js
var require_ee_first = __commonJS({
  "node_modules/ee-first/index.js"(exports, module2) {
    "use strict";
    module2.exports = first;
    function first(stuff, done) {
      if (!Array.isArray(stuff))
        throw new TypeError("arg must be an array of [ee, events...] arrays");
      var cleanups = [];
      for (var i = 0; i < stuff.length; i++) {
        var arr = stuff[i];
        if (!Array.isArray(arr) || arr.length < 2)
          throw new TypeError("each array member must be [ee, events...]");
        var ee = arr[0];
        for (var j = 1; j < arr.length; j++) {
          var event = arr[j];
          var fn = listener(event, callback);
          ee.on(event, fn);
          cleanups.push({
            ee,
            event,
            fn
          });
        }
      }
      function callback() {
        cleanup();
        done.apply(null, arguments);
      }
      function cleanup() {
        var x;
        for (var i2 = 0; i2 < cleanups.length; i2++) {
          x = cleanups[i2];
          x.ee.removeListener(x.event, x.fn);
        }
      }
      function thunk(fn2) {
        done = fn2;
      }
      thunk.cancel = cleanup;
      return thunk;
    }
    function listener(event, done) {
      return function onevent(arg1) {
        var args = new Array(arguments.length);
        var ee = this;
        var err = event === "error" ? arg1 : null;
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        done(err, ee, event, args);
      };
    }
  }
});

// node_modules/morgan/node_modules/on-finished/index.js
var require_on_finished = __commonJS({
  "node_modules/morgan/node_modules/on-finished/index.js"(exports, module2) {
    "use strict";
    module2.exports = onFinished;
    module2.exports.isFinished = isFinished;
    var first = require_ee_first();
    var defer = typeof setImmediate === "function" ? setImmediate : function(fn) {
      process.nextTick(fn.bind.apply(fn, arguments));
    };
    function onFinished(msg, listener) {
      if (isFinished(msg) !== false) {
        defer(listener, null, msg);
        return msg;
      }
      attachListener(msg, listener);
      return msg;
    }
    function isFinished(msg) {
      var socket = msg.socket;
      if (typeof msg.finished === "boolean") {
        return Boolean(msg.finished || socket && !socket.writable);
      }
      if (typeof msg.complete === "boolean") {
        return Boolean(msg.upgrade || !socket || !socket.readable || msg.complete && !msg.readable);
      }
      return void 0;
    }
    function attachFinishedListener(msg, callback) {
      var eeMsg;
      var eeSocket;
      var finished = false;
      function onFinish(error) {
        eeMsg.cancel();
        eeSocket.cancel();
        finished = true;
        callback(error);
      }
      eeMsg = eeSocket = first([[msg, "end", "finish"]], onFinish);
      function onSocket(socket) {
        msg.removeListener("socket", onSocket);
        if (finished)
          return;
        if (eeMsg !== eeSocket)
          return;
        eeSocket = first([[socket, "error", "close"]], onFinish);
      }
      if (msg.socket) {
        onSocket(msg.socket);
        return;
      }
      msg.on("socket", onSocket);
      if (msg.socket === void 0) {
        patchAssignSocket(msg, onSocket);
      }
    }
    function attachListener(msg, listener) {
      var attached = msg.__onFinished;
      if (!attached || !attached.queue) {
        attached = msg.__onFinished = createListener(msg);
        attachFinishedListener(msg, attached);
      }
      attached.queue.push(listener);
    }
    function createListener(msg) {
      function listener(err) {
        if (msg.__onFinished === listener)
          msg.__onFinished = null;
        if (!listener.queue)
          return;
        var queue = listener.queue;
        listener.queue = null;
        for (var i = 0; i < queue.length; i++) {
          queue[i](err, msg);
        }
      }
      listener.queue = [];
      return listener;
    }
    function patchAssignSocket(res, callback) {
      var assignSocket = res.assignSocket;
      if (typeof assignSocket !== "function")
        return;
      res.assignSocket = function _assignSocket(socket) {
        assignSocket.call(this, socket);
        callback(socket);
      };
    }
  }
});

// node_modules/on-headers/index.js
var require_on_headers = __commonJS({
  "node_modules/on-headers/index.js"(exports, module2) {
    "use strict";
    module2.exports = onHeaders;
    function createWriteHead(prevWriteHead, listener) {
      var fired = false;
      return function writeHead(statusCode) {
        var args = setWriteHeadHeaders.apply(this, arguments);
        if (!fired) {
          fired = true;
          listener.call(this);
          if (typeof args[0] === "number" && this.statusCode !== args[0]) {
            args[0] = this.statusCode;
            args.length = 1;
          }
        }
        return prevWriteHead.apply(this, args);
      };
    }
    function onHeaders(res, listener) {
      if (!res) {
        throw new TypeError("argument res is required");
      }
      if (typeof listener !== "function") {
        throw new TypeError("argument listener must be a function");
      }
      res.writeHead = createWriteHead(res.writeHead, listener);
    }
    function setHeadersFromArray(res, headers) {
      for (var i = 0; i < headers.length; i++) {
        res.setHeader(headers[i][0], headers[i][1]);
      }
    }
    function setHeadersFromObject(res, headers) {
      var keys = Object.keys(headers);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (k)
          res.setHeader(k, headers[k]);
      }
    }
    function setWriteHeadHeaders(statusCode) {
      var length = arguments.length;
      var headerIndex = length > 1 && typeof arguments[1] === "string" ? 2 : 1;
      var headers = length >= headerIndex + 1 ? arguments[headerIndex] : void 0;
      this.statusCode = statusCode;
      if (Array.isArray(headers)) {
        setHeadersFromArray(this, headers);
      } else if (headers) {
        setHeadersFromObject(this, headers);
      }
      var args = new Array(Math.min(length, headerIndex));
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return args;
    }
  }
});

// node_modules/morgan/index.js
var require_morgan = __commonJS({
  "node_modules/morgan/index.js"(exports, module2) {
    "use strict";
    module2.exports = morgan2;
    module2.exports.compile = compile;
    module2.exports.format = format;
    module2.exports.token = token;
    var auth = require_basic_auth();
    var debug = require_src()("morgan");
    var deprecate = require_depd()("morgan");
    var onFinished = require_on_finished();
    var onHeaders = require_on_headers();
    var CLF_MONTH = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var DEFAULT_BUFFER_DURATION = 1e3;
    function morgan2(format2, options) {
      var fmt = format2;
      var opts = options || {};
      if (format2 && typeof format2 === "object") {
        opts = format2;
        fmt = opts.format || "default";
        deprecate("morgan(options): use morgan(" + (typeof fmt === "string" ? JSON.stringify(fmt) : "format") + ", options) instead");
      }
      if (fmt === void 0) {
        deprecate("undefined format: specify a format");
      }
      var immediate = opts.immediate;
      var skip = opts.skip || false;
      var formatLine = typeof fmt !== "function" ? getFormatFunction(fmt) : fmt;
      var buffer = opts.buffer;
      var stream = opts.stream || process.stdout;
      if (buffer) {
        deprecate("buffer option");
        var interval = typeof buffer !== "number" ? DEFAULT_BUFFER_DURATION : buffer;
        stream = createBufferStream(stream, interval);
      }
      return function logger(req, res, next) {
        req._startAt = void 0;
        req._startTime = void 0;
        req._remoteAddress = getip(req);
        res._startAt = void 0;
        res._startTime = void 0;
        recordStartTime.call(req);
        function logRequest() {
          if (skip !== false && skip(req, res)) {
            debug("skip request");
            return;
          }
          var line = formatLine(morgan2, req, res);
          if (line == null) {
            debug("skip line");
            return;
          }
          debug("log request");
          stream.write(line + "\n");
        }
        ;
        if (immediate) {
          logRequest();
        } else {
          onHeaders(res, recordStartTime);
          onFinished(res, logRequest);
        }
        next();
      };
    }
    morgan2.format("combined", ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');
    morgan2.format("common", ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]');
    morgan2.format("default", ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');
    deprecate.property(morgan2, "default", "default format: use combined format");
    morgan2.format("short", ":remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms");
    morgan2.format("tiny", ":method :url :status :res[content-length] - :response-time ms");
    morgan2.format("dev", function developmentFormatLine(tokens, req, res) {
      var status = headersSent(res) ? res.statusCode : void 0;
      var color = status >= 500 ? 31 : status >= 400 ? 33 : status >= 300 ? 36 : status >= 200 ? 32 : 0;
      var fn = developmentFormatLine[color];
      if (!fn) {
        fn = developmentFormatLine[color] = compile("\x1B[0m:method :url \x1B[" + color + "m:status\x1B[0m :response-time ms - :res[content-length]\x1B[0m");
      }
      return fn(tokens, req, res);
    });
    morgan2.token("url", function getUrlToken(req) {
      return req.originalUrl || req.url;
    });
    morgan2.token("method", function getMethodToken(req) {
      return req.method;
    });
    morgan2.token("response-time", function getResponseTimeToken(req, res, digits) {
      if (!req._startAt || !res._startAt) {
        return;
      }
      var ms = (res._startAt[0] - req._startAt[0]) * 1e3 + (res._startAt[1] - req._startAt[1]) * 1e-6;
      return ms.toFixed(digits === void 0 ? 3 : digits);
    });
    morgan2.token("total-time", function getTotalTimeToken(req, res, digits) {
      if (!req._startAt || !res._startAt) {
        return;
      }
      var elapsed = process.hrtime(req._startAt);
      var ms = elapsed[0] * 1e3 + elapsed[1] * 1e-6;
      return ms.toFixed(digits === void 0 ? 3 : digits);
    });
    morgan2.token("date", function getDateToken(req, res, format2) {
      var date = /* @__PURE__ */ new Date();
      switch (format2 || "web") {
        case "clf":
          return clfdate(date);
        case "iso":
          return date.toISOString();
        case "web":
          return date.toUTCString();
      }
    });
    morgan2.token("status", function getStatusToken(req, res) {
      return headersSent(res) ? String(res.statusCode) : void 0;
    });
    morgan2.token("referrer", function getReferrerToken(req) {
      return req.headers.referer || req.headers.referrer;
    });
    morgan2.token("remote-addr", getip);
    morgan2.token("remote-user", function getRemoteUserToken(req) {
      var credentials = auth(req);
      return credentials ? credentials.name : void 0;
    });
    morgan2.token("http-version", function getHttpVersionToken(req) {
      return req.httpVersionMajor + "." + req.httpVersionMinor;
    });
    morgan2.token("user-agent", function getUserAgentToken(req) {
      return req.headers["user-agent"];
    });
    morgan2.token("req", function getRequestToken(req, res, field) {
      var header = req.headers[field.toLowerCase()];
      return Array.isArray(header) ? header.join(", ") : header;
    });
    morgan2.token("res", function getResponseHeader(req, res, field) {
      if (!headersSent(res)) {
        return void 0;
      }
      var header = res.getHeader(field);
      return Array.isArray(header) ? header.join(", ") : header;
    });
    function clfdate(dateTime) {
      var date = dateTime.getUTCDate();
      var hour = dateTime.getUTCHours();
      var mins = dateTime.getUTCMinutes();
      var secs = dateTime.getUTCSeconds();
      var year = dateTime.getUTCFullYear();
      var month = CLF_MONTH[dateTime.getUTCMonth()];
      return pad2(date) + "/" + month + "/" + year + ":" + pad2(hour) + ":" + pad2(mins) + ":" + pad2(secs) + " +0000";
    }
    function compile(format2) {
      if (typeof format2 !== "string") {
        throw new TypeError("argument format must be a string");
      }
      var fmt = String(JSON.stringify(format2));
      var js = '  "use strict"\n  return ' + fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function(_, name, arg) {
        var tokenArguments = "req, res";
        var tokenFunction = "tokens[" + String(JSON.stringify(name)) + "]";
        if (arg !== void 0) {
          tokenArguments += ", " + String(JSON.stringify(arg));
        }
        return '" +\n    (' + tokenFunction + "(" + tokenArguments + ') || "-") + "';
      });
      return new Function("tokens, req, res", js);
    }
    function createBufferStream(stream, interval) {
      var buf = [];
      var timer = null;
      function flush() {
        timer = null;
        stream.write(buf.join(""));
        buf.length = 0;
      }
      function write(str) {
        if (timer === null) {
          timer = setTimeout(flush, interval);
        }
        buf.push(str);
      }
      return { write };
    }
    function format(name, fmt) {
      morgan2[name] = fmt;
      return this;
    }
    function getFormatFunction(name) {
      var fmt = morgan2[name] || name || morgan2.default;
      return typeof fmt !== "function" ? compile(fmt) : fmt;
    }
    function getip(req) {
      return req.ip || req._remoteAddress || req.connection && req.connection.remoteAddress || void 0;
    }
    function headersSent(res) {
      return typeof res.headersSent !== "boolean" ? Boolean(res._header) : res.headersSent;
    }
    function pad2(num) {
      var str = String(num);
      return (str.length === 1 ? "0" : "") + str;
    }
    function recordStartTime() {
      this._startAt = process.hrtime();
      this._startTime = /* @__PURE__ */ new Date();
    }
    function token(name, fn) {
      morgan2[name] = fn;
      return this;
    }
  }
});

// src/config/env.ts
var import_dotenv = require("dotenv");
(0, import_dotenv.config)();
var envConfig = class {
  constructor() {
    this.API_PORT = Number(process.env.API_PORT);
    this.ENV_MODE = process.env.ENV_MODE;
    this.DATABASE_URL = process.env.DATABASE_URL;
    this.API_SECRET_KEY = process.env.API_SECRET_KEY;
  }
};
var env_default = new envConfig();

// src/server.ts
var import_compression = __toESM(require("compression"));
var import_express4 = __toESM(require("express"));
var import_helmet = __toESM(require("helmet"));
var import_morgan = __toESM(require_morgan());

// src/routes/index.routes.ts
var import_express3 = require("express");

// src/database/prismaClient.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();

// src/core/services/users-service.ts
var UserService = {
  create: (_0) => __async(void 0, [_0], function* ({ name, username, password, mail, image }) {
    const createUser = yield prismaClient.users.create({
      data: {
        name,
        username,
        password,
        mail,
        image
      }
    });
    return createUser;
  }),
  list: () => __async(void 0, null, function* () {
    const listUsers = yield prismaClient.users.findMany();
    return listUsers;
  }),
  findOne: (where) => __async(void 0, null, function* () {
    const findOne = yield prismaClient.users.findMany({
      where
    });
    return findOne[0];
  }),
  findById: (id) => __async(void 0, null, function* () {
    const findUserById = yield prismaClient.users.findUnique({
      where: {
        id
      }
    });
    return findUserById;
  }),
  auth: (_0) => __async(void 0, [_0], function* ({ mail, password }) {
    const findOne = yield prismaClient.users.findMany({
      where: {
        mail,
        password
      }
    });
    return findOne[0];
  }),
  update: (id, data) => __async(void 0, null, function* () {
    const updateUser = yield prismaClient.users.update({
      where: { id },
      data
    });
    return updateUser;
  }),
  delete: (id) => __async(void 0, null, function* () {
    const deleteUserById = yield prismaClient.users.delete({
      where: {
        id
      }
    });
    return deleteUserById ? true : false;
  })
};

// src/presentation/middleware/ensureAuthenticate.ts
var jwt = __toESM(require("jsonwebtoken"));
var authMiddleware = class {
  ensureUserAuth(req, res, next) {
    return __async(this, null, function* () {
      try {
        const { authorization } = req.headers;
        const token = authorization == null ? void 0 : authorization.split(" ")[1];
        if (!authorization) {
          return res.status(401).json({ error: "Authorization header not found." });
        }
        if (!token) {
          return res.status(401).json({ error: "Token not found" });
        }
        const decoded = jwt.verify(token, env_default.API_SECRET_KEY);
        const { mail } = decoded;
        const user = yield UserService.findOne({ mail });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        next();
      } catch (err) {
        return res.status(401).json({ error: err });
      }
    });
  }
};
var ensureAuthenticate_default = new authMiddleware();

// src/routes/products.routes.ts
var import_express = require("express");

// src/core/services/products-service.ts
var ProductService = {
  create: (_0) => __async(void 0, [_0], function* ({
    name,
    shortName,
    barCode,
    cost,
    price,
    profitMargin,
    status,
    stock,
    minStock,
    maxStock,
    image
  }) {
    const createProduct = yield prismaClient.products.create({
      data: {
        name,
        shortName,
        barCode,
        cost,
        price,
        profitMargin,
        status,
        stock,
        minStock,
        maxStock,
        image
      }
    });
    return createProduct;
  }),
  list: () => __async(void 0, null, function* () {
    const listProducts = yield prismaClient.products.findMany();
    return listProducts;
  }),
  findById: (id) => __async(void 0, null, function* () {
    const findProductById = yield prismaClient.products.findUnique({
      where: {
        id
      }
    });
    return findProductById;
  }),
  findOne: (where) => __async(void 0, null, function* () {
    const findOne = yield prismaClient.products.findMany({
      where
    });
    return findOne[0];
  }),
  update: (id, data) => __async(void 0, null, function* () {
    const updateProduct = yield prismaClient.products.update({
      where: { id },
      data
    });
    return updateProduct;
  }),
  delete: (id) => __async(void 0, null, function* () {
    const deleteProduct = yield prismaClient.products.delete({ where: { id } });
    return deleteProduct ? true : false;
  })
};

// src/utils/app-error.ts
var AppError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/utils/calc-profit-margin.ts
function calcProfitMargin(cost, price) {
  if (cost < 0 || price <= 0) {
    return 0;
  }
  const profit = price - cost;
  const profitMargin = profit / cost * 100;
  return profitMargin;
}

// src/utils/list-of-erros.ts
var ErrorListProducts = {
  E01: { message: "Produto j\xE1 existe", statusCode: 400 },
  E02: { message: "C\xF3digo de barra j\xE1 existe em outro produto.", statusCode: 400 }
};

// src/core/usecases/products/create/create-product-usecase.ts
var CreateProductUseCase = class {
  execute(_0) {
    return __async(this, arguments, function* ({
      barCode,
      shortName,
      name,
      image,
      cost,
      price,
      profitMargin,
      stock,
      minStock,
      maxStock
    }) {
      const checkProduct = yield ProductService.findOne({ name: name.toUpperCase() });
      if (checkProduct)
        throw new AppError(ErrorListProducts["E01"].message, ErrorListProducts["E01"].statusCode);
      if (barCode) {
        const checkBarCode = yield ProductService.findOne({ barCode });
        if (checkBarCode)
          throw new AppError(ErrorListProducts["E02"].message, ErrorListProducts["E02"].statusCode);
      }
      const createProduct = yield ProductService.create({
        barCode,
        shortName: shortName.toUpperCase(),
        name: name.toUpperCase(),
        image,
        cost,
        price,
        profitMargin: profitMargin || calcProfitMargin(cost, price),
        stock,
        minStock,
        maxStock
      });
      return createProduct;
    });
  }
};

// src/presentation/controllers/product-controller.ts
var yup = __toESM(require("yup"));
var ProductController = class {
  create(req, res) {
    return __async(this, null, function* () {
      try {
        const {
          barCode,
          shortName,
          name,
          image,
          cost,
          price,
          profitMargin,
          stock,
          minStock,
          maxStock
        } = req.body;
        const yupSchema = yup.object({
          barCode: yup.string().optional(),
          shortName: yup.string().optional().max(20, "Descri\xE7\xE3o curta s\xF3 pode conter no m\xE1ximo 20 caracteres."),
          name: yup.string().required("Nome do produto \xE9 obrigat\xF3ria"),
          image: yup.string().optional(),
          cost: yup.number().required("Custo do produto \xE9 obrigat\xF3rio").min(0),
          price: yup.number().required("Pre\xE7o do produto \xE9 obrigat\xF3rio").min(0),
          profitMargin: yup.number().default(0).optional(),
          stock: yup.number().default(0),
          minStock: yup.number().default(0),
          maxStock: yup.number().default(0)
        });
        const validatedData = yield yupSchema.validate({
          barCode,
          shortName,
          name,
          image,
          cost,
          price,
          profitMargin,
          stock,
          minStock,
          maxStock
        });
        const createProductUseCase = new CreateProductUseCase();
        yield createProductUseCase.execute({
          barCode: validatedData.barCode,
          shortName: validatedData.shortName || validatedData.name.substring(0, 20),
          name: validatedData.name,
          image: validatedData.image,
          cost: validatedData.cost,
          price: validatedData.price,
          profitMargin: validatedData.profitMargin,
          stock: validatedData.stock,
          minStock: validatedData.minStock,
          maxStock: validatedData.maxStock
        });
        return res.status(201).json({ message: "Produto cadastrado com sucesso." });
      } catch (err) {
        if (err instanceof Error) {
          return res.status(400).json({ error: err.message });
        }
        return res.status(400).json({ error: err });
      }
    });
  }
};

// src/routes/products.routes.ts
var productsRouter = (0, import_express.Router)();
productsRouter.post("", (req, res) => {
  const createProductController = new ProductController();
  return createProductController.create(req, res);
});

// src/routes/user/session.routes.ts
var import_express2 = require("express");

// src/utils/crypto.ts
var import_crypto = __toESM(require("crypto"));
function createMD5(input) {
  const hash = import_crypto.default.createHash("md5");
  hash.update(input);
  return hash.digest("hex").toUpperCase();
}
function compareMD5(input, hash) {
  const inputHash = createMD5(input);
  return inputHash.toUpperCase() === hash.toUpperCase();
}

// src/core/usecases/users/auth/user-auth-usecase.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var UserAuthUseCase = class {
  execute(_0) {
    return __async(this, arguments, function* ({ username, mail, password }) {
      const findUser = yield UserService.auth({ username, mail, password: createMD5(password) });
      if (!findUser)
        throw new Error("User not found");
      if (!findUser.status)
        throw new Error("User not allowed to login");
      const compareHash = compareMD5(password, findUser.password);
      if (!compareHash)
        throw new Error("Username or password invalid");
      const buildDataToken = {
        id: findUser.id,
        name: findUser.name,
        mail: findUser.mail,
        image: findUser.image,
        created_at: findUser.createdAt
      };
      const token = import_jsonwebtoken.default.sign(buildDataToken, env_default.API_SECRET_KEY, { expiresIn: "1d" });
      return token;
    });
  }
};

// src/presentation/controllers/user-auth-controller.ts
var yup2 = __toESM(require("yup"));
var UserAuthController = class {
  handle(req, res) {
    return __async(this, null, function* () {
      try {
        const { username, mail, password } = req.body;
        const yupSchema = yup2.object({
          username: yup2.string().optional(),
          mail: yup2.string().optional(),
          password: yup2.string().required("Senha \xE9 obrigat\xF3ria")
        });
        const data = yield yupSchema.validate({ username, mail, password });
        if (!data.username && !data.mail)
          throw new Error("Informe o username ou e-mail");
        const userAuthUseCase = new UserAuthUseCase();
        const token = yield userAuthUseCase.execute({ mail: data == null ? void 0 : data.mail, password: data.password });
        return res.status(200).json({ token });
      } catch (err) {
        if (err instanceof Error) {
          return res.status(404).json({ error: err.message });
        }
        return res.status(404).json({ error: err });
      }
    });
  }
};

// src/routes/user/session.routes.ts
var userSession = (0, import_express2.Router)();
userSession.post("/session", (req, res) => {
  const userAuth = new UserAuthController();
  return userAuth.handle(req, res);
});

// src/routes/index.routes.ts
var routes = (0, import_express3.Router)();
routes.get("/", (_, res) => res.status(200).send("Hello world!"));
routes.use("/user", userSession);
routes.use("/products", ensureAuthenticate_default.ensureUserAuth, productsRouter);

// src/server.ts
var server = (0, import_express4.default)();
server.use(import_express4.default.json({ limit: "1024mb" }));
server.use(
  import_express4.default.urlencoded({ limit: "1024mb", extended: true, parameterLimit: 5e4 })
);
server.use((0, import_compression.default)());
server.use(import_express4.default.urlencoded({ extended: true }));
if (env_default.ENV_MODE === "DEV")
  server.use((0, import_morgan.default)("dev"));
server.use(
  (0, import_helmet.default)({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false
  })
);
server.use(routes);
var port = env_default.API_PORT;
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
/*! Bundled license information:

basic-auth/index.js:
  (*!
   * basic-auth
   * Copyright(c) 2013 TJ Holowaychuk
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2016 Douglas Christopher Wilson
   * MIT Licensed
   *)

depd/index.js:
  (*!
   * depd
   * Copyright(c) 2014-2018 Douglas Christopher Wilson
   * MIT Licensed
   *)

ee-first/index.js:
  (*!
   * ee-first
   * Copyright(c) 2014 Jonathan Ong
   * MIT Licensed
   *)

on-finished/index.js:
  (*!
   * on-finished
   * Copyright(c) 2013 Jonathan Ong
   * Copyright(c) 2014 Douglas Christopher Wilson
   * MIT Licensed
   *)

on-headers/index.js:
  (*!
   * on-headers
   * Copyright(c) 2014 Douglas Christopher Wilson
   * MIT Licensed
   *)

morgan/index.js:
  (*!
   * morgan
   * Copyright(c) 2010 Sencha Inc.
   * Copyright(c) 2011 TJ Holowaychuk
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2014-2017 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
