{
    console.log(`[KDeluxe] Quick Search Loaded...`);
    let performance_timer = performance.now();

    const subMenu = document.querySelector('.sub-menu');
    const groupOptions = subMenu.querySelector('.group-options');
    const aTag = document.createElement('a');

    aTag.classList.add('fa');
    aTag.classList.add('fa-search');
    aTag.href = '#';

    aTag.addEventListener('click', function(event) {
        event.preventDefault();
        const input = prompt('Enter your search query');
        if (input) {
            const form = document.createElement('form');
            form.method = 'post';
            form.action = 'https://karachan.org/search.php';
            form.enctype = 'application/x-www-form-urlencoded';

            const searchInput = document.createElement('input');
            searchInput.type = 'hidden';
            searchInput.name = 'search';
            searchInput.value = input;

            form.appendChild(searchInput);
            document.body.appendChild(form); // Add the form to the DOM

            try {
                form.submit();
            } catch (error) {
                console.error(error);
            }

        }
    });

    groupOptions.insertBefore(aTag, groupOptions.firstChild);

    console.log(`[KDeluxe] [⏱️] Quick Search loaded in ${performance.now() - performance_timer}ms`);
}
