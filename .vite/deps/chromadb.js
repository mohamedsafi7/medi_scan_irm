import {
  fetch_exports,
  init_fetch
} from "./chunk-W4FGX6AR.js";
import {
  __commonJS,
  __toCommonJS,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/isomorphic-fetch/fetch-npm-browserify.js
var require_fetch_npm_browserify = __commonJS({
  "node_modules/isomorphic-fetch/fetch-npm-browserify.js"(exports, module) {
    init_fetch();
    module.exports = self.fetch.bind(self);
  }
});

// browser-external:console
var require_console = __commonJS({
  "browser-external:console"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "console" has been externalized for browser compatibility. Cannot access "console.${key}" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/chromadb/dist/chunk-MJPHVYKR.mjs
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS2 = (cb, mod) => function __require() {
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
var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/chromadb/dist/chromadb.mjs
var import_isomorphic_fetch = __toESM(require_fetch_npm_browserify(), 1);
var import_console = __toESM(require_console(), 1);
var require_code = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/codegen/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
    var _CodeOrName = class {
    };
    exports._CodeOrName = _CodeOrName;
    exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var Name = class extends _CodeOrName {
      constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return false;
      }
      get names() {
        return { [this.str]: 1 };
      }
    };
    exports.Name = Name;
    var _Code = class extends _CodeOrName {
      constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return false;
        const item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a;
        return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a;
        return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c) => {
          if (c instanceof Name)
            names[c.str] = (names[c.str] || 0) + 1;
          return names;
        }, {});
      }
    };
    exports._Code = _Code;
    exports.nil = new _Code("");
    function _(strs, ...args) {
      const code = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
      }
      return new _Code(code);
    }
    exports._ = _;
    var plus = new _Code("+");
    function str(strs, ...args) {
      const expr = [safeStringify(strs[0])];
      let i = 0;
      while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
      }
      optimize(expr);
      return new _Code(expr);
    }
    exports.str = str;
    function addCodeArg(code, arg) {
      if (arg instanceof _Code)
        code.push(...arg._items);
      else if (arg instanceof Name)
        code.push(arg);
      else
        code.push(interpolate(arg));
    }
    exports.addCodeArg = addCodeArg;
    function optimize(expr) {
      let i = 1;
      while (i < expr.length - 1) {
        if (expr[i] === plus) {
          const res = mergeExprItems(expr[i - 1], expr[i + 1]);
          if (res !== void 0) {
            expr.splice(i - 1, 3, res);
            continue;
          }
          expr[i++] = "+";
        }
        i++;
      }
    }
    function mergeExprItems(a, b) {
      if (b === '""')
        return a;
      if (a === '""')
        return b;
      if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
          return;
        if (typeof b != "string")
          return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
          return a.slice(0, -1) + b.slice(1);
        return;
      }
      if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
      return;
    }
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
    }
    exports.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    exports.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    exports.getProperty = getProperty;
    function getEsmExportName(key) {
      if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
      }
      throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
    }
    exports.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    exports.regexpCode = regexpCode;
  }
});
var require_scope = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/codegen/scope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
    var code_1 = require_code();
    var ValueError = class extends Error {
      constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
      }
    };
    var UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
      UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
    })(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
    exports.varKinds = {
      const: new code_1.Name("const"),
      let: new code_1.Name("let"),
      var: new code_1.Name("var")
    };
    var Scope = class {
      constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_1.Name(this._newName(prefix));
      }
      _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return this._names[prefix] = { prefix, index: 0 };
      }
    };
    exports.Scope = Scope;
    var ValueScopeName = class extends code_1.Name {
      constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
      }
      setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
      }
    };
    exports.ValueScopeName = ValueScopeName;
    var line = (0, code_1._)`\n`;
    var ValueScope = class extends Scope {
      constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value) {
        var _a;
        if (value.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
          const _name = vs.get(valueKey);
          if (_name)
            return _name;
        } else {
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
      }
      getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
          return;
        return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
          if (name.scopePath === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return (0, code_1._)`${scopeName}${name.scopePath}`;
        });
      }
      scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
          if (name.value === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return name.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
          const vs = values[prefix];
          if (!vs)
            continue;
          const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name) => {
            if (nameSet.has(name))
              return;
            nameSet.set(name, UsedValueState.Started);
            let c = valueCode(name);
            if (c) {
              const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
              code = (0, code_1._)`${code}${def} ${name} = ${c};${this.opts._n}`;
            } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
              code = (0, code_1._)`${code}${c}${this.opts._n}`;
            } else {
              throw new ValueError(name);
            }
            nameSet.set(name, UsedValueState.Completed);
          });
        }
        return code;
      }
    };
    exports.ValueScope = ValueScope;
  }
});
var require_codegen = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/codegen/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
    var code_1 = require_code();
    var scope_1 = require_scope();
    var code_2 = require_code();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
      return code_2.regexpCode;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return code_2.Name;
    } });
    var scope_2 = require_scope();
    Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
      return scope_2.varKinds;
    } });
    exports.operators = {
      GT: new code_1._Code(">"),
      GTE: new code_1._Code(">="),
      LT: new code_1._Code("<"),
      LTE: new code_1._Code("<="),
      EQ: new code_1._Code("==="),
      NEQ: new code_1._Code("!=="),
      NOT: new code_1._Code("!"),
      OR: new code_1._Code("||"),
      AND: new code_1._Code("&&"),
      ADD: new code_1._Code("+")
    };
    var Node = class {
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    };
    var Def = class extends Node {
      constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
      }
      render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (!names[this.name.str])
          return;
        if (this.rhs)
          this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
      }
    };
    var Assign = class extends Node {
      constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
      }
      render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
          return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
      }
    };
    var AssignOp = class extends Assign {
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
      }
      render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    };
    var Label = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        return `${this.label}:` + _n;
      }
    };
    var Break = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
      }
    };
    var Throw = class extends Node {
      constructor(error) {
        super();
        this.error = error;
      }
      render({ _n }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    };
    var AnyCode = class extends Node {
      constructor(code) {
        super();
        this.code = code;
      }
      render({ _n }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
      }
      get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
      }
    };
    var ParentNode = class extends Node {
      constructor(nodes = []) {
        super();
        this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
      }
      optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i].optimizeNodes();
          if (Array.isArray(n))
            nodes.splice(i, 1, ...n);
          else if (n)
            nodes[i] = n;
          else
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names, constants))
            continue;
          subtractNames(names, n.names);
          nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
      }
    };
    var BlockNode = class extends ParentNode {
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    };
    var Root = class extends ParentNode {
    };
    var Else = class extends BlockNode {
    };
    Else.kind = "else";
    var If = class _If extends BlockNode {
      constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
      }
      render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
          code += "else " + this.else.render(opts);
        return code;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
          return this.nodes;
        let e = this.else;
        if (e) {
          const ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
          if (cond === false)
            return e instanceof _If ? e : e.nodes;
          if (this.nodes.length)
            return this;
          return new _If(not(cond), e instanceof _If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
          return void 0;
        return this;
      }
      optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
          return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
          addNames(names, this.else.names);
        return names;
      }
    };
    If.kind = "if";
    var For = class extends BlockNode {
    };
    For.kind = "for";
    var ForLoop = class extends For {
      constructor(iteration) {
        super();
        this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    };
    var ForRange = class extends For {
      constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
      }
      render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
      }
      get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
      }
    };
    var ForIter = class extends For {
      constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    };
    var Func = class extends BlockNode {
      constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
      }
      render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
      }
    };
    Func.kind = "func";
    var Return = class extends ParentNode {
      render(opts) {
        return "return " + super.render(opts);
      }
    };
    Return.kind = "return";
    var Try = class extends BlockNode {
      render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
          code += this.catch.render(opts);
        if (this.finally)
          code += this.finally.render(opts);
        return code;
      }
      optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
      }
      optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        if (this.catch)
          addNames(names, this.catch.names);
        if (this.finally)
          addNames(names, this.finally.names);
        return names;
      }
    };
    var Catch = class extends BlockNode {
      constructor(error) {
        super();
        this.error = error;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    };
    Catch.kind = "catch";
    var Finally = class extends BlockNode {
      render(opts) {
        return "finally" + super.render(opts);
      }
    };
    Finally.kind = "finally";
    var CodeGen = class {
      constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(prefix) {
        return this._scope.name(prefix);
      }
      // reserves unique name in the external scope
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
        vs.add(name);
        return name;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== void 0 && constant)
          this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
      }
      // `const` declaration (`var` in es5 mode)
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      // `var` declaration with optional assignment
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      // assignment code
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      // `+=` code
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
      }
      // appends passed SafeExpr to code or executes Block
      code(c) {
        if (typeof c == "function")
          c();
        else if (c !== code_1.nil)
          this._leafNode(new AnyCode(c));
        return this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
          if (code.length > 1)
            code.push(",");
          code.push(key);
          if (key !== value || this.opts.es5) {
            code.push(":");
            (0, code_1.addCodeArg)(code, value);
          }
        }
        code.push("}");
        return new code_1._Code(code);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
          this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
          this.code(thenBody).endIf();
        } else if (elseBody) {
          throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new Else());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
          this.code(forBody).endFor();
        return this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      // `for` statement for a range of values
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
            this.var(name, (0, code_1._)`${arr}[${i}]`);
            forBody(name);
          });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
          return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(For);
      }
      // `label` statement
      label(label) {
        return this._leafNode(new Label(label));
      }
      // `break` statement
      break(label) {
        return this._leafNode(new Break(label));
      }
      // `return` statement
      return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      // `try` statement
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
          const error = this.name("e");
          this._currNode = node.catch = new Catch(error);
          catchCode(error);
        }
        if (finallyCode) {
          this._currNode = node.finally = new Finally();
          this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
      }
      // `throw` statement
      throw(error) {
        return this._leafNode(new Throw(error));
      }
      // start self-balancing block
      block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
          this.code(body).endBlock(nodeCount);
        return this;
      }
      // end the current self-balancing block
      endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
          this.code(funcBody).endFunc();
        return this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        while (n-- > 0) {
          this._root.optimizeNodes();
          this._root.optimizeNames(this._root.names, this._constants);
        }
      }
      _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
      }
      _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
      }
      _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
          this._nodes.pop();
          return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
          throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
      }
    };
    exports.CodeGen = CodeGen;
    function addNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
      return names;
    }
    function addExprNames(names, from) {
      return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
    }
    function optimizeExpr(expr, names, constants) {
      if (expr instanceof code_1.Name)
        return replaceName(expr);
      if (!canOptimize(expr))
        return expr;
      return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
          c = replaceName(c);
        if (c instanceof code_1._Code)
          items.push(...c._items);
        else
          items.push(c);
        return items;
      }, []));
      function replaceName(n) {
        const c = constants[n.str];
        if (c === void 0 || names[n.str] !== 1)
          return n;
        delete names[n.str];
        return c;
      }
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== void 0);
      }
    }
    function subtractNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
    }
    function not(x) {
      return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
    }
    exports.not = not;
    var andCode = mappend(exports.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports.and = and;
    var orCode = mappend(exports.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    exports.or = or;
    function mappend(op) {
      return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
    }
    function par(x) {
      return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
    }
  }
});
var require_util = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
    var codegen_1 = require_codegen();
    var code_1 = require_code();
    function toHash(arr) {
      const hash = {};
      for (const item of arr)
        hash[item] = true;
      return hash;
    }
    exports.toHash = toHash;
    function alwaysValidSchema(it, schema) {
      if (typeof schema == "boolean")
        return schema;
      if (Object.keys(schema).length === 0)
        return true;
      checkUnknownRules(it, schema);
      return !schemaHasRules(schema, it.self.RULES.all);
    }
    exports.alwaysValidSchema = alwaysValidSchema;
    function checkUnknownRules(it, schema = it.schema) {
      const { opts, self: self2 } = it;
      if (!opts.strictSchema)
        return;
      if (typeof schema === "boolean")
        return;
      const rules = self2.RULES.keywords;
      for (const key in schema) {
        if (!rules[key])
          checkStrictMode(it, `unknown keyword: "${key}"`);
      }
    }
    exports.checkUnknownRules = checkUnknownRules;
    function schemaHasRules(schema, rules) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (rules[key])
          return true;
      return false;
    }
    exports.schemaHasRules = schemaHasRules;
    function schemaHasRulesButRef(schema, RULES) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
          return true;
      return false;
    }
    exports.schemaHasRulesButRef = schemaHasRulesButRef;
    function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
      if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
          return schema;
        if (typeof schema == "string")
          return (0, codegen_1._)`${schema}`;
      }
      return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
    }
    exports.schemaRefOrVal = schemaRefOrVal;
    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }
    exports.unescapeFragment = unescapeFragment;
    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }
    exports.escapeFragment = escapeFragment;
    function escapeJsonPointer(str) {
      if (typeof str == "number")
        return `${str}`;
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    exports.escapeJsonPointer = escapeJsonPointer;
    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    exports.unescapeJsonPointer = unescapeJsonPointer;
    function eachItem(xs, f) {
      if (Array.isArray(xs)) {
        for (const x of xs)
          f(x);
      } else {
        f(xs);
      }
    }
    exports.eachItem = eachItem;
    function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
      return (gen, from, to, toName) => {
        const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
      };
    }
    exports.mergeEvaluated = {
      props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
          gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
          if (from === true) {
            gen.assign(to, true);
          } else {
            gen.assign(to, (0, codegen_1._)`${to} || {}`);
            setEvaluated(gen, to, from);
          }
        }),
        mergeValues: (from, to) => from === true ? true : { ...from, ...to },
        resultToName: evaluatedPropsToName
      }),
      items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => from === true ? true : Math.max(from, to),
        resultToName: (gen, items) => gen.var("items", items)
      })
    };
    function evaluatedPropsToName(gen, ps) {
      if (ps === true)
        return gen.var("props", true);
      const props = gen.var("props", (0, codegen_1._)`{}`);
      if (ps !== void 0)
        setEvaluated(gen, props, ps);
      return props;
    }
    exports.evaluatedPropsToName = evaluatedPropsToName;
    function setEvaluated(gen, props, ps) {
      Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
    }
    exports.setEvaluated = setEvaluated;
    var snippets = {};
    function useFunc(gen, f) {
      return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
      });
    }
    exports.useFunc = useFunc;
    var Type;
    (function(Type2) {
      Type2[Type2["Num"] = 0] = "Num";
      Type2[Type2["Str"] = 1] = "Str";
    })(Type || (exports.Type = Type = {}));
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
      if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
      }
      return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
    }
    exports.getErrorPath = getErrorPath;
    function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
      if (!mode)
        return;
      msg = `strict mode: ${msg}`;
      if (mode === true)
        throw new Error(msg);
      it.self.logger.warn(msg);
    }
    exports.checkStrictMode = checkStrictMode;
  }
});
var require_names = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/names.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var names = {
      // validation function arguments
      data: new codegen_1.Name("data"),
      // data passed to validation function
      // args passed from referencing schema
      valCxt: new codegen_1.Name("valCxt"),
      // validation/data context - should not be used directly, it is destructured to the names below
      instancePath: new codegen_1.Name("instancePath"),
      parentData: new codegen_1.Name("parentData"),
      parentDataProperty: new codegen_1.Name("parentDataProperty"),
      rootData: new codegen_1.Name("rootData"),
      // root data - same as the data passed to the first/top validation function
      dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
      // used to support recursiveRef and dynamicRef
      // function scoped variables
      vErrors: new codegen_1.Name("vErrors"),
      // null or array of validation errors
      errors: new codegen_1.Name("errors"),
      // counter of validation errors
      this: new codegen_1.Name("this"),
      // "globals"
      self: new codegen_1.Name("self"),
      scope: new codegen_1.Name("scope"),
      // JTD serialize/parse name for JSON string and position
      json: new codegen_1.Name("json"),
      jsonPos: new codegen_1.Name("jsonPos"),
      jsonLen: new codegen_1.Name("jsonLen"),
      jsonPart: new codegen_1.Name("jsonPart")
    };
    exports.default = names;
  }
});
var require_errors = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    exports.keywordError = {
      message: ({ keyword }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation`
    };
    exports.keyword$DataError = {
      message: ({ keyword, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)`
    };
    function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, (0, codegen_1._)`[${errObj}]`);
      }
    }
    exports.reportError = reportError;
    function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
      }
    }
    exports.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    exports.resetErrorsCount = resetErrorsCount;
    function extendErrors({ gen, keyword, schemaValue, data, errsCount, it }) {
      if (errsCount === void 0)
        throw new Error("ajv implementation error");
      const err = gen.name("err");
      gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
          gen.assign((0, codegen_1._)`${err}.schema`, schemaValue);
          gen.assign((0, codegen_1._)`${err}.data`, data);
        }
      });
    }
    exports.extendErrors = extendErrors;
    function addError(gen, errObj) {
      const err = gen.const("err", errObj);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`);
      gen.code((0, codegen_1._)`${names_1.default.errors}++`);
    }
    function returnErrors(it, errs) {
      const { gen, validateName, schemaEnv } = it;
      if (schemaEnv.$async) {
        gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, errs);
        gen.return(false);
      }
    }
    var E = {
      keyword: new codegen_1.Name("keyword"),
      schemaPath: new codegen_1.Name("schemaPath"),
      // also used in JTD errors
      params: new codegen_1.Name("params"),
      propertyName: new codegen_1.Name("propertyName"),
      message: new codegen_1.Name("message"),
      schema: new codegen_1.Name("schema"),
      parentSchema: new codegen_1.Name("parentSchema")
    };
    function errorObjectCode(cxt, error, errorPaths) {
      const { createErrors } = cxt.it;
      if (createErrors === false)
        return (0, codegen_1._)`{}`;
      return errorObject(cxt, error, errorPaths);
    }
    function errorObject(cxt, error, errorPaths = {}) {
      const { gen, it } = cxt;
      const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths)
      ];
      extraErrorProps(cxt, error, keyValues);
      return gen.object(...keyValues);
    }
    function errorInstancePath({ errorPath }, { instancePath }) {
      const instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
      return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
    }
    function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
      let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword}`;
      if (schemaPath) {
        schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
      }
      return [E.schemaPath, schPath];
    }
    function extraErrorProps(cxt, { params, message }, keyValues) {
      const { keyword, data, schemaValue, it } = cxt;
      const { opts, propertyName, topSchemaRef, schemaPath } = it;
      keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]);
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
      }
      if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
    }
  }
});
var require_boolSchema = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/validate/boolSchema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var boolError = {
      message: "boolean schema is false"
    };
    function topBoolOrEmptySchema(it) {
      const { gen, schema, validateName } = it;
      if (schema === false) {
        falseSchemaError(it, false);
      } else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, null);
        gen.return(true);
      }
    }
    exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
    function boolOrEmptySchema(it, valid) {
      const { gen, schema } = it;
      if (schema === false) {
        gen.var(valid, false);
        falseSchemaError(it);
      } else {
        gen.var(valid, true);
      }
    }
    exports.boolOrEmptySchema = boolOrEmptySchema;
    function falseSchemaError(it, overrideAllErrors) {
      const { gen, data } = it;
      const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it
      };
      (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
    }
  }
});
var require_rules = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/rules.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRules = exports.isJSONType = void 0;
    var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    var jsonTypes = new Set(_jsonTypes);
    function isJSONType(x) {
      return typeof x == "string" && jsonTypes.has(x);
    }
    exports.isJSONType = isJSONType;
    function getRules() {
      const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] }
      };
      return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {}
      };
    }
    exports.getRules = getRules;
  }
});
var require_applicability = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/validate/applicability.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
    function schemaHasRulesForType({ schema, self: self2 }, type) {
      const group = self2.RULES.types[type];
      return group && group !== true && shouldUseGroup(schema, group);
    }
    exports.schemaHasRulesForType = schemaHasRulesForType;
    function shouldUseGroup(schema, group) {
      return group.rules.some((rule) => shouldUseRule(schema, rule));
    }
    exports.shouldUseGroup = shouldUseGroup;
    function shouldUseRule(schema, rule) {
      var _a;
      return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
    }
    exports.shouldUseRule = shouldUseRule;
  }
});
var require_dataType = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/validate/dataType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
    var rules_1 = require_rules();
    var applicability_1 = require_applicability();
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var DataType;
    (function(DataType2) {
      DataType2[DataType2["Correct"] = 0] = "Correct";
      DataType2[DataType2["Wrong"] = 1] = "Wrong";
    })(DataType || (exports.DataType = DataType = {}));
    function getSchemaTypes(schema) {
      const types = getJSONTypes(schema.type);
      const hasNull = types.includes("null");
      if (hasNull) {
        if (schema.nullable === false)
          throw new Error("type: null contradicts nullable: false");
      } else {
        if (!types.length && schema.nullable !== void 0) {
          throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
          types.push("null");
      }
      return types;
    }
    exports.getSchemaTypes = getSchemaTypes;
    function getJSONTypes(ts) {
      const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
      if (types.every(rules_1.isJSONType))
        return types;
      throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
    }
    exports.getJSONTypes = getJSONTypes;
    function coerceAndCheckDataType(it, types) {
      const { gen, data, opts } = it;
      const coerceTo = coerceToTypes(types, opts.coerceTypes);
      const checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
      if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
          if (coerceTo.length)
            coerceData(it, types, coerceTo);
          else
            reportTypeError(it);
        });
      }
      return checkTypes;
    }
    exports.coerceAndCheckDataType = coerceAndCheckDataType;
    var COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(types, coerceTypes) {
      return coerceTypes ? types.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
    }
    function coerceData(it, types, coerceTo) {
      const { gen, data, opts } = it;
      const dataType = gen.let("dataType", (0, codegen_1._)`typeof ${data}`);
      const coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
      if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._)`${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
      }
      gen.if((0, codegen_1._)`${coerced} !== undefined`);
      for (const t of coerceTo) {
        if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
          coerceSpecificType(t);
        }
      }
      gen.else();
      reportTypeError(it);
      gen.endIf();
      gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
      });
      function coerceSpecificType(t) {
        switch (t) {
          case "string":
            gen.elseIf((0, codegen_1._)`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
            return;
          case "number":
            gen.elseIf((0, codegen_1._)`${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "integer":
            gen.elseIf((0, codegen_1._)`${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "boolean":
            gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
            return;
          case "null":
            gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`);
            gen.assign(coerced, null);
            return;
          case "array":
            gen.elseIf((0, codegen_1._)`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
        }
      }
    }
    function assignParentData({ gen, parentData, parentDataProperty }, expr) {
      gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
    }
    function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
      const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
      let cond;
      switch (dataType) {
        case "null":
          return (0, codegen_1._)`${data} ${EQ} null`;
        case "array":
          cond = (0, codegen_1._)`Array.isArray(${data})`;
          break;
        case "object":
          cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
          break;
        case "integer":
          cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
          break;
        case "number":
          cond = numCond();
          break;
        default:
          return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType}`;
      }
      return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
      function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
      }
    }
    exports.checkDataType = checkDataType;
    function checkDataTypes(dataTypes, data, strictNums, correct) {
      if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
      }
      let cond;
      const types = (0, util_1.toHash)(dataTypes);
      if (types.array && types.object) {
        const notObj = (0, codegen_1._)`typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
      } else {
        cond = codegen_1.nil;
      }
      if (types.number)
        delete types.integer;
      for (const t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
      return cond;
    }
    exports.checkDataTypes = checkDataTypes;
    var typeError = {
      message: ({ schema }) => `must be ${schema}`,
      params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
    };
    function reportTypeError(it) {
      const cxt = getTypeErrorContext(it);
      (0, errors_1.reportError)(cxt, typeError);
    }
    exports.reportTypeError = reportTypeError;
    function getTypeErrorContext(it) {
      const { gen, data, schema } = it;
      const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
      return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it
      };
    }
  }
});
var require_defaults = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/validate/defaults.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assignDefaults = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function assignDefaults(it, ty) {
      const { properties, items } = it.schema;
      if (ty === "object" && properties) {
        for (const key in properties) {
          assignDefault(it, key, properties[key].default);
        }
      } else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
      }
    }
    exports.assignDefaults = assignDefaults;
    function assignDefault(it, prop, defaultValue) {
      const { gen, compositeRule, data, opts } = it;
      if (defaultValue === void 0)
        return;
      const childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
      if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
      }
      let condition = (0, codegen_1._)`${childData} === undefined`;
      if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`;
      }
      gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
    }
  }
});
var require_code2 = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    var util_2 = require_util();
    function checkReportMissingProp(cxt, prop) {
      const { gen, data, it } = cxt;
      gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, true);
        cxt.error();
      });
    }
    exports.checkReportMissingProp = checkReportMissingProp;
    function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
      return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
    }
    exports.checkMissingProp = checkMissingProp;
    function reportMissingProp(cxt, missing) {
      cxt.setParams({ missingProperty: missing }, true);
      cxt.error();
    }
    exports.reportMissingProp = reportMissingProp;
    function hasPropFunc(gen) {
      return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
      });
    }
    exports.hasPropFunc = hasPropFunc;
    function isOwnProperty(gen, data, property) {
      return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
    }
    exports.isOwnProperty = isOwnProperty;
    function propertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
      return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
    }
    exports.propertyInData = propertyInData;
    function noPropertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
      return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
    }
    exports.noPropertyInData = noPropertyInData;
    function allSchemaProperties(schemaMap2) {
      return schemaMap2 ? Object.keys(schemaMap2).filter((p) => p !== "__proto__") : [];
    }
    exports.allSchemaProperties = allSchemaProperties;
    function schemaProperties(it, schemaMap2) {
      return allSchemaProperties(schemaMap2).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap2[p]));
    }
    exports.schemaProperties = schemaProperties;
    function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
      const dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
      const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData]
      ];
      if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
      const args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
      return context !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context}, ${args})` : (0, codegen_1._)`${func}(${args})`;
    }
    exports.callValidateCode = callValidateCode;
    var newRegExp = (0, codegen_1._)`new RegExp`;
    function usePattern({ gen, it: { opts } }, pattern) {
      const u = opts.unicodeRegExp ? "u" : "";
      const { regExp } = opts.code;
      const rx = regExp(pattern, u);
      return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`
      });
    }
    exports.usePattern = usePattern;
    function validateArray(cxt) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
      }
      gen.var(valid, true);
      validateItems(() => gen.break());
      return valid;
      function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword,
            dataProp: i,
            dataPropType: util_1.Type.Num
          }, valid);
          gen.if((0, codegen_1.not)(valid), notValid);
        });
      }
    }
    exports.validateArray = validateArray;
    function validateUnion(cxt) {
      const { gen, schema, keyword, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
      if (alwaysValid && !it.opts.unevaluated)
        return;
      const valid = gen.let("valid", false);
      const schValid = gen.name("_valid");
      gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
          keyword,
          schemaProp: i,
          compositeRule: true
        }, schValid);
        gen.assign(valid, (0, codegen_1._)`${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        if (!merged)
          gen.if((0, codegen_1.not)(valid));
      }));
      cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
    }
    exports.validateUnion = validateUnion;
  }
});
var require_keyword = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/validate/keyword.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var code_1 = require_code2();
    var errors_1 = require_errors();
    function macroKeywordCode(cxt, def) {
      const { gen, keyword, schema, parentSchema, it } = cxt;
      const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
      const schemaRef = useKeyword(gen, keyword, macroSchema);
      if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
      const valid = gen.name("valid");
      cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true
      }, valid);
      cxt.pass(valid, () => cxt.error(true));
    }
    exports.macroKeywordCode = macroKeywordCode;
    function funcKeywordCode(cxt, def) {
      var _a;
      const { gen, keyword, schema, parentSchema, $data, it } = cxt;
      checkAsyncKeyword(it, def);
      const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
      const validateRef = useKeyword(gen, keyword, validate);
      const valid = gen.let("valid");
      cxt.block$data(valid, validateKeyword);
      cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
      function validateKeyword() {
        if (def.errors === false) {
          assignValid();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => cxt.error());
        } else {
          const ruleErrs = def.async ? validateAsync() : validateSync();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => addErrs(cxt, ruleErrs));
        }
      }
      function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid, false).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
      }
      function validateSync() {
        const validateErrs = (0, codegen_1._)`${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
      }
      function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !("compile" in def && !$data || def.schema === false);
        gen.assign(valid, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
      }
      function reportErrs(errors) {
        var _a2;
        gen.if((0, codegen_1.not)((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid), errors);
      }
    }
    exports.funcKeywordCode = funcKeywordCode;
    function modifyData(cxt) {
      const { gen, data, it } = cxt;
      gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
    }
    function addErrs(cxt, errs) {
      const { gen } = cxt;
      gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
      }, () => cxt.error());
    }
    function checkAsyncKeyword({ schemaEnv }, def) {
      if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
    }
    function useKeyword(gen, keyword, result) {
      if (result === void 0)
        throw new Error(`keyword "${keyword}" failed to compile`);
      return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
    }
    function validSchemaType(schema, schemaType, allowUndefined = false) {
      return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
    }
    exports.validSchemaType = validSchemaType;
    function validateKeywordUsage({ schema, opts, self: self2, errSchemaPath }, def, keyword) {
      if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
      }
      const deps = def.dependencies;
      if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
      }
      if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
          const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` + self2.errorsText(def.validateSchema.errors);
          if (opts.validateSchema === "log")
            self2.logger.error(msg);
          else
            throw new Error(msg);
        }
      }
    }
    exports.validateKeywordUsage = validateKeywordUsage;
  }
});
var require_subschema = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/validate/subschema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
      if (keyword !== void 0 && schema !== void 0) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
      }
      if (keyword !== void 0) {
        const sch = it.schema[keyword];
        return schemaProp === void 0 ? {
          schema: sch,
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}`
        } : {
          schema: sch[schemaProp],
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`
        };
      }
      if (schema !== void 0) {
        if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
          throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
          schema,
          schemaPath,
          topSchemaRef,
          errSchemaPath
        };
      }
      throw new Error('either "keyword" or "schema" must be passed');
    }
    exports.getSubschema = getSubschema;
    function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
      if (data !== void 0 && dataProp !== void 0) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
      }
      const { gen } = it;
      if (dataProp !== void 0) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._)`${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
      }
      if (data !== void 0) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
        dataContextProps(nextData);
        if (propertyName !== void 0)
          subschema.propertyName = propertyName;
      }
      if (dataTypes)
        subschema.dataTypes = dataTypes;
      function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = /* @__PURE__ */ new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
      }
    }
    exports.extendSubschemaData = extendSubschemaData;
    function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
      if (compositeRule !== void 0)
        subschema.compositeRule = compositeRule;
      if (createErrors !== void 0)
        subschema.createErrors = createErrors;
      if (allErrors !== void 0)
        subschema.allErrors = allErrors;
      subschema.jtdDiscriminator = jtdDiscriminator;
      subschema.jtdMetadata = jtdMetadata;
    }
    exports.extendSubschemaMode = extendSubschemaMode;
  }
});
var require_fast_deep_equal = __commonJS2({
  "../../node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf)
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString)
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});
var require_json_schema_traverse = __commonJS2({
  "../../node_modules/.pnpm/json-schema-traverse@1.0.0/node_modules/json-schema-traverse/index.js"(exports, module) {
    "use strict";
    var traverse = module.exports = function(schema, opts, cb) {
      if (typeof opts == "function") {
        cb = opts;
        opts = {};
      }
      cb = opts.cb || cb;
      var pre = typeof cb == "function" ? cb : cb.pre || function() {
      };
      var post = cb.post || function() {
      };
      _traverse(opts, pre, post, schema, "", schema);
    };
    traverse.keywords = {
      additionalItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      propertyNames: true,
      not: true,
      if: true,
      then: true,
      else: true
    };
    traverse.arrayKeywords = {
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };
    traverse.propsKeywords = {
      $defs: true,
      definitions: true,
      properties: true,
      patternProperties: true,
      dependencies: true
    };
    traverse.skipKeywords = {
      default: true,
      enum: true,
      const: true,
      required: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };
    function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema && typeof schema == "object" && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key in schema) {
          var sch = schema[key];
          if (Array.isArray(sch)) {
            if (key in traverse.arrayKeywords) {
              for (var i = 0; i < sch.length; i++)
                _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
            }
          } else if (key in traverse.propsKeywords) {
            if (sch && typeof sch == "object") {
              for (var prop in sch)
                _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
            }
          } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
            _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
          }
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }
    function escapeJsonPtr(str) {
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
  }
});
var require_resolve = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/resolve.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
    var util_1 = require_util();
    var equal = require_fast_deep_equal();
    var traverse = require_json_schema_traverse();
    var SIMPLE_INLINED = /* @__PURE__ */ new Set([
      "type",
      "format",
      "pattern",
      "maxLength",
      "minLength",
      "maxProperties",
      "minProperties",
      "maxItems",
      "minItems",
      "maximum",
      "minimum",
      "uniqueItems",
      "multipleOf",
      "required",
      "enum",
      "const"
    ]);
    function inlineRef(schema, limit = true) {
      if (typeof schema == "boolean")
        return true;
      if (limit === true)
        return !hasRef(schema);
      if (!limit)
        return false;
      return countKeys(schema) <= limit;
    }
    exports.inlineRef = inlineRef;
    var REF_KEYWORDS = /* @__PURE__ */ new Set([
      "$ref",
      "$recursiveRef",
      "$recursiveAnchor",
      "$dynamicRef",
      "$dynamicAnchor"
    ]);
    function hasRef(schema) {
      for (const key in schema) {
        if (REF_KEYWORDS.has(key))
          return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
          return true;
        if (typeof sch == "object" && hasRef(sch))
          return true;
      }
      return false;
    }
    function countKeys(schema) {
      let count = 0;
      for (const key in schema) {
        if (key === "$ref")
          return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
          continue;
        if (typeof schema[key] == "object") {
          (0, util_1.eachItem)(schema[key], (sch) => count += countKeys(sch));
        }
        if (count === Infinity)
          return Infinity;
      }
      return count;
    }
    function getFullPath(resolver, id = "", normalize) {
      if (normalize !== false)
        id = normalizeId(id);
      const p = resolver.parse(id);
      return _getFullPath(resolver, p);
    }
    exports.getFullPath = getFullPath;
    function _getFullPath(resolver, p) {
      const serialized = resolver.serialize(p);
      return serialized.split("#")[0] + "#";
    }
    exports._getFullPath = _getFullPath;
    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id) {
      return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
    }
    exports.normalizeId = normalizeId;
    function resolveUrl(resolver, baseId, id) {
      id = normalizeId(id);
      return resolver.resolve(baseId, id);
    }
    exports.resolveUrl = resolveUrl;
    var ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
    function getSchemaRefs(schema, baseId) {
      if (typeof schema == "boolean")
        return {};
      const { schemaId, uriResolver } = this.opts;
      const schId = normalizeId(schema[schemaId] || baseId);
      const baseIds = { "": schId };
      const pathPrefix = getFullPath(uriResolver, schId, false);
      const localRefs = {};
      const schemaRefs = /* @__PURE__ */ new Set();
      traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === void 0)
          return;
        const fullPath = pathPrefix + jsonPtr;
        let innerBaseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
          innerBaseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = innerBaseId;
        function addRef(ref) {
          const _resolve = this.opts.uriResolver.resolve;
          ref = normalizeId(innerBaseId ? _resolve(innerBaseId, ref) : ref);
          if (schemaRefs.has(ref))
            throw ambiguos(ref);
          schemaRefs.add(ref);
          let schOrRef = this.refs[ref];
          if (typeof schOrRef == "string")
            schOrRef = this.refs[schOrRef];
          if (typeof schOrRef == "object") {
            checkAmbiguosRef(sch, schOrRef.schema, ref);
          } else if (ref !== normalizeId(fullPath)) {
            if (ref[0] === "#") {
              checkAmbiguosRef(sch, localRefs[ref], ref);
              localRefs[ref] = sch;
            } else {
              this.refs[ref] = fullPath;
            }
          }
          return ref;
        }
        function addAnchor(anchor) {
          if (typeof anchor == "string") {
            if (!ANCHOR.test(anchor))
              throw new Error(`invalid anchor "${anchor}"`);
            addRef.call(this, `#${anchor}`);
          }
        }
      });
      return localRefs;
      function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== void 0 && !equal(sch1, sch2))
          throw ambiguos(ref);
      }
      function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
      }
    }
    exports.getSchemaRefs = getSchemaRefs;
  }
});
var require_validate = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/validate/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
    var boolSchema_1 = require_boolSchema();
    var dataType_1 = require_dataType();
    var applicability_1 = require_applicability();
    var dataType_2 = require_dataType();
    var defaults_1 = require_defaults();
    var keyword_1 = require_keyword();
    var subschema_1 = require_subschema();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var errors_1 = require_errors();
    function validateFunctionCode(it) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          topSchemaObjCode(it);
          return;
        }
      }
      validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
    }
    exports.validateFunctionCode = validateFunctionCode;
    function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
      if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
          gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
          destructureValCxtES5(gen, opts);
          gen.code(body);
        });
      } else {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
      }
    }
    function destructureValCxt(opts) {
      return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
    }
    function destructureValCxtES5(gen, opts) {
      gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
      }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`""`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
      });
    }
    function topSchemaObjCode(it) {
      const { schema, opts, gen } = it;
      validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
          commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
          resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
      });
      return;
    }
    function resetEvaluated(it) {
      const { gen, validateName } = it;
      it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`);
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`));
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
    }
    function funcSourceUrl(schema, opts) {
      const schId = typeof schema == "object" && schema[opts.schemaId];
      return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
    }
    function subschemaCode(it, valid) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          subSchemaObjCode(it, valid);
          return;
        }
      }
      (0, boolSchema_1.boolOrEmptySchema)(it, valid);
    }
    function schemaCxtHasRules({ schema, self: self2 }) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (self2.RULES.all[key])
          return true;
      return false;
    }
    function isSchemaObj(it) {
      return typeof it.schema != "boolean";
    }
    function subSchemaObjCode(it, valid) {
      const { schema, gen, opts } = it;
      if (opts.$comment && schema.$comment)
        commentKeyword(it);
      updateContext(it);
      checkAsyncSchema(it);
      const errsCount = gen.const("_errs", names_1.default.errors);
      typeAndKeywords(it, errsCount);
      gen.var(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
    }
    function checkKeywords(it) {
      (0, util_1.checkUnknownRules)(it);
      checkRefsAndKeywords(it);
    }
    function typeAndKeywords(it, errsCount) {
      if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
      const types = (0, dataType_1.getSchemaTypes)(it.schema);
      const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
      schemaKeywords(it, types, !checkedTypes, errsCount);
    }
    function checkRefsAndKeywords(it) {
      const { schema, errSchemaPath, opts, self: self2 } = it;
      if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self2.RULES)) {
        self2.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
      }
    }
    function checkNoDefault(it) {
      const { schema, opts } = it;
      if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
      }
    }
    function updateContext(it) {
      const schId = it.schema[it.opts.schemaId];
      if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
    }
    function checkAsyncSchema(it) {
      if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
    }
    function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
      const msg = schema.$comment;
      if (opts.$comment === true) {
        gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
      } else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
      }
    }
    function returnResults(it) {
      const { gen, schemaEnv, validateName, ValidationError, opts } = it;
      if (schemaEnv.$async) {
        gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`));
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
          assignEvaluated(it);
        gen.return((0, codegen_1._)`${names_1.default.errors} === 0`);
      }
    }
    function assignEvaluated({ gen, evaluated, props, items }) {
      if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.props`, props);
      if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.items`, items);
    }
    function schemaKeywords(it, types, typeErrors, errsCount) {
      const { gen, schema, data, allErrors, opts, self: self2 } = it;
      const { RULES } = self2;
      if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
        return;
      }
      if (!opts.jtd)
        checkStrictTypes(it, types);
      gen.block(() => {
        for (const group of RULES.rules)
          groupKeywords(group);
        groupKeywords(RULES.post);
      });
      function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group))
          return;
        if (group.type) {
          gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
          iterateKeywords(it, group);
          if (types.length === 1 && types[0] === group.type && typeErrors) {
            gen.else();
            (0, dataType_2.reportTypeError)(it);
          }
          gen.endIf();
        } else {
          iterateKeywords(it, group);
        }
        if (!allErrors)
          gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`);
      }
    }
    function iterateKeywords(it, group) {
      const { gen, schema, opts: { useDefaults } } = it;
      if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
      gen.block(() => {
        for (const rule of group.rules) {
          if ((0, applicability_1.shouldUseRule)(schema, rule)) {
            keywordCode(it, rule.keyword, rule.definition, group.type);
          }
        }
      });
    }
    function checkStrictTypes(it, types) {
      if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
      checkContextTypes(it, types);
      if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
      checkKeywordTypes(it, it.dataTypes);
    }
    function checkContextTypes(it, types) {
      if (!types.length)
        return;
      if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
      }
      types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
          strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
      });
      narrowSchemaTypes(it, types);
    }
    function checkMultipleTypes(it, ts) {
      if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
      }
    }
    function checkKeywordTypes(it, ts) {
      const rules = it.self.RULES.all;
      for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
          const { type } = rule.definition;
          if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
            strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
          }
        }
      }
    }
    function hasApplicableType(schTs, kwdT) {
      return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
    }
    function includesType(ts, t) {
      return ts.includes(t) || t === "integer" && ts.includes("number");
    }
    function narrowSchemaTypes(it, withTypes) {
      const ts = [];
      for (const t of it.dataTypes) {
        if (includesType(withTypes, t))
          ts.push(t);
        else if (withTypes.includes("integer") && t === "number")
          ts.push("integer");
      }
      it.dataTypes = ts;
    }
    function strictTypesError(it, msg) {
      const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
      msg += ` at "${schemaPath}" (strictTypes)`;
      (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
    }
    var KeywordCxt = class {
      constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
          this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        } else {
          this.schemaCode = this.schemaValue;
          if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
            throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
          }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
          this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
      }
      result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
      }
      failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
          failAction();
        else
          this.error();
        if (successAction) {
          this.gen.else();
          successAction();
          if (this.allErrors)
            this.gen.endIf();
        } else {
          if (this.allErrors)
            this.gen.endIf();
          else
            this.gen.else();
        }
      }
      pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), void 0, failAction);
      }
      fail(condition) {
        if (condition === void 0) {
          this.error();
          if (!this.allErrors)
            this.gen.if(false);
          return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
          this.gen.endIf();
        else
          this.gen.else();
      }
      fail$data(condition) {
        if (!this.$data)
          return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
      }
      error(append, errorParams, errorPaths) {
        if (errorParams) {
          this.setParams(errorParams);
          this._error(append, errorPaths);
          this.setParams({});
          return;
        }
        this._error(append, errorPaths);
      }
      _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
      }
      $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
      }
      reset() {
        if (this.errsCount === void 0)
          throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
      }
      ok(cond) {
        if (!this.allErrors)
          this.gen.if(cond);
      }
      setParams(obj, assign) {
        if (assign)
          Object.assign(this.params, obj);
        else
          this.params = obj;
      }
      block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
          this.check$data(valid, $dataValid);
          codeBlock();
        });
      }
      check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
          return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
          gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
          gen.elseIf(this.invalid$data());
          this.$dataError();
          if (valid !== codegen_1.nil)
            gen.assign(valid, false);
        }
        gen.else();
      }
      invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
          if (schemaType.length) {
            if (!(schemaCode instanceof codegen_1.Name))
              throw new Error("ajv implementation error");
            const st = Array.isArray(schemaType) ? schemaType : [schemaType];
            return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
          }
          return codegen_1.nil;
        }
        function invalid$DataSchema() {
          if (def.validateSchema) {
            const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
            return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
          }
          return codegen_1.nil;
        }
      }
      subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: void 0, props: void 0 };
        subschemaCode(nextContext, valid);
        return nextContext;
      }
      mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
          return;
        if (it.props !== true && schemaCxt.props !== void 0) {
          it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== void 0) {
          it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
      }
      mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
          gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
          return true;
        }
      }
    };
    exports.KeywordCxt = KeywordCxt;
    function keywordCode(it, keyword, def, ruleType) {
      const cxt = new KeywordCxt(it, def, keyword);
      if ("code" in def) {
        def.code(cxt, ruleType);
      } else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      } else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
      } else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      }
    }
    var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
    var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, { dataLevel, dataNames, dataPathArr }) {
      let jsonPointer;
      let data;
      if ($data === "")
        return names_1.default.rootData;
      if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
      } else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
          if (up >= dataLevel)
            throw new Error(errorMsg("property/index", up));
          return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
          throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
          return data;
      }
      let expr = data;
      const segments = jsonPointer.split("/");
      for (const segment of segments) {
        if (segment) {
          data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
          expr = (0, codegen_1._)`${expr} && ${data}`;
        }
      }
      return expr;
      function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
      }
    }
    exports.getData = getData;
  }
});
var require_validation_error = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/runtime/validation_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidationError = class extends Error {
      constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
      }
    };
    exports.default = ValidationError;
  }
});
var require_ref_error = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/ref_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var resolve_1 = require_resolve();
    var MissingRefError = class extends Error {
      constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
      }
    };
    exports.default = MissingRefError;
  }
});
var require_compile = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/compile/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
    var codegen_1 = require_codegen();
    var validation_error_1 = require_validation_error();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var validate_1 = require_validate();
    var SchemaEnv = class {
      constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
          schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
      }
    };
    exports.SchemaEnv = SchemaEnv;
    function compileSchema(sch) {
      const _sch = getCompilingSchema.call(this, sch);
      if (_sch)
        return _sch;
      const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
      const { es5, lines } = this.opts.code;
      const { ownProperties } = this.opts;
      const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
      let _ValidationError;
      if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
          ref: validation_error_1.default,
          code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
        });
      }
      const validateName = gen.scopeName("validate");
      sch.validateName = validateName;
      const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        // TODO can its length be used as dataLevel if nil is removed?
        dataLevel: 0,
        dataTypes: [],
        definedProperties: /* @__PURE__ */ new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) } : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._)`""`,
        opts: this.opts,
        self: this
      };
      let sourceCode;
      try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        if (this.opts.code.process)
          sourceCode = this.opts.code.process(sourceCode, sch);
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
          validate.$async = true;
        if (this.opts.code.source === true) {
          validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
          const { props, items } = schemaCxt;
          validate.evaluated = {
            props: props instanceof codegen_1.Name ? void 0 : props,
            items: items instanceof codegen_1.Name ? void 0 : items,
            dynamicProps: props instanceof codegen_1.Name,
            dynamicItems: items instanceof codegen_1.Name
          };
          if (validate.source)
            validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
      } catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
          this.logger.error("Error compiling schema, function code:", sourceCode);
        throw e;
      } finally {
        this._compilations.delete(sch);
      }
    }
    exports.compileSchema = compileSchema;
    function resolveRef(root, baseId, ref) {
      var _a;
      ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
      const schOrFunc = root.refs[ref];
      if (schOrFunc)
        return schOrFunc;
      let _sch = resolve.call(this, root, ref);
      if (_sch === void 0) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref];
        const { schemaId } = this.opts;
        if (schema)
          _sch = new SchemaEnv({ schema, schemaId, root, baseId });
      }
      if (_sch === void 0)
        return;
      return root.refs[ref] = inlineOrCompile.call(this, _sch);
    }
    exports.resolveRef = resolveRef;
    function inlineOrCompile(sch) {
      if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
      return sch.validate ? sch : compileSchema.call(this, sch);
    }
    function getCompilingSchema(schEnv) {
      for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
          return sch;
      }
    }
    exports.getCompilingSchema = getCompilingSchema;
    function sameSchemaEnv(s1, s2) {
      return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
    }
    function resolve(root, ref) {
      let sch;
      while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
      return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
    }
    function resolveSchema(root, ref) {
      const p = this.opts.uriResolver.parse(ref);
      const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
      let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
      if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
      }
      const id = (0, resolve_1.normalizeId)(refPath);
      const schOrRef = this.refs[id] || this.schemas[id];
      if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
          return;
        return getJsonPointer.call(this, p, sch);
      }
      if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
      if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
      if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
      }
      return getJsonPointer.call(this, p, schOrRef);
    }
    exports.resolveSchema = resolveSchema;
    var PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
      "properties",
      "patternProperties",
      "enum",
      "dependencies",
      "definitions"
    ]);
    function getJsonPointer(parsedRef, { baseId, schema, root }) {
      var _a;
      if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
      for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean")
          return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === void 0)
          return;
        schema = partSchema;
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
      }
      let env;
      if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
      }
      const { schemaId } = this.opts;
      env = env || new SchemaEnv({ schema, schemaId, root, baseId });
      if (env.schema !== env.root.schema)
        return env;
      return void 0;
    }
  }
});
var require_data = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/refs/data.json"(exports, module) {
    module.exports = {
      $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
      description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
      type: "object",
      required: ["$data"],
      properties: {
        $data: {
          type: "string",
          anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
        }
      },
      additionalProperties: false
    };
  }
});
var require_uri_all = __commonJS2({
  "../../node_modules/.pnpm/uri-js@4.4.1/node_modules/uri-js/dist/es5/uri.all.js"(exports, module) {
    "use strict";
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global.URI = global.URI || {});
    })(exports, function(exports2) {
      "use strict";
      function merge() {
        for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
          sets[_key] = arguments[_key];
        }
        if (sets.length > 1) {
          sets[0] = sets[0].slice(0, -1);
          var xl = sets.length - 1;
          for (var x = 1; x < xl; ++x) {
            sets[x] = sets[x].slice(1, -1);
          }
          sets[xl] = sets[xl].slice(1);
          return sets.join("");
        } else {
          return sets[0];
        }
      }
      function subexp(str) {
        return "(?:" + str + ")";
      }
      function typeOf(o) {
        return o === void 0 ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
      }
      function toUpperCase(str) {
        return str.toUpperCase();
      }
      function toArray2(obj) {
        return obj !== void 0 && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
      }
      function assign(target, source) {
        var obj = target;
        if (source) {
          for (var key in source) {
            obj[key] = source[key];
          }
        }
        return obj;
      }
      function buildExps(isIRI2) {
        var ALPHA$$ = "[A-Za-z]", CR$ = "[\\x0D]", DIGIT$$ = "[0-9]", DQUOTE$$ = "[\\x22]", HEXDIG$$2 = merge(DIGIT$$, "[A-Fa-f]"), LF$$ = "[\\x0A]", SP$$ = "[\\x20]", PCT_ENCODED$2 = subexp(subexp("%[EFef]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%" + HEXDIG$$2 + HEXDIG$$2)), GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]", SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$), UCSCHAR$$ = isIRI2 ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", IPRIVATE$$ = isIRI2 ? "[\\uE000-\\uF8FF]" : "[]", UNRESERVED$$2 = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$), SCHEME$ = subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*"), USERINFO$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]")) + "*"), DEC_OCTET$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("[1-9]" + DIGIT$$) + "|" + DIGIT$$), DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$), IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$), H16$ = subexp(HEXDIG$$2 + "{1,4}"), LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$), IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$), IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$), IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$), IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$), IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$), IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$), IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$), IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$), IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"), IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")), ZONEID$ = subexp(subexp(UNRESERVED$$2 + "|" + PCT_ENCODED$2) + "+"), IPV6ADDRZ$ = subexp(IPV6ADDRESS$ + "\\%25" + ZONEID$), IPV6ADDRZ_RELAXED$ = subexp(IPV6ADDRESS$ + subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + ZONEID$), IPVFUTURE$ = subexp("[vV]" + HEXDIG$$2 + "+\\." + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]") + "+"), IP_LITERAL$ = subexp("\\[" + subexp(IPV6ADDRZ_RELAXED$ + "|" + IPV6ADDRESS$ + "|" + IPVFUTURE$) + "\\]"), REG_NAME$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$)) + "*"), HOST$ = subexp(IP_LITERAL$ + "|" + IPV4ADDRESS$ + "(?!" + REG_NAME$ + ")|" + REG_NAME$), PORT$ = subexp(DIGIT$$ + "*"), AUTHORITY$ = subexp(subexp(USERINFO$ + "@") + "?" + HOST$ + subexp("\\:" + PORT$) + "?"), PCHAR$ = subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@]")), SEGMENT$ = subexp(PCHAR$ + "*"), SEGMENT_NZ$ = subexp(PCHAR$ + "+"), SEGMENT_NZ_NC$ = subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\@]")) + "+"), PATH_ABEMPTY$ = subexp(subexp("\\/" + SEGMENT$) + "*"), PATH_ABSOLUTE$ = subexp("\\/" + subexp(SEGMENT_NZ$ + PATH_ABEMPTY$) + "?"), PATH_NOSCHEME$ = subexp(SEGMENT_NZ_NC$ + PATH_ABEMPTY$), PATH_ROOTLESS$ = subexp(SEGMENT_NZ$ + PATH_ABEMPTY$), PATH_EMPTY$ = "(?!" + PCHAR$ + ")", PATH$ = subexp(PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), QUERY$ = subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*"), FRAGMENT$ = subexp(subexp(PCHAR$ + "|[\\/\\?]") + "*"), HIER_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$), URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"), RELATIVE_PART$ = subexp(subexp("\\/\\/" + AUTHORITY$ + PATH_ABEMPTY$) + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$), RELATIVE$ = subexp(RELATIVE_PART$ + subexp("\\?" + QUERY$) + "?" + subexp("\\#" + FRAGMENT$) + "?"), URI_REFERENCE$ = subexp(URI$ + "|" + RELATIVE$), ABSOLUTE_URI$ = subexp(SCHEME$ + "\\:" + HIER_PART$ + subexp("\\?" + QUERY$) + "?"), GENERIC_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", RELATIVE_REF$ = "^(){0}" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_NOSCHEME$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", ABSOLUTE_REF$ = "^(" + SCHEME$ + ")\\:" + subexp(subexp("\\/\\/(" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?)") + "?(" + PATH_ABEMPTY$ + "|" + PATH_ABSOLUTE$ + "|" + PATH_ROOTLESS$ + "|" + PATH_EMPTY$ + ")") + subexp("\\?(" + QUERY$ + ")") + "?$", SAMEDOC_REF$ = "^" + subexp("\\#(" + FRAGMENT$ + ")") + "?$", AUTHORITY_REF$ = "^" + subexp("(" + USERINFO$ + ")@") + "?(" + HOST$ + ")" + subexp("\\:(" + PORT$ + ")") + "?$";
        return {
          NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
          NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
          NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
          ESCAPE: new RegExp(merge("[^]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
          UNRESERVED: new RegExp(UNRESERVED$$2, "g"),
          OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$2, RESERVED$$), "g"),
          PCT_ENCODED: new RegExp(PCT_ENCODED$2, "g"),
          IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
          IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$")
          //RFC 6874, with relaxed parsing rules
        };
      }
      var URI_PROTOCOL = buildExps(false);
      var IRI_PROTOCOL = buildExps(true);
      var slicedToArray = /* @__PURE__ */ function() {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = void 0;
          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"])
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        }
        return function(arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();
      var toConsumableArray = function(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
            arr2[i] = arr[i];
          return arr2;
        } else {
          return Array.from(arr);
        }
      };
      var maxInt = 2147483647;
      var base = 36;
      var tMin = 1;
      var tMax = 26;
      var skew = 38;
      var damp = 700;
      var initialBias = 72;
      var initialN = 128;
      var delimiter = "-";
      var regexPunycode = /^xn--/;
      var regexNonASCII = /[^\0-\x7E]/;
      var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
      var errors = {
        "overflow": "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      };
      var baseMinusTMin = base - tMin;
      var floor = Math.floor;
      var stringFromCharCode = String.fromCharCode;
      function error$1(type) {
        throw new RangeError(errors[type]);
      }
      function map(array, fn) {
        var result = [];
        var length = array.length;
        while (length--) {
          result[length] = fn(array[length]);
        }
        return result;
      }
      function mapDomain(string, fn) {
        var parts = string.split("@");
        var result = "";
        if (parts.length > 1) {
          result = parts[0] + "@";
          string = parts[1];
        }
        string = string.replace(regexSeparators, ".");
        var labels = string.split(".");
        var encoded = map(labels, fn).join(".");
        return result + encoded;
      }
      function ucs2decode(string) {
        var output = [];
        var counter = 0;
        var length = string.length;
        while (counter < length) {
          var value = string.charCodeAt(counter++);
          if (value >= 55296 && value <= 56319 && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
            } else {
              output.push(value);
              counter--;
            }
          } else {
            output.push(value);
          }
        }
        return output;
      }
      var ucs2encode = function ucs2encode2(array) {
        return String.fromCodePoint.apply(String, toConsumableArray(array));
      };
      var basicToDigit = function basicToDigit2(codePoint) {
        if (codePoint - 48 < 10) {
          return codePoint - 22;
        }
        if (codePoint - 65 < 26) {
          return codePoint - 65;
        }
        if (codePoint - 97 < 26) {
          return codePoint - 97;
        }
        return base;
      };
      var digitToBasic = function digitToBasic2(digit, flag) {
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
      };
      var adapt = function adapt2(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for (
          ;
          /* no initialization */
          delta > baseMinusTMin * tMax >> 1;
          k += base
        ) {
          delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
      };
      var decode = function decode2(input) {
        var output = [];
        var inputLength = input.length;
        var i = 0;
        var n = initialN;
        var bias = initialBias;
        var basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
          basic = 0;
        }
        for (var j = 0; j < basic; ++j) {
          if (input.charCodeAt(j) >= 128) {
            error$1("not-basic");
          }
          output.push(input.charCodeAt(j));
        }
        for (var index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
          var oldi = i;
          for (
            var w = 1, k = base;
            ;
            /* no condition */
            k += base
          ) {
            if (index >= inputLength) {
              error$1("invalid-input");
            }
            var digit = basicToDigit(input.charCodeAt(index++));
            if (digit >= base || digit > floor((maxInt - i) / w)) {
              error$1("overflow");
            }
            i += digit * w;
            var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (digit < t) {
              break;
            }
            var baseMinusT = base - t;
            if (w > floor(maxInt / baseMinusT)) {
              error$1("overflow");
            }
            w *= baseMinusT;
          }
          var out = output.length + 1;
          bias = adapt(i - oldi, out, oldi == 0);
          if (floor(i / out) > maxInt - n) {
            error$1("overflow");
          }
          n += floor(i / out);
          i %= out;
          output.splice(i++, 0, n);
        }
        return String.fromCodePoint.apply(String, output);
      };
      var encode = function encode2(input) {
        var output = [];
        input = ucs2decode(input);
        var inputLength = input.length;
        var n = initialN;
        var delta = 0;
        var bias = initialBias;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = void 0;
        try {
          for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _currentValue2 = _step.value;
            if (_currentValue2 < 128) {
              output.push(stringFromCharCode(_currentValue2));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        var basicLength = output.length;
        var handledCPCount = basicLength;
        if (basicLength) {
          output.push(delimiter);
        }
        while (handledCPCount < inputLength) {
          var m = maxInt;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = void 0;
          try {
            for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var currentValue = _step2.value;
              if (currentValue >= n && currentValue < m) {
                m = currentValue;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
          var handledCPCountPlusOne = handledCPCount + 1;
          if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
            error$1("overflow");
          }
          delta += (m - n) * handledCPCountPlusOne;
          n = m;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = void 0;
          try {
            for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var _currentValue = _step3.value;
              if (_currentValue < n && ++delta > maxInt) {
                error$1("overflow");
              }
              if (_currentValue == n) {
                var q = delta;
                for (
                  var k = base;
                  ;
                  /* no condition */
                  k += base
                ) {
                  var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t) {
                    break;
                  }
                  var qMinusT = q - t;
                  var baseMinusT = base - t;
                  output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
          ++delta;
          ++n;
        }
        return output.join("");
      };
      var toUnicode = function toUnicode2(input) {
        return mapDomain(input, function(string) {
          return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
      };
      var toASCII = function toASCII2(input) {
        return mapDomain(input, function(string) {
          return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
        });
      };
      var punycode = {
        /**
         * A string representing the current Punycode.js version number.
         * @memberOf punycode
         * @type String
         */
        "version": "2.1.0",
        /**
         * An object of methods to convert from JavaScript's internal character
         * representation (UCS-2) to Unicode code points, and back.
         * @see <https://mathiasbynens.be/notes/javascript-encoding>
         * @memberOf punycode
         * @type Object
         */
        "ucs2": {
          "decode": ucs2decode,
          "encode": ucs2encode
        },
        "decode": decode,
        "encode": encode,
        "toASCII": toASCII,
        "toUnicode": toUnicode
      };
      var SCHEMES = {};
      function pctEncChar(chr) {
        var c = chr.charCodeAt(0);
        var e = void 0;
        if (c < 16)
          e = "%0" + c.toString(16).toUpperCase();
        else if (c < 128)
          e = "%" + c.toString(16).toUpperCase();
        else if (c < 2048)
          e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        else
          e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
        return e;
      }
      function pctDecChars(str) {
        var newStr = "";
        var i = 0;
        var il = str.length;
        while (i < il) {
          var c = parseInt(str.substr(i + 1, 2), 16);
          if (c < 128) {
            newStr += String.fromCharCode(c);
            i += 3;
          } else if (c >= 194 && c < 224) {
            if (il - i >= 6) {
              var c2 = parseInt(str.substr(i + 4, 2), 16);
              newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
            } else {
              newStr += str.substr(i, 6);
            }
            i += 6;
          } else if (c >= 224) {
            if (il - i >= 9) {
              var _c = parseInt(str.substr(i + 4, 2), 16);
              var c3 = parseInt(str.substr(i + 7, 2), 16);
              newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
            } else {
              newStr += str.substr(i, 9);
            }
            i += 9;
          } else {
            newStr += str.substr(i, 3);
            i += 3;
          }
        }
        return newStr;
      }
      function _normalizeComponentEncoding(components, protocol) {
        function decodeUnreserved2(str) {
          var decStr = pctDecChars(str);
          return !decStr.match(protocol.UNRESERVED) ? str : decStr;
        }
        if (components.scheme)
          components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_SCHEME, "");
        if (components.userinfo !== void 0)
          components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.host !== void 0)
          components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.path !== void 0)
          components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.query !== void 0)
          components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        if (components.fragment !== void 0)
          components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
        return components;
      }
      function _stripLeadingZeros(str) {
        return str.replace(/^0*(.*)/, "$1") || "0";
      }
      function _normalizeIPv4(host, protocol) {
        var matches = host.match(protocol.IPV4ADDRESS) || [];
        var _matches = slicedToArray(matches, 2), address = _matches[1];
        if (address) {
          return address.split(".").map(_stripLeadingZeros).join(".");
        } else {
          return host;
        }
      }
      function _normalizeIPv6(host, protocol) {
        var matches = host.match(protocol.IPV6ADDRESS) || [];
        var _matches2 = slicedToArray(matches, 3), address = _matches2[1], zone = _matches2[2];
        if (address) {
          var _address$toLowerCase$ = address.toLowerCase().split("::").reverse(), _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2), last = _address$toLowerCase$2[0], first = _address$toLowerCase$2[1];
          var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
          var lastFields = last.split(":").map(_stripLeadingZeros);
          var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
          var fieldCount = isLastFieldIPv4Address ? 7 : 8;
          var lastFieldsStart = lastFields.length - fieldCount;
          var fields = Array(fieldCount);
          for (var x = 0; x < fieldCount; ++x) {
            fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || "";
          }
          if (isLastFieldIPv4Address) {
            fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
          }
          var allZeroFields = fields.reduce(function(acc, field, index) {
            if (!field || field === "0") {
              var lastLongest = acc[acc.length - 1];
              if (lastLongest && lastLongest.index + lastLongest.length === index) {
                lastLongest.length++;
              } else {
                acc.push({ index, length: 1 });
              }
            }
            return acc;
          }, []);
          var longestZeroFields = allZeroFields.sort(function(a, b) {
            return b.length - a.length;
          })[0];
          var newHost = void 0;
          if (longestZeroFields && longestZeroFields.length > 1) {
            var newFirst = fields.slice(0, longestZeroFields.index);
            var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
            newHost = newFirst.join(":") + "::" + newLast.join(":");
          } else {
            newHost = fields.join(":");
          }
          if (zone) {
            newHost += "%" + zone;
          }
          return newHost;
        } else {
          return host;
        }
      }
      var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
      var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === void 0;
      function parse(uriString) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var components = {};
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        if (options.reference === "suffix")
          uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
        var matches = uriString.match(URI_PARSE);
        if (matches) {
          if (NO_MATCH_IS_UNDEFINED) {
            components.scheme = matches[1];
            components.userinfo = matches[3];
            components.host = matches[4];
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = matches[7];
            components.fragment = matches[8];
            if (isNaN(components.port)) {
              components.port = matches[5];
            }
          } else {
            components.scheme = matches[1] || void 0;
            components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : void 0;
            components.host = uriString.indexOf("//") !== -1 ? matches[4] : void 0;
            components.port = parseInt(matches[5], 10);
            components.path = matches[6] || "";
            components.query = uriString.indexOf("?") !== -1 ? matches[7] : void 0;
            components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : void 0;
            if (isNaN(components.port)) {
              components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : void 0;
            }
          }
          if (components.host) {
            components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
          }
          if (components.scheme === void 0 && components.userinfo === void 0 && components.host === void 0 && components.port === void 0 && !components.path && components.query === void 0) {
            components.reference = "same-document";
          } else if (components.scheme === void 0) {
            components.reference = "relative";
          } else if (components.fragment === void 0) {
            components.reference = "absolute";
          } else {
            components.reference = "uri";
          }
          if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
            components.error = components.error || "URI is not a " + options.reference + " reference.";
          }
          var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
          if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
            if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
              try {
                components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
              } catch (e) {
                components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
              }
            }
            _normalizeComponentEncoding(components, URI_PROTOCOL);
          } else {
            _normalizeComponentEncoding(components, protocol);
          }
          if (schemeHandler && schemeHandler.parse) {
            schemeHandler.parse(components, options);
          }
        } else {
          components.error = components.error || "URI can not be parsed.";
        }
        return components;
      }
      function _recomposeAuthority(components, options) {
        var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        if (components.userinfo !== void 0) {
          uriTokens.push(components.userinfo);
          uriTokens.push("@");
        }
        if (components.host !== void 0) {
          uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function(_, $1, $2) {
            return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
          }));
        }
        if (typeof components.port === "number" || typeof components.port === "string") {
          uriTokens.push(":");
          uriTokens.push(String(components.port));
        }
        return uriTokens.length ? uriTokens.join("") : void 0;
      }
      var RDS1 = /^\.\.?\//;
      var RDS2 = /^\/\.(\/|$)/;
      var RDS3 = /^\/\.\.(\/|$)/;
      var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
      function removeDotSegments(input) {
        var output = [];
        while (input.length) {
          if (input.match(RDS1)) {
            input = input.replace(RDS1, "");
          } else if (input.match(RDS2)) {
            input = input.replace(RDS2, "/");
          } else if (input.match(RDS3)) {
            input = input.replace(RDS3, "/");
            output.pop();
          } else if (input === "." || input === "..") {
            input = "";
          } else {
            var im = input.match(RDS5);
            if (im) {
              var s = im[0];
              input = input.slice(s.length);
              output.push(s);
            } else {
              throw new Error("Unexpected dot segment condition");
            }
          }
        }
        return output.join("");
      }
      function serialize(components) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
        var uriTokens = [];
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        if (schemeHandler && schemeHandler.serialize)
          schemeHandler.serialize(components, options);
        if (components.host) {
          if (protocol.IPV6ADDRESS.test(components.host)) {
          } else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
            try {
              components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
            } catch (e) {
              components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
            }
          }
        }
        _normalizeComponentEncoding(components, protocol);
        if (options.reference !== "suffix" && components.scheme) {
          uriTokens.push(components.scheme);
          uriTokens.push(":");
        }
        var authority = _recomposeAuthority(components, options);
        if (authority !== void 0) {
          if (options.reference !== "suffix") {
            uriTokens.push("//");
          }
          uriTokens.push(authority);
          if (components.path && components.path.charAt(0) !== "/") {
            uriTokens.push("/");
          }
        }
        if (components.path !== void 0) {
          var s = components.path;
          if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
            s = removeDotSegments(s);
          }
          if (authority === void 0) {
            s = s.replace(/^\/\//, "/%2F");
          }
          uriTokens.push(s);
        }
        if (components.query !== void 0) {
          uriTokens.push("?");
          uriTokens.push(components.query);
        }
        if (components.fragment !== void 0) {
          uriTokens.push("#");
          uriTokens.push(components.fragment);
        }
        return uriTokens.join("");
      }
      function resolveComponents(base2, relative) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var skipNormalization = arguments[3];
        var target = {};
        if (!skipNormalization) {
          base2 = parse(serialize(base2, options), options);
          relative = parse(serialize(relative, options), options);
        }
        options = options || {};
        if (!options.tolerant && relative.scheme) {
          target.scheme = relative.scheme;
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
            target.userinfo = relative.userinfo;
            target.host = relative.host;
            target.port = relative.port;
            target.path = removeDotSegments(relative.path || "");
            target.query = relative.query;
          } else {
            if (!relative.path) {
              target.path = base2.path;
              if (relative.query !== void 0) {
                target.query = relative.query;
              } else {
                target.query = base2.query;
              }
            } else {
              if (relative.path.charAt(0) === "/") {
                target.path = removeDotSegments(relative.path);
              } else {
                if ((base2.userinfo !== void 0 || base2.host !== void 0 || base2.port !== void 0) && !base2.path) {
                  target.path = "/" + relative.path;
                } else if (!base2.path) {
                  target.path = relative.path;
                } else {
                  target.path = base2.path.slice(0, base2.path.lastIndexOf("/") + 1) + relative.path;
                }
                target.path = removeDotSegments(target.path);
              }
              target.query = relative.query;
            }
            target.userinfo = base2.userinfo;
            target.host = base2.host;
            target.port = base2.port;
          }
          target.scheme = base2.scheme;
        }
        target.fragment = relative.fragment;
        return target;
      }
      function resolve(baseURI, relativeURI, options) {
        var schemelessOptions = assign({ scheme: "null" }, options);
        return serialize(resolveComponents(parse(baseURI, schemelessOptions), parse(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
      }
      function normalize(uri, options) {
        if (typeof uri === "string") {
          uri = serialize(parse(uri, options), options);
        } else if (typeOf(uri) === "object") {
          uri = parse(serialize(uri, options), options);
        }
        return uri;
      }
      function equal(uriA, uriB, options) {
        if (typeof uriA === "string") {
          uriA = serialize(parse(uriA, options), options);
        } else if (typeOf(uriA) === "object") {
          uriA = serialize(uriA, options);
        }
        if (typeof uriB === "string") {
          uriB = serialize(parse(uriB, options), options);
        } else if (typeOf(uriB) === "object") {
          uriB = serialize(uriB, options);
        }
        return uriA === uriB;
      }
      function escapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
      }
      function unescapeComponent(str, options) {
        return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
      }
      var handler = {
        scheme: "http",
        domainHost: true,
        parse: function parse2(components, options) {
          if (!components.host) {
            components.error = components.error || "HTTP URIs must have a host.";
          }
          return components;
        },
        serialize: function serialize2(components, options) {
          var secure = String(components.scheme).toLowerCase() === "https";
          if (components.port === (secure ? 443 : 80) || components.port === "") {
            components.port = void 0;
          }
          if (!components.path) {
            components.path = "/";
          }
          return components;
        }
      };
      var handler$1 = {
        scheme: "https",
        domainHost: handler.domainHost,
        parse: handler.parse,
        serialize: handler.serialize
      };
      function isSecure(wsComponents) {
        return typeof wsComponents.secure === "boolean" ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
      }
      var handler$2 = {
        scheme: "ws",
        domainHost: true,
        parse: function parse2(components, options) {
          var wsComponents = components;
          wsComponents.secure = isSecure(wsComponents);
          wsComponents.resourceName = (wsComponents.path || "/") + (wsComponents.query ? "?" + wsComponents.query : "");
          wsComponents.path = void 0;
          wsComponents.query = void 0;
          return wsComponents;
        },
        serialize: function serialize2(wsComponents, options) {
          if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
            wsComponents.port = void 0;
          }
          if (typeof wsComponents.secure === "boolean") {
            wsComponents.scheme = wsComponents.secure ? "wss" : "ws";
            wsComponents.secure = void 0;
          }
          if (wsComponents.resourceName) {
            var _wsComponents$resourc = wsComponents.resourceName.split("?"), _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2), path = _wsComponents$resourc2[0], query = _wsComponents$resourc2[1];
            wsComponents.path = path && path !== "/" ? path : void 0;
            wsComponents.query = query;
            wsComponents.resourceName = void 0;
          }
          wsComponents.fragment = void 0;
          return wsComponents;
        }
      };
      var handler$3 = {
        scheme: "wss",
        domainHost: handler$2.domainHost,
        parse: handler$2.parse,
        serialize: handler$2.serialize
      };
      var O = {};
      var isIRI = true;
      var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~" + (isIRI ? "\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF" : "") + "]";
      var HEXDIG$$ = "[0-9A-Fa-f]";
      var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$));
      var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
      var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
      var VCHAR$$ = merge(QTEXT$$, '[\\"\\\\]');
      var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
      var UNRESERVED = new RegExp(UNRESERVED$$, "g");
      var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
      var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
      var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
      var NOT_HFVALUE = NOT_HFNAME;
      function decodeUnreserved(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(UNRESERVED) ? str : decStr;
      }
      var handler$4 = {
        scheme: "mailto",
        parse: function parse$$1(components, options) {
          var mailtoComponents = components;
          var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
          mailtoComponents.path = void 0;
          if (mailtoComponents.query) {
            var unknownHeaders = false;
            var headers = {};
            var hfields = mailtoComponents.query.split("&");
            for (var x = 0, xl = hfields.length; x < xl; ++x) {
              var hfield = hfields[x].split("=");
              switch (hfield[0]) {
                case "to":
                  var toAddrs = hfield[1].split(",");
                  for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                    to.push(toAddrs[_x]);
                  }
                  break;
                case "subject":
                  mailtoComponents.subject = unescapeComponent(hfield[1], options);
                  break;
                case "body":
                  mailtoComponents.body = unescapeComponent(hfield[1], options);
                  break;
                default:
                  unknownHeaders = true;
                  headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                  break;
              }
            }
            if (unknownHeaders)
              mailtoComponents.headers = headers;
          }
          mailtoComponents.query = void 0;
          for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
            var addr = to[_x2].split("@");
            addr[0] = unescapeComponent(addr[0]);
            if (!options.unicodeSupport) {
              try {
                addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
              } catch (e) {
                mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
              }
            } else {
              addr[1] = unescapeComponent(addr[1], options).toLowerCase();
            }
            to[_x2] = addr.join("@");
          }
          return mailtoComponents;
        },
        serialize: function serialize$$1(mailtoComponents, options) {
          var components = mailtoComponents;
          var to = toArray2(mailtoComponents.to);
          if (to) {
            for (var x = 0, xl = to.length; x < xl; ++x) {
              var toAddr = String(to[x]);
              var atIdx = toAddr.lastIndexOf("@");
              var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
              var domain = toAddr.slice(atIdx + 1);
              try {
                domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
              } catch (e) {
                components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
              }
              to[x] = localPart + "@" + domain;
            }
            components.path = to.join(",");
          }
          var headers = mailtoComponents.headers = mailtoComponents.headers || {};
          if (mailtoComponents.subject)
            headers["subject"] = mailtoComponents.subject;
          if (mailtoComponents.body)
            headers["body"] = mailtoComponents.body;
          var fields = [];
          for (var name in headers) {
            if (headers[name] !== O[name]) {
              fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
            }
          }
          if (fields.length) {
            components.query = fields.join("&");
          }
          return components;
        }
      };
      var URN_PARSE = /^([^\:]+)\:(.*)/;
      var handler$5 = {
        scheme: "urn",
        parse: function parse$$1(components, options) {
          var matches = components.path && components.path.match(URN_PARSE);
          var urnComponents = components;
          if (matches) {
            var scheme = options.scheme || urnComponents.scheme || "urn";
            var nid = matches[1].toLowerCase();
            var nss = matches[2];
            var urnScheme = scheme + ":" + (options.nid || nid);
            var schemeHandler = SCHEMES[urnScheme];
            urnComponents.nid = nid;
            urnComponents.nss = nss;
            urnComponents.path = void 0;
            if (schemeHandler) {
              urnComponents = schemeHandler.parse(urnComponents, options);
            }
          } else {
            urnComponents.error = urnComponents.error || "URN can not be parsed.";
          }
          return urnComponents;
        },
        serialize: function serialize$$1(urnComponents, options) {
          var scheme = options.scheme || urnComponents.scheme || "urn";
          var nid = urnComponents.nid;
          var urnScheme = scheme + ":" + (options.nid || nid);
          var schemeHandler = SCHEMES[urnScheme];
          if (schemeHandler) {
            urnComponents = schemeHandler.serialize(urnComponents, options);
          }
          var uriComponents = urnComponents;
          var nss = urnComponents.nss;
          uriComponents.path = (nid || options.nid) + ":" + nss;
          return uriComponents;
        }
      };
      var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
      var handler$6 = {
        scheme: "urn:uuid",
        parse: function parse2(urnComponents, options) {
          var uuidComponents = urnComponents;
          uuidComponents.uuid = uuidComponents.nss;
          uuidComponents.nss = void 0;
          if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
            uuidComponents.error = uuidComponents.error || "UUID is not valid.";
          }
          return uuidComponents;
        },
        serialize: function serialize2(uuidComponents, options) {
          var urnComponents = uuidComponents;
          urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
          return urnComponents;
        }
      };
      SCHEMES[handler.scheme] = handler;
      SCHEMES[handler$1.scheme] = handler$1;
      SCHEMES[handler$2.scheme] = handler$2;
      SCHEMES[handler$3.scheme] = handler$3;
      SCHEMES[handler$4.scheme] = handler$4;
      SCHEMES[handler$5.scheme] = handler$5;
      SCHEMES[handler$6.scheme] = handler$6;
      exports2.SCHEMES = SCHEMES;
      exports2.pctEncChar = pctEncChar;
      exports2.pctDecChars = pctDecChars;
      exports2.parse = parse;
      exports2.removeDotSegments = removeDotSegments;
      exports2.serialize = serialize;
      exports2.resolveComponents = resolveComponents;
      exports2.resolve = resolve;
      exports2.normalize = normalize;
      exports2.equal = equal;
      exports2.escapeComponent = escapeComponent;
      exports2.unescapeComponent = unescapeComponent;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});
