define(['dart_sdk', 'packages/prettify/prettify', 'packages/m4d_components/m4d_components', 'packages/m4d_core/m4d_ioc', 'packages/m4d_core/core/interfaces', 'packages/m4d_core/m4d_core', 'packages/logging/logging', 'packages/console_log_handler/console_log_handler'], function(dart_sdk, prettify, m4d_components, m4d_ioc, interfaces, m4d_core, logging, console_log_handler) {
  'use strict';
  const core = dart_sdk.core;
  const html = dart_sdk.html;
  const _interceptors = dart_sdk._interceptors;
  const async = dart_sdk.async;
  const dart = dart_sdk.dart;
  const dartx = dart_sdk.dartx;
  const prettify$ = prettify.prettify;
  const m4d_components$ = m4d_components.m4d_components;
  const m4d_ioc$ = m4d_ioc.m4d_ioc;
  const core__interfaces = interfaces.core__interfaces;
  const m4d_core$ = m4d_core.m4d_core;
  const logging$ = logging.logging;
  const console_log_handler$ = console_log_handler.console_log_handler;
  const _root = Object.create(null);
  const main = Object.create(_root);
  const $classes = dartx.classes;
  const $toString = dartx.toString;
  const $baseUri = dartx.baseUri;
  const $containsKey = dartx.containsKey;
  const $replaceFirst = dartx.replaceFirst;
  const $_get = dartx._get;
  const $replaceWith = dartx.replaceWith;
  const $text = dartx.text;
  const $scrollTop = dartx.scrollTop;
  const $onClick = dartx.onClick;
  const $onScroll = dartx.onScroll;
  let JSArrayOfIOCModule = () => (JSArrayOfIOCModule = dart.constFn(_interceptors.JSArray$(m4d_ioc$.IOCModule)))();
  let MouseEventToNull = () => (MouseEventToNull = dart.constFn(dart.fnType(core.Null, [html.MouseEvent])))();
  let EventToNull = () => (EventToNull = dart.constFn(dart.fnType(core.Null, [html.Event])))();
  main.main = function() {
    return async.async(dart.dynamic, function* main$() {
      html.querySelector("body")[$classes].add("update-theme");
      main.configLogging();
      main.scrollChecker();
      main.enableTheme();
      prettify$.prettyPrint();
      m4d_ioc$.IOCContainer.bindModules(JSArrayOfIOCModule().of([new m4d_components$.CoreComponentsModule.new()]));
      let app = (yield m4d_core$.componentHandler().upgrade(core__interfaces.MaterialApplication));
      html.querySelector("body")[$classes].remove("update-theme");
      app.run();
    });
  };
  main.configLogging = function() {
    logging$.hierarchicalLoggingEnabled = false;
    logging$.Logger.root.level = logging$.Level.INFO;
    logging$.Logger.root.onRecord.listen(dart.bindCall(new console_log_handler$.LogConsoleHandler.new(), 'call'));
  };
  main.enableTheme = function() {
    let uri = core.Uri.parse(dart.toString(html.document[$baseUri]));
    if (dart.test(uri.queryParameters[$containsKey]("theme"))) {
      let link = html.LinkElement.new();
      link.rel = "stylesheet";
      link.id = "theme";
      let theme = uri.queryParameters[$_get]("theme")[$replaceFirst]("/", "");
      let isThemeOK = false;
      switch (theme) {
        case "desert":
        case "doxy":
        case "light":
        case "sons-of-obsidian":
        case "sunburst":
        {
          link.href = "packages/prettify/styles/" + theme + ".css";
          isThemeOK = true;
        }
      }
      if (isThemeOK) {
        let defaultTheme = html.LinkElement._check(html.querySelector("#theme"));
        if (defaultTheme != null) {
          defaultTheme[$replaceWith](link);
          html.querySelector("#themename")[$text] = theme;
        }
      }
    }
  };
  main.scrollChecker = function() {
    let body = html.HtmlElement._check(html.querySelector("body"));
    let content = html.HtmlElement._check(html.querySelector(".mdl-layout__content"));
    let shadow = html.HtmlElement._check(html.querySelector(".addscrollshadow"));
    let button = html.ButtonElement._check(html.querySelector("#totop"));
    if (content == null || shadow == null || button == null) {
      return;
    }
    button[$onClick].listen(dart.fn(_ => {
      content[$scrollTop] = 0;
    }, MouseEventToNull()));
    content[$onScroll].listen(dart.fn(event => {
      let top = content[$scrollTop];
      if (dart.notNull(top) > 25) {
        shadow[$classes].add("mdl-shadow--z2");
      } else {
        shadow[$classes].remove("mdl-shadow--z2");
      }
      if (dart.notNull(top) > 100) {
        body[$classes].add("add-back-to-top-button");
      } else {
        body[$classes].remove("add-back-to-top-button");
      }
    }, EventToNull()));
  };
  dart.trackLibraries("web/main.ddc", {
    "main.dart": main
  }, '{"version":3,"sourceRoot":"","sources":["main.dart"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAYc;AACV,MAAI,kBAAa,CAAC,iBAAe,IAAI,CAAC;AACtC,wBAAa;AAEb,wBAAa;AACb,sBAAW;AACX,2BAAW;AAGX,uCAA4B,CAAC,6BACzB,wCAAoB;AAGxB,UAA0B,OAAM,MAAM,0BAAgB,UAAU;AAEhE,MAAI,kBAAa,CAAC,iBAAe,OAAO,CAAC;AACzC,SAAG,IAAI;IACX;;;AAGI,0CAA6B;AAI7B,mBAAM,KAAK,MAAM,GAAG,cAAK,KAAK;AAC9B,mBAAM,KAAK,SAAS,OAAO,eAAC,IAAI,0CAAiB;EACrD;;AAGI,QAAU,MAAM,QAAG,MAAM,CAAC,cAAI,aAAQ,UAAQ;AAC9C,kBAAG,GAAG,gBAAgB,cAAY,CAAC,WAAU;AACzC,UAAsB,OAAO,AAAI,oBAAe;AAChD,UAAI,IAAI,GAAG;AACX,UAAI,GAAG,GAAG;AAEV,UAAa,QAAQ,GAAG,gBAAgB,QAAC,uBAAqB,CAAC,KAAI;AACnE,UAAK,YAAY;AAEjB,cAAO,KAAK;YACH;YACA;YACA;YACA;YACA;;AACD,cAAI,KAAK,GAAG,8BAA4B,KAAK;AAC7C,mBAAS,GAAG;;;AAGpB,UAAG,SAAS,EAAE;AACV,YAAsB,uCAAe,AAAI,kBAAa,CAAC;AACvD,YAAG,YAAY,IAAI,MAAM;AACrB,sBAAY,cAAY,CAAC,IAAI;AAE7B,UAAI,kBAAa,CAAC,oBAAkB,GAAG,KAAK;;;;EAK5D;;AAGI,QAAsB,+BAAO,AAAI,kBAAa,CAAC;AAC/C,QAAsB,kCAAU,AAAI,kBAAa,CAAC;AAClD,QAAsB,iCAAS,AAAI,kBAAa,CAAC;AACjD,QAAwB,mCAAS,AAAI,kBAAa,CAAC;AAEnD,QAAG,OAAO,IAAI,QAAQ,MAAM,IAAI,QAAQ,MAAM,IAAI,MAAM;AACpD;;AAGJ,UAAM,UAAQ,OAAO,CAAC,QAAC,CAAC;AACpB,aAAO,YAAU,GAAG;;AAGxB,WAAO,WAAS,OAAO,CAAC,QAAC,KAAqB;AAC1C,UAAU,MAAM,OAAO,YAAU;AAEjC,UAAO,aAAJ,GAAG,IAAG,IAAI;AACT,cAAM,UAAQ,IAAI,CAAC;aAChB;AACH,cAAM,UAAQ,OAAO,CAAC;;AAG1B,UAAO,aAAJ,GAAG,IAAG,KAAK;AACV,YAAI,UAAQ,IAAI,CAAC;aACd;AACH,YAAI,UAAQ,OAAO,CAAC;;;EAIhC","file":"main.ddc.js"}');
  // Exports:
  return {
    main: main
  };
});

//# sourceMappingURL=main.ddc.js.map
