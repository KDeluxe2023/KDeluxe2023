{
    console.log(`[KDeluxe] Crocodile scanner  Loaded...`);
    let performance_autofollow = performance.now()

    const links = document.querySelectorAll("a[href*='tvp.info/13977779']");
    links.forEach(link => {
        link.textContent = link.textContent.replace("tvp.info/13977779", "🐊");
    });

    console.log(`[KDeluxe] [⏱️] Crocodile scanner loaded in ${performance.now() - performance_autofollow}ms`);
}
