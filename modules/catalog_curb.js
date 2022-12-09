if (this.localStorage.o_kdeluxe_catalog_curb == 1) {
    console.log(`[KDeluxe] Catalog Curb Loaded...`);
    let performance_catalog_curb = performance.now()

    let board = window.location.toString().split("/")[3];
    let posts = document.querySelectorAll(".thread");

    // TO-DO: dont store curbed threads individually, use json with curb time and id+board instead
    function getHideValue(el) {
        let threadId = el.getAttribute("id").slice(7);
        return `h_${board}_${threadId}`;
    }

    posts.forEach((el, idx) => {
        for (let key in localStorage) {
            if (key == getHideValue(el)) {
                el.remove();
                break;
            }
        }

        el.innerHTML = `<div><a class="hide" href="#" style="font-size:21px;">[–]</a></div>` + el.innerHTML
    });

    document.querySelectorAll(".hide").forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            let hideVal = getHideValue(el.parentElement.parentElement);
            localStorage.setItem(hideVal, "x");
            el.parentElement.parentElement.remove();
        });
    });

    console.log(`[KDeluxe] [⏱️] Catalog Curb loaded in ${performance.now() - performance_catalog_curb}ms`);
}