var require_uri = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/runtime/uri.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uri = require_uri_all();
    uri.code = 'require("ajv/dist/runtime/uri").default';
    exports.default = uri;
  }
});
var require_core = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    var validate_1 = require_validate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    var ref_error_1 = require_ref_error();
    var rules_1 = require_rules();
    var compile_1 = require_compile();
    var codegen_2 = require_codegen();
    var resolve_1 = require_resolve();
    var dataType_1 = require_dataType();
    var util_1 = require_util();
    var $dataRefSchema = require_data();
    var uri_1 = require_uri();
    var defaultRegExp = (str, flags) => new RegExp(str, flags);
    defaultRegExp.code = "new RegExp";
    var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    var EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]);
    var removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    };
    var deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    };
    var MAX_EXPRESSION = 200;
    function requiredOptions(o) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
      const s = o.strict;
      const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
      const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
      const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
      const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
      return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver
      };
    }
    var Ajv2 = class {
      constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = {};
        this._compilations = /* @__PURE__ */ new Set();
        this._loading = {};
        this._cache = /* @__PURE__ */ new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
          addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
          addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
          this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
          _dataRefSchema = { ...$dataRefSchema };
          _dataRefSchema.id = _dataRefSchema.$id;
          delete _dataRefSchema.$id;
        }
        if (meta && $data)
          this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
      }
      defaultMeta() {
        const { meta, schemaId } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
      }
      validate(schemaKeyRef, data) {
        let v;
        if (typeof schemaKeyRef == "string") {
          v = this.getSchema(schemaKeyRef);
          if (!v)
            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else {
          v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
          this.errors = v.errors;
        return valid;
      }
      compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
          throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema: loadSchema2 } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
          await loadMetaSchema.call(this, _schema.$schema);
          const sch = this._addSchema(_schema, _meta);
          return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
          if ($ref && !this.getSchema($ref)) {
            await runCompileAsync.call(this, { $ref }, true);
          }
        }
        async function _compileAsync(sch) {
          try {
            return this._compileSchemaEnv(sch);
          } catch (e) {
            if (!(e instanceof ref_error_1.default))
              throw e;
            checkLoaded.call(this, e);
            await loadMissingSchema.call(this, e.missingSchema);
            return _compileAsync.call(this, sch);
          }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
          if (this.refs[ref]) {
            throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
          }
        }
        async function loadMissingSchema(ref) {
          const _schema = await _loadSchema.call(this, ref);
          if (!this.refs[ref])
            await loadMetaSchema.call(this, _schema.$schema);
          if (!this.refs[ref])
            this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
          const p = this._loading[ref];
          if (p)
            return p;
          try {
            return await (this._loading[ref] = loadSchema2(ref));
          } finally {
            delete this._loading[ref];
          }
        }
      }
      // Adds schema to the instance
      addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema)) {
          for (const sch of schema)
            this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id;
        if (typeof schema === "object") {
          const { schemaId } = this.opts;
          id = schema[schemaId];
          if (id !== void 0 && typeof id != "string") {
            throw new Error(`schema ${schemaId} must be string`);
          }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
      }
      //  Validate schema against its meta-schema
      validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
          return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== void 0 && typeof $schema != "string") {
          throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
          this.logger.warn("meta-schema not available");
          this.errors = null;
          return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
          const message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(message);
          else
            throw new Error(message);
        }
        return valid;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
          keyRef = sch;
        if (sch === void 0) {
          const { schemaId } = this.opts;
          const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
          sch = compile_1.resolveSchema.call(this, root, keyRef);
          if (!sch)
            return;
          this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
          this._removeAllSchemas(this.schemas, schemaKeyRef);
          this._removeAllSchemas(this.refs, schemaKeyRef);
          return this;
        }
        switch (typeof schemaKeyRef) {
          case "undefined":
            this._removeAllSchemas(this.schemas);
            this._removeAllSchemas(this.refs);
            this._cache.clear();
            return this;
          case "string": {
            const sch = getSchEnv.call(this, schemaKeyRef);
            if (typeof sch == "object")
              this._cache.delete(sch.schema);
            delete this.schemas[schemaKeyRef];
            delete this.refs[schemaKeyRef];
            return this;
          }
          case "object": {
            const cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id = schemaKeyRef[this.opts.schemaId];
            if (id) {
              id = (0, resolve_1.normalizeId)(id);
              delete this.schemas[id];
              delete this.refs[id];
            }
            return this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(definitions) {
        for (const def of definitions)
          this.addKeyword(def);
        return this;
      }
      addKeyword(kwdOrDef, def) {
        let keyword;
        if (typeof kwdOrDef == "string") {
          keyword = kwdOrDef;
          if (typeof def == "object") {
            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
            def.keyword = keyword;
          }
        } else if (typeof kwdOrDef == "object" && def === void 0) {
          def = kwdOrDef;
          keyword = def.keyword;
          if (Array.isArray(keyword) && !keyword.length) {
            throw new Error("addKeywords: keyword must be string or non-empty array");
          }
        } else {
          throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
          (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
          return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
          ...def,
          type: (0, dataType_1.getJSONTypes)(def.type),
          schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
      }
      getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
      }
      // Remove keyword
      removeKeyword(keyword) {
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
          const i = group.rules.findIndex((rule) => rule.keyword === keyword);
          if (i >= 0)
            group.rules.splice(i, 1);
        }
        return this;
      }
      // Add format
      addFormat(name, format) {
        if (typeof format == "string")
          format = new RegExp(format);
        this.formats[name] = format;
        return this;
      }
      errorsText(errors = this.errors, { separator = ", ", dataVar = "data" } = {}) {
        if (!errors || errors.length === 0)
          return "No errors";
        return errors.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
          const segments = jsonPointer.split("/").slice(1);
          let keywords = metaSchema;
          for (const seg of segments)
            keywords = keywords[seg];
          for (const key in rules) {
            const rule = rules[key];
            if (typeof rule != "object")
              continue;
            const { $data } = rule.definition;
            const schema = keywords[key];
            if ($data && schema)
              keywords[key] = schemaOrData(schema);
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
          const sch = schemas[keyRef];
          if (!regex || regex.test(keyRef)) {
            if (typeof sch == "string") {
              delete schemas[keyRef];
            } else if (sch && !sch.meta) {
              this._cache.delete(sch.schema);
              delete schemas[keyRef];
            }
          }
        }
      }
      _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
          id = schema[schemaId];
        } else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          else if (typeof schema != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== void 0)
          return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
          if (baseId)
            this._checkUnique(baseId);
          this.refs[baseId] = sch;
        }
        if (validateSchema)
          this.validateSchema(schema, true);
        return sch;
      }
      _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
          throw new Error(`schema with key or id "${id}" already exists`);
        }
      }
      _compileSchemaEnv(sch) {
        if (sch.meta)
          this._compileMetaSchema(sch);
        else
          compile_1.compileSchema.call(this, sch);
        if (!sch.validate)
          throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_1.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    };
    Ajv2.ValidationError = validation_error_1.default;
    Ajv2.MissingRefError = ref_error_1.default;
    exports.default = Ajv2;
    function checkOptions(checkOpts, options, msg, log = "error") {
      for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
          this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
      }
    }
    function getSchEnv(keyRef) {
      keyRef = (0, resolve_1.normalizeId)(keyRef);
      return this.schemas[keyRef] || this.refs[keyRef];
    }
    function addInitialSchemas() {
      const optsSchemas = this.opts.schemas;
      if (!optsSchemas)
        return;
      if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
      else
        for (const key in optsSchemas)
          this.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats() {
      for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
          this.addFormat(name, format);
      }
    }
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
          def.keyword = keyword;
        this.addKeyword(def);
      }
    }
    function getMetaSchemaOptions() {
      const metaOpts = { ...this.opts };
      for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
      return metaOpts;
    }
    var noLogs = { log() {
    }, warn() {
    }, error() {
    } };
    function getLogger(logger) {
      if (logger === false)
        return noLogs;
      if (logger === void 0)
        return console;
      if (logger.log && logger.warn && logger.error)
        return logger;
      throw new Error("logger must implement log, warn and error methods");
    }
    var KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword, def) {
      const { RULES } = this;
      (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
          throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
          throw new Error(`Keyword ${kwd} has invalid name`);
      });
      if (!def)
        return;
      if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
      }
    }
    function addRule(keyword, definition, dataType) {
      var _a;
      const post = definition === null || definition === void 0 ? void 0 : definition.post;
      if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES } = this;
      let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
      if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
      }
      RULES.keywords[keyword] = true;
      if (!definition)
        return;
      const rule = {
        keyword,
        definition: {
          ...definition,
          type: (0, dataType_1.getJSONTypes)(definition.type),
          schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
        }
      };
      if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
      else
        ruleGroup.rules.push(rule);
      RULES.all[keyword] = rule;
      (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule, before) {
      const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
      } else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
      }
    }
    function keywordMetaschema(def) {
      let { metaSchema } = def;
      if (metaSchema === void 0)
        return;
      if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
      def.validateSchema = this.compile(metaSchema, true);
    }
    var $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema) {
      return { anyOf: [schema, $dataRef] };
    }
  }
});
var require_id = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/core/id.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var def = {
      keyword: "id",
      code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
      }
    };
    exports.default = def;
  }
});
var require_ref = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/core/ref.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callRef = exports.getValidate = void 0;
    var ref_error_1 = require_ref_error();
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var compile_1 = require_compile();
    var util_1 = require_util();
    var def = {
      keyword: "$ref",
      schemaType: "string",
      code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self: self2 } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
          return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self2, root, baseId, $ref);
        if (schOrEnv === void 0)
          throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
          return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
          if (env === root)
            return callRef(cxt, validateName, env, env.$async);
          const rootName = gen.scopeValue("root", { ref: root });
          return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
          const v = getValidate(cxt, sch);
          callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
          const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
          const valid = gen.name("valid");
          const schCxt = cxt.subschema({
            schema: sch,
            dataTypes: [],
            schemaPath: codegen_1.nil,
            topSchemaRef: schName,
            errSchemaPath: $ref
          }, valid);
          cxt.mergeEvaluated(schCxt);
          cxt.ok(valid);
        }
      }
    };
    function getValidate(cxt, sch) {
      const { gen } = cxt;
      return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
    }
    exports.getValidate = getValidate;
    function callRef(cxt, v, sch, $async) {
      const { gen, it } = cxt;
      const { allErrors, schemaEnv: env, opts } = it;
      const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
      if ($async)
        callAsyncRef();
      else
        callSyncRef();
      function callAsyncRef() {
        if (!env.$async)
          throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
          gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
          addEvaluatedFrom(v);
          if (!allErrors)
            gen.assign(valid, true);
        }, (e) => {
          gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
          addErrorsFrom(e);
          if (!allErrors)
            gen.assign(valid, false);
        });
        cxt.ok(valid);
      }
      function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
      }
      function addErrorsFrom(source) {
        const errs = (0, codegen_1._)`${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
        gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
      }
      function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
          return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        if (it.props !== true) {
          if (schEvaluated && !schEvaluated.dynamicProps) {
            if (schEvaluated.props !== void 0) {
              it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
            }
          } else {
            const props = gen.var("props", (0, codegen_1._)`${source}.evaluated.props`);
            it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
          }
        }
        if (it.items !== true) {
          if (schEvaluated && !schEvaluated.dynamicItems) {
            if (schEvaluated.items !== void 0) {
              it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
            }
          } else {
            const items = gen.var("items", (0, codegen_1._)`${source}.evaluated.items`);
            it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
          }
        }
      }
    }
    exports.callRef = callRef;
    exports.default = def;
  }
});
var require_core2 = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/core/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var id_1 = require_id();
    var ref_1 = require_ref();
    var core = [
      "$schema",
      "$id",
      "$defs",
      "$vocabulary",
      { keyword: "$comment" },
      "definitions",
      id_1.default,
      ref_1.default
    ];
    exports.default = core;
  }
});
var require_limitNumber = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var ops = codegen_1.operators;
    var KWDs = {
      maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
      minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
      exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
      exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
    };
    var error = {
      message: ({ keyword, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword].okStr} ${schemaCode}`,
      params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
    };
    var def = {
      keyword: Object.keys(KWDs),
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
      }
    };
    exports.default = def;
  }
});
var require_multipleOf = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
      params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
    };
    var def = {
      keyword: "multipleOf",
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
      }
    };
    exports.default = def;
  }
});
var require_ucs2length = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});
var require_limitLength = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var ucs2length_1 = require_ucs2length();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxLength", "minLength"],
      type: "string",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});
