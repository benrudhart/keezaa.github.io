/* global navigator, window, document */
(function () {
    function detectIOSDevice() {
        var ua = navigator.userAgent || "";
        var platform = navigator.platform || "";
        var uaDataPlatform = (navigator.userAgentData && navigator.userAgentData.platform) || "";
        var iOSByUA = /iPhone|iPad|iPod/i.test(ua);
        var iOSByUAData = /iOS/i.test(uaDataPlatform);
        var iPadOSDesktopUA = platform === "MacIntel" && navigator.maxTouchPoints > 1;

        return iOSByUA || iOSByUAData || iPadOSDesktopUA;
    }

    function setPlatformSpecificUI(isIOS) {
        var claimCodeLink = document.getElementById("claim-code-link");
        var claimPlatformNote = document.getElementById("claim-platform-note");
        var claimStepsTitle = document.querySelector(".claim-steps__title");
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

        codeNode.setAttribute("title", "Tippen, um Code zu kopieren");
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
        document.title = "Empfehlungscode nicht erkannt | Keezaa";
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
            codeNode.setAttribute("title", "Kopiert");
            announce("Code kopiert");
            window.setTimeout(function () {
                codeNode.classList.remove("is-copied");
                codeNode.setAttribute("title", "Tippen, um Code zu kopieren");
            }, 1400);
        }

        codeNode.addEventListener("click", function () {
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(code)
                    .then(showCopiedState)
                    .catch(function () {
                        announce("Code konnte nicht kopiert werden");
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
                announce("Code konnte nicht kopiert werden");
            }

            document.body.removeChild(fallbackInput);
        });
    }

    function init() {
        var params = new URLSearchParams(window.location.search);
        var rawCode = (params.get("code") || "").trim().toUpperCase();
        var isValid = /^[A-Z0-9]{3,12}$/.test(rawCode);

        if (!isValid) {
            showInvalidView();
            return;
        }

        var safeCode = rawCode;
        showValidView();
        document.title = safeCode + " | Keezaa";

        applyClaimLink(safeCode);
        setPlatformSpecificUI(detectIOSDevice());

        var codeNode = setCodeView(safeCode);
        if (codeNode) {
            installCopyHandler(codeNode, safeCode);
        }
    }

    init();
})();
