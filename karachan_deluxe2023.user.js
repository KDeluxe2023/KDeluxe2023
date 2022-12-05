// ==UserScript==
// @name         Karachan Deluxe 2023
// @namespace    karachan.org
// @version      0.4.2
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
// @require      https://raw.githubusercontent.com/KDeluxe2023/KDeluxe2023/main/html2canvas.min.js
// @require      https://raw.githubusercontent.com/KDeluxe2023/KDeluxe2023/main/jszip.min.js
// @require      https://raw.githubusercontent.com/KDeluxe2023/KDeluxe2023/main/FileSaver.min.js
// ==/UserScript==

////// shared functions
const log = function(m) { const lprefix = `[KDeluxe 2023] `; console.log(lprefix + m); };
const filename_from_url = function(u) {return u.split('/').pop().split('#')[0].split('?')[0]; };
String.prototype.endsWith=function(t){return -1!==this.indexOf(t,this.length-t.length)};
// mitsuba
const openTab=function(a){if(!a.hasClass("tab-opened")){var e=a.parent().children(".tab-opened");e.removeClass("tab-opened"),$("#"+e.data("tab-ref")).removeClass("opened"),a.addClass("tab-opened"),$("#"+a.data("tab-ref")).addClass("opened")}};

// action starts below this point
log("Main Script Initialized");

