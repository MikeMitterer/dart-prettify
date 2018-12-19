library app;

import "dart:html" as dom;
import "dart:async";

import 'package:console_log_handler/console_log_handler.dart';

import 'package:m4d_core/m4d_ioc.dart' as ioc;
import 'package:m4d_components/m4d_components.dart';

import 'package:prettify/prettify.dart';

Future main() async {
    dom.querySelector("body").classes.add("update-theme");
    configLogging();

    scrollChecker();
    enableTheme();
    prettyPrint();

    // Initialize M4D
    ioc.Container.bindModules([
        CoreComponentsModule()
    ]);

    final MaterialApplication app = await componentHandler().upgrade();
    
    dom.querySelector("body").classes.remove("update-theme");
    app.run();
}

void configLogging() {
    hierarchicalLoggingEnabled = false; // set this to true - its part of Logging SDK

    // now control the logging.
    // Turn off all logging first
    Logger.root.level = Level.INFO;
    Logger.root.onRecord.listen(new LogConsoleHandler());
}

void enableTheme() {
    final Uri uri = Uri.parse(dom.document.baseUri.toString());
    if(uri.queryParameters.containsKey("theme")) {
        final dom.LinkElement link = new dom.LinkElement();
        link.rel = "stylesheet";
        link.id = "theme";

        final String theme = uri.queryParameters['theme'].replaceFirst("/","");
        bool isThemeOK = false;

        switch(theme) {
            case "desert":
            case "doxy":
            case "light":
            case "sons-of-obsidian":
            case "sunburst":
                link.href = "packages/prettify/styles/${theme}.css";
                isThemeOK = true;
        }

        if(isThemeOK) {
            final dom.LinkElement defaultTheme = dom.querySelector("#theme");
            if(defaultTheme != null) {
                defaultTheme.replaceWith(link);

                dom.querySelector("#themename").text = theme;
            }

        }
    }
}

void scrollChecker() {
    final dom.HtmlElement body = dom.querySelector("body");
    final dom.HtmlElement content = dom.querySelector(".mdl-layout__content");
    final dom.HtmlElement shadow = dom.querySelector(".addscrollshadow");
    final dom.ButtonElement button = dom.querySelector("#totop");

    if(content == null || shadow == null || button == null) {
        return;
    }

    button.onClick.listen((_) {
        content.scrollTop = 0;
    });

    content.onScroll.listen((final dom.Event event) {
        final int top = content.scrollTop;

        if(top > 25) {
            shadow.classes.add("mdl-shadow--z2");
        } else {
            shadow.classes.remove("mdl-shadow--z2");
        }

        if(top > 100) {
            body.classes.add("add-back-to-top-button");
        } else {
            body.classes.remove("add-back-to-top-button");
        }

    });
}