{
    console.log(`[KDeluxe] Auto Follow Loaded...`);
    let performance_autofollow = performance.now()

    $('#postform').on('submit', function(e) {
        e.preventDefault();
        let watchlink = $(".watch-button-container a")[0];
        if (watchlink.innerText.trim() == "[Obserwuj]") {
            watchlink.click();
            console.log(`[KDeluxe] Auto Follow Executed`);
        }
    });

    console.log(`[KDeluxe] [⏱️] Autofollow loaded in ${performance.now() - performance_autofollow}ms`);
}
