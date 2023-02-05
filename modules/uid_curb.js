{
    console.log('[KDeluxe] UID Curb Initialized...');
    const performanceTimer = performance.now();

    document.getElementById('clear_curb_list').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.o_kdeluxe_curbed_uids = '';
        window.location.reload();
    });

    function appendToStorage(name, data) {
        const old = localStorage.getItem(name);
        localStorage.setItem(name, old ? old + data : data);
    }

    function curbUIDsInDocument(targetUID) {
        const blacklist = document.querySelectorAll(
            `span.posteruid[title="${targetUID}"]`
        );
        for (const item of blacklist) {
            item.closest('.post').style.display = 'none';
        }
    }

    const infobars = Array.from(document.querySelectorAll('.postInfo')).slice(1);
    const curbButtons = [];
    for (const postInfo of infobars) {
        const uidElement = postInfo.querySelector('.posteruid');
        if (uidElement) {
            const uid = uidElement.getAttribute('title');
            const button = document.createElement('a');
            button.setAttribute('href', '#');
            button.setAttribute('class', 'curb_action');
            button.setAttribute('uid', uid);
            button.textContent = '[–]';
            curbButtons.push({
                button,
                postInfo
            });
        }
    }

    for (const {
            button,
            postInfo
        }
        of curbButtons) {
        if (postInfo.firstElementChild.tagName === 'INPUT') {
            postInfo.appendChild(button);
        }
    }

    document.querySelectorAll('.curb_action').forEach(elem => {
        elem.addEventListener('click', event => {
            event.preventDefault();
            const uid = elem.getAttribute('uid');
            appendToStorage('o_kdeluxe_curbed_uids', uid + ';');
            curbUIDsInDocument(uid);
        });
    });

    const hiddenPosters = localStorage.getItem('o_kdeluxe_curbed_uids');
    if (hiddenPosters) {
        const hiddenPostersArr = hiddenPosters.split(';');
        for (const blacklistedUID of hiddenPostersArr) {
            curbUIDsInDocument(blacklistedUID);
        }
    }

    console.log(
        `[KDeluxe] [⏱️] UID Curb loaded in ${performance.now() -
    performanceTimer}ms`
    );
}
