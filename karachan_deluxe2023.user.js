// ==UserScript==
// @name         Karachan Deluxe 2023
// @namespace    karachan.org
// @version      0.3.7
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
// ==/UserScript==

////// shared functions
const log = function(m) { const lprefix = `[KDeluxe 2023] `; console.log(lprefix + m); };
const filename_from_url = function(u) {return u.split('/').pop().split('#')[0].split('?')[0]; };
String.prototype.endsWith=function(t){return -1!==this.indexOf(t,this.length-t.length)};
// mitsuba
const openTab=function(a){if(!a.hasClass("tab-opened")){var e=a.parent().children(".tab-opened");e.removeClass("tab-opened"),$("#"+e.data("tab-ref")).removeClass("opened"),a.addClass("tab-opened"),$("#"+a.data("tab-ref")).addClass("opened")}};

////// load responsive voice dependency
/*
if (localStorage.o_kdeluxe_blind_mode_tts == 1) {
    var script = document.createElement('script');
    script.src = `https://code.responsivevoice.org/responsivevoice.js?key=ZBLsY9RB`;

    script.onload = function() {
        log("Responsive Voice Library Loaded!");
    };
    document.head.appendChild(script);
}*/

// action starts below this point
log("Main Script Initialized");

// scripts must be prevented from loading before they actually load
var bsePd = window.addEventListener('beforescriptexecute', e => {
    e.target.removeEventListener('beforescriptexecute', bsePd);

    let filename = filename_from_url(e.target.src);
    //log(filename);

    if (localStorage.o_kdeluxe_anti_bible == 1) {
        if (filename == "htmlshiv.js") {
            e.preventDefault();
            log("Bible was unloaded because Anti-Bible is ON");
        }
    }

    if (localStorage.o_kdeluxe_better_embed == 1) {
        if (filename == "emblite.js") {
            e.preventDefault();
            log("Emblite was unloaded because better embeds are ON");
        }
    }
});

