// ==UserScript==
// @name         Karachan Deluxe 2023
// @namespace    karachan.org
// @version      0.8.8
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
// ==/UserScript==
// modules will be loaded at this commit in github repo via jsdelivr
const g_last_commit = "d7786048f5b455adad747c763754c75eb1d07c3d";
const g_script_version = GM.info.script.version;

// dynamic module loader
function load_module(module_name, callback_fn, data_pass = "") {
    var a = document.createElement("script"),
        n = document.getElementsByTagName("script")[0];
    a.async = 1, a.onload = a.onreadystatechange = function(e, n) {
        (n || !a.readyState || /loaded|complete/.test(a.readyState)) && (a.onload = a.onreadystatechange = null, a = void 0, !n && callback_fn && setTimeout(callback_fn, 0))
    }, a.onerror = function(error) {
        alert(`KDeluxe napotkał błąd przy ładowaniu modułu: ${error.target.src}`);
    }, a.src = `https://cdn.jsdelivr.net/gh/KDeluxe2023/KDeluxe2023@${g_last_commit}/${module_name}.js`, a.setAttribute("data-pass", `${data_pass}`), n.parentNode.insertBefore(a, n)
}

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

// actual script begins here
document.addEventListener('readystatechange', event => {
    if (event.target.readyState !== "complete")
        return;

    // draw version info
    document.querySelector(".group-options").insertAdjacentHTML('beforeend', `<div style="font-size: 10px;position:absolute">[KDeluxe v${g_script_version}]</div>`);

    // run filters first
    if (localStorage.o_kdeluxe_advanced_filters == 1)
        load_module("modules/filters");
    
    if (localStorage.o_kdeluxe_anti_bible == 1 && !g_special_page)
        load_module("modules/anti_bible");

    // check for update (this is only a notification)
    load_module("modules/update_notification", null, g_script_version);

    // draw settings UI first and then proceed with the rest
    load_module('user_interface', function() {
        if (localStorage.o_kdeluxe_smart_boards == 1)
            load_module("modules/smart_boards");

        if (localStorage.o_kdeluxe_enhanced_postform == 1 && !g_special_page)
            load_module("modules/enhanced_postform");

        if (localStorage.o_kdeluxe_clickable_boardname == 1 && !g_special_page)
            load_module("modules/clickable_boardname");
        
        if (localStorage.o_kdeluxe_quick_search == 1)
            load_module("modules/quick_search");

        if (localStorage.o_kdeluxe_community_styles == 1)
            load_module("modules/community_styles");

        if (localStorage.o_kdeluxe_rich_stats == 1 && !g_special_page)
            load_module("modules/rich_stats");

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

        if (localStorage.o_kdeluxe_crocodile_scanner == 1)
            load_module("modules/crocodile_scanner");

        //if (localStorage.o_kdeluxe_fred_dumper == 1 && !g_special_page && g_is_fred_open)
        //    load_module("modules/fred_dumper");

        //if (localStorage.o_kdeluxe_blind_mode_tts == 1 && !g_special_page)
        //    load_module("modules/blind_mode_tts");

        //if (localStorage.o_kdeluxe_new_keyframes == 1 && !g_special_page)
        //    load_module("modules/new_keyframe_anims");
    });
});
