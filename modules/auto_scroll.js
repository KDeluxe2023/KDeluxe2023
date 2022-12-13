{
    console.log(`[KDeluxe] Autoscroll Loaded...`);
    let performance_timer = performance.now()

    /*
    PUREJS:
    const uInfo = document.querySelectorAll('.uinfo');
uInfo.forEach(element => {
    element.insertAdjacentHTML('beforebegin', `[<input type="checkbox" class="as-box"/>Autoscroll]`);
});


input.addEventListener('change', function() {
    if (this.checked) {
        autoscroll = setInterval(function() {
            const postNew = document.querySelector('.postnew:last-child');
            if (postNew) {
                window.scroll({
                    top: postNew.offset().top,
                    behavior: 'smooth'
                });
            }
        }, 1000);
    } else {
        clearInterval(autoscroll);
    }
});
    */
    var autoscroll;
    $(".uinfo").before('[<input type="checkbox" class="as-box"/>Autoscroll] '), $(".as-box").change(function() {
        this.checked ? autoscroll = setInterval(function() {
            var o = $(".postnew:last");
            o.length && $("html, body").animate({
                scrollTop: o.offset().top
            }, "slow")
        }, 1e3) : clearInterval(autoscroll)
    })

    console.log(`[KDeluxe] [⏱️] Autoscroll loaded in ${performance.now() - performance_timer}ms`);
}
