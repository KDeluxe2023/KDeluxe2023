////// shared functions
const log = function(m) { const lprefix = `[KDeluxe 2023] `; console.log(lprefix + m); };
const filename_from_url = function(u) {return u.split('/').pop().split('#')[0].split('?')[0]; };
String.prototype.endsWith=function(t){return -1!==this.indexOf(t,this.length-t.length)};
// mitsuba
const openTab=function(a){if(!a.hasClass("tab-opened")){var e=a.parent().children(".tab-opened");e.removeClass("tab-opened"),$("#"+e.data("tab-ref")).removeClass("opened"),a.addClass("tab-opened"),$("#"+a.data("tab-ref")).addClass("opened")}};
