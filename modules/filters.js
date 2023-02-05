{
    console.log(`[KDeluxe] Heuristic Filters Initiated...`);
    let performance_timer = performance.now();

    // accept TOS
    document.cookie = 'regulamin=accepted; expires=Sun, 1 Jan 2030 00:00:00 UTC; path=/';

    // hide unwanted elements
    function addStyle(innerHTML) {
        document.head.appendChild(
            Object.assign(document.createElement('style'), {
                type: 'text/css',
                innerHTML: innerHTML
            })
        );
    }
    // wszechstronny miszcz
    addStyle('#smok { display: none !important; }');
    // świnie
    addStyle('#jesli-zablokujesz-tego-diva-ukraina-odniesie-zwyciestwo { display: none !important; }');
    // stopka mitsubowska
    addStyle('.absBotDisclaimer { display: none !important; }');
    // kapcza w stopce
    addStyle('.grecaptcha-badge { display: none !important; }');

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
            rcount++;
        }
    });

    // Anti: Malicious CSS
    /*
    const style = document.createElement('style');
    style.innerHTML = ".anti_css { transform: rotate(0deg) !important; }";
    document.head.appendChild(style);

    const revert_ele = [".board"];
    revert_ele.forEach(function(item) {
        const elements = document.querySelectorAll(item);
        if (elements.length > 0) {
            Array.prototype.forEach.call(elements, function(element) {
                element.classList.add('anti_css');
            });
        }
    });*/

    // Anti-wirówka
    localStorage.xD = 'xD';

    console.log(`[KDeluxe] [⏱️] Heuristic Filters loaded in ${performance.now() - performance_timer}ms`);
}
