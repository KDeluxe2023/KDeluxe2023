{
    let performance_timer = performance.now();
    console.log(`[KDeluxe] Spoiler Revealer Loaded...`);

    document.head.appendChild(
        Object.assign(document.createElement('style'), {
            type: 'text/css',
            innerHTML: 's { color: white !important; }'
        })
    );

    // TO-DO: implement this pseudo-code:
    // foreach <img src="../img/spoiler.png" alt="Spoiler image" style="width: 170px">
    // set src to parent <a> href attribute
    // (do this via mutationobserver)

    console.log(`[KDeluxe] [⏱️] Spoiler Revealer finished in ${performance.now() - performance_timer}ms`);
}
