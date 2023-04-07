{
    const getPrevNext = (posts, postIndex) => {
        let prevHref = null;
        let nextHref = null;

        let uid_element_m = posts[postIndex].querySelector(".posteruid");
        if (!uid_element_m)
            return [null, null];

        const posterUid = uid_element_m.id;

        // Find previous post of same user.
        for (let i = postIndex - 1; i >= 0; i--) {
            if (posts[i].querySelector(".posteruid").id === posterUid) {
                const id = posts[i].id.slice(2);
                const OP = posts[0].id.slice(2);
                prevHref = `<a href="../../b/res/${OP}.html#p${id}" class="quotelink"><i class="fa fa-arrow-left" aria-hidden="true"></i> ${id}</a>`;
                break;
            }
        }
        // Find next post of same user
        for (let i = postIndex + 1; i < posts.length; i++) {
            let uid_element = posts[i].querySelector(".posteruid");
            if (!uid_element)
                break;

            if (uid_element.id === posterUid) {
                const id = posts[i].id.slice(2);
                const OP = posts[0].id.slice(2);
                nextHref = `<a href="../../b/res/${OP}.html#p${id}" class="quotelink">${id} <i class="fa fa-arrow-right" aria-hidden="true"></i></a>`;
                break;
            }
        }

        // TO-DO: fix this retarded shit returning null when called from mutation_observer
        console.log(prevHref);
        console.log(nextHref);
        return [prevHref, nextHref];
    };

    const addPrevNextLinks = (specificPostInfo = null) => {
        let posts = null;
        if (specificPostInfo && specificPostInfo.nodeType === Node.ELEMENT_NODE) {
            posts = [specificPostInfo];
        } else {
            posts = document.querySelectorAll(".postInfo");
        }

        posts.forEach((post, index) => {
            const [prevHref, nextHref] = getPrevNext(posts, index);

            if (nextHref === null && prevHref === null) return;

            let link = "";
            if (nextHref === null) link = `<span>[${prevHref}]</span>`;
            else if (prevHref === null) link = `<span>[${nextHref}]</span>`;
            else link = `<span>[${prevHref} | ${nextHref}]</span>`;

            const linkElement = document.createElement("span");
            linkElement.innerHTML = link;
            post.appendChild(linkElement);
        });
    };

    addPrevNextLinks();

    function handle_dom_mutation_pn(mutationsList) {
        for (const mutation of mutationsList) {
            for (const addedNode of mutation.addedNodes) {
                if (addedNode.nodeType === Node.ELEMENT_NODE) {
                    const posterUids = addedNode.querySelectorAll('.posteruid');
                    if (posterUids.length > 0) {
                        for (const posterUid of posterUids) {
                            const postInfo = posterUid.closest('.postInfo');
                            if (postInfo) {
                                setTimeout(() => {
                                    console.log(postInfo);
                                    addPrevNextLinks(postInfo);
                                }, 400);
                            }
                        }
                        break;
                    }
                }
            }
        }
    }

    const observer = new MutationObserver(handle_dom_mutation_pn);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
