console.log(`[KDeluxe] ThreadWatcher Sort Loaded...`);
let performance_threadwatcher_sort = performance.now()

function jebanie() {
    chuj = $("#watched_list").find(".watch-link");
    for (i = 0; i < chuj.length; i++) {
        c = chuj[i];
        dupa = $(c).find('.unreadPostsNumber')[0];
        if ($(dupa).text().search('[0]') == -1 && $(dupa).text().search("Ładowanie") == -1) {
            $(dupa).css('color', 'lime');
        } else {
            $(dupa).css('color', '');
        }
    }
}


function callback(mutationList) {
    jebanie();
}

sraka = document.getElementById('watched_list');
guwno = {
    childList: true,
    subtree: true,
    characterData: true
};
kutas = new MutationObserver(callback);
kutas.observe(sraka, guwno);

(() => {
    let addCSS = (css) => {
        var c = document.createElement("style");
        c.type = "text/css";
        c.innerHTML = css;
        document.head.appendChild(c);
    };

    let observer = new MutationObserver(muts => {
        muts.forEach(mut => {
            if (mut.target.classList.contains("unreadPostsNumber")) {
                let unreadPosts = parseInt(mut.addedNodes[0].nodeValue.trim().match(/\[(\d+)\]/)[1]);
                let entry_id = mut.target.parentNode.parentNode.getAttribute("id");
                addCSS(`#${entry_id} { order: -${unreadPosts}};`); // magic
            }
        });
    });

    $(() => {
        addCSS(`
#watched_list {
	display: flex;
	flex-direction: column;
}`);
        observer.observe(document.getElementById("watcher_box"), {
            childList: true,
            subtree: true
        });
    });
})();

console.log(`[KDeluxe] [⏱️] ThreadWatcher Sort loaded in ${performance.now() - performance_threadwatcher_sort}ms`);
