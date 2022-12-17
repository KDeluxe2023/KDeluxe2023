{
    console.log(`[KDeluxe] New Keyframe Animations Loaded...`);
    let performance_timer = performance.now()

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
  @keyframes robert {
    from {
      background-color: green;
      color: #fff;
    }
    to {
      background-color: #fff;
      color: green;
    }
  }
  .robercik {

  }
  .maxiu {
    background-color: red;
    color: #ff0;
  }
  .deluxe {
    color: #D5AD6D;
    background: -webkit-linear-gradient(transparent, transparent),
    -webkit-linear-gradient(top, rgba(213,173,109,1) 0%, rgba(213,173,109,1) 26%, rgba(226,186,120,1) 35%, rgba(163,126,67,1) 45%, rgba(145,112,59,1) 61%, rgba(213,173,109,1) 100%);
    background: -o-linear-gradient(transparent, transparent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
    document.head.appendChild(style);
    const replacementRules = [{
            pattern: /#robercik/g,
            replacement: "<span style=\"animation: robert ease-in 500ms infinite alternate; font-weight: bold;\">BRAWO ROBERCIK</span>"
        },
        {
            pattern: /#R/g,
            replacement: "<span class=\"maxiu\" style=\"font-weight: bold;\">#R REVOLUTION</span>"
        },
        {
            pattern: /#deluxe/g,
            replacement: "<span class=\"deluxe\" style=\"font-weight: bold;\">Karachan Deluxe 2023</span>"
        }
    ];

    function replaceText(text) {
        let result = text;
        for (let i = 0; i < replacementRules.length; i++) {
            if (replacementRules[i].pattern.test(text)) {
                result = result.replace(replacementRules[i].pattern, replacementRules[i].replacement);
            }
        }
        return result;
    }

    var messages = document.getElementsByClassName('postMessage');
    for (let i = 0; i < messages.length; i++) {
        // Create a copy of the element
        const copy = messages[i].cloneNode(true);
        // Replace the text of the copy
        copy.innerHTML = replaceText(copy.innerHTML);
        // Replace the original element with the copy, preserving its attached events
        messages[i].parentNode.replaceChild(copy, messages[i]);
    }
    
    console.log(`[KDeluxe] [⏱️] New Keyframes loaded in ${performance.now() - performance_timer}ms`);
}