var require_pattern = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
    };
    var def = {
      keyword: "pattern",
      type: "string",
      schemaType: "string",
      $data: true,
      error,
      code(cxt) {
        const { data, $data, schema, schemaCode, it } = cxt;
        const u = it.opts.unicodeRegExp ? "u" : "";
        const regExp = $data ? (0, codegen_1._)`(new RegExp(${schemaCode}, ${u}))` : (0, code_1.usePattern)(cxt, schema);
        cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
      }
    };
    exports.default = def;
  }
});
var require_limitProperties = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxProperties", "minProperties"],
      type: "object",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});
var require_required = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/validation/required.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
      params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
    };
    var def = {
      keyword: "required",
      type: "object",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
          return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
          allErrorsMode();
        else
          exitOnErrorMode();
        if (opts.strictRequired) {
          const props = cxt.parentSchema.properties;
          const { definedProperties } = cxt.it;
          for (const requiredKey of schema) {
            if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
              const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
              const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
              (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
            }
          }
        }
        function allErrorsMode() {
          if (useLoop || $data) {
            cxt.block$data(codegen_1.nil, loopAllRequired);
          } else {
            for (const prop of schema) {
              (0, code_1.checkReportMissingProp)(cxt, prop);
            }
          }
        }
        function exitOnErrorMode() {
          const missing = gen.let("missing");
          if (useLoop || $data) {
            const valid = gen.let("valid", true);
            cxt.block$data(valid, () => loopUntilMissing(missing, valid));
            cxt.ok(valid);
          } else {
            gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
          }
        }
        function loopAllRequired() {
          gen.forOf("prop", schemaCode, (prop) => {
            cxt.setParams({ missingProperty: prop });
            gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
          });
        }
        function loopUntilMissing(missing, valid) {
          cxt.setParams({ missingProperty: missing });
          gen.forOf(missing, schemaCode, () => {
            gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
            gen.if((0, codegen_1.not)(valid), () => {
              cxt.error();
              gen.break();
            });
          }, codegen_1.nil);
        }
      }
    };
    exports.default = def;
  }
});
var require_limitItems = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxItems", "minItems"],
      type: "array",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});
