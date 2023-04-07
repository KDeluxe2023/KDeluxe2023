{
    // Anti-wirówka
    localStorage.setItem('xD', 'xD');

    // Define the selectors for the elements to hide
    const selectors = [
        '#jesli-zablokujesz-tego-diva-ukraina-odniesie-zwyciestwo',
        '#smok',
        '.absBotDisclaimer'
    ].join(', ');

    // Define the styles to hide the elements
    const styles = `${selectors} { display: none !important; }`;

    // Add the styles to the head of the document
    document.head.insertAdjacentHTML('beforeend', `<style type="text/css">${styles}</style>`);

    // Remove the elements from the DOM after hiding them
    document.querySelectorAll(selectors).forEach(el => el.remove());

    // accept TOS
    document.cookie = 'regulamin=accepted; expires=Sun, 1 Jan 2030 00:00:00 UTC; path=/';

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
}
