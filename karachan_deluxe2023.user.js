// ==UserScript==
// @name         Karachan Deluxe 2023
// @namespace    karachan.org
// @version      0.7.9
// @updateURL https://github.com/KDeluxe2023/KDeluxe2023/raw/main/karachan_deluxe2023.user.js
// @downloadURL https://github.com/KDeluxe2023/KDeluxe2023/raw/main/karachan_deluxe2023.user.js

// @description  Największe rozszerzenie z nowymi funkcjami do forum młodzieżowo katolickiego
// @author       anon zdrapkarz
// @match        *://*.karachan.org/*
// @exclude      http://www.karachan.org/*/src/*
// @exclude      https://www.karachan.org/*/src/*
// @exclude      http://karachan.org/*/src/*
// @exclude      https://karachan.org/*/src/*
// @icon         https://karachan.org/favicon.ico
// @run-at       document-start
// @license      MIT
// @grant        none
// @require      https://raw.githubusercontent.com/KDeluxe2023/KDeluxe2023/main/dependencies/html2canvas.min.js
// @require      https://raw.githubusercontent.com/KDeluxe2023/KDeluxe2023/main/dependencies/jszip.min.js
// @require      https://raw.githubusercontent.com/KDeluxe2023/KDeluxe2023/main/dependencies/FileSaver.min.js
// ==/UserScript==

// modules will be loaded at this commit in github repo via jsdelivr
const g_last_commit = "f990dbaf1992eca784814ecf9e5ff49b0d0fee8b";
const g_script_version = GM.info.script.version;

// dynamic module loader
function load_module(module_name, t, data_pass = "") {
    var a = document.createElement("script"),
        n = document.getElementsByTagName("script")[0];
    a.async = 1, a.onload = a.onreadystatechange = function(e, n) {
        (n || !a.readyState || /loaded|complete/.test(a.readyState)) && (a.onload = a.onreadystatechange = null, a = void 0, !n && t && setTimeout(t, 0))
    }, a.onerror = function(error) {
        alert(`KDeluxe napotkał błąd przy ładowaniu modułu: ${error.target.src}`);
    }, a.src = `https://cdn.jsdelivr.net/gh/KDeluxe2023/KDeluxe2023@${g_last_commit}/${module_name}.js`, a.setAttribute("data-pass", `${data_pass}`), n.parentNode.insertBefore(a, n)
}

// scripts must be prevented from loading before they actually load
var bsePd = window.addEventListener('beforescriptexecute', e => {
    e.target.removeEventListener('beforescriptexecute', bsePd);

    const filename_from_url = function(u) {
        return u.split('/').pop().split('#')[0].split('?')[0];
    };

    let filename = filename_from_url(e.target.src);
    if (!filename)
        return true;

    if (localStorage.o_kdeluxe_anti_bible == 1) {
        if (filename == "htmlshiv.js") {
            e.preventDefault();
            console.log(`[KDeluxe] htmlshiv.js was unloaded because Anti-Bible is active`);
        }
    }

    if (localStorage.o_kdeluxe_better_embed == 1) {
        if (filename == "emblite.js") {
            e.preventDefault();
            console.log(`[KDeluxe] emblite.js was unloaded because Better Embeds are active`);
        }
    }

    console.log(`[KDeluxe] Browser loaded a script: ${filename}`);
});

//// globals
// tells us if we're on a special page like search etc
var g_special_page = false;
// tells us if we're in catalog view
var g_is_in_catalog = false;
// tells us if we have a topic fully opened
var g_is_fred_open = false;
// holds user selected style
var g_style = localStorage.style;

// assign globals
let special_pages = ["catalog.html", "search.php", "/rs/", "/*/"];
let url_path = window.location.pathname;
for (const special_page_indicator of special_pages) {
    if (url_path.endsWith(special_page_indicator)) {
        g_special_page = true;

        // detect if we're in catalog
        if (url_path.endsWith("catalog.html"))
            g_is_in_catalog = true;
    }
}

if (window.location.toString().includes("/res/"))
    g_is_fred_open = true;

// print them for debug purposes
console.log(`[KDeluxe] g_special_page = ${g_special_page}`);
console.log(`[KDeluxe] g_is_in_catalog = ${g_is_in_catalog}`);
console.log(`[KDeluxe] g_is_fred_open = ${g_is_fred_open}`);

