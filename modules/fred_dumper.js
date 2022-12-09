if (localStorage.o_kdeluxe_fred_dumper == 1) {
    log(`Fred Dumper Loaded...`);
    let performance_fred_dumper = performance.now()

    let bar = $('.post').first().find('.postInfo').first();
    bar.prepend(`<span id="dumper_container">[<a href="#" id="dump_thread"><i class="fa fa-download" aria-hidden="true"></i></a>]</span>`);
    $("#dumper_container").css({
        "margin-right": "3px"
    });

    // TO-DO: load required libraries for this on demand instead doing it on every script load
    $("#dump_thread").click(function(e) {
        e.preventDefault();
        dialogBox('KDeluxe', `Jak chcesz pobrać ten temat?`, ["Screenshot", "Screenshot + Pliki", "Tylko Pliki", "Anuluj"], 'fa-download', function(a) {
            // cancel
            if (a == 3)
                return;

            let fred_id = bar.attr("id").replace(/\D/g, '');
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
                function saveToZip(e, t) {
                    log("Generating zip...");
                    const n = new JSZip,
                        o = n.folder("project");
                    t.forEach((e => {
                        const t = fetch(e).then((e => 200 === e.status ? e.blob() : Promise.reject(new Error(e.statusText)))),
                            n = e.substring(e.lastIndexOf("/"));
                        o.file(n, t)
                    })), n.generateAsync({
                        type: "blob"
                    }).then((t => saveAs(t, e))).catch((e => console.log(e)))
                }

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
                function downloadURI(e, d) {
                    var o = document.createElement("a");
                    o.download = d, o.href = e, document.body.appendChild(o), o.click(), document.body.removeChild(o), delete o
                };

                // wait for dialogbox to disappear
                setTimeout(function() {
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
