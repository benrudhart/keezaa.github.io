/* global navigator, window, document, KeezaaI18n */
(function () {
    var i18n = KeezaaI18n.createI18n({
        defaultLocale: "en",
        messages: {
            de: {
                "referral.page_title": "{code} | Keezaa",
                "referral.page_title_invalid": "Empfehlungscode nicht erkannt | Keezaa",
                "referral.page_description": "Keezaa Seite für Empfehlungscode und Belohnung",
                "referral.main_title": "Keezaa - Die Kieser-Training App",
                "referral.code_lead": "Dein Empfehlungscode",
                "referral.reward_intro": "Dein Geschenk:",
                "referral.reward_title": "Nutze die App zwei Monate kostenlos 🎁",
                "referral.claim_steps_title": "So löst du die Belohnung ein",
                "referral.step_1_title": "1. App herunterladen",
                "referral.platform_note": "Sorry - die Keezaa App ist exklusiv für iPhone & Apple Watch entwickelt. Bitte öffne dies auf einem iPhone.",
                "referral.step_2_title": "2. App öffnen",
                "referral.open_in_app": "Keezaa öffnen",
                "referral.invalid_message": "Dein Empfehlungscode konnte leider nicht erkannt werden. Bitte frage die Person, die dich geworben hat, nach einem neuen Link.",
                "referral.store_badge_alt": "Download im App Store",
                "referral.claim_steps_aria_label": "Belohnung einlösen",
                "referral.copy_hint": "Tippen, um Code zu kopieren",
                "referral.copied_hint": "Kopiert",
                "referral.copy_success": "Code kopiert",
                "referral.copy_error": "Code konnte nicht kopiert werden"
            },
            en: {
                "referral.page_title": "{code} | Keezaa",
                "referral.page_title_invalid": "Referral code not recognized | Keezaa",
                "referral.page_description": "Keezaa page for referral code and reward",
                "referral.main_title": "Keezaa - The Kieser Training App",
                "referral.code_lead": "Your referral code",
                "referral.reward_intro": "Your reward:",
                "referral.reward_title": "Use the app free for two months 🎁",
                "referral.claim_steps_title": "How to claim your reward",
                "referral.step_1_title": "1. Download the app",
                "referral.platform_note": "Sorry - the Keezaa app is built exclusively for iPhone & Apple Watch. Please open this on an iPhone.",
                "referral.step_2_title": "2. Open the app",
                "referral.open_in_app": "Open Keezaa",
                "referral.invalid_message": "Your referral code could not be recognized. Please ask the person who referred you for a new link.",
                "referral.store_badge_alt": "Download on the App Store",
                "referral.claim_steps_aria_label": "Claim reward steps",
                "referral.copy_hint": "Tap to copy code",
                "referral.copied_hint": "Copied",
                "referral.copy_success": "Code copied",
                "referral.copy_error": "Could not copy code"
            }
        }
    });

    i18n.setDocumentLanguage();

    function detectIOSDevice() {
        var ua = navigator.userAgent || "";
        var platform = navigator.platform || "";
        var uaDataPlatform = (navigator.userAgentData && navigator.userAgentData.platform) || "";
        var iOSByUA = /iPhone|iPad|iPod/i.test(ua);
        var iOSByUAData = /iOS/i.test(uaDataPlatform);
        var iPadOSDesktopUA = platform === "MacIntel" && navigator.maxTouchPoints > 1;

        return iOSByUA || iOSByUAData || iPadOSDesktopUA;
    }

    function setNodeText(id, text) {
        var node = document.getElementById(id);
        if (node) {
            node.textContent = text;
        }
    }

    function localizeStaticCopy() {
        setNodeText("referral-main-title", i18n.t("referral.main_title"));
        setNodeText("referral-code-lead", i18n.t("referral.code_lead"));
        setNodeText("reward-intro-text", i18n.t("referral.reward_intro"));
        setNodeText("reward-title", i18n.t("referral.reward_title"));
        setNodeText("claim-steps-title", i18n.t("referral.claim_steps_title"));
        setNodeText("claim-step-1-title", i18n.t("referral.step_1_title"));
        setNodeText("claim-platform-note", i18n.t("referral.platform_note"));
        setNodeText("claim-step-2-title", i18n.t("referral.step_2_title"));
        setNodeText("claim-open-button-text", i18n.t("referral.open_in_app"));
        setNodeText("referral-invalid-message", i18n.t("referral.invalid_message"));

        var claimStepsSection = document.getElementById("claim-steps-section");
        if (claimStepsSection) {
            claimStepsSection.setAttribute("aria-label", i18n.t("referral.claim_steps_aria_label"));
        }

        var metaDescription = document.querySelector("meta[name='description']");
        if (metaDescription) {
            metaDescription.setAttribute("content", i18n.t("referral.page_description"));
        }

        var badgeImage = document.getElementById("referral-store-badge-img");
        if (badgeImage) {
            badgeImage.setAttribute("alt", i18n.t("referral.store_badge_alt"));
        }
    }

    function setPlatformSpecificUI(isIOS) {
        var claimCodeLink = document.getElementById("claim-code-link");
        var claimPlatformNote = document.getElementById("claim-platform-note");
        var claimStepsTitle = document.getElementById("claim-steps-title");
        var claimStep1Title = document.getElementById("claim-step-1-title");
        var claimStep2Title = document.getElementById("claim-step-2-title");
        var claimStep2Wrap = document.getElementById("claim-step-2-wrap");

        if (isIOS) {
            if (claimCodeLink) {
                claimCodeLink.classList.remove("is-hidden");
            }
            if (claimPlatformNote) {
                claimPlatformNote.classList.add("is-hidden");
            }
            if (claimStepsTitle) {
                claimStepsTitle.classList.remove("is-hidden");
            }
            if (claimStep1Title) {
                claimStep1Title.classList.remove("is-hidden");
            }
            if (claimStep2Title) {
                claimStep2Title.classList.remove("is-hidden");
            }
            if (claimStep2Wrap) {
                claimStep2Wrap.classList.remove("is-hidden");
            }
            return;
        }

        if (claimCodeLink) {
            claimCodeLink.classList.add("is-hidden");
        }
        if (claimPlatformNote) {
            claimPlatformNote.classList.remove("is-hidden");
        }
        if (claimStepsTitle) {
            claimStepsTitle.classList.add("is-hidden");
        }
        if (claimStep1Title) {
            claimStep1Title.classList.add("is-hidden");
        }
        if (claimStep2Title) {
            claimStep2Title.classList.add("is-hidden");
        }
        if (claimStep2Wrap) {
            claimStep2Wrap.classList.add("is-hidden");
        }
    }

    function setCodeView(safeCode) {
        var codeNode = document.getElementById("referral-code");
        if (!codeNode) {
            return null;
        }

        codeNode.textContent = "";
        for (var i = 0; i < safeCode.length; i += 1) {
            var letter = document.createElement("span");
            letter.className = "referral-code__char";
            letter.textContent = safeCode.charAt(i);
            codeNode.appendChild(letter);
        }

        codeNode.setAttribute("title", i18n.t("referral.copy_hint"));
        return codeNode;
    }

    function showValidView() {
        var validView = document.getElementById("referral-valid-view");
        var invalidMessage = document.getElementById("referral-invalid-message");

        if (validView) {
            validView.classList.remove("is-hidden");
        }
        if (invalidMessage) {
            invalidMessage.classList.add("is-hidden");
        }
    }

    function showInvalidView() {
        var validView = document.getElementById("referral-valid-view");
        var invalidMessage = document.getElementById("referral-invalid-message");

        if (validView) {
            validView.classList.add("is-hidden");
        }
        if (invalidMessage) {
            invalidMessage.classList.remove("is-hidden");
        }
        document.title = i18n.t("referral.page_title_invalid");
    }

    function applyClaimLink(code) {
        var claimCodeLink = document.getElementById("claim-code-link");
        if (claimCodeLink) {
            claimCodeLink.href = "https://keezaa.app/claim-code/?code=" + encodeURIComponent(code);
        }
    }

    function installCopyHandler(codeNode, code) {
        var copyFeedback = document.getElementById("referral-copy-feedback");

        function announce(message) {
            if (!copyFeedback) {
                return;
            }
            copyFeedback.textContent = "";
            window.setTimeout(function () {
                copyFeedback.textContent = message;
            }, 30);
        }

        function showCopiedState() {
            codeNode.classList.add("is-copied");
            codeNode.setAttribute("title", i18n.t("referral.copied_hint"));
            announce(i18n.t("referral.copy_success"));
            window.setTimeout(function () {
                codeNode.classList.remove("is-copied");
                codeNode.setAttribute("title", i18n.t("referral.copy_hint"));
            }, 1400);
        }

        codeNode.addEventListener("click", function () {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(code)
                    .then(showCopiedState)
                    .catch(function () {
                        announce(i18n.t("referral.copy_error"));
                    });
                return;
            }

            var fallbackInput = document.createElement("input");
            fallbackInput.value = code;
            document.body.appendChild(fallbackInput);
            fallbackInput.select();
            fallbackInput.setSelectionRange(0, code.length);

            if (document.execCommand("copy")) {
                showCopiedState();
            } else {
                announce(i18n.t("referral.copy_error"));
            }

            document.body.removeChild(fallbackInput);
        });
    }

    function init() {
        localizeStaticCopy();

        var params = new URLSearchParams(window.location.search);
        var rawCode = (params.get("code") || "").trim().toUpperCase();
        var isValid = /^[A-Z0-9]{3,12}$/.test(rawCode);

        if (!isValid) {
            showInvalidView();
            return;
        }

        var safeCode = rawCode;
        showValidView();
        document.title = i18n.t("referral.page_title", { code: safeCode });

        applyClaimLink(safeCode);
        setPlatformSpecificUI(detectIOSDevice());

        var codeNode = setCodeView(safeCode);
        if (codeNode) {
            installCopyHandler(codeNode, safeCode);
        }
    }

    init();
})();
