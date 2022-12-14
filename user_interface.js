{
    let performance_timer = performance.now()

    // mitsuba func used to switch tabs
    const openTab = function(a) {
        if (!a.hasClass("tab-opened")) {
            var e = a.parent().children(".tab-opened");
            e.removeClass("tab-opened"), $("#" + e.data("tab-ref")).removeClass("opened"), a.addClass("tab-opened"), $("#" + a.data("tab-ref")).addClass("opened")
        }
    };

    // select mitsuba's settings form
    let settings_container = document.querySelector("#tab-settings .modal-cont");
    let settings_nav = document.querySelector(".modal-nav");

    // add tab dummy content
    settings_nav.insertAdjacentHTML('afterend', "<div id='tab-settings-deluxe' class='tab-content'><h2>Karachan Deluxe 2023</h2></div>");
    let kdeluxe_settings_tab = document.querySelector("#tab-settings-deluxe");
    kdeluxe_settings_tab.style.display = "none";

    // style indented checkboxes
    const style = document.createElement("style");
    style.innerHTML = `
    .indent {
      margin-left: 25px;
    }
    .indent label::before {
      border-bottom: 1px solid !important;
      border-left: 1px solid !important;
      margin-bottom: 5px !important;
      padding-left: 6px;
    }
`;
    document.head.appendChild(style);

    // add tab button
    $(settings_nav).prepend(
        $(`<li data-tab-ref='tab-settings-deluxe'>KDeluxe 2023</li>`)
        .click(function() {
            openTab($(this));
            return false;
        })
    );

    // populate settings tab
    {
        let last_id = 0;
        const add_settings_checkbox = function(internal_name, label, tooltip, indent = false) {
            if (indent) {
                kdeluxe_settings_tab.insertAdjacentHTML('beforeend', `<div class="indent"><input type="checkbox" name="o_kdeluxe_${internal_name}" id="opt_kdeluxe_${last_id}" checked="checked" /><label for="opt_kdeluxe_${last_id}" title="${tooltip}" style="cursor: help;">${label}</label></div>`);
            } else {
                kdeluxe_settings_tab.insertAdjacentHTML('beforeend', `<input type="checkbox" name="o_kdeluxe_${internal_name}" id="opt_kdeluxe_${last_id}" checked="checked" /><label for="opt_kdeluxe_${last_id}" title="${tooltip}" style="cursor: help;">${label}</label>`);
            }
            last_id++;
        }

        /*
        const add_settings_textbox = function(internal_name, label, tooltip) {
            kdeluxe_settings_tab.append(`<input type="text" name="o_kdeluxe_${internal_name}" id="opt_kdeluxe_${last_id}">`);
            kdeluxe_settings_tab.append(`<label for="opt_kdeluxe_${last_id}" title="${tooltip}" style="cursor: help;">${label}</label>`);

            last_id++;
        }

        const load_text_data = function(element, variable) {
            if (variable) {
                $("#" + element).text(variable);
            }
        }*/

        add_settings_checkbox("full_compatibility", "Full (BETA) Compatibility", "Wy????cza pageloader i fastreply ??eby ka??da funkcja w KDeluxe dzia??a??a w 100%");
        add_settings_checkbox("vocaroo_embeds", "Vocaroo Embeds", "Zamienia linki do vocaroo w postach na osadzony player");
        add_settings_checkbox("autoscroll", "Auto Scroll", "Dodaje opcje automatycznego przewijania freda, kt??r?? mo??na w(y)????czy?? na samym dole strony");
        add_settings_checkbox("spoiler_revealer", "Spoiler Revealer", "Odkrywa wszystkie spoilery wi??c nie trzeba na nie naje??d??a??");
        add_settings_checkbox("advanced_filters", "Heuristic Filters", "Filtry ala ublock u??atwiaj??ce korzystanie z czana, w tym heurystyczne");
        add_settings_checkbox("anti_bible", "Anti Bible", "Nie pozwala na za??adowanie biblii (htmlshiv.js)", true);
        add_settings_checkbox("catalog_curb", "Catalog Curb", "Pozwala kraw????nikowa?? z poziomu katalogu");
        add_settings_checkbox("uid_curb", "UID Curb", "Pozwala kraw????nikowa?? poszczeg??lnych anon??w we fredach");
        //add_settings_checkbox("smart_curb", "Smart Curb", "Automatycznie kraw????nikuje posty okre??lone automatycznie jako spam", true);
        add_settings_checkbox("better_embed", "Better Embeds", "Zamienia ci????kie embedy na miniaturki z tytu??em, kt??re przekierowuj?? do filmu");
        add_settings_checkbox("radioradio_player", "Teoria Chaosu??? Integration", "Wy??wietla player radioradio podczas audycji claude'a");
        add_settings_checkbox("ban_checker", "Ban Checker", "Wy??wietla status bana");
        add_settings_checkbox("password_changer", "Password Changer", "Zmienia has??o na losowe przy ka??dym za??adowaniu strony");
        add_settings_checkbox("fred_dumper", "Fred Dumper", "Pozwala zapisa?? obecnie otwarty fred jako jpg, dodatkowo pozwala pobra?? te?? obrazki osobno w zipie");
        add_settings_checkbox("auto_follow", "Auto Follow", "Automatycznie obserwuje temat, w kt??rym napiszemy posta (obecnie nie dzia??a z fast reply)");
        add_settings_checkbox("rich_stats", "Rich Statistics", "Dodaje okienko z r????nymi statystykami odno??nie twojej aktywno??ci na forum");
        add_settings_checkbox("external_links", "External Links", "Wszystkie linki otwieraj?? si?? teraz w nowym oknie");
        add_settings_checkbox("konfident_plus", "Konfident+", "Pozwala ??ledzi?? dalsze losy zg??oszonych przez siebie post??w");
        add_settings_checkbox("enhanced_postform", "Enhanced PostForm", "Zmieniony formularz postowania, z list?? wordfiltr??w i nie tylko");
        add_settings_checkbox("smart_boards", "Smart Boards", "Ukrywa /noc/ kiedy nie jest dost??pna");
        add_settings_checkbox("image_preview_anti_eyestrain", "Image Preview Anti-Eyestrain", "Dodaje przycisk do powi??kszonych obrazk??w, kt??ry pomaga ogl??da?? je w nocy");
        add_settings_checkbox("anti_screamer", "Anti Screamer", "Obni??a maksymaln?? g??o??no??c d??wi??ku odgrywanego przez stron?? do 70dB");
        add_settings_checkbox("dangerous_bambo", "Dangerous Bambo", "Dodaje biegaj??cego murzynka (bambo) na dole ekranu");
        add_settings_checkbox("new_keyframes", "New Keyframe Animations", "Dodaje r????ne nowe filtry, np. #robercik, #R, #deluxe");
        add_settings_checkbox("prev_next", "Jump To Post", "Pozwala skaka?? do nast??pnego/poprzedniego postu wybranego u??ytkownika");

        // TO-DO: fix those below
        //add_settings_checkbox("blind_mode_tts", "Blind Mode (TTS)", "Dodaje obok post??w opcj?? text to speech czyli czytania na g??os");
        //add_settings_checkbox("threadwatcher_sort", "ThreadWatcher Sort", "Sortuje obserwowane fredy tak, ??e te z nowymi odpowiedziami s?? na pocz??tku");

        //add_settings_textbox("override_board_name", "W??asny nag????wek na /b/", "Wpisz now?? nazwe deski /b/")
        //load_text_data("override_board_name", localStorage.o_kdeluxe_override_board_name);
    }

    kdeluxe_settings_tab.insertAdjacentHTML('beforeend', "<div id='kdeluxe_button_container' style='margin-top:8px;'><input type='button' style='margin-right: 5px;' value='Fix ThreadWatcher OOB' id='reset_thread_watcher' /></div>");
    document.getElementById("reset_thread_watcher").addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.KurahenPremium_WatchedThreads_Left = "10px";
        localStorage.KurahenPremium_WatchedThreads_Top = "10px";
        window.location.reload();
    });

    // add button used to clear curbed uids
    if (localStorage.o_kdeluxe_uid_curb == 1)
        document.getElementById("kdeluxe_button_container").innerHTML += "<input type='button' style='margin-right: 5px;' value='Clear Curbed UIDs' id='clear_curb_list' />";

    console.log(`[KDeluxe] [??????] Interface created in ${performance.now() - performance_timer}ms`);
}
