// ==UserScript==
// @name         Karachan Deluxe 2023
// @namespace    karachan.org
// @version      0.5.6
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
// @require      https://code.responsivevoice.org/responsivevoice.js?key=ZBLsY9RB
// @require      https://raw.githubusercontent.com/KDeluxe2023/KDeluxe2023/main/dependencies/html2canvas.min.js
// @require      https://raw.githubusercontent.com/KDeluxe2023/KDeluxe2023/main/dependencies/jszip.min.js
// @require      https://raw.githubusercontent.com/KDeluxe2023/KDeluxe2023/main/dependencies/FileSaver.min.js
// ==/UserScript==

// modules will be loaded based on this github's commit ID
const g_last_commit = "d00c0708e364c442bf87e1d1c2a41bf0196291a6";

// dynamic module loader (this should be below any function used inside loaded modules!)
function load_module(e, t) {
    var a = document.createElement("script"),
        n = document.getElementsByTagName("script")[0];
    a.async = 1, a.onload = a.onreadystatechange = function(e, n) {
        (n || !a.readyState || /loaded|complete/.test(a.readyState)) && (a.onload = a.onreadystatechange = null, a = void 0, !n && t && setTimeout(t, 0))
    }, a.src = `https://cdn.jsdelivr.net/gh/KDeluxe2023/KDeluxe2023@${g_last_commit}/modules/${e}.js`, n.parentNode.insertBefore(a, n)
}

// action starts below this point
console.log("Main Script Initialized");

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
            console.log(`[KDeluxe] was unloaded because Anti-Bible is active`);
        }
    }

    if (localStorage.o_kdeluxe_better_embed == 1) {
        if (filename == "emblite.js") {
            e.preventDefault();
            console.log(`[KDeluxe] was unloaded because Better Embeds are active`);
        }
    }

    console.log(`[KDeluxe] Browser loaded script: ${filename}`);
});

//// globals
// array with newly added posts
var g_new_posts = [];

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
String.prototype.endsWith = function(t) {
    return -1 !== this.indexOf(t, this.length - t.length)
};
for (const item of special_pages) {
    if (url_path.endsWith(item)) {
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
window.addEventListener('load', function() {
    if (!window.jQuery) {
        // jQuery should be loaded at this point, something is wrong...
        console.log(`jQuery absent, aborting!`);
        return;
    } else {
        console.log(`[KDeluxe] jQuery v.${jQuery.fn.jquery} was detected`);
    }

    console.log(`[KDeluxe] Pageload is finished, loading features!`);
    //// write code below this line ////

    // draw our own UI
    load_module("user_interface");

    // dont move this lower, this needs to run first
    if (localStorage.o_kdeluxe_advanced_filters == 1)
        load_module("filters");

    if (localStorage.o_kdeluxe_rich_stats == 1 && !g_special_page)
        load_module("rich_stats");

    if (localStorage.o_kdeluxe_fred_dumper == 1 && !g_special_page && g_is_fred_open)
        load_module("fred_dumper");

    if (localStorage.o_kdeluxe_radioradio_player == 1 && !g_special_page)
        load_module("radio_radio");

    if (localStorage.o_kdeluxe_auto_follow == 1 && !g_special_page && g_is_fred_open)
        load_module("auto_follow");

    if (localStorage.o_kdeluxe_password_changer == 1 && !g_special_page)
        load_module("password_changer");

    if (localStorage.o_kdeluxe_uid_curb == 1 && !g_special_page && g_is_fred_open)
        load_module("uid_curb");

    if (this.localStorage.o_kdeluxe_catalog_curb == 1 && g_is_in_catalog)
        load_module("catalog_curb");

    if (localStorage.o_kdeluxe_image_preview_anti_eyestrain == 1 && localStorage.o_imgpreview === "1" && !g_special_page)
        load_module("anti_eyestrain");

    if (this.localStorage.o_kdeluxe_ban_checker == 1 && !g_special_page)
        load_module("ban_checker");

    //if(this.localStorage.o_kdeluxe_prev_next == 1 && !g_special_page && g_is_fred_open)
    //  load_module("prev_next");

    if (localStorage.o_kdeluxe_lower_def_volume == 1 && !g_special_page)
        load_module("lower_def_volume");

    if (localStorage.o_kdeluxe_dangerous_bambo == 1)
        load_module("dangerous_bambo");

    //if (localStorage.o_kdeluxe_new_keyframes == 1 && !g_special_page)
    //    load_module("new_keyframe_anims");

    if (localStorage.o_kdeluxe_blind_mode_tts == 1 && !g_special_page)
        load_module("blind_mode_tts");

    if (localStorage.o_kdeluxe_smart_boards == 1)
        load_module("smart_boards");

    if (localStorage.o_kdeluxe_autoscroll == 1 && !g_special_page)
        load_module("auto_scroll");

    if (localStorage.o_kdeluxe_better_embed == 1 && !g_special_page)
        load_module("better_embeds");

    if (localStorage.o_kdeluxe_spoiler_revealer == 1) {
        console.log(`[KDeluxe] Spoiler Revealer Loaded...`);
        $("<style type='text/css'>s { color: white!important; }</style>").appendTo("head");
    }

    if (localStorage.o_kdeluxe_external_links == 1)
        load_module("external_links");

    //if (localStorage.o_kdeluxe_threadwatcher_sort == 1)
    //    load_module("threadwatcher_sort");

    // iterate over newly collected posts
    if (!g_special_page) {
        var process_posts = window.setInterval(function() {
            let last_post = g_new_posts.pop();
            // TO-DO: Convert last_post node to actual html element
            // on_post_loop_new_keyframes(last_post);
        }, 1000);
    }
});

if (!g_special_page) {
    // store new posts that appear in DOM into array
    var observer = new MutationObserver(function(mutations, observer) {
        for (var i = 0; i < mutations.length; ++i) {
            // look through all added nodes of this mutation
            for (var j = 0; j < mutations[i].addedNodes.length; ++j) {
                let node = mutations[i].addedNodes[j];
                if (!node.tagName) continue; // skip non-elements
                if (node.tagName != "BLOCKQUOTE") continue; // skip non-posts
                g_new_posts.push(node);
                console.log(`[KDeluxe] New post node pushed`);
            }
        }

    });

    observer.observe(document.documentElement || document.body, {
        attributes: false,
        childList: true,
        characterData: false,
        subtree: true
    });
}