var require_equal = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/runtime/equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports.default = equal;
  }
});
var require_uniqueItems = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dataType_1 = require_dataType();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: ({ params: { i, j } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
      params: ({ params: { i, j } }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
    };
    var def = {
      keyword: "uniqueItems",
      type: "array",
      schemaType: "boolean",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
          return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
          const i = gen.let("i", (0, codegen_1._)`${data}.length`);
          const j = gen.let("j");
          cxt.setParams({ i, j });
          gen.assign(valid, true);
          gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
          return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
          const item = gen.name("item");
          const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
          const indices = gen.const("indices", (0, codegen_1._)`{}`);
          gen.for((0, codegen_1._)`;${i}--;`, () => {
            gen.let(item, (0, codegen_1._)`${data}[${i}]`);
            gen.if(wrongType, (0, codegen_1._)`continue`);
            if (itemTypes.length > 1)
              gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`);
            gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
              gen.assign(j, (0, codegen_1._)`${indices}[${item}]`);
              cxt.error();
              gen.assign(valid, false).break();
            }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
          });
        }
        function loopN2(i, j) {
          const eql = (0, util_1.useFunc)(gen, equal_1.default);
          const outer = gen.name("outer");
          gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
            cxt.error();
            gen.assign(valid, false).break(outer);
          })));
        }
      }
    };
    exports.default = def;
  }
});
var require_const = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/validation/const.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to constant",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
    };
    var def = {
      keyword: "const",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || schema && typeof schema == "object") {
          cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        } else {
          cxt.fail((0, codegen_1._)`${schema} !== ${data}`);
        }
      }
    };
    exports.default = def;
  }
});
var require_enum = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/validation/enum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
    };
    var def = {
      keyword: "enum",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
          throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        let eql;
        const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default);
        let valid;
        if (useLoop || $data) {
          valid = gen.let("valid");
          cxt.block$data(valid, loopEnum);
        } else {
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          const vSchema = gen.const("vSchema", schemaCode);
          valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
          gen.assign(valid, false);
          gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
          const sch = schema[i];
          return typeof sch === "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
        }
      }
    };
    exports.default = def;
  }
});
var require_validation = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/validation/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var limitNumber_1 = require_limitNumber();
    var multipleOf_1 = require_multipleOf();
    var limitLength_1 = require_limitLength();
    var pattern_1 = require_pattern();
    var limitProperties_1 = require_limitProperties();
    var required_1 = require_required();
    var limitItems_1 = require_limitItems();
    var uniqueItems_1 = require_uniqueItems();
    var const_1 = require_const();
    var enum_1 = require_enum();
    var validation = [
      // number
      limitNumber_1.default,
      multipleOf_1.default,
      // string
      limitLength_1.default,
      pattern_1.default,
      // object
      limitProperties_1.default,
      required_1.default,
      // array
      limitItems_1.default,
      uniqueItems_1.default,
      // any
      { keyword: "type", schemaType: ["string", "array"] },
      { keyword: "nullable", schemaType: "boolean" },
      const_1.default,
      enum_1.default
    ];
    exports.default = validation;
  }
});
var require_additionalItems = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateAdditionalItems = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "additionalItems",
      type: "array",
      schemaType: ["boolean", "object"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
          (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
          return;
        }
        validateAdditionalItems(cxt, items);
      }
    };
    function validateAdditionalItems(cxt, items) {
      const { gen, schema, data, keyword, it } = cxt;
      it.items = true;
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._)`${len} <= ${items.length}`);
      } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items.length}`);
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
      }
      function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
          cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
          if (!it.allErrors)
            gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
      }
    }
    exports.validateAdditionalItems = validateAdditionalItems;
    exports.default = def;
  }
});
var require_items = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/items.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateTuple = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "array", "boolean"],
      before: "uniqueItems",
      code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
          return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    function validateTuple(cxt, extraItems, schArr = cxt.schema) {
      const { gen, parentSchema, data, keyword, it } = cxt;
      checkStrictTuple(parentSchema);
      if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
      }
      const valid = gen.name("valid");
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
          return;
        gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
          keyword,
          schemaProp: i,
          dataProp: i
        }, valid));
        cxt.ok(valid);
      });
      function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
          const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
          (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
      }
    }
    exports.validateTuple = validateTuple;
    exports.default = def;
  }
});
var require_prefixItems = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var items_1 = require_items();
    var def = {
      keyword: "prefixItems",
      type: "array",
      schemaType: ["array"],
      before: "uniqueItems",
      code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
    };
    exports.default = def;
  }
});
var require_items2020 = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/items2020.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var additionalItems_1 = require_additionalItems();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        if (prefixItems)
          (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
          cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    exports.default = def;
  }
});
var require_contains = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
      params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
    };
    var def = {
      keyword: "contains",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
          min = minContains === void 0 ? 1 : minContains;
          max = maxContains;
        } else {
          min = 1;
        }
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        cxt.setParams({ min, max });
        if (max === void 0 && min === 0) {
          (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
          return;
        }
        if (max !== void 0 && min > max) {
          (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
          cxt.fail();
          return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          let cond = (0, codegen_1._)`${len} >= ${min}`;
          if (max !== void 0)
            cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`;
          cxt.pass(cond);
          return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === void 0 && min === 1) {
          validateItems(valid, () => gen.if(valid, () => gen.break()));
        } else if (min === 0) {
          gen.let(valid, true);
          if (max !== void 0)
            gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount);
        } else {
          gen.let(valid, false);
          validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
          const schValid = gen.name("_valid");
          const count = gen.let("count", 0);
          validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        function validateItems(_valid, block) {
          gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
              keyword: "contains",
              dataProp: i,
              dataPropType: util_1.Type.Num,
              compositeRule: true
            }, _valid);
            block();
          });
        }
        function checkLimits(count) {
          gen.code((0, codegen_1._)`${count}++`);
          if (max === void 0) {
            gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true).break());
          } else {
            gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid, false).break());
            if (min === 1)
              gen.assign(valid, true);
            else
              gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true));
          }
        }
      }
    };
    exports.default = def;
  }
});
var require_dependencies = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    exports.error = {
      message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
      },
      params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
      // TODO change to reference
    };
    var def = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports.error,
      code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({ schema }) {
      const propertyDeps = {};
      const schemaDeps = {};
      for (const key in schema) {
        if (key === "__proto__")
          continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
      }
      return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      const { gen, data, it } = cxt;
      if (Object.keys(propertyDeps).length === 0)
        return;
      const missing = gen.let("missing");
      for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
          continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        });
        if (it.allErrors) {
          gen.if(hasProperty, () => {
            for (const depProp of deps) {
              (0, code_1.checkReportMissingProp)(cxt, depProp);
            }
          });
        } else {
          gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
          (0, code_1.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
    }
    exports.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
          continue;
        gen.if(
          (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties),
          () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
          },
          () => gen.var(valid, true)
          // TODO var
        );
        cxt.ok(valid);
      }
    }
    exports.validateSchemaDeps = validateSchemaDeps;
    exports.default = def;
  }
});
var require_propertyNames = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "property name must be valid",
      params: ({ params }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
    };
    var def = {
      keyword: "propertyNames",
      type: "object",
      schemaType: ["object", "boolean"],
      error,
      code(cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
          cxt.setParams({ propertyName: key });
          cxt.subschema({
            keyword: "propertyNames",
            data: key,
            dataTypes: ["string"],
            propertyName: key,
            compositeRule: true
          }, valid);
          gen.if((0, codegen_1.not)(valid), () => {
            cxt.error(true);
            if (!it.allErrors)
              gen.break();
          });
        });
        cxt.ok(valid);
      }
    };
    exports.default = def;
  }
});
var require_additionalProperties = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var util_1 = require_util();
    var error = {
      message: "must NOT have additional properties",
      params: ({ params }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
    };
    var def = {
      keyword: "additionalProperties",
      type: ["object"],
      schemaType: ["boolean", "object"],
      allowUndefined: true,
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        if (!errsCount)
          throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
          return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
          gen.forIn("key", data, (key) => {
            if (!props.length && !patProps.length)
              additionalPropertyCode(key);
            else
              gen.if(isAdditional(key), () => additionalPropertyCode(key));
          });
        }
        function isAdditional(key) {
          let definedProp;
          if (props.length > 8) {
            const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
            definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
          } else if (props.length) {
            definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`));
          } else {
            definedProp = codegen_1.nil;
          }
          if (patProps.length) {
            definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
          }
          return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
          gen.code((0, codegen_1._)`delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
          if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
            deleteAdditional(key);
            return;
          }
          if (schema === false) {
            cxt.setParams({ additionalProperty: key });
            cxt.error();
            if (!allErrors)
              gen.break();
            return;
          }
          if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
            const valid = gen.name("valid");
            if (opts.removeAdditional === "failing") {
              applyAdditionalSchema(key, valid, false);
              gen.if((0, codegen_1.not)(valid), () => {
                cxt.reset();
                deleteAdditional(key);
              });
            } else {
              applyAdditionalSchema(key, valid);
              if (!allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
            }
          }
        }
        function applyAdditionalSchema(key, valid, errors) {
          const subschema = {
            keyword: "additionalProperties",
            dataProp: key,
            dataPropType: util_1.Type.Str
          };
          if (errors === false) {
            Object.assign(subschema, {
              compositeRule: true,
              createErrors: false,
              allErrors: false
            });
          }
          cxt.subschema(subschema, valid);
        }
      }
    };
    exports.default = def;
  }
});
var require_properties = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var validate_1 = require_validate();
    var code_1 = require_code2();
    var util_1 = require_util();
    var additionalProperties_1 = require_additionalProperties();
    var def = {
      keyword: "properties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
          additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
          it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
          it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
          return;
        const valid = gen.name("valid");
        for (const prop of properties) {
          if (hasDefault(prop)) {
            applyPropertySchema(prop);
          } else {
            gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
            applyPropertySchema(prop);
            if (!it.allErrors)
              gen.else().var(valid, true);
            gen.endIf();
          }
          cxt.it.definedProperties.add(prop);
          cxt.ok(valid);
        }
        function hasDefault(prop) {
          return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
        }
        function applyPropertySchema(prop) {
          cxt.subschema({
            keyword: "properties",
            schemaProp: prop,
            dataProp: prop
          }, valid);
        }
      }
    };
    exports.default = def;
  }
});
var require_patternProperties = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var util_2 = require_util();
    var def = {
      keyword: "patternProperties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
          return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
          it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
          for (const pat of patterns) {
            if (checkProperties)
              checkMatchingProperties(pat);
            if (it.allErrors) {
              validateProperties(pat);
            } else {
              gen.var(valid, true);
              validateProperties(pat);
              gen.if(valid);
            }
          }
        }
        function checkMatchingProperties(pat) {
          for (const prop in checkProperties) {
            if (new RegExp(pat).test(prop)) {
              (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
            }
          }
        }
        function validateProperties(pat) {
          gen.forIn("key", data, (key) => {
            gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
              const alwaysValid = alwaysValidPatterns.includes(pat);
              if (!alwaysValid) {
                cxt.subschema({
                  keyword: "patternProperties",
                  schemaProp: pat,
                  dataProp: key,
                  dataPropType: util_2.Type.Str
                }, valid);
              }
              if (it.opts.unevaluated && props !== true) {
                gen.assign((0, codegen_1._)`${props}[${key}]`, true);
              } else if (!alwaysValid && !it.allErrors) {
                gen.if((0, codegen_1.not)(valid), () => gen.break());
              }
            });
          });
        }
      }
    };
    exports.default = def;
  }
});
var require_not = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/not.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "not",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      code(cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          cxt.fail();
          return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
          keyword: "not",
          compositeRule: true,
          createErrors: false,
          allErrors: false
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
      },
      error: { message: "must NOT be valid" }
    };
    exports.default = def;
  }
});
var require_anyOf = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var def = {
      keyword: "anyOf",
      schemaType: "array",
      trackErrors: true,
      code: code_1.validateUnion,
      error: { message: "must match a schema in anyOf" }
    };
    exports.default = def;
  }
});
var require_oneOf = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "must match exactly one schema in oneOf",
      params: ({ params }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
    };
    var def = {
      keyword: "oneOf",
      schemaType: "array",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
          return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
          schArr.forEach((sch, i) => {
            let schCxt;
            if ((0, util_1.alwaysValidSchema)(it, sch)) {
              gen.var(schValid, true);
            } else {
              schCxt = cxt.subschema({
                keyword: "oneOf",
                schemaProp: i,
                compositeRule: true
              }, schValid);
            }
            if (i > 0) {
              gen.if((0, codegen_1._)`${schValid} && ${valid}`).assign(valid, false).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else();
            }
            gen.if(schValid, () => {
              gen.assign(valid, true);
              gen.assign(passing, i);
              if (schCxt)
                cxt.mergeEvaluated(schCxt, codegen_1.Name);
            });
          });
        }
      }
    };
    exports.default = def;
  }
});
var require_allOf = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "allOf",
      schemaType: "array",
      code(cxt) {
        const { gen, schema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
          if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
          const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
          cxt.ok(valid);
          cxt.mergeEvaluated(schCxt);
        });
      }
    };
    exports.default = def;
  }
});
var require_if = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/if.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
      params: ({ params }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
    };
    var def = {
      keyword: "if",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === void 0 && parentSchema.else === void 0) {
          (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
          return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
          const ifClause = gen.let("ifClause");
          cxt.setParams({ ifClause });
          gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        } else if (hasThen) {
          gen.if(schValid, validateClause("then"));
        } else {
          gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
          const schCxt = cxt.subschema({
            keyword: "if",
            compositeRule: true,
            createErrors: false,
            allErrors: false
          }, schValid);
          cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
          return () => {
            const schCxt = cxt.subschema({ keyword }, schValid);
            gen.assign(valid, schValid);
            cxt.mergeValidEvaluated(schCxt, valid);
            if (ifClause)
              gen.assign(ifClause, (0, codegen_1._)`${keyword}`);
            else
              cxt.setParams({ ifClause: keyword });
          };
        }
      }
    };
    function hasSchema(it, keyword) {
      const schema = it.schema[keyword];
      return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
    }
    exports.default = def;
  }
});
var require_thenElse = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: ["then", "else"],
      schemaType: ["object", "boolean"],
      code({ keyword, parentSchema, it }) {
        if (parentSchema.if === void 0)
          (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
      }
    };
    exports.default = def;
  }
});
var require_applicator = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/applicator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var additionalItems_1 = require_additionalItems();
    var prefixItems_1 = require_prefixItems();
    var items_1 = require_items();
    var items2020_1 = require_items2020();
    var contains_1 = require_contains();
    var dependencies_1 = require_dependencies();
    var propertyNames_1 = require_propertyNames();
    var additionalProperties_1 = require_additionalProperties();
    var properties_1 = require_properties();
    var patternProperties_1 = require_patternProperties();
    var not_1 = require_not();
    var anyOf_1 = require_anyOf();
    var oneOf_1 = require_oneOf();
    var allOf_1 = require_allOf();
    var if_1 = require_if();
    var thenElse_1 = require_thenElse();
    function getApplicator(draft2020 = false) {
      const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default
      ];
      if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
      else
        applicator.push(additionalItems_1.default, items_1.default);
      applicator.push(contains_1.default);
      return applicator;
    }
    exports.default = getApplicator;
  }
});
var require_format = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/format/format.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
    };
    var def = {
      keyword: "format",
      type: ["number", "string"],
      schemaType: "string",
      $data: true,
      error,
      code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self: self2 } = it;
        if (!opts.validateFormats)
          return;
        if ($data)
          validate$DataFormat();
        else
          validateFormat();
        function validate$DataFormat() {
          const fmts = gen.scopeValue("formats", {
            ref: self2.formats,
            code: opts.code.formats
          });
          const fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`);
          const fType = gen.let("fType");
          const format = gen.let("format");
          gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format, fDef));
          cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
          function unknownFmt() {
            if (opts.strictSchema === false)
              return codegen_1.nil;
            return (0, codegen_1._)`${schemaCode} && !${format}`;
          }
          function invalidFmt() {
            const callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))` : (0, codegen_1._)`${format}(${data})`;
            const validData = (0, codegen_1._)`(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
            return (0, codegen_1._)`${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
          }
        }
        function validateFormat() {
          const formatDef = self2.formats[schema];
          if (!formatDef) {
            unknownFormat();
            return;
          }
          if (formatDef === true)
            return;
          const [fmtType, format, fmtRef] = getFormat(formatDef);
          if (fmtType === ruleType)
            cxt.pass(validCondition());
          function unknownFormat() {
            if (opts.strictSchema === false) {
              self2.logger.warn(unknownMsg());
              return;
            }
            throw new Error(unknownMsg());
            function unknownMsg() {
              return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
            }
          }
          function getFormat(fmtDef) {
            const code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0;
            const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
            if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
              return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`];
            }
            return ["string", fmtDef, fmt];
          }
          function validCondition() {
            if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
              if (!schemaEnv.$async)
                throw new Error("async format in sync schema");
              return (0, codegen_1._)`await ${fmtRef}(${data})`;
            }
            return typeof format == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
          }
        }
      }
    };
    exports.default = def;
  }
});
var require_format2 = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/format/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var format_1 = require_format();
    var format = [format_1.default];
    exports.default = format;
  }
});
var require_metadata = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.contentVocabulary = exports.metadataVocabulary = void 0;
    exports.metadataVocabulary = [
      "title",
      "description",
      "default",
      "deprecated",
      "readOnly",
      "writeOnly",
      "examples"
    ];
    exports.contentVocabulary = [
      "contentMediaType",
      "contentEncoding",
      "contentSchema"
    ];
  }
});
var require_draft7 = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/draft7.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require_core2();
    var validation_1 = require_validation();
    var applicator_1 = require_applicator();
    var format_1 = require_format2();
    var metadata_1 = require_metadata();
    var draft7Vocabularies = [
      core_1.default,
      validation_1.default,
      (0, applicator_1.default)(),
      format_1.default,
      metadata_1.metadataVocabulary,
      metadata_1.contentVocabulary
    ];
    exports.default = draft7Vocabularies;
  }
});
var require_types = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/discriminator/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiscrError = void 0;
    var DiscrError;
    (function(DiscrError2) {
      DiscrError2["Tag"] = "tag";
      DiscrError2["Mapping"] = "mapping";
    })(DiscrError || (exports.DiscrError = DiscrError = {}));
  }
});
var require_discriminator = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/vocabularies/discriminator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var types_1 = require_types();
    var compile_1 = require_compile();
    var ref_error_1 = require_ref_error();
    var util_1 = require_util();
    var error = {
      message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
      params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
    };
    var def = {
      keyword: "discriminator",
      type: "object",
      schemaType: "object",
      error,
      code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
          throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
          throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
          throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
          throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
          const mapping = getMapping();
          gen.if(false);
          for (const tagValue in mapping) {
            gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
            gen.assign(valid, applyTagSchema(mapping[tagValue]));
          }
          gen.else();
          cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
          gen.endIf();
        }
        function applyTagSchema(schemaProp) {
          const _valid = gen.name("valid");
          const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
          cxt.mergeEvaluated(schCxt, codegen_1.Name);
          return _valid;
        }
        function getMapping() {
          var _a;
          const oneOfMapping = {};
          const topRequired = hasRequired(parentSchema);
          let tagRequired = true;
          for (let i = 0; i < oneOf.length; i++) {
            let sch = oneOf[i];
            if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
              const ref = sch.$ref;
              sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref);
              if (sch instanceof compile_1.SchemaEnv)
                sch = sch.schema;
              if (sch === void 0)
                throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref);
            }
            const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
            if (typeof propSch != "object") {
              throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
            }
            tagRequired = tagRequired && (topRequired || hasRequired(sch));
            addMappings(propSch, i);
          }
          if (!tagRequired)
            throw new Error(`discriminator: "${tagName}" must be required`);
          return oneOfMapping;
          function hasRequired({ required }) {
            return Array.isArray(required) && required.includes(tagName);
          }
          function addMappings(sch, i) {
            if (sch.const) {
              addMapping(sch.const, i);
            } else if (sch.enum) {
              for (const tagValue of sch.enum) {
                addMapping(tagValue, i);
              }
            } else {
              throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
            }
          }
          function addMapping(tagValue, i) {
            if (typeof tagValue != "string" || tagValue in oneOfMapping) {
              throw new Error(`discriminator: "${tagName}" values must be unique strings`);
            }
            oneOfMapping[tagValue] = i;
          }
        }
      }
    };
    exports.default = def;
  }
});
var require_json_schema_draft_07 = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/refs/json-schema-draft-07.json"(exports, module) {
    module.exports = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://json-schema.org/draft-07/schema#",
      title: "Core schema meta-schema",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
        },
        simpleTypes: {
          enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: true,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: true,
        readOnly: {
          type: "boolean",
          default: false
        },
        examples: {
          type: "array",
          items: true
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
          default: true
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: false
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
          }
        },
        propertyNames: { $ref: "#" },
        const: true,
        enum: {
          type: "array",
          items: true,
          minItems: 1,
          uniqueItems: true
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: true
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: true
    };
  }
});
var require_ajv = __commonJS2({
  "../../node_modules/.pnpm/ajv@8.16.0/node_modules/ajv/dist/ajv.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
    var core_1 = require_core();
    var draft7_1 = require_draft7();
    var discriminator_1 = require_discriminator();
    var draft7MetaSchema = require_json_schema_draft_07();
    var META_SUPPORT_DATA = ["/properties"];
    var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    var Ajv2 = class extends core_1.default {
      _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
          this.addKeyword(discriminator_1.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
          return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    };
    exports.Ajv = Ajv2;
    module.exports = exports = Ajv2;
    module.exports.Ajv = Ajv2;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ajv2;
    var validate_1 = require_validate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
      return validation_error_1.default;
    } });
    var ref_error_1 = require_ref_error();
    Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function() {
      return ref_error_1.default;
    } });
  }
});
var version = "2.4.3";
var defaultFetch = fetch;
var BASE_PATH = "";
var BaseAPI = class {
  constructor(configuration, basePath = BASE_PATH, fetch2 = defaultFetch) {
    this.basePath = basePath;
    this.fetch = fetch2;
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
  }
};
var RequiredError = class _RequiredError extends Error {
  constructor(field, msg) {
    super(msg);
    this.field = field;
    Object.setPrototypeOf(this, _RequiredError.prototype);
    this.name = "RequiredError";
  }
};
var ApiApiFetchParamCreator = function(configuration) {
  return {
    /**
     * @summary Adds records to a collection.
     * @param {string} tenant
     * @param {string} database
     * @param {string} collectionId
     * @param {Api.AddCollectionRecordsPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionAdd(tenant, database, collectionId, request, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling collectionAdd."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling collectionAdd."
        );
      }
      if (collectionId === null || collectionId === void 0) {
        throw new RequiredError(
          "collectionId",
          "Required parameter collectionId was null or undefined when calling collectionAdd."
        );
      }
      if (request === null || request === void 0) {
        throw new RequiredError(
          "request",
          "Required parameter request was null or undefined when calling collectionAdd."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections/{collection_id}/add`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database))).replace("{collection_id}", encodeURIComponent(String(collectionId)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "POST" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarHeaderParameter.set("Content-Type", "application/json");
      localVarRequestOptions.headers = localVarHeaderParameter;
      if (request !== void 0) {
        localVarRequestOptions.body = JSON.stringify(request || {});
      }
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Retrieves the number of records in a collection.
     * @param {string} tenant <p>Tenant ID for the collection</p>
     * @param {string} database <p>Database containing this collection</p>
     * @param {string} collectionId <p>Collection ID whose records are counted</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionCount(tenant, database, collectionId, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling collectionCount."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling collectionCount."
        );
      }
      if (collectionId === null || collectionId === void 0) {
        throw new RequiredError(
          "collectionId",
          "Required parameter collectionId was null or undefined when calling collectionCount."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections/{collection_id}/count`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database))).replace("{collection_id}", encodeURIComponent(String(collectionId)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "GET" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Deletes records in a collection. Can filter by IDs or metadata.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name</p>
     * @param {string} collectionId <p>Collection ID</p>
     * @param {Api.DeleteCollectionRecordsPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionDelete(tenant, database, collectionId, request, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling collectionDelete."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling collectionDelete."
        );
      }
      if (collectionId === null || collectionId === void 0) {
        throw new RequiredError(
          "collectionId",
          "Required parameter collectionId was null or undefined when calling collectionDelete."
        );
      }
      if (request === null || request === void 0) {
        throw new RequiredError(
          "request",
          "Required parameter request was null or undefined when calling collectionDelete."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections/{collection_id}/delete`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database))).replace("{collection_id}", encodeURIComponent(String(collectionId)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "POST" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarHeaderParameter.set("Content-Type", "application/json");
      localVarRequestOptions.headers = localVarHeaderParameter;
      if (request !== void 0) {
        localVarRequestOptions.body = JSON.stringify(request || {});
      }
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Retrieves records from a collection by ID or metadata filter.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name for the collection</p>
     * @param {string} collectionId <p>Collection ID to fetch records from</p>
     * @param {Api.GetRequestPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionGet(tenant, database, collectionId, request, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling collectionGet."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling collectionGet."
        );
      }
      if (collectionId === null || collectionId === void 0) {
        throw new RequiredError(
          "collectionId",
          "Required parameter collectionId was null or undefined when calling collectionGet."
        );
      }
      if (request === null || request === void 0) {
        throw new RequiredError(
          "request",
          "Required parameter request was null or undefined when calling collectionGet."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections/{collection_id}/get`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database))).replace("{collection_id}", encodeURIComponent(String(collectionId)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "POST" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarHeaderParameter.set("Content-Type", "application/json");
      localVarRequestOptions.headers = localVarHeaderParameter;
      if (request !== void 0) {
        localVarRequestOptions.body = JSON.stringify(request || {});
      }
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Query a collection in a variety of ways, including vector search, metadata filtering, and full-text search
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name containing the collection</p>
     * @param {string} collectionId <p>Collection ID to query</p>
     * @param {number} [limit] <p>Limit for pagination</p>
     * @param {number} [offset] <p>Offset for pagination</p>
     * @param {Api.QueryRequestPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionQuery(tenant, database, collectionId, limit, offset, request, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling collectionQuery."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling collectionQuery."
        );
      }
      if (collectionId === null || collectionId === void 0) {
        throw new RequiredError(
          "collectionId",
          "Required parameter collectionId was null or undefined when calling collectionQuery."
        );
      }
      if (request === null || request === void 0) {
        throw new RequiredError(
          "request",
          "Required parameter request was null or undefined when calling collectionQuery."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections/{collection_id}/query`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database))).replace("{collection_id}", encodeURIComponent(String(collectionId)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "POST" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      if (limit !== void 0) {
        localVarQueryParameter.append("limit", String(limit));
      }
      if (offset !== void 0) {
        localVarQueryParameter.append("offset", String(offset));
      }
      localVarHeaderParameter.set("Content-Type", "application/json");
      localVarRequestOptions.headers = localVarHeaderParameter;
      if (request !== void 0) {
        localVarRequestOptions.body = JSON.stringify(request || {});
      }
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Updates records in a collection by ID.
     * @param {string} tenant
     * @param {string} database
     * @param {string} collectionId
     * @param {Api.UpdateCollectionRecordsPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionUpdate(tenant, database, collectionId, request, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling collectionUpdate."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling collectionUpdate."
        );
      }
      if (collectionId === null || collectionId === void 0) {
        throw new RequiredError(
          "collectionId",
          "Required parameter collectionId was null or undefined when calling collectionUpdate."
        );
      }
      if (request === null || request === void 0) {
        throw new RequiredError(
          "request",
          "Required parameter request was null or undefined when calling collectionUpdate."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections/{collection_id}/update`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database))).replace("{collection_id}", encodeURIComponent(String(collectionId)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "POST" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarHeaderParameter.set("Content-Type", "application/json");
      localVarRequestOptions.headers = localVarHeaderParameter;
      if (request !== void 0) {
        localVarRequestOptions.body = JSON.stringify(request || {});
      }
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Upserts records in a collection (create if not exists, otherwise update).
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name</p>
     * @param {string} collectionId <p>Collection ID</p>
     * @param {Api.UpsertCollectionRecordsPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionUpsert(tenant, database, collectionId, request, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling collectionUpsert."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling collectionUpsert."
        );
      }
      if (collectionId === null || collectionId === void 0) {
        throw new RequiredError(
          "collectionId",
          "Required parameter collectionId was null or undefined when calling collectionUpsert."
        );
      }
      if (request === null || request === void 0) {
        throw new RequiredError(
          "request",
          "Required parameter request was null or undefined when calling collectionUpsert."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections/{collection_id}/upsert`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database))).replace("{collection_id}", encodeURIComponent(String(collectionId)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "POST" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarHeaderParameter.set("Content-Type", "application/json");
      localVarRequestOptions.headers = localVarHeaderParameter;
      if (request !== void 0) {
        localVarRequestOptions.body = JSON.stringify(request || {});
      }
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Retrieves the total number of collections in a given database.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name to count collections from</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    countCollections(tenant, database, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling countCollections."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling countCollections."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections_count`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "GET" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Creates a new collection under the specified database.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name containing the new collection</p>
     * @param {Api.CreateCollectionPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    createCollection(tenant, database, request, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling createCollection."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling createCollection."
        );
      }
      if (request === null || request === void 0) {
        throw new RequiredError(
          "request",
          "Required parameter request was null or undefined when calling createCollection."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "POST" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarHeaderParameter.set("Content-Type", "application/json");
      localVarRequestOptions.headers = localVarHeaderParameter;
      if (request !== void 0) {
        localVarRequestOptions.body = JSON.stringify(request || {});
      }
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Creates a new database for a given tenant.
     * @param {string} tenant <p>Tenant ID to associate with the new database</p>
     * @param {Api.CreateDatabasePayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    createDatabase(tenant, request, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling createDatabase."
        );
      }
      if (request === null || request === void 0) {
        throw new RequiredError(
          "request",
          "Required parameter request was null or undefined when calling createDatabase."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases`.replace(
        "{tenant}",
        encodeURIComponent(String(tenant))
      );
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "POST" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarHeaderParameter.set("Content-Type", "application/json");
      localVarRequestOptions.headers = localVarHeaderParameter;
      if (request !== void 0) {
        localVarRequestOptions.body = JSON.stringify(request || {});
      }
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Creates a new tenant.
     * @param {Api.CreateTenantPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    createTenant(request, options = {}) {
      if (request === null || request === void 0) {
        throw new RequiredError(
          "request",
          "Required parameter request was null or undefined when calling createTenant."
        );
      }
      let localVarPath = `/api/v2/tenants`;
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "POST" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarHeaderParameter.set("Content-Type", "application/json");
      localVarRequestOptions.headers = localVarHeaderParameter;
      if (request !== void 0) {
        localVarRequestOptions.body = JSON.stringify(request || {});
      }
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Deletes a collection in a given database.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name</p>
     * @param {string} collectionId <p>UUID of the collection to delete</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteCollection(tenant, database, collectionId, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling deleteCollection."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling deleteCollection."
        );
      }
      if (collectionId === null || collectionId === void 0) {
        throw new RequiredError(
          "collectionId",
          "Required parameter collectionId was null or undefined when calling deleteCollection."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections/{collection_id}`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database))).replace("{collection_id}", encodeURIComponent(String(collectionId)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "DELETE" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Deletes a specific database.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Name of the database to delete</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteDatabase(tenant, database, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling deleteDatabase."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling deleteDatabase."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "DELETE" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Forks an existing collection.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name</p>
     * @param {string} collectionId <p>UUID of the collection to update</p>
     * @param {Api.ForkCollectionPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    forkCollection(tenant, database, collectionId, request, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling forkCollection."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling forkCollection."
        );
      }
      if (collectionId === null || collectionId === void 0) {
        throw new RequiredError(
          "collectionId",
          "Required parameter collectionId was null or undefined when calling forkCollection."
        );
      }
      if (request === null || request === void 0) {
        throw new RequiredError(
          "request",
          "Required parameter request was null or undefined when calling forkCollection."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections/{collection_id}/fork`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database))).replace("{collection_id}", encodeURIComponent(String(collectionId)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "POST" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarHeaderParameter.set("Content-Type", "application/json");
      localVarRequestOptions.headers = localVarHeaderParameter;
      if (request !== void 0) {
        localVarRequestOptions.body = JSON.stringify(request || {});
      }
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Retrieves a collection by ID or name.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name</p>
     * @param {string} collectionId <p>UUID of the collection</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    getCollection(tenant, database, collectionId, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling getCollection."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling getCollection."
        );
      }
      if (collectionId === null || collectionId === void 0) {
        throw new RequiredError(
          "collectionId",
          "Required parameter collectionId was null or undefined when calling getCollection."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections/{collection_id}`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database))).replace("{collection_id}", encodeURIComponent(String(collectionId)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "GET" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Retrieves a specific database by name.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Name of the database to retrieve</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDatabase(tenant, database, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling getDatabase."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling getDatabase."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "GET" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Returns an existing tenant by name.
     * @param {string} tenantName <p>Tenant name or ID to retrieve</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTenant(tenantName, options = {}) {
      if (tenantName === null || tenantName === void 0) {
        throw new RequiredError(
          "tenantName",
          "Required parameter tenantName was null or undefined when calling getTenant."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant_name}`.replace(
        "{tenant_name}",
        encodeURIComponent(String(tenantName))
      );
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "GET" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Retrieves the current user's identity, tenant, and databases.
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    getUserIdentity(options = {}) {
      let localVarPath = `/api/v2/auth/identity`;
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "GET" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Health check endpoint that returns 200 if the server and executor are ready
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    healthcheck(options = {}) {
      let localVarPath = `/api/v2/healthcheck`;
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "GET" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Heartbeat endpoint that returns a nanosecond timestamp of the current time.
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    heartbeat(options = {}) {
      let localVarPath = `/api/v2/heartbeat`;
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "GET" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Lists all collections in the specified database.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name to list collections from</p>
     * @param {number} [limit] <p>Limit for pagination</p>
     * @param {number} [offset] <p>Offset for pagination</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    listCollections(tenant, database, limit, offset, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling listCollections."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling listCollections."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "GET" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      if (limit !== void 0) {
        localVarQueryParameter.append("limit", String(limit));
      }
      if (offset !== void 0) {
        localVarQueryParameter.append("offset", String(offset));
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Lists all databases for a given tenant.
     * @param {string} tenant <p>Tenant ID to list databases for</p>
     * @param {number} [limit] <p>Limit for pagination</p>
     * @param {number} [offset] <p>Offset for pagination</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    listDatabases(tenant, limit, offset, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling listDatabases."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases`.replace(
        "{tenant}",
        encodeURIComponent(String(tenant))
      );
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "GET" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      if (limit !== void 0) {
        localVarQueryParameter.append("limit", String(limit));
      }
      if (offset !== void 0) {
        localVarQueryParameter.append("offset", String(offset));
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Pre-flight checks endpoint reporting basic readiness info.
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    preFlightChecks(options = {}) {
      let localVarPath = `/api/v2/pre-flight-checks`;
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "GET" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Reset endpoint allowing authorized users to reset the database.
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    reset(options = {}) {
      let localVarPath = `/api/v2/reset`;
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "POST" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Updates an existing collection's name or metadata.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name</p>
     * @param {string} collectionId <p>UUID of the collection to update</p>
     * @param {Api.UpdateCollectionPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateCollection(tenant, database, collectionId, request, options = {}) {
      if (tenant === null || tenant === void 0) {
        throw new RequiredError(
          "tenant",
          "Required parameter tenant was null or undefined when calling updateCollection."
        );
      }
      if (database === null || database === void 0) {
        throw new RequiredError(
          "database",
          "Required parameter database was null or undefined when calling updateCollection."
        );
      }
      if (collectionId === null || collectionId === void 0) {
        throw new RequiredError(
          "collectionId",
          "Required parameter collectionId was null or undefined when calling updateCollection."
        );
      }
      if (request === null || request === void 0) {
        throw new RequiredError(
          "request",
          "Required parameter request was null or undefined when calling updateCollection."
        );
      }
      let localVarPath = `/api/v2/tenants/{tenant}/databases/{database}/collections/{collection_id}`.replace("{tenant}", encodeURIComponent(String(tenant))).replace("{database}", encodeURIComponent(String(database))).replace("{collection_id}", encodeURIComponent(String(collectionId)));
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "PUT" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarHeaderParameter.set("Content-Type", "application/json");
      localVarRequestOptions.headers = localVarHeaderParameter;
      if (request !== void 0) {
        localVarRequestOptions.body = JSON.stringify(request || {});
      }
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    },
    /**
     * @summary Returns the version of the server.
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    version(options = {}) {
      let localVarPath = `/api/v2/version`;
      const localVarPathQueryStart = localVarPath.indexOf("?");
      const localVarRequestOptions = Object.assign(
        { method: "GET" },
        options
      );
      const localVarHeaderParameter = options.headers ? new Headers(options.headers) : new Headers();
      const localVarQueryParameter = new URLSearchParams(
        localVarPathQueryStart !== -1 ? localVarPath.substring(localVarPathQueryStart + 1) : ""
      );
      if (localVarPathQueryStart !== -1) {
        localVarPath = localVarPath.substring(0, localVarPathQueryStart);
      }
      localVarRequestOptions.headers = localVarHeaderParameter;
      const localVarQueryParameterString = localVarQueryParameter.toString();
      if (localVarQueryParameterString) {
        localVarPath += "?" + localVarQueryParameterString;
      }
      return {
        url: localVarPath,
        options: localVarRequestOptions
      };
    }
  };
};
var ApiApiFp = function(configuration) {
  return {
    /**
     * @summary Adds records to a collection.
     * @param {string} tenant
     * @param {string} database
     * @param {string} collectionId
     * @param {Api.AddCollectionRecordsPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionAdd(tenant, database, collectionId, request, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).collectionAdd(tenant, database, collectionId, request, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 201) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 400) {
            return response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Retrieves the number of records in a collection.
     * @param {string} tenant <p>Tenant ID for the collection</p>
     * @param {string} database <p>Database containing this collection</p>
     * @param {string} collectionId <p>Collection ID whose records are counted</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionCount(tenant, database, collectionId, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).collectionCount(tenant, database, collectionId, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 404) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Deletes records in a collection. Can filter by IDs or metadata.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name</p>
     * @param {string} collectionId <p>Collection ID</p>
     * @param {Api.DeleteCollectionRecordsPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionDelete(tenant, database, collectionId, request, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).collectionDelete(tenant, database, collectionId, request, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 404) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Retrieves records from a collection by ID or metadata filter.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name for the collection</p>
     * @param {string} collectionId <p>Collection ID to fetch records from</p>
     * @param {Api.GetRequestPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionGet(tenant, database, collectionId, request, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).collectionGet(tenant, database, collectionId, request, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 404) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Query a collection in a variety of ways, including vector search, metadata filtering, and full-text search
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name containing the collection</p>
     * @param {string} collectionId <p>Collection ID to query</p>
     * @param {number} [limit] <p>Limit for pagination</p>
     * @param {number} [offset] <p>Offset for pagination</p>
     * @param {Api.QueryRequestPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionQuery(tenant, database, collectionId, limit, offset, request, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).collectionQuery(
        tenant,
        database,
        collectionId,
        limit,
        offset,
        request,
        options
      );
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 404) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Updates records in a collection by ID.
     * @param {string} tenant
     * @param {string} database
     * @param {string} collectionId
     * @param {Api.UpdateCollectionRecordsPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionUpdate(tenant, database, collectionId, request, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).collectionUpdate(tenant, database, collectionId, request, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 404) {
            return response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Upserts records in a collection (create if not exists, otherwise update).
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name</p>
     * @param {string} collectionId <p>Collection ID</p>
     * @param {Api.UpsertCollectionRecordsPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    collectionUpsert(tenant, database, collectionId, request, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).collectionUpsert(tenant, database, collectionId, request, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 404) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Retrieves the total number of collections in a given database.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name to count collections from</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    countCollections(tenant, database, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).countCollections(tenant, database, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Creates a new collection under the specified database.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name containing the new collection</p>
     * @param {Api.CreateCollectionPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    createCollection(tenant, database, request, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).createCollection(tenant, database, request, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Creates a new database for a given tenant.
     * @param {string} tenant <p>Tenant ID to associate with the new database</p>
     * @param {Api.CreateDatabasePayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    createDatabase(tenant, request, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).createDatabase(tenant, request, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Creates a new tenant.
     * @param {Api.CreateTenantPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    createTenant(request, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).createTenant(request, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Deletes a collection in a given database.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name</p>
     * @param {string} collectionId <p>UUID of the collection to delete</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteCollection(tenant, database, collectionId, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).deleteCollection(tenant, database, collectionId, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 404) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Deletes a specific database.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Name of the database to delete</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteDatabase(tenant, database, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).deleteDatabase(tenant, database, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 404) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Forks an existing collection.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name</p>
     * @param {string} collectionId <p>UUID of the collection to update</p>
     * @param {Api.ForkCollectionPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    forkCollection(tenant, database, collectionId, request, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).forkCollection(tenant, database, collectionId, request, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 404) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Retrieves a collection by ID or name.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name</p>
     * @param {string} collectionId <p>UUID of the collection</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    getCollection(tenant, database, collectionId, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).getCollection(tenant, database, collectionId, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 404) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Retrieves a specific database by name.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Name of the database to retrieve</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDatabase(tenant, database, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).getDatabase(tenant, database, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 404) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Returns an existing tenant by name.
     * @param {string} tenantName <p>Tenant name or ID to retrieve</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    getTenant(tenantName, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).getTenant(tenantName, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 404) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Retrieves the current user's identity, tenant, and databases.
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    getUserIdentity(options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(configuration).getUserIdentity(options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Health check endpoint that returns 200 if the server and executor are ready
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    healthcheck(options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(configuration).healthcheck(options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 503) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Heartbeat endpoint that returns a nanosecond timestamp of the current time.
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    heartbeat(options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(configuration).heartbeat(options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Lists all collections in the specified database.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name to list collections from</p>
     * @param {number} [limit] <p>Limit for pagination</p>
     * @param {number} [offset] <p>Offset for pagination</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    listCollections(tenant, database, limit, offset, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).listCollections(tenant, database, limit, offset, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Lists all databases for a given tenant.
     * @param {string} tenant <p>Tenant ID to list databases for</p>
     * @param {number} [limit] <p>Limit for pagination</p>
     * @param {number} [offset] <p>Offset for pagination</p>
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    listDatabases(tenant, limit, offset, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).listDatabases(tenant, limit, offset, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Pre-flight checks endpoint reporting basic readiness info.
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    preFlightChecks(options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(configuration).preFlightChecks(options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Reset endpoint allowing authorized users to reset the database.
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    reset(options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(configuration).reset(options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Updates an existing collection's name or metadata.
     * @param {string} tenant <p>Tenant ID</p>
     * @param {string} database <p>Database name</p>
     * @param {string} collectionId <p>UUID of the collection to update</p>
     * @param {Api.UpdateCollectionPayload} request
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateCollection(tenant, database, collectionId, request, options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(
        configuration
      ).updateCollection(tenant, database, collectionId, request, options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          if (response.status === 401) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 404) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          if (response.status === 500) {
            if (mimeType === "application/json") {
              throw response;
            }
            throw response;
          }
          throw response;
        });
      };
    },
    /**
     * @summary Returns the version of the server.
     * @param {RequestInit} [options] Override http request option.
     * @throws {RequiredError}
     */
    version(options) {
      const localVarFetchArgs = ApiApiFetchParamCreator(configuration).version(options);
      return (fetch2 = defaultFetch, basePath = BASE_PATH) => {
        return fetch2(
          basePath + localVarFetchArgs.url,
          localVarFetchArgs.options
        ).then((response) => {
          const contentType = response.headers.get("Content-Type");
          const mimeType = contentType ? contentType.replace(/;.*/, "") : void 0;
          if (response.status === 200) {
            if (mimeType === "application/json") {
              return response.json();
            }
            throw response;
          }
          throw response;
        });
      };
    }
  };
};
var ApiApi = class extends BaseAPI {
  /**
   * @summary Adds records to a collection.
   * @param {string} tenant
   * @param {string} database
   * @param {string} collectionId
   * @param {Api.AddCollectionRecordsPayload} request
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  collectionAdd(tenant, database, collectionId, request, options) {
    return ApiApiFp(this.configuration).collectionAdd(
      tenant,
      database,
      collectionId,
      request,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Retrieves the number of records in a collection.
   * @param {string} tenant <p>Tenant ID for the collection</p>
   * @param {string} database <p>Database containing this collection</p>
   * @param {string} collectionId <p>Collection ID whose records are counted</p>
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  collectionCount(tenant, database, collectionId, options) {
    return ApiApiFp(this.configuration).collectionCount(
      tenant,
      database,
      collectionId,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Deletes records in a collection. Can filter by IDs or metadata.
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Database name</p>
   * @param {string} collectionId <p>Collection ID</p>
   * @param {Api.DeleteCollectionRecordsPayload} request
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  collectionDelete(tenant, database, collectionId, request, options) {
    return ApiApiFp(this.configuration).collectionDelete(
      tenant,
      database,
      collectionId,
      request,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Retrieves records from a collection by ID or metadata filter.
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Database name for the collection</p>
   * @param {string} collectionId <p>Collection ID to fetch records from</p>
   * @param {Api.GetRequestPayload} request
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  collectionGet(tenant, database, collectionId, request, options) {
    return ApiApiFp(this.configuration).collectionGet(
      tenant,
      database,
      collectionId,
      request,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Query a collection in a variety of ways, including vector search, metadata filtering, and full-text search
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Database name containing the collection</p>
   * @param {string} collectionId <p>Collection ID to query</p>
   * @param {number} [limit] <p>Limit for pagination</p>
   * @param {number} [offset] <p>Offset for pagination</p>
   * @param {Api.QueryRequestPayload} request
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  collectionQuery(tenant, database, collectionId, limit, offset, request, options) {
    return ApiApiFp(this.configuration).collectionQuery(
      tenant,
      database,
      collectionId,
      limit,
      offset,
      request,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Updates records in a collection by ID.
   * @param {string} tenant
   * @param {string} database
   * @param {string} collectionId
   * @param {Api.UpdateCollectionRecordsPayload} request
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  collectionUpdate(tenant, database, collectionId, request, options) {
    return ApiApiFp(this.configuration).collectionUpdate(
      tenant,
      database,
      collectionId,
      request,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Upserts records in a collection (create if not exists, otherwise update).
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Database name</p>
   * @param {string} collectionId <p>Collection ID</p>
   * @param {Api.UpsertCollectionRecordsPayload} request
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  collectionUpsert(tenant, database, collectionId, request, options) {
    return ApiApiFp(this.configuration).collectionUpsert(
      tenant,
      database,
      collectionId,
      request,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Retrieves the total number of collections in a given database.
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Database name to count collections from</p>
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  countCollections(tenant, database, options) {
    return ApiApiFp(this.configuration).countCollections(
      tenant,
      database,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Creates a new collection under the specified database.
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Database name containing the new collection</p>
   * @param {Api.CreateCollectionPayload} request
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  createCollection(tenant, database, request, options) {
    return ApiApiFp(this.configuration).createCollection(
      tenant,
      database,
      request,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Creates a new database for a given tenant.
   * @param {string} tenant <p>Tenant ID to associate with the new database</p>
   * @param {Api.CreateDatabasePayload} request
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  createDatabase(tenant, request, options) {
    return ApiApiFp(this.configuration).createDatabase(
      tenant,
      request,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Creates a new tenant.
   * @param {Api.CreateTenantPayload} request
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  createTenant(request, options) {
    return ApiApiFp(this.configuration).createTenant(request, options)(
      this.fetch,
      this.basePath
    );
  }
  /**
   * @summary Deletes a collection in a given database.
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Database name</p>
   * @param {string} collectionId <p>UUID of the collection to delete</p>
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  deleteCollection(tenant, database, collectionId, options) {
    return ApiApiFp(this.configuration).deleteCollection(
      tenant,
      database,
      collectionId,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Deletes a specific database.
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Name of the database to delete</p>
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  deleteDatabase(tenant, database, options) {
    return ApiApiFp(this.configuration).deleteDatabase(
      tenant,
      database,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Forks an existing collection.
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Database name</p>
   * @param {string} collectionId <p>UUID of the collection to update</p>
   * @param {Api.ForkCollectionPayload} request
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  forkCollection(tenant, database, collectionId, request, options) {
    return ApiApiFp(this.configuration).forkCollection(
      tenant,
      database,
      collectionId,
      request,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Retrieves a collection by ID or name.
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Database name</p>
   * @param {string} collectionId <p>UUID of the collection</p>
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  getCollection(tenant, database, collectionId, options) {
    return ApiApiFp(this.configuration).getCollection(
      tenant,
      database,
      collectionId,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Retrieves a specific database by name.
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Name of the database to retrieve</p>
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  getDatabase(tenant, database, options) {
    return ApiApiFp(this.configuration).getDatabase(
      tenant,
      database,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Returns an existing tenant by name.
   * @param {string} tenantName <p>Tenant name or ID to retrieve</p>
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  getTenant(tenantName, options) {
    return ApiApiFp(this.configuration).getTenant(tenantName, options)(
      this.fetch,
      this.basePath
    );
  }
  /**
   * @summary Retrieves the current user's identity, tenant, and databases.
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  getUserIdentity(options) {
    return ApiApiFp(this.configuration).getUserIdentity(options)(
      this.fetch,
      this.basePath
    );
  }
  /**
   * @summary Health check endpoint that returns 200 if the server and executor are ready
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  healthcheck(options) {
    return ApiApiFp(this.configuration).healthcheck(options)(
      this.fetch,
      this.basePath
    );
  }
  /**
   * @summary Heartbeat endpoint that returns a nanosecond timestamp of the current time.
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  heartbeat(options) {
    return ApiApiFp(this.configuration).heartbeat(options)(
      this.fetch,
      this.basePath
    );
  }
  /**
   * @summary Lists all collections in the specified database.
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Database name to list collections from</p>
   * @param {number} [limit] <p>Limit for pagination</p>
   * @param {number} [offset] <p>Offset for pagination</p>
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  listCollections(tenant, database, limit, offset, options) {
    return ApiApiFp(this.configuration).listCollections(
      tenant,
      database,
      limit,
      offset,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Lists all databases for a given tenant.
   * @param {string} tenant <p>Tenant ID to list databases for</p>
   * @param {number} [limit] <p>Limit for pagination</p>
   * @param {number} [offset] <p>Offset for pagination</p>
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  listDatabases(tenant, limit, offset, options) {
    return ApiApiFp(this.configuration).listDatabases(
      tenant,
      limit,
      offset,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Pre-flight checks endpoint reporting basic readiness info.
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  preFlightChecks(options) {
    return ApiApiFp(this.configuration).preFlightChecks(options)(
      this.fetch,
      this.basePath
    );
  }
  /**
   * @summary Reset endpoint allowing authorized users to reset the database.
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  reset(options) {
    return ApiApiFp(this.configuration).reset(options)(
      this.fetch,
      this.basePath
    );
  }
  /**
   * @summary Updates an existing collection's name or metadata.
   * @param {string} tenant <p>Tenant ID</p>
   * @param {string} database <p>Database name</p>
   * @param {string} collectionId <p>UUID of the collection to update</p>
   * @param {Api.UpdateCollectionPayload} request
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  updateCollection(tenant, database, collectionId, request, options) {
    return ApiApiFp(this.configuration).updateCollection(
      tenant,
      database,
      collectionId,
      request,
      options
    )(this.fetch, this.basePath);
  }
  /**
   * @summary Returns the version of the server.
   * @param {RequestInit} [options] Override http request option.
   * @throws {RequiredError}
   */
  version(options) {
    return ApiApiFp(this.configuration).version(options)(
      this.fetch,
      this.basePath
    );
  }
};
var Api;
((Api3) => {
  let EmbeddingFunctionConfiguration;
  ((EmbeddingFunctionConfiguration2) => {
    let ObjectValue;
    ((ObjectValue2) => {
      let TypeEnum;
      ((TypeEnum2) => {
        TypeEnum2["Legacy"] = "legacy";
      })(TypeEnum = ObjectValue2.TypeEnum || (ObjectValue2.TypeEnum = {}));
    })(ObjectValue = EmbeddingFunctionConfiguration2.ObjectValue || (EmbeddingFunctionConfiguration2.ObjectValue = {}));
    let AllofValue;
    ((AllofValue2) => {
      let TypeEnum;
      ((TypeEnum2) => {
        TypeEnum2["Known"] = "known";
      })(TypeEnum = AllofValue2.TypeEnum || (AllofValue2.TypeEnum = {}));
    })(AllofValue = EmbeddingFunctionConfiguration2.AllofValue || (EmbeddingFunctionConfiguration2.AllofValue = {}));
  })(EmbeddingFunctionConfiguration = Api3.EmbeddingFunctionConfiguration || (Api3.EmbeddingFunctionConfiguration = {}));
  let HnswSpace;
  ((HnswSpace2) => {
    HnswSpace2["L2"] = "l2";
    HnswSpace2["Cosine"] = "cosine";
    HnswSpace2["Ip"] = "ip";
  })(HnswSpace = Api3.HnswSpace || (Api3.HnswSpace = {}));
  let Include;
  ((Include2) => {
    Include2["Distances"] = "distances";
    Include2["Documents"] = "documents";
    Include2["Embeddings"] = "embeddings";
    Include2["Metadatas"] = "metadatas";
    Include2["Uris"] = "uris";
  })(Include = Api3.Include || (Api3.Include = {}));
})(Api || (Api = {}));
var Configuration = class {
  constructor(param = {}) {
    this.apiKey = param.apiKey;
    this.username = param.username;
    this.password = param.password;
    this.authorization = param.authorization;
    this.basePath = param.basePath;
  }
};
var ChromaError = class extends Error {
  constructor(name, message, cause) {
    super(message);
    this.cause = cause;
    this.name = name;
  }
};
var ChromaConnectionError = class extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ChromaConnectionError";
  }
};
var ChromaServerError = class extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ChromaServerError";
  }
};
var ChromaClientError = class extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ChromaClientError";
  }
};
var ChromaUnauthorizedError = class extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ChromaAuthError";
  }
};
var ChromaForbiddenError = class extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ChromaForbiddenError";
  }
};
var ChromaNotFoundError = class extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ChromaNotFoundError";
  }
};
var ChromaValueError = class extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ChromaValueError";
  }
};
var InvalidCollectionError = class extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "InvalidCollectionError";
  }
};
var InvalidArgumentError = class extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "InvalidArgumentError";
  }
};
var ChromaUniqueError = class extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ChromaUniqueError";
  }
};
function createErrorByType(type, message) {
  switch (type) {
    case "InvalidCollection":
      return new InvalidCollectionError(message);
    case "InvalidArgumentError":
      return new InvalidArgumentError(message);
    default:
      return void 0;
  }
}
var InvalidConfigurationError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidConfigurationError";
  }
};
function serializeEmbeddingFunction(ef) {
  let efConfig = null;
  if (ef === null || ef === void 0) {
    efConfig = { type: "legacy" };
  } else {
    try {
      if (ef.getConfig && ef.name) {
        if (ef.validateConfig) {
          ef.validateConfig(ef.getConfig());
        }
        efConfig = {
          name: ef.name,
          type: "known",
          config: ef.getConfig()
        };
      } else {
        console.warn(
          "Could not serialize embedding function - missing getConfig or name method."
        );
        efConfig = { type: "legacy" };
      }
    } catch (e) {
      console.warn(
        "Error processing embedding function for serialization, falling back to legacy:",
        e,
        "DeprecationWarning"
      );
      efConfig = { type: "legacy" };
    }
  }
  return efConfig;
}
function loadApiCollectionConfigurationFromCreateCollectionConfiguration(config) {
  return createCollectionConfigurationToJson(
    config
  );
}
function createCollectionConfigurationToJson(config) {
  if (config.hnsw && config.spann) {
    throw new InvalidConfigurationError(
      "Cannot specify both 'hnsw' and 'spann' configurations during creation."
    );
  }
  let hnswConfig = config.hnsw;
  let spannConfig = config.spann;
  let ef = config.embedding_function;
  let efConfig = serializeEmbeddingFunction(ef);
  if (hnswConfig && typeof hnswConfig !== "object") {
    throw new Error(
      "Invalid HNSW config provided in CreateCollectionConfiguration"
    );
  }
  if (spannConfig && typeof spannConfig !== "object") {
    throw new Error(
      "Invalid SPANN config provided in CreateCollectionConfiguration"
    );
  }
  return {
    hnsw: hnswConfig,
    spann: spannConfig,
    embedding_function: efConfig
  };
}
function updateCollectionConfigurationToJson(config) {
  if (config.hnsw && config.spann) {
    throw new InvalidConfigurationError(
      "Cannot specify both 'hnsw' and 'spann' configurations during update."
    );
  }
  let hnswConfig = config.hnsw;
  let spannConfig = config.spann;
  let ef = config.embedding_function;
  let efConfig = void 0;
  if (hnswConfig) {
    if (typeof hnswConfig !== "object") {
      throw new Error(
        "Invalid HNSW config provided in UpdateCollectionConfiguration"
      );
    }
  }
  if (spannConfig) {
    if (typeof spannConfig !== "object") {
      throw new Error(
        "Invalid SPANN config provided in UpdateCollectionConfiguration"
      );
    }
  }
  if (ef !== void 0) {
    efConfig = serializeEmbeddingFunction(ef);
  }
  const result = {};
  if (hnswConfig !== void 0)
    result.hnsw = hnswConfig;
  if (spannConfig !== void 0)
    result.spann = spannConfig;
  if (efConfig !== void 0)
    result.embedding_function = efConfig;
  if (Object.keys(result).length === 0) {
    throw new InvalidConfigurationError(
      "No valid configuration fields provided for update."
    );
  }
  return result;
}
function loadApiUpdateCollectionConfigurationFromUpdateCollectionConfiguration(config) {
  return updateCollectionConfigurationToJson(
    config
  );
}
var Collection = class _Collection {
  /**
   * @ignore
   */
  constructor(name, id, client, embeddingFunction, metadata, configuration) {
    this.name = name;
    this.id = id;
    this.metadata = metadata;
    this.client = client;
    this.embeddingFunction = embeddingFunction;
    this.configuration = configuration;
  }
  /**
   * Add items to the collection
   * @param {Object} params - The parameters for the query.
   * @param {ID | IDs} [params.ids] - IDs of the items to add.
   * @param {Embedding | Embeddings} [params.embeddings] - Optional embeddings of the items to add.
   * @param {Metadata | Metadatas} [params.metadatas] - Optional metadata of the items to add.
   * @param {Document | Documents} [params.documents] - Optional documents of the items to add.
   * @returns {Promise<AddResponse>} - The response from the API. True if successful.
   *
   * @example
   * ```typescript
   * const response = await collection.add({
   *   ids: ["id1", "id2"],
   *   embeddings: [[1, 2, 3], [4, 5, 6]],
   *   metadatas: [{ "key": "value" }, { "key": "value" }],
   *   documents: ["document1", "document2"]
   * });
   * ```
   */
  async add(params) {
    await this.client.init();
    await this.client.api.collectionAdd(
      this.client.tenant,
      this.client.database,
      this.id,
      // TODO: For some reason the auto generated code requires metadata to be defined here.
      await prepareRecordRequest(
        params,
        this.embeddingFunction
      ),
      this.client.api.options
    );
  }
  /**
   * Upsert items to the collection
   * @param {Object} params - The parameters for the query.
   * @param {ID | IDs} [params.ids] - IDs of the items to add.
   * @param {Embedding | Embeddings} [params.embeddings] - Optional embeddings of the items to add.
   * @param {Metadata | Metadatas} [params.metadatas] - Optional metadata of the items to add.
   * @param {Document | Documents} [params.documents] - Optional documents of the items to add.
   * @returns {Promise<void>}
   *
   * @example
   * ```typescript
   * const response = await collection.upsert({
   *   ids: ["id1", "id2"],
   *   embeddings: [[1, 2, 3], [4, 5, 6]],
   *   metadatas: [{ "key": "value" }, { "key": "value" }],
   *   documents: ["document1", "document2"],
   * });
   * ```
   */
  async upsert(params) {
    await this.client.init();
    await this.client.api.collectionUpsert(
      this.client.tenant,
      this.client.database,
      this.id,
      // TODO: For some reason the auto generated code requires metadata to be defined here.
      await prepareRecordRequest(
        params,
        this.embeddingFunction
      ),
      this.client.api.options
    );
  }
  /**
   * Count the number of items in the collection
   * @returns {Promise<number>} - The number of items in the collection.
   *
   * @example
   * ```typescript
   * const count = await collection.count();
   * ```
   */
  async count() {
    await this.client.init();
    return await this.client.api.collectionCount(
      this.client.tenant,
      this.client.database,
      this.id,
      this.client.api.options
    );
  }
  /**
   * Get items from the collection
   * @param {Object} params - The parameters for the query.
   * @param {ID | IDs} [params.ids] - Optional IDs of the items to get.
   * @param {Where} [params.where] - Optional where clause to filter items by.
   * @param {PositiveInteger} [params.limit] - Optional limit on the number of items to get.
   * @param {PositiveInteger} [params.offset] - Optional offset on the items to get.
   * @param {IncludeEnum[]} [params.include] - Optional list of items to include in the response.
   * @param {WhereDocument} [params.whereDocument] - Optional where clause to filter items by.
   * @returns {Promise<GetResponse>} - The response from the server.
   *
   * @example
   * ```typescript
   * const response = await collection.get({
   *   ids: ["id1", "id2"],
   *   where: { "key": "value" },
   *   limit: 10,
   *   offset: 0,
   *   include: ["embeddings", "metadatas", "documents"],
   *   whereDocument: { "$contains": "value" },
   * });
   * ```
   */
  async get({
    ids,
    where,
    limit,
    offset,
    include,
    whereDocument
  } = {}) {
    await this.client.init();
    const idsArray = ids ? toArray(ids) : void 0;
    const resp = await this.client.api.collectionGet(
      this.client.tenant,
      this.client.database,
      this.id,
      {
        ids: idsArray,
        where,
        limit,
        offset,
        include,
        where_document: whereDocument
      },
      this.client.api.options
    );
    const finalResp = {
      ...resp,
      metadatas: resp.metadatas,
      documents: resp.documents,
      embeddings: resp.embeddings,
      included: resp.include
    };
    return finalResp;
  }
  /**
   * Update items in the collection
   * @param {Object} params - The parameters for the query.
   * @param {ID | IDs} [params.ids] - IDs of the items to add.
   * @param {Embedding | Embeddings} [params.embeddings] - Optional embeddings of the items to add.
   * @param {Metadata | Metadatas} [params.metadatas] - Optional metadata of the items to add.
   * @param {Document | Documents} [params.documents] - Optional documents of the items to add.
   * @returns {Promise<void>}
   *
   * @example
   * ```typescript
   * const response = await collection.update({
   *   ids: ["id1", "id2"],
   *   embeddings: [[1, 2, 3], [4, 5, 6]],
   *   metadatas: [{ "key": "value" }, { "key": "value" }],
   *   documents: ["document1", "document2"],
   * });
   * ```
   */
  async update(params) {
    await this.client.init();
    await this.client.api.collectionUpdate(
      this.client.tenant,
      this.client.database,
      this.id,
      await prepareRecordRequest(params, this.embeddingFunction, true),
      this.client.api.options
    );
  }
  /**
   * Performs a query on the collection using the specified parameters.
   *
   * @param {Object} params - The parameters for the query.
   * @param {Embedding | Embeddings} [params.queryEmbeddings] - Optional query embeddings to use for the search.
   * @param {PositiveInteger} [params.nResults] - Optional number of results to return (default is 10).
   * @param {Where} [params.where] - Optional query condition to filter results based on metadata values.
   * @param {string | string[]} [params.queryTexts] - Optional query text(s) to search for in the collection.
   * @param {WhereDocument} [params.whereDocument] - Optional query condition to filter results based on document content.
   * @param {IncludeEnum[]} [params.include] - Optional array of fields to include in the result, such as "metadata" and "document".
   * @param {IDs} [params.ids] - Optional IDs to filter on before querying.
   *
   * @returns {Promise<QueryResponse>} A promise that resolves to the query results.
   * @throws {Error} If there is an issue executing the query.
   * @example
   * // Query the collection using embeddings
   * const results = await collection.query({
   *   queryEmbeddings: [[0.1, 0.2, ...], ...],
   *   nResults: 10,
   *   where: {"name": {"$eq": "John Doe"}},
   *   include: ["metadata", "document"]
   * });
   * @example
   * ```js
   * // Query the collection using query text
   * const results = await collection.query({
   *   queryTexts: "some text",
   *   nResults: 10,
   *   where: {"name": {"$eq": "John Doe"}},
   *   include: ["metadata", "document"]
   * });
   * ```
   *
   */
  async query({
    nResults = 10,
    where,
    whereDocument,
    include,
    queryTexts,
    queryEmbeddings,
    ids
  }) {
    await this.client.init();
    let embeddings = [];
    if (queryEmbeddings) {
      embeddings = toArrayOfArrays(queryEmbeddings);
    } else if (queryTexts) {
      embeddings = await this.embeddingFunction.generate(toArray(queryTexts));
    }
    if (embeddings.length === 0) {
      throw new TypeError(
        "You must provide either queryEmbeddings or queryTexts"
      );
    }
    let filter_ids = null;
    if (ids) {
      filter_ids = toArray(ids);
    }
    const resp = await this.client.api.collectionQuery(
      this.client.tenant,
      this.client.database,
      this.id,
      nResults,
      void 0,
      {
        query_embeddings: embeddings,
        ids: filter_ids,
        n_results: nResults,
        where,
        where_document: whereDocument,
        include
      },
      this.client.api.options
    );
    const finalResp = {
      ...resp,
      metadatas: resp.metadatas,
      documents: resp.documents,
      embeddings: resp.embeddings,
      distances: resp.distances,
      included: resp.include
    };
    return finalResp;
  }
  /**
   * Modify the collection name or metadata
   * @param {Object} params - The parameters for the query.
   * @param {string} [params.name] - Optional new name for the collection.
   * @param {CollectionMetadata} [params.metadata] - Optional new metadata for the collection.
   * @returns {Promise<void>} - The response from the API.
   *
   * @example
   * ```typescript
   * const response = await client.updateCollection({
   *   name: "new name",
   *   metadata: { "key": "value" },
   * });
   * ```
   */
  async modify({
    name,
    metadata,
    configuration
  }) {
    await this.client.init();
    let updateCollectionConfiguration = void 0;
    if (configuration) {
      updateCollectionConfiguration = loadApiUpdateCollectionConfigurationFromUpdateCollectionConfiguration(
        configuration
      );
    }
    const resp = await this.client.api.updateCollection(
      this.client.tenant,
      this.client.database,
      this.id,
      {
        new_name: name,
        new_metadata: metadata,
        new_configuration: updateCollectionConfiguration
      },
      this.client.api.options
    );
    if (name) {
      this.name = name;
    }
    if (metadata) {
      this.metadata = metadata;
    }
    return resp;
  }
  /**
   * Peek inside the collection
   * @param {Object} params - The parameters for the query.
   * @param {PositiveInteger} [params.limit] - Optional number of results to return (default is 10).
   * @returns {Promise<GetResponse>} A promise that resolves to the query results.
   * @throws {Error} If there is an issue executing the query.
   *
   * @example
   * ```typescript
   * const results = await collection.peek({
   *   limit: 10
   * });
   * ```
   */
  async peek({ limit = 10 } = {}) {
    await this.client.init();
    return await this.client.api.collectionGet(
      this.client.tenant,
      this.client.database,
      this.id,
      {
        limit
      },
      this.client.api.options
    );
  }
  /**
   * Deletes items from the collection.
   * @param {Object} params - The parameters for deleting items from the collection.
   * @param {ID | IDs} [params.ids] - Optional ID or array of IDs of items to delete.
   * @param {Where} [params.where] - Optional query condition to filter items to delete based on metadata values.
   * @param {WhereDocument} [params.whereDocument] - Optional query condition to filter items to delete based on document content.
   * @returns {Promise<string[]>} A promise that resolves to the IDs of the deleted items.
   * @throws {Error} If there is an issue deleting items from the collection.
   *
   * @example
   * ```typescript
   * const results = await collection.delete({
   *   ids: "some_id",
   *   where: {"name": {"$eq": "John Doe"}},
   *   whereDocument: {"$contains":"search_string"}
   * });
   * ```
   */
  async delete({
    ids,
    where,
    whereDocument
  } = {}) {
    await this.client.init();
    const idsArray = ids ? toArray(ids) : void 0;
    await this.client.api.collectionDelete(
      this.client.tenant,
      this.client.database,
      this.id,
      {
        ids: idsArray,
        where,
        where_document: whereDocument
      },
      this.client.api.options
    );
  }
  /**
   * Forks the collection into a new collection with a new name and configuration.
   *
   * @param {Object} params - The parameters for forking the collection.
   * @param {string} params.newName - The name for the new forked collection.
   *
   * @returns {Promise<Collection>} A promise that resolves to the new forked Collection object.
   * @throws {Error} If there is an issue forking the collection.
   *
   * @example
   * ```typescript
   * const newCollection = await collection.fork({
   *   newName: "my_forked_collection",
   * });
   * ```
   */
  async fork({ newName }) {
    await this.client.init();
    const resp = await this.client.api.forkCollection(
      this.client.tenant,
      this.client.database,
      this.id,
      {
        new_name: newName
      },
      this.client.api.options
    );
    const newCollection = new _Collection(
      resp.name,
      resp.id,
      this.client,
      this.embeddingFunction,
      resp.metadata
    );
    return newCollection;
  }
};
function toArray(obj) {
  if (Array.isArray(obj)) {
    return obj;
  } else {
    return [obj];
  }
}
function toArrayOfArrays(obj) {
  if (obj.length === 0) {
    return [];
  }
  if (Array.isArray(obj[0])) {
    return obj;
  }
  if (obj[0] && typeof obj[0][Symbol.iterator] === "function") {
    return obj.map((el) => Array.from(el));
  }
  return [obj];
}
async function validateTenantDatabase(adminClient, tenant, database) {
  try {
    await adminClient.getTenant({ name: tenant });
  } catch (error) {
    if (error instanceof ChromaConnectionError) {
      throw error;
    }
    throw new Error(
      `Could not connect to tenant ${tenant}. Are you sure it exists? Underlying error:
${error}`
    );
  }
  try {
    await adminClient.getDatabase({ name: database, tenantName: tenant });
  } catch (error) {
    if (error instanceof ChromaConnectionError) {
      throw error;
    }
    throw new Error(
      `Could not connect to database ${database} for tenant ${tenant}. Are you sure it exists? Underlying error:
${error}`
    );
  }
}
function arrayifyParams(params) {
  return {
    ids: toArray(params.ids),
    embeddings: params.embeddings ? toArrayOfArrays(params.embeddings) : void 0,
    metadatas: params.metadatas ? toArray(params.metadatas) : void 0,
    documents: params.documents ? toArray(params.documents) : void 0
  };
}
async function prepareRecordRequest(reqParams, embeddingFunction, update) {
  const { ids, embeddings, metadatas, documents } = arrayifyParams(reqParams);
  if (!embeddings && !documents && !update) {
    throw new Error("embeddings and documents cannot both be undefined");
  }
  const embeddingsArray = embeddings ? embeddings : documents ? await embeddingFunction.generate(documents) : void 0;
  if (!embeddingsArray && !update) {
    throw new Error("Failed to generate embeddings for your request.");
  }
  for (let i = 0; i < ids.length; i += 1) {
    if (typeof ids[i] !== "string") {
      throw new Error(
        `Expected ids to be strings, found ${typeof ids[i]} at index ${i}`
      );
    }
  }
  if (embeddingsArray !== void 0 && ids.length !== embeddingsArray.length || metadatas !== void 0 && ids.length !== metadatas.length || documents !== void 0 && ids.length !== documents.length) {
    throw new Error(
      "ids, embeddings, metadatas, and documents must all be the same length"
    );
  }
  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== ids.length) {
    const duplicateIds = ids.filter(
      (item, index) => ids.indexOf(item) !== index
    );
    throw new Error(
      `ID's must be unique, found duplicates for: ${duplicateIds}`
    );
  }
  if (embeddingsArray && embeddingsArray.some((embedding) => embedding.length === 0)) {
    throw new Error("got empty embedding at pos");
  }
  return {
    ids,
    metadatas,
    documents,
    embeddings: embeddingsArray
  };
}
function wrapCollection(api, collection) {
  return new Collection(
    collection.name,
    collection.id,
    api,
    collection.embeddingFunction,
    collection.metadata,
    collection.configuration
  );
}
var tokenHeaderTypeToHeaderKey = (headerType) => {
  if (headerType === "AUTHORIZATION") {
    return "Authorization";
  } else {
    return "X-Chroma-Token";
  }
};
var base64Encode = (str) => {
  return Buffer.from(str).toString("base64");
};
var BasicAuthClientProvider = class {
  /**
   * Creates a new BasicAuthClientProvider.
   * @param textCredentials - The credentials for the authentication provider. Must be of the form "username:password". If not supplied, the environment variable CHROMA_CLIENT_AUTH_CREDENTIALS will be used.
   * @throws {Error} If neither credentials provider or text credentials are supplied.
   */
  constructor(textCredentials) {
    const creds = textCredentials ?? process.env.CHROMA_CLIENT_AUTH_CREDENTIALS;
    if (creds === void 0) {
      throw new Error(
        "Credentials must be supplied via environment variable (CHROMA_CLIENT_AUTH_CREDENTIALS) or passed in as configuration."
      );
    }
    this.credentials = {
      Authorization: "Basic " + base64Encode(creds)
    };
  }
  authenticate() {
    return this.credentials;
  }
};
var TokenAuthClientProvider = class {
  constructor(textCredentials, headerType = "AUTHORIZATION") {
    const creds = textCredentials ?? process.env.CHROMA_CLIENT_AUTH_CREDENTIALS;
    if (creds === void 0) {
      throw new Error(
        "Credentials must be supplied via environment variable (CHROMA_CLIENT_AUTH_CREDENTIALS) or passed in as configuration."
      );
    }
    const headerKey = tokenHeaderTypeToHeaderKey(headerType);
    const headerVal = headerType === "AUTHORIZATION" ? `Bearer ${creds}` : creds;
    this.credentials = {};
    this.credentials[headerKey] = headerVal;
  }
  authenticate() {
    return this.credentials;
  }
};
var authOptionsToAuthProvider = (auth) => {
  if (auth.provider === void 0) {
    throw new Error("Auth provider not specified");
  }
  if (auth.credentials === void 0) {
    throw new Error("Auth credentials not specified");
  }
  switch (auth.provider) {
    case "basic":
      return new BasicAuthClientProvider(auth.credentials);
    case "token":
      return new TokenAuthClientProvider(
        auth.credentials,
        auth.tokenHeaderType
      );
      break;
    default:
      throw new Error("Invalid auth provider");
  }
};
function isOfflineError(error) {
  var _a, _b, _c;
  return Boolean(
    ((error == null ? void 0 : error.name) === "TypeError" || (error == null ? void 0 : error.name) === "FetchError") && (((_a = error.message) == null ? void 0 : _a.includes("fetch failed")) || ((_b = error.message) == null ? void 0 : _b.includes("Failed to fetch")) || ((_c = error.message) == null ? void 0 : _c.includes("ENOTFOUND")))
  );
}
function parseServerError(error) {
  const regex = /(\w+)\('(.+)'\)/;
  const match = error == null ? void 0 : error.match(regex);
  if (match) {
    const [, name, message] = match;
    switch (name) {
      case "ValueError":
        return new ChromaValueError(message);
      default:
        return new ChromaError(name, message);
    }
  }
  return new ChromaServerError(
    "The server encountered an error while handling the request."
  );
}
var chromaFetch = async (input, init) => {
  try {
    const resp = await fetch(input, init);
    const clonedResp = resp.clone();
    const respBody = await clonedResp.json();
    if (!clonedResp.ok) {
      const error = createErrorByType(respBody == null ? void 0 : respBody.error, respBody == null ? void 0 : respBody.message);
      if (error) {
        throw error;
      }
      switch (resp.status) {
        case 400:
          throw new ChromaClientError(
            `Bad request to ${input} with status: ${resp.statusText}`
          );
        case 401:
          throw new ChromaUnauthorizedError(`Unauthorized`);
        case 403:
          throw new ChromaForbiddenError(
            `You do not have permission to access the requested resource.`
          );
        case 404:
          throw new ChromaNotFoundError(
            `The requested resource could not be found: ${input}`
          );
        case 409:
          throw new ChromaUniqueError("The resource already exists");
        case 500:
          throw parseServerError(respBody == null ? void 0 : respBody.error);
        case 502:
        case 503:
        case 504:
          throw new ChromaConnectionError(
            `Unable to connect to the chromadb server. Please try again later.`
          );
      }
      throw new Error(
        `Failed to fetch ${input} with status ${resp.status}: ${resp.statusText}`
      );
    }
    if (respBody == null ? void 0 : respBody.error) {
      throw parseServerError(respBody.error);
    }
    return resp;
  } catch (error) {
    if (isOfflineError(error)) {
      throw new ChromaConnectionError(
        "Failed to connect to chromadb. Make sure your server is running and try again. If you are running from a browser, make sure that your chromadb instance is configured to allow requests from the current origin using the CHROMA_SERVER_CORS_ALLOW_ORIGINS environment variable.",
        error
      );
    }
    throw error;
  }
};
var DEFAULT_TENANT = "default_tenant";
var DEFAULT_DATABASE = "default_database";
var AdminClient = class {
  /**
   * Creates a new AdminClient instance.
   * @param {Object} params - The parameters for creating a new client
   * @param {string} [params.path] - The base path for the Chroma API.
   * @returns {AdminClient} A new AdminClient instance.
   *
   * @example
   * ```typescript
   * const client = new AdminClient({
   *   path: "http://localhost:8000"
   * });
   * ```
   */
  constructor({
    path,
    fetchOptions,
    auth,
    tenant = DEFAULT_TENANT,
    database = DEFAULT_DATABASE
  } = {}) {
    this.tenant = DEFAULT_TENANT;
    this.database = DEFAULT_DATABASE;
    if (path === void 0)
      path = "http://localhost:8000";
    this.tenant = tenant;
    this.database = database;
    this.authProvider = void 0;
    const apiConfig = new Configuration({
      basePath: path
    });
    this.api = new ApiApi(apiConfig, void 0, chromaFetch);
    this.api.options = fetchOptions ?? {};
    if (auth !== void 0) {
      this.authProvider = authOptionsToAuthProvider(auth);
      this.api.options.headers = {
        ...this.api.options.headers,
        ...this.authProvider.authenticate()
      };
    }
  }
  /**
   * Sets the tenant and database for the client.
   *
   * @param {Object} params - The parameters for setting tenant and database.
   * @param {string} params.tenant - The name of the tenant.
   * @param {string} params.database - The name of the database.
   *
   * @returns {Promise<void>} A promise that returns nothing
   * @throws {Error} Any issues
   *
   * @example
   * ```typescript
   * await adminClient.setTenant({
   *   tenant: "my_tenant",
   *   database: "my_database",
   * });
   * ```
   */
  async setTenant({
    tenant = DEFAULT_TENANT,
    database = DEFAULT_DATABASE
  }) {
    await validateTenantDatabase(this, tenant, database);
    this.tenant = tenant;
    this.database = database;
  }
  /**
   * Sets the database for the client.
   *
   * @param {Object} params - The parameters for setting the database.
   * @param {string} params.database - The name of the database.
   *
   * @returns {Promise<void>} A promise that returns nothing
   * @throws {Error} Any issues
   *
   * @example
   * ```typescript
   * await adminClient.setDatabase({
   *   database: "my_database",
   * });
   * ```
   */
  async setDatabase({
    database = DEFAULT_DATABASE
  }) {
    await validateTenantDatabase(this, this.tenant, database);
    this.database = database;
  }
  /**
   * Creates a new tenant with the specified properties.
   *
   * @param {Object} params - The parameters for creating a new tenant.
   * @param {string} params.name - The name of the tenant.
   *
   * @returns {Promise<Tenant>} A promise that resolves to the created tenant.
   * @throws {Error} If there is an issue creating the tenant.
   *
   * @example
   * ```typescript
   * await adminClient.createTenant({
   *   name: "my_tenant",
   * });
   * ```
   */
  async createTenant({ name }) {
    await this.api.createTenant({ name }, this.api.options);
    return { name };
  }
  /**
   * Gets a tenant with the specified properties.
   *
   * @param {Object} params - The parameters for getting a tenant.
   * @param {string} params.name - The name of the tenant.
   *
   * @returns {Promise<Tenant>} A promise that resolves to the tenant.
   * @throws {Error} If there is an issue getting the tenant.
   *
   * @example
   * ```typescript
   * await adminClient.getTenant({
   *   name: "my_tenant",
   * });
   * ```
   */
  async getTenant({ name }) {
    const getTenant = await this.api.getTenant(
      name,
      this.api.options
    );
    return { name: getTenant.name };
  }
  /**
   * Creates a new database with the specified properties.
   *
   * @param {Object} params - The parameters for creating a new database.
   * @param {string} params.name - The name of the database.
   * @param {string} params.tenantName - The name of the tenant.
   *
   * @returns {Promise<Database>} A promise that resolves to the created database.
   * @throws {Error} If there is an issue creating the database.
   *
   * @example
   * ```typescript
   * await adminClient.createDatabase({
   *   name: "my_database",
   *   tenantName: "my_tenant",
   * });
   * ```
   */
  async createDatabase({
    name,
    tenantName
  }) {
    await this.api.createDatabase(tenantName, { name }, this.api.options);
    return { name };
  }
  /**
   * Gets a database with the specified properties.
   *
   * @param {Object} params - The parameters for getting a database.
   * @param {string} params.name - The name of the database.
   * @param {string} params.tenantName - The name of the tenant.
   *
   * @returns {Promise<Database>} A promise that resolves to the database.
   * @throws {Error} If there is an issue getting the database.
   *
   * @example
   * ```typescript
   * await adminClient.getDatabase({
   *   name: "my_database",
   *   tenantName: "my_tenant",
   * });
   * ```
   */
  async getDatabase({
    name,
    tenantName
  }) {
    const result = await this.api.getDatabase(
      tenantName,
      name,
      this.api.options
    );
    return result;
  }
  /**
   * Deletes a database.
   *
   * @param {Object} params - The parameters for deleting a database.
   * @param {string} params.name - The name of the database.
   * @param {string} params.tenantName - The name of the tenant.
   *
   * @returns {Promise<void>} A promise that returns nothing.
   * @throws {Error} If there is an issue deleting the database.
   */
  async deleteDatabase({
    name,
    tenantName
  }) {
    await this.api.deleteDatabase(tenantName, name, this.api.options);
    return;
  }
  /**
   * Lists database for a specific tenant.
   *
   * @param {Object} params - The parameters for listing databases.
   * @param {number} [params.limit] - The maximum number of databases to return.
   * @param {number} [params.offset] - The number of databases to skip.
   *
   * @returns {Promise<Database[]>} A promise that resolves to a list of databases.
   * @throws {Error} If there is an issue listing the databases.
   */
  async listDatabases({
    limit,
    offset,
    tenantName
  }) {
    const response = await this.api.listDatabases(
      tenantName,
      limit,
      offset,
      this.api.options
    );
    return response;
  }
};
var amazon_bedrock_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Amazon Bedrock Embedding Function Schema",
  description: "Schema for the Amazon Bedrock embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    session_args: {
      type: "object",
      description: "The arguments to pass to the boto3 session"
    },
    model_name: {
      type: "string",
      description: "The name of the model to use for embeddings"
    },
    kwargs: {
      type: "object",
      description: "Additional arguments to pass to the Amazon Bedrock client"
    }
  },
  required: [
    "session_args",
    "model_name",
    "kwargs"
  ],
  additionalProperties: false
};
var base_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Embedding Function Base Schema",
  description: "Base schema for all embedding functions in Chroma",
  type: "object",
  properties: {
    version: {
      type: "string",
      description: "Schema version for the embedding function"
    },
    name: {
      type: "string",
      description: "Name of the embedding function"
    },
    config: {
      type: "object",
      description: "Configuration parameters for the embedding function"
    }
  },
  required: [
    "version",
    "name",
    "config"
  ],
  additionalProperties: false
};
var chroma_langchain_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Langchain Embedding Function Schema",
  description: "Schema for the langchain embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    embedding_function: {
      type: "string",
      description: "Parameter embedding_function for the langchain embedding function"
    }
  },
  required: [
    "embedding_function"
  ],
  additionalProperties: false
};
var cohere_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Cohere Embedding Function Schema",
  description: "Schema for the Cohere embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "The name of the model to use for text embeddings"
    },
    api_key_env_var: {
      type: "string",
      description: "Environment variable name that contains your API key for the Cohere API"
    }
  },
  required: [
    "api_key_env_var",
    "model_name"
  ],
  additionalProperties: false
};
var default_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Default Embedding Function Schema",
  description: "Schema for the default embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {},
  required: [],
  additionalProperties: false
};
var google_generative_ai_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Google Generative AI Embedding Function Schema",
  description: "Schema for the Google Generative AI embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "The name of the model to use for text embeddings"
    },
    task_type: {
      type: "string",
      description: "The task type for the embeddings (e.g., RETRIEVAL_DOCUMENT)"
    },
    api_key_env_var: {
      type: "string",
      description: "Environment variable name that contains your API key for the Google Generative AI API"
    }
  },
  required: [
    "api_key_env_var",
    "model_name",
    "task_type"
  ],
  additionalProperties: false
};
var google_palm_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Google PaLM Embedding Function Schema",
  description: "Schema for the Google PaLM embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "The name of the model to use for text embeddings"
    },
    api_key_env_var: {
      type: "string",
      description: "Environment variable name that contains your API key for the Google PaLM API"
    }
  },
  required: [
    "api_key_env_var",
    "model_name"
  ],
  additionalProperties: false
};
var google_vertex_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Google Vertex Embedding Function Schema",
  description: "Schema for the Google Vertex embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "The name of the model to use for text embeddings"
    },
    project_id: {
      type: "string",
      description: "The Google Cloud project ID"
    },
    region: {
      type: "string",
      description: "The Google Cloud region"
    },
    api_key_env_var: {
      type: "string",
      description: "Environment variable name that contains your API key for the Google Vertex API"
    }
  },
  required: [
    "api_key_env_var",
    "model_name",
    "project_id",
    "region"
  ],
  additionalProperties: false
};
var huggingface_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "HuggingFace Embedding Function Schema",
  description: "Schema for the HuggingFace embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "The name of the model to use for text embeddings"
    },
    api_key_env_var: {
      type: "string",
      description: "Environment variable name that contains your API key for the HuggingFace API"
    }
  },
  required: [
    "api_key_env_var",
    "model_name"
  ],
  additionalProperties: false
};
var huggingface_server_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "HuggingFace Embedding Server Schema",
  description: "Schema for the HuggingFace embedding server configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    url: {
      type: "string",
      description: "The URL of the HuggingFace Embedding Server"
    },
    api_key_env_var: {
      type: "string",
      description: "The environment variable name that contains your API key for the HuggingFace API"
    }
  },
  required: [
    "url"
  ],
  additionalProperties: false
};
var instructor_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Instructor Embedding Function Schema",
  description: "Schema for the instructor embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "Parameter model_name for the instructor embedding function"
    },
    device: {
      type: "string",
      description: "Parameter device for the instructor embedding function"
    },
    instruction: {
      type: "string",
      description: "Parameter instruction for the instructor embedding function"
    }
  },
  required: [
    "model_name",
    "device"
  ],
  additionalProperties: false
};
var jina_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Jina Embedding Function Schema",
  description: "Schema for the jina embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "Parameter model_name for the jina embedding function"
    },
    api_key_env_var: {
      type: "string",
      description: "Parameter api_key_env_var for the jina embedding function"
    },
    task: {
      type: "string",
      description: "Parameter task for the jina embedding function"
    },
    late_chunking: {
      type: "boolean",
      description: "Parameter late_chunking for the jina embedding function"
    },
    truncate: {
      type: "boolean",
      description: "Parameter truncate for the jina embedding function"
    },
    dimensions: {
      type: "integer",
      description: "Parameter dimensions for the jina embedding function"
    },
    embedding_type: {
      type: "string",
      description: "Parameter embedding_type for the jina embedding function"
    },
    normalized: {
      type: "boolean",
      description: "Parameter normalized for the jina embedding function"
    }
  },
  required: [
    "api_key_env_var",
    "model_name"
  ],
  additionalProperties: false
};
var ollama_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Ollama Embedding Function Schema",
  description: "Schema for the Ollama embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    url: {
      type: "string",
      description: "The URL of the Ollama server"
    },
    model_name: {
      type: "string",
      description: "The name of the model to use for embeddings"
    },
    timeout: {
      type: "integer",
      description: "Timeout in seconds for the API request"
    }
  },
  required: [
    "url",
    "model_name"
  ],
  additionalProperties: false
};
var onnx_mini_lm_l6_v2_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Onnx_mini_lm_l6_v2 Embedding Function Schema",
  description: "Schema for the onnx_mini_lm_l6_v2 embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    preferred_providers: {
      type: "array",
      items: {
        type: "string"
      },
      description: "Parameter preferred_providers for the onnx_mini_lm_l6_v2 embedding function"
    }
  },
  required: [],
  additionalProperties: false
};
var open_clip_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Open_clip Embedding Function Schema",
  description: "Schema for the open_clip embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "Parameter model_name for the open_clip embedding function"
    },
    checkpoint: {
      type: "string",
      description: "Parameter checkpoint for the open_clip embedding function"
    },
    device: {
      type: "string",
      description: "Parameter device for the open_clip embedding function"
    }
  },
  required: [
    "model_name",
    "checkpoint",
    "device"
  ],
  additionalProperties: false
};
var openai_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "OpenAI Embedding Function Schema",
  description: "Schema for the OpenAI embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "The name of the model to use for text embeddings"
    },
    organization_id: {
      type: [
        "string",
        "null"
      ],
      description: "The OpenAI organization ID if applicable"
    },
    api_base: {
      type: [
        "string",
        "null"
      ],
      description: "The base path for the API"
    },
    api_type: {
      type: [
        "string",
        "null"
      ],
      description: "The type of the API deployment"
    },
    api_version: {
      type: [
        "string",
        "null"
      ],
      description: "The api version for the API"
    },
    deployment_id: {
      type: [
        "string",
        "null"
      ],
      description: "Deployment ID for Azure OpenAI"
    },
    default_headers: {
      type: [
        "object",
        "null"
      ],
      description: "A mapping of default headers to be sent with each API request"
    },
    dimensions: {
      type: [
        "integer",
        "null"
      ],
      description: "The number of dimensions for the embeddings"
    },
    api_key_env_var: {
      type: "string",
      description: "Environment variable name that contains your API key for the OpenAI API"
    }
  },
  required: [
    "api_key_env_var",
    "model_name"
  ],
  additionalProperties: false
};
var roboflow_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Roboflow Embedding Function Schema",
  description: "Schema for the roboflow embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    api_url: {
      type: "string",
      description: "Parameter api_url for the roboflow embedding function"
    },
    api_key_env_var: {
      type: "string",
      description: "Parameter api_key_env_var for the roboflow embedding function"
    }
  },
  required: [
    "api_key_env_var",
    "api_url"
  ],
  additionalProperties: false
};
var sentence_transformer_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "SentenceTransformer Embedding Function Schema",
  description: "Schema for the SentenceTransformer embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "Identifier of the SentenceTransformer model"
    },
    device: {
      type: "string",
      description: "Device used for computation"
    },
    normalize_embeddings: {
      type: "boolean",
      description: "Whether to normalize returned vectors"
    },
    kwargs: {
      type: "object",
      description: "Additional arguments to pass to the SentenceTransformer model",
      additionalProperties: {
        type: [
          "string",
          "integer",
          "number",
          "boolean",
          "array",
          "object"
        ]
      }
    }
  },
  required: [
    "model_name",
    "device",
    "normalize_embeddings"
  ],
  additionalProperties: false
};
var text2vec_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Text2vec Embedding Function Schema",
  description: "Schema for the text2vec embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "Parameter model_name for the text2vec embedding function"
    }
  },
  required: [
    "model_name"
  ],
  additionalProperties: false
};
var transformers_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Transformers Embedding Function Schema",
  description: "Schema for the Transformers embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model: {
      type: "string",
      description: "Identifier of the SentenceTransformer model"
    },
    revision: {
      type: "string",
      description: "Specific model version to use (can be a branch, tag name, or commit id)"
    },
    quantized: {
      type: "boolean",
      description: "Whether to load the 8-bit quantized version of the model"
    }
  },
  required: [
    "model",
    "revision",
    "quantized"
  ],
  additionalProperties: false
};
var voyageai_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Voyageai Embedding Function Schema",
  description: "Schema for the voyageai embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "Parameter model_name for the voyageai embedding function"
    },
    api_key_env_var: {
      type: "string",
      description: "Parameter api_key_env_var for the voyageai embedding function"
    }
  },
  required: [
    "api_key_env_var",
    "model_name"
  ],
  additionalProperties: false
};
var cloudflare_workers_ai_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Cloudflare Workers AI Embedding Function Schema",
  description: "Schema for the Cloudflare Workers AI embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "The name of the model to use for text embeddings"
    },
    account_id: {
      type: "string",
      description: "The account ID for the Cloudflare Workers AI API"
    },
    api_key_env_var: {
      type: "string",
      description: "The environment variable name that contains your API key for the Cloudflare Workers AI API"
    },
    gateway_id: {
      type: "string",
      description: "The ID of the Cloudflare AI Gateway to use for a more customized solution"
    }
  },
  required: [
    "api_key_env_var",
    "model_name",
    "account_id"
  ],
  additionalProperties: false
};
var together_ai_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Together AI Embedding Function Schema",
  description: "Schema for the Together AI embedding function configuration",
  version: "1.0.0",
  type: "object",
  properties: {
    model_name: {
      type: "string",
      description: "The name of the model to use for text embeddings"
    },
    api_key_env_var: {
      type: "string",
      description: "The environment variable name that contains your API key for the Together AI API"
    }
  },
  required: [
    "api_key_env_var",
    "model_name"
  ],
  additionalProperties: false
};
var import_ajv = __toESM2(require_ajv(), 1);
var ajv = new import_ajv.default({
  strict: false,
  // Allow unknown keywords
  allErrors: true
});
var schemaMap = {
  amazon_bedrock: amazon_bedrock_default,
  base_schema: base_schema_default,
  chroma_langchain: chroma_langchain_default,
  cohere: cohere_default,
  default: default_default,
  google_generative_ai: google_generative_ai_default,
  google_palm: google_palm_default,
  google_vertex: google_vertex_default,
  huggingface: huggingface_default,
  huggingface_server: huggingface_server_default,
  instructor: instructor_default,
  jina: jina_default,
  ollama: ollama_default,
  onnx_mini_lm_l6_v2: onnx_mini_lm_l6_v2_default,
  open_clip: open_clip_default,
  openai: openai_default,
  roboflow: roboflow_default,
  sentence_transformer: sentence_transformer_default,
  text2vec: text2vec_default,
  transformers: transformers_default,
  voyageai: voyageai_default,
  cloudflare_workers_ai: cloudflare_workers_ai_default,
  together_ai: together_ai_default
};
function loadSchema(schemaName) {
  if (!schemaMap[schemaName]) {
    throw new Error(`Schema '${schemaName}' not found`);
  }
  return schemaMap[schemaName];
}
function validateConfigSchema(config, schemaName) {
  const schema = loadSchema(schemaName);
  const validate = ajv.compile(schema);
  const valid = validate(config);
  if (!valid) {
    const errors = validate.errors || [];
    const errorPaths = errors.map((e) => `${e.instancePath || "/"}: ${e.message}`).join(", ");
    throw new Error(
      `Config validation failed for schema '${schemaName}': ${errorPaths}`
    );
  }
}
function getSchemaVersion(schemaName) {
  const schema = loadSchema(schemaName);
  return schema.version || "1.0.0";
}
function getAvailableSchemas() {
  return Object.keys(schemaMap).filter(
    (name) => name !== "base_schema"
  );
}
function getSchemaInfo() {
  const schemaInfo = {};
  for (const schemaName of getAvailableSchemas()) {
    try {
      const schema = schemaMap[schemaName];
      schemaInfo[schemaName] = {
        version: schema.version || "1.0.0",
        title: schema.title || "",
        description: schema.description || ""
      };
    } catch (error) {
      console.error(`Failed to load schema '${schemaName}':`, error);
    }
  }
  return schemaInfo;
}
var TransformersApi;
var DefaultEmbeddingFunction = class _DefaultEmbeddingFunction {
  /**
   * DefaultEmbeddingFunction constructor.
   * @param options The configuration options.
   * @param options.model The model to use to calculate embeddings. Defaults to 'Xenova/all-MiniLM-L6-v2', which is an ONNX port of `sentence-transformers/all-MiniLM-L6-v2`.
   * @param options.revision The specific model version to use (can be a branch, tag name, or commit id). Defaults to 'main'.
   * @param options.quantized Whether to load the 8-bit quantized version of the model. Defaults to `false`.
   * @param options.progress_callback If specified, this function will be called during model construction, to provide the user with progress updates.
   */
  constructor({
    model = "Xenova/all-MiniLM-L6-v2",
    revision = "main",
    quantized = false,
    progress_callback = null
  } = {}) {
    this.name = "default";
    this.model = model;
    this.revision = revision;
    this.quantized = quantized;
    this.progress_callback = progress_callback;
  }
  async generate(texts) {
    await this.loadClient();
    this.pipelinePromise = new Promise(async (resolve, reject) => {
      try {
        const pipeline = this.transformersApi;
        const quantized = this.quantized;
        const revision = this.revision;
        const progress_callback = this.progress_callback;
        resolve(
          await pipeline("feature-extraction", this.model, {
            quantized,
            revision,
            progress_callback
          })
        );
      } catch (e) {
        reject(e);
      }
    });
    let pipe = await this.pipelinePromise;
    let output = await pipe(texts, { pooling: "mean", normalize: true });
    return output.tolist();
  }
  getConfig() {
    return {
      model_name: this.model,
      revision: this.revision,
      quantized: this.quantized
    };
  }
  buildFromConfig(config) {
    return new _DefaultEmbeddingFunction({
      model: config.model_name,
      revision: config.revision,
      quantized: config.quantized
    });
  }
  validateConfigUpdate(oldConfig, newConfig) {
    if (oldConfig.model_name !== newConfig.model_name) {
      throw new Error(
        "DefaultEmbeddingFunction model_name cannot be changed after initialization."
      );
    }
  }
  validateConfig(config) {
    validateConfigSchema(config, "transformers");
  }
  async loadClient() {
    if (this.transformersApi)
      return;
    try {
      let { pipeline } = await _DefaultEmbeddingFunction.import();
      TransformersApi = pipeline;
    } catch (_a) {
      if (_a.code === "MODULE_NOT_FOUND") {
        throw new Error(
          "Please install the chromadb-default-embed package to use the DefaultEmbeddingFunction, `npm install chromadb-default-embed`"
        );
      }
      throw _a;
    }
    this.transformersApi = TransformersApi;
  }
  /** @ignore */
  static async import() {
    try {
      const { pipeline } = await import("./transformers-6HVIHXBA.js");
      return { pipeline };
    } catch (e) {
      throw new Error(
        "Please install chromadb-default-embed as a dependency with, e.g. `npm install chromadb-default-embed`"
      );
    }
  }
};
var DEFAULT_TENANT2 = "default_tenant";
var DEFAULT_DATABASE2 = "default_database";
var ChromaClient = class {
  /**
   * Creates a new ChromaClient instance.
   * @param {Object} params - The parameters for creating a new client
   * @param {string} [params.path] - The base path for the Chroma API.
   * @returns {ChromaClient} A new ChromaClient instance.
   *
   * @example
   * ```typescript
   * const client = new ChromaClient({
   *   path: "http://localhost:8000"
   * });
   * ```
   */
  constructor({
    path = "http://localhost:8000",
    fetchOptions,
    auth,
    tenant = DEFAULT_TENANT2,
    database = DEFAULT_DATABASE2
  } = {}) {
    this.tenant = tenant;
    this.database = database;
    this.authProvider = void 0;
    const apiConfig = new Configuration({
      basePath: path
    });
    this.api = new ApiApi(apiConfig, void 0, chromaFetch);
    this.api.options = fetchOptions ?? {};
    this.api.options.headers = {
      ...this.api.options.headers,
      "user-agent": `Chroma Javascript Client v${version} (https://github.com/chroma-core/chroma)`
    };
    if (auth !== void 0) {
      this.authProvider = authOptionsToAuthProvider(auth);
      this.api.options.headers = {
        ...this.api.options.headers,
        ...this.authProvider.authenticate()
      };
    }
    this._adminClient = new AdminClient({
      path,
      fetchOptions,
      auth,
      tenant,
      database
    });
  }
  /** @ignore */
  async init() {
    if (!this._initPromise) {
      if (this.authProvider !== void 0) {
        await this.getUserIdentity();
      }
      this._initPromise = validateTenantDatabase(
        this._adminClient,
        this.tenant,
        this.database
      );
    }
    return this._initPromise;
  }
  /**
   * Tries to set the tenant and database for the client.
   *
   * @returns {Promise<void>} A promise that resolves when the tenant/database is resolved.
   * @throws {Error} If there is an issue resolving the tenant and database.
   *
   */
  async getUserIdentity() {
    const user_identity = await this.api.getUserIdentity(
      this.api.options
    );
    const user_tenant = user_identity.tenant;
    const user_databases = user_identity.databases;
    if (user_tenant !== null && user_tenant !== void 0 && user_tenant !== "*" && this.tenant == DEFAULT_TENANT2) {
      this.tenant = user_tenant;
    }
    if (user_databases !== null && user_databases !== void 0 && user_databases.length == 1 && user_databases[0] !== "*" && this.database == DEFAULT_DATABASE2) {
      this.database = user_databases[0];
    }
  }
  /**
   * Resets the state of the object by making an API call to the reset endpoint.
   *
   * @returns {Promise<boolean>} A promise that resolves when the reset operation is complete.
   * @throws {ChromaConnectionError} If the client is unable to connect to the server.
   * @throws {ChromaServerError} If the server experienced an error while the state.
   *
   * @example
   * ```typescript
   * await client.reset();
   * ```
   */
  async reset() {
    await this.init();
    return await this.api.reset(this.api.options);
  }
  /**
   * Returns the version of the Chroma API.
   * @returns {Promise<string>} A promise that resolves to the version of the Chroma API.
   * @throws {ChromaConnectionError} If the client is unable to connect to the server.
   *
   * @example
   * ```typescript
   * const version = await client.version();
   * ```
   */
  async version() {
    return await this.api.version(this.api.options);
  }
  /**
   * Returns a heartbeat from the Chroma API.
   * @returns {Promise<number>} A promise that resolves to the heartbeat from the Chroma API.
   * @throws {ChromaConnectionError} If the client is unable to connect to the server.
   *
   * @example
   * ```typescript
   * const heartbeat = await client.heartbeat();
   * ```
   */
  async heartbeat() {
    const response = await this.api.heartbeat(this.api.options);
    return response["nanosecond heartbeat"];
  }
  /**
   * Creates a new collection with the specified properties.
   *
   * @param {Object} params - The parameters for creating a new collection.
   * @param {string} params.name - The name of the collection.
   * @param {CollectionMetadata} [params.metadata] - Optional metadata associated with the collection.
   * @param {IEmbeddingFunction} [params.embeddingFunction] - Optional custom embedding function for the collection.
   *
   * @returns {Promise<Collection>} A promise that resolves to the created collection.
   * @throws {ChromaConnectionError} If the client is unable to connect to the server.
   * @throws {ChromaServerError} If there is an issue creating the collection.
   *
   * @example
   * ```typescript
   * const collection = await client.createCollection({
   *   name: "my_collection",
   *   metadata: {
   *     "description": "My first collection"
   *   }
   * });
   * ```
   */
  async createCollection({
    name,
    metadata,
    embeddingFunction = new DefaultEmbeddingFunction(),
    configuration
  }) {
    await this.init();
    let collectionConfiguration = void 0;
    if (configuration) {
      collectionConfiguration = loadApiCollectionConfigurationFromCreateCollectionConfiguration(
        configuration
      );
    }
    const newCollection = await this.api.createCollection(
      this.tenant,
      this.database,
      {
        name,
        configuration: collectionConfiguration,
        metadata
      },
      this.api.options
    );
    let config = {};
    try {
      config = newCollection.configuration_json;
    } catch {
      (0, import_console.warn)(
        "Server does not respond with configuration_json. Please update server"
      );
    }
    return wrapCollection(this, {
      name: newCollection.name,
      id: newCollection.id,
      metadata: newCollection.metadata,
      embeddingFunction,
      configuration: config
    });
  }
  /**
   * Gets or creates a collection with the specified properties.
   *
   * @param {Object} params - The parameters for creating a new collection.
   * @param {string} params.name - The name of the collection.
   * @param {CollectionMetadata} [params.metadata] - Optional metadata associated with the collection.
   * @param {IEmbeddingFunction} [params.embeddingFunction] - Optional custom embedding function for the collection.
   *
   * @returns {Promise<Collection>} A promise that resolves to the got or created collection.
   * @throws {Error} If there is an issue getting or creating the collection.
   *
   * @example
   * ```typescript
   * const collection = await client.getOrCreateCollection({
   *   name: "my_collection",
   *   metadata: {
   *     "description": "My first collection"
   *   }
   * });
   * ```
   */
  async getOrCreateCollection({
    name,
    metadata,
    embeddingFunction = new DefaultEmbeddingFunction(),
    configuration
  }) {
    await this.init();
    let collectionConfiguration = void 0;
    if (configuration) {
      collectionConfiguration = loadApiCollectionConfigurationFromCreateCollectionConfiguration(
        configuration
      );
    }
    const newCollection = await this.api.createCollection(
      this.tenant,
      this.database,
      {
        name,
        configuration: collectionConfiguration,
        metadata,
        get_or_create: true
      },
      this.api.options
    );
    let config = {};
    try {
      config = newCollection.configuration_json;
    } catch {
      (0, import_console.warn)(
        "Server does not respond with configuration_json. Please update server"
      );
    }
    return wrapCollection(this, {
      name: newCollection.name,
      id: newCollection.id,
      metadata: newCollection.metadata,
      embeddingFunction,
      configuration: config
    });
  }
  /**
   * Get all collection names.
   *
   * @returns {Promise<string[]>} A promise that resolves to a list of collection names.
   * @param {PositiveInteger} [params.limit] - Optional limit on the number of items to get.
   * @param {PositiveInteger} [params.offset] - Optional offset on the items to get.
   * @throws {Error} If there is an issue listing the collections.
   *
   * @example
   * ```typescript
   * const collections = await client.listCollections({
   *     limit: 10,
   *     offset: 0,
   * });
   * ```
   */
  async listCollections({ limit, offset } = {}) {
    await this.init();
    const response = await this.api.listCollections(
      this.tenant,
      this.database,
      limit,
      offset,
      this.api.options
    );
    return response.map((collection) => collection.name);
  }
  /**
   * List collection names, IDs, and metadata.
   *
   * @param {PositiveInteger} [params.limit] - Optional limit on the number of items to get.
   * @param {PositiveInteger} [params.offset] - Optional offset on the items to get.
   * @throws {Error} If there is an issue listing the collections.
   * @returns {Promise<{ name: string, id: string, metadata?: CollectionMetadata }[]>} A promise that resolves to a list of collection names, IDs, and metadata.
   *
   * @example
   * ```typescript
   * const collections = await client.listCollectionsAndMetadata({
   *    limit: 10,
   *    offset: 0,
   * });
   */
  async listCollectionsAndMetadata({
    limit,
    offset
  } = {}) {
    await this.init();
    const results = await this.api.listCollections(
      this.tenant,
      this.database,
      limit,
      offset,
      this.api.options
    );
    return results ?? [];
  }
  /**
   * Counts all collections.
   *
   * @returns {Promise<number>} A promise that resolves to the number of collections.
   * @throws {Error} If there is an issue counting the collections.
   *
   * @example
   * ```typescript
   * const collections = await client.countCollections();
   * ```
   */
  async countCollections() {
    await this.init();
    const response = await this.api.countCollections(
      this.tenant,
      this.database,
      this.api.options
    );
    return response;
  }
  /**
   * Gets a collection with the specified name.
   * @param {Object} params - The parameters for getting a collection.
   * @param {string} params.name - The name of the collection.
   * @param {IEmbeddingFunction} [params.embeddingFunction] - Optional custom embedding function for the collection.
   * @returns {Promise<Collection>} A promise that resolves to the collection.
   * @throws {Error} If there is an issue getting the collection.
   *
   * @example
   * ```typescript
   * const collection = await client.getCollection({
   *   name: "my_collection"
   * });
   * ```
   */
  async getCollection({
    name,
    embeddingFunction
  }) {
    await this.init();
    const response = await this.api.getCollection(
      this.tenant,
      this.database,
      name,
      this.api.options
    );
    let config = {};
    try {
      config = response.configuration_json;
    } catch {
      (0, import_console.warn)(
        "Server does not respond with configuration_json. Please update server"
      );
    }
    return wrapCollection(this, {
      id: response.id,
      name: response.name,
      metadata: response.metadata,
      embeddingFunction: embeddingFunction !== void 0 ? embeddingFunction : new DefaultEmbeddingFunction(),
      configuration: config
    });
  }
  /**
   * Deletes a collection with the specified name.
   * @param {Object} params - The parameters for deleting a collection.
   * @param {string} params.name - The name of the collection.
   * @returns {Promise<void>} A promise that resolves when the collection is deleted.
   * @throws {Error} If there is an issue deleting the collection.
   *
   * @example
   * ```typescript
   * await client.deleteCollection({
   *  name: "my_collection"
   * });
   * ```
   */
  async deleteCollection({ name }) {
    await this.init();
    await this.api.deleteCollection(
      this.tenant,
      this.database,
      name,
      this.api.options
    );
  }
};
var CloudClient = class extends ChromaClient {
  constructor({
    apiKey,
    database,
    tenant,
    cloudHost,
    cloudPort
  }) {
    if (!apiKey) {
      apiKey = process.env.CHROMA_API_KEY;
    }
    if (!apiKey) {
      throw new Error("No API key provided");
    }
    cloudHost = cloudHost || "https://api.trychroma.com";
    cloudPort = cloudPort || "8000";
    const path = `${cloudHost}:${cloudPort}`;
    const auth = {
      provider: "token",
      credentials: apiKey,
      tokenHeaderType: "X_CHROMA_TOKEN"
    };
    return new ChromaClient({
      path,
      auth,
      database,
      tenant
    });
    super();
  }
};
var CohereAISDK56 = class {
  constructor(configuration) {
    this.apiKey = configuration.apiKey;
  }
  async loadClient() {
    if (this.cohereClient)
      return;
    const { default: cohere } = await import("./cohere-ai-ECVPXXSP.js");
    cohere.init(this.apiKey);
    this.cohereClient = cohere;
  }
  async createEmbedding(params) {
    await this.loadClient();
    return await this.cohereClient.embed({
      texts: params.input,
      model: params.model
    }).then((response) => {
      return response.body.embeddings;
    });
  }
};
var CohereAISDK7 = class {
  constructor(configuration) {
    this.apiKey = configuration.apiKey;
  }
  async loadClient() {
    if (this.cohereClient)
      return;
    const cohere = await import("./cohere-ai-ECVPXXSP.js").then((cohere2) => {
      return cohere2;
    });
    this.cohereClient = new cohere.CohereClient({
      token: this.apiKey
    });
  }
  async createEmbedding(params) {
    await this.loadClient();
    if (params.isImage) {
      return await this.cohereClient.embed({ images: params.input, model: params.model }).then((response) => {
        return response.embeddings;
      });
    } else {
      return await this.cohereClient.embed({ texts: params.input, model: params.model }).then((response) => {
        return response.embeddings;
      });
    }
  }
};
var CohereEmbeddingFunction = class _CohereEmbeddingFunction {
  constructor({
    cohere_api_key,
    model = "large",
    cohere_api_key_env_var = "CHROMA_COHERE_API_KEY",
    /**
     * If true, the input texts passed to `generate` are expected to be
     * base64 encoded PNG data URIs.
     */
    isImage = false
  }) {
    this.name = "cohere";
    this.model = model;
    this.isImage = isImage;
    const apiKey = cohere_api_key ?? process.env[cohere_api_key_env_var];
    if (!apiKey) {
      throw new Error(
        `Cohere API key is required. Please provide it in the constructor or set the environment variable ${cohere_api_key_env_var}.`
      );
    }
    this.apiKey = apiKey;
    this.apiKeyEnvVar = cohere_api_key_env_var;
  }
  async initCohereClient() {
    if (this.cohereAiApi)
      return;
    try {
      this.cohereAiApi = await import("./cohere-ai-ECVPXXSP.js").then((cohere) => {
        if (cohere.CohereClient) {
          return new CohereAISDK7({ apiKey: this.apiKey });
        } else {
          return new CohereAISDK56({ apiKey: this.apiKey });
        }
      });
    } catch (e) {
      if (e.code === "MODULE_NOT_FOUND") {
        throw new Error(
          "Please install the cohere-ai package to use the CohereEmbeddingFunction, `npm install -S cohere-ai`"
        );
      }
      throw e;
    }
  }
  async generate(texts) {
    await this.initCohereClient();
    return await this.cohereAiApi.createEmbedding({
      model: this.model,
      input: texts,
      isImage: this.isImage
    });
  }
  buildFromConfig(config) {
    return new _CohereEmbeddingFunction({
      model: config.model_name,
      cohere_api_key_env_var: config.api_key_env_var
    });
  }
  getConfig() {
    return {
      model_name: this.model,
      api_key_env_var: this.apiKeyEnvVar
    };
  }
  validateConfigUpdate(oldConfig, newConfig) {
    if (oldConfig.model_name !== newConfig.model_name) {
      throw new Error(
        "CohereEmbeddingFunction model_name cannot be changed after initialization."
      );
    }
  }
  validateConfig(config) {
    validateConfigSchema(config, "cohere");
  }
  supportedSpaces() {
    if (this.model === "embed-english-v3.0") {
      return ["cosine", "l2", "ip"];
    }
    if (this.model === "embed-english-light-v3.0") {
      return ["cosine", "ip", "l2"];
    }
    if (this.model === "embed-english-v2.0") {
      return ["cosine"];
    }
    if (this.model === "embed-english-light-v2.0") {
      return ["cosine"];
    }
    if (this.model === "embed-multilingual-v3.0") {
      return ["cosine", "l2", "ip"];
    }
    if (this.model === "embed-multilingual-light-v3.0") {
      return ["cosine", "l2", "ip"];
    }
    if (this.model === "embed-multilingual-v2.0") {
      return ["ip"];
    }
    return ["cosine", "l2", "ip"];
  }
  defaultSpace() {
    if (this.model == "embed-multilingual-v2.0") {
      return "ip";
    }
    return "cosine";
  }
};
var googleGenAiApi;
var GoogleGenerativeAiEmbeddingFunction = class _GoogleGenerativeAiEmbeddingFunction {
  constructor({
    googleApiKey,
    model = "embedding-001",
    taskType = "RETRIEVAL_DOCUMENT",
    apiKeyEnvVar = "GOOGLE_API_KEY"
  }) {
    this.name = "google_generative_ai";
    const apiKey = googleApiKey ?? process.env[apiKeyEnvVar];
    if (!apiKey) {
      throw new Error(
        `Google API key is required. Please provide it in the constructor or set the environment variable ${apiKeyEnvVar}.`
      );
    }
    this.api_key = apiKey;
    this.api_key_env_var = apiKeyEnvVar;
    this.model = model;
    this.taskType = taskType;
  }
  async loadClient() {
    if (this.googleGenAiApi)
      return;
    try {
      const { googleGenAi } = await _GoogleGenerativeAiEmbeddingFunction.import();
      googleGenAiApi = googleGenAi;
      googleGenAiApi = new googleGenAiApi(this.api_key);
    } catch (_a) {
      if (_a.code === "MODULE_NOT_FOUND") {
        throw new Error(
          "Please install the @google/generative-ai package to use the GoogleGenerativeAiEmbeddingFunction, `npm install @google/generative-ai`"
        );
      }
      throw _a;
    }
    this.googleGenAiApi = googleGenAiApi;
  }
  async generate(texts) {
    await this.loadClient();
    const model = this.googleGenAiApi.getGenerativeModel({ model: this.model });
    const response = await model.batchEmbedContents({
      requests: texts.map((t) => ({
        content: { parts: [{ text: t }] },
        taskType: this.taskType
      }))
    });
    const embeddings = response.embeddings.map((e) => e.values);
    return embeddings;
  }
  /** @ignore */
  static async import() {
    try {
      const { GoogleGenerativeAI } = await import("./dist-LTAOQP65.js");
      const googleGenAi = GoogleGenerativeAI;
      return { googleGenAi };
    } catch (e) {
      throw new Error(
        "Please install @google/generative-ai as a dependency with, e.g. `npm install @google/generative-ai`"
      );
    }
  }
  buildFromConfig(config) {
    return new _GoogleGenerativeAiEmbeddingFunction({
      model: config.model_name,
      apiKeyEnvVar: config.api_key_env_var,
      taskType: config.task_type
    });
  }
  getConfig() {
    return {
      api_key_env_var: this.api_key_env_var,
      model_name: this.model,
      task_type: this.taskType
    };
  }
  validateConfigUpdate(oldConfig, newConfig) {
    if (oldConfig.model_name !== newConfig.model_name) {
      throw new Error("The model name cannot be changed after initialization.");
    }
    if (oldConfig.taskType !== newConfig.taskType) {
      throw new Error("The task type cannot be changed after initialization.");
    }
  }
  validateConfig(config) {
    validateConfigSchema(config, "google_generative_ai");
  }
};
var HuggingFaceEmbeddingServerFunction = class _HuggingFaceEmbeddingServerFunction {
  constructor({
    api_key,
    url,
    api_key_env_var
  }) {
    this.name = "huggingface_server";
    let apiKey;
    this.api_key_env_var = api_key_env_var;
    if (this.api_key_env_var) {
      apiKey = api_key || process.env[this.api_key_env_var];
    } else {
      apiKey = api_key;
    }
    this.url = url;
    if (apiKey) {
      this.headers = {
        Authorization: `Bearer ${apiKey}`
      };
    }
  }
  async generate(texts) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ inputs: texts })
    });
    if (!response.ok) {
      throw new Error(`Failed to generate embeddings: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }
  buildFromConfig(config) {
    return new _HuggingFaceEmbeddingServerFunction({
      url: config.url,
      api_key_env_var: config.api_key_env_var
    });
  }
  getConfig() {
    return {
      url: this.url,
      api_key_env_var: this.api_key_env_var
    };
  }
  validateConfigUpdate(oldConfig, newConfig) {
    if (oldConfig.url !== newConfig.url) {
      throw new Error("Changing the URL is not allowed.");
    }
  }
  validateConfig(config) {
    validateConfigSchema(config, "huggingface_server");
  }
};
var JinaEmbeddingFunction = class _JinaEmbeddingFunction {
  constructor({
    jinaai_api_key,
    model_name = "jina-embeddings-v2-base-en",
    api_key_env_var = "JINAAI_API_KEY",
    task,
    late_chunking,
    truncate,
    dimensions,
    embedding_type,
    normalized
  }) {
    this.name = "jina";
    const apiKey = jinaai_api_key ?? process.env[api_key_env_var];
    if (!apiKey) {
      throw new Error(
        `Jina AI API key is required. Please provide it in the constructor or set the environment variable ${api_key_env_var}.`
      );
    }
    this.model_name = model_name;
    this.api_key_env_var = api_key_env_var;
    this.task = task;
    this.late_chunking = late_chunking;
    this.truncate = truncate;
    this.dimensions = dimensions;
    this.embedding_type = embedding_type;
    this.normalized = normalized;
    this.api_url = "https://api.jina.ai/v1/embeddings";
    this.headers = {
      Authorization: `Bearer ${jinaai_api_key}`,
      "Accept-Encoding": "identity",
      "Content-Type": "application/json"
    };
  }
  async generate(texts) {
    let json_body = {
      input: texts,
      model: this.model_name
    };
    if (this.task) {
      json_body.task = this.task;
    }
    if (this.late_chunking) {
      json_body.late_chunking = this.late_chunking;
    }
    if (this.truncate) {
      json_body.truncate = this.truncate;
    }
    if (this.dimensions) {
      json_body.dimensions = this.dimensions;
    }
    if (this.embedding_type) {
      json_body.embedding_type = this.embedding_type;
    }
    if (this.normalized) {
      json_body.normalized = this.normalized;
    }
    try {
      const response = await fetch(this.api_url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(json_body)
      });
      const data = await response.json();
      if (!data || !data.data) {
        throw new Error(data.detail);
      }
      const embeddings = data.data;
      const sortedEmbeddings = embeddings.sort((a, b) => a.index - b.index);
      return sortedEmbeddings.map((result) => result.embedding);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error calling Jina AI API: ${error.message}`);
      } else {
        throw new Error(`Error calling Jina AI API: ${error}`);
      }
    }
  }
  buildFromConfig(config) {
    return new _JinaEmbeddingFunction({
      model_name: config.model_name,
      api_key_env_var: config.api_key_env_var,
      task: config.task,
      late_chunking: config.late_chunking,
      truncate: config.truncate,
      dimensions: config.dimensions,
      embedding_type: config.embedding_type,
      normalized: config.normalized
    });
  }
  getConfig() {
    return {
      api_key_env_var: this.api_key_env_var,
      model_name: this.model_name,
      task: this.task,
      late_chunking: this.late_chunking,
      truncate: this.truncate,
      dimensions: this.dimensions,
      embedding_type: this.embedding_type,
      normalized: this.normalized
    };
  }
  validateConfig(config) {
    validateConfigSchema(config, "jina");
  }
};
var OllamaEmbeddingFunction = class _OllamaEmbeddingFunction {
  constructor({
    url = "http://localhost:11434",
    model = "chroma/all-minilm-l6-v2-f32"
  } = {}) {
    this.name = "ollama";
    if (url && url.endsWith("/api/embeddings")) {
      this.url = url.slice(0, -"/api/embeddings".length);
    } else {
      this.url = url;
    }
    this.model = model;
  }
  async initClient() {
    if (this.ollamaClient)
      return;
    try {
      const { ollama } = await _OllamaEmbeddingFunction.import();
      this.ollamaClient = new ollama.Ollama({ host: this.url });
    } catch (e) {
      if (e.code === "MODULE_NOT_FOUND") {
        throw new Error(
          "Please install the ollama package to use the OllamaEmbeddingFunction, `npm install -S ollama`"
        );
      }
      throw e;
    }
  }
  /** @ignore */
  static async import() {
    try {
      const { ollama } = await import("./dist-FUL3ZJ7W.js").then((m) => ({ ollama: m }));
      return { ollama };
    } catch (e) {
      throw new Error(
        "Please install Ollama as a dependency with, e.g. `npm install ollama`"
      );
    }
  }
  async generate(texts) {
    await this.initClient();
    return await this.ollamaClient.embed({
      model: this.model,
      input: texts
    }).then((response) => {
      return response.embeddings;
    });
  }
  buildFromConfig(config) {
    return new _OllamaEmbeddingFunction({
      url: config.url,
      model: config.model_name
    });
  }
  getConfig() {
    return {
      url: this.url,
      model_name: this.model
    };
  }
  validateConfig(config) {
    validateConfigSchema(config, "ollama");
  }
};
var OpenAIApi;
var openAiVersion = null;
var openAiMajorVersion = null;
var OpenAIAPIv3 = class {
  constructor(configuration) {
    this.configuration = new OpenAIApi.Configuration({
      organization: configuration.organization,
      apiKey: configuration.apiKey
    });
    this.openai = new OpenAIApi.OpenAIApi(this.configuration);
  }
  async createEmbedding(params) {
    const embeddings = [];
    const response = await this.openai.createEmbedding({
      model: params.model,
      input: params.input
    }).catch((error) => {
      throw error;
    });
    const data = response.data["data"];
    for (let i = 0; i < data.length; i += 1) {
      embeddings.push(data[i]["embedding"]);
    }
    return embeddings;
  }
};
var OpenAIAPIv4 = class {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.openai = new OpenAIApi({
      apiKey: this.apiKey
    });
  }
  async createEmbedding(params) {
    const embeddings = [];
    const response = await this.openai.embeddings.create(params);
    const data = response["data"];
    for (let i = 0; i < data.length; i += 1) {
      embeddings.push(data[i]["embedding"]);
    }
    return embeddings;
  }
};
var OpenAIEmbeddingFunction = class _OpenAIEmbeddingFunction {
  constructor({
    openai_api_key,
    openai_model = "text-embedding-ada-002",
    openai_organization_id,
    openai_embedding_dimensions,
    openai_api_key_env_var = "OPENAI_API_KEY"
  }) {
    this.name = "openai";
    const apiKey = openai_api_key ?? process.env[openai_api_key_env_var];
    if (!apiKey) {
      throw new Error(
        `OpenAI API key is required. Please provide it in the constructor or set the environment variable ${openai_api_key_env_var}.`
      );
    }
    this.api_key = apiKey;
    this.org_id = openai_organization_id ?? "";
    this.model = openai_model;
    this.dimensions = openai_embedding_dimensions ?? 1536;
  }
  async loadClient() {
    if (this.openaiApi)
      return;
    try {
      const { openai, version: version2 } = await _OpenAIEmbeddingFunction.import();
      OpenAIApi = openai;
      let versionVar = version2;
      openAiVersion = versionVar.replace(/[^0-9.]/g, "");
      openAiMajorVersion = parseInt(openAiVersion.split(".")[0]);
    } catch (_a) {
      if (_a.code === "MODULE_NOT_FOUND") {
        throw new Error(
          "Please install the openai package to use the OpenAIEmbeddingFunction, e.g. `npm install openai`"
        );
      }
      throw _a;
    }
    if (openAiMajorVersion > 3) {
      this.openaiApi = new OpenAIAPIv4(this.api_key);
    } else {
      this.openaiApi = new OpenAIAPIv3({
        organization: this.org_id,
        apiKey: this.api_key
      });
    }
  }
  async generate(texts) {
    await this.loadClient();
    return await this.openaiApi.createEmbedding({
      model: this.model,
      input: texts,
      dimensions: this.dimensions
    }).catch((error) => {
      throw error;
    });
  }
  /** @ignore */
  static async import() {
    try {
      const { default: openai } = await import("./openai-HXDRH7CW.js");
      const { VERSION } = await import("./version-CNW66L3D.js");
      return { openai, version: VERSION };
    } catch (e) {
      throw new Error(
        "Please install the openai package to use the OpenAIEmbeddingFunction, e.g. `npm install openai`"
      );
    }
  }
  buildFromConfig(config) {
    return new _OpenAIEmbeddingFunction({
      openai_api_key: config.api_key_env_var,
      openai_model: config.model_name,
      openai_organization_id: config.organization_id,
      openai_embedding_dimensions: config.dimensions
    });
  }
  getConfig() {
    return {
      api_key_env_var: this.api_key,
      model_name: this.model,
      organization_id: this.org_id,
      dimensions: this.dimensions ?? 1536
    };
  }
  validateConfigUpdate(oldConfig, newConfig) {
    if (oldConfig.model_name !== newConfig.model_name) {
      throw new Error("Cannot change model name.");
    }
  }
  validateConfig(config) {
    validateConfigSchema(config, "openai");
  }
};
var TransformersApi2;
var TransformersEmbeddingFunction = class _TransformersEmbeddingFunction {
  /**
   * TransformersEmbeddingFunction constructor.
   * @param options The configuration options.
   * @param options.model The model to use to calculate embeddings. Defaults to 'Xenova/all-MiniLM-L6-v2', which is an ONNX port of `sentence-transformers/all-MiniLM-L6-v2`.
   * @param options.revision The specific model version to use (can be a branch, tag name, or commit id). Defaults to 'main'.
   * @param options.quantized Whether to load the 8-bit quantized version of the model. Defaults to `false`.
   * @param options.progress_callback If specified, this function will be called during model construction, to provide the user with progress updates.
   */
  constructor({
    model = "Xenova/all-MiniLM-L6-v2",
    revision = "main",
    quantized = false,
    progress_callback = null
  } = {}) {
    this.name = "transformers";
    this.model = model;
    this.revision = revision;
    this.quantized = quantized;
    this.progress_callback = progress_callback;
  }
  async generate(texts) {
    await this.loadClient();
    this.pipelinePromise = new Promise(async (resolve, reject) => {
      try {
        const pipeline = this.transformersApi;
        const quantized = this.quantized;
        const revision = this.revision;
        const progress_callback = this.progress_callback;
        resolve(
          await pipeline("feature-extraction", this.model, {
            quantized,
            revision,
            progress_callback
          })
        );
      } catch (e) {
        reject(e);
      }
    });
    let pipe = await this.pipelinePromise;
    let output = await pipe(texts, { pooling: "mean", normalize: true });
    return output.tolist();
  }
  async loadClient() {
    if (this.transformersApi)
      return;
    try {
      let { pipeline } = await _TransformersEmbeddingFunction.import();
      TransformersApi2 = pipeline;
    } catch (_a) {
      if (_a.code === "MODULE_NOT_FOUND") {
        throw new Error(
          "Please install the @xenova/transformers package to use the TransformersEmbeddingFunction, `npm install @xenova/transformers`"
        );
      }
      throw _a;
    }
    this.transformersApi = TransformersApi2;
  }
  /** @ignore */
  static async import() {
    try {
      const { pipeline } = await import("./transformers-TKW6WJCE.js");
      return { pipeline };
    } catch (e) {
      throw new Error(
        "Please install @xenova/transformers as a dependency with, e.g. `npm install @xenova/transformers`"
      );
    }
  }
  buildFromConfig(config) {
    return new _TransformersEmbeddingFunction({
      model: config.model,
      revision: config.revision,
      quantized: config.quantized
    });
  }
  getConfig() {
    return {
      model: this.model,
      revision: this.revision,
      quantized: this.quantized
    };
  }
  validateConfigUpdate(oldConfig, newConfig) {
    if (oldConfig.model !== newConfig.model) {
      throw new Error("Cannot change the model of the embedding function.");
    }
    if (oldConfig.revision !== newConfig.revision) {
      throw new Error("Cannot change the revision of the embedding function.");
    }
    if (oldConfig.quantized !== newConfig.quantized) {
      throw new Error(
        "Cannot change the quantization of the embedding function."
      );
    }
  }
  validateConfig(config) {
    validateConfigSchema(config, "transformers");
  }
};
var VoyageAIAPI = class {
  constructor(configuration) {
    this.apiKey = configuration.apiKey;
  }
  async loadClient() {
    if (this.client)
      return;
    const voyageai = await import("./voyageai-XB25WRRQ.js").then((voyageai2) => {
      return voyageai2;
    });
    this.client = new voyageai.VoyageAIClient({
      apiKey: this.apiKey
    });
  }
  async createEmbedding(params) {
    await this.loadClient();
    return await this.client.embed({ input: params.input, model: params.model }).then((response) => {
      return response.data.map(
        (item) => item.embedding
      );
    });
  }
};
var VoyageAIEmbeddingFunction = class _VoyageAIEmbeddingFunction {
  constructor({
    api_key,
    model,
    api_key_env_var = "VOYAGE_API_KEY"
  }) {
    this.name = "voyageai";
    const apiKey = api_key ?? process.env[api_key_env_var];
    if (!apiKey) {
      throw new Error(
        `VoyageAI API key is required. Please provide it in the constructor or set the environment variable ${api_key_env_var}.`
      );
    }
    this.apiKey = apiKey;
    this.model = model;
    this.apiKeyEnvVar = api_key_env_var;
  }
  async initClient() {
    if (this.voyageAiApi)
      return;
    try {
      this.voyageAiApi = await import("./voyageai-XB25WRRQ.js").then((voyageai) => {
        return new VoyageAIAPI({ apiKey: this.apiKey });
      });
    } catch (e) {
      if (e.code === "MODULE_NOT_FOUND") {
        throw new Error(
          "Please install the voyageai package to use the VoyageAIEmbeddingFunction, `npm install -S voyageai`"
        );
      }
      throw e;
    }
  }
  async generate(texts) {
    await this.initClient();
    return await this.voyageAiApi.createEmbedding({
      model: this.model,
      input: texts
    });
  }
  buildFromConfig(config) {
    return new _VoyageAIEmbeddingFunction({
      api_key_env_var: config.api_key_env_var,
      model: config.model_name
    });
  }
  getConfig() {
    return {
      api_key_env_var: this.apiKeyEnvVar,
      model_name: this.model
    };
  }
  validateConfigUpdate(oldConfig, newConfig) {
    if (oldConfig.model_name !== newConfig.model_name) {
      throw new Error("Cannot change the model of the embedding function.");
    }
  }
  validateConfig(config) {
    validateConfigSchema(config, "voyageai");
  }
};
var BASE_URL = "https://api.cloudflare.com/client/v4/accounts";
var GATEWAY_BASE_URL = "https://gateway.ai.cloudflare.com/v1";
var CloudflareWorkersAIEmbeddingFunction = class _CloudflareWorkersAIEmbeddingFunction {
  constructor({
    cloudflare_api_key,
    model_name,
    account_id,
    api_key_env_var = "CHROMA_CLOUDFLARE_API_KEY",
    gateway_id = void 0
  }) {
    this.name = "cloudflare_workers_ai";
    const apiKey = cloudflare_api_key ?? process.env[api_key_env_var];
    if (!apiKey) {
      throw new Error(
        `Cloudflare API key is required. Please provide it in the constructor or set the environment variable ${api_key_env_var}.`
      );
    }
    this.model_name = model_name;
    this.account_id = account_id;
    this.api_key_env_var = api_key_env_var;
    this.gateway_id = gateway_id;
    if (this.gateway_id) {
      this.api_url = `${GATEWAY_BASE_URL}/${this.account_id}/${this.gateway_id}/workers-ai/${this.model_name}`;
    } else {
      this.api_url = `${BASE_URL}/${this.account_id}/ai/run/${this.model_name}`;
    }
    this.headers = {
      Authorization: `Bearer ${apiKey}`,
      "Accept-Encoding": "identity",
      "Content-Type": "application/json"
    };
  }
  async generate(texts) {
    try {
      const payload = {
        text: texts
      };
      const response = await fetch(this.api_url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(payload)
      });
      const resp = await response.json();
      if (!resp.result || !resp.result.data) {
        throw new Error(resp.detail || "Unknown error");
      }
      return resp.result.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error calling Cloudflare Workers AI API: ${error.message}`
        );
      } else {
        throw new Error(`Error calling Cloudflare Workers AI API: ${error}`);
      }
    }
  }
  buildFromConfig(config) {
    return new _CloudflareWorkersAIEmbeddingFunction({
      model_name: config.model_name,
      account_id: config.account_id,
      api_key_env_var: config.api_key_env_var,
      gateway_id: config.gateway_id ?? void 0
    });
  }
  getConfig() {
    return {
      model_name: this.model_name,
      account_id: this.account_id,
      api_key_env_var: this.api_key_env_var,
      gateway_id: this.gateway_id ?? void 0
    };
  }
  validateConfig(config) {
    validateConfigSchema(config, "cloudflare_workers_ai");
  }
};
var ENDPOINT = "https://api.together.xyz/v1/embeddings";
var TogetherAIEmbeddingFunction = class _TogetherAIEmbeddingFunction {
  constructor({
    together_ai_api_key,
    model_name,
    api_key_env_var = "CHROMA_TOGETHER_AI_API_KEY"
  }) {
    this.name = "together_ai";
    const apiKey = together_ai_api_key ?? process.env[api_key_env_var];
    if (!apiKey) {
      throw new Error(
        `Together AI API key is required. Please provide it in the constructor or set the environment variable ${api_key_env_var}.`
      );
    }
    this.model_name = model_name;
    this.api_key_env_var = api_key_env_var;
    this.headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      accept: "application/json"
    };
  }
  async generate(texts) {
    try {
      const payload = {
        model: this.model_name,
        input: texts
      };
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(payload)
      });
      const resp = await response.json();
      if (!resp.data) {
        throw new Error("Invalid response format from Together AI API");
      }
      const embeddings = resp.data.map(
        (item) => item.embedding
      );
      return embeddings;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error calling Together AI API: ${error.message}`);
      } else {
        throw new Error(`Error calling Together AI API: ${error}`);
      }
    }
  }
  buildFromConfig(config) {
    return new _TogetherAIEmbeddingFunction({
      model_name: config.model_name,
      api_key_env_var: config.api_key_env_var
    });
  }
  getConfig() {
    return {
      model_name: this.model_name,
      api_key_env_var: this.api_key_env_var
    };
  }
  validateConfig(config) {
    validateConfigSchema(config, "together_ai");
  }
};
var IncludeEnum = ((IncludeEnum2) => {
  IncludeEnum2["Documents"] = "documents";
  IncludeEnum2["Embeddings"] = "embeddings";
  IncludeEnum2["Metadatas"] = "metadatas";
  IncludeEnum2["Distances"] = "distances";
  IncludeEnum2["Uris"] = "uris";
  return IncludeEnum2;
})(IncludeEnum || {});
export {
  AdminClient,
  ChromaClient,
  ChromaClientError,
  ChromaConnectionError,
  ChromaError,
  ChromaForbiddenError,
  ChromaNotFoundError,
  ChromaServerError,
  ChromaUnauthorizedError,
  ChromaUniqueError,
  ChromaValueError,
  CloudClient,
  CloudflareWorkersAIEmbeddingFunction,
  CohereEmbeddingFunction,
  Collection,
  DefaultEmbeddingFunction,
  GoogleGenerativeAiEmbeddingFunction,
  HuggingFaceEmbeddingServerFunction,
  IncludeEnum,
  InvalidArgumentError,
  InvalidCollectionError,
  JinaEmbeddingFunction,
  OllamaEmbeddingFunction,
  OpenAIEmbeddingFunction,
  TogetherAIEmbeddingFunction,
  TransformersEmbeddingFunction,
  VoyageAIEmbeddingFunction,
  createErrorByType,
  getAvailableSchemas,
  getSchemaInfo,
  getSchemaVersion,
  loadSchema,
  validateConfigSchema
};
/*! Bundled license information:

chromadb/dist/chromadb.mjs:
  (*! Bundled license information:
  
  uri-js/dist/es5/uri.all.js:
    (** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js *)
  *)
*/
//# sourceMappingURL=chromadb.js.map
