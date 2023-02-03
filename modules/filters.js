{
    console.log(`[KDeluxe] Heuristic Filters Initiated...`);
    let performance_timer = performance.now()

    // accept TOS
    setCookie('regulamin', 'accepted', 365);

    // remove unwanted elements
    let smok_stopka = document.getElementById("smok");
    if (smok_stopka)
        smok_stopka.style.display = 'none';
    
    let swinie = document.getElementById("jesli-zablokujesz-tego-diva-ukraina-odniesie-zwyciestwo");
    if (swinie)
        swinie.style.display = 'none';
    
    let stopka_mitsuba = document.getElementsByClassName('absBotDisclaimer');
    if (stopka_mitsuba)
        stopka_mitsuba[0].style.display = 'none';
    
    let stopka_kapcza = document.getElementsByClassName('grecaptcha-badge');
    if (stopka_kapcza)
        stopka_kapcza[0].style.display = 'none';

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
    });

    // Anti-wirówka
    localStorage.xD = 'xD';

    console.log(`[KDeluxe] [⏱️] Heuristic Filters loaded in ${performance.now() - performance_timer}ms`);
}
