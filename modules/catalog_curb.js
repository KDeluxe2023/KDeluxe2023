{
    console.log(`[KDeluxe] Catalog Curb Loaded...`);
let performance_catalog_curb = performance.now();

let board = window.location.toString().split("/")[3];
let posts = document.querySelectorAll(".thread");
let curbedThreads = JSON.parse(localStorage.getItem("curbedThreads")) || {};

function getThreadId(el) {
  return el.getAttribute("id").slice(7);
}

posts.forEach((el, idx) => {
  let threadId = getThreadId(el);
  if (curbedThreads[board] && curbedThreads[board].includes(threadId)) {
    el.remove();
  } else {
    el.innerHTML = `<div><a class="hide" href="#" style="font-size:21px;">[–]</a></div>` + el.innerHTML;
  }
});

document.querySelectorAll(".hide").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    let threadId = getThreadId(el.parentElement.parentElement);
    if (!curbedThreads[board]) {
      curbedThreads[board] = [];
    }
    curbedThreads[board].push(threadId);
    localStorage.setItem("curbedThreads", JSON.stringify(curbedThreads));
    el.parentElement.parentElement.remove();
  });
});

console.log(`[KDeluxe] [⏱️] Catalog Curb loaded in ${performance.now() - performance_catalog_curb}ms`);
}
