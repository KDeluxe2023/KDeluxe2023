{
    console.log(`[KDeluxe] Anti-bible Loaded...`);
    let performance_timer = performance.now()

    // first make sure htmlshiv.js is loaded, so we're not make unnecessary request
    const isScriptLoaded = filename => new Promise(resolve => (document.head.appendChild(Object.assign(document.createElement('script'), {src: filename, onload: () => resolve(true), onerror: () => resolve(false)}))));
    isScriptLoaded('https://karachan.org/js/htmlshiv.js').then((result) => {
        if (result) {
            (async function() {
                try {
                    if (document.URL) {
                        const response = await fetch(document.URL);
                        const text = await response.text();
                        const doc = document.implementation.createHTMLDocument();
                        doc.write(text);
                        const posts = document.getElementsByTagName("blockquote");
                        for (const post of posts)
                            post.innerHTML = doc.getElementById(post.id).innerHTML;

                        console.log(`[KDeluxe] [⏱️] Anti-bible loaded in ${performance.now() - performance_timer}ms`);
                    }
                } catch (err) {
                    console.error(`[KDeluxe] ${err}`);
                }
            }());
        } else {
            console.error(`[KDeluxe] Anti-bible didnt load because htmlshiv.js was already unloaded`);
        }
    });
}
