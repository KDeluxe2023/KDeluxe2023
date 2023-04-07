{
    // First make sure htmlshiv.js is loaded, so we're not making unnecessary requests
    const isScriptLoaded = filename =>
        new Promise(resolve => {
            const script = document.createElement('script');
            script.src = filename;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.head.appendChild(script);
        });

    isScriptLoaded('https://karachan.org/js/htmlshiv.js')
        .then(result => {
            if (!result) {
                console.error('[KDeluxe] Anti-bible didnt load because htmlshiv.js was already unloaded');
                return;
            }

            (async function() {
                try {
                    const response = await fetch(document.URL);
                    const text = await response.text();
                    const doc = new DOMParser().parseFromString(text, 'text/html');
                    const posts = doc.querySelectorAll('blockquote:not(.blockquoteReply)');
                    for (const post of posts) {
                        const non_js_text = post.innerHTML;
                        if (non_js_text !== null) {
                            const target = document.getElementById(post.id);
                            if (target) {
                                target.innerHTML = non_js_text;
                            }
                        }
                    }
                } catch (err) {
                    console.error(`[KDeluxe] Anti-bible error: ${err}`);
                }
            })();
        });
}
