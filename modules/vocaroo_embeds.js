{
    console.log(`[KDeluxe] Vocaroo Embeds Loaded...`);
    let performance_timer = performance.now()

    function get_domain(full_url) {
        var matches = full_url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        return matches && matches[1];
    }

    $('.postlink').each(function(i, obj) {
        let link = $(this).attr('href');
        let domain = get_domain(link);
        if (domain == "vocaroo.com") {
            let recording_code = link.split("/")[3];
            $(this).replaceWith(`<div>
        <iframe width="300" height="60" src="https://vocaroo.com/embed/${recording_code}?autoplay=0" frameborder="0" allow="autoplay"></iframe>
        <!--<br><a href="https://voca.ro/${recording_code}" title="Vocaroo Nagrywanie Głosu" target="_blank">Wyświetl na Vocaroo &gt;&gt;</a>-->
        </div>`);
        }
    });
    console.log(`[KDeluxe] [⏱️] Vocaroo Embeds loaded in ${performance.now() - performance_timer}ms`);
}
