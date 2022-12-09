log("Dangerous Bambo Loaded...");
let performance_dangerous_bambo = performance.now()

$(`<style type='text/css'>
#papaj_pingwin{
width:200px;
height:190px;
position:fixed;
animation-iteration-count:2137;
background:url("https://i.imgur.com/mB0hqA9.gif");
animation-name:pingwin;
animation-duration:30s;
animation-timing-function:linear;
bottom:0;z-index:1000
}
@keyframes pingwin{

0%{
right:100%;
transform:scaleX(1)
}

50%{
right:-15%;
transform:scaleX(1)
}

51%{
right:-15%;
transform:scaleX(-1)
}
100%{
transform:scaleX(-1);
right:115%
}
}
</style>`).appendTo("head");
$("body").append(`<div id="papaj_pingwin"></div>`);

console.log(`[KDeluxe] [⏱️] Dangerous Bambo loaded in ${performance.now() - performance_dangerous_bambo}ms`);
