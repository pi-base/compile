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

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS({
  "node_modules/@actions/core/lib/command.js"(exports) {
    "use strict";
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (Object.hasOwnProperty.call(mod, k))
            result[k] = mod[k];
      }
      result["default"] = mod;
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var os = __importStar(require("os"));
    function issueCommand(command, properties2, message) {
      const cmd = new Command(command, properties2, message);
      process.stdout.write(cmd.toString() + os.EOL);
    }
    exports.issueCommand = issueCommand;
    function issue(name, message = "") {
      issueCommand(name, {}, message);
    }
    exports.issue = issue;
    var CMD_STRING = "::";
    var Command = class {
      constructor(command, properties2, message) {
        if (!command) {
          command = "missing.command";
        }
        this.command = command;
        this.properties = properties2;
        this.message = message;
      }
      toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
          cmdStr += " ";
          let first = true;
          for (const key in this.properties) {
            if (this.properties.hasOwnProperty(key)) {
              const val = this.properties[key];
              if (val) {
                if (first) {
                  first = false;
                } else {
                  cmdStr += ",";
                }
                cmdStr += `${key}=${escapeProperty(val)}`;
              }
            }
          }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
      }
    };
    function escapeData(s) {
      return (s || "").replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
    }
    function escapeProperty(s) {
      return (s || "").replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
    }
  }
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS({
  "node_modules/@actions/core/lib/core.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (Object.hasOwnProperty.call(mod, k))
            result[k] = mod[k];
      }
      result["default"] = mod;
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var command_1 = require_command();
    var os = __importStar(require("os"));
    var path = __importStar(require("path"));
    var ExitCode;
    (function(ExitCode2) {
      ExitCode2[ExitCode2["Success"] = 0] = "Success";
      ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
    })(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
    function exportVariable(name, val) {
      process.env[name] = val;
      command_1.issueCommand("set-env", { name }, val);
    }
    exports.exportVariable = exportVariable;
    function setSecret(secret) {
      command_1.issueCommand("add-mask", {}, secret);
    }
    exports.setSecret = setSecret;
    function addPath(inputPath) {
      command_1.issueCommand("add-path", {}, inputPath);
      process.env["PATH"] = `${inputPath}${path.delimiter}${process.env["PATH"]}`;
    }
    exports.addPath = addPath;
    function getInput2(name, options) {
      const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
      if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
      }
      return val.trim();
    }
    exports.getInput = getInput2;
    function setOutput(name, value) {
      command_1.issueCommand("set-output", { name }, value);
    }
    exports.setOutput = setOutput;
    function setFailed2(message) {
      process.exitCode = ExitCode.Failure;
      error3(message);
    }
    exports.setFailed = setFailed2;
    function debug2(message) {
      command_1.issueCommand("debug", {}, message);
    }
    exports.debug = debug2;
    function error3(message) {
      command_1.issue("error", message);
    }
    exports.error = error3;
    function warning(message) {
      command_1.issue("warning", message);
    }
    exports.warning = warning;
    function info(message) {
      process.stdout.write(message + os.EOL);
    }
    exports.info = info;
    function startGroup(name) {
      command_1.issue("group", name);
    }
    exports.startGroup = startGroup;
    function endGroup() {
      command_1.issue("endgroup");
    }
    exports.endGroup = endGroup;
    function group(name, fn) {
      return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
          result = yield fn();
        } finally {
          endGroup();
        }
        return result;
      });
    }
    exports.group = group;
    function saveState(name, value) {
      command_1.issueCommand("save-state", { name }, value);
    }
    exports.saveState = saveState;
    function getState(name) {
      return process.env[`STATE_${name}`] || "";
    }
    exports.getState = getState;
  }
});

// node_modules/@pi-base/core/lib/Id.js
var require_Id = __commonJS({
  "node_modules/@pi-base/core/lib/Id.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.traitId = void 0;
    function traitId(_a) {
      var space2 = _a.space, property2 = _a.property;
      return space2 + "|" + property2;
    }
    exports.traitId = traitId;
  }
});

// node_modules/@pi-base/core/lib/Formula/Grammar.js
var require_Grammar = __commonJS({
  "node_modules/@pi-base/core/lib/Formula/Grammar.js"(exports) {
    "use strict";
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parse = exports.SyntaxError = void 0;
    var SyntaxError = (
      /** @class */
      function(_super) {
        __extends(SyntaxError2, _super);
        function SyntaxError2(message, expected, found, location) {
          var _this = _super.call(this) || this;
          _this.message = message;
          _this.expected = expected;
          _this.found = found;
          _this.location = location;
          _this.name = "SyntaxError";
          if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(_this, SyntaxError2);
          }
          return _this;
        }
        SyntaxError2.buildMessage = function(expected, found) {
          function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
          }
          function literalEscape(s) {
            return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
              return "\\x0" + hex(ch);
            }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
              return "\\x" + hex(ch);
            });
          }
          function classEscape(s) {
            return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
              return "\\x0" + hex(ch);
            }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
              return "\\x" + hex(ch);
            });
          }
          function describeExpectation(expectation) {
            switch (expectation.type) {
              case "literal":
                return '"' + literalEscape(expectation.text) + '"';
              case "class":
                var escapedParts = expectation.parts.map(function(part) {
                  return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
                });
                return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
              case "any":
                return "any character";
              case "end":
                return "end of input";
              case "other":
                return expectation.description;
            }
          }
          function describeExpected(expected1) {
            var descriptions = expected1.map(describeExpectation);
            var i;
            var j;
            descriptions.sort();
            if (descriptions.length > 0) {
              for (i = 1, j = 1; i < descriptions.length; i++) {
                if (descriptions[i - 1] !== descriptions[i]) {
                  descriptions[j] = descriptions[i];
                  j++;
                }
              }
              descriptions.length = j;
            }
            switch (descriptions.length) {
              case 1:
                return descriptions[0];
              case 2:
                return descriptions[0] + " or " + descriptions[1];
              default:
                return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
            }
          }
          function describeFound(found1) {
            return found1 ? '"' + literalEscape(found1) + '"' : "end of input";
          }
          return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
        };
        return SyntaxError2;
      }(Error)
    );
    exports.SyntaxError = SyntaxError;
    function peg$parse(input, options) {
      options = options !== void 0 ? options : {};
      var peg$FAILED = {};
      var peg$startRuleFunctions = { Formula: peg$parseFormula };
      var peg$startRuleFunction = peg$parseFormula;
      var peg$c0 = peg$otherExpectation("formula");
      var peg$c1 = peg$otherExpectation("whitespace");
      var peg$c2 = /^[ \t\n\r]/;
      var peg$c3 = peg$classExpectation([" ", "	", "\n", "\r"], false, false);
      var peg$c4 = "(";
      var peg$c5 = peg$literalExpectation("(", false);
      var peg$c6 = ")";
      var peg$c7 = peg$literalExpectation(")", false);
      var peg$c8 = function(head, tail) {
        return { and: [head].concat(tail.map(function(item) {
          return item[3];
        })) };
      };
      var peg$c9 = function(head, tail) {
        return { or: [head].concat(tail.map(function(item) {
          return item[3];
        })) };
      };
      var peg$c10 = function(mod, prop) {
        var value;
        if (mod === "?") {
          value = void 0;
        } else if (mod) {
          value = false;
        } else {
          value = true;
        }
        return { property: prop, value };
      };
      var peg$c11 = peg$otherExpectation("modifier");
      var peg$c12 = "~";
      var peg$c13 = peg$literalExpectation("~", false);
      var peg$c14 = "not ";
      var peg$c15 = peg$literalExpectation("not ", false);
      var peg$c16 = "?";
      var peg$c17 = peg$literalExpectation("?", false);
      var peg$c18 = peg$otherExpectation("conjunction");
      var peg$c19 = "++";
      var peg$c20 = peg$literalExpectation("++", false);
      var peg$c21 = "+";
      var peg$c22 = peg$literalExpectation("+", false);
      var peg$c23 = "&&";
      var peg$c24 = peg$literalExpectation("&&", false);
      var peg$c25 = "&";
      var peg$c26 = peg$literalExpectation("&", false);
      var peg$c27 = peg$otherExpectation("disjunction");
      var peg$c28 = "||";
      var peg$c29 = peg$literalExpectation("||", false);
      var peg$c30 = "|";
      var peg$c31 = peg$literalExpectation("|", false);
      var peg$c32 = peg$otherExpectation("property name");
      var peg$c33 = /^[^~+&|()]/;
      var peg$c34 = peg$classExpectation(["~", "+", "&", "|", "(", ")"], true, false);
      var peg$c35 = function(prop) {
        return prop.join("").trim();
      };
      var peg$currPos = 0;
      var peg$savedPos = 0;
      var peg$posDetailsCache = [{ line: 1, column: 1 }];
      var peg$maxFailPos = 0;
      var peg$maxFailExpected = [];
      var peg$silentFails = 0;
      var peg$result;
      if (options.startRule !== void 0) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }
      function text() {
        return input.substring(peg$savedPos, peg$currPos);
      }
      function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }
      function expected(description, location1) {
        location1 = location1 !== void 0 ? location1 : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location1);
      }
      function error3(message, location1) {
        location1 = location1 !== void 0 ? location1 : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location1);
      }
      function peg$literalExpectation(text1, ignoreCase) {
        return { type: "literal", text: text1, ignoreCase };
      }
      function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts, inverted, ignoreCase };
      }
      function peg$anyExpectation() {
        return { type: "any" };
      }
      function peg$endExpectation() {
        return { type: "end" };
      }
      function peg$otherExpectation(description) {
        return { type: "other", description };
      }
      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos];
        var p;
        if (details) {
          return details;
        } else {
          p = pos - 1;
          while (!peg$posDetailsCache[p]) {
            p--;
          }
          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column
          };
          while (p < pos) {
            if (input.charCodeAt(p) === 10) {
              details.line++;
              details.column = 1;
            } else {
              details.column++;
            }
            p++;
          }
          peg$posDetailsCache[pos] = details;
          return details;
        }
      }
      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos);
        var endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          }
        };
      }
      function peg$fail(expected1) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }
        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected1);
      }
      function peg$buildSimpleError(message, location1) {
        return new SyntaxError(message, [], "", location1);
      }
      function peg$buildStructuredError(expected1, found, location1) {
        return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
      }
      function peg$parseFormula() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$parseAnd();
        if (s0 === peg$FAILED) {
          s0 = peg$parseOr();
          if (s0 === peg$FAILED) {
            s0 = peg$parseAtom();
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c0);
          }
        }
        return s0;
      }
      function peg$parse_() {
        var s0, s1;
        peg$silentFails++;
        s0 = [];
        if (peg$c2.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c3);
          }
        }
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c2.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c3);
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        return s0;
      }
      function peg$parseAnd() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c4;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseFormula();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseConjunction();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parse_();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseFormula();
                      if (s10 !== peg$FAILED) {
                        s7 = [s7, s8, s9, s10];
                        s6 = s7;
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$currPos;
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseConjunction();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parse_();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parseFormula();
                          if (s10 !== peg$FAILED) {
                            s7 = [s7, s8, s9, s10];
                            s6 = s7;
                          } else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s6;
                          s6 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  }
                } else {
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c6;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c8(s4, s5);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseOr() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c4;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseFormula();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseDisjunction();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parse_();
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parseFormula();
                      if (s10 !== peg$FAILED) {
                        s7 = [s7, s8, s9, s10];
                        s6 = s7;
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$currPos;
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseDisjunction();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parse_();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parseFormula();
                          if (s10 !== peg$FAILED) {
                            s7 = [s7, s8, s9, s10];
                            s6 = s7;
                          } else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s6;
                          s6 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  }
                } else {
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c6;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c7);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c9(s4, s5);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseAtom() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parseModifier();
        if (s1 === peg$FAILED) {
          s1 = null;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseProperty();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseModifier() {
        var s0, s1;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 126) {
          s0 = peg$c12;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c13);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c14) {
            s0 = peg$c14;
            peg$currPos += 4;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c15);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 63) {
              s0 = peg$c16;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c11);
          }
        }
        return s0;
      }
      function peg$parseConjunction() {
        var s0, s1;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c19) {
          s0 = peg$c19;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c20);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 43) {
            s0 = peg$c21;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c22);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c23) {
              s0 = peg$c23;
              peg$currPos += 2;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c24);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 38) {
                s0 = peg$c25;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c26);
                }
              }
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c18);
          }
        }
        return s0;
      }
      function peg$parseDisjunction() {
        var s0, s1;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c28) {
          s0 = peg$c28;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c29);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 124) {
            s0 = peg$c30;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c31);
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c27);
          }
        }
        return s0;
      }
      function peg$parseProperty() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c33.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c34);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c33.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c34);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c35(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c32);
          }
        }
        return s0;
      }
      peg$result = peg$startRuleFunction();
      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
      }
    }
    exports.parse = peg$parse;
  }
});

// node_modules/@pi-base/core/lib/Util.js
var require_Util = __commonJS({
  "node_modules/@pi-base/core/lib/Util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.union = void 0;
    function union() {
      var sets = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sets[_i] = arguments[_i];
      }
      return sets.reduce(function(acc, set) {
        set.forEach(function(p) {
          return acc.add(p);
        });
        return acc;
      }, /* @__PURE__ */ new Set());
    }
    exports.union = union;
  }
});

// node_modules/@pi-base/core/lib/Formula.js
var require_Formula = __commonJS({
  "node_modules/@pi-base/core/lib/Formula.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toJSON = exports.fromJSON = exports.parse = exports.evaluate = exports.compact = exports.mapProperty = exports.map = exports.negate = exports.render = exports.properties = exports.atom = exports.or = exports.and = void 0;
    var Grammar_1 = require_Grammar();
    var Util_1 = require_Util();
    function and() {
      var subs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        subs[_i] = arguments[_i];
      }
      return { kind: "and", subs };
    }
    exports.and = and;
    function or() {
      var subs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        subs[_i] = arguments[_i];
      }
      return { kind: "or", subs };
    }
    exports.or = or;
    function atom(p, v) {
      if (v === void 0) {
        v = true;
      }
      return { kind: "atom", property: p, value: v };
    }
    exports.atom = atom;
    function properties2(f) {
      switch (f.kind) {
        case "atom":
          return /* @__PURE__ */ new Set([f.property]);
        default:
          return Util_1.union.apply(void 0, f.subs.map(properties2));
      }
    }
    exports.properties = properties2;
    function render(f, term) {
      switch (f.kind) {
        case "atom":
          var name_1 = term(f.property);
          return f.value ? name_1 : "\xAC" + name_1;
        case "and":
          return "(" + f.subs.map(function(sf) {
            return render(sf, term);
          }).join(" \u2227 ") + ")";
        case "or":
          return "(" + f.subs.map(function(sf) {
            return render(sf, term);
          }).join(" \u2228 ") + ")";
      }
    }
    exports.render = render;
    function negate(formula) {
      switch (formula.kind) {
        case "atom":
          return atom(formula.property, !formula.value);
        case "and":
          return or.apply(void 0, formula.subs.map(negate));
        case "or":
          return and.apply(void 0, formula.subs.map(negate));
      }
    }
    exports.negate = negate;
    function map(func, formula) {
      switch (formula.kind) {
        case "atom":
          return func(formula);
        default:
          return __assign(__assign({}, formula), { subs: formula.subs.map(function(sub) {
            return map(func, sub);
          }) });
      }
    }
    exports.map = map;
    function mapProperty(func, formula) {
      function mapAtom(a) {
        return __assign(__assign({}, a), { property: func(a.property) });
      }
      return map(mapAtom, formula);
    }
    exports.mapProperty = mapProperty;
    function compact(f) {
      return properties2(f).has(void 0) ? void 0 : f;
    }
    exports.compact = compact;
    function evaluate(f, traits) {
      var result;
      switch (f.kind) {
        case "atom":
          if (traits.has(f.property)) {
            return traits.get(f.property) === f.value;
          }
          return void 0;
        case "and":
          result = true;
          f.subs.forEach(function(sub) {
            if (result === false) {
              return;
            }
            var sv = evaluate(sub, traits);
            if (sv === false) {
              result = false;
            } else if (result && sv === void 0) {
              result = void 0;
            }
          });
          return result;
        case "or":
          result = false;
          f.subs.forEach(function(sub) {
            if (result === true) {
              return;
            }
            var sv = evaluate(sub, traits);
            if (sv === true) {
              result = true;
            } else if (result === false && sv === void 0) {
              result = void 0;
            }
          });
          return result;
      }
    }
    exports.evaluate = evaluate;
    function parse(q) {
      if (!q) {
        return;
      }
      var parsed;
      try {
        parsed = Grammar_1.parse(q);
      } catch (_a) {
        if (q && q.startsWith("(")) {
          return;
        } else {
          return parse("(" + q + ")");
        }
      }
      return fromJSON2(parsed);
    }
    exports.parse = parse;
    function fromJSON2(json) {
      if (json.and) {
        return and.apply(void 0, json.and.map(fromJSON2));
      } else if (json.or) {
        return or.apply(void 0, json.or.map(fromJSON2));
      } else if (json.property) {
        return atom(json.property, json.value);
      } else {
        var property2 = Object.keys(json)[0];
        return atom(property2, json[property2]);
      }
    }
    exports.fromJSON = fromJSON2;
    function toJSON(f) {
      var _a;
      switch (f.kind) {
        case "atom":
          return _a = {}, _a[f.property] = f.value, _a;
        case "and":
          return { and: f.subs.map(toJSON) };
        case "or":
          return { or: f.subs.map(toJSON) };
      }
    }
    exports.toJSON = toJSON;
  }
});

// node_modules/@pi-base/core/lib/Logic/ImplicationIndex.js
var require_ImplicationIndex = __commonJS({
  "node_modules/@pi-base/core/lib/Logic/ImplicationIndex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Formula_1 = require_Formula();
    var Util_1 = require_Util();
    var ImplicationIndex = (
      /** @class */
      function() {
        function ImplicationIndex2(implications) {
          var _this = this;
          this.all = implications;
          this.byProperty = /* @__PURE__ */ new Map();
          implications.forEach(function(i) {
            ImplicationIndex2.properties(i).forEach(function(id) {
              if (!_this.byProperty.has(id)) {
                _this.byProperty.set(id, /* @__PURE__ */ new Set());
              }
              _this.byProperty.get(id).add(i);
            });
          });
        }
        ImplicationIndex2.properties = function(implication) {
          return Util_1.union(Formula_1.properties(implication.when), Formula_1.properties(implication.then));
        };
        ImplicationIndex2.prototype.withProperty = function(id) {
          return this.byProperty.get(id) || /* @__PURE__ */ new Set();
        };
        return ImplicationIndex2;
      }()
    );
    exports.default = ImplicationIndex;
  }
});

// node_modules/@pi-base/core/lib/Logic/Queue.js
var require_Queue = __commonJS({
  "node_modules/@pi-base/core/lib/Logic/Queue.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Queue = (
      /** @class */
      function() {
        function Queue2(index) {
          this.index = index;
          this.queue = new Set(index.all);
        }
        Queue2.prototype.mark = function(property2) {
          var _this = this;
          this.index.withProperty(property2).forEach(function(i) {
            return _this.queue.add(i);
          });
        };
        Queue2.prototype.shift = function() {
          var item = this.queue.values().next().value;
          if (item) {
            this.queue.delete(item);
          }
          return item;
        };
        return Queue2;
      }()
    );
    exports.default = Queue;
  }
});

// node_modules/@pi-base/core/lib/Logic/Prover.js
var require_Prover = __commonJS({
  "node_modules/@pi-base/core/lib/Logic/Prover.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.prove = exports.disprove = void 0;
    var F = __importStar(require_Formula());
    var Util_1 = require_Util();
    var ImplicationIndex_1 = __importDefault(require_ImplicationIndex());
    var Queue_1 = __importDefault(require_Queue());
    var Prover = (
      /** @class */
      function() {
        function Prover2(implications, traits) {
          var _this = this;
          if (traits === void 0) {
            traits = /* @__PURE__ */ new Map();
          }
          this.traits = traits;
          this.proofs = /* @__PURE__ */ new Map();
          this.queue = new Queue_1.default(implications);
          traits.forEach(function(_, id) {
            _this.proofs.set(id, "given");
            _this.queue.mark(id);
          });
        }
        Prover2.build = function(implications, traits) {
          return new Prover2(new ImplicationIndex_1.default(implications), new Map(traits));
        };
        Prover2.prototype.apply = function(implication) {
          var a = implication.when;
          var c = implication.then;
          var av = F.evaluate(a, this.traits);
          var cv = F.evaluate(c, this.traits);
          if (av === true && cv === false) {
            return this.contradiction(implication.uid, Util_1.union(F.properties(a), F.properties(c)));
          } else if (av === true) {
            return this.force(implication.uid, c, F.properties(a));
          } else if (cv === false) {
            return this.force(implication.uid, F.negate(a), F.properties(c));
          }
        };
        Prover2.prototype.run = function() {
          var theorem2;
          while (theorem2 = this.queue.shift()) {
            var contradiction = this.apply(theorem2);
            if (contradiction) {
              return contradiction;
            }
          }
        };
        Prover2.prototype.derivations = function() {
          var _this = this;
          var contradiction = this.run();
          if (contradiction) {
            return { contradiction };
          }
          var proofs = [];
          this.traits.forEach(function(value, property2) {
            var proof = _this.proof(property2);
            if (!proof || proof === "given") {
              return;
            }
            proofs.push({ property: property2, value, proof });
          });
          return { proofs };
        };
        Prover2.prototype.proof = function(property2) {
          var proof = this.proofs.get(property2);
          switch (proof) {
            case "given":
              return "given";
            case void 0:
              return void 0;
            default:
              return this.expand(proof.theorem, proof.properties);
          }
        };
        Prover2.prototype.contradiction = function(theorem2, properties2) {
          return this.expand(theorem2, Array.from(properties2));
        };
        Prover2.prototype.expand = function(theorem2, properties2) {
          var theoremByProperty = /* @__PURE__ */ new Map();
          var assumptions = /* @__PURE__ */ new Set();
          var queue = Array.from(properties2);
          var expanded = /* @__PURE__ */ new Set();
          var property2;
          while (property2 = queue.shift()) {
            if (expanded.has(property2)) {
              continue;
            }
            var proof = this.proofs.get(property2);
            if (proof === "given" || proof && proof.theorem === "given") {
              expanded.add(property2);
              assumptions.add(property2);
            } else if (proof) {
              theoremByProperty.set(property2, proof.theorem);
              expanded.add(property2);
              queue = queue.concat(proof.properties);
            }
          }
          return {
            theorems: Array.from(theoremByProperty.values()).concat(theorem2),
            properties: Array.from(assumptions)
          };
        };
        Prover2.prototype.force = function(theorem2, formula, support) {
          switch (formula.kind) {
            case "and":
              return this.forceAnd(theorem2, formula, support);
            case "atom":
              return this.forceAtom(theorem2, formula, support);
            case "or":
              return this.forceOr(theorem2, formula, support);
          }
        };
        Prover2.prototype.forceAtom = function(theorem2, formula, support) {
          var property2 = formula.property;
          if (this.traits.has(property2)) {
            if (this.traits.get(property2) !== formula.value) {
              return this.contradiction(theorem2, new Set(property2));
            } else {
              return;
            }
          }
          this.traits.set(property2, formula.value);
          this.proofs.set(property2, {
            theorem: theorem2,
            properties: Array.from(support)
          });
          this.queue.mark(property2);
        };
        Prover2.prototype.forceAnd = function(theorem2, formula, support) {
          for (var _i = 0, _a = formula.subs; _i < _a.length; _i++) {
            var sub = _a[_i];
            var contradiction = this.force(theorem2, sub, support);
            if (contradiction) {
              return contradiction;
            }
          }
        };
        Prover2.prototype.forceOr = function(theorem2, formula, support) {
          var _this = this;
          var result = formula.subs.reduce(function(acc, sf) {
            if (!acc) {
              return void 0;
            }
            var value = F.evaluate(sf, _this.traits);
            if (value === true) {
              return void 0;
            } else if (value === false) {
              acc.falses.push(sf);
            } else if (acc.unknown) {
              return void 0;
            } else {
              acc.unknown = sf;
            }
            return acc;
          }, { falses: Array(), unknown: void 0 });
          if (!result)
            return;
          var falseProps = Util_1.union.apply(void 0, result.falses.map(F.properties));
          if (result.falses.length === formula.subs.length) {
            return this.contradiction(theorem2, falseProps);
          } else if (result.unknown) {
            return this.force(theorem2, result.unknown, Util_1.union(support, falseProps));
          }
        };
        return Prover2;
      }()
    );
    exports.default = Prover;
    function disprove(implications, formula) {
      var proof;
      var prover = new Prover(implications);
      proof = prover.force("given", formula, /* @__PURE__ */ new Set());
      if (proof) {
        return formatProof(proof);
      }
      proof = prover.run();
      if (proof) {
        return formatProof(proof);
      }
    }
    exports.disprove = disprove;
    function prove(theorems, when, then) {
      return disprove(new ImplicationIndex_1.default(theorems), F.and(when, F.negate(then)));
    }
    exports.prove = prove;
    var formatProof = function(proof) {
      var filtered = proof.theorems.filter(function(id) {
        return id !== "given";
      });
      return filtered.length > 0 ? filtered : "tautology";
    };
  }
});

// node_modules/@pi-base/core/lib/Logic/index.js
var require_Logic = __commonJS({
  "node_modules/@pi-base/core/lib/Logic/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ImplicationIndex_1 = require_ImplicationIndex();
    Object.defineProperty(exports, "ImplicationIndex", { enumerable: true, get: function() {
      return ImplicationIndex_1.default;
    } });
    var Prover_1 = require_Prover();
    Object.defineProperty(exports, "Prover", { enumerable: true, get: function() {
      return Prover_1.default;
    } });
  }
});

// node_modules/@pi-base/core/lib/Bundle.js
var require_Bundle = __commonJS({
  "node_modules/@pi-base/core/lib/Bundle.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __spreadArrays = exports && exports.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.check = exports.fetch = exports.bundleUrl = exports.deserialize = exports.serialize = exports.defaultHost = void 0;
    var Id_1 = require_Id();
    var Logic_1 = require_Logic();
    exports.defaultHost = "https://pi-base-bundles.s3.us-east-2.amazonaws.com";
    function serialize2(bundle2) {
      return {
        properties: Array.from(bundle2.properties.values()),
        spaces: Array.from(bundle2.spaces.values()),
        theorems: Array.from(bundle2.theorems.values()),
        traits: Array.from(bundle2.traits.values()),
        version: bundle2.version
      };
    }
    exports.serialize = serialize2;
    function deserialize2(serialized) {
      return {
        properties: indexBy(serialized.properties, function(p) {
          return p.uid;
        }),
        spaces: indexBy(serialized.spaces, function(s) {
          return s.uid;
        }),
        theorems: indexBy(serialized.theorems, function(t) {
          return t.uid;
        }),
        traits: indexBy(serialized.traits, Id_1.traitId),
        version: serialized.version
      };
    }
    exports.deserialize = deserialize2;
    function bundleUrl(_a) {
      var branch = _a.branch, _b = _a.host, host = _b === void 0 ? exports.defaultHost : _b;
      return host + "/refs/heads/" + branch + ".json";
    }
    exports.bundleUrl = bundleUrl;
    function fetch(opts) {
      return __awaiter(this, void 0, void 0, function() {
        var headers, response, json, deserialized;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              headers = new Headers();
              if (opts.etag) {
                headers.append("If-None-Match", opts.etag);
              }
              return [4, window.fetch(bundleUrl(opts), { method: "GET", headers })];
            case 1:
              response = _a.sent();
              if (response.status === 304) {
                return [
                  2
                  /*return*/
                ];
              }
              return [4, response.json()];
            case 2:
              json = _a.sent();
              deserialized = deserialize2(json);
              if (JSON.stringify(serialize2(deserialized)) != JSON.stringify(json)) {
                throw new Error("Data serialization failure");
              }
              return [2, {
                bundle: deserialized,
                etag: response.headers.get("etag") || ""
              }];
          }
        });
      });
    }
    exports.fetch = fetch;
    function indexBy(collection, key) {
      return new Map(collection.map(function(value) {
        return [key(value), value];
      }));
    }
    function check2(bundle2, space2, implications) {
      if (!implications) {
        implications = new Logic_1.ImplicationIndex(Array.from(bundle2.theorems.values()));
      }
      var traitMap = /* @__PURE__ */ new Map();
      bundle2.properties.forEach(function(_, property2) {
        var trait2 = bundle2.traits.get(Id_1.traitId({ space: space2.uid, property: property2 }));
        if (!trait2) {
          return;
        }
        traitMap.set(property2, trait2.value);
      });
      var prover = new Logic_1.Prover(implications, traitMap);
      var contradiction = prover.run();
      if (contradiction) {
        return { kind: "contradiction", contradiction };
      }
      var _a = prover.derivations().proofs, proofs = _a === void 0 ? [] : _a;
      var newTraits = /* @__PURE__ */ new Map();
      proofs.forEach(function(_a2) {
        var property2 = _a2.property, value = _a2.value, proof = _a2.proof;
        var uid = Id_1.traitId({ space: space2.uid, property: property2 });
        var trait2 = {
          uid,
          counterexamples_id: void 0,
          space: space2.uid,
          property: property2,
          value,
          proof,
          description: "",
          refs: []
        };
        newTraits.set(uid, trait2);
      });
      return {
        kind: "bundle",
        bundle: __assign(__assign({}, bundle2), { traits: new Map(__spreadArrays(Array.from(bundle2.traits.entries()), Array.from(newTraits.entries()))) })
      };
    }
    exports.check = check2;
  }
});

// node_modules/fs.realpath/old.js
var require_old = __commonJS({
  "node_modules/fs.realpath/old.js"(exports) {
    var pathModule = require("path");
    var isWindows = process.platform === "win32";
    var fs3 = require("fs");
    var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
    function rethrow() {
      var callback;
      if (DEBUG) {
        var backtrace = new Error();
        callback = debugCallback;
      } else
        callback = missingCallback;
      return callback;
      function debugCallback(err) {
        if (err) {
          backtrace.message = err.message;
          err = backtrace;
          missingCallback(err);
        }
      }
      function missingCallback(err) {
        if (err) {
          if (process.throwDeprecation)
            throw err;
          else if (!process.noDeprecation) {
            var msg = "fs: missing callback " + (err.stack || err.message);
            if (process.traceDeprecation)
              console.trace(msg);
            else
              console.error(msg);
          }
        }
      }
    }
    function maybeCallback(cb) {
      return typeof cb === "function" ? cb : rethrow();
    }
    var normalize = pathModule.normalize;
    if (isWindows) {
      nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
    } else {
      nextPartRe = /(.*?)(?:[\/]+|$)/g;
    }
    var nextPartRe;
    if (isWindows) {
      splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
    } else {
      splitRootRe = /^[\/]*/;
    }
    var splitRootRe;
    exports.realpathSync = function realpathSync(p, cache) {
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return cache[p];
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs3.lstatSync(base);
          knownHard[base] = true;
        }
      }
      while (pos < p.length) {
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          continue;
        }
        var resolvedLink;
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          resolvedLink = cache[base];
        } else {
          var stat = fs3.lstatSync(base);
          if (!stat.isSymbolicLink()) {
            knownHard[base] = true;
            if (cache)
              cache[base] = base;
            continue;
          }
          var linkTarget = null;
          if (!isWindows) {
            var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
            if (seenLinks.hasOwnProperty(id)) {
              linkTarget = seenLinks[id];
            }
          }
          if (linkTarget === null) {
            fs3.statSync(base);
            linkTarget = fs3.readlinkSync(base);
          }
          resolvedLink = pathModule.resolve(previous, linkTarget);
          if (cache)
            cache[base] = resolvedLink;
          if (!isWindows)
            seenLinks[id] = linkTarget;
        }
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
      if (cache)
        cache[original] = p;
      return p;
    };
    exports.realpath = function realpath(p, cache, cb) {
      if (typeof cb !== "function") {
        cb = maybeCallback(cache);
        cache = null;
      }
      p = pathModule.resolve(p);
      if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
        return process.nextTick(cb.bind(null, null, cache[p]));
      }
      var original = p, seenLinks = {}, knownHard = {};
      var pos;
      var current;
      var base;
      var previous;
      start();
      function start() {
        var m = splitRootRe.exec(p);
        pos = m[0].length;
        current = m[0];
        base = m[0];
        previous = "";
        if (isWindows && !knownHard[base]) {
          fs3.lstat(base, function(err) {
            if (err)
              return cb(err);
            knownHard[base] = true;
            LOOP();
          });
        } else {
          process.nextTick(LOOP);
        }
      }
      function LOOP() {
        if (pos >= p.length) {
          if (cache)
            cache[original] = p;
          return cb(null, p);
        }
        nextPartRe.lastIndex = pos;
        var result = nextPartRe.exec(p);
        previous = current;
        current += result[0];
        base = previous + result[1];
        pos = nextPartRe.lastIndex;
        if (knownHard[base] || cache && cache[base] === base) {
          return process.nextTick(LOOP);
        }
        if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
          return gotResolvedLink(cache[base]);
        }
        return fs3.lstat(base, gotStat);
      }
      function gotStat(err, stat) {
        if (err)
          return cb(err);
        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache)
            cache[base] = base;
          return process.nextTick(LOOP);
        }
        if (!isWindows) {
          var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            return gotTarget(null, seenLinks[id], base);
          }
        }
        fs3.stat(base, function(err2) {
          if (err2)
            return cb(err2);
          fs3.readlink(base, function(err3, target) {
            if (!isWindows)
              seenLinks[id] = target;
            gotTarget(err3, target);
          });
        });
      }
      function gotTarget(err, target, base2) {
        if (err)
          return cb(err);
        var resolvedLink = pathModule.resolve(previous, target);
        if (cache)
          cache[base2] = resolvedLink;
        gotResolvedLink(resolvedLink);
      }
      function gotResolvedLink(resolvedLink) {
        p = pathModule.resolve(resolvedLink, p.slice(pos));
        start();
      }
    };
  }
});

// node_modules/fs.realpath/index.js
var require_fs = __commonJS({
  "node_modules/fs.realpath/index.js"(exports, module2) {
    module2.exports = realpath;
    realpath.realpath = realpath;
    realpath.sync = realpathSync;
    realpath.realpathSync = realpathSync;
    realpath.monkeypatch = monkeypatch;
    realpath.unmonkeypatch = unmonkeypatch;
    var fs3 = require("fs");
    var origRealpath = fs3.realpath;
    var origRealpathSync = fs3.realpathSync;
    var version = process.version;
    var ok = /^v[0-5]\./.test(version);
    var old = require_old();
    function newError(er) {
      return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
    }
    function realpath(p, cache, cb) {
      if (ok) {
        return origRealpath(p, cache, cb);
      }
      if (typeof cache === "function") {
        cb = cache;
        cache = null;
      }
      origRealpath(p, cache, function(er, result) {
        if (newError(er)) {
          old.realpath(p, cache, cb);
        } else {
          cb(er, result);
        }
      });
    }
    function realpathSync(p, cache) {
      if (ok) {
        return origRealpathSync(p, cache);
      }
      try {
        return origRealpathSync(p, cache);
      } catch (er) {
        if (newError(er)) {
          return old.realpathSync(p, cache);
        } else {
          throw er;
        }
      }
    }
    function monkeypatch() {
      fs3.realpath = realpath;
      fs3.realpathSync = realpathSync;
    }
    function unmonkeypatch() {
      fs3.realpath = origRealpath;
      fs3.realpathSync = origRealpathSync;
    }
  }
});

// node_modules/concat-map/index.js
var require_concat_map = __commonJS({
  "node_modules/concat-map/index.js"(exports, module2) {
    module2.exports = function(xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x))
          res.push.apply(res, x);
        else
          res.push(x);
      }
      return res;
    };
    var isArray = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
  }
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS({
  "node_modules/balanced-match/index.js"(exports, module2) {
    "use strict";
    module2.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp)
        a = maybeMatch(a, str);
      if (b instanceof RegExp)
        b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  }
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS({
  "node_modules/brace-expansion/index.js"(exports, module2) {
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts.push.apply(parts, p);
      return parts;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre))
        return [str];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,.*\}/)) {
          str = m.pre + "{" + m.body + escClose + m.post;
          return expand(str);
        }
        return [str];
      }
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          n = expand(n[0], false).map(embrace);
          if (n.length === 1) {
            var post = m.post.length ? expand(m.post, false) : [""];
            return post.map(function(p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
      var pre = m.pre;
      var post = m.post.length ? expand(m.post, false) : [""];
      var N;
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length);
        var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence) {
            c = String.fromCharCode(i);
            if (c === "\\")
              c = "";
          } else {
            c = String(i);
            if (pad) {
              var need = width - c.length;
              if (need > 0) {
                var z = new Array(need + 1).join("0");
                if (i < 0)
                  c = "-" + z + c.slice(1);
                else
                  c = z + c;
              }
            }
          }
          N.push(c);
        }
      } else {
        N = concatMap(n, function(el) {
          return expand(el, false);
        });
      }
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion)
            expansions.push(expansion);
        }
      }
      return expansions;
    }
  }
});

// node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS({
  "node_modules/minimatch/minimatch.js"(exports, module2) {
    module2.exports = minimatch;
    minimatch.Minimatch = Minimatch;
    var path = { sep: "/" };
    try {
      path = require("path");
    } catch (er) {
    }
    var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
    var expand = require_brace_expansion();
    var plTypes = {
      "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
      "?": { open: "(?:", close: ")?" },
      "+": { open: "(?:", close: ")+" },
      "*": { open: "(?:", close: ")*" },
      "@": { open: "(?:", close: ")" }
    };
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var reSpecials = charSet("().*{}+?[]^$\\!");
    function charSet(s) {
      return s.split("").reduce(function(set, c) {
        set[c] = true;
        return set;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch.filter = filter;
    function filter(pattern, options) {
      options = options || {};
      return function(p, i, list) {
        return minimatch(p, pattern, options);
      };
    }
    function ext(a, b) {
      a = a || {};
      b = b || {};
      var t = {};
      Object.keys(b).forEach(function(k) {
        t[k] = b[k];
      });
      Object.keys(a).forEach(function(k) {
        t[k] = a[k];
      });
      return t;
    }
    minimatch.defaults = function(def) {
      if (!def || !Object.keys(def).length)
        return minimatch;
      var orig = minimatch;
      var m = function minimatch2(p, pattern, options) {
        return orig.minimatch(p, pattern, ext(def, options));
      };
      m.Minimatch = function Minimatch2(pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options));
      };
      return m;
    };
    Minimatch.defaults = function(def) {
      if (!def || !Object.keys(def).length)
        return Minimatch;
      return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("glob pattern string required");
      }
      if (!options)
        options = {};
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      if (pattern.trim() === "")
        return p === "";
      return new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
      if (!(this instanceof Minimatch)) {
        return new Minimatch(pattern, options);
      }
      if (typeof pattern !== "string") {
        throw new TypeError("glob pattern string required");
      }
      if (!options)
        options = {};
      pattern = pattern.trim();
      if (path.sep !== "/") {
        pattern = pattern.split(path.sep).join("/");
      }
      this.options = options;
      this.set = [];
      this.pattern = pattern;
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.make();
    }
    Minimatch.prototype.debug = function() {
    };
    Minimatch.prototype.make = make;
    function make() {
      if (this._made)
        return;
      var pattern = this.pattern;
      var options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      var set = this.globSet = this.braceExpand();
      if (options.debug)
        this.debug = console.error;
      this.debug(this.pattern, set);
      set = this.globParts = set.map(function(s) {
        return s.split(slashSplit);
      });
      this.debug(this.pattern, set);
      set = set.map(function(s, si, set2) {
        return s.map(this.parse, this);
      }, this);
      this.debug(this.pattern, set);
      set = set.filter(function(s) {
        return s.indexOf(false) === -1;
      });
      this.debug(this.pattern, set);
      this.set = set;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern;
      var negate = false;
      var options = this.options;
      var negateOffset = 0;
      if (options.nonegate)
        return;
      for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset)
        this.pattern = pattern.substr(negateOffset);
      this.negate = negate;
    }
    minimatch.braceExpand = function(pattern, options) {
      return braceExpand(pattern, options);
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
      if (!options) {
        if (this instanceof Minimatch) {
          options = this.options;
        } else {
          options = {};
        }
      }
      pattern = typeof pattern === "undefined" ? this.pattern : pattern;
      if (typeof pattern === "undefined") {
        throw new TypeError("undefined pattern");
      }
      if (options.nobrace || !pattern.match(/\{.*\}/)) {
        return [pattern];
      }
      return expand(pattern);
    }
    Minimatch.prototype.parse = parse;
    var SUBPARSE = {};
    function parse(pattern, isSub) {
      if (pattern.length > 1024 * 64) {
        throw new TypeError("pattern is too long");
      }
      var options = this.options;
      if (!options.noglobstar && pattern === "**")
        return GLOBSTAR;
      if (pattern === "")
        return "";
      var re = "";
      var hasMagic = !!options.nocase;
      var escaping = false;
      var patternListStack = [];
      var negativeLists = [];
      var stateChar;
      var inClass = false;
      var reClassStart = -1;
      var classStart = -1;
      var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      var self = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star;
              hasMagic = true;
              break;
            case "?":
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          self.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      }
      for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
        this.debug("%s	%s %s %j", pattern, i, re, c);
        if (escaping && reSpecials[c]) {
          re += "\\" + c;
          escaping = false;
          continue;
        }
        switch (c) {
          case "/":
            return false;
          case "\\":
            clearStateChar();
            escaping = true;
            continue;
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
            if (inClass) {
              this.debug("  in class");
              if (c === "!" && i === classStart + 1)
                c = "^";
              re += c;
              continue;
            }
            self.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c;
            if (options.noext)
              clearStateChar();
            continue;
          case "(":
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            });
            re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue;
            }
            clearStateChar();
            hasMagic = true;
            var pl = patternListStack.pop();
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(pl);
            }
            pl.reEnd = re.length;
            continue;
          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|";
              escaping = false;
              continue;
            }
            clearStateChar();
            re += "|";
            continue;
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c;
              escaping = false;
              continue;
            }
            if (inClass) {
              var cs = pattern.substring(classStart + 1, i);
              try {
                RegExp("[" + cs + "]");
              } catch (er) {
                var sp = this.parse(cs, SUBPARSE);
                re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
                hasMagic = hasMagic || sp[1];
                inClass = false;
                continue;
              }
            }
            hasMagic = true;
            inClass = false;
            re += c;
            continue;
          default:
            clearStateChar();
            if (escaping) {
              escaping = false;
            } else if (reSpecials[c] && !(c === "^" && inClass)) {
              re += "\\";
            }
            re += c;
        }
      }
      if (inClass) {
        cs = pattern.substr(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substr(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug("tail=%j\n   %s", tail, tail, pl, re);
        var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      var addPatternStart = false;
      switch (re.charAt(0)) {
        case ".":
        case "[":
        case "(":
          addPatternStart = true;
      }
      for (var n = negativeLists.length - 1; n > -1; n--) {
        var nl = negativeLists[n];
        var nlBefore = re.slice(0, nl.reStart);
        var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
        var nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split("(").length - 1;
        var cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        var dollar = "";
        if (nlAfter === "" && isSub !== SUBPARSE) {
          dollar = "$";
        }
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart) {
        re = patternStart + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      var flags = options.nocase ? "i" : "";
      try {
        var regExp = new RegExp("^" + re + "$", flags);
      } catch (er) {
        return new RegExp("$.");
      }
      regExp._glob = pattern;
      regExp._src = re;
      return regExp;
    }
    minimatch.makeRe = function(pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
      if (this.regexp || this.regexp === false)
        return this.regexp;
      var set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      var options = this.options;
      var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      var flags = options.nocase ? "i" : "";
      var re = set.map(function(pattern) {
        return pattern.map(function(p) {
          return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
        }).join("\\/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate)
        re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    minimatch.match = function(list, pattern, options) {
      options = options || {};
      var mm = new Minimatch(pattern, options);
      list = list.filter(function(f) {
        return mm.match(f);
      });
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    Minimatch.prototype.match = match;
    function match(f, partial) {
      this.debug("match", f, this.pattern);
      if (this.comment)
        return false;
      if (this.empty)
        return f === "";
      if (f === "/" && partial)
        return true;
      var options = this.options;
      if (path.sep !== "/") {
        f = f.split(path.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      var set = this.set;
      this.debug(this.pattern, "set", set);
      var filename;
      var i;
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename)
          break;
      }
      for (i = 0; i < set.length; i++) {
        var pattern = set[i];
        var file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        var hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate)
            return true;
          return !this.negate;
        }
      }
      if (options.flipNegate)
        return false;
      return this.negate;
    }
    Minimatch.prototype.matchOne = function(file, pattern, partial) {
      var options = this.options;
      this.debug(
        "matchOne",
        { "this": this, file, pattern }
      );
      this.debug("matchOne", file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false)
          return false;
        if (p === GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (; fi < fl; fi++) {
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file, fr, pattern, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
            if (fr === fl)
              return true;
          }
          return false;
        }
        var hit;
        if (typeof p === "string") {
          if (options.nocase) {
            hit = f.toLowerCase() === p.toLowerCase();
          } else {
            hit = f === p;
          }
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit)
          return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        var emptyFileEnd = fi === fl - 1 && file[fi] === "";
        return emptyFileEnd;
      }
      throw new Error("wtf?");
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, "$1");
    }
    function regExpEscape(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/inherits/inherits.js"(exports, module2) {
    try {
      util2 = require("util");
      if (typeof util2.inherits !== "function")
        throw "";
      module2.exports = util2.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util2;
  }
});

// node_modules/path-is-absolute/index.js
var require_path_is_absolute = __commonJS({
  "node_modules/path-is-absolute/index.js"(exports, module2) {
    "use strict";
    function posix(path) {
      return path.charAt(0) === "/";
    }
    function win32(path) {
      var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
      var result = splitDeviceRe.exec(path);
      var device = result[1] || "";
      var isUnc = Boolean(device && device.charAt(1) !== ":");
      return Boolean(result[2] || isUnc);
    }
    module2.exports = process.platform === "win32" ? win32 : posix;
    module2.exports.posix = posix;
    module2.exports.win32 = win32;
  }
});

// node_modules/glob/common.js
var require_common = __commonJS({
  "node_modules/glob/common.js"(exports) {
    exports.alphasort = alphasort;
    exports.alphasorti = alphasorti;
    exports.setopts = setopts;
    exports.ownProp = ownProp;
    exports.makeAbs = makeAbs;
    exports.finish = finish;
    exports.mark = mark;
    exports.isIgnored = isIgnored;
    exports.childrenIgnored = childrenIgnored;
    function ownProp(obj, field) {
      return Object.prototype.hasOwnProperty.call(obj, field);
    }
    var path = require("path");
    var minimatch = require_minimatch();
    var isAbsolute = require_path_is_absolute();
    var Minimatch = minimatch.Minimatch;
    function alphasorti(a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }
    function alphasort(a, b) {
      return a.localeCompare(b);
    }
    function setupIgnores(self, options) {
      self.ignore = options.ignore || [];
      if (!Array.isArray(self.ignore))
        self.ignore = [self.ignore];
      if (self.ignore.length) {
        self.ignore = self.ignore.map(ignoreMap);
      }
    }
    function ignoreMap(pattern) {
      var gmatcher = null;
      if (pattern.slice(-3) === "/**") {
        var gpattern = pattern.replace(/(\/\*\*)+$/, "");
        gmatcher = new Minimatch(gpattern, { dot: true });
      }
      return {
        matcher: new Minimatch(pattern, { dot: true }),
        gmatcher
      };
    }
    function setopts(self, pattern, options) {
      if (!options)
        options = {};
      if (options.matchBase && -1 === pattern.indexOf("/")) {
        if (options.noglobstar) {
          throw new Error("base matching requires globstar");
        }
        pattern = "**/" + pattern;
      }
      self.silent = !!options.silent;
      self.pattern = pattern;
      self.strict = options.strict !== false;
      self.realpath = !!options.realpath;
      self.realpathCache = options.realpathCache || /* @__PURE__ */ Object.create(null);
      self.follow = !!options.follow;
      self.dot = !!options.dot;
      self.mark = !!options.mark;
      self.nodir = !!options.nodir;
      if (self.nodir)
        self.mark = true;
      self.sync = !!options.sync;
      self.nounique = !!options.nounique;
      self.nonull = !!options.nonull;
      self.nosort = !!options.nosort;
      self.nocase = !!options.nocase;
      self.stat = !!options.stat;
      self.noprocess = !!options.noprocess;
      self.absolute = !!options.absolute;
      self.maxLength = options.maxLength || Infinity;
      self.cache = options.cache || /* @__PURE__ */ Object.create(null);
      self.statCache = options.statCache || /* @__PURE__ */ Object.create(null);
      self.symlinks = options.symlinks || /* @__PURE__ */ Object.create(null);
      setupIgnores(self, options);
      self.changedCwd = false;
      var cwd = process.cwd();
      if (!ownProp(options, "cwd"))
        self.cwd = cwd;
      else {
        self.cwd = path.resolve(options.cwd);
        self.changedCwd = self.cwd !== cwd;
      }
      self.root = options.root || path.resolve(self.cwd, "/");
      self.root = path.resolve(self.root);
      if (process.platform === "win32")
        self.root = self.root.replace(/\\/g, "/");
      self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
      if (process.platform === "win32")
        self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
      self.nomount = !!options.nomount;
      options.nonegate = true;
      options.nocomment = true;
      self.minimatch = new Minimatch(pattern, options);
      self.options = self.minimatch.options;
    }
    function finish(self) {
      var nou = self.nounique;
      var all2 = nou ? [] : /* @__PURE__ */ Object.create(null);
      for (var i = 0, l = self.matches.length; i < l; i++) {
        var matches = self.matches[i];
        if (!matches || Object.keys(matches).length === 0) {
          if (self.nonull) {
            var literal = self.minimatch.globSet[i];
            if (nou)
              all2.push(literal);
            else
              all2[literal] = true;
          }
        } else {
          var m = Object.keys(matches);
          if (nou)
            all2.push.apply(all2, m);
          else
            m.forEach(function(m2) {
              all2[m2] = true;
            });
        }
      }
      if (!nou)
        all2 = Object.keys(all2);
      if (!self.nosort)
        all2 = all2.sort(self.nocase ? alphasorti : alphasort);
      if (self.mark) {
        for (var i = 0; i < all2.length; i++) {
          all2[i] = self._mark(all2[i]);
        }
        if (self.nodir) {
          all2 = all2.filter(function(e) {
            var notDir = !/\/$/.test(e);
            var c = self.cache[e] || self.cache[makeAbs(self, e)];
            if (notDir && c)
              notDir = c !== "DIR" && !Array.isArray(c);
            return notDir;
          });
        }
      }
      if (self.ignore.length)
        all2 = all2.filter(function(m2) {
          return !isIgnored(self, m2);
        });
      self.found = all2;
    }
    function mark(self, p) {
      var abs = makeAbs(self, p);
      var c = self.cache[abs];
      var m = p;
      if (c) {
        var isDir = c === "DIR" || Array.isArray(c);
        var slash = p.slice(-1) === "/";
        if (isDir && !slash)
          m += "/";
        else if (!isDir && slash)
          m = m.slice(0, -1);
        if (m !== p) {
          var mabs = makeAbs(self, m);
          self.statCache[mabs] = self.statCache[abs];
          self.cache[mabs] = self.cache[abs];
        }
      }
      return m;
    }
    function makeAbs(self, f) {
      var abs = f;
      if (f.charAt(0) === "/") {
        abs = path.join(self.root, f);
      } else if (isAbsolute(f) || f === "") {
        abs = f;
      } else if (self.changedCwd) {
        abs = path.resolve(self.cwd, f);
      } else {
        abs = path.resolve(f);
      }
      if (process.platform === "win32")
        abs = abs.replace(/\\/g, "/");
      return abs;
    }
    function isIgnored(self, path2) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return item.matcher.match(path2) || !!(item.gmatcher && item.gmatcher.match(path2));
      });
    }
    function childrenIgnored(self, path2) {
      if (!self.ignore.length)
        return false;
      return self.ignore.some(function(item) {
        return !!(item.gmatcher && item.gmatcher.match(path2));
      });
    }
  }
});

// node_modules/glob/sync.js
var require_sync = __commonJS({
  "node_modules/glob/sync.js"(exports, module2) {
    module2.exports = globSync;
    globSync.GlobSync = GlobSync;
    var fs3 = require("fs");
    var rp = require_fs();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var Glob = require_glob().Glob;
    var util2 = require("util");
    var path = require("path");
    var assert = require("assert");
    var isAbsolute = require_path_is_absolute();
    var common = require_common();
    var alphasort = common.alphasort;
    var alphasorti = common.alphasorti;
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    function globSync(pattern, options) {
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      return new GlobSync(pattern, options).found;
    }
    function GlobSync(pattern, options) {
      if (!pattern)
        throw new Error("must provide pattern");
      if (typeof options === "function" || arguments.length === 3)
        throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
      if (!(this instanceof GlobSync))
        return new GlobSync(pattern, options);
      setopts(this, pattern, options);
      if (this.noprocess)
        return this;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false);
      }
      this._finish();
    }
    GlobSync.prototype._finish = function() {
      assert(this instanceof GlobSync);
      if (this.realpath) {
        var self = this;
        this.matches.forEach(function(matchset, index) {
          var set = self.matches[index] = /* @__PURE__ */ Object.create(null);
          for (var p in matchset) {
            try {
              p = self._makeAbs(p);
              var real = rp.realpathSync(p, self.realpathCache);
              set[real] = true;
            } catch (er) {
              if (er.syscall === "stat")
                set[self._makeAbs(p)] = true;
              else
                throw er;
            }
          }
        });
      }
      common.finish(this);
    };
    GlobSync.prototype._process = function(pattern, index, inGlobStar) {
      assert(this instanceof GlobSync);
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return;
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
    };
    GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return;
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix.slice(-1) !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return;
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix)
          newPattern = [prefix, e];
        else
          newPattern = [e];
        this._process(newPattern.concat(remain), index, inGlobStar);
      }
    };
    GlobSync.prototype._emitMatch = function(index, e) {
      if (isIgnored(this, e))
        return;
      var abs = this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute) {
        e = abs;
      }
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      if (this.stat)
        this._stat(e);
    };
    GlobSync.prototype._readdirInGlobStar = function(abs) {
      if (this.follow)
        return this._readdir(abs, false);
      var entries;
      var lstat;
      var stat;
      try {
        lstat = fs3.lstatSync(abs);
      } catch (er) {
        if (er.code === "ENOENT") {
          return null;
        }
      }
      var isSym = lstat && lstat.isSymbolicLink();
      this.symlinks[abs] = isSym;
      if (!isSym && lstat && !lstat.isDirectory())
        this.cache[abs] = "FILE";
      else
        entries = this._readdir(abs, false);
      return entries;
    };
    GlobSync.prototype._readdir = function(abs, inGlobStar) {
      var entries;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return null;
        if (Array.isArray(c))
          return c;
      }
      try {
        return this._readdirEntries(abs, fs3.readdirSync(abs));
      } catch (er) {
        this._readdirError(abs, er);
        return null;
      }
    };
    GlobSync.prototype._readdirEntries = function(abs, entries) {
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return entries;
    };
    GlobSync.prototype._readdirError = function(f, er) {
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error3 = new Error(er.code + " invalid cwd " + this.cwd);
            error3.path = this.cwd;
            error3.code = er.code;
            throw error3;
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict)
            throw er;
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
    };
    GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
      var entries = this._readdir(abs, inGlobStar);
      if (!entries)
        return;
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false);
      var len = entries.length;
      var isSym = this.symlinks[abs];
      if (isSym && inGlobStar)
        return;
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true);
      }
    };
    GlobSync.prototype._processSimple = function(prefix, index) {
      var exists = this._stat(prefix);
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return;
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path.join(this.root, prefix);
        } else {
          prefix = path.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
    };
    GlobSync.prototype._stat = function(f) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return false;
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return c;
        if (needDir && c === "FILE")
          return false;
      }
      var exists;
      var stat = this.statCache[abs];
      if (!stat) {
        var lstat;
        try {
          lstat = fs3.lstatSync(abs);
        } catch (er) {
          if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
            this.statCache[abs] = false;
            return false;
          }
        }
        if (lstat && lstat.isSymbolicLink()) {
          try {
            stat = fs3.statSync(abs);
          } catch (er) {
            stat = lstat;
          }
        } else {
          stat = lstat;
        }
      }
      this.statCache[abs] = stat;
      var c = true;
      if (stat)
        c = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return false;
      return c;
    };
    GlobSync.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    GlobSync.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
  }
});

// node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS({
  "node_modules/wrappy/wrappy.js"(exports, module2) {
    module2.exports = wrappy;
    function wrappy(fn, cb) {
      if (fn && cb)
        return wrappy(fn)(cb);
      if (typeof fn !== "function")
        throw new TypeError("need wrapper function");
      Object.keys(fn).forEach(function(k) {
        wrapper[k] = fn[k];
      });
      return wrapper;
      function wrapper() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        var ret = fn.apply(this, args);
        var cb2 = args[args.length - 1];
        if (typeof ret === "function" && ret !== cb2) {
          Object.keys(cb2).forEach(function(k) {
            ret[k] = cb2[k];
          });
        }
        return ret;
      }
    }
  }
});

// node_modules/once/once.js
var require_once = __commonJS({
  "node_modules/once/once.js"(exports, module2) {
    var wrappy = require_wrappy();
    module2.exports = wrappy(once);
    module2.exports.strict = wrappy(onceStrict);
    once.proto = once(function() {
      Object.defineProperty(Function.prototype, "once", {
        value: function() {
          return once(this);
        },
        configurable: true
      });
      Object.defineProperty(Function.prototype, "onceStrict", {
        value: function() {
          return onceStrict(this);
        },
        configurable: true
      });
    });
    function once(fn) {
      var f = function() {
        if (f.called)
          return f.value;
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      f.called = false;
      return f;
    }
    function onceStrict(fn) {
      var f = function() {
        if (f.called)
          throw new Error(f.onceError);
        f.called = true;
        return f.value = fn.apply(this, arguments);
      };
      var name = fn.name || "Function wrapped with `once`";
      f.onceError = name + " shouldn't be called more than once";
      f.called = false;
      return f;
    }
  }
});

// node_modules/inflight/inflight.js
var require_inflight = __commonJS({
  "node_modules/inflight/inflight.js"(exports, module2) {
    var wrappy = require_wrappy();
    var reqs = /* @__PURE__ */ Object.create(null);
    var once = require_once();
    module2.exports = wrappy(inflight);
    function inflight(key, cb) {
      if (reqs[key]) {
        reqs[key].push(cb);
        return null;
      } else {
        reqs[key] = [cb];
        return makeres(key);
      }
    }
    function makeres(key) {
      return once(function RES() {
        var cbs = reqs[key];
        var len = cbs.length;
        var args = slice(arguments);
        try {
          for (var i = 0; i < len; i++) {
            cbs[i].apply(null, args);
          }
        } finally {
          if (cbs.length > len) {
            cbs.splice(0, len);
            process.nextTick(function() {
              RES.apply(null, args);
            });
          } else {
            delete reqs[key];
          }
        }
      });
    }
    function slice(args) {
      var length = args.length;
      var array = [];
      for (var i = 0; i < length; i++)
        array[i] = args[i];
      return array;
    }
  }
});

// node_modules/glob/glob.js
var require_glob = __commonJS({
  "node_modules/glob/glob.js"(exports, module2) {
    module2.exports = glob2;
    var fs3 = require("fs");
    var rp = require_fs();
    var minimatch = require_minimatch();
    var Minimatch = minimatch.Minimatch;
    var inherits = require_inherits();
    var EE = require("events").EventEmitter;
    var path = require("path");
    var assert = require("assert");
    var isAbsolute = require_path_is_absolute();
    var globSync = require_sync();
    var common = require_common();
    var alphasort = common.alphasort;
    var alphasorti = common.alphasorti;
    var setopts = common.setopts;
    var ownProp = common.ownProp;
    var inflight = require_inflight();
    var util2 = require("util");
    var childrenIgnored = common.childrenIgnored;
    var isIgnored = common.isIgnored;
    var once = require_once();
    function glob2(pattern, options, cb) {
      if (typeof options === "function")
        cb = options, options = {};
      if (!options)
        options = {};
      if (options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return globSync(pattern, options);
      }
      return new Glob(pattern, options, cb);
    }
    glob2.sync = globSync;
    var GlobSync = glob2.GlobSync = globSync.GlobSync;
    glob2.glob = glob2;
    function extend(origin, add) {
      if (add === null || typeof add !== "object") {
        return origin;
      }
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    }
    glob2.hasMagic = function(pattern, options_) {
      var options = extend({}, options_);
      options.noprocess = true;
      var g = new Glob(pattern, options);
      var set = g.minimatch.set;
      if (!pattern)
        return false;
      if (set.length > 1)
        return true;
      for (var j = 0; j < set[0].length; j++) {
        if (typeof set[0][j] !== "string")
          return true;
      }
      return false;
    };
    glob2.Glob = Glob;
    inherits(Glob, EE);
    function Glob(pattern, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      if (options && options.sync) {
        if (cb)
          throw new TypeError("callback provided to sync glob");
        return new GlobSync(pattern, options);
      }
      if (!(this instanceof Glob))
        return new Glob(pattern, options, cb);
      setopts(this, pattern, options);
      this._didRealPath = false;
      var n = this.minimatch.set.length;
      this.matches = new Array(n);
      if (typeof cb === "function") {
        cb = once(cb);
        this.on("error", cb);
        this.on("end", function(matches) {
          cb(null, matches);
        });
      }
      var self = this;
      this._processing = 0;
      this._emitQueue = [];
      this._processQueue = [];
      this.paused = false;
      if (this.noprocess)
        return this;
      if (n === 0)
        return done();
      var sync = true;
      for (var i = 0; i < n; i++) {
        this._process(this.minimatch.set[i], i, false, done);
      }
      sync = false;
      function done() {
        --self._processing;
        if (self._processing <= 0) {
          if (sync) {
            process.nextTick(function() {
              self._finish();
            });
          } else {
            self._finish();
          }
        }
      }
    }
    Glob.prototype._finish = function() {
      assert(this instanceof Glob);
      if (this.aborted)
        return;
      if (this.realpath && !this._didRealpath)
        return this._realpath();
      common.finish(this);
      this.emit("end", this.found);
    };
    Glob.prototype._realpath = function() {
      if (this._didRealpath)
        return;
      this._didRealpath = true;
      var n = this.matches.length;
      if (n === 0)
        return this._finish();
      var self = this;
      for (var i = 0; i < this.matches.length; i++)
        this._realpathSet(i, next);
      function next() {
        if (--n === 0)
          self._finish();
      }
    };
    Glob.prototype._realpathSet = function(index, cb) {
      var matchset = this.matches[index];
      if (!matchset)
        return cb();
      var found = Object.keys(matchset);
      var self = this;
      var n = found.length;
      if (n === 0)
        return cb();
      var set = this.matches[index] = /* @__PURE__ */ Object.create(null);
      found.forEach(function(p, i) {
        p = self._makeAbs(p);
        rp.realpath(p, self.realpathCache, function(er, real) {
          if (!er)
            set[real] = true;
          else if (er.syscall === "stat")
            set[p] = true;
          else
            self.emit("error", er);
          if (--n === 0) {
            self.matches[index] = set;
            cb();
          }
        });
      });
    };
    Glob.prototype._mark = function(p) {
      return common.mark(this, p);
    };
    Glob.prototype._makeAbs = function(f) {
      return common.makeAbs(this, f);
    };
    Glob.prototype.abort = function() {
      this.aborted = true;
      this.emit("abort");
    };
    Glob.prototype.pause = function() {
      if (!this.paused) {
        this.paused = true;
        this.emit("pause");
      }
    };
    Glob.prototype.resume = function() {
      if (this.paused) {
        this.emit("resume");
        this.paused = false;
        if (this._emitQueue.length) {
          var eq = this._emitQueue.slice(0);
          this._emitQueue.length = 0;
          for (var i = 0; i < eq.length; i++) {
            var e = eq[i];
            this._emitMatch(e[0], e[1]);
          }
        }
        if (this._processQueue.length) {
          var pq = this._processQueue.slice(0);
          this._processQueue.length = 0;
          for (var i = 0; i < pq.length; i++) {
            var p = pq[i];
            this._processing--;
            this._process(p[0], p[1], p[2], p[3]);
          }
        }
      }
    };
    Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
      assert(this instanceof Glob);
      assert(typeof cb === "function");
      if (this.aborted)
        return;
      this._processing++;
      if (this.paused) {
        this._processQueue.push([pattern, index, inGlobStar, cb]);
        return;
      }
      var n = 0;
      while (typeof pattern[n] === "string") {
        n++;
      }
      var prefix;
      switch (n) {
        case pattern.length:
          this._processSimple(pattern.join("/"), index, cb);
          return;
        case 0:
          prefix = null;
          break;
        default:
          prefix = pattern.slice(0, n).join("/");
          break;
      }
      var remain = pattern.slice(n);
      var read;
      if (prefix === null)
        read = ".";
      else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
        if (!prefix || !isAbsolute(prefix))
          prefix = "/" + prefix;
        read = prefix;
      } else
        read = prefix;
      var abs = this._makeAbs(read);
      if (childrenIgnored(this, read))
        return cb();
      var isGlobStar = remain[0] === minimatch.GLOBSTAR;
      if (isGlobStar)
        this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
      else
        this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
    };
    Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var pn = remain[0];
      var negate = !!this.minimatch.negate;
      var rawGlob = pn._glob;
      var dotOk = this.dot || rawGlob.charAt(0) === ".";
      var matchedEntries = [];
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (e.charAt(0) !== "." || dotOk) {
          var m;
          if (negate && !prefix) {
            m = !e.match(pn);
          } else {
            m = e.match(pn);
          }
          if (m)
            matchedEntries.push(e);
        }
      }
      var len = matchedEntries.length;
      if (len === 0)
        return cb();
      if (remain.length === 1 && !this.mark && !this.stat) {
        if (!this.matches[index])
          this.matches[index] = /* @__PURE__ */ Object.create(null);
        for (var i = 0; i < len; i++) {
          var e = matchedEntries[i];
          if (prefix) {
            if (prefix !== "/")
              e = prefix + "/" + e;
            else
              e = prefix + e;
          }
          if (e.charAt(0) === "/" && !this.nomount) {
            e = path.join(this.root, e);
          }
          this._emitMatch(index, e);
        }
        return cb();
      }
      remain.shift();
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        var newPattern;
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        this._process([e].concat(remain), index, inGlobStar, cb);
      }
      cb();
    };
    Glob.prototype._emitMatch = function(index, e) {
      if (this.aborted)
        return;
      if (isIgnored(this, e))
        return;
      if (this.paused) {
        this._emitQueue.push([index, e]);
        return;
      }
      var abs = isAbsolute(e) ? e : this._makeAbs(e);
      if (this.mark)
        e = this._mark(e);
      if (this.absolute)
        e = abs;
      if (this.matches[index][e])
        return;
      if (this.nodir) {
        var c = this.cache[abs];
        if (c === "DIR" || Array.isArray(c))
          return;
      }
      this.matches[index][e] = true;
      var st = this.statCache[abs];
      if (st)
        this.emit("stat", e, st);
      this.emit("match", e);
    };
    Glob.prototype._readdirInGlobStar = function(abs, cb) {
      if (this.aborted)
        return;
      if (this.follow)
        return this._readdir(abs, false, cb);
      var lstatkey = "lstat\0" + abs;
      var self = this;
      var lstatcb = inflight(lstatkey, lstatcb_);
      if (lstatcb)
        fs3.lstat(abs, lstatcb);
      function lstatcb_(er, lstat) {
        if (er && er.code === "ENOENT")
          return cb();
        var isSym = lstat && lstat.isSymbolicLink();
        self.symlinks[abs] = isSym;
        if (!isSym && lstat && !lstat.isDirectory()) {
          self.cache[abs] = "FILE";
          cb();
        } else
          self._readdir(abs, false, cb);
      }
    };
    Glob.prototype._readdir = function(abs, inGlobStar, cb) {
      if (this.aborted)
        return;
      cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
      if (!cb)
        return;
      if (inGlobStar && !ownProp(this.symlinks, abs))
        return this._readdirInGlobStar(abs, cb);
      if (ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (!c || c === "FILE")
          return cb();
        if (Array.isArray(c))
          return cb(null, c);
      }
      var self = this;
      fs3.readdir(abs, readdirCb(this, abs, cb));
    };
    function readdirCb(self, abs, cb) {
      return function(er, entries) {
        if (er)
          self._readdirError(abs, er, cb);
        else
          self._readdirEntries(abs, entries, cb);
      };
    }
    Glob.prototype._readdirEntries = function(abs, entries, cb) {
      if (this.aborted)
        return;
      if (!this.mark && !this.stat) {
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (abs === "/")
            e = abs + e;
          else
            e = abs + "/" + e;
          this.cache[e] = true;
        }
      }
      this.cache[abs] = entries;
      return cb(null, entries);
    };
    Glob.prototype._readdirError = function(f, er, cb) {
      if (this.aborted)
        return;
      switch (er.code) {
        case "ENOTSUP":
        case "ENOTDIR":
          var abs = this._makeAbs(f);
          this.cache[abs] = "FILE";
          if (abs === this.cwdAbs) {
            var error3 = new Error(er.code + " invalid cwd " + this.cwd);
            error3.path = this.cwd;
            error3.code = er.code;
            this.emit("error", error3);
            this.abort();
          }
          break;
        case "ENOENT":
        case "ELOOP":
        case "ENAMETOOLONG":
        case "UNKNOWN":
          this.cache[this._makeAbs(f)] = false;
          break;
        default:
          this.cache[this._makeAbs(f)] = false;
          if (this.strict) {
            this.emit("error", er);
            this.abort();
          }
          if (!this.silent)
            console.error("glob error", er);
          break;
      }
      return cb();
    };
    Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
      var self = this;
      this._readdir(abs, inGlobStar, function(er, entries) {
        self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
      });
    };
    Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
      if (!entries)
        return cb();
      var remainWithoutGlobStar = remain.slice(1);
      var gspref = prefix ? [prefix] : [];
      var noGlobStar = gspref.concat(remainWithoutGlobStar);
      this._process(noGlobStar, index, false, cb);
      var isSym = this.symlinks[abs];
      var len = entries.length;
      if (isSym && inGlobStar)
        return cb();
      for (var i = 0; i < len; i++) {
        var e = entries[i];
        if (e.charAt(0) === "." && !this.dot)
          continue;
        var instead = gspref.concat(entries[i], remainWithoutGlobStar);
        this._process(instead, index, true, cb);
        var below = gspref.concat(entries[i], remain);
        this._process(below, index, true, cb);
      }
      cb();
    };
    Glob.prototype._processSimple = function(prefix, index, cb) {
      var self = this;
      this._stat(prefix, function(er, exists) {
        self._processSimple2(prefix, index, er, exists, cb);
      });
    };
    Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
      if (!this.matches[index])
        this.matches[index] = /* @__PURE__ */ Object.create(null);
      if (!exists)
        return cb();
      if (prefix && isAbsolute(prefix) && !this.nomount) {
        var trail = /[\/\\]$/.test(prefix);
        if (prefix.charAt(0) === "/") {
          prefix = path.join(this.root, prefix);
        } else {
          prefix = path.resolve(this.root, prefix);
          if (trail)
            prefix += "/";
        }
      }
      if (process.platform === "win32")
        prefix = prefix.replace(/\\/g, "/");
      this._emitMatch(index, prefix);
      cb();
    };
    Glob.prototype._stat = function(f, cb) {
      var abs = this._makeAbs(f);
      var needDir = f.slice(-1) === "/";
      if (f.length > this.maxLength)
        return cb();
      if (!this.stat && ownProp(this.cache, abs)) {
        var c = this.cache[abs];
        if (Array.isArray(c))
          c = "DIR";
        if (!needDir || c === "DIR")
          return cb(null, c);
        if (needDir && c === "FILE")
          return cb();
      }
      var exists;
      var stat = this.statCache[abs];
      if (stat !== void 0) {
        if (stat === false)
          return cb(null, stat);
        else {
          var type = stat.isDirectory() ? "DIR" : "FILE";
          if (needDir && type === "FILE")
            return cb();
          else
            return cb(null, type, stat);
        }
      }
      var self = this;
      var statcb = inflight("stat\0" + abs, lstatcb_);
      if (statcb)
        fs3.lstat(abs, statcb);
      function lstatcb_(er, lstat) {
        if (lstat && lstat.isSymbolicLink()) {
          return fs3.stat(abs, function(er2, stat2) {
            if (er2)
              self._stat2(f, abs, null, lstat, cb);
            else
              self._stat2(f, abs, er2, stat2, cb);
          });
        } else {
          self._stat2(f, abs, er, lstat, cb);
        }
      }
    };
    Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
      if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
        this.statCache[abs] = false;
        return cb();
      }
      var needDir = f.slice(-1) === "/";
      this.statCache[abs] = stat;
      if (abs.slice(-1) === "/" && stat && !stat.isDirectory())
        return cb(null, false, stat);
      var c = true;
      if (stat)
        c = stat.isDirectory() ? "DIR" : "FILE";
      this.cache[abs] = this.cache[abs] || c;
      if (needDir && c === "FILE")
        return cb();
      return cb(null, c, stat);
    };
  }
});

// node_modules/js-yaml/lib/js-yaml/common.js
var require_common2 = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/common.js"(exports, module2) {
    "use strict";
    function isNothing(subject) {
      return typeof subject === "undefined" || subject === null;
    }
    function isObject(subject) {
      return typeof subject === "object" && subject !== null;
    }
    function toArray(sequence) {
      if (Array.isArray(sequence))
        return sequence;
      else if (isNothing(sequence))
        return [];
      return [sequence];
    }
    function extend(target, source) {
      var index, length, key, sourceKeys;
      if (source) {
        sourceKeys = Object.keys(source);
        for (index = 0, length = sourceKeys.length; index < length; index += 1) {
          key = sourceKeys[index];
          target[key] = source[key];
        }
      }
      return target;
    }
    function repeat(string, count) {
      var result = "", cycle;
      for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
      return result;
    }
    function isNegativeZero(number) {
      return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    }
    module2.exports.isNothing = isNothing;
    module2.exports.isObject = isObject;
    module2.exports.toArray = toArray;
    module2.exports.repeat = repeat;
    module2.exports.isNegativeZero = isNegativeZero;
    module2.exports.extend = extend;
  }
});

// node_modules/js-yaml/lib/js-yaml/exception.js
var require_exception = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/exception.js"(exports, module2) {
    "use strict";
    function YAMLException(reason, mark) {
      Error.call(this);
      this.name = "YAMLException";
      this.reason = reason;
      this.mark = mark;
      this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack || "";
      }
    }
    YAMLException.prototype = Object.create(Error.prototype);
    YAMLException.prototype.constructor = YAMLException;
    YAMLException.prototype.toString = function toString(compact) {
      var result = this.name + ": ";
      result += this.reason || "(unknown reason)";
      if (!compact && this.mark) {
        result += " " + this.mark.toString();
      }
      return result;
    };
    module2.exports = YAMLException;
  }
});

// node_modules/js-yaml/lib/js-yaml/mark.js
var require_mark = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/mark.js"(exports, module2) {
    "use strict";
    var common = require_common2();
    function Mark(name, buffer, position, line, column) {
      this.name = name;
      this.buffer = buffer;
      this.position = position;
      this.line = line;
      this.column = column;
    }
    Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
      var head, start, tail, end, snippet;
      if (!this.buffer)
        return null;
      indent = indent || 4;
      maxLength = maxLength || 75;
      head = "";
      start = this.position;
      while (start > 0 && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
          head = " ... ";
          start += 5;
          break;
        }
      }
      tail = "";
      end = this.position;
      while (end < this.buffer.length && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
          tail = " ... ";
          end -= 5;
          break;
        }
      }
      snippet = this.buffer.slice(start, end);
      return common.repeat(" ", indent) + head + snippet + tail + "\n" + common.repeat(" ", indent + this.position - start + head.length) + "^";
    };
    Mark.prototype.toString = function toString(compact) {
      var snippet, where = "";
      if (this.name) {
        where += 'in "' + this.name + '" ';
      }
      where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
      if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
          where += ":\n" + snippet;
        }
      }
      return where;
    };
    module2.exports = Mark;
  }
});

// node_modules/js-yaml/lib/js-yaml/type.js
var require_type = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type.js"(exports, module2) {
    "use strict";
    var YAMLException = require_exception();
    var TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "defaultStyle",
      "styleAliases"
    ];
    var YAML_NODE_KINDS = [
      "scalar",
      "sequence",
      "mapping"
    ];
    function compileStyleAliases(map) {
      var result = {};
      if (map !== null) {
        Object.keys(map).forEach(function(style) {
          map[style].forEach(function(alias) {
            result[String(alias)] = style;
          });
        });
      }
      return result;
    }
    function Type(tag, options) {
      options = options || {};
      Object.keys(options).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });
      this.tag = tag;
      this.kind = options["kind"] || null;
      this.resolve = options["resolve"] || function() {
        return true;
      };
      this.construct = options["construct"] || function(data) {
        return data;
      };
      this.instanceOf = options["instanceOf"] || null;
      this.predicate = options["predicate"] || null;
      this.represent = options["represent"] || null;
      this.defaultStyle = options["defaultStyle"] || null;
      this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
    module2.exports = Type;
  }
});

// node_modules/js-yaml/lib/js-yaml/schema.js
var require_schema = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema.js"(exports, module2) {
    "use strict";
    var common = require_common2();
    var YAMLException = require_exception();
    var Type = require_type();
    function compileList(schema, name, result) {
      var exclude = [];
      schema.include.forEach(function(includedSchema) {
        result = compileList(includedSchema, name, result);
      });
      schema[name].forEach(function(currentType) {
        result.forEach(function(previousType, previousIndex) {
          if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
            exclude.push(previousIndex);
          }
        });
        result.push(currentType);
      });
      return result.filter(function(type, index) {
        return exclude.indexOf(index) === -1;
      });
    }
    function compileMap() {
      var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index, length;
      function collectType(type) {
        result[type.kind][type.tag] = result["fallback"][type.tag] = type;
      }
      for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
      }
      return result;
    }
    function Schema(definition) {
      this.include = definition.include || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];
      this.implicit.forEach(function(type) {
        if (type.loadKind && type.loadKind !== "scalar") {
          throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
      });
      this.compiledImplicit = compileList(this, "implicit", []);
      this.compiledExplicit = compileList(this, "explicit", []);
      this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }
    Schema.DEFAULT = null;
    Schema.create = function createSchema() {
      var schemas, types;
      switch (arguments.length) {
        case 1:
          schemas = Schema.DEFAULT;
          types = arguments[0];
          break;
        case 2:
          schemas = arguments[0];
          types = arguments[1];
          break;
        default:
          throw new YAMLException("Wrong number of arguments for Schema.create function");
      }
      schemas = common.toArray(schemas);
      types = common.toArray(types);
      if (!schemas.every(function(schema) {
        return schema instanceof Schema;
      })) {
        throw new YAMLException("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
      }
      if (!types.every(function(type) {
        return type instanceof Type;
      })) {
        throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      return new Schema({
        include: schemas,
        explicit: types
      });
    };
    module2.exports = Schema;
  }
});

// node_modules/js-yaml/lib/js-yaml/type/str.js
var require_str = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/str.js"(exports, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function(data) {
        return data !== null ? data : "";
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/seq.js
var require_seq = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/seq.js"(exports, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function(data) {
        return data !== null ? data : [];
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/map.js
var require_map = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/map.js"(exports, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function(data) {
        return data !== null ? data : {};
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/failsafe.js
var require_failsafe = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/failsafe.js"(exports, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      explicit: [
        require_str(),
        require_seq(),
        require_map()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/null.js
var require_null = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/null.js"(exports, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlNull(data) {
      if (data === null)
        return true;
      var max = data.length;
      return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
    }
    function constructYamlNull() {
      return null;
    }
    function isNull(object) {
      return object === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function() {
          return "~";
        },
        lowercase: function() {
          return "null";
        },
        uppercase: function() {
          return "NULL";
        },
        camelcase: function() {
          return "Null";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/bool.js
var require_bool = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/bool.js"(exports, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlBoolean(data) {
      if (data === null)
        return false;
      var max = data.length;
      return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
    }
    function constructYamlBoolean(data) {
      return data === "true" || data === "True" || data === "TRUE";
    }
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === "[object Boolean]";
    }
    module2.exports = new Type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function(object) {
          return object ? "true" : "false";
        },
        uppercase: function(object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
          return object ? "True" : "False";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/int.js
var require_int = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/int.js"(exports, module2) {
    "use strict";
    var common = require_common2();
    var Type = require_type();
    function isHexCode(c) {
      return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
    }
    function isOctCode(c) {
      return 48 <= c && c <= 55;
    }
    function isDecCode(c) {
      return 48 <= c && c <= 57;
    }
    function resolveYamlInteger(data) {
      if (data === null)
        return false;
      var max = data.length, index = 0, hasDigits = false, ch;
      if (!max)
        return false;
      ch = data[index];
      if (ch === "-" || ch === "+") {
        ch = data[++index];
      }
      if (ch === "0") {
        if (index + 1 === max)
          return true;
        ch = data[++index];
        if (ch === "b") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_")
              continue;
            if (ch !== "0" && ch !== "1")
              return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "x") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_")
              continue;
            if (!isHexCode(data.charCodeAt(index)))
              return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_")
            continue;
          if (!isOctCode(data.charCodeAt(index)))
            return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "_")
        return false;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (ch === ":")
          break;
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      if (!hasDigits || ch === "_")
        return false;
      if (ch !== ":")
        return true;
      return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
    }
    function constructYamlInteger(data) {
      var value = data, sign = 1, ch, base, digits = [];
      if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
      }
      ch = value[0];
      if (ch === "-" || ch === "+") {
        if (ch === "-")
          sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
      if (value === "0")
        return 0;
      if (ch === "0") {
        if (value[1] === "b")
          return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x")
          return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
      }
      if (value.indexOf(":") !== -1) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseInt(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseInt(value, 10);
    }
    function isInteger(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function(obj) {
          return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
          return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
          return obj.toString(10);
        },
        /* eslint-disable max-len */
        hexadecimal: function(obj) {
          return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"]
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/float.js
var require_float = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/float.js"(exports, module2) {
    "use strict";
    var common = require_common2();
    var Type = require_type();
    var YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    function resolveYamlFloat(data) {
      if (data === null)
        return false;
      if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === "_") {
        return false;
      }
      return true;
    }
    function constructYamlFloat(data) {
      var value, sign, base, digits;
      value = data.replace(/_/g, "").toLowerCase();
      sign = value[0] === "-" ? -1 : 1;
      digits = [];
      if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
      if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      } else if (value === ".nan") {
        return NaN;
      } else if (value.indexOf(":") >= 0) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseFloat(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseFloat(value, 10);
    }
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    function representYamlFloat(object, style) {
      var res;
      if (isNaN(object)) {
        switch (style) {
          case "lowercase":
            return ".nan";
          case "uppercase":
            return ".NAN";
          case "camelcase":
            return ".NaN";
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return ".inf";
          case "uppercase":
            return ".INF";
          case "camelcase":
            return ".Inf";
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return "-.inf";
          case "uppercase":
            return "-.INF";
          case "camelcase":
            return "-.Inf";
        }
      } else if (common.isNegativeZero(object)) {
        return "-0.0";
      }
      res = object.toString(10);
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    }
    function isFloat(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/json.js
var require_json = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/json.js"(exports, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_failsafe()
      ],
      implicit: [
        require_null(),
        require_bool(),
        require_int(),
        require_float()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/core.js
var require_core2 = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/core.js"(exports, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_json()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/timestamp.js"(exports, module2) {
    "use strict";
    var Type = require_type();
    var YAML_DATE_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
    );
    var YAML_TIMESTAMP_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
    function resolveYamlTimestamp(data) {
      if (data === null)
        return false;
      if (YAML_DATE_REGEXP.exec(data) !== null)
        return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null)
        return true;
      return false;
    }
    function constructYamlTimestamp(data) {
      var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
      match = YAML_DATE_REGEXP.exec(data);
      if (match === null)
        match = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match === null)
        throw new Error("Date resolve error");
      year = +match[1];
      month = +match[2] - 1;
      day = +match[3];
      if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
      }
      hour = +match[4];
      minute = +match[5];
      second = +match[6];
      if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) {
          fraction += "0";
        }
        fraction = +fraction;
      }
      if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 6e4;
        if (match[9] === "-")
          delta = -delta;
      }
      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
      if (delta)
        date.setTime(date.getTime() - delta);
      return date;
    }
    function representYamlTimestamp(object) {
      return object.toISOString();
    }
    module2.exports = new Type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/merge.js
var require_merge = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/merge.js"(exports, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlMerge(data) {
      return data === "<<" || data === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/binary.js
var require_binary = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/binary.js"(exports, module2) {
    "use strict";
    var NodeBuffer;
    try {
      _require = require;
      NodeBuffer = _require("buffer").Buffer;
    } catch (__) {
    }
    var _require;
    var Type = require_type();
    var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function resolveYamlBinary(data) {
      if (data === null)
        return false;
      var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        code = map.indexOf(data.charAt(idx));
        if (code > 64)
          continue;
        if (code < 0)
          return false;
        bitlen += 6;
      }
      return bitlen % 8 === 0;
    }
    function constructYamlBinary(data) {
      var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
      for (idx = 0; idx < max; idx++) {
        if (idx % 4 === 0 && idx) {
          result.push(bits >> 16 & 255);
          result.push(bits >> 8 & 255);
          result.push(bits & 255);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
      }
      tailbits = max % 4 * 6;
      if (tailbits === 0) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      } else if (tailbits === 18) {
        result.push(bits >> 10 & 255);
        result.push(bits >> 2 & 255);
      } else if (tailbits === 12) {
        result.push(bits >> 4 & 255);
      }
      if (NodeBuffer) {
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
      }
      return result;
    }
    function representYamlBinary(object) {
      var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        if (idx % 3 === 0 && idx) {
          result += map[bits >> 18 & 63];
          result += map[bits >> 12 & 63];
          result += map[bits >> 6 & 63];
          result += map[bits & 63];
        }
        bits = (bits << 8) + object[idx];
      }
      tail = max % 3;
      if (tail === 0) {
        result += map[bits >> 18 & 63];
        result += map[bits >> 12 & 63];
        result += map[bits >> 6 & 63];
        result += map[bits & 63];
      } else if (tail === 2) {
        result += map[bits >> 10 & 63];
        result += map[bits >> 4 & 63];
        result += map[bits << 2 & 63];
        result += map[64];
      } else if (tail === 1) {
        result += map[bits >> 2 & 63];
        result += map[bits << 4 & 63];
        result += map[64];
        result += map[64];
      }
      return result;
    }
    function isBinary(object) {
      return NodeBuffer && NodeBuffer.isBuffer(object);
    }
    module2.exports = new Type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/omap.js
var require_omap = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/omap.js"(exports, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString = Object.prototype.toString;
    function resolveYamlOmap(data) {
      if (data === null)
        return true;
      var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;
        if (_toString.call(pair) !== "[object Object]")
          return false;
        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey)
              pairHasKey = true;
            else
              return false;
          }
        }
        if (!pairHasKey)
          return false;
        if (objectKeys.indexOf(pairKey) === -1)
          objectKeys.push(pairKey);
        else
          return false;
      }
      return true;
    }
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
    module2.exports = new Type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/pairs.js
var require_pairs = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/pairs.js"(exports, module2) {
    "use strict";
    var Type = require_type();
    var _toString = Object.prototype.toString;
    function resolveYamlPairs(data) {
      if (data === null)
        return true;
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        if (_toString.call(pair) !== "[object Object]")
          return false;
        keys = Object.keys(pair);
        if (keys.length !== 1)
          return false;
        result[index] = [keys[0], pair[keys[0]]];
      }
      return true;
    }
    function constructYamlPairs(data) {
      if (data === null)
        return [];
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [keys[0], pair[keys[0]]];
      }
      return result;
    }
    module2.exports = new Type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/set.js
var require_set = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/set.js"(exports, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function resolveYamlSet(data) {
      if (data === null)
        return true;
      var key, object = data;
      for (key in object) {
        if (_hasOwnProperty.call(object, key)) {
          if (object[key] !== null)
            return false;
        }
      }
      return true;
    }
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
    module2.exports = new Type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/default_safe.js
var require_default_safe = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/default_safe.js"(exports, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_core2()
      ],
      implicit: [
        require_timestamp(),
        require_merge()
      ],
      explicit: [
        require_binary(),
        require_omap(),
        require_pairs(),
        require_set()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/undefined.js
var require_undefined = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/undefined.js"(exports, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptUndefined() {
      return true;
    }
    function constructJavascriptUndefined() {
      return void 0;
    }
    function representJavascriptUndefined() {
      return "";
    }
    function isUndefined(object) {
      return typeof object === "undefined";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/undefined", {
      kind: "scalar",
      resolve: resolveJavascriptUndefined,
      construct: constructJavascriptUndefined,
      predicate: isUndefined,
      represent: representJavascriptUndefined
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/regexp.js
var require_regexp = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/regexp.js"(exports, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptRegExp(data) {
      if (data === null)
        return false;
      if (data.length === 0)
        return false;
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail)
          modifiers = tail[1];
        if (modifiers.length > 3)
          return false;
        if (regexp[regexp.length - modifiers.length - 1] !== "/")
          return false;
      }
      return true;
    }
    function constructJavascriptRegExp(data) {
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail)
          modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
      }
      return new RegExp(regexp, modifiers);
    }
    function representJavascriptRegExp(object) {
      var result = "/" + object.source + "/";
      if (object.global)
        result += "g";
      if (object.multiline)
        result += "m";
      if (object.ignoreCase)
        result += "i";
      return result;
    }
    function isRegExp(object) {
      return Object.prototype.toString.call(object) === "[object RegExp]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/regexp", {
      kind: "scalar",
      resolve: resolveJavascriptRegExp,
      construct: constructJavascriptRegExp,
      predicate: isRegExp,
      represent: representJavascriptRegExp
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/function.js
var require_function = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/function.js"(exports, module2) {
    "use strict";
    var esprima;
    try {
      _require = require;
      esprima = _require("esprima");
    } catch (_) {
      if (typeof window !== "undefined")
        esprima = window.esprima;
    }
    var _require;
    var Type = require_type();
    function resolveJavascriptFunction(data) {
      if (data === null)
        return false;
      try {
        var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
        if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    function constructJavascriptFunction(data) {
      var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
      if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
        throw new Error("Failed to resolve function");
      }
      ast.body[0].expression.params.forEach(function(param) {
        params.push(param.name);
      });
      body = ast.body[0].expression.body.range;
      if (ast.body[0].expression.body.type === "BlockStatement") {
        return new Function(params, source.slice(body[0] + 1, body[1] - 1));
      }
      return new Function(params, "return " + source.slice(body[0], body[1]));
    }
    function representJavascriptFunction(object) {
      return object.toString();
    }
    function isFunction(object) {
      return Object.prototype.toString.call(object) === "[object Function]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/function", {
      kind: "scalar",
      resolve: resolveJavascriptFunction,
      construct: constructJavascriptFunction,
      predicate: isFunction,
      represent: representJavascriptFunction
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/default_full.js
var require_default_full = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/default_full.js"(exports, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = Schema.DEFAULT = new Schema({
      include: [
        require_default_safe()
      ],
      explicit: [
        require_undefined(),
        require_regexp(),
        require_function()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/loader.js
var require_loader = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/loader.js"(exports, module2) {
    "use strict";
    var common = require_common2();
    var YAMLException = require_exception();
    var Mark = require_mark();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;
    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;
    var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function is_EOL(c) {
      return c === 10 || c === 13;
    }
    function is_WHITE_SPACE(c) {
      return c === 9 || c === 32;
    }
    function is_WS_OR_EOL(c) {
      return c === 9 || c === 32 || c === 10 || c === 13;
    }
    function is_FLOW_INDICATOR(c) {
      return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
    }
    function fromHexCode(c) {
      var lc;
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      lc = c | 32;
      if (97 <= lc && lc <= 102) {
        return lc - 97 + 10;
      }
      return -1;
    }
    function escapedHexLen(c) {
      if (c === 120) {
        return 2;
      }
      if (c === 117) {
        return 4;
      }
      if (c === 85) {
        return 8;
      }
      return 0;
    }
    function fromDecimalCode(c) {
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      return -1;
    }
    function simpleEscapeSequence(c) {
      return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
    }
    function charFromCodepoint(c) {
      if (c <= 65535) {
        return String.fromCharCode(c);
      }
      return String.fromCharCode(
        (c - 65536 >> 10) + 55296,
        (c - 65536 & 1023) + 56320
      );
    }
    var simpleEscapeCheck = new Array(256);
    var simpleEscapeMap = new Array(256);
    for (i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }
    var i;
    function State(input, options) {
      this.input = input;
      this.filename = options["filename"] || null;
      this.schema = options["schema"] || DEFAULT_FULL_SCHEMA;
      this.onWarning = options["onWarning"] || null;
      this.legacy = options["legacy"] || false;
      this.json = options["json"] || false;
      this.listener = options["listener"] || null;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.documents = [];
    }
    function generateError(state, message) {
      return new YAMLException(
        message,
        new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart)
      );
    }
    function throwError(state, message) {
      throw generateError(state, message);
    }
    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }
    var directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        state.tagMap[handle] = prefix;
      }
    };
    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;
      if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
              throwError(state, "expected valid JSON character");
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
      }
    }
    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index, quantity;
      if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
      }
      sourceKeys = Object.keys(source);
      for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];
        if (!_hasOwnProperty.call(destination, key)) {
          destination[key] = source[key];
          overridableKeys[key] = true;
        }
      }
    }
    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
      var index, quantity;
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
          if (Array.isArray(keyNode[index])) {
            throwError(state, "nested arrays are not supported inside keys");
          }
          if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
            keyNode[index] = "[object Object]";
          }
        }
      }
      if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
      }
      keyNode = String(keyNode);
      if (_result === null) {
        _result = {};
      }
      if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
          for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
            mergeMappings(state, _result, valueNode[index], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.position = startPos || state.position;
          throwError(state, "duplicated mapping key");
        }
        _result[keyNode] = valueNode;
        delete overridableKeys[keyNode];
      }
      return _result;
    }
    function readLineBreak(state) {
      var ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 10) {
        state.position++;
      } else if (ch === 13) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 10) {
          state.position++;
        }
      } else {
        throwError(state, "a line break is expected");
      }
      state.line += 1;
      state.lineStart = state.position;
    }
    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 10 && ch !== 13 && ch !== 0);
        }
        if (is_EOL(ch)) {
          readLineBreak(state);
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
          while (ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
      }
      return lineBreaks;
    }
    function testDocumentSeparator(state) {
      var _position = state.position, ch;
      ch = state.input.charCodeAt(_position);
      if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }
      return false;
    }
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += " ";
      } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
      }
    }
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
      ch = state.input.charCodeAt(state.position);
      if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
        return false;
      }
      if (ch === 63 || ch === 45) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }
      state.kind = "scalar";
      state.result = "";
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
      while (ch !== 0) {
        if (ch === 58) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }
        } else if (ch === 35) {
          preceding = state.input.charCodeAt(state.position - 1);
          if (is_WS_OR_EOL(preceding)) {
            break;
          }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;
        } else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, captureEnd, false);
      if (state.result) {
        return true;
      }
      state.kind = _kind;
      state.result = _result;
      return false;
    }
    function readSingleQuotedScalar(state, nodeIndent) {
      var ch, captureStart, captureEnd;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 39) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 39) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (ch === 39) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a single quoted scalar");
    }
    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 34) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 34) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
        } else if (ch === 92) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, "expected hexadecimal character");
              }
            }
            state.result += charFromCodepoint(hexResult);
            state.position++;
          } else {
            throwError(state, "unknown escape sequence");
          }
          captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a double quoted scalar");
    }
    function readFlowCollection(state, nodeIndent) {
      var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 91) {
        terminator = 93;
        isMapping = false;
        _result = [];
      } else if (ch === 123) {
        terminator = 125;
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(++state.position);
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? "mapping" : "sequence";
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, "missed comma between flow collection entries");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 63) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 58) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
          _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 44) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
      throwError(state, "unexpected end of the stream within a flow collection");
    }
    function readBlockScalar(state, nodeIndent) {
      var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 124) {
        folding = false;
      } else if (ch === 62) {
        folding = true;
      } else {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
        if (ch === 43 || ch === 45) {
          if (CHOMPING_CLIP === chomping) {
            chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, "repeat of a chomping mode identifier");
          }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, "repeat of an indentation width identifier");
          }
        } else {
          break;
        }
      }
      if (is_WHITE_SPACE(ch)) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (is_WHITE_SPACE(ch));
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (!is_EOL(ch) && ch !== 0);
        }
      }
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }
        if (state.lineIndent < textIndent) {
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) {
              state.result += "\n";
            }
          }
          break;
        }
        if (folding) {
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat("\n", emptyLines + 1);
          } else if (emptyLines === 0) {
            if (didReadContent) {
              state.result += " ";
            }
          } else {
            state.result += common.repeat("\n", emptyLines);
          }
        } else {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while (!is_EOL(ch) && ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
      }
      return true;
    }
    function readBlockSequence(state, nodeIndent) {
      var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (ch !== 45) {
          break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
          break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
          throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
      }
      return false;
    }
    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line;
        _pos = state.position;
        if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
          if (ch === 63) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          } else if (atExplicitKey) {
            atExplicitKey = false;
            allowCompact = true;
          } else {
            throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
          }
          state.position += 1;
          ch = following;
        } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 58) {
              ch = state.input.charCodeAt(++state.position);
              if (!is_WS_OR_EOL(ch)) {
                throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
              }
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
            } else if (detected) {
              throwError(state, "can not read an implicit mapping pair; a colon is missed");
            } else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true;
            }
          } else if (detected) {
            throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else {
          break;
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
            keyTag = keyNode = valueNode = null;
          }
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
          throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
      }
      return detected;
    }
    function readTagProperty(state) {
      var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 33)
        return false;
      if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
      }
      ch = state.input.charCodeAt(++state.position);
      if (ch === 60) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
      } else if (ch === 33) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
      } else {
        tagHandle = "!";
      }
      _position = state.position;
      if (isVerbatim) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && ch !== 62);
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, "unexpected end of the stream within a verbatim tag");
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          if (ch === 33) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, "named tag handle cannot contain such characters");
              }
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, "tag suffix cannot contain exclamation marks");
            }
          }
          ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, "tag suffix cannot contain flow indicator characters");
        }
      }
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
      }
      if (isVerbatim) {
        state.tag = tagName;
      } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
      } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
      } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
      return true;
    }
    function readAnchorProperty(state) {
      var _position, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 38)
        return false;
      if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
      }
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
    function readAlias(state) {
      var _position, alias, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 42)
        return false;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
      }
      alias = state.input.slice(_position, state.position);
      if (!state.anchorMap.hasOwnProperty(alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;
      if (state.listener !== null) {
        state.listener("open", state);
      }
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
          if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;
            } else if (readAlias(state)) {
              hasContent = true;
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, "alias node should not have any properties");
              }
            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;
              if (state.tag === null) {
                state.tag = "?";
              }
            }
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
      if (state.tag !== null && state.tag !== "!") {
        if (state.tag === "?") {
          for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
            type = state.implicitTypes[typeIndex];
            if (type.resolve(state.result)) {
              state.result = type.construct(state.result);
              state.tag = type.tag;
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
              break;
            }
          }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) {
          type = state.typeMap[state.kind || "fallback"][state.tag];
          if (state.result !== null && type.kind !== state.kind) {
            throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
          }
          if (!type.resolve(state.result)) {
            throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
          } else {
            state.result = type.construct(state.result);
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else {
          throwError(state, "unknown tag !<" + state.tag + ">");
        }
      }
      if (state.listener !== null) {
        state.listener("close", state);
      }
      return state.tag !== null || state.anchor !== null || hasContent;
    }
    function readDocument(state) {
      var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = {};
      state.anchorMap = {};
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 37) {
          break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
          throwError(state, "directive name must not be less than one character in length");
        }
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && !is_EOL(ch));
            break;
          }
          if (is_EOL(ch))
            break;
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0)
          readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }
      skipSeparationSpace(state, true, -1);
      if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
      }
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
      if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
      }
      state.documents.push(state.result);
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 46) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
      if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
      } else {
        return;
      }
    }
    function loadDocuments(input, options) {
      input = String(input);
      options = options || {};
      if (input.length !== 0) {
        if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
          input += "\n";
        }
        if (input.charCodeAt(0) === 65279) {
          input = input.slice(1);
        }
      }
      var state = new State(input, options);
      state.input += "\0";
      while (state.input.charCodeAt(state.position) === 32) {
        state.lineIndent += 1;
        state.position += 1;
      }
      while (state.position < state.length - 1) {
        readDocument(state);
      }
      return state.documents;
    }
    function loadAll(input, iterator, options) {
      var documents = loadDocuments(input, options), index, length;
      if (typeof iterator !== "function") {
        return documents;
      }
      for (index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
      }
    }
    function load2(input, options) {
      var documents = loadDocuments(input, options);
      if (documents.length === 0) {
        return void 0;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new YAMLException("expected a single document in the stream, but found more");
    }
    function safeLoadAll(input, output, options) {
      if (typeof output === "function") {
        loadAll(input, output, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
      } else {
        return loadAll(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
      }
    }
    function safeLoad(input, options) {
      return load2(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
    }
    module2.exports.loadAll = loadAll;
    module2.exports.load = load2;
    module2.exports.safeLoadAll = safeLoadAll;
    module2.exports.safeLoad = safeLoad;
  }
});

// node_modules/js-yaml/lib/js-yaml/dumper.js
var require_dumper = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/dumper.js"(exports, module2) {
    "use strict";
    var common = require_common2();
    var YAMLException = require_exception();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var _toString = Object.prototype.toString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CHAR_TAB = 9;
    var CHAR_LINE_FEED = 10;
    var CHAR_SPACE = 32;
    var CHAR_EXCLAMATION = 33;
    var CHAR_DOUBLE_QUOTE = 34;
    var CHAR_SHARP = 35;
    var CHAR_PERCENT = 37;
    var CHAR_AMPERSAND = 38;
    var CHAR_SINGLE_QUOTE = 39;
    var CHAR_ASTERISK = 42;
    var CHAR_COMMA = 44;
    var CHAR_MINUS = 45;
    var CHAR_COLON = 58;
    var CHAR_GREATER_THAN = 62;
    var CHAR_QUESTION = 63;
    var CHAR_COMMERCIAL_AT = 64;
    var CHAR_LEFT_SQUARE_BRACKET = 91;
    var CHAR_RIGHT_SQUARE_BRACKET = 93;
    var CHAR_GRAVE_ACCENT = 96;
    var CHAR_LEFT_CURLY_BRACKET = 123;
    var CHAR_VERTICAL_LINE = 124;
    var CHAR_RIGHT_CURLY_BRACKET = 125;
    var ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    var DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF"
    ];
    function compileStyleMap(schema, map) {
      var result, keys, index, length, tag, style, type;
      if (map === null)
        return {};
      result = {};
      keys = Object.keys(map);
      for (index = 0, length = keys.length; index < length; index += 1) {
        tag = keys[index];
        style = String(map[tag]);
        if (tag.slice(0, 2) === "!!") {
          tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        type = schema.compiledTypeMap["fallback"][tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
          style = type.styleAliases[style];
        }
        result[tag] = style;
      }
      return result;
    }
    function encodeHex(character) {
      var string, handle, length;
      string = character.toString(16).toUpperCase();
      if (character <= 255) {
        handle = "x";
        length = 2;
      } else if (character <= 65535) {
        handle = "u";
        length = 4;
      } else if (character <= 4294967295) {
        handle = "U";
        length = 8;
      } else {
        throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
      }
      return "\\" + handle + common.repeat("0", length - string.length) + string;
    }
    function State(options) {
      this.schema = options["schema"] || DEFAULT_FULL_SCHEMA;
      this.indent = Math.max(1, options["indent"] || 2);
      this.noArrayIndent = options["noArrayIndent"] || false;
      this.skipInvalid = options["skipInvalid"] || false;
      this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
      this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
      this.sortKeys = options["sortKeys"] || false;
      this.lineWidth = options["lineWidth"] || 80;
      this.noRefs = options["noRefs"] || false;
      this.noCompatMode = options["noCompatMode"] || false;
      this.condenseFlow = options["condenseFlow"] || false;
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
      this.tag = null;
      this.result = "";
      this.duplicates = [];
      this.usedDuplicates = null;
    }
    function indentString(string, spaces) {
      var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
      while (position < length) {
        next = string.indexOf("\n", position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
        if (line.length && line !== "\n")
          result += ind;
        result += line;
      }
      return result;
    }
    function generateNextLine(state, level) {
      return "\n" + common.repeat(" ", state.indent * level);
    }
    function testImplicitResolving(state, str) {
      var index, length, type;
      for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
        type = state.implicitTypes[index];
        if (type.resolve(str)) {
          return true;
        }
      }
      return false;
    }
    function isWhitespace(c) {
      return c === CHAR_SPACE || c === CHAR_TAB;
    }
    function isPrintable(c) {
      return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
    }
    function isPlainSafe(c) {
      return isPrintable(c) && c !== 65279 && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && c !== CHAR_SHARP;
    }
    function isPlainSafeFirst(c) {
      return isPrintable(c) && c !== 65279 && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
    }
    function needIndentIndicator(string) {
      var leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
      var i;
      var char;
      var hasLineBreak = false;
      var hasFoldableLine = false;
      var shouldTrackWidth = lineWidth !== -1;
      var previousLineBreak = -1;
      var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
      if (singleLineOnly) {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          plain = plain && isPlainSafe(char);
        }
      } else {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            if (shouldTrackWidth) {
              hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
              i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
              previousLineBreak = i;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          plain = plain && isPlainSafe(char);
        }
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
      }
      if (!hasLineBreak && !hasFoldableLine) {
        return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
      }
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    function writeScalar(state, string, level, iskey) {
      state.dump = function() {
        if (string.length === 0) {
          return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
          return "'" + string + "'";
        }
        var indent = state.indent * Math.max(1, level);
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string2) {
          return testImplicitResolving(state, string2);
        }
        switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
          case STYLE_FOLDED:
            return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
          case STYLE_DOUBLE:
            return '"' + escapeString(string, lineWidth) + '"';
          default:
            throw new YAMLException("impossible error: invalid scalar style");
        }
      }();
    }
    function blockHeader(string, indentPerLevel) {
      var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
      var clip = string[string.length - 1] === "\n";
      var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
      var chomp = keep ? "+" : clip ? "" : "-";
      return indentIndicator + chomp + "\n";
    }
    function dropEndingNewline(string) {
      return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    }
    function foldString(string, width) {
      var lineRe = /(\n+)([^\n]*)/g;
      var result = function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      }();
      var prevMoreIndented = string[0] === "\n" || string[0] === " ";
      var moreIndented;
      var match;
      while (match = lineRe.exec(string)) {
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
      return result;
    }
    function foldLine(line, width) {
      if (line === "" || line[0] === " ")
        return line;
      var breakRe = / [^ ]/g;
      var match;
      var start = 0, end, curr = 0, next = 0;
      var result = "";
      while (match = breakRe.exec(line)) {
        next = match.index;
        if (next - start > width) {
          end = curr > start ? curr : next;
          result += "\n" + line.slice(start, end);
          start = end + 1;
        }
        curr = next;
      }
      result += "\n";
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
      return result.slice(1);
    }
    function escapeString(string) {
      var result = "";
      var char, nextChar;
      var escapeSeq;
      for (var i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (char >= 55296 && char <= 56319) {
          nextChar = string.charCodeAt(i + 1);
          if (nextChar >= 56320 && nextChar <= 57343) {
            result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
            i++;
            continue;
          }
        }
        escapeSeq = ESCAPE_SEQUENCES[char];
        result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
      }
      return result;
    }
    function writeFlowSequence(state, level, object) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level, object[index], false, false)) {
          if (index !== 0)
            _result += "," + (!state.condenseFlow ? " " : "");
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = "[" + _result + "]";
    }
    function writeBlockSequence(state, level, object, compact) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level + 1, object[index], true, true)) {
          if (!compact || index !== 0) {
            _result += generateNextLine(state, level);
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += "-";
          } else {
            _result += "- ";
          }
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = _result || "[]";
    }
    function writeFlowMapping(state, level, object) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = state.condenseFlow ? '"' : "";
        if (index !== 0)
          pairBuffer += ", ";
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
          continue;
        }
        if (state.dump.length > 1024)
          pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
          continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = "{" + _result + "}";
    }
    function writeBlockMapping(state, level, object, compact) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
      if (state.sortKeys === true) {
        objectKeyList.sort();
      } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        throw new YAMLException("sortKeys must be a boolean or a function");
      }
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (!compact || index !== 0) {
          pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue;
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += "?";
          } else {
            pairBuffer += "? ";
          }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ":";
        } else {
          pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = _result || "{}";
    }
    function detectType(state, object, explicit) {
      var _result, typeList, index, length, type, style;
      typeList = explicit ? state.explicitTypes : state.implicitTypes;
      for (index = 0, length = typeList.length; index < length; index += 1) {
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
          state.tag = explicit ? type.tag : "?";
          if (type.represent) {
            style = state.styleMap[type.tag] || type.defaultStyle;
            if (_toString.call(type.represent) === "[object Function]") {
              _result = type.represent(object, style);
            } else if (_hasOwnProperty.call(type.represent, style)) {
              _result = type.represent[style](object, style);
            } else {
              throw new YAMLException("!<" + type.tag + '> tag resolver accepts not "' + style + '" style');
            }
            state.dump = _result;
          }
          return true;
        }
      }
      return false;
    }
    function writeNode(state, level, object, block, compact, iskey) {
      state.tag = null;
      state.dump = object;
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
      var type = _toString.call(state.dump);
      if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
      }
      var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
      if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
      }
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
      } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === "[object Object]") {
          if (block && Object.keys(state.dump).length !== 0) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object Array]") {
          var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
          if (block && state.dump.length !== 0) {
            writeBlockSequence(state, arrayLevel, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, arrayLevel, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object String]") {
          if (state.tag !== "?") {
            writeScalar(state, state.dump, level, iskey);
          }
        } else {
          if (state.skipInvalid)
            return false;
          throw new YAMLException("unacceptable kind of an object to dump " + type);
        }
        if (state.tag !== null && state.tag !== "?") {
          state.dump = "!<" + state.tag + "> " + state.dump;
        }
      }
      return true;
    }
    function getDuplicateReferences(object, state) {
      var objects = [], duplicatesIndexes = [], index, length;
      inspectNode(object, objects, duplicatesIndexes);
      for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
      }
      state.usedDuplicates = new Array(length);
    }
    function inspectNode(object, objects, duplicatesIndexes) {
      var objectKeyList, index, length;
      if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
          if (duplicatesIndexes.indexOf(index) === -1) {
            duplicatesIndexes.push(index);
          }
        } else {
          objects.push(object);
          if (Array.isArray(object)) {
            for (index = 0, length = object.length; index < length; index += 1) {
              inspectNode(object[index], objects, duplicatesIndexes);
            }
          } else {
            objectKeyList = Object.keys(object);
            for (index = 0, length = objectKeyList.length; index < length; index += 1) {
              inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
    function dump(input, options) {
      options = options || {};
      var state = new State(options);
      if (!state.noRefs)
        getDuplicateReferences(input, state);
      if (writeNode(state, 0, input, true, true))
        return state.dump + "\n";
      return "";
    }
    function safeDump(input, options) {
      return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
    }
    module2.exports.dump = dump;
    module2.exports.safeDump = safeDump;
  }
});

// node_modules/js-yaml/lib/js-yaml.js
var require_js_yaml = __commonJS({
  "node_modules/js-yaml/lib/js-yaml.js"(exports, module2) {
    "use strict";
    var loader = require_loader();
    var dumper = require_dumper();
    function deprecated(name) {
      return function() {
        throw new Error("Function " + name + " is deprecated and cannot be used.");
      };
    }
    module2.exports.Type = require_type();
    module2.exports.Schema = require_schema();
    module2.exports.FAILSAFE_SCHEMA = require_failsafe();
    module2.exports.JSON_SCHEMA = require_json();
    module2.exports.CORE_SCHEMA = require_core2();
    module2.exports.DEFAULT_SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_FULL_SCHEMA = require_default_full();
    module2.exports.load = loader.load;
    module2.exports.loadAll = loader.loadAll;
    module2.exports.safeLoad = loader.safeLoad;
    module2.exports.safeLoadAll = loader.safeLoadAll;
    module2.exports.dump = dumper.dump;
    module2.exports.safeDump = dumper.safeDump;
    module2.exports.YAMLException = require_exception();
    module2.exports.MINIMAL_SCHEMA = require_failsafe();
    module2.exports.SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_SCHEMA = require_default_full();
    module2.exports.scan = deprecated("scan");
    module2.exports.parse = deprecated("parse");
    module2.exports.compose = deprecated("compose");
    module2.exports.addConstructor = deprecated("addConstructor");
  }
});

// node_modules/js-yaml/index.js
var require_js_yaml2 = __commonJS({
  "node_modules/js-yaml/index.js"(exports, module2) {
    "use strict";
    var yaml2 = require_js_yaml();
    module2.exports = yaml2;
  }
});

// node_modules/yaml-front-matter/dist/yamlFront.js
var require_yamlFront = __commonJS({
  "node_modules/yaml-front-matter/dist/yamlFront.js"(exports, module2) {
    !function(e, t) {
      "object" == typeof exports && "object" == typeof module2 ? module2.exports = t(require_js_yaml2()) : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.yamlFront = t(require_js_yaml2()) : e.yamlFront = t(e.jsyaml);
    }(exports, function(e) {
      return function(e2) {
        var t = {};
        function n(o) {
          if (t[o])
            return t[o].exports;
          var r = t[o] = { i: o, l: false, exports: {} };
          return e2[o].call(r.exports, r, r.exports, n), r.l = true, r.exports;
        }
        return n.m = e2, n.c = t, n.d = function(e3, t2, o) {
          n.o(e3, t2) || Object.defineProperty(e3, t2, { enumerable: true, get: o });
        }, n.r = function(e3) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e3, "__esModule", { value: true });
        }, n.t = function(e3, t2) {
          if (1 & t2 && (e3 = n(e3)), 8 & t2)
            return e3;
          if (4 & t2 && "object" == typeof e3 && e3 && e3.__esModule)
            return e3;
          var o = /* @__PURE__ */ Object.create(null);
          if (n.r(o), Object.defineProperty(o, "default", { enumerable: true, value: e3 }), 2 & t2 && "string" != typeof e3)
            for (var r in e3)
              n.d(o, r, function(t3) {
                return e3[t3];
              }.bind(null, r));
          return o;
        }, n.n = function(e3) {
          var t2 = e3 && e3.__esModule ? function() {
            return e3.default;
          } : function() {
            return e3;
          };
          return n.d(t2, "a", t2), t2;
        }, n.o = function(e3, t2) {
          return Object.prototype.hasOwnProperty.call(e3, t2);
        }, n.p = "", n(n.s = 0);
      }([function(e2, t, n) {
        "use strict";
        function o(e3) {
          return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
            return typeof e4;
          } : function(e4) {
            return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
          })(e3);
        }
        n.r(t), n.d(t, "loadFront", function() {
          return f;
        }), n.d(t, "safeLoadFront", function() {
          return i;
        });
        var r = n(1);
        function u(e3, t2, n2) {
          var u2, f2 = t2 && "string" == typeof t2 ? t2 : t2 && t2.contentKeyName ? t2.contentKeyName : "__content", i2 = t2 && "object" === o(t2) ? t2 : void 0, c = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/.exec(e3), l = {};
          return (u2 = c[2]) && (l = "{" === u2.charAt(0) ? JSON.parse(u2) : n2 ? r.safeLoad(u2, i2) : r.load(u2, i2)), l[f2] = c[3] || "", l;
        }
        function f(e3, t2) {
          return u(e3, t2, false);
        }
        function i(e3, t2) {
          return u(e3, t2, true);
        }
      }, function(t, n) {
        t.exports = e;
      }]);
    });
  }
});

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports, module2) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject = function isPlainObject2(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    };
    module2.exports = function extend() {
      var options, name, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i < length; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// node_modules/bail/index.js
var require_bail = __commonJS({
  "node_modules/bail/index.js"(exports, module2) {
    "use strict";
    module2.exports = bail;
    function bail(err) {
      if (err) {
        throw err;
      }
    }
  }
});

// node_modules/unist-util-stringify-position/index.js
var require_unist_util_stringify_position = __commonJS({
  "node_modules/unist-util-stringify-position/index.js"(exports, module2) {
    "use strict";
    var own = {}.hasOwnProperty;
    module2.exports = stringify;
    function stringify(value) {
      if (!value || typeof value !== "object") {
        return "";
      }
      if (own.call(value, "position") || own.call(value, "type")) {
        return position(value.position);
      }
      if (own.call(value, "start") || own.call(value, "end")) {
        return position(value);
      }
      if (own.call(value, "line") || own.call(value, "column")) {
        return point(value);
      }
      return "";
    }
    function point(point2) {
      if (!point2 || typeof point2 !== "object") {
        point2 = {};
      }
      return index(point2.line) + ":" + index(point2.column);
    }
    function position(pos) {
      if (!pos || typeof pos !== "object") {
        pos = {};
      }
      return point(pos.start) + "-" + point(pos.end);
    }
    function index(value) {
      return value && typeof value === "number" ? value : 1;
    }
  }
});

// node_modules/vfile-message/index.js
var require_vfile_message = __commonJS({
  "node_modules/vfile-message/index.js"(exports, module2) {
    "use strict";
    var stringify = require_unist_util_stringify_position();
    module2.exports = VMessage;
    function VMessagePrototype() {
    }
    VMessagePrototype.prototype = Error.prototype;
    VMessage.prototype = new VMessagePrototype();
    var proto = VMessage.prototype;
    proto.file = "";
    proto.name = "";
    proto.reason = "";
    proto.message = "";
    proto.stack = "";
    proto.fatal = null;
    proto.column = null;
    proto.line = null;
    function VMessage(reason, position, origin) {
      var parts;
      var range;
      var location;
      if (typeof position === "string") {
        origin = position;
        position = null;
      }
      parts = parseOrigin(origin);
      range = stringify(position) || "1:1";
      location = {
        start: { line: null, column: null },
        end: { line: null, column: null }
      };
      if (position && position.position) {
        position = position.position;
      }
      if (position) {
        if (position.start) {
          location = position;
          position = position.start;
        } else {
          location.start = position;
        }
      }
      if (reason.stack) {
        this.stack = reason.stack;
        reason = reason.message;
      }
      this.message = reason;
      this.name = range;
      this.reason = reason;
      this.line = position ? position.line : null;
      this.column = position ? position.column : null;
      this.location = location;
      this.source = parts[0];
      this.ruleId = parts[1];
    }
    function parseOrigin(origin) {
      var result = [null, null];
      var index;
      if (typeof origin === "string") {
        index = origin.indexOf(":");
        if (index === -1) {
          result[1] = origin;
        } else {
          result[0] = origin.slice(0, index);
          result[1] = origin.slice(index + 1);
        }
      }
      return result;
    }
  }
});

// node_modules/replace-ext/index.js
var require_replace_ext = __commonJS({
  "node_modules/replace-ext/index.js"(exports, module2) {
    "use strict";
    var path = require("path");
    function replaceExt(npath, ext) {
      if (typeof npath !== "string") {
        return npath;
      }
      if (npath.length === 0) {
        return npath;
      }
      var nFileName = path.basename(npath, path.extname(npath)) + ext;
      return path.join(path.dirname(npath), nFileName);
    }
    module2.exports = replaceExt;
  }
});

// node_modules/vfile/node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/vfile/node_modules/is-buffer/index.js"(exports, module2) {
    module2.exports = function isBuffer(obj) {
      return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    };
  }
});

// node_modules/vfile/core.js
var require_core3 = __commonJS({
  "node_modules/vfile/core.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var replace = require_replace_ext();
    var buffer = require_is_buffer();
    module2.exports = VFile;
    var own = {}.hasOwnProperty;
    var proto = VFile.prototype;
    var order = ["history", "path", "basename", "stem", "extname", "dirname"];
    proto.toString = toString;
    Object.defineProperty(proto, "path", { get: getPath, set: setPath });
    Object.defineProperty(proto, "dirname", { get: getDirname, set: setDirname });
    Object.defineProperty(proto, "basename", { get: getBasename, set: setBasename });
    Object.defineProperty(proto, "extname", { get: getExtname, set: setExtname });
    Object.defineProperty(proto, "stem", { get: getStem, set: setStem });
    function VFile(options) {
      var prop;
      var index;
      var length;
      if (!options) {
        options = {};
      } else if (typeof options === "string" || buffer(options)) {
        options = { contents: options };
      } else if ("message" in options && "messages" in options) {
        return options;
      }
      if (!(this instanceof VFile)) {
        return new VFile(options);
      }
      this.data = {};
      this.messages = [];
      this.history = [];
      this.cwd = process.cwd();
      index = -1;
      length = order.length;
      while (++index < length) {
        prop = order[index];
        if (own.call(options, prop)) {
          this[prop] = options[prop];
        }
      }
      for (prop in options) {
        if (order.indexOf(prop) === -1) {
          this[prop] = options[prop];
        }
      }
    }
    function getPath() {
      return this.history[this.history.length - 1];
    }
    function setPath(path2) {
      assertNonEmpty(path2, "path");
      if (path2 !== this.path) {
        this.history.push(path2);
      }
    }
    function getDirname() {
      return typeof this.path === "string" ? path.dirname(this.path) : void 0;
    }
    function setDirname(dirname) {
      assertPath(this.path, "dirname");
      this.path = path.join(dirname || "", this.basename);
    }
    function getBasename() {
      return typeof this.path === "string" ? path.basename(this.path) : void 0;
    }
    function setBasename(basename) {
      assertNonEmpty(basename, "basename");
      assertPart(basename, "basename");
      this.path = path.join(this.dirname || "", basename);
    }
    function getExtname() {
      return typeof this.path === "string" ? path.extname(this.path) : void 0;
    }
    function setExtname(extname) {
      var ext = extname || "";
      assertPart(ext, "extname");
      assertPath(this.path, "extname");
      if (ext) {
        if (ext.charAt(0) !== ".") {
          throw new Error("`extname` must start with `.`");
        }
        if (ext.indexOf(".", 1) !== -1) {
          throw new Error("`extname` cannot contain multiple dots");
        }
      }
      this.path = replace(this.path, ext);
    }
    function getStem() {
      return typeof this.path === "string" ? path.basename(this.path, this.extname) : void 0;
    }
    function setStem(stem) {
      assertNonEmpty(stem, "stem");
      assertPart(stem, "stem");
      this.path = path.join(this.dirname || "", stem + (this.extname || ""));
    }
    function toString(encoding) {
      var value = this.contents || "";
      return buffer(value) ? value.toString(encoding) : String(value);
    }
    function assertPart(part, name) {
      if (part.indexOf(path.sep) !== -1) {
        throw new Error(
          "`" + name + "` cannot be a path: did not expect `" + path.sep + "`"
        );
      }
    }
    function assertNonEmpty(part, name) {
      if (!part) {
        throw new Error("`" + name + "` cannot be empty");
      }
    }
    function assertPath(path2, name) {
      if (!path2) {
        throw new Error("Setting `" + name + "` requires `path` to be set too");
      }
    }
  }
});

// node_modules/vfile/index.js
var require_vfile = __commonJS({
  "node_modules/vfile/index.js"(exports, module2) {
    "use strict";
    var VMessage = require_vfile_message();
    var VFile = require_core3();
    module2.exports = VFile;
    var proto = VFile.prototype;
    proto.message = message;
    proto.info = info;
    proto.fail = fail;
    function message(reason, position, origin) {
      var filePath = this.path;
      var message2 = new VMessage(reason, position, origin);
      if (filePath) {
        message2.name = filePath + ":" + message2.name;
        message2.file = filePath;
      }
      message2.fatal = false;
      this.messages.push(message2);
      return message2;
    }
    function fail() {
      var message2 = this.message.apply(this, arguments);
      message2.fatal = true;
      throw message2;
    }
    function info() {
      var message2 = this.message.apply(this, arguments);
      message2.fatal = null;
      return message2;
    }
  }
});

// node_modules/trough/wrap.js
var require_wrap = __commonJS({
  "node_modules/trough/wrap.js"(exports, module2) {
    "use strict";
    var slice = [].slice;
    module2.exports = wrap;
    function wrap(fn, callback) {
      var invoked;
      return wrapped;
      function wrapped() {
        var params = slice.call(arguments, 0);
        var callback2 = fn.length > params.length;
        var result;
        if (callback2) {
          params.push(done);
        }
        try {
          result = fn.apply(null, params);
        } catch (error3) {
          if (callback2 && invoked) {
            throw error3;
          }
          return done(error3);
        }
        if (!callback2) {
          if (result && typeof result.then === "function") {
            result.then(then, done);
          } else if (result instanceof Error) {
            done(result);
          } else {
            then(result);
          }
        }
      }
      function done() {
        if (!invoked) {
          invoked = true;
          callback.apply(null, arguments);
        }
      }
      function then(value) {
        done(null, value);
      }
    }
  }
});

// node_modules/trough/index.js
var require_trough = __commonJS({
  "node_modules/trough/index.js"(exports, module2) {
    "use strict";
    var wrap = require_wrap();
    module2.exports = trough;
    trough.wrap = wrap;
    var slice = [].slice;
    function trough() {
      var fns = [];
      var middleware = {};
      middleware.run = run2;
      middleware.use = use;
      return middleware;
      function run2() {
        var index = -1;
        var input = slice.call(arguments, 0, -1);
        var done = arguments[arguments.length - 1];
        if (typeof done !== "function") {
          throw new Error("Expected function as last argument, not " + done);
        }
        next.apply(null, [null].concat(input));
        function next(err) {
          var fn = fns[++index];
          var params = slice.call(arguments, 0);
          var values = params.slice(1);
          var length = input.length;
          var pos = -1;
          if (err) {
            done(err);
            return;
          }
          while (++pos < length) {
            if (values[pos] === null || values[pos] === void 0) {
              values[pos] = input[pos];
            }
          }
          input = values;
          if (fn) {
            wrap(fn, next).apply(null, input);
          } else {
            done.apply(null, [null].concat(input));
          }
        }
      }
      function use(fn) {
        if (typeof fn !== "function") {
          throw new Error("Expected `fn` to be a function, not " + fn);
        }
        fns.push(fn);
        return middleware;
      }
    }
  }
});

// node_modules/is-plain-obj/index.js
var require_is_plain_obj = __commonJS({
  "node_modules/is-plain-obj/index.js"(exports, module2) {
    "use strict";
    module2.exports = (value) => {
      if (Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
      }
      const prototype = Object.getPrototypeOf(value);
      return prototype === null || prototype === Object.prototype;
    };
  }
});

// node_modules/unified/index.js
var require_unified = __commonJS({
  "node_modules/unified/index.js"(exports, module2) {
    "use strict";
    var extend = require_extend();
    var bail = require_bail();
    var vfile = require_vfile();
    var trough = require_trough();
    var plain = require_is_plain_obj();
    module2.exports = unified().freeze();
    var slice = [].slice;
    var own = {}.hasOwnProperty;
    var pipeline = trough().use(pipelineParse).use(pipelineRun).use(pipelineStringify);
    function pipelineParse(p, ctx) {
      ctx.tree = p.parse(ctx.file);
    }
    function pipelineRun(p, ctx, next) {
      p.run(ctx.tree, ctx.file, done);
      function done(err, tree, file) {
        if (err) {
          next(err);
        } else {
          ctx.tree = tree;
          ctx.file = file;
          next();
        }
      }
    }
    function pipelineStringify(p, ctx) {
      ctx.file.contents = p.stringify(ctx.tree, ctx.file);
    }
    function unified() {
      var attachers = [];
      var transformers = trough();
      var namespace = {};
      var frozen = false;
      var freezeIndex = -1;
      processor.data = data;
      processor.freeze = freeze;
      processor.attachers = attachers;
      processor.use = use;
      processor.parse = parse;
      processor.stringify = stringify;
      processor.run = run2;
      processor.runSync = runSync;
      processor.process = process3;
      processor.processSync = processSync;
      return processor;
      function processor() {
        var destination = unified();
        var length = attachers.length;
        var index = -1;
        while (++index < length) {
          destination.use.apply(null, attachers[index]);
        }
        destination.data(extend(true, {}, namespace));
        return destination;
      }
      function freeze() {
        var values;
        var plugin;
        var options;
        var transformer;
        if (frozen) {
          return processor;
        }
        while (++freezeIndex < attachers.length) {
          values = attachers[freezeIndex];
          plugin = values[0];
          options = values[1];
          transformer = null;
          if (options === false) {
            continue;
          }
          if (options === true) {
            values[1] = void 0;
          }
          transformer = plugin.apply(processor, values.slice(1));
          if (typeof transformer === "function") {
            transformers.use(transformer);
          }
        }
        frozen = true;
        freezeIndex = Infinity;
        return processor;
      }
      function data(key, value) {
        if (typeof key === "string") {
          if (arguments.length === 2) {
            assertUnfrozen("data", frozen);
            namespace[key] = value;
            return processor;
          }
          return own.call(namespace, key) && namespace[key] || null;
        }
        if (key) {
          assertUnfrozen("data", frozen);
          namespace = key;
          return processor;
        }
        return namespace;
      }
      function use(value) {
        var settings;
        assertUnfrozen("use", frozen);
        if (value === null || value === void 0) {
        } else if (typeof value === "function") {
          addPlugin.apply(null, arguments);
        } else if (typeof value === "object") {
          if ("length" in value) {
            addList(value);
          } else {
            addPreset(value);
          }
        } else {
          throw new Error("Expected usable value, not `" + value + "`");
        }
        if (settings) {
          namespace.settings = extend(namespace.settings || {}, settings);
        }
        return processor;
        function addPreset(result) {
          addList(result.plugins);
          if (result.settings) {
            settings = extend(settings || {}, result.settings);
          }
        }
        function add(value2) {
          if (typeof value2 === "function") {
            addPlugin(value2);
          } else if (typeof value2 === "object") {
            if ("length" in value2) {
              addPlugin.apply(null, value2);
            } else {
              addPreset(value2);
            }
          } else {
            throw new Error("Expected usable value, not `" + value2 + "`");
          }
        }
        function addList(plugins) {
          var length;
          var index;
          if (plugins === null || plugins === void 0) {
          } else if (typeof plugins === "object" && "length" in plugins) {
            length = plugins.length;
            index = -1;
            while (++index < length) {
              add(plugins[index]);
            }
          } else {
            throw new Error("Expected a list of plugins, not `" + plugins + "`");
          }
        }
        function addPlugin(plugin, value2) {
          var entry = find2(plugin);
          if (entry) {
            if (plain(entry[1]) && plain(value2)) {
              value2 = extend(entry[1], value2);
            }
            entry[1] = value2;
          } else {
            attachers.push(slice.call(arguments));
          }
        }
      }
      function find2(plugin) {
        var length = attachers.length;
        var index = -1;
        var entry;
        while (++index < length) {
          entry = attachers[index];
          if (entry[0] === plugin) {
            return entry;
          }
        }
      }
      function parse(doc) {
        var file = vfile(doc);
        var Parser;
        freeze();
        Parser = processor.Parser;
        assertParser("parse", Parser);
        if (newable(Parser, "parse")) {
          return new Parser(String(file), file).parse();
        }
        return Parser(String(file), file);
      }
      function run2(node, file, cb) {
        assertNode(node);
        freeze();
        if (!cb && typeof file === "function") {
          cb = file;
          file = null;
        }
        if (!cb) {
          return new Promise(executor);
        }
        executor(null, cb);
        function executor(resolve, reject) {
          transformers.run(node, vfile(file), done);
          function done(err, tree, file2) {
            tree = tree || node;
            if (err) {
              reject(err);
            } else if (resolve) {
              resolve(tree);
            } else {
              cb(null, tree, file2);
            }
          }
        }
      }
      function runSync(node, file) {
        var complete = false;
        var result;
        run2(node, file, done);
        assertDone("runSync", "run", complete);
        return result;
        function done(err, tree) {
          complete = true;
          bail(err);
          result = tree;
        }
      }
      function stringify(node, doc) {
        var file = vfile(doc);
        var Compiler;
        freeze();
        Compiler = processor.Compiler;
        assertCompiler("stringify", Compiler);
        assertNode(node);
        if (newable(Compiler, "compile")) {
          return new Compiler(node, file).compile();
        }
        return Compiler(node, file);
      }
      function process3(doc, cb) {
        freeze();
        assertParser("process", processor.Parser);
        assertCompiler("process", processor.Compiler);
        if (!cb) {
          return new Promise(executor);
        }
        executor(null, cb);
        function executor(resolve, reject) {
          var file = vfile(doc);
          pipeline.run(processor, { file }, done);
          function done(err) {
            if (err) {
              reject(err);
            } else if (resolve) {
              resolve(file);
            } else {
              cb(null, file);
            }
          }
        }
      }
      function processSync(doc) {
        var complete = false;
        var file;
        freeze();
        assertParser("processSync", processor.Parser);
        assertCompiler("processSync", processor.Compiler);
        file = vfile(doc);
        process3(file, done);
        assertDone("processSync", "process", complete);
        return file;
        function done(err) {
          complete = true;
          bail(err);
        }
      }
    }
    function newable(value, name) {
      return typeof value === "function" && value.prototype && // A function with keys in its prototype is probably a constructor.
      // Classes’ prototype methods are not enumerable, so we check if some value
      // exists in the prototype.
      (keys(value.prototype) || name in value.prototype);
    }
    function keys(value) {
      var key;
      for (key in value) {
        return true;
      }
      return false;
    }
    function assertParser(name, Parser) {
      if (typeof Parser !== "function") {
        throw new Error("Cannot `" + name + "` without `Parser`");
      }
    }
    function assertCompiler(name, Compiler) {
      if (typeof Compiler !== "function") {
        throw new Error("Cannot `" + name + "` without `Compiler`");
      }
    }
    function assertUnfrozen(name, frozen) {
      if (frozen) {
        throw new Error(
          "Cannot invoke `" + name + "` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`."
        );
      }
    }
    function assertNode(node) {
      if (!node || typeof node.type !== "string") {
        throw new Error("Expected node, got `" + node + "`");
      }
    }
    function assertDone(name, asyncName, complete) {
      if (!complete) {
        throw new Error(
          "`" + name + "` finished async. Use `" + asyncName + "` instead"
        );
      }
    }
  }
});

// node_modules/xtend/immutable.js
var require_immutable = __commonJS({
  "node_modules/xtend/immutable.js"(exports, module2) {
    module2.exports = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend() {
      var target = {};
      for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
  }
});

// node_modules/unherit/index.js
var require_unherit = __commonJS({
  "node_modules/unherit/index.js"(exports, module2) {
    "use strict";
    var xtend = require_immutable();
    var inherits = require_inherits();
    module2.exports = unherit;
    function unherit(Super) {
      var result;
      var key;
      var value;
      inherits(Of, Super);
      inherits(From, Of);
      result = Of.prototype;
      for (key in result) {
        value = result[key];
        if (value && typeof value === "object") {
          result[key] = "concat" in value ? value.concat() : xtend(value);
        }
      }
      return Of;
      function From(parameters) {
        return Super.apply(this, parameters);
      }
      function Of() {
        if (!(this instanceof Of)) {
          return new From(arguments);
        }
        return Super.apply(this, arguments);
      }
    }
  }
});

// node_modules/state-toggle/index.js
var require_state_toggle = __commonJS({
  "node_modules/state-toggle/index.js"(exports, module2) {
    "use strict";
    module2.exports = factory;
    function factory(key, state, ctx) {
      return enter;
      function enter() {
        var context = ctx || this;
        var current = context[key];
        context[key] = !state;
        return exit;
        function exit() {
          context[key] = current;
        }
      }
    }
  }
});

// node_modules/vfile-location/index.js
var require_vfile_location = __commonJS({
  "node_modules/vfile-location/index.js"(exports, module2) {
    "use strict";
    module2.exports = factory;
    function factory(file) {
      var contents = indices(String(file));
      return {
        toPosition: offsetToPositionFactory(contents),
        toOffset: positionToOffsetFactory(contents)
      };
    }
    function offsetToPositionFactory(indices2) {
      return offsetToPosition;
      function offsetToPosition(offset) {
        var index = -1;
        var length = indices2.length;
        if (offset < 0) {
          return {};
        }
        while (++index < length) {
          if (indices2[index] > offset) {
            return {
              line: index + 1,
              column: offset - (indices2[index - 1] || 0) + 1,
              offset
            };
          }
        }
        return {};
      }
    }
    function positionToOffsetFactory(indices2) {
      return positionToOffset;
      function positionToOffset(position) {
        var line = position && position.line;
        var column = position && position.column;
        if (!isNaN(line) && !isNaN(column) && line - 1 in indices2) {
          return (indices2[line - 2] || 0) + column - 1 || 0;
        }
        return -1;
      }
    }
    function indices(value) {
      var result = [];
      var index = value.indexOf("\n");
      while (index !== -1) {
        result.push(index + 1);
        index = value.indexOf("\n", index + 1);
      }
      result.push(value.length + 1);
      return result;
    }
  }
});

// node_modules/remark-parse/lib/unescape.js
var require_unescape = __commonJS({
  "node_modules/remark-parse/lib/unescape.js"(exports, module2) {
    "use strict";
    module2.exports = factory;
    var backslash = "\\";
    function factory(ctx, key) {
      return unescape;
      function unescape(value) {
        var prev = 0;
        var index = value.indexOf(backslash);
        var escape = ctx[key];
        var queue = [];
        var character;
        while (index !== -1) {
          queue.push(value.slice(prev, index));
          prev = index + 1;
          character = value.charAt(prev);
          if (!character || escape.indexOf(character) === -1) {
            queue.push(backslash);
          }
          index = value.indexOf(backslash, prev + 1);
        }
        queue.push(value.slice(prev));
        return queue.join("");
      }
    }
  }
});

// node_modules/character-entities-legacy/index.json
var require_character_entities_legacy = __commonJS({
  "node_modules/character-entities-legacy/index.json"(exports, module2) {
    module2.exports = {
      AElig: "\xC6",
      AMP: "&",
      Aacute: "\xC1",
      Acirc: "\xC2",
      Agrave: "\xC0",
      Aring: "\xC5",
      Atilde: "\xC3",
      Auml: "\xC4",
      COPY: "\xA9",
      Ccedil: "\xC7",
      ETH: "\xD0",
      Eacute: "\xC9",
      Ecirc: "\xCA",
      Egrave: "\xC8",
      Euml: "\xCB",
      GT: ">",
      Iacute: "\xCD",
      Icirc: "\xCE",
      Igrave: "\xCC",
      Iuml: "\xCF",
      LT: "<",
      Ntilde: "\xD1",
      Oacute: "\xD3",
      Ocirc: "\xD4",
      Ograve: "\xD2",
      Oslash: "\xD8",
      Otilde: "\xD5",
      Ouml: "\xD6",
      QUOT: '"',
      REG: "\xAE",
      THORN: "\xDE",
      Uacute: "\xDA",
      Ucirc: "\xDB",
      Ugrave: "\xD9",
      Uuml: "\xDC",
      Yacute: "\xDD",
      aacute: "\xE1",
      acirc: "\xE2",
      acute: "\xB4",
      aelig: "\xE6",
      agrave: "\xE0",
      amp: "&",
      aring: "\xE5",
      atilde: "\xE3",
      auml: "\xE4",
      brvbar: "\xA6",
      ccedil: "\xE7",
      cedil: "\xB8",
      cent: "\xA2",
      copy: "\xA9",
      curren: "\xA4",
      deg: "\xB0",
      divide: "\xF7",
      eacute: "\xE9",
      ecirc: "\xEA",
      egrave: "\xE8",
      eth: "\xF0",
      euml: "\xEB",
      frac12: "\xBD",
      frac14: "\xBC",
      frac34: "\xBE",
      gt: ">",
      iacute: "\xED",
      icirc: "\xEE",
      iexcl: "\xA1",
      igrave: "\xEC",
      iquest: "\xBF",
      iuml: "\xEF",
      laquo: "\xAB",
      lt: "<",
      macr: "\xAF",
      micro: "\xB5",
      middot: "\xB7",
      nbsp: "\xA0",
      not: "\xAC",
      ntilde: "\xF1",
      oacute: "\xF3",
      ocirc: "\xF4",
      ograve: "\xF2",
      ordf: "\xAA",
      ordm: "\xBA",
      oslash: "\xF8",
      otilde: "\xF5",
      ouml: "\xF6",
      para: "\xB6",
      plusmn: "\xB1",
      pound: "\xA3",
      quot: '"',
      raquo: "\xBB",
      reg: "\xAE",
      sect: "\xA7",
      shy: "\xAD",
      sup1: "\xB9",
      sup2: "\xB2",
      sup3: "\xB3",
      szlig: "\xDF",
      thorn: "\xFE",
      times: "\xD7",
      uacute: "\xFA",
      ucirc: "\xFB",
      ugrave: "\xF9",
      uml: "\xA8",
      uuml: "\xFC",
      yacute: "\xFD",
      yen: "\xA5",
      yuml: "\xFF"
    };
  }
});

// node_modules/character-reference-invalid/index.json
var require_character_reference_invalid = __commonJS({
  "node_modules/character-reference-invalid/index.json"(exports, module2) {
    module2.exports = {
      "0": "\uFFFD",
      "128": "\u20AC",
      "130": "\u201A",
      "131": "\u0192",
      "132": "\u201E",
      "133": "\u2026",
      "134": "\u2020",
      "135": "\u2021",
      "136": "\u02C6",
      "137": "\u2030",
      "138": "\u0160",
      "139": "\u2039",
      "140": "\u0152",
      "142": "\u017D",
      "145": "\u2018",
      "146": "\u2019",
      "147": "\u201C",
      "148": "\u201D",
      "149": "\u2022",
      "150": "\u2013",
      "151": "\u2014",
      "152": "\u02DC",
      "153": "\u2122",
      "154": "\u0161",
      "155": "\u203A",
      "156": "\u0153",
      "158": "\u017E",
      "159": "\u0178"
    };
  }
});

// node_modules/is-decimal/index.js
var require_is_decimal = __commonJS({
  "node_modules/is-decimal/index.js"(exports, module2) {
    "use strict";
    module2.exports = decimal;
    function decimal(character) {
      var code = typeof character === "string" ? character.charCodeAt(0) : character;
      return code >= 48 && code <= 57;
    }
  }
});

// node_modules/is-hexadecimal/index.js
var require_is_hexadecimal = __commonJS({
  "node_modules/is-hexadecimal/index.js"(exports, module2) {
    "use strict";
    module2.exports = hexadecimal;
    function hexadecimal(character) {
      var code = typeof character === "string" ? character.charCodeAt(0) : character;
      return code >= 97 && code <= 102 || code >= 65 && code <= 70 || code >= 48 && code <= 57;
    }
  }
});

// node_modules/is-alphabetical/index.js
var require_is_alphabetical = __commonJS({
  "node_modules/is-alphabetical/index.js"(exports, module2) {
    "use strict";
    module2.exports = alphabetical;
    function alphabetical(character) {
      var code = typeof character === "string" ? character.charCodeAt(0) : character;
      return code >= 97 && code <= 122 || code >= 65 && code <= 90;
    }
  }
});

// node_modules/is-alphanumerical/index.js
var require_is_alphanumerical = __commonJS({
  "node_modules/is-alphanumerical/index.js"(exports, module2) {
    "use strict";
    var alphabetical = require_is_alphabetical();
    var decimal = require_is_decimal();
    module2.exports = alphanumerical;
    function alphanumerical(character) {
      return alphabetical(character) || decimal(character);
    }
  }
});

// node_modules/character-entities/index.json
var require_character_entities = __commonJS({
  "node_modules/character-entities/index.json"(exports, module2) {
    module2.exports = {
      AEli: "\xC6",
      AElig: "\xC6",
      AM: "&",
      AMP: "&",
      Aacut: "\xC1",
      Aacute: "\xC1",
      Abreve: "\u0102",
      Acir: "\xC2",
      Acirc: "\xC2",
      Acy: "\u0410",
      Afr: "\u{1D504}",
      Agrav: "\xC0",
      Agrave: "\xC0",
      Alpha: "\u0391",
      Amacr: "\u0100",
      And: "\u2A53",
      Aogon: "\u0104",
      Aopf: "\u{1D538}",
      ApplyFunction: "\u2061",
      Arin: "\xC5",
      Aring: "\xC5",
      Ascr: "\u{1D49C}",
      Assign: "\u2254",
      Atild: "\xC3",
      Atilde: "\xC3",
      Aum: "\xC4",
      Auml: "\xC4",
      Backslash: "\u2216",
      Barv: "\u2AE7",
      Barwed: "\u2306",
      Bcy: "\u0411",
      Because: "\u2235",
      Bernoullis: "\u212C",
      Beta: "\u0392",
      Bfr: "\u{1D505}",
      Bopf: "\u{1D539}",
      Breve: "\u02D8",
      Bscr: "\u212C",
      Bumpeq: "\u224E",
      CHcy: "\u0427",
      COP: "\xA9",
      COPY: "\xA9",
      Cacute: "\u0106",
      Cap: "\u22D2",
      CapitalDifferentialD: "\u2145",
      Cayleys: "\u212D",
      Ccaron: "\u010C",
      Ccedi: "\xC7",
      Ccedil: "\xC7",
      Ccirc: "\u0108",
      Cconint: "\u2230",
      Cdot: "\u010A",
      Cedilla: "\xB8",
      CenterDot: "\xB7",
      Cfr: "\u212D",
      Chi: "\u03A7",
      CircleDot: "\u2299",
      CircleMinus: "\u2296",
      CirclePlus: "\u2295",
      CircleTimes: "\u2297",
      ClockwiseContourIntegral: "\u2232",
      CloseCurlyDoubleQuote: "\u201D",
      CloseCurlyQuote: "\u2019",
      Colon: "\u2237",
      Colone: "\u2A74",
      Congruent: "\u2261",
      Conint: "\u222F",
      ContourIntegral: "\u222E",
      Copf: "\u2102",
      Coproduct: "\u2210",
      CounterClockwiseContourIntegral: "\u2233",
      Cross: "\u2A2F",
      Cscr: "\u{1D49E}",
      Cup: "\u22D3",
      CupCap: "\u224D",
      DD: "\u2145",
      DDotrahd: "\u2911",
      DJcy: "\u0402",
      DScy: "\u0405",
      DZcy: "\u040F",
      Dagger: "\u2021",
      Darr: "\u21A1",
      Dashv: "\u2AE4",
      Dcaron: "\u010E",
      Dcy: "\u0414",
      Del: "\u2207",
      Delta: "\u0394",
      Dfr: "\u{1D507}",
      DiacriticalAcute: "\xB4",
      DiacriticalDot: "\u02D9",
      DiacriticalDoubleAcute: "\u02DD",
      DiacriticalGrave: "`",
      DiacriticalTilde: "\u02DC",
      Diamond: "\u22C4",
      DifferentialD: "\u2146",
      Dopf: "\u{1D53B}",
      Dot: "\xA8",
      DotDot: "\u20DC",
      DotEqual: "\u2250",
      DoubleContourIntegral: "\u222F",
      DoubleDot: "\xA8",
      DoubleDownArrow: "\u21D3",
      DoubleLeftArrow: "\u21D0",
      DoubleLeftRightArrow: "\u21D4",
      DoubleLeftTee: "\u2AE4",
      DoubleLongLeftArrow: "\u27F8",
      DoubleLongLeftRightArrow: "\u27FA",
      DoubleLongRightArrow: "\u27F9",
      DoubleRightArrow: "\u21D2",
      DoubleRightTee: "\u22A8",
      DoubleUpArrow: "\u21D1",
      DoubleUpDownArrow: "\u21D5",
      DoubleVerticalBar: "\u2225",
      DownArrow: "\u2193",
      DownArrowBar: "\u2913",
      DownArrowUpArrow: "\u21F5",
      DownBreve: "\u0311",
      DownLeftRightVector: "\u2950",
      DownLeftTeeVector: "\u295E",
      DownLeftVector: "\u21BD",
      DownLeftVectorBar: "\u2956",
      DownRightTeeVector: "\u295F",
      DownRightVector: "\u21C1",
      DownRightVectorBar: "\u2957",
      DownTee: "\u22A4",
      DownTeeArrow: "\u21A7",
      Downarrow: "\u21D3",
      Dscr: "\u{1D49F}",
      Dstrok: "\u0110",
      ENG: "\u014A",
      ET: "\xD0",
      ETH: "\xD0",
      Eacut: "\xC9",
      Eacute: "\xC9",
      Ecaron: "\u011A",
      Ecir: "\xCA",
      Ecirc: "\xCA",
      Ecy: "\u042D",
      Edot: "\u0116",
      Efr: "\u{1D508}",
      Egrav: "\xC8",
      Egrave: "\xC8",
      Element: "\u2208",
      Emacr: "\u0112",
      EmptySmallSquare: "\u25FB",
      EmptyVerySmallSquare: "\u25AB",
      Eogon: "\u0118",
      Eopf: "\u{1D53C}",
      Epsilon: "\u0395",
      Equal: "\u2A75",
      EqualTilde: "\u2242",
      Equilibrium: "\u21CC",
      Escr: "\u2130",
      Esim: "\u2A73",
      Eta: "\u0397",
      Eum: "\xCB",
      Euml: "\xCB",
      Exists: "\u2203",
      ExponentialE: "\u2147",
      Fcy: "\u0424",
      Ffr: "\u{1D509}",
      FilledSmallSquare: "\u25FC",
      FilledVerySmallSquare: "\u25AA",
      Fopf: "\u{1D53D}",
      ForAll: "\u2200",
      Fouriertrf: "\u2131",
      Fscr: "\u2131",
      GJcy: "\u0403",
      G: ">",
      GT: ">",
      Gamma: "\u0393",
      Gammad: "\u03DC",
      Gbreve: "\u011E",
      Gcedil: "\u0122",
      Gcirc: "\u011C",
      Gcy: "\u0413",
      Gdot: "\u0120",
      Gfr: "\u{1D50A}",
      Gg: "\u22D9",
      Gopf: "\u{1D53E}",
      GreaterEqual: "\u2265",
      GreaterEqualLess: "\u22DB",
      GreaterFullEqual: "\u2267",
      GreaterGreater: "\u2AA2",
      GreaterLess: "\u2277",
      GreaterSlantEqual: "\u2A7E",
      GreaterTilde: "\u2273",
      Gscr: "\u{1D4A2}",
      Gt: "\u226B",
      HARDcy: "\u042A",
      Hacek: "\u02C7",
      Hat: "^",
      Hcirc: "\u0124",
      Hfr: "\u210C",
      HilbertSpace: "\u210B",
      Hopf: "\u210D",
      HorizontalLine: "\u2500",
      Hscr: "\u210B",
      Hstrok: "\u0126",
      HumpDownHump: "\u224E",
      HumpEqual: "\u224F",
      IEcy: "\u0415",
      IJlig: "\u0132",
      IOcy: "\u0401",
      Iacut: "\xCD",
      Iacute: "\xCD",
      Icir: "\xCE",
      Icirc: "\xCE",
      Icy: "\u0418",
      Idot: "\u0130",
      Ifr: "\u2111",
      Igrav: "\xCC",
      Igrave: "\xCC",
      Im: "\u2111",
      Imacr: "\u012A",
      ImaginaryI: "\u2148",
      Implies: "\u21D2",
      Int: "\u222C",
      Integral: "\u222B",
      Intersection: "\u22C2",
      InvisibleComma: "\u2063",
      InvisibleTimes: "\u2062",
      Iogon: "\u012E",
      Iopf: "\u{1D540}",
      Iota: "\u0399",
      Iscr: "\u2110",
      Itilde: "\u0128",
      Iukcy: "\u0406",
      Ium: "\xCF",
      Iuml: "\xCF",
      Jcirc: "\u0134",
      Jcy: "\u0419",
      Jfr: "\u{1D50D}",
      Jopf: "\u{1D541}",
      Jscr: "\u{1D4A5}",
      Jsercy: "\u0408",
      Jukcy: "\u0404",
      KHcy: "\u0425",
      KJcy: "\u040C",
      Kappa: "\u039A",
      Kcedil: "\u0136",
      Kcy: "\u041A",
      Kfr: "\u{1D50E}",
      Kopf: "\u{1D542}",
      Kscr: "\u{1D4A6}",
      LJcy: "\u0409",
      L: "<",
      LT: "<",
      Lacute: "\u0139",
      Lambda: "\u039B",
      Lang: "\u27EA",
      Laplacetrf: "\u2112",
      Larr: "\u219E",
      Lcaron: "\u013D",
      Lcedil: "\u013B",
      Lcy: "\u041B",
      LeftAngleBracket: "\u27E8",
      LeftArrow: "\u2190",
      LeftArrowBar: "\u21E4",
      LeftArrowRightArrow: "\u21C6",
      LeftCeiling: "\u2308",
      LeftDoubleBracket: "\u27E6",
      LeftDownTeeVector: "\u2961",
      LeftDownVector: "\u21C3",
      LeftDownVectorBar: "\u2959",
      LeftFloor: "\u230A",
      LeftRightArrow: "\u2194",
      LeftRightVector: "\u294E",
      LeftTee: "\u22A3",
      LeftTeeArrow: "\u21A4",
      LeftTeeVector: "\u295A",
      LeftTriangle: "\u22B2",
      LeftTriangleBar: "\u29CF",
      LeftTriangleEqual: "\u22B4",
      LeftUpDownVector: "\u2951",
      LeftUpTeeVector: "\u2960",
      LeftUpVector: "\u21BF",
      LeftUpVectorBar: "\u2958",
      LeftVector: "\u21BC",
      LeftVectorBar: "\u2952",
      Leftarrow: "\u21D0",
      Leftrightarrow: "\u21D4",
      LessEqualGreater: "\u22DA",
      LessFullEqual: "\u2266",
      LessGreater: "\u2276",
      LessLess: "\u2AA1",
      LessSlantEqual: "\u2A7D",
      LessTilde: "\u2272",
      Lfr: "\u{1D50F}",
      Ll: "\u22D8",
      Lleftarrow: "\u21DA",
      Lmidot: "\u013F",
      LongLeftArrow: "\u27F5",
      LongLeftRightArrow: "\u27F7",
      LongRightArrow: "\u27F6",
      Longleftarrow: "\u27F8",
      Longleftrightarrow: "\u27FA",
      Longrightarrow: "\u27F9",
      Lopf: "\u{1D543}",
      LowerLeftArrow: "\u2199",
      LowerRightArrow: "\u2198",
      Lscr: "\u2112",
      Lsh: "\u21B0",
      Lstrok: "\u0141",
      Lt: "\u226A",
      Map: "\u2905",
      Mcy: "\u041C",
      MediumSpace: "\u205F",
      Mellintrf: "\u2133",
      Mfr: "\u{1D510}",
      MinusPlus: "\u2213",
      Mopf: "\u{1D544}",
      Mscr: "\u2133",
      Mu: "\u039C",
      NJcy: "\u040A",
      Nacute: "\u0143",
      Ncaron: "\u0147",
      Ncedil: "\u0145",
      Ncy: "\u041D",
      NegativeMediumSpace: "\u200B",
      NegativeThickSpace: "\u200B",
      NegativeThinSpace: "\u200B",
      NegativeVeryThinSpace: "\u200B",
      NestedGreaterGreater: "\u226B",
      NestedLessLess: "\u226A",
      NewLine: "\n",
      Nfr: "\u{1D511}",
      NoBreak: "\u2060",
      NonBreakingSpace: "\xA0",
      Nopf: "\u2115",
      Not: "\u2AEC",
      NotCongruent: "\u2262",
      NotCupCap: "\u226D",
      NotDoubleVerticalBar: "\u2226",
      NotElement: "\u2209",
      NotEqual: "\u2260",
      NotEqualTilde: "\u2242\u0338",
      NotExists: "\u2204",
      NotGreater: "\u226F",
      NotGreaterEqual: "\u2271",
      NotGreaterFullEqual: "\u2267\u0338",
      NotGreaterGreater: "\u226B\u0338",
      NotGreaterLess: "\u2279",
      NotGreaterSlantEqual: "\u2A7E\u0338",
      NotGreaterTilde: "\u2275",
      NotHumpDownHump: "\u224E\u0338",
      NotHumpEqual: "\u224F\u0338",
      NotLeftTriangle: "\u22EA",
      NotLeftTriangleBar: "\u29CF\u0338",
      NotLeftTriangleEqual: "\u22EC",
      NotLess: "\u226E",
      NotLessEqual: "\u2270",
      NotLessGreater: "\u2278",
      NotLessLess: "\u226A\u0338",
      NotLessSlantEqual: "\u2A7D\u0338",
      NotLessTilde: "\u2274",
      NotNestedGreaterGreater: "\u2AA2\u0338",
      NotNestedLessLess: "\u2AA1\u0338",
      NotPrecedes: "\u2280",
      NotPrecedesEqual: "\u2AAF\u0338",
      NotPrecedesSlantEqual: "\u22E0",
      NotReverseElement: "\u220C",
      NotRightTriangle: "\u22EB",
      NotRightTriangleBar: "\u29D0\u0338",
      NotRightTriangleEqual: "\u22ED",
      NotSquareSubset: "\u228F\u0338",
      NotSquareSubsetEqual: "\u22E2",
      NotSquareSuperset: "\u2290\u0338",
      NotSquareSupersetEqual: "\u22E3",
      NotSubset: "\u2282\u20D2",
      NotSubsetEqual: "\u2288",
      NotSucceeds: "\u2281",
      NotSucceedsEqual: "\u2AB0\u0338",
      NotSucceedsSlantEqual: "\u22E1",
      NotSucceedsTilde: "\u227F\u0338",
      NotSuperset: "\u2283\u20D2",
      NotSupersetEqual: "\u2289",
      NotTilde: "\u2241",
      NotTildeEqual: "\u2244",
      NotTildeFullEqual: "\u2247",
      NotTildeTilde: "\u2249",
      NotVerticalBar: "\u2224",
      Nscr: "\u{1D4A9}",
      Ntild: "\xD1",
      Ntilde: "\xD1",
      Nu: "\u039D",
      OElig: "\u0152",
      Oacut: "\xD3",
      Oacute: "\xD3",
      Ocir: "\xD4",
      Ocirc: "\xD4",
      Ocy: "\u041E",
      Odblac: "\u0150",
      Ofr: "\u{1D512}",
      Ograv: "\xD2",
      Ograve: "\xD2",
      Omacr: "\u014C",
      Omega: "\u03A9",
      Omicron: "\u039F",
      Oopf: "\u{1D546}",
      OpenCurlyDoubleQuote: "\u201C",
      OpenCurlyQuote: "\u2018",
      Or: "\u2A54",
      Oscr: "\u{1D4AA}",
      Oslas: "\xD8",
      Oslash: "\xD8",
      Otild: "\xD5",
      Otilde: "\xD5",
      Otimes: "\u2A37",
      Oum: "\xD6",
      Ouml: "\xD6",
      OverBar: "\u203E",
      OverBrace: "\u23DE",
      OverBracket: "\u23B4",
      OverParenthesis: "\u23DC",
      PartialD: "\u2202",
      Pcy: "\u041F",
      Pfr: "\u{1D513}",
      Phi: "\u03A6",
      Pi: "\u03A0",
      PlusMinus: "\xB1",
      Poincareplane: "\u210C",
      Popf: "\u2119",
      Pr: "\u2ABB",
      Precedes: "\u227A",
      PrecedesEqual: "\u2AAF",
      PrecedesSlantEqual: "\u227C",
      PrecedesTilde: "\u227E",
      Prime: "\u2033",
      Product: "\u220F",
      Proportion: "\u2237",
      Proportional: "\u221D",
      Pscr: "\u{1D4AB}",
      Psi: "\u03A8",
      QUO: '"',
      QUOT: '"',
      Qfr: "\u{1D514}",
      Qopf: "\u211A",
      Qscr: "\u{1D4AC}",
      RBarr: "\u2910",
      RE: "\xAE",
      REG: "\xAE",
      Racute: "\u0154",
      Rang: "\u27EB",
      Rarr: "\u21A0",
      Rarrtl: "\u2916",
      Rcaron: "\u0158",
      Rcedil: "\u0156",
      Rcy: "\u0420",
      Re: "\u211C",
      ReverseElement: "\u220B",
      ReverseEquilibrium: "\u21CB",
      ReverseUpEquilibrium: "\u296F",
      Rfr: "\u211C",
      Rho: "\u03A1",
      RightAngleBracket: "\u27E9",
      RightArrow: "\u2192",
      RightArrowBar: "\u21E5",
      RightArrowLeftArrow: "\u21C4",
      RightCeiling: "\u2309",
      RightDoubleBracket: "\u27E7",
      RightDownTeeVector: "\u295D",
      RightDownVector: "\u21C2",
      RightDownVectorBar: "\u2955",
      RightFloor: "\u230B",
      RightTee: "\u22A2",
      RightTeeArrow: "\u21A6",
      RightTeeVector: "\u295B",
      RightTriangle: "\u22B3",
      RightTriangleBar: "\u29D0",
      RightTriangleEqual: "\u22B5",
      RightUpDownVector: "\u294F",
      RightUpTeeVector: "\u295C",
      RightUpVector: "\u21BE",
      RightUpVectorBar: "\u2954",
      RightVector: "\u21C0",
      RightVectorBar: "\u2953",
      Rightarrow: "\u21D2",
      Ropf: "\u211D",
      RoundImplies: "\u2970",
      Rrightarrow: "\u21DB",
      Rscr: "\u211B",
      Rsh: "\u21B1",
      RuleDelayed: "\u29F4",
      SHCHcy: "\u0429",
      SHcy: "\u0428",
      SOFTcy: "\u042C",
      Sacute: "\u015A",
      Sc: "\u2ABC",
      Scaron: "\u0160",
      Scedil: "\u015E",
      Scirc: "\u015C",
      Scy: "\u0421",
      Sfr: "\u{1D516}",
      ShortDownArrow: "\u2193",
      ShortLeftArrow: "\u2190",
      ShortRightArrow: "\u2192",
      ShortUpArrow: "\u2191",
      Sigma: "\u03A3",
      SmallCircle: "\u2218",
      Sopf: "\u{1D54A}",
      Sqrt: "\u221A",
      Square: "\u25A1",
      SquareIntersection: "\u2293",
      SquareSubset: "\u228F",
      SquareSubsetEqual: "\u2291",
      SquareSuperset: "\u2290",
      SquareSupersetEqual: "\u2292",
      SquareUnion: "\u2294",
      Sscr: "\u{1D4AE}",
      Star: "\u22C6",
      Sub: "\u22D0",
      Subset: "\u22D0",
      SubsetEqual: "\u2286",
      Succeeds: "\u227B",
      SucceedsEqual: "\u2AB0",
      SucceedsSlantEqual: "\u227D",
      SucceedsTilde: "\u227F",
      SuchThat: "\u220B",
      Sum: "\u2211",
      Sup: "\u22D1",
      Superset: "\u2283",
      SupersetEqual: "\u2287",
      Supset: "\u22D1",
      THOR: "\xDE",
      THORN: "\xDE",
      TRADE: "\u2122",
      TSHcy: "\u040B",
      TScy: "\u0426",
      Tab: "	",
      Tau: "\u03A4",
      Tcaron: "\u0164",
      Tcedil: "\u0162",
      Tcy: "\u0422",
      Tfr: "\u{1D517}",
      Therefore: "\u2234",
      Theta: "\u0398",
      ThickSpace: "\u205F\u200A",
      ThinSpace: "\u2009",
      Tilde: "\u223C",
      TildeEqual: "\u2243",
      TildeFullEqual: "\u2245",
      TildeTilde: "\u2248",
      Topf: "\u{1D54B}",
      TripleDot: "\u20DB",
      Tscr: "\u{1D4AF}",
      Tstrok: "\u0166",
      Uacut: "\xDA",
      Uacute: "\xDA",
      Uarr: "\u219F",
      Uarrocir: "\u2949",
      Ubrcy: "\u040E",
      Ubreve: "\u016C",
      Ucir: "\xDB",
      Ucirc: "\xDB",
      Ucy: "\u0423",
      Udblac: "\u0170",
      Ufr: "\u{1D518}",
      Ugrav: "\xD9",
      Ugrave: "\xD9",
      Umacr: "\u016A",
      UnderBar: "_",
      UnderBrace: "\u23DF",
      UnderBracket: "\u23B5",
      UnderParenthesis: "\u23DD",
      Union: "\u22C3",
      UnionPlus: "\u228E",
      Uogon: "\u0172",
      Uopf: "\u{1D54C}",
      UpArrow: "\u2191",
      UpArrowBar: "\u2912",
      UpArrowDownArrow: "\u21C5",
      UpDownArrow: "\u2195",
      UpEquilibrium: "\u296E",
      UpTee: "\u22A5",
      UpTeeArrow: "\u21A5",
      Uparrow: "\u21D1",
      Updownarrow: "\u21D5",
      UpperLeftArrow: "\u2196",
      UpperRightArrow: "\u2197",
      Upsi: "\u03D2",
      Upsilon: "\u03A5",
      Uring: "\u016E",
      Uscr: "\u{1D4B0}",
      Utilde: "\u0168",
      Uum: "\xDC",
      Uuml: "\xDC",
      VDash: "\u22AB",
      Vbar: "\u2AEB",
      Vcy: "\u0412",
      Vdash: "\u22A9",
      Vdashl: "\u2AE6",
      Vee: "\u22C1",
      Verbar: "\u2016",
      Vert: "\u2016",
      VerticalBar: "\u2223",
      VerticalLine: "|",
      VerticalSeparator: "\u2758",
      VerticalTilde: "\u2240",
      VeryThinSpace: "\u200A",
      Vfr: "\u{1D519}",
      Vopf: "\u{1D54D}",
      Vscr: "\u{1D4B1}",
      Vvdash: "\u22AA",
      Wcirc: "\u0174",
      Wedge: "\u22C0",
      Wfr: "\u{1D51A}",
      Wopf: "\u{1D54E}",
      Wscr: "\u{1D4B2}",
      Xfr: "\u{1D51B}",
      Xi: "\u039E",
      Xopf: "\u{1D54F}",
      Xscr: "\u{1D4B3}",
      YAcy: "\u042F",
      YIcy: "\u0407",
      YUcy: "\u042E",
      Yacut: "\xDD",
      Yacute: "\xDD",
      Ycirc: "\u0176",
      Ycy: "\u042B",
      Yfr: "\u{1D51C}",
      Yopf: "\u{1D550}",
      Yscr: "\u{1D4B4}",
      Yuml: "\u0178",
      ZHcy: "\u0416",
      Zacute: "\u0179",
      Zcaron: "\u017D",
      Zcy: "\u0417",
      Zdot: "\u017B",
      ZeroWidthSpace: "\u200B",
      Zeta: "\u0396",
      Zfr: "\u2128",
      Zopf: "\u2124",
      Zscr: "\u{1D4B5}",
      aacut: "\xE1",
      aacute: "\xE1",
      abreve: "\u0103",
      ac: "\u223E",
      acE: "\u223E\u0333",
      acd: "\u223F",
      acir: "\xE2",
      acirc: "\xE2",
      acut: "\xB4",
      acute: "\xB4",
      acy: "\u0430",
      aeli: "\xE6",
      aelig: "\xE6",
      af: "\u2061",
      afr: "\u{1D51E}",
      agrav: "\xE0",
      agrave: "\xE0",
      alefsym: "\u2135",
      aleph: "\u2135",
      alpha: "\u03B1",
      amacr: "\u0101",
      amalg: "\u2A3F",
      am: "&",
      amp: "&",
      and: "\u2227",
      andand: "\u2A55",
      andd: "\u2A5C",
      andslope: "\u2A58",
      andv: "\u2A5A",
      ang: "\u2220",
      ange: "\u29A4",
      angle: "\u2220",
      angmsd: "\u2221",
      angmsdaa: "\u29A8",
      angmsdab: "\u29A9",
      angmsdac: "\u29AA",
      angmsdad: "\u29AB",
      angmsdae: "\u29AC",
      angmsdaf: "\u29AD",
      angmsdag: "\u29AE",
      angmsdah: "\u29AF",
      angrt: "\u221F",
      angrtvb: "\u22BE",
      angrtvbd: "\u299D",
      angsph: "\u2222",
      angst: "\xC5",
      angzarr: "\u237C",
      aogon: "\u0105",
      aopf: "\u{1D552}",
      ap: "\u2248",
      apE: "\u2A70",
      apacir: "\u2A6F",
      ape: "\u224A",
      apid: "\u224B",
      apos: "'",
      approx: "\u2248",
      approxeq: "\u224A",
      arin: "\xE5",
      aring: "\xE5",
      ascr: "\u{1D4B6}",
      ast: "*",
      asymp: "\u2248",
      asympeq: "\u224D",
      atild: "\xE3",
      atilde: "\xE3",
      aum: "\xE4",
      auml: "\xE4",
      awconint: "\u2233",
      awint: "\u2A11",
      bNot: "\u2AED",
      backcong: "\u224C",
      backepsilon: "\u03F6",
      backprime: "\u2035",
      backsim: "\u223D",
      backsimeq: "\u22CD",
      barvee: "\u22BD",
      barwed: "\u2305",
      barwedge: "\u2305",
      bbrk: "\u23B5",
      bbrktbrk: "\u23B6",
      bcong: "\u224C",
      bcy: "\u0431",
      bdquo: "\u201E",
      becaus: "\u2235",
      because: "\u2235",
      bemptyv: "\u29B0",
      bepsi: "\u03F6",
      bernou: "\u212C",
      beta: "\u03B2",
      beth: "\u2136",
      between: "\u226C",
      bfr: "\u{1D51F}",
      bigcap: "\u22C2",
      bigcirc: "\u25EF",
      bigcup: "\u22C3",
      bigodot: "\u2A00",
      bigoplus: "\u2A01",
      bigotimes: "\u2A02",
      bigsqcup: "\u2A06",
      bigstar: "\u2605",
      bigtriangledown: "\u25BD",
      bigtriangleup: "\u25B3",
      biguplus: "\u2A04",
      bigvee: "\u22C1",
      bigwedge: "\u22C0",
      bkarow: "\u290D",
      blacklozenge: "\u29EB",
      blacksquare: "\u25AA",
      blacktriangle: "\u25B4",
      blacktriangledown: "\u25BE",
      blacktriangleleft: "\u25C2",
      blacktriangleright: "\u25B8",
      blank: "\u2423",
      blk12: "\u2592",
      blk14: "\u2591",
      blk34: "\u2593",
      block: "\u2588",
      bne: "=\u20E5",
      bnequiv: "\u2261\u20E5",
      bnot: "\u2310",
      bopf: "\u{1D553}",
      bot: "\u22A5",
      bottom: "\u22A5",
      bowtie: "\u22C8",
      boxDL: "\u2557",
      boxDR: "\u2554",
      boxDl: "\u2556",
      boxDr: "\u2553",
      boxH: "\u2550",
      boxHD: "\u2566",
      boxHU: "\u2569",
      boxHd: "\u2564",
      boxHu: "\u2567",
      boxUL: "\u255D",
      boxUR: "\u255A",
      boxUl: "\u255C",
      boxUr: "\u2559",
      boxV: "\u2551",
      boxVH: "\u256C",
      boxVL: "\u2563",
      boxVR: "\u2560",
      boxVh: "\u256B",
      boxVl: "\u2562",
      boxVr: "\u255F",
      boxbox: "\u29C9",
      boxdL: "\u2555",
      boxdR: "\u2552",
      boxdl: "\u2510",
      boxdr: "\u250C",
      boxh: "\u2500",
      boxhD: "\u2565",
      boxhU: "\u2568",
      boxhd: "\u252C",
      boxhu: "\u2534",
      boxminus: "\u229F",
      boxplus: "\u229E",
      boxtimes: "\u22A0",
      boxuL: "\u255B",
      boxuR: "\u2558",
      boxul: "\u2518",
      boxur: "\u2514",
      boxv: "\u2502",
      boxvH: "\u256A",
      boxvL: "\u2561",
      boxvR: "\u255E",
      boxvh: "\u253C",
      boxvl: "\u2524",
      boxvr: "\u251C",
      bprime: "\u2035",
      breve: "\u02D8",
      brvba: "\xA6",
      brvbar: "\xA6",
      bscr: "\u{1D4B7}",
      bsemi: "\u204F",
      bsim: "\u223D",
      bsime: "\u22CD",
      bsol: "\\",
      bsolb: "\u29C5",
      bsolhsub: "\u27C8",
      bull: "\u2022",
      bullet: "\u2022",
      bump: "\u224E",
      bumpE: "\u2AAE",
      bumpe: "\u224F",
      bumpeq: "\u224F",
      cacute: "\u0107",
      cap: "\u2229",
      capand: "\u2A44",
      capbrcup: "\u2A49",
      capcap: "\u2A4B",
      capcup: "\u2A47",
      capdot: "\u2A40",
      caps: "\u2229\uFE00",
      caret: "\u2041",
      caron: "\u02C7",
      ccaps: "\u2A4D",
      ccaron: "\u010D",
      ccedi: "\xE7",
      ccedil: "\xE7",
      ccirc: "\u0109",
      ccups: "\u2A4C",
      ccupssm: "\u2A50",
      cdot: "\u010B",
      cedi: "\xB8",
      cedil: "\xB8",
      cemptyv: "\u29B2",
      cen: "\xA2",
      cent: "\xA2",
      centerdot: "\xB7",
      cfr: "\u{1D520}",
      chcy: "\u0447",
      check: "\u2713",
      checkmark: "\u2713",
      chi: "\u03C7",
      cir: "\u25CB",
      cirE: "\u29C3",
      circ: "\u02C6",
      circeq: "\u2257",
      circlearrowleft: "\u21BA",
      circlearrowright: "\u21BB",
      circledR: "\xAE",
      circledS: "\u24C8",
      circledast: "\u229B",
      circledcirc: "\u229A",
      circleddash: "\u229D",
      cire: "\u2257",
      cirfnint: "\u2A10",
      cirmid: "\u2AEF",
      cirscir: "\u29C2",
      clubs: "\u2663",
      clubsuit: "\u2663",
      colon: ":",
      colone: "\u2254",
      coloneq: "\u2254",
      comma: ",",
      commat: "@",
      comp: "\u2201",
      compfn: "\u2218",
      complement: "\u2201",
      complexes: "\u2102",
      cong: "\u2245",
      congdot: "\u2A6D",
      conint: "\u222E",
      copf: "\u{1D554}",
      coprod: "\u2210",
      cop: "\xA9",
      copy: "\xA9",
      copysr: "\u2117",
      crarr: "\u21B5",
      cross: "\u2717",
      cscr: "\u{1D4B8}",
      csub: "\u2ACF",
      csube: "\u2AD1",
      csup: "\u2AD0",
      csupe: "\u2AD2",
      ctdot: "\u22EF",
      cudarrl: "\u2938",
      cudarrr: "\u2935",
      cuepr: "\u22DE",
      cuesc: "\u22DF",
      cularr: "\u21B6",
      cularrp: "\u293D",
      cup: "\u222A",
      cupbrcap: "\u2A48",
      cupcap: "\u2A46",
      cupcup: "\u2A4A",
      cupdot: "\u228D",
      cupor: "\u2A45",
      cups: "\u222A\uFE00",
      curarr: "\u21B7",
      curarrm: "\u293C",
      curlyeqprec: "\u22DE",
      curlyeqsucc: "\u22DF",
      curlyvee: "\u22CE",
      curlywedge: "\u22CF",
      curre: "\xA4",
      curren: "\xA4",
      curvearrowleft: "\u21B6",
      curvearrowright: "\u21B7",
      cuvee: "\u22CE",
      cuwed: "\u22CF",
      cwconint: "\u2232",
      cwint: "\u2231",
      cylcty: "\u232D",
      dArr: "\u21D3",
      dHar: "\u2965",
      dagger: "\u2020",
      daleth: "\u2138",
      darr: "\u2193",
      dash: "\u2010",
      dashv: "\u22A3",
      dbkarow: "\u290F",
      dblac: "\u02DD",
      dcaron: "\u010F",
      dcy: "\u0434",
      dd: "\u2146",
      ddagger: "\u2021",
      ddarr: "\u21CA",
      ddotseq: "\u2A77",
      de: "\xB0",
      deg: "\xB0",
      delta: "\u03B4",
      demptyv: "\u29B1",
      dfisht: "\u297F",
      dfr: "\u{1D521}",
      dharl: "\u21C3",
      dharr: "\u21C2",
      diam: "\u22C4",
      diamond: "\u22C4",
      diamondsuit: "\u2666",
      diams: "\u2666",
      die: "\xA8",
      digamma: "\u03DD",
      disin: "\u22F2",
      div: "\xF7",
      divid: "\xF7",
      divide: "\xF7",
      divideontimes: "\u22C7",
      divonx: "\u22C7",
      djcy: "\u0452",
      dlcorn: "\u231E",
      dlcrop: "\u230D",
      dollar: "$",
      dopf: "\u{1D555}",
      dot: "\u02D9",
      doteq: "\u2250",
      doteqdot: "\u2251",
      dotminus: "\u2238",
      dotplus: "\u2214",
      dotsquare: "\u22A1",
      doublebarwedge: "\u2306",
      downarrow: "\u2193",
      downdownarrows: "\u21CA",
      downharpoonleft: "\u21C3",
      downharpoonright: "\u21C2",
      drbkarow: "\u2910",
      drcorn: "\u231F",
      drcrop: "\u230C",
      dscr: "\u{1D4B9}",
      dscy: "\u0455",
      dsol: "\u29F6",
      dstrok: "\u0111",
      dtdot: "\u22F1",
      dtri: "\u25BF",
      dtrif: "\u25BE",
      duarr: "\u21F5",
      duhar: "\u296F",
      dwangle: "\u29A6",
      dzcy: "\u045F",
      dzigrarr: "\u27FF",
      eDDot: "\u2A77",
      eDot: "\u2251",
      eacut: "\xE9",
      eacute: "\xE9",
      easter: "\u2A6E",
      ecaron: "\u011B",
      ecir: "\xEA",
      ecirc: "\xEA",
      ecolon: "\u2255",
      ecy: "\u044D",
      edot: "\u0117",
      ee: "\u2147",
      efDot: "\u2252",
      efr: "\u{1D522}",
      eg: "\u2A9A",
      egrav: "\xE8",
      egrave: "\xE8",
      egs: "\u2A96",
      egsdot: "\u2A98",
      el: "\u2A99",
      elinters: "\u23E7",
      ell: "\u2113",
      els: "\u2A95",
      elsdot: "\u2A97",
      emacr: "\u0113",
      empty: "\u2205",
      emptyset: "\u2205",
      emptyv: "\u2205",
      emsp13: "\u2004",
      emsp14: "\u2005",
      emsp: "\u2003",
      eng: "\u014B",
      ensp: "\u2002",
      eogon: "\u0119",
      eopf: "\u{1D556}",
      epar: "\u22D5",
      eparsl: "\u29E3",
      eplus: "\u2A71",
      epsi: "\u03B5",
      epsilon: "\u03B5",
      epsiv: "\u03F5",
      eqcirc: "\u2256",
      eqcolon: "\u2255",
      eqsim: "\u2242",
      eqslantgtr: "\u2A96",
      eqslantless: "\u2A95",
      equals: "=",
      equest: "\u225F",
      equiv: "\u2261",
      equivDD: "\u2A78",
      eqvparsl: "\u29E5",
      erDot: "\u2253",
      erarr: "\u2971",
      escr: "\u212F",
      esdot: "\u2250",
      esim: "\u2242",
      eta: "\u03B7",
      et: "\xF0",
      eth: "\xF0",
      eum: "\xEB",
      euml: "\xEB",
      euro: "\u20AC",
      excl: "!",
      exist: "\u2203",
      expectation: "\u2130",
      exponentiale: "\u2147",
      fallingdotseq: "\u2252",
      fcy: "\u0444",
      female: "\u2640",
      ffilig: "\uFB03",
      fflig: "\uFB00",
      ffllig: "\uFB04",
      ffr: "\u{1D523}",
      filig: "\uFB01",
      fjlig: "fj",
      flat: "\u266D",
      fllig: "\uFB02",
      fltns: "\u25B1",
      fnof: "\u0192",
      fopf: "\u{1D557}",
      forall: "\u2200",
      fork: "\u22D4",
      forkv: "\u2AD9",
      fpartint: "\u2A0D",
      frac1: "\xBC",
      frac12: "\xBD",
      frac13: "\u2153",
      frac14: "\xBC",
      frac15: "\u2155",
      frac16: "\u2159",
      frac18: "\u215B",
      frac23: "\u2154",
      frac25: "\u2156",
      frac3: "\xBE",
      frac34: "\xBE",
      frac35: "\u2157",
      frac38: "\u215C",
      frac45: "\u2158",
      frac56: "\u215A",
      frac58: "\u215D",
      frac78: "\u215E",
      frasl: "\u2044",
      frown: "\u2322",
      fscr: "\u{1D4BB}",
      gE: "\u2267",
      gEl: "\u2A8C",
      gacute: "\u01F5",
      gamma: "\u03B3",
      gammad: "\u03DD",
      gap: "\u2A86",
      gbreve: "\u011F",
      gcirc: "\u011D",
      gcy: "\u0433",
      gdot: "\u0121",
      ge: "\u2265",
      gel: "\u22DB",
      geq: "\u2265",
      geqq: "\u2267",
      geqslant: "\u2A7E",
      ges: "\u2A7E",
      gescc: "\u2AA9",
      gesdot: "\u2A80",
      gesdoto: "\u2A82",
      gesdotol: "\u2A84",
      gesl: "\u22DB\uFE00",
      gesles: "\u2A94",
      gfr: "\u{1D524}",
      gg: "\u226B",
      ggg: "\u22D9",
      gimel: "\u2137",
      gjcy: "\u0453",
      gl: "\u2277",
      glE: "\u2A92",
      gla: "\u2AA5",
      glj: "\u2AA4",
      gnE: "\u2269",
      gnap: "\u2A8A",
      gnapprox: "\u2A8A",
      gne: "\u2A88",
      gneq: "\u2A88",
      gneqq: "\u2269",
      gnsim: "\u22E7",
      gopf: "\u{1D558}",
      grave: "`",
      gscr: "\u210A",
      gsim: "\u2273",
      gsime: "\u2A8E",
      gsiml: "\u2A90",
      g: ">",
      gt: ">",
      gtcc: "\u2AA7",
      gtcir: "\u2A7A",
      gtdot: "\u22D7",
      gtlPar: "\u2995",
      gtquest: "\u2A7C",
      gtrapprox: "\u2A86",
      gtrarr: "\u2978",
      gtrdot: "\u22D7",
      gtreqless: "\u22DB",
      gtreqqless: "\u2A8C",
      gtrless: "\u2277",
      gtrsim: "\u2273",
      gvertneqq: "\u2269\uFE00",
      gvnE: "\u2269\uFE00",
      hArr: "\u21D4",
      hairsp: "\u200A",
      half: "\xBD",
      hamilt: "\u210B",
      hardcy: "\u044A",
      harr: "\u2194",
      harrcir: "\u2948",
      harrw: "\u21AD",
      hbar: "\u210F",
      hcirc: "\u0125",
      hearts: "\u2665",
      heartsuit: "\u2665",
      hellip: "\u2026",
      hercon: "\u22B9",
      hfr: "\u{1D525}",
      hksearow: "\u2925",
      hkswarow: "\u2926",
      hoarr: "\u21FF",
      homtht: "\u223B",
      hookleftarrow: "\u21A9",
      hookrightarrow: "\u21AA",
      hopf: "\u{1D559}",
      horbar: "\u2015",
      hscr: "\u{1D4BD}",
      hslash: "\u210F",
      hstrok: "\u0127",
      hybull: "\u2043",
      hyphen: "\u2010",
      iacut: "\xED",
      iacute: "\xED",
      ic: "\u2063",
      icir: "\xEE",
      icirc: "\xEE",
      icy: "\u0438",
      iecy: "\u0435",
      iexc: "\xA1",
      iexcl: "\xA1",
      iff: "\u21D4",
      ifr: "\u{1D526}",
      igrav: "\xEC",
      igrave: "\xEC",
      ii: "\u2148",
      iiiint: "\u2A0C",
      iiint: "\u222D",
      iinfin: "\u29DC",
      iiota: "\u2129",
      ijlig: "\u0133",
      imacr: "\u012B",
      image: "\u2111",
      imagline: "\u2110",
      imagpart: "\u2111",
      imath: "\u0131",
      imof: "\u22B7",
      imped: "\u01B5",
      in: "\u2208",
      incare: "\u2105",
      infin: "\u221E",
      infintie: "\u29DD",
      inodot: "\u0131",
      int: "\u222B",
      intcal: "\u22BA",
      integers: "\u2124",
      intercal: "\u22BA",
      intlarhk: "\u2A17",
      intprod: "\u2A3C",
      iocy: "\u0451",
      iogon: "\u012F",
      iopf: "\u{1D55A}",
      iota: "\u03B9",
      iprod: "\u2A3C",
      iques: "\xBF",
      iquest: "\xBF",
      iscr: "\u{1D4BE}",
      isin: "\u2208",
      isinE: "\u22F9",
      isindot: "\u22F5",
      isins: "\u22F4",
      isinsv: "\u22F3",
      isinv: "\u2208",
      it: "\u2062",
      itilde: "\u0129",
      iukcy: "\u0456",
      ium: "\xEF",
      iuml: "\xEF",
      jcirc: "\u0135",
      jcy: "\u0439",
      jfr: "\u{1D527}",
      jmath: "\u0237",
      jopf: "\u{1D55B}",
      jscr: "\u{1D4BF}",
      jsercy: "\u0458",
      jukcy: "\u0454",
      kappa: "\u03BA",
      kappav: "\u03F0",
      kcedil: "\u0137",
      kcy: "\u043A",
      kfr: "\u{1D528}",
      kgreen: "\u0138",
      khcy: "\u0445",
      kjcy: "\u045C",
      kopf: "\u{1D55C}",
      kscr: "\u{1D4C0}",
      lAarr: "\u21DA",
      lArr: "\u21D0",
      lAtail: "\u291B",
      lBarr: "\u290E",
      lE: "\u2266",
      lEg: "\u2A8B",
      lHar: "\u2962",
      lacute: "\u013A",
      laemptyv: "\u29B4",
      lagran: "\u2112",
      lambda: "\u03BB",
      lang: "\u27E8",
      langd: "\u2991",
      langle: "\u27E8",
      lap: "\u2A85",
      laqu: "\xAB",
      laquo: "\xAB",
      larr: "\u2190",
      larrb: "\u21E4",
      larrbfs: "\u291F",
      larrfs: "\u291D",
      larrhk: "\u21A9",
      larrlp: "\u21AB",
      larrpl: "\u2939",
      larrsim: "\u2973",
      larrtl: "\u21A2",
      lat: "\u2AAB",
      latail: "\u2919",
      late: "\u2AAD",
      lates: "\u2AAD\uFE00",
      lbarr: "\u290C",
      lbbrk: "\u2772",
      lbrace: "{",
      lbrack: "[",
      lbrke: "\u298B",
      lbrksld: "\u298F",
      lbrkslu: "\u298D",
      lcaron: "\u013E",
      lcedil: "\u013C",
      lceil: "\u2308",
      lcub: "{",
      lcy: "\u043B",
      ldca: "\u2936",
      ldquo: "\u201C",
      ldquor: "\u201E",
      ldrdhar: "\u2967",
      ldrushar: "\u294B",
      ldsh: "\u21B2",
      le: "\u2264",
      leftarrow: "\u2190",
      leftarrowtail: "\u21A2",
      leftharpoondown: "\u21BD",
      leftharpoonup: "\u21BC",
      leftleftarrows: "\u21C7",
      leftrightarrow: "\u2194",
      leftrightarrows: "\u21C6",
      leftrightharpoons: "\u21CB",
      leftrightsquigarrow: "\u21AD",
      leftthreetimes: "\u22CB",
      leg: "\u22DA",
      leq: "\u2264",
      leqq: "\u2266",
      leqslant: "\u2A7D",
      les: "\u2A7D",
      lescc: "\u2AA8",
      lesdot: "\u2A7F",
      lesdoto: "\u2A81",
      lesdotor: "\u2A83",
      lesg: "\u22DA\uFE00",
      lesges: "\u2A93",
      lessapprox: "\u2A85",
      lessdot: "\u22D6",
      lesseqgtr: "\u22DA",
      lesseqqgtr: "\u2A8B",
      lessgtr: "\u2276",
      lesssim: "\u2272",
      lfisht: "\u297C",
      lfloor: "\u230A",
      lfr: "\u{1D529}",
      lg: "\u2276",
      lgE: "\u2A91",
      lhard: "\u21BD",
      lharu: "\u21BC",
      lharul: "\u296A",
      lhblk: "\u2584",
      ljcy: "\u0459",
      ll: "\u226A",
      llarr: "\u21C7",
      llcorner: "\u231E",
      llhard: "\u296B",
      lltri: "\u25FA",
      lmidot: "\u0140",
      lmoust: "\u23B0",
      lmoustache: "\u23B0",
      lnE: "\u2268",
      lnap: "\u2A89",
      lnapprox: "\u2A89",
      lne: "\u2A87",
      lneq: "\u2A87",
      lneqq: "\u2268",
      lnsim: "\u22E6",
      loang: "\u27EC",
      loarr: "\u21FD",
      lobrk: "\u27E6",
      longleftarrow: "\u27F5",
      longleftrightarrow: "\u27F7",
      longmapsto: "\u27FC",
      longrightarrow: "\u27F6",
      looparrowleft: "\u21AB",
      looparrowright: "\u21AC",
      lopar: "\u2985",
      lopf: "\u{1D55D}",
      loplus: "\u2A2D",
      lotimes: "\u2A34",
      lowast: "\u2217",
      lowbar: "_",
      loz: "\u25CA",
      lozenge: "\u25CA",
      lozf: "\u29EB",
      lpar: "(",
      lparlt: "\u2993",
      lrarr: "\u21C6",
      lrcorner: "\u231F",
      lrhar: "\u21CB",
      lrhard: "\u296D",
      lrm: "\u200E",
      lrtri: "\u22BF",
      lsaquo: "\u2039",
      lscr: "\u{1D4C1}",
      lsh: "\u21B0",
      lsim: "\u2272",
      lsime: "\u2A8D",
      lsimg: "\u2A8F",
      lsqb: "[",
      lsquo: "\u2018",
      lsquor: "\u201A",
      lstrok: "\u0142",
      l: "<",
      lt: "<",
      ltcc: "\u2AA6",
      ltcir: "\u2A79",
      ltdot: "\u22D6",
      lthree: "\u22CB",
      ltimes: "\u22C9",
      ltlarr: "\u2976",
      ltquest: "\u2A7B",
      ltrPar: "\u2996",
      ltri: "\u25C3",
      ltrie: "\u22B4",
      ltrif: "\u25C2",
      lurdshar: "\u294A",
      luruhar: "\u2966",
      lvertneqq: "\u2268\uFE00",
      lvnE: "\u2268\uFE00",
      mDDot: "\u223A",
      mac: "\xAF",
      macr: "\xAF",
      male: "\u2642",
      malt: "\u2720",
      maltese: "\u2720",
      map: "\u21A6",
      mapsto: "\u21A6",
      mapstodown: "\u21A7",
      mapstoleft: "\u21A4",
      mapstoup: "\u21A5",
      marker: "\u25AE",
      mcomma: "\u2A29",
      mcy: "\u043C",
      mdash: "\u2014",
      measuredangle: "\u2221",
      mfr: "\u{1D52A}",
      mho: "\u2127",
      micr: "\xB5",
      micro: "\xB5",
      mid: "\u2223",
      midast: "*",
      midcir: "\u2AF0",
      middo: "\xB7",
      middot: "\xB7",
      minus: "\u2212",
      minusb: "\u229F",
      minusd: "\u2238",
      minusdu: "\u2A2A",
      mlcp: "\u2ADB",
      mldr: "\u2026",
      mnplus: "\u2213",
      models: "\u22A7",
      mopf: "\u{1D55E}",
      mp: "\u2213",
      mscr: "\u{1D4C2}",
      mstpos: "\u223E",
      mu: "\u03BC",
      multimap: "\u22B8",
      mumap: "\u22B8",
      nGg: "\u22D9\u0338",
      nGt: "\u226B\u20D2",
      nGtv: "\u226B\u0338",
      nLeftarrow: "\u21CD",
      nLeftrightarrow: "\u21CE",
      nLl: "\u22D8\u0338",
      nLt: "\u226A\u20D2",
      nLtv: "\u226A\u0338",
      nRightarrow: "\u21CF",
      nVDash: "\u22AF",
      nVdash: "\u22AE",
      nabla: "\u2207",
      nacute: "\u0144",
      nang: "\u2220\u20D2",
      nap: "\u2249",
      napE: "\u2A70\u0338",
      napid: "\u224B\u0338",
      napos: "\u0149",
      napprox: "\u2249",
      natur: "\u266E",
      natural: "\u266E",
      naturals: "\u2115",
      nbs: "\xA0",
      nbsp: "\xA0",
      nbump: "\u224E\u0338",
      nbumpe: "\u224F\u0338",
      ncap: "\u2A43",
      ncaron: "\u0148",
      ncedil: "\u0146",
      ncong: "\u2247",
      ncongdot: "\u2A6D\u0338",
      ncup: "\u2A42",
      ncy: "\u043D",
      ndash: "\u2013",
      ne: "\u2260",
      neArr: "\u21D7",
      nearhk: "\u2924",
      nearr: "\u2197",
      nearrow: "\u2197",
      nedot: "\u2250\u0338",
      nequiv: "\u2262",
      nesear: "\u2928",
      nesim: "\u2242\u0338",
      nexist: "\u2204",
      nexists: "\u2204",
      nfr: "\u{1D52B}",
      ngE: "\u2267\u0338",
      nge: "\u2271",
      ngeq: "\u2271",
      ngeqq: "\u2267\u0338",
      ngeqslant: "\u2A7E\u0338",
      nges: "\u2A7E\u0338",
      ngsim: "\u2275",
      ngt: "\u226F",
      ngtr: "\u226F",
      nhArr: "\u21CE",
      nharr: "\u21AE",
      nhpar: "\u2AF2",
      ni: "\u220B",
      nis: "\u22FC",
      nisd: "\u22FA",
      niv: "\u220B",
      njcy: "\u045A",
      nlArr: "\u21CD",
      nlE: "\u2266\u0338",
      nlarr: "\u219A",
      nldr: "\u2025",
      nle: "\u2270",
      nleftarrow: "\u219A",
      nleftrightarrow: "\u21AE",
      nleq: "\u2270",
      nleqq: "\u2266\u0338",
      nleqslant: "\u2A7D\u0338",
      nles: "\u2A7D\u0338",
      nless: "\u226E",
      nlsim: "\u2274",
      nlt: "\u226E",
      nltri: "\u22EA",
      nltrie: "\u22EC",
      nmid: "\u2224",
      nopf: "\u{1D55F}",
      no: "\xAC",
      not: "\xAC",
      notin: "\u2209",
      notinE: "\u22F9\u0338",
      notindot: "\u22F5\u0338",
      notinva: "\u2209",
      notinvb: "\u22F7",
      notinvc: "\u22F6",
      notni: "\u220C",
      notniva: "\u220C",
      notnivb: "\u22FE",
      notnivc: "\u22FD",
      npar: "\u2226",
      nparallel: "\u2226",
      nparsl: "\u2AFD\u20E5",
      npart: "\u2202\u0338",
      npolint: "\u2A14",
      npr: "\u2280",
      nprcue: "\u22E0",
      npre: "\u2AAF\u0338",
      nprec: "\u2280",
      npreceq: "\u2AAF\u0338",
      nrArr: "\u21CF",
      nrarr: "\u219B",
      nrarrc: "\u2933\u0338",
      nrarrw: "\u219D\u0338",
      nrightarrow: "\u219B",
      nrtri: "\u22EB",
      nrtrie: "\u22ED",
      nsc: "\u2281",
      nsccue: "\u22E1",
      nsce: "\u2AB0\u0338",
      nscr: "\u{1D4C3}",
      nshortmid: "\u2224",
      nshortparallel: "\u2226",
      nsim: "\u2241",
      nsime: "\u2244",
      nsimeq: "\u2244",
      nsmid: "\u2224",
      nspar: "\u2226",
      nsqsube: "\u22E2",
      nsqsupe: "\u22E3",
      nsub: "\u2284",
      nsubE: "\u2AC5\u0338",
      nsube: "\u2288",
      nsubset: "\u2282\u20D2",
      nsubseteq: "\u2288",
      nsubseteqq: "\u2AC5\u0338",
      nsucc: "\u2281",
      nsucceq: "\u2AB0\u0338",
      nsup: "\u2285",
      nsupE: "\u2AC6\u0338",
      nsupe: "\u2289",
      nsupset: "\u2283\u20D2",
      nsupseteq: "\u2289",
      nsupseteqq: "\u2AC6\u0338",
      ntgl: "\u2279",
      ntild: "\xF1",
      ntilde: "\xF1",
      ntlg: "\u2278",
      ntriangleleft: "\u22EA",
      ntrianglelefteq: "\u22EC",
      ntriangleright: "\u22EB",
      ntrianglerighteq: "\u22ED",
      nu: "\u03BD",
      num: "#",
      numero: "\u2116",
      numsp: "\u2007",
      nvDash: "\u22AD",
      nvHarr: "\u2904",
      nvap: "\u224D\u20D2",
      nvdash: "\u22AC",
      nvge: "\u2265\u20D2",
      nvgt: ">\u20D2",
      nvinfin: "\u29DE",
      nvlArr: "\u2902",
      nvle: "\u2264\u20D2",
      nvlt: "<\u20D2",
      nvltrie: "\u22B4\u20D2",
      nvrArr: "\u2903",
      nvrtrie: "\u22B5\u20D2",
      nvsim: "\u223C\u20D2",
      nwArr: "\u21D6",
      nwarhk: "\u2923",
      nwarr: "\u2196",
      nwarrow: "\u2196",
      nwnear: "\u2927",
      oS: "\u24C8",
      oacut: "\xF3",
      oacute: "\xF3",
      oast: "\u229B",
      ocir: "\xF4",
      ocirc: "\xF4",
      ocy: "\u043E",
      odash: "\u229D",
      odblac: "\u0151",
      odiv: "\u2A38",
      odot: "\u2299",
      odsold: "\u29BC",
      oelig: "\u0153",
      ofcir: "\u29BF",
      ofr: "\u{1D52C}",
      ogon: "\u02DB",
      ograv: "\xF2",
      ograve: "\xF2",
      ogt: "\u29C1",
      ohbar: "\u29B5",
      ohm: "\u03A9",
      oint: "\u222E",
      olarr: "\u21BA",
      olcir: "\u29BE",
      olcross: "\u29BB",
      oline: "\u203E",
      olt: "\u29C0",
      omacr: "\u014D",
      omega: "\u03C9",
      omicron: "\u03BF",
      omid: "\u29B6",
      ominus: "\u2296",
      oopf: "\u{1D560}",
      opar: "\u29B7",
      operp: "\u29B9",
      oplus: "\u2295",
      or: "\u2228",
      orarr: "\u21BB",
      ord: "\xBA",
      order: "\u2134",
      orderof: "\u2134",
      ordf: "\xAA",
      ordm: "\xBA",
      origof: "\u22B6",
      oror: "\u2A56",
      orslope: "\u2A57",
      orv: "\u2A5B",
      oscr: "\u2134",
      oslas: "\xF8",
      oslash: "\xF8",
      osol: "\u2298",
      otild: "\xF5",
      otilde: "\xF5",
      otimes: "\u2297",
      otimesas: "\u2A36",
      oum: "\xF6",
      ouml: "\xF6",
      ovbar: "\u233D",
      par: "\xB6",
      para: "\xB6",
      parallel: "\u2225",
      parsim: "\u2AF3",
      parsl: "\u2AFD",
      part: "\u2202",
      pcy: "\u043F",
      percnt: "%",
      period: ".",
      permil: "\u2030",
      perp: "\u22A5",
      pertenk: "\u2031",
      pfr: "\u{1D52D}",
      phi: "\u03C6",
      phiv: "\u03D5",
      phmmat: "\u2133",
      phone: "\u260E",
      pi: "\u03C0",
      pitchfork: "\u22D4",
      piv: "\u03D6",
      planck: "\u210F",
      planckh: "\u210E",
      plankv: "\u210F",
      plus: "+",
      plusacir: "\u2A23",
      plusb: "\u229E",
      pluscir: "\u2A22",
      plusdo: "\u2214",
      plusdu: "\u2A25",
      pluse: "\u2A72",
      plusm: "\xB1",
      plusmn: "\xB1",
      plussim: "\u2A26",
      plustwo: "\u2A27",
      pm: "\xB1",
      pointint: "\u2A15",
      popf: "\u{1D561}",
      poun: "\xA3",
      pound: "\xA3",
      pr: "\u227A",
      prE: "\u2AB3",
      prap: "\u2AB7",
      prcue: "\u227C",
      pre: "\u2AAF",
      prec: "\u227A",
      precapprox: "\u2AB7",
      preccurlyeq: "\u227C",
      preceq: "\u2AAF",
      precnapprox: "\u2AB9",
      precneqq: "\u2AB5",
      precnsim: "\u22E8",
      precsim: "\u227E",
      prime: "\u2032",
      primes: "\u2119",
      prnE: "\u2AB5",
      prnap: "\u2AB9",
      prnsim: "\u22E8",
      prod: "\u220F",
      profalar: "\u232E",
      profline: "\u2312",
      profsurf: "\u2313",
      prop: "\u221D",
      propto: "\u221D",
      prsim: "\u227E",
      prurel: "\u22B0",
      pscr: "\u{1D4C5}",
      psi: "\u03C8",
      puncsp: "\u2008",
      qfr: "\u{1D52E}",
      qint: "\u2A0C",
      qopf: "\u{1D562}",
      qprime: "\u2057",
      qscr: "\u{1D4C6}",
      quaternions: "\u210D",
      quatint: "\u2A16",
      quest: "?",
      questeq: "\u225F",
      quo: '"',
      quot: '"',
      rAarr: "\u21DB",
      rArr: "\u21D2",
      rAtail: "\u291C",
      rBarr: "\u290F",
      rHar: "\u2964",
      race: "\u223D\u0331",
      racute: "\u0155",
      radic: "\u221A",
      raemptyv: "\u29B3",
      rang: "\u27E9",
      rangd: "\u2992",
      range: "\u29A5",
      rangle: "\u27E9",
      raqu: "\xBB",
      raquo: "\xBB",
      rarr: "\u2192",
      rarrap: "\u2975",
      rarrb: "\u21E5",
      rarrbfs: "\u2920",
      rarrc: "\u2933",
      rarrfs: "\u291E",
      rarrhk: "\u21AA",
      rarrlp: "\u21AC",
      rarrpl: "\u2945",
      rarrsim: "\u2974",
      rarrtl: "\u21A3",
      rarrw: "\u219D",
      ratail: "\u291A",
      ratio: "\u2236",
      rationals: "\u211A",
      rbarr: "\u290D",
      rbbrk: "\u2773",
      rbrace: "}",
      rbrack: "]",
      rbrke: "\u298C",
      rbrksld: "\u298E",
      rbrkslu: "\u2990",
      rcaron: "\u0159",
      rcedil: "\u0157",
      rceil: "\u2309",
      rcub: "}",
      rcy: "\u0440",
      rdca: "\u2937",
      rdldhar: "\u2969",
      rdquo: "\u201D",
      rdquor: "\u201D",
      rdsh: "\u21B3",
      real: "\u211C",
      realine: "\u211B",
      realpart: "\u211C",
      reals: "\u211D",
      rect: "\u25AD",
      re: "\xAE",
      reg: "\xAE",
      rfisht: "\u297D",
      rfloor: "\u230B",
      rfr: "\u{1D52F}",
      rhard: "\u21C1",
      rharu: "\u21C0",
      rharul: "\u296C",
      rho: "\u03C1",
      rhov: "\u03F1",
      rightarrow: "\u2192",
      rightarrowtail: "\u21A3",
      rightharpoondown: "\u21C1",
      rightharpoonup: "\u21C0",
      rightleftarrows: "\u21C4",
      rightleftharpoons: "\u21CC",
      rightrightarrows: "\u21C9",
      rightsquigarrow: "\u219D",
      rightthreetimes: "\u22CC",
      ring: "\u02DA",
      risingdotseq: "\u2253",
      rlarr: "\u21C4",
      rlhar: "\u21CC",
      rlm: "\u200F",
      rmoust: "\u23B1",
      rmoustache: "\u23B1",
      rnmid: "\u2AEE",
      roang: "\u27ED",
      roarr: "\u21FE",
      robrk: "\u27E7",
      ropar: "\u2986",
      ropf: "\u{1D563}",
      roplus: "\u2A2E",
      rotimes: "\u2A35",
      rpar: ")",
      rpargt: "\u2994",
      rppolint: "\u2A12",
      rrarr: "\u21C9",
      rsaquo: "\u203A",
      rscr: "\u{1D4C7}",
      rsh: "\u21B1",
      rsqb: "]",
      rsquo: "\u2019",
      rsquor: "\u2019",
      rthree: "\u22CC",
      rtimes: "\u22CA",
      rtri: "\u25B9",
      rtrie: "\u22B5",
      rtrif: "\u25B8",
      rtriltri: "\u29CE",
      ruluhar: "\u2968",
      rx: "\u211E",
      sacute: "\u015B",
      sbquo: "\u201A",
      sc: "\u227B",
      scE: "\u2AB4",
      scap: "\u2AB8",
      scaron: "\u0161",
      sccue: "\u227D",
      sce: "\u2AB0",
      scedil: "\u015F",
      scirc: "\u015D",
      scnE: "\u2AB6",
      scnap: "\u2ABA",
      scnsim: "\u22E9",
      scpolint: "\u2A13",
      scsim: "\u227F",
      scy: "\u0441",
      sdot: "\u22C5",
      sdotb: "\u22A1",
      sdote: "\u2A66",
      seArr: "\u21D8",
      searhk: "\u2925",
      searr: "\u2198",
      searrow: "\u2198",
      sec: "\xA7",
      sect: "\xA7",
      semi: ";",
      seswar: "\u2929",
      setminus: "\u2216",
      setmn: "\u2216",
      sext: "\u2736",
      sfr: "\u{1D530}",
      sfrown: "\u2322",
      sharp: "\u266F",
      shchcy: "\u0449",
      shcy: "\u0448",
      shortmid: "\u2223",
      shortparallel: "\u2225",
      sh: "\xAD",
      shy: "\xAD",
      sigma: "\u03C3",
      sigmaf: "\u03C2",
      sigmav: "\u03C2",
      sim: "\u223C",
      simdot: "\u2A6A",
      sime: "\u2243",
      simeq: "\u2243",
      simg: "\u2A9E",
      simgE: "\u2AA0",
      siml: "\u2A9D",
      simlE: "\u2A9F",
      simne: "\u2246",
      simplus: "\u2A24",
      simrarr: "\u2972",
      slarr: "\u2190",
      smallsetminus: "\u2216",
      smashp: "\u2A33",
      smeparsl: "\u29E4",
      smid: "\u2223",
      smile: "\u2323",
      smt: "\u2AAA",
      smte: "\u2AAC",
      smtes: "\u2AAC\uFE00",
      softcy: "\u044C",
      sol: "/",
      solb: "\u29C4",
      solbar: "\u233F",
      sopf: "\u{1D564}",
      spades: "\u2660",
      spadesuit: "\u2660",
      spar: "\u2225",
      sqcap: "\u2293",
      sqcaps: "\u2293\uFE00",
      sqcup: "\u2294",
      sqcups: "\u2294\uFE00",
      sqsub: "\u228F",
      sqsube: "\u2291",
      sqsubset: "\u228F",
      sqsubseteq: "\u2291",
      sqsup: "\u2290",
      sqsupe: "\u2292",
      sqsupset: "\u2290",
      sqsupseteq: "\u2292",
      squ: "\u25A1",
      square: "\u25A1",
      squarf: "\u25AA",
      squf: "\u25AA",
      srarr: "\u2192",
      sscr: "\u{1D4C8}",
      ssetmn: "\u2216",
      ssmile: "\u2323",
      sstarf: "\u22C6",
      star: "\u2606",
      starf: "\u2605",
      straightepsilon: "\u03F5",
      straightphi: "\u03D5",
      strns: "\xAF",
      sub: "\u2282",
      subE: "\u2AC5",
      subdot: "\u2ABD",
      sube: "\u2286",
      subedot: "\u2AC3",
      submult: "\u2AC1",
      subnE: "\u2ACB",
      subne: "\u228A",
      subplus: "\u2ABF",
      subrarr: "\u2979",
      subset: "\u2282",
      subseteq: "\u2286",
      subseteqq: "\u2AC5",
      subsetneq: "\u228A",
      subsetneqq: "\u2ACB",
      subsim: "\u2AC7",
      subsub: "\u2AD5",
      subsup: "\u2AD3",
      succ: "\u227B",
      succapprox: "\u2AB8",
      succcurlyeq: "\u227D",
      succeq: "\u2AB0",
      succnapprox: "\u2ABA",
      succneqq: "\u2AB6",
      succnsim: "\u22E9",
      succsim: "\u227F",
      sum: "\u2211",
      sung: "\u266A",
      sup: "\u2283",
      sup1: "\xB9",
      sup2: "\xB2",
      sup3: "\xB3",
      supE: "\u2AC6",
      supdot: "\u2ABE",
      supdsub: "\u2AD8",
      supe: "\u2287",
      supedot: "\u2AC4",
      suphsol: "\u27C9",
      suphsub: "\u2AD7",
      suplarr: "\u297B",
      supmult: "\u2AC2",
      supnE: "\u2ACC",
      supne: "\u228B",
      supplus: "\u2AC0",
      supset: "\u2283",
      supseteq: "\u2287",
      supseteqq: "\u2AC6",
      supsetneq: "\u228B",
      supsetneqq: "\u2ACC",
      supsim: "\u2AC8",
      supsub: "\u2AD4",
      supsup: "\u2AD6",
      swArr: "\u21D9",
      swarhk: "\u2926",
      swarr: "\u2199",
      swarrow: "\u2199",
      swnwar: "\u292A",
      szli: "\xDF",
      szlig: "\xDF",
      target: "\u2316",
      tau: "\u03C4",
      tbrk: "\u23B4",
      tcaron: "\u0165",
      tcedil: "\u0163",
      tcy: "\u0442",
      tdot: "\u20DB",
      telrec: "\u2315",
      tfr: "\u{1D531}",
      there4: "\u2234",
      therefore: "\u2234",
      theta: "\u03B8",
      thetasym: "\u03D1",
      thetav: "\u03D1",
      thickapprox: "\u2248",
      thicksim: "\u223C",
      thinsp: "\u2009",
      thkap: "\u2248",
      thksim: "\u223C",
      thor: "\xFE",
      thorn: "\xFE",
      tilde: "\u02DC",
      time: "\xD7",
      times: "\xD7",
      timesb: "\u22A0",
      timesbar: "\u2A31",
      timesd: "\u2A30",
      tint: "\u222D",
      toea: "\u2928",
      top: "\u22A4",
      topbot: "\u2336",
      topcir: "\u2AF1",
      topf: "\u{1D565}",
      topfork: "\u2ADA",
      tosa: "\u2929",
      tprime: "\u2034",
      trade: "\u2122",
      triangle: "\u25B5",
      triangledown: "\u25BF",
      triangleleft: "\u25C3",
      trianglelefteq: "\u22B4",
      triangleq: "\u225C",
      triangleright: "\u25B9",
      trianglerighteq: "\u22B5",
      tridot: "\u25EC",
      trie: "\u225C",
      triminus: "\u2A3A",
      triplus: "\u2A39",
      trisb: "\u29CD",
      tritime: "\u2A3B",
      trpezium: "\u23E2",
      tscr: "\u{1D4C9}",
      tscy: "\u0446",
      tshcy: "\u045B",
      tstrok: "\u0167",
      twixt: "\u226C",
      twoheadleftarrow: "\u219E",
      twoheadrightarrow: "\u21A0",
      uArr: "\u21D1",
      uHar: "\u2963",
      uacut: "\xFA",
      uacute: "\xFA",
      uarr: "\u2191",
      ubrcy: "\u045E",
      ubreve: "\u016D",
      ucir: "\xFB",
      ucirc: "\xFB",
      ucy: "\u0443",
      udarr: "\u21C5",
      udblac: "\u0171",
      udhar: "\u296E",
      ufisht: "\u297E",
      ufr: "\u{1D532}",
      ugrav: "\xF9",
      ugrave: "\xF9",
      uharl: "\u21BF",
      uharr: "\u21BE",
      uhblk: "\u2580",
      ulcorn: "\u231C",
      ulcorner: "\u231C",
      ulcrop: "\u230F",
      ultri: "\u25F8",
      umacr: "\u016B",
      um: "\xA8",
      uml: "\xA8",
      uogon: "\u0173",
      uopf: "\u{1D566}",
      uparrow: "\u2191",
      updownarrow: "\u2195",
      upharpoonleft: "\u21BF",
      upharpoonright: "\u21BE",
      uplus: "\u228E",
      upsi: "\u03C5",
      upsih: "\u03D2",
      upsilon: "\u03C5",
      upuparrows: "\u21C8",
      urcorn: "\u231D",
      urcorner: "\u231D",
      urcrop: "\u230E",
      uring: "\u016F",
      urtri: "\u25F9",
      uscr: "\u{1D4CA}",
      utdot: "\u22F0",
      utilde: "\u0169",
      utri: "\u25B5",
      utrif: "\u25B4",
      uuarr: "\u21C8",
      uum: "\xFC",
      uuml: "\xFC",
      uwangle: "\u29A7",
      vArr: "\u21D5",
      vBar: "\u2AE8",
      vBarv: "\u2AE9",
      vDash: "\u22A8",
      vangrt: "\u299C",
      varepsilon: "\u03F5",
      varkappa: "\u03F0",
      varnothing: "\u2205",
      varphi: "\u03D5",
      varpi: "\u03D6",
      varpropto: "\u221D",
      varr: "\u2195",
      varrho: "\u03F1",
      varsigma: "\u03C2",
      varsubsetneq: "\u228A\uFE00",
      varsubsetneqq: "\u2ACB\uFE00",
      varsupsetneq: "\u228B\uFE00",
      varsupsetneqq: "\u2ACC\uFE00",
      vartheta: "\u03D1",
      vartriangleleft: "\u22B2",
      vartriangleright: "\u22B3",
      vcy: "\u0432",
      vdash: "\u22A2",
      vee: "\u2228",
      veebar: "\u22BB",
      veeeq: "\u225A",
      vellip: "\u22EE",
      verbar: "|",
      vert: "|",
      vfr: "\u{1D533}",
      vltri: "\u22B2",
      vnsub: "\u2282\u20D2",
      vnsup: "\u2283\u20D2",
      vopf: "\u{1D567}",
      vprop: "\u221D",
      vrtri: "\u22B3",
      vscr: "\u{1D4CB}",
      vsubnE: "\u2ACB\uFE00",
      vsubne: "\u228A\uFE00",
      vsupnE: "\u2ACC\uFE00",
      vsupne: "\u228B\uFE00",
      vzigzag: "\u299A",
      wcirc: "\u0175",
      wedbar: "\u2A5F",
      wedge: "\u2227",
      wedgeq: "\u2259",
      weierp: "\u2118",
      wfr: "\u{1D534}",
      wopf: "\u{1D568}",
      wp: "\u2118",
      wr: "\u2240",
      wreath: "\u2240",
      wscr: "\u{1D4CC}",
      xcap: "\u22C2",
      xcirc: "\u25EF",
      xcup: "\u22C3",
      xdtri: "\u25BD",
      xfr: "\u{1D535}",
      xhArr: "\u27FA",
      xharr: "\u27F7",
      xi: "\u03BE",
      xlArr: "\u27F8",
      xlarr: "\u27F5",
      xmap: "\u27FC",
      xnis: "\u22FB",
      xodot: "\u2A00",
      xopf: "\u{1D569}",
      xoplus: "\u2A01",
      xotime: "\u2A02",
      xrArr: "\u27F9",
      xrarr: "\u27F6",
      xscr: "\u{1D4CD}",
      xsqcup: "\u2A06",
      xuplus: "\u2A04",
      xutri: "\u25B3",
      xvee: "\u22C1",
      xwedge: "\u22C0",
      yacut: "\xFD",
      yacute: "\xFD",
      yacy: "\u044F",
      ycirc: "\u0177",
      ycy: "\u044B",
      ye: "\xA5",
      yen: "\xA5",
      yfr: "\u{1D536}",
      yicy: "\u0457",
      yopf: "\u{1D56A}",
      yscr: "\u{1D4CE}",
      yucy: "\u044E",
      yum: "\xFF",
      yuml: "\xFF",
      zacute: "\u017A",
      zcaron: "\u017E",
      zcy: "\u0437",
      zdot: "\u017C",
      zeetrf: "\u2128",
      zeta: "\u03B6",
      zfr: "\u{1D537}",
      zhcy: "\u0436",
      zigrarr: "\u21DD",
      zopf: "\u{1D56B}",
      zscr: "\u{1D4CF}",
      zwj: "\u200D",
      zwnj: "\u200C"
    };
  }
});

// node_modules/parse-entities/decode-entity.js
var require_decode_entity = __commonJS({
  "node_modules/parse-entities/decode-entity.js"(exports, module2) {
    "use strict";
    var characterEntities = require_character_entities();
    module2.exports = decodeEntity;
    var own = {}.hasOwnProperty;
    function decodeEntity(characters) {
      return own.call(characterEntities, characters) ? characterEntities[characters] : false;
    }
  }
});

// node_modules/parse-entities/index.js
var require_parse_entities = __commonJS({
  "node_modules/parse-entities/index.js"(exports, module2) {
    "use strict";
    var legacy = require_character_entities_legacy();
    var invalid = require_character_reference_invalid();
    var decimal = require_is_decimal();
    var hexadecimal = require_is_hexadecimal();
    var alphanumerical = require_is_alphanumerical();
    var decodeEntity = require_decode_entity();
    module2.exports = parseEntities;
    var own = {}.hasOwnProperty;
    var fromCharCode = String.fromCharCode;
    var noop = Function.prototype;
    var defaults = {
      warning: null,
      reference: null,
      text: null,
      warningContext: null,
      referenceContext: null,
      textContext: null,
      position: {},
      additional: null,
      attribute: false,
      nonTerminated: true
    };
    var tab = 9;
    var lineFeed = 10;
    var formFeed = 12;
    var space2 = 32;
    var ampersand = 38;
    var semicolon = 59;
    var lessThan = 60;
    var equalsTo = 61;
    var numberSign = 35;
    var uppercaseX = 88;
    var lowercaseX = 120;
    var replacementCharacter = 65533;
    var name = "named";
    var hexa = "hexadecimal";
    var deci = "decimal";
    var bases = {};
    bases[hexa] = 16;
    bases[deci] = 10;
    var tests = {};
    tests[name] = alphanumerical;
    tests[deci] = decimal;
    tests[hexa] = hexadecimal;
    var namedNotTerminated = 1;
    var numericNotTerminated = 2;
    var namedEmpty = 3;
    var numericEmpty = 4;
    var namedUnknown = 5;
    var numericDisallowed = 6;
    var numericProhibited = 7;
    var messages = {};
    messages[namedNotTerminated] = "Named character references must be terminated by a semicolon";
    messages[numericNotTerminated] = "Numeric character references must be terminated by a semicolon";
    messages[namedEmpty] = "Named character references cannot be empty";
    messages[numericEmpty] = "Numeric character references cannot be empty";
    messages[namedUnknown] = "Named character references must be known";
    messages[numericDisallowed] = "Numeric character references cannot be disallowed";
    messages[numericProhibited] = "Numeric character references cannot be outside the permissible Unicode range";
    function parseEntities(value, options) {
      var settings = {};
      var option;
      var key;
      if (!options) {
        options = {};
      }
      for (key in defaults) {
        option = options[key];
        settings[key] = option === null || option === void 0 ? defaults[key] : option;
      }
      if (settings.position.indent || settings.position.start) {
        settings.indent = settings.position.indent || [];
        settings.position = settings.position.start;
      }
      return parse(value, settings);
    }
    function parse(value, settings) {
      var additional = settings.additional;
      var nonTerminated = settings.nonTerminated;
      var handleText = settings.text;
      var handleReference = settings.reference;
      var handleWarning = settings.warning;
      var textContext = settings.textContext;
      var referenceContext = settings.referenceContext;
      var warningContext = settings.warningContext;
      var pos = settings.position;
      var indent = settings.indent || [];
      var length = value.length;
      var index = 0;
      var lines = -1;
      var column = pos.column || 1;
      var line = pos.line || 1;
      var queue = "";
      var result = [];
      var entityCharacters;
      var namedEntity;
      var terminated;
      var characters;
      var character;
      var reference;
      var following;
      var warning;
      var reason;
      var output;
      var entity;
      var begin;
      var start;
      var type;
      var test;
      var prev;
      var next;
      var diff;
      var end;
      if (typeof additional === "string") {
        additional = additional.charCodeAt(0);
      }
      prev = now();
      warning = handleWarning ? parseError : noop;
      index--;
      length++;
      while (++index < length) {
        if (character === lineFeed) {
          column = indent[lines] || 1;
        }
        character = value.charCodeAt(index);
        if (character === ampersand) {
          following = value.charCodeAt(index + 1);
          if (following === tab || following === lineFeed || following === formFeed || following === space2 || following === ampersand || following === lessThan || following !== following || additional && following === additional) {
            queue += fromCharCode(character);
            column++;
            continue;
          }
          start = index + 1;
          begin = start;
          end = start;
          if (following === numberSign) {
            end = ++begin;
            following = value.charCodeAt(end);
            if (following === uppercaseX || following === lowercaseX) {
              type = hexa;
              end = ++begin;
            } else {
              type = deci;
            }
          } else {
            type = name;
          }
          entityCharacters = "";
          entity = "";
          characters = "";
          test = tests[type];
          end--;
          while (++end < length) {
            following = value.charCodeAt(end);
            if (!test(following)) {
              break;
            }
            characters += fromCharCode(following);
            if (type === name && own.call(legacy, characters)) {
              entityCharacters = characters;
              entity = legacy[characters];
            }
          }
          terminated = value.charCodeAt(end) === semicolon;
          if (terminated) {
            end++;
            namedEntity = type === name ? decodeEntity(characters) : false;
            if (namedEntity) {
              entityCharacters = characters;
              entity = namedEntity;
            }
          }
          diff = 1 + end - start;
          if (!terminated && !nonTerminated) {
          } else if (!characters) {
            if (type !== name) {
              warning(numericEmpty, diff);
            }
          } else if (type === name) {
            if (terminated && !entity) {
              warning(namedUnknown, 1);
            } else {
              if (entityCharacters !== characters) {
                end = begin + entityCharacters.length;
                diff = 1 + end - begin;
                terminated = false;
              }
              if (!terminated) {
                reason = entityCharacters ? namedNotTerminated : namedEmpty;
                if (settings.attribute) {
                  following = value.charCodeAt(end);
                  if (following === equalsTo) {
                    warning(reason, diff);
                    entity = null;
                  } else if (alphanumerical(following)) {
                    entity = null;
                  } else {
                    warning(reason, diff);
                  }
                } else {
                  warning(reason, diff);
                }
              }
            }
            reference = entity;
          } else {
            if (!terminated) {
              warning(numericNotTerminated, diff);
            }
            reference = parseInt(characters, bases[type]);
            if (prohibited(reference)) {
              warning(numericProhibited, diff);
              reference = fromCharCode(replacementCharacter);
            } else if (reference in invalid) {
              warning(numericDisallowed, diff);
              reference = invalid[reference];
            } else {
              output = "";
              if (disallowed(reference)) {
                warning(numericDisallowed, diff);
              }
              if (reference > 65535) {
                reference -= 65536;
                output += fromCharCode(reference >>> (10 & 1023) | 55296);
                reference = 56320 | reference & 1023;
              }
              reference = output + fromCharCode(reference);
            }
          }
          if (reference) {
            flush();
            prev = now();
            index = end - 1;
            column += end - start + 1;
            result.push(reference);
            next = now();
            next.offset++;
            if (handleReference) {
              handleReference.call(
                referenceContext,
                reference,
                { start: prev, end: next },
                value.slice(start - 1, end)
              );
            }
            prev = next;
          } else {
            characters = value.slice(start - 1, end);
            queue += characters;
            column += characters.length;
            index = end - 1;
          }
        } else {
          if (character === 10) {
            line++;
            lines++;
            column = 0;
          }
          if (character === character) {
            queue += fromCharCode(character);
            column++;
          } else {
            flush();
          }
        }
      }
      return result.join("");
      function now() {
        return {
          line,
          column,
          offset: index + (pos.offset || 0)
        };
      }
      function parseError(code, offset) {
        var position = now();
        position.column += offset;
        position.offset += offset;
        handleWarning.call(warningContext, messages[code], position, code);
      }
      function flush() {
        if (queue) {
          result.push(queue);
          if (handleText) {
            handleText.call(textContext, queue, { start: prev, end: now() });
          }
          queue = "";
        }
      }
    }
    function prohibited(code) {
      return code >= 55296 && code <= 57343 || code > 1114111;
    }
    function disallowed(code) {
      return code >= 1 && code <= 8 || code === 11 || code >= 13 && code <= 31 || code >= 127 && code <= 159 || code >= 64976 && code <= 65007 || (code & 65535) === 65535 || (code & 65535) === 65534;
    }
  }
});

// node_modules/remark-parse/lib/decode.js
var require_decode = __commonJS({
  "node_modules/remark-parse/lib/decode.js"(exports, module2) {
    "use strict";
    var xtend = require_immutable();
    var entities = require_parse_entities();
    module2.exports = factory;
    function factory(ctx) {
      decoder.raw = decodeRaw;
      return decoder;
      function normalize(position) {
        var offsets = ctx.offset;
        var line = position.line;
        var result = [];
        while (++line) {
          if (!(line in offsets)) {
            break;
          }
          result.push((offsets[line] || 0) + 1);
        }
        return { start: position, indent: result };
      }
      function decoder(value, position, handler) {
        entities(value, {
          position: normalize(position),
          warning: handleWarning,
          text: handler,
          reference: handler,
          textContext: ctx,
          referenceContext: ctx
        });
      }
      function decodeRaw(value, position, options) {
        return entities(
          value,
          xtend(options, { position: normalize(position), warning: handleWarning })
        );
      }
      function handleWarning(reason, position, code) {
        if (code !== 3) {
          ctx.file.message(reason, position);
        }
      }
    }
  }
});

// node_modules/remark-parse/lib/tokenizer.js
var require_tokenizer = __commonJS({
  "node_modules/remark-parse/lib/tokenizer.js"(exports, module2) {
    "use strict";
    module2.exports = factory;
    function factory(type) {
      return tokenize;
      function tokenize(value, location) {
        var self = this;
        var offset = self.offset;
        var tokens = [];
        var methods = self[type + "Methods"];
        var tokenizers = self[type + "Tokenizers"];
        var line = location.line;
        var column = location.column;
        var index;
        var length;
        var method;
        var name;
        var matched;
        var valueLength;
        if (!value) {
          return tokens;
        }
        eat.now = now;
        eat.file = self.file;
        updatePosition("");
        while (value) {
          index = -1;
          length = methods.length;
          matched = false;
          while (++index < length) {
            name = methods[index];
            method = tokenizers[name];
            if (method && /* istanbul ignore next */
            (!method.onlyAtStart || self.atStart) && (!method.notInList || !self.inList) && (!method.notInBlock || !self.inBlock) && (!method.notInLink || !self.inLink)) {
              valueLength = value.length;
              method.apply(self, [eat, value]);
              matched = valueLength !== value.length;
              if (matched) {
                break;
              }
            }
          }
          if (!matched) {
            self.file.fail(new Error("Infinite loop"), eat.now());
          }
        }
        self.eof = now();
        return tokens;
        function updatePosition(subvalue) {
          var lastIndex = -1;
          var index2 = subvalue.indexOf("\n");
          while (index2 !== -1) {
            line++;
            lastIndex = index2;
            index2 = subvalue.indexOf("\n", index2 + 1);
          }
          if (lastIndex === -1) {
            column += subvalue.length;
          } else {
            column = subvalue.length - lastIndex;
          }
          if (line in offset) {
            if (lastIndex !== -1) {
              column += offset[line];
            } else if (column <= offset[line]) {
              column = offset[line] + 1;
            }
          }
        }
        function getOffset() {
          var indentation = [];
          var pos = line + 1;
          return function() {
            var last = line + 1;
            while (pos < last) {
              indentation.push((offset[pos] || 0) + 1);
              pos++;
            }
            return indentation;
          };
        }
        function now() {
          var pos = { line, column };
          pos.offset = self.toOffset(pos);
          return pos;
        }
        function Position(start) {
          this.start = start;
          this.end = now();
        }
        function validateEat(subvalue) {
          if (value.slice(0, subvalue.length) !== subvalue) {
            self.file.fail(
              new Error(
                "Incorrectly eaten value: please report this warning on https://git.io/vg5Ft"
              ),
              now()
            );
          }
        }
        function position() {
          var before = now();
          return update;
          function update(node, indent) {
            var prev = node.position;
            var start = prev ? prev.start : before;
            var combined = [];
            var n = prev && prev.end.line;
            var l = before.line;
            node.position = new Position(start);
            if (prev && indent && prev.indent) {
              combined = prev.indent;
              if (n < l) {
                while (++n < l) {
                  combined.push((offset[n] || 0) + 1);
                }
                combined.push(before.column);
              }
              indent = combined.concat(indent);
            }
            node.position.indent = indent || [];
            return node;
          }
        }
        function add(node, parent) {
          var children = parent ? parent.children : tokens;
          var prev = children[children.length - 1];
          var fn;
          if (prev && node.type === prev.type && (node.type === "text" || node.type === "blockquote") && mergeable(prev) && mergeable(node)) {
            fn = node.type === "text" ? mergeText : mergeBlockquote;
            node = fn.call(self, prev, node);
          }
          if (node !== prev) {
            children.push(node);
          }
          if (self.atStart && tokens.length !== 0) {
            self.exitStart();
          }
          return node;
        }
        function eat(subvalue) {
          var indent = getOffset();
          var pos = position();
          var current = now();
          validateEat(subvalue);
          apply.reset = reset;
          reset.test = test;
          apply.test = test;
          value = value.slice(subvalue.length);
          updatePosition(subvalue);
          indent = indent();
          return apply;
          function apply(node, parent) {
            return pos(add(pos(node), parent), indent);
          }
          function reset() {
            var node = apply.apply(null, arguments);
            line = current.line;
            column = current.column;
            value = subvalue + value;
            return node;
          }
          function test() {
            var result = pos({});
            line = current.line;
            column = current.column;
            value = subvalue + value;
            return result.position;
          }
        }
      }
    }
    function mergeable(node) {
      var start;
      var end;
      if (node.type !== "text" || !node.position) {
        return true;
      }
      start = node.position.start;
      end = node.position.end;
      return start.line !== end.line || end.column - start.column === node.value.length;
    }
    function mergeText(prev, node) {
      prev.value += node.value;
      return prev;
    }
    function mergeBlockquote(prev, node) {
      if (this.options.commonmark || this.options.gfm) {
        return node;
      }
      prev.children = prev.children.concat(node.children);
      return prev;
    }
  }
});

// node_modules/markdown-escapes/index.js
var require_markdown_escapes = __commonJS({
  "node_modules/markdown-escapes/index.js"(exports, module2) {
    "use strict";
    module2.exports = escapes;
    var defaults = [
      "\\",
      "`",
      "*",
      "{",
      "}",
      "[",
      "]",
      "(",
      ")",
      "#",
      "+",
      "-",
      ".",
      "!",
      "_",
      ">"
    ];
    var gfm = defaults.concat(["~", "|"]);
    var commonmark = gfm.concat([
      "\n",
      '"',
      "$",
      "%",
      "&",
      "'",
      ",",
      "/",
      ":",
      ";",
      "<",
      "=",
      "?",
      "@",
      "^"
    ]);
    escapes.default = defaults;
    escapes.gfm = gfm;
    escapes.commonmark = commonmark;
    function escapes(options) {
      var settings = options || {};
      if (settings.commonmark) {
        return commonmark;
      }
      return settings.gfm ? gfm : defaults;
    }
  }
});

// node_modules/remark-parse/lib/block-elements.js
var require_block_elements = __commonJS({
  "node_modules/remark-parse/lib/block-elements.js"(exports, module2) {
    "use strict";
    module2.exports = [
      "address",
      "article",
      "aside",
      "base",
      "basefont",
      "blockquote",
      "body",
      "caption",
      "center",
      "col",
      "colgroup",
      "dd",
      "details",
      "dialog",
      "dir",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "frame",
      "frameset",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "iframe",
      "legend",
      "li",
      "link",
      "main",
      "menu",
      "menuitem",
      "meta",
      "nav",
      "noframes",
      "ol",
      "optgroup",
      "option",
      "p",
      "param",
      "pre",
      "section",
      "source",
      "title",
      "summary",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "title",
      "tr",
      "track",
      "ul"
    ];
  }
});

// node_modules/remark-parse/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/remark-parse/lib/defaults.js"(exports, module2) {
    "use strict";
    module2.exports = {
      position: true,
      gfm: true,
      commonmark: false,
      footnotes: false,
      pedantic: false,
      blocks: require_block_elements()
    };
  }
});

// node_modules/remark-parse/lib/set-options.js
var require_set_options = __commonJS({
  "node_modules/remark-parse/lib/set-options.js"(exports, module2) {
    "use strict";
    var xtend = require_immutable();
    var escapes = require_markdown_escapes();
    var defaults = require_defaults();
    module2.exports = setOptions;
    function setOptions(options) {
      var self = this;
      var current = self.options;
      var key;
      var value;
      if (options == null) {
        options = {};
      } else if (typeof options === "object") {
        options = xtend(options);
      } else {
        throw new Error("Invalid value `" + options + "` for setting `options`");
      }
      for (key in defaults) {
        value = options[key];
        if (value == null) {
          value = current[key];
        }
        if (key !== "blocks" && typeof value !== "boolean" || key === "blocks" && typeof value !== "object") {
          throw new Error(
            "Invalid value `" + value + "` for setting `options." + key + "`"
          );
        }
        options[key] = value;
      }
      self.options = options;
      self.escape = escapes(options);
      return self;
    }
  }
});

// node_modules/unist-util-remove-position/node_modules/unist-util-is/convert.js
var require_convert = __commonJS({
  "node_modules/unist-util-remove-position/node_modules/unist-util-is/convert.js"(exports, module2) {
    "use strict";
    module2.exports = convert;
    function convert(test) {
      if (typeof test === "string") {
        return typeFactory(test);
      }
      if (test === null || test === void 0) {
        return ok;
      }
      if (typeof test === "object") {
        return ("length" in test ? anyFactory : matchesFactory)(test);
      }
      if (typeof test === "function") {
        return test;
      }
      throw new Error("Expected function, string, or object as test");
    }
    function convertAll(tests) {
      var results = [];
      var length = tests.length;
      var index = -1;
      while (++index < length) {
        results[index] = convert(tests[index]);
      }
      return results;
    }
    function matchesFactory(test) {
      return matches;
      function matches(node) {
        var key;
        for (key in test) {
          if (node[key] !== test[key]) {
            return false;
          }
        }
        return true;
      }
    }
    function anyFactory(tests) {
      var checks = convertAll(tests);
      var length = checks.length;
      return matches;
      function matches() {
        var index = -1;
        while (++index < length) {
          if (checks[index].apply(this, arguments)) {
            return true;
          }
        }
        return false;
      }
    }
    function typeFactory(test) {
      return type;
      function type(node) {
        return Boolean(node && node.type === test);
      }
    }
    function ok() {
      return true;
    }
  }
});

// node_modules/unist-util-remove-position/node_modules/unist-util-visit-parents/index.js
var require_unist_util_visit_parents = __commonJS({
  "node_modules/unist-util-remove-position/node_modules/unist-util-visit-parents/index.js"(exports, module2) {
    "use strict";
    module2.exports = visitParents;
    var convert = require_convert();
    var CONTINUE = true;
    var SKIP = "skip";
    var EXIT = false;
    visitParents.CONTINUE = CONTINUE;
    visitParents.SKIP = SKIP;
    visitParents.EXIT = EXIT;
    function visitParents(tree, test, visitor, reverse) {
      var is;
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      is = convert(test);
      one(tree, null, []);
      function one(node, index, parents) {
        var result = [];
        var subresult;
        if (!test || is(node, index, parents[parents.length - 1] || null)) {
          result = toResult(visitor(node, parents));
          if (result[0] === EXIT) {
            return result;
          }
        }
        if (node.children && result[0] !== SKIP) {
          subresult = toResult(all2(node.children, parents.concat(node)));
          return subresult[0] === EXIT ? subresult : result;
        }
        return result;
      }
      function all2(children, parents) {
        var min = -1;
        var step = reverse ? -1 : 1;
        var index = (reverse ? children.length : min) + step;
        var result;
        while (index > min && index < children.length) {
          result = one(children[index], index, parents);
          if (result[0] === EXIT) {
            return result;
          }
          index = typeof result[1] === "number" ? result[1] : index + step;
        }
      }
    }
    function toResult(value) {
      if (value !== null && typeof value === "object" && "length" in value) {
        return value;
      }
      if (typeof value === "number") {
        return [CONTINUE, value];
      }
      return [value];
    }
  }
});

// node_modules/unist-util-remove-position/node_modules/unist-util-visit/index.js
var require_unist_util_visit = __commonJS({
  "node_modules/unist-util-remove-position/node_modules/unist-util-visit/index.js"(exports, module2) {
    "use strict";
    module2.exports = visit;
    var visitParents = require_unist_util_visit_parents();
    var CONTINUE = visitParents.CONTINUE;
    var SKIP = visitParents.SKIP;
    var EXIT = visitParents.EXIT;
    visit.CONTINUE = CONTINUE;
    visit.SKIP = SKIP;
    visit.EXIT = EXIT;
    function visit(tree, test, visitor, reverse) {
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      visitParents(tree, test, overload, reverse);
      function overload(node, parents) {
        var parent = parents[parents.length - 1];
        var index = parent ? parent.children.indexOf(node) : null;
        return visitor(node, index, parent);
      }
    }
  }
});

// node_modules/unist-util-remove-position/index.js
var require_unist_util_remove_position = __commonJS({
  "node_modules/unist-util-remove-position/index.js"(exports, module2) {
    "use strict";
    var visit = require_unist_util_visit();
    module2.exports = removePosition;
    function removePosition(node, force) {
      visit(node, force ? hard : soft);
      return node;
    }
    function hard(node) {
      delete node.position;
    }
    function soft(node) {
      node.position = void 0;
    }
  }
});

// node_modules/remark-parse/lib/parse.js
var require_parse = __commonJS({
  "node_modules/remark-parse/lib/parse.js"(exports, module2) {
    "use strict";
    var xtend = require_immutable();
    var removePosition = require_unist_util_remove_position();
    module2.exports = parse;
    var lineFeed = "\n";
    var lineBreaksExpression = /\r\n|\r/g;
    function parse() {
      var self = this;
      var value = String(self.file);
      var start = { line: 1, column: 1, offset: 0 };
      var content = xtend(start);
      var node;
      value = value.replace(lineBreaksExpression, lineFeed);
      if (value.charCodeAt(0) === 65279) {
        value = value.slice(1);
        content.column++;
        content.offset++;
      }
      node = {
        type: "root",
        children: self.tokenizeBlock(value, content),
        position: { start, end: self.eof || xtend(start) }
      };
      if (!self.options.position) {
        removePosition(node, true);
      }
      return node;
    }
  }
});

// node_modules/is-whitespace-character/index.js
var require_is_whitespace_character = __commonJS({
  "node_modules/is-whitespace-character/index.js"(exports, module2) {
    "use strict";
    module2.exports = whitespace;
    var fromCode = String.fromCharCode;
    var re = /\s/;
    function whitespace(character) {
      return re.test(
        typeof character === "number" ? fromCode(character) : character.charAt(0)
      );
    }
  }
});

// node_modules/remark-parse/lib/tokenize/newline.js
var require_newline = __commonJS({
  "node_modules/remark-parse/lib/tokenize/newline.js"(exports, module2) {
    "use strict";
    var whitespace = require_is_whitespace_character();
    module2.exports = newline;
    var lineFeed = "\n";
    function newline(eat, value, silent) {
      var character = value.charAt(0);
      var length;
      var subvalue;
      var queue;
      var index;
      if (character !== lineFeed) {
        return;
      }
      if (silent) {
        return true;
      }
      index = 1;
      length = value.length;
      subvalue = character;
      queue = "";
      while (index < length) {
        character = value.charAt(index);
        if (!whitespace(character)) {
          break;
        }
        queue += character;
        if (character === lineFeed) {
          subvalue += queue;
          queue = "";
        }
        index++;
      }
      eat(subvalue);
    }
  }
});

// node_modules/repeat-string/index.js
var require_repeat_string = __commonJS({
  "node_modules/repeat-string/index.js"(exports, module2) {
    "use strict";
    var res = "";
    var cache;
    module2.exports = repeat;
    function repeat(str, num) {
      if (typeof str !== "string") {
        throw new TypeError("expected a string");
      }
      if (num === 1)
        return str;
      if (num === 2)
        return str + str;
      var max = str.length * num;
      if (cache !== str || typeof cache === "undefined") {
        cache = str;
        res = "";
      } else if (res.length >= max) {
        return res.substr(0, max);
      }
      while (max > res.length && num > 1) {
        if (num & 1) {
          res += str;
        }
        num >>= 1;
        str += str;
      }
      res += str;
      res = res.substr(0, max);
      return res;
    }
  }
});

// node_modules/trim-trailing-lines/index.js
var require_trim_trailing_lines = __commonJS({
  "node_modules/trim-trailing-lines/index.js"(exports, module2) {
    "use strict";
    module2.exports = trimTrailingLines;
    var line = "\n";
    function trimTrailingLines(value) {
      var val = String(value);
      var index = val.length;
      while (val.charAt(--index) === line) {
      }
      return val.slice(0, index + 1);
    }
  }
});

// node_modules/remark-parse/lib/tokenize/code-indented.js
var require_code_indented = __commonJS({
  "node_modules/remark-parse/lib/tokenize/code-indented.js"(exports, module2) {
    "use strict";
    var repeat = require_repeat_string();
    var trim = require_trim_trailing_lines();
    module2.exports = indentedCode;
    var lineFeed = "\n";
    var tab = "	";
    var space2 = " ";
    var tabSize = 4;
    var codeIndent = repeat(space2, tabSize);
    function indentedCode(eat, value, silent) {
      var index = -1;
      var length = value.length;
      var subvalue = "";
      var content = "";
      var subvalueQueue = "";
      var contentQueue = "";
      var character;
      var blankQueue;
      var indent;
      while (++index < length) {
        character = value.charAt(index);
        if (indent) {
          indent = false;
          subvalue += subvalueQueue;
          content += contentQueue;
          subvalueQueue = "";
          contentQueue = "";
          if (character === lineFeed) {
            subvalueQueue = character;
            contentQueue = character;
          } else {
            subvalue += character;
            content += character;
            while (++index < length) {
              character = value.charAt(index);
              if (!character || character === lineFeed) {
                contentQueue = character;
                subvalueQueue = character;
                break;
              }
              subvalue += character;
              content += character;
            }
          }
        } else if (character === space2 && value.charAt(index + 1) === character && value.charAt(index + 2) === character && value.charAt(index + 3) === character) {
          subvalueQueue += codeIndent;
          index += 3;
          indent = true;
        } else if (character === tab) {
          subvalueQueue += character;
          indent = true;
        } else {
          blankQueue = "";
          while (character === tab || character === space2) {
            blankQueue += character;
            character = value.charAt(++index);
          }
          if (character !== lineFeed) {
            break;
          }
          subvalueQueue += blankQueue + character;
          contentQueue += character;
        }
      }
      if (content) {
        if (silent) {
          return true;
        }
        return eat(subvalue)({
          type: "code",
          lang: null,
          meta: null,
          value: trim(content)
        });
      }
    }
  }
});

// node_modules/remark-parse/lib/tokenize/code-fenced.js
var require_code_fenced = __commonJS({
  "node_modules/remark-parse/lib/tokenize/code-fenced.js"(exports, module2) {
    "use strict";
    module2.exports = fencedCode;
    var lineFeed = "\n";
    var tab = "	";
    var space2 = " ";
    var tilde = "~";
    var graveAccent = "`";
    var minFenceCount = 3;
    var tabSize = 4;
    function fencedCode(eat, value, silent) {
      var self = this;
      var gfm = self.options.gfm;
      var length = value.length + 1;
      var index = 0;
      var subvalue = "";
      var fenceCount;
      var marker;
      var character;
      var flag;
      var lang;
      var meta;
      var queue;
      var content;
      var exdentedContent;
      var closing;
      var exdentedClosing;
      var indent;
      var now;
      if (!gfm) {
        return;
      }
      while (index < length) {
        character = value.charAt(index);
        if (character !== space2 && character !== tab) {
          break;
        }
        subvalue += character;
        index++;
      }
      indent = index;
      character = value.charAt(index);
      if (character !== tilde && character !== graveAccent) {
        return;
      }
      index++;
      marker = character;
      fenceCount = 1;
      subvalue += character;
      while (index < length) {
        character = value.charAt(index);
        if (character !== marker) {
          break;
        }
        subvalue += character;
        fenceCount++;
        index++;
      }
      if (fenceCount < minFenceCount) {
        return;
      }
      while (index < length) {
        character = value.charAt(index);
        if (character !== space2 && character !== tab) {
          break;
        }
        subvalue += character;
        index++;
      }
      flag = "";
      queue = "";
      while (index < length) {
        character = value.charAt(index);
        if (character === lineFeed || marker === graveAccent && character === marker) {
          break;
        }
        if (character === space2 || character === tab) {
          queue += character;
        } else {
          flag += queue + character;
          queue = "";
        }
        index++;
      }
      character = value.charAt(index);
      if (character && character !== lineFeed) {
        return;
      }
      if (silent) {
        return true;
      }
      now = eat.now();
      now.column += subvalue.length;
      now.offset += subvalue.length;
      subvalue += flag;
      flag = self.decode.raw(self.unescape(flag), now);
      if (queue) {
        subvalue += queue;
      }
      queue = "";
      closing = "";
      exdentedClosing = "";
      content = "";
      exdentedContent = "";
      var skip = true;
      while (index < length) {
        character = value.charAt(index);
        content += closing;
        exdentedContent += exdentedClosing;
        closing = "";
        exdentedClosing = "";
        if (character !== lineFeed) {
          content += character;
          exdentedClosing += character;
          index++;
          continue;
        }
        if (skip) {
          subvalue += character;
          skip = false;
        } else {
          closing += character;
          exdentedClosing += character;
        }
        queue = "";
        index++;
        while (index < length) {
          character = value.charAt(index);
          if (character !== space2) {
            break;
          }
          queue += character;
          index++;
        }
        closing += queue;
        exdentedClosing += queue.slice(indent);
        if (queue.length >= tabSize) {
          continue;
        }
        queue = "";
        while (index < length) {
          character = value.charAt(index);
          if (character !== marker) {
            break;
          }
          queue += character;
          index++;
        }
        closing += queue;
        exdentedClosing += queue;
        if (queue.length < fenceCount) {
          continue;
        }
        queue = "";
        while (index < length) {
          character = value.charAt(index);
          if (character !== space2 && character !== tab) {
            break;
          }
          closing += character;
          exdentedClosing += character;
          index++;
        }
        if (!character || character === lineFeed) {
          break;
        }
      }
      subvalue += content + closing;
      index = -1;
      length = flag.length;
      while (++index < length) {
        character = flag.charAt(index);
        if (character === space2 || character === tab) {
          if (!lang) {
            lang = flag.slice(0, index);
          }
        } else if (lang) {
          meta = flag.slice(index);
          break;
        }
      }
      return eat(subvalue)({
        type: "code",
        lang: lang || flag || null,
        meta: meta || null,
        value: exdentedContent
      });
    }
  }
});

// node_modules/trim/index.js
var require_trim = __commonJS({
  "node_modules/trim/index.js"(exports, module2) {
    exports = module2.exports = trim;
    function trim(str) {
      return str.replace(/^\s*|\s*$/g, "");
    }
    exports.left = function(str) {
      return str.replace(/^\s*/, "");
    };
    exports.right = function(str) {
      return str.replace(/\s*$/, "");
    };
  }
});

// node_modules/remark-parse/lib/util/interrupt.js
var require_interrupt = __commonJS({
  "node_modules/remark-parse/lib/util/interrupt.js"(exports, module2) {
    "use strict";
    module2.exports = interrupt;
    function interrupt(interruptors, tokenizers, ctx, params) {
      var length = interruptors.length;
      var index = -1;
      var interruptor;
      var config;
      while (++index < length) {
        interruptor = interruptors[index];
        config = interruptor[1] || {};
        if (config.pedantic !== void 0 && config.pedantic !== ctx.options.pedantic) {
          continue;
        }
        if (config.commonmark !== void 0 && config.commonmark !== ctx.options.commonmark) {
          continue;
        }
        if (tokenizers[interruptor[0]].apply(ctx, params)) {
          return true;
        }
      }
      return false;
    }
  }
});

// node_modules/remark-parse/lib/tokenize/blockquote.js
var require_blockquote = __commonJS({
  "node_modules/remark-parse/lib/tokenize/blockquote.js"(exports, module2) {
    "use strict";
    var trim = require_trim();
    var interrupt = require_interrupt();
    module2.exports = blockquote;
    var lineFeed = "\n";
    var tab = "	";
    var space2 = " ";
    var greaterThan = ">";
    function blockquote(eat, value, silent) {
      var self = this;
      var offsets = self.offset;
      var tokenizers = self.blockTokenizers;
      var interruptors = self.interruptBlockquote;
      var now = eat.now();
      var currentLine = now.line;
      var length = value.length;
      var values = [];
      var contents = [];
      var indents = [];
      var add;
      var index = 0;
      var character;
      var rest;
      var nextIndex;
      var content;
      var line;
      var startIndex;
      var prefixed;
      var exit;
      while (index < length) {
        character = value.charAt(index);
        if (character !== space2 && character !== tab) {
          break;
        }
        index++;
      }
      if (value.charAt(index) !== greaterThan) {
        return;
      }
      if (silent) {
        return true;
      }
      index = 0;
      while (index < length) {
        nextIndex = value.indexOf(lineFeed, index);
        startIndex = index;
        prefixed = false;
        if (nextIndex === -1) {
          nextIndex = length;
        }
        while (index < length) {
          character = value.charAt(index);
          if (character !== space2 && character !== tab) {
            break;
          }
          index++;
        }
        if (value.charAt(index) === greaterThan) {
          index++;
          prefixed = true;
          if (value.charAt(index) === space2) {
            index++;
          }
        } else {
          index = startIndex;
        }
        content = value.slice(index, nextIndex);
        if (!prefixed && !trim(content)) {
          index = startIndex;
          break;
        }
        if (!prefixed) {
          rest = value.slice(index);
          if (interrupt(interruptors, tokenizers, self, [eat, rest, true])) {
            break;
          }
        }
        line = startIndex === index ? content : value.slice(startIndex, nextIndex);
        indents.push(index - startIndex);
        values.push(line);
        contents.push(content);
        index = nextIndex + 1;
      }
      index = -1;
      length = indents.length;
      add = eat(values.join(lineFeed));
      while (++index < length) {
        offsets[currentLine] = (offsets[currentLine] || 0) + indents[index];
        currentLine++;
      }
      exit = self.enterBlock();
      contents = self.tokenizeBlock(contents.join(lineFeed), now);
      exit();
      return add({ type: "blockquote", children: contents });
    }
  }
});

// node_modules/remark-parse/lib/tokenize/heading-atx.js
var require_heading_atx = __commonJS({
  "node_modules/remark-parse/lib/tokenize/heading-atx.js"(exports, module2) {
    "use strict";
    module2.exports = atxHeading;
    var lineFeed = "\n";
    var tab = "	";
    var space2 = " ";
    var numberSign = "#";
    var maxFenceCount = 6;
    function atxHeading(eat, value, silent) {
      var self = this;
      var pedantic = self.options.pedantic;
      var length = value.length + 1;
      var index = -1;
      var now = eat.now();
      var subvalue = "";
      var content = "";
      var character;
      var queue;
      var depth;
      while (++index < length) {
        character = value.charAt(index);
        if (character !== space2 && character !== tab) {
          index--;
          break;
        }
        subvalue += character;
      }
      depth = 0;
      while (++index <= length) {
        character = value.charAt(index);
        if (character !== numberSign) {
          index--;
          break;
        }
        subvalue += character;
        depth++;
      }
      if (depth > maxFenceCount) {
        return;
      }
      if (!depth || !pedantic && value.charAt(index + 1) === numberSign) {
        return;
      }
      length = value.length + 1;
      queue = "";
      while (++index < length) {
        character = value.charAt(index);
        if (character !== space2 && character !== tab) {
          index--;
          break;
        }
        queue += character;
      }
      if (!pedantic && queue.length === 0 && character && character !== lineFeed) {
        return;
      }
      if (silent) {
        return true;
      }
      subvalue += queue;
      queue = "";
      content = "";
      while (++index < length) {
        character = value.charAt(index);
        if (!character || character === lineFeed) {
          break;
        }
        if (character !== space2 && character !== tab && character !== numberSign) {
          content += queue + character;
          queue = "";
          continue;
        }
        while (character === space2 || character === tab) {
          queue += character;
          character = value.charAt(++index);
        }
        if (!pedantic && content && !queue && character === numberSign) {
          content += character;
          continue;
        }
        while (character === numberSign) {
          queue += character;
          character = value.charAt(++index);
        }
        while (character === space2 || character === tab) {
          queue += character;
          character = value.charAt(++index);
        }
        index--;
      }
      now.column += subvalue.length;
      now.offset += subvalue.length;
      subvalue += content + queue;
      return eat(subvalue)({
        type: "heading",
        depth,
        children: self.tokenizeInline(content, now)
      });
    }
  }
});

// node_modules/remark-parse/lib/tokenize/thematic-break.js
var require_thematic_break = __commonJS({
  "node_modules/remark-parse/lib/tokenize/thematic-break.js"(exports, module2) {
    "use strict";
    module2.exports = thematicBreak;
    var tab = "	";
    var lineFeed = "\n";
    var space2 = " ";
    var asterisk = "*";
    var dash = "-";
    var underscore = "_";
    var maxCount = 3;
    function thematicBreak(eat, value, silent) {
      var index = -1;
      var length = value.length + 1;
      var subvalue = "";
      var character;
      var marker;
      var markerCount;
      var queue;
      while (++index < length) {
        character = value.charAt(index);
        if (character !== tab && character !== space2) {
          break;
        }
        subvalue += character;
      }
      if (character !== asterisk && character !== dash && character !== underscore) {
        return;
      }
      marker = character;
      subvalue += character;
      markerCount = 1;
      queue = "";
      while (++index < length) {
        character = value.charAt(index);
        if (character === marker) {
          markerCount++;
          subvalue += queue + marker;
          queue = "";
        } else if (character === space2) {
          queue += character;
        } else if (markerCount >= maxCount && (!character || character === lineFeed)) {
          subvalue += queue;
          if (silent) {
            return true;
          }
          return eat(subvalue)({ type: "thematicBreak" });
        } else {
          return;
        }
      }
    }
  }
});

// node_modules/remark-parse/lib/util/get-indentation.js
var require_get_indentation = __commonJS({
  "node_modules/remark-parse/lib/util/get-indentation.js"(exports, module2) {
    "use strict";
    module2.exports = indentation;
    var tab = "	";
    var space2 = " ";
    var spaceSize = 1;
    var tabSize = 4;
    function indentation(value) {
      var index = 0;
      var indent = 0;
      var character = value.charAt(index);
      var stops = {};
      var size;
      while (character === tab || character === space2) {
        size = character === tab ? tabSize : spaceSize;
        indent += size;
        if (size > 1) {
          indent = Math.floor(indent / size) * size;
        }
        stops[indent] = index;
        character = value.charAt(++index);
      }
      return { indent, stops };
    }
  }
});

// node_modules/remark-parse/lib/util/remove-indentation.js
var require_remove_indentation = __commonJS({
  "node_modules/remark-parse/lib/util/remove-indentation.js"(exports, module2) {
    "use strict";
    var trim = require_trim();
    var repeat = require_repeat_string();
    var getIndent = require_get_indentation();
    module2.exports = indentation;
    var tab = "	";
    var lineFeed = "\n";
    var space2 = " ";
    var exclamationMark = "!";
    function indentation(value, maximum) {
      var values = value.split(lineFeed);
      var position = values.length + 1;
      var minIndent = Infinity;
      var matrix = [];
      var index;
      var indentation2;
      var stops;
      var padding;
      values.unshift(repeat(space2, maximum) + exclamationMark);
      while (position--) {
        indentation2 = getIndent(values[position]);
        matrix[position] = indentation2.stops;
        if (trim(values[position]).length === 0) {
          continue;
        }
        if (indentation2.indent) {
          if (indentation2.indent > 0 && indentation2.indent < minIndent) {
            minIndent = indentation2.indent;
          }
        } else {
          minIndent = Infinity;
          break;
        }
      }
      if (minIndent !== Infinity) {
        position = values.length;
        while (position--) {
          stops = matrix[position];
          index = minIndent;
          while (index && !(index in stops)) {
            index--;
          }
          if (trim(values[position]).length !== 0 && minIndent && index !== minIndent) {
            padding = tab;
          } else {
            padding = "";
          }
          values[position] = padding + values[position].slice(index in stops ? stops[index] + 1 : 0);
        }
      }
      values.shift();
      return values.join(lineFeed);
    }
  }
});

// node_modules/remark-parse/lib/tokenize/list.js
var require_list = __commonJS({
  "node_modules/remark-parse/lib/tokenize/list.js"(exports, module2) {
    "use strict";
    var trim = require_trim();
    var repeat = require_repeat_string();
    var decimal = require_is_decimal();
    var getIndent = require_get_indentation();
    var removeIndent = require_remove_indentation();
    var interrupt = require_interrupt();
    module2.exports = list;
    var asterisk = "*";
    var underscore = "_";
    var plusSign = "+";
    var dash = "-";
    var dot = ".";
    var space2 = " ";
    var lineFeed = "\n";
    var tab = "	";
    var rightParenthesis = ")";
    var lowercaseX = "x";
    var tabSize = 4;
    var looseListItemExpression = /\n\n(?!\s*$)/;
    var taskItemExpression = /^\[([ \t]|x|X)][ \t]/;
    var bulletExpression = /^([ \t]*)([*+-]|\d+[.)])( {1,4}(?! )| |\t|$|(?=\n))([^\n]*)/;
    var pedanticBulletExpression = /^([ \t]*)([*+-]|\d+[.)])([ \t]+)/;
    var initialIndentExpression = /^( {1,4}|\t)?/gm;
    function list(eat, value, silent) {
      var self = this;
      var commonmark = self.options.commonmark;
      var pedantic = self.options.pedantic;
      var tokenizers = self.blockTokenizers;
      var interuptors = self.interruptList;
      var index = 0;
      var length = value.length;
      var start = null;
      var size = 0;
      var queue;
      var ordered;
      var character;
      var marker;
      var nextIndex;
      var startIndex;
      var prefixed;
      var currentMarker;
      var content;
      var line;
      var prevEmpty;
      var empty;
      var items;
      var allLines;
      var emptyLines;
      var item;
      var enterTop;
      var exitBlockquote;
      var spread = false;
      var node;
      var now;
      var end;
      var indented;
      while (index < length) {
        character = value.charAt(index);
        if (character === tab) {
          size += tabSize - size % tabSize;
        } else if (character === space2) {
          size++;
        } else {
          break;
        }
        index++;
      }
      if (size >= tabSize) {
        return;
      }
      character = value.charAt(index);
      if (character === asterisk || character === plusSign || character === dash) {
        marker = character;
        ordered = false;
      } else {
        ordered = true;
        queue = "";
        while (index < length) {
          character = value.charAt(index);
          if (!decimal(character)) {
            break;
          }
          queue += character;
          index++;
        }
        character = value.charAt(index);
        if (!queue || !(character === dot || commonmark && character === rightParenthesis)) {
          return;
        }
        start = parseInt(queue, 10);
        marker = character;
      }
      character = value.charAt(++index);
      if (character !== space2 && character !== tab && (pedantic || character !== lineFeed && character !== "")) {
        return;
      }
      if (silent) {
        return true;
      }
      index = 0;
      items = [];
      allLines = [];
      emptyLines = [];
      while (index < length) {
        nextIndex = value.indexOf(lineFeed, index);
        startIndex = index;
        prefixed = false;
        indented = false;
        if (nextIndex === -1) {
          nextIndex = length;
        }
        end = index + tabSize;
        size = 0;
        while (index < length) {
          character = value.charAt(index);
          if (character === tab) {
            size += tabSize - size % tabSize;
          } else if (character === space2) {
            size++;
          } else {
            break;
          }
          index++;
        }
        if (size >= tabSize) {
          indented = true;
        }
        if (item && size >= item.indent) {
          indented = true;
        }
        character = value.charAt(index);
        currentMarker = null;
        if (!indented) {
          if (character === asterisk || character === plusSign || character === dash) {
            currentMarker = character;
            index++;
            size++;
          } else {
            queue = "";
            while (index < length) {
              character = value.charAt(index);
              if (!decimal(character)) {
                break;
              }
              queue += character;
              index++;
            }
            character = value.charAt(index);
            index++;
            if (queue && (character === dot || commonmark && character === rightParenthesis)) {
              currentMarker = character;
              size += queue.length + 1;
            }
          }
          if (currentMarker) {
            character = value.charAt(index);
            if (character === tab) {
              size += tabSize - size % tabSize;
              index++;
            } else if (character === space2) {
              end = index + tabSize;
              while (index < end) {
                if (value.charAt(index) !== space2) {
                  break;
                }
                index++;
                size++;
              }
              if (index === end && value.charAt(index) === space2) {
                index -= tabSize - 1;
                size -= tabSize - 1;
              }
            } else if (character !== lineFeed && character !== "") {
              currentMarker = null;
            }
          }
        }
        if (currentMarker) {
          if (!pedantic && marker !== currentMarker) {
            break;
          }
          prefixed = true;
        } else {
          if (!commonmark && !indented && value.charAt(startIndex) === space2) {
            indented = true;
          } else if (commonmark && item) {
            indented = size >= item.indent || size > tabSize;
          }
          prefixed = false;
          index = startIndex;
        }
        line = value.slice(startIndex, nextIndex);
        content = startIndex === index ? line : value.slice(index, nextIndex);
        if (currentMarker === asterisk || currentMarker === underscore || currentMarker === dash) {
          if (tokenizers.thematicBreak.call(self, eat, line, true)) {
            break;
          }
        }
        prevEmpty = empty;
        empty = !prefixed && !trim(content).length;
        if (indented && item) {
          item.value = item.value.concat(emptyLines, line);
          allLines = allLines.concat(emptyLines, line);
          emptyLines = [];
        } else if (prefixed) {
          if (emptyLines.length !== 0) {
            spread = true;
            item.value.push("");
            item.trail = emptyLines.concat();
          }
          item = {
            value: [line],
            indent: size,
            trail: []
          };
          items.push(item);
          allLines = allLines.concat(emptyLines, line);
          emptyLines = [];
        } else if (empty) {
          if (prevEmpty && !commonmark) {
            break;
          }
          emptyLines.push(line);
        } else {
          if (prevEmpty) {
            break;
          }
          if (interrupt(interuptors, tokenizers, self, [eat, line, true])) {
            break;
          }
          item.value = item.value.concat(emptyLines, line);
          allLines = allLines.concat(emptyLines, line);
          emptyLines = [];
        }
        index = nextIndex + 1;
      }
      node = eat(allLines.join(lineFeed)).reset({
        type: "list",
        ordered,
        start,
        spread,
        children: []
      });
      enterTop = self.enterList();
      exitBlockquote = self.enterBlock();
      index = -1;
      length = items.length;
      while (++index < length) {
        item = items[index].value.join(lineFeed);
        now = eat.now();
        eat(item)(listItem(self, item, now), node);
        item = items[index].trail.join(lineFeed);
        if (index !== length - 1) {
          item += lineFeed;
        }
        eat(item);
      }
      enterTop();
      exitBlockquote();
      return node;
    }
    function listItem(ctx, value, position) {
      var offsets = ctx.offset;
      var fn = ctx.options.pedantic ? pedanticListItem : normalListItem;
      var checked = null;
      var task;
      var indent;
      value = fn.apply(null, arguments);
      if (ctx.options.gfm) {
        task = value.match(taskItemExpression);
        if (task) {
          indent = task[0].length;
          checked = task[1].toLowerCase() === lowercaseX;
          offsets[position.line] += indent;
          value = value.slice(indent);
        }
      }
      return {
        type: "listItem",
        spread: looseListItemExpression.test(value),
        checked,
        children: ctx.tokenizeBlock(value, position)
      };
    }
    function pedanticListItem(ctx, value, position) {
      var offsets = ctx.offset;
      var line = position.line;
      value = value.replace(pedanticBulletExpression, replacer);
      line = position.line;
      return value.replace(initialIndentExpression, replacer);
      function replacer($0) {
        offsets[line] = (offsets[line] || 0) + $0.length;
        line++;
        return "";
      }
    }
    function normalListItem(ctx, value, position) {
      var offsets = ctx.offset;
      var line = position.line;
      var max;
      var bullet;
      var rest;
      var lines;
      var trimmedLines;
      var index;
      var length;
      value = value.replace(bulletExpression, replacer);
      lines = value.split(lineFeed);
      trimmedLines = removeIndent(value, getIndent(max).indent).split(lineFeed);
      trimmedLines[0] = rest;
      offsets[line] = (offsets[line] || 0) + bullet.length;
      line++;
      index = 0;
      length = lines.length;
      while (++index < length) {
        offsets[line] = (offsets[line] || 0) + lines[index].length - trimmedLines[index].length;
        line++;
      }
      return trimmedLines.join(lineFeed);
      function replacer($0, $1, $2, $3, $4) {
        bullet = $1 + $2 + $3;
        rest = $4;
        if (Number($2) < 10 && bullet.length % 2 === 1) {
          $2 = space2 + $2;
        }
        max = $1 + repeat(space2, $2.length) + $3;
        return max + rest;
      }
    }
  }
});

// node_modules/remark-parse/lib/tokenize/heading-setext.js
var require_heading_setext = __commonJS({
  "node_modules/remark-parse/lib/tokenize/heading-setext.js"(exports, module2) {
    "use strict";
    module2.exports = setextHeading;
    var lineFeed = "\n";
    var tab = "	";
    var space2 = " ";
    var equalsTo = "=";
    var dash = "-";
    var maxIndent = 3;
    var equalsToDepth = 1;
    var dashDepth = 2;
    function setextHeading(eat, value, silent) {
      var self = this;
      var now = eat.now();
      var length = value.length;
      var index = -1;
      var subvalue = "";
      var content;
      var queue;
      var character;
      var marker;
      var depth;
      while (++index < length) {
        character = value.charAt(index);
        if (character !== space2 || index >= maxIndent) {
          index--;
          break;
        }
        subvalue += character;
      }
      content = "";
      queue = "";
      while (++index < length) {
        character = value.charAt(index);
        if (character === lineFeed) {
          index--;
          break;
        }
        if (character === space2 || character === tab) {
          queue += character;
        } else {
          content += queue + character;
          queue = "";
        }
      }
      now.column += subvalue.length;
      now.offset += subvalue.length;
      subvalue += content + queue;
      character = value.charAt(++index);
      marker = value.charAt(++index);
      if (character !== lineFeed || marker !== equalsTo && marker !== dash) {
        return;
      }
      subvalue += character;
      queue = marker;
      depth = marker === equalsTo ? equalsToDepth : dashDepth;
      while (++index < length) {
        character = value.charAt(index);
        if (character !== marker) {
          if (character !== lineFeed) {
            return;
          }
          index--;
          break;
        }
        queue += character;
      }
      if (silent) {
        return true;
      }
      return eat(subvalue + queue)({
        type: "heading",
        depth,
        children: self.tokenizeInline(content, now)
      });
    }
  }
});

// node_modules/remark-parse/lib/util/html.js
var require_html = __commonJS({
  "node_modules/remark-parse/lib/util/html.js"(exports) {
    "use strict";
    var attributeName = "[a-zA-Z_:][a-zA-Z0-9:._-]*";
    var unquoted = "[^\"'=<>`\\u0000-\\u0020]+";
    var singleQuoted = "'[^']*'";
    var doubleQuoted = '"[^"]*"';
    var attributeValue = "(?:" + unquoted + "|" + singleQuoted + "|" + doubleQuoted + ")";
    var attribute = "(?:\\s+" + attributeName + "(?:\\s*=\\s*" + attributeValue + ")?)";
    var openTag = "<[A-Za-z][A-Za-z0-9\\-]*" + attribute + "*\\s*\\/?>";
    var closeTag = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>";
    var comment = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->";
    var processing = "<[?].*?[?]>";
    var declaration = "<![A-Za-z]+\\s+[^>]*>";
    var cdata = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
    exports.openCloseTag = new RegExp("^(?:" + openTag + "|" + closeTag + ")");
    exports.tag = new RegExp(
      "^(?:" + openTag + "|" + closeTag + "|" + comment + "|" + processing + "|" + declaration + "|" + cdata + ")"
    );
  }
});

// node_modules/remark-parse/lib/tokenize/html-block.js
var require_html_block = __commonJS({
  "node_modules/remark-parse/lib/tokenize/html-block.js"(exports, module2) {
    "use strict";
    var openCloseTag = require_html().openCloseTag;
    module2.exports = blockHtml;
    var tab = "	";
    var space2 = " ";
    var lineFeed = "\n";
    var lessThan = "<";
    var rawOpenExpression = /^<(script|pre|style)(?=(\s|>|$))/i;
    var rawCloseExpression = /<\/(script|pre|style)>/i;
    var commentOpenExpression = /^<!--/;
    var commentCloseExpression = /-->/;
    var instructionOpenExpression = /^<\?/;
    var instructionCloseExpression = /\?>/;
    var directiveOpenExpression = /^<![A-Za-z]/;
    var directiveCloseExpression = />/;
    var cdataOpenExpression = /^<!\[CDATA\[/;
    var cdataCloseExpression = /\]\]>/;
    var elementCloseExpression = /^$/;
    var otherElementOpenExpression = new RegExp(openCloseTag.source + "\\s*$");
    function blockHtml(eat, value, silent) {
      var self = this;
      var blocks = self.options.blocks.join("|");
      var elementOpenExpression = new RegExp(
        "^</?(" + blocks + ")(?=(\\s|/?>|$))",
        "i"
      );
      var length = value.length;
      var index = 0;
      var next;
      var line;
      var offset;
      var character;
      var count;
      var sequence;
      var subvalue;
      var sequences = [
        [rawOpenExpression, rawCloseExpression, true],
        [commentOpenExpression, commentCloseExpression, true],
        [instructionOpenExpression, instructionCloseExpression, true],
        [directiveOpenExpression, directiveCloseExpression, true],
        [cdataOpenExpression, cdataCloseExpression, true],
        [elementOpenExpression, elementCloseExpression, true],
        [otherElementOpenExpression, elementCloseExpression, false]
      ];
      while (index < length) {
        character = value.charAt(index);
        if (character !== tab && character !== space2) {
          break;
        }
        index++;
      }
      if (value.charAt(index) !== lessThan) {
        return;
      }
      next = value.indexOf(lineFeed, index + 1);
      next = next === -1 ? length : next;
      line = value.slice(index, next);
      offset = -1;
      count = sequences.length;
      while (++offset < count) {
        if (sequences[offset][0].test(line)) {
          sequence = sequences[offset];
          break;
        }
      }
      if (!sequence) {
        return;
      }
      if (silent) {
        return sequence[2];
      }
      index = next;
      if (!sequence[1].test(line)) {
        while (index < length) {
          next = value.indexOf(lineFeed, index + 1);
          next = next === -1 ? length : next;
          line = value.slice(index + 1, next);
          if (sequence[1].test(line)) {
            if (line) {
              index = next;
            }
            break;
          }
          index = next;
        }
      }
      subvalue = value.slice(0, index);
      return eat(subvalue)({ type: "html", value: subvalue });
    }
  }
});

// node_modules/collapse-white-space/index.js
var require_collapse_white_space = __commonJS({
  "node_modules/collapse-white-space/index.js"(exports, module2) {
    "use strict";
    module2.exports = collapse;
    function collapse(value) {
      return String(value).replace(/\s+/g, " ");
    }
  }
});

// node_modules/remark-parse/lib/util/normalize.js
var require_normalize = __commonJS({
  "node_modules/remark-parse/lib/util/normalize.js"(exports, module2) {
    "use strict";
    var collapseWhiteSpace = require_collapse_white_space();
    module2.exports = normalize;
    function normalize(value) {
      return collapseWhiteSpace(value).toLowerCase();
    }
  }
});

// node_modules/remark-parse/lib/tokenize/footnote-definition.js
var require_footnote_definition = __commonJS({
  "node_modules/remark-parse/lib/tokenize/footnote-definition.js"(exports, module2) {
    "use strict";
    var whitespace = require_is_whitespace_character();
    var normalize = require_normalize();
    module2.exports = footnoteDefinition;
    footnoteDefinition.notInList = true;
    footnoteDefinition.notInBlock = true;
    var backslash = "\\";
    var lineFeed = "\n";
    var tab = "	";
    var space2 = " ";
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    var caret = "^";
    var colon = ":";
    var EXPRESSION_INITIAL_TAB = /^( {4}|\t)?/gm;
    function footnoteDefinition(eat, value, silent) {
      var self = this;
      var offsets = self.offset;
      var index;
      var length;
      var subvalue;
      var now;
      var currentLine;
      var content;
      var queue;
      var subqueue;
      var character;
      var identifier;
      var add;
      var exit;
      if (!self.options.footnotes) {
        return;
      }
      index = 0;
      length = value.length;
      subvalue = "";
      now = eat.now();
      currentLine = now.line;
      while (index < length) {
        character = value.charAt(index);
        if (!whitespace(character)) {
          break;
        }
        subvalue += character;
        index++;
      }
      if (value.charAt(index) !== leftSquareBracket || value.charAt(index + 1) !== caret) {
        return;
      }
      subvalue += leftSquareBracket + caret;
      index = subvalue.length;
      queue = "";
      while (index < length) {
        character = value.charAt(index);
        if (character === rightSquareBracket) {
          break;
        } else if (character === backslash) {
          queue += character;
          index++;
          character = value.charAt(index);
        }
        queue += character;
        index++;
      }
      if (!queue || value.charAt(index) !== rightSquareBracket || value.charAt(index + 1) !== colon) {
        return;
      }
      if (silent) {
        return true;
      }
      identifier = queue;
      subvalue += queue + rightSquareBracket + colon;
      index = subvalue.length;
      while (index < length) {
        character = value.charAt(index);
        if (character !== tab && character !== space2) {
          break;
        }
        subvalue += character;
        index++;
      }
      now.column += subvalue.length;
      now.offset += subvalue.length;
      queue = "";
      content = "";
      subqueue = "";
      while (index < length) {
        character = value.charAt(index);
        if (character === lineFeed) {
          subqueue = character;
          index++;
          while (index < length) {
            character = value.charAt(index);
            if (character !== lineFeed) {
              break;
            }
            subqueue += character;
            index++;
          }
          queue += subqueue;
          subqueue = "";
          while (index < length) {
            character = value.charAt(index);
            if (character !== space2) {
              break;
            }
            subqueue += character;
            index++;
          }
          if (subqueue.length === 0) {
            break;
          }
          queue += subqueue;
        }
        if (queue) {
          content += queue;
          queue = "";
        }
        content += character;
        index++;
      }
      subvalue += content;
      content = content.replace(EXPRESSION_INITIAL_TAB, function(line) {
        offsets[currentLine] = (offsets[currentLine] || 0) + line.length;
        currentLine++;
        return "";
      });
      add = eat(subvalue);
      exit = self.enterBlock();
      content = self.tokenizeBlock(content, now);
      exit();
      return add({
        type: "footnoteDefinition",
        identifier: normalize(identifier),
        label: identifier,
        children: content
      });
    }
  }
});

// node_modules/remark-parse/lib/tokenize/definition.js
var require_definition = __commonJS({
  "node_modules/remark-parse/lib/tokenize/definition.js"(exports, module2) {
    "use strict";
    var whitespace = require_is_whitespace_character();
    var normalize = require_normalize();
    module2.exports = definition;
    var quotationMark = '"';
    var apostrophe = "'";
    var backslash = "\\";
    var lineFeed = "\n";
    var tab = "	";
    var space2 = " ";
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    var leftParenthesis = "(";
    var rightParenthesis = ")";
    var colon = ":";
    var lessThan = "<";
    var greaterThan = ">";
    function definition(eat, value, silent) {
      var self = this;
      var commonmark = self.options.commonmark;
      var index = 0;
      var length = value.length;
      var subvalue = "";
      var beforeURL;
      var beforeTitle;
      var queue;
      var character;
      var test;
      var identifier;
      var url;
      var title;
      while (index < length) {
        character = value.charAt(index);
        if (character !== space2 && character !== tab) {
          break;
        }
        subvalue += character;
        index++;
      }
      character = value.charAt(index);
      if (character !== leftSquareBracket) {
        return;
      }
      index++;
      subvalue += character;
      queue = "";
      while (index < length) {
        character = value.charAt(index);
        if (character === rightSquareBracket) {
          break;
        } else if (character === backslash) {
          queue += character;
          index++;
          character = value.charAt(index);
        }
        queue += character;
        index++;
      }
      if (!queue || value.charAt(index) !== rightSquareBracket || value.charAt(index + 1) !== colon) {
        return;
      }
      identifier = queue;
      subvalue += queue + rightSquareBracket + colon;
      index = subvalue.length;
      queue = "";
      while (index < length) {
        character = value.charAt(index);
        if (character !== tab && character !== space2 && character !== lineFeed) {
          break;
        }
        subvalue += character;
        index++;
      }
      character = value.charAt(index);
      queue = "";
      beforeURL = subvalue;
      if (character === lessThan) {
        index++;
        while (index < length) {
          character = value.charAt(index);
          if (!isEnclosedURLCharacter(character)) {
            break;
          }
          queue += character;
          index++;
        }
        character = value.charAt(index);
        if (character === isEnclosedURLCharacter.delimiter) {
          subvalue += lessThan + queue + character;
          index++;
        } else {
          if (commonmark) {
            return;
          }
          index -= queue.length + 1;
          queue = "";
        }
      }
      if (!queue) {
        while (index < length) {
          character = value.charAt(index);
          if (!isUnclosedURLCharacter(character)) {
            break;
          }
          queue += character;
          index++;
        }
        subvalue += queue;
      }
      if (!queue) {
        return;
      }
      url = queue;
      queue = "";
      while (index < length) {
        character = value.charAt(index);
        if (character !== tab && character !== space2 && character !== lineFeed) {
          break;
        }
        queue += character;
        index++;
      }
      character = value.charAt(index);
      test = null;
      if (character === quotationMark) {
        test = quotationMark;
      } else if (character === apostrophe) {
        test = apostrophe;
      } else if (character === leftParenthesis) {
        test = rightParenthesis;
      }
      if (!test) {
        queue = "";
        index = subvalue.length;
      } else if (queue) {
        subvalue += queue + character;
        index = subvalue.length;
        queue = "";
        while (index < length) {
          character = value.charAt(index);
          if (character === test) {
            break;
          }
          if (character === lineFeed) {
            index++;
            character = value.charAt(index);
            if (character === lineFeed || character === test) {
              return;
            }
            queue += lineFeed;
          }
          queue += character;
          index++;
        }
        character = value.charAt(index);
        if (character !== test) {
          return;
        }
        beforeTitle = subvalue;
        subvalue += queue + character;
        index++;
        title = queue;
        queue = "";
      } else {
        return;
      }
      while (index < length) {
        character = value.charAt(index);
        if (character !== tab && character !== space2) {
          break;
        }
        subvalue += character;
        index++;
      }
      character = value.charAt(index);
      if (!character || character === lineFeed) {
        if (silent) {
          return true;
        }
        beforeURL = eat(beforeURL).test().end;
        url = self.decode.raw(self.unescape(url), beforeURL, { nonTerminated: false });
        if (title) {
          beforeTitle = eat(beforeTitle).test().end;
          title = self.decode.raw(self.unescape(title), beforeTitle);
        }
        return eat(subvalue)({
          type: "definition",
          identifier: normalize(identifier),
          label: identifier,
          title: title || null,
          url
        });
      }
    }
    function isEnclosedURLCharacter(character) {
      return character !== greaterThan && character !== leftSquareBracket && character !== rightSquareBracket;
    }
    isEnclosedURLCharacter.delimiter = greaterThan;
    function isUnclosedURLCharacter(character) {
      return character !== leftSquareBracket && character !== rightSquareBracket && !whitespace(character);
    }
  }
});

// node_modules/remark-parse/lib/tokenize/table.js
var require_table = __commonJS({
  "node_modules/remark-parse/lib/tokenize/table.js"(exports, module2) {
    "use strict";
    var whitespace = require_is_whitespace_character();
    module2.exports = table;
    var tab = "	";
    var lineFeed = "\n";
    var space2 = " ";
    var dash = "-";
    var colon = ":";
    var backslash = "\\";
    var verticalBar = "|";
    var minColumns = 1;
    var minRows = 2;
    var left = "left";
    var center = "center";
    var right = "right";
    function table(eat, value, silent) {
      var self = this;
      var index;
      var alignments;
      var alignment;
      var subvalue;
      var row;
      var length;
      var lines;
      var queue;
      var character;
      var hasDash;
      var align;
      var cell;
      var preamble;
      var now;
      var position;
      var lineCount;
      var line;
      var rows;
      var table2;
      var lineIndex;
      var pipeIndex;
      var first;
      if (!self.options.gfm) {
        return;
      }
      index = 0;
      lineCount = 0;
      length = value.length + 1;
      lines = [];
      while (index < length) {
        lineIndex = value.indexOf(lineFeed, index);
        pipeIndex = value.indexOf(verticalBar, index + 1);
        if (lineIndex === -1) {
          lineIndex = value.length;
        }
        if (pipeIndex === -1 || pipeIndex > lineIndex) {
          if (lineCount < minRows) {
            return;
          }
          break;
        }
        lines.push(value.slice(index, lineIndex));
        lineCount++;
        index = lineIndex + 1;
      }
      subvalue = lines.join(lineFeed);
      alignments = lines.splice(1, 1)[0] || [];
      index = 0;
      length = alignments.length;
      lineCount--;
      alignment = false;
      align = [];
      while (index < length) {
        character = alignments.charAt(index);
        if (character === verticalBar) {
          hasDash = null;
          if (alignment === false) {
            if (first === false) {
              return;
            }
          } else {
            align.push(alignment);
            alignment = false;
          }
          first = false;
        } else if (character === dash) {
          hasDash = true;
          alignment = alignment || null;
        } else if (character === colon) {
          if (alignment === left) {
            alignment = center;
          } else if (hasDash && alignment === null) {
            alignment = right;
          } else {
            alignment = left;
          }
        } else if (!whitespace(character)) {
          return;
        }
        index++;
      }
      if (alignment !== false) {
        align.push(alignment);
      }
      if (align.length < minColumns) {
        return;
      }
      if (silent) {
        return true;
      }
      position = -1;
      rows = [];
      table2 = eat(subvalue).reset({ type: "table", align, children: rows });
      while (++position < lineCount) {
        line = lines[position];
        row = { type: "tableRow", children: [] };
        if (position) {
          eat(lineFeed);
        }
        eat(line).reset(row, table2);
        length = line.length + 1;
        index = 0;
        queue = "";
        cell = "";
        preamble = true;
        while (index < length) {
          character = line.charAt(index);
          if (character === tab || character === space2) {
            if (cell) {
              queue += character;
            } else {
              eat(character);
            }
            index++;
            continue;
          }
          if (character === "" || character === verticalBar) {
            if (preamble) {
              eat(character);
            } else {
              if ((cell || character) && !preamble) {
                subvalue = cell;
                if (queue.length > 1) {
                  if (character) {
                    subvalue += queue.slice(0, queue.length - 1);
                    queue = queue.charAt(queue.length - 1);
                  } else {
                    subvalue += queue;
                    queue = "";
                  }
                }
                now = eat.now();
                eat(subvalue)(
                  { type: "tableCell", children: self.tokenizeInline(cell, now) },
                  row
                );
              }
              eat(queue + character);
              queue = "";
              cell = "";
            }
          } else {
            if (queue) {
              cell += queue;
              queue = "";
            }
            cell += character;
            if (character === backslash && index !== length - 2) {
              cell += line.charAt(index + 1);
              index++;
            }
          }
          preamble = false;
          index++;
        }
        if (!position) {
          eat(lineFeed + alignments);
        }
      }
      return table2;
    }
  }
});

// node_modules/remark-parse/lib/tokenize/paragraph.js
var require_paragraph = __commonJS({
  "node_modules/remark-parse/lib/tokenize/paragraph.js"(exports, module2) {
    "use strict";
    var trim = require_trim();
    var decimal = require_is_decimal();
    var trimTrailingLines = require_trim_trailing_lines();
    var interrupt = require_interrupt();
    module2.exports = paragraph;
    var tab = "	";
    var lineFeed = "\n";
    var space2 = " ";
    var tabSize = 4;
    function paragraph(eat, value, silent) {
      var self = this;
      var settings = self.options;
      var commonmark = settings.commonmark;
      var gfm = settings.gfm;
      var tokenizers = self.blockTokenizers;
      var interruptors = self.interruptParagraph;
      var index = value.indexOf(lineFeed);
      var length = value.length;
      var position;
      var subvalue;
      var character;
      var size;
      var now;
      while (index < length) {
        if (index === -1) {
          index = length;
          break;
        }
        if (value.charAt(index + 1) === lineFeed) {
          break;
        }
        if (commonmark) {
          size = 0;
          position = index + 1;
          while (position < length) {
            character = value.charAt(position);
            if (character === tab) {
              size = tabSize;
              break;
            } else if (character === space2) {
              size++;
            } else {
              break;
            }
            position++;
          }
          if (size >= tabSize && character !== lineFeed) {
            index = value.indexOf(lineFeed, index + 1);
            continue;
          }
        }
        subvalue = value.slice(index + 1);
        if (interrupt(interruptors, tokenizers, self, [eat, subvalue, true])) {
          break;
        }
        if (tokenizers.list.call(self, eat, subvalue, true) && (self.inList || commonmark || gfm && !decimal(trim.left(subvalue).charAt(0)))) {
          break;
        }
        position = index;
        index = value.indexOf(lineFeed, index + 1);
        if (index !== -1 && trim(value.slice(position, index)) === "") {
          index = position;
          break;
        }
      }
      subvalue = value.slice(0, index);
      if (trim(subvalue) === "") {
        eat(subvalue);
        return null;
      }
      if (silent) {
        return true;
      }
      now = eat.now();
      subvalue = trimTrailingLines(subvalue);
      return eat(subvalue)({
        type: "paragraph",
        children: self.tokenizeInline(subvalue, now)
      });
    }
  }
});

// node_modules/remark-parse/lib/locate/escape.js
var require_escape = __commonJS({
  "node_modules/remark-parse/lib/locate/escape.js"(exports, module2) {
    "use strict";
    module2.exports = locate;
    function locate(value, fromIndex) {
      return value.indexOf("\\", fromIndex);
    }
  }
});

// node_modules/remark-parse/lib/tokenize/escape.js
var require_escape2 = __commonJS({
  "node_modules/remark-parse/lib/tokenize/escape.js"(exports, module2) {
    "use strict";
    var locate = require_escape();
    module2.exports = escape;
    escape.locator = locate;
    var lineFeed = "\n";
    var backslash = "\\";
    function escape(eat, value, silent) {
      var self = this;
      var character;
      var node;
      if (value.charAt(0) === backslash) {
        character = value.charAt(1);
        if (self.escape.indexOf(character) !== -1) {
          if (silent) {
            return true;
          }
          if (character === lineFeed) {
            node = { type: "break" };
          } else {
            node = { type: "text", value: character };
          }
          return eat(backslash + character)(node);
        }
      }
    }
  }
});

// node_modules/remark-parse/lib/locate/tag.js
var require_tag = __commonJS({
  "node_modules/remark-parse/lib/locate/tag.js"(exports, module2) {
    "use strict";
    module2.exports = locate;
    function locate(value, fromIndex) {
      return value.indexOf("<", fromIndex);
    }
  }
});

// node_modules/remark-parse/lib/tokenize/auto-link.js
var require_auto_link = __commonJS({
  "node_modules/remark-parse/lib/tokenize/auto-link.js"(exports, module2) {
    "use strict";
    var whitespace = require_is_whitespace_character();
    var decode = require_parse_entities();
    var locate = require_tag();
    module2.exports = autoLink;
    autoLink.locator = locate;
    autoLink.notInLink = true;
    var lessThan = "<";
    var greaterThan = ">";
    var atSign = "@";
    var slash = "/";
    var mailto = "mailto:";
    var mailtoLength = mailto.length;
    function autoLink(eat, value, silent) {
      var self = this;
      var subvalue = "";
      var length = value.length;
      var index = 0;
      var queue = "";
      var hasAtCharacter = false;
      var link = "";
      var character;
      var now;
      var content;
      var tokenizers;
      var exit;
      if (value.charAt(0) !== lessThan) {
        return;
      }
      index++;
      subvalue = lessThan;
      while (index < length) {
        character = value.charAt(index);
        if (whitespace(character) || character === greaterThan || character === atSign || character === ":" && value.charAt(index + 1) === slash) {
          break;
        }
        queue += character;
        index++;
      }
      if (!queue) {
        return;
      }
      link += queue;
      queue = "";
      character = value.charAt(index);
      link += character;
      index++;
      if (character === atSign) {
        hasAtCharacter = true;
      } else {
        if (character !== ":" || value.charAt(index + 1) !== slash) {
          return;
        }
        link += slash;
        index++;
      }
      while (index < length) {
        character = value.charAt(index);
        if (whitespace(character) || character === greaterThan) {
          break;
        }
        queue += character;
        index++;
      }
      character = value.charAt(index);
      if (!queue || character !== greaterThan) {
        return;
      }
      if (silent) {
        return true;
      }
      link += queue;
      content = link;
      subvalue += link + character;
      now = eat.now();
      now.column++;
      now.offset++;
      if (hasAtCharacter) {
        if (link.slice(0, mailtoLength).toLowerCase() === mailto) {
          content = content.slice(mailtoLength);
          now.column += mailtoLength;
          now.offset += mailtoLength;
        } else {
          link = mailto + link;
        }
      }
      tokenizers = self.inlineTokenizers;
      self.inlineTokenizers = { text: tokenizers.text };
      exit = self.enterLink();
      content = self.tokenizeInline(content, now);
      self.inlineTokenizers = tokenizers;
      exit();
      return eat(subvalue)({
        type: "link",
        title: null,
        url: decode(link, { nonTerminated: false }),
        children: content
      });
    }
  }
});

// node_modules/remark-parse/lib/locate/url.js
var require_url = __commonJS({
  "node_modules/remark-parse/lib/locate/url.js"(exports, module2) {
    "use strict";
    module2.exports = locate;
    var protocols = ["https://", "http://", "mailto:"];
    function locate(value, fromIndex) {
      var length = protocols.length;
      var index = -1;
      var min = -1;
      var position;
      if (!this.options.gfm) {
        return -1;
      }
      while (++index < length) {
        position = value.indexOf(protocols[index], fromIndex);
        if (position !== -1 && (position < min || min === -1)) {
          min = position;
        }
      }
      return min;
    }
  }
});

// node_modules/remark-parse/lib/tokenize/url.js
var require_url2 = __commonJS({
  "node_modules/remark-parse/lib/tokenize/url.js"(exports, module2) {
    "use strict";
    var decode = require_parse_entities();
    var whitespace = require_is_whitespace_character();
    var locate = require_url();
    module2.exports = url;
    url.locator = locate;
    url.notInLink = true;
    var quotationMark = '"';
    var apostrophe = "'";
    var leftParenthesis = "(";
    var rightParenthesis = ")";
    var comma = ",";
    var dot = ".";
    var colon = ":";
    var semicolon = ";";
    var lessThan = "<";
    var atSign = "@";
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    var http = "http://";
    var https = "https://";
    var mailto = "mailto:";
    var protocols = [http, https, mailto];
    var protocolsLength = protocols.length;
    function url(eat, value, silent) {
      var self = this;
      var subvalue;
      var content;
      var character;
      var index;
      var position;
      var protocol;
      var match;
      var length;
      var queue;
      var parenCount;
      var nextCharacter;
      var tokenizers;
      var exit;
      if (!self.options.gfm) {
        return;
      }
      subvalue = "";
      index = -1;
      while (++index < protocolsLength) {
        protocol = protocols[index];
        match = value.slice(0, protocol.length);
        if (match.toLowerCase() === protocol) {
          subvalue = match;
          break;
        }
      }
      if (!subvalue) {
        return;
      }
      index = subvalue.length;
      length = value.length;
      queue = "";
      parenCount = 0;
      while (index < length) {
        character = value.charAt(index);
        if (whitespace(character) || character === lessThan) {
          break;
        }
        if (character === dot || character === comma || character === colon || character === semicolon || character === quotationMark || character === apostrophe || character === rightParenthesis || character === rightSquareBracket) {
          nextCharacter = value.charAt(index + 1);
          if (!nextCharacter || whitespace(nextCharacter)) {
            break;
          }
        }
        if (character === leftParenthesis || character === leftSquareBracket) {
          parenCount++;
        }
        if (character === rightParenthesis || character === rightSquareBracket) {
          parenCount--;
          if (parenCount < 0) {
            break;
          }
        }
        queue += character;
        index++;
      }
      if (!queue) {
        return;
      }
      subvalue += queue;
      content = subvalue;
      if (protocol === mailto) {
        position = queue.indexOf(atSign);
        if (position === -1 || position === length - 1) {
          return;
        }
        content = content.slice(mailto.length);
      }
      if (silent) {
        return true;
      }
      exit = self.enterLink();
      tokenizers = self.inlineTokenizers;
      self.inlineTokenizers = { text: tokenizers.text };
      content = self.tokenizeInline(content, eat.now());
      self.inlineTokenizers = tokenizers;
      exit();
      return eat(subvalue)({
        type: "link",
        title: null,
        url: decode(subvalue, { nonTerminated: false }),
        children: content
      });
    }
  }
});

// node_modules/remark-parse/lib/tokenize/html-inline.js
var require_html_inline = __commonJS({
  "node_modules/remark-parse/lib/tokenize/html-inline.js"(exports, module2) {
    "use strict";
    var alphabetical = require_is_alphabetical();
    var locate = require_tag();
    var tag = require_html().tag;
    module2.exports = inlineHTML;
    inlineHTML.locator = locate;
    var lessThan = "<";
    var questionMark = "?";
    var exclamationMark = "!";
    var slash = "/";
    var htmlLinkOpenExpression = /^<a /i;
    var htmlLinkCloseExpression = /^<\/a>/i;
    function inlineHTML(eat, value, silent) {
      var self = this;
      var length = value.length;
      var character;
      var subvalue;
      if (value.charAt(0) !== lessThan || length < 3) {
        return;
      }
      character = value.charAt(1);
      if (!alphabetical(character) && character !== questionMark && character !== exclamationMark && character !== slash) {
        return;
      }
      subvalue = value.match(tag);
      if (!subvalue) {
        return;
      }
      if (silent) {
        return true;
      }
      subvalue = subvalue[0];
      if (!self.inLink && htmlLinkOpenExpression.test(subvalue)) {
        self.inLink = true;
      } else if (self.inLink && htmlLinkCloseExpression.test(subvalue)) {
        self.inLink = false;
      }
      return eat(subvalue)({ type: "html", value: subvalue });
    }
  }
});

// node_modules/remark-parse/lib/locate/link.js
var require_link = __commonJS({
  "node_modules/remark-parse/lib/locate/link.js"(exports, module2) {
    "use strict";
    module2.exports = locate;
    function locate(value, fromIndex) {
      var link = value.indexOf("[", fromIndex);
      var image = value.indexOf("![", fromIndex);
      if (image === -1) {
        return link;
      }
      return link < image ? link : image;
    }
  }
});

// node_modules/remark-parse/lib/tokenize/link.js
var require_link2 = __commonJS({
  "node_modules/remark-parse/lib/tokenize/link.js"(exports, module2) {
    "use strict";
    var whitespace = require_is_whitespace_character();
    var locate = require_link();
    module2.exports = link;
    link.locator = locate;
    var lineFeed = "\n";
    var exclamationMark = "!";
    var quotationMark = '"';
    var apostrophe = "'";
    var leftParenthesis = "(";
    var rightParenthesis = ")";
    var lessThan = "<";
    var greaterThan = ">";
    var leftSquareBracket = "[";
    var backslash = "\\";
    var rightSquareBracket = "]";
    var graveAccent = "`";
    function link(eat, value, silent) {
      var self = this;
      var subvalue = "";
      var index = 0;
      var character = value.charAt(0);
      var pedantic = self.options.pedantic;
      var commonmark = self.options.commonmark;
      var gfm = self.options.gfm;
      var closed;
      var count;
      var opening;
      var beforeURL;
      var beforeTitle;
      var subqueue;
      var hasMarker;
      var isImage;
      var content;
      var marker;
      var length;
      var title;
      var depth;
      var queue;
      var url;
      var now;
      var exit;
      var node;
      if (character === exclamationMark) {
        isImage = true;
        subvalue = character;
        character = value.charAt(++index);
      }
      if (character !== leftSquareBracket) {
        return;
      }
      if (!isImage && self.inLink) {
        return;
      }
      subvalue += character;
      queue = "";
      index++;
      length = value.length;
      now = eat.now();
      depth = 0;
      now.column += index;
      now.offset += index;
      while (index < length) {
        character = value.charAt(index);
        subqueue = character;
        if (character === graveAccent) {
          count = 1;
          while (value.charAt(index + 1) === graveAccent) {
            subqueue += character;
            index++;
            count++;
          }
          if (!opening) {
            opening = count;
          } else if (count >= opening) {
            opening = 0;
          }
        } else if (character === backslash) {
          index++;
          subqueue += value.charAt(index);
        } else if ((!opening || gfm) && character === leftSquareBracket) {
          depth++;
        } else if ((!opening || gfm) && character === rightSquareBracket) {
          if (depth) {
            depth--;
          } else {
            if (!pedantic) {
              while (index < length) {
                character = value.charAt(index + 1);
                if (!whitespace(character)) {
                  break;
                }
                subqueue += character;
                index++;
              }
            }
            if (value.charAt(index + 1) !== leftParenthesis) {
              return;
            }
            subqueue += leftParenthesis;
            closed = true;
            index++;
            break;
          }
        }
        queue += subqueue;
        subqueue = "";
        index++;
      }
      if (!closed) {
        return;
      }
      content = queue;
      subvalue += queue + subqueue;
      index++;
      while (index < length) {
        character = value.charAt(index);
        if (!whitespace(character)) {
          break;
        }
        subvalue += character;
        index++;
      }
      character = value.charAt(index);
      queue = "";
      beforeURL = subvalue;
      if (character === lessThan) {
        index++;
        beforeURL += lessThan;
        while (index < length) {
          character = value.charAt(index);
          if (character === greaterThan) {
            break;
          }
          if (commonmark && character === lineFeed) {
            return;
          }
          queue += character;
          index++;
        }
        if (value.charAt(index) !== greaterThan) {
          return;
        }
        subvalue += lessThan + queue + greaterThan;
        url = queue;
        index++;
      } else {
        character = null;
        subqueue = "";
        while (index < length) {
          character = value.charAt(index);
          if (subqueue && (character === quotationMark || character === apostrophe || commonmark && character === leftParenthesis)) {
            break;
          }
          if (whitespace(character)) {
            if (!pedantic) {
              break;
            }
            subqueue += character;
          } else {
            if (character === leftParenthesis) {
              depth++;
            } else if (character === rightParenthesis) {
              if (depth === 0) {
                break;
              }
              depth--;
            }
            queue += subqueue;
            subqueue = "";
            if (character === backslash) {
              queue += backslash;
              character = value.charAt(++index);
            }
            queue += character;
          }
          index++;
        }
        subvalue += queue;
        url = queue;
        index = subvalue.length;
      }
      queue = "";
      while (index < length) {
        character = value.charAt(index);
        if (!whitespace(character)) {
          break;
        }
        queue += character;
        index++;
      }
      character = value.charAt(index);
      subvalue += queue;
      if (queue && (character === quotationMark || character === apostrophe || commonmark && character === leftParenthesis)) {
        index++;
        subvalue += character;
        queue = "";
        marker = character === leftParenthesis ? rightParenthesis : character;
        beforeTitle = subvalue;
        if (commonmark) {
          while (index < length) {
            character = value.charAt(index);
            if (character === marker) {
              break;
            }
            if (character === backslash) {
              queue += backslash;
              character = value.charAt(++index);
            }
            index++;
            queue += character;
          }
          character = value.charAt(index);
          if (character !== marker) {
            return;
          }
          title = queue;
          subvalue += queue + character;
          index++;
          while (index < length) {
            character = value.charAt(index);
            if (!whitespace(character)) {
              break;
            }
            subvalue += character;
            index++;
          }
        } else {
          subqueue = "";
          while (index < length) {
            character = value.charAt(index);
            if (character === marker) {
              if (hasMarker) {
                queue += marker + subqueue;
                subqueue = "";
              }
              hasMarker = true;
            } else if (!hasMarker) {
              queue += character;
            } else if (character === rightParenthesis) {
              subvalue += queue + marker + subqueue;
              title = queue;
              break;
            } else if (whitespace(character)) {
              subqueue += character;
            } else {
              queue += marker + subqueue + character;
              subqueue = "";
              hasMarker = false;
            }
            index++;
          }
        }
      }
      if (value.charAt(index) !== rightParenthesis) {
        return;
      }
      if (silent) {
        return true;
      }
      subvalue += rightParenthesis;
      url = self.decode.raw(self.unescape(url), eat(beforeURL).test().end, {
        nonTerminated: false
      });
      if (title) {
        beforeTitle = eat(beforeTitle).test().end;
        title = self.decode.raw(self.unescape(title), beforeTitle);
      }
      node = {
        type: isImage ? "image" : "link",
        title: title || null,
        url
      };
      if (isImage) {
        node.alt = self.decode.raw(self.unescape(content), now) || null;
      } else {
        exit = self.enterLink();
        node.children = self.tokenizeInline(content, now);
        exit();
      }
      return eat(subvalue)(node);
    }
  }
});

// node_modules/remark-parse/lib/tokenize/reference.js
var require_reference = __commonJS({
  "node_modules/remark-parse/lib/tokenize/reference.js"(exports, module2) {
    "use strict";
    var whitespace = require_is_whitespace_character();
    var locate = require_link();
    var normalize = require_normalize();
    module2.exports = reference;
    reference.locator = locate;
    var link = "link";
    var image = "image";
    var footnote = "footnote";
    var shortcut = "shortcut";
    var collapsed = "collapsed";
    var full = "full";
    var space2 = " ";
    var exclamationMark = "!";
    var leftSquareBracket = "[";
    var backslash = "\\";
    var rightSquareBracket = "]";
    var caret = "^";
    function reference(eat, value, silent) {
      var self = this;
      var commonmark = self.options.commonmark;
      var footnotes = self.options.footnotes;
      var character = value.charAt(0);
      var index = 0;
      var length = value.length;
      var subvalue = "";
      var intro = "";
      var type = link;
      var referenceType = shortcut;
      var content;
      var identifier;
      var now;
      var node;
      var exit;
      var queue;
      var bracketed;
      var depth;
      if (character === exclamationMark) {
        type = image;
        intro = character;
        character = value.charAt(++index);
      }
      if (character !== leftSquareBracket) {
        return;
      }
      index++;
      intro += character;
      queue = "";
      if (footnotes && value.charAt(index) === caret) {
        if (type === image) {
          return;
        }
        intro += caret;
        index++;
        type = footnote;
      }
      depth = 0;
      while (index < length) {
        character = value.charAt(index);
        if (character === leftSquareBracket) {
          bracketed = true;
          depth++;
        } else if (character === rightSquareBracket) {
          if (!depth) {
            break;
          }
          depth--;
        }
        if (character === backslash) {
          queue += backslash;
          character = value.charAt(++index);
        }
        queue += character;
        index++;
      }
      subvalue = queue;
      content = queue;
      character = value.charAt(index);
      if (character !== rightSquareBracket) {
        return;
      }
      index++;
      subvalue += character;
      queue = "";
      if (!commonmark) {
        while (index < length) {
          character = value.charAt(index);
          if (!whitespace(character)) {
            break;
          }
          queue += character;
          index++;
        }
      }
      character = value.charAt(index);
      if (type !== footnote && character === leftSquareBracket && (!footnotes || value.charAt(index + 1) !== caret)) {
        identifier = "";
        queue += character;
        index++;
        while (index < length) {
          character = value.charAt(index);
          if (character === leftSquareBracket || character === rightSquareBracket) {
            break;
          }
          if (character === backslash) {
            identifier += backslash;
            character = value.charAt(++index);
          }
          identifier += character;
          index++;
        }
        character = value.charAt(index);
        if (character === rightSquareBracket) {
          referenceType = identifier ? full : collapsed;
          queue += identifier + character;
          index++;
        } else {
          identifier = "";
        }
        subvalue += queue;
        queue = "";
      } else {
        if (!content) {
          return;
        }
        identifier = content;
      }
      if (referenceType !== full && bracketed) {
        return;
      }
      subvalue = intro + subvalue;
      if (type === link && self.inLink) {
        return null;
      }
      if (silent) {
        return true;
      }
      if (type === footnote && content.indexOf(space2) !== -1) {
        return eat(subvalue)({
          type: footnote,
          children: this.tokenizeInline(content, eat.now())
        });
      }
      now = eat.now();
      now.column += intro.length;
      now.offset += intro.length;
      identifier = referenceType === full ? identifier : content;
      node = {
        type: type + "Reference",
        identifier: normalize(identifier),
        label: identifier
      };
      if (type === link || type === image) {
        node.referenceType = referenceType;
      }
      if (type === link) {
        exit = self.enterLink();
        node.children = self.tokenizeInline(content, now);
        exit();
      } else if (type === image) {
        node.alt = self.decode.raw(self.unescape(content), now) || null;
      }
      return eat(subvalue)(node);
    }
  }
});

// node_modules/remark-parse/lib/locate/strong.js
var require_strong = __commonJS({
  "node_modules/remark-parse/lib/locate/strong.js"(exports, module2) {
    "use strict";
    module2.exports = locate;
    function locate(value, fromIndex) {
      var asterisk = value.indexOf("**", fromIndex);
      var underscore = value.indexOf("__", fromIndex);
      if (underscore === -1) {
        return asterisk;
      }
      if (asterisk === -1) {
        return underscore;
      }
      return underscore < asterisk ? underscore : asterisk;
    }
  }
});

// node_modules/remark-parse/lib/tokenize/strong.js
var require_strong2 = __commonJS({
  "node_modules/remark-parse/lib/tokenize/strong.js"(exports, module2) {
    "use strict";
    var trim = require_trim();
    var whitespace = require_is_whitespace_character();
    var locate = require_strong();
    module2.exports = strong;
    strong.locator = locate;
    var backslash = "\\";
    var asterisk = "*";
    var underscore = "_";
    function strong(eat, value, silent) {
      var self = this;
      var index = 0;
      var character = value.charAt(index);
      var now;
      var pedantic;
      var marker;
      var queue;
      var subvalue;
      var length;
      var prev;
      if (character !== asterisk && character !== underscore || value.charAt(++index) !== character) {
        return;
      }
      pedantic = self.options.pedantic;
      marker = character;
      subvalue = marker + marker;
      length = value.length;
      index++;
      queue = "";
      character = "";
      if (pedantic && whitespace(value.charAt(index))) {
        return;
      }
      while (index < length) {
        prev = character;
        character = value.charAt(index);
        if (character === marker && value.charAt(index + 1) === marker && (!pedantic || !whitespace(prev))) {
          character = value.charAt(index + 2);
          if (character !== marker) {
            if (!trim(queue)) {
              return;
            }
            if (silent) {
              return true;
            }
            now = eat.now();
            now.column += 2;
            now.offset += 2;
            return eat(subvalue + queue + subvalue)({
              type: "strong",
              children: self.tokenizeInline(queue, now)
            });
          }
        }
        if (!pedantic && character === backslash) {
          queue += character;
          character = value.charAt(++index);
        }
        queue += character;
        index++;
      }
    }
  }
});

// node_modules/is-word-character/index.js
var require_is_word_character = __commonJS({
  "node_modules/is-word-character/index.js"(exports, module2) {
    "use strict";
    module2.exports = wordCharacter;
    var fromCode = String.fromCharCode;
    var re = /\w/;
    function wordCharacter(character) {
      return re.test(
        typeof character === "number" ? fromCode(character) : character.charAt(0)
      );
    }
  }
});

// node_modules/remark-parse/lib/locate/emphasis.js
var require_emphasis = __commonJS({
  "node_modules/remark-parse/lib/locate/emphasis.js"(exports, module2) {
    "use strict";
    module2.exports = locate;
    function locate(value, fromIndex) {
      var asterisk = value.indexOf("*", fromIndex);
      var underscore = value.indexOf("_", fromIndex);
      if (underscore === -1) {
        return asterisk;
      }
      if (asterisk === -1) {
        return underscore;
      }
      return underscore < asterisk ? underscore : asterisk;
    }
  }
});

// node_modules/remark-parse/lib/tokenize/emphasis.js
var require_emphasis2 = __commonJS({
  "node_modules/remark-parse/lib/tokenize/emphasis.js"(exports, module2) {
    "use strict";
    var trim = require_trim();
    var word = require_is_word_character();
    var whitespace = require_is_whitespace_character();
    var locate = require_emphasis();
    module2.exports = emphasis;
    emphasis.locator = locate;
    var asterisk = "*";
    var underscore = "_";
    var backslash = "\\";
    function emphasis(eat, value, silent) {
      var self = this;
      var index = 0;
      var character = value.charAt(index);
      var now;
      var pedantic;
      var marker;
      var queue;
      var subvalue;
      var length;
      var prev;
      if (character !== asterisk && character !== underscore) {
        return;
      }
      pedantic = self.options.pedantic;
      subvalue = character;
      marker = character;
      length = value.length;
      index++;
      queue = "";
      character = "";
      if (pedantic && whitespace(value.charAt(index))) {
        return;
      }
      while (index < length) {
        prev = character;
        character = value.charAt(index);
        if (character === marker && (!pedantic || !whitespace(prev))) {
          character = value.charAt(++index);
          if (character !== marker) {
            if (!trim(queue) || prev === marker) {
              return;
            }
            if (!pedantic && marker === underscore && word(character)) {
              queue += marker;
              continue;
            }
            if (silent) {
              return true;
            }
            now = eat.now();
            now.column++;
            now.offset++;
            return eat(subvalue + queue + marker)({
              type: "emphasis",
              children: self.tokenizeInline(queue, now)
            });
          }
          queue += marker;
        }
        if (!pedantic && character === backslash) {
          queue += character;
          character = value.charAt(++index);
        }
        queue += character;
        index++;
      }
    }
  }
});

// node_modules/remark-parse/lib/locate/delete.js
var require_delete = __commonJS({
  "node_modules/remark-parse/lib/locate/delete.js"(exports, module2) {
    "use strict";
    module2.exports = locate;
    function locate(value, fromIndex) {
      return value.indexOf("~~", fromIndex);
    }
  }
});

// node_modules/remark-parse/lib/tokenize/delete.js
var require_delete2 = __commonJS({
  "node_modules/remark-parse/lib/tokenize/delete.js"(exports, module2) {
    "use strict";
    var whitespace = require_is_whitespace_character();
    var locate = require_delete();
    module2.exports = strikethrough;
    strikethrough.locator = locate;
    var tilde = "~";
    var fence = "~~";
    function strikethrough(eat, value, silent) {
      var self = this;
      var character = "";
      var previous = "";
      var preceding = "";
      var subvalue = "";
      var index;
      var length;
      var now;
      if (!self.options.gfm || value.charAt(0) !== tilde || value.charAt(1) !== tilde || whitespace(value.charAt(2))) {
        return;
      }
      index = 1;
      length = value.length;
      now = eat.now();
      now.column += 2;
      now.offset += 2;
      while (++index < length) {
        character = value.charAt(index);
        if (character === tilde && previous === tilde && (!preceding || !whitespace(preceding))) {
          if (silent) {
            return true;
          }
          return eat(fence + subvalue + fence)({
            type: "delete",
            children: self.tokenizeInline(subvalue, now)
          });
        }
        subvalue += previous;
        preceding = previous;
        previous = character;
      }
    }
  }
});

// node_modules/remark-parse/lib/locate/code-inline.js
var require_code_inline = __commonJS({
  "node_modules/remark-parse/lib/locate/code-inline.js"(exports, module2) {
    "use strict";
    module2.exports = locate;
    function locate(value, fromIndex) {
      return value.indexOf("`", fromIndex);
    }
  }
});

// node_modules/remark-parse/lib/tokenize/code-inline.js
var require_code_inline2 = __commonJS({
  "node_modules/remark-parse/lib/tokenize/code-inline.js"(exports, module2) {
    "use strict";
    var locate = require_code_inline();
    module2.exports = inlineCode;
    inlineCode.locator = locate;
    var lineFeed = 10;
    var space2 = 32;
    var graveAccent = 96;
    function inlineCode(eat, value, silent) {
      var length = value.length;
      var index = 0;
      var openingFenceEnd;
      var closingFenceStart;
      var closingFenceEnd;
      var code;
      var next;
      var found;
      while (index < length) {
        if (value.charCodeAt(index) !== graveAccent) {
          break;
        }
        index++;
      }
      if (index === 0 || index === length) {
        return;
      }
      openingFenceEnd = index;
      next = value.charCodeAt(index);
      while (index < length) {
        code = next;
        next = value.charCodeAt(index + 1);
        if (code === graveAccent) {
          if (closingFenceStart === void 0) {
            closingFenceStart = index;
          }
          closingFenceEnd = index + 1;
          if (next !== graveAccent && closingFenceEnd - closingFenceStart === openingFenceEnd) {
            found = true;
            break;
          }
        } else if (closingFenceStart !== void 0) {
          closingFenceStart = void 0;
          closingFenceEnd = void 0;
        }
        index++;
      }
      if (!found) {
        return;
      }
      if (silent) {
        return true;
      }
      index = openingFenceEnd;
      length = closingFenceStart;
      code = value.charCodeAt(index);
      next = value.charCodeAt(length - 1);
      found = false;
      if (length - index > 2 && (code === space2 || code === lineFeed) && (next === space2 || next === lineFeed)) {
        index++;
        length--;
        while (index < length) {
          code = value.charCodeAt(index);
          if (code !== space2 && code !== lineFeed) {
            found = true;
            break;
          }
          index++;
        }
        if (found === true) {
          openingFenceEnd++;
          closingFenceStart--;
        }
      }
      return eat(value.slice(0, closingFenceEnd))({
        type: "inlineCode",
        value: value.slice(openingFenceEnd, closingFenceStart)
      });
    }
  }
});

// node_modules/remark-parse/lib/locate/break.js
var require_break = __commonJS({
  "node_modules/remark-parse/lib/locate/break.js"(exports, module2) {
    "use strict";
    module2.exports = locate;
    function locate(value, fromIndex) {
      var index = value.indexOf("\n", fromIndex);
      while (index > fromIndex) {
        if (value.charAt(index - 1) !== " ") {
          break;
        }
        index--;
      }
      return index;
    }
  }
});

// node_modules/remark-parse/lib/tokenize/break.js
var require_break2 = __commonJS({
  "node_modules/remark-parse/lib/tokenize/break.js"(exports, module2) {
    "use strict";
    var locate = require_break();
    module2.exports = hardBreak;
    hardBreak.locator = locate;
    var space2 = " ";
    var lineFeed = "\n";
    var minBreakLength = 2;
    function hardBreak(eat, value, silent) {
      var length = value.length;
      var index = -1;
      var queue = "";
      var character;
      while (++index < length) {
        character = value.charAt(index);
        if (character === lineFeed) {
          if (index < minBreakLength) {
            return;
          }
          if (silent) {
            return true;
          }
          queue += character;
          return eat(queue)({ type: "break" });
        }
        if (character !== space2) {
          return;
        }
        queue += character;
      }
    }
  }
});

// node_modules/remark-parse/lib/tokenize/text.js
var require_text = __commonJS({
  "node_modules/remark-parse/lib/tokenize/text.js"(exports, module2) {
    "use strict";
    module2.exports = text;
    function text(eat, value, silent) {
      var self = this;
      var methods;
      var tokenizers;
      var index;
      var length;
      var subvalue;
      var position;
      var tokenizer;
      var name;
      var min;
      var now;
      if (silent) {
        return true;
      }
      methods = self.inlineMethods;
      length = methods.length;
      tokenizers = self.inlineTokenizers;
      index = -1;
      min = value.length;
      while (++index < length) {
        name = methods[index];
        if (name === "text" || !tokenizers[name]) {
          continue;
        }
        tokenizer = tokenizers[name].locator;
        if (!tokenizer) {
          eat.file.fail("Missing locator: `" + name + "`");
        }
        position = tokenizer.call(self, value, 1);
        if (position !== -1 && position < min) {
          min = position;
        }
      }
      subvalue = value.slice(0, min);
      now = eat.now();
      self.decode(subvalue, now, handler);
      function handler(content, position2, source) {
        eat(source || content)({ type: "text", value: content });
      }
    }
  }
});

// node_modules/remark-parse/lib/parser.js
var require_parser = __commonJS({
  "node_modules/remark-parse/lib/parser.js"(exports, module2) {
    "use strict";
    var xtend = require_immutable();
    var toggle = require_state_toggle();
    var vfileLocation = require_vfile_location();
    var unescape = require_unescape();
    var decode = require_decode();
    var tokenizer = require_tokenizer();
    module2.exports = Parser;
    function Parser(doc, file) {
      this.file = file;
      this.offset = {};
      this.options = xtend(this.options);
      this.setOptions({});
      this.inList = false;
      this.inBlock = false;
      this.inLink = false;
      this.atStart = true;
      this.toOffset = vfileLocation(file).toOffset;
      this.unescape = unescape(this, "escape");
      this.decode = decode(this);
    }
    var proto = Parser.prototype;
    proto.setOptions = require_set_options();
    proto.parse = require_parse();
    proto.options = require_defaults();
    proto.exitStart = toggle("atStart", true);
    proto.enterList = toggle("inList", false);
    proto.enterLink = toggle("inLink", false);
    proto.enterBlock = toggle("inBlock", false);
    proto.interruptParagraph = [
      ["thematicBreak"],
      ["atxHeading"],
      ["fencedCode"],
      ["blockquote"],
      ["html"],
      ["setextHeading", { commonmark: false }],
      ["definition", { commonmark: false }],
      ["footnote", { commonmark: false }]
    ];
    proto.interruptList = [
      ["atxHeading", { pedantic: false }],
      ["fencedCode", { pedantic: false }],
      ["thematicBreak", { pedantic: false }],
      ["definition", { commonmark: false }],
      ["footnote", { commonmark: false }]
    ];
    proto.interruptBlockquote = [
      ["indentedCode", { commonmark: true }],
      ["fencedCode", { commonmark: true }],
      ["atxHeading", { commonmark: true }],
      ["setextHeading", { commonmark: true }],
      ["thematicBreak", { commonmark: true }],
      ["html", { commonmark: true }],
      ["list", { commonmark: true }],
      ["definition", { commonmark: false }],
      ["footnote", { commonmark: false }]
    ];
    proto.blockTokenizers = {
      newline: require_newline(),
      indentedCode: require_code_indented(),
      fencedCode: require_code_fenced(),
      blockquote: require_blockquote(),
      atxHeading: require_heading_atx(),
      thematicBreak: require_thematic_break(),
      list: require_list(),
      setextHeading: require_heading_setext(),
      html: require_html_block(),
      footnote: require_footnote_definition(),
      definition: require_definition(),
      table: require_table(),
      paragraph: require_paragraph()
    };
    proto.inlineTokenizers = {
      escape: require_escape2(),
      autoLink: require_auto_link(),
      url: require_url2(),
      html: require_html_inline(),
      link: require_link2(),
      reference: require_reference(),
      strong: require_strong2(),
      emphasis: require_emphasis2(),
      deletion: require_delete2(),
      code: require_code_inline2(),
      break: require_break2(),
      text: require_text()
    };
    proto.blockMethods = keys(proto.blockTokenizers);
    proto.inlineMethods = keys(proto.inlineTokenizers);
    proto.tokenizeBlock = tokenizer("block");
    proto.tokenizeInline = tokenizer("inline");
    proto.tokenizeFactory = tokenizer;
    function keys(value) {
      var result = [];
      var key;
      for (key in value) {
        result.push(key);
      }
      return result;
    }
  }
});

// node_modules/remark-parse/index.js
var require_remark_parse = __commonJS({
  "node_modules/remark-parse/index.js"(exports, module2) {
    "use strict";
    var unherit = require_unherit();
    var xtend = require_immutable();
    var Parser = require_parser();
    module2.exports = parse;
    parse.Parser = Parser;
    function parse(options) {
      var settings = this.data("settings");
      var Local = unherit(Parser);
      Local.prototype.options = xtend(Local.prototype.options, settings, options);
      this.Parser = Local;
    }
  }
});

// node_modules/remark-stringify/lib/util/identity.js
var require_identity = __commonJS({
  "node_modules/remark-stringify/lib/util/identity.js"(exports, module2) {
    "use strict";
    module2.exports = identity;
    function identity(value) {
      return value;
    }
  }
});

// node_modules/remark-stringify/lib/util/enter-link-reference.js
var require_enter_link_reference = __commonJS({
  "node_modules/remark-stringify/lib/util/enter-link-reference.js"(exports, module2) {
    "use strict";
    var identity = require_identity();
    module2.exports = enter;
    function enter(compiler, node) {
      var encode = compiler.encode;
      var escape = compiler.escape;
      var exitLink = compiler.enterLink();
      if (node.referenceType !== "shortcut" && node.referenceType !== "collapsed") {
        return exitLink;
      }
      compiler.escape = identity;
      compiler.encode = identity;
      return exit;
      function exit() {
        compiler.encode = encode;
        compiler.escape = escape;
        exitLink();
      }
    }
  }
});

// node_modules/remark-stringify/lib/defaults.js
var require_defaults2 = __commonJS({
  "node_modules/remark-stringify/lib/defaults.js"(exports, module2) {
    "use strict";
    module2.exports = {
      gfm: true,
      commonmark: false,
      pedantic: false,
      entities: "false",
      setext: false,
      closeAtx: false,
      looseTable: false,
      spacedTable: true,
      paddedTable: true,
      stringLength,
      incrementListMarker: true,
      fences: false,
      fence: "`",
      bullet: "-",
      listItemIndent: "tab",
      rule: "*",
      ruleSpaces: true,
      ruleRepetition: 3,
      strong: "*",
      emphasis: "_"
    };
    function stringLength(value) {
      return value.length;
    }
  }
});

// node_modules/character-entities-html4/index.json
var require_character_entities_html4 = __commonJS({
  "node_modules/character-entities-html4/index.json"(exports, module2) {
    module2.exports = {
      nbsp: "\xA0",
      iexcl: "\xA1",
      cent: "\xA2",
      pound: "\xA3",
      curren: "\xA4",
      yen: "\xA5",
      brvbar: "\xA6",
      sect: "\xA7",
      uml: "\xA8",
      copy: "\xA9",
      ordf: "\xAA",
      laquo: "\xAB",
      not: "\xAC",
      shy: "\xAD",
      reg: "\xAE",
      macr: "\xAF",
      deg: "\xB0",
      plusmn: "\xB1",
      sup2: "\xB2",
      sup3: "\xB3",
      acute: "\xB4",
      micro: "\xB5",
      para: "\xB6",
      middot: "\xB7",
      cedil: "\xB8",
      sup1: "\xB9",
      ordm: "\xBA",
      raquo: "\xBB",
      frac14: "\xBC",
      frac12: "\xBD",
      frac34: "\xBE",
      iquest: "\xBF",
      Agrave: "\xC0",
      Aacute: "\xC1",
      Acirc: "\xC2",
      Atilde: "\xC3",
      Auml: "\xC4",
      Aring: "\xC5",
      AElig: "\xC6",
      Ccedil: "\xC7",
      Egrave: "\xC8",
      Eacute: "\xC9",
      Ecirc: "\xCA",
      Euml: "\xCB",
      Igrave: "\xCC",
      Iacute: "\xCD",
      Icirc: "\xCE",
      Iuml: "\xCF",
      ETH: "\xD0",
      Ntilde: "\xD1",
      Ograve: "\xD2",
      Oacute: "\xD3",
      Ocirc: "\xD4",
      Otilde: "\xD5",
      Ouml: "\xD6",
      times: "\xD7",
      Oslash: "\xD8",
      Ugrave: "\xD9",
      Uacute: "\xDA",
      Ucirc: "\xDB",
      Uuml: "\xDC",
      Yacute: "\xDD",
      THORN: "\xDE",
      szlig: "\xDF",
      agrave: "\xE0",
      aacute: "\xE1",
      acirc: "\xE2",
      atilde: "\xE3",
      auml: "\xE4",
      aring: "\xE5",
      aelig: "\xE6",
      ccedil: "\xE7",
      egrave: "\xE8",
      eacute: "\xE9",
      ecirc: "\xEA",
      euml: "\xEB",
      igrave: "\xEC",
      iacute: "\xED",
      icirc: "\xEE",
      iuml: "\xEF",
      eth: "\xF0",
      ntilde: "\xF1",
      ograve: "\xF2",
      oacute: "\xF3",
      ocirc: "\xF4",
      otilde: "\xF5",
      ouml: "\xF6",
      divide: "\xF7",
      oslash: "\xF8",
      ugrave: "\xF9",
      uacute: "\xFA",
      ucirc: "\xFB",
      uuml: "\xFC",
      yacute: "\xFD",
      thorn: "\xFE",
      yuml: "\xFF",
      fnof: "\u0192",
      Alpha: "\u0391",
      Beta: "\u0392",
      Gamma: "\u0393",
      Delta: "\u0394",
      Epsilon: "\u0395",
      Zeta: "\u0396",
      Eta: "\u0397",
      Theta: "\u0398",
      Iota: "\u0399",
      Kappa: "\u039A",
      Lambda: "\u039B",
      Mu: "\u039C",
      Nu: "\u039D",
      Xi: "\u039E",
      Omicron: "\u039F",
      Pi: "\u03A0",
      Rho: "\u03A1",
      Sigma: "\u03A3",
      Tau: "\u03A4",
      Upsilon: "\u03A5",
      Phi: "\u03A6",
      Chi: "\u03A7",
      Psi: "\u03A8",
      Omega: "\u03A9",
      alpha: "\u03B1",
      beta: "\u03B2",
      gamma: "\u03B3",
      delta: "\u03B4",
      epsilon: "\u03B5",
      zeta: "\u03B6",
      eta: "\u03B7",
      theta: "\u03B8",
      iota: "\u03B9",
      kappa: "\u03BA",
      lambda: "\u03BB",
      mu: "\u03BC",
      nu: "\u03BD",
      xi: "\u03BE",
      omicron: "\u03BF",
      pi: "\u03C0",
      rho: "\u03C1",
      sigmaf: "\u03C2",
      sigma: "\u03C3",
      tau: "\u03C4",
      upsilon: "\u03C5",
      phi: "\u03C6",
      chi: "\u03C7",
      psi: "\u03C8",
      omega: "\u03C9",
      thetasym: "\u03D1",
      upsih: "\u03D2",
      piv: "\u03D6",
      bull: "\u2022",
      hellip: "\u2026",
      prime: "\u2032",
      Prime: "\u2033",
      oline: "\u203E",
      frasl: "\u2044",
      weierp: "\u2118",
      image: "\u2111",
      real: "\u211C",
      trade: "\u2122",
      alefsym: "\u2135",
      larr: "\u2190",
      uarr: "\u2191",
      rarr: "\u2192",
      darr: "\u2193",
      harr: "\u2194",
      crarr: "\u21B5",
      lArr: "\u21D0",
      uArr: "\u21D1",
      rArr: "\u21D2",
      dArr: "\u21D3",
      hArr: "\u21D4",
      forall: "\u2200",
      part: "\u2202",
      exist: "\u2203",
      empty: "\u2205",
      nabla: "\u2207",
      isin: "\u2208",
      notin: "\u2209",
      ni: "\u220B",
      prod: "\u220F",
      sum: "\u2211",
      minus: "\u2212",
      lowast: "\u2217",
      radic: "\u221A",
      prop: "\u221D",
      infin: "\u221E",
      ang: "\u2220",
      and: "\u2227",
      or: "\u2228",
      cap: "\u2229",
      cup: "\u222A",
      int: "\u222B",
      there4: "\u2234",
      sim: "\u223C",
      cong: "\u2245",
      asymp: "\u2248",
      ne: "\u2260",
      equiv: "\u2261",
      le: "\u2264",
      ge: "\u2265",
      sub: "\u2282",
      sup: "\u2283",
      nsub: "\u2284",
      sube: "\u2286",
      supe: "\u2287",
      oplus: "\u2295",
      otimes: "\u2297",
      perp: "\u22A5",
      sdot: "\u22C5",
      lceil: "\u2308",
      rceil: "\u2309",
      lfloor: "\u230A",
      rfloor: "\u230B",
      lang: "\u2329",
      rang: "\u232A",
      loz: "\u25CA",
      spades: "\u2660",
      clubs: "\u2663",
      hearts: "\u2665",
      diams: "\u2666",
      quot: '"',
      amp: "&",
      lt: "<",
      gt: ">",
      OElig: "\u0152",
      oelig: "\u0153",
      Scaron: "\u0160",
      scaron: "\u0161",
      Yuml: "\u0178",
      circ: "\u02C6",
      tilde: "\u02DC",
      ensp: "\u2002",
      emsp: "\u2003",
      thinsp: "\u2009",
      zwnj: "\u200C",
      zwj: "\u200D",
      lrm: "\u200E",
      rlm: "\u200F",
      ndash: "\u2013",
      mdash: "\u2014",
      lsquo: "\u2018",
      rsquo: "\u2019",
      sbquo: "\u201A",
      ldquo: "\u201C",
      rdquo: "\u201D",
      bdquo: "\u201E",
      dagger: "\u2020",
      Dagger: "\u2021",
      permil: "\u2030",
      lsaquo: "\u2039",
      rsaquo: "\u203A",
      euro: "\u20AC"
    };
  }
});

// node_modules/stringify-entities/dangerous.json
var require_dangerous = __commonJS({
  "node_modules/stringify-entities/dangerous.json"(exports, module2) {
    module2.exports = [
      "cent",
      "copy",
      "divide",
      "gt",
      "lt",
      "not",
      "para",
      "times"
    ];
  }
});

// node_modules/stringify-entities/index.js
var require_stringify_entities = __commonJS({
  "node_modules/stringify-entities/index.js"(exports, module2) {
    "use strict";
    var entities = require_character_entities_html4();
    var legacy = require_character_entities_legacy();
    var hexadecimal = require_is_hexadecimal();
    var decimal = require_is_decimal();
    var alphanumerical = require_is_alphanumerical();
    var dangerous = require_dangerous();
    module2.exports = encode;
    encode.escape = escape;
    var own = {}.hasOwnProperty;
    var escapes = ['"', "'", "<", ">", "&", "`"];
    var characters = construct();
    var defaultEscapes = toExpression(escapes);
    var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var bmp = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
    function encode(value, options) {
      var settings = options || {};
      var subset = settings.subset;
      var set = subset ? toExpression(subset) : defaultEscapes;
      var escapeOnly = settings.escapeOnly;
      var omit = settings.omitOptionalSemicolons;
      value = value.replace(set, replace);
      if (subset || escapeOnly) {
        return value;
      }
      return value.replace(surrogatePair, replaceSurrogatePair).replace(bmp, replace);
      function replaceSurrogatePair(pair, pos, val) {
        return toHexReference(
          (pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536,
          val.charAt(pos + 2),
          omit
        );
      }
      function replace(char, pos, val) {
        return one(char, val.charAt(pos + 1), settings);
      }
    }
    function escape(value) {
      return encode(value, { escapeOnly: true, useNamedReferences: true });
    }
    function one(char, next, options) {
      var shortest = options.useShortestReferences;
      var omit = options.omitOptionalSemicolons;
      var named;
      var code;
      var numeric;
      var decimal2;
      if ((shortest || options.useNamedReferences) && own.call(characters, char)) {
        named = toNamed(characters[char], next, omit, options.attribute);
      }
      if (shortest || !named) {
        code = char.charCodeAt(0);
        numeric = toHexReference(code, next, omit);
        if (shortest) {
          decimal2 = toDecimalReference(code, next, omit);
          if (decimal2.length < numeric.length) {
            numeric = decimal2;
          }
        }
      }
      if (named && (!shortest || named.length < numeric.length)) {
        return named;
      }
      return numeric;
    }
    function toNamed(name, next, omit, attribute) {
      var value = "&" + name;
      if (omit && own.call(legacy, name) && dangerous.indexOf(name) === -1 && (!attribute || next && next !== "=" && !alphanumerical(next))) {
        return value;
      }
      return value + ";";
    }
    function toHexReference(code, next, omit) {
      var value = "&#x" + code.toString(16).toUpperCase();
      return omit && next && !hexadecimal(next) ? value : value + ";";
    }
    function toDecimalReference(code, next, omit) {
      var value = "&#" + String(code);
      return omit && next && !decimal(next) ? value : value + ";";
    }
    function toExpression(characters2) {
      return new RegExp("[" + characters2.join("") + "]", "g");
    }
    function construct() {
      var chars = {};
      var name;
      for (name in entities) {
        chars[entities[name]] = name;
      }
      return chars;
    }
  }
});

// node_modules/is-alphanumeric/index.js
var require_is_alphanumeric = __commonJS({
  "node_modules/is-alphanumeric/index.js"(exports, module2) {
    "use strict";
    module2.exports = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return !/[^0-9a-z\xDF-\xFF]/.test(str.toLowerCase());
    };
  }
});

// node_modules/remark-stringify/lib/util/entity-prefix-length.js
var require_entity_prefix_length = __commonJS({
  "node_modules/remark-stringify/lib/util/entity-prefix-length.js"(exports, module2) {
    "use strict";
    var decode = require_parse_entities();
    module2.exports = length;
    var ampersand = "&";
    function length(value) {
      var prefix;
      if (value.charAt(0) !== ampersand) {
        return 0;
      }
      prefix = value.split(ampersand, 2).join(ampersand);
      return prefix.length - decode(prefix).length;
    }
  }
});

// node_modules/remark-stringify/lib/escape.js
var require_escape3 = __commonJS({
  "node_modules/remark-stringify/lib/escape.js"(exports, module2) {
    "use strict";
    var decimal = require_is_decimal();
    var alphanumeric = require_is_alphanumeric();
    var whitespace = require_is_whitespace_character();
    var escapes = require_markdown_escapes();
    var prefix = require_entity_prefix_length();
    module2.exports = factory;
    var tab = "	";
    var lineFeed = "\n";
    var space2 = " ";
    var numberSign = "#";
    var ampersand = "&";
    var leftParenthesis = "(";
    var rightParenthesis = ")";
    var asterisk = "*";
    var plusSign = "+";
    var dash = "-";
    var dot = ".";
    var colon = ":";
    var lessThan = "<";
    var greaterThan = ">";
    var leftSquareBracket = "[";
    var backslash = "\\";
    var rightSquareBracket = "]";
    var underscore = "_";
    var graveAccent = "`";
    var verticalBar = "|";
    var tilde = "~";
    var exclamationMark = "!";
    var entities = {
      "<": "&lt;",
      ":": "&#x3A;",
      "&": "&amp;",
      "|": "&#x7C;",
      "~": "&#x7E;"
    };
    var shortcut = "shortcut";
    var mailto = "mailto";
    var https = "https";
    var http = "http";
    var blankExpression = /\n\s*$/;
    function factory(options) {
      return escape;
      function escape(value, node, parent) {
        var self = this;
        var gfm = options.gfm;
        var commonmark = options.commonmark;
        var pedantic = options.pedantic;
        var markers = commonmark ? [dot, rightParenthesis] : [dot];
        var siblings = parent && parent.children;
        var index = siblings && siblings.indexOf(node);
        var prev = siblings && siblings[index - 1];
        var next = siblings && siblings[index + 1];
        var length = value.length;
        var escapable = escapes(options);
        var position = -1;
        var queue = [];
        var escaped = queue;
        var afterNewLine;
        var character;
        var wordCharBefore;
        var wordCharAfter;
        var offset;
        var replace;
        if (prev) {
          afterNewLine = text(prev) && blankExpression.test(prev.value);
        } else {
          afterNewLine = !parent || parent.type === "root" || parent.type === "paragraph";
        }
        while (++position < length) {
          character = value.charAt(position);
          replace = false;
          if (character === "\n") {
            afterNewLine = true;
          } else if (character === backslash || character === graveAccent || character === asterisk || character === leftSquareBracket || character === lessThan || character === ampersand && prefix(value.slice(position)) > 0 || character === rightSquareBracket && self.inLink || gfm && character === tilde && value.charAt(position + 1) === tilde || gfm && character === verticalBar && (self.inTable || alignment(value, position)) || character === underscore && // Delegate leading/trailing underscores to the multinode version below.
          position > 0 && position < length - 1 && (pedantic || !alphanumeric(value.charAt(position - 1)) || !alphanumeric(value.charAt(position + 1))) || gfm && !self.inLink && character === colon && protocol(queue.join(""))) {
            replace = true;
          } else if (afterNewLine) {
            if (character === greaterThan || character === numberSign || character === asterisk || character === dash || character === plusSign) {
              replace = true;
            } else if (decimal(character)) {
              offset = position + 1;
              while (offset < length) {
                if (!decimal(value.charAt(offset))) {
                  break;
                }
                offset++;
              }
              if (markers.indexOf(value.charAt(offset)) !== -1) {
                next = value.charAt(offset + 1);
                if (!next || next === space2 || next === tab || next === lineFeed) {
                  queue.push(value.slice(position, offset));
                  position = offset;
                  character = value.charAt(position);
                  replace = true;
                }
              }
            }
          }
          if (afterNewLine && !whitespace(character)) {
            afterNewLine = false;
          }
          queue.push(replace ? one(character) : character);
        }
        if (siblings && text(node)) {
          if (prev && prev.referenceType === shortcut) {
            position = -1;
            length = escaped.length;
            while (++position < length) {
              character = escaped[position];
              if (character === space2 || character === tab) {
                continue;
              }
              if (character === leftParenthesis || character === colon) {
                escaped[position] = one(character);
              }
              break;
            }
            if (text(next) && position === length && next.value.charAt(0) === leftParenthesis) {
              escaped.push(backslash);
            }
          }
          if (gfm && !self.inLink && text(prev) && value.charAt(0) === colon && protocol(prev.value.slice(-6))) {
            escaped[0] = one(colon);
          }
          if (text(next) && value.charAt(length - 1) === ampersand && prefix(ampersand + next.value) !== 0) {
            escaped[escaped.length - 1] = one(ampersand);
          }
          if (next && next.type === "link" && value.charAt(length - 1) === exclamationMark) {
            escaped[escaped.length - 1] = one(exclamationMark);
          }
          if (gfm && text(next) && value.charAt(length - 1) === tilde && next.value.charAt(0) === tilde) {
            escaped.splice(escaped.length - 1, 0, backslash);
          }
          wordCharBefore = text(prev) && alphanumeric(prev.value.slice(-1));
          wordCharAfter = text(next) && alphanumeric(next.value.charAt(0));
          if (length === 1) {
            if (value === underscore && (pedantic || !wordCharBefore || !wordCharAfter)) {
              escaped.unshift(backslash);
            }
          } else {
            if (value.charAt(0) === underscore && (pedantic || !wordCharBefore || !alphanumeric(value.charAt(1)))) {
              escaped.unshift(backslash);
            }
            if (value.charAt(length - 1) === underscore && (pedantic || !wordCharAfter || !alphanumeric(value.charAt(length - 2)))) {
              escaped.splice(escaped.length - 1, 0, backslash);
            }
          }
        }
        return escaped.join("");
        function one(character2) {
          return escapable.indexOf(character2) === -1 ? entities[character2] : backslash + character2;
        }
      }
    }
    function alignment(value, index) {
      var start = value.lastIndexOf(lineFeed, index);
      var end = value.indexOf(lineFeed, index);
      var char;
      end = end === -1 ? value.length : end;
      while (++start < end) {
        char = value.charAt(start);
        if (char !== colon && char !== dash && char !== space2 && char !== verticalBar) {
          return false;
        }
      }
      return true;
    }
    function text(node) {
      return node && node.type === "text";
    }
    function protocol(value) {
      var val = value.slice(-6).toLowerCase();
      return val === mailto || val.slice(-5) === https || val.slice(-4) === http;
    }
  }
});

// node_modules/remark-stringify/lib/set-options.js
var require_set_options2 = __commonJS({
  "node_modules/remark-stringify/lib/set-options.js"(exports, module2) {
    "use strict";
    var xtend = require_immutable();
    var encode = require_stringify_entities();
    var defaults = require_defaults2();
    var escapeFactory = require_escape3();
    var identity = require_identity();
    module2.exports = setOptions;
    var maps = {
      entities: { true: true, false: true, numbers: true, escape: true },
      bullet: { "*": true, "-": true, "+": true },
      rule: { "-": true, _: true, "*": true },
      listItemIndent: { tab: true, mixed: true, 1: true },
      emphasis: { _: true, "*": true },
      strong: { _: true, "*": true },
      fence: { "`": true, "~": true }
    };
    var validate3 = {
      boolean: validateBoolean,
      string: validateString,
      number: validateNumber,
      function: validateFunction
    };
    function setOptions(options) {
      var self = this;
      var current = self.options;
      var ruleRepetition;
      var key;
      if (options == null) {
        options = {};
      } else if (typeof options === "object") {
        options = xtend(options);
      } else {
        throw new Error("Invalid value `" + options + "` for setting `options`");
      }
      for (key in defaults) {
        validate3[typeof defaults[key]](options, key, current[key], maps[key]);
      }
      ruleRepetition = options.ruleRepetition;
      if (ruleRepetition && ruleRepetition < 3) {
        raise(ruleRepetition, "options.ruleRepetition");
      }
      self.encode = encodeFactory(String(options.entities));
      self.escape = escapeFactory(options);
      self.options = options;
      return self;
    }
    function validateBoolean(context, name, def) {
      var value = context[name];
      if (value == null) {
        value = def;
      }
      if (typeof value !== "boolean") {
        raise(value, "options." + name);
      }
      context[name] = value;
    }
    function validateNumber(context, name, def) {
      var value = context[name];
      if (value == null) {
        value = def;
      }
      if (isNaN(value)) {
        raise(value, "options." + name);
      }
      context[name] = value;
    }
    function validateString(context, name, def, map) {
      var value = context[name];
      if (value == null) {
        value = def;
      }
      value = String(value);
      if (!(value in map)) {
        raise(value, "options." + name);
      }
      context[name] = value;
    }
    function validateFunction(context, name, def) {
      var value = context[name];
      if (value == null) {
        value = def;
      }
      if (typeof value !== "function") {
        raise(value, "options." + name);
      }
      context[name] = value;
    }
    function encodeFactory(type) {
      var options = {};
      if (type === "false") {
        return identity;
      }
      if (type === "true") {
        options.useNamedReferences = true;
      }
      if (type === "escape") {
        options.escapeOnly = true;
        options.useNamedReferences = true;
      }
      return wrapped;
      function wrapped(value) {
        return encode(value, options);
      }
    }
    function raise(value, name) {
      throw new Error("Invalid value `" + value + "` for setting `" + name + "`");
    }
  }
});

// node_modules/mdast-util-compact/node_modules/unist-util-is/convert.js
var require_convert2 = __commonJS({
  "node_modules/mdast-util-compact/node_modules/unist-util-is/convert.js"(exports, module2) {
    "use strict";
    module2.exports = convert;
    function convert(test) {
      if (typeof test === "string") {
        return typeFactory(test);
      }
      if (test === null || test === void 0) {
        return ok;
      }
      if (typeof test === "object") {
        return ("length" in test ? anyFactory : matchesFactory)(test);
      }
      if (typeof test === "function") {
        return test;
      }
      throw new Error("Expected function, string, or object as test");
    }
    function convertAll(tests) {
      var results = [];
      var length = tests.length;
      var index = -1;
      while (++index < length) {
        results[index] = convert(tests[index]);
      }
      return results;
    }
    function matchesFactory(test) {
      return matches;
      function matches(node) {
        var key;
        for (key in test) {
          if (node[key] !== test[key]) {
            return false;
          }
        }
        return true;
      }
    }
    function anyFactory(tests) {
      var checks = convertAll(tests);
      var length = checks.length;
      return matches;
      function matches() {
        var index = -1;
        while (++index < length) {
          if (checks[index].apply(this, arguments)) {
            return true;
          }
        }
        return false;
      }
    }
    function typeFactory(test) {
      return type;
      function type(node) {
        return Boolean(node && node.type === test);
      }
    }
    function ok() {
      return true;
    }
  }
});

// node_modules/mdast-util-compact/node_modules/unist-util-visit-parents/index.js
var require_unist_util_visit_parents2 = __commonJS({
  "node_modules/mdast-util-compact/node_modules/unist-util-visit-parents/index.js"(exports, module2) {
    "use strict";
    module2.exports = visitParents;
    var convert = require_convert2();
    var CONTINUE = true;
    var SKIP = "skip";
    var EXIT = false;
    visitParents.CONTINUE = CONTINUE;
    visitParents.SKIP = SKIP;
    visitParents.EXIT = EXIT;
    function visitParents(tree, test, visitor, reverse) {
      var is;
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      is = convert(test);
      one(tree, null, []);
      function one(node, index, parents) {
        var result = [];
        var subresult;
        if (!test || is(node, index, parents[parents.length - 1] || null)) {
          result = toResult(visitor(node, parents));
          if (result[0] === EXIT) {
            return result;
          }
        }
        if (node.children && result[0] !== SKIP) {
          subresult = toResult(all2(node.children, parents.concat(node)));
          return subresult[0] === EXIT ? subresult : result;
        }
        return result;
      }
      function all2(children, parents) {
        var min = -1;
        var step = reverse ? -1 : 1;
        var index = (reverse ? children.length : min) + step;
        var result;
        while (index > min && index < children.length) {
          result = one(children[index], index, parents);
          if (result[0] === EXIT) {
            return result;
          }
          index = typeof result[1] === "number" ? result[1] : index + step;
        }
      }
    }
    function toResult(value) {
      if (value !== null && typeof value === "object" && "length" in value) {
        return value;
      }
      if (typeof value === "number") {
        return [CONTINUE, value];
      }
      return [value];
    }
  }
});

// node_modules/mdast-util-compact/node_modules/unist-util-visit/index.js
var require_unist_util_visit2 = __commonJS({
  "node_modules/mdast-util-compact/node_modules/unist-util-visit/index.js"(exports, module2) {
    "use strict";
    module2.exports = visit;
    var visitParents = require_unist_util_visit_parents2();
    var CONTINUE = visitParents.CONTINUE;
    var SKIP = visitParents.SKIP;
    var EXIT = visitParents.EXIT;
    visit.CONTINUE = CONTINUE;
    visit.SKIP = SKIP;
    visit.EXIT = EXIT;
    function visit(tree, test, visitor, reverse) {
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      visitParents(tree, test, overload, reverse);
      function overload(node, parents) {
        var parent = parents[parents.length - 1];
        var index = parent ? parent.children.indexOf(node) : null;
        return visitor(node, index, parent);
      }
    }
  }
});

// node_modules/mdast-util-compact/index.js
var require_mdast_util_compact = __commonJS({
  "node_modules/mdast-util-compact/index.js"(exports, module2) {
    "use strict";
    var visit = require_unist_util_visit2();
    module2.exports = compact;
    function compact(tree, commonmark) {
      visit(tree, visitor);
      return tree;
      function visitor(child, index, parent) {
        var siblings = parent ? parent.children : [];
        var prev = index && siblings[index - 1];
        if (prev && child.type === prev.type && mergeable(prev, commonmark) && mergeable(child, commonmark)) {
          if (child.value) {
            prev.value += child.value;
          }
          if (child.children) {
            prev.children = prev.children.concat(child.children);
          }
          siblings.splice(index, 1);
          if (prev.position && child.position) {
            prev.position.end = child.position.end;
          }
          return index;
        }
      }
    }
    function mergeable(node, commonmark) {
      var start;
      var end;
      if (node.type === "text") {
        if (!node.position) {
          return true;
        }
        start = node.position.start;
        end = node.position.end;
        return start.line !== end.line || end.column - start.column === node.value.length;
      }
      return commonmark && node.type === "blockquote";
    }
  }
});

// node_modules/remark-stringify/lib/macro/compile.js
var require_compile = __commonJS({
  "node_modules/remark-stringify/lib/macro/compile.js"(exports, module2) {
    "use strict";
    var compact = require_mdast_util_compact();
    module2.exports = compile;
    function compile() {
      return this.visit(compact(this.tree, this.options.commonmark));
    }
  }
});

// node_modules/remark-stringify/lib/macro/one.js
var require_one = __commonJS({
  "node_modules/remark-stringify/lib/macro/one.js"(exports, module2) {
    "use strict";
    module2.exports = one;
    function one(node, parent) {
      var self = this;
      var visitors = self.visitors;
      if (typeof visitors[node.type] !== "function") {
        self.file.fail(
          new Error(
            "Missing compiler for node of type `" + node.type + "`: `" + node + "`"
          ),
          node
        );
      }
      return visitors[node.type].call(self, node, parent);
    }
  }
});

// node_modules/remark-stringify/lib/macro/all.js
var require_all = __commonJS({
  "node_modules/remark-stringify/lib/macro/all.js"(exports, module2) {
    "use strict";
    module2.exports = all2;
    function all2(parent) {
      var self = this;
      var children = parent.children;
      var length = children.length;
      var results = [];
      var index = -1;
      while (++index < length) {
        results[index] = self.visit(children[index], parent);
      }
      return results;
    }
  }
});

// node_modules/remark-stringify/lib/macro/block.js
var require_block = __commonJS({
  "node_modules/remark-stringify/lib/macro/block.js"(exports, module2) {
    "use strict";
    module2.exports = block;
    var lineFeed = "\n";
    var blank = lineFeed + lineFeed;
    var triple = blank + lineFeed;
    var comment = blank + "<!---->" + blank;
    function block(node) {
      var self = this;
      var options = self.options;
      var fences = options.fences;
      var gap = options.commonmark ? comment : triple;
      var values = [];
      var children = node.children;
      var length = children.length;
      var index = -1;
      var prev;
      var child;
      while (++index < length) {
        prev = child;
        child = children[index];
        if (prev) {
          if (prev.type === "list" && (child.type === "list" && prev.ordered === child.ordered || child.type === "code" && !child.lang && !fences)) {
            values.push(gap);
          } else {
            values.push(blank);
          }
        }
        values.push(self.visit(child, node));
      }
      return values.join("");
    }
  }
});

// node_modules/remark-stringify/lib/macro/ordered-items.js
var require_ordered_items = __commonJS({
  "node_modules/remark-stringify/lib/macro/ordered-items.js"(exports, module2) {
    "use strict";
    module2.exports = orderedItems;
    var lineFeed = "\n";
    var dot = ".";
    var blank = lineFeed + lineFeed;
    function orderedItems(node) {
      var self = this;
      var fn = self.visitors.listItem;
      var increment = self.options.incrementListMarker;
      var values = [];
      var start = node.start;
      var children = node.children;
      var length = children.length;
      var index = -1;
      var bullet;
      start = start == null ? 1 : start;
      while (++index < length) {
        bullet = (increment ? start + index : start) + dot;
        values[index] = fn.call(self, children[index], node, index, bullet);
      }
      return values.join(node.spread ? blank : lineFeed);
    }
  }
});

// node_modules/remark-stringify/lib/macro/unordered-items.js
var require_unordered_items = __commonJS({
  "node_modules/remark-stringify/lib/macro/unordered-items.js"(exports, module2) {
    "use strict";
    module2.exports = unorderedItems;
    var lineFeed = "\n";
    var blank = lineFeed + lineFeed;
    function unorderedItems(node) {
      var self = this;
      var bullet = self.options.bullet;
      var fn = self.visitors.listItem;
      var children = node.children;
      var length = children.length;
      var index = -1;
      var values = [];
      while (++index < length) {
        values[index] = fn.call(self, children[index], node, index, bullet);
      }
      return values.join(node.spread ? blank : lineFeed);
    }
  }
});

// node_modules/remark-stringify/lib/visitors/root.js
var require_root = __commonJS({
  "node_modules/remark-stringify/lib/visitors/root.js"(exports, module2) {
    "use strict";
    module2.exports = root;
    var lineFeed = "\n";
    function root(node) {
      var doc = this.block(node);
      if (doc.charAt(doc.length - 1) !== lineFeed) {
        doc += lineFeed;
      }
      return doc;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/text.js
var require_text2 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/text.js"(exports, module2) {
    "use strict";
    module2.exports = text;
    function text(node, parent) {
      return this.encode(this.escape(node.value, node, parent), node);
    }
  }
});

// node_modules/remark-stringify/lib/visitors/heading.js
var require_heading = __commonJS({
  "node_modules/remark-stringify/lib/visitors/heading.js"(exports, module2) {
    "use strict";
    var repeat = require_repeat_string();
    module2.exports = heading;
    var lineFeed = "\n";
    var space2 = " ";
    var numberSign = "#";
    var dash = "-";
    var equalsTo = "=";
    function heading(node) {
      var self = this;
      var depth = node.depth;
      var setext = self.options.setext;
      var closeAtx = self.options.closeAtx;
      var content = self.all(node).join("");
      var prefix;
      if (setext && depth < 3) {
        return content + lineFeed + repeat(depth === 1 ? equalsTo : dash, content.length);
      }
      prefix = repeat(numberSign, node.depth);
      return prefix + space2 + content + (closeAtx ? space2 + prefix : "");
    }
  }
});

// node_modules/remark-stringify/lib/visitors/paragraph.js
var require_paragraph2 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/paragraph.js"(exports, module2) {
    "use strict";
    module2.exports = paragraph;
    function paragraph(node) {
      return this.all(node).join("");
    }
  }
});

// node_modules/remark-stringify/lib/visitors/blockquote.js
var require_blockquote2 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/blockquote.js"(exports, module2) {
    "use strict";
    module2.exports = blockquote;
    var lineFeed = "\n";
    var space2 = " ";
    var greaterThan = ">";
    function blockquote(node) {
      var values = this.block(node).split(lineFeed);
      var result = [];
      var length = values.length;
      var index = -1;
      var value;
      while (++index < length) {
        value = values[index];
        result[index] = (value ? space2 : "") + value;
      }
      return greaterThan + result.join(lineFeed + greaterThan);
    }
  }
});

// node_modules/remark-stringify/lib/visitors/list.js
var require_list2 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/list.js"(exports, module2) {
    "use strict";
    module2.exports = list;
    function list(node) {
      var fn = node.ordered ? this.visitOrderedItems : this.visitUnorderedItems;
      return fn.call(this, node);
    }
  }
});

// node_modules/remark-stringify/lib/util/pad.js
var require_pad = __commonJS({
  "node_modules/remark-stringify/lib/util/pad.js"(exports, module2) {
    "use strict";
    var repeat = require_repeat_string();
    module2.exports = pad;
    var lineFeed = "\n";
    var space2 = " ";
    var tabSize = 4;
    function pad(value, level) {
      var values = value.split(lineFeed);
      var index = values.length;
      var padding = repeat(space2, level * tabSize);
      while (index--) {
        if (values[index].length !== 0) {
          values[index] = padding + values[index];
        }
      }
      return values.join(lineFeed);
    }
  }
});

// node_modules/remark-stringify/lib/visitors/list-item.js
var require_list_item = __commonJS({
  "node_modules/remark-stringify/lib/visitors/list-item.js"(exports, module2) {
    "use strict";
    var repeat = require_repeat_string();
    var pad = require_pad();
    module2.exports = listItem;
    var lineFeed = "\n";
    var space2 = " ";
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    var lowercaseX = "x";
    var ceil = Math.ceil;
    var blank = lineFeed + lineFeed;
    var tabSize = 4;
    function listItem(node, parent, position, bullet) {
      var self = this;
      var style = self.options.listItemIndent;
      var marker = bullet || self.options.bullet;
      var spread = node.spread == null ? true : node.spread;
      var checked = node.checked;
      var children = node.children;
      var length = children.length;
      var values = [];
      var index = -1;
      var value;
      var indent;
      var spacing;
      while (++index < length) {
        values[index] = self.visit(children[index], node);
      }
      value = values.join(spread ? blank : lineFeed);
      if (typeof checked === "boolean") {
        value = leftSquareBracket + (checked ? lowercaseX : space2) + rightSquareBracket + space2 + value;
      }
      if (style === "1" || style === "mixed" && value.indexOf(lineFeed) === -1) {
        indent = marker.length + 1;
        spacing = space2;
      } else {
        indent = ceil((marker.length + 1) / tabSize) * tabSize;
        spacing = repeat(space2, indent - marker.length);
      }
      return value ? marker + spacing + pad(value, indent / tabSize).slice(indent) : marker;
    }
  }
});

// node_modules/longest-streak/index.js
var require_longest_streak = __commonJS({
  "node_modules/longest-streak/index.js"(exports, module2) {
    "use strict";
    module2.exports = longestStreak;
    function longestStreak(value, character) {
      var count = 0;
      var maximum = 0;
      var expected;
      var index;
      if (typeof character !== "string" || character.length !== 1) {
        throw new Error("Expected character");
      }
      value = String(value);
      index = value.indexOf(character);
      expected = index;
      while (index !== -1) {
        count++;
        if (index === expected) {
          if (count > maximum) {
            maximum = count;
          }
        } else {
          count = 1;
        }
        expected = index + 1;
        index = value.indexOf(character, expected);
      }
      return maximum;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/inline-code.js
var require_inline_code = __commonJS({
  "node_modules/remark-stringify/lib/visitors/inline-code.js"(exports, module2) {
    "use strict";
    var streak = require_longest_streak();
    var repeat = require_repeat_string();
    module2.exports = inlineCode;
    var graveAccentChar = "`";
    var lineFeed = 10;
    var space2 = 32;
    var graveAccent = 96;
    function inlineCode(node) {
      var value = node.value;
      var ticks = repeat(graveAccentChar, streak(value, graveAccentChar) + 1);
      var start = ticks;
      var end = ticks;
      var head = value.charCodeAt(0);
      var tail = value.charCodeAt(value.length - 1);
      var wrap = false;
      var index;
      var length;
      if (head === graveAccent || tail === graveAccent) {
        wrap = true;
      } else if (value.length > 2 && ws(head) && ws(tail)) {
        index = 1;
        length = value.length - 1;
        while (++index < length) {
          if (!ws(value.charCodeAt(index))) {
            wrap = true;
            break;
          }
        }
      }
      if (wrap) {
        start += " ";
        end = " " + end;
      }
      return start + value + end;
    }
    function ws(code) {
      return code === lineFeed || code === space2;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/code.js
var require_code = __commonJS({
  "node_modules/remark-stringify/lib/visitors/code.js"(exports, module2) {
    "use strict";
    var streak = require_longest_streak();
    var repeat = require_repeat_string();
    var pad = require_pad();
    module2.exports = code;
    var lineFeed = "\n";
    var space2 = " ";
    var tilde = "~";
    var graveAccent = "`";
    function code(node, parent) {
      var self = this;
      var value = node.value;
      var options = self.options;
      var marker = options.fence;
      var info = node.lang || "";
      var fence;
      if (info && node.meta) {
        info += space2 + node.meta;
      }
      info = self.encode(self.escape(info, node));
      if (!info && !options.fences && value && value.charAt(0) !== lineFeed && value.charAt(value.length - 1) !== lineFeed) {
        if (parent && parent.type === "listItem" && options.listItemIndent !== "tab" && options.pedantic) {
          self.file.fail(
            "Cannot indent code properly. See https://git.io/fxKR8",
            node.position
          );
        }
        return pad(value, 1);
      }
      if (marker === graveAccent && info.indexOf(graveAccent) !== -1) {
        marker = tilde;
      }
      fence = repeat(marker, Math.max(streak(value, marker) + 1, 3));
      return fence + info + lineFeed + value + lineFeed + fence;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/html.js
var require_html2 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/html.js"(exports, module2) {
    "use strict";
    module2.exports = html;
    function html(node) {
      return node.value;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/thematic-break.js
var require_thematic_break2 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/thematic-break.js"(exports, module2) {
    "use strict";
    var repeat = require_repeat_string();
    module2.exports = thematic;
    var space2 = " ";
    function thematic() {
      var options = this.options;
      var rule = repeat(options.rule, options.ruleRepetition);
      return options.ruleSpaces ? rule.split("").join(space2) : rule;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/strong.js
var require_strong3 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/strong.js"(exports, module2) {
    "use strict";
    var repeat = require_repeat_string();
    module2.exports = strong;
    function strong(node) {
      var marker = repeat(this.options.strong, 2);
      return marker + this.all(node).join("") + marker;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/emphasis.js
var require_emphasis3 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/emphasis.js"(exports, module2) {
    "use strict";
    module2.exports = emphasis;
    var underscore = "_";
    var asterisk = "*";
    function emphasis(node) {
      var marker = this.options.emphasis;
      var content = this.all(node).join("");
      if (this.options.pedantic && marker === underscore && content.indexOf(marker) !== -1) {
        marker = asterisk;
      }
      return marker + content + marker;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/break.js
var require_break3 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/break.js"(exports, module2) {
    "use strict";
    module2.exports = lineBreak;
    var backslash = "\\";
    var lineFeed = "\n";
    var space2 = " ";
    var commonmark = backslash + lineFeed;
    var normal = space2 + space2 + lineFeed;
    function lineBreak() {
      return this.options.commonmark ? commonmark : normal;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/delete.js
var require_delete3 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/delete.js"(exports, module2) {
    "use strict";
    module2.exports = strikethrough;
    var tilde = "~";
    var fence = tilde + tilde;
    function strikethrough(node) {
      return fence + this.all(node).join("") + fence;
    }
  }
});

// node_modules/ccount/index.js
var require_ccount = __commonJS({
  "node_modules/ccount/index.js"(exports, module2) {
    "use strict";
    module2.exports = ccount;
    function ccount(value, character) {
      var val = String(value);
      var count = 0;
      var index;
      if (typeof character !== "string" || character.length !== 1) {
        throw new Error("Expected character");
      }
      index = val.indexOf(character);
      while (index !== -1) {
        count++;
        index = val.indexOf(character, index + 1);
      }
      return count;
    }
  }
});

// node_modules/remark-stringify/lib/util/enclose-uri.js
var require_enclose_uri = __commonJS({
  "node_modules/remark-stringify/lib/util/enclose-uri.js"(exports, module2) {
    "use strict";
    var count = require_ccount();
    module2.exports = enclose;
    var leftParenthesis = "(";
    var rightParenthesis = ")";
    var lessThan = "<";
    var greaterThan = ">";
    var expression = /\s/;
    function enclose(uri, always) {
      if (always || uri.length === 0 || expression.test(uri) || count(uri, leftParenthesis) !== count(uri, rightParenthesis)) {
        return lessThan + uri + greaterThan;
      }
      return uri;
    }
  }
});

// node_modules/remark-stringify/lib/util/enclose-title.js
var require_enclose_title = __commonJS({
  "node_modules/remark-stringify/lib/util/enclose-title.js"(exports, module2) {
    "use strict";
    module2.exports = enclose;
    var quotationMark = '"';
    var apostrophe = "'";
    function enclose(title) {
      var delimiter = title.indexOf(quotationMark) === -1 ? quotationMark : apostrophe;
      return delimiter + title + delimiter;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/link.js
var require_link3 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/link.js"(exports, module2) {
    "use strict";
    var uri = require_enclose_uri();
    var title = require_enclose_title();
    module2.exports = link;
    var space2 = " ";
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    var leftParenthesis = "(";
    var rightParenthesis = ")";
    var protocol = /^[a-z][a-z+.-]+:\/?/i;
    function link(node) {
      var self = this;
      var content = self.encode(node.url || "", node);
      var exit = self.enterLink();
      var escaped = self.encode(self.escape(node.url || "", node));
      var value = self.all(node).join("");
      exit();
      if (node.title == null && protocol.test(content) && escaped === value) {
        return uri(self.encode(node.url), true);
      }
      content = uri(content);
      if (node.title) {
        content += space2 + title(self.encode(self.escape(node.title, node), node));
      }
      return leftSquareBracket + value + rightSquareBracket + leftParenthesis + content + rightParenthesis;
    }
  }
});

// node_modules/remark-stringify/lib/util/copy-identifier-encoding.js
var require_copy_identifier_encoding = __commonJS({
  "node_modules/remark-stringify/lib/util/copy-identifier-encoding.js"(exports, module2) {
    "use strict";
    var entityPrefixLength = require_entity_prefix_length();
    module2.exports = copy;
    var ampersand = "&";
    var punctuationExppresion = /[-!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~_]/;
    function copy(value, identifier) {
      var length = value.length;
      var count = identifier.length;
      var result = [];
      var position = 0;
      var index = 0;
      var start;
      while (index < length) {
        start = index;
        while (index < length && !punctuationExppresion.test(value.charAt(index))) {
          index += 1;
        }
        result.push(value.slice(start, index));
        while (position < count && !punctuationExppresion.test(identifier.charAt(position))) {
          position += 1;
        }
        start = position;
        while (position < count && punctuationExppresion.test(identifier.charAt(position))) {
          if (identifier.charAt(position) === ampersand) {
            position += entityPrefixLength(identifier.slice(position));
          }
          position += 1;
        }
        result.push(identifier.slice(start, position));
        while (index < length && punctuationExppresion.test(value.charAt(index))) {
          index += 1;
        }
      }
      return result.join("");
    }
  }
});

// node_modules/remark-stringify/lib/util/label.js
var require_label = __commonJS({
  "node_modules/remark-stringify/lib/util/label.js"(exports, module2) {
    "use strict";
    module2.exports = label;
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    var shortcut = "shortcut";
    var collapsed = "collapsed";
    function label(node) {
      var type = node.referenceType;
      if (type === shortcut) {
        return "";
      }
      return leftSquareBracket + (type === collapsed ? "" : node.label || node.identifier) + rightSquareBracket;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/link-reference.js
var require_link_reference = __commonJS({
  "node_modules/remark-stringify/lib/visitors/link-reference.js"(exports, module2) {
    "use strict";
    var copy = require_copy_identifier_encoding();
    var label = require_label();
    module2.exports = linkReference;
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    var shortcut = "shortcut";
    var collapsed = "collapsed";
    function linkReference(node) {
      var self = this;
      var type = node.referenceType;
      var exit = self.enterLinkReference(self, node);
      var value = self.all(node).join("");
      exit();
      if (type === shortcut || type === collapsed) {
        value = copy(value, node.label || node.identifier);
      }
      return leftSquareBracket + value + rightSquareBracket + label(node);
    }
  }
});

// node_modules/remark-stringify/lib/visitors/image-reference.js
var require_image_reference = __commonJS({
  "node_modules/remark-stringify/lib/visitors/image-reference.js"(exports, module2) {
    "use strict";
    var label = require_label();
    module2.exports = imageReference;
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    var exclamationMark = "!";
    function imageReference(node) {
      return exclamationMark + leftSquareBracket + (this.encode(node.alt, node) || "") + rightSquareBracket + label(node);
    }
  }
});

// node_modules/remark-stringify/lib/visitors/definition.js
var require_definition2 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/definition.js"(exports, module2) {
    "use strict";
    var uri = require_enclose_uri();
    var title = require_enclose_title();
    module2.exports = definition;
    var space2 = " ";
    var colon = ":";
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    function definition(node) {
      var content = uri(node.url);
      if (node.title) {
        content += space2 + title(node.title);
      }
      return leftSquareBracket + (node.label || node.identifier) + rightSquareBracket + colon + space2 + content;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/image.js
var require_image = __commonJS({
  "node_modules/remark-stringify/lib/visitors/image.js"(exports, module2) {
    "use strict";
    var uri = require_enclose_uri();
    var title = require_enclose_title();
    module2.exports = image;
    var space2 = " ";
    var leftParenthesis = "(";
    var rightParenthesis = ")";
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    var exclamationMark = "!";
    function image(node) {
      var self = this;
      var content = uri(self.encode(node.url || "", node));
      var exit = self.enterLink();
      var alt = self.encode(self.escape(node.alt || "", node));
      exit();
      if (node.title) {
        content += space2 + title(self.encode(node.title, node));
      }
      return exclamationMark + leftSquareBracket + alt + rightSquareBracket + leftParenthesis + content + rightParenthesis;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/footnote.js
var require_footnote = __commonJS({
  "node_modules/remark-stringify/lib/visitors/footnote.js"(exports, module2) {
    "use strict";
    module2.exports = footnote;
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    var caret = "^";
    function footnote(node) {
      return leftSquareBracket + caret + this.all(node).join("") + rightSquareBracket;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/footnote-reference.js
var require_footnote_reference = __commonJS({
  "node_modules/remark-stringify/lib/visitors/footnote-reference.js"(exports, module2) {
    "use strict";
    module2.exports = footnoteReference;
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    var caret = "^";
    function footnoteReference(node) {
      return leftSquareBracket + caret + (node.label || node.identifier) + rightSquareBracket;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/footnote-definition.js
var require_footnote_definition2 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/footnote-definition.js"(exports, module2) {
    "use strict";
    var repeat = require_repeat_string();
    var lineFeed = "\n";
    var space2 = " ";
    var colon = ":";
    var leftSquareBracket = "[";
    var rightSquareBracket = "]";
    var caret = "^";
    var tabSize = 4;
    var blank = lineFeed + lineFeed;
    var indent = repeat(space2, tabSize);
    module2.exports = footnoteDefinition;
    function footnoteDefinition(node) {
      var content = this.all(node).join(blank + indent);
      return leftSquareBracket + caret + (node.label || node.identifier) + rightSquareBracket + colon + space2 + content;
    }
  }
});

// node_modules/markdown-table/index.js
var require_markdown_table = __commonJS({
  "node_modules/markdown-table/index.js"(exports, module2) {
    "use strict";
    module2.exports = markdownTable;
    var dotRe = /\./;
    var lastDotRe = /\.[^.]*$/;
    var space2 = " ";
    var lineFeed = "\n";
    var dash = "-";
    var dot = ".";
    var colon = ":";
    var lowercaseC = "c";
    var lowercaseL = "l";
    var lowercaseR = "r";
    var verticalBar = "|";
    var minCellSize = 3;
    function markdownTable(table, options) {
      var settings = options || {};
      var delimiter = settings.delimiter;
      var start = settings.start;
      var end = settings.end;
      var alignment = settings.align;
      var calculateStringLength = settings.stringLength || lengthNoop;
      var cellCount = 0;
      var rowIndex = -1;
      var rowLength = table.length;
      var sizes = [];
      var align;
      var rule;
      var rows;
      var row;
      var cells;
      var index;
      var position;
      var size;
      var value;
      var spacing;
      var before;
      var after;
      alignment = alignment ? alignment.concat() : [];
      if (delimiter === null || delimiter === void 0) {
        delimiter = space2 + verticalBar + space2;
      }
      if (start === null || start === void 0) {
        start = verticalBar + space2;
      }
      if (end === null || end === void 0) {
        end = space2 + verticalBar;
      }
      while (++rowIndex < rowLength) {
        row = table[rowIndex];
        index = -1;
        if (row.length > cellCount) {
          cellCount = row.length;
        }
        while (++index < cellCount) {
          position = row[index] ? dotindex(row[index]) : null;
          if (!sizes[index]) {
            sizes[index] = minCellSize;
          }
          if (position > sizes[index]) {
            sizes[index] = position;
          }
        }
      }
      if (typeof alignment === "string") {
        alignment = pad(cellCount, alignment).split("");
      }
      index = -1;
      while (++index < cellCount) {
        align = alignment[index];
        if (typeof align === "string") {
          align = align.charAt(0).toLowerCase();
        }
        if (align !== lowercaseL && align !== lowercaseR && align !== lowercaseC && align !== dot) {
          align = "";
        }
        alignment[index] = align;
      }
      rowIndex = -1;
      rows = [];
      while (++rowIndex < rowLength) {
        row = table[rowIndex];
        index = -1;
        cells = [];
        while (++index < cellCount) {
          value = row[index];
          value = stringify(value);
          if (alignment[index] === dot) {
            position = dotindex(value);
            size = sizes[index] + (dotRe.test(value) ? 0 : 1) - (calculateStringLength(value) - position);
            cells[index] = value + pad(size - 1);
          } else {
            cells[index] = value;
          }
        }
        rows[rowIndex] = cells;
      }
      sizes = [];
      rowIndex = -1;
      while (++rowIndex < rowLength) {
        cells = rows[rowIndex];
        index = -1;
        while (++index < cellCount) {
          value = cells[index];
          if (!sizes[index]) {
            sizes[index] = minCellSize;
          }
          size = calculateStringLength(value);
          if (size > sizes[index]) {
            sizes[index] = size;
          }
        }
      }
      rowIndex = -1;
      while (++rowIndex < rowLength) {
        cells = rows[rowIndex];
        index = -1;
        if (settings.pad !== false) {
          while (++index < cellCount) {
            value = cells[index];
            position = sizes[index] - (calculateStringLength(value) || 0);
            spacing = pad(position);
            if (alignment[index] === lowercaseR || alignment[index] === dot) {
              value = spacing + value;
            } else if (alignment[index] === lowercaseC) {
              position /= 2;
              if (position % 1 === 0) {
                before = position;
                after = position;
              } else {
                before = position + 0.5;
                after = position - 0.5;
              }
              value = pad(before) + value + pad(after);
            } else {
              value += spacing;
            }
            cells[index] = value;
          }
        }
        rows[rowIndex] = cells.join(delimiter);
      }
      if (settings.rule !== false) {
        index = -1;
        rule = [];
        while (++index < cellCount) {
          if (settings.pad === false) {
            value = table[0][index];
            spacing = calculateStringLength(stringify(value));
            spacing = spacing > minCellSize ? spacing : minCellSize;
          } else {
            spacing = sizes[index];
          }
          align = alignment[index];
          value = align === lowercaseR || align === "" ? dash : colon;
          value += pad(spacing - 2, dash);
          value += align !== lowercaseL && align !== "" ? colon : dash;
          rule[index] = value;
        }
        rows.splice(1, 0, rule.join(delimiter));
      }
      return start + rows.join(end + lineFeed + start) + end;
    }
    function stringify(value) {
      return value === null || value === void 0 ? "" : String(value);
    }
    function lengthNoop(value) {
      return String(value).length;
    }
    function pad(length, character) {
      return new Array(length + 1).join(character || space2);
    }
    function dotindex(value) {
      var match = lastDotRe.exec(value);
      return match ? match.index + 1 : value.length;
    }
  }
});

// node_modules/remark-stringify/lib/visitors/table.js
var require_table2 = __commonJS({
  "node_modules/remark-stringify/lib/visitors/table.js"(exports, module2) {
    "use strict";
    var markdownTable = require_markdown_table();
    module2.exports = table;
    var space2 = " ";
    var verticalBar = "|";
    function table(node) {
      var self = this;
      var options = self.options;
      var loose = options.looseTable;
      var spaced = options.spacedTable;
      var pad = options.paddedTable;
      var stringLength = options.stringLength;
      var rows = node.children;
      var index = rows.length;
      var exit = self.enterTable();
      var result = [];
      var start;
      var end;
      while (index--) {
        result[index] = self.all(rows[index]);
      }
      exit();
      if (loose) {
        start = "";
        end = "";
      } else if (spaced) {
        start = verticalBar + space2;
        end = space2 + verticalBar;
      } else {
        start = verticalBar;
        end = verticalBar;
      }
      return markdownTable(result, {
        align: node.align,
        pad,
        start,
        end,
        stringLength,
        delimiter: spaced ? space2 + verticalBar + space2 : verticalBar
      });
    }
  }
});

// node_modules/remark-stringify/lib/visitors/table-cell.js
var require_table_cell = __commonJS({
  "node_modules/remark-stringify/lib/visitors/table-cell.js"(exports, module2) {
    "use strict";
    module2.exports = tableCell;
    var lineFeed = /\r?\n/g;
    function tableCell(node) {
      return this.all(node).join("").replace(lineFeed, " ");
    }
  }
});

// node_modules/remark-stringify/lib/compiler.js
var require_compiler = __commonJS({
  "node_modules/remark-stringify/lib/compiler.js"(exports, module2) {
    "use strict";
    var xtend = require_immutable();
    var toggle = require_state_toggle();
    module2.exports = Compiler;
    function Compiler(tree, file) {
      this.inLink = false;
      this.inTable = false;
      this.tree = tree;
      this.file = file;
      this.options = xtend(this.options);
      this.setOptions({});
    }
    var proto = Compiler.prototype;
    proto.enterLink = toggle("inLink", false);
    proto.enterTable = toggle("inTable", false);
    proto.enterLinkReference = require_enter_link_reference();
    proto.options = require_defaults2();
    proto.setOptions = require_set_options2();
    proto.compile = require_compile();
    proto.visit = require_one();
    proto.all = require_all();
    proto.block = require_block();
    proto.visitOrderedItems = require_ordered_items();
    proto.visitUnorderedItems = require_unordered_items();
    proto.visitors = {
      root: require_root(),
      text: require_text2(),
      heading: require_heading(),
      paragraph: require_paragraph2(),
      blockquote: require_blockquote2(),
      list: require_list2(),
      listItem: require_list_item(),
      inlineCode: require_inline_code(),
      code: require_code(),
      html: require_html2(),
      thematicBreak: require_thematic_break2(),
      strong: require_strong3(),
      emphasis: require_emphasis3(),
      break: require_break3(),
      delete: require_delete3(),
      link: require_link3(),
      linkReference: require_link_reference(),
      imageReference: require_image_reference(),
      definition: require_definition2(),
      image: require_image(),
      footnote: require_footnote(),
      footnoteReference: require_footnote_reference(),
      footnoteDefinition: require_footnote_definition2(),
      table: require_table2(),
      tableCell: require_table_cell()
    };
  }
});

// node_modules/remark-stringify/index.js
var require_remark_stringify = __commonJS({
  "node_modules/remark-stringify/index.js"(exports, module2) {
    "use strict";
    var unherit = require_unherit();
    var xtend = require_immutable();
    var Compiler = require_compiler();
    module2.exports = stringify;
    stringify.Compiler = Compiler;
    function stringify(options) {
      var Local = unherit(Compiler);
      Local.prototype.options = xtend(
        Local.prototype.options,
        this.data("settings"),
        options
      );
      this.Compiler = Local;
    }
  }
});

// node_modules/remark/index.js
var require_remark = __commonJS({
  "node_modules/remark/index.js"(exports, module2) {
    "use strict";
    var unified = require_unified();
    var parse = require_remark_parse();
    var stringify = require_remark_stringify();
    module2.exports = unified().use(parse).use(stringify).freeze();
  }
});

// node_modules/unist-builder/index.js
var require_unist_builder = __commonJS({
  "node_modules/unist-builder/index.js"(exports, module2) {
    "use strict";
    module2.exports = u;
    function u(type, props, value) {
      var node;
      if ((value === null || value === void 0) && (typeof props !== "object" || Array.isArray(props))) {
        value = props;
        props = {};
      }
      node = Object.assign({ type: String(type) }, props);
      if (Array.isArray(value)) {
        node.children = value;
      } else if (value !== null && value !== void 0) {
        node.value = String(value);
      }
      return node;
    }
  }
});

// node_modules/unist-util-is/convert.js
var require_convert3 = __commonJS({
  "node_modules/unist-util-is/convert.js"(exports, module2) {
    "use strict";
    module2.exports = convert;
    function convert(test) {
      if (typeof test === "string") {
        return typeFactory(test);
      }
      if (test === null || test === void 0) {
        return ok;
      }
      if (typeof test === "object") {
        return ("length" in test ? anyFactory : matchesFactory)(test);
      }
      if (typeof test === "function") {
        return test;
      }
      throw new Error("Expected function, string, or object as test");
    }
    function convertAll(tests) {
      var results = [];
      var length = tests.length;
      var index = -1;
      while (++index < length) {
        results[index] = convert(tests[index]);
      }
      return results;
    }
    function matchesFactory(test) {
      return matches;
      function matches(node) {
        var key;
        for (key in test) {
          if (node[key] !== test[key]) {
            return false;
          }
        }
        return true;
      }
    }
    function anyFactory(tests) {
      var checks = convertAll(tests);
      var length = checks.length;
      return matches;
      function matches() {
        var index = -1;
        while (++index < length) {
          if (checks[index].apply(this, arguments)) {
            return true;
          }
        }
        return false;
      }
    }
    function typeFactory(test) {
      return type;
      function type(node) {
        return Boolean(node && node.type === test);
      }
    }
    function ok() {
      return true;
    }
  }
});

// node_modules/unist-util-visit-parents/index.js
var require_unist_util_visit_parents3 = __commonJS({
  "node_modules/unist-util-visit-parents/index.js"(exports, module2) {
    "use strict";
    module2.exports = visitParents;
    var convert = require_convert3();
    var CONTINUE = true;
    var SKIP = "skip";
    var EXIT = false;
    visitParents.CONTINUE = CONTINUE;
    visitParents.SKIP = SKIP;
    visitParents.EXIT = EXIT;
    function visitParents(tree, test, visitor, reverse) {
      var is;
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      is = convert(test);
      one(tree, null, []);
      function one(node, index, parents) {
        var result = [];
        var subresult;
        if (!test || is(node, index, parents[parents.length - 1] || null)) {
          result = toResult(visitor(node, parents));
          if (result[0] === EXIT) {
            return result;
          }
        }
        if (node.children && result[0] !== SKIP) {
          subresult = toResult(all2(node.children, parents.concat(node)));
          return subresult[0] === EXIT ? subresult : result;
        }
        return result;
      }
      function all2(children, parents) {
        var min = -1;
        var step = reverse ? -1 : 1;
        var index = (reverse ? children.length : min) + step;
        var result;
        while (index > min && index < children.length) {
          result = one(children[index], index, parents);
          if (result[0] === EXIT) {
            return result;
          }
          index = typeof result[1] === "number" ? result[1] : index + step;
        }
      }
    }
    function toResult(value) {
      if (value !== null && typeof value === "object" && "length" in value) {
        return value;
      }
      if (typeof value === "number") {
        return [CONTINUE, value];
      }
      return [value];
    }
  }
});

// node_modules/unist-util-visit/index.js
var require_unist_util_visit3 = __commonJS({
  "node_modules/unist-util-visit/index.js"(exports, module2) {
    "use strict";
    module2.exports = visit;
    var visitParents = require_unist_util_visit_parents3();
    var CONTINUE = visitParents.CONTINUE;
    var SKIP = visitParents.SKIP;
    var EXIT = visitParents.EXIT;
    visit.CONTINUE = CONTINUE;
    visit.SKIP = SKIP;
    visit.EXIT = EXIT;
    function visit(tree, test, visitor, reverse) {
      if (typeof test === "function" && typeof visitor !== "function") {
        reverse = visitor;
        visitor = test;
        test = null;
      }
      visitParents(tree, test, overload, reverse);
      function overload(node, parents) {
        var parent = parents[parents.length - 1];
        var index = parent ? parent.children.indexOf(node) : null;
        return visitor(node, index, parent);
      }
    }
  }
});

// node_modules/unist-util-position/index.js
var require_unist_util_position = __commonJS({
  "node_modules/unist-util-position/index.js"(exports, module2) {
    "use strict";
    var start = factory("start");
    var end = factory("end");
    module2.exports = position;
    position.start = start;
    position.end = end;
    function position(node) {
      return { start: start(node), end: end(node) };
    }
    function factory(type) {
      point.displayName = type;
      return point;
      function point(node) {
        var point2 = node && node.position && node.position[type] || {};
        return {
          line: point2.line || null,
          column: point2.column || null,
          offset: isNaN(point2.offset) ? null : point2.offset
        };
      }
    }
  }
});

// node_modules/unist-util-generated/index.js
var require_unist_util_generated = __commonJS({
  "node_modules/unist-util-generated/index.js"(exports, module2) {
    "use strict";
    module2.exports = generated;
    function generated(node) {
      var position = optional(optional(node).position);
      var start = optional(position.start);
      var end = optional(position.end);
      return !start.line || !start.column || !end.line || !end.column;
    }
    function optional(value) {
      return value && typeof value === "object" ? value : {};
    }
  }
});

// node_modules/mdast-util-definitions/index.js
var require_mdast_util_definitions = __commonJS({
  "node_modules/mdast-util-definitions/index.js"(exports, module2) {
    "use strict";
    var visit = require_unist_util_visit3();
    module2.exports = getDefinitionFactory;
    var own = {}.hasOwnProperty;
    function getDefinitionFactory(node, options) {
      return getterFactory(gather(node, options));
    }
    function gather(node, options) {
      var cache = {};
      if (!node || !node.type) {
        throw new Error("mdast-util-definitions expected node");
      }
      visit(node, "definition", options && options.commonmark ? commonmark : normal);
      return cache;
      function commonmark(definition) {
        var id = normalise(definition.identifier);
        if (!own.call(cache, id)) {
          cache[id] = definition;
        }
      }
      function normal(definition) {
        cache[normalise(definition.identifier)] = definition;
      }
    }
    function getterFactory(cache) {
      return getter;
      function getter(identifier) {
        var id = identifier && normalise(identifier);
        return id && own.call(cache, id) ? cache[id] : null;
      }
    }
    function normalise(identifier) {
      return identifier.toUpperCase();
    }
  }
});

// node_modules/mdast-util-to-hast/lib/all.js
var require_all2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/all.js"(exports, module2) {
    "use strict";
    module2.exports = all2;
    var one = require_one2();
    function all2(h, parent) {
      var nodes = parent.children || [];
      var length = nodes.length;
      var values = [];
      var index = -1;
      var result;
      var head;
      while (++index < length) {
        result = one(h, nodes[index], parent);
        if (result) {
          if (index && nodes[index - 1].type === "break") {
            if (result.value) {
              result.value = result.value.replace(/^\s+/, "");
            }
            head = result.children && result.children[0];
            if (head && head.value) {
              head.value = head.value.replace(/^\s+/, "");
            }
          }
          values = values.concat(result);
        }
      }
      return values;
    }
  }
});

// node_modules/mdast-util-to-hast/lib/one.js
var require_one2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/one.js"(exports, module2) {
    "use strict";
    module2.exports = one;
    var u = require_unist_builder();
    var all2 = require_all2();
    var own = {}.hasOwnProperty;
    function unknown(h, node) {
      if (text(node)) {
        return h.augment(node, u("text", node.value));
      }
      return h(node, "div", all2(h, node));
    }
    function one(h, node, parent) {
      var type = node && node.type;
      var fn = own.call(h.handlers, type) ? h.handlers[type] : h.unknownHandler;
      if (!type) {
        throw new Error("Expected node, got `" + node + "`");
      }
      return (typeof fn === "function" ? fn : unknown)(h, node, parent);
    }
    function text(node) {
      var data = node.data || {};
      if (own.call(data, "hName") || own.call(data, "hProperties") || own.call(data, "hChildren")) {
        return false;
      }
      return "value" in node;
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
var require_thematic_break3 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js"(exports, module2) {
    "use strict";
    module2.exports = thematicBreak;
    function thematicBreak(h, node) {
      return h(node, "hr");
    }
  }
});

// node_modules/mdast-util-to-hast/lib/wrap.js
var require_wrap2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/wrap.js"(exports, module2) {
    "use strict";
    module2.exports = wrap;
    var u = require_unist_builder();
    function wrap(nodes, loose) {
      var result = [];
      var index = -1;
      var length = nodes.length;
      if (loose) {
        result.push(u("text", "\n"));
      }
      while (++index < length) {
        if (index) {
          result.push(u("text", "\n"));
        }
        result.push(nodes[index]);
      }
      if (loose && nodes.length !== 0) {
        result.push(u("text", "\n"));
      }
      return result;
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/list.js
var require_list3 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/list.js"(exports, module2) {
    "use strict";
    module2.exports = list;
    var wrap = require_wrap2();
    var all2 = require_all2();
    function list(h, node) {
      var props = {};
      var name = node.ordered ? "ol" : "ul";
      var items;
      var index = -1;
      var length;
      if (typeof node.start === "number" && node.start !== 1) {
        props.start = node.start;
      }
      items = all2(h, node);
      length = items.length;
      while (++index < length) {
        if (items[index].properties.className && items[index].properties.className.indexOf("task-list-item") !== -1) {
          props.className = ["contains-task-list"];
          break;
        }
      }
      return h(node, name, props, wrap(items, true));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/footer.js
var require_footer = __commonJS({
  "node_modules/mdast-util-to-hast/lib/footer.js"(exports, module2) {
    "use strict";
    module2.exports = generateFootnotes;
    var thematicBreak = require_thematic_break3();
    var list = require_list3();
    var wrap = require_wrap2();
    function generateFootnotes(h) {
      var footnoteById = h.footnoteById;
      var footnoteOrder = h.footnoteOrder;
      var length = footnoteOrder.length;
      var index = -1;
      var listItems = [];
      var def;
      var backReference;
      var content;
      var tail;
      while (++index < length) {
        def = footnoteById[footnoteOrder[index].toUpperCase()];
        if (!def) {
          continue;
        }
        content = def.children.concat();
        tail = content[content.length - 1];
        backReference = {
          type: "link",
          url: "#fnref-" + def.identifier,
          data: { hProperties: { className: ["footnote-backref"] } },
          children: [{ type: "text", value: "\u21A9" }]
        };
        if (!tail || tail.type !== "paragraph") {
          tail = { type: "paragraph", children: [] };
          content.push(tail);
        }
        tail.children.push(backReference);
        listItems.push({
          type: "listItem",
          data: { hProperties: { id: "fn-" + def.identifier } },
          children: content,
          position: def.position
        });
      }
      if (listItems.length === 0) {
        return null;
      }
      return h(
        null,
        "div",
        { className: ["footnotes"] },
        wrap(
          [
            thematicBreak(h),
            list(h, { type: "list", ordered: true, children: listItems })
          ],
          true
        )
      );
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
var require_blockquote3 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/blockquote.js"(exports, module2) {
    "use strict";
    module2.exports = blockquote;
    var wrap = require_wrap2();
    var all2 = require_all2();
    function blockquote(h, node) {
      return h(node, "blockquote", wrap(all2(h, node), true));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/break.js
var require_break4 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/break.js"(exports, module2) {
    "use strict";
    module2.exports = hardBreak;
    var u = require_unist_builder();
    function hardBreak(h, node) {
      return [h(node, "br"), u("text", "\n")];
    }
  }
});

// node_modules/detab/index.js
var require_detab = __commonJS({
  "node_modules/detab/index.js"(exports, module2) {
    "use strict";
    module2.exports = detab;
    var repeat = require_repeat_string();
    var tab = 9;
    var lineFeed = 10;
    var carriageReturn = 13;
    function detab(value, size) {
      var string = typeof value === "string";
      var length = string && value.length;
      var start = 0;
      var index = -1;
      var column = -1;
      var tabSize = size || 4;
      var results = [];
      var code;
      var add;
      if (!string) {
        throw new Error("detab expected string");
      }
      while (++index < length) {
        code = value.charCodeAt(index);
        if (code === tab) {
          add = tabSize - (column + 1) % tabSize;
          column += add;
          results.push(value.slice(start, index) + repeat(" ", add));
          start = index + 1;
        } else if (code === lineFeed || code === carriageReturn) {
          column = -1;
        } else {
          column++;
        }
      }
      results.push(value.slice(start));
      return results.join("");
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/code.js
var require_code2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/code.js"(exports, module2) {
    "use strict";
    module2.exports = code;
    var detab = require_detab();
    var u = require_unist_builder();
    function code(h, node) {
      var value = node.value ? detab(node.value + "\n") : "";
      var lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
      var props = {};
      if (lang) {
        props.className = ["language-" + lang];
      }
      return h(node.position, "pre", [h(node, "code", props, [u("text", value)])]);
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/delete.js
var require_delete4 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/delete.js"(exports, module2) {
    "use strict";
    module2.exports = strikethrough;
    var all2 = require_all2();
    function strikethrough(h, node) {
      return h(node, "del", all2(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
var require_emphasis4 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/emphasis.js"(exports, module2) {
    "use strict";
    module2.exports = emphasis;
    var all2 = require_all2();
    function emphasis(h, node) {
      return h(node, "em", all2(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
var require_footnote_reference2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js"(exports, module2) {
    "use strict";
    module2.exports = footnoteReference;
    var u = require_unist_builder();
    function footnoteReference(h, node) {
      var footnoteOrder = h.footnoteOrder;
      var identifier = String(node.identifier);
      if (footnoteOrder.indexOf(identifier) === -1) {
        footnoteOrder.push(identifier);
      }
      return h(node.position, "sup", { id: "fnref-" + identifier }, [
        h(node, "a", { href: "#fn-" + identifier, className: ["footnote-ref"] }, [
          u("text", node.label || identifier)
        ])
      ]);
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/footnote.js
var require_footnote2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/footnote.js"(exports, module2) {
    "use strict";
    module2.exports = footnote;
    var footnoteReference = require_footnote_reference2();
    function footnote(h, node) {
      var footnoteById = h.footnoteById;
      var footnoteOrder = h.footnoteOrder;
      var identifier = 1;
      while (identifier in footnoteById) {
        identifier++;
      }
      identifier = String(identifier);
      footnoteOrder.push(identifier);
      footnoteById[identifier] = {
        type: "footnoteDefinition",
        identifier,
        children: [{ type: "paragraph", children: node.children }],
        position: node.position
      };
      return footnoteReference(h, {
        type: "footnoteReference",
        identifier,
        position: node.position
      });
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/heading.js
var require_heading2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/heading.js"(exports, module2) {
    "use strict";
    module2.exports = heading;
    var all2 = require_all2();
    function heading(h, node) {
      return h(node, "h" + node.depth, all2(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/html.js
var require_html3 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/html.js"(exports, module2) {
    "use strict";
    module2.exports = html;
    var u = require_unist_builder();
    function html(h, node) {
      return h.dangerous ? h.augment(node, u("raw", node.value)) : null;
    }
  }
});

// node_modules/mdurl/encode.js
var require_encode = __commonJS({
  "node_modules/mdurl/encode.js"(exports, module2) {
    "use strict";
    var encodeCache = {};
    function getEncodeCache(exclude) {
      var i, ch, cache = encodeCache[exclude];
      if (cache) {
        return cache;
      }
      cache = encodeCache[exclude] = [];
      for (i = 0; i < 128; i++) {
        ch = String.fromCharCode(i);
        if (/^[0-9a-z]$/i.test(ch)) {
          cache.push(ch);
        } else {
          cache.push("%" + ("0" + i.toString(16).toUpperCase()).slice(-2));
        }
      }
      for (i = 0; i < exclude.length; i++) {
        cache[exclude.charCodeAt(i)] = exclude[i];
      }
      return cache;
    }
    function encode(string, exclude, keepEscaped) {
      var i, l, code, nextCode, cache, result = "";
      if (typeof exclude !== "string") {
        keepEscaped = exclude;
        exclude = encode.defaultChars;
      }
      if (typeof keepEscaped === "undefined") {
        keepEscaped = true;
      }
      cache = getEncodeCache(exclude);
      for (i = 0, l = string.length; i < l; i++) {
        code = string.charCodeAt(i);
        if (keepEscaped && code === 37 && i + 2 < l) {
          if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
            result += string.slice(i, i + 3);
            i += 2;
            continue;
          }
        }
        if (code < 128) {
          result += cache[code];
          continue;
        }
        if (code >= 55296 && code <= 57343) {
          if (code >= 55296 && code <= 56319 && i + 1 < l) {
            nextCode = string.charCodeAt(i + 1);
            if (nextCode >= 56320 && nextCode <= 57343) {
              result += encodeURIComponent(string[i] + string[i + 1]);
              i++;
              continue;
            }
          }
          result += "%EF%BF%BD";
          continue;
        }
        result += encodeURIComponent(string[i]);
      }
      return result;
    }
    encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
    encode.componentChars = "-_.!~*'()";
    module2.exports = encode;
  }
});

// node_modules/mdast-util-to-hast/lib/revert.js
var require_revert = __commonJS({
  "node_modules/mdast-util-to-hast/lib/revert.js"(exports, module2) {
    "use strict";
    module2.exports = revert;
    var u = require_unist_builder();
    var all2 = require_all2();
    function revert(h, node) {
      var subtype = node.referenceType;
      var suffix = "]";
      var contents;
      var head;
      var tail;
      if (subtype === "collapsed") {
        suffix += "[]";
      } else if (subtype === "full") {
        suffix += "[" + (node.label || node.identifier) + "]";
      }
      if (node.type === "imageReference") {
        return u("text", "![" + node.alt + suffix);
      }
      contents = all2(h, node);
      head = contents[0];
      if (head && head.type === "text") {
        head.value = "[" + head.value;
      } else {
        contents.unshift(u("text", "["));
      }
      tail = contents[contents.length - 1];
      if (tail && tail.type === "text") {
        tail.value += suffix;
      } else {
        contents.push(u("text", suffix));
      }
      return contents;
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
var require_image_reference2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/image-reference.js"(exports, module2) {
    "use strict";
    module2.exports = imageReference;
    var normalize = require_encode();
    var revert = require_revert();
    function imageReference(h, node) {
      var def = h.definition(node.identifier);
      var props;
      if (!def) {
        return revert(h, node);
      }
      props = { src: normalize(def.url || ""), alt: node.alt };
      if (def.title !== null && def.title !== void 0) {
        props.title = def.title;
      }
      return h(node, "img", props);
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/image.js
var require_image2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/image.js"(exports, module2) {
    "use strict";
    var normalize = require_encode();
    module2.exports = image;
    function image(h, node) {
      var props = { src: normalize(node.url), alt: node.alt };
      if (node.title !== null && node.title !== void 0) {
        props.title = node.title;
      }
      return h(node, "img", props);
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
var require_inline_code2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/inline-code.js"(exports, module2) {
    "use strict";
    module2.exports = inlineCode;
    var collapse = require_collapse_white_space();
    var u = require_unist_builder();
    function inlineCode(h, node) {
      return h(node, "code", [u("text", collapse(node.value))]);
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
var require_link_reference2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/link-reference.js"(exports, module2) {
    "use strict";
    module2.exports = linkReference;
    var normalize = require_encode();
    var revert = require_revert();
    var all2 = require_all2();
    function linkReference(h, node) {
      var def = h.definition(node.identifier);
      var props;
      if (!def) {
        return revert(h, node);
      }
      props = { href: normalize(def.url || "") };
      if (def.title !== null && def.title !== void 0) {
        props.title = def.title;
      }
      return h(node, "a", props, all2(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/link.js
var require_link4 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/link.js"(exports, module2) {
    "use strict";
    var normalize = require_encode();
    var all2 = require_all2();
    module2.exports = link;
    function link(h, node) {
      var props = { href: normalize(node.url) };
      if (node.title !== null && node.title !== void 0) {
        props.title = node.title;
      }
      return h(node, "a", props, all2(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/list-item.js
var require_list_item2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/list-item.js"(exports, module2) {
    "use strict";
    module2.exports = listItem;
    var u = require_unist_builder();
    var wrap = require_wrap2();
    var all2 = require_all2();
    function listItem(h, node, parent) {
      var children = node.children;
      var head = children[0];
      var raw = all2(h, node);
      var loose = parent ? listLoose(parent) : listItemLoose(node);
      var props = {};
      var result;
      var container;
      var index;
      var length;
      var child;
      if (loose) {
        result = raw;
      } else {
        result = [];
        length = raw.length;
        index = -1;
        while (++index < length) {
          child = raw[index];
          if (child.tagName === "p") {
            result = result.concat(child.children);
          } else {
            result.push(child);
          }
        }
      }
      if (typeof node.checked === "boolean") {
        if (loose && (!head || head.type !== "paragraph")) {
          result.unshift(h(null, "p", []));
        }
        container = loose ? result[0].children : result;
        if (container.length !== 0) {
          container.unshift(u("text", " "));
        }
        container.unshift(
          h(null, "input", {
            type: "checkbox",
            checked: node.checked,
            disabled: true
          })
        );
        props.className = ["task-list-item"];
      }
      if (loose && result.length !== 0) {
        result = wrap(result, true);
      }
      return h(node, "li", props, result);
    }
    function listLoose(node) {
      var loose = node.spread;
      var children = node.children;
      var length = children.length;
      var index = -1;
      while (!loose && ++index < length) {
        loose = listItemLoose(children[index]);
      }
      return loose;
    }
    function listItemLoose(node) {
      var spread = node.spread;
      return spread === void 0 || spread === null ? node.children.length > 1 : spread;
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
var require_paragraph3 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/paragraph.js"(exports, module2) {
    "use strict";
    module2.exports = paragraph;
    var all2 = require_all2();
    function paragraph(h, node) {
      return h(node, "p", all2(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/root.js
var require_root2 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/root.js"(exports, module2) {
    "use strict";
    module2.exports = root;
    var u = require_unist_builder();
    var wrap = require_wrap2();
    var all2 = require_all2();
    function root(h, node) {
      return h.augment(node, u("root", wrap(all2(h, node))));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/strong.js
var require_strong4 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/strong.js"(exports, module2) {
    "use strict";
    module2.exports = strong;
    var all2 = require_all2();
    function strong(h, node) {
      return h(node, "strong", all2(h, node));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/table.js
var require_table3 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/table.js"(exports, module2) {
    "use strict";
    module2.exports = table;
    var position = require_unist_util_position();
    var wrap = require_wrap2();
    var all2 = require_all2();
    function table(h, node) {
      var rows = node.children;
      var index = rows.length;
      var align = node.align;
      var alignLength = align.length;
      var result = [];
      var pos;
      var row;
      var out;
      var name;
      var cell;
      while (index--) {
        row = rows[index].children;
        name = index === 0 ? "th" : "td";
        pos = alignLength;
        out = [];
        while (pos--) {
          cell = row[pos];
          out[pos] = h(cell, name, { align: align[pos] }, cell ? all2(h, cell) : []);
        }
        result[index] = h(rows[index], "tr", wrap(out, true));
      }
      return h(
        node,
        "table",
        wrap(
          [
            h(result[0].position, "thead", wrap([result[0]], true)),
            h(
              {
                start: position.start(result[1]),
                end: position.end(result[result.length - 1])
              },
              "tbody",
              wrap(result.slice(1), true)
            )
          ],
          true
        )
      );
    }
  }
});

// node_modules/trim-lines/index.js
var require_trim_lines = __commonJS({
  "node_modules/trim-lines/index.js"(exports, module2) {
    "use strict";
    module2.exports = trimLines;
    var ws = /[ \t]*\n+[ \t]*/g;
    var newline = "\n";
    function trimLines(value) {
      return String(value).replace(ws, newline);
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/text.js
var require_text3 = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/text.js"(exports, module2) {
    "use strict";
    module2.exports = text;
    var u = require_unist_builder();
    var trimLines = require_trim_lines();
    function text(h, node) {
      return h.augment(node, u("text", trimLines(node.value)));
    }
  }
});

// node_modules/mdast-util-to-hast/lib/handlers/index.js
var require_handlers = __commonJS({
  "node_modules/mdast-util-to-hast/lib/handlers/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      blockquote: require_blockquote3(),
      break: require_break4(),
      code: require_code2(),
      delete: require_delete4(),
      emphasis: require_emphasis4(),
      footnoteReference: require_footnote_reference2(),
      footnote: require_footnote2(),
      heading: require_heading2(),
      html: require_html3(),
      imageReference: require_image_reference2(),
      image: require_image2(),
      inlineCode: require_inline_code2(),
      linkReference: require_link_reference2(),
      link: require_link4(),
      listItem: require_list_item2(),
      list: require_list3(),
      paragraph: require_paragraph3(),
      root: require_root2(),
      strong: require_strong4(),
      table: require_table3(),
      text: require_text3(),
      thematicBreak: require_thematic_break3(),
      toml: ignore,
      yaml: ignore,
      definition: ignore,
      footnoteDefinition: ignore
    };
    function ignore() {
      return null;
    }
  }
});

// node_modules/mdast-util-to-hast/lib/index.js
var require_lib = __commonJS({
  "node_modules/mdast-util-to-hast/lib/index.js"(exports, module2) {
    "use strict";
    module2.exports = toHast;
    var u = require_unist_builder();
    var visit = require_unist_util_visit3();
    var position = require_unist_util_position();
    var generated = require_unist_util_generated();
    var definitions = require_mdast_util_definitions();
    var one = require_one2();
    var footer = require_footer();
    var handlers = require_handlers();
    var own = {}.hasOwnProperty;
    var deprecationWarningIssued = false;
    function factory(tree, options) {
      var settings = options || {};
      if (settings.allowDangerousHTML !== void 0 && !deprecationWarningIssued) {
        deprecationWarningIssued = true;
        console.warn(
          "mdast-util-to-hast: deprecation: `allowDangerousHTML` is nonstandard, use `allowDangerousHtml` instead"
        );
      }
      var dangerous = settings.allowDangerousHtml || settings.allowDangerousHTML;
      var footnoteById = {};
      h.dangerous = dangerous;
      h.definition = definitions(tree, settings);
      h.footnoteById = footnoteById;
      h.footnoteOrder = [];
      h.augment = augment;
      h.handlers = Object.assign({}, handlers, settings.handlers);
      h.unknownHandler = settings.unknownHandler;
      visit(tree, "footnoteDefinition", onfootnotedefinition);
      return h;
      function augment(left, right) {
        var data;
        var ctx;
        if (left && "data" in left) {
          data = left.data;
          if (right.type === "element" && data.hName) {
            right.tagName = data.hName;
          }
          if (right.type === "element" && data.hProperties) {
            right.properties = Object.assign({}, right.properties, data.hProperties);
          }
          if (right.children && data.hChildren) {
            right.children = data.hChildren;
          }
        }
        ctx = left && left.position ? left : { position: left };
        if (!generated(ctx)) {
          right.position = {
            start: position.start(ctx),
            end: position.end(ctx)
          };
        }
        return right;
      }
      function h(node, tagName, props, children) {
        if ((children === void 0 || children === null) && typeof props === "object" && "length" in props) {
          children = props;
          props = {};
        }
        return augment(node, {
          type: "element",
          tagName,
          properties: props || {},
          children: children || []
        });
      }
      function onfootnotedefinition(definition) {
        var id = String(definition.identifier).toUpperCase();
        if (!own.call(footnoteById, id)) {
          footnoteById[id] = definition;
        }
      }
    }
    function toHast(tree, options) {
      var h = factory(tree, options);
      var node = one(h, tree);
      var foot = footer(h);
      if (foot) {
        node.children = node.children.concat(u("text", "\n"), foot);
      }
      return node;
    }
  }
});

// node_modules/mdast-util-to-hast/index.js
var require_mdast_util_to_hast = __commonJS({
  "node_modules/mdast-util-to-hast/index.js"(exports, module2) {
    "use strict";
    module2.exports = require_lib();
  }
});

// node_modules/remark-rehype/index.js
var require_remark_rehype = __commonJS({
  "node_modules/remark-rehype/index.js"(exports, module2) {
    "use strict";
    var mdast2hast = require_mdast_util_to_hast();
    module2.exports = remark2rehype;
    function remark2rehype(destination, options) {
      if (destination && !destination.process) {
        options = destination;
        destination = null;
      }
      return destination ? bridge(destination, options) : mutate(options);
    }
    function bridge(destination, options) {
      return transformer;
      function transformer(node, file, next) {
        destination.run(mdast2hast(node, options), file, done);
        function done(err) {
          next(err);
        }
      }
    }
    function mutate(options) {
      return transformer;
      function transformer(node) {
        return mdast2hast(node, options);
      }
    }
  }
});

// node_modules/@pi-base/core/lib/Parser.js
var require_Parser = __commonJS({
  "node_modules/@pi-base/core/lib/Parser.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var remark_1 = __importDefault(require_remark());
    var remark_rehype_1 = __importDefault(require_remark_rehype());
    var unist_util_visit_1 = __importDefault(require_unist_util_visit3());
    var delimitedParser = function(type, start, stop) {
      function parser(eat, value, silent) {
        var _a;
        if (!value.startsWith(start)) {
          return;
        }
        var stopPosition = value.indexOf(stop, start.length);
        if (stopPosition === -1) {
          return;
        }
        if (silent) {
          return true;
        }
        var tag = value.slice(0, stopPosition + stop.length);
        var inner = tag.slice(start.length, stopPosition);
        return eat(tag)((_a = { type }, _a[type] = inner, _a));
      }
      parser.locator = function(value, from) {
        return value.indexOf(start, from);
      };
      return parser;
    };
    function pibase() {
      var parser = this.Parser.prototype;
      parser.inlineTokenizers.citation = delimitedParser("citation", "{{", "}}");
      parser.inlineTokenizers.inlineMathDollars = delimitedParser("inlineMath", "$", "$");
      parser.inlineTokenizers.inlineMathParens = delimitedParser("inlineMath", "\\(", "\\)");
      parser.inlineMethods.splice(parser.inlineMethods.indexOf("escape"), 0, "citation", "inlineMathDollars", "inlineMathParens");
      var transformer = function(tree) {
        unist_util_visit_1.default(tree, "citation", function(node) {
          node.data = {
            hName: "citation",
            hProperties: {
              citation: node.citation
            }
          };
        });
        unist_util_visit_1.default(tree, "inlineMath", function(node) {
          node.data = {
            hName: "inlineMath",
            hProperties: {
              inline: true,
              formula: node.inlineMath
            }
          };
        });
      };
      return transformer;
    }
    exports.default = function() {
      return remark_1.default().use(pibase).use(remark_rehype_1.default);
    };
  }
});

// node_modules/@pi-base/core/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/@pi-base/core/lib/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formula = exports.bundle = void 0;
    var Bundle_1 = require_Bundle();
    Object.defineProperty(exports, "check", { enumerable: true, get: function() {
      return Bundle_1.check;
    } });
    Object.defineProperty(exports, "defaultHost", { enumerable: true, get: function() {
      return Bundle_1.defaultHost;
    } });
    var Id_1 = require_Id();
    Object.defineProperty(exports, "traitId", { enumerable: true, get: function() {
      return Id_1.traitId;
    } });
    var ImplicationIndex_1 = require_ImplicationIndex();
    Object.defineProperty(exports, "ImplicationIndex", { enumerable: true, get: function() {
      return ImplicationIndex_1.default;
    } });
    var Parser_1 = require_Parser();
    Object.defineProperty(exports, "Parser", { enumerable: true, get: function() {
      return Parser_1.default;
    } });
    var Prover_1 = require_Prover();
    Object.defineProperty(exports, "Prover", { enumerable: true, get: function() {
      return Prover_1.default;
    } });
    Object.defineProperty(exports, "disprove", { enumerable: true, get: function() {
      return Prover_1.disprove;
    } });
    var bundle_ = __importStar(require_Bundle());
    var formula_ = __importStar(require_Formula());
    exports.bundle = bundle_;
    exports.formula = formula_;
  }
});

// src/main.ts
var core = __toESM(require_core());
var fs2 = __toESM(require("fs"));
var process2 = __toESM(require("process"));
var B2 = __toESM(require_Bundle());

// src/load.ts
var B = __toESM(require_Bundle());

// src/fs.ts
var import_fs = __toESM(require("fs"));
var import_util = __toESM(require("util"));
var import_glob = __toESM(require_glob());
var glob = import_util.default.promisify(import_glob.default);
async function readFile(path) {
  const buffer = await import_util.default.promisify(import_fs.default.readFile)(path);
  return buffer.toString();
}
async function readFiles(pattern) {
  const items = await glob(pattern);
  return Promise.all(items.map(async function read(path) {
    const contents = await readFile(path);
    return { path, contents: contents.toString() };
  }));
}

// src/validations.ts
var yaml = __toESM(require_yamlFront());
var import_core = __toESM(require_lib2());
var Formula = __toESM(require_Formula());
function loadFront(raw) {
  return yaml.safeLoadFront(raw);
}
function all(validator, inputs) {
  const out = { value: [], errors: [] };
  inputs.forEach((input) => {
    const { value, errors } = validator(input);
    if (value && out.value) {
      out.value.push(value);
    } else {
      out.value = void 0;
    }
    out.errors = out.errors.concat(...errors);
  });
  return out;
}
function validate(path, handler) {
  const result = { errors: [] };
  const error3 = (message, key = path) => {
    result.errors.push({ path: key, message });
  };
  result.value = handler(error3);
  return result;
}
function duplicated(values) {
  const seen = /* @__PURE__ */ new Set();
  const dupes = /* @__PURE__ */ new Set();
  values.forEach((value) => {
    if (seen.has(value)) {
      dupes.add(value);
    }
    seen.add(value);
  });
  return Array.from(dupes);
}
function noExtras(rest, error3) {
  if (Object.keys(rest).length > 0) {
    error3(`unexpected extra fields: ${Object.keys(rest)}`);
  }
}
function required(value, key, error3) {
  if (!value[key] && value[key] !== false) {
    error3(`${String(key)} is required`);
  }
}
var paths = {
  property(p) {
    return `properties/${p}.md`;
  },
  space(s) {
    return `spaces/${s}/README.md`;
  },
  theorem(t) {
    return `theorems/${t}.md`;
  },
  trait({ space: space2, property: property2 }) {
    return `spaces/${space2}/properties/${property2}.md`;
  }
};
function property(input) {
  return validate(input.path, (error3) => {
    const {
      counterexamples_id,
      uid = "",
      name = "",
      aliases = [],
      refs = [],
      slug,
      mathlib,
      __content: description = "",
      ...rest
    } = loadFront(input.contents);
    const property2 = {
      counterexamples_id,
      uid: String(uid).trim(),
      name: String(name).trim(),
      aliases,
      refs,
      mathlib,
      description: String(description).trim()
    };
    if (!input.path.endsWith(paths.property(uid))) {
      error3(`path does not match uid=${uid}`);
    }
    required(property2, "uid", error3);
    required(property2, "name", error3);
    required(property2, "description", error3);
    noExtras(rest, error3);
    return property2;
  });
}
function space(input) {
  return validate(input.path, (error3) => {
    const {
      counterexamples_id,
      uid = "",
      name = "",
      aliases = [],
      refs = [],
      ambiguous_construction,
      slug,
      mathlib,
      __content: description = "",
      ...rest
    } = loadFront(input.contents);
    const space2 = {
      uid: String(uid).trim(),
      counterexamples_id,
      name: String(name).trim(),
      description: String(description).trim(),
      aliases,
      refs,
      ambiguous_construction,
      mathlib
    };
    if (!input.path.endsWith(paths.space(uid))) {
      error3(`path does not match uid=${uid}`);
    }
    required(space2, "uid", error3);
    required(space2, "name", error3);
    required(space2, "description", error3);
    noExtras(rest, error3);
    return space2;
  });
}
function theorem(input) {
  return validate(input.path, (error3) => {
    const {
      counterexamples_id,
      uid = "",
      if: when,
      then,
      refs = [],
      converse,
      __content: description = "",
      ...rest
    } = loadFront(input.contents);
    const theorem2 = {
      counterexamples_id,
      uid: String(uid).trim(),
      when: when && Formula.fromJSON(when),
      then: then && Formula.fromJSON(then),
      description: String(description).trim(),
      refs,
      converse
    };
    if (!input.path.endsWith(paths.theorem(uid))) {
      error3(`path does not match uid=${uid}`);
    }
    required(theorem2, "uid", error3);
    required(theorem2, "when", error3);
    required(theorem2, "then", error3);
    required(theorem2, "description", error3);
    noExtras(rest, error3);
    return theorem2;
  });
}
function trait(input) {
  return validate(input.path, (error3) => {
    const {
      uid = "",
      counterexamples_id,
      space: space2 = "",
      property: property2 = "",
      value,
      refs = [],
      __content: description = "",
      ...rest
    } = loadFront(input.contents);
    const trait2 = {
      uid: String(uid).trim(),
      space: String(space2).trim(),
      property: String(property2).trim(),
      value: Boolean(value),
      counterexamples_id,
      refs,
      description
    };
    if (!input.path.endsWith(paths.trait({ space: space2, property: property2 }))) {
      error3(`path does not match space=${space2} and property=${property2}`);
    }
    required(trait2, "space", error3);
    required(trait2, "property", error3);
    required(trait2, "value", error3);
    required(trait2, "description", error3);
    noExtras(rest, error3);
    return trait2;
  });
}
function bundle(bundle2) {
  return validate("", (error3) => {
    const duplicatePropertyNames = duplicated(
      Array.from(bundle2.properties.values()).map((s) => s.name)
    );
    if (duplicatePropertyNames.length > 0) {
      error3(`Duplicate property names: ${duplicatePropertyNames}`);
    }
    const duplicateSpaceNames = duplicated(
      Array.from(bundle2.spaces.values()).map((s) => s.name)
    );
    if (duplicateSpaceNames.length > 0) {
      error3(`Duplicate space names: ${duplicateSpaceNames}`);
    }
    bundle2.traits.forEach((trait2) => {
      const errorKey = paths.trait(trait2);
      if (!bundle2.properties.has(trait2.property)) {
        error3(`unknown property=${trait2.property}`, errorKey);
      }
      if (!bundle2.spaces.has(trait2.space)) {
        error3(`unknown space=${trait2.space}`, errorKey);
      }
    });
    bundle2.theorems.forEach((theorem2) => {
      const key = paths.theorem(theorem2.uid);
      Formula.properties(theorem2.when).forEach((id) => {
        if (!bundle2.properties.has(id)) {
          error3(`if references unknown property=${id}`, key);
        }
      });
      Formula.properties(theorem2.then).forEach((id) => {
        if (!bundle2.properties.has(id)) {
          error3(`then references unknown property=${id}`, key);
        }
      });
      if (theorem2.converse) {
        theorem2.converse.forEach((id) => {
          if (!bundle2.theorems.has(id)) {
            error3(`converse references unknown theorem=${id}`, key);
          }
        });
      }
    });
    let result = bundle2;
    for (const space2 of result.spaces.values()) {
      const key = paths.space(space2.uid);
      const checked = (0, import_core.check)(bundle2, space2);
      switch (checked.kind) {
        case "bundle":
          result = checked.bundle;
          break;
        case "contradiction":
          error3(
            `properties=${checked.contradiction.properties} contradict theorems=${checked.contradiction.theorems}`,
            key
          );
          break;
      }
    }
    return result;
  });
}

// src/version.ts
function refName(raw) {
  const match = /refs\/heads\/([^\n]+)/.exec(raw);
  return match && match[1];
}
async function find() {
  let version = await fromRepo();
  if (version) {
    return version;
  }
  version = fromEnv();
  if (version) {
    return version;
  }
  throw new Error("Could not determine bundle version");
}
async function fromRepo() {
  const contents = await readFile(".git/HEAD").catch(() => {
  });
  if (!contents) {
    return;
  }
  const head = refName(contents);
  if (head) {
    const sha = await readFile(`.git/refs/heads/${head}`);
    return {
      ref: head,
      sha: sha.trim()
    };
  }
}
function fromEnv(env2 = process.env) {
  if (!env2.GITHUB_REF) {
    return;
  }
  if (!env2.GITHUB_SHA) {
    return;
  }
  return {
    ref: refName(env2.GITHUB_REF) || "unknown",
    sha: env2.GITHUB_SHA
  };
}

// src/load.ts
async function load(repo) {
  return validate2({
    properties: await readFiles(`${repo}/properties/*.md`),
    spaces: await readFiles(`${repo}/spaces/*/README.md`),
    theorems: await readFiles(`${repo}/theorems/*.md`),
    traits: await readFiles(`${repo}/spaces/*/properties/*.md`),
    version: await find()
  });
}
function validate2({
  properties: properties2 = [],
  spaces = [],
  theorems = [],
  traits = [],
  version
}) {
  let bundle2;
  try {
    bundle2 = B.deserialize({
      properties: checkAll(property, properties2),
      spaces: checkAll(space, spaces),
      theorems: checkAll(theorem, theorems),
      traits: checkAll(trait, traits),
      version
    });
    return format(bundle(bundle2));
  } catch (e) {
    if (e instanceof ValidationError) {
      return format({ value: bundle2, errors: e.messages });
    } else {
      throw e;
    }
  }
}
var ValidationError = class extends Error {
  messages;
  constructor(message, messages) {
    super(message);
    this.name = "ValidationError";
    this.messages = messages;
  }
};
function checkAll(validator, inputs) {
  const result = all(validator, inputs);
  if (result.errors.length > 0 || !result.value) {
    throw new ValidationError("Validation failed", result.errors);
  }
  return result.value;
}
function format({ value, errors }) {
  if (errors.length > 0) {
    const grouped = /* @__PURE__ */ new Map();
    errors.forEach(({ path, message }) => {
      if (!grouped.has(path)) {
        grouped.set(path, []);
      }
      grouped.get(path).push(message);
    });
    return { bundle: value, errors: grouped };
  } else {
    return { bundle: value };
  }
}

// src/main.ts
function error2(file, message) {
  console.log(`::error file=${file}::${message}`);
}
async function run() {
  const repo = process2.env["GITHUB_WORKSPACE"] || ".";
  const outpath = core.getInput("out");
  core.debug(`Compiling repo=${repo} to out=${outpath}`);
  const { bundle: bundle2, errors } = await load(repo);
  if (errors) {
    errors.forEach((messages, path) => {
      messages.forEach((message) => {
        error2(path, message);
      });
    });
  }
  if (errors || !bundle2) {
    core.setFailed("Compilation finished with errors");
    return;
  }
  fs2.writeFileSync(outpath, JSON.stringify(B2.serialize(bundle2)));
}
run().catch((err) => {
  core.setFailed(err.message);
  core.error(err.message);
});
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

repeat-string/index.js:
  (*!
   * repeat-string <https://github.com/jonschlinkert/repeat-string>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
*/
