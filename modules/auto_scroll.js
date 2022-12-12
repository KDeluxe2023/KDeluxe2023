{
    console.log(`[KDeluxe] Autoscroll Loaded...`);
    let performance_autoscroll = performance.now()

    var autoscroll;
    $(".uinfo").before('[<input type="checkbox" class="as-box"/>Autoscroll] '), $(".as-box").change(function() {
        this.checked ? autoscroll = setInterval(function() {
            var o = $(".postnew:last");
            o.length && $("html, body").animate({
                scrollTop: o.offset().top
            }, "slow")
        }, 1e3) : clearInterval(autoscroll)
    })

    console.log(`[KDeluxe] [⏱️] Autoscroll loaded in ${performance.now() - performance_autoscroll}ms`);
}
