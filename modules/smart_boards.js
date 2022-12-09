{
    console.log(`[KDeluxe] Smart Boards Loaded...`);
    let performance_smart_boards = performance.now()

    let board_ele = $("#tab-boardlink");

    // yszty kurwa gnoju
    board_ele.find(`[data-short='4']`).remove();

    // determine if its night
    let date = new Date;
    let hour = date.getHours();

    if (hour >= 1 && hour <= 5) {
        // TO-DO: add lightbulb and dim the screen

    } else {
        // hide /noc/ cause its not available
        board_ele.find(`[data-short='noc']`).remove();
    }

    console.log(`[KDeluxe] [⏱️] Smart Boards loaded in ${performance.now() - performance_smart_boards}ms`);
}
