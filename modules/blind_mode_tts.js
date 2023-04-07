{
    function normalizeText(text) {
        const linkPattern = /https?:\/\/[^\s]+/gi;
        const emojiPattern = /(?:\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;
        const asciiEmojiPattern = /[:;][\-=^]?[D\(\)\[\]{}\/\\<>3cxoO]|(?:[<>]3|[xX8]=?D|B\^D|\^[_Llo0^]{1,2}\^|T_T|[:;]@|[:;#][Xx]|\([-_];?\)|[xX]D|OwO|UwU|:\^\*|\^3\^)/g;
        const referencePattern = />>\d+/g;

        text = text.replace(linkPattern, '');
        text = text.replace(emojiPattern, '');
        text = text.replace(asciiEmojiPattern, '');
        text = text.replace(referencePattern, '');

        return text;
    }

    let utterance;

    function speakText(text, lang = 'pl-PL') {
        if (!utterance || utterance.text !== text) {
            utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            window.speechSynthesis.speak(utterance);
        } else if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        } else if (!window.speechSynthesis.speaking) {
            window.speechSynthesis.speak(utterance);
        }
    }

    function pauseSpeaking() {
        if (window.speechSynthesis.speaking)
            window.speechSynthesis.pause();
    }

    function cancelSpeaking() {
        window.speechSynthesis.cancel();
        utterance = null;
    }

    function resumeSpeaking() {
        if (window.speechSynthesis.paused)
            window.speechSynthesis.resume();
    }

    function insertControls(postInfo) {
        const postMessage = postInfo.nextElementSibling;

        if (!postMessage || !postMessage.classList.contains('postMessage'))
            return;

        const textContent = postMessage.textContent;

        const ttsControls = document.createElement('span');
        ttsControls.classList.add('tts_controls');
        ttsControls.innerHTML = '[ <a href="#tts_start"><i class="fa fa-play" aria-hidden="true"></i></a> / <a href="#pause_tts"><i class="fa fa-pause" aria-hidden="true"></i></a> / <a href="#stop_tts"><i class="fa fa-times" aria-hidden="true"></i></a> ] ';

        const startBtn = ttsControls.querySelector('a[href="#tts_start"]');
        const pauseBtn = ttsControls.querySelector('a[href="#pause_tts"]');
        const stopBtn = ttsControls.querySelector('a[href="#stop_tts"]');

        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            speakText(normalizeText(textContent));
        });

        pauseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            pauseSpeaking();
        });

        stopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cancelSpeaking();
        });

        postInfo.appendChild(ttsControls);
    }

    function addControlsToExistingPosts() {
        const postInfos = document.querySelectorAll('.postInfo');
        postInfos.forEach(insertControls);
    }

    addControlsToExistingPosts();

    function handle_dom_mutation(mutationsList) {
        for (const mutation of mutationsList) {
            for (const addedNode of mutation.addedNodes) {
                if (addedNode.nodeType === Node.ELEMENT_NODE) {
                    const posterUids = addedNode.querySelectorAll('.posteruid');
                    if (posterUids.length > 0) {
                        curb_all_blacklisted_uids();
                        for (const posterUid of posterUids) {
                            const postInfo = posterUid.closest('.postInfo');
                            if (postInfo) {
                                insertControls(postInfo);
                            }
                        }
                        break;
                    }
                }
            }
        }
    }

    const observer = new MutationObserver(handle_dom_mutation);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
