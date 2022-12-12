{
    let performance_better_embeds = performance.now()

    const embeds = document.querySelectorAll("iframe");
    if (embeds.length != 0) {

        console.log(`[KDeluxe] Better Embeds Loaded...`);

        const fetchVideoTitle = async (id) => {
            const body = await fetch(
                `https://youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
            );

            if (body.status === 404) return "Film nie istnieje";
            if (body.status === 401) return "Nie można pobrać tytułu";
            if (body.status === 403) return "Film prywatny";

            const json = await body.json();

            return json.title;
        };

        const createThumbnail = (embed) => {
            const videoSuffix = embed.src.split("/").pop();

            const newImage = document.createElement("img");
            newImage.src = `https://i.ytimg.com/vi/${videoSuffix}/hqdefault.jpg`;
            newImage.style.cssText = "width:250px;height:250px;object-fit:cover;";

            return newImage;
        };

        const createTitle = async (embed) => {
            const title = await fetchVideoTitle(embed.src.split("/").pop());

            const newTitle = document.createElement("div");
            newTitle.style.cssText = `position: absolute;top: 10px;left: 10px;color: white;
    font-family: Arial, Helvetica, sans-serif;font-weight: bold;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;`;
            newTitle.innerHTML = title;

            return newTitle;
        };

        const createEmbedDiv = (embed) => {
            const newDiv = document.createElement("div");
            newDiv.style.cssText = "position: relative;";

            newDiv.addEventListener("click", () => {
                newDiv.parentNode.replaceChild(createEmbed(embed), newDiv);
            });

            return newDiv;
        }

        const createEmbed = (embed) => {
            const videoSuffix = embed.src.split("/").pop();
            const newEmbed = document.createElement("iframe");
            newEmbed.width = 250;
            newEmbed.height = 250;
            newEmbed.src = `https://www.youtube.com/embed/${videoSuffix}`;
            newEmbed.referrerPolicy = "unsafe-url";
            newEmbed.setAttribute("allowfullscreen", "true");
            newEmbed.style.border = "none";

            return newEmbed;
        }

        const createYoutubeIcon = () => {
            const youtubeIcon = document.createElement("img");
            youtubeIcon.src = `https://i.imgur.com/IjUx7CW.png`;
            youtubeIcon.style.cssText = "width:80px;height:60px;";

            return youtubeIcon;
        };

        const createYoutubeIconDiv = (youtubeIcon) => {
            const youtubeIconDiv = document.createElement("div");
            youtubeIconDiv.style.cssText = "position: absolute;top: 193px;left: 5px;";

            youtubeIconDiv.appendChild(youtubeIcon);

            return youtubeIconDiv;
        };

        const loopThroughEmbeds = async (embeds) => {
            const thumbnailsArray = [];
            const ytIcon = createYoutubeIcon();

            for (const embed of embeds) {
                if (embed.src.includes("youtube")) {
                    thumbnailsArray.push(createThumbnail(embed));
                }
            }

            let embedCounter = 0;

            for (const embed of embeds) {
                if (embed.src.includes("youtube")) {
                    const ytDiv = createEmbedDiv(embed);
                    ytDiv.appendChild(await createTitle(embed));
                    ytDiv.appendChild(createYoutubeIconDiv(ytIcon.cloneNode()));
                    ytDiv.appendChild(thumbnailsArray[embedCounter]);

                    embed.parentNode.replaceChild(ytDiv, embed);

                    embedCounter++;
                }

            }
        };

        const observeIncomingEmbeds = () => {
            const threads = document.querySelector(".thread.reqCaptcha");
            const options = {
                childList: true
            };

            const callback = (mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === "childList") {
                        const incomingEmbeds =
                            mutation.addedNodes[0].querySelectorAll("iframe");

                        loopThroughEmbeds(incomingEmbeds);
                    }
                }
            };

            const observer = new MutationObserver(callback);
            observer.observe(threads, options);
        };

        loopThroughEmbeds(embeds);
        observeIncomingEmbeds();
    }

    console.log(`[KDeluxe] [⏱️] Better Embeds loaded in ${performance.now() - performance_better_embeds}ms`);
}
