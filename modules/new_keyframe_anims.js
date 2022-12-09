console.log(`[KDeluxe] New Keyframe Animations Loaded...`);
let performance_new_keyframes = performance.now()

$(`<style type='text/css'>@keyframes robert{from{background-color:green;color:#fff}to{background-color:#fff;color:green}}.maxiu{background-color:red;color:#ff0}</style>`).appendTo("head");

function on_post_loop_new_keyframes(post) {
    var _this = post;
    var str = _this.html().replace(/#robercik/g, "<span style=\"animation: robert ease-in 500ms infinite alternate; font-weight: bold;\">BRAWO ROBERCIK</span>");
    str = str.replace(/#R/g, "<span class=\"maxiu\" style=\"font-weight: bold;\">#R REVOLUTION</span>");
    _this.html(str);
}

console.log(`[KDeluxe] [⏱️] New Keyframes loaded in ${performance.now() - performance_new_keyframes}ms`);
