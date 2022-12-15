{
    console.log(`[KDeluxe] Jump To Post Loaded...`);
    let performance_timer = performance.now()

    const getPrevNext = (posts, post_index) => {
        let prevHref = null;
        let nextHref = null;

        const poster_uid = posts[post_index].querySelector(".posteruid").getAttribute("id");

        // Find previous post of same user.
        for (let i = post_index - 1; i >= 0; i--) {
            if (posts[i].querySelector(".posteruid").getAttribute("id") == poster_uid) {
                const id = posts[i].getAttribute("id").slice(2);
                const OP = posts[0].getAttribute("id").slice(2);
                prevHref = `<a href="../../b/res/${OP}.html#p${id}" class="quotelink"><i class="fa fa-arrow-left" aria-hidden="true"></i> ${id}</a>`;
                break;
            }
        }
        // Find next post of same user
        for (let i = post_index + 1; i < posts.length; i++) {
            if (posts[i].querySelector(".posteruid").getAttribute("id") == poster_uid) {
                const id = posts[i].getAttribute("id").slice(2);
                const OP = posts[0].getAttribute("id").slice(2);
                nextHref = `<a href="../../b/res/${OP}.html#p${id}" class="quotelink">${id} <i class="fa fa-arrow-right" aria-hidden="true"></i></a>`;
                break;
            }
        }

        return [prevHref, nextHref];
    };

    const posts = document.querySelectorAll('.postInfo');

    Array.from(posts).forEach((post, index) => {
        const [prevHref, nextHref] = getPrevNext(posts, index);

        let link = '';
        if (nextHref === null && prevHref === null)
            return;

        if (nextHref === null)
            link = `<span>[${prevHref}]</span>`;
        else if (prevHref === null)
            link = `<span>[${nextHref}]</span>`;
        else
            link = `<span>[${prevHref} | ${nextHref}]</span>`;

        post.insertAdjacentHTML('beforeend', link);
    });

    console.log(`[KDeluxe] [⏱️] Jump To Post finished in ${performance.now() - performance_timer}ms`);
}
