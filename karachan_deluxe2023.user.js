// ==UserScript==
// @name         Karachan Deluxe 2023
// @namespace    karachan.org
// @version      0.2
// @description  Największe rozszerzenie dodające szereg nowych funkcji do forum młodzieżowo katolickiego
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
// @require      https://code.responsivevoice.org/responsivevoice.js
// @updateURL https://github.com/KDeluxe2023/KDeluxe2023/raw/main/karachan_deluxe2023.user.js
// @downloadURL https://github.com/KDeluxe2023/KDeluxe2023/raw/main/karachan_deluxe2023.user.js
// ==/UserScript==

////// shared functions
const log = function(m) { const lprefix = `[KDeluxe 2023][${Date.now()}] `; console.log(lprefix + m); };
const filename_from_url = function(u) {return u.split('/').pop().split('#')[0].split('?')[0]; };
// responsive voice
if (localStorage.o_kdeluxe_blind_mode_tts == 1)
    function rv_text_normalize(e){return e.replace('<img src="https://i.imgur.com/ohFvRES.gif" border="0">',"kul").replace('<img src="https://i.imgur.com/gB7t8a3.gif">',"cześć").replace(/<(?:.|\n)*?>/gm,"").replace("&gt;","").toLowerCase().replace(":3","dwukropek trzy").replace(";_;","płaku płaku").replace("inb4","inbifor")}function rv_line_pre_normalize(e){return e.replace('<i style="font-size:50px" class="wycop wycop-bartoszewski">',"bartoszewski fejs").replace('<i style="font-size:50px" class="wycop wycop-karachan">',"ka ra czan").replace('<i style="font-size:50px" class="wycop wycop-papiez">',"papież fejs")}function rv_speak_line_info(t){if(!(t=rv_line_pre_normalize(t)).startsWith("<"))return[t,{pitch:1}];var a=$(t);if(a.hasClass("quotelink")){var i=a.text().replace(">>","");return i.indexOf("OP")>1&&(i="opa"),["do posta "+i,{pitch:1}]}return a.hasClass("postlink")?["link do strony "+a.text().split("://")[1].split("/")[0],{pitch:1}]:a.hasClass("quote")?[a.text().replace(">",""),{pitch:1.6*Math.random()+.3}]:"IMG"==a[0].tagName?"https://i.imgur.com/ohFvRES.gif"==a.attr("src")?["kul",{pitch:1}]:"https://i.imgur.com/gB7t8a3.gif"==a.attr("src")?["cześć",{pitch:1}]:["obrazek",{pitch:1}]:"S"==a[0].tagName?[a.text(),{pitch:1}]:"U"==a[0].tagName?[a.text(),{pitch:.5}]:"B"==a[0].tagName?[a.text(),{volume:1.5}]:[a.text()]}function rv_rec_speak(e,n){if(0!=e.length){var r=rv_speak_line_info(e[0]),s=rv_text_normalize(r[0]),l=r[1];0==s.length&&rv_rec_speak(e.slice(1,e.length));var t=Object.assign({},{onend:function(){rv_rec_speak(e.slice(1,e.length),n)}},l);responsiveVoice.speak(s,n,t)}}function rv_prepare(e,n){for(var r=e.split("<br>"),s=[],l=0;l<r.length;l++)r[l].length>1&&s.push(r[l]);rv_rec_speak(s.slice(0,s.length-1),n)}
// mitsuba cog
const openTab=function(a){if(!a.hasClass("tab-opened")){var e=a.parent().children(".tab-opened");e.removeClass("tab-opened"),$("#"+e.data("tab-ref")).removeClass("opened"),a.addClass("tab-opened"),$("#"+a.data("tab-ref")).addClass("opened")}};
////// end shared functions

// anti-bible must be executed before page load
if (localStorage.o_kdeluxe_anti_bible == 1) {
    var bsePd = window.addEventListener('beforescriptexecute', e => {
        e.target.removeEventListener('beforescriptexecute', bsePd);

        let filename = filename_from_url(e.target.src);
        if (filename == "htmlshiv.js") {
            e.preventDefault();
            log("Anti-Bible was executed");
        }

    });
}

