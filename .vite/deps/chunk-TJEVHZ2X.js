import {
  EndpointURLScheme,
  HttpRequest,
  HttpResponse,
  NoOpLogger,
  Sha256,
  collectBody,
  convertToBuffer,
  doesIdentityRequireRefresh,
  escapeUri,
  fromHex,
  fromUtf8,
  getSmithyContext,
  getValueFromTextNode,
  init_dist_es,
  init_dist_es10 as init_dist_es8,
  init_dist_es12 as init_dist_es9,
  init_dist_es13 as init_dist_es10,
  init_dist_es2,
  init_dist_es3,
  init_dist_es4,
  init_dist_es5,
  init_dist_es6,
  init_dist_es8 as init_dist_es7,
  init_module,
  init_module2,
  isEmptyData,
  isIdentityExpired,
  memoize,
  memoizeIdentityProvider,
  normalizeProvider,
  normalizeProvider2,
  serializerMiddlewareOption,
  setFeature,
  toHex,
  toUint8Array
} from "./chunk-YDYV3GMK.js";
import {
  init_tslib_es6
} from "./chunk-NOR3QQAA.js";
import {
  __commonJS,
  __esm,
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@aws-sdk/middleware-host-header/dist-es/index.js
function resolveHostHeaderConfig(input) {
  return input;
}
var hostHeaderMiddleware, hostHeaderMiddlewareOptions, getHostHeaderPlugin;
var init_dist_es11 = __esm({
  "node_modules/@aws-sdk/middleware-host-header/dist-es/index.js"() {
    init_dist_es3();
    hostHeaderMiddleware = (options) => (next) => async (args) => {
      if (!HttpRequest.isInstance(args.request))
        return next(args);
      const { request } = args;
      const { handlerProtocol = "" } = options.requestHandler.metadata || {};
      if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
        delete request.headers["host"];
        request.headers[":authority"] = request.hostname + (request.port ? ":" + request.port : "");
      } else if (!request.headers["host"]) {
        let host = request.hostname;
        if (request.port != null)
          host += `:${request.port}`;
        request.headers["host"] = host;
      }
      return next(args);
    };
    hostHeaderMiddlewareOptions = {
      name: "hostHeaderMiddleware",
      step: "build",
      priority: "low",
      tags: ["HOST"],
      override: true
    };
    getHostHeaderPlugin = (options) => ({
      applyToStack: (clientStack) => {
        clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
      }
    });
  }
});

// node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js
var loggerMiddleware, loggerMiddlewareOptions, getLoggerPlugin;
var init_loggerMiddleware = __esm({
  "node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js"() {
    loggerMiddleware = () => (next, context) => async (args) => {
      var _a, _b;
      try {
        const response = await next(args);
        const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
        const { overrideInputFilterSensitiveLog, overrideOutputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
        const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
        const outputFilterSensitiveLog = overrideOutputFilterSensitiveLog ?? context.outputFilterSensitiveLog;
        const { $metadata, ...outputWithoutMetadata } = response.output;
        (_a = logger == null ? void 0 : logger.info) == null ? void 0 : _a.call(logger, {
          clientName,
          commandName,
          input: inputFilterSensitiveLog(args.input),
          output: outputFilterSensitiveLog(outputWithoutMetadata),
          metadata: $metadata
        });
        return response;
      } catch (error) {
        const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
        const { overrideInputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
        const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
        (_b = logger == null ? void 0 : logger.error) == null ? void 0 : _b.call(logger, {
          clientName,
          commandName,
          input: inputFilterSensitiveLog(args.input),
          error,
          metadata: error.$metadata
        });
        throw error;
      }
    };
    loggerMiddlewareOptions = {
      name: "loggerMiddleware",
      tags: ["LOGGER"],
      step: "initialize",
      override: true
    };
    getLoggerPlugin = (options) => ({
      applyToStack: (clientStack) => {
        clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
      }
    });
  }
});

// node_modules/@aws-sdk/middleware-logger/dist-es/index.js
var init_dist_es12 = __esm({
  "node_modules/@aws-sdk/middleware-logger/dist-es/index.js"() {
    init_loggerMiddleware();
  }
});

// node_modules/@aws-sdk/middleware-recursion-detection/dist-es/index.js
var TRACE_ID_HEADER_NAME, ENV_LAMBDA_FUNCTION_NAME, ENV_TRACE_ID, recursionDetectionMiddleware, addRecursionDetectionMiddlewareOptions, getRecursionDetectionPlugin;
var init_dist_es13 = __esm({
  "node_modules/@aws-sdk/middleware-recursion-detection/dist-es/index.js"() {
    init_dist_es3();
    TRACE_ID_HEADER_NAME = "X-Amzn-Trace-Id";
    ENV_LAMBDA_FUNCTION_NAME = "AWS_LAMBDA_FUNCTION_NAME";
    ENV_TRACE_ID = "_X_AMZN_TRACE_ID";
    recursionDetectionMiddleware = (options) => (next) => async (args) => {
      const { request } = args;
      if (!HttpRequest.isInstance(request) || options.runtime !== "node") {
        return next(args);
      }
      const traceIdHeader = Object.keys(request.headers ?? {}).find((h) => h.toLowerCase() === TRACE_ID_HEADER_NAME.toLowerCase()) ?? TRACE_ID_HEADER_NAME;
      if (request.headers.hasOwnProperty(traceIdHeader)) {
        return next(args);
      }
      const functionName = process.env[ENV_LAMBDA_FUNCTION_NAME];
      const traceId = process.env[ENV_TRACE_ID];
      const nonEmptyString = (str) => typeof str === "string" && str.length > 0;
      if (nonEmptyString(functionName) && nonEmptyString(traceId)) {
        request.headers[TRACE_ID_HEADER_NAME] = traceId;
      }
      return next({
        ...args,
        request
      });
    };
    addRecursionDetectionMiddlewareOptions = {
      step: "build",
      tags: ["RECURSION_DETECTION"],
      name: "recursionDetectionMiddleware",
      override: true,
      priority: "low"
    };
    getRecursionDetectionPlugin = (options) => ({
      applyToStack: (clientStack) => {
        clientStack.add(recursionDetectionMiddleware(options), addRecursionDetectionMiddlewareOptions);
      }
    });
  }
});

// node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js
function isValidUserAgentAppId(appId) {
  if (appId === void 0) {
    return true;
  }
  return typeof appId === "string" && appId.length <= 50;
}
function resolveUserAgentConfig(input) {
  const normalizedAppIdProvider = normalizeProvider2(input.userAgentAppId ?? DEFAULT_UA_APP_ID);
  const { customUserAgent } = input;
  return Object.assign(input, {
    customUserAgent: typeof customUserAgent === "string" ? [[customUserAgent]] : customUserAgent,
    userAgentAppId: async () => {
      var _a, _b;
      const appId = await normalizedAppIdProvider();
      if (!isValidUserAgentAppId(appId)) {
        const logger = ((_b = (_a = input.logger) == null ? void 0 : _a.constructor) == null ? void 0 : _b.name) === "NoOpLogger" || !input.logger ? console : input.logger;
        if (typeof appId !== "string") {
          logger == null ? void 0 : logger.warn("userAgentAppId must be a string or undefined.");
        } else if (appId.length > 50) {
          logger == null ? void 0 : logger.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.");
        }
      }
      return appId;
    }
  });
}
var DEFAULT_UA_APP_ID;
var init_configurations = __esm({
  "node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js"() {
    init_dist_es9();
    DEFAULT_UA_APP_ID = void 0;
  }
});

// node_modules/@smithy/util-endpoints/dist-es/cache/EndpointCache.js
var EndpointCache;
var init_EndpointCache = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/cache/EndpointCache.js"() {
    EndpointCache = class {
      constructor({ size, params }) {
        this.data = /* @__PURE__ */ new Map();
        this.parameters = [];
        this.capacity = size ?? 50;
        if (params) {
          this.parameters = params;
        }
      }
      get(endpointParams, resolver) {
        const key = this.hash(endpointParams);
        if (key === false) {
          return resolver();
        }
        if (!this.data.has(key)) {
          if (this.data.size > this.capacity + 10) {
            const keys = this.data.keys();
            let i = 0;
            while (true) {
              const { value, done } = keys.next();
              this.data.delete(value);
              if (done || ++i > 10) {
                break;
              }
            }
          }
          this.data.set(key, resolver());
        }
        return this.data.get(key);
      }
      size() {
        return this.data.size;
      }
      hash(endpointParams) {
        let buffer = "";
        const { parameters } = this;
        if (parameters.length === 0) {
          return false;
        }
        for (const param of parameters) {
          const val2 = String(endpointParams[param] ?? "");
          if (val2.includes("|;")) {
            return false;
          }
          buffer += val2 + "|;";
        }
        return buffer;
      }
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/lib/isIpAddress.js
var IP_V4_REGEX, isIpAddress;
var init_isIpAddress = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/lib/isIpAddress.js"() {
    IP_V4_REGEX = new RegExp(`^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$`);
    isIpAddress = (value) => IP_V4_REGEX.test(value) || value.startsWith("[") && value.endsWith("]");
  }
});

// node_modules/@smithy/util-endpoints/dist-es/lib/isValidHostLabel.js
var VALID_HOST_LABEL_REGEX, isValidHostLabel;
var init_isValidHostLabel = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/lib/isValidHostLabel.js"() {
    VALID_HOST_LABEL_REGEX = new RegExp(`^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$`);
    isValidHostLabel = (value, allowSubDomains = false) => {
      if (!allowSubDomains) {
        return VALID_HOST_LABEL_REGEX.test(value);
      }
      const labels = value.split(".");
      for (const label of labels) {
        if (!isValidHostLabel(label)) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js
var customEndpointFunctions;
var init_customEndpointFunctions = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js"() {
    customEndpointFunctions = {};
  }
});

// node_modules/@smithy/util-endpoints/dist-es/debug/debugId.js
var debugId;
var init_debugId = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/debug/debugId.js"() {
    debugId = "endpoints";
  }
});

// node_modules/@smithy/util-endpoints/dist-es/debug/toDebugString.js
function toDebugString(input) {
  if (typeof input !== "object" || input == null) {
    return input;
  }
  if ("ref" in input) {
    return `$${toDebugString(input.ref)}`;
  }
  if ("fn" in input) {
    return `${input.fn}(${(input.argv || []).map(toDebugString).join(", ")})`;
  }
  return JSON.stringify(input, null, 2);
}
var init_toDebugString = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/debug/toDebugString.js"() {
  }
});

// node_modules/@smithy/util-endpoints/dist-es/debug/index.js
var init_debug = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/debug/index.js"() {
    init_debugId();
    init_toDebugString();
  }
});

// node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js
var EndpointError;
var init_EndpointError = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js"() {
    EndpointError = class extends Error {
      constructor(message) {
        super(message);
        this.name = "EndpointError";
      }
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/types/EndpointFunctions.js
var init_EndpointFunctions = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/types/EndpointFunctions.js"() {
  }
});

// node_modules/@smithy/util-endpoints/dist-es/types/EndpointRuleObject.js
var init_EndpointRuleObject = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/types/EndpointRuleObject.js"() {
  }
});

// node_modules/@smithy/util-endpoints/dist-es/types/ErrorRuleObject.js
var init_ErrorRuleObject = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/types/ErrorRuleObject.js"() {
  }
});

// node_modules/@smithy/util-endpoints/dist-es/types/RuleSetObject.js
var init_RuleSetObject = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/types/RuleSetObject.js"() {
  }
});

// node_modules/@smithy/util-endpoints/dist-es/types/TreeRuleObject.js
var init_TreeRuleObject = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/types/TreeRuleObject.js"() {
  }
});

// node_modules/@smithy/util-endpoints/dist-es/types/shared.js
var init_shared = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/types/shared.js"() {
  }
});

// node_modules/@smithy/util-endpoints/dist-es/types/index.js
var init_types = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/types/index.js"() {
    init_EndpointError();
    init_EndpointFunctions();
    init_EndpointRuleObject();
    init_ErrorRuleObject();
    init_RuleSetObject();
    init_TreeRuleObject();
    init_shared();
  }
});

// node_modules/@smithy/util-endpoints/dist-es/lib/booleanEquals.js
var booleanEquals;
var init_booleanEquals = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/lib/booleanEquals.js"() {
    booleanEquals = (value1, value2) => value1 === value2;
  }
});

// node_modules/@smithy/util-endpoints/dist-es/lib/getAttrPathList.js
var getAttrPathList;
var init_getAttrPathList = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/lib/getAttrPathList.js"() {
    init_types();
    getAttrPathList = (path) => {
      const parts = path.split(".");
      const pathList = [];
      for (const part of parts) {
        const squareBracketIndex = part.indexOf("[");
        if (squareBracketIndex !== -1) {
          if (part.indexOf("]") !== part.length - 1) {
            throw new EndpointError(`Path: '${path}' does not end with ']'`);
          }
          const arrayIndex = part.slice(squareBracketIndex + 1, -1);
          if (Number.isNaN(parseInt(arrayIndex))) {
            throw new EndpointError(`Invalid array index: '${arrayIndex}' in path: '${path}'`);
          }
          if (squareBracketIndex !== 0) {
            pathList.push(part.slice(0, squareBracketIndex));
          }
          pathList.push(arrayIndex);
        } else {
          pathList.push(part);
        }
      }
      return pathList;
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/lib/getAttr.js
var getAttr;
var init_getAttr = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/lib/getAttr.js"() {
    init_types();
    init_getAttrPathList();
    getAttr = (value, path) => getAttrPathList(path).reduce((acc, index) => {
      if (typeof acc !== "object") {
        throw new EndpointError(`Index '${index}' in '${path}' not found in '${JSON.stringify(value)}'`);
      } else if (Array.isArray(acc)) {
        return acc[parseInt(index)];
      }
      return acc[index];
    }, value);
  }
});

// node_modules/@smithy/util-endpoints/dist-es/lib/isSet.js
var isSet;
var init_isSet = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/lib/isSet.js"() {
    isSet = (value) => value != null;
  }
});

// node_modules/@smithy/util-endpoints/dist-es/lib/not.js
var not;
var init_not = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/lib/not.js"() {
    not = (value) => !value;
  }
});

// node_modules/@smithy/util-endpoints/dist-es/lib/parseURL.js
var DEFAULT_PORTS, parseURL;
var init_parseURL = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/lib/parseURL.js"() {
    init_dist_es2();
    init_isIpAddress();
    DEFAULT_PORTS = {
      [EndpointURLScheme.HTTP]: 80,
      [EndpointURLScheme.HTTPS]: 443
    };
    parseURL = (value) => {
      const whatwgURL = (() => {
        try {
          if (value instanceof URL) {
            return value;
          }
          if (typeof value === "object" && "hostname" in value) {
            const { hostname: hostname2, port, protocol: protocol2 = "", path = "", query = {} } = value;
            const url = new URL(`${protocol2}//${hostname2}${port ? `:${port}` : ""}${path}`);
            url.search = Object.entries(query).map(([k, v]) => `${k}=${v}`).join("&");
            return url;
          }
          return new URL(value);
        } catch (error) {
          return null;
        }
      })();
      if (!whatwgURL) {
        console.error(`Unable to parse ${JSON.stringify(value)} as a whatwg URL.`);
        return null;
      }
      const urlString = whatwgURL.href;
      const { host, hostname, pathname, protocol, search } = whatwgURL;
      if (search) {
        return null;
      }
      const scheme = protocol.slice(0, -1);
      if (!Object.values(EndpointURLScheme).includes(scheme)) {
        return null;
      }
      const isIp = isIpAddress(hostname);
      const inputContainsDefaultPort = urlString.includes(`${host}:${DEFAULT_PORTS[scheme]}`) || typeof value === "string" && value.includes(`${host}:${DEFAULT_PORTS[scheme]}`);
      const authority = `${host}${inputContainsDefaultPort ? `:${DEFAULT_PORTS[scheme]}` : ``}`;
      return {
        scheme,
        authority,
        path: pathname,
        normalizedPath: pathname.endsWith("/") ? pathname : `${pathname}/`,
        isIp
      };
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/lib/stringEquals.js
var stringEquals;
var init_stringEquals = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/lib/stringEquals.js"() {
    stringEquals = (value1, value2) => value1 === value2;
  }
});

// node_modules/@smithy/util-endpoints/dist-es/lib/substring.js
var substring;
var init_substring = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/lib/substring.js"() {
    substring = (input, start, stop, reverse) => {
      if (start >= stop || input.length < stop) {
        return null;
      }
      if (!reverse) {
        return input.substring(start, stop);
      }
      return input.substring(input.length - stop, input.length - start);
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/lib/uriEncode.js
var uriEncode;
var init_uriEncode = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/lib/uriEncode.js"() {
    uriEncode = (value) => encodeURIComponent(value).replace(/[!*'()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
  }
});