// actual script begins here
document.addEventListener('readystatechange', event => {
    if (event.target.readyState !== "complete")
        return;

    /*
    if (typeof jQuery === 'undefined') {
          // jQuery should be loaded at this point, something is wrong...
          console.log(`jQuery absent, aborting!`);
          return;
      } else {
          console.log(`[KDeluxe] jQuery v.${jQuery.fn.jquery} is present...`);
          console.log(`[KDeluxe] Loading modules...`);
      }*/
    //// write code below this line ////

    // draw version info
    document.querySelector(".group-options").insertAdjacentHTML('beforeend', `<div style="font-size: 10px;position:absolute">[KDeluxe v${g_script_version}]</div>`);

    // enforce full_compatibility
    if (localStorage.o_kdeluxe_full_compatibility == 1 && !g_special_page) {
        localStorage.o_loader = "0"
        localStorage.o_fastreply = "0";
        $(".expander").hide();
        if (g_is_fred_open) {
            localStorage.updtchbx = "";
            $(".updateCheck").prop("checked", false);
            $(".updateCheck").parent().hide();
            $(".updateLink").hide();
        }
    }

    // draw our own UI first
    load_module('user_interface', function() {
        // run filters after that
        if (localStorage.o_kdeluxe_advanced_filters == 1)
            load_module("modules/filters");

        // check for update
        load_module("modules/update_notification", null, g_script_version);

        // proceed with the rest
        if (localStorage.o_kdeluxe_enhanced_postform == 1 && !g_special_page)
            load_module("modules/enhanced_postform");

        if (localStorage.o_kdeluxe_rich_stats == 1 && !g_special_page)
            load_module("modules/rich_stats");

        if (localStorage.o_kdeluxe_fred_dumper == 1 && !g_special_page && g_is_fred_open)
            load_module("modules/fred_dumper");

        if (localStorage.o_kdeluxe_prev_next == 1 && !g_special_page && g_is_fred_open)
            load_module("modules/prev_next");

        if (localStorage.o_kdeluxe_radioradio_player == 1 && !g_special_page)
            load_module("modules/radio_radio");

        if (localStorage.o_kdeluxe_auto_follow == 1 && !g_special_page && g_is_fred_open)
            load_module("modules/auto_follow");

        if (localStorage.o_kdeluxe_password_changer == 1 && !g_special_page)
            load_module("modules/password_changer");

        if (localStorage.o_kdeluxe_uid_curb == 1 && !g_special_page && g_is_fred_open)
            load_module("modules/uid_curb");

        if (localStorage.o_kdeluxe_catalog_curb == 1 && g_is_in_catalog)
            load_module("modules/catalog_curb");

        if (localStorage.o_kdeluxe_image_preview_anti_eyestrain == 1 &&
            localStorage.o_imgpreview === "1" && !g_special_page)
            load_module("modules/anti_eyestrain");

        if (localStorage.o_kdeluxe_ban_checker == 1 && !g_special_page)
            load_module("modules/ban_checker");

        if (localStorage.o_kdeluxe_anti_screamer == 1 && !g_special_page)
            load_module("modules/lower_def_volume");

        if (localStorage.o_kdeluxe_dangerous_bambo == 1)
            load_module("modules/dangerous_bambo");

        if (localStorage.o_kdeluxe_blind_mode_tts == 1 && !g_special_page)
            load_module("modules/blind_mode_tts");

        if (localStorage.o_kdeluxe_smart_boards == 1)
            load_module("modules/smart_boards");

        if (localStorage.o_kdeluxe_autoscroll == 1 && !g_special_page)
            load_module("modules/auto_scroll");

        if (localStorage.o_kdeluxe_better_embed == 1 && !g_special_page)
            load_module("modules/better_embeds");

        if (localStorage.o_kdeluxe_spoiler_revealer == 1)
            load_module("modules/spoiler_revealer");

        if (localStorage.o_kdeluxe_external_links == 1)
            load_module("modules/external_links");

        if (localStorage.o_kdeluxe_konfident_plus == 1)
            load_module("modules/konfident_plus");

        if (localStorage.o_kdeluxe_vocaroo_embeds == 1 && !g_special_page)
            load_module("modules/vocaroo_embeds");

        if (localStorage.o_kdeluxe_new_keyframes == 1 && !g_special_page)
            load_module("modules/new_keyframe_anims");
    });
});
