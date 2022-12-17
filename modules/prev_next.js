{
    console.log(`[KDeluxe] Jump To Post Loaded...`);
    let performance_timer = performance.now()

    const getPrevNext = (posts, postIndex) => {
        let prevHref = null;
        let nextHref = null;

        const posterUid = posts[postIndex].getElementsByClassName("posteruid")[0].id;

        // Find previous post of same user.
        for (let i = postIndex - 1; i >= 0; i--) {
            if (posts[i].getElementsByClassName("posteruid")[0].id === posterUid) {
                const id = posts[i].id.slice(2);
                const OP = posts[0].id.slice(2);
                prevHref = `<a href="../../b/res/${OP}.html#p${id}" class="quotelink"><i class="fa fa-arrow-left" aria-hidden="true"></i> ${id}</a>`;
                break;
            }
        }
        // Find next post of same user
        for (let i = postIndex + 1; i < posts.length; i++) {
            if (posts[i].getElementsByClassName("posteruid")[0].id === posterUid) {
                const id = posts[i].id.slice(2);
                const OP = posts[0].id.slice(2);
                nextHref = `<a href="../../b/res/${OP}.html#p${id}" class="quotelink">${id} <i class="fa fa-arrow-right" aria-hidden="true"></i></a>`;
                break;
            }
        }

        return [prevHref, nextHref];
    };

    const posts = document.getElementsByClassName("postInfo");

    [...posts].forEach((post, index) => {
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

    console.log(`[KDeluxe] [⏱️] Jump To Post finished in ${performance.now() - performance_timer}ms`);
}
