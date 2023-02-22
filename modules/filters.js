{
    console.log(`[KDeluxe] Heuristic Filters Initiated...`);
    let performance_timer = performance.now();

    // Anti-wirówka
    localStorage.xD = 'xD';

    // hide unwanted elements
    function addStyle(innerHTML) {
        document.head.appendChild(
            Object.assign(document.createElement('style'), {
                type: 'text/css',
                innerHTML: innerHTML
            })
        );
    }

    // świnie
    addStyle('#jesli-zablokujesz-tego-diva-ukraina-odniesie-zwyciestwo { display: none !important; }');
    // wszechstronny miszcz
    addStyle('#smok { display: none !important; }');
    // stopka mitsubowska
    addStyle('.absBotDisclaimer { display: none !important; }');
    // kapcza w stopce
    addStyle('.grecaptcha-badge { display: none !important; }');

    // accept TOS
    document.cookie = 'regulamin=accepted; expires=Sun, 1 Jan 2030 00:00:00 UTC; path=/';

    // hide old admin message
    const globalMessageElem = document.getElementById('globalMessage');
    const shouldHide = globalMessageElem.textContent.includes('Wyniki Ankiety');

    if (shouldHide) {
        // get neighbor <hr> element
        const prevHr = globalMessageElem.previousElementSibling;

        globalMessageElem.style.display = 'none'; // hide the globalMessage element
        prevHr.style.display = 'none'; // hide the previous <hr> element
    }

    // remove invisible iframes
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(function(item) {
        let src = item.getAttribute('src');

        if (src == undefined)
            return true;

        // skip grecaptcha
        if (src.indexOf("www.google.com/recaptcha/") >= 0) {
            return true;
        }

        let width = item.getAttribute('width');
        let height = item.getAttribute('width');

        if (width < 5 || height < 5) {
            item.parentNode.removeChild(item);
            console.log("[KDeluxe] Removed invisible iframe");
        }
    });

    console.log(`[KDeluxe] [⏱️] Heuristic Filters loaded in ${performance.now() - performance_timer}ms`);
}