// node_modules/@smithy/util-endpoints/dist-es/lib/index.js
var init_lib = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/lib/index.js"() {
    init_booleanEquals();
    init_getAttr();
    init_isSet();
    init_isValidHostLabel();
    init_not();
    init_parseURL();
    init_stringEquals();
    init_substring();
    init_uriEncode();
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/endpointFunctions.js
var endpointFunctions;
var init_endpointFunctions = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/endpointFunctions.js"() {
    init_lib();
    endpointFunctions = {
      booleanEquals,
      getAttr,
      isSet,
      isValidHostLabel,
      not,
      parseURL,
      stringEquals,
      substring,
      uriEncode
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTemplate.js
var evaluateTemplate;
var init_evaluateTemplate = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTemplate.js"() {
    init_lib();
    evaluateTemplate = (template, options) => {
      const evaluatedTemplateArr = [];
      const templateContext = {
        ...options.endpointParams,
        ...options.referenceRecord
      };
      let currentIndex = 0;
      while (currentIndex < template.length) {
        const openingBraceIndex = template.indexOf("{", currentIndex);
        if (openingBraceIndex === -1) {
          evaluatedTemplateArr.push(template.slice(currentIndex));
          break;
        }
        evaluatedTemplateArr.push(template.slice(currentIndex, openingBraceIndex));
        const closingBraceIndex = template.indexOf("}", openingBraceIndex);
        if (closingBraceIndex === -1) {
          evaluatedTemplateArr.push(template.slice(openingBraceIndex));
          break;
        }
        if (template[openingBraceIndex + 1] === "{" && template[closingBraceIndex + 1] === "}") {
          evaluatedTemplateArr.push(template.slice(openingBraceIndex + 1, closingBraceIndex));
          currentIndex = closingBraceIndex + 2;
        }
        const parameterName = template.substring(openingBraceIndex + 1, closingBraceIndex);
        if (parameterName.includes("#")) {
          const [refName, attrName] = parameterName.split("#");
          evaluatedTemplateArr.push(getAttr(templateContext[refName], attrName));
        } else {
          evaluatedTemplateArr.push(templateContext[parameterName]);
        }
        currentIndex = closingBraceIndex + 1;
      }
      return evaluatedTemplateArr.join("");
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/getReferenceValue.js
var getReferenceValue;
var init_getReferenceValue = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/getReferenceValue.js"() {
    getReferenceValue = ({ ref }, options) => {
      const referenceRecord = {
        ...options.endpointParams,
        ...options.referenceRecord
      };
      return referenceRecord[ref];
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js
var evaluateExpression;
var init_evaluateExpression = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js"() {
    init_types();
    init_callFunction();
    init_evaluateTemplate();
    init_getReferenceValue();
    evaluateExpression = (obj, keyName, options) => {
      if (typeof obj === "string") {
        return evaluateTemplate(obj, options);
      } else if (obj["fn"]) {
        return callFunction(obj, options);
      } else if (obj["ref"]) {
        return getReferenceValue(obj, options);
      }
      throw new EndpointError(`'${keyName}': ${String(obj)} is not a string, function or reference.`);
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/callFunction.js
var callFunction;
var init_callFunction = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/callFunction.js"() {
    init_customEndpointFunctions();
    init_endpointFunctions();
    init_evaluateExpression();
    callFunction = ({ fn, argv }, options) => {
      const evaluatedArgs = argv.map((arg) => ["boolean", "number"].includes(typeof arg) ? arg : evaluateExpression(arg, "arg", options));
      const fnSegments = fn.split(".");
      if (fnSegments[0] in customEndpointFunctions && fnSegments[1] != null) {
        return customEndpointFunctions[fnSegments[0]][fnSegments[1]](...evaluatedArgs);
      }
      return endpointFunctions[fn](...evaluatedArgs);
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/evaluateCondition.js
var evaluateCondition;
var init_evaluateCondition = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/evaluateCondition.js"() {
    init_debug();
    init_types();
    init_callFunction();
    evaluateCondition = ({ assign, ...fnArgs }, options) => {
      var _a, _b;
      if (assign && assign in options.referenceRecord) {
        throw new EndpointError(`'${assign}' is already defined in Reference Record.`);
      }
      const value = callFunction(fnArgs, options);
      (_b = (_a = options.logger) == null ? void 0 : _a.debug) == null ? void 0 : _b.call(_a, `${debugId} evaluateCondition: ${toDebugString(fnArgs)} = ${toDebugString(value)}`);
      return {
        result: value === "" ? true : !!value,
        ...assign != null && { toAssign: { name: assign, value } }
      };
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js
var evaluateConditions;
var init_evaluateConditions = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js"() {
    init_debug();
    init_evaluateCondition();
    evaluateConditions = (conditions = [], options) => {
      var _a, _b;
      const conditionsReferenceRecord = {};
      for (const condition of conditions) {
        const { result, toAssign } = evaluateCondition(condition, {
          ...options,
          referenceRecord: {
            ...options.referenceRecord,
            ...conditionsReferenceRecord
          }
        });
        if (!result) {
          return { result };
        }
        if (toAssign) {
          conditionsReferenceRecord[toAssign.name] = toAssign.value;
          (_b = (_a = options.logger) == null ? void 0 : _a.debug) == null ? void 0 : _b.call(_a, `${debugId} assign: ${toAssign.name} := ${toDebugString(toAssign.value)}`);
        }
      }
      return { result: true, referenceRecord: conditionsReferenceRecord };
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointHeaders.js
var getEndpointHeaders;
var init_getEndpointHeaders = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointHeaders.js"() {
    init_types();
    init_evaluateExpression();
    getEndpointHeaders = (headers, options) => Object.entries(headers).reduce((acc, [headerKey, headerVal]) => ({
      ...acc,
      [headerKey]: headerVal.map((headerValEntry) => {
        const processedExpr = evaluateExpression(headerValEntry, "Header value entry", options);
        if (typeof processedExpr !== "string") {
          throw new EndpointError(`Header '${headerKey}' value '${processedExpr}' is not a string`);
        }
        return processedExpr;
      })
    }), {});
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperty.js
var getEndpointProperty;
var init_getEndpointProperty = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperty.js"() {
    init_types();
    init_evaluateTemplate();
    init_getEndpointProperties();
    getEndpointProperty = (property, options) => {
      if (Array.isArray(property)) {
        return property.map((propertyEntry) => getEndpointProperty(propertyEntry, options));
      }
      switch (typeof property) {
        case "string":
          return evaluateTemplate(property, options);
        case "object":
          if (property === null) {
            throw new EndpointError(`Unexpected endpoint property: ${property}`);
          }
          return getEndpointProperties(property, options);
        case "boolean":
          return property;
        default:
          throw new EndpointError(`Unexpected endpoint property type: ${typeof property}`);
      }
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperties.js
var getEndpointProperties;
var init_getEndpointProperties = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperties.js"() {
    init_getEndpointProperty();
    getEndpointProperties = (properties, options) => Object.entries(properties).reduce((acc, [propertyKey, propertyVal]) => ({
      ...acc,
      [propertyKey]: getEndpointProperty(propertyVal, options)
    }), {});
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointUrl.js
var getEndpointUrl;
var init_getEndpointUrl = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointUrl.js"() {
    init_types();
    init_evaluateExpression();
    getEndpointUrl = (endpointUrl, options) => {
      const expression = evaluateExpression(endpointUrl, "Endpoint URL", options);
      if (typeof expression === "string") {
        try {
          return new URL(expression);
        } catch (error) {
          console.error(`Failed to construct URL with ${expression}`, error);
          throw error;
        }
      }
      throw new EndpointError(`Endpoint URL must be a string, got ${typeof expression}`);
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/evaluateEndpointRule.js
var evaluateEndpointRule;
var init_evaluateEndpointRule = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/evaluateEndpointRule.js"() {
    init_debug();
    init_evaluateConditions();
    init_getEndpointHeaders();
    init_getEndpointProperties();
    init_getEndpointUrl();
    evaluateEndpointRule = (endpointRule, options) => {
      var _a, _b;
      const { conditions, endpoint } = endpointRule;
      const { result, referenceRecord } = evaluateConditions(conditions, options);
      if (!result) {
        return;
      }
      const endpointRuleOptions = {
        ...options,
        referenceRecord: { ...options.referenceRecord, ...referenceRecord }
      };
      const { url, properties, headers } = endpoint;
      (_b = (_a = options.logger) == null ? void 0 : _a.debug) == null ? void 0 : _b.call(_a, `${debugId} Resolving endpoint from template: ${toDebugString(endpoint)}`);
      return {
        ...headers != void 0 && {
          headers: getEndpointHeaders(headers, endpointRuleOptions)
        },
        ...properties != void 0 && {
          properties: getEndpointProperties(properties, endpointRuleOptions)
        },
        url: getEndpointUrl(url, endpointRuleOptions)
      };
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/evaluateErrorRule.js
var evaluateErrorRule;
var init_evaluateErrorRule = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/evaluateErrorRule.js"() {
    init_types();
    init_evaluateConditions();
    init_evaluateExpression();
    evaluateErrorRule = (errorRule, options) => {
      const { conditions, error } = errorRule;
      const { result, referenceRecord } = evaluateConditions(conditions, options);
      if (!result) {
        return;
      }
      throw new EndpointError(evaluateExpression(error, "Error", {
        ...options,
        referenceRecord: { ...options.referenceRecord, ...referenceRecord }
      }));
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTreeRule.js
var evaluateTreeRule;
var init_evaluateTreeRule = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTreeRule.js"() {
    init_evaluateConditions();
    init_evaluateRules();
    evaluateTreeRule = (treeRule, options) => {
      const { conditions, rules } = treeRule;
      const { result, referenceRecord } = evaluateConditions(conditions, options);
      if (!result) {
        return;
      }
      return evaluateRules(rules, {
        ...options,
        referenceRecord: { ...options.referenceRecord, ...referenceRecord }
      });
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/evaluateRules.js
var evaluateRules;
var init_evaluateRules = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/evaluateRules.js"() {
    init_types();
    init_evaluateEndpointRule();
    init_evaluateErrorRule();
    init_evaluateTreeRule();
    evaluateRules = (rules, options) => {
      for (const rule of rules) {
        if (rule.type === "endpoint") {
          const endpointOrUndefined = evaluateEndpointRule(rule, options);
          if (endpointOrUndefined) {
            return endpointOrUndefined;
          }
        } else if (rule.type === "error") {
          evaluateErrorRule(rule, options);
        } else if (rule.type === "tree") {
          const endpointOrUndefined = evaluateTreeRule(rule, options);
          if (endpointOrUndefined) {
            return endpointOrUndefined;
          }
        } else {
          throw new EndpointError(`Unknown endpoint rule: ${rule}`);
        }
      }
      throw new EndpointError(`Rules evaluation failed`);
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/utils/index.js
var init_utils = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/utils/index.js"() {
    init_customEndpointFunctions();
    init_evaluateRules();
  }
});

// node_modules/@smithy/util-endpoints/dist-es/resolveEndpoint.js
var resolveEndpoint;
var init_resolveEndpoint = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/resolveEndpoint.js"() {
    init_debug();
    init_types();
    init_utils();
    resolveEndpoint = (ruleSetObject, options) => {
      var _a, _b, _c, _d;
      const { endpointParams, logger } = options;
      const { parameters, rules } = ruleSetObject;
      (_b = (_a = options.logger) == null ? void 0 : _a.debug) == null ? void 0 : _b.call(_a, `${debugId} Initial EndpointParams: ${toDebugString(endpointParams)}`);
      const paramsWithDefault = Object.entries(parameters).filter(([, v]) => v.default != null).map(([k, v]) => [k, v.default]);
      if (paramsWithDefault.length > 0) {
        for (const [paramKey, paramDefaultValue] of paramsWithDefault) {
          endpointParams[paramKey] = endpointParams[paramKey] ?? paramDefaultValue;
        }
      }
      const requiredParams = Object.entries(parameters).filter(([, v]) => v.required).map(([k]) => k);
      for (const requiredParam of requiredParams) {
        if (endpointParams[requiredParam] == null) {
          throw new EndpointError(`Missing required parameter: '${requiredParam}'`);
        }
      }
      const endpoint = evaluateRules(rules, { endpointParams, logger, referenceRecord: {} });
      (_d = (_c = options.logger) == null ? void 0 : _c.debug) == null ? void 0 : _d.call(_c, `${debugId} Resolved endpoint: ${toDebugString(endpoint)}`);
      return endpoint;
    };
  }
});

// node_modules/@smithy/util-endpoints/dist-es/index.js
var init_dist_es14 = __esm({
  "node_modules/@smithy/util-endpoints/dist-es/index.js"() {
    init_EndpointCache();
    init_isIpAddress();
    init_isValidHostLabel();
    init_customEndpointFunctions();
    init_resolveEndpoint();
    init_types();
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/lib/isIpAddress.js
var init_isIpAddress2 = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/lib/isIpAddress.js"() {
    init_dist_es14();
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/isVirtualHostableS3Bucket.js
var isVirtualHostableS3Bucket;
var init_isVirtualHostableS3Bucket = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/isVirtualHostableS3Bucket.js"() {
    init_dist_es14();
    init_isIpAddress2();
    isVirtualHostableS3Bucket = (value, allowSubDomains = false) => {
      if (allowSubDomains) {
        for (const label of value.split(".")) {
          if (!isVirtualHostableS3Bucket(label)) {
            return false;
          }
        }
        return true;
      }
      if (!isValidHostLabel(value)) {
        return false;
      }
      if (value.length < 3 || value.length > 63) {
        return false;
      }
      if (value !== value.toLowerCase()) {
        return false;
      }
      if (isIpAddress(value)) {
        return false;
      }
      return true;
    };
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/parseArn.js
var ARN_DELIMITER, RESOURCE_DELIMITER, parseArn;
var init_parseArn = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/parseArn.js"() {
    ARN_DELIMITER = ":";
    RESOURCE_DELIMITER = "/";
    parseArn = (value) => {
      const segments = value.split(ARN_DELIMITER);
      if (segments.length < 6)
        return null;
      const [arn, partition2, service, region, accountId, ...resourcePath] = segments;
      if (arn !== "arn" || partition2 === "" || service === "" || resourcePath.join(ARN_DELIMITER) === "")
        return null;
      const resourceId = resourcePath.map((resource) => resource.split(RESOURCE_DELIMITER)).flat();
      return {
        partition: partition2,
        service,
        region,
        accountId,
        resourceId
      };
    };
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partitions.json
var partitions_default;
var init_partitions = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partitions.json"() {
    partitions_default = {
      partitions: [{
        id: "aws",
        outputs: {
          dnsSuffix: "amazonaws.com",
          dualStackDnsSuffix: "api.aws",
          implicitGlobalRegion: "us-east-1",
          name: "aws",
          supportsDualStack: true,
          supportsFIPS: true
        },
        regionRegex: "^(us|eu|ap|sa|ca|me|af|il|mx)\\-\\w+\\-\\d+$",
        regions: {
          "af-south-1": {
            description: "Africa (Cape Town)"
          },
          "ap-east-1": {
            description: "Asia Pacific (Hong Kong)"
          },
          "ap-northeast-1": {
            description: "Asia Pacific (Tokyo)"
          },
          "ap-northeast-2": {
            description: "Asia Pacific (Seoul)"
          },
          "ap-northeast-3": {
            description: "Asia Pacific (Osaka)"
          },
          "ap-south-1": {
            description: "Asia Pacific (Mumbai)"
          },
          "ap-south-2": {
            description: "Asia Pacific (Hyderabad)"
          },
          "ap-southeast-1": {
            description: "Asia Pacific (Singapore)"
          },
          "ap-southeast-2": {
            description: "Asia Pacific (Sydney)"
          },
          "ap-southeast-3": {
            description: "Asia Pacific (Jakarta)"
          },
          "ap-southeast-4": {
            description: "Asia Pacific (Melbourne)"
          },
          "ap-southeast-5": {
            description: "Asia Pacific (Malaysia)"
          },
          "ap-southeast-7": {
            description: "Asia Pacific (Thailand)"
          },
          "aws-global": {
            description: "AWS Standard global region"
          },
          "ca-central-1": {
            description: "Canada (Central)"
          },
          "ca-west-1": {
            description: "Canada West (Calgary)"
          },
          "eu-central-1": {
            description: "Europe (Frankfurt)"
          },
          "eu-central-2": {
            description: "Europe (Zurich)"
          },
          "eu-north-1": {
            description: "Europe (Stockholm)"
          },
          "eu-south-1": {
            description: "Europe (Milan)"
          },
          "eu-south-2": {
            description: "Europe (Spain)"
          },
          "eu-west-1": {
            description: "Europe (Ireland)"
          },
          "eu-west-2": {
            description: "Europe (London)"
          },
          "eu-west-3": {
            description: "Europe (Paris)"
          },
          "il-central-1": {
            description: "Israel (Tel Aviv)"
          },
          "me-central-1": {
            description: "Middle East (UAE)"
          },
          "me-south-1": {
            description: "Middle East (Bahrain)"
          },
          "mx-central-1": {
            description: "Mexico (Central)"
          },
          "sa-east-1": {
            description: "South America (Sao Paulo)"
          },
          "us-east-1": {
            description: "US East (N. Virginia)"
          },
          "us-east-2": {
            description: "US East (Ohio)"
          },
          "us-west-1": {
            description: "US West (N. California)"
          },
          "us-west-2": {
            description: "US West (Oregon)"
          }
        }
      }, {
        id: "aws-cn",
        outputs: {
          dnsSuffix: "amazonaws.com.cn",
          dualStackDnsSuffix: "api.amazonwebservices.com.cn",
          implicitGlobalRegion: "cn-northwest-1",
          name: "aws-cn",
          supportsDualStack: true,
          supportsFIPS: true
        },
        regionRegex: "^cn\\-\\w+\\-\\d+$",
        regions: {
          "aws-cn-global": {
            description: "AWS China global region"
          },
          "cn-north-1": {
            description: "China (Beijing)"
          },
          "cn-northwest-1": {
            description: "China (Ningxia)"
          }
        }
      }, {
        id: "aws-us-gov",
        outputs: {
          dnsSuffix: "amazonaws.com",
          dualStackDnsSuffix: "api.aws",
          implicitGlobalRegion: "us-gov-west-1",
          name: "aws-us-gov",
          supportsDualStack: true,
          supportsFIPS: true
        },
        regionRegex: "^us\\-gov\\-\\w+\\-\\d+$",
        regions: {
          "aws-us-gov-global": {
            description: "AWS GovCloud (US) global region"
          },
          "us-gov-east-1": {
            description: "AWS GovCloud (US-East)"
          },
          "us-gov-west-1": {
            description: "AWS GovCloud (US-West)"
          }
        }
      }, {
        id: "aws-iso",
        outputs: {
          dnsSuffix: "c2s.ic.gov",
          dualStackDnsSuffix: "c2s.ic.gov",
          implicitGlobalRegion: "us-iso-east-1",
          name: "aws-iso",
          supportsDualStack: false,
          supportsFIPS: true
        },
        regionRegex: "^us\\-iso\\-\\w+\\-\\d+$",
        regions: {
          "aws-iso-global": {
            description: "AWS ISO (US) global region"
          },
          "us-iso-east-1": {
            description: "US ISO East"
          },
          "us-iso-west-1": {
            description: "US ISO WEST"
          }
        }
      }, {
        id: "aws-iso-b",
        outputs: {
          dnsSuffix: "sc2s.sgov.gov",
          dualStackDnsSuffix: "sc2s.sgov.gov",
          implicitGlobalRegion: "us-isob-east-1",
          name: "aws-iso-b",
          supportsDualStack: false,
          supportsFIPS: true
        },
        regionRegex: "^us\\-isob\\-\\w+\\-\\d+$",
        regions: {
          "aws-iso-b-global": {
            description: "AWS ISOB (US) global region"
          },
          "us-isob-east-1": {
            description: "US ISOB East (Ohio)"
          }
        }
      }, {
        id: "aws-iso-e",
        outputs: {
          dnsSuffix: "cloud.adc-e.uk",
          dualStackDnsSuffix: "cloud.adc-e.uk",
          implicitGlobalRegion: "eu-isoe-west-1",
          name: "aws-iso-e",
          supportsDualStack: false,
          supportsFIPS: true
        },
        regionRegex: "^eu\\-isoe\\-\\w+\\-\\d+$",
        regions: {
          "aws-iso-e-global": {
            description: "AWS ISOE (Europe) global region"
          },
          "eu-isoe-west-1": {
            description: "EU ISOE West"
          }
        }
      }, {
        id: "aws-iso-f",
        outputs: {
          dnsSuffix: "csp.hci.ic.gov",
          dualStackDnsSuffix: "csp.hci.ic.gov",
          implicitGlobalRegion: "us-isof-south-1",
          name: "aws-iso-f",
          supportsDualStack: false,
          supportsFIPS: true
        },
        regionRegex: "^us\\-isof\\-\\w+\\-\\d+$",
        regions: {
          "aws-iso-f-global": {
            description: "AWS ISOF global region"
          },
          "us-isof-east-1": {
            description: "US ISOF EAST"
          },
          "us-isof-south-1": {
            description: "US ISOF SOUTH"
          }
        }
      }, {
        id: "aws-eusc",
        outputs: {
          dnsSuffix: "amazonaws.eu",
          dualStackDnsSuffix: "amazonaws.eu",
          implicitGlobalRegion: "eusc-de-east-1",
          name: "aws-eusc",
          supportsDualStack: false,
          supportsFIPS: true
        },
        regionRegex: "^eusc\\-(de)\\-\\w+\\-\\d+$",
        regions: {
          "eusc-de-east-1": {
            description: "EU (Germany)"
          }
        }
      }],
      version: "1.1"
    };
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partition.js
var selectedPartitionsInfo, selectedUserAgentPrefix, partition, getUserAgentPrefix;
var init_partition = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partition.js"() {
    init_partitions();
    selectedPartitionsInfo = partitions_default;
    selectedUserAgentPrefix = "";
    partition = (value) => {
      const { partitions } = selectedPartitionsInfo;
      for (const partition2 of partitions) {
        const { regions, outputs } = partition2;
        for (const [region, regionData] of Object.entries(regions)) {
          if (region === value) {
            return {
              ...outputs,
              ...regionData
            };
          }
        }
      }
      for (const partition2 of partitions) {
        const { regionRegex, outputs } = partition2;
        if (new RegExp(regionRegex).test(value)) {
          return {
            ...outputs
          };
        }
      }
      const DEFAULT_PARTITION = partitions.find((partition2) => partition2.id === "aws");
      if (!DEFAULT_PARTITION) {
        throw new Error("Provided region was not found in the partition array or regex, and default partition with id 'aws' doesn't exist.");
      }
      return {
        ...DEFAULT_PARTITION.outputs
      };
    };
    getUserAgentPrefix = () => selectedUserAgentPrefix;
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/aws.js
var awsEndpointFunctions;
var init_aws = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/aws.js"() {
    init_dist_es14();
    init_isVirtualHostableS3Bucket();
    init_parseArn();
    init_partition();
    awsEndpointFunctions = {
      isVirtualHostableS3Bucket,
      parseArn,
      partition
    };
    customEndpointFunctions.aws = awsEndpointFunctions;
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/resolveEndpoint.js
var init_resolveEndpoint2 = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/resolveEndpoint.js"() {
    init_dist_es14();
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointError.js
var init_EndpointError2 = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointError.js"() {
    init_dist_es14();
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointRuleObject.js
var init_EndpointRuleObject2 = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointRuleObject.js"() {
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/types/ErrorRuleObject.js
var init_ErrorRuleObject2 = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/types/ErrorRuleObject.js"() {
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/types/RuleSetObject.js
var init_RuleSetObject2 = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/types/RuleSetObject.js"() {
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/types/TreeRuleObject.js
var init_TreeRuleObject2 = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/types/TreeRuleObject.js"() {
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/types/shared.js
var init_shared2 = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/types/shared.js"() {
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/types/index.js
var init_types2 = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/types/index.js"() {
    init_EndpointError2();
    init_EndpointRuleObject2();
    init_ErrorRuleObject2();
    init_RuleSetObject2();
    init_TreeRuleObject2();
    init_shared2();
  }
});

// node_modules/@aws-sdk/util-endpoints/dist-es/index.js
var init_dist_es15 = __esm({
  "node_modules/@aws-sdk/util-endpoints/dist-es/index.js"() {
    init_aws();
    init_partition();
    init_isIpAddress2();
    init_resolveEndpoint2();
    init_types2();
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/client/emitWarningIfUnsupportedVersion.js
var init_emitWarningIfUnsupportedVersion = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/client/emitWarningIfUnsupportedVersion.js"() {
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js
function setCredentialFeature(credentials, feature, value) {
  if (!credentials.$source) {
    credentials.$source = {};
  }
  credentials.$source[feature] = value;
  return credentials;
}
var init_setCredentialFeature = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js"() {
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/client/setFeature.js
function setFeature2(context, feature, value) {
  if (!context.__aws_sdk_context) {
    context.__aws_sdk_context = {
      features: {}
    };
  } else if (!context.__aws_sdk_context.features) {
    context.__aws_sdk_context.features = {};
  }
  context.__aws_sdk_context.features[feature] = value;
}
var init_setFeature = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/client/setFeature.js"() {
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/client/index.js
var init_client = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/client/index.js"() {
    init_emitWarningIfUnsupportedVersion();
    init_setCredentialFeature();
    init_setFeature();
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getDateHeader.js
var getDateHeader;
var init_getDateHeader = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getDateHeader.js"() {
    init_dist_es3();
    getDateHeader = (response) => {
      var _a, _b;
      return HttpResponse.isInstance(response) ? ((_a = response.headers) == null ? void 0 : _a.date) ?? ((_b = response.headers) == null ? void 0 : _b.Date) : void 0;
    };
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getSkewCorrectedDate.js
var getSkewCorrectedDate;
var init_getSkewCorrectedDate = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getSkewCorrectedDate.js"() {
    getSkewCorrectedDate = (systemClockOffset) => new Date(Date.now() + systemClockOffset);
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/isClockSkewed.js
var isClockSkewed;
var init_isClockSkewed = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/isClockSkewed.js"() {
    init_getSkewCorrectedDate();
    isClockSkewed = (clockTime, systemClockOffset) => Math.abs(getSkewCorrectedDate(systemClockOffset).getTime() - clockTime) >= 3e5;
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getUpdatedSystemClockOffset.js
var getUpdatedSystemClockOffset;
var init_getUpdatedSystemClockOffset = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getUpdatedSystemClockOffset.js"() {
    init_isClockSkewed();
    getUpdatedSystemClockOffset = (clockTime, currentSystemClockOffset) => {
      const clockTimeInMs = Date.parse(clockTime);
      if (isClockSkewed(clockTimeInMs, currentSystemClockOffset)) {
        return clockTimeInMs - Date.now();
      }
      return currentSystemClockOffset;
    };
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/index.js
var init_utils2 = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/index.js"() {
    init_getDateHeader();
    init_getSkewCorrectedDate();
    init_getUpdatedSystemClockOffset();
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js
var throwSigningPropertyError, validateSigningProperties, AwsSdkSigV4Signer;
var init_AwsSdkSigV4Signer = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js"() {
    init_dist_es3();
    init_utils2();
    throwSigningPropertyError = (name, property) => {
      if (!property) {
        throw new Error(`Property \`${name}\` is not resolved for AWS SDK SigV4Auth`);
      }
      return property;
    };
    validateSigningProperties = async (signingProperties) => {
      var _a, _b, _c;
      const context = throwSigningPropertyError("context", signingProperties.context);
      const config = throwSigningPropertyError("config", signingProperties.config);
      const authScheme = (_c = (_b = (_a = context.endpointV2) == null ? void 0 : _a.properties) == null ? void 0 : _b.authSchemes) == null ? void 0 : _c[0];
      const signerFunction = throwSigningPropertyError("signer", config.signer);
      const signer = await signerFunction(authScheme);
      const signingRegion = signingProperties == null ? void 0 : signingProperties.signingRegion;
      const signingRegionSet = signingProperties == null ? void 0 : signingProperties.signingRegionSet;
      const signingName = signingProperties == null ? void 0 : signingProperties.signingName;
      return {
        config,
        signer,
        signingRegion,
        signingRegionSet,
        signingName
      };
    };
    AwsSdkSigV4Signer = class {
      async sign(httpRequest, identity, signingProperties) {
        var _a;
        if (!HttpRequest.isInstance(httpRequest)) {
          throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
        }
        const validatedProps = await validateSigningProperties(signingProperties);
        const { config, signer } = validatedProps;
        let { signingRegion, signingName } = validatedProps;
        const handlerExecutionContext = signingProperties.context;
        if (((_a = handlerExecutionContext == null ? void 0 : handlerExecutionContext.authSchemes) == null ? void 0 : _a.length) ?? 0 > 1) {
          const [first, second] = handlerExecutionContext.authSchemes;
          if ((first == null ? void 0 : first.name) === "sigv4a" && (second == null ? void 0 : second.name) === "sigv4") {
            signingRegion = (second == null ? void 0 : second.signingRegion) ?? signingRegion;
            signingName = (second == null ? void 0 : second.signingName) ?? signingName;
          }
        }
        const signedRequest = await signer.sign(httpRequest, {
          signingDate: getSkewCorrectedDate(config.systemClockOffset),
          signingRegion,
          signingService: signingName
        });
        return signedRequest;
      }
      errorHandler(signingProperties) {
        return (error) => {
          const serverTime = error.ServerTime ?? getDateHeader(error.$response);
          if (serverTime) {
            const config = throwSigningPropertyError("config", signingProperties.config);
            const initialSystemClockOffset = config.systemClockOffset;
            config.systemClockOffset = getUpdatedSystemClockOffset(serverTime, config.systemClockOffset);
            const clockSkewCorrected = config.systemClockOffset !== initialSystemClockOffset;
            if (clockSkewCorrected && error.$metadata) {
              error.$metadata.clockSkewCorrected = true;
            }
          }
          throw error;
        };
      }
      successHandler(httpResponse, signingProperties) {
        const dateHeader = getDateHeader(httpResponse);
        if (dateHeader) {
          const config = throwSigningPropertyError("config", signingProperties.config);
          config.systemClockOffset = getUpdatedSystemClockOffset(dateHeader, config.systemClockOffset);
        }
      }
    };
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4ASigner.js
var init_AwsSdkSigV4ASigner = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4ASigner.js"() {
    init_dist_es3();
    init_utils2();
    init_AwsSdkSigV4Signer();
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getArrayForCommaSeparatedString.js
var init_getArrayForCommaSeparatedString = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getArrayForCommaSeparatedString.js"() {
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js
var init_NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js"() {
    init_getArrayForCommaSeparatedString();
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4AConfig.js
var init_resolveAwsSdkSigV4AConfig = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4AConfig.js"() {
    init_dist_es9();
    init_dist_es();
  }
});

// node_modules/@smithy/signature-v4/dist-es/constants.js
var ALGORITHM_QUERY_PARAM, CREDENTIAL_QUERY_PARAM, AMZ_DATE_QUERY_PARAM, SIGNED_HEADERS_QUERY_PARAM, EXPIRES_QUERY_PARAM, SIGNATURE_QUERY_PARAM, TOKEN_QUERY_PARAM, AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER, GENERATED_HEADERS, SIGNATURE_HEADER, SHA256_HEADER, TOKEN_HEADER, ALWAYS_UNSIGNABLE_HEADERS, PROXY_HEADER_PATTERN, SEC_HEADER_PATTERN, ALGORITHM_IDENTIFIER, EVENT_ALGORITHM_IDENTIFIER, UNSIGNED_PAYLOAD, MAX_CACHE_SIZE, KEY_TYPE_IDENTIFIER, MAX_PRESIGNED_TTL;
var init_constants = __esm({
  "node_modules/@smithy/signature-v4/dist-es/constants.js"() {
    ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
    CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
    AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
    SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
    EXPIRES_QUERY_PARAM = "X-Amz-Expires";
    SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
    TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
    AUTH_HEADER = "authorization";
    AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
    DATE_HEADER = "date";
    GENERATED_HEADERS = [AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER];
    SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
    SHA256_HEADER = "x-amz-content-sha256";
    TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
    ALWAYS_UNSIGNABLE_HEADERS = {
      authorization: true,
      "cache-control": true,
      connection: true,
      expect: true,
      from: true,
      "keep-alive": true,
      "max-forwards": true,
      pragma: true,
      referer: true,
      te: true,
      trailer: true,
      "transfer-encoding": true,
      upgrade: true,
      "user-agent": true,
      "x-amzn-trace-id": true
    };
    PROXY_HEADER_PATTERN = /^proxy-/;
    SEC_HEADER_PATTERN = /^sec-/;
    ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
    EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
    UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
    MAX_CACHE_SIZE = 50;
    KEY_TYPE_IDENTIFIER = "aws4_request";
    MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;
  }
});

// node_modules/@smithy/signature-v4/dist-es/credentialDerivation.js
var signingKeyCache, cacheQueue, createScope, getSigningKey, hmac;
var init_credentialDerivation = __esm({
  "node_modules/@smithy/signature-v4/dist-es/credentialDerivation.js"() {
    init_dist_es8();
    init_dist_es6();
    init_constants();
    signingKeyCache = {};
    cacheQueue = [];
    createScope = (shortDate, region, service) => `${shortDate}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`;
    getSigningKey = async (sha256Constructor, credentials, shortDate, region, service) => {
      const credsHash = await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId);
      const cacheKey = `${shortDate}:${region}:${service}:${toHex(credsHash)}:${credentials.sessionToken}`;
      if (cacheKey in signingKeyCache) {
        return signingKeyCache[cacheKey];
      }
      cacheQueue.push(cacheKey);
      while (cacheQueue.length > MAX_CACHE_SIZE) {
        delete signingKeyCache[cacheQueue.shift()];
      }
      let key = `AWS4${credentials.secretAccessKey}`;
      for (const signable of [shortDate, region, service, KEY_TYPE_IDENTIFIER]) {
        key = await hmac(sha256Constructor, key, signable);
      }
      return signingKeyCache[cacheKey] = key;
    };
    hmac = (ctor, secret, data) => {
      const hash = new ctor(secret);
      hash.update(toUint8Array(data));
      return hash.digest();
    };
  }
});

// node_modules/@smithy/signature-v4/dist-es/getCanonicalHeaders.js
var getCanonicalHeaders;
var init_getCanonicalHeaders = __esm({
  "node_modules/@smithy/signature-v4/dist-es/getCanonicalHeaders.js"() {
    init_constants();
    getCanonicalHeaders = ({ headers }, unsignableHeaders, signableHeaders) => {
      const canonical = {};
      for (const headerName of Object.keys(headers).sort()) {
        if (headers[headerName] == void 0) {
          continue;
        }
        const canonicalHeaderName = headerName.toLowerCase();
        if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS || (unsignableHeaders == null ? void 0 : unsignableHeaders.has(canonicalHeaderName)) || PROXY_HEADER_PATTERN.test(canonicalHeaderName) || SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
          if (!signableHeaders || signableHeaders && !signableHeaders.has(canonicalHeaderName)) {
            continue;
          }
        }
        canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
      }
      return canonical;
    };
  }
});

// node_modules/@smithy/is-array-buffer/dist-es/index.js
var isArrayBuffer;
var init_dist_es16 = __esm({
  "node_modules/@smithy/is-array-buffer/dist-es/index.js"() {
    isArrayBuffer = (arg) => typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]";
  }
});

// node_modules/@smithy/signature-v4/dist-es/getPayloadHash.js
var getPayloadHash;
var init_getPayloadHash = __esm({
  "node_modules/@smithy/signature-v4/dist-es/getPayloadHash.js"() {
    init_dist_es16();
    init_dist_es8();
    init_dist_es6();
    init_constants();
    getPayloadHash = async ({ headers, body }, hashConstructor) => {
      for (const headerName of Object.keys(headers)) {
        if (headerName.toLowerCase() === SHA256_HEADER) {
          return headers[headerName];
        }
      }
      if (body == void 0) {
        return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
      } else if (typeof body === "string" || ArrayBuffer.isView(body) || isArrayBuffer(body)) {
        const hashCtor = new hashConstructor();
        hashCtor.update(toUint8Array(body));
        return toHex(await hashCtor.digest());
      }
      return UNSIGNED_PAYLOAD;
    };
  }
});

// node_modules/@smithy/signature-v4/dist-es/HeaderFormatter.js
function negate(bytes) {
  for (let i = 0; i < 8; i++) {
    bytes[i] ^= 255;
  }
  for (let i = 7; i > -1; i--) {
    bytes[i]++;
    if (bytes[i] !== 0)
      break;
  }
}
var HeaderFormatter, HEADER_VALUE_TYPE, UUID_PATTERN, Int64;
var init_HeaderFormatter = __esm({
  "node_modules/@smithy/signature-v4/dist-es/HeaderFormatter.js"() {
    init_dist_es8();
    init_dist_es6();
    HeaderFormatter = class {
      format(headers) {
        const chunks = [];
        for (const headerName of Object.keys(headers)) {
          const bytes = fromUtf8(headerName);
          chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
        }
        const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
        let position = 0;
        for (const chunk of chunks) {
          out.set(chunk, position);
          position += chunk.byteLength;
        }
        return out;
      }
      formatHeaderValue(header) {
        switch (header.type) {
          case "boolean":
            return Uint8Array.from([header.value ? 0 : 1]);
          case "byte":
            return Uint8Array.from([2, header.value]);
          case "short":
            const shortView = new DataView(new ArrayBuffer(3));
            shortView.setUint8(0, 3);
            shortView.setInt16(1, header.value, false);
            return new Uint8Array(shortView.buffer);
          case "integer":
            const intView = new DataView(new ArrayBuffer(5));
            intView.setUint8(0, 4);
            intView.setInt32(1, header.value, false);
            return new Uint8Array(intView.buffer);
          case "long":
            const longBytes = new Uint8Array(9);
            longBytes[0] = 5;
            longBytes.set(header.value.bytes, 1);
            return longBytes;
          case "binary":
            const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
            binView.setUint8(0, 6);
            binView.setUint16(1, header.value.byteLength, false);
            const binBytes = new Uint8Array(binView.buffer);
            binBytes.set(header.value, 3);
            return binBytes;
          case "string":
            const utf8Bytes = fromUtf8(header.value);
            const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
            strView.setUint8(0, 7);
            strView.setUint16(1, utf8Bytes.byteLength, false);
            const strBytes = new Uint8Array(strView.buffer);
            strBytes.set(utf8Bytes, 3);
            return strBytes;
          case "timestamp":
            const tsBytes = new Uint8Array(9);
            tsBytes[0] = 8;
            tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
            return tsBytes;
          case "uuid":
            if (!UUID_PATTERN.test(header.value)) {
              throw new Error(`Invalid UUID received: ${header.value}`);
            }
            const uuidBytes = new Uint8Array(17);
            uuidBytes[0] = 9;
            uuidBytes.set(fromHex(header.value.replace(/\-/g, "")), 1);
            return uuidBytes;
        }
      }
    };
    (function(HEADER_VALUE_TYPE2) {
      HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["boolTrue"] = 0] = "boolTrue";
      HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["boolFalse"] = 1] = "boolFalse";
      HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["byte"] = 2] = "byte";
      HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["short"] = 3] = "short";
      HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["integer"] = 4] = "integer";
      HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["long"] = 5] = "long";
      HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["byteArray"] = 6] = "byteArray";
      HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["string"] = 7] = "string";
      HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["timestamp"] = 8] = "timestamp";
      HEADER_VALUE_TYPE2[HEADER_VALUE_TYPE2["uuid"] = 9] = "uuid";
    })(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
    UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    Int64 = class _Int64 {
      constructor(bytes) {
        this.bytes = bytes;
        if (bytes.byteLength !== 8) {
          throw new Error("Int64 buffers must be exactly 8 bytes");
        }
      }
      static fromNumber(number) {
        if (number > 9223372036854776e3 || number < -9223372036854776e3) {
          throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
        }
        const bytes = new Uint8Array(8);
        for (let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) {
          bytes[i] = remaining;
        }
        if (number < 0) {
          negate(bytes);
        }
        return new _Int64(bytes);
      }
      valueOf() {
        const bytes = this.bytes.slice(0);
        const negative = bytes[0] & 128;
        if (negative) {
          negate(bytes);
        }
        return parseInt(toHex(bytes), 16) * (negative ? -1 : 1);
      }
      toString() {
        return String(this.valueOf());
      }
    };
  }
});

// node_modules/@smithy/signature-v4/dist-es/headerUtil.js
var hasHeader;
var init_headerUtil = __esm({
  "node_modules/@smithy/signature-v4/dist-es/headerUtil.js"() {
    hasHeader = (soughtHeader, headers) => {
      soughtHeader = soughtHeader.toLowerCase();
      for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
          return true;
        }
      }
      return false;
    };
  }
});

// node_modules/@smithy/signature-v4/dist-es/moveHeadersToQuery.js
var moveHeadersToQuery;
var init_moveHeadersToQuery = __esm({
  "node_modules/@smithy/signature-v4/dist-es/moveHeadersToQuery.js"() {
    init_dist_es3();
    moveHeadersToQuery = (request, options = {}) => {
      var _a, _b;
      const { headers, query = {} } = HttpRequest.clone(request);
      for (const name of Object.keys(headers)) {
        const lname = name.toLowerCase();
        if (lname.slice(0, 6) === "x-amz-" && !((_a = options.unhoistableHeaders) == null ? void 0 : _a.has(lname)) || ((_b = options.hoistableHeaders) == null ? void 0 : _b.has(lname))) {
          query[name] = headers[name];
          delete headers[name];
        }
      }
      return {
        ...request,
        headers,
        query
      };
    };
  }
});

// node_modules/@smithy/signature-v4/dist-es/prepareRequest.js
var prepareRequest;
var init_prepareRequest = __esm({
  "node_modules/@smithy/signature-v4/dist-es/prepareRequest.js"() {
    init_dist_es3();
    init_constants();
    prepareRequest = (request) => {
      request = HttpRequest.clone(request);
      for (const headerName of Object.keys(request.headers)) {
        if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
          delete request.headers[headerName];
        }
      }
      return request;
    };
  }
});

// node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js
var getCanonicalQuery;
var init_getCanonicalQuery = __esm({
  "node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js"() {
    init_dist_es7();
    init_constants();
    getCanonicalQuery = ({ query = {} }) => {
      const keys = [];
      const serialized = {};
      for (const key of Object.keys(query)) {
        if (key.toLowerCase() === SIGNATURE_HEADER) {
          continue;
        }
        const encodedKey = escapeUri(key);
        keys.push(encodedKey);
        const value = query[key];
        if (typeof value === "string") {
          serialized[encodedKey] = `${encodedKey}=${escapeUri(value)}`;
        } else if (Array.isArray(value)) {
          serialized[encodedKey] = value.slice(0).reduce((encoded, value2) => encoded.concat([`${encodedKey}=${escapeUri(value2)}`]), []).sort().join("&");
        }
      }
      return keys.sort().map((key) => serialized[key]).filter((serialized2) => serialized2).join("&");
    };
  }
});

// node_modules/@smithy/signature-v4/dist-es/utilDate.js
var iso8601, toDate;
var init_utilDate = __esm({
  "node_modules/@smithy/signature-v4/dist-es/utilDate.js"() {
    iso8601 = (time) => toDate(time).toISOString().replace(/\.\d{3}Z$/, "Z");
    toDate = (time) => {
      if (typeof time === "number") {
        return new Date(time * 1e3);
      }
      if (typeof time === "string") {
        if (Number(time)) {
          return new Date(Number(time) * 1e3);
        }
        return new Date(time);
      }
      return time;
    };
  }
});

