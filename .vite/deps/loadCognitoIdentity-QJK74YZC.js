import {
  AwsSdkSigV4Signer,
  DEFAULT_MAX_ATTEMPTS,
  DEFAULT_RETRY_MODE,
  DEFAULT_USE_DUALSTACK_ENDPOINT,
  DEFAULT_USE_FIPS_ENDPOINT,
  EndpointCache,
  Sha256,
  awsEndpointFunctions,
  calculateBodyLength,
  createDefaultUserAgentProvider,
  customEndpointFunctions,
  getAwsRegionExtensionConfiguration,
  getContentLengthPlugin,
  getEndpointPlugin,
  getHostHeaderPlugin,
  getLoggerPlugin,
  getRecursionDetectionPlugin,
  getRetryPlugin,
  getUserAgentPlugin,
  init_dist_es as init_dist_es2,
  init_dist_es10 as init_dist_es18,
  init_dist_es11 as init_dist_es19,
  init_dist_es12 as init_dist_es20,
  init_dist_es13 as init_dist_es21,
  init_dist_es14 as init_dist_es22,
  init_dist_es15 as init_dist_es23,
  init_dist_es16 as init_dist_es24,
  init_dist_es17 as init_dist_es25,
  init_dist_es18 as init_dist_es26,
  init_dist_es2 as init_dist_es3,
  init_dist_es3 as init_dist_es4,
  init_dist_es4 as init_dist_es11,
  init_dist_es5 as init_dist_es12,
  init_dist_es6 as init_dist_es14,
  init_dist_es7 as init_dist_es15,
  init_dist_es8 as init_dist_es16,
  init_dist_es9 as init_dist_es17,
  init_module,
  invalidProvider,
  loadRestJsonErrorCode,
  parseJsonBody,
  parseJsonErrorBody,
  parseUrl,
  resolveAwsRegionExtensionConfiguration,
  resolveAwsSdkSigV4Config,
  resolveDefaultsModeConfig,
  resolveEndpoint,
  resolveEndpointConfig,
  resolveHostHeaderConfig,
  resolveRegionConfig,
  resolveRetryConfig,
  resolveUserAgentConfig
} from "./chunk-TJEVHZ2X.js";
import {
  Client,
  Command,
  DefaultIdentityProviderConfig,
  FetchHttpHandler,
  HttpRequest,
  NoAuthSigner,
  NoOpLogger,
  SENSITIVE_STRING,
  ServiceException,
  _json,
  collectBody,
  createAggregatedClient,
  createPaginator,
  decorateServiceException,
  expectNonNull,
  expectNumber,
  expectString,
  fromBase64,
  fromUtf8,
  getDefaultExtensionConfiguration,
  getHttpAuthSchemeEndpointRuleSetPlugin,
  getHttpHandlerExtensionConfiguration,
  getHttpSigningPlugin,
  getSerdePlugin,
  getSmithyContext,
  init_dist_es12 as init_dist_es10,
  init_dist_es13,
  init_dist_es3 as init_dist_es,
  init_dist_es4 as init_dist_es5,
  init_dist_es5 as init_dist_es6,
  init_dist_es6 as init_dist_es7,
  init_dist_es7 as init_dist_es8,
  init_dist_es9,
  loadConfigsForDefaultMode,
  normalizeProvider,
  parseEpochTimestamp,
  resolveDefaultRuntimeConfig,
  resolveHttpHandlerRuntimeConfig,
  streamCollector,
  take,
  toBase64,
  toUtf8,
  withBaseException
} from "./chunk-YDYV3GMK.js";
import "./chunk-NOR3QQAA.js";
import {
  __esm,
  __publicField
} from "./chunk-EWTE5DHJ.js";

