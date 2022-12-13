{
    console.log(`[KDeluxe] Heuristic Filters Initiated...`);
    let performance_timer = performance.now()

    // accept TOS
    setCookie('regulamin', 'accepted', 365);

    // remove unwanted elements
    document.getElementById("smok").style.display = 'none';
    document.getElementById("jesli-zablokujesz-tego-diva-ukraina-odniesie-zwyciestwo").style.display = 'none';
    document.getElementById("regulamin").style.display = 'none';
    document.getElementsByClassName('absBotDisclaimer')[0].style.display = 'none';
    document.getElementsByClassName('grecaptcha-badge')[0].style.display = 'none';

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
