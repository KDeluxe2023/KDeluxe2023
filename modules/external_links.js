{
    var links = document.getElementsByClassName('postlink');
    for (var i = 0; i < links.length; i++) {
        links[i].setAttribute('href', links[i].getAttribute('href').replace('https://href.li/?', ''));
        links[i].setAttribute('target', '_blank');
        links[i].setAttribute('rel', 'noreferrer');
    }
}
