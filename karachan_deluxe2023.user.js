// ==UserScript==
// @name         Karachan Deluxe 2023
// @namespace    karachan.org
// @version      0.9.0
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
const g_last_commit = "6692c60aacb22bff5b55957dcec3d8bf894196fd";
const g_script_version = GM.info.script.version;

// dynamic module loader
function load_module(module_name, callback_fn, data_pass = "") {
    console.time(`Loading ${module_name}`);
    var a = document.createElement("script"),
        n = document.getElementsByTagName("script")[0];
    a.async = 1, a.onload = a.onreadystatechange = function(e, n) {
            (n || !a.readyState || /loaded|complete/.test(a.readyState)) && (a.onload = a.onreadystatechange = null, a = void 0, !n && callback_fn && setTimeout(callback_fn, 0), console.timeEnd(`Loading ${module_name}`))
        },
        a.onerror = function(error) {
            alert(`KDeluxe napotkał błąd przy ładowaniu modułu: ${error.target.src}`);
        },
        a.src = `https://cdn.jsdelivr.net/gh/t0m45-t3rc4/KDeluxe2023@${g_last_commit}/${module_name}.js`, a.setAttribute("data-pass", `${data_pass}`),
        n.parentNode.insertBefore(a, n);
}

//// identify special pages
{
    // defines
    const special_pages = {
        "catalog.html": "catalog",
        "search.php": "search",
        "/rs/": "rs",
        "/*/": "overboard",
        "/b/": "/b/"
    };

    // current URL path
    const path = window.location.pathname;

    // determine which special page the URL belongs to
    const special_page = Object.entries(special_pages).find(([page]) =>
        path.endsWith(page)
    )?.[1];

    // setup globals
    window.page_type = special_page ? special_page : "default";
    console.log(`window.page_type = ${window.page_type}`);

    window.page_special = special_page === "search" ||
        special_page === "catalog" ||
        special_page === "rs" ?
        true : false;
    console.log(`window.page_special = ${window.page_special}`);

    window.fred_opened = window.location.toString().includes("/res/") ? true : false;
    console.log(`window.fred_opened = ${window.fred_opened}`);
}

// actual script begins here
document.addEventListener('readystatechange', event => {
    if (event.target.readyState !== "complete")
        return;
    // draw version info
    document.querySelector(".group-options").insertAdjacentHTML('beforeend', `<div style="font-size: 10px;position:absolute">[KDeluxe v${g_script_version}]</div>`);

    // run filters first
    if (localStorage.o_kdeluxe_advanced_filters == 1)
        load_module("modules/filters");

    if (localStorage.o_kdeluxe_anti_bible == 1 && !window.page_special)
        load_module("modules/anti_bible");

    // check for update (this is only a notification)
    load_module("modules/update_notification", null, g_script_version);

    // draw settings UI first and then proceed with the rest
    load_module('user_interface', function() {
        if (localStorage.o_kdeluxe_smart_boards == 1)
            load_module("modules/smart_boards");

        if (localStorage.o_kdeluxe_enhanced_postform == 1 && !window.page_special)
            load_module("modules/enhanced_postform");

        if (localStorage.o_kdeluxe_clickable_boardname == 1 && !window.page_special)
            load_module("modules/clickable_boardname");

        if (localStorage.o_kdeluxe_quick_search == 1)
            load_module("modules/quick_search");

        if (localStorage.o_kdeluxe_community_styles == 1)
            load_module("modules/community_styles");

        if (localStorage.o_kdeluxe_rich_stats == 1 && !window.page_special)
            load_module("modules/rich_stats");

        if (localStorage.o_kdeluxe_prev_next == 1 && !window.page_special && window.fred_opened)
            load_module("modules/prev_next");

        if (localStorage.o_kdeluxe_radioradio_player == 1 && !window.page_special)
            load_module("modules/radio_radio");

        if (localStorage.o_kdeluxe_auto_follow == 1 && !window.page_special && window.fred_opened)
            load_module("modules/auto_follow");

        if (localStorage.o_kdeluxe_password_changer == 1 && !window.page_special)
            load_module("modules/password_changer");

        if (localStorage.o_kdeluxe_uid_curb == 1 && !window.page_special && window.fred_opened)
            load_module("modules/uid_curb");

        if (localStorage.o_kdeluxe_catalog_curb == 1 && window.page_type === "catalog")
            load_module("modules/catalog_curb");

        if (localStorage.o_kdeluxe_image_preview_anti_eyestrain == 1 &&
            localStorage.o_imgpreview === "1" && !window.page_special)
            load_module("modules/anti_eyestrain");

        if (localStorage.o_kdeluxe_ban_checker == 1 && !window.page_special)
            load_module("modules/ban_checker");

        if (localStorage.o_kdeluxe_autoscroll == 1 && !window.page_special)
            load_module("modules/auto_scroll");

        if (localStorage.o_kdeluxe_better_embed == 1 && !window.page_special)
            load_module("modules/better_embeds");

        if (localStorage.o_kdeluxe_spoiler_revealer == 1)
            load_module("modules/spoiler_revealer");

        if (localStorage.o_kdeluxe_external_links == 1)
            load_module("modules/external_links");

        if (localStorage.o_kdeluxe_konfident_plus == 1)
            load_module("modules/konfident_plus");

        if (localStorage.o_kdeluxe_vocaroo_embeds == 1 && !window.page_special)
            load_module("modules/vocaroo_embeds");

        if (localStorage.o_kdeluxe_crocodile_scanner == 1)
            load_module("modules/crocodile_scanner");

        if (localStorage.o_kdeluxe_blind_mode_tts == 1 && !window.page_special && 'speechSynthesis' in window)
            load_module("modules/blind_mode_tts");

        if (localStorage.o_kdeluxe_new_keyframes == 1 && !window.page_special)
            load_module("modules/new_keyframe_anims");

        //if (localStorage.o_kdeluxe_fred_dumper == 1 && !window.page_special && window.fred_opened)
        //    load_module("modules/fred_dumper");

    });
});
