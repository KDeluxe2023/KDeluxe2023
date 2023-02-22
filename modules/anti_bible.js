{
    console.log(`[KDeluxe] Anti-bible Loaded...`);
    let performance_timer = performance.now()

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
            }
        } catch (err) {
            console.error(err);
        }
    }());

    console.log(`[KDeluxe] [⏱️] Anti-bible loaded in ${performance.now() - performance_timer}ms`);
}
