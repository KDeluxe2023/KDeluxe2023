{
    function check_for_update() {
        $.ajax({
            url: `https://raw.githubusercontent.com/KDeluxe2023/KDeluxe2023/main/version.txt`,
            async: false,
            cache: false,
            success: function(data) {
                let local_version = '' + $.trim(document.currentScript.getAttribute('data-pass'));
                let remote_version = '' + $.trim(data);
                console.log(`[KDeluxe] local_version = ${local_version}`);
                console.log(`[KDeluxe] remote_version = ${remote_version}`);

                if (local_version != remote_version) {
                    dialogBox('KDeluxe', `Dostępna jest nowsza wersja KDeluxe (${remote_version})<br/>Czy chcesz ją zainstalować? <a href='https://github.com/KDeluxe2023/KDeluxe2023/blob/main/changelog.md' target="_blank">Zobacz changelog</a>`, ["Nie i nie pytaj przez 12h", "Tak"], 'fa-code-fork', function(a) {
                        if (a == 0)
                            return;

                        if (a == 1)
                            window.location.href = `https://github.com/KDeluxe2023/KDeluxe2023/raw/main/karachan_deluxe2023.user.js`;
                    });
                }
            }
        });
    }

    // set up an interval of 12 hours
    var interval = 12 * 3600 * 1000;

    // check if the function and timestamp are saved in localStorage
    if (!localStorage.getItem("runFunction") || !localStorage.getItem("timestamp")) {
        // save the function and the timestamp in local storage
        localStorage.setItem("check_for_update", check_for_update);
        localStorage.setItem("timestamp", Date.now());
    } else {
        // get the timestamp stored in localStorage
        var timestamp = localStorage.getItem("timestamp");

        // calculate the difference between the current time and the timestamp
        var diff = Date.now() - timestamp;

        // set the interval based on the difference, ensuring it is a positive value
        interval = (12 * 3600 * 1000) - diff > 0 ? (12 * 3600 * 1000) - diff : 1 * 1000;
    }

    // call the locally stored function every 12 hours
    setInterval(localStorage.getItem("check_for_update"), interval);
}
