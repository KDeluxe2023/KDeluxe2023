{
    console.log(`[KDeluxe] Ban Checker Loaded...`);
    let performance_ban_checker = performance.now()

    $("#postform").after(`<h1 id="banned"></h1>`);
    var ban_check_func = window.setInterval(function() {
        fetch("https://karachan.org/banned.php").then((resp) => resp.text()).then((text) => {
            if (!text.includes("NOT BANNED")) {
                $("#banned").text(`Jesteś zbanowany`);
                $("#banned").css({
                    "text-align": "center",
                    "color": "red"
                });
            }
        });
    }, 1000 * 10);

    console.log(`[KDeluxe] [⏱️] Ban Checker loaded in ${performance.now() - performance_ban_checker}ms`);
}
