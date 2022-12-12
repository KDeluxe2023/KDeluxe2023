{
    console.log(`[KDeluxe] Image Preview Anti-Eyestrain Loaded...`);
    let performance_anti_eyestrain = performance.now()

    let toggle = false;
    let preview_container = $("#imagePreview");
    preview_container.append(`<a href="#" id="anti-eyestrain"><i class="fa fa-eye-slash" aria-hidden="true"></i></a>`);

    $("#anti-eyestrain").css({
        "position": "absolute",
        "top": "0",
        "right": "0",
        "font-size": "20px",
        "background-color": "black"
    });
    $("#anti-eyestrain").click(function(e) {
        e.preventDefault();

        if (toggle) {
            preview_container.find(">:first-child").css({
                "filter": ""
            });
        } else if (!toggle) {
            preview_container.find(">:first-child").css({
                "filter": "hue-rotate(180deg) invert(1)"
            });
        }

        toggle = !toggle;
    });

    console.log(`[KDeluxe] [⏱️] Image Preview Anti-Eyestrain loaded in ${performance.now() - performance_anti_eyestrain}ms`);
}
