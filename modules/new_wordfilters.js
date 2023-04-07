
  const targetNode = document.getElementById("delform");
  const observers = [];
  const config = { attributes: false, childList: true, subtree: false };
  const postFunction = ()=>{};
  function addObserver(node, callback) {
    var observer = new MutationObserver(callback);
    observer.observe(node, config);
    observers.push(observer);
  }

  function boardCallback(mutationList) {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node.className === "board") {
            observeThreads(node);
          }
        }
      }
    }
  };
  function postCallback (mutationList, observer) {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          console.log("post found");

          if (node.classList.contains("postContainer")) {
            postFunction(node);
          }
        }
      }
    }
  };

  function observeThreads(page) {
    const threads = page.querySelectorAll(".thread");
    for (const thread of threads) {
      const posts = thread.querySelectorAll(".postContainer");
      for (const post of posts) postFunction(post);

      addObserver(thread, postCallback, config);
    }
  }

  function run(inputFunction) {
    postFunction = inputFunction;
    observeThreads(document.getElementsByClassName("board")[0]);
    addObserver(targetNode, boardCallback, config);
  }


const wordFilters = [];
const wordFilterUrls = [
  "https://api.npoint.io/575504e33d1d41f1c347",
  "https://api.npoint.io/ad2b764218aa4c4902b9",
];

async function fetchDataFromAPI(apiEndpoint) {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
}

async function fetchWordFilters() {
  const promises = wordFilterUrls.map(async (url) => {
    const filters = await fetchDataFromAPI(url);
    return filters;
  });
  const filtersArrays = await Promise.all(promises);

  const filters = filtersArrays.flat();
  wordFilters.push(...filters);
}

function initClasses() {
  wordFilters.forEach((wordFilter) => {
    if (wordFilter.cssRaw.length > 0) {
      var style = document.createElement("style");

      var css = wordFilter.cssRaw;
      style.innerHTML = css;

      document.head.appendChild(style);
    }
  });
  wordFilters.sort((x) => x.regexExp);
}

function applyWordFilters(post) {
  var postContents = post.getElementsByClassName("postMessage")[0];

  wordFilters.forEach((wordFilter) => {
    const html = postContents.innerHTML;
    console.log(html);
    const regExp = new RegExp(wordFilter.regexExp, wordFilter.regexFlag);
    if (regExp.test(html)) {
      const newHtml = html.replace(regExp, wordFilter.replaceHTML);
      postContents.innerHTML = newHtml;
    }
  });
}

async function main() {
  await fetchWordFilters();
  initClasses();
  const postFinder = new PostFinder(applyWordFilters);
  postFinder.run();
}

main().catch((e) => console.log(e));

