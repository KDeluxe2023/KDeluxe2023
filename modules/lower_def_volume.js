{
    console.log(`[KDeluxe] Lower Default Volume Loaded...`);
    let performance_lower_def_volume = performance.now()

    let volume = 0.1
    $("#player").prop("volume", volume);

    console.log(`[KDeluxe] [⏱️] Lower Default Volume loaded in ${performance.now() - performance_lower_def_volume}ms`);
}
