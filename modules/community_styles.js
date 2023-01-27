{
    console.log(`[KDeluxe] Community Styles Loaded...`);
    let performance_timer = performance.now()

    config.styles.push({
        name: "Blackroach",
        path: "https://kdeluxe2023.github.io/KDeluxe2023/styles/blackroach.css"
    });
    config.styles.push({
        name: "Karagen",
        path: "https://kdeluxe2023.github.io/KDeluxe2023/styles/karagen.css"
    });
    config.styles.push({
        name: "Modern Roach",
        path: "https://kdeluxe2023.github.io/KDeluxe2023/styles/modern_roach.css"
    });
    config.styles.push({
        name: "Orgonite",
        path: "https://kdeluxe2023.github.io/KDeluxe2023/styles/orgonite.css"
    });
    config.styles.push({
        name: "Shogun",
        path: "https://kdeluxe2023.github.io/KDeluxe2023/styles/shogun.css"
    });
    config.styles.push({
        name: "Windows 95",
        path: "https://kdeluxe2023.github.io/KDeluxe2023/styles/windows_95.css"
    });
    config.styles.push({
        name: "Wykop",
        path: "https://kdeluxe2023.github.io/KDeluxe2023/styles/wykop.css"
    });

    // clear style picker
    function removeOptions(selectElement) {
        var i, L = selectElement.options.length - 1;
        for (i = L; i >= 0; i--) {
            selectElement.remove(i);
        }
    }

    removeOptions(document.getElementById('stylechanger'));

    // repopulate it by invoking engine method
    addStylechanger();


    console.log(`[KDeluxe] [⏱️] Community styles loaded in ${performance.now() - performance_timer}ms`);
}
