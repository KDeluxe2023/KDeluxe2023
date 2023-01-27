{
    $.ajax({
        url: `https://kdeluxe2023.github.io/KDeluxe2023/version.txt`,
        async: false,
        cache: false,
        success: function(data) {
            let local_version = '' + $.trim(document.currentScript.getAttribute('data-pass'));
            let remote_version = '' + $.trim(data);
            console.log(`[KDeluxe] local_version = ${local_version}`);
            console.log(`[KDeluxe] remote_version = ${remote_version}`);

            if (local_version != remote_version) {
                dialogBox('KDeluxe', `Dostępna jest nowsza wersja KDeluxe <a href='https://github.com/KDeluxe2023/KDeluxe2023/blob/main/CHANGELOG.md'>(${remote_version})</a><br/>Czy chcesz ją zainstalować?`, ["Tak", "Nie"], 'fa-code-fork', function(a) {
                    if (a == 1)
                        return;

                    if (a == 0)
                        window.location.href = `https://github.com/KDeluxe2023/KDeluxe2023/raw/main/karachan_deluxe2023.user.js`;
                });
            }
        }
    });
}