// node_modules/@smithy/signature-v4/dist-es/SignatureV4Base.js
var SignatureV4Base;
var init_SignatureV4Base = __esm({
  "node_modules/@smithy/signature-v4/dist-es/SignatureV4Base.js"() {
    init_dist_es8();
    init_dist_es4();
    init_dist_es7();
    init_dist_es6();
    init_getCanonicalQuery();
    init_utilDate();
    SignatureV4Base = class {
      constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true }) {
        this.service = service;
        this.sha256 = sha256;
        this.uriEscapePath = uriEscapePath;
        this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
        this.regionProvider = normalizeProvider(region);
        this.credentialProvider = normalizeProvider(credentials);
      }
      createCanonicalRequest(request, canonicalHeaders, payloadHash) {
        const sortedHeaders = Object.keys(canonicalHeaders).sort();
        return `${request.method}
${this.getCanonicalPath(request)}
${getCanonicalQuery(request)}
${sortedHeaders.map((name) => `${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
      }
      async createStringToSign(longDate, credentialScope, canonicalRequest, algorithmIdentifier) {
        const hash = new this.sha256();
        hash.update(toUint8Array(canonicalRequest));
        const hashedRequest = await hash.digest();
        return `${algorithmIdentifier}
${longDate}
${credentialScope}
${toHex(hashedRequest)}`;
      }
      getCanonicalPath({ path }) {
        if (this.uriEscapePath) {
          const normalizedPathSegments = [];
          for (const pathSegment of path.split("/")) {
            if ((pathSegment == null ? void 0 : pathSegment.length) === 0)
              continue;
            if (pathSegment === ".")
              continue;
            if (pathSegment === "..") {
              normalizedPathSegments.pop();
            } else {
              normalizedPathSegments.push(pathSegment);
            }
          }
          const normalizedPath = `${(path == null ? void 0 : path.startsWith("/")) ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && (path == null ? void 0 : path.endsWith("/")) ? "/" : ""}`;
          const doubleEncoded = escapeUri(normalizedPath);
          return doubleEncoded.replace(/%2F/g, "/");
        }
        return path;
      }
      validateResolvedCredentials(credentials) {
        if (typeof credentials !== "object" || typeof credentials.accessKeyId !== "string" || typeof credentials.secretAccessKey !== "string") {
          throw new Error("Resolved credential object is not valid");
        }
      }
      formatDate(now) {
        const longDate = iso8601(now).replace(/[\-:]/g, "");
        return {
          longDate,
          shortDate: longDate.slice(0, 8)
        };
      }
      getCanonicalHeaderList(headers) {
        return Object.keys(headers).sort().join(";");
      }
    };
  }
});

// node_modules/@smithy/signature-v4/dist-es/SignatureV4.js
var SignatureV4;
var init_SignatureV4 = __esm({
  "node_modules/@smithy/signature-v4/dist-es/SignatureV4.js"() {
    init_dist_es8();
    init_dist_es6();
    init_constants();
    init_credentialDerivation();
    init_getCanonicalHeaders();
    init_getPayloadHash();
    init_HeaderFormatter();
    init_headerUtil();
    init_moveHeadersToQuery();
    init_prepareRequest();
    init_SignatureV4Base();
    SignatureV4 = class extends SignatureV4Base {
      constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true }) {
        super({
          applyChecksum,
          credentials,
          region,
          service,
          sha256,
          uriEscapePath
        });
        this.headerFormatter = new HeaderFormatter();
      }
      async presign(originalRequest, options = {}) {
        const { signingDate = /* @__PURE__ */ new Date(), expiresIn = 3600, unsignableHeaders, unhoistableHeaders, signableHeaders, hoistableHeaders, signingRegion, signingService } = options;
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const { longDate, shortDate } = this.formatDate(signingDate);
        if (expiresIn > MAX_PRESIGNED_TTL) {
          return Promise.reject("Signature version 4 presigned URLs must have an expiration date less than one week in the future");
        }
        const scope = createScope(shortDate, region, signingService ?? this.service);
        const request = moveHeadersToQuery(prepareRequest(originalRequest), { unhoistableHeaders, hoistableHeaders });
        if (credentials.sessionToken) {
          request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
        }
        request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
        request.query[CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
        request.query[AMZ_DATE_QUERY_PARAM] = longDate;
        request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
        const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
        request.query[SIGNED_HEADERS_QUERY_PARAM] = this.getCanonicalHeaderList(canonicalHeaders);
        request.query[SIGNATURE_QUERY_PARAM] = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, await getPayloadHash(originalRequest, this.sha256)));
        return request;
      }
      async sign(toSign, options) {
        if (typeof toSign === "string") {
          return this.signString(toSign, options);
        } else if (toSign.headers && toSign.payload) {
          return this.signEvent(toSign, options);
        } else if (toSign.message) {
          return this.signMessage(toSign, options);
        } else {
          return this.signRequest(toSign, options);
        }
      }
      async signEvent({ headers, payload }, { signingDate = /* @__PURE__ */ new Date(), priorSignature, signingRegion, signingService }) {
        const region = signingRegion ?? await this.regionProvider();
        const { shortDate, longDate } = this.formatDate(signingDate);
        const scope = createScope(shortDate, region, signingService ?? this.service);
        const hashedPayload = await getPayloadHash({ headers: {}, body: payload }, this.sha256);
        const hash = new this.sha256();
        hash.update(headers);
        const hashedHeaders = toHex(await hash.digest());
        const stringToSign = [
          EVENT_ALGORITHM_IDENTIFIER,
          longDate,
          scope,
          priorSignature,
          hashedHeaders,
          hashedPayload
        ].join("\n");
        return this.signString(stringToSign, { signingDate, signingRegion: region, signingService });
      }
      async signMessage(signableMessage, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService }) {
        const promise = this.signEvent({
          headers: this.headerFormatter.format(signableMessage.message.headers),
          payload: signableMessage.message.body
        }, {
          signingDate,
          signingRegion,
          signingService,
          priorSignature: signableMessage.priorSignature
        });
        return promise.then((signature) => {
          return { message: signableMessage.message, signature };
        });
      }
      async signString(stringToSign, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const { shortDate } = this.formatDate(signingDate);
        const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
        hash.update(toUint8Array(stringToSign));
        return toHex(await hash.digest());
      }
      async signRequest(requestToSign, { signingDate = /* @__PURE__ */ new Date(), signableHeaders, unsignableHeaders, signingRegion, signingService } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const request = prepareRequest(requestToSign);
        const { longDate, shortDate } = this.formatDate(signingDate);
        const scope = createScope(shortDate, region, signingService ?? this.service);
        request.headers[AMZ_DATE_HEADER] = longDate;
        if (credentials.sessionToken) {
          request.headers[TOKEN_HEADER] = credentials.sessionToken;
        }
        const payloadHash = await getPayloadHash(request, this.sha256);
        if (!hasHeader(SHA256_HEADER, request.headers) && this.applyChecksum) {
          request.headers[SHA256_HEADER] = payloadHash;
        }
        const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
        const signature = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash));
        request.headers[AUTH_HEADER] = `${ALGORITHM_IDENTIFIER} Credential=${credentials.accessKeyId}/${scope}, SignedHeaders=${this.getCanonicalHeaderList(canonicalHeaders)}, Signature=${signature}`;
        return request;
      }
      async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
        const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest, ALGORITHM_IDENTIFIER);
        const hash = new this.sha256(await keyPromise);
        hash.update(toUint8Array(stringToSign));
        return toHex(await hash.digest());
      }
      getSigningKey(credentials, region, shortDate, service) {
        return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
      }
    };
  }
});

// node_modules/@smithy/signature-v4/dist-es/signature-v4a-container.js
var init_signature_v4a_container = __esm({
  "node_modules/@smithy/signature-v4/dist-es/signature-v4a-container.js"() {
  }
});

// node_modules/@smithy/signature-v4/dist-es/index.js
var init_dist_es17 = __esm({
  "node_modules/@smithy/signature-v4/dist-es/index.js"() {
    init_SignatureV4();
    init_constants();
    init_getCanonicalHeaders();
    init_getCanonicalQuery();
    init_getPayloadHash();
    init_moveHeadersToQuery();
    init_prepareRequest();
    init_credentialDerivation();
    init_SignatureV4Base();
    init_headerUtil();
    init_signature_v4a_container();
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4Config.js
function normalizeCredentialProvider(config, { credentials, credentialDefaultProvider }) {
  let credentialsProvider;
  if (credentials) {
    if (!(credentials == null ? void 0 : credentials.memoized)) {
      credentialsProvider = memoizeIdentityProvider(credentials, isIdentityExpired, doesIdentityRequireRefresh);
    } else {
      credentialsProvider = credentials;
    }
  } else {
    if (credentialDefaultProvider) {
      credentialsProvider = normalizeProvider2(credentialDefaultProvider(Object.assign({}, config, {
        parentClientConfig: config
      })));
    } else {
      credentialsProvider = async () => {
        throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.");
      };
    }
  }
  credentialsProvider.memoized = true;
  return credentialsProvider;
}
function bindCallerConfig(config, credentialsProvider) {
  if (credentialsProvider.configBound) {
    return credentialsProvider;
  }
  const fn = async (options) => credentialsProvider({ ...options, callerClientConfig: config });
  fn.memoized = credentialsProvider.memoized;
  fn.configBound = true;
  return fn;
}
var resolveAwsSdkSigV4Config;
var init_resolveAwsSdkSigV4Config = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4Config.js"() {
    init_client();
    init_dist_es9();
    init_dist_es17();
    resolveAwsSdkSigV4Config = (config) => {
      let inputCredentials = config.credentials;
      let isUserSupplied = !!config.credentials;
      let resolvedCredentials = void 0;
      Object.defineProperty(config, "credentials", {
        set(credentials) {
          if (credentials && credentials !== inputCredentials && credentials !== resolvedCredentials) {
            isUserSupplied = true;
          }
          inputCredentials = credentials;
          const memoizedProvider = normalizeCredentialProvider(config, {
            credentials: inputCredentials,
            credentialDefaultProvider: config.credentialDefaultProvider
          });
          const boundProvider = bindCallerConfig(config, memoizedProvider);
          if (isUserSupplied && !boundProvider.attributed) {
            resolvedCredentials = async (options) => boundProvider(options).then((creds) => setCredentialFeature(creds, "CREDENTIALS_CODE", "e"));
            resolvedCredentials.memoized = boundProvider.memoized;
            resolvedCredentials.configBound = boundProvider.configBound;
            resolvedCredentials.attributed = true;
          } else {
            resolvedCredentials = boundProvider;
          }
        },
        get() {
          return resolvedCredentials;
        },
        enumerable: true,
        configurable: true
      });
      config.credentials = inputCredentials;
      const { signingEscapePath = true, systemClockOffset = config.systemClockOffset || 0, sha256 } = config;
      let signer;
      if (config.signer) {
        signer = normalizeProvider2(config.signer);
      } else if (config.regionInfoProvider) {
        signer = () => normalizeProvider2(config.region)().then(async (region) => [
          await config.regionInfoProvider(region, {
            useFipsEndpoint: await config.useFipsEndpoint(),
            useDualstackEndpoint: await config.useDualstackEndpoint()
          }) || {},
          region
        ]).then(([regionInfo, region]) => {
          const { signingRegion, signingService } = regionInfo;
          config.signingRegion = config.signingRegion || signingRegion || region;
          config.signingName = config.signingName || signingService || config.serviceId;
          const params = {
            ...config,
            credentials: config.credentials,
            region: config.signingRegion,
            service: config.signingName,
            sha256,
            uriEscapePath: signingEscapePath
          };
          const SignerCtor = config.signerConstructor || SignatureV4;
          return new SignerCtor(params);
        });
      } else {
        signer = async (authScheme) => {
          authScheme = Object.assign({}, {
            name: "sigv4",
            signingName: config.signingName || config.defaultSigningName,
            signingRegion: await normalizeProvider2(config.region)(),
            properties: {}
          }, authScheme);
          const signingRegion = authScheme.signingRegion;
          const signingService = authScheme.signingName;
          config.signingRegion = config.signingRegion || signingRegion;
          config.signingName = config.signingName || signingService || config.serviceId;
          const params = {
            ...config,
            credentials: config.credentials,
            region: config.signingRegion,
            service: config.signingName,
            sha256,
            uriEscapePath: signingEscapePath
          };
          const SignerCtor = config.signerConstructor || SignatureV4;
          return new SignerCtor(params);
        };
      }
      const resolvedConfig = Object.assign(config, {
        systemClockOffset,
        signingEscapePath,
        signer
      });
      return resolvedConfig;
    };
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/index.js
var init_aws_sdk = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/index.js"() {
    init_AwsSdkSigV4Signer();
    init_AwsSdkSigV4ASigner();
    init_NODE_AUTH_SCHEME_PREFERENCE_OPTIONS();
    init_resolveAwsSdkSigV4AConfig();
    init_resolveAwsSdkSigV4Config();
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/index.js
var init_httpAuthSchemes = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/index.js"() {
    init_aws_sdk();
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/coercing-serializers.js
var init_coercing_serializers = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/protocols/coercing-serializers.js"() {
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/awsExpectUnion.js
var init_awsExpectUnion = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/awsExpectUnion.js"() {
    init_dist_es10();
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/common.js
var collectBodyString;
var init_common = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/protocols/common.js"() {
    init_dist_es10();
    collectBodyString = (streamBody, context) => collectBody(streamBody, context).then((body) => context.utf8Encoder(body));
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/parseJsonBody.js
var parseJsonBody, parseJsonErrorBody, loadRestJsonErrorCode;
var init_parseJsonBody = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/protocols/json/parseJsonBody.js"() {
    init_common();
    parseJsonBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
      if (encoded.length) {
        try {
          return JSON.parse(encoded);
        } catch (e) {
          if ((e == null ? void 0 : e.name) === "SyntaxError") {
            Object.defineProperty(e, "$responseBodyText", {
              value: encoded
            });
          }
          throw e;
        }
      }
      return {};
    });
    parseJsonErrorBody = async (errorBody, context) => {
      const value = await parseJsonBody(errorBody, context);
      value.message = value.message ?? value.Message;
      return value;
    };
    loadRestJsonErrorCode = (output, data) => {
      const findKey = (object, key) => Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase());
      const sanitizeErrorCode = (rawValue) => {
        let cleanValue = rawValue;
        if (typeof cleanValue === "number") {
          cleanValue = cleanValue.toString();
        }
        if (cleanValue.indexOf(",") >= 0) {
          cleanValue = cleanValue.split(",")[0];
        }
        if (cleanValue.indexOf(":") >= 0) {
          cleanValue = cleanValue.split(":")[0];
        }
        if (cleanValue.indexOf("#") >= 0) {
          cleanValue = cleanValue.split("#")[1];
        }
        return cleanValue;
      };
      const headerKey = findKey(output.headers, "x-amzn-errortype");
      if (headerKey !== void 0) {
        return sanitizeErrorCode(output.headers[headerKey]);
      }
      if (data.code !== void 0) {
        return sanitizeErrorCode(data.code);
      }
      if (data["__type"] !== void 0) {
        return sanitizeErrorCode(data["__type"]);
      }
    };
  }
});

// node_modules/fast-xml-parser/src/util.js
var require_util = __commonJS({
  "node_modules/fast-xml-parser/src/util.js"(exports) {
    "use strict";
    var nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
    var nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
    var nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
    var regexName = new RegExp("^" + nameRegexp + "$");
    var getAllMatches = function(string, regex) {
      const matches = [];
      let match = regex.exec(string);
      while (match) {
        const allmatches = [];
        allmatches.startIndex = regex.lastIndex - match[0].length;
        const len = match.length;
        for (let index = 0; index < len; index++) {
          allmatches.push(match[index]);
        }
        matches.push(allmatches);
        match = regex.exec(string);
      }
      return matches;
    };
    var isName = function(string) {
      const match = regexName.exec(string);
      return !(match === null || typeof match === "undefined");
    };
    exports.isExist = function(v) {
      return typeof v !== "undefined";
    };
    exports.isEmptyObject = function(obj) {
      return Object.keys(obj).length === 0;
    };
    exports.merge = function(target, a, arrayMode) {
      if (a) {
        const keys = Object.keys(a);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
          if (arrayMode === "strict") {
            target[keys[i]] = [a[keys[i]]];
          } else {
            target[keys[i]] = a[keys[i]];
          }
        }
      }
    };
    exports.getValue = function(v) {
      if (exports.isExist(v)) {
        return v;
      } else {
        return "";
      }
    };
    exports.isName = isName;
    exports.getAllMatches = getAllMatches;
    exports.nameRegexp = nameRegexp;
  }
});

// node_modules/fast-xml-parser/src/validator.js
var require_validator = __commonJS({
  "node_modules/fast-xml-parser/src/validator.js"(exports) {
    "use strict";
    var util = require_util();
    var defaultOptions = {
      allowBooleanAttributes: false,
      //A tag can have attributes without any value
      unpairedTags: []
    };
    exports.validate = function(xmlData, options) {
      options = Object.assign({}, defaultOptions, options);
      const tags = [];
      let tagFound = false;
      let reachedRoot = false;
      if (xmlData[0] === "\uFEFF") {
        xmlData = xmlData.substr(1);
      }
      for (let i = 0; i < xmlData.length; i++) {
        if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
          i += 2;
          i = readPI(xmlData, i);
          if (i.err) return i;
        } else if (xmlData[i] === "<") {
          let tagStartPos = i;
          i++;
          if (xmlData[i] === "!") {
            i = readCommentAndCDATA(xmlData, i);
            continue;
          } else {
            let closingTag = false;
            if (xmlData[i] === "/") {
              closingTag = true;
              i++;
            }
            let tagName = "";
            for (; i < xmlData.length && xmlData[i] !== ">" && xmlData[i] !== " " && xmlData[i] !== "	" && xmlData[i] !== "\n" && xmlData[i] !== "\r"; i++) {
              tagName += xmlData[i];
            }
            tagName = tagName.trim();
            if (tagName[tagName.length - 1] === "/") {
              tagName = tagName.substring(0, tagName.length - 1);
              i--;
            }
            if (!validateTagName(tagName)) {
              let msg;
              if (tagName.trim().length === 0) {
                msg = "Invalid space after '<'.";
              } else {
                msg = "Tag '" + tagName + "' is an invalid name.";
              }
              return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
            }
            const result = readAttributeStr(xmlData, i);
            if (result === false) {
              return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
            }
            let attrStr = result.value;
            i = result.index;
            if (attrStr[attrStr.length - 1] === "/") {
              const attrStrStart = i - attrStr.length;
              attrStr = attrStr.substring(0, attrStr.length - 1);
              const isValid = validateAttributeString(attrStr, options);
              if (isValid === true) {
                tagFound = true;
              } else {
                return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
              }
            } else if (closingTag) {
              if (!result.tagClosed) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
              } else if (attrStr.trim().length > 0) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
              } else if (tags.length === 0) {
                return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
              } else {
                const otg = tags.pop();
                if (tagName !== otg.tagName) {
                  let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                  return getErrorObject(
                    "InvalidTag",
                    "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.",
                    getLineNumberForPosition(xmlData, tagStartPos)
                  );
                }
                if (tags.length == 0) {
                  reachedRoot = true;
                }
              }
            } else {
              const isValid = validateAttributeString(attrStr, options);
              if (isValid !== true) {
                return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
              }
              if (reachedRoot === true) {
                return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
              } else if (options.unpairedTags.indexOf(tagName) !== -1) {
              } else {
                tags.push({ tagName, tagStartPos });
              }
              tagFound = true;
            }
            for (i++; i < xmlData.length; i++) {
              if (xmlData[i] === "<") {
                if (xmlData[i + 1] === "!") {
                  i++;
                  i = readCommentAndCDATA(xmlData, i);
                  continue;
                } else if (xmlData[i + 1] === "?") {
                  i = readPI(xmlData, ++i);
                  if (i.err) return i;
                } else {
                  break;
                }
              } else if (xmlData[i] === "&") {
                const afterAmp = validateAmpersand(xmlData, i);
                if (afterAmp == -1)
                  return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
                i = afterAmp;
              } else {
                if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
                  return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
                }
              }
            }
            if (xmlData[i] === "<") {
              i--;
            }
          }
        } else {
          if (isWhiteSpace(xmlData[i])) {
            continue;
          }
          return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
        }
      }
      if (!tagFound) {
        return getErrorObject("InvalidXml", "Start tag expected.", 1);
      } else if (tags.length == 1) {
        return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
      } else if (tags.length > 0) {
        return getErrorObject("InvalidXml", "Invalid '" + JSON.stringify(tags.map((t) => t.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 });
      }
      return true;
    };
    function isWhiteSpace(char) {
      return char === " " || char === "	" || char === "\n" || char === "\r";
    }
    function readPI(xmlData, i) {
      const start = i;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] == "?" || xmlData[i] == " ") {
          const tagname = xmlData.substr(start, i - start);
          if (i > 5 && tagname === "xml") {
            return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
          } else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
            i++;
            break;
          } else {
            continue;
          }
        }
      }
      return i;
    }
    function readCommentAndCDATA(xmlData, i) {
      if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
        for (i += 3; i < xmlData.length; i++) {
          if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
            i += 2;
            break;
          }
        }
      } else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
        let angleBracketsCount = 1;
        for (i += 8; i < xmlData.length; i++) {
          if (xmlData[i] === "<") {
            angleBracketsCount++;
          } else if (xmlData[i] === ">") {
            angleBracketsCount--;
            if (angleBracketsCount === 0) {
              break;
            }
          }
        }
      } else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
        for (i += 8; i < xmlData.length; i++) {
          if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
            i += 2;
            break;
          }
        }
      }
      return i;
    }
    var doubleQuote = '"';
    var singleQuote = "'";
    function readAttributeStr(xmlData, i) {
      let attrStr = "";
      let startChar = "";
      let tagClosed = false;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
          if (startChar === "") {
            startChar = xmlData[i];
          } else if (startChar !== xmlData[i]) {
          } else {
            startChar = "";
          }
        } else if (xmlData[i] === ">") {
          if (startChar === "") {
            tagClosed = true;
            break;
          }
        }
        attrStr += xmlData[i];
      }
      if (startChar !== "") {
        return false;
      }
      return {
        value: attrStr,
        index: i,
        tagClosed
      };
    }
    var validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
    function validateAttributeString(attrStr, options) {
      const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
      const attrNames = {};
      for (let i = 0; i < matches.length; i++) {
        if (matches[i][1].length === 0) {
          return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] !== void 0 && matches[i][4] === void 0) {
          return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] === void 0 && !options.allowBooleanAttributes) {
          return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
        }
        const attrName = matches[i][2];
        if (!validateAttrName(attrName)) {
          return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
        }
        if (!attrNames.hasOwnProperty(attrName)) {
          attrNames[attrName] = 1;
        } else {
          return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
        }
      }
      return true;
    }
    function validateNumberAmpersand(xmlData, i) {
      let re = /\d/;
      if (xmlData[i] === "x") {
        i++;
        re = /[\da-fA-F]/;
      }
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === ";")
          return i;
        if (!xmlData[i].match(re))
          break;
      }
      return -1;
    }
    function validateAmpersand(xmlData, i) {
      i++;
      if (xmlData[i] === ";")
        return -1;
      if (xmlData[i] === "#") {
        i++;
        return validateNumberAmpersand(xmlData, i);
      }
      let count = 0;
      for (; i < xmlData.length; i++, count++) {
        if (xmlData[i].match(/\w/) && count < 20)
          continue;
        if (xmlData[i] === ";")
          break;
        return -1;
      }
      return i;
    }
    function getErrorObject(code, message, lineNumber) {
      return {
        err: {
          code,
          msg: message,
          line: lineNumber.line || lineNumber,
          col: lineNumber.col
        }
      };
    }
    function validateAttrName(attrName) {
      return util.isName(attrName);
    }
    function validateTagName(tagname) {
      return util.isName(tagname);
    }
    function getLineNumberForPosition(xmlData, index) {
      const lines = xmlData.substring(0, index).split(/\r?\n/);
      return {
        line: lines.length,
        // column number is last line's length + 1, because column numbering starts at 1:
        col: lines[lines.length - 1].length + 1
      };
    }
    function getPositionFromMatch(match) {
      return match.startIndex + match[1].length;
    }
  }
});

// node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js
var require_OptionsBuilder = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js"(exports) {
    var defaultOptions = {
      preserveOrder: false,
      attributeNamePrefix: "@_",
      attributesGroupName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      removeNSPrefix: false,
      // remove NS from tag name or attribute name if true
      allowBooleanAttributes: false,
      //a tag can have attributes without any value
      //ignoreRootElement : false,
      parseTagValue: true,
      parseAttributeValue: false,
      trimValues: true,
      //Trim string values of tag and attributes
      cdataPropName: false,
      numberParseOptions: {
        hex: true,
        leadingZeros: true,
        eNotation: true
      },
      tagValueProcessor: function(tagName, val2) {
        return val2;
      },
      attributeValueProcessor: function(attrName, val2) {
        return val2;
      },
      stopNodes: [],
      //nested tags will not be parsed even for errors
      alwaysCreateTextNode: false,
      isArray: () => false,
      commentPropName: false,
      unpairedTags: [],
      processEntities: true,
      htmlEntities: false,
      ignoreDeclaration: false,
      ignorePiTags: false,
      transformTagName: false,
      transformAttributeName: false,
      updateTag: function(tagName, jPath, attrs) {
        return tagName;
      }
      // skipEmptyListItem: false
    };
    var buildOptions = function(options) {
      return Object.assign({}, defaultOptions, options);
    };
    exports.buildOptions = buildOptions;
    exports.defaultOptions = defaultOptions;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/xmlNode.js
var require_xmlNode = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/xmlNode.js"(exports, module) {
    "use strict";
    var XmlNode = class {
      constructor(tagname) {
        this.tagname = tagname;
        this.child = [];
        this[":@"] = {};
      }
      add(key, val2) {
        if (key === "__proto__") key = "#__proto__";
        this.child.push({ [key]: val2 });
      }
      addChild(node) {
        if (node.tagname === "__proto__") node.tagname = "#__proto__";
        if (node[":@"] && Object.keys(node[":@"]).length > 0) {
          this.child.push({ [node.tagname]: node.child, [":@"]: node[":@"] });
        } else {
          this.child.push({ [node.tagname]: node.child });
        }
      }
    };
    module.exports = XmlNode;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js
var require_DocTypeReader = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js"(exports, module) {
    var util = require_util();
    function readDocType(xmlData, i) {
      const entities = {};
      if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
        i = i + 9;
        let angleBracketsCount = 1;
        let hasBody = false, comment = false;
        let exp = "";
        for (; i < xmlData.length; i++) {
          if (xmlData[i] === "<" && !comment) {
            if (hasBody && isEntity(xmlData, i)) {
              i += 7;
              [entityName, val, i] = readEntityExp(xmlData, i + 1);
              if (val.indexOf("&") === -1)
                entities[validateEntityName(entityName)] = {
                  regx: RegExp(`&${entityName};`, "g"),
                  val
                };
            } else if (hasBody && isElement(xmlData, i)) i += 8;
            else if (hasBody && isAttlist(xmlData, i)) i += 8;
            else if (hasBody && isNotation(xmlData, i)) i += 9;
            else if (isComment) comment = true;
            else throw new Error("Invalid DOCTYPE");
            angleBracketsCount++;
            exp = "";
          } else if (xmlData[i] === ">") {
            if (comment) {
              if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
                comment = false;
                angleBracketsCount--;
              }
            } else {
              angleBracketsCount--;
            }
            if (angleBracketsCount === 0) {
              break;
            }
          } else if (xmlData[i] === "[") {
            hasBody = true;
          } else {
            exp += xmlData[i];
          }
        }
        if (angleBracketsCount !== 0) {
          throw new Error(`Unclosed DOCTYPE`);
        }
      } else {
        throw new Error(`Invalid Tag instead of DOCTYPE`);
      }
      return { entities, i };
    }
    function readEntityExp(xmlData, i) {
      let entityName2 = "";
      for (; i < xmlData.length && (xmlData[i] !== "'" && xmlData[i] !== '"'); i++) {
        entityName2 += xmlData[i];
      }
      entityName2 = entityName2.trim();
      if (entityName2.indexOf(" ") !== -1) throw new Error("External entites are not supported");
      const startChar = xmlData[i++];
      let val2 = "";
      for (; i < xmlData.length && xmlData[i] !== startChar; i++) {
        val2 += xmlData[i];
      }
      return [entityName2, val2, i];
    }
    function isComment(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "-" && xmlData[i + 3] === "-") return true;
      return false;
    }
    function isEntity(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "N" && xmlData[i + 4] === "T" && xmlData[i + 5] === "I" && xmlData[i + 6] === "T" && xmlData[i + 7] === "Y") return true;
      return false;
    }
    function isElement(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "L" && xmlData[i + 4] === "E" && xmlData[i + 5] === "M" && xmlData[i + 6] === "E" && xmlData[i + 7] === "N" && xmlData[i + 8] === "T") return true;
      return false;
    }
    function isAttlist(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "A" && xmlData[i + 3] === "T" && xmlData[i + 4] === "T" && xmlData[i + 5] === "L" && xmlData[i + 6] === "I" && xmlData[i + 7] === "S" && xmlData[i + 8] === "T") return true;
      return false;
    }
    function isNotation(xmlData, i) {
      if (xmlData[i + 1] === "!" && xmlData[i + 2] === "N" && xmlData[i + 3] === "O" && xmlData[i + 4] === "T" && xmlData[i + 5] === "A" && xmlData[i + 6] === "T" && xmlData[i + 7] === "I" && xmlData[i + 8] === "O" && xmlData[i + 9] === "N") return true;
      return false;
    }
    function validateEntityName(name) {
      if (util.isName(name))
        return name;
      else
        throw new Error(`Invalid entity name ${name}`);
    }
    module.exports = readDocType;
  }
});

