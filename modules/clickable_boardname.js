{
    let boardTitle = document.querySelector('.boardBanner'); //boardTitle
    boardTitle.addEventListener('click', function() {
        //window.location.reload();
        let board = document.querySelector('input[name="board"]').value;
        window.location.href = '/' + board + '/';
    });
}