// scripts must be prevented from loading before they actually load
var bsePd = window.addEventListener('beforescriptexecute', e => {
    e.target.removeEventListener('beforescriptexecute', bsePd);

    let filename = filename_from_url(e.target.src);

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
// holds user selected style
var g_style = localStorage.style;

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
    var total_execution_start_time = performance.now()

    if (!window.jQuery) {
        // jQuery should be loaded at this point, something is wrong...
        log("jQuery absent, aborting!");
        return;
    } else {
        log(`jQuery v.${jQuery.fn.jquery} was detected`);
    }

    log(`Pageload is finished, loading features!`);
    //// write code below this line ////

    let performance_interface = performance.now()

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
        add_settings_checkbox("catalog_curb", "Catalog Curb", "Pozwala krawężnikować z poziomu katalogu");
        add_settings_checkbox("uid_curb", "UID Curb", "Pozwala krawężnikować poszczególnych anonów we fredach");
        add_settings_checkbox("better_embed", "Better Embeds", "Zamienia ciężkie embedy na miniaturki z tytułem, które przekierowują do filmu");
        add_settings_checkbox("radioradio_player", "Teoria Chaosu™ Integration", "Wyświetla player radioradio podczas audycji claude'a");
        add_settings_checkbox("lower_def_volume", "Lower Default Volume", "Obniża domyślną głośność w playerze video, przydatne w FF");
        add_settings_checkbox("ban_checker", "Ban Checker", "Wyświetla status bana");
        add_settings_checkbox("password_changer", "Password Changer", "Zmienia hasło na losowe przy każdym załadowaniu strony");
        add_settings_checkbox("fred_dumper", "Fred Dumper", "Pozwala zapisać obecnie otwarty fred jako jpg, dodatkowo pozwala pobrać też obrazki osobno w zipie");
        add_settings_checkbox("auto_follow", "Auto Follow", "Automatycznie obserwuje temat, w którym napiszemy posta (obecnie nie działa z fast reply)");
        add_settings_checkbox("rich_stats", "Rich Statistics", "Dodaje okienko z różnymi statystykami odnośnie twojej aktywności na forum");
        add_settings_checkbox("blind_mode_tts", "Blind Mode (TTS)", "Dodaje obok postów opcję text to speech czyli czytania na głos");
        add_settings_checkbox("new_keyframes", "New Keyframe Animations", "Dodaje różne nowe filtry, np. #robercik, #R");
        //add_settings_checkbox("prev_next", "Jump To Post", "Pozwala przechodzić do następnego/poprzedniego postu wybranego użytkownika");
        add_settings_checkbox("image_preview_anti_eyestrain", "Image Preview Anti-Eyestrain", "Dodaje przycisk do powiększonych obrazków, który pomaga oglądać je w nocy");
        add_settings_checkbox("dangerous_bambo", "Dangerous Bambo", "Dodaje biegającego murzynka (bambo) na dole ekranu");
        add_settings_checkbox("smart_boards", "Smart Boards", "Ukrywa /noc/ kiedy nie jest dostępna"); // , a w nocy dodaje lampy na całej stronie i lekko ją przyciemnia

        //add_settings_textbox("override_board_name", "Własny nagłówek na /b/", "Wpisz nową nazwe deski /b/")
        //load_text_data("override_board_name", localStorage.o_kdeluxe_override_board_name);
    }

    //// Add ThreadWatcher Position Reset Button
    $("#settingsSave").after(`<input type="button" value="Fix ThreadWatcher OOB" id="resetThreadWatcher">`);
    $("#resetThreadWatcher").click(function(e){
        e.preventDefault();
        localStorage.KurahenPremium_WatchedThreads_Left = "10px";
        localStorage.KurahenPremium_WatchedThreads_Top = "10px";
        window.location.reload();
    });

    log(`[⏱️] Interface created in ${performance.now() - performance_interface}ms`);

    //// Filters
    // dont move this lower, this needs to run first
    if (localStorage.o_kdeluxe_advanced_filters == 1) {
        log(`Advanced Filters Initiated...`);
        let performance_filters = performance.now()

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
        if ($(".grecaptcha-badge").length) {
            $(".grecaptcha-badge").hide();
            rcount++;
        }

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

        log(`Filtered ${rcount} elements!`);

        log(`[⏱️] Advanced Filters loaded in ${performance.now() - performance_filters}ms`);
    }

    //// Rich Stats
    if(localStorage.o_kdeluxe_rich_stats == 1 && !g_special_page) {
        log(`Rich Stats Loaded...`);

        let performance_rich_stats = performance.now()

        let top_pos = "1px";
        let left_pos = "1px";
        // create stats window
        jQuery('<div>', {
            id: 'stats_box',
            class: 'movable',
            style: `height:auto;min-height:100px;width:auto;min-width:250px;position:absolute;top:${top_pos};left:${left_pos};padding:5px;`
        }).appendTo('body');
        $("#stats_box").draggable();

        // style our box the same as watcher box
        function read_css_property(e,t){var n=e.charAt(0),r=e.substring(1),u="#"==n?document.getElementById(r):document.getElementsByClassName(r)[0];return window.getComputedStyle(u,null).getPropertyValue(t)}
        let og_background = read_css_property("#watcher_box", "background");
        let og_border = read_css_property("#watcher_box", "border");

        $('#stats_box').css({"background":og_background,"border":og_border});

        // populate it with content
        jQuery('<small>').appendTo('#stats_box').text("Twoje statystyki");

        log(`[⏱️] Rich stats loaded in ${performance.now() - performance_rich_stats}ms`);
    }


    { // block
        //// Fred Dumper
        if(localStorage.o_kdeluxe_fred_dumper == 1 && !g_special_page && g_is_fred_open) {
            log(`Fred Dumper Loaded...`);
            let performance_fred_dumper = performance.now()

            let bar = $('.post').first().find('.postInfo').first();
            bar.prepend(`<span id="dumper_container">[<a href="#" id="dump_thread"><i class="fa fa-download" aria-hidden="true"></i></a>]</span>`);
            $("#dumper_container").css({"margin-right":"3px"});

            $("#dump_thread").click(function(e){
                e.preventDefault();
                dialogBox('KDeluxe', `Jak chcesz pobrać ten temat?`, ["Screenshot", "Screenshot + Pliki", "Tylko Pliki", "Anuluj"], 'fa-download', function(a) {
                    // cancel
                    if (a == 3)
                        return;

                    let fred_id = bar.attr("id").replace(/\D/g,'');
                    let fred_time = bar.find(".dateTime").attr("title");

                    // download files only
                    if (a == 2) {
                        download_all_media_zipped();
                        return;
                    }

                    // check if created canvas will fit within browser's limit
                    let fred_height = document.body.scrollHeight;
                    if (fred_height > 32767) {
                        dialogBox('KDeluxe', `Ten fred przekracza 32,000px wysokości i nie może zostać zeskrinowany`, ['OK'], 'fa-exclamation-triangle');
                        return;
                    }

                    function download_all_media_zipped() {
                        function saveToZip(e,t){log("Generating zip...");const n=new JSZip,o=n.folder("project");t.forEach((e=>{const t=fetch(e).then((e=>200===e.status?e.blob():Promise.reject(new Error(e.statusText)))),n=e.substring(e.lastIndexOf("/"));o.file(n,t)})),n.generateAsync({type:"blob"}).then((t=>saveAs(t,e))).catch((e=>console.log(e)))}

                        log("Creating zip...");
                        let urls = [];
                        $('.fileThumb').each(function() {
                            let link = $(this).attr("href");
                            if (link == undefined)
                                return true;

                            let absolute_url = new URL(link, document.baseURI).href;

                            urls.push(absolute_url);
                        });
                        log(`${urls.length} links to zip collected`);

                        saveToZip(`${fred_id} - ${fred_time}.zip`, urls)
                    }

                    // screenshot or screenshot+download files
                    if (a == 0 || a == 1) {
                        function downloadURI(e,d){var o=document.createElement("a");o.download=d,o.href=e,document.body.appendChild(o),o.click(),document.body.removeChild(o),delete o};

                        // wait for dialogbox to disappear
                        setTimeout(function(){
                            html2canvas(document.body).then(function(canvas) {
                                var dt = canvas.toDataURL('image/jpeg');
                                downloadURI(dt, `${fred_id} - ${fred_time}.jpg`);
                            });
                        }, 1000);

                        // download files
                        if (a == 1) {
                            download_all_media_zipped();
                        }
                    }

                });
            });

            log(`[⏱️] Fred Dumper loaded in ${performance.now() - performance_fred_dumper}ms`);
        }

        //// RadioRadio Player
        if(localStorage.o_kdeluxe_radioradio_player == 1 && !g_special_page) {
            log(`Radioradio Player Loaded...`);
            let performance_radioradio_player = performance.now()

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

            log(`[⏱️] RadioRadio Player loaded in ${performance.now() - performance_radioradio_player}ms`);
        }


        //// Auto Follow
        if(localStorage.o_kdeluxe_auto_follow == 1 && !g_special_page && g_is_fred_open) {
            log(`Auto Follow Loaded...`);
            let performance_autofollow = performance.now()

            $('#postform').on('submit', function(e) {
                e.preventDefault();
                let watchlink = $(".watch-button-container a")[0];
                if (watchlink.innerText.trim() == "[Obserwuj]") {
                    watchlink.click();
                    log("Auto Follow Executed");
                }
            });

            log(`[⏱️] Autofollow loaded in ${performance.now() - performance_autofollow}ms`);
        }

        //// Password Changer
        if(localStorage.o_kdeluxe_password_changer == 1 && !g_special_page) {
            log(`Password Changer Loaded...`);
            let performance_password_changer = performance.now()

            function random_str(r){for(var n="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=o.length,a=0;a<r;a++)n+=o.charAt(Math.floor(Math.random()*t));return n}

            $.cookie("password", random_str(8), { path: '/' });
            log(`Password changed: ${$.cookie("password")}`);
            log(`[⏱️] Password Changer loaded in ${performance.now() - performance_password_changer}ms`);
        }

        //// UID Curb
        if(localStorage.o_kdeluxe_uid_curb == 1 && !g_special_page && g_is_fred_open) {
            log(`UID Curb Initialized...`);
            let performance_uid_curb = performance.now()

            // add clear button
            $("#settingsSave").after(`<input type="button" value="Clear Curbed UIDs" id="clear_curb_list">`);
            $("#clear_curb_list").click(function(e){
                e.preventDefault();
                localStorage.o_kdeluxe_curbed_uids = "";
                window.location.reload();
            });

            function appendToStorage(name, data){var old=localStorage.getItem(name);if(old === null){old = "";}localStorage.setItem(name, old + data);}

            // TO-DO: move this loop to shared post iteration loop
            // TO-DO: optimize this, this literally takes 100ms to execute
            $('.postInfo').each(function(index) {
                // skip main post, mitsuba already lets you curb it
                if (index == 0) // if ($(this).find("span.subject").length)
                    return true;

                // fetch id
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
            // end optimize

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

            log(`[⏱️] UID Curb loaded in ${performance.now() - performance_uid_curb}ms`);
        }

        //// Catalog Curb
        if(this.localStorage.o_kdeluxe_catalog_curb == 1 && g_is_in_catalog) {
            log(`Catalog Curb Loaded...`);
            let performance_catalog_curb = performance.now()

            let board = window.location.toString().split("/")[3];
            let posts = document.querySelectorAll(".thread");

            // TO-DO: dont store curbed threads individually, use json with curb time and id+board instead
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

                el.innerHTML = `<div><a class="hide" href="#" style="font-size:21px;">[–]</a></div>` + el.innerHTML
            });

            document.querySelectorAll(".hide").forEach((el) => {
                el.addEventListener("click", (e) => {
                    e.preventDefault();
                    let hideVal = getHideValue(el.parentElement.parentElement);
                    localStorage.setItem(hideVal, "x");
                    el.parentElement.parentElement.remove();
                });
            });

            log(`[⏱️] Catalog Curb loaded in ${performance.now() - performance_catalog_curb}ms`);
        }

        //// Image Preview Anti-Eyestrain
        if(localStorage.o_kdeluxe_image_preview_anti_eyestrain == 1 && localStorage.o_imgpreview === "1" && !g_special_page) {
            log(`Image Preview Anti-Eyestrain Loaded...`);
            let performance_anti_eyestrain = performance.now()

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

            log(`[⏱️] Image Preview Anti-Eyestrain loaded in ${performance.now() - performance_anti_eyestrain}ms`);
        }

        //// Ban Checker
        if(this.localStorage.o_kdeluxe_ban_checker == 1 && !g_special_page) {
            log(`Ban Checker Loaded...`);
            let performance_ban_checker = performance.now()

            $("#postform").after(`<h1 id="banned"></h1>`);
            var ban_check_func = window.setInterval(function(){
                fetch("https://karachan.org/banned.php").then((resp) => resp.text()).then((text) => {
                    if(!text.includes("NOT BANNED")) {
                        $("#banned").text(`Jesteś zbanowany`);
                        $("#banned").css({"text-align": "center", "color": "red"});
                    }
                });
            }, 1000*10);

            log(`[⏱️] Ban Checker loaded in ${performance.now() - performance_ban_checker}ms`);
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
            log("Lower Default Volume Loaded...");
            let performance_lower_def_volume = performance.now()

            let volume = 0.1
            $("#player").prop("volume", volume);

            log(`[⏱️] Lower Default Volume loaded in ${performance.now() - performance_lower_def_volume}ms`);
        }

        //// Dangerous Bambo
        if (localStorage.o_kdeluxe_dangerous_bambo == 1) {
            log("Dangerous Bambo Loaded...");
            let performance_dangerous_bambo = performance.now()

            $(`<style type='text/css'>#papaj_pingwin{width:200px;height:190px;position:fixed;animation-iteration-count:2137;background:url("https://i.imgur.com/mB0hqA9.gif");animation-name:pingwin;animation-duration:30s;animation-timing-function:linear;bottom:0;z-index:1000}@keyframes pingwin{0%{right:100%;transform:scaleX(1)}50%{right:-15%;transform:scaleX(1)}51%{right:-15%;transform:scaleX(-1)}100%{transform:scaleX(-1);right:115%}}</style>`).appendTo("head");
            $("body").append(`<div id="papaj_pingwin"></div>`);

            log(`[⏱️] Dangerous Bambo loaded in ${performance.now() - performance_lower_def_volume}ms`);
        }

        //// New keyframes
        if (localStorage.o_kdeluxe_new_keyframes == 1 && !g_special_page) {
            log("New Keyframe Animations Loaded...");
            let performance_new_keyframes = performance.now()

            $(`<style type='text/css'>@keyframes robert{from{background-color:green;color:#fff}to{background-color:#fff;color:green}}.maxiu{background-color:red;color:#ff0}</style>`).appendTo("head");

            function on_post_loop_new_keyframes(post) {
                var _this = post;
                var str = _this.html().replace(/#robercik/g, "<span style=\"animation: robert ease-in 500ms infinite alternate; font-weight: bold;\">BRAWO ROBERCIK</span>");
                str = str.replace(/#R/g, "<span class=\"maxiu\" style=\"font-weight: bold;\">#R REVOLUTION</span>");
                _this.html(str);
            }

            log(`[⏱️] New Keyframes loaded in ${performance.now() - performance_new_keyframes}ms`);
        }

        //// Blind Mode (TTS)
        if (localStorage.o_kdeluxe_blind_mode_tts == 1 && !g_special_page) {
            let performance_blind_mode_tts = performance.now()

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

            log(`[⏱️] Blind Mode TTS loaded in ${performance.now() - performance_blind_mode_tts}ms`);
        }

        //// Smart Boards
        if (localStorage.o_kdeluxe_smart_boards == 1) {
            log(`Smart Boards Loaded...`);
            let performance_smart_boards = performance.now()

            let board_ele = $("#tab-boardlink");

            // yszty kurwa gnoju
            board_ele.find(`[data-short='4']`).remove();

            // determine if its night
            var date = new Date;
            var hour = date.getHours();

            if (hour >= 1 && hour <= 5) {
                // TO-DO: add lightbulb and dim the screen

            } else {
                // hide /noc/ cause its not available
                board_ele.find(`[data-short='noc']`).remove();
            }

            log(`[⏱️] Smart Boards loaded in ${performance.now() - performance_smart_boards}ms`);
        }

        //// Auto Scroll
        if (localStorage.o_kdeluxe_autoscroll == 1 && !g_special_page) {
            log(`Autoscroll Loaded...`);
            let performance_autoscroll = performance.now()

            var autoscroll;
            $(".uinfo").before('[<input type="checkbox" class="as-box"/>Autoscroll] '), $(".as-box").change(function() {
                this.checked ? autoscroll = setInterval(function() {
                    var o = $(".postnew:last");
                    o.length && $("html, body").animate({
                        scrollTop: o.offset().top
                    }, "slow")
                }, 1e3) : clearInterval(autoscroll)
            })

            log(`[⏱️] Autoscroll loaded in ${performance.now() - performance_autoscroll}ms`);
        }

        //// Spoiler Revealer
        if (localStorage.o_kdeluxe_spoiler_revealer == 1) {
            log(`Spoiler Revealer Loaded...`);

            $("<style type='text/css'>s { color: white!important; }</style>").appendTo("head");
        }

        //// Better Embed
        if (localStorage.o_kdeluxe_better_embed == 1 && !g_special_page) {
            let performance_better_embeds = performance.now()

            const embeds = document.querySelectorAll("iframe");
            if(embeds.length == 0)
                return;

            log(`Better Embeds Loaded...`);

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

            log(`[⏱️] Better Embeds loaded in ${performance.now() - performance_better_embeds}ms`);
        }

    } // block

    log(`Finished in ${performance.now() - total_execution_start_time}ms`);

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
