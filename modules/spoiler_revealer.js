{
    let performance_timer = performance.now();
    console.log(`[KDeluxe] Spoiler Revealer Loaded...`);

    $("<style type='text/css'>s { color: white!important; }</style>").appendTo("head");

    // TO-DO: implement this pseudo-code:
    // foreach <img src="../img/spoiler.png" alt="Spoiler image" style="width: 170px">
    // set src to parent <a> href attribute
    // (do this via mutationobserver)

    console.log(`[KDeluxe] [⏱️] Spoiler Revealer finished in ${performance.now() - performance_timer}ms`);
}
