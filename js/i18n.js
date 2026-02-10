(function (global) {
    function normalizeLocaleTag(tag) {
        return (tag || "").toLowerCase().replace("_", "-");
    }

    function findSupportedLocale(candidate, supportedLocales) {
        var normalized = normalizeLocaleTag(candidate);
        if (!normalized) {
            return null;
        }

        for (var i = 0; i < supportedLocales.length; i += 1) {
            if (normalizeLocaleTag(supportedLocales[i]) === normalized) {
                return supportedLocales[i];
            }
        }

        var language = normalized.split("-")[0];
        for (var j = 0; j < supportedLocales.length; j += 1) {
            if (normalizeLocaleTag(supportedLocales[j]).split("-")[0] === language) {
                return supportedLocales[j];
            }
        }

        return null;
    }

    function detectLocale(supportedLocales, defaultLocale) {
        var params = new URLSearchParams(window.location.search);
        var queryLocale = params.get("lang");
        var candidates = [];

        if (queryLocale) {
            candidates.push(queryLocale);
        }

        if (Array.isArray(navigator.languages)) {
            candidates = candidates.concat(navigator.languages);
        }
        if (navigator.language) {
            candidates.push(navigator.language);
        }

        for (var i = 0; i < candidates.length; i += 1) {
            var match = findSupportedLocale(candidates[i], supportedLocales);
            if (match) {
                return match;
            }
        }

        return defaultLocale;
    }

    function interpolate(template, variables) {
        if (!variables) {
            return template;
        }

        return String(template).replace(/\{([a-zA-Z0-9_]+)\}/g, function (_, key) {
            if (Object.prototype.hasOwnProperty.call(variables, key)) {
                return String(variables[key]);
            }
            return "";
        });
    }

    function createI18n(config) {
        var messages = config.messages || {};
        var supportedLocales = config.supportedLocales || Object.keys(messages);
        var defaultLocale = config.defaultLocale || supportedLocales[0] || "en";
        var locale = detectLocale(supportedLocales, defaultLocale);

        function t(key, variables) {
            var fallbackMessages = messages[defaultLocale] || {};
            var localeMessages = messages[locale] || {};
            var template = localeMessages[key];

            if (typeof template !== "string") {
                template = fallbackMessages[key];
            }
            if (typeof template !== "string") {
                return key;
            }

            return interpolate(template, variables);
        }

        function setDocumentLanguage() {
            if (document && document.documentElement) {
                document.documentElement.lang = locale;
            }
        }

        return {
            locale: locale,
            t: t,
            setDocumentLanguage: setDocumentLanguage
        };
    }

    global.KeezaaI18n = {
        createI18n: createI18n,
        detectLocale: detectLocale
    };
})(window);
