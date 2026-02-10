/* global window, document, URLSearchParams, KeezaaI18n */
(function () {
    var i18n = KeezaaI18n.createI18n({
        defaultLocale: "en",
        messages: {
            de: {
                "claim_code.page_title": "Code einlösen | Keezaa",
                "claim_code.page_description": "Einlöse-Link für Keezaa",
                "claim_code.title": "Keezaa öffnen",
                "claim_code.subtitle": "Falls sich die App nicht automatisch geöffnet hat, nutze bitte den Button unten.",
                "claim_code.code_label": "Code:",
                "claim_code.back_to_referral": "Zurück zur Empfehlungsseite"
            },
            en: {
                "claim_code.page_title": "Claim code | Keezaa",
                "claim_code.page_description": "Claim link for Keezaa",
                "claim_code.title": "Open Keezaa",
                "claim_code.subtitle": "If the app did not open automatically, please use the button below.",
                "claim_code.code_label": "Code:",
                "claim_code.back_to_referral": "Back to referral page"
            }
        }
    });

    i18n.setDocumentLanguage();

    function setNodeText(id, value) {
        var node = document.getElementById(id);
        if (node) {
            node.textContent = value;
        }
    }

    document.title = i18n.t("claim_code.page_title");
    setNodeText("claim-page-title", i18n.t("claim_code.title"));
    setNodeText("claim-page-subtitle", i18n.t("claim_code.subtitle"));
    setNodeText("claim-code-label", i18n.t("claim_code.code_label"));
    setNodeText("back-to-referral", i18n.t("claim_code.back_to_referral"));

    var metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
        metaDescription.setAttribute("content", i18n.t("claim_code.page_description"));
    }

    var params = new URLSearchParams(window.location.search);
    var rawCode = (params.get("code") || "").trim().toUpperCase();
    var safeCode = /^[A-Z0-9]{3,12}$/.test(rawCode) ? rawCode : "UNBEKANNT";

    var codeNode = document.getElementById("code-value");
    if (codeNode) {
        codeNode.textContent = safeCode;
    }

    var backLink = document.getElementById("back-to-referral");
    if (backLink && safeCode !== "UNBEKANNT") {
        backLink.href = "../referral.html?code=" + encodeURIComponent(safeCode);
    }
})();
