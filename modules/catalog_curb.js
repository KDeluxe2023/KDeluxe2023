{
    let board = window.location.toString().split("/")[3];
    let posts = document.querySelectorAll(".thread");

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
}
