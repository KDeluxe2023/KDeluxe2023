console.log(`[KDeluxe] Rich Stats Loaded...`);
let performance_rich_stats = performance.now()

/// Set up storage
const storage_vars = ["rich_stats_time", "rich_stats_posts", "rich_stats_distance", "rich_stats_thread_curbs"]
storage_vars.forEach(function(item, index) {
    if (localStorage.getItem("o_kdeluxe_" + item) == null) {
        let zero = 0;
        localStorage.setItem("o_kdeluxe_" + item, JSON.stringify(zero));
    }
});

/// Draw reset button
$("#kdeluxe_button_container").append(`<input type="button" style="margin-left: 5px;" value="Reset Stats" id="reset_rich_stats">`);
$("#reset_rich_stats").click(function(e) {
    e.preventDefault();

    storage_vars.forEach(function(item, index) {
        let storage_name = "o_kdeluxe_" + item;
        localStorage.removeItem(storage_name);
        console.log(`[KDeluxe] nulled ${storage_name}`);
    });

    localStorage.o_kdeluxe_rich_stats_box_top = "35px";
    localStorage.o_kdeluxe_rich_stats_box_left = "4px";
    localStorage.o_kdeluxe_rich_stats_sticky = "absolute";

    window.location.reload();
});

/// Draw UI window
function get_rich_stats_box_top() {
    if (localStorage.getItem("o_kdeluxe_rich_stats_box_top") == null)
        localStorage.o_kdeluxe_rich_stats_box_top = "35px";

    return localStorage.o_kdeluxe_rich_stats_box_top;
}

function get_rich_stats_box_left() {
    if (localStorage.getItem("o_kdeluxe_rich_stats_box_left") == null)
        localStorage.o_kdeluxe_rich_stats_box_left = "4px";

    return localStorage.o_kdeluxe_rich_stats_box_left;
}

let top_pos = get_rich_stats_box_top();
let left_pos = get_rich_stats_box_left();
let pos_type = localStorage.getItem("o_kdeluxe_rich_stats_sticky");
//console.log(`[KDeluxe] STATBOX POSITION: ${top_pos}/${left_pos}`);

if (pos_type == null)
    localStorage.setItem('o_kdeluxe_rich_stats_sticky', 'absolute');

$('<div>', {
    id: 'stats_box',
    class: 'movable',
    style: `height:auto;min-height:140px;width:auto;min-width:250px;position:${pos_type};top:${top_pos};left:${left_pos};padding:5px;`
}).appendTo('body');
$("#stats_box").draggable({
    // save window position when we move it
    start: function() {},
    drag: function() {},
    stop: function() {
        console.log(`[KDeluxe] Drag finished`);
        localStorage.o_kdeluxe_rich_stats_box_top = $("#stats_box").css("top");
        localStorage.o_kdeluxe_rich_stats_box_left = $("#stats_box").css("left");
    }
});

// style our box the same as watcher box
function read_css_property(e, t) {
    var n = e.charAt(0),
        r = e.substring(1),
        u = "#" == n ? document.getElementById(r) : document.getElementsByClassName(r)[0];
    return window.getComputedStyle(u, null).getPropertyValue(t)
}
let og_background = read_css_property("#watcher_box", "background");
let og_border = read_css_property("#watcher_box", "border");

$('#stats_box').css({
    "background": og_background,
    "border": og_border
});

// draw sticker button
$('<img>', {
    src: `https://karachan.org/img/sticky.gif`,
    id: 'stats_box_sticky_btn',
    style: `position:absolute;right:0px;cursor:default;`
}).appendTo("#stats_box");

// lower opacity depending on if window is sticky
if ($("#stats_box").css("position") === 'absolute') {
    $("#stats_box_sticky_btn").css({
        "opacity": 0.25
    });
} else {
    $("#stats_box_sticky_btn").css({
        "opacity": 1.0
    });
}

$("#stats_box_sticky_btn").on("click", function(e) {
    e.preventDefault();

    if ($(this).css("opacity") === '1') {
        $("#stats_box_sticky_btn").css({
            "opacity": 0.25
        });
        $("#stats_box").css({
            "position": "absolute"
        });

        localStorage.o_kdeluxe_rich_stats_sticky = "absolute";

        let newtop = parseInt($("stats_box").css("top")) + document.body.scrollTop;
        $("stats_box").css({
            "top": `${newtop}px`
        });
        localStorage.o_kdeluxe_rich_stats_box_top = newtop;

    } else {
        $("#stats_box_sticky_btn").css({
            "opacity": 1.0
        });
        $("#stats_box").css({
            "position": "fixed"
        });

        localStorage.o_kdeluxe_rich_stats_sticky = "fixed";

        let newtop = parseInt($("stats_box").css("top")) - document.body.scrollTop;
        $("stats_box").css({
            "top": `${newtop}px`
        });
        localStorage.o_kdeluxe_rich_stats_box_top = newtop;
    }
});

