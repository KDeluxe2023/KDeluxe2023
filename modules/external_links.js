console.log(`[KDeluxe] External Links Loaded...`);
let performance_external_links = performance.now()

inlineVideoAndAudioLinks = function(links) {
    for (var i = 0; i < links.length; i++) {
        var url = links[i].getAttribute('href');
        if (url.indexOf('http://vocaroo.com') > -1) {
            var vocarooId = url.substr(url.length - 12, 12);

            var vocarooContainer = document.createElement('div');
            vocarooContainer.innerHTML = '<object width="148" height="44"><param name="movie"' +
                'value="http://vocaroo.com/player.swf?playMediaID=' + vocarooId + '&autoplay=0"/>' +
                '<param name="wmode" value="transparent"/>' + '<embed src="http://vocaroo.com/player.swf?playMediaID=' +
                vocarooId + '&autoplay=0" width="148" ' +
                'height="44" wmode="transparent" type="application/x-shockwave-flash"></embed></object>';

            if (links[i].nextSibling) {
                links[i].parentNode.insertBefore(vocarooContainer, links[i].nextSibling);
            } else {
                links[i].parentNode.appendChild(vocarooContainer);
            }
            links[i].style.display = 'none';
        }
    }
};

var links = document.getElementsByClassName('postlink');
for (var i = 0; i < links.length; i++) {
    links[i].setAttribute('href', links[i].getAttribute('href').replace('https://href.li/?', ''));
    links[i].setAttribute('target', '_blank');
    links[i].setAttribute('rel', 'noreferrer');
}

this.inlineVideoAndAudioLinks(links);

console.log(`[KDeluxe] [⏱️] External Links loaded in ${performance.now() - performance_external_links}ms`);
