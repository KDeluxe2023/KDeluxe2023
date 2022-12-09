if (localStorage.o_kdeluxe_radioradio_player == 1) {
    console.log(`[KDeluxe] Radioradio Player Loaded...`);
    let performance_radioradio_player = performance.now()

    const d = new Date();
    let day = d.getDay();
    let hour = d.getHours();

    function display_player(label) {
        $(`#postform`).after(`
        <div id="radioradio_player">
        <figure>
           <figcaption>SŁUCHAJ AUDYCJI ${label}, TERAZ NA ŻYWO:</figcaption>
           <audio controls autoplay src="https://c16.radioboss.fm:18014/stream"></audio>
        </figure>
        </div>`);
        $("#radioradio_player").css({
            "text-align": "center"
        });
    }

    let lbl = null;

    if (day == 4 && hour >= 22 || day == 5 && hour <= 5)
        lbl = "Info Tydzień";

    if (day == 6 && hour >= 0 && hour <= 6)
        lbl = "👽Teoria Chaosu👽";

    if (day == 2 && hour >= 21)
        lbl = "Radioaktywnej";

    if (lbl != null)
        display_player(lbl)

    console.log(`[KDeluxe] [⏱️] RadioRadio Player loaded in ${performance.now() - performance_radioradio_player}ms`);
}
