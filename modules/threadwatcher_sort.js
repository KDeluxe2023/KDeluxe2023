{
    console.log(`[KDeluxe] ThreadWatcher Sort Loaded...`);
    let performance_timer = performance.now()

    function color_unread() {
        let watch_links = $("#watched_list").find(".watch-link");
        for (i = 0; i < watch_links.length; i++) {
            let unread_count = $(watch_links[i]).find('.unreadPostsNumber')[0];
            if ($(unread_count).text().search('[0]') == -1 && $(unread_count).text().search("Ładowanie") == -1) {
                $(unread_count).css('color', 'lime');
            } else {
                $(unread_count).css('color', '');
            }
        }
    }


    let watch_list = document.getElementById('watched_list');
    let m_settings = {
        childList: true,
        subtree: true,
        characterData: true
    };
    m_observer = new MutationObserver(color_unread);
    m_observer.observe(watch_list, m_settings);

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
                    addCSS(`#${entry_id} { order: -${unreadPosts}};`);
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

    console.log(`[KDeluxe] [⏱️] ThreadWatcher Sort loaded in ${performance.now() - performance_timer}ms`);
}
