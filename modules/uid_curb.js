console.log(`[KDeluxe] UID Curb Initialized...`);
let performance_timer = performance.now();

// handle "clear curbed UIDs" button that was created in user_interface.js
document.getElementById('clear_curb_list').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.o_kdeluxe_curbed_uids = "";
  window.location.reload();
});

function appendToStorage(name, data) {
  var old = localStorage.getItem(name);
  if (old === null) {
    old = "";
  }
  localStorage.setItem(name, old + data);
}

function curb_uids_in_document(target_uid) {
  const blacklist = document.querySelectorAll(
    `span.posteruid[title="${target_uid}"]`
  );
  for (let j = 0; j < blacklist.length; j++) {
    blacklist[j].closest('.post').style.display = 'none';
  }
}

// save every post's infobar except first one (original poster)
let infobars = document.querySelectorAll('.postInfo');
infobars = Array.from(infobars);
infobars.shift();

let curbButtons = [];
for (let i = 0; i < infobars.length; i++) {
  const postInfo = infobars[i];
  // find unique poster id element
  const uidElement = postInfo.querySelector('.posteruid');
  if (uidElement !== null) {
    // extract unique id string
    const uid = uidElement.getAttribute('title');
    // create curb button element
    const button = document.createElement('a');
    button.setAttribute('href', '#');
    button.setAttribute('class', 'curb_action');
    button.setAttribute('uid', uid);
    button.textContent = '[–]';
    // add button to array
    curbButtons.push(button);
  }
}

// append all buttons to infobars in a single operation
for (let i = 0; i < curbButtons.length; i++) {
  infobars[i].appendChild(curbButtons[i]);
}

// add onclick event to every curb button that was just appended to infobars
document.querySelectorAll('.curb_action').forEach((elem) => {
  elem.addEventListener('click', (event) => {
    event.preventDefault();
    const uid = elem.getAttribute('uid');

    appendToStorage('o_kdeluxe_curbed_uids', uid + ';');
    curb_uids_in_document(uid);

  });
});

// hide blacklisted UIDs after page load
const hiddenPosters = localStorage.getItem('o_kdeluxe_curbed_uids');
if (hiddenPosters != null) {
  const hiddenPostersArr = hiddenPosters.split(';');
  let count = 0;
    for (let i = 0; i < hiddenPostersArr.length; i++) {
    let blacklisted_uid = hiddenPostersArr[i];
    curb_uids_in_document(blacklisted_uid);
  }
}

console.log(`[KDeluxe] [⏱️] UID Curb loaded in ${performance.now() - performance_timer}ms`);
