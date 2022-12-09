let posts = $(".postInfo");

function searchForPrevious(id, index) {
    for (let i = index - 1; i >= 0; i--) {
        //if(posts[i].querySelector(".posteruid").getAttribute("id") == id) {
        //     return posts[i].getAttribute("id").slice(2)
        // }
    }

    return null;
}

function searchForNext(id, index) {
    for (let i = index + 1; i < posts.length; i++) {
        // if(posts[i].querySelector(".posteruid").getAttribute("id") == id) {
        //    return posts[i].getAttribute("id").slice(2)
        // }
        //  if(posts[i].find
        console.log("xx: " + posts[i]);
    }

    return null;
}

posts.each(function(idx) {
    let el = $(this);

    let id = el.find(".posteruid").attr("id");
    let previous = searchForPrevious(id, idx);
    let next = searchForNext(id, idx);

    let OP = posts[0].getAttribute("id").slice(2);

    let prevHref = `<a href="../../b/res/${OP}.html#p${previous}" class="quotelink"><i class="fa fa-arrow-left" aria-hidden="true"></i> ${previous}</a>`
    let nextHref = `<a href="../../b/res/${OP}.html#p${next}" class="quotelink"><i class="fa fa-arrow-right" aria-hidden="true"></i> ${next}</a>`

    // skip users with one post
    if (next == null && previous == null)
        return true;

    if (next == null) {
        el.innerHTML = el.innerHTML + `<span>[${prevHref}]</span>`
    } else if (previous == null) {
        el.innerHTML = el.innerHTML + `<span>[${nextHref}]</span>`
    } else {
        el.innerHTML = el.innerHTML + `<span>[${prevHref} | ${nextHref}]</span>`
    }
});

console.log(`[KDeluxe] Prev/Next Loaded...`);