// node_modules/strnum/strnum.js
var require_strnum = __commonJS({
  "node_modules/strnum/strnum.js"(exports, module) {
    var hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
    var numRegex = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/;
    var consider = {
      hex: true,
      // oct: false,
      leadingZeros: true,
      decimalPoint: ".",
      eNotation: true
      //skipLike: /regex/
    };
    function toNumber(str, options = {}) {
      options = Object.assign({}, consider, options);
      if (!str || typeof str !== "string") return str;
      let trimmedStr = str.trim();
      if (options.skipLike !== void 0 && options.skipLike.test(trimmedStr)) return str;
      else if (str === "0") return 0;
      else if (options.hex && hexRegex.test(trimmedStr)) {
        return parse_int(trimmedStr, 16);
      } else if (trimmedStr.search(/[eE]/) !== -1) {
        const notation = trimmedStr.match(/^([-\+])?(0*)([0-9]*(\.[0-9]*)?[eE][-\+]?[0-9]+)$/);
        if (notation) {
          if (options.leadingZeros) {
            trimmedStr = (notation[1] || "") + notation[3];
          } else {
            if (notation[2] === "0" && notation[3][0] === ".") {
            } else {
              return str;
            }
          }
          return options.eNotation ? Number(trimmedStr) : str;
        } else {
          return str;
        }
      } else {
        const match = numRegex.exec(trimmedStr);
        if (match) {
          const sign = match[1];
          const leadingZeros = match[2];
          let numTrimmedByZeros = trimZeros(match[3]);
          if (!options.leadingZeros && leadingZeros.length > 0 && sign && trimmedStr[2] !== ".") return str;
          else if (!options.leadingZeros && leadingZeros.length > 0 && !sign && trimmedStr[1] !== ".") return str;
          else if (options.leadingZeros && leadingZeros === str) return 0;
          else {
            const num = Number(trimmedStr);
            const numStr = "" + num;
            if (numStr.search(/[eE]/) !== -1) {
              if (options.eNotation) return num;
              else return str;
            } else if (trimmedStr.indexOf(".") !== -1) {
              if (numStr === "0" && numTrimmedByZeros === "") return num;
              else if (numStr === numTrimmedByZeros) return num;
              else if (sign && numStr === "-" + numTrimmedByZeros) return num;
              else return str;
            }
            if (leadingZeros) {
              return numTrimmedByZeros === numStr || sign + numTrimmedByZeros === numStr ? num : str;
            } else {
              return trimmedStr === numStr || trimmedStr === sign + numStr ? num : str;
            }
          }
        } else {
          return str;
        }
      }
    }
    function trimZeros(numStr) {
      if (numStr && numStr.indexOf(".") !== -1) {
        numStr = numStr.replace(/0+$/, "");
        if (numStr === ".") numStr = "0";
        else if (numStr[0] === ".") numStr = "0" + numStr;
        else if (numStr[numStr.length - 1] === ".") numStr = numStr.substr(0, numStr.length - 1);
        return numStr;
      }
      return numStr;
    }
    function parse_int(numStr, base) {
      if (parseInt) return parseInt(numStr, base);
      else if (Number.parseInt) return Number.parseInt(numStr, base);
      else if (window && window.parseInt) return window.parseInt(numStr, base);
      else throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
    }
    module.exports = toNumber;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js
var require_OrderedObjParser = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js"(exports, module) {
    "use strict";
    var util = require_util();
    var xmlNode = require_xmlNode();
    var readDocType = require_DocTypeReader();
    var toNumber = require_strnum();
    var OrderedObjParser = class {
      constructor(options) {
        this.options = options;
        this.currentNode = null;
        this.tagsNodeStack = [];
        this.docTypeEntities = {};
        this.lastEntities = {
          "apos": { regex: /&(apos|#39|#x27);/g, val: "'" },
          "gt": { regex: /&(gt|#62|#x3E);/g, val: ">" },
          "lt": { regex: /&(lt|#60|#x3C);/g, val: "<" },
          "quot": { regex: /&(quot|#34|#x22);/g, val: '"' }
        };
        this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" };
        this.htmlEntities = {
          "space": { regex: /&(nbsp|#160);/g, val: " " },
          // "lt" : { regex: /&(lt|#60);/g, val: "<" },
          // "gt" : { regex: /&(gt|#62);/g, val: ">" },
          // "amp" : { regex: /&(amp|#38);/g, val: "&" },
          // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
          // "apos" : { regex: /&(apos|#39);/g, val: "'" },
          "cent": { regex: /&(cent|#162);/g, val: "¢" },
          "pound": { regex: /&(pound|#163);/g, val: "£" },
          "yen": { regex: /&(yen|#165);/g, val: "¥" },
          "euro": { regex: /&(euro|#8364);/g, val: "€" },
          "copyright": { regex: /&(copy|#169);/g, val: "©" },
          "reg": { regex: /&(reg|#174);/g, val: "®" },
          "inr": { regex: /&(inr|#8377);/g, val: "₹" },
          "num_dec": { regex: /&#([0-9]{1,7});/g, val: (_, str) => String.fromCharCode(Number.parseInt(str, 10)) },
          "num_hex": { regex: /&#x([0-9a-fA-F]{1,6});/g, val: (_, str) => String.fromCharCode(Number.parseInt(str, 16)) }
        };
        this.addExternalEntities = addExternalEntities;
        this.parseXml = parseXml;
        this.parseTextData = parseTextData;
        this.resolveNameSpace = resolveNameSpace;
        this.buildAttributesMap = buildAttributesMap;
        this.isItStopNode = isItStopNode;
        this.replaceEntitiesValue = replaceEntitiesValue;
        this.readStopNodeData = readStopNodeData;
        this.saveTextToParentTag = saveTextToParentTag;
        this.addChild = addChild;
      }
    };
    function addExternalEntities(externalEntities) {
      const entKeys = Object.keys(externalEntities);
      for (let i = 0; i < entKeys.length; i++) {
        const ent = entKeys[i];
        this.lastEntities[ent] = {
          regex: new RegExp("&" + ent + ";", "g"),
          val: externalEntities[ent]
        };
      }
    }
    function parseTextData(val2, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
      if (val2 !== void 0) {
        if (this.options.trimValues && !dontTrim) {
          val2 = val2.trim();
        }
        if (val2.length > 0) {
          if (!escapeEntities) val2 = this.replaceEntitiesValue(val2);
          const newval = this.options.tagValueProcessor(tagName, val2, jPath, hasAttributes, isLeafNode);
          if (newval === null || newval === void 0) {
            return val2;
          } else if (typeof newval !== typeof val2 || newval !== val2) {
            return newval;
          } else if (this.options.trimValues) {
            return parseValue(val2, this.options.parseTagValue, this.options.numberParseOptions);
          } else {
            const trimmedVal = val2.trim();
            if (trimmedVal === val2) {
              return parseValue(val2, this.options.parseTagValue, this.options.numberParseOptions);
            } else {
              return val2;
            }
          }
        }
      }
    }
    function resolveNameSpace(tagname) {
      if (this.options.removeNSPrefix) {
        const tags = tagname.split(":");
        const prefix = tagname.charAt(0) === "/" ? "/" : "";
        if (tags[0] === "xmlns") {
          return "";
        }
        if (tags.length === 2) {
          tagname = prefix + tags[1];
        }
      }
      return tagname;
    }
    var attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
    function buildAttributesMap(attrStr, jPath, tagName) {
      if (!this.options.ignoreAttributes && typeof attrStr === "string") {
        const matches = util.getAllMatches(attrStr, attrsRegx);
        const len = matches.length;
        const attrs = {};
        for (let i = 0; i < len; i++) {
          const attrName = this.resolveNameSpace(matches[i][1]);
          let oldVal = matches[i][4];
          let aName = this.options.attributeNamePrefix + attrName;
          if (attrName.length) {
            if (this.options.transformAttributeName) {
              aName = this.options.transformAttributeName(aName);
            }
            if (aName === "__proto__") aName = "#__proto__";
            if (oldVal !== void 0) {
              if (this.options.trimValues) {
                oldVal = oldVal.trim();
              }
              oldVal = this.replaceEntitiesValue(oldVal);
              const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
              if (newVal === null || newVal === void 0) {
                attrs[aName] = oldVal;
              } else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
                attrs[aName] = newVal;
              } else {
                attrs[aName] = parseValue(
                  oldVal,
                  this.options.parseAttributeValue,
                  this.options.numberParseOptions
                );
              }
            } else if (this.options.allowBooleanAttributes) {
              attrs[aName] = true;
            }
          }
        }
        if (!Object.keys(attrs).length) {
          return;
        }
        if (this.options.attributesGroupName) {
          const attrCollection = {};
          attrCollection[this.options.attributesGroupName] = attrs;
          return attrCollection;
        }
        return attrs;
      }
    }
    var parseXml = function(xmlData) {
      xmlData = xmlData.replace(/\r\n?/g, "\n");
      const xmlObj = new xmlNode("!xml");
      let currentNode = xmlObj;
      let textData = "";
      let jPath = "";
      for (let i = 0; i < xmlData.length; i++) {
        const ch = xmlData[i];
        if (ch === "<") {
          if (xmlData[i + 1] === "/") {
            const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
            let tagName = xmlData.substring(i + 2, closeIndex).trim();
            if (this.options.removeNSPrefix) {
              const colonIndex = tagName.indexOf(":");
              if (colonIndex !== -1) {
                tagName = tagName.substr(colonIndex + 1);
              }
            }
            if (this.options.transformTagName) {
              tagName = this.options.transformTagName(tagName);
            }
            if (currentNode) {
              textData = this.saveTextToParentTag(textData, currentNode, jPath);
            }
            const lastTagName = jPath.substring(jPath.lastIndexOf(".") + 1);
            if (tagName && this.options.unpairedTags.indexOf(tagName) !== -1) {
              throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
            }
            let propIndex = 0;
            if (lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1) {
              propIndex = jPath.lastIndexOf(".", jPath.lastIndexOf(".") - 1);
              this.tagsNodeStack.pop();
            } else {
              propIndex = jPath.lastIndexOf(".");
            }
            jPath = jPath.substring(0, propIndex);
            currentNode = this.tagsNodeStack.pop();
            textData = "";
            i = closeIndex;
          } else if (xmlData[i + 1] === "?") {
            let tagData = readTagExp(xmlData, i, false, "?>");
            if (!tagData) throw new Error("Pi Tag is not closed.");
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            if (this.options.ignoreDeclaration && tagData.tagName === "?xml" || this.options.ignorePiTags) {
            } else {
              const childNode = new xmlNode(tagData.tagName);
              childNode.add(this.options.textNodeName, "");
              if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath, tagData.tagName);
              }
              this.addChild(currentNode, childNode, jPath);
            }
            i = tagData.closeIndex + 1;
          } else if (xmlData.substr(i + 1, 3) === "!--") {
            const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
            if (this.options.commentPropName) {
              const comment = xmlData.substring(i + 4, endIndex - 2);
              textData = this.saveTextToParentTag(textData, currentNode, jPath);
              currentNode.add(this.options.commentPropName, [{ [this.options.textNodeName]: comment }]);
            }
            i = endIndex;
          } else if (xmlData.substr(i + 1, 2) === "!D") {
            const result = readDocType(xmlData, i);
            this.docTypeEntities = result.entities;
            i = result.i;
          } else if (xmlData.substr(i + 1, 2) === "![") {
            const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
            const tagExp = xmlData.substring(i + 9, closeIndex);
            textData = this.saveTextToParentTag(textData, currentNode, jPath);
            let val2 = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true, true);
            if (val2 == void 0) val2 = "";
            if (this.options.cdataPropName) {
              currentNode.add(this.options.cdataPropName, [{ [this.options.textNodeName]: tagExp }]);
            } else {
              currentNode.add(this.options.textNodeName, val2);
            }
            i = closeIndex + 2;
          } else {
            let result = readTagExp(xmlData, i, this.options.removeNSPrefix);
            let tagName = result.tagName;
            const rawTagName = result.rawTagName;
            let tagExp = result.tagExp;
            let attrExpPresent = result.attrExpPresent;
            let closeIndex = result.closeIndex;
            if (this.options.transformTagName) {
              tagName = this.options.transformTagName(tagName);
            }
            if (currentNode && textData) {
              if (currentNode.tagname !== "!xml") {
                textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
              }
            }
            const lastTag = currentNode;
            if (lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1) {
              currentNode = this.tagsNodeStack.pop();
              jPath = jPath.substring(0, jPath.lastIndexOf("."));
            }
            if (tagName !== xmlObj.tagname) {
              jPath += jPath ? "." + tagName : tagName;
            }
            if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
              let tagContent = "";
              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                if (tagName[tagName.length - 1] === "/") {
                  tagName = tagName.substr(0, tagName.length - 1);
                  jPath = jPath.substr(0, jPath.length - 1);
                  tagExp = tagName;
                } else {
                  tagExp = tagExp.substr(0, tagExp.length - 1);
                }
                i = result.closeIndex;
              } else if (this.options.unpairedTags.indexOf(tagName) !== -1) {
                i = result.closeIndex;
              } else {
                const result2 = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
                if (!result2) throw new Error(`Unexpected end of ${rawTagName}`);
                i = result2.i;
                tagContent = result2.tagContent;
              }
              const childNode = new xmlNode(tagName);
              if (tagName !== tagExp && attrExpPresent) {
                childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
              }
              if (tagContent) {
                tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
              }
              jPath = jPath.substr(0, jPath.lastIndexOf("."));
              childNode.add(this.options.textNodeName, tagContent);
              this.addChild(currentNode, childNode, jPath);
            } else {
              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                if (tagName[tagName.length - 1] === "/") {
                  tagName = tagName.substr(0, tagName.length - 1);
                  jPath = jPath.substr(0, jPath.length - 1);
                  tagExp = tagName;
                } else {
                  tagExp = tagExp.substr(0, tagExp.length - 1);
                }
                if (this.options.transformTagName) {
                  tagName = this.options.transformTagName(tagName);
                }
                const childNode = new xmlNode(tagName);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
                }
                this.addChild(currentNode, childNode, jPath);
                jPath = jPath.substr(0, jPath.lastIndexOf("."));
              } else {
                const childNode = new xmlNode(tagName);
                this.tagsNodeStack.push(currentNode);
                if (tagName !== tagExp && attrExpPresent) {
                  childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
                }
                this.addChild(currentNode, childNode, jPath);
                currentNode = childNode;
              }
              textData = "";
              i = closeIndex;
            }
          }
        } else {
          textData += xmlData[i];
        }
      }
      return xmlObj.child;
    };
    function addChild(currentNode, childNode, jPath) {
      const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"]);
      if (result === false) {
      } else if (typeof result === "string") {
        childNode.tagname = result;
        currentNode.addChild(childNode);
      } else {
        currentNode.addChild(childNode);
      }
    }
    var replaceEntitiesValue = function(val2) {
      if (this.options.processEntities) {
        for (let entityName2 in this.docTypeEntities) {
          const entity = this.docTypeEntities[entityName2];
          val2 = val2.replace(entity.regx, entity.val);
        }
        for (let entityName2 in this.lastEntities) {
          const entity = this.lastEntities[entityName2];
          val2 = val2.replace(entity.regex, entity.val);
        }
        if (this.options.htmlEntities) {
          for (let entityName2 in this.htmlEntities) {
            const entity = this.htmlEntities[entityName2];
            val2 = val2.replace(entity.regex, entity.val);
          }
        }
        val2 = val2.replace(this.ampEntity.regex, this.ampEntity.val);
      }
      return val2;
    };
    function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
      if (textData) {
        if (isLeafNode === void 0) isLeafNode = Object.keys(currentNode.child).length === 0;
        textData = this.parseTextData(
          textData,
          currentNode.tagname,
          jPath,
          false,
          currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false,
          isLeafNode
        );
        if (textData !== void 0 && textData !== "")
          currentNode.add(this.options.textNodeName, textData);
        textData = "";
      }
      return textData;
    }
    function isItStopNode(stopNodes, jPath, currentTagName) {
      const allNodesExp = "*." + currentTagName;
      for (const stopNodePath in stopNodes) {
        const stopNodeExp = stopNodes[stopNodePath];
        if (allNodesExp === stopNodeExp || jPath === stopNodeExp) return true;
      }
      return false;
    }
    function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
      let attrBoundary;
      let tagExp = "";
      for (let index = i; index < xmlData.length; index++) {
        let ch = xmlData[index];
        if (attrBoundary) {
          if (ch === attrBoundary) attrBoundary = "";
        } else if (ch === '"' || ch === "'") {
          attrBoundary = ch;
        } else if (ch === closingChar[0]) {
          if (closingChar[1]) {
            if (xmlData[index + 1] === closingChar[1]) {
              return {
                data: tagExp,
                index
              };
            }
          } else {
            return {
              data: tagExp,
              index
            };
          }
        } else if (ch === "	") {
          ch = " ";
        }
        tagExp += ch;
      }
    }
    function findClosingIndex(xmlData, str, i, errMsg) {
      const closingIndex = xmlData.indexOf(str, i);
      if (closingIndex === -1) {
        throw new Error(errMsg);
      } else {
        return closingIndex + str.length - 1;
      }
    }
    function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
      const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
      if (!result) return;
      let tagExp = result.data;
      const closeIndex = result.index;
      const separatorIndex = tagExp.search(/\s/);
      let tagName = tagExp;
      let attrExpPresent = true;
      if (separatorIndex !== -1) {
        tagName = tagExp.substring(0, separatorIndex);
        tagExp = tagExp.substring(separatorIndex + 1).trimStart();
      }
      const rawTagName = tagName;
      if (removeNSPrefix) {
        const colonIndex = tagName.indexOf(":");
        if (colonIndex !== -1) {
          tagName = tagName.substr(colonIndex + 1);
          attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
        }
      }
      return {
        tagName,
        tagExp,
        closeIndex,
        attrExpPresent,
        rawTagName
      };
    }
    function readStopNodeData(xmlData, tagName, i) {
      const startIndex = i;
      let openTagCount = 1;
      for (; i < xmlData.length; i++) {
        if (xmlData[i] === "<") {
          if (xmlData[i + 1] === "/") {
            const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
            let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
            if (closeTagName === tagName) {
              openTagCount--;
              if (openTagCount === 0) {
                return {
                  tagContent: xmlData.substring(startIndex, i),
                  i: closeIndex
                };
              }
            }
            i = closeIndex;
          } else if (xmlData[i + 1] === "?") {
            const closeIndex = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
            i = closeIndex;
          } else if (xmlData.substr(i + 1, 3) === "!--") {
            const closeIndex = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
            i = closeIndex;
          } else if (xmlData.substr(i + 1, 2) === "![") {
            const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
            i = closeIndex;
          } else {
            const tagData = readTagExp(xmlData, i, ">");
            if (tagData) {
              const openTagName = tagData && tagData.tagName;
              if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") {
                openTagCount++;
              }
              i = tagData.closeIndex;
            }
          }
        }
      }
    }
    function parseValue(val2, shouldParse, options) {
      if (shouldParse && typeof val2 === "string") {
        const newval = val2.trim();
        if (newval === "true") return true;
        else if (newval === "false") return false;
        else return toNumber(val2, options);
      } else {
        if (util.isExist(val2)) {
          return val2;
        } else {
          return "";
        }
      }
    }
    module.exports = OrderedObjParser;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/node2json.js
var require_node2json = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/node2json.js"(exports) {
    "use strict";
    function prettify(node, options) {
      return compress(node, options);
    }
    function compress(arr, options, jPath) {
      let text;
      const compressedObj = {};
      for (let i = 0; i < arr.length; i++) {
        const tagObj = arr[i];
        const property = propName(tagObj);
        let newJpath = "";
        if (jPath === void 0) newJpath = property;
        else newJpath = jPath + "." + property;
        if (property === options.textNodeName) {
          if (text === void 0) text = tagObj[property];
          else text += "" + tagObj[property];
        } else if (property === void 0) {
          continue;
        } else if (tagObj[property]) {
          let val2 = compress(tagObj[property], options, newJpath);
          const isLeaf = isLeafTag(val2, options);
          if (tagObj[":@"]) {
            assignAttributes(val2, tagObj[":@"], newJpath, options);
          } else if (Object.keys(val2).length === 1 && val2[options.textNodeName] !== void 0 && !options.alwaysCreateTextNode) {
            val2 = val2[options.textNodeName];
          } else if (Object.keys(val2).length === 0) {
            if (options.alwaysCreateTextNode) val2[options.textNodeName] = "";
            else val2 = "";
          }
          if (compressedObj[property] !== void 0 && compressedObj.hasOwnProperty(property)) {
            if (!Array.isArray(compressedObj[property])) {
              compressedObj[property] = [compressedObj[property]];
            }
            compressedObj[property].push(val2);
          } else {
            if (options.isArray(property, newJpath, isLeaf)) {
              compressedObj[property] = [val2];
            } else {
              compressedObj[property] = val2;
            }
          }
        }
      }
      if (typeof text === "string") {
        if (text.length > 0) compressedObj[options.textNodeName] = text;
      } else if (text !== void 0) compressedObj[options.textNodeName] = text;
      return compressedObj;
    }
    function propName(obj) {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key !== ":@") return key;
      }
    }
    function assignAttributes(obj, attrMap, jpath, options) {
      if (attrMap) {
        const keys = Object.keys(attrMap);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
          const atrrName = keys[i];
          if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
            obj[atrrName] = [attrMap[atrrName]];
          } else {
            obj[atrrName] = attrMap[atrrName];
          }
        }
      }
    }
    function isLeafTag(obj, options) {
      const { textNodeName } = options;
      const propCount = Object.keys(obj).length;
      if (propCount === 0) {
        return true;
      }
      if (propCount === 1 && (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)) {
        return true;
      }
      return false;
    }
    exports.prettify = prettify;
  }
});

// node_modules/fast-xml-parser/src/xmlparser/XMLParser.js
var require_XMLParser = __commonJS({
  "node_modules/fast-xml-parser/src/xmlparser/XMLParser.js"(exports, module) {
    var { buildOptions } = require_OptionsBuilder();
    var OrderedObjParser = require_OrderedObjParser();
    var { prettify } = require_node2json();
    var validator = require_validator();
    var XMLParser2 = class {
      constructor(options) {
        this.externalEntities = {};
        this.options = buildOptions(options);
      }
      /**
       * Parse XML dats to JS object 
       * @param {string|Buffer} xmlData 
       * @param {boolean|Object} validationOption 
       */
      parse(xmlData, validationOption) {
        if (typeof xmlData === "string") {
        } else if (xmlData.toString) {
          xmlData = xmlData.toString();
        } else {
          throw new Error("XML data is accepted in String or Bytes[] form.");
        }
        if (validationOption) {
          if (validationOption === true) validationOption = {};
          const result = validator.validate(xmlData, validationOption);
          if (result !== true) {
            throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
          }
        }
        const orderedObjParser = new OrderedObjParser(this.options);
        orderedObjParser.addExternalEntities(this.externalEntities);
        const orderedResult = orderedObjParser.parseXml(xmlData);
        if (this.options.preserveOrder || orderedResult === void 0) return orderedResult;
        else return prettify(orderedResult, this.options);
      }
      /**
       * Add Entity which is not by default supported by this library
       * @param {string} key 
       * @param {string} value 
       */
      addEntity(key, value) {
        if (value.indexOf("&") !== -1) {
          throw new Error("Entity value can't have '&'");
        } else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) {
          throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
        } else if (value === "&") {
          throw new Error("An entity with value '&' is not permitted");
        } else {
          this.externalEntities[key] = value;
        }
      }
    };
    module.exports = XMLParser2;
  }
});

// node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js
var require_orderedJs2Xml = __commonJS({
  "node_modules/fast-xml-parser/src/xmlbuilder/orderedJs2Xml.js"(exports, module) {
    var EOL = "\n";
    function toXml(jArray, options) {
      let indentation = "";
      if (options.format && options.indentBy.length > 0) {
        indentation = EOL;
      }
      return arrToStr(jArray, options, "", indentation);
    }
    function arrToStr(arr, options, jPath, indentation) {
      let xmlStr = "";
      let isPreviousElementTag = false;
      for (let i = 0; i < arr.length; i++) {
        const tagObj = arr[i];
        const tagName = propName(tagObj);
        if (tagName === void 0) continue;
        let newJPath = "";
        if (jPath.length === 0) newJPath = tagName;
        else newJPath = `${jPath}.${tagName}`;
        if (tagName === options.textNodeName) {
          let tagText = tagObj[tagName];
          if (!isStopNode(newJPath, options)) {
            tagText = options.tagValueProcessor(tagName, tagText);
            tagText = replaceEntitiesValue(tagText, options);
          }
          if (isPreviousElementTag) {
            xmlStr += indentation;
          }
          xmlStr += tagText;
          isPreviousElementTag = false;
          continue;
        } else if (tagName === options.cdataPropName) {
          if (isPreviousElementTag) {
            xmlStr += indentation;
          }
          xmlStr += `<![CDATA[${tagObj[tagName][0][options.textNodeName]}]]>`;
          isPreviousElementTag = false;
          continue;
        } else if (tagName === options.commentPropName) {
          xmlStr += indentation + `<!--${tagObj[tagName][0][options.textNodeName]}-->`;
          isPreviousElementTag = true;
          continue;
        } else if (tagName[0] === "?") {
          const attStr2 = attr_to_str(tagObj[":@"], options);
          const tempInd = tagName === "?xml" ? "" : indentation;
          let piTextNodeName = tagObj[tagName][0][options.textNodeName];
          piTextNodeName = piTextNodeName.length !== 0 ? " " + piTextNodeName : "";
          xmlStr += tempInd + `<${tagName}${piTextNodeName}${attStr2}?>`;
          isPreviousElementTag = true;
          continue;
        }
        let newIdentation = indentation;
        if (newIdentation !== "") {
          newIdentation += options.indentBy;
        }
        const attStr = attr_to_str(tagObj[":@"], options);
        const tagStart = indentation + `<${tagName}${attStr}`;
        const tagValue = arrToStr(tagObj[tagName], options, newJPath, newIdentation);
        if (options.unpairedTags.indexOf(tagName) !== -1) {
          if (options.suppressUnpairedNode) xmlStr += tagStart + ">";
          else xmlStr += tagStart + "/>";
        } else if ((!tagValue || tagValue.length === 0) && options.suppressEmptyNode) {
          xmlStr += tagStart + "/>";
        } else if (tagValue && tagValue.endsWith(">")) {
          xmlStr += tagStart + `>${tagValue}${indentation}</${tagName}>`;
        } else {
          xmlStr += tagStart + ">";
          if (tagValue && indentation !== "" && (tagValue.includes("/>") || tagValue.includes("</"))) {
            xmlStr += indentation + options.indentBy + tagValue + indentation;
          } else {
            xmlStr += tagValue;
          }
          xmlStr += `</${tagName}>`;
        }
        isPreviousElementTag = true;
      }
      return xmlStr;
    }
    function propName(obj) {
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!obj.hasOwnProperty(key)) continue;
        if (key !== ":@") return key;
      }
    }
    function attr_to_str(attrMap, options) {
      let attrStr = "";
      if (attrMap && !options.ignoreAttributes) {
        for (let attr in attrMap) {
          if (!attrMap.hasOwnProperty(attr)) continue;
          let attrVal = options.attributeValueProcessor(attr, attrMap[attr]);
          attrVal = replaceEntitiesValue(attrVal, options);
          if (attrVal === true && options.suppressBooleanAttributes) {
            attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}`;
          } else {
            attrStr += ` ${attr.substr(options.attributeNamePrefix.length)}="${attrVal}"`;
          }
        }
      }
      return attrStr;
    }
    function isStopNode(jPath, options) {
      jPath = jPath.substr(0, jPath.length - options.textNodeName.length - 1);
      let tagName = jPath.substr(jPath.lastIndexOf(".") + 1);
      for (let index in options.stopNodes) {
        if (options.stopNodes[index] === jPath || options.stopNodes[index] === "*." + tagName) return true;
      }
      return false;
    }
    function replaceEntitiesValue(textValue, options) {
      if (textValue && textValue.length > 0 && options.processEntities) {
        for (let i = 0; i < options.entities.length; i++) {
          const entity = options.entities[i];
          textValue = textValue.replace(entity.regex, entity.val);
        }
      }
      return textValue;
    }
    module.exports = toXml;
  }
});

// node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js
var require_json2xml = __commonJS({
  "node_modules/fast-xml-parser/src/xmlbuilder/json2xml.js"(exports, module) {
    "use strict";
    var buildFromOrderedJs = require_orderedJs2Xml();
    var defaultOptions = {
      attributeNamePrefix: "@_",
      attributesGroupName: false,
      textNodeName: "#text",
      ignoreAttributes: true,
      cdataPropName: false,
      format: false,
      indentBy: "  ",
      suppressEmptyNode: false,
      suppressUnpairedNode: true,
      suppressBooleanAttributes: true,
      tagValueProcessor: function(key, a) {
        return a;
      },
      attributeValueProcessor: function(attrName, a) {
        return a;
      },
      preserveOrder: false,
      commentPropName: false,
      unpairedTags: [],
      entities: [
        { regex: new RegExp("&", "g"), val: "&amp;" },
        //it must be on top
        { regex: new RegExp(">", "g"), val: "&gt;" },
        { regex: new RegExp("<", "g"), val: "&lt;" },
        { regex: new RegExp("'", "g"), val: "&apos;" },
        { regex: new RegExp('"', "g"), val: "&quot;" }
      ],
      processEntities: true,
      stopNodes: [],
      // transformTagName: false,
      // transformAttributeName: false,
      oneListGroup: false
    };
    function Builder(options) {
      this.options = Object.assign({}, defaultOptions, options);
      if (this.options.ignoreAttributes || this.options.attributesGroupName) {
        this.isAttribute = function() {
          return false;
        };
      } else {
        this.attrPrefixLen = this.options.attributeNamePrefix.length;
        this.isAttribute = isAttribute;
      }
      this.processTextOrObjNode = processTextOrObjNode;
      if (this.options.format) {
        this.indentate = indentate;
        this.tagEndChar = ">\n";
        this.newLine = "\n";
      } else {
        this.indentate = function() {
          return "";
        };
        this.tagEndChar = ">";
        this.newLine = "";
      }
    }
    Builder.prototype.build = function(jObj) {
      if (this.options.preserveOrder) {
        return buildFromOrderedJs(jObj, this.options);
      } else {
        if (Array.isArray(jObj) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1) {
          jObj = {
            [this.options.arrayNodeName]: jObj
          };
        }
        return this.j2x(jObj, 0).val;
      }
    };
    Builder.prototype.j2x = function(jObj, level) {
      let attrStr = "";
      let val2 = "";
      for (let key in jObj) {
        if (!Object.prototype.hasOwnProperty.call(jObj, key)) continue;
        if (typeof jObj[key] === "undefined") {
          if (this.isAttribute(key)) {
            val2 += "";
          }
        } else if (jObj[key] === null) {
          if (this.isAttribute(key)) {
            val2 += "";
          } else if (key[0] === "?") {
            val2 += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
          } else {
            val2 += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
          }
        } else if (jObj[key] instanceof Date) {
          val2 += this.buildTextValNode(jObj[key], key, "", level);
        } else if (typeof jObj[key] !== "object") {
          const attr = this.isAttribute(key);
          if (attr) {
            attrStr += this.buildAttrPairStr(attr, "" + jObj[key]);
          } else {
            if (key === this.options.textNodeName) {
              let newval = this.options.tagValueProcessor(key, "" + jObj[key]);
              val2 += this.replaceEntitiesValue(newval);
            } else {
              val2 += this.buildTextValNode(jObj[key], key, "", level);
            }
          }
        } else if (Array.isArray(jObj[key])) {
          const arrLen = jObj[key].length;
          let listTagVal = "";
          let listTagAttr = "";
          for (let j = 0; j < arrLen; j++) {
            const item = jObj[key][j];
            if (typeof item === "undefined") {
            } else if (item === null) {
              if (key[0] === "?") val2 += this.indentate(level) + "<" + key + "?" + this.tagEndChar;
              else val2 += this.indentate(level) + "<" + key + "/" + this.tagEndChar;
            } else if (typeof item === "object") {
              if (this.options.oneListGroup) {
                const result = this.j2x(item, level + 1);
                listTagVal += result.val;
                if (this.options.attributesGroupName && item.hasOwnProperty(this.options.attributesGroupName)) {
                  listTagAttr += result.attrStr;
                }
              } else {
                listTagVal += this.processTextOrObjNode(item, key, level);
              }
            } else {
              if (this.options.oneListGroup) {
                let textValue = this.options.tagValueProcessor(key, item);
                textValue = this.replaceEntitiesValue(textValue);
                listTagVal += textValue;
              } else {
                listTagVal += this.buildTextValNode(item, key, "", level);
              }
            }
          }
          if (this.options.oneListGroup) {
            listTagVal = this.buildObjectNode(listTagVal, key, listTagAttr, level);
          }
          val2 += listTagVal;
        } else {
          if (this.options.attributesGroupName && key === this.options.attributesGroupName) {
            const Ks = Object.keys(jObj[key]);
            const L = Ks.length;
            for (let j = 0; j < L; j++) {
              attrStr += this.buildAttrPairStr(Ks[j], "" + jObj[key][Ks[j]]);
            }
          } else {
            val2 += this.processTextOrObjNode(jObj[key], key, level);
          }
        }
      }
      return { attrStr, val: val2 };
    };
    Builder.prototype.buildAttrPairStr = function(attrName, val2) {
      val2 = this.options.attributeValueProcessor(attrName, "" + val2);
      val2 = this.replaceEntitiesValue(val2);
      if (this.options.suppressBooleanAttributes && val2 === "true") {
        return " " + attrName;
      } else return " " + attrName + '="' + val2 + '"';
    };
    function processTextOrObjNode(object, key, level) {
      const result = this.j2x(object, level + 1);
      if (object[this.options.textNodeName] !== void 0 && Object.keys(object).length === 1) {
        return this.buildTextValNode(object[this.options.textNodeName], key, result.attrStr, level);
      } else {
        return this.buildObjectNode(result.val, key, result.attrStr, level);
      }
    }
    Builder.prototype.buildObjectNode = function(val2, key, attrStr, level) {
      if (val2 === "") {
        if (key[0] === "?") return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
        else {
          return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
        }
      } else {
        let tagEndExp = "</" + key + this.tagEndChar;
        let piClosingChar = "";
        if (key[0] === "?") {
          piClosingChar = "?";
          tagEndExp = "";
        }
        if ((attrStr || attrStr === "") && val2.indexOf("<") === -1) {
          return this.indentate(level) + "<" + key + attrStr + piClosingChar + ">" + val2 + tagEndExp;
        } else if (this.options.commentPropName !== false && key === this.options.commentPropName && piClosingChar.length === 0) {
          return this.indentate(level) + `<!--${val2}-->` + this.newLine;
        } else {
          return this.indentate(level) + "<" + key + attrStr + piClosingChar + this.tagEndChar + val2 + this.indentate(level) + tagEndExp;
        }
      }
    };
    Builder.prototype.closeTag = function(key) {
      let closeTag = "";
      if (this.options.unpairedTags.indexOf(key) !== -1) {
        if (!this.options.suppressUnpairedNode) closeTag = "/";
      } else if (this.options.suppressEmptyNode) {
        closeTag = "/";
      } else {
        closeTag = `></${key}`;
      }
      return closeTag;
    };
    Builder.prototype.buildTextValNode = function(val2, key, attrStr, level) {
      if (this.options.cdataPropName !== false && key === this.options.cdataPropName) {
        return this.indentate(level) + `<![CDATA[${val2}]]>` + this.newLine;
      } else if (this.options.commentPropName !== false && key === this.options.commentPropName) {
        return this.indentate(level) + `<!--${val2}-->` + this.newLine;
      } else if (key[0] === "?") {
        return this.indentate(level) + "<" + key + attrStr + "?" + this.tagEndChar;
      } else {
        let textValue = this.options.tagValueProcessor(key, val2);
        textValue = this.replaceEntitiesValue(textValue);
        if (textValue === "") {
          return this.indentate(level) + "<" + key + attrStr + this.closeTag(key) + this.tagEndChar;
        } else {
          return this.indentate(level) + "<" + key + attrStr + ">" + textValue + "</" + key + this.tagEndChar;
        }
      }
    };
    Builder.prototype.replaceEntitiesValue = function(textValue) {
      if (textValue && textValue.length > 0 && this.options.processEntities) {
        for (let i = 0; i < this.options.entities.length; i++) {
          const entity = this.options.entities[i];
          textValue = textValue.replace(entity.regex, entity.val);
        }
      }
      return textValue;
    };
    function indentate(level) {
      return this.options.indentBy.repeat(level);
    }
    function isAttribute(name) {
      if (name.startsWith(this.options.attributeNamePrefix) && name !== this.options.textNodeName) {
        return name.substr(this.attrPrefixLen);
      } else {
        return false;
      }
    }
    module.exports = Builder;
  }
});

// node_modules/fast-xml-parser/src/fxp.js
var require_fxp = __commonJS({
  "node_modules/fast-xml-parser/src/fxp.js"(exports, module) {
    "use strict";
    var validator = require_validator();
    var XMLParser2 = require_XMLParser();
    var XMLBuilder = require_json2xml();
    module.exports = {
      XMLParser: XMLParser2,
      XMLValidator: validator,
      XMLBuilder
    };
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/parseXmlBody.js
var import_fast_xml_parser, parseXmlBody, parseXmlErrorBody;
var init_parseXmlBody = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/parseXmlBody.js"() {
    init_dist_es10();
    import_fast_xml_parser = __toESM(require_fxp());
    init_common();
    parseXmlBody = (streamBody, context) => collectBodyString(streamBody, context).then((encoded) => {
      if (encoded.length) {
        const parser = new import_fast_xml_parser.XMLParser({
          attributeNamePrefix: "",
          htmlEntities: true,
          ignoreAttributes: false,
          ignoreDeclaration: true,
          parseTagValue: false,
          trimValues: false,
          tagValueProcessor: (_, val2) => val2.trim() === "" && val2.includes("\n") ? "" : void 0
        });
        parser.addEntity("#xD", "\r");
        parser.addEntity("#10", "\n");
        let parsedObj;
        try {
          parsedObj = parser.parse(encoded, true);
        } catch (e) {
          if (e && typeof e === "object") {
            Object.defineProperty(e, "$responseBodyText", {
              value: encoded
            });
          }
          throw e;
        }
        const textNodeName = "#text";
        const key = Object.keys(parsedObj)[0];
        const parsedObjToReturn = parsedObj[key];
        if (parsedObjToReturn[textNodeName]) {
          parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
          delete parsedObjToReturn[textNodeName];
        }
        return getValueFromTextNode(parsedObjToReturn);
      }
      return {};
    });
    parseXmlErrorBody = async (errorBody, context) => {
      const value = await parseXmlBody(errorBody, context);
      if (value.Error) {
        value.Error.message = value.Error.message ?? value.Error.Message;
      }
      return value;
    };
  }
});

// node_modules/@aws-sdk/core/dist-es/submodules/protocols/index.js
var init_protocols = __esm({
  "node_modules/@aws-sdk/core/dist-es/submodules/protocols/index.js"() {
    init_coercing_serializers();
    init_awsExpectUnion();
    init_parseJsonBody();
    init_parseXmlBody();
  }
});

// node_modules/@aws-sdk/core/dist-es/index.js
var init_dist_es18 = __esm({
  "node_modules/@aws-sdk/core/dist-es/index.js"() {
    init_client();
    init_httpAuthSchemes();
    init_protocols();
  }
});

// node_modules/@aws-sdk/middleware-user-agent/dist-es/check-features.js
async function checkFeatures(context, config, args) {
  var _a, _b, _c, _d, _e, _f, _g;
  const request = args.request;
  if (((_a = request == null ? void 0 : request.headers) == null ? void 0 : _a["smithy-protocol"]) === "rpc-v2-cbor") {
    setFeature2(context, "PROTOCOL_RPC_V2_CBOR", "M");
  }
  if (typeof config.retryStrategy === "function") {
    const retryStrategy = await config.retryStrategy();
    if (typeof retryStrategy.acquireInitialRetryToken === "function") {
      if ((_c = (_b = retryStrategy.constructor) == null ? void 0 : _b.name) == null ? void 0 : _c.includes("Adaptive")) {
        setFeature2(context, "RETRY_MODE_ADAPTIVE", "F");
      } else {
        setFeature2(context, "RETRY_MODE_STANDARD", "E");
      }
    } else {
      setFeature2(context, "RETRY_MODE_LEGACY", "D");
    }
  }
  if (typeof config.accountIdEndpointMode === "function") {
    const endpointV2 = context.endpointV2;
    if (String((_d = endpointV2 == null ? void 0 : endpointV2.url) == null ? void 0 : _d.hostname).match(ACCOUNT_ID_ENDPOINT_REGEX)) {
      setFeature2(context, "ACCOUNT_ID_ENDPOINT", "O");
    }
    switch (await ((_e = config.accountIdEndpointMode) == null ? void 0 : _e.call(config))) {
      case "disabled":
        setFeature2(context, "ACCOUNT_ID_MODE_DISABLED", "Q");
        break;
      case "preferred":
        setFeature2(context, "ACCOUNT_ID_MODE_PREFERRED", "P");
        break;
      case "required":
        setFeature2(context, "ACCOUNT_ID_MODE_REQUIRED", "R");
        break;
    }
  }
  const identity = (_g = (_f = context.__smithy_context) == null ? void 0 : _f.selectedHttpAuthScheme) == null ? void 0 : _g.identity;
  if (identity == null ? void 0 : identity.$source) {
    const credentials = identity;
    if (credentials.accountId) {
      setFeature2(context, "RESOLVED_ACCOUNT_ID", "T");
    }
    for (const [key, value] of Object.entries(credentials.$source ?? {})) {
      setFeature2(context, key, value);
    }
  }
}
var ACCOUNT_ID_ENDPOINT_REGEX;
var init_check_features = __esm({
  "node_modules/@aws-sdk/middleware-user-agent/dist-es/check-features.js"() {
    init_dist_es18();
    ACCOUNT_ID_ENDPOINT_REGEX = /\d{12}\.ddb/;
  }
});

// node_modules/@aws-sdk/middleware-user-agent/dist-es/constants.js
var USER_AGENT, X_AMZ_USER_AGENT, SPACE, UA_NAME_SEPARATOR, UA_NAME_ESCAPE_REGEX, UA_VALUE_ESCAPE_REGEX, UA_ESCAPE_CHAR;
var init_constants2 = __esm({
  "node_modules/@aws-sdk/middleware-user-agent/dist-es/constants.js"() {
    USER_AGENT = "user-agent";
    X_AMZ_USER_AGENT = "x-amz-user-agent";
    SPACE = " ";
    UA_NAME_SEPARATOR = "/";
    UA_NAME_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g;
    UA_VALUE_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g;
    UA_ESCAPE_CHAR = "-";
  }
});

// node_modules/@aws-sdk/middleware-user-agent/dist-es/encode-features.js
function encodeFeatures(features) {
  let buffer = "";
  for (const key in features) {
    const val2 = features[key];
    if (buffer.length + val2.length + 1 <= BYTE_LIMIT) {
      if (buffer.length) {
        buffer += "," + val2;
      } else {
        buffer += val2;
      }
      continue;
    }
    break;
  }
  return buffer;
}
var BYTE_LIMIT;
var init_encode_features = __esm({
  "node_modules/@aws-sdk/middleware-user-agent/dist-es/encode-features.js"() {
    BYTE_LIMIT = 1024;
  }
});

// node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js
var userAgentMiddleware, escapeUserAgent, getUserAgentMiddlewareOptions, getUserAgentPlugin;
var init_user_agent_middleware = __esm({
  "node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js"() {
    init_dist_es15();
    init_dist_es3();
    init_check_features();
    init_constants2();
    init_encode_features();
    userAgentMiddleware = (options) => (next, context) => async (args) => {
      var _a, _b, _c, _d;
      const { request } = args;
      if (!HttpRequest.isInstance(request)) {
        return next(args);
      }
      const { headers } = request;
      const userAgent = ((_a = context == null ? void 0 : context.userAgent) == null ? void 0 : _a.map(escapeUserAgent)) || [];
      const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
      await checkFeatures(context, options, args);
      const awsContext = context;
      defaultUserAgent.push(`m/${encodeFeatures(Object.assign({}, (_b = context.__smithy_context) == null ? void 0 : _b.features, (_c = awsContext.__aws_sdk_context) == null ? void 0 : _c.features))}`);
      const customUserAgent = ((_d = options == null ? void 0 : options.customUserAgent) == null ? void 0 : _d.map(escapeUserAgent)) || [];
      const appId = await options.userAgentAppId();
      if (appId) {
        defaultUserAgent.push(escapeUserAgent([`app/${appId}`]));
      }
      const prefix = getUserAgentPrefix();
      const sdkUserAgentValue = (prefix ? [prefix] : []).concat([...defaultUserAgent, ...userAgent, ...customUserAgent]).join(SPACE);
      const normalUAValue = [
        ...defaultUserAgent.filter((section) => section.startsWith("aws-sdk-")),
        ...customUserAgent
      ].join(SPACE);
      if (options.runtime !== "browser") {
        if (normalUAValue) {
          headers[X_AMZ_USER_AGENT] = headers[X_AMZ_USER_AGENT] ? `${headers[USER_AGENT]} ${normalUAValue}` : normalUAValue;
        }
        headers[USER_AGENT] = sdkUserAgentValue;
      } else {
        headers[X_AMZ_USER_AGENT] = sdkUserAgentValue;
      }
      return next({
        ...args,
        request
      });
    };
    escapeUserAgent = (userAgentPair) => {
      var _a;
      const name = userAgentPair[0].split(UA_NAME_SEPARATOR).map((part) => part.replace(UA_NAME_ESCAPE_REGEX, UA_ESCAPE_CHAR)).join(UA_NAME_SEPARATOR);
      const version = (_a = userAgentPair[1]) == null ? void 0 : _a.replace(UA_VALUE_ESCAPE_REGEX, UA_ESCAPE_CHAR);
      const prefixSeparatorIndex = name.indexOf(UA_NAME_SEPARATOR);
      const prefix = name.substring(0, prefixSeparatorIndex);
      let uaName = name.substring(prefixSeparatorIndex + 1);
      if (prefix === "api") {
        uaName = uaName.toLowerCase();
      }
      return [prefix, uaName, version].filter((item) => item && item.length > 0).reduce((acc, item, index) => {
        switch (index) {
          case 0:
            return item;
          case 1:
            return `${acc}/${item}`;
          default:
            return `${acc}#${item}`;
        }
      }, "");
    };
    getUserAgentMiddlewareOptions = {
      name: "getUserAgentMiddleware",
      step: "build",
      priority: "low",
      tags: ["SET_USER_AGENT", "USER_AGENT"],
      override: true
    };
    getUserAgentPlugin = (config) => ({
      applyToStack: (clientStack) => {
        clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
      }
    });
  }
});

// node_modules/@aws-sdk/middleware-user-agent/dist-es/index.js
var init_dist_es19 = __esm({
  "node_modules/@aws-sdk/middleware-user-agent/dist-es/index.js"() {
    init_configurations();
    init_user_agent_middleware();
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionConfig/isFipsRegion.js
var isFipsRegion;
var init_isFipsRegion = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionConfig/isFipsRegion.js"() {
    isFipsRegion = (region) => typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips"));
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionConfig/getRealRegion.js
var getRealRegion;
var init_getRealRegion = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionConfig/getRealRegion.js"() {
    init_isFipsRegion();
    getRealRegion = (region) => isFipsRegion(region) ? ["fips-aws-global", "aws-fips"].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region;
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionConfig/resolveRegionConfig.js
var resolveRegionConfig;
var init_resolveRegionConfig = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionConfig/resolveRegionConfig.js"() {
    init_getRealRegion();
    init_isFipsRegion();
    resolveRegionConfig = (input) => {
      const { region, useFipsEndpoint } = input;
      if (!region) {
        throw new Error("Region is missing");
      }
      return Object.assign(input, {
        region: async () => {
          if (typeof region === "string") {
            return getRealRegion(region);
          }
          const providedRegion = await region();
          return getRealRegion(providedRegion);
        },
        useFipsEndpoint: async () => {
          const providedRegion = typeof region === "string" ? region : await region();
          if (isFipsRegion(providedRegion)) {
            return true;
          }
          return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
        }
      });
    };
  }
});

// node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js
var init_booleanSelector = __esm({
  "node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js"() {
  }
});

// node_modules/@smithy/util-config-provider/dist-es/numberSelector.js
var init_numberSelector = __esm({
  "node_modules/@smithy/util-config-provider/dist-es/numberSelector.js"() {
  }
});

// node_modules/@smithy/util-config-provider/dist-es/types.js
var SelectorType;
var init_types3 = __esm({
  "node_modules/@smithy/util-config-provider/dist-es/types.js"() {
    (function(SelectorType2) {
      SelectorType2["ENV"] = "env";
      SelectorType2["CONFIG"] = "shared config entry";
    })(SelectorType || (SelectorType = {}));
  }
});

// node_modules/@smithy/util-config-provider/dist-es/index.js
var init_dist_es20 = __esm({
  "node_modules/@smithy/util-config-provider/dist-es/index.js"() {
    init_booleanSelector();
    init_numberSelector();
    init_types3();
  }
});

// node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js
var DEFAULT_USE_DUALSTACK_ENDPOINT;
var init_NodeUseDualstackEndpointConfigOptions = __esm({
  "node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js"() {
    init_dist_es20();
    DEFAULT_USE_DUALSTACK_ENDPOINT = false;
  }
});

// node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js
var DEFAULT_USE_FIPS_ENDPOINT;
var init_NodeUseFipsEndpointConfigOptions = __esm({
  "node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js"() {
    init_dist_es20();
    DEFAULT_USE_FIPS_ENDPOINT = false;
  }
});

// node_modules/@smithy/config-resolver/dist-es/endpointsConfig/resolveCustomEndpointsConfig.js
var init_resolveCustomEndpointsConfig = __esm({
  "node_modules/@smithy/config-resolver/dist-es/endpointsConfig/resolveCustomEndpointsConfig.js"() {
    init_dist_es4();
  }
});

// node_modules/@smithy/config-resolver/dist-es/endpointsConfig/utils/getEndpointFromRegion.js
var init_getEndpointFromRegion = __esm({
  "node_modules/@smithy/config-resolver/dist-es/endpointsConfig/utils/getEndpointFromRegion.js"() {
  }
});

// node_modules/@smithy/config-resolver/dist-es/endpointsConfig/resolveEndpointsConfig.js
var init_resolveEndpointsConfig = __esm({
  "node_modules/@smithy/config-resolver/dist-es/endpointsConfig/resolveEndpointsConfig.js"() {
    init_dist_es4();
    init_getEndpointFromRegion();
  }
});

// node_modules/@smithy/config-resolver/dist-es/endpointsConfig/index.js
var init_endpointsConfig = __esm({
  "node_modules/@smithy/config-resolver/dist-es/endpointsConfig/index.js"() {
    init_NodeUseDualstackEndpointConfigOptions();
    init_NodeUseFipsEndpointConfigOptions();
    init_resolveCustomEndpointsConfig();
    init_resolveEndpointsConfig();
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js
var init_config = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js"() {
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionConfig/index.js
var init_regionConfig = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionConfig/index.js"() {
    init_config();
    init_resolveRegionConfig();
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionInfo/PartitionHash.js
var init_PartitionHash = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionInfo/PartitionHash.js"() {
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionInfo/RegionHash.js
var init_RegionHash = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionInfo/RegionHash.js"() {
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionInfo/getHostnameFromVariants.js
var init_getHostnameFromVariants = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionInfo/getHostnameFromVariants.js"() {
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedHostname.js
var init_getResolvedHostname = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedHostname.js"() {
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedPartition.js
var init_getResolvedPartition = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedPartition.js"() {
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedSigningRegion.js
var init_getResolvedSigningRegion = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionInfo/getResolvedSigningRegion.js"() {
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionInfo/getRegionInfo.js
var init_getRegionInfo = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionInfo/getRegionInfo.js"() {
    init_getHostnameFromVariants();
    init_getResolvedHostname();
    init_getResolvedPartition();
    init_getResolvedSigningRegion();
  }
});

// node_modules/@smithy/config-resolver/dist-es/regionInfo/index.js
var init_regionInfo = __esm({
  "node_modules/@smithy/config-resolver/dist-es/regionInfo/index.js"() {
    init_PartitionHash();
    init_RegionHash();
    init_getRegionInfo();
  }
});

// node_modules/@smithy/config-resolver/dist-es/index.js
var init_dist_es21 = __esm({
  "node_modules/@smithy/config-resolver/dist-es/index.js"() {
    init_endpointsConfig();
    init_regionConfig();
    init_regionInfo();
  }
});

// node_modules/@smithy/middleware-content-length/dist-es/index.js
function contentLengthMiddleware(bodyLengthChecker) {
  return (next) => async (args) => {
    const request = args.request;
    if (HttpRequest.isInstance(request)) {
      const { body, headers } = request;
      if (body && Object.keys(headers).map((str) => str.toLowerCase()).indexOf(CONTENT_LENGTH_HEADER) === -1) {
        try {
          const length = bodyLengthChecker(body);
          request.headers = {
            ...request.headers,
            [CONTENT_LENGTH_HEADER]: String(length)
          };
        } catch (error) {
        }
      }
    }
    return next({
      ...args,
      request
    });
  };
}
var CONTENT_LENGTH_HEADER, contentLengthMiddlewareOptions, getContentLengthPlugin;
var init_dist_es22 = __esm({
  "node_modules/@smithy/middleware-content-length/dist-es/index.js"() {
    init_dist_es3();
    CONTENT_LENGTH_HEADER = "content-length";
    contentLengthMiddlewareOptions = {
      step: "build",
      tags: ["SET_CONTENT_LENGTH", "CONTENT_LENGTH"],
      name: "contentLengthMiddleware",
      override: true
    };
    getContentLengthPlugin = (options) => ({
      applyToStack: (clientStack) => {
        clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
      }
    });
  }
});

// node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/s3.js
var resolveParamsForS3, DOMAIN_PATTERN, IP_ADDRESS_PATTERN, DOTS_PATTERN, isDnsCompatibleBucketName, isArnBucketName;
var init_s3 = __esm({
  "node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/s3.js"() {
    resolveParamsForS3 = async (endpointParams) => {
      const bucket = (endpointParams == null ? void 0 : endpointParams.Bucket) || "";
      if (typeof endpointParams.Bucket === "string") {
        endpointParams.Bucket = bucket.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
      }
      if (isArnBucketName(bucket)) {
        if (endpointParams.ForcePathStyle === true) {
          throw new Error("Path-style addressing cannot be used with ARN buckets");
        }
      } else if (!isDnsCompatibleBucketName(bucket) || bucket.indexOf(".") !== -1 && !String(endpointParams.Endpoint).startsWith("http:") || bucket.toLowerCase() !== bucket || bucket.length < 3) {
        endpointParams.ForcePathStyle = true;
      }
      if (endpointParams.DisableMultiRegionAccessPoints) {
        endpointParams.disableMultiRegionAccessPoints = true;
        endpointParams.DisableMRAP = true;
      }
      return endpointParams;
    };
    DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
    IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
    DOTS_PATTERN = /\.\./;
    isDnsCompatibleBucketName = (bucketName) => DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);
    isArnBucketName = (bucketName) => {
      const [arn, partition2, service, , , bucket] = bucketName.split(":");
      const isArn = arn === "arn" && bucketName.split(":").length >= 6;
      const isValidArn = Boolean(isArn && partition2 && service && bucket);
      if (isArn && !isValidArn) {
        throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
      }
      return isValidArn;
    };
  }
});

// node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/index.js
var init_service_customizations = __esm({
  "node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/index.js"() {
    init_s3();
  }
});

// node_modules/@smithy/middleware-endpoint/dist-es/adaptors/createConfigValueProvider.js
var createConfigValueProvider;
var init_createConfigValueProvider = __esm({
  "node_modules/@smithy/middleware-endpoint/dist-es/adaptors/createConfigValueProvider.js"() {
    createConfigValueProvider = (configKey, canonicalEndpointParamKey, config) => {
      const configProvider = async () => {
        const configValue = config[configKey] ?? config[canonicalEndpointParamKey];
        if (typeof configValue === "function") {
          return configValue();
        }
        return configValue;
      };
      if (configKey === "credentialScope" || canonicalEndpointParamKey === "CredentialScope") {
        return async () => {
          const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
          const configValue = (credentials == null ? void 0 : credentials.credentialScope) ?? (credentials == null ? void 0 : credentials.CredentialScope);
          return configValue;
        };
      }
      if (configKey === "accountId" || canonicalEndpointParamKey === "AccountId") {
        return async () => {
          const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
          const configValue = (credentials == null ? void 0 : credentials.accountId) ?? (credentials == null ? void 0 : credentials.AccountId);
          return configValue;
        };
      }
      if (configKey === "endpoint" || canonicalEndpointParamKey === "endpoint") {
        return async () => {
          const endpoint = await configProvider();
          if (endpoint && typeof endpoint === "object") {
            if ("url" in endpoint) {
              return endpoint.url.href;
            }
            if ("hostname" in endpoint) {
              const { protocol, hostname, port, path } = endpoint;
              return `${protocol}//${hostname}${port ? ":" + port : ""}${path}`;
            }
          }
          return endpoint;
        };
      }
      return configProvider;
    };
  }
});

// node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromConfig.browser.js
var getEndpointFromConfig;
var init_getEndpointFromConfig_browser = __esm({
  "node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromConfig.browser.js"() {
    getEndpointFromConfig = async (serviceId) => void 0;
  }
});

// node_modules/@smithy/querystring-parser/dist-es/index.js
function parseQueryString(querystring) {
  const query = {};
  querystring = querystring.replace(/^\?/, "");
  if (querystring) {
    for (const pair of querystring.split("&")) {
      let [key, value = null] = pair.split("=");
      key = decodeURIComponent(key);
      if (value) {
        value = decodeURIComponent(value);
      }
      if (!(key in query)) {
        query[key] = value;
      } else if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    }
  }
  return query;
}
var init_dist_es23 = __esm({
  "node_modules/@smithy/querystring-parser/dist-es/index.js"() {
  }
});

// node_modules/@smithy/url-parser/dist-es/index.js
var parseUrl;
var init_dist_es24 = __esm({
  "node_modules/@smithy/url-parser/dist-es/index.js"() {
    init_dist_es23();
    parseUrl = (url) => {
      if (typeof url === "string") {
        return parseUrl(new URL(url));
      }
      const { hostname, pathname, port, protocol, search } = url;
      let query;
      if (search) {
        query = parseQueryString(search);
      }
      return {
        hostname,
        port: port ? parseInt(port) : void 0,
        protocol,
        path: pathname,
        query
      };
    };
  }
});

// node_modules/@smithy/middleware-endpoint/dist-es/adaptors/toEndpointV1.js
var toEndpointV1;
var init_toEndpointV1 = __esm({
  "node_modules/@smithy/middleware-endpoint/dist-es/adaptors/toEndpointV1.js"() {
    init_dist_es24();
    toEndpointV1 = (endpoint) => {
      if (typeof endpoint === "object") {
        if ("url" in endpoint) {
          return parseUrl(endpoint.url);
        }
        return endpoint;
      }
      return parseUrl(endpoint);
    };
  }
});

// node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromInstructions.js
var getEndpointFromInstructions, resolveParams;
var init_getEndpointFromInstructions = __esm({
  "node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromInstructions.js"() {
    init_service_customizations();
    init_createConfigValueProvider();
    init_getEndpointFromConfig_browser();
    init_toEndpointV1();
    getEndpointFromInstructions = async (commandInput, instructionsSupplier, clientConfig, context) => {
      if (!clientConfig.endpoint) {
        let endpointFromConfig;
        if (clientConfig.serviceConfiguredEndpoint) {
          endpointFromConfig = await clientConfig.serviceConfiguredEndpoint();
        } else {
          endpointFromConfig = await getEndpointFromConfig(clientConfig.serviceId);
        }
        if (endpointFromConfig) {
          clientConfig.endpoint = () => Promise.resolve(toEndpointV1(endpointFromConfig));
        }
      }
      const endpointParams = await resolveParams(commandInput, instructionsSupplier, clientConfig);
      if (typeof clientConfig.endpointProvider !== "function") {
        throw new Error("config.endpointProvider is not set.");
      }
      const endpoint = clientConfig.endpointProvider(endpointParams, context);
      return endpoint;
    };
    resolveParams = async (commandInput, instructionsSupplier, clientConfig) => {
      var _a;
      const endpointParams = {};
      const instructions = ((_a = instructionsSupplier == null ? void 0 : instructionsSupplier.getEndpointParameterInstructions) == null ? void 0 : _a.call(instructionsSupplier)) || {};
      for (const [name, instruction] of Object.entries(instructions)) {
        switch (instruction.type) {
          case "staticContextParams":
            endpointParams[name] = instruction.value;
            break;
          case "contextParams":
            endpointParams[name] = commandInput[instruction.name];
            break;
          case "clientContextParams":
          case "builtInParams":
            endpointParams[name] = await createConfigValueProvider(instruction.name, name, clientConfig)();
            break;
          case "operationContextParams":
            endpointParams[name] = instruction.get(commandInput);
            break;
          default:
            throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(instruction));
        }
      }
      if (Object.keys(instructions).length === 0) {
        Object.assign(endpointParams, clientConfig);
      }
      if (String(clientConfig.serviceId).toLowerCase() === "s3") {
        await resolveParamsForS3(endpointParams);
      }
      return endpointParams;
    };
  }
});

// node_modules/@smithy/middleware-endpoint/dist-es/endpointMiddleware.js
var endpointMiddleware;
var init_endpointMiddleware = __esm({
  "node_modules/@smithy/middleware-endpoint/dist-es/endpointMiddleware.js"() {
    init_dist_es9();
    init_dist_es4();
    init_getEndpointFromInstructions();
    endpointMiddleware = ({ config, instructions }) => {
      return (next, context) => async (args) => {
        var _a, _b, _c;
        if (config.endpoint) {
          setFeature(context, "ENDPOINT_OVERRIDE", "N");
        }
        const endpoint = await getEndpointFromInstructions(args.input, {
          getEndpointParameterInstructions() {
            return instructions;
          }
        }, { ...config }, context);
        context.endpointV2 = endpoint;
        context.authSchemes = (_a = endpoint.properties) == null ? void 0 : _a.authSchemes;
        const authScheme = (_b = context.authSchemes) == null ? void 0 : _b[0];
        if (authScheme) {
          context["signing_region"] = authScheme.signingRegion;
          context["signing_service"] = authScheme.signingName;
          const smithyContext = getSmithyContext(context);
          const httpAuthOption = (_c = smithyContext == null ? void 0 : smithyContext.selectedHttpAuthScheme) == null ? void 0 : _c.httpAuthOption;
          if (httpAuthOption) {
            httpAuthOption.signingProperties = Object.assign(httpAuthOption.signingProperties || {}, {
              signing_region: authScheme.signingRegion,
              signingRegion: authScheme.signingRegion,
              signing_service: authScheme.signingName,
              signingName: authScheme.signingName,
              signingRegionSet: authScheme.signingRegionSet
            }, authScheme.properties);
          }
        }
        return next({
          ...args
        });
      };
    };
  }
});

// node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js
var endpointMiddlewareOptions, getEndpointPlugin;
var init_getEndpointPlugin = __esm({
  "node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js"() {
    init_dist_es5();
    init_endpointMiddleware();
    endpointMiddlewareOptions = {
      step: "serialize",
      tags: ["ENDPOINT_PARAMETERS", "ENDPOINT_V2", "ENDPOINT"],
      name: "endpointV2Middleware",
      override: true,
      relation: "before",
      toMiddleware: serializerMiddlewareOption.name
    };
    getEndpointPlugin = (config, instructions) => ({
      applyToStack: (clientStack) => {
        clientStack.addRelativeTo(endpointMiddleware({
          config,
          instructions
        }), endpointMiddlewareOptions);
      }
    });
  }
});

// node_modules/@smithy/middleware-endpoint/dist-es/resolveEndpointConfig.js
var resolveEndpointConfig;
var init_resolveEndpointConfig = __esm({
  "node_modules/@smithy/middleware-endpoint/dist-es/resolveEndpointConfig.js"() {
    init_dist_es4();
    init_getEndpointFromConfig_browser();
    init_toEndpointV1();
    resolveEndpointConfig = (input) => {
      const tls = input.tls ?? true;
      const { endpoint, useDualstackEndpoint, useFipsEndpoint } = input;
      const customEndpointProvider = endpoint != null ? async () => toEndpointV1(await normalizeProvider(endpoint)()) : void 0;
      const isCustomEndpoint = !!endpoint;
      const resolvedConfig = Object.assign(input, {
        endpoint: customEndpointProvider,
        tls,
        isCustomEndpoint,
        useDualstackEndpoint: normalizeProvider(useDualstackEndpoint ?? false),
        useFipsEndpoint: normalizeProvider(useFipsEndpoint ?? false)
      });
      let configuredEndpointPromise = void 0;
      resolvedConfig.serviceConfiguredEndpoint = async () => {
        if (input.serviceId && !configuredEndpointPromise) {
          configuredEndpointPromise = getEndpointFromConfig(input.serviceId);
        }
        return configuredEndpointPromise;
      };
      return resolvedConfig;
    };
  }
});

// node_modules/@smithy/middleware-endpoint/dist-es/adaptors/index.js
var init_adaptors = __esm({
  "node_modules/@smithy/middleware-endpoint/dist-es/adaptors/index.js"() {
    init_getEndpointFromInstructions();
    init_toEndpointV1();
  }
});

// node_modules/@smithy/middleware-endpoint/dist-es/types.js
var init_types4 = __esm({
  "node_modules/@smithy/middleware-endpoint/dist-es/types.js"() {
  }
});

// node_modules/@smithy/middleware-endpoint/dist-es/index.js
var init_dist_es25 = __esm({
  "node_modules/@smithy/middleware-endpoint/dist-es/index.js"() {
    init_adaptors();
    init_endpointMiddleware();
    init_getEndpointPlugin();
    init_resolveEndpointConfig();
    init_types4();
  }
});

// node_modules/@smithy/util-retry/dist-es/config.js
var RETRY_MODES, DEFAULT_MAX_ATTEMPTS, DEFAULT_RETRY_MODE;
var init_config2 = __esm({
  "node_modules/@smithy/util-retry/dist-es/config.js"() {
    (function(RETRY_MODES2) {
      RETRY_MODES2["STANDARD"] = "standard";
      RETRY_MODES2["ADAPTIVE"] = "adaptive";
    })(RETRY_MODES || (RETRY_MODES = {}));
    DEFAULT_MAX_ATTEMPTS = 3;
    DEFAULT_RETRY_MODE = RETRY_MODES.STANDARD;
  }
});

// node_modules/@smithy/service-error-classification/dist-es/constants.js
var THROTTLING_ERROR_CODES, TRANSIENT_ERROR_CODES, TRANSIENT_ERROR_STATUS_CODES, NODEJS_TIMEOUT_ERROR_CODES;
var init_constants3 = __esm({
  "node_modules/@smithy/service-error-classification/dist-es/constants.js"() {
    THROTTLING_ERROR_CODES = [
      "BandwidthLimitExceeded",
      "EC2ThrottledException",
      "LimitExceededException",
      "PriorRequestNotComplete",
      "ProvisionedThroughputExceededException",
      "RequestLimitExceeded",
      "RequestThrottled",
      "RequestThrottledException",
      "SlowDown",
      "ThrottledException",
      "Throttling",
      "ThrottlingException",
      "TooManyRequestsException",
      "TransactionInProgressException"
    ];
    TRANSIENT_ERROR_CODES = ["TimeoutError", "RequestTimeout", "RequestTimeoutException"];
    TRANSIENT_ERROR_STATUS_CODES = [500, 502, 503, 504];
    NODEJS_TIMEOUT_ERROR_CODES = ["ECONNRESET", "ECONNREFUSED", "EPIPE", "ETIMEDOUT"];
  }
});

// node_modules/@smithy/service-error-classification/dist-es/index.js
var isClockSkewCorrectedError, isBrowserNetworkError, isThrottlingError, isTransientError, isServerError;
var init_dist_es26 = __esm({
  "node_modules/@smithy/service-error-classification/dist-es/index.js"() {
    init_constants3();
    isClockSkewCorrectedError = (error) => {
      var _a;
      return (_a = error.$metadata) == null ? void 0 : _a.clockSkewCorrected;
    };
    isBrowserNetworkError = (error) => {
      const errorMessages = /* @__PURE__ */ new Set([
        "Failed to fetch",
        "NetworkError when attempting to fetch resource",
        "The Internet connection appears to be offline",
        "Load failed",
        "Network request failed"
      ]);
      const isValid = error && error instanceof TypeError;
      if (!isValid) {
        return false;
      }
      return errorMessages.has(error.message);
    };
    isThrottlingError = (error) => {
      var _a, _b;
      return ((_a = error.$metadata) == null ? void 0 : _a.httpStatusCode) === 429 || THROTTLING_ERROR_CODES.includes(error.name) || ((_b = error.$retryable) == null ? void 0 : _b.throttling) == true;
    };
    isTransientError = (error, depth = 0) => {
      var _a;
      return isClockSkewCorrectedError(error) || TRANSIENT_ERROR_CODES.includes(error.name) || NODEJS_TIMEOUT_ERROR_CODES.includes((error == null ? void 0 : error.code) || "") || TRANSIENT_ERROR_STATUS_CODES.includes(((_a = error.$metadata) == null ? void 0 : _a.httpStatusCode) || 0) || isBrowserNetworkError(error) || error.cause !== void 0 && depth <= 10 && isTransientError(error.cause, depth + 1);
    };
    isServerError = (error) => {
      var _a;
      if (((_a = error.$metadata) == null ? void 0 : _a.httpStatusCode) !== void 0) {
        const statusCode = error.$metadata.httpStatusCode;
        if (500 <= statusCode && statusCode <= 599 && !isTransientError(error)) {
          return true;
        }
        return false;
      }
      return false;
    };
  }
});

// node_modules/@smithy/util-retry/dist-es/DefaultRateLimiter.js
var DefaultRateLimiter;
var init_DefaultRateLimiter = __esm({
  "node_modules/@smithy/util-retry/dist-es/DefaultRateLimiter.js"() {
    init_dist_es26();
    DefaultRateLimiter = class _DefaultRateLimiter {
      constructor(options) {
        this.currentCapacity = 0;
        this.enabled = false;
        this.lastMaxRate = 0;
        this.measuredTxRate = 0;
        this.requestCount = 0;
        this.lastTimestamp = 0;
        this.timeWindow = 0;
        this.beta = (options == null ? void 0 : options.beta) ?? 0.7;
        this.minCapacity = (options == null ? void 0 : options.minCapacity) ?? 1;
        this.minFillRate = (options == null ? void 0 : options.minFillRate) ?? 0.5;
        this.scaleConstant = (options == null ? void 0 : options.scaleConstant) ?? 0.4;
        this.smooth = (options == null ? void 0 : options.smooth) ?? 0.8;
        const currentTimeInSeconds = this.getCurrentTimeInSeconds();
        this.lastThrottleTime = currentTimeInSeconds;
        this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
        this.fillRate = this.minFillRate;
        this.maxCapacity = this.minCapacity;
      }
      getCurrentTimeInSeconds() {
        return Date.now() / 1e3;
      }
      async getSendToken() {
        return this.acquireTokenBucket(1);
      }
      async acquireTokenBucket(amount) {
        if (!this.enabled) {
          return;
        }
        this.refillTokenBucket();
        if (amount > this.currentCapacity) {
          const delay = (amount - this.currentCapacity) / this.fillRate * 1e3;
          await new Promise((resolve) => _DefaultRateLimiter.setTimeoutFn(resolve, delay));
        }
        this.currentCapacity = this.currentCapacity - amount;
      }
      refillTokenBucket() {
        const timestamp = this.getCurrentTimeInSeconds();
        if (!this.lastTimestamp) {
          this.lastTimestamp = timestamp;
          return;
        }
        const fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
        this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + fillAmount);
        this.lastTimestamp = timestamp;
      }
      updateClientSendingRate(response) {
        let calculatedRate;
        this.updateMeasuredRate();
        if (isThrottlingError(response)) {
          const rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
          this.lastMaxRate = rateToUse;
          this.calculateTimeWindow();
          this.lastThrottleTime = this.getCurrentTimeInSeconds();
          calculatedRate = this.cubicThrottle(rateToUse);
          this.enableTokenBucket();
        } else {
          this.calculateTimeWindow();
          calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
        }
        const newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
        this.updateTokenBucketRate(newRate);
      }
      calculateTimeWindow() {
        this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
      }
      cubicThrottle(rateToUse) {
        return this.getPrecise(rateToUse * this.beta);
      }
      cubicSuccess(timestamp) {
        return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
      }
      enableTokenBucket() {
        this.enabled = true;
      }
      updateTokenBucketRate(newRate) {
        this.refillTokenBucket();
        this.fillRate = Math.max(newRate, this.minFillRate);
        this.maxCapacity = Math.max(newRate, this.minCapacity);
        this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
      }
      updateMeasuredRate() {
        const t = this.getCurrentTimeInSeconds();
        const timeBucket = Math.floor(t * 2) / 2;
        this.requestCount++;
        if (timeBucket > this.lastTxRateBucket) {
          const currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
          this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
          this.requestCount = 0;
          this.lastTxRateBucket = timeBucket;
        }
      }
      getPrecise(num) {
        return parseFloat(num.toFixed(8));
      }
    };
    DefaultRateLimiter.setTimeoutFn = setTimeout;
  }
});

// node_modules/@smithy/util-retry/dist-es/constants.js
var DEFAULT_RETRY_DELAY_BASE, MAXIMUM_RETRY_DELAY, THROTTLING_RETRY_DELAY_BASE, INITIAL_RETRY_TOKENS, RETRY_COST, TIMEOUT_RETRY_COST, NO_RETRY_INCREMENT, INVOCATION_ID_HEADER, REQUEST_HEADER;
var init_constants4 = __esm({
  "node_modules/@smithy/util-retry/dist-es/constants.js"() {
    DEFAULT_RETRY_DELAY_BASE = 100;
    MAXIMUM_RETRY_DELAY = 20 * 1e3;
    THROTTLING_RETRY_DELAY_BASE = 500;
    INITIAL_RETRY_TOKENS = 500;
    RETRY_COST = 5;
    TIMEOUT_RETRY_COST = 10;
    NO_RETRY_INCREMENT = 1;
    INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
    REQUEST_HEADER = "amz-sdk-request";
  }
});

// node_modules/@smithy/util-retry/dist-es/defaultRetryBackoffStrategy.js
var getDefaultRetryBackoffStrategy;
var init_defaultRetryBackoffStrategy = __esm({
  "node_modules/@smithy/util-retry/dist-es/defaultRetryBackoffStrategy.js"() {
    init_constants4();
    getDefaultRetryBackoffStrategy = () => {
      let delayBase = DEFAULT_RETRY_DELAY_BASE;
      const computeNextBackoffDelay = (attempts) => {
        return Math.floor(Math.min(MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));
      };
      const setDelayBase = (delay) => {
        delayBase = delay;
      };
      return {
        computeNextBackoffDelay,
        setDelayBase
      };
    };
  }
});

// node_modules/@smithy/util-retry/dist-es/defaultRetryToken.js
var createDefaultRetryToken;
var init_defaultRetryToken = __esm({
  "node_modules/@smithy/util-retry/dist-es/defaultRetryToken.js"() {
    init_constants4();
    createDefaultRetryToken = ({ retryDelay, retryCount, retryCost }) => {
      const getRetryCount = () => retryCount;
      const getRetryDelay = () => Math.min(MAXIMUM_RETRY_DELAY, retryDelay);
      const getRetryCost = () => retryCost;
      return {
        getRetryCount,
        getRetryDelay,
        getRetryCost
      };
    };
  }
});

// node_modules/@smithy/util-retry/dist-es/StandardRetryStrategy.js
var StandardRetryStrategy;
var init_StandardRetryStrategy = __esm({
  "node_modules/@smithy/util-retry/dist-es/StandardRetryStrategy.js"() {
    init_config2();
    init_constants4();
    init_defaultRetryBackoffStrategy();
    init_defaultRetryToken();
    StandardRetryStrategy = class {
      constructor(maxAttempts) {
        this.maxAttempts = maxAttempts;
        this.mode = RETRY_MODES.STANDARD;
        this.capacity = INITIAL_RETRY_TOKENS;
        this.retryBackoffStrategy = getDefaultRetryBackoffStrategy();
        this.maxAttemptsProvider = typeof maxAttempts === "function" ? maxAttempts : async () => maxAttempts;
      }
      async acquireInitialRetryToken(retryTokenScope) {
        return createDefaultRetryToken({
          retryDelay: DEFAULT_RETRY_DELAY_BASE,
          retryCount: 0
        });
      }
      async refreshRetryTokenForRetry(token, errorInfo) {
        const maxAttempts = await this.getMaxAttempts();
        if (this.shouldRetry(token, errorInfo, maxAttempts)) {
          const errorType = errorInfo.errorType;
          this.retryBackoffStrategy.setDelayBase(errorType === "THROTTLING" ? THROTTLING_RETRY_DELAY_BASE : DEFAULT_RETRY_DELAY_BASE);
          const delayFromErrorType = this.retryBackoffStrategy.computeNextBackoffDelay(token.getRetryCount());
          const retryDelay = errorInfo.retryAfterHint ? Math.max(errorInfo.retryAfterHint.getTime() - Date.now() || 0, delayFromErrorType) : delayFromErrorType;
          const capacityCost = this.getCapacityCost(errorType);
          this.capacity -= capacityCost;
          return createDefaultRetryToken({
            retryDelay,
            retryCount: token.getRetryCount() + 1,
            retryCost: capacityCost
          });
        }
        throw new Error("No retry token available");
      }
      recordSuccess(token) {
        this.capacity = Math.max(INITIAL_RETRY_TOKENS, this.capacity + (token.getRetryCost() ?? NO_RETRY_INCREMENT));
      }
      getCapacity() {
        return this.capacity;
      }
      async getMaxAttempts() {
        try {
          return await this.maxAttemptsProvider();
        } catch (error) {
          console.warn(`Max attempts provider could not resolve. Using default of ${DEFAULT_MAX_ATTEMPTS}`);
          return DEFAULT_MAX_ATTEMPTS;
        }
      }
      shouldRetry(tokenToRenew, errorInfo, maxAttempts) {
        const attempts = tokenToRenew.getRetryCount() + 1;
        return attempts < maxAttempts && this.capacity >= this.getCapacityCost(errorInfo.errorType) && this.isRetryableError(errorInfo.errorType);
      }
      getCapacityCost(errorType) {
        return errorType === "TRANSIENT" ? TIMEOUT_RETRY_COST : RETRY_COST;
      }
      isRetryableError(errorType) {
        return errorType === "THROTTLING" || errorType === "TRANSIENT";
      }
    };
  }
});

// node_modules/@smithy/util-retry/dist-es/AdaptiveRetryStrategy.js
var AdaptiveRetryStrategy;
var init_AdaptiveRetryStrategy = __esm({
  "node_modules/@smithy/util-retry/dist-es/AdaptiveRetryStrategy.js"() {
    init_config2();
    init_DefaultRateLimiter();
    init_StandardRetryStrategy();
    AdaptiveRetryStrategy = class {
      constructor(maxAttemptsProvider, options) {
        this.maxAttemptsProvider = maxAttemptsProvider;
        this.mode = RETRY_MODES.ADAPTIVE;
        const { rateLimiter } = options ?? {};
        this.rateLimiter = rateLimiter ?? new DefaultRateLimiter();
        this.standardRetryStrategy = new StandardRetryStrategy(maxAttemptsProvider);
      }
      async acquireInitialRetryToken(retryTokenScope) {
        await this.rateLimiter.getSendToken();
        return this.standardRetryStrategy.acquireInitialRetryToken(retryTokenScope);
      }
      async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
        this.rateLimiter.updateClientSendingRate(errorInfo);
        return this.standardRetryStrategy.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
      }
      recordSuccess(token) {
        this.rateLimiter.updateClientSendingRate({});
        this.standardRetryStrategy.recordSuccess(token);
      }
    };
  }
});

// node_modules/@smithy/util-retry/dist-es/ConfiguredRetryStrategy.js
var init_ConfiguredRetryStrategy = __esm({
  "node_modules/@smithy/util-retry/dist-es/ConfiguredRetryStrategy.js"() {
    init_constants4();
    init_StandardRetryStrategy();
  }
});

// node_modules/@smithy/util-retry/dist-es/types.js
var init_types5 = __esm({
  "node_modules/@smithy/util-retry/dist-es/types.js"() {
  }
});

// node_modules/@smithy/util-retry/dist-es/index.js
var init_dist_es27 = __esm({
  "node_modules/@smithy/util-retry/dist-es/index.js"() {
    init_AdaptiveRetryStrategy();
    init_ConfiguredRetryStrategy();
    init_DefaultRateLimiter();
    init_StandardRetryStrategy();
    init_config2();
    init_constants4();
    init_types5();
  }
});

// node_modules/@smithy/middleware-retry/dist-es/configurations.js
var resolveRetryConfig;
var init_configurations2 = __esm({
  "node_modules/@smithy/middleware-retry/dist-es/configurations.js"() {
    init_dist_es4();
    init_dist_es27();
    resolveRetryConfig = (input) => {
      const { retryStrategy, retryMode: _retryMode, maxAttempts: _maxAttempts } = input;
      const maxAttempts = normalizeProvider(_maxAttempts ?? DEFAULT_MAX_ATTEMPTS);
      return Object.assign(input, {
        maxAttempts,
        retryStrategy: async () => {
          if (retryStrategy) {
            return retryStrategy;
          }
          const retryMode = await normalizeProvider(_retryMode)();
          if (retryMode === RETRY_MODES.ADAPTIVE) {
            return new AdaptiveRetryStrategy(maxAttempts);
          }
          return new StandardRetryStrategy(maxAttempts);
        }
      });
    };
  }
});

// node_modules/uuid/dist/esm-browser/rng.js
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var getRandomValues, rnds8;
var init_rng = __esm({
  "node_modules/uuid/dist/esm-browser/rng.js"() {
    rnds8 = new Uint8Array(16);
  }
});

// node_modules/uuid/dist/esm-browser/regex.js
var regex_default;
var init_regex = __esm({
  "node_modules/uuid/dist/esm-browser/regex.js"() {
    regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
  }
});

// node_modules/uuid/dist/esm-browser/validate.js
function validate(uuid) {
  return typeof uuid === "string" && regex_default.test(uuid);
}
var validate_default;
var init_validate = __esm({
  "node_modules/uuid/dist/esm-browser/validate.js"() {
    init_regex();
    validate_default = validate;
  }
});

// node_modules/uuid/dist/esm-browser/stringify.js
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
var byteToHex;
var init_stringify = __esm({
  "node_modules/uuid/dist/esm-browser/stringify.js"() {
    init_validate();
    byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).slice(1));
    }
  }
});

