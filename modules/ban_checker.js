{
    console.log(`[KDeluxe] Ban Checker Loaded...`);
    let performance_timer = performance.now()

    // create red info label tellin you that you're banned
    const postform = document.querySelector('#postform');
    const banned = document.createElement('h1');
    banned.id = 'banned';
    postform.insertAdjacentHTML('afterend', banned.outerHTML);

    // send http request to banned.php
    function check_for_ban() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://karachan.org/banned.php");
        xhr.onload = function() {
            if (!this.responseText.includes("NOT BANNED")) {
                var bannedElement = document.getElementById("banned");
                bannedElement.textContent = "Jesteś zbanowany";
                bannedElement.style.textAlign = "center";
                bannedElement.style.color = "red";
            }
        };
        xhr.send();

        setTimeout(check_for_ban, 1000 * 10);
    }

    check_for_ban();

    console.log(`[KDeluxe] [⏱️] Ban Checker loaded in ${performance.now() - performance_timer}ms`);
}