// node_modules/@aws-sdk/client-cognito-identity/dist-es/auth/httpAuthSchemeProvider.js
function createAwsAuthSigv4HttpAuthOption(authParameters) {
  return {
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      name: "cognito-identity",
      region: authParameters.region
    },
    propertiesExtractor: (config, context) => ({
      signingProperties: {
        config,
        context
      }
    })
  };
}
function createSmithyApiNoAuthHttpAuthOption(authParameters) {
  return {
    schemeId: "smithy.api#noAuth"
  };
}
var defaultCognitoIdentityHttpAuthSchemeParametersProvider, defaultCognitoIdentityHttpAuthSchemeProvider, resolveHttpAuthSchemeConfig;
var init_httpAuthSchemeProvider = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/auth/httpAuthSchemeProvider.js"() {
    init_dist_es14();
    init_dist_es5();
    defaultCognitoIdentityHttpAuthSchemeParametersProvider = async (config, context, input) => {
      return {
        operation: getSmithyContext(context).operation,
        region: await normalizeProvider(config.region)() || (() => {
          throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
        })()
      };
    };
    defaultCognitoIdentityHttpAuthSchemeProvider = (authParameters) => {
      const options = [];
      switch (authParameters.operation) {
        case "GetCredentialsForIdentity": {
          options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
          break;
        }
        case "GetId": {
          options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
          break;
        }
        case "GetOpenIdToken": {
          options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
          break;
        }
        case "UnlinkIdentity": {
          options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
          break;
        }
        default: {
          options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
        }
      }
      return options;
    };
    resolveHttpAuthSchemeConfig = (config) => {
      const config_0 = resolveAwsSdkSigV4Config(config);
      return Object.assign(config_0, {
        authSchemePreference: normalizeProvider(config.authSchemePreference ?? [])
      });
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/endpoint/EndpointParameters.js
var resolveClientEndpointParameters, commonParams;
var init_EndpointParameters = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/endpoint/EndpointParameters.js"() {
    resolveClientEndpointParameters = (options) => {
      return Object.assign(options, {
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        defaultSigningName: "cognito-identity"
      });
    };
    commonParams = {
      UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
      Endpoint: { type: "builtInParams", name: "endpoint" },
      Region: { type: "builtInParams", name: "region" },
      UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/package.json
var package_default;
var init_package = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/package.json"() {
    package_default = {
      name: "@aws-sdk/client-cognito-identity",
      description: "AWS SDK for JavaScript Cognito Identity Client for Node.js, Browser and React Native",
      version: "3.804.0",
      scripts: {
        build: "concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'",
        "build:cjs": "node ../../scripts/compilation/inline client-cognito-identity",
        "build:es": "tsc -p tsconfig.es.json",
        "build:include:deps": "lerna run --scope $npm_package_name --include-dependencies build",
        "build:types": "tsc -p tsconfig.types.json",
        "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
        clean: "rimraf ./dist-* && rimraf *.tsbuildinfo",
        "extract:docs": "api-extractor run --local",
        "generate:client": "node ../../scripts/generate-clients/single-service --solo cognito-identity",
        "test:e2e": "yarn g:vitest run -c vitest.config.e2e.ts --mode development",
        "test:e2e:watch": "yarn g:vitest watch -c vitest.config.e2e.ts"
      },
      main: "./dist-cjs/index.js",
      types: "./dist-types/index.d.ts",
      module: "./dist-es/index.js",
      sideEffects: false,
      dependencies: {
        "@aws-crypto/sha256-browser": "5.2.0",
        "@aws-crypto/sha256-js": "5.2.0",
        "@aws-sdk/core": "3.804.0",
        "@aws-sdk/credential-provider-node": "3.804.0",
        "@aws-sdk/middleware-host-header": "3.804.0",
        "@aws-sdk/middleware-logger": "3.804.0",
        "@aws-sdk/middleware-recursion-detection": "3.804.0",
        "@aws-sdk/middleware-user-agent": "3.804.0",
        "@aws-sdk/region-config-resolver": "3.804.0",
        "@aws-sdk/types": "3.804.0",
        "@aws-sdk/util-endpoints": "3.804.0",
        "@aws-sdk/util-user-agent-browser": "3.804.0",
        "@aws-sdk/util-user-agent-node": "3.804.0",
        "@smithy/config-resolver": "^4.1.0",
        "@smithy/core": "^3.3.1",
        "@smithy/fetch-http-handler": "^5.0.2",
        "@smithy/hash-node": "^4.0.2",
        "@smithy/invalid-dependency": "^4.0.2",
        "@smithy/middleware-content-length": "^4.0.2",
        "@smithy/middleware-endpoint": "^4.1.2",
        "@smithy/middleware-retry": "^4.1.3",
        "@smithy/middleware-serde": "^4.0.3",
        "@smithy/middleware-stack": "^4.0.2",
        "@smithy/node-config-provider": "^4.0.2",
        "@smithy/node-http-handler": "^4.0.4",
        "@smithy/protocol-http": "^5.1.0",
        "@smithy/smithy-client": "^4.2.2",
        "@smithy/types": "^4.2.0",
        "@smithy/url-parser": "^4.0.2",
        "@smithy/util-base64": "^4.0.0",
        "@smithy/util-body-length-browser": "^4.0.0",
        "@smithy/util-body-length-node": "^4.0.0",
        "@smithy/util-defaults-mode-browser": "^4.0.10",
        "@smithy/util-defaults-mode-node": "^4.0.10",
        "@smithy/util-endpoints": "^3.0.2",
        "@smithy/util-middleware": "^4.0.2",
        "@smithy/util-retry": "^4.0.3",
        "@smithy/util-utf8": "^4.0.0",
        tslib: "^2.6.2"
      },
      devDependencies: {
        "@aws-sdk/client-iam": "3.804.0",
        "@tsconfig/node18": "18.2.4",
        "@types/chai": "^4.2.11",
        "@types/node": "^18.19.69",
        concurrently: "7.0.0",
        "downlevel-dts": "0.10.1",
        rimraf: "3.0.2",
        typescript: "~5.8.3"
      },
      engines: {
        node: ">=18.0.0"
      },
      typesVersions: {
        "<4.0": {
          "dist-types/*": [
            "dist-types/ts3.4/*"
          ]
        }
      },
      files: [
        "dist-*/**"
      ],
      author: {
        name: "AWS SDK for JavaScript Team",
        url: "https://aws.amazon.com/javascript/"
      },
      license: "Apache-2.0",
      browser: {
        "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.browser"
      },
      "react-native": {
        "./dist-es/runtimeConfig": "./dist-es/runtimeConfig.native"
      },
      homepage: "https://github.com/aws/aws-sdk-js-v3/tree/main/clients/client-cognito-identity",
      repository: {
        type: "git",
        url: "https://github.com/aws/aws-sdk-js-v3.git",
        directory: "clients/client-cognito-identity"
      }
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/endpoint/ruleset.js
var w, x, y, z, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, _data, ruleSet;
var init_ruleset = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/endpoint/ruleset.js"() {
    w = "required";
    x = "fn";
    y = "argv";
    z = "ref";
    a = true;
    b = "isSet";
    c = "booleanEquals";
    d = "error";
    e = "endpoint";
    f = "tree";
    g = "PartitionResult";
    h = "getAttr";
    i = "stringEquals";
    j = { [w]: false, "type": "String" };
    k = { [w]: true, "default": false, "type": "Boolean" };
    l = { [z]: "Endpoint" };
    m = { [x]: c, [y]: [{ [z]: "UseFIPS" }, true] };
    n = { [x]: c, [y]: [{ [z]: "UseDualStack" }, true] };
    o = {};
    p = { [z]: "Region" };
    q = { [x]: h, [y]: [{ [z]: g }, "supportsFIPS"] };
    r = { [z]: g };
    s = { [x]: c, [y]: [true, { [x]: h, [y]: [r, "supportsDualStack"] }] };
    t = [m];
    u = [n];
    v = [p];
    _data = { version: "1.0", parameters: { Region: j, UseDualStack: k, UseFIPS: k, Endpoint: j }, rules: [{ conditions: [{ [x]: b, [y]: [l] }], rules: [{ conditions: t, error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: d }, { conditions: u, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", type: d }, { endpoint: { url: l, properties: o, headers: o }, type: e }], type: f }, { conditions: [{ [x]: b, [y]: v }], rules: [{ conditions: [{ [x]: "aws.partition", [y]: v, assign: g }], rules: [{ conditions: [m, n], rules: [{ conditions: [{ [x]: c, [y]: [a, q] }, s], rules: [{ conditions: [{ [x]: i, [y]: [p, "us-east-1"] }], endpoint: { url: "https://cognito-identity-fips.us-east-1.amazonaws.com", properties: o, headers: o }, type: e }, { conditions: [{ [x]: i, [y]: [p, "us-east-2"] }], endpoint: { url: "https://cognito-identity-fips.us-east-2.amazonaws.com", properties: o, headers: o }, type: e }, { conditions: [{ [x]: i, [y]: [p, "us-west-1"] }], endpoint: { url: "https://cognito-identity-fips.us-west-1.amazonaws.com", properties: o, headers: o }, type: e }, { conditions: [{ [x]: i, [y]: [p, "us-west-2"] }], endpoint: { url: "https://cognito-identity-fips.us-west-2.amazonaws.com", properties: o, headers: o }, type: e }, { endpoint: { url: "https://cognito-identity-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: o, headers: o }, type: e }], type: f }, { error: "FIPS and DualStack are enabled, but this partition does not support one or both", type: d }], type: f }, { conditions: t, rules: [{ conditions: [{ [x]: c, [y]: [q, a] }], rules: [{ endpoint: { url: "https://cognito-identity-fips.{Region}.{PartitionResult#dnsSuffix}", properties: o, headers: o }, type: e }], type: f }, { error: "FIPS is enabled but this partition does not support FIPS", type: d }], type: f }, { conditions: u, rules: [{ conditions: [s], rules: [{ conditions: [{ [x]: i, [y]: ["aws", { [x]: h, [y]: [r, "name"] }] }], endpoint: { url: "https://cognito-identity.{Region}.amazonaws.com", properties: o, headers: o }, type: e }, { endpoint: { url: "https://cognito-identity.{Region}.{PartitionResult#dualStackDnsSuffix}", properties: o, headers: o }, type: e }], type: f }, { error: "DualStack is enabled but this partition does not support DualStack", type: d }], type: f }, { endpoint: { url: "https://cognito-identity.{Region}.{PartitionResult#dnsSuffix}", properties: o, headers: o }, type: e }], type: f }], type: f }, { error: "Invalid Configuration: Missing Region", type: d }] };
    ruleSet = _data;
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/endpoint/endpointResolver.js
var cache, defaultEndpointResolver;
var init_endpointResolver = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/endpoint/endpointResolver.js"() {
    init_dist_es12();
    init_dist_es11();
    init_ruleset();
    cache = new EndpointCache({
      size: 50,
      params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
    });
    defaultEndpointResolver = (endpointParams, context = {}) => {
      return cache.get(endpointParams, () => resolveEndpoint(ruleSet, {
        endpointParams,
        logger: context.logger
      }));
    };
    customEndpointFunctions.aws = awsEndpointFunctions;
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/runtimeConfig.shared.js
var getRuntimeConfig;
var init_runtimeConfig_shared = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/runtimeConfig.shared.js"() {
    init_dist_es14();
    init_dist_es10();
    init_dist_es13();
    init_dist_es18();
    init_dist_es8();
    init_dist_es7();
    init_httpAuthSchemeProvider();
    init_endpointResolver();
    getRuntimeConfig = (config) => {
      return {
        apiVersion: "2014-06-30",
        base64Decoder: (config == null ? void 0 : config.base64Decoder) ?? fromBase64,
        base64Encoder: (config == null ? void 0 : config.base64Encoder) ?? toBase64,
        disableHostPrefix: (config == null ? void 0 : config.disableHostPrefix) ?? false,
        endpointProvider: (config == null ? void 0 : config.endpointProvider) ?? defaultEndpointResolver,
        extensions: (config == null ? void 0 : config.extensions) ?? [],
        httpAuthSchemeProvider: (config == null ? void 0 : config.httpAuthSchemeProvider) ?? defaultCognitoIdentityHttpAuthSchemeProvider,
        httpAuthSchemes: (config == null ? void 0 : config.httpAuthSchemes) ?? [
          {
            schemeId: "aws.auth#sigv4",
            identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
            signer: new AwsSdkSigV4Signer()
          },
          {
            schemeId: "smithy.api#noAuth",
            identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
            signer: new NoAuthSigner()
          }
        ],
        logger: (config == null ? void 0 : config.logger) ?? new NoOpLogger(),
        serviceId: (config == null ? void 0 : config.serviceId) ?? "Cognito Identity",
        urlParser: (config == null ? void 0 : config.urlParser) ?? parseUrl,
        utf8Decoder: (config == null ? void 0 : config.utf8Decoder) ?? fromUtf8,
        utf8Encoder: (config == null ? void 0 : config.utf8Encoder) ?? toUtf8
      };
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/runtimeConfig.browser.js
var getRuntimeConfig2;
var init_runtimeConfig_browser = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/runtimeConfig.browser.js"() {
    init_package();
    init_module();
    init_dist_es22();
    init_dist_es16();
    init_dist_es9();
    init_dist_es23();
    init_dist_es24();
    init_dist_es20();
    init_runtimeConfig_shared();
    init_dist_es13();
    init_dist_es25();
    getRuntimeConfig2 = (config) => {
      const defaultsMode = resolveDefaultsModeConfig(config);
      const defaultConfigProvider = () => defaultsMode().then(loadConfigsForDefaultMode);
      const clientSharedValues = getRuntimeConfig(config);
      return {
        ...clientSharedValues,
        ...config,
        runtime: "browser",
        defaultsMode,
        bodyLengthChecker: (config == null ? void 0 : config.bodyLengthChecker) ?? calculateBodyLength,
        credentialDefaultProvider: (config == null ? void 0 : config.credentialDefaultProvider) ?? ((_) => () => Promise.reject(new Error("Credential is missing"))),
        defaultUserAgentProvider: (config == null ? void 0 : config.defaultUserAgentProvider) ?? createDefaultUserAgentProvider({ serviceId: clientSharedValues.serviceId, clientVersion: package_default.version }),
        maxAttempts: (config == null ? void 0 : config.maxAttempts) ?? DEFAULT_MAX_ATTEMPTS,
        region: (config == null ? void 0 : config.region) ?? invalidProvider("Region is missing"),
        requestHandler: FetchHttpHandler.create((config == null ? void 0 : config.requestHandler) ?? defaultConfigProvider),
        retryMode: (config == null ? void 0 : config.retryMode) ?? (async () => (await defaultConfigProvider()).retryMode || DEFAULT_RETRY_MODE),
        sha256: (config == null ? void 0 : config.sha256) ?? Sha256,
        streamCollector: (config == null ? void 0 : config.streamCollector) ?? streamCollector,
        useDualstackEndpoint: (config == null ? void 0 : config.useDualstackEndpoint) ?? (() => Promise.resolve(DEFAULT_USE_DUALSTACK_ENDPOINT)),
        useFipsEndpoint: (config == null ? void 0 : config.useFipsEndpoint) ?? (() => Promise.resolve(DEFAULT_USE_FIPS_ENDPOINT))
      };
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/auth/httpAuthExtensionConfiguration.js
var getHttpAuthExtensionConfiguration, resolveHttpAuthRuntimeConfig;
var init_httpAuthExtensionConfiguration = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/auth/httpAuthExtensionConfiguration.js"() {
    getHttpAuthExtensionConfiguration = (runtimeConfig) => {
      const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
      let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
      let _credentials = runtimeConfig.credentials;
      return {
        setHttpAuthScheme(httpAuthScheme) {
          const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
          if (index === -1) {
            _httpAuthSchemes.push(httpAuthScheme);
          } else {
            _httpAuthSchemes.splice(index, 1, httpAuthScheme);
          }
        },
        httpAuthSchemes() {
          return _httpAuthSchemes;
        },
        setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
          _httpAuthSchemeProvider = httpAuthSchemeProvider;
        },
        httpAuthSchemeProvider() {
          return _httpAuthSchemeProvider;
        },
        setCredentials(credentials) {
          _credentials = credentials;
        },
        credentials() {
          return _credentials;
        }
      };
    };
    resolveHttpAuthRuntimeConfig = (config) => {
      return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials()
      };
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/runtimeExtensions.js
var resolveRuntimeExtensions;
var init_runtimeExtensions = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/runtimeExtensions.js"() {
    init_dist_es26();
    init_dist_es();
    init_dist_es13();
    init_httpAuthExtensionConfiguration();
    resolveRuntimeExtensions = (runtimeConfig, extensions) => {
      const extensionConfiguration = Object.assign(getAwsRegionExtensionConfiguration(runtimeConfig), getDefaultExtensionConfiguration(runtimeConfig), getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
      extensions.forEach((extension) => extension.configure(extensionConfiguration));
      return Object.assign(runtimeConfig, resolveAwsRegionExtensionConfiguration(extensionConfiguration), resolveDefaultRuntimeConfig(extensionConfiguration), resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/CognitoIdentityClient.js
var CognitoIdentityClient;
var init_CognitoIdentityClient = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/CognitoIdentityClient.js"() {
    init_dist_es2();
    init_dist_es3();
    init_dist_es4();
    init_dist_es15();
    init_dist_es16();
    init_dist_es10();
    init_dist_es17();
    init_dist_es19();
    init_dist_es21();
    init_dist_es13();
    init_httpAuthSchemeProvider();
    init_EndpointParameters();
    init_runtimeConfig_browser();
    init_runtimeExtensions();
    CognitoIdentityClient = class extends Client {
      constructor(...[configuration]) {
        const _config_0 = getRuntimeConfig2(configuration || {});
        super(_config_0);
        __publicField(this, "config");
        this.initConfig = _config_0;
        const _config_1 = resolveClientEndpointParameters(_config_0);
        const _config_2 = resolveUserAgentConfig(_config_1);
        const _config_3 = resolveRetryConfig(_config_2);
        const _config_4 = resolveRegionConfig(_config_3);
        const _config_5 = resolveHostHeaderConfig(_config_4);
        const _config_6 = resolveEndpointConfig(_config_5);
        const _config_7 = resolveHttpAuthSchemeConfig(_config_6);
        const _config_8 = resolveRuntimeExtensions(_config_7, (configuration == null ? void 0 : configuration.extensions) || []);
        this.config = _config_8;
        this.middlewareStack.use(getUserAgentPlugin(this.config));
        this.middlewareStack.use(getRetryPlugin(this.config));
        this.middlewareStack.use(getContentLengthPlugin(this.config));
        this.middlewareStack.use(getHostHeaderPlugin(this.config));
        this.middlewareStack.use(getLoggerPlugin(this.config));
        this.middlewareStack.use(getRecursionDetectionPlugin(this.config));
        this.middlewareStack.use(getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
          httpAuthSchemeParametersProvider: defaultCognitoIdentityHttpAuthSchemeParametersProvider,
          identityProviderConfigProvider: async (config) => new DefaultIdentityProviderConfig({
            "aws.auth#sigv4": config.credentials
          })
        }));
        this.middlewareStack.use(getHttpSigningPlugin(this.config));
      }
      destroy() {
        super.destroy();
      }
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/models/CognitoIdentityServiceException.js
var CognitoIdentityServiceException;
var init_CognitoIdentityServiceException = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/models/CognitoIdentityServiceException.js"() {
    init_dist_es13();
    CognitoIdentityServiceException = class _CognitoIdentityServiceException extends ServiceException {
      constructor(options) {
        super(options);
        Object.setPrototypeOf(this, _CognitoIdentityServiceException.prototype);
      }
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/models/models_0.js
var InternalErrorException, InvalidParameterException, LimitExceededException, NotAuthorizedException, ResourceConflictException, TooManyRequestsException, ResourceNotFoundException, ExternalServiceException, InvalidIdentityPoolConfigurationException, DeveloperUserAlreadyRegisteredException, ConcurrentModificationException, GetCredentialsForIdentityInputFilterSensitiveLog, CredentialsFilterSensitiveLog, GetCredentialsForIdentityResponseFilterSensitiveLog, GetIdInputFilterSensitiveLog, GetOpenIdTokenInputFilterSensitiveLog, GetOpenIdTokenResponseFilterSensitiveLog, GetOpenIdTokenForDeveloperIdentityInputFilterSensitiveLog, GetOpenIdTokenForDeveloperIdentityResponseFilterSensitiveLog, UnlinkIdentityInputFilterSensitiveLog;
var init_models_0 = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/models/models_0.js"() {
    init_dist_es13();
    init_CognitoIdentityServiceException();
    InternalErrorException = class _InternalErrorException extends CognitoIdentityServiceException {
      constructor(opts) {
        super({
          name: "InternalErrorException",
          $fault: "server",
          ...opts
        });
        __publicField(this, "name", "InternalErrorException");
        __publicField(this, "$fault", "server");
        Object.setPrototypeOf(this, _InternalErrorException.prototype);
      }
    };
    InvalidParameterException = class _InvalidParameterException extends CognitoIdentityServiceException {
      constructor(opts) {
        super({
          name: "InvalidParameterException",
          $fault: "client",
          ...opts
        });
        __publicField(this, "name", "InvalidParameterException");
        __publicField(this, "$fault", "client");
        Object.setPrototypeOf(this, _InvalidParameterException.prototype);
      }
    };
    LimitExceededException = class _LimitExceededException extends CognitoIdentityServiceException {
      constructor(opts) {
        super({
          name: "LimitExceededException",
          $fault: "client",
          ...opts
        });
        __publicField(this, "name", "LimitExceededException");
        __publicField(this, "$fault", "client");
        Object.setPrototypeOf(this, _LimitExceededException.prototype);
      }
    };
    NotAuthorizedException = class _NotAuthorizedException extends CognitoIdentityServiceException {
      constructor(opts) {
        super({
          name: "NotAuthorizedException",
          $fault: "client",
          ...opts
        });
        __publicField(this, "name", "NotAuthorizedException");
        __publicField(this, "$fault", "client");
        Object.setPrototypeOf(this, _NotAuthorizedException.prototype);
      }
    };
    ResourceConflictException = class _ResourceConflictException extends CognitoIdentityServiceException {
      constructor(opts) {
        super({
          name: "ResourceConflictException",
          $fault: "client",
          ...opts
        });
        __publicField(this, "name", "ResourceConflictException");
        __publicField(this, "$fault", "client");
        Object.setPrototypeOf(this, _ResourceConflictException.prototype);
      }
    };
    TooManyRequestsException = class _TooManyRequestsException extends CognitoIdentityServiceException {
      constructor(opts) {
        super({
          name: "TooManyRequestsException",
          $fault: "client",
          ...opts
        });
        __publicField(this, "name", "TooManyRequestsException");
        __publicField(this, "$fault", "client");
        Object.setPrototypeOf(this, _TooManyRequestsException.prototype);
      }
    };
    ResourceNotFoundException = class _ResourceNotFoundException extends CognitoIdentityServiceException {
      constructor(opts) {
        super({
          name: "ResourceNotFoundException",
          $fault: "client",
          ...opts
        });
        __publicField(this, "name", "ResourceNotFoundException");
        __publicField(this, "$fault", "client");
        Object.setPrototypeOf(this, _ResourceNotFoundException.prototype);
      }
    };
    ExternalServiceException = class _ExternalServiceException extends CognitoIdentityServiceException {
      constructor(opts) {
        super({
          name: "ExternalServiceException",
          $fault: "client",
          ...opts
        });
        __publicField(this, "name", "ExternalServiceException");
        __publicField(this, "$fault", "client");
        Object.setPrototypeOf(this, _ExternalServiceException.prototype);
      }
    };
    InvalidIdentityPoolConfigurationException = class _InvalidIdentityPoolConfigurationException extends CognitoIdentityServiceException {
      constructor(opts) {
        super({
          name: "InvalidIdentityPoolConfigurationException",
          $fault: "client",
          ...opts
        });
        __publicField(this, "name", "InvalidIdentityPoolConfigurationException");
        __publicField(this, "$fault", "client");
        Object.setPrototypeOf(this, _InvalidIdentityPoolConfigurationException.prototype);
      }
    };
    DeveloperUserAlreadyRegisteredException = class _DeveloperUserAlreadyRegisteredException extends CognitoIdentityServiceException {
      constructor(opts) {
        super({
          name: "DeveloperUserAlreadyRegisteredException",
          $fault: "client",
          ...opts
        });
        __publicField(this, "name", "DeveloperUserAlreadyRegisteredException");
        __publicField(this, "$fault", "client");
        Object.setPrototypeOf(this, _DeveloperUserAlreadyRegisteredException.prototype);
      }
    };
    ConcurrentModificationException = class _ConcurrentModificationException extends CognitoIdentityServiceException {
      constructor(opts) {
        super({
          name: "ConcurrentModificationException",
          $fault: "client",
          ...opts
        });
        __publicField(this, "name", "ConcurrentModificationException");
        __publicField(this, "$fault", "client");
        Object.setPrototypeOf(this, _ConcurrentModificationException.prototype);
      }
    };
    GetCredentialsForIdentityInputFilterSensitiveLog = (obj) => ({
      ...obj,
      ...obj.Logins && { Logins: SENSITIVE_STRING }
    });
    CredentialsFilterSensitiveLog = (obj) => ({
      ...obj,
      ...obj.SecretKey && { SecretKey: SENSITIVE_STRING }
    });
    GetCredentialsForIdentityResponseFilterSensitiveLog = (obj) => ({
      ...obj,
      ...obj.Credentials && { Credentials: CredentialsFilterSensitiveLog(obj.Credentials) }
    });
    GetIdInputFilterSensitiveLog = (obj) => ({
      ...obj,
      ...obj.Logins && { Logins: SENSITIVE_STRING }
    });
    GetOpenIdTokenInputFilterSensitiveLog = (obj) => ({
      ...obj,
      ...obj.Logins && { Logins: SENSITIVE_STRING }
    });
    GetOpenIdTokenResponseFilterSensitiveLog = (obj) => ({
      ...obj,
      ...obj.Token && { Token: SENSITIVE_STRING }
    });
    GetOpenIdTokenForDeveloperIdentityInputFilterSensitiveLog = (obj) => ({
      ...obj,
      ...obj.Logins && { Logins: SENSITIVE_STRING }
    });
    GetOpenIdTokenForDeveloperIdentityResponseFilterSensitiveLog = (obj) => ({
      ...obj,
      ...obj.Token && { Token: SENSITIVE_STRING }
    });
    UnlinkIdentityInputFilterSensitiveLog = (obj) => ({
      ...obj,
      ...obj.Logins && { Logins: SENSITIVE_STRING }
    });
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/protocols/Aws_json1_1.js
function sharedHeaders(operation) {
  return {
    "content-type": "application/x-amz-json-1.1",
    "x-amz-target": `AWSCognitoIdentityService.${operation}`
  };
}
var se_CreateIdentityPoolCommand, se_DeleteIdentitiesCommand, se_DeleteIdentityPoolCommand, se_DescribeIdentityCommand, se_DescribeIdentityPoolCommand, se_GetCredentialsForIdentityCommand, se_GetIdCommand, se_GetIdentityPoolRolesCommand, se_GetOpenIdTokenCommand, se_GetOpenIdTokenForDeveloperIdentityCommand, se_GetPrincipalTagAttributeMapCommand, se_ListIdentitiesCommand, se_ListIdentityPoolsCommand, se_ListTagsForResourceCommand, se_LookupDeveloperIdentityCommand, se_MergeDeveloperIdentitiesCommand, se_SetIdentityPoolRolesCommand, se_SetPrincipalTagAttributeMapCommand, se_TagResourceCommand, se_UnlinkDeveloperIdentityCommand, se_UnlinkIdentityCommand, se_UntagResourceCommand, se_UpdateIdentityPoolCommand, de_CreateIdentityPoolCommand, de_DeleteIdentitiesCommand, de_DeleteIdentityPoolCommand, de_DescribeIdentityCommand, de_DescribeIdentityPoolCommand, de_GetCredentialsForIdentityCommand, de_GetIdCommand, de_GetIdentityPoolRolesCommand, de_GetOpenIdTokenCommand, de_GetOpenIdTokenForDeveloperIdentityCommand, de_GetPrincipalTagAttributeMapCommand, de_ListIdentitiesCommand, de_ListIdentityPoolsCommand, de_ListTagsForResourceCommand, de_LookupDeveloperIdentityCommand, de_MergeDeveloperIdentitiesCommand, de_SetIdentityPoolRolesCommand, de_SetPrincipalTagAttributeMapCommand, de_TagResourceCommand, de_UnlinkDeveloperIdentityCommand, de_UnlinkIdentityCommand, de_UntagResourceCommand, de_UpdateIdentityPoolCommand, de_CommandError, de_ConcurrentModificationExceptionRes, de_DeveloperUserAlreadyRegisteredExceptionRes, de_ExternalServiceExceptionRes, de_InternalErrorExceptionRes, de_InvalidIdentityPoolConfigurationExceptionRes, de_InvalidParameterExceptionRes, de_LimitExceededExceptionRes, de_NotAuthorizedExceptionRes, de_ResourceConflictExceptionRes, de_ResourceNotFoundExceptionRes, de_TooManyRequestsExceptionRes, de_Credentials, de_GetCredentialsForIdentityResponse, de_IdentitiesList, de_IdentityDescription, de_ListIdentitiesResponse, deserializeMetadata, throwDefaultError, buildHttpRpcRequest;
var init_Aws_json1_1 = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/protocols/Aws_json1_1.js"() {
    init_dist_es14();
    init_dist_es();
    init_dist_es13();
    init_CognitoIdentityServiceException();
    init_models_0();
    se_CreateIdentityPoolCommand = async (input, context) => {
      const headers = sharedHeaders("CreateIdentityPool");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_DeleteIdentitiesCommand = async (input, context) => {
      const headers = sharedHeaders("DeleteIdentities");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_DeleteIdentityPoolCommand = async (input, context) => {
      const headers = sharedHeaders("DeleteIdentityPool");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_DescribeIdentityCommand = async (input, context) => {
      const headers = sharedHeaders("DescribeIdentity");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_DescribeIdentityPoolCommand = async (input, context) => {
      const headers = sharedHeaders("DescribeIdentityPool");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_GetCredentialsForIdentityCommand = async (input, context) => {
      const headers = sharedHeaders("GetCredentialsForIdentity");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_GetIdCommand = async (input, context) => {
      const headers = sharedHeaders("GetId");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_GetIdentityPoolRolesCommand = async (input, context) => {
      const headers = sharedHeaders("GetIdentityPoolRoles");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_GetOpenIdTokenCommand = async (input, context) => {
      const headers = sharedHeaders("GetOpenIdToken");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_GetOpenIdTokenForDeveloperIdentityCommand = async (input, context) => {
      const headers = sharedHeaders("GetOpenIdTokenForDeveloperIdentity");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_GetPrincipalTagAttributeMapCommand = async (input, context) => {
      const headers = sharedHeaders("GetPrincipalTagAttributeMap");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_ListIdentitiesCommand = async (input, context) => {
      const headers = sharedHeaders("ListIdentities");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_ListIdentityPoolsCommand = async (input, context) => {
      const headers = sharedHeaders("ListIdentityPools");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_ListTagsForResourceCommand = async (input, context) => {
      const headers = sharedHeaders("ListTagsForResource");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_LookupDeveloperIdentityCommand = async (input, context) => {
      const headers = sharedHeaders("LookupDeveloperIdentity");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_MergeDeveloperIdentitiesCommand = async (input, context) => {
      const headers = sharedHeaders("MergeDeveloperIdentities");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_SetIdentityPoolRolesCommand = async (input, context) => {
      const headers = sharedHeaders("SetIdentityPoolRoles");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_SetPrincipalTagAttributeMapCommand = async (input, context) => {
      const headers = sharedHeaders("SetPrincipalTagAttributeMap");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_TagResourceCommand = async (input, context) => {
      const headers = sharedHeaders("TagResource");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_UnlinkDeveloperIdentityCommand = async (input, context) => {
      const headers = sharedHeaders("UnlinkDeveloperIdentity");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_UnlinkIdentityCommand = async (input, context) => {
      const headers = sharedHeaders("UnlinkIdentity");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_UntagResourceCommand = async (input, context) => {
      const headers = sharedHeaders("UntagResource");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    se_UpdateIdentityPoolCommand = async (input, context) => {
      const headers = sharedHeaders("UpdateIdentityPool");
      let body;
      body = JSON.stringify(_json(input));
      return buildHttpRpcRequest(context, headers, "/", void 0, body);
    };
    de_CreateIdentityPoolCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_DeleteIdentitiesCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_DeleteIdentityPoolCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await collectBody(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    };
    de_DescribeIdentityCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = de_IdentityDescription(data, context);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_DescribeIdentityPoolCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_GetCredentialsForIdentityCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = de_GetCredentialsForIdentityResponse(data, context);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_GetIdCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_GetIdentityPoolRolesCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_GetOpenIdTokenCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_GetOpenIdTokenForDeveloperIdentityCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_GetPrincipalTagAttributeMapCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_ListIdentitiesCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = de_ListIdentitiesResponse(data, context);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_ListIdentityPoolsCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_ListTagsForResourceCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_LookupDeveloperIdentityCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_MergeDeveloperIdentitiesCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_SetIdentityPoolRolesCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await collectBody(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    };
    de_SetPrincipalTagAttributeMapCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_TagResourceCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_UnlinkDeveloperIdentityCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await collectBody(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    };
    de_UnlinkIdentityCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      await collectBody(output.body, context);
      const response = {
        $metadata: deserializeMetadata(output)
      };
      return response;
    };
    de_UntagResourceCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_UpdateIdentityPoolCommand = async (output, context) => {
      if (output.statusCode >= 300) {
        return de_CommandError(output, context);
      }
      const data = await parseJsonBody(output.body, context);
      let contents = {};
      contents = _json(data);
      const response = {
        $metadata: deserializeMetadata(output),
        ...contents
      };
      return response;
    };
    de_CommandError = async (output, context) => {
      const parsedOutput = {
        ...output,
        body: await parseJsonErrorBody(output.body, context)
      };
      const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
      switch (errorCode) {
        case "InternalErrorException":
        case "com.amazonaws.cognitoidentity#InternalErrorException":
          throw await de_InternalErrorExceptionRes(parsedOutput, context);
        case "InvalidParameterException":
        case "com.amazonaws.cognitoidentity#InvalidParameterException":
          throw await de_InvalidParameterExceptionRes(parsedOutput, context);
        case "LimitExceededException":
        case "com.amazonaws.cognitoidentity#LimitExceededException":
          throw await de_LimitExceededExceptionRes(parsedOutput, context);
        case "NotAuthorizedException":
        case "com.amazonaws.cognitoidentity#NotAuthorizedException":
          throw await de_NotAuthorizedExceptionRes(parsedOutput, context);
        case "ResourceConflictException":
        case "com.amazonaws.cognitoidentity#ResourceConflictException":
          throw await de_ResourceConflictExceptionRes(parsedOutput, context);
        case "TooManyRequestsException":
        case "com.amazonaws.cognitoidentity#TooManyRequestsException":
          throw await de_TooManyRequestsExceptionRes(parsedOutput, context);
        case "ResourceNotFoundException":
        case "com.amazonaws.cognitoidentity#ResourceNotFoundException":
          throw await de_ResourceNotFoundExceptionRes(parsedOutput, context);
        case "ExternalServiceException":
        case "com.amazonaws.cognitoidentity#ExternalServiceException":
          throw await de_ExternalServiceExceptionRes(parsedOutput, context);
        case "InvalidIdentityPoolConfigurationException":
        case "com.amazonaws.cognitoidentity#InvalidIdentityPoolConfigurationException":
          throw await de_InvalidIdentityPoolConfigurationExceptionRes(parsedOutput, context);
        case "DeveloperUserAlreadyRegisteredException":
        case "com.amazonaws.cognitoidentity#DeveloperUserAlreadyRegisteredException":
          throw await de_DeveloperUserAlreadyRegisteredExceptionRes(parsedOutput, context);
        case "ConcurrentModificationException":
        case "com.amazonaws.cognitoidentity#ConcurrentModificationException":
          throw await de_ConcurrentModificationExceptionRes(parsedOutput, context);
        default:
          const parsedBody = parsedOutput.body;
          return throwDefaultError({
            output,
            parsedBody,
            errorCode
          });
      }
    };
    de_ConcurrentModificationExceptionRes = async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = _json(body);
      const exception = new ConcurrentModificationException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return decorateServiceException(exception, body);
    };
    de_DeveloperUserAlreadyRegisteredExceptionRes = async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = _json(body);
      const exception = new DeveloperUserAlreadyRegisteredException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return decorateServiceException(exception, body);
    };
    de_ExternalServiceExceptionRes = async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = _json(body);
      const exception = new ExternalServiceException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return decorateServiceException(exception, body);
    };
    de_InternalErrorExceptionRes = async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = _json(body);
      const exception = new InternalErrorException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return decorateServiceException(exception, body);
    };
    de_InvalidIdentityPoolConfigurationExceptionRes = async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = _json(body);
      const exception = new InvalidIdentityPoolConfigurationException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return decorateServiceException(exception, body);
    };
    de_InvalidParameterExceptionRes = async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = _json(body);
      const exception = new InvalidParameterException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return decorateServiceException(exception, body);
    };
    de_LimitExceededExceptionRes = async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = _json(body);
      const exception = new LimitExceededException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return decorateServiceException(exception, body);
    };
    de_NotAuthorizedExceptionRes = async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = _json(body);
      const exception = new NotAuthorizedException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return decorateServiceException(exception, body);
    };
    de_ResourceConflictExceptionRes = async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = _json(body);
      const exception = new ResourceConflictException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return decorateServiceException(exception, body);
    };
    de_ResourceNotFoundExceptionRes = async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = _json(body);
      const exception = new ResourceNotFoundException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return decorateServiceException(exception, body);
    };
    de_TooManyRequestsExceptionRes = async (parsedOutput, context) => {
      const body = parsedOutput.body;
      const deserialized = _json(body);
      const exception = new TooManyRequestsException({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
      });
      return decorateServiceException(exception, body);
    };
    de_Credentials = (output, context) => {
      return take(output, {
        AccessKeyId: expectString,
        Expiration: (_) => expectNonNull(parseEpochTimestamp(expectNumber(_))),
        SecretKey: expectString,
        SessionToken: expectString
      });
    };
    de_GetCredentialsForIdentityResponse = (output, context) => {
      return take(output, {
        Credentials: (_) => de_Credentials(_, context),
        IdentityId: expectString
      });
    };
    de_IdentitiesList = (output, context) => {
      const retVal = (output || []).filter((e2) => e2 != null).map((entry) => {
        return de_IdentityDescription(entry, context);
      });
      return retVal;
    };
    de_IdentityDescription = (output, context) => {
      return take(output, {
        CreationDate: (_) => expectNonNull(parseEpochTimestamp(expectNumber(_))),
        IdentityId: expectString,
        LastModifiedDate: (_) => expectNonNull(parseEpochTimestamp(expectNumber(_))),
        Logins: _json
      });
    };
    de_ListIdentitiesResponse = (output, context) => {
      return take(output, {
        Identities: (_) => de_IdentitiesList(_, context),
        IdentityPoolId: expectString,
        NextToken: expectString
      });
    };
    deserializeMetadata = (output) => ({
      httpStatusCode: output.statusCode,
      requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
      extendedRequestId: output.headers["x-amz-id-2"],
      cfId: output.headers["x-amz-cf-id"]
    });
    throwDefaultError = withBaseException(CognitoIdentityServiceException);
    buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
      const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
      const contents = {
        protocol,
        hostname,
        port,
        method: "POST",
        path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
        headers
      };
      if (resolvedHostname !== void 0) {
        contents.hostname = resolvedHostname;
      }
      if (body !== void 0) {
        contents.body = body;
      }
      return new HttpRequest(contents);
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/CreateIdentityPoolCommand.js
var CreateIdentityPoolCommand;
var init_CreateIdentityPoolCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/CreateIdentityPoolCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    CreateIdentityPoolCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "CreateIdentityPool", {}).n("CognitoIdentityClient", "CreateIdentityPoolCommand").f(void 0, void 0).ser(se_CreateIdentityPoolCommand).de(de_CreateIdentityPoolCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/DeleteIdentitiesCommand.js
var DeleteIdentitiesCommand;
var init_DeleteIdentitiesCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/DeleteIdentitiesCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    DeleteIdentitiesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "DeleteIdentities", {}).n("CognitoIdentityClient", "DeleteIdentitiesCommand").f(void 0, void 0).ser(se_DeleteIdentitiesCommand).de(de_DeleteIdentitiesCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/DeleteIdentityPoolCommand.js
var DeleteIdentityPoolCommand;
var init_DeleteIdentityPoolCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/DeleteIdentityPoolCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    DeleteIdentityPoolCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "DeleteIdentityPool", {}).n("CognitoIdentityClient", "DeleteIdentityPoolCommand").f(void 0, void 0).ser(se_DeleteIdentityPoolCommand).de(de_DeleteIdentityPoolCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/DescribeIdentityCommand.js
var DescribeIdentityCommand;
var init_DescribeIdentityCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/DescribeIdentityCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    DescribeIdentityCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "DescribeIdentity", {}).n("CognitoIdentityClient", "DescribeIdentityCommand").f(void 0, void 0).ser(se_DescribeIdentityCommand).de(de_DescribeIdentityCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/DescribeIdentityPoolCommand.js
var DescribeIdentityPoolCommand;
var init_DescribeIdentityPoolCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/DescribeIdentityPoolCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    DescribeIdentityPoolCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "DescribeIdentityPool", {}).n("CognitoIdentityClient", "DescribeIdentityPoolCommand").f(void 0, void 0).ser(se_DescribeIdentityPoolCommand).de(de_DescribeIdentityPoolCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/GetCredentialsForIdentityCommand.js
var GetCredentialsForIdentityCommand;
var init_GetCredentialsForIdentityCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/GetCredentialsForIdentityCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_models_0();
    init_Aws_json1_1();
    GetCredentialsForIdentityCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "GetCredentialsForIdentity", {}).n("CognitoIdentityClient", "GetCredentialsForIdentityCommand").f(GetCredentialsForIdentityInputFilterSensitiveLog, GetCredentialsForIdentityResponseFilterSensitiveLog).ser(se_GetCredentialsForIdentityCommand).de(de_GetCredentialsForIdentityCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/GetIdCommand.js
var GetIdCommand;
var init_GetIdCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/GetIdCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_models_0();
    init_Aws_json1_1();
    GetIdCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "GetId", {}).n("CognitoIdentityClient", "GetIdCommand").f(GetIdInputFilterSensitiveLog, void 0).ser(se_GetIdCommand).de(de_GetIdCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/GetIdentityPoolRolesCommand.js
var GetIdentityPoolRolesCommand;
var init_GetIdentityPoolRolesCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/GetIdentityPoolRolesCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    GetIdentityPoolRolesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "GetIdentityPoolRoles", {}).n("CognitoIdentityClient", "GetIdentityPoolRolesCommand").f(void 0, void 0).ser(se_GetIdentityPoolRolesCommand).de(de_GetIdentityPoolRolesCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/GetOpenIdTokenCommand.js
var GetOpenIdTokenCommand;
var init_GetOpenIdTokenCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/GetOpenIdTokenCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_models_0();
    init_Aws_json1_1();
    GetOpenIdTokenCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "GetOpenIdToken", {}).n("CognitoIdentityClient", "GetOpenIdTokenCommand").f(GetOpenIdTokenInputFilterSensitiveLog, GetOpenIdTokenResponseFilterSensitiveLog).ser(se_GetOpenIdTokenCommand).de(de_GetOpenIdTokenCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/GetOpenIdTokenForDeveloperIdentityCommand.js
var GetOpenIdTokenForDeveloperIdentityCommand;
var init_GetOpenIdTokenForDeveloperIdentityCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/GetOpenIdTokenForDeveloperIdentityCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_models_0();
    init_Aws_json1_1();
    GetOpenIdTokenForDeveloperIdentityCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "GetOpenIdTokenForDeveloperIdentity", {}).n("CognitoIdentityClient", "GetOpenIdTokenForDeveloperIdentityCommand").f(GetOpenIdTokenForDeveloperIdentityInputFilterSensitiveLog, GetOpenIdTokenForDeveloperIdentityResponseFilterSensitiveLog).ser(se_GetOpenIdTokenForDeveloperIdentityCommand).de(de_GetOpenIdTokenForDeveloperIdentityCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/GetPrincipalTagAttributeMapCommand.js
var GetPrincipalTagAttributeMapCommand;
var init_GetPrincipalTagAttributeMapCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/GetPrincipalTagAttributeMapCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    GetPrincipalTagAttributeMapCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "GetPrincipalTagAttributeMap", {}).n("CognitoIdentityClient", "GetPrincipalTagAttributeMapCommand").f(void 0, void 0).ser(se_GetPrincipalTagAttributeMapCommand).de(de_GetPrincipalTagAttributeMapCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/ListIdentitiesCommand.js
var ListIdentitiesCommand;
var init_ListIdentitiesCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/ListIdentitiesCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    ListIdentitiesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "ListIdentities", {}).n("CognitoIdentityClient", "ListIdentitiesCommand").f(void 0, void 0).ser(se_ListIdentitiesCommand).de(de_ListIdentitiesCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/ListIdentityPoolsCommand.js
var ListIdentityPoolsCommand;
var init_ListIdentityPoolsCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/ListIdentityPoolsCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    ListIdentityPoolsCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "ListIdentityPools", {}).n("CognitoIdentityClient", "ListIdentityPoolsCommand").f(void 0, void 0).ser(se_ListIdentityPoolsCommand).de(de_ListIdentityPoolsCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/ListTagsForResourceCommand.js
var ListTagsForResourceCommand;
var init_ListTagsForResourceCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/ListTagsForResourceCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    ListTagsForResourceCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "ListTagsForResource", {}).n("CognitoIdentityClient", "ListTagsForResourceCommand").f(void 0, void 0).ser(se_ListTagsForResourceCommand).de(de_ListTagsForResourceCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/LookupDeveloperIdentityCommand.js
var LookupDeveloperIdentityCommand;
var init_LookupDeveloperIdentityCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/LookupDeveloperIdentityCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    LookupDeveloperIdentityCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "LookupDeveloperIdentity", {}).n("CognitoIdentityClient", "LookupDeveloperIdentityCommand").f(void 0, void 0).ser(se_LookupDeveloperIdentityCommand).de(de_LookupDeveloperIdentityCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/MergeDeveloperIdentitiesCommand.js
var MergeDeveloperIdentitiesCommand;
var init_MergeDeveloperIdentitiesCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/MergeDeveloperIdentitiesCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    MergeDeveloperIdentitiesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "MergeDeveloperIdentities", {}).n("CognitoIdentityClient", "MergeDeveloperIdentitiesCommand").f(void 0, void 0).ser(se_MergeDeveloperIdentitiesCommand).de(de_MergeDeveloperIdentitiesCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/SetIdentityPoolRolesCommand.js
var SetIdentityPoolRolesCommand;
var init_SetIdentityPoolRolesCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/SetIdentityPoolRolesCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    SetIdentityPoolRolesCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "SetIdentityPoolRoles", {}).n("CognitoIdentityClient", "SetIdentityPoolRolesCommand").f(void 0, void 0).ser(se_SetIdentityPoolRolesCommand).de(de_SetIdentityPoolRolesCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/SetPrincipalTagAttributeMapCommand.js
var SetPrincipalTagAttributeMapCommand;
var init_SetPrincipalTagAttributeMapCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/SetPrincipalTagAttributeMapCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    SetPrincipalTagAttributeMapCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "SetPrincipalTagAttributeMap", {}).n("CognitoIdentityClient", "SetPrincipalTagAttributeMapCommand").f(void 0, void 0).ser(se_SetPrincipalTagAttributeMapCommand).de(de_SetPrincipalTagAttributeMapCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/TagResourceCommand.js
var TagResourceCommand;
var init_TagResourceCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/TagResourceCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    TagResourceCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "TagResource", {}).n("CognitoIdentityClient", "TagResourceCommand").f(void 0, void 0).ser(se_TagResourceCommand).de(de_TagResourceCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/UnlinkDeveloperIdentityCommand.js
var UnlinkDeveloperIdentityCommand;
var init_UnlinkDeveloperIdentityCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/UnlinkDeveloperIdentityCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    UnlinkDeveloperIdentityCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "UnlinkDeveloperIdentity", {}).n("CognitoIdentityClient", "UnlinkDeveloperIdentityCommand").f(void 0, void 0).ser(se_UnlinkDeveloperIdentityCommand).de(de_UnlinkDeveloperIdentityCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/UnlinkIdentityCommand.js
var UnlinkIdentityCommand;
var init_UnlinkIdentityCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/UnlinkIdentityCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_models_0();
    init_Aws_json1_1();
    UnlinkIdentityCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "UnlinkIdentity", {}).n("CognitoIdentityClient", "UnlinkIdentityCommand").f(UnlinkIdentityInputFilterSensitiveLog, void 0).ser(se_UnlinkIdentityCommand).de(de_UnlinkIdentityCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/UntagResourceCommand.js
var UntagResourceCommand;
var init_UntagResourceCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/UntagResourceCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    UntagResourceCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "UntagResource", {}).n("CognitoIdentityClient", "UntagResourceCommand").f(void 0, void 0).ser(se_UntagResourceCommand).de(de_UntagResourceCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/UpdateIdentityPoolCommand.js
var UpdateIdentityPoolCommand;
var init_UpdateIdentityPoolCommand = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/UpdateIdentityPoolCommand.js"() {
    init_dist_es19();
    init_dist_es6();
    init_dist_es13();
    init_EndpointParameters();
    init_Aws_json1_1();
    UpdateIdentityPoolCommand = class extends Command.classBuilder().ep(commonParams).m(function(Command2, cs, config, o2) {
      return [
        getSerdePlugin(config, this.serialize, this.deserialize),
        getEndpointPlugin(config, Command2.getEndpointParameterInstructions())
      ];
    }).s("AWSCognitoIdentityService", "UpdateIdentityPool", {}).n("CognitoIdentityClient", "UpdateIdentityPoolCommand").f(void 0, void 0).ser(se_UpdateIdentityPoolCommand).de(de_UpdateIdentityPoolCommand).build() {
    };
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/CognitoIdentity.js
var commands, CognitoIdentity;
var init_CognitoIdentity = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/CognitoIdentity.js"() {
    init_dist_es13();
    init_CognitoIdentityClient();
    init_CreateIdentityPoolCommand();
    init_DeleteIdentitiesCommand();
    init_DeleteIdentityPoolCommand();
    init_DescribeIdentityCommand();
    init_DescribeIdentityPoolCommand();
    init_GetCredentialsForIdentityCommand();
    init_GetIdCommand();
    init_GetIdentityPoolRolesCommand();
    init_GetOpenIdTokenCommand();
    init_GetOpenIdTokenForDeveloperIdentityCommand();
    init_GetPrincipalTagAttributeMapCommand();
    init_ListIdentitiesCommand();
    init_ListIdentityPoolsCommand();
    init_ListTagsForResourceCommand();
    init_LookupDeveloperIdentityCommand();
    init_MergeDeveloperIdentitiesCommand();
    init_SetIdentityPoolRolesCommand();
    init_SetPrincipalTagAttributeMapCommand();
    init_TagResourceCommand();
    init_UnlinkDeveloperIdentityCommand();
    init_UnlinkIdentityCommand();
    init_UntagResourceCommand();
    init_UpdateIdentityPoolCommand();
    commands = {
      CreateIdentityPoolCommand,
      DeleteIdentitiesCommand,
      DeleteIdentityPoolCommand,
      DescribeIdentityCommand,
      DescribeIdentityPoolCommand,
      GetCredentialsForIdentityCommand,
      GetIdCommand,
      GetIdentityPoolRolesCommand,
      GetOpenIdTokenCommand,
      GetOpenIdTokenForDeveloperIdentityCommand,
      GetPrincipalTagAttributeMapCommand,
      ListIdentitiesCommand,
      ListIdentityPoolsCommand,
      ListTagsForResourceCommand,
      LookupDeveloperIdentityCommand,
      MergeDeveloperIdentitiesCommand,
      SetIdentityPoolRolesCommand,
      SetPrincipalTagAttributeMapCommand,
      TagResourceCommand,
      UnlinkDeveloperIdentityCommand,
      UnlinkIdentityCommand,
      UntagResourceCommand,
      UpdateIdentityPoolCommand
    };
    CognitoIdentity = class extends CognitoIdentityClient {
    };
    createAggregatedClient(commands, CognitoIdentity);
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/index.js
var init_commands = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/commands/index.js"() {
    init_CreateIdentityPoolCommand();
    init_DeleteIdentitiesCommand();
    init_DeleteIdentityPoolCommand();
    init_DescribeIdentityCommand();
    init_DescribeIdentityPoolCommand();
    init_GetCredentialsForIdentityCommand();
    init_GetIdCommand();
    init_GetIdentityPoolRolesCommand();
    init_GetOpenIdTokenCommand();
    init_GetOpenIdTokenForDeveloperIdentityCommand();
    init_GetPrincipalTagAttributeMapCommand();
    init_ListIdentitiesCommand();
    init_ListIdentityPoolsCommand();
    init_ListTagsForResourceCommand();
    init_LookupDeveloperIdentityCommand();
    init_MergeDeveloperIdentitiesCommand();
    init_SetIdentityPoolRolesCommand();
    init_SetPrincipalTagAttributeMapCommand();
    init_TagResourceCommand();
    init_UnlinkDeveloperIdentityCommand();
    init_UnlinkIdentityCommand();
    init_UntagResourceCommand();
    init_UpdateIdentityPoolCommand();
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/pagination/Interfaces.js
var init_Interfaces = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/pagination/Interfaces.js"() {
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/pagination/ListIdentityPoolsPaginator.js
var paginateListIdentityPools;
var init_ListIdentityPoolsPaginator = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/pagination/ListIdentityPoolsPaginator.js"() {
    init_dist_es10();
    init_CognitoIdentityClient();
    init_ListIdentityPoolsCommand();
    paginateListIdentityPools = createPaginator(CognitoIdentityClient, ListIdentityPoolsCommand, "NextToken", "NextToken", "MaxResults");
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/pagination/index.js
var init_pagination = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/pagination/index.js"() {
    init_Interfaces();
    init_ListIdentityPoolsPaginator();
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/models/index.js
var init_models = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/models/index.js"() {
    init_models_0();
  }
});

// node_modules/@aws-sdk/client-cognito-identity/dist-es/index.js
var init_dist_es27 = __esm({
  "node_modules/@aws-sdk/client-cognito-identity/dist-es/index.js"() {
    init_CognitoIdentityClient();
    init_CognitoIdentity();
    init_commands();
    init_pagination();
    init_models();
    init_CognitoIdentityServiceException();
  }
});

// node_modules/@aws-sdk/credential-provider-cognito-identity/dist-es/loadCognitoIdentity.js
var init_loadCognitoIdentity = __esm({
  "node_modules/@aws-sdk/credential-provider-cognito-identity/dist-es/loadCognitoIdentity.js"() {
    init_dist_es27();
  }
});
init_loadCognitoIdentity();
export {
  CognitoIdentityClient,
  GetCredentialsForIdentityCommand,
  GetIdCommand
};
//# sourceMappingURL=loadCognitoIdentity-QJK74YZC.js.map