// node_modules/uuid/dist/esm-browser/v1.js
var init_v1 = __esm({
  "node_modules/uuid/dist/esm-browser/v1.js"() {
    init_rng();
    init_stringify();
  }
});

// node_modules/uuid/dist/esm-browser/parse.js
function parse(uuid) {
  if (!validate_default(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  const arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var parse_default;
var init_parse = __esm({
  "node_modules/uuid/dist/esm-browser/parse.js"() {
    init_validate();
    parse_default = parse;
  }
});

// node_modules/uuid/dist/esm-browser/v35.js
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = parse_default(namespace);
    }
    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return unsafeStringify(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL2;
  return generateUUID;
}
var DNS, URL2;
var init_v35 = __esm({
  "node_modules/uuid/dist/esm-browser/v35.js"() {
    init_stringify();
    init_parse();
    DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    URL2 = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
  }
});

// node_modules/uuid/dist/esm-browser/md5.js
function md5(bytes) {
  if (typeof bytes === "string") {
    const msg = unescape(encodeURIComponent(bytes));
    bytes = new Uint8Array(msg.length);
    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = "0123456789abcdef";
  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 255;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
    output.push(hex);
  }
  return output;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  x[len >> 5] |= 128 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;
  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));
  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 255) << i % 32;
  }
  return output;
}
function safeAdd(x, y) {
  const lsw = (x & 65535) + (y & 65535);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var md5_default;
var init_md5 = __esm({
  "node_modules/uuid/dist/esm-browser/md5.js"() {
    md5_default = md5;
  }
});

// node_modules/uuid/dist/esm-browser/v3.js
var v3;
var init_v3 = __esm({
  "node_modules/uuid/dist/esm-browser/v3.js"() {
    init_v35();
    init_md5();
    v3 = v35("v3", 48, md5_default);
  }
});

// node_modules/uuid/dist/esm-browser/native.js
var randomUUID, native_default;
var init_native = __esm({
  "node_modules/uuid/dist/esm-browser/native.js"() {
    randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
    native_default = {
      randomUUID
    };
  }
});

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default;
var init_v4 = __esm({
  "node_modules/uuid/dist/esm-browser/v4.js"() {
    init_native();
    init_rng();
    init_stringify();
    v4_default = v4;
  }
});

// node_modules/uuid/dist/esm-browser/sha1.js
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  const K = [1518500249, 1859775393, 2400959708, 3395469782];
  const H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes === "string") {
    const msg = unescape(encodeURIComponent(bytes));
    bytes = [];
    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(128);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);
  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);
    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }
    M[i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);
    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }
    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }
    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];
    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
}
var sha1_default;
var init_sha1 = __esm({
  "node_modules/uuid/dist/esm-browser/sha1.js"() {
    sha1_default = sha1;
  }
});

