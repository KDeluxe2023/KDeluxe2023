
{
  const targetNode = document.getElementById("delform");
  const observers = [];
  const config = { attributes: false, childList: true, subtree: false };

  var postFunction = () => { };
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
  function postCallback(mutationList) {
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
    const threads = page.getElementsByClassName("thread");
    Array.from(threads).forEach(thread=>{
      const posts = thread.getElementsByClassName("postMessage");

      Array.from(posts).forEach(post=>postFunction(post));

      addObserver(thread, postCallback, config);
    });
  }

  function run(inputFunction) {
    postFunction = inputFunction;
    observeThreads(document.getElementsByClassName("board")[0]);
    addObserver(targetNode, boardCallback, config);
  }

  const wordFilters=[];
  const wordFilterUrls = [
    "https://kdeluxe2023.github.io/KDeluxe2023/wordfilters/kdeluxe.json",
    "https://kdeluxe2023.github.io/KDeluxe2023/wordfilters/gg.json",
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

        style.innerHTML = css;
        var css = wordFilter.cssRaw;

        document.head.appendChild(style);
      }
    });
  }

  function replaceText(post) {
    let res = post;
    wordFilters.forEach((wordFilter) => {
      const regExp = new RegExp(wordFilter.regexExp, wordFilter.regexFlag);
      if (regExp.test(res)) {
        res = res.replace(regExp, wordFilter.replaceHTML);
      }
    }
    );
    return res;
  }

  function wrapNonAnchorElements(parentElement, tag) {
    const childNodes = parentElement.childNodes;
  
    // Create a new array to store non-anchor elements and text nodes
    const nonAnchorElements = [];
  
    // Iterate over all child nodes and add non-anchor elements and text nodes to the array
    childNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'A' && node.tagName !== 'BR') {
        nonAnchorElements.push(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
        nonAnchorElements.push(node);
      }
    });
  
    // Wrap non-anchor elements and text nodes in divs with the specified tag
    nonAnchorElements.forEach(node => {
      const wrapper = document.createElement(tag);
      wrapper.className="wrapper-span";
      parentElement.insertBefore(wrapper, node);
      wrapper.appendChild(node);
    });
  }
  function applyWordFilters(post) {
    wrapNonAnchorElements(post,'span');
    const posts = post.getElementsByClassName('wrapper-span');

    Array.from(posts).forEach(post=>{
      // Create a copy of the element
      const copy = post.cloneNode(true);
      
      // Replace the text of the copy
      copy.innerHTML = replaceText(copy.innerHTML);
    
      // Replace the original element with the copy, preserving its attached events
      post.parentNode.replaceChild(copy,post);
    })

  }

  async function main() {
    await fetchWordFilters();
    initClasses();
    run(applyWordFilters);
  }
  
  main();
}
