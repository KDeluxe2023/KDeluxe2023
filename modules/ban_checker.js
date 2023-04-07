{
    const postform = document.querySelector('#postform');
    const banned = document.createElement('h3');
    banned.id = 'banned';
    postform.insertAdjacentHTML('afterend', banned.outerHTML);

    function check_for_ban() {
        fetch("https://karachan.org/banned.php")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then(text => {
                if (!text.includes("NOT BANNED")) {
                    const bannedElement = document.getElementById("banned");

                    // extract third paragraph element's text from fetched document
                    const remoteDoc = new DOMParser().parseFromString(text, "text/html");
                    const boxcontentDiv = remoteDoc.querySelector(".boxcontent");
                    const paragraphs = boxcontentDiv.querySelectorAll("p");
                    const thirdParagraph = paragraphs[3];
                    const thirdParagraphText = thirdParagraph.textContent;

                    bannedElement.addEventListener("click", () => {
                        window.location.href = "https://karachan.org/banned.php";
                    });

                    // set bannedElement.textContent to third paragraph's text
                    bannedElement.textContent = thirdParagraphText;
                    bannedElement.style.textAlign = "center";
                    bannedElement.style.color = "red";
                }
            })
            .catch(error => {
                console.error("[KDeluxe] Error fetching banned status:", error);
            });

        setTimeout(check_for_ban, 1000 * 10);
    }

    check_for_ban();
}
