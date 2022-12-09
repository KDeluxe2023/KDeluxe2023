console.log(`[KDeluxe] Radioradio Player Loaded...`);
let performance_radioradio_player = performance.now()

const d = new Date();
const day = d.getDay();
const hour = d.getHours();
const minutes = d.getMinutes();

const displayPlayer = (label) => {
  const container = document.createElement("div");
  container.id = "radioradio_player";
  container.innerHTML = `
<figure class="radioradio_player_figure">
   <figcaption style="cursor:pointer;user-select:none;padding-bottom:10px;font-weight:bold;">SŁUCHAJ AUDYCJI ${label}, TERAZ NA ŻYWO:</figcaption>
   <audio controls src="https://c16.radioboss.fm:18014/stream" preload="metadata"></audio>
</figure>
`.trim();
  container.style.textAlign = "center";
  container.style.position = "absolute";
  container.style.border = "solid 1px";
  container.style.background = "rgba(40,40,40,.5059)";
  container.style.cursor = "pointer";
  container.style.userSelect = "none";

  const settings = JSON.parse(localStorage.getItem("radioRadioPlayerPosition"));

  if (settings != null) {
    container.style.top = settings.offsetTop - settings.pos2 + "px";
    container.style.left = settings.offsetLeft - settings.pos1 + "px";
  } else {
    container.style.top = 10 + "%";
    container.style.left = 5 + "%";
  }

  document.querySelector(".boardBanner").after(container);
};

let lbl = "";

if ((day == 4 && hour >= 22) || (day == 5 && hour <= 5)) lbl = "Info Tydzień";

if ((day == 5 && hour >= 23 && minutes >= 30) || (day == 6 && hour <= 6))
  lbl = "👽Teoria Chaosu👽";

if (day == 2 && hour >= 21) lbl = "Radioaktywnej";

if (lbl != "") {
  displayPlayer(lbl);
  dragElement(document.getElementById("radioradio_player"));

  function dragElement(el) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    el.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();

      pos3 = e.clientX;
      pos4 = e.clientY;

      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      el.style.top = el.offsetTop - pos2 + "px";
      el.style.left = el.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;

      localStorage.setItem(
        "radioRadioPlayerPosition",
        JSON.stringify({
          pos1: pos1,
          pos2: pos2,
          pos3: pos3,
          pos4: pos4,
          offsetTop: el.offsetTop,
          offsetLeft: el.offsetLeft,
        })
      );
    }
  }
}

console.log(`[KDeluxe] [⏱️] RadioRadio Player loaded in ${performance.now() - performance_radioradio_player}ms`);
