{
    console.log(`[KDeluxe] New Keyframe Animations Loaded...`);
    let performance_timer = performance.now()

    $(`<style type='text/css'>
@keyframes robert{from{background-color:green;color:#fff}to{background-color:#fff;color:green}}
.maxiu{background-color:red;color:#ff0}
.deluxe {
color: #D5AD6D;
background: -webkit-linear-gradient(transparent, transparent),
-webkit-linear-gradient(top, rgba(213,173,109,1) 0%, rgba(213,173,109,1) 26%, rgba(226,186,120,1) 35%, rgba(163,126,67,1) 45%, rgba(145,112,59,1) 61%, rgba(213,173,109,1) 100%);
background: -o-linear-gradient(transparent, transparent);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
}
</style>`).appendTo("head");

    var messages = document.querySelectorAll('.postMessage');
    var arr_messages = [...messages];
    arr_messages.forEach(message => {
        message.innerHTML = message.innerHTML
            .replace(/#robercik/g, "<span style=\"animation: robert ease-in 500ms infinite alternate; font-weight: bold;\">BRAWO ROBERCIK</span>")
            .replace(/#R/g, "<span class=\"maxiu\" style=\"font-weight: bold;\">#R REVOLUTION</span>")
            .replace(/#deluxe/g, "<span class=\"deluxe\" style=\"font-weight: bold;\">Karachan Deluxe 2023</span>");
    });

    console.log(`[KDeluxe] [⏱️] New Keyframes loaded in ${performance.now() - performance_timer}ms`);
}
