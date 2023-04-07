{
    var autoscroll;

    function onCheckboxChange(event) {
        if (event.target.checked) {
            autoscroll = setInterval(function() {
                var posts = document.querySelectorAll(".postnew");
                var lastPost = posts[posts.length - 1];
                if (lastPost) {
                    window.scrollTo({
                        top: lastPost.offsetTop,
                        behavior: "smooth",
                    });
                }
            }, 1000);
        } else {
            clearInterval(autoscroll);
        }
    }

    var uinfoElements = document.querySelectorAll(".uinfo");
    uinfoElements.forEach(function(uinfoElement) {
        var checkboxHtml = '[<input type="checkbox" class="as-box"/>Autoscroll]';
        uinfoElement.insertAdjacentHTML('beforebegin', checkboxHtml);
    });

    var checkboxes = document.querySelectorAll(".as-box");
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", onCheckboxChange);
    });
}
