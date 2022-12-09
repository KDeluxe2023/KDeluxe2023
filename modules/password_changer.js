if (localStorage.o_kdeluxe_password_changer == 1) {
    console.log(`[KDeluxe] Password Changer Loaded...`);
    let performance_password_changer = performance.now()

    function random_str(r) {
        for (var n = "", o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = o.length, a = 0; a < r; a++) n += o.charAt(Math.floor(Math.random() * t));
        return n
    }

    $.cookie("password", random_str(8), {
        path: '/'
    });
    console.log(`[KDeluxe] Password changed: ${$.cookie("password")}`);
    console.log(`[KDeluxe] [⏱️] Password Changer loaded in ${performance.now() - performance_password_changer}ms`);
}
