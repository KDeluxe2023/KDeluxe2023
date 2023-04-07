{
    document.head.appendChild(
        Object.assign(document.createElement('style'), {
            type: 'text/css',
            innerHTML: 's { color: white !important; }'
        })
    );

    // Get all the <img> elements with a src attribute that ends with "/img/spoiler.png"
    const spoilerImages = document.querySelectorAll('img[src$="/img/spoiler.png"]');

    // Loop through each <img> element
    spoilerImages.forEach(function(img) {
        // Get the parent <a> element
        const a = img.parentNode;
        // If the parent element is an <a> element and has a class of "fileThumb"
        if (a.nodeName === 'A' && a.classList.contains('fileThumb')) {
            // Set the src attribute of the <img> element to the href of the <a> element
            img.setAttribute('src', a.getAttribute('href'));
        }
    });
}
