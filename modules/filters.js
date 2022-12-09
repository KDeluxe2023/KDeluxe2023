if (localStorage.o_kdeluxe_rich_stats == 1 /* && !g_special_page*/ ) {
    console.log(`[KDeluxe] Advanced Filters Initiated...`);
    let performance_filters = performance.now()

    let rcount = 0;

    // accept TOS
    setCookie('regulamin', 'accepted', 365);

    // remove unwanted elements
    const ele_blacklist = ["#smok", "#jesli-zablokujesz-tego-diva-ukraina-odniesie-zwyciestwo", "#regulamin", ".absBotDisclaimer"]
    ele_blacklist.forEach(function(item, index) {
        if ($(item).length) {
            $(item).remove();
            rcount++;
        }
    });

    // hide captcha badget
    if ($(".grecaptcha-badge").length) {
        $(".grecaptcha-badge").hide();
        rcount++;
    }

    // remove invisible iframes
    $("iframe").each(function() {
        let src = $(this).attr('src');
        if (src == undefined)
            return true;

        // skip grecaptcha
        if (src.indexOf("www.google.com/recaptcha/") >= 0)
            return true;

        let width = $(this).attr('width');
        let height = $(this).attr('width');

        if (width < 5 || height < 5) {
            $(this).remove();
            rcount++;

            log("Dropped invisible iframe: " + src);
        }
    });

    // Anti: Malicious CSS
    $(`<style type='text/css'>.anti_css { transform: rotate(0deg) !important; }</style>`).appendTo("head");

    const revert_ele = [".board"]
    revert_ele.forEach(function(item, index) {
        if ($(item).length) {
            $(item).addClass("anti_css");
        }
    });

    // Anti-wirówka
    localStorage.xD = 'xD';

    console.log(`[KDeluxe] Filtered ${rcount} elements!`);

    console.log(`[KDeluxe] [⏱️] Advanced Filters loaded in ${performance.now() - performance_filters}ms`);

}
