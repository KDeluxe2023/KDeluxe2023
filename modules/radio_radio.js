{
    const currentDay = new Date().getDay();
    const currentHour = new Date().getHours();
    const currentMinutes = new Date().getMinutes();

    const getTitle = async () => {
        const res = await fetch("https://c16.radioboss.fm/w/nowplayinginfo?u=14");
        const json = await res.json();
        return json.nowplaying;
    };

    const isLive = function() {
        if ((currentDay == 4 && currentHour >= 22) || (currentDay == 5 && currentHour <= 5))
            return true; // info tydzień

        if ((currentDay == 5 && currentHour >= 23 && currentMinutes >= 55) || (currentDay == 6 && currentHour <= 5))
            return true; // teoria chaosu

        //if (currentDay == 2 && currentHour >= 21)
        //   return true; // radioaktywna

        return false;
    }

    const displayPlayer = async () => {
        const container = document.createElement("div");
        container.id = "radioradio_player";
        container.style.textAlign = "center";
        container.style.position = "absolute";
        container.style.border = "solid 1px";
        container.style.background = "rgba(40,40,40,.5059)";
        container.style.cursor = "pointer";
        container.style.userSelect = "none";

        const figure = document.createElement("figure");
        figure.classList.add("radioradio_player_figure");
        container.appendChild(figure);

        const figcaption = document.createElement("figcaption");
        figcaption.classList.add("radioradio_player_figure_title");
        figcaption.style.cursor = "pointer";
        figcaption.style.userSelect = "none";
        figcaption.style.paddingBottom = "10px";
        figcaption.style.fontWeight = "bold";
        figcaption.innerHTML = "Pobieranie...";
        figure.appendChild(figcaption);

        const audio = document.createElement("audio");
        audio.controls = true;
        audio.src = "https://c16.radioboss.fm:18014/stream";
        audio.preload = "metadata";

        let currentTitle = null;
        let lastUpdateTime = null;

        const UPDATE_INTERVAL = 1*60*1000; // update title every 1 minute

        audio.addEventListener("play", async () => {
            currentTitle = await getTitle();
            figcaption.innerHTML = currentTitle;
            lastUpdateTime = Date.now();
        });

        audio.addEventListener("timeupdate", async () => {
            if (Date.now() - lastUpdateTime > UPDATE_INTERVAL) {
                currentTitle = await getTitle();

                figcaption.innerHTML = currentTitle;
                lastUpdateTime = Date.now();
            }
        });

        audio.addEventListener("pause", () => {
            currentTitle = null;
            lastUpdateTime = null;
        });

        figure.appendChild(audio);

        const settings = JSON.parse(localStorage.getItem("radioRadioPlayerPosition"));

        if (settings != null) {
            container.style.top = settings.offsetTop - settings.pos2 + "px";
            container.style.left = settings.offsetLeft - settings.pos1 + "px";
        } else {
            container.style.top = 10 + "%";
            container.style.left = 5 + "%";
        }

        document.body.appendChild(container);
    };

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

    if (isLive()) {
        displayPlayer();
        dragElement(document.getElementById("radioradio_player"));
    }
}