// suppress meaningless errors
window.addEventListener("error", (event) => {
    let filename = filename_from_url(event.filename);

    // emblite errors
    if (filename == "emblite.js")
        event.preventDefault();
});

window.addEventListener('load', function() {
    // count execution time
    var execution_start_time = performance.now()

    log(`Page finished loading!`);
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
        const add_settings_option = function(option, label, tooltip) {
            kdeluxe_settings_tab.append(`<input type="checkbox" name="o_kdeluxe_${option}" id="opt_kdeluxe_${last_id}" checked="checked">`);
            kdeluxe_settings_tab.append(`<label for="opt_kdeluxe_${last_id}" title="${tooltip}">${label}</label>`);
            // imageboardSettings.push( { o_kdexule_${option}: { desktop: 1, mobile: 1} } );
            last_id++;
        }

        add_settings_option("autoscroll", "Auto Scroll", "Dodaje opcje automatycznego przewijania freda, którą można w(y)łączyć na samym dole strony");
        add_settings_option("spoiler_revealer", "Spoiler Revealer", "Odkrywa wszystkie spoilery więc nie trzeba na nie najeżdżać");
        add_settings_option("advanced_filters", "Advanced Filters", "Filtry ala ublock ułatwiające korzystanie z czana, w tym heurystyczne");
        add_settings_option("anti_bible", "Anti Bible", "Nie pozwala na załadowanie biblii (htmlshiv.js)");
        add_settings_option("better_embed", "Better Embeds", "Zamienia ciężkie embedy na miniaturki z tytułem, które przekierowują do filmu");
        add_settings_option("vibrant_night", "Vibrant Night", "Ukrywa /noc/ kiedy nie jest dostępna"); // , a w nocy dodaje lampy na całej stronie i lekko ją przyciemnia
        add_settings_option("blind_mode_tts", "Blind Mode (TTS)", "Dodaje obok postów opcję text to speech czyli czytania na głos");
        add_settings_option("new_keyframes", "New Keyframe Animations", "Dodaje różne nowe filtry, np. #robercik, #R");
    }

    //// New keyframes
    if (localStorage.o_kdeluxe_new_keyframes == 1) {
        log("New Keyframe Animations Loaded...");
        $(`<style type='text/css'>@keyframes robert{from{background-color:green;color:#fff}to{background-color:#fff;color:green}}.maxiu{background-color:red;color:#ff0}</style>`).appendTo("head");

        $('.postMessage').each(function(){
            var _this = $(this);
            var str = _this.html().replace(/#robercik/g, "<span style=\"animation: robert ease-in 500ms infinite alternate; font-weight: bold;\">BRAWO ROBERCIK</span>");
            str = str.replace(/#R/g, "<span class=\"maxiu\" style=\"font-weight: bold;\">#R REVOLUTION</span>");
            _this.html(str);
        });
    }

    //// Blind Mode (TTS)
    if (localStorage.o_kdeluxe_blind_mode_tts == 1) {
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
    if (localStorage.o_kdeluxe_autoscroll == 1) {
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

    //// Filters
    if (localStorage.o_kdeluxe_advanced_filters == 1) {
        let rcount = 0;

        const ele_blacklist = ["#smok", "#jesli-zablokujesz-tego-diva-ukraina-odniesie-zwyciestwo", "#regulamin"]
        ele_blacklist.forEach(function(item, index) {
            if ($(item).length) {
                $(item).remove();
                rcount++;
            }
        });
        // $('div').each(function(){if(this.className.length==40)this.remove();}); // czerwonka
        // $(document).ready(function(){$('iframe[src*="https://www.youtube.com/embed/j0aAiKSUzJM?autoplay=1"]').remove();}); // embedy


        localStorage.xD = 'xD';

        log(`Advanced Filters Loaded...`);
        log(`Filtered ${rcount} elements!`);
    }


    //// Better Embed
    {
        if (localStorage.o_kdeluxe_better_embed == 1) {
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
    }

    log(`Finished in ${performance.now() - execution_start_time}ms`);
})
