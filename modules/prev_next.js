{
    console.log(`[KDeluxe] Jump To Post Loaded...`);
    let performance_timer = performance.now()

    let posts = $(".postInfo");

    // TO-DO: optimize find_prev and find_next
    function find_prev(poster_uid, post_index) {
        //console.log(`[KDeluxe] searching for previous post of user ${poster_uid}, starting from post ${$(posts[post_index]).attr("id")} (index ${post_index})`);

        for (let i = post_index - 1; i >= 0; i--) {
            if (posts[i].querySelector(".posteruid").getAttribute("id") == poster_uid) {
                return posts[i].getAttribute("id").slice(2)
            }
        }

        return null;
    }

    function find_next(poster_uid, post_index) {
        //console.log(`[KDeluxe] searching for next post of user ${poster_uid}, starting from post ${$(posts[post_index]).attr("id")} (index ${post_index})`);

        /*
            let next_post = $(posts[post_index]).nextUntil(`.posteruid[id="${poster_uid}"]`);
            let found_post_id = next_post.attr("id");
 
            console.log(`found next post_id: ${found_post_id}`);
 
            if (found_post_id !== undefined)
                return found_post_id.slice(2);
        */
        for (let i = post_index + 1; i < posts.length; i++) {
            if (posts[i].querySelector(".posteruid").getAttribute("id") == poster_uid) {
                return posts[i].getAttribute("id").slice(2);
            }
        }

        return null;
    }

    // loop through all post info bars
    posts.each(function(post_index) {
        // single post info bar
        let post = $(this);

        // poster's unique id
        let poster_uid = post.find(".posteruid").attr("id");
        // his previous message
        let previous_post_id = find_prev(poster_uid, post_index);
        // his next message
        let next_post_id = find_next(poster_uid, post_index);

        // main thread post ID without first two chars
        let OP = $(posts[0]).attr("id").slice(2);

        // skip posters with one post
        if (next_post_id == null && previous_post_id == null)
            return true;

        // prepare arrow links
        let prevHref = `<a href="../../b/res/${OP}.html#p${previous_post_id}" class="quotelink"><i class="fa fa-arrow-left" aria-hidden="true"></i> ${previous_post_id}</a>`;

        let nextHref = `<a href="../../b/res/${OP}.html#p${next_post_id}" class="quotelink">${next_post_id} <i class="fa fa-arrow-right" aria-hidden="true"></i></a>`;

        // append them to info bar
        if (next_post_id == null) {
            post.append(`<span>[${prevHref}]</span>`);
        } else if (previous_post_id == null) {
            post.append(`<span>[${nextHref}]</span>`);
        } else {
            post.append(`<span>[${prevHref} | ${nextHref}]</span>`);
        }
    });
    
    console.log(`[KDeluxe] [⏱️] Jump To Post finished in ${performance.now() - performance_timer}ms`);
}
