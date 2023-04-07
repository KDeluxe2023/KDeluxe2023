{
    // TO-DO: dodać wykrywanie innych rodzajów krokodyli (nie tylko TVP)
    const links = document.querySelectorAll("a[href*='tvp.info/13977779']");
    links.forEach(link => {
        link.textContent = link.textContent.replace("tvp.info/13977779", "🐊");
    });
}
