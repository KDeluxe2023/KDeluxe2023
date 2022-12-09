if (localStorage.o_kdeluxe_uid_curb == 1) {
    console.log(`[KDeluxe] UID Curb Initialized...`);
    let performance_uid_curb = performance.now()

    // add clear button
    $("#settingsSave").after(`<input type="button" value="Clear Curbed UIDs" id="clear_curb_list">`);
    $("#clear_curb_list").click(function(e) {
        e.preventDefault();
        localStorage.o_kdeluxe_curbed_uids = "";
        window.location.reload();
    });

    function appendToStorage(name, data) {
        var old = localStorage.getItem(name);
        if (old === null) {
            old = "";
        }
        localStorage.setItem(name, old + data);
    }

    // TO-DO: move this loop to shared post iteration loop
    $('.postInfo').each(function(index) {
        // skip main post, mitsuba already lets you curb it
        if (index == 0) // if ($(this).find("span.subject").length)
            return true;

        // fetch id
        let uid = $(this).find(".posteruid").attr("title");
        if (uid === undefined)
            return true;

        // TO-DO: optimize this somehow, it takes 100ms to add this shit on every iteration
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
        console.log(`[KDeluxe] Curbed ${count-1} UIDs`);
    }

    console.log(`[KDeluxe] [⏱️] UID Curb loaded in ${performance.now() - performance_uid_curb}ms`);
}
