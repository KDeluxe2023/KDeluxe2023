{
    console.log('[KDeluxe] UID Curb Initialized...');
    const performance_timer = performance.now();

    document.getElementById('clear_curb_list').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.o_kdeluxe_curbed_uids = '';
        window.location.reload();
    });

    function append_to_lstorage(name, data) {
        const old = localStorage.getItem(name);
        localStorage.setItem(name, old ? old + data : data);
    }

    function curb_posts_with_specific_uid(targetUID) {
        const blacklist = document.querySelectorAll(`span.posteruid[title="${targetUID}"]`);
        for (const item of blacklist) {
            //item.closest('.post').style.display = 'none';
            item.closest('.post').remove();
        }
    }

    function attach_curb_button(postInfo) {
        const uidElement = postInfo.querySelector('.posteruid');
        if (uidElement) {
            const uid = uidElement.getAttribute('title');
            const button = document.createElement('a');
            button.setAttribute('href', '#');
            button.setAttribute('class', 'curb_action');
            button.setAttribute('uid', uid);
            button.textContent = '[–]';
            postInfo.appendChild(button);
        }
    }

    function attach_curb_buttons_all() {
        const infobars = Array.from(document.querySelectorAll('.postInfo')).slice(1);
        for (const postInfo of infobars) {
            attach_curb_button(postInfo);
        }
    }

    function handle_curb_btn_click(event) {
        event.preventDefault();
        const uid = event.target.getAttribute('uid');
        append_to_lstorage('o_kdeluxe_curbed_uids', uid + ';');
        curb_posts_with_specific_uid(uid);
    }

    function add_curb_btn_click_handlers() {
        document.querySelectorAll('.curb_action').forEach(elem => {
            elem.removeEventListener('click', handle_curb_btn_click);
            elem.addEventListener('click', handle_curb_btn_click);
        });
    }

    function curb_all_blacklisted_uids() {
        const hiddenPosters = localStorage.getItem('o_kdeluxe_curbed_uids');
        if (hiddenPosters) {
            const hiddenPostersArr = hiddenPosters.split(';');
            for (const blacklistedUID of hiddenPostersArr) {
                curb_posts_with_specific_uid(blacklistedUID);
            }
        }
    }

    curb_all_blacklisted_uids();
    attach_curb_buttons_all();
    add_curb_btn_click_handlers();

    function handle_dom_mutation(mutationsList) {
        for (const mutation of mutationsList) {
            for (const addedNode of mutation.addedNodes) {
                if (addedNode.nodeType === Node.ELEMENT_NODE) {
                    const posterUids = addedNode.querySelectorAll('.posteruid');
                    if (posterUids.length > 0) {
                        curb_all_blacklisted_uids();
                        for (const posterUid of posterUids) {
                            const postInfo = posterUid.closest('.postInfo');
                            if (postInfo) {
                                attach_curb_button(postInfo);
                            }
                        }
                        add_curb_btn_click_handlers();
                        break;
                    }
                }
            }
        }
    }

    const observer = new MutationObserver(handle_dom_mutation);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log(`[KDeluxe] [⏱️] UID Curb loaded in ${performance.now() - performance_timer}ms`);
}