// populate it with content
$('<small>').appendTo('#stats_box').text("Twoje statystyki");
$("<hr/>").appendTo("#stats_box");
//$(`<style type='text/css'>.stat { margin: 0; padding: 0; }</style>`).appendTo("head");
$(` <table>
  <tr>
    <th>Kryterium</th>
    <th>Wartość</th>
  </tr>
  <tr>
    <td>Czas zmarnowany</td>
    <td id="stats_time" class="stat">???</td>
  </tr>
  <tr>
    <td>Postów napisanych</td>
    <td>${JSON.parse(localStorage.o_kdeluxe_rich_stats_posts)}</td>
  </tr>
  <tr>
    <td>Dystans pokonany</td>
    <td id="stats_distance" class="stat">???</td>
  </tr>
   <tr>
    <td>Krawężników</td>
    <td>${JSON.parse(localStorage.o_kdeluxe_rich_stats_thread_curbs)}</td>
  </tr>
</table>`).appendTo("#stats_box");

/// STAT1: time spent
// save our time spent on page every 0.5 second
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " godzin, " : " godziny, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minuta " : " minut ") : "";
    if (h == 0 && m == 0)
        return "poniżej minuty";

    return hDisplay + mDisplay;
}

setInterval(function() {
    // dont count if our tab isnt focused
    if (!document.hasFocus())
        return;

    // increase time spent by 0.5 second
    let time_spent_sum = JSON.parse(localStorage.o_kdeluxe_rich_stats_time) + 0.5;

    // save it
    localStorage.o_kdeluxe_rich_stats_time = JSON.stringify(time_spent_sum);
    // display it as it goes on
    let human_readable_time = secondsToHms(time_spent_sum);

    $("#stats_time").text(`${human_readable_time}`);
}, 0.5 * 1000);

/// STAT2: posts
// register posts sent count
// $('#postform').on('submit', function(e) {
$(".ladda-button").on("click", function(e) {
    //e.preventDefault();
    // TO-DO: check if post was submitted actually
    // increase posts
    let posts_sum = JSON.parse(localStorage.o_kdeluxe_rich_stats_posts) + 1;
    // save it
    localStorage.o_kdeluxe_rich_stats_posts = JSON.stringify(posts_sum);
});

// STAT3: distance
var totalDistance = 0;
var lastSeenAt = {
    x: null,
    y: null
};
$(document).mousemove(function(event) {
    if (lastSeenAt.x) {
        totalDistance += Math.sqrt(Math.pow(lastSeenAt.y - event.clientY, 2) + Math.pow(lastSeenAt.x - event.clientX, 2));

        // convert pixels to meters
        let meters = totalDistance / 3779.5275591;
        // pixels to meters is off here...
        meters /= 150;
        // cast to kilometers
        meters = meters / 1000;
        // increase meters
        let meter_sum = JSON.parse(localStorage.o_kdeluxe_rich_stats_distance) + meters;
        // save it
        localStorage.o_kdeluxe_rich_stats_distance = JSON.stringify(meter_sum);

        // round it to display
        let display_meters = Math.round((meter_sum + Number.EPSILON) * 100) / 100

        $("#stats_distance").text(`${display_meters} km`);
    }

    lastSeenAt.x = event.clientX;
    lastSeenAt.y = event.clientY;
});

// STAT4: curbs
$('.hider').on('click', function(e) {
    //e.preventDefault();
    // TO-DO: check if post was submitted actually

    // increase curbs
    let thread_curbs_sum = JSON.parse(localStorage.o_kdeluxe_rich_stats_thread_curbs) + 1;
    // save it
    localStorage.o_kdeluxe_rich_stats_thread_curbs = JSON.stringify(thread_curbs_sum);
});

// TO-DO:
// STAT5: searches in search.php count

// STAT6: /rs/ downloaded item count

console.log(`[KDeluxe] [⏱️] Rich stats loaded in ${performance.now() - performance_rich_stats}ms`);
