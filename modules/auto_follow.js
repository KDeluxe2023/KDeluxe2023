{
    $('#postform').on('submit', function(e) {
        e.preventDefault();
        let watchlink = $(".watch-button-container a")[0];
        if (watchlink.innerText.trim() == "[Obserwuj]") {
            watchlink.click();
            console.log(`[KDeluxe] Auto Follow Executed`);
        }
    });
}
