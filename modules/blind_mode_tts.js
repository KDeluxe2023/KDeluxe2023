{
    var script = document.createElement('script');
    script.src = `https://code.responsivevoice.org/responsivevoice.js?key=ZBLsY9RB`;

    script.onload = function() {
        function wait_for_api() {
            if (typeof responsiveVoice !== "undefined") {
                function rv_text_normalize(e) {
                    return e.replace(/<(?:.|\n)*?>/gm, "").replace("&gt;", "").toLowerCase().replace(":3", "dwukropek trzy").replace(";_;", "płaku płaku").replace("inb4", "inbifor")
                }

                function rv_line_pre_normalize(e) {
                    return e.replace('<i style="font-size:50px" class="wycop wycop-bartoszewski">', "bartoszewski fejs").replace('<i style="font-size:50px" class="wycop wycop-karachan">', "ka ra czan").replace('<i style="font-size:50px" class="wycop wycop-papiez">', "papież fejs")
                }

                function rv_speak_line_info(e) {
                    if (!(e = rv_line_pre_normalize(e)).startsWith("<")) return [e, {
                        pitch: 1
                    }];
                    var t = $(e);
                    if (t.hasClass("quotelink")) {
                        var r = t.text().replace(">>", "");
                        return r.indexOf("OP") > 1 && (r = "opa"), ["do posta " + r, {
                            pitch: 1
                        }]
                    }
                    return t.hasClass("postlink") ? ["link do strony " + t.text().split("://")[1].split("/")[0], {
                        pitch: 1
                    }] : t.hasClass("quote") ? [t.text().replace(">", ""), {
                        pitch: 1.6 * Math.random() + .3
                    }] : "IMG" == t[0].tagName ? "https://i.imgur.com/ohFvRES.gif" == t.attr("src") ? ["kul", {
                        pitch: 1
                    }] : "https://i.imgur.com/gB7t8a3.gif" == t.attr("src") ? ["cześć", {
                        pitch: 1
                    }] : ["obrazek", {
                        pitch: 1
                    }] : "S" == t[0].tagName ? [t.text(), {
                        pitch: 1
                    }] : "U" == t[0].tagName ? [t.text(), {
                        pitch: .5
                    }] : "B" == t[0].tagName ? [t.text(), {
                        volume: 1.5
                    }] : [t.text()]
                }

                function rv_rec_speak(e, t) {
                    if (0 != e.length) {
                        var r = rv_speak_line_info(e[0]),
                            a = rv_text_normalize(r[0]),
                            i = r[1];
                        0 == a.length && rv_rec_speak(e.slice(1, e.length));
                        var p = Object.assign({}, {
                            onend: function() {
                                rv_rec_speak(e.slice(1, e.length), t)
                            }
                        }, i);
                        responsiveVoice.speak(a, t, p)
                    }
                }

                function rv_prepare(e, t) {
                    for (var r = e.split("<br>"), a = [], i = 0; i < r.length; i++) r[i].length > 1 && a.push(r[i]);
                    rv_rec_speak(a.slice(0, a.length - 1), t)
                }

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
                    $(".tts_controls").css({
                        "margin-left": "3px"
                    });
                    console.log(`[KDeluxe] TTS Links Refreshed`);
                }

                function rv_init() {
                    console.log(`[KDeluxe] Blind Mode (TTS) Loaded...`);

                    rv_add_links();

                    $('a[href="#stop_tts"]').click(function(e) {
                        e.preventDefault();

                        if (responsiveVoice.isPlaying()) {
                            responsiveVoice.pause();
                            //responsiveVoice.resume();
                        }
                    });

                    $('a[data-rv]').click(function(e) {
                        e.preventDefault();
                        var rv_content = $(this).parents('.post').find('.postMessage').html();
                        var rv_voice = ($(this).attr('data-rv') == 'male') ? 'Polish Male' : 'Polish Female';

                        rv_prepare(rv_content, rv_voice);
                    });
                }

                rv_init();
                responsiveVoice.CHARACTER_LIMIT = 6000;
                window.setInterval(rv_add_links, 5000);

                console.log(`[KDeluxe] [⏱️] Blind Mode TTS loaded in ${performance.now() - performance_blind_mode_tts}ms`);

            } else {
                setTimeout(wait_for_api, 1000 * 1);
            }
        }
        wait_for_api();
    };
    document.head.appendChild(script);
}
