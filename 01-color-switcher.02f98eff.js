!function(){var t;document.querySelector("[data-start]").addEventListener("click",(function(){document.querySelector("[data-start]").disabled=!0,document.querySelector("[data-stop]").disabled=!1,t=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),document.querySelector("[data-stop]").addEventListener("click",(function(){clearInterval(t),document.querySelector("[data-start]").disabled=!1,document.querySelector("[data-stop]").disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.02f98eff.js.map