// node_modules/uuid/dist/esm-browser/v5.js
var v5;
var init_v5 = __esm({
  "node_modules/uuid/dist/esm-browser/v5.js"() {
    init_v35();
    init_sha1();
    v5 = v35("v5", 80, sha1_default);
  }
});

// node_modules/uuid/dist/esm-browser/nil.js
var init_nil = __esm({
  "node_modules/uuid/dist/esm-browser/nil.js"() {
  }
});

// node_modules/uuid/dist/esm-browser/version.js
var init_version = __esm({
  "node_modules/uuid/dist/esm-browser/version.js"() {
    init_validate();
  }
});

// node_modules/uuid/dist/esm-browser/index.js
var init_esm_browser = __esm({
  "node_modules/uuid/dist/esm-browser/index.js"() {
    init_v1();
    init_v3();
    init_v4();
    init_v5();
    init_nil();
    init_version();
    init_validate();
    init_stringify();
    init_parse();
  }
});

// node_modules/@smithy/middleware-retry/dist-es/isStreamingPayload/isStreamingPayload.browser.js
var isStreamingPayload;
var init_isStreamingPayload_browser = __esm({
  "node_modules/@smithy/middleware-retry/dist-es/isStreamingPayload/isStreamingPayload.browser.js"() {
    isStreamingPayload = (request) => (request == null ? void 0 : request.body) instanceof ReadableStream;
  }
});

// node_modules/@smithy/middleware-retry/dist-es/util.js
var asSdkError;
var init_util = __esm({
  "node_modules/@smithy/middleware-retry/dist-es/util.js"() {
    asSdkError = (error) => {
      if (error instanceof Error)
        return error;
      if (error instanceof Object)
        return Object.assign(new Error(), error);
      if (typeof error === "string")
        return new Error(error);
      return new Error(`AWS SDK error wrapper for ${error}`);
    };
  }
});

