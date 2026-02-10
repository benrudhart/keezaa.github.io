(function () {
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