// suppress meaningless errors
window.addEventListener("error", (event) => {
    let filename = filename_from_url(event.filename);

    // emblite errors
    if (filename == "emblite.js")
        event.preventDefault();
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

// assign those globals above
let special_pages = ["catalog.html", "search.php", "/rs/", "/*/"];
let url_path = window.location.pathname;
for (const item of special_pages) {
    if (url_path.endsWith(item)) {
        g_special_page = true;

        // detect if we're in catalog
        if(url_path.endsWith("catalog.html"))
            g_is_in_catalog = true;
    }
}

if(window.location.toString().includes("/res/"))
    g_is_fred_open = true;

log(`g_special_page = ${g_special_page}`);
log(`g_is_in_catalog = ${g_is_in_catalog}`);
log(`g_is_fred_open = ${g_is_fred_open}`);

///// main script logic ////
window.addEventListener('load', function() {
    // count execution time
    var execution_start_time = performance.now()

    if (!window.jQuery) {
        // jQuery should be loaded at this point, something is wrong...
        log("jQuery absent, aborting!");
        return;
    } else {
        log(`jQuery v.${jQuery.fn.jquery} was detected`);
    }

    log(`Pageload is finished, loading features!`);
    //// write code below this line ////

    // create our own settings tab
    let settings_container = $("#tab-settings .modal-cont");
    let settings_nav = settings_container.find(".modal-nav");

    // add tab dummy content
    settings_nav.after(`<div id="tab-settings-deluxe" class="tab-content"><h2>Karachan Deluxe 2023</h2></div>`);
    let kdeluxe_settings_tab = $("#tab-settings-deluxe");
    kdeluxe_settings_tab.css("display", "none");

    // add tab button
    settings_nav.prepend(
        $(`<li data-tab-ref='tab-settings-deluxe'>KDeluxe 2023</li>`)
        .click(function() {
            openTab($(this));
            return false;
        })
    );

    // populate settings tab
    {
        let last_id = 0;
        const add_settings_checkbox = function(internal_name, label, tooltip) {
            kdeluxe_settings_tab.append(`<input type="checkbox" name="o_kdeluxe_${internal_name}" id="opt_kdeluxe_${last_id}" checked="checked">`);
            kdeluxe_settings_tab.append(`<label for="opt_kdeluxe_${last_id}" title="${tooltip}">${label}</label>`);
            // imageboardSettings.push( { o_kdexule_${option}: { desktop: 1, mobile: 1} } );
            last_id++;
        }

        const add_settings_textbox = function(internal_name, label, placeholder) {
            kdeluxe_settings_tab.append(`<input type="text" name="o_kdeluxe_${internal_name}" id="opt_kdeluxe_${last_id}">`);
            kdeluxe_settings_tab.append(`<label for="opt_kdeluxe_${last_id}" title="${placeholder}">${label}</label>`);

            last_id++;
        }

        const load_text_data = function(element, variable) {
            if (variable) {
                $("#" + element).text(variable);
            }
        }

        add_settings_checkbox("autoscroll", "Auto Scroll", "Dodaje opcje automatycznego przewijania freda, którą można w(y)łączyć na samym dole strony");
        add_settings_checkbox("spoiler_revealer", "Spoiler Revealer", "Odkrywa wszystkie spoilery więc nie trzeba na nie najeżdżać");
        add_settings_checkbox("advanced_filters", "Advanced Filters", "Filtry ala ublock ułatwiające korzystanie z czana, w tym heurystyczne");
        add_settings_checkbox("anti_bible", "Anti Bible", "Nie pozwala na załadowanie biblii (htmlshiv.js)");
        add_settings_checkbox("better_embed", "Better Embeds", "Zamienia ciężkie embedy na miniaturki z tytułem, które przekierowują do filmu");
        add_settings_checkbox("vibrant_night", "Vibrant Night", "Ukrywa /noc/ kiedy nie jest dostępna"); // , a w nocy dodaje lampy na całej stronie i lekko ją przyciemnia
        add_settings_checkbox("blind_mode_tts", "Blind Mode (TTS)", "Dodaje obok postów opcję text to speech czyli czytania na głos");
        add_settings_checkbox("new_keyframes", "New Keyframe Animations", "Dodaje różne nowe filtry, np. #robercik, #R");
        add_settings_checkbox("dangerous_bambo", "Dangerous Bambo", "Dodaje biegającego murzynka (bambo) na dole ekranu");
        add_settings_checkbox("ban_checker", "Ban Checker", "Wyświetla status bana");
        add_settings_checkbox("lower_def_volume", "Lower Default Volume", "Obniża domyślną głośność w playerze video, przydatne w FF");
        //add_settings_checkbox("prev_next", "Jump To Post", "Pozwala przechodzić do następnego/poprzedniego postu wybranego użytkownika");
        add_settings_checkbox("catalog_curb", "Catalog Curb", "Pozwala krawężnikować z poziomu katalogu");
        add_settings_checkbox("uid_curb", "UID Curb", "Pozwala krawężnikować poszczególnych anonów we fredach");
        add_settings_checkbox("radioradio_player", "Teoria Chaosu™ Integration", "Wyświetla player radioradio podczas audycji claude'a");
        add_settings_checkbox("password_changer", "Password Changer", "Zmienia hasło na losowe przy każdym załadowaniu strony");
        add_settings_checkbox("auto_follow", "Auto Follow", "Automatycznie obserwuje temat, w którym napiszemy posta (obecnie nie działa z fast reply)");
        add_settings_checkbox("image_preview_anti_eyestrain", "Image Preview Anti-Eyestrain", "Dodaje przycisk do powiększonych obrazków, który pomaga oglądać je w nocy");

        //add_settings_textbox("override_board_name", "Własny nagłówek na /b/", "Wpisz nową nazwe deski /b/")
        //load_text_data("override_board_name", localStorage.o_kdeluxe_override_board_name);
    }

    //// Filters
    // dont move this lower, this needs to run first
    if (localStorage.o_kdeluxe_advanced_filters == 1) {
        let rcount = 0;

        // remove unwanted elements
        const ele_blacklist = ["#smok", "#jesli-zablokujesz-tego-diva-ukraina-odniesie-zwyciestwo", "#regulamin", ".absBotDisclaimer"]
        ele_blacklist.forEach(function(item, index) {
            if ($(item).length) {
                $(item).remove();
                rcount++;
            }
        });

        // hide captcha badget
        $(".grecaptcha-badge").hide();
        rcount++;

        // remove invisible iframes
        $("iframe").each(function() {
            let src = $(this).attr('src');
            if(src == undefined)
                return true;

            // skip grecaptcha
            if (src.indexOf("www.google.com/recaptcha/") >= 0)
                return true;

            let width = $(this).attr('width');
            let height = $(this).attr('width');

            if (width < 5 || height < 5) {
                $(this).remove();
                rcount++;

                log("Dropped invisible iframe: " + src);
            }
        });

        // Anti: Malicious CSS
        $(`<style type='text/css'>.anti_css { transform: rotate(0deg) !important; }</style>`).appendTo("head");

        const revert_ele = [".board"]
        revert_ele.forEach(function(item, index) {
            if ($(item).length) {
                $(item).addClass("anti_css");
            }
        });

        // Anti-wirówka
        localStorage.xD = 'xD';

        log(`Advanced Filters Loaded...`);
        log(`Filtered ${rcount} elements!`);
    }

    //// Add Thread Watchlist Position Reset Button
    $("#settingsSave").after(`<input type="button" value="Fix WatchList OOB" id="resetWatchList">`);
    $("#resetWatchList").click(function(e){
        e.preventDefault();
        localStorage.KurahenPremium_WatchedThreads_Left = "10px";
        localStorage.KurahenPremium_WatchedThreads_Top = "10px";
        window.location.reload();
    });

    //// RadioRadio Player
    if(localStorage.o_kdeluxe_radioradio_player == 1 && !g_special_page) {
        log(`Radioradio Player Loaded...`);

        const d = new Date();
        let day = d.getDay();
        let hour = d.getHours();

        function display_player() {
            $(`#postform`).after(`
        <div id="radioradio_player">
        <figure>
           <figcaption>SŁUCHAJ TEORII CHAOSU, TERAZ NA ŻYWO:</figcaption>
           <audio controls src="https://c16.radioboss.fm:18014/stream"></audio>
        </figure>
        </div>`);
            $("#radioradio_player").css({"text-align": "center"});
        }

        if (day == 4 && hour >= 22 && hour <= 5) {
            // info tydzień
            display_player();
        } else if (day == 5 && hour >= 0 && hour <= 6) {
            // teoria chaosu
            display_player();
        }
    }


    //// Auto Follow
    if(localStorage.o_kdeluxe_auto_follow == 1 && !g_special_page && g_is_fred_open) {
        log(`Auto Follow Loaded...`);

        $('#postform').on('submit', function(e) {
            e.preventDefault();
            let watchlink = $(".watch-button-container a")[0];
            if (watchlink.innerText.trim() == "[Obserwuj]") {
                watchlink.click();
                log("Auto Follow Executed");
            }
        });
    }

    //// Password Changer
    if(localStorage.o_kdeluxe_password_changer == 1 && !g_special_page) {
        log(`Password Changer Loaded...`);

        function random_str(r){for(var n="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=o.length,a=0;a<r;a++)n+=o.charAt(Math.floor(Math.random()*t));return n}

        $.cookie("password", random_str(8));
        log(`Password changed: ${$.cookie("password")}`);
    }

    //// UID Curb
    if(localStorage.o_kdeluxe_uid_curb == 1 && !g_special_page) {
        log(`UID Curb Initialized...`);

        function appendToStorage(name, data){
            var old = localStorage.getItem(name);
            if(old === null) old = "";
            localStorage.setItem(name, old + data);
        }

        // TO-DO: move this loop to shared post iteration loop
        $('.postInfo').each(function() {
            let uid = $(this).find(".posteruid").attr("title");
            if(uid === undefined)
                return true;

            $(this).append(`<a href="#" class="curb_uid" uid="${uid}">[–]</a>`);

            $(".curb_uid").click(function(e) {
                e.preventDefault();

                let x = $(this).attr("uid");
                appendToStorage("o_kdeluxe_curbed_uids", x + ";");
                $(`span.posteruid[title="${x}"]`).parents('.post').hide();
            })
        });

        // read hidden UIDs from localstorage
        let hidden_posters = localStorage.getItem('o_kdeluxe_curbed_uids');
        if (hidden_posters != null) {
            const hiden_posters_arr = hidden_posters.split(";");
            // hide posts with blacklisted UIDs
            let count = 0;
            for (const hidden_uid of hiden_posters_arr) {
                $(`span.posteruid[title="${hidden_uid}"]`).parents('.post').hide();
                count++;
            }
            log(`Curbed ${count-1} UIDs`);
        }
    }

    //// Catalog Curb
    if(this.localStorage.o_kdeluxe_catalog_curb == 1 && g_is_in_catalog) {
        let board = window.location.toString().split("/")[3];

        let posts = document.querySelectorAll(".thread");

        function getHideValue(el) {
            let threadId = el.getAttribute("id").slice(7);
            return `h_${board}_${threadId}`;
        }

        posts.forEach((el, idx) => {
            for (let key in localStorage) {
                if(key == getHideValue(el)) {
                    el.remove();
                    break;
                }
            }
        });

        posts.forEach((el, idx) => {
            el.innerHTML = `<div><a class="hide" href="#" style="font-size:24px;">[–]</a></div>` + el.innerHTML
        });

        document.querySelectorAll(".hide").forEach((el) => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                let hideVal = getHideValue(el.parentElement.parentElement);
                localStorage.setItem(hideVal, "x");
                el.parentElement.parentElement.remove();
            });
        });

        log(`Catalog Curb Loaded...`);
    }

    //// Image Preview Anti-Eyestrain
    if(localStorage.o_kdeluxe_image_preview_anti_eyestrain == 1 && localStorage.o_imgpreview === "1" && !g_special_page) {
        let toggle = false;
        let preview_container = $("#imagePreview");
        preview_container.append(`<a href="#" id="anti-eyestrain"><i class="fa fa-eye-slash" aria-hidden="true"></i></a>`);

        $("#anti-eyestrain").css({"position": "absolute", "top": "0", "right": "0", "font-size": "20px", "background-color": "black"});
        $("#anti-eyestrain").click(function(e) {
            e.preventDefault();

            if (toggle) {
                preview_container.find(">:first-child").css({"filter": ""});
            } else if (!toggle) {
                preview_container.find(">:first-child").css({"filter": "hue-rotate(180deg) invert(1)"});
            }

            toggle = !toggle;
        });

        log(`Image Preview Anti-Eyestrain Loaded...`);
    }

    //// Ban Checker
    if(this.localStorage.o_kdeluxe_ban_checker == 1 && !g_special_page) {
        $("#postform").after(`<h1 id="banned"></h1>`);
        var ban_check_func = window.setInterval(function(){
            fetch("https://karachan.org/banned.php").then((resp) => resp.text()).then((text) => {
                if(!text.includes("NOT BANNED")) {
                    $("#banned").text(`Jesteś zbanowany`);
                    $("#banned").css({"text-align": "center", "color": "red"});
                }
            });
        }, 1000*10);

        log(`Ban Checker Loaded...`);
    }

    //// Prev/Next
    /*
    if(this.localStorage.o_kdeluxe_prev_next == 1 && !g_special_page && g_is_fred_open) {
        let posts = $(".postInfo");

        function searchForPrevious(id, index) {
            for(let i = index-1; i >= 0; i--) {
                //if(posts[i].querySelector(".posteruid").getAttribute("id") == id) {
               //     return posts[i].getAttribute("id").slice(2)
               // }
            }

            return null;
        }

        function searchForNext(id, index) {
            for(let i = index+1; i < posts.length; i++) {
                // if(posts[i].querySelector(".posteruid").getAttribute("id") == id) {
                //    return posts[i].getAttribute("id").slice(2)
                // }
                //  if(posts[i].find
                console.log("xx: " + posts[i]);
            }

            return null;
        }

        posts.each(function( idx ) {
            let el = $(this);

            let id = el.find(".posteruid").attr("id");
            let previous = searchForPrevious(id, idx);
            let next = searchForNext(id, idx);

            let OP = posts[0].getAttribute("id").slice(2);

            let prevHref = `<a href="../../b/res/${OP}.html#p${previous}" class="quotelink"><i class="fa fa-arrow-left" aria-hidden="true"></i> ${previous}</a>`
            let nextHref = `<a href="../../b/res/${OP}.html#p${next}" class="quotelink"><i class="fa fa-arrow-right" aria-hidden="true"></i> ${next}</a>`

            // skip users with one post
            if(next == null && previous == null)
                return true;

            if(next == null) {
                el.innerHTML = el.innerHTML + `<span>[${prevHref}]</span>`
            } else if(previous == null) {
                el.innerHTML = el.innerHTML + `<span>[${nextHref}]</span>`
            } else {
                el.innerHTML = el.innerHTML + `<span>[${prevHref} | ${nextHref}]</span>`
            }
        });

        log(`Prev/Next Loaded...`);
    }*/

    //// Lower Default Volume
    if (localStorage.o_kdeluxe_lower_def_volume == 1 && !g_special_page) {
        let volume = 0.1
        $("#player").prop("volume", volume);

        log("Lower Default Volume Loaded...");
    }

    //// Dangerous Bambo
    if (localStorage.o_kdeluxe_dangerous_bambo == 1) {
        $(`<style type='text/css'>#papaj_pingwin{width:200px;height:190px;position:fixed;animation-iteration-count:2137;background:url("https://i.imgur.com/mB0hqA9.gif");animation-name:pingwin;animation-duration:30s;animation-timing-function:linear;bottom:0;z-index:1000}@keyframes pingwin{0%{right:100%;transform:scaleX(1)}50%{right:-15%;transform:scaleX(1)}51%{right:-15%;transform:scaleX(-1)}100%{transform:scaleX(-1);right:115%}}</style>`).appendTo("head");
        $("body").append(`<div id="papaj_pingwin"></div>`);

        log("Dangerous Bambo Loaded...");
    }

    //// New keyframes
    if (localStorage.o_kdeluxe_new_keyframes == 1 && !g_special_page) {
        $(`<style type='text/css'>@keyframes robert{from{background-color:green;color:#fff}to{background-color:#fff;color:green}}.maxiu{background-color:red;color:#ff0}</style>`).appendTo("head");

        function on_post_loop_new_keyframes(post) {
            var _this = post;
            var str = _this.html().replace(/#robercik/g, "<span style=\"animation: robert ease-in 500ms infinite alternate; font-weight: bold;\">BRAWO ROBERCIK</span>");
            str = str.replace(/#R/g, "<span class=\"maxiu\" style=\"font-weight: bold;\">#R REVOLUTION</span>");
            _this.html(str);
        }

        log("New Keyframe Animations Loaded...");
    }

    //// Blind Mode (TTS)
    if (localStorage.o_kdeluxe_blind_mode_tts == 1 && !g_special_page) {
        if (responsiveVoice === undefined)
            return true;

        function rv_text_normalize(e){return e.replace(/<(?:.|\n)*?>/gm,"").replace("&gt;","").toLowerCase().replace(":3","dwukropek trzy").replace(";_;","płaku płaku").replace("inb4","inbifor")}function rv_line_pre_normalize(e){return e.replace('<i style="font-size:50px" class="wycop wycop-bartoszewski">',"bartoszewski fejs").replace('<i style="font-size:50px" class="wycop wycop-karachan">',"ka ra czan").replace('<i style="font-size:50px" class="wycop wycop-papiez">',"papież fejs")}function rv_speak_line_info(e){if(!(e=rv_line_pre_normalize(e)).startsWith("<"))return[e,{pitch:1}];var t=$(e);if(t.hasClass("quotelink")){var r=t.text().replace(">>","");return r.indexOf("OP")>1&&(r="opa"),["do posta "+r,{pitch:1}]}return t.hasClass("postlink")?["link do strony "+t.text().split("://")[1].split("/")[0],{pitch:1}]:t.hasClass("quote")?[t.text().replace(">",""),{pitch:1.6*Math.random()+.3}]:"IMG"==t[0].tagName?"https://i.imgur.com/ohFvRES.gif"==t.attr("src")?["kul",{pitch:1}]:"https://i.imgur.com/gB7t8a3.gif"==t.attr("src")?["cześć",{pitch:1}]:["obrazek",{pitch:1}]:"S"==t[0].tagName?[t.text(),{pitch:1}]:"U"==t[0].tagName?[t.text(),{pitch:.5}]:"B"==t[0].tagName?[t.text(),{volume:1.5}]:[t.text()]}function rv_rec_speak(e,t){if(0!=e.length){var r=rv_speak_line_info(e[0]),a=rv_text_normalize(r[0]),i=r[1];0==a.length&&rv_rec_speak(e.slice(1,e.length));var p=Object.assign({},{onend:function(){rv_rec_speak(e.slice(1,e.length),t)}},i);responsiveVoice.speak(a,t,p)}}function rv_prepare(e,t){for(var r=e.split("<br>"),a=[],i=0;i<r.length;i++)r[i].length>1&&a.push(r[i]);rv_rec_speak(a.slice(0,a.length-1),t)}

        // TO-DO: move rv_add_links to shared post iteration loop
        function rv_add_links() {
            $('.post').each(function() {
                var postInfo = $(this).find('.postInfo').first();

                if (postInfo.find('a[data-rv]').length == 0) {
                    postInfo.append(
                        `<span class="tts_controls">[
                        <i class="fa fa-volume-up" aria-hidden="true"></i>
                        <a href="#" data-rv="male">M</a> / <a href="#" data-rv="female">F</a> /
                        <a href="#stop_tts"><i class="fa fa-stop" aria-hidden="true"></i></a>
                        ]</span>
                        `);
                }
            });
            $(".tts_controls").css({"margin-left": "3px"});
            log("TTS Links Refreshed");
        }

        function rv_init() {
            log(`Blind Mode (TTS) Loaded...`);

            rv_add_links();

            $('a[href="#stop_tts"]').click(function(){
                if(responsiveVoice.isPlaying()) {
                    responsiveVoice.pause();
                    //responsiveVoice.resume();
                }
            });

            $('a[data-rv]').click(function(e){
                e.preventDefault();
                var rv_content = $(this).parents('.post').find('.postMessage').html();
                var rv_voice = ($(this).attr('data-rv') == 'male') ? 'Polish Male' : 'Polish Female';

                rv_prepare(rv_content, rv_voice);
            });
        }

        rv_init();
        responsiveVoice.CHARACTER_LIMIT = 6000;
        window.setInterval(rv_add_links, 5000);
    }

    //// Vibrant Night
    if (localStorage.o_kdeluxe_smart_boards == 1) {
        let board_ele = $("#tab-boardlink");

        // yszty kurwa gnoju
        board_ele.find(`[data-short='4']`).remove();

        // determine if its night
        var date = new Date;
        var hour = date.getHours();

        if (hour >= 1 && hour <= 5) {
            log(`Vibrant Night Loaded...`);
            // TO-DO: add lightbulb and dim the screen

        } else {
            // hide /noc/ cause its not available
            board_ele.find(`[data-short='noc']`).remove();

        }
    }

    //// Auto Scroll
    if (localStorage.o_kdeluxe_autoscroll == 1 && !g_special_page) {
        log(`Autoscroll Loaded...`);

        var autoscroll;
        $(".uinfo").before('[<input type="checkbox" class="as-box"/>Autoscroll] '), $(".as-box").change(function() {
            this.checked ? autoscroll = setInterval(function() {
                var o = $(".postnew:last");
                o.length && $("html, body").animate({
                    scrollTop: o.offset().top
                }, "slow")
            }, 1e3) : clearInterval(autoscroll)
        })
    }

    //// Spoiler Revealer
    if (localStorage.o_kdeluxe_spoiler_revealer == 1) {
        $("<style type='text/css'>s { color: white!important; }</style>").appendTo("head");

        log(`Spoiler Revealer Loaded...`);
    }

    //// Better Embed
    if (localStorage.o_kdeluxe_better_embed == 1 && !g_special_page) {
        const embeds = document.querySelectorAll("iframe");
        if(embeds.length == 0)
            return;

        log(`Better Embed Loaded...`);

        const fetchVideoTitle = async (id) => {
            const body = await fetch(
                `https://youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
            );

            if (body.status === 404) return "Film nie istnieje";
            if (body.status === 401) return "Nie można pobrać tytułu";
            if (body.status === 403) return "Film prywatny";

            const json = await body.json();

            return json.title;
        };

        const createThumbnail = (embed) => {
            const videoSuffix = embed.src.split("/").pop();

            const newImage = document.createElement("img");
            newImage.src = `https://i.ytimg.com/vi/${videoSuffix}/hqdefault.jpg`;
            newImage.style.cssText = "width:250px;height:250px;object-fit:cover;";

            return newImage;
        };

        const createTitle = async (embed) => {
            const title = await fetchVideoTitle(embed.src.split("/").pop());

            const newTitle = document.createElement("div");
            newTitle.style.cssText = `position: absolute;top: 10px;left: 10px;color: white;
    font-family: Arial, Helvetica, sans-serif;font-weight: bold;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;`;
            newTitle.innerHTML = title;

            return newTitle;
        };

        const createEmbedDiv = (embed) => {
            const newDiv = document.createElement("div");
            newDiv.style.cssText = "position: relative;";

            newDiv.addEventListener("click", () => {
                newDiv.parentNode.replaceChild(createEmbed(embed), newDiv);
            });

            return newDiv;
        }

        const createEmbed = (embed) => {
            const videoSuffix = embed.src.split("/").pop();
            const newEmbed = document.createElement("iframe");
            newEmbed.width = 250;
            newEmbed.height = 250;
            newEmbed.src = `https://www.youtube.com/embed/${videoSuffix}`;
            newEmbed.referrerPolicy = "unsafe-url";
            newEmbed.setAttribute("allowfullscreen", "true");
            newEmbed.style.border = "none";

            return newEmbed;
        }

        const createYoutubeIcon = () => {
            const youtubeIcon = document.createElement("img");
            youtubeIcon.src = `https://www.freeiconspng.com/uploads/white-youtube-logo-png-28.png`;
            youtubeIcon.style.cssText = "width:80px;height:60px;";

            return youtubeIcon;
        };

        const createYoutubeIconDiv = (youtubeIcon) => {
            const youtubeIconDiv = document.createElement("div");
            youtubeIconDiv.style.cssText = "position: absolute;top: 193px;left: 5px;";

            youtubeIconDiv.appendChild(youtubeIcon);

            return youtubeIconDiv;
        };

        const loopThroughEmbeds = async (embeds) => {
            const thumbnailsArray = [];
            const ytIcon = createYoutubeIcon();

            for (const embed of embeds) {
                if (embed.src.includes("youtube")) {
                    thumbnailsArray.push(createThumbnail(embed));
                }
            }

            let embedCounter = 0;

            for (const embed of embeds) {
                if (embed.src.includes("youtube")) {
                    const ytDiv = createEmbedDiv(embed);
                    ytDiv.appendChild(await createTitle(embed));
                    ytDiv.appendChild(createYoutubeIconDiv(ytIcon.cloneNode()));
                    ytDiv.appendChild(thumbnailsArray[embedCounter]);

                    embed.parentNode.replaceChild(ytDiv, embed);

                    embedCounter++;
                }

            }
        };

        const observeIncomingEmbeds = () => {
            const threads = document.querySelector(".thread.reqCaptcha");
            const options = {
                childList: true
            };

            const callback = (mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === "childList") {
                        const incomingEmbeds =
                              mutation.addedNodes[0].querySelectorAll("iframe");

                        loopThroughEmbeds(incomingEmbeds);
                    }
                }
            };

            const observer = new MutationObserver(callback);
            observer.observe(threads, options);
        };

        loopThroughEmbeds(embeds);
        observeIncomingEmbeds();
    }

    //dialogBox('KDeluxe', `Sukces kurwo, udało się załadować skrypt w ${performance.now() - execution_start_time}ms`, ['OK'], 'fa-check');
    log(`Finished in ${performance.now() - execution_start_time}ms`);

    // iterate over newly collected posts
    if(!g_special_page) {
        var process_posts = window.setInterval(function(){
            let last_post = g_new_posts.pop();
            // TO-DO: Convert last_post node to actual html element
            // on_post_loop_new_keyframes(last_post);
        }, 1000);
    }
});

if(!g_special_page) {
    // store new posts that appear in DOM into array
    var observer = new MutationObserver(function(mutations, observer) {
        for(var i=0; i<mutations.length; ++i) {
            // look through all added nodes of this mutation
            for(var j=0; j<mutations[i].addedNodes.length; ++j) {
                let node = mutations[i].addedNodes[j];
                if (!node.tagName) continue; // skip non-elements
                if (node.tagName != "BLOCKQUOTE") continue; // skip non-posts
                g_new_posts.push(node);
                log("New post node pushed");
            }
        }

    });

    observer.observe(document.documentElement || document.body, {attributes: false, childList: true, characterData: false, subtree:true});
}
