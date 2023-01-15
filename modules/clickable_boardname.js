{
    console.log(`[KDeluxe] Clickable Board name Loaded...`);
    let performance_timer = performance.now();

    let boardTitle = document.querySelector('.boardTitle');
    boardTitle.addEventListener('click', function() {
        let board = document.querySelector('input[name="board"]').value;
        window.location.href = '/' + board + '/';
    });

    console.log(`[KDeluxe] [⏱️] Clickable Board name loaded in ${performance.now() - performance_timer}ms`);
}
