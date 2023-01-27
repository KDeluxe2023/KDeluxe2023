{
    let performance_timer = performance.now();
    console.log(`[KDeluxe] Community Styles Loaded...`);

    function add_style(name) {
        var x = document.getElementById("stylechanger");
        var option = document.createElement("option");
        option.text = name;
        option.value = name;
        x.add(option);
    }

    add_style("Blackroach");
    add_style("Karagen");
    add_style("Modern Roach");
    add_style("Orgonite");
    add_style("Shogun");
    add_style("Windows 95");
    add_style("Wykop");

    console.log(`[KDeluxe] [⏱️] Community Styles finished in ${performance.now() - performance_timer}ms`);
}