// node_modules/@smithy/middleware-retry/dist-es/retryMiddleware.js
var retryMiddleware, isRetryStrategyV2, getRetryErrorInfo, getRetryErrorType, retryMiddlewareOptions, getRetryPlugin, getRetryAfterHint;
var init_retryMiddleware = __esm({
  "node_modules/@smithy/middleware-retry/dist-es/retryMiddleware.js"() {
    init_dist_es3();
    init_dist_es26();
    init_dist_es10();
    init_dist_es27();
    init_esm_browser();
    init_isStreamingPayload_browser();
    init_util();
    retryMiddleware = (options) => (next, context) => async (args) => {
      var _a;
      let retryStrategy = await options.retryStrategy();
      const maxAttempts = await options.maxAttempts();
      if (isRetryStrategyV2(retryStrategy)) {
        retryStrategy = retryStrategy;
        let retryToken = await retryStrategy.acquireInitialRetryToken(context["partition_id"]);
        let lastError = new Error();
        let attempts = 0;
        let totalRetryDelay = 0;
        const { request } = args;
        const isRequest = HttpRequest.isInstance(request);
        if (isRequest) {
          request.headers[INVOCATION_ID_HEADER] = v4_default();
        }
        while (true) {
          try {
            if (isRequest) {
              request.headers[REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
            }
            const { response, output } = await next(args);
            retryStrategy.recordSuccess(retryToken);
            output.$metadata.attempts = attempts + 1;
            output.$metadata.totalRetryDelay = totalRetryDelay;
            return { response, output };
          } catch (e) {
            const retryErrorInfo = getRetryErrorInfo(e);
            lastError = asSdkError(e);
            if (isRequest && isStreamingPayload(request)) {
              (_a = context.logger instanceof NoOpLogger ? console : context.logger) == null ? void 0 : _a.warn("An error was encountered in a non-retryable streaming request.");
              throw lastError;
            }
            try {
              retryToken = await retryStrategy.refreshRetryTokenForRetry(retryToken, retryErrorInfo);
            } catch (refreshError) {
              if (!lastError.$metadata) {
                lastError.$metadata = {};
              }
              lastError.$metadata.attempts = attempts + 1;
              lastError.$metadata.totalRetryDelay = totalRetryDelay;
              throw lastError;
            }
            attempts = retryToken.getRetryCount();
            const delay = retryToken.getRetryDelay();
            totalRetryDelay += delay;
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      } else {
        retryStrategy = retryStrategy;
        if (retryStrategy == null ? void 0 : retryStrategy.mode)
          context.userAgent = [...context.userAgent || [], ["cfg/retry-mode", retryStrategy.mode]];
        return retryStrategy.retry(next, args);
      }
    };
    isRetryStrategyV2 = (retryStrategy) => typeof retryStrategy.acquireInitialRetryToken !== "undefined" && typeof retryStrategy.refreshRetryTokenForRetry !== "undefined" && typeof retryStrategy.recordSuccess !== "undefined";
    getRetryErrorInfo = (error) => {
      const errorInfo = {
        error,
        errorType: getRetryErrorType(error)
      };
      const retryAfterHint = getRetryAfterHint(error.$response);
      if (retryAfterHint) {
        errorInfo.retryAfterHint = retryAfterHint;
      }
      return errorInfo;
    };
    getRetryErrorType = (error) => {
      if (isThrottlingError(error))
        return "THROTTLING";
      if (isTransientError(error))
        return "TRANSIENT";
      if (isServerError(error))
        return "SERVER_ERROR";
      return "CLIENT_ERROR";
    };
    retryMiddlewareOptions = {
      name: "retryMiddleware",
      tags: ["RETRY"],
      step: "finalizeRequest",
      priority: "high",
      override: true
    };
    getRetryPlugin = (options) => ({
      applyToStack: (clientStack) => {
        clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
      }
    });
    getRetryAfterHint = (response) => {
      if (!HttpResponse.isInstance(response))
        return;
      const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
      if (!retryAfterHeaderName)
        return;
      const retryAfter = response.headers[retryAfterHeaderName];
      const retryAfterSeconds = Number(retryAfter);
      if (!Number.isNaN(retryAfterSeconds))
        return new Date(retryAfterSeconds * 1e3);
      const retryAfterDate = new Date(retryAfter);
      return retryAfterDate;
    };
  }
});

// node_modules/@smithy/middleware-retry/dist-es/defaultRetryQuota.js
var init_defaultRetryQuota = __esm({
  "node_modules/@smithy/middleware-retry/dist-es/defaultRetryQuota.js"() {
    init_dist_es27();
  }
});

// node_modules/@smithy/middleware-retry/dist-es/delayDecider.js
var init_delayDecider = __esm({
  "node_modules/@smithy/middleware-retry/dist-es/delayDecider.js"() {
    init_dist_es27();
  }
});

// node_modules/@smithy/middleware-retry/dist-es/retryDecider.js
var init_retryDecider = __esm({
  "node_modules/@smithy/middleware-retry/dist-es/retryDecider.js"() {
    init_dist_es26();
  }
});

// node_modules/@smithy/middleware-retry/dist-es/StandardRetryStrategy.js
var init_StandardRetryStrategy2 = __esm({
  "node_modules/@smithy/middleware-retry/dist-es/StandardRetryStrategy.js"() {
    init_dist_es3();
    init_dist_es26();
    init_dist_es27();
    init_esm_browser();
    init_defaultRetryQuota();
    init_delayDecider();
    init_retryDecider();
    init_util();
  }
});

// node_modules/@smithy/middleware-retry/dist-es/AdaptiveRetryStrategy.js
var init_AdaptiveRetryStrategy2 = __esm({
  "node_modules/@smithy/middleware-retry/dist-es/AdaptiveRetryStrategy.js"() {
    init_dist_es27();
    init_StandardRetryStrategy2();
  }
});

// node_modules/@smithy/middleware-retry/dist-es/omitRetryHeadersMiddleware.js
var init_omitRetryHeadersMiddleware = __esm({
  "node_modules/@smithy/middleware-retry/dist-es/omitRetryHeadersMiddleware.js"() {
    init_dist_es3();
    init_dist_es27();
  }
});

// node_modules/@smithy/middleware-retry/dist-es/index.js
var init_dist_es28 = __esm({
  "node_modules/@smithy/middleware-retry/dist-es/index.js"() {
    init_AdaptiveRetryStrategy2();
    init_StandardRetryStrategy2();
    init_configurations2();
    init_delayDecider();
    init_omitRetryHeadersMiddleware();
    init_retryDecider();
    init_retryMiddleware();
  }
});

// node_modules/@aws-crypto/sha256-browser/build/module/constants.js
var SHA_256_HASH, SHA_256_HMAC_ALGO, EMPTY_DATA_SHA_256;
var init_constants5 = __esm({
  "node_modules/@aws-crypto/sha256-browser/build/module/constants.js"() {
    SHA_256_HASH = { name: "SHA-256" };
    SHA_256_HMAC_ALGO = {
      name: "HMAC",
      hash: SHA_256_HASH
    };
    EMPTY_DATA_SHA_256 = new Uint8Array([
      227,
      176,
      196,
      66,
      152,
      252,
      28,
      20,
      154,
      251,
      244,
      200,
      153,
      111,
      185,
      36,
      39,
      174,
      65,
      228,
      100,
      155,
      147,
      76,
      164,
      149,
      153,
      27,
      120,
      82,
      184,
      85
    ]);
  }
});

// node_modules/@aws-sdk/util-locate-window/dist-es/index.js
function locateWindow() {
  if (typeof window !== "undefined") {
    return window;
  } else if (typeof self !== "undefined") {
    return self;
  }
  return fallbackWindow;
}
var fallbackWindow;
var init_dist_es29 = __esm({
  "node_modules/@aws-sdk/util-locate-window/dist-es/index.js"() {
    fallbackWindow = {};
  }
});

// node_modules/@aws-crypto/sha256-browser/build/module/webCryptoSha256.js
var Sha2562;
var init_webCryptoSha256 = __esm({
  "node_modules/@aws-crypto/sha256-browser/build/module/webCryptoSha256.js"() {
    init_module();
    init_constants5();
    init_dist_es29();
    Sha2562 = /** @class */
    function() {
      function Sha2564(secret) {
        this.toHash = new Uint8Array(0);
        this.secret = secret;
        this.reset();
      }
      Sha2564.prototype.update = function(data) {
        if (isEmptyData(data)) {
          return;
        }
        var update = convertToBuffer(data);
        var typedArray = new Uint8Array(this.toHash.byteLength + update.byteLength);
        typedArray.set(this.toHash, 0);
        typedArray.set(update, this.toHash.byteLength);
        this.toHash = typedArray;
      };
      Sha2564.prototype.digest = function() {
        var _this = this;
        if (this.key) {
          return this.key.then(function(key) {
            return locateWindow().crypto.subtle.sign(SHA_256_HMAC_ALGO, key, _this.toHash).then(function(data) {
              return new Uint8Array(data);
            });
          });
        }
        if (isEmptyData(this.toHash)) {
          return Promise.resolve(EMPTY_DATA_SHA_256);
        }
        return Promise.resolve().then(function() {
          return locateWindow().crypto.subtle.digest(SHA_256_HASH, _this.toHash);
        }).then(function(data) {
          return Promise.resolve(new Uint8Array(data));
        });
      };
      Sha2564.prototype.reset = function() {
        var _this = this;
        this.toHash = new Uint8Array(0);
        if (this.secret && this.secret !== void 0) {
          this.key = new Promise(function(resolve, reject) {
            locateWindow().crypto.subtle.importKey("raw", convertToBuffer(_this.secret), SHA_256_HMAC_ALGO, false, ["sign"]).then(resolve, reject);
          });
          this.key.catch(function() {
          });
        }
      };
      return Sha2564;
    }();
  }
});

// node_modules/@aws-crypto/supports-web-crypto/build/module/supportsWebCrypto.js
function supportsWebCrypto(window2) {
  if (supportsSecureRandom(window2) && typeof window2.crypto.subtle === "object") {
    var subtle = window2.crypto.subtle;
    return supportsSubtleCrypto(subtle);
  }
  return false;
}
function supportsSecureRandom(window2) {
  if (typeof window2 === "object" && typeof window2.crypto === "object") {
    var getRandomValues2 = window2.crypto.getRandomValues;
    return typeof getRandomValues2 === "function";
  }
  return false;
}
function supportsSubtleCrypto(subtle) {
  return subtle && subtleCryptoMethods.every(function(methodName) {
    return typeof subtle[methodName] === "function";
  });
}
var subtleCryptoMethods;
var init_supportsWebCrypto = __esm({
  "node_modules/@aws-crypto/supports-web-crypto/build/module/supportsWebCrypto.js"() {
    init_tslib_es6();
    subtleCryptoMethods = [
      "decrypt",
      "digest",
      "encrypt",
      "exportKey",
      "generateKey",
      "importKey",
      "sign",
      "verify"
    ];
  }
});

// node_modules/@aws-crypto/supports-web-crypto/build/module/index.js
var init_module3 = __esm({
  "node_modules/@aws-crypto/supports-web-crypto/build/module/index.js"() {
    init_supportsWebCrypto();
  }
});

// node_modules/@aws-crypto/sha256-browser/build/module/crossPlatformSha256.js
var Sha2563;
var init_crossPlatformSha256 = __esm({
  "node_modules/@aws-crypto/sha256-browser/build/module/crossPlatformSha256.js"() {
    init_webCryptoSha256();
    init_module2();
    init_module3();
    init_dist_es29();
    init_module();
    Sha2563 = /** @class */
    function() {
      function Sha2564(secret) {
        if (supportsWebCrypto(locateWindow())) {
          this.hash = new Sha2562(secret);
        } else {
          this.hash = new Sha256(secret);
        }
      }
      Sha2564.prototype.update = function(data, encoding) {
        this.hash.update(convertToBuffer(data));
      };
      Sha2564.prototype.digest = function() {
        return this.hash.digest();
      };
      Sha2564.prototype.reset = function() {
        this.hash.reset();
      };
      return Sha2564;
    }();
  }
});

// node_modules/@aws-crypto/sha256-browser/build/module/index.js
var init_module4 = __esm({
  "node_modules/@aws-crypto/sha256-browser/build/module/index.js"() {
    init_crossPlatformSha256();
    init_webCryptoSha256();
  }
});

// node_modules/bowser/src/constants.js
var BROWSER_ALIASES_MAP, BROWSER_MAP, PLATFORMS_MAP, OS_MAP, ENGINE_MAP;
var init_constants6 = __esm({
  "node_modules/bowser/src/constants.js"() {
    BROWSER_ALIASES_MAP = {
      "Amazon Silk": "amazon_silk",
      "Android Browser": "android",
      Bada: "bada",
      BlackBerry: "blackberry",
      Chrome: "chrome",
      Chromium: "chromium",
      Electron: "electron",
      Epiphany: "epiphany",
      Firefox: "firefox",
      Focus: "focus",
      Generic: "generic",
      "Google Search": "google_search",
      Googlebot: "googlebot",
      "Internet Explorer": "ie",
      "K-Meleon": "k_meleon",
      Maxthon: "maxthon",
      "Microsoft Edge": "edge",
      "MZ Browser": "mz",
      "NAVER Whale Browser": "naver",
      Opera: "opera",
      "Opera Coast": "opera_coast",
      PhantomJS: "phantomjs",
      Puffin: "puffin",
      QupZilla: "qupzilla",
      QQ: "qq",
      QQLite: "qqlite",
      Safari: "safari",
      Sailfish: "sailfish",
      "Samsung Internet for Android": "samsung_internet",
      SeaMonkey: "seamonkey",
      Sleipnir: "sleipnir",
      Swing: "swing",
      Tizen: "tizen",
      "UC Browser": "uc",
      Vivaldi: "vivaldi",
      "WebOS Browser": "webos",
      WeChat: "wechat",
      "Yandex Browser": "yandex",
      Roku: "roku"
    };
    BROWSER_MAP = {
      amazon_silk: "Amazon Silk",
      android: "Android Browser",
      bada: "Bada",
      blackberry: "BlackBerry",
      chrome: "Chrome",
      chromium: "Chromium",
      electron: "Electron",
      epiphany: "Epiphany",
      firefox: "Firefox",
      focus: "Focus",
      generic: "Generic",
      googlebot: "Googlebot",
      google_search: "Google Search",
      ie: "Internet Explorer",
      k_meleon: "K-Meleon",
      maxthon: "Maxthon",
      edge: "Microsoft Edge",
      mz: "MZ Browser",
      naver: "NAVER Whale Browser",
      opera: "Opera",
      opera_coast: "Opera Coast",
      phantomjs: "PhantomJS",
      puffin: "Puffin",
      qupzilla: "QupZilla",
      qq: "QQ Browser",
      qqlite: "QQ Browser Lite",
      safari: "Safari",
      sailfish: "Sailfish",
      samsung_internet: "Samsung Internet for Android",
      seamonkey: "SeaMonkey",
      sleipnir: "Sleipnir",
      swing: "Swing",
      tizen: "Tizen",
      uc: "UC Browser",
      vivaldi: "Vivaldi",
      webos: "WebOS Browser",
      wechat: "WeChat",
      yandex: "Yandex Browser"
    };
    PLATFORMS_MAP = {
      tablet: "tablet",
      mobile: "mobile",
      desktop: "desktop",
      tv: "tv"
    };
    OS_MAP = {
      WindowsPhone: "Windows Phone",
      Windows: "Windows",
      MacOS: "macOS",
      iOS: "iOS",
      Android: "Android",
      WebOS: "WebOS",
      BlackBerry: "BlackBerry",
      Bada: "Bada",
      Tizen: "Tizen",
      Linux: "Linux",
      ChromeOS: "Chrome OS",
      PlayStation4: "PlayStation 4",
      Roku: "Roku"
    };
    ENGINE_MAP = {
      EdgeHTML: "EdgeHTML",
      Blink: "Blink",
      Trident: "Trident",
      Presto: "Presto",
      Gecko: "Gecko",
      WebKit: "WebKit"
    };
  }
});

// node_modules/bowser/src/utils.js
var Utils;
var init_utils3 = __esm({
  "node_modules/bowser/src/utils.js"() {
    init_constants6();
    Utils = class _Utils {
      /**
       * Get first matched item for a string
       * @param {RegExp} regexp
       * @param {String} ua
       * @return {Array|{index: number, input: string}|*|boolean|string}
       */
      static getFirstMatch(regexp, ua) {
        const match = ua.match(regexp);
        return match && match.length > 0 && match[1] || "";
      }
      /**
       * Get second matched item for a string
       * @param regexp
       * @param {String} ua
       * @return {Array|{index: number, input: string}|*|boolean|string}
       */
      static getSecondMatch(regexp, ua) {
        const match = ua.match(regexp);
        return match && match.length > 1 && match[2] || "";
      }
      /**
       * Match a regexp and return a constant or undefined
       * @param {RegExp} regexp
       * @param {String} ua
       * @param {*} _const Any const that will be returned if regexp matches the string
       * @return {*}
       */
      static matchAndReturnConst(regexp, ua, _const) {
        if (regexp.test(ua)) {
          return _const;
        }
        return void 0;
      }
      static getWindowsVersionName(version) {
        switch (version) {
          case "NT":
            return "NT";
          case "XP":
            return "XP";
          case "NT 5.0":
            return "2000";
          case "NT 5.1":
            return "XP";
          case "NT 5.2":
            return "2003";
          case "NT 6.0":
            return "Vista";
          case "NT 6.1":
            return "7";
          case "NT 6.2":
            return "8";
          case "NT 6.3":
            return "8.1";
          case "NT 10.0":
            return "10";
          default:
            return void 0;
        }
      }
      /**
       * Get macOS version name
       *    10.5 - Leopard
       *    10.6 - Snow Leopard
       *    10.7 - Lion
       *    10.8 - Mountain Lion
       *    10.9 - Mavericks
       *    10.10 - Yosemite
       *    10.11 - El Capitan
       *    10.12 - Sierra
       *    10.13 - High Sierra
       *    10.14 - Mojave
       *    10.15 - Catalina
       *
       * @example
       *   getMacOSVersionName("10.14") // 'Mojave'
       *
       * @param  {string} version
       * @return {string} versionName
       */
      static getMacOSVersionName(version) {
        const v = version.split(".").splice(0, 2).map((s) => parseInt(s, 10) || 0);
        v.push(0);
        if (v[0] !== 10) return void 0;
        switch (v[1]) {
          case 5:
            return "Leopard";
          case 6:
            return "Snow Leopard";
          case 7:
            return "Lion";
          case 8:
            return "Mountain Lion";
          case 9:
            return "Mavericks";
          case 10:
            return "Yosemite";
          case 11:
            return "El Capitan";
          case 12:
            return "Sierra";
          case 13:
            return "High Sierra";
          case 14:
            return "Mojave";
          case 15:
            return "Catalina";
          default:
            return void 0;
        }
      }
      /**
       * Get Android version name
       *    1.5 - Cupcake
       *    1.6 - Donut
       *    2.0 - Eclair
       *    2.1 - Eclair
       *    2.2 - Froyo
       *    2.x - Gingerbread
       *    3.x - Honeycomb
       *    4.0 - Ice Cream Sandwich
       *    4.1 - Jelly Bean
       *    4.4 - KitKat
       *    5.x - Lollipop
       *    6.x - Marshmallow
       *    7.x - Nougat
       *    8.x - Oreo
       *    9.x - Pie
       *
       * @example
       *   getAndroidVersionName("7.0") // 'Nougat'
       *
       * @param  {string} version
       * @return {string} versionName
       */
      static getAndroidVersionName(version) {
        const v = version.split(".").splice(0, 2).map((s) => parseInt(s, 10) || 0);
        v.push(0);
        if (v[0] === 1 && v[1] < 5) return void 0;
        if (v[0] === 1 && v[1] < 6) return "Cupcake";
        if (v[0] === 1 && v[1] >= 6) return "Donut";
        if (v[0] === 2 && v[1] < 2) return "Eclair";
        if (v[0] === 2 && v[1] === 2) return "Froyo";
        if (v[0] === 2 && v[1] > 2) return "Gingerbread";
        if (v[0] === 3) return "Honeycomb";
        if (v[0] === 4 && v[1] < 1) return "Ice Cream Sandwich";
        if (v[0] === 4 && v[1] < 4) return "Jelly Bean";
        if (v[0] === 4 && v[1] >= 4) return "KitKat";
        if (v[0] === 5) return "Lollipop";
        if (v[0] === 6) return "Marshmallow";
        if (v[0] === 7) return "Nougat";
        if (v[0] === 8) return "Oreo";
        if (v[0] === 9) return "Pie";
        return void 0;
      }
      /**
       * Get version precisions count
       *
       * @example
       *   getVersionPrecision("1.10.3") // 3
       *
       * @param  {string} version
       * @return {number}
       */
      static getVersionPrecision(version) {
        return version.split(".").length;
      }
      /**
       * Calculate browser version weight
       *
       * @example
       *   compareVersions('1.10.2.1',  '1.8.2.1.90')    // 1
       *   compareVersions('1.010.2.1', '1.09.2.1.90');  // 1
       *   compareVersions('1.10.2.1',  '1.10.2.1');     // 0
       *   compareVersions('1.10.2.1',  '1.0800.2');     // -1
       *   compareVersions('1.10.2.1',  '1.10',  true);  // 0
       *
       * @param {String} versionA versions versions to compare
       * @param {String} versionB versions versions to compare
       * @param {boolean} [isLoose] enable loose comparison
       * @return {Number} comparison result: -1 when versionA is lower,
       * 1 when versionA is bigger, 0 when both equal
       */
      /* eslint consistent-return: 1 */
      static compareVersions(versionA, versionB, isLoose = false) {
        const versionAPrecision = _Utils.getVersionPrecision(versionA);
        const versionBPrecision = _Utils.getVersionPrecision(versionB);
        let precision = Math.max(versionAPrecision, versionBPrecision);
        let lastPrecision = 0;
        const chunks = _Utils.map([versionA, versionB], (version) => {
          const delta = precision - _Utils.getVersionPrecision(version);
          const _version = version + new Array(delta + 1).join(".0");
          return _Utils.map(_version.split("."), (chunk) => new Array(20 - chunk.length).join("0") + chunk).reverse();
        });
        if (isLoose) {
          lastPrecision = precision - Math.min(versionAPrecision, versionBPrecision);
        }
        precision -= 1;
        while (precision >= lastPrecision) {
          if (chunks[0][precision] > chunks[1][precision]) {
            return 1;
          }
          if (chunks[0][precision] === chunks[1][precision]) {
            if (precision === lastPrecision) {
              return 0;
            }
            precision -= 1;
          } else if (chunks[0][precision] < chunks[1][precision]) {
            return -1;
          }
        }
        return void 0;
      }
      /**
       * Array::map polyfill
       *
       * @param  {Array} arr
       * @param  {Function} iterator
       * @return {Array}
       */
      static map(arr, iterator) {
        const result = [];
        let i;
        if (Array.prototype.map) {
          return Array.prototype.map.call(arr, iterator);
        }
        for (i = 0; i < arr.length; i += 1) {
          result.push(iterator(arr[i]));
        }
        return result;
      }
      /**
       * Array::find polyfill
       *
       * @param  {Array} arr
       * @param  {Function} predicate
       * @return {Array}
       */
      static find(arr, predicate) {
        let i;
        let l;
        if (Array.prototype.find) {
          return Array.prototype.find.call(arr, predicate);
        }
        for (i = 0, l = arr.length; i < l; i += 1) {
          const value = arr[i];
          if (predicate(value, i)) {
            return value;
          }
        }
        return void 0;
      }
      /**
       * Object::assign polyfill
       *
       * @param  {Object} obj
       * @param  {Object} ...objs
       * @return {Object}
       */
      static assign(obj, ...assigners) {
        const result = obj;
        let i;
        let l;
        if (Object.assign) {
          return Object.assign(obj, ...assigners);
        }
        for (i = 0, l = assigners.length; i < l; i += 1) {
          const assigner = assigners[i];
          if (typeof assigner === "object" && assigner !== null) {
            const keys = Object.keys(assigner);
            keys.forEach((key) => {
              result[key] = assigner[key];
            });
          }
        }
        return obj;
      }
      /**
       * Get short version/alias for a browser name
       *
       * @example
       *   getBrowserAlias('Microsoft Edge') // edge
       *
       * @param  {string} browserName
       * @return {string}
       */
      static getBrowserAlias(browserName) {
        return BROWSER_ALIASES_MAP[browserName];
      }
      /**
       * Get short version/alias for a browser name
       *
       * @example
       *   getBrowserAlias('edge') // Microsoft Edge
       *
       * @param  {string} browserAlias
       * @return {string}
       */
      static getBrowserTypeByAlias(browserAlias) {
        return BROWSER_MAP[browserAlias] || "";
      }
    };
  }
});

// node_modules/bowser/src/parser-browsers.js
var commonVersionIdentifier, browsersList, parser_browsers_default;
var init_parser_browsers = __esm({
  "node_modules/bowser/src/parser-browsers.js"() {
    init_utils3();
    commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;
    browsersList = [
      /* Googlebot */
      {
        test: [/googlebot/i],
        describe(ua) {
          const browser = {
            name: "Googlebot"
          };
          const version = Utils.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      /* Opera < 13.0 */
      {
        test: [/opera/i],
        describe(ua) {
          const browser = {
            name: "Opera"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      /* Opera > 13.0 */
      {
        test: [/opr\/|opios/i],
        describe(ua) {
          const browser = {
            name: "Opera"
          };
          const version = Utils.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/SamsungBrowser/i],
        describe(ua) {
          const browser = {
            name: "Samsung Internet for Android"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/Whale/i],
        describe(ua) {
          const browser = {
            name: "NAVER Whale Browser"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/MZBrowser/i],
        describe(ua) {
          const browser = {
            name: "MZ Browser"
          };
          const version = Utils.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/focus/i],
        describe(ua) {
          const browser = {
            name: "Focus"
          };
          const version = Utils.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/swing/i],
        describe(ua) {
          const browser = {
            name: "Swing"
          };
          const version = Utils.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/coast/i],
        describe(ua) {
          const browser = {
            name: "Opera Coast"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/opt\/\d+(?:.?_?\d+)+/i],
        describe(ua) {
          const browser = {
            name: "Opera Touch"
          };
          const version = Utils.getFirstMatch(/(?:opt)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/yabrowser/i],
        describe(ua) {
          const browser = {
            name: "Yandex Browser"
          };
          const version = Utils.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/ucbrowser/i],
        describe(ua) {
          const browser = {
            name: "UC Browser"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/Maxthon|mxios/i],
        describe(ua) {
          const browser = {
            name: "Maxthon"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/epiphany/i],
        describe(ua) {
          const browser = {
            name: "Epiphany"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/puffin/i],
        describe(ua) {
          const browser = {
            name: "Puffin"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/sleipnir/i],
        describe(ua) {
          const browser = {
            name: "Sleipnir"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/k-meleon/i],
        describe(ua) {
          const browser = {
            name: "K-Meleon"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/micromessenger/i],
        describe(ua) {
          const browser = {
            name: "WeChat"
          };
          const version = Utils.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/qqbrowser/i],
        describe(ua) {
          const browser = {
            name: /qqbrowserlite/i.test(ua) ? "QQ Browser Lite" : "QQ Browser"
          };
          const version = Utils.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/msie|trident/i],
        describe(ua) {
          const browser = {
            name: "Internet Explorer"
          };
          const version = Utils.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/\sedg\//i],
        describe(ua) {
          const browser = {
            name: "Microsoft Edge"
          };
          const version = Utils.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/edg([ea]|ios)/i],
        describe(ua) {
          const browser = {
            name: "Microsoft Edge"
          };
          const version = Utils.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/vivaldi/i],
        describe(ua) {
          const browser = {
            name: "Vivaldi"
          };
          const version = Utils.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/seamonkey/i],
        describe(ua) {
          const browser = {
            name: "SeaMonkey"
          };
          const version = Utils.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/sailfish/i],
        describe(ua) {
          const browser = {
            name: "Sailfish"
          };
          const version = Utils.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/silk/i],
        describe(ua) {
          const browser = {
            name: "Amazon Silk"
          };
          const version = Utils.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/phantom/i],
        describe(ua) {
          const browser = {
            name: "PhantomJS"
          };
          const version = Utils.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/slimerjs/i],
        describe(ua) {
          const browser = {
            name: "SlimerJS"
          };
          const version = Utils.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
        describe(ua) {
          const browser = {
            name: "BlackBerry"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/(web|hpw)[o0]s/i],
        describe(ua) {
          const browser = {
            name: "WebOS Browser"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/bada/i],
        describe(ua) {
          const browser = {
            name: "Bada"
          };
          const version = Utils.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/tizen/i],
        describe(ua) {
          const browser = {
            name: "Tizen"
          };
          const version = Utils.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/qupzilla/i],
        describe(ua) {
          const browser = {
            name: "QupZilla"
          };
          const version = Utils.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/firefox|iceweasel|fxios/i],
        describe(ua) {
          const browser = {
            name: "Firefox"
          };
          const version = Utils.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/electron/i],
        describe(ua) {
          const browser = {
            name: "Electron"
          };
          const version = Utils.getFirstMatch(/(?:electron)\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/MiuiBrowser/i],
        describe(ua) {
          const browser = {
            name: "Miui"
          };
          const version = Utils.getFirstMatch(/(?:MiuiBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/chromium/i],
        describe(ua) {
          const browser = {
            name: "Chromium"
          };
          const version = Utils.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/chrome|crios|crmo/i],
        describe(ua) {
          const browser = {
            name: "Chrome"
          };
          const version = Utils.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      {
        test: [/GSA/i],
        describe(ua) {
          const browser = {
            name: "Google Search"
          };
          const version = Utils.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      /* Android Browser */
      {
        test(parser) {
          const notLikeAndroid = !parser.test(/like android/i);
          const butAndroid = parser.test(/android/i);
          return notLikeAndroid && butAndroid;
        },
        describe(ua) {
          const browser = {
            name: "Android Browser"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      /* PlayStation 4 */
      {
        test: [/playstation 4/i],
        describe(ua) {
          const browser = {
            name: "PlayStation 4"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      /* Safari */
      {
        test: [/safari|applewebkit/i],
        describe(ua) {
          const browser = {
            name: "Safari"
          };
          const version = Utils.getFirstMatch(commonVersionIdentifier, ua);
          if (version) {
            browser.version = version;
          }
          return browser;
        }
      },
      /* Something else */
      {
        test: [/.*/i],
        describe(ua) {
          const regexpWithoutDeviceSpec = /^(.*)\/(.*) /;
          const regexpWithDeviceSpec = /^(.*)\/(.*)[ \t]\((.*)/;
          const hasDeviceSpec = ua.search("\\(") !== -1;
          const regexp = hasDeviceSpec ? regexpWithDeviceSpec : regexpWithoutDeviceSpec;
          return {
            name: Utils.getFirstMatch(regexp, ua),
            version: Utils.getSecondMatch(regexp, ua)
          };
        }
      }
    ];
    parser_browsers_default = browsersList;
  }
});

// node_modules/bowser/src/parser-os.js
var parser_os_default;
var init_parser_os = __esm({
  "node_modules/bowser/src/parser-os.js"() {
    init_utils3();
    init_constants6();
    parser_os_default = [
      /* Roku */
      {
        test: [/Roku\/DVP/],
        describe(ua) {
          const version = Utils.getFirstMatch(/Roku\/DVP-(\d+\.\d+)/i, ua);
          return {
            name: OS_MAP.Roku,
            version
          };
        }
      },
      /* Windows Phone */
      {
        test: [/windows phone/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
          return {
            name: OS_MAP.WindowsPhone,
            version
          };
        }
      },
      /* Windows */
      {
        test: [/windows /i],
        describe(ua) {
          const version = Utils.getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
          const versionName = Utils.getWindowsVersionName(version);
          return {
            name: OS_MAP.Windows,
            version,
            versionName
          };
        }
      },
      /* Firefox on iPad */
      {
        test: [/Macintosh(.*?) FxiOS(.*?)\//],
        describe(ua) {
          const result = {
            name: OS_MAP.iOS
          };
          const version = Utils.getSecondMatch(/(Version\/)(\d[\d.]+)/, ua);
          if (version) {
            result.version = version;
          }
          return result;
        }
      },
      /* macOS */
      {
        test: [/macintosh/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(/[_\s]/g, ".");
          const versionName = Utils.getMacOSVersionName(version);
          const os = {
            name: OS_MAP.MacOS,
            version
          };
          if (versionName) {
            os.versionName = versionName;
          }
          return os;
        }
      },
      /* iOS */
      {
        test: [/(ipod|iphone|ipad)/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, ua).replace(/[_\s]/g, ".");
          return {
            name: OS_MAP.iOS,
            version
          };
        }
      },
      /* Android */
      {
        test(parser) {
          const notLikeAndroid = !parser.test(/like android/i);
          const butAndroid = parser.test(/android/i);
          return notLikeAndroid && butAndroid;
        },
        describe(ua) {
          const version = Utils.getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua);
          const versionName = Utils.getAndroidVersionName(version);
          const os = {
            name: OS_MAP.Android,
            version
          };
          if (versionName) {
            os.versionName = versionName;
          }
          return os;
        }
      },
      /* WebOS */
      {
        test: [/(web|hpw)[o0]s/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, ua);
          const os = {
            name: OS_MAP.WebOS
          };
          if (version && version.length) {
            os.version = version;
          }
          return os;
        }
      },
      /* BlackBerry */
      {
        test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, ua) || Utils.getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, ua) || Utils.getFirstMatch(/\bbb(\d+)/i, ua);
          return {
            name: OS_MAP.BlackBerry,
            version
          };
        }
      },
      /* Bada */
      {
        test: [/bada/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/bada\/(\d+(\.\d+)*)/i, ua);
          return {
            name: OS_MAP.Bada,
            version
          };
        }
      },
      /* Tizen */
      {
        test: [/tizen/i],
        describe(ua) {
          const version = Utils.getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, ua);
          return {
            name: OS_MAP.Tizen,
            version
          };
        }
      },
      /* Linux */
      {
        test: [/linux/i],
        describe() {
          return {
            name: OS_MAP.Linux
          };
        }
      },
      /* Chrome OS */
      {
        test: [/CrOS/],
        describe() {
          return {
            name: OS_MAP.ChromeOS
          };
        }
      },
      /* Playstation 4 */
      {
        test: [/PlayStation 4/],
        describe(ua) {
          const version = Utils.getFirstMatch(/PlayStation 4[/\s](\d+(\.\d+)*)/i, ua);
          return {
            name: OS_MAP.PlayStation4,
            version
          };
        }
      }
    ];
  }
});

// node_modules/bowser/src/parser-platforms.js
var parser_platforms_default;
var init_parser_platforms = __esm({
  "node_modules/bowser/src/parser-platforms.js"() {
    init_utils3();
    init_constants6();
    parser_platforms_default = [
      /* Googlebot */
      {
        test: [/googlebot/i],
        describe() {
          return {
            type: "bot",
            vendor: "Google"
          };
        }
      },
      /* Huawei */
      {
        test: [/huawei/i],
        describe(ua) {
          const model = Utils.getFirstMatch(/(can-l01)/i, ua) && "Nova";
          const platform = {
            type: PLATFORMS_MAP.mobile,
            vendor: "Huawei"
          };
          if (model) {
            platform.model = model;
          }
          return platform;
        }
      },
      /* Nexus Tablet */
      {
        test: [/nexus\s*(?:7|8|9|10).*/i],
        describe() {
          return {
            type: PLATFORMS_MAP.tablet,
            vendor: "Nexus"
          };
        }
      },
      /* iPad */
      {
        test: [/ipad/i],
        describe() {
          return {
            type: PLATFORMS_MAP.tablet,
            vendor: "Apple",
            model: "iPad"
          };
        }
      },
      /* Firefox on iPad */
      {
        test: [/Macintosh(.*?) FxiOS(.*?)\//],
        describe() {
          return {
            type: PLATFORMS_MAP.tablet,
            vendor: "Apple",
            model: "iPad"
          };
        }
      },
      /* Amazon Kindle Fire */
      {
        test: [/kftt build/i],
        describe() {
          return {
            type: PLATFORMS_MAP.tablet,
            vendor: "Amazon",
            model: "Kindle Fire HD 7"
          };
        }
      },
      /* Another Amazon Tablet with Silk */
      {
        test: [/silk/i],
        describe() {
          return {
            type: PLATFORMS_MAP.tablet,
            vendor: "Amazon"
          };
        }
      },
      /* Tablet */
      {
        test: [/tablet(?! pc)/i],
        describe() {
          return {
            type: PLATFORMS_MAP.tablet
          };
        }
      },
      /* iPod/iPhone */
      {
        test(parser) {
          const iDevice = parser.test(/ipod|iphone/i);
          const likeIDevice = parser.test(/like (ipod|iphone)/i);
          return iDevice && !likeIDevice;
        },
        describe(ua) {
          const model = Utils.getFirstMatch(/(ipod|iphone)/i, ua);
          return {
            type: PLATFORMS_MAP.mobile,
            vendor: "Apple",
            model
          };
        }
      },
      /* Nexus Mobile */
      {
        test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
        describe() {
          return {
            type: PLATFORMS_MAP.mobile,
            vendor: "Nexus"
          };
        }
      },
      /* Mobile */
      {
        test: [/[^-]mobi/i],
        describe() {
          return {
            type: PLATFORMS_MAP.mobile
          };
        }
      },
      /* BlackBerry */
      {
        test(parser) {
          return parser.getBrowserName(true) === "blackberry";
        },
        describe() {
          return {
            type: PLATFORMS_MAP.mobile,
            vendor: "BlackBerry"
          };
        }
      },
      /* Bada */
      {
        test(parser) {
          return parser.getBrowserName(true) === "bada";
        },
        describe() {
          return {
            type: PLATFORMS_MAP.mobile
          };
        }
      },
      /* Windows Phone */
      {
        test(parser) {
          return parser.getBrowserName() === "windows phone";
        },
        describe() {
          return {
            type: PLATFORMS_MAP.mobile,
            vendor: "Microsoft"
          };
        }
      },
      /* Android Tablet */
      {
        test(parser) {
          const osMajorVersion = Number(String(parser.getOSVersion()).split(".")[0]);
          return parser.getOSName(true) === "android" && osMajorVersion >= 3;
        },
        describe() {
          return {
            type: PLATFORMS_MAP.tablet
          };
        }
      },
      /* Android Mobile */
      {
        test(parser) {
          return parser.getOSName(true) === "android";
        },
        describe() {
          return {
            type: PLATFORMS_MAP.mobile
          };
        }
      },
      /* desktop */
      {
        test(parser) {
          return parser.getOSName(true) === "macos";
        },
        describe() {
          return {
            type: PLATFORMS_MAP.desktop,
            vendor: "Apple"
          };
        }
      },
      /* Windows */
      {
        test(parser) {
          return parser.getOSName(true) === "windows";
        },
        describe() {
          return {
            type: PLATFORMS_MAP.desktop
          };
        }
      },
      /* Linux */
      {
        test(parser) {
          return parser.getOSName(true) === "linux";
        },
        describe() {
          return {
            type: PLATFORMS_MAP.desktop
          };
        }
      },
      /* PlayStation 4 */
      {
        test(parser) {
          return parser.getOSName(true) === "playstation 4";
        },
        describe() {
          return {
            type: PLATFORMS_MAP.tv
          };
        }
      },
      /* Roku */
      {
        test(parser) {
          return parser.getOSName(true) === "roku";
        },
        describe() {
          return {
            type: PLATFORMS_MAP.tv
          };
        }
      }
    ];
  }
});

// node_modules/bowser/src/parser-engines.js
var parser_engines_default;
var init_parser_engines = __esm({
  "node_modules/bowser/src/parser-engines.js"() {
    init_utils3();
    init_constants6();
    parser_engines_default = [
      /* EdgeHTML */
      {
        test(parser) {
          return parser.getBrowserName(true) === "microsoft edge";
        },
        describe(ua) {
          const isBlinkBased = /\sedg\//i.test(ua);
          if (isBlinkBased) {
            return {
              name: ENGINE_MAP.Blink
            };
          }
          const version = Utils.getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, ua);
          return {
            name: ENGINE_MAP.EdgeHTML,
            version
          };
        }
      },
      /* Trident */
      {
        test: [/trident/i],
        describe(ua) {
          const engine = {
            name: ENGINE_MAP.Trident
          };
          const version = Utils.getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            engine.version = version;
          }
          return engine;
        }
      },
      /* Presto */
      {
        test(parser) {
          return parser.test(/presto/i);
        },
        describe(ua) {
          const engine = {
            name: ENGINE_MAP.Presto
          };
          const version = Utils.getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            engine.version = version;
          }
          return engine;
        }
      },
      /* Gecko */
      {
        test(parser) {
          const isGecko = parser.test(/gecko/i);
          const likeGecko = parser.test(/like gecko/i);
          return isGecko && !likeGecko;
        },
        describe(ua) {
          const engine = {
            name: ENGINE_MAP.Gecko
          };
          const version = Utils.getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            engine.version = version;
          }
          return engine;
        }
      },
      /* Blink */
      {
        test: [/(apple)?webkit\/537\.36/i],
        describe() {
          return {
            name: ENGINE_MAP.Blink
          };
        }
      },
      /* WebKit */
      {
        test: [/(apple)?webkit/i],
        describe(ua) {
          const engine = {
            name: ENGINE_MAP.WebKit
          };
          const version = Utils.getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, ua);
          if (version) {
            engine.version = version;
          }
          return engine;
        }
      }
    ];
  }
});

// node_modules/bowser/src/parser.js
var Parser, parser_default;
var init_parser = __esm({
  "node_modules/bowser/src/parser.js"() {
    init_parser_browsers();
    init_parser_os();
    init_parser_platforms();
    init_parser_engines();
    init_utils3();
    Parser = class {
      /**
       * Create instance of Parser
       *
       * @param {String} UA User-Agent string
       * @param {Boolean} [skipParsing=false] parser can skip parsing in purpose of performance
       * improvements if you need to make a more particular parsing
       * like {@link Parser#parseBrowser} or {@link Parser#parsePlatform}
       *
       * @throw {Error} in case of empty UA String
       *
       * @constructor
       */
      constructor(UA, skipParsing = false) {
        if (UA === void 0 || UA === null || UA === "") {
          throw new Error("UserAgent parameter can't be empty");
        }
        this._ua = UA;
        this.parsedResult = {};
        if (skipParsing !== true) {
          this.parse();
        }
      }
      /**
       * Get UserAgent string of current Parser instance
       * @return {String} User-Agent String of the current <Parser> object
       *
       * @public
       */
      getUA() {
        return this._ua;
      }
      /**
       * Test a UA string for a regexp
       * @param {RegExp} regex
       * @return {Boolean}
       */
      test(regex) {
        return regex.test(this._ua);
      }
      /**
       * Get parsed browser object
       * @return {Object}
       */
      parseBrowser() {
        this.parsedResult.browser = {};
        const browserDescriptor = Utils.find(parser_browsers_default, (_browser) => {
          if (typeof _browser.test === "function") {
            return _browser.test(this);
          }
          if (_browser.test instanceof Array) {
            return _browser.test.some((condition) => this.test(condition));
          }
          throw new Error("Browser's test function is not valid");
        });
        if (browserDescriptor) {
          this.parsedResult.browser = browserDescriptor.describe(this.getUA());
        }
        return this.parsedResult.browser;
      }
      /**
       * Get parsed browser object
       * @return {Object}
       *
       * @public
       */
      getBrowser() {
        if (this.parsedResult.browser) {
          return this.parsedResult.browser;
        }
        return this.parseBrowser();
      }
      /**
       * Get browser's name
       * @return {String} Browser's name or an empty string
       *
       * @public
       */
      getBrowserName(toLowerCase) {
        if (toLowerCase) {
          return String(this.getBrowser().name).toLowerCase() || "";
        }
        return this.getBrowser().name || "";
      }
      /**
       * Get browser's version
       * @return {String} version of browser
       *
       * @public
       */
      getBrowserVersion() {
        return this.getBrowser().version;
      }
      /**
       * Get OS
       * @return {Object}
       *
       * @example
       * this.getOS();
       * {
       *   name: 'macOS',
       *   version: '10.11.12'
       * }
       */
      getOS() {
        if (this.parsedResult.os) {
          return this.parsedResult.os;
        }
        return this.parseOS();
      }
      /**
       * Parse OS and save it to this.parsedResult.os
       * @return {*|{}}
       */
      parseOS() {
        this.parsedResult.os = {};
        const os = Utils.find(parser_os_default, (_os) => {
          if (typeof _os.test === "function") {
            return _os.test(this);
          }
          if (_os.test instanceof Array) {
            return _os.test.some((condition) => this.test(condition));
          }
          throw new Error("Browser's test function is not valid");
        });
        if (os) {
          this.parsedResult.os = os.describe(this.getUA());
        }
        return this.parsedResult.os;
      }
      /**
       * Get OS name
       * @param {Boolean} [toLowerCase] return lower-cased value
       * @return {String} name of the OS — macOS, Windows, Linux, etc.
       */
      getOSName(toLowerCase) {
        const { name } = this.getOS();
        if (toLowerCase) {
          return String(name).toLowerCase() || "";
        }
        return name || "";
      }
      /**
       * Get OS version
       * @return {String} full version with dots ('10.11.12', '5.6', etc)
       */
      getOSVersion() {
        return this.getOS().version;
      }
      /**
       * Get parsed platform
       * @return {{}}
       */
      getPlatform() {
        if (this.parsedResult.platform) {
          return this.parsedResult.platform;
        }
        return this.parsePlatform();
      }
      /**
       * Get platform name
       * @param {Boolean} [toLowerCase=false]
       * @return {*}
       */
      getPlatformType(toLowerCase = false) {
        const { type } = this.getPlatform();
        if (toLowerCase) {
          return String(type).toLowerCase() || "";
        }
        return type || "";
      }
      /**
       * Get parsed platform
       * @return {{}}
       */
      parsePlatform() {
        this.parsedResult.platform = {};
        const platform = Utils.find(parser_platforms_default, (_platform) => {
          if (typeof _platform.test === "function") {
            return _platform.test(this);
          }
          if (_platform.test instanceof Array) {
            return _platform.test.some((condition) => this.test(condition));
          }
          throw new Error("Browser's test function is not valid");
        });
        if (platform) {
          this.parsedResult.platform = platform.describe(this.getUA());
        }
        return this.parsedResult.platform;
      }
      /**
       * Get parsed engine
       * @return {{}}
       */
      getEngine() {
        if (this.parsedResult.engine) {
          return this.parsedResult.engine;
        }
        return this.parseEngine();
      }
      /**
       * Get engines's name
       * @return {String} Engines's name or an empty string
       *
       * @public
       */
      getEngineName(toLowerCase) {
        if (toLowerCase) {
          return String(this.getEngine().name).toLowerCase() || "";
        }
        return this.getEngine().name || "";
      }
      /**
       * Get parsed platform
       * @return {{}}
       */
      parseEngine() {
        this.parsedResult.engine = {};
        const engine = Utils.find(parser_engines_default, (_engine) => {
          if (typeof _engine.test === "function") {
            return _engine.test(this);
          }
          if (_engine.test instanceof Array) {
            return _engine.test.some((condition) => this.test(condition));
          }
          throw new Error("Browser's test function is not valid");
        });
        if (engine) {
          this.parsedResult.engine = engine.describe(this.getUA());
        }
        return this.parsedResult.engine;
      }
      /**
       * Parse full information about the browser
       * @returns {Parser}
       */
      parse() {
        this.parseBrowser();
        this.parseOS();
        this.parsePlatform();
        this.parseEngine();
        return this;
      }
      /**
       * Get parsed result
       * @return {ParsedResult}
       */
      getResult() {
        return Utils.assign({}, this.parsedResult);
      }
      /**
       * Check if parsed browser matches certain conditions
       *
       * @param {Object} checkTree It's one or two layered object,
       * which can include a platform or an OS on the first layer
       * and should have browsers specs on the bottom-laying layer
       *
       * @returns {Boolean|undefined} Whether the browser satisfies the set conditions or not.
       * Returns `undefined` when the browser is no described in the checkTree object.
       *
       * @example
       * const browser = Bowser.getParser(window.navigator.userAgent);
       * if (browser.satisfies({chrome: '>118.01.1322' }))
       * // or with os
       * if (browser.satisfies({windows: { chrome: '>118.01.1322' } }))
       * // or with platforms
       * if (browser.satisfies({desktop: { chrome: '>118.01.1322' } }))
       */
      satisfies(checkTree) {
        const platformsAndOSes = {};
        let platformsAndOSCounter = 0;
        const browsers = {};
        let browsersCounter = 0;
        const allDefinitions = Object.keys(checkTree);
        allDefinitions.forEach((key) => {
          const currentDefinition = checkTree[key];
          if (typeof currentDefinition === "string") {
            browsers[key] = currentDefinition;
            browsersCounter += 1;
          } else if (typeof currentDefinition === "object") {
            platformsAndOSes[key] = currentDefinition;
            platformsAndOSCounter += 1;
          }
        });
        if (platformsAndOSCounter > 0) {
          const platformsAndOSNames = Object.keys(platformsAndOSes);
          const OSMatchingDefinition = Utils.find(platformsAndOSNames, (name) => this.isOS(name));
          if (OSMatchingDefinition) {
            const osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);
            if (osResult !== void 0) {
              return osResult;
            }
          }
          const platformMatchingDefinition = Utils.find(
            platformsAndOSNames,
            (name) => this.isPlatform(name)
          );
          if (platformMatchingDefinition) {
            const platformResult = this.satisfies(platformsAndOSes[platformMatchingDefinition]);
            if (platformResult !== void 0) {
              return platformResult;
            }
          }
        }
        if (browsersCounter > 0) {
          const browserNames = Object.keys(browsers);
          const matchingDefinition = Utils.find(browserNames, (name) => this.isBrowser(name, true));
          if (matchingDefinition !== void 0) {
            return this.compareVersion(browsers[matchingDefinition]);
          }
        }
        return void 0;
      }
      /**
       * Check if the browser name equals the passed string
       * @param browserName The string to compare with the browser name
       * @param [includingAlias=false] The flag showing whether alias will be included into comparison
       * @returns {boolean}
       */
      isBrowser(browserName, includingAlias = false) {
        const defaultBrowserName = this.getBrowserName().toLowerCase();
        let browserNameLower = browserName.toLowerCase();
        const alias = Utils.getBrowserTypeByAlias(browserNameLower);
        if (includingAlias && alias) {
          browserNameLower = alias.toLowerCase();
        }
        return browserNameLower === defaultBrowserName;
      }
      compareVersion(version) {
        let expectedResults = [0];
        let comparableVersion = version;
        let isLoose = false;
        const currentBrowserVersion = this.getBrowserVersion();
        if (typeof currentBrowserVersion !== "string") {
          return void 0;
        }
        if (version[0] === ">" || version[0] === "<") {
          comparableVersion = version.substr(1);
          if (version[1] === "=") {
            isLoose = true;
            comparableVersion = version.substr(2);
          } else {
            expectedResults = [];
          }
          if (version[0] === ">") {
            expectedResults.push(1);
          } else {
            expectedResults.push(-1);
          }
        } else if (version[0] === "=") {
          comparableVersion = version.substr(1);
        } else if (version[0] === "~") {
          isLoose = true;
          comparableVersion = version.substr(1);
        }
        return expectedResults.indexOf(
          Utils.compareVersions(currentBrowserVersion, comparableVersion, isLoose)
        ) > -1;
      }
      isOS(osName) {
        return this.getOSName(true) === String(osName).toLowerCase();
      }
      isPlatform(platformType) {
        return this.getPlatformType(true) === String(platformType).toLowerCase();
      }
      isEngine(engineName) {
        return this.getEngineName(true) === String(engineName).toLowerCase();
      }
      /**
       * Is anything? Check if the browser is called "anything",
       * the OS called "anything" or the platform called "anything"
       * @param {String} anything
       * @param [includingAlias=false] The flag showing whether alias will be included into comparison
       * @returns {Boolean}
       */
      is(anything, includingAlias = false) {
        return this.isBrowser(anything, includingAlias) || this.isOS(anything) || this.isPlatform(anything);
      }
      /**
       * Check if any of the given values satisfies this.is(anything)
       * @param {String[]} anythings
       * @returns {Boolean}
       */
      some(anythings = []) {
        return anythings.some((anything) => this.is(anything));
      }
    };
    parser_default = Parser;
  }
});

// node_modules/bowser/src/bowser.js
var Bowser, bowser_default;
var init_bowser = __esm({
  "node_modules/bowser/src/bowser.js"() {
    init_parser();
    init_constants6();
    Bowser = class {
      /**
       * Creates a {@link Parser} instance
       *
       * @param {String} UA UserAgent string
       * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
       * explicitly. Same as `skipParsing` for {@link Parser}.
       * @returns {Parser}
       * @throws {Error} when UA is not a String
       *
       * @example
       * const parser = Bowser.getParser(window.navigator.userAgent);
       * const result = parser.getResult();
       */
      static getParser(UA, skipParsing = false) {
        if (typeof UA !== "string") {
          throw new Error("UserAgent should be a string");
        }
        return new parser_default(UA, skipParsing);
      }
      /**
       * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
       *
       * @param UA
       * @return {ParsedResult}
       *
       * @example
       * const result = Bowser.parse(window.navigator.userAgent);
       */
      static parse(UA) {
        return new parser_default(UA).getResult();
      }
      static get BROWSER_MAP() {
        return BROWSER_MAP;
      }
      static get ENGINE_MAP() {
        return ENGINE_MAP;
      }
      static get OS_MAP() {
        return OS_MAP;
      }
      static get PLATFORMS_MAP() {
        return PLATFORMS_MAP;
      }
    };
    bowser_default = Bowser;
  }
});

// node_modules/@aws-sdk/util-user-agent-browser/dist-es/index.js
var createDefaultUserAgentProvider;
var init_dist_es30 = __esm({
  "node_modules/@aws-sdk/util-user-agent-browser/dist-es/index.js"() {
    init_bowser();
    createDefaultUserAgentProvider = ({ serviceId, clientVersion }) => async (config) => {
      var _a, _b, _c, _d, _e, _f;
      const parsedUA = typeof window !== "undefined" && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) ? bowser_default.parse(window.navigator.userAgent) : void 0;
      const sections = [
        ["aws-sdk-js", clientVersion],
        ["ua", "2.1"],
        [`os/${((_b = parsedUA == null ? void 0 : parsedUA.os) == null ? void 0 : _b.name) || "other"}`, (_c = parsedUA == null ? void 0 : parsedUA.os) == null ? void 0 : _c.version],
        ["lang/js"],
        ["md/browser", `${((_d = parsedUA == null ? void 0 : parsedUA.browser) == null ? void 0 : _d.name) ?? "unknown"}_${((_e = parsedUA == null ? void 0 : parsedUA.browser) == null ? void 0 : _e.version) ?? "unknown"}`]
      ];
      if (serviceId) {
        sections.push([`api/${serviceId}`, clientVersion]);
      }
      const appId = await ((_f = config == null ? void 0 : config.userAgentAppId) == null ? void 0 : _f.call(config));
      if (appId) {
        sections.push([`app/${appId}`]);
      }
      return sections;
    };
  }
});

// node_modules/@smithy/invalid-dependency/dist-es/invalidProvider.js
var invalidProvider;
var init_invalidProvider = __esm({
  "node_modules/@smithy/invalid-dependency/dist-es/invalidProvider.js"() {
    invalidProvider = (message) => () => Promise.reject(message);
  }
});

// node_modules/@smithy/invalid-dependency/dist-es/invalidFunction.js
var init_invalidFunction = __esm({
  "node_modules/@smithy/invalid-dependency/dist-es/invalidFunction.js"() {
  }
});

// node_modules/@smithy/invalid-dependency/dist-es/index.js
var init_dist_es31 = __esm({
  "node_modules/@smithy/invalid-dependency/dist-es/index.js"() {
    init_invalidFunction();
    init_invalidProvider();
  }
});

// node_modules/@smithy/util-body-length-browser/dist-es/calculateBodyLength.js
var TEXT_ENCODER, calculateBodyLength;
var init_calculateBodyLength = __esm({
  "node_modules/@smithy/util-body-length-browser/dist-es/calculateBodyLength.js"() {
    TEXT_ENCODER = typeof TextEncoder == "function" ? new TextEncoder() : null;
    calculateBodyLength = (body) => {
      if (typeof body === "string") {
        if (TEXT_ENCODER) {
          return TEXT_ENCODER.encode(body).byteLength;
        }
        let len = body.length;
        for (let i = len - 1; i >= 0; i--) {
          const code = body.charCodeAt(i);
          if (code > 127 && code <= 2047)
            len++;
          else if (code > 2047 && code <= 65535)
            len += 2;
          if (code >= 56320 && code <= 57343)
            i--;
        }
        return len;
      } else if (typeof body.byteLength === "number") {
        return body.byteLength;
      } else if (typeof body.size === "number") {
        return body.size;
      }
      throw new Error(`Body Length computation failed for ${body}`);
    };
  }
});

// node_modules/@smithy/util-body-length-browser/dist-es/index.js
var init_dist_es32 = __esm({
  "node_modules/@smithy/util-body-length-browser/dist-es/index.js"() {
    init_calculateBodyLength();
  }
});

// node_modules/@smithy/util-defaults-mode-browser/dist-es/constants.js
var DEFAULTS_MODE_OPTIONS;
var init_constants7 = __esm({
  "node_modules/@smithy/util-defaults-mode-browser/dist-es/constants.js"() {
    DEFAULTS_MODE_OPTIONS = ["in-region", "cross-region", "mobile", "standard", "legacy"];
  }
});

// node_modules/@smithy/util-defaults-mode-browser/dist-es/resolveDefaultsModeConfig.js
var resolveDefaultsModeConfig, isMobileBrowser;
var init_resolveDefaultsModeConfig = __esm({
  "node_modules/@smithy/util-defaults-mode-browser/dist-es/resolveDefaultsModeConfig.js"() {
    init_dist_es();
    init_bowser();
    init_constants7();
    resolveDefaultsModeConfig = ({ defaultsMode } = {}) => memoize(async () => {
      const mode = typeof defaultsMode === "function" ? await defaultsMode() : defaultsMode;
      switch (mode == null ? void 0 : mode.toLowerCase()) {
        case "auto":
          return Promise.resolve(isMobileBrowser() ? "mobile" : "standard");
        case "mobile":
        case "in-region":
        case "cross-region":
        case "standard":
        case "legacy":
          return Promise.resolve(mode == null ? void 0 : mode.toLocaleLowerCase());
        case void 0:
          return Promise.resolve("legacy");
        default:
          throw new Error(`Invalid parameter for "defaultsMode", expect ${DEFAULTS_MODE_OPTIONS.join(", ")}, got ${mode}`);
      }
    });
    isMobileBrowser = () => {
      var _a, _b;
      const parsedUA = typeof window !== "undefined" && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) ? bowser_default.parse(window.navigator.userAgent) : void 0;
      const platform = (_b = parsedUA == null ? void 0 : parsedUA.platform) == null ? void 0 : _b.type;
      return platform === "tablet" || platform === "mobile";
    };
  }
});

// node_modules/@smithy/util-defaults-mode-browser/dist-es/index.js
var init_dist_es33 = __esm({
  "node_modules/@smithy/util-defaults-mode-browser/dist-es/index.js"() {
    init_resolveDefaultsModeConfig();
  }
});

// node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js
var getAwsRegionExtensionConfiguration, resolveAwsRegionExtensionConfiguration;
var init_extensions = __esm({
  "node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js"() {
    getAwsRegionExtensionConfiguration = (runtimeConfig) => {
      return {
        setRegion(region) {
          runtimeConfig.region = region;
        },
        region() {
          return runtimeConfig.region;
        }
      };
    };
    resolveAwsRegionExtensionConfiguration = (awsRegionExtensionConfiguration) => {
      return {
        region: awsRegionExtensionConfiguration.region()
      };
    };
  }
});

// node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/config.js
var init_config3 = __esm({
  "node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/config.js"() {
  }
});

// node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/isFipsRegion.js
var init_isFipsRegion2 = __esm({
  "node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/isFipsRegion.js"() {
  }
});

// node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/getRealRegion.js
var init_getRealRegion2 = __esm({
  "node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/getRealRegion.js"() {
    init_isFipsRegion2();
  }
});

// node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/resolveRegionConfig.js
var init_resolveRegionConfig2 = __esm({
  "node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/resolveRegionConfig.js"() {
    init_getRealRegion2();
    init_isFipsRegion2();
  }
});

// node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/index.js
var init_regionConfig2 = __esm({
  "node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/index.js"() {
    init_config3();
    init_resolveRegionConfig2();
  }
});

// node_modules/@aws-sdk/region-config-resolver/dist-es/index.js
var init_dist_es34 = __esm({
  "node_modules/@aws-sdk/region-config-resolver/dist-es/index.js"() {
    init_extensions();
    init_regionConfig2();
  }
});

export {
  resolveHostHeaderConfig,
  getHostHeaderPlugin,
  init_dist_es11 as init_dist_es,
  getLoggerPlugin,
  init_dist_es12 as init_dist_es2,
  getRecursionDetectionPlugin,
  init_dist_es13 as init_dist_es3,
  resolveUserAgentConfig,
  EndpointCache,
  customEndpointFunctions,
  resolveEndpoint,
  init_dist_es14 as init_dist_es4,
  awsEndpointFunctions,
  init_dist_es15 as init_dist_es5,
  setCredentialFeature,
  init_client,
  AwsSdkSigV4Signer,
  resolveAwsSdkSigV4Config,
  parseJsonBody,
  parseJsonErrorBody,
  loadRestJsonErrorCode,
  parseXmlBody,
  parseXmlErrorBody,
  init_dist_es18 as init_dist_es6,
  getUserAgentPlugin,
  init_dist_es19 as init_dist_es7,
  DEFAULT_USE_DUALSTACK_ENDPOINT,
  DEFAULT_USE_FIPS_ENDPOINT,
  resolveRegionConfig,
  init_dist_es21 as init_dist_es8,
  getContentLengthPlugin,
  init_dist_es22 as init_dist_es9,
  parseUrl,
  init_dist_es24 as init_dist_es10,
  getEndpointPlugin,
  resolveEndpointConfig,
  init_dist_es25 as init_dist_es11,
  DEFAULT_MAX_ATTEMPTS,
  DEFAULT_RETRY_MODE,
  init_dist_es27 as init_dist_es12,
  resolveRetryConfig,
  getRetryPlugin,
  init_dist_es28 as init_dist_es13,
  Sha2563 as Sha256,
  init_module4 as init_module,
  createDefaultUserAgentProvider,
  init_dist_es30 as init_dist_es14,
  invalidProvider,
  init_dist_es31 as init_dist_es15,
  calculateBodyLength,
  init_dist_es32 as init_dist_es16,
  resolveDefaultsModeConfig,
  init_dist_es33 as init_dist_es17,
  getAwsRegionExtensionConfiguration,
  resolveAwsRegionExtensionConfiguration,
  init_dist_es34 as init_dist_es18
};
/*! Bundled license information:

bowser/src/bowser.js:
  (*!
   * Bowser - a browser detector
   * https://github.com/lancedikson/bowser
   * MIT License | (c) Dustin Diaz 2012-2015
   * MIT License | (c) Denis Demchenko 2015-2019
   *)
*/
//# sourceMappingURL=chunk-TJEVHZ2X.js.map
