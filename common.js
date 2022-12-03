localStorage.setItem("meow", 1);
Object.defineProperty(Number.prototype, 'fileSize', {
    value: function(a, b, c, d) {
        return (a = 1024, b = Math, c = b.log, d = c(this) / c(a) | 0, this / b.pow(a, d)).toFixed(2) +
            (d ? ('KMGTPEZY')[--d] : 'B');
    },
    writable: false,
    enumerable: false
});
! function(a, b) {
    function c(c, j, k) {
        var n = [];
        j = 1 == j ? {
            entropy: !0
        } : j || {};
        var s = g(f(j.entropy ? [c, i(a)] : null == c ? h() : c, 3), n),
            t = new d(n),
            u = function() {
                for (var a = t.g(m), b = p, c = 0; q > a;) a = (a + c) * l, b *= l, c = t.g(1);
                for (; a >= r;) a /= 2, b /= 2, c >>>= 1;
                return (a + c) / b
            };
        return u.int32 = function() {
            return 0 | t.g(4)
        }, u.quick = function() {
            return t.g(4) / 4294967296
        }, u["double"] = u, g(i(t.S), a), (j.pass || k || function(a, c, d, f) {
            return f && (f.S && e(f, t), a.state = function() {
                return e(t, {})
            }), d ? (b[o] = a, c) : a
        })(u, s, "global" in j ? j.global : this == b, j.state)
    }

    function d(a) {
        var b, c = a.length,
            d = this,
            e = 0,
            f = d.i = d.j = 0,
            g = d.S = [];
        for (c || (a = [c++]); l > e;) g[e] = e++;
        for (e = 0; l > e; e++) g[e] = g[f = s & f + a[e % c] + (b = g[e])], g[f] = b;
        (d.g = function(a) {
            for (var b, c = 0, e = d.i, f = d.j, g = d.S; a--;) b = g[e = s & e + 1], c = c * l + g[s & (g[e] = g[f = s & f + b]) + (g[f] = b)];
            return d.i = e, d.j = f, c
        })(l)
    }

    function e(a, b) {
        return b.i = a.i, b.j = a.j, b.S = a.S.slice(), b
    }

    function f(a, b) {
        var c, d = [],
            e = typeof a;
        if (b && "object" == e)
            for (c in a) try {
                d.push(f(a[c], b - 1))
            } catch (g) {}
        return d.length ? d : "string" == e ? a : a + "\0"
    }

    function g(a, b) {
        for (var c, d = a + "", e = 0; e < d.length;) b[s & e] = s & (c ^= 19 * b[s & e]) + d.charCodeAt(e++);
        return i(b)
    }

    function h() {
        try {
            if (j) return i(j.randomBytes(l));
            var b = new Uint8Array(l);
            return (k.crypto || k.msCrypto).getRandomValues(b), i(b)
        } catch (c) {
            var d = k.navigator,
                e = d && d.plugins;
            return [+new Date, k, e, k.screen, i(a)]
        }
    }

    function i(a) {
        return String.fromCharCode.apply(0, a)
    }
    var j, k = this,
        l = 256,
        m = 6,
        n = 52,
        o = "random",
        p = b.pow(l, m),
        q = b.pow(2, n),
        r = 2 * q,
        s = l - 1;
    if (b["seed" + o] = c, g(b.random(), a), "object" == typeof module && module.exports) {
        module.exports = c;
        try {
            j = require("crypto")
        } catch (t) {}
    } else "function" == typeof define && define.amd && define(function() {
        return c
    })
}([], Math);
String.prototype.contains = function(it) {
    return this.indexOf(it) != -1;
};
Array.prototype.remove = function(elem) {
    var items = this;
    while (items.indexOf(elem) !== -1) {
        items.splice(items.indexOf(elem), 1);
    }
    return items;
};
var postContentToShort = function(a) {
    return a.replace(/https*:\/\/\S+/g, "[url]").replace(/>>\S+/, "").replace(/\s+/g, " ");
}

function strStartsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}

function escapeJqSel(str) {
    if (str)
        return str.replace(/(:|\.|\/|\[|\]|,|=|@)/g, "\\$1");
    return str;
}

function timeDifference(previous, current) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
        return "Just now";
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
}
var rootDir = config['root_dir'];
var board = config['board'];
var boardSettings = null;
var watcher = null;
var hardThreadHiding = localStorage.getItem("o_ht") == 1 && localStorage.getItem("o_loader") == 1;
var hideThreadsWithNoNewPosts = false;
var inThread = document.location.pathname.contains("res");
var inCatalog = document.URL.indexOf("catalog.html") > -1;
var inMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var imageboardSettings = {
    o_pinned: {
        desktop: 1,
        mobile: 1
    },
    o_preview: {
        desktop: 1,
        mobile: 1
    },
    o_loader: {
        desktop: 1,
        mobile: 1
    },
    o_ht: {
        desktop: 1,
        mobile: 1
    },
    o_watched: {
        desktop: 1,
        mobile: 1
    },
    o_imgexpand: {
        desktop: 0,
        mobile: 0
    },
    o_imgpreview: {
        desktop: 1,
        mobile: 0
    },
    o_fastreply: {
        desktop: 1,
        mobile: 1
    },
    o_alt_mobile: {
        desktop: 0,
        mobile: 1
    },
    o_alt_hires: {
        desktop: 0,
        mobile: 1
    },
    o_two_column_view: {
        desktop: 0,
        mobile: 0
    },
    o_imiona: {
        desktop: 1,
        mobile: 1
    },
    o_kolory: {
        desktop: 1,
        mobile: 1
    },
    o_relativetime: {
        desktop: 1,
        mobile: 1
    },
    o_postmenu: {
        desktop: 1,
        mobile: 1
    },
    o_antiflood_cooldown_indicator: {
        desktop: 1,
        mobile: 1
    }
};
$.each(imageboardSettings, function(key, val) {
    if (localStorage.getItem("firsttime") !== "1" || (!localStorage.getItem(key))) {
        localStorage.setItem(key, inMobile ? val.mobile : val.desktop);
    }
});
localStorage.setItem("firsttime", "1");
if (!localStorage.my_posts) {
    localStorage.my_posts = "[]";
}!localStorage.o_pin && (localStorage.o_pin = 1);
!localStorage.o_custom_links && (localStorage.o_custom_links = '');
!localStorage.o_expander && (localStorage.o_expander = 1);

function UIDHightligher() {
    UIDHightligher.prototype.init = function() {
        this.useNames = true;
        this.idWNawiasie = false;
        this.opColor = "#ff0000";
        this.names = ["Ukrainiec", "Duch Kijowa", "Frajer o epickich proporcjach", "Biokrasnolud", "Pracownik salezjański", "Wynosiciel", "Ukrainka socjalna", "Putin", "Tucznik", "Incel", "Zbyt koguci", "Snajper", "Wszechstronny Mistrz", "Jabłonowski", "Komunista", "Cieć", "Boomer", "Zoomer", "Milenials", "Parch", "Siwy", "Nektarynka", "Parówka", "Zełenski", "Ara ara :3", "Kryptowaluciarz", "Kryptomilioner", "Trumienka", "Kaczyński", "Tusk", "Wyjebkowicz", "Naczelnik", "Lachociąg", "Żyd", "Szyjobrody", "Pedał", "Chuj", "Pyszny", "Wiśnia", "Peja", "Seba", "Nowociota", "Oskar", "Anon debil", "Ułomek", "Plackarz", "Spermiarz", "Papiesz", "Twoja stara", "Twój stary", "Barabasz", "Cerazy", "Pudzian", "Rolewski", "Prządło", "Żądłoń", "Japko", "Tomasz", "Podwiek", "Stępień", "Terlicki", "Kiciuś", "Mruczek", "Rak", "Ritsu", "Pędzel", "Korwin", "Lewak", "Prawak", "Ateusz", "Glon", "Grzyb", "Wujek Billy", "Potężny gej", "Grzegorz Braun", "Szczur", "Wąż", "Wilk", "Wieprz", "Paczacz", "Śmieszek", "Testo", "Oktawia", "Gondola", "Bóg", "Sól", "Omega", "Samiec alfa", "Samiec beta", "Cipeusz", "Femka", "Assburger", "Krokodyl", "Mumia", "Foliarz", "Borysek", "Mała lama", "Kaczor Donald", "Myszka Miki", "Goofy", "Normik", "Piwniczanin", "Anonek", "Skurwiel", "Pizduś", "Tuptuś", "Niechktoś", "Przegryw", "Wygryw", "Guwniak", "Kurwigrzmot", "Japoniec", "Mangaka", "Pędzlak", "Wulgar", "Pasyw", "Srający", "Młody", "Wykopek", "Podróżnik", "Pedofil", "Papież", "Ksiądz", "Chujowy anon", "/pol/kopek", "Zamulacz ", "Banan", "Erazmus", "Borys Jelcyn", "Popiełusznik", "Pizda", "Ćpun", "Sklerotyk", "Pies", "Słoń", "Gazela", "Majus", "Aralka", "Przondło", "Bartoszewski", "Esesman", "Kuc", "Cwel", "Lord", "Penis", "Pała", "Geralt", "Cuck", "Bonus", "Janusz", "Grażyna", "Karyna", "Hitler", "Trump", "Żyd", "Zwłoki", "Stópkarz", "Katol", "Cejrowski", "Komuch", "Placek", "Spaślak", "Malec", "Duży gość", "Kutas", "Podpaska", "Inbiarz", "Toster", "Cycek", "Jebaka", "Bóldupnik", "Mame", "Tate", "Metal", "Erise", "Starociota", "Parasol", "Samobieżny", "Bohatyr", "Stalker", "Makaron", "Pasta", "Dupa", "Forsownik", "Smutny Pan", "Ocetnik", "Hyzio", "Dyzio", "Zyzio", "Donald", "Goguś", "Kwacjusz", "Sknerus", "Gęgul", "Diodak", "Korneliusz", "Granit ", "Knaga", "Pindol", "Szmata", "Kurwa", "Roksa", "Zlewe", "Plaża", "Koń", "Pan Franciszek", "Tuziak", "Wandal", "Człowiek-kibel", "Misaki", "Najebany", "Błazen", "Konfident", "Makaroniarz", "Debil", "Idiota", "Oszust", "Biseksualista", "Korwinek", "Narkoman", "Kryminalista ", "Kret", "Napływ", "Spierdolinka", "Butosracz", "Łibus", "Wiedźmin", "Gejmer", "Motościerwo", "Czarodziej", "Nieruchajacy", "Druid", "Absztyfikant", "Defekent ", "Korposzczur", "Ironiczny kuc", "Wrzód", "Nostradamus ", "Dziadek", "Dziadziuś", "Karaluch", "Wujaszek", "Kabel od prodiża", "Czysty chaos", "Kapitan Niesrający", "Dziewczynka17", "Genialny Żółw", "Cham", "Linuksiarz", "Windowsiarz", "Płatek śniegu", "Masturbator", "Walikoń", "Sraka", "Brajanek", "Wypierdziuch", "Oko Saurona", "Odbycik", "Białkov", "Chłopięcy boy", "Antoni", "Ozjasz", "Fedorowicz", "Alergik", "Pan typu bear", "Ślunzok ", "Anon biedak", "Wipler", "Trap", "Suchoklates", "Audiopedofil", "Służbowy penis", "/sp/anon", "Spierdoks", "Żywe gówno", "Anioł", "Fapacz", "Kościej", "Kajetan", "Trynkiewicz", "Szufla", "Breivik", "Jaglak", "Czajka", "Smutna żaba", "Charakterny ", "Człowiek Maupa", "Polaczek", "Cebulak", "Son Goku", "Voucher", "Psychopata", "Kryptopedał", "Quality poster", "Użytkownik THC", "Homoseksualista", "Pijak", "Złodziej", "Zbrodniarz", "Murzyn", "Bambo", "Apolityczny", "Ateista", "Aryjczyk", "Bogacz", "Autystyk", "Bagieta", "Bagietmistrz", "Bekson", "Gimbo", "Gimbus", "Sensei", "Bigot", "Mitoman", "Biznesmen", "Jan Błotnik", "Berserker", "Papaj", "Jan Paweł II", "Brudas", "Cygan", "Rumun", "Kawosz", "Cyberpolicjant", "Cenzopapież", "Dobrychłop", "Freeman", "Cichociemny", "Bikiniarz", "Cietrzew", "Cyklon B", "5-latka", "Degenerat", "Policjant", "Despota", "Kurwiarz", "Dziwkarz", "Sapacz", "Ania Kamińska", "Jezus", "Dupokanapkowicz", "Durszlak", "Dwupapież janu", "Lepper", "Przystojniak", "Dziewica", "Prawiczek", "Maminsynek", "Pierdzioszek", "Elitarny", "Emeryt", "Rencista", "Imigrant", "Fajans", "Fagas", "Faworyt", "Flejtuch", "Osrajdupa", "Gagatek", "Owsinoga", "Nekrofil", "Zoofil", "Gwałciciel", "Patus", "Nekromanta", "Cyberwampir", "Furciota", "Stały Słuchacz", "Mati", "Biały rycerz", "Kremówka", "Bonzo", "Ludzki pisuar", "Onanista", "Rajzer", "Liryczny", "Babełe", "Samotny raider", "Zboczeniec", "Ziemniaczek", "Anuniaczek", "Przypiex", "Zgnilec", "Korniszon", "Ufoludek", "Łoniak", "Trup JP2", "Igor", "Kondom", "Smieć", "Dałniak ", "Troll", "Tumu(L)ec", "Negroid", "Trojan", "Watykańczyk", "Kwaśny robak", "Magik", "Pies z mordą suki", "Zajzajer", "Duch Święty", "Yoba", "Baba Vanga", "Peťa Michálek", "Pedomiś", "Nakurwiacz", "Zaradny Polaczek", "Fiotr Proncz", "Fronczewski", "Paweł Jumper", "Chłodny klecha", "Chłodna twarz", "Moralciota", "Prokurator", "Sejmfag", "Siekierowicz", "Tripciota", "Hanzo", "Wojciech Mann", "Łukasz Wiśniewski", "Forsomiś", "Srulom", "Puciak", "Srogi grzyb", "Kulfon", "Jachimek", "Kuba Rozpruwacz", "Twoje sumienie", "Szatan", "Czart", "Demon", "Bies", "Pomiot", "Plemnik", "Martwy płód", "Rudyk", "Dzban", "Jebaniec", "Polak B", "Lamus", "Komputerowiec", "Spierdon", "Sprzęgło", "Siwy", "Atencjusz", "Guseppe", "Bamboleo", "Pastuch", "Konsument", "Buhaj", "Lajon", "Bezimienny", "Palikot", "Infiltrator", "Przeciętniak", "Toxic Fucker", "Biohazard", "Bodzio", "Dziad boloński", "Śmierdziel", "Joker", "Dark Cuckhon", "Prowansal", "Procesor", "Incel", "Kaszkiet", "Jajcarz", "Sojarz", "Manlet", "Gruba", "Piździarz", "Jabłonowski", "Ufnal", "Podczłowiek", "Nadczłowiek", "Kutasiarz", "Młody socjalista", "Giereś", "Juppi", "Klod", "Cyklop", "Dawkins", "Żywiołak łoju", "Pierdojad", "Mapkowicz", "Dymkowski", "Zjawiskowa 17-latka", "Zakolarz", "Puchatek", "Covid19", "Syjonista", "Kurier", "Chad", "Naczelnik", "Wnętrostwo", "Bonczur", "Onkolog", "Stallman", "Egeszege", "Wybuchacz", "Oficer ABW", "Chory człowiek", "Pierdziawa", "Programista CSS", "Root", "25-letnie dziecko", "Hipis", "Łojarz", "G. Floyd", "xDDD", "Znawca tematu", "Żywe zwłoki", "Korżyk", "Żonaty", "Teoretyk", "Stulejarz", "Pimpuś", "Youtuber", "Dziadziuś trumienka", "Niuchacz", "Kuki77", "Surowiec", "Ponczuch", "Solorz", "Ziemkiewicz", "Żywy kibel", "Taksówkarz pissówkarz", "Człowiek kultury", "Zrujnowany orgazm", "Cipcia", "Dynamitard", "Chezjusz", "Chłopięcy boj", "Niedoceniony", "Ajatollah", "Homokomando", "Sanjaya", "Ser spod napleta", "Kibel z półką", "Męczydupa"];
    }
    this.init();
    UIDHightligher.prototype.update = function(threadId) {
        var that = this;
        if ($(threadId + " .opContainer .posteruid").length) {
            try {
                var opId = $(threadId + " .opContainer .posteruid")[0].innerHTML.split("ID: ")[1].split(")")[0];
            } catch (err) {
                var opId = $(threadId + " .opContainer .posteruid")[0].id.split("uid_")[1];
            }
        } else {
            var opId = "cGVkYWw=";
        }
        var stats = [];
        $(threadId + " .posteruid").each(function(i, el) {
            try {
                var id = el.innerHTML.split("ID: ")[1].split(")")[0];
            } catch (err) {
                var id = el.title;
            }
            if (stats[id] == undefined) {
                stats[id] = {
                    "occurs": 0
                };
            }
            stats[id].occurs += 1;
        });
        $(threadId + " .posteruid").each(function(i, el) {
            try {
                var id = el.innerHTML.split("ID: ")[1].split(")")[0];
            } catch (err) {
                var id = el.title;
            }
            Math.seedrandom(id + "_" + threadId.substr(1));
            var color = "hsl(" + Math.floor(Math.random() * 37) * 10 + ", 80%, " + ((Math.floor(Math.random() * 2) == 0) ? "61" : "61") + "%)";
            var name = that.names[Math.floor(Math.random() * that.names.length)];
            var boxCss = {
                "padding": "2px 6px",
                "margin-right": "4px",
                "font-size": "11px",
                "cursor": "pointer",
                "background-color": id == opId ? that.opColor : color,
                "border-radius": "6px",
                "color": "white",
                "text-shadow": "0px 0px 5px rgba(0, 0, 0, 1)",
                "font-weight": "bold"
            };
            if (localStorage.getItem("o_kolory") != 1) {
                boxCss["text-shadow"] = "none";
                boxCss["color"] = "inherit";
                boxCss["background-color"] = "none";
            }
            if (that.idWNawiasie)
                name += ' (' + id + ')';
            $(el).css(boxCss).html(id == opId ? "OP" : that.useNames ? name : id);
            boxCss.cursor = "auto";
            if (inThread) {
                if (!$(el).parent().find(".samefagCLabel").length)
                    $("<span class='samefagCLabel div.post div.postInfo span.nameBlock span.name'></span>").css(boxCss).text(stats[id].occurs).insertAfter($(el));
                else {
                    $(el).parent().find(".samefagCLabel").text(stats[id].occurs);
                }
            }
            el.dataset.colored = "";
            el.id = "uid_" + id;
            el.title = id;
        });
        if (!inThread) return;
        var threadPostInfo = $(threadId + " .postInfo").first();
        if (!threadPostInfo.find(".threadStats").length) {
            threadPostInfo.append("<span class='threadStats'></span>");
        }
        var uids = Object.keys(stats).length;
        var repls = $(".thread .postContainer").length;
        threadPostInfo.find(".threadStats").html(" [ " + repls + " replies / " + uids + " uniq IDs / " + (repls / uids).toFixed(2) + " <a href=\"javascript:alert(\'Samefag Ratio - replies per one ID\')\">SFR</a> ]");
    };
    UIDHightligher.prototype.highlightIdNames = function(parent) {
        if (localStorage.getItem("o_imiona") != 1) return;
        this.update(parent);
    }
    UIDHightligher.prototype.bindPosterUIDEvents = function() {
        var previevMode = false;
        $("body").click(function(e) {
            $(".postnotselected").removeClass("postnotselected");
            previevMode = false;
        });
        $("body").on("click", ".posteruid", function(e) {
            e.stopPropagation();
            var id = e.target.id;
            if (previevMode) {
                $(".postnotselected").removeClass("postnotselected");
                previevMode = false;
                return;
            }
            $(".post:not(:has(#" + escapeJqSel(id) + ")):not(#quote-preview):not(.postdeleted)").addClass("postnotselected");
            previevMode = true;
        });
    }
}
var uidHighlighter = new UIDHightligher();
var postMenuWindow = (function() {
    if (localStorage.o_postmenu !== "1") return;
    $("head").append('<style>input[type="checkbox"][name*="del"][value="delete"]{display:none;} .postOptionsBtn{display:inline;}</style>');
    var postOptionsHTML = '<div class="postOptions"> \
	<a data-role="select"><i class="fa fa-check-square fa-fw"></i> Select</a> \
	<a data-role="deselect"><i class="fa fa-square fa-fw"></i> Deselect</a> \
	<a data-role="hide"><i class="fa fa-minus fa-fw"></i> Hide</a> \
	<a data-role="show"><i class="fa fa-plus fa-fw"></i> Show</a> \
	<a data-role="report"><i class="fa fa-flag fa-fw"></i> Report</a> \
	<a data-role="delete"><i class="fa fa-trash fa-fw"></i> Delete</a> \
	</div>';
    var postOptionsAvailable = '["select", "hide", "report", "delete"]';
    var postVisible = false;
    var currentPostID;
    var currentElement;

    function closeMenu() {
        $(".postOptions").hide();
        postVisible = false;
    }

    function updateOptions() {
        var g = $(".postOptions");
        g.find('[data-role]').hide();
        var zz = JSON.parse(currentElement[0].dataset.options);
        zz.forEach(function(a) {
            g.find('[data-role="' + a + '"]').show();
        });
    }

    function changeOptionAvail(optName, avail) {
        var zz = JSON.parse(currentElement[0].dataset.options);
        if (!avail) {
            zz = zz.remove(optName);
        } else {
            if (zz.indexOf(optName === -1))
                zz.push(optName);
        }
        currentElement[0].dataset.options = JSON.stringify(zz);
        updateOptions();
    }
    $(function() {
        $("body").append(postOptionsHTML).on("click", ".postOptionsBtn", function(e) {
            $(".postOptions").css({
                top: e.pageY + 3,
                left: e.pageX + 3
            }).show();
            postVisible = true;
            currentPostID = $(e.target).parent().attr("id").slice(2);
            currentElement = $(e.target).parent();
            if (currentElement[0].dataset.options === undefined) {
                var isOp = currentElement.parent().hasClass("op");
                currentElement[0].dataset.options = isOp ? JSON.stringify(JSON.parse(postOptionsAvailable).remove("show").remove("hide")) : postOptionsAvailable;
            }
            updateOptions();
        });
        $("body").click(function(e) {
            if (postVisible && !e.target.className.contains("postOptions")) {
                closeMenu();
            }
        });
        $("body").on("click", ".postOptions a", function(e) {
            switch (e.currentTarget.dataset.role) {
                case "select":
                    currentElement.parent().addClass("postCheckboxChecked");
                    changeOptionAvail("select", false);
                    changeOptionAvail("deselect", true);
                    currentElement.find('input[name*="del%"]').prop("checked", true);
                    closeMenu();
                    break;
                case "deselect":
                    currentElement.parent().removeClass("postCheckboxChecked");
                    changeOptionAvail("select", true);
                    changeOptionAvail("deselect", false);
                    currentElement.find('input[name*="del%"]').prop("checked", false);
                    closeMenu();
                    break;
                case "report":
                    closeMenu();
                    dialogBox("Quick report", "Reason:<br><textarea style='max-width:95%; max-height:300px' cols='40' rows='5' class='quickReportReason'></textarea>", ["Send", "Cancel"], "fa-flag", function(a) {
                        if (a !== 0) return;
                        var reason = $(".quickReportReason").val() || "";
                        var formData = new FormData();
                        formData.append("report", "Raportuj");
                        formData.append("format", "json");
                        formData.append("reason", reason);
                        formData.append("board", board);
                        formData.append("mode", "usrform");
                        formData.append("del%" + currentElement.closest("[data-board]")[0].dataset.board + "%" + currentPostID, "delete");
                        $.ajax({
                            type: "POST",
                            url: config.root_dir + "imgboard.php",
                            data: formData,
                            dataType: 'json',
                            processData: false,
                            contentType: false,
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log(textStatus, errorThrown);
                                dialogBox('Error!', 'Unexpected response format', ["OK"], 'fa-bug');
                            },
                            success: function(data, textStatus, xhr) {
                                dialogBox(data.title, data.msg, ["OK"], "fa-flag");
                            }
                        });
                    });
                    break;
                case "delete":
                    closeMenu();
                    dialogBox("Quick delete", "Are you sure?", ["Yes", "No"], "fa-question", function(a) {
                        if (a !== 0) return;
                        var formData = new FormData();
                        formData.append("delete", "Usuń");
                        formData.append("format", "json");
                        formData.append("pwd", $("#delPassword").val());
                        formData.append("board", board);
                        formData.append("reason", "");
                        formData.append("mode", "usrform");
                        formData.append("del%" + currentElement.closest("[data-board]")[0].dataset.board + "%" + currentPostID, "delete");
                        $.ajax({
                            type: "POST",
                            url: config.root_dir + "imgboard.php",
                            data: formData,
                            dataType: 'json',
                            processData: false,
                            contentType: false,
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log(textStatus, errorThrown);
                                dialogBox('Error!', 'Unexpected response format', ["OK"], 'fa-bug');
                            },
                            success: function(data, textStatus, xhr) {
                                dialogBox(data.title, data.msg, ["OK"], "fa-trash");
                                var realDeleted = JSON.parse(data.realDeleted);
                                $.each(realDeleted, function(key, val) {
                                    $(".post#p" + val.id).addClass("postdeleted");
                                });
                            }
                        });
                    });
                    break;
                case "hide":
                    changeOptionAvail("hide", false);
                    changeOptionAvail("show", true);
                    postsHider.hidePost(currentElement.closest("[data-board]")[0].dataset.board, currentPostID, currentElement.closest(".thread").find(".post.op").attr("id").slice(1));
                    closeMenu();
                    break;
                case "show":
                    changeOptionAvail("show", false);
                    changeOptionAvail("hide", true);
                    postsHider.showPost(currentElement.closest("[data-board]")[0].dataset.board, currentPostID, currentElement.closest(".thread").find(".post.op").attr("id").slice(1));
                    closeMenu();
                    break;
            }
        });
    });
    return {
        postOptionsAvailable: postOptionsAvailable
    };
})();
var postsHider = (function() {
    var hiddenPosts = localStorage.hiddenPosts || "[]";
    var hiddenPosts = JSON.parse(hiddenPosts);
    var saveHiddenPosts = function() {
        localStorage.hiddenPosts = JSON.stringify(hiddenPosts);
    }
    saveHiddenPosts();
    var addHiddenPosts = function(parrentSelector) {
        var s = "";
        hiddenPosts.forEach(function(v, i) {
            v = v.split("_");
            s += '.thread[data-board="' + v[0] + '"] ';
            s += '#m' + v[1];
            s += (i === hiddenPosts.length - 1 ? "" : ", ");
        });
        $(s).hide().each(function(i, el) {
            var gowno = $(el).parent().find(".postInfo");
            if (gowno[0].dataset.options === undefined) {
                gowno[0].dataset.options = postMenuWindow.postOptionsAvailable;
            }
            var sraka = JSON.parse(gowno[0].dataset.options);
            sraka.push("show");
            sraka = sraka.remove("hide");
            gowno[0].dataset.options = JSON.stringify(sraka);
        }).parent().find('div[class*="file"]').hide();
    };
    var showPost = function(board, id, tid) {
        hiddenPosts = hiddenPosts.remove(board + "_" + id + "_" + tid);
        saveHiddenPosts();
        $('.thread[data-board="' + board + '"] #m' + id).show().parent().find('div[class*="file"]').show();
    };
    var hidePost = function(board, id, tid) {
        hiddenPosts.push(board + "_" + id + "_" + tid);
        saveHiddenPosts();
        $('.thread[data-board="' + board + '"] #m' + id).hide().parent().find('div[class*="file"]').hide();
    };
    return {
        addHiddenPosts: addHiddenPosts,
        showPost: showPost,
        hidePost: hidePost
    };
})();
var ThreadsWatcher = (function() {
    function ThreadsWatcher() {
        this.rootDir = rootDir
        this.currentBoard = board;
        this.loadWatchedThreads();
        this.insertThreadsListWindow();
        this.addWatchButtonsToPosts();
        if (localStorage.getItem("watcher_hidden") == 1) {
            $('#watcher_box').toggle();
        }
    }
    ThreadsWatcher.prototype.loadWatchedThreads = function() {
        var item = localStorage.getItem('KurahenPremium_WatchedThreads');
        if (item === null || item === 'null') {
            this.watchedThreads = {};
        } else {
            this.watchedThreads = JSON.parse(item);
        }
    };
    ThreadsWatcher.prototype.saveWatchedThreads = function() {
        var savedWatchedThreads = JSON.parse(localStorage.getItem('KurahenPremium_WatchedThreads')) || {};
        this.mergeWatchedThreads(savedWatchedThreads, this.watchedThreads);
        localStorage.setItem('KurahenPremium_WatchedThreads', JSON.stringify(savedWatchedThreads));
    };
    ThreadsWatcher.prototype.getWatchedThreadsWindowTopPosition = function() {
        var item = localStorage.getItem('KurahenPremium_WatchedThreads_Top');
        if (item === null || item === '') {
            return '35px';
        } else {
            return item;
        }
    };
    ThreadsWatcher.prototype.setWatchedThreadsWindowTopPosition = function(position) {
        localStorage.setItem('KurahenPremium_WatchedThreads_Top', position);
    };
    ThreadsWatcher.prototype.getWatchedThreadsWindowLeftPosition = function() {
        var item = localStorage.getItem('KurahenPremium_WatchedThreads_Left');
        if (item === null || item === '') {
            return '4px';
        } else {
            return item;
        }
    };
    ThreadsWatcher.prototype.setWatchedThreadsWindowLeftPosition = function(position) {
        localStorage.setItem('KurahenPremium_WatchedThreads_Left', position);
    };
    ThreadsWatcher.prototype.getWatchedThreadsWindowCssPosition = function() {
        var item = localStorage.getItem('KurahenPremium_WatchedThreads_CSS_Position');
        if (item === null || item === '') {
            return 'absolute';
        } else {
            return item;
        }
    };
    ThreadsWatcher.prototype.setWatchedThreadsWindowCssPosition = function(positionProperity) {
        localStorage.setItem('KurahenPremium_WatchedThreads_CSS_Position', positionProperity);
    };
    ThreadsWatcher.prototype.mergeWatchedThreads = function(originalObject, objectToAppend) {
        for (var item in objectToAppend) {
            if (objectToAppend.hasOwnProperty(item)) {
                if (objectToAppend[item] !== null) {
                    originalObject[item] = objectToAppend[item];
                } else if (originalObject[item] !== null) {
                    delete originalObject[item];
                }
            }
        }
    };
    ThreadsWatcher.prototype.getThreadObject = function(postId, boardName) {
        return this.watchedThreads['th_' + boardName + '_' + postId];
    };
    ThreadsWatcher.prototype.addThreadObject = function(postId, boardName, lastReadPostId, topic) {
        this.watchedThreads['th_' + boardName + '_' + postId] = {
            'id': postId,
            'boardName': boardName,
            'lastReadPostId': lastReadPostId,
            'topic': topic
        };
    };
    ThreadsWatcher.prototype.updateThreadObject = function(postId, boardName, lastReadPostId) {
        this.watchedThreads['th_' + boardName + '_' + postId].lastReadPostId = lastReadPostId;
    };
    ThreadsWatcher.prototype.removeThreadObject = function(postId, boardName) {
        this.watchedThreads['th_' + boardName + '_' + postId] = null;
    };
    ThreadsWatcher.prototype.threadObjectExists = function(postId, boardName) {
        return typeof this.watchedThreads['th_' + boardName + '_' + postId] === 'object' && this.watchedThreads['th_' +
            boardName + '_' + postId] !== null;
    };
    ThreadsWatcher.prototype.threadsSize = function() {
        return Object.keys(this.watchedThreads).length;
    };
    ThreadsWatcher.prototype.getWatchedThreadsList = function() {
        return this.watchedThreads;
    };
    ThreadsWatcher.prototype.markAsRead = function(postId, boardName, lastReadPostId) {
        if (this.threadObjectExists(postId, boardName) && this.getThreadObject(postId, boardName).lastReadPostId < lastReadPostId) {
            this.updateThreadListWindowEntry(postId, boardName, lastReadPostId, 0);
            this.updateThreadObject(postId, boardName, lastReadPostId);
            this.saveWatchedThreads();
        }
    };
    ThreadsWatcher.prototype.insertThreadsListWindow = function() {
        var _this = this;
        this.threadsListWindow = document.createElement('div');
        this.threadsListWindow.id = 'watcher_box';
        this.threadsListWindow.className = 'movable';
        this.threadsListWindow.style.height = 'auto';
        this.threadsListWindow.style.minHeight = '100px';
        this.threadsListWindow.style.width = 'auto';
        this.threadsListWindow.style.minWidth = '250px';
        this.threadsListWindow.style.position = this.getWatchedThreadsWindowCssPosition();
        this.threadsListWindow.style.top = this.getWatchedThreadsWindowTopPosition();
        this.threadsListWindow.style.left = this.getWatchedThreadsWindowLeftPosition();
        this.threadsListWindow.style.padding = '5px';
        var threadsListWindowTitle = document.createElement('small');
        threadsListWindowTitle.textContent = 'Obserwowane nitki';
        this.threadsListWindow.appendChild(threadsListWindowTitle);
        var threadsListWindowSticker = document.createElement('img');
        threadsListWindowSticker.src = this.rootDir + 'img/sticky.gif';
        threadsListWindowSticker.style.position = 'absolute';
        if (this.threadsListWindow.style.position === 'absolute') {
            threadsListWindowSticker.style.opacity = '0.25';
        } else {
            threadsListWindowSticker.style.opacity = '1.0';
        }
        threadsListWindowSticker.style.right = '0px';
        threadsListWindowSticker.style.cursor = 'default';
        threadsListWindowSticker.onclick = function(ev) {
            var stick = ev.target;
            if (stick.style.opacity === '1') {
                stick.style.opacity = '0.25';
                _this.threadsListWindow.style.position = 'absolute';
                _this.setWatchedThreadsWindowCssPosition('absolute');
                var newtop = parseInt(_this.threadsListWindow.style.top) + document.body.scrollTop;
                _this.threadsListWindow.style.top = newtop + 'px';
            } else {
                stick.style.opacity = '1';
                _this.threadsListWindow.style.position = 'fixed';
                _this.setWatchedThreadsWindowCssPosition('fixed');
                newtop = parseInt(_this.threadsListWindow.style.top) - document.body.scrollTop;
                _this.threadsListWindow.style.top = newtop + 'px';
            }
        };
        this.threadsListWindow.appendChild(threadsListWindowSticker);
        this.threadsHtmlList = document.createElement('ul');
        this.threadsHtmlList.id = 'watched_list';
        this.threadsListWindow.appendChild(this.threadsHtmlList);
        var threads = this.getWatchedThreadsList();
        for (var item in threads) {
            if (threads.hasOwnProperty(item) && threads[item] !== null) {
                this.addThreadListWindowEntry(threads[item].id, threads[item].boardName, threads[item].lastReadPostId, -1, threads[item].topic);
            }
        }
        var self = this;
        this.threadsListWindow.addEventListener('mouseout', function() {
            self.setWatchedThreadsWindowTopPosition(self.threadsListWindow.style.top);
            self.setWatchedThreadsWindowLeftPosition(self.threadsListWindow.style.left);
        }, false);
        document.body.appendChild(this.threadsListWindow);
        var script = document.createElement('script');
        script.textContent = '$("#watcher_box").draggable();';
        document.body.appendChild(script);
    };
    ThreadsWatcher.prototype.addThreadListWindowEntry = function(id, boardName, lastReadPostId, unreadPostsNumber, topic) {
        var self = this;
        var entry = document.createElement('li');
        entry.id = 'wl_' + boardName + '_' + id;
        var removeLink = document.createElement('a');
        removeLink.className = 'fa fa-trash-o';
        removeLink.style.fontSize = '14px';
        removeLink.href = 'javascript:;';
        entry.appendChild(removeLink);
        removeLink.addEventListener('click', function() {
            self.addRemoveWatchedThread(id, boardName);
            var w = document.querySelector('.thread[data-board="' + boardName + '"] .watch-button-container a[data-post-id="' + id + '"]');
            if (w !== null) {
                w.toggle.call(w);
            }
        });
        var link = document.createElement('a');
        link.className = 'watch-link';
        link.href = this.rootDir + boardName + '/res/' + id + '.html#p' + lastReadPostId;
        var href50 = this.rootDir + boardName + '/res/' + id + '-50.html#p' + lastReadPostId;
        $.get(href50, function(data, status, xhr) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");
            var found = false;
            $(doc.body).find(".quotePost").each(function() {
                if (this.innerHTML == lastReadPostId)
                    found = true;
            });
            if (found) link.href = href50;
        });
        entry.appendChild(link);
        var unreadPostsSpan = document.createElement('span');
        unreadPostsSpan.className = 'unreadPostsNumber';
        unreadPostsSpan.textContent = ' [' + (unreadPostsNumber >= 0 ? unreadPostsNumber : 'Ładowanie...') + '] ';
        link.appendChild(unreadPostsSpan);
        var linkTextSpan = document.createElement('span');
        linkTextSpan.textContent = '/' + boardName + '/' + id + ': ' + topic;
        link.appendChild(linkTextSpan);
        this.threadsHtmlList.appendChild(entry);
        if (this.getCurrentBoardName() === boardName && id === this.getCurrentThreadId()) {
            lastReadPostId = this.getNewestPostIdFromThread(id);
            unreadPostsSpan.textContent = ' [0] ';
            self.updateThreadObject(id, boardName, lastReadPostId);
            this.saveWatchedThreads();
        } else if (unreadPostsNumber < 0) {
            this.getNumberOfNewPosts(boardName, id, lastReadPostId, function(boardName, threadId, lastReadPostId, numberOfNewPosts, forceUpdate, status) {
                if (status === 200 && (numberOfNewPosts > 0 || !hideThreadsWithNoNewPosts)) {
                    self.updateThreadListWindowEntry(threadId, boardName, lastReadPostId, numberOfNewPosts);
                } else if (status === 200 && hideThreadsWithNoNewPosts && numberOfNewPosts === 0) {
                    self.removeThreadListWindowEntry(threadId, boardName);
                } else if (status === 404) {
                    self.removeThreadListWindowEntry(threadId, boardName);
                    self.removeThreadObject(threadId, boardName);
                    self.saveWatchedThreads();
                } else {
                    unreadPostsSpan.textContent = ' [?] ';
                }
                if (forceUpdate) {
                    self.updateThreadObject(threadId, boardName, lastReadPostId);
                    self.saveWatchedThreads();
                }
            });
        }
    };
    ThreadsWatcher.prototype.updateThreadListWindowEntry = function(id, boardName, lastReadPostId, unreadPostsNumber) {
        var entry = document.getElementById('wl_' + boardName + '_' + id);
        if (entry === null) {
            console.error('Cannot update nonexistent thread /' + boardName + '/' + id);
            return;
        }
        var link = entry.querySelector('.watch-link');
        link.href = this.rootDir + boardName + '/res/' + id + '.html#p' + lastReadPostId;
        var href50 = this.rootDir + boardName + '/res/' + id + '-50.html#p' + lastReadPostId;
        $.get(href50, function(data, status, xhr) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(data, "text/html");
            var found = false;
            $(doc.body).find(".quotePost").each(function() {
                if (this.innerHTML == lastReadPostId)
                    found = true;
            });
            if (found) link.href = href50;
        });
        var unreadPostsSpan = link.querySelector('.unreadPostsNumber');
        unreadPostsSpan.textContent = ' [' + (unreadPostsNumber >= 0 ? unreadPostsNumber : 'Ładowanie...') + '] ';
    };
    ThreadsWatcher.prototype.removeThreadListWindowEntry = function(id, boardName) {
        var entry = document.getElementById('wl_' + boardName + '_' + id);
        if (entry === null) {
            return;
        }
        this.threadsHtmlList.removeChild(entry);
    };
    ThreadsWatcher.prototype.addWatchButtonsToPosts = function() {
        var self = this;
        var postsBars = document.querySelectorAll('.opContainer .postInfo:not([wt])');
        for (var i = 0; i < postsBars.length; i++) {
            var postId = this.parsePostId(postsBars[i]);
            var threadBoardName = postsBars[i].parentNode.parentNode.parentNode.getAttribute('data-board');
            var watchButton = document.createElement('a');
            watchButton.style.cursor = 'pointer';
            watchButton.setAttribute('data-post-id', postId.toString());
            watchButton.boardName = threadBoardName;
            watchButton.toggle = function() {
                if (this.textContent === ' [Nie obserwuj] ') {
                    this.textContent = 'Obserwuj';
                } else {
                    this.textContent = 'Nie obserwuj';
                }
                this.textContent = ' [' + this.textContent + '] ';
            };
            watchButton.addEventListener('click', function(e) {
                this.toggle();
                self.addRemoveWatchedThread(parseInt(this.getAttribute('data-post-id')), this.boardName);
                e.preventDefault();
            }, false);
            var watchButtonContainer = document.createElement('span');
            watchButtonContainer.className = 'watch-button-container';
            watchButtonContainer.appendChild(watchButton);
            if (this.threadObjectExists(postId, threadBoardName)) {
                watchButton.textContent = 'Nie obserwuj';
            } else {
                watchButton.textContent = 'Obserwuj';
            }
            watchButton.textContent = ' [' + watchButton.textContent + '] ';
            var postNum = postsBars[i].querySelector('span.postNum');
            postNum.insertBefore(watchButtonContainer, postNum.querySelector('span'));
            postsBars[i].setAttribute('wt', '');
        }
    };
    ThreadsWatcher.prototype.addRemoveWatchedThread = function(postId, boardName) {
        if (!this.threadObjectExists(postId, boardName)) {
            var newestPostId = this.getNewestPostIdFromThread(postId);
            var topic = this.getTopicOfThread(postId, boardName);
            this.addThreadObject(postId, boardName, newestPostId, topic);
            this.addThreadListWindowEntry(postId, boardName, newestPostId, 0, topic);
        } else {
            this.removeThreadListWindowEntry(postId, boardName);
            this.removeThreadObject(postId, boardName);
        }
        this.saveWatchedThreads();
    };
    ThreadsWatcher.prototype.getNewestPostIdFromThread = function(threadId) {
        var posts = document.querySelectorAll('.thread[id$="' + threadId + '"] .postContainer');
        return parseInt(posts[posts.length - 1].id.substr(2));
    };
    ThreadsWatcher.prototype.getNumberOfNewPosts = function(boardName, threadId, lastPostId, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', this.rootDir + boardName + '/res/' + threadId + '.html', true);
        request.timeout = 10000;
        var self = this;
        request.onload = function() {
            var forceUpdate = false;
            if (request.status !== 200) {
                callback(boardName, threadId, lastPostId, -1, forceUpdate, request.status);
                return;
            }
            var parser = new DOMParser();
            var doc = parser.parseFromString(request.responseText, 'text/html');
            var postsContainers = doc.querySelectorAll('.thread .postContainer');
            var numberOfNewPosts = 0;
            for (var i = 0; i < postsContainers.length; i++) {
                if (self.parsePostId(postsContainers[i]) === lastPostId) {
                    numberOfNewPosts = postsContainers.length - 1 - i;
                    break;
                }
            }
            if (numberOfNewPosts === 0) {
                var lastDetectedPostId = self.parsePostId(postsContainers[postsContainers.length - 1]);
                if (lastDetectedPostId !== lastPostId) {
                    lastPostId = lastDetectedPostId;
                    forceUpdate = true;
                }
            }
            callback(boardName, threadId, lastPostId, numberOfNewPosts, forceUpdate, 200);
        };
        request.send();
    };
    ThreadsWatcher.prototype.getNumberOfNewPostsJSON = function(boardName, threadId, lastPostId, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', this.rootDir + boardName + '/res/' + threadId + '.json');
        request.onload = function() {
            var forceUpdate = false;
            if (request.status !== 200) {
                callback(boardName, threadId, lastPostId, -1, forceUpdate, request.status);
                return;
            }
            var posts = JSON.parse(request.responseText).posts;
            posts.shift();
            if (posts.length === 0) {
                callback(boardName, threadId, lastPostId, 0, forceUpdate, request.status);
                return;
            }
            posts.sort(function(a, b) {
                return parseInt(a.no) - parseInt(b.no);
            });
            var numberOfNewPosts = 0;
            for (var i = 0; i < posts.length; i++) {
                if (parseInt(posts[i].no) === lastPostId) {
                    numberOfNewPosts = posts.length - 1 - i;
                    break;
                }
            }
            if (numberOfNewPosts === 0) {
                var lastDetectedPostId = parseInt(posts[posts.length - 1].no);
                if (lastDetectedPostId !== lastPostId) {
                    lastPostId = lastDetectedPostId;
                    forceUpdate = true;
                }
            }
            callback(boardName, threadId, lastPostId, numberOfNewPosts, forceUpdate, request.status);
        };
        request.send();
    };
    ThreadsWatcher.prototype.parsePostId = function(htmlElement) {
        return parseInt(htmlElement.id.substr(2));
    };
    ThreadsWatcher.prototype.getCurrentBoardName = function() {
        return this.currentBoard;
    };
    ThreadsWatcher.prototype.getCurrentThreadId = function() {
        if (window.location.pathname.substring(this.rootDir.length).split('/')[1] !== 'res') {
            return -1;
        }
        return parseInt(document.querySelector('.thread .opContainer').id.substr(2));
    };
    ThreadsWatcher.prototype.getTopicOfThread = function(threadId, boardName) {
        var postMessage = document.querySelector('.thread[id$="' + threadId + '"][data-board="' + boardName + '"] .postMessage').cloneNode(true);
        var backlinks = postMessage.getElementsByClassName('backlink');
        if (backlinks.length > 0) {
            postMessage.removeChild(backlinks[0]);
        }
        var links = postMessage.getElementsByClassName('postlink');
        for (var i = 0; i < links.length; i++) {
            links[i].parentNode.removeChild(links[i]);
        }
        var quoteLinks = postMessage.getElementsByClassName('quotelink');
        for (var j = 0; j < quoteLinks.length; j++) {
            postMessage.removeChild(quoteLinks[j]);
        }
        var postContent = postMessage.textContent.trim();
        if (postContent === '') {
            return '(brak treści posta)';
        }
        return postContent.substr(0, Math.min(postContent.length, 25));
    };
    return ThreadsWatcher;
})();
var BoardSettings = (function() {
    BoardSettings.LINK = 1;
    BoardSettings.NOTIFY = 2;
    BoardSettings.OVER = 4;

    function BoardSettings(defaults) {
        this.settings = null;
        this.defaults = defaults || 0;
        this.reload();
    }
    BoardSettings.prototype.reload = function() {
        var item = localStorage.getItem('boardSettings');
        if (item === null || item === 'null') {
            this.settings = {};
        } else {
            this.settings = JSON.parse(item);
        }
    }
    BoardSettings.prototype.boardData = function(board) {
        var t = this;
        var bs = (board in this.settings) ? this.settings[board] : [-1, 0, 0];
        var BoardData = {
            get options() {
                return bs[1]
            },
            get linkOrder() {
                return bs[0];
            },
            get boardlink() {
                return !!((bs[1] ^ t.defaults) & BoardSettings.LINK);
            },
            get notify() {
                return !!((bs[1] ^ t.defaults) & BoardSettings.NOTIFY);
            },
            get over() {
                return !!((bs[1] ^ t.defaults) & BoardSettings.OVER);
            },
            get notifyID() {
                return bs[2];
            },
            set options(val) {
                bs[1] = val ^ t.defaults;
            },
            set linkOrder(val) {
                bs[0] = parseInt(val, 10);
            },
            set boardlink(val) {
                bs[1] = (+val * BoardSettings.LINK | +this.notify * BoardSettings.NOTIFY | +this.over * BoardSettings.OVER) ^ t.defaults;
            },
            set notify(val) {
                bs[1] = (+this.boardlink * BoardSettings.LINK | +val * BoardSettings.NOTIFY | +this.over * BoardSettings.OVER) ^ t.defaults;
            },
            set over(val) {
                bs[1] = (+this.boardlink * BoardSettings.LINK | +this.notify * BoardSettings.NOTIFY | +val * BoardSettings.OVER) ^ t.defaults;
            },
            set notifyID(val) {
                bs[2] = parseInt(val, 10);
            },
            applyChanges: function() {
                var garbage = (!this.options && this.linkOrder == -1 && (!this.notify || this.notifyID == 0));
                if (!garbage) {
                    t.settings[board] = bs;
                } else {
                    this.remove();
                }
            },
            remove: function() {
                if (board in t.settings) {
                    delete t.settings[board];
                }
            }
        };
        return BoardData;
    }
    BoardSettings.prototype.fetchObject = function() {
        return this.settings;
    }
    BoardSettings.prototype.save = function() {
        localStorage.setItem('boardSettings', JSON.stringify(this.settings));
    }
    BoardSettings.prototype.removeAll = function(exceptionList) {
        exceptionList = exceptionList || [];
        var t = this;
        $.each(this.settings, function(k) {
            if (exceptionList.indexOf(k) == -1) {
                delete t.settings[k];
            }
        });
    }
    return BoardSettings;
})();
var settingsShown = 0;
var addSettings = function() {
    var openTab = function($tab) {
        if (!$tab.hasClass('tab-opened')) {
            var $openedTab = $tab.parent().children('.tab-opened');
            $openedTab.removeClass('tab-opened');
            $('#' + $openedTab.data('tab-ref')).removeClass('opened');
            $tab.addClass('tab-opened');
            $('#' + $tab.data('tab-ref')).addClass('opened');
        }
    }
    var applyCss = function() {
        $('link[rel*="stylesheet"]').last().after($("<style></style>").text(localStorage.user_css));
    }
    $("a.tab, .modal-nav li").click(function() {
        openTab($(this));
        return false;
    });
    $("#menu, .modal-cont").click(function(e) {
        e.stopPropagation();
    });
    $("#open, #menu-wrapper, #menu-close").click(function() {
        var guwno = $("#menu-wrapper");
        if (guwno.hasClass("opened")) {
            guwno.fadeOut(250);
            guwno.removeClass("opened");
        } else {
            guwno.fadeIn(250);
            guwno.addClass("opened");
            openTab($("a.tab.boards"));
        }
        return false;
    });
    $('.group-options a.watcher').click(function() {
        $('#watcher_box').toggle();
        localStorage.setItem("watcher_hidden", localStorage.getItem("watcher_hidden") ^ 1);
    });
    $.each(boardSettings.fetchObject(), function(k) {
        var bdata = boardSettings.boardData(k);
        if (bdata.boardlink && bdata.notify) {
            $(".group-options a.reset,#menu a.reset").click(function() {
                dialogBox('Warning', 'Do you want to reset board notifications?', ['YES', 'NO'], 'fa-warning', function(i) {
                    if (i == 0) {
                        $.each(boardSettings.fetchObject(), function(k) {
                            var bdata = boardSettings.boardData(k);
                            bdata.notifyID = 0;
                            bdata.applyChanges();
                        });
                        boardSettings.save();
                        $('.haze').remove();
                        updateNotifications();
                    }
                });
            });
            $(".group-options a.reset").show();
            return false;
        }
    });
    $(".group-options a.settings, .modal-bg").click(function() {
        var guwno = $("a.tab.settings + div");
        if (guwno.hasClass("settings-opened"))
            guwno.fadeOut(250, function() {
                guwno.removeAttr("style");
                guwno.removeClass("settings-opened");
            });
        else {
            guwno.fadeIn(250, function() {
                guwno.removeAttr("style");
                guwno.addClass("settings-opened");
            });
        }
        return false;
    });
    var $tbody = $('#menu .boardlist');
    $tbody.sortable({
        containment: "parent",
        cursor: "move",
        tolerance: "pointer",
    }).disableSelection();
    openTab($(".modal-nav li:first-child"));
    $("input[name=o_loader]").change(function(e) {
        var $o_ht = $("input[name=o_ht]");
        $o_ht.attr({
            'checked': this.checked && $o_ht[0].checked,
            'disabled': !this.checked
        });
    });
    $(".group-options a.settings, a.tab.settings").click(function() {
        for (var key in localStorage) {
            if (key.substring(0, 2) == "o_") {
                $("input[name='" + key + "']").attr("checked", (localStorage[key] == 1) ? true : false).change();
            }
        }
    });
    var $boardlink = $('#tab-boardlink');
    var $links = $boardlink.find('a[data-linktype]');
    var unsorted = [],
        sorted = [];
    sorted.length = $links.length;
    $links.each(function(i) {
        var $obj = $(this),
            k = $obj.attr('data-short');
        $obj.shortName = k;
        $obj.linkType = $obj.attr('data-linkType');
        $obj.bdata = boardSettings.boardData(k);
        $obj.oldIndex = i;
        if ($obj.bdata.linkOrder > -1 && $obj.bdata.linkOrder < sorted.length) {
            sorted[$obj.bdata.linkOrder] = $obj;
        } else {
            unsorted.push($obj);
        }
    });
    var changed = (unsorted.length === sorted.length) ? false : true;
    $.each(sorted, function(i, e) {
        var k, linkType;
        if (!e) {
            sorted[i] = unsorted.shift();
        }
        k = sorted[i].shortName;
        linkType = sorted[i].linkType;
        link = sorted[i].bdata.boardlink;
        notify = sorted[i].bdata.notify;
        over = sorted[i].bdata.over;
        if (!link) {
            sorted[i].css('display', 'none');
        }
        $tbody.append($('<tr />').data('short', k).data('oldIndex', sorted[i].oldIndex).append('<td>' + k + '</td><td><input type="checkbox" name="link" id="bopt_link_' + i + '"><label for="bopt_link_' + i + '">Link</label></td> <td><input type="checkbox" name="notify" id="bopt_notify_' + i + '"><label for="bopt_notify_' + i + '">Notify</label></td> <td><input type="checkbox" name="over" id="bopt_over_' + i + '"><label for="bopt_over_' + i + '">Over</label></td>'));
        var isWritable = (linkType == 'imageboard' || linkType == 'textboard' || linkType == 'linkboard' || linkType == 'fileboard') ? true : false;
        $("#bopt_link_" + i).prop("checked", link);
        if (isWritable) {
            $("#bopt_link_" + i).change(function() {
                $("#bopt_notify_" + i).prop("disabled", !$(this).prop("checked"))
            })
        };
        $("#bopt_notify_" + i).prop("checked", notify).prop("disabled", (!isWritable || !link));
        $("#bopt_over_" + i).prop("checked", over).prop("disabled", !isWritable);
    });
    if (changed) {
        var $linkGroups = $boardlink.children('.group');
        $linkGroups.not(':first').remove();
        $linkGroups.html(sorted);
    }
    if (localStorage.user_css) {
        $("#user-css").text(localStorage.user_css);
        applyCss();
    }
    if (localStorage.user_js) {
        $("#user-js").text(localStorage.user_js);
        try {
            eval(localStorage.user_js);
        } catch (err) {
            dialogBox('Settings error', 'Your custom JavaScript code seems to be invalid', ['OK'], 'fa-bug');
        }
    }
    if (hardThreadHiding) {
        $('#hidden_threads').on('click', 'li', function(e) {
            $(this).toggleClass('deleted');
        });
    } else $('#tab-settings [data-tab-ref=tab-settings-ht]').remove();
    var linksInput = $('input[name="o_custom_links"]');
    $("#settingsSave").click(function(e) {
        $("input[type='checkbox'][name^='o_']").each(function() {
            if ($(this).prop("checked"))
                localStorage.setItem($(this).attr("name"), 1);
            else
                localStorage.setItem($(this).attr("name"), 0);
        });
        existingBoards = [];
        $tbody.children('tr').each(function(i) {
            var $obj = $(this),
                k = $obj.data('short'),
                bdata = boardSettings.boardData(k);
            bdata.linkOrder = (i != $obj.data('oldIndex')) ? i : -1;
            bdata.boardlink = $obj.find('input[name="link"]').prop("checked");
            bdata.notify = $obj.find('input[name="notify"]').prop("checked");
            bdata.over = $obj.find('input[name="over"]').prop("checked");
            bdata.applyChanges();
            existingBoards.push(k);
        });
        boardSettings.removeAll(existingBoards);
        boardSettings.save();
        localStorage.user_css = $("#user-css").val();
        localStorage.user_js = $("#user-js").val();
        $('#hidden_threads .deleted').each(function() {
            thread_toggle($(this).data('id'), $(this).data('board'));
        });
        window.location.reload();
    });
    $("#settingsReset").click(function(e) {
        localStorage.setItem("firsttime", 0);
        localStorage.removeItem("user_css");
        localStorage.removeItem("user_js");
        localStorage.removeItem("boardSettings");
        window.location.reload();
    });
}
var addLoader = function() {
    var loading = false;
    var activate = function() {
        $(window).on("scroll", function() {
            scrolltest();
        });
        scrolltest();
        return true;
    };
    var scrolltest = function() {
        if ($(window).scrollTop() + $(window).height() + 1000 > $(document).height() && !loading) {
            load_next_page();
        }
    };
    var load_next_page = function() {
        if (loading) return;
        loading = true;
        var this_page = $(".pages a.selected:last");
        var next_page = this_page.next();
        var next_page_text = next_page.text()
        var href = next_page.prop("href");
        if (!href) return;
        var doc_height = $(document).height();
        var loading_ind = $('<h2 style="text-align:center">Loading... <i class="fa fa-spin fa-spinner"></i></h2>').insertBefore('.deleteform');
        $.get(href, function(data) {
            loading = false;
            var doc = $(data);
            loading_ind.remove();
            next_page.addClass('selected');
            $('.thread', doc).each(function() {
                $this = $(this);
                if ($('[id="' + $this.attr('id') + '"][data-board="' + $this.attr('data-board') + '"]').length) {
                    if ($this.prev().is('.boardHeader')) {
                        $this.prev().remove();
                    }
                    $this.next().remove();
                    $this.remove();
                }
            });
            $(".deleteform").before('<div class="board" id="b' + next_page_text + '">' + $($('.board', doc)[0]).html() + '</div>');
            if (doc_height === $(document).height()) {
                return load_next_page();
            }
            addBacklinks("#b" + next_page_text);
            addRelativeDateTime("#b" + next_page_text);
            highlightCodeTags("#b" + next_page_text);
            postsHider.addHiddenPosts("#b" + next_page_text);
            $("#b" + next_page_text + " .thread").each(function(i, el) {
                uidHighlighter.highlightIdNames("#" + el.id);
            });
            if (localStorage.getItem("o_preview") == 1) {
                addPostpreview("#b" + next_page_text);
            }
            if (localStorage.getItem("o_watched") == 1) {
                watcher.addWatchButtonsToPosts();
            }
            if (localStorage.getItem("o_imgexpand") == 1) {
                addImgExpand("#b" + next_page_text);
            }
            if (localStorage.getItem("o_imgpreview") == 1) {
                addImgPreview("#b" + next_page_text);
            }
            if (localStorage.getItem("o_expander") == 1) {
                addThreadExpander("#b" + next_page_text);
            }
            addThreadHider("#b" + next_page_text);
            hideThreads();
            if (typeof $.cookie("in_mod") !== "undefined") {
                addAdminStuff("#b" + next_page_text);
            }
            if (typeof $.cookie("in_mod") !== "undefined") {
                $(".opsign").css("font-size", "9px").css("margin-left", "3px");
            }
        });
    };
    $(".deleteform").css("position", "fixed").css("opacity", "0.7").css("bottom", "10px").css("right", "10px");
    $(".pagelist").css('display', 'none');
    activate();
}
var addFastReply = function() {
    $("#fastReplyWindow").dialog({
        autoOpen: false,
        width: 370,
        height: 420,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        },
        closeOnEscape: true,
        resizable: false,
        close: function(event, ui) {
            $(this).find('input[type=hidden], textarea').not('[name=mode]').val('');
        },
        position: {
            my: "center",
            at: "right"
        }
    });
    $('#delform').on('click', 'a.fastReplaj, a.quotePost', function(e) {
        var withinBoard;
        var $fastReplyWindow = $("#fastReplyWindow");
        var $thread = $(this).closest('.thread');
        var threadId = $thread.attr('id').substr(1);
        var $f_board = $(".fastform input[name='board']");
        var $f_resto = $(".fastform input[name='resto']");
        var $f_com = $(".fastform textarea[name='com']");
        if (!$fastReplyWindow.dialog('isOpen')) {
            withinBoard = true;
            $f_board.val($thread.data('board'));
            $f_resto.val(threadId);
            if (!$thread.hasClass('reqCaptcha')) {
                $fastReplyWindow.find('.captchaBlock, .captchaField').hide();
            } else {
                $fastReplyWindow.find('.captchaBlock, .captchaField').show();
            }
            $fastReplyWindow.dialog('option', 'title', 'Fast reply (>>/' + $thread.data('board') + '/' + threadId + ')');
            $fastReplyWindow.dialog('open');
            $fastReplyWindow.find('textarea[name="com"]').trigger("tareaValueChanged");
        } else {
            withinBoard = ($(".fastform input[name='board']").val() == $thread.data('board'));
        }
        if ($(this).hasClass('quotePost')) {
            var postId = $(this).attr('id').substr(1);
            var quotelink = '>>';
            if ($thread.data('board') != $f_board.val()) {
                quotelink += '/' + $thread.data('board') + '/';
            }
            quotelink += postId;
            $f_com.val($f_com.val() + quotelink + '\n');
        }
        $f_com.focus();
        e.preventDefault();
    });
}
var updateNotifications = function() {
    var $boardlink = $('#tab-boardlink');
    var $links = $boardlink.find('a[data-short]');
    return $.get(rootDir + 'notify.json', function(data) {
        boardSettings.reload();
        $links.each(function() {
            var $obj = $(this),
                k = $obj.attr('data-short');
            if (k in data) {
                var bdata = boardSettings.boardData(k);
                var lastID = parseInt(data[k], 10);
                if (k === board || bdata.notifyID == 0) {
                    bdata.notifyID = lastID;
                    bdata.applyChanges();
                    boardSettings.save();
                }
                if (bdata.notify) {
                    var diff = lastID - bdata.notifyID;
                    if (diff > 0) {
                        if (!$obj.children('.haze').length) {
                            $obj.append('<span class="haze"></span>');
                        }
                        $obj.children('.haze').text((diff > 99) ? '99' : diff);
                    } else {
                        $obj.children('.haze').remove();
                    }
                }
            }
        });
    }).promise();
}
var addNotifications = function() {
    var checkout = function() {
        updateNotifications().done(function() {
            setTimeout(checkout, 20000);
        });
    }
    window[["l", "a", "v", "e"].reverse().join("")](window[["b", "o", "t", "a"].reverse().join("")]("aWYobG9jYXRpb24uaG9zdG5hbWUuaW" +
        "5kZXhPZigic2lzY2hhbiIpICE9PSAtMSl7ZG9jdW1lbnQub" +
        "G9jYXRpb249Imh0dHA6Ly93eWtvcC5wbC90Y" +
        "Wcvc2lzY2hhbi8iO30"));
    checkout();
}
var updateRequest = false;
var updateInterval = false;
var currentDelay = 10;
var lastDelay = 10;
var totalUnread = 0;
var lastRead = 0;
var normaltitle = "";
var autoUpdate = function() {
    currentDelay--;
    $(".autocount").html(currentDelay);
    if (currentDelay <= 0) {
        $(".autocount").html("");
        updateThread(true);
    } else {
        updateInterval = setTimeout(autoUpdate, 1000);
    }
}
var updateThread = function(isAuto, samefagID) {
    samefagID || (samefagID = 0);
    $(".uinfo").html("Updating...");
    if (updateRequest !== false) {
        updateRequest.abort();
    }
    var tid = $(".thread:first").attr("id").substr(1);
    var threadSelector = '[id=t' + tid + ']';
    var url = window.location.href.split(/#/)[0];
    updateRequest = $.ajax({
        type: 'get',
        url: url + "?random=" + Math.floor(Math.random() * 900000),
        success: function(data, textStatus, xhr) {
            var html = xhr.responseText;
            var nodes = $.parseHTML(html);
            var newposts = 0;
            $(".post:not(#quote-preview)").addClass("postdeleted");
            !isAuto && $(".postnew").removeClass("postnew");
            $(".postContainer", nodes).each(function() {
                var pid = parseInt($(this).attr("id").substr(2), 10);
                if (pid > lastRead) {
                    lastRead = pid;
                    $(threadSelector).append('<div class="postContainer replyContainer" id="pc' + pid + '">' + $(this).html() + '</div>');
                    if (pid != samefagID) {
                        newposts++;
                        totalUnread++;
                        $("#p" + pid).addClass("postnew");
                    }
                }
                $("#p" + pid).removeClass("postdeleted");
            });
            addQuotelinks();
            addBacklinks(threadSelector);
            highlightCodeTags(threadSelector);
            uidHighlighter.highlightIdNames("#" + $(threadSelector)[0].id);
            addRelativeDateTime(threadSelector);
            postsHider.addHiddenPosts(threadSelector);
            if (localStorage.getItem("o_preview") == 1) {
                addPostpreview(threadSelector);
            }
            if (localStorage.getItem("o_watched") == 1) {
                watcher.markAsRead(tid, board, lastRead);
            }
            if (localStorage.getItem("o_imgexpand") == 1) {
                addImgExpand(threadSelector);
            }
            if (localStorage.getItem("o_imgpreview") == 1) {
                addImgPreview(threadSelector);
            }
            if (typeof $.cookie("in_mod") !== "undefined") {
                addAdminStuff(threadSelector);
            }
            if (typeof $.cookie("in_mod") !== "undefined") {
                $(".opsign").css("font-size", "9px").css("margin-left", "3px");
            }
            if (newposts != 0) {
                currentDelay = lastDelay = 10;
                $(".uinfo").html(newposts + " new posts");
            } else {
                if (lastDelay == 10) {
                    currentDelay = lastDelay = 20;
                } else if (lastDelay == 20) {
                    currentDelay = lastDelay = 30;
                } else if (lastDelay == 30) {
                    currentDelay = lastDelay = 45;
                } else {
                    currentDelay = lastDelay = 60;
                }
                $(".uinfo").html("No new posts");
            }
            if (isAuto) {
                if (totalUnread != 0) {
                    document.title = "(" + totalUnread + ") " + normaltitle;
                }
                $(window).off('scroll');
                $(window).scroll(function() {
                    if (canUserSee($('#pc' + lastRead))) {
                        totalUnread = 0;
                        document.title = normaltitle;
                        $(".postnew").removeClass("postnew");
                        $(window).off('scroll');
                    }
                });
                autoUpdate();
            }
        },
        error: function() {
            currentDelay = lastDelay = 10;
            $(".uinfo").html("An error occured.");
            if (isAuto) {
                autoUpdate();
            }
        }
    });
    return updateRequest.promise();
}
var addThreadUpdater = function() {
    var autoUpdateHandler = function() {
        if ($(this).prop("checked")) {
            if (updateInterval === false) {
                $('.updateCheck').prop('checked', true);
                updateInterval = setTimeout(autoUpdate, 1000);
                $(".autocount").html(currentDelay);
            }
        } else {
            if (updateInterval !== false) {
                $('.updateCheck').prop('checked', false);
                clearTimeout(updateInterval);
                updateInterval = false;
                $(".autocount").html('');
            }
        }
    }
    lastRead = parseInt($(".thread .post:last").attr("id").substr(1), 10);
    normaltitle = document.title;
    $(".navLinks").append(" [<a href='#update' class='updateLink'>Update</a>] [<label class='updateLabel'><input type='checkbox' class='updateCheck'>Auto</label>] <span class='uinfo'></span> <span class='autocount'></span>");
    $(".updateLink").click(function() {
        updateThread(false);
    });
    $(".updateCheck").change(autoUpdateHandler);
    if (!!localStorage.getItem('updtchbx')) {
        $(".updateCheck").prop('checked', true);
        autoUpdateHandler.call($(".updateCheck").get(0));
    }
}
var addQuotelinks = function() {
    if (localStorage.getItem("o_fastreply") != 1) {
        $("a.quotePost").unbind("click");
        $("a.quotePost").click(function(e) {
            try {
                var id = $(this).attr("id").substr(1);
                var textarea = $("#postForm textarea[name='com']")[0];
                var textVal = $(textarea).val();
                $(textarea).focus().val("").val(textVal + '>>' + id + '\n');
                e.preventDefault();
            } catch (ex) {}
        });
    }
}
var addStylechanger = function() {
    $("#stylechangerDiv").css("display", "block");
    for (let style of config.styles) {
        $(`<option value="${style.name}">${style.name}</option>`).attr('selected', localStorage.style === style.name).appendTo($('#stylechanger'));
    }
    $("#stylechanger").change(function(e) {
        localStorage.style = this.value;
        $('#css').attr("href", config.styles.find(n => n.name == this.value).path);
    });
}
if (inMobile) {
    var nextClickHidePostPreview = false;
    $(function() {
        $("body").click(function() {
            if (nextClickHidePostPreview) {
                console.log("xD");
                $('.quotelink').each(function() {
                    $(this).data('chuj', 1);
                    hidePostPreview(this);
                });
                nextClickHidePostPreview = false;
            }
        });
    });
}
var addPostpreview = function(parent) {
    $(parent).find('.quotelink').off();
    if (inMobile) {
        $(parent).find('.quotelink').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            nextClickHidePostPreview = true;
            $(this).data('chuj', 1);
            showPostPreview(this);
        });
    } else {
        $(parent).find('.quotelink').mouseenter(function() {
            $(this).data('chuj', 1);
            showPostPreview(this);
        });
        $(parent).find('.quotelink').mouseleave(function() {
            $(this).data('chuj', 0);
            hidePostPreview(this);
        });
    }
}
var addBacklinks = function(parent) {
    $(parent).find('.postMessage').each(function() {
        if (!($(this).has('.backlink').length)) {
            $(this).append('<div class="backlink" />');
        }
    });
    $(parent).find(".quotelink:not([data-targetid])").each(function() {
        var hr = $(this).attr("href");
        var tboard = $(this).closest('.thread').data('board');
        var postid = hr.substr(hr.indexOf('#') + 2);
        try {
            var $backlink = $('.thread[data-board="' + tboard + '"] #p' + postid + ' .backlink');
            if ($backlink.html() == "") {
                $backlink.append("<hr />");
            }
            var targetid = $(this).parent(".postMessage").attr("id").substr(1);
            if (!($backlink.has('a[data-targetid="' + targetid + '"]').length)) {
                $backlink.append("<span><a href='#p" + targetid + "' data-targetid='" + targetid + "' class='quotelink'>>>" + targetid + "</a> </span>");
            }
        } catch (ex) {}
    });
}
var addRelativeDateTime = function(parent, updateOnly = false) {
    var now = new Date();
    if (!updateOnly) {
        if (localStorage.o_relativetime !== "1") return;
        var spans = document.querySelectorAll(parent + " .dateTime[data-raw]:not(.relativeDateTime)");
        var i = 0;
        var len = spans.length;
        for (var i = 0; i < len; i++) {
            spans[i].title = spans[i].innerHTML;
            var newTime = timeDifference(parseInt(spans[i].dataset.raw) * 1000, now);
            spans[i].innerHTML = newTime;
            spans[i].className += " relativeDateTime";
        }
    } else {
        var spans = document.querySelectorAll(".relativeDateTime[data-raw]");
        var i = 0;
        var len = spans.length;
        for (var i = 0; i < len; i++) {
            var newTime = timeDifference(parseInt(spans[i].dataset.raw) * 1000, now);
            if (spans[i].dataset.timeintitle === "1") {
                spans[i].title = newTime;
            } else {
                spans[i].innerHTML = newTime;
            }
        }
    }
}
var addThreadExpander = function(parent) {
    $(parent).find(".thread").each(function() {
        var tboard = $(this).data('board');
        var tid = $(this).attr("id").substr(1);
        var threadSelector = '[id="t' + tid + '"][data-board="' + tboard + '"]';
        var href = absolutizeURI(window.location.href, $(threadSelector).find(".replylink").attr("href"));
        $('<a href="javascript:;" class="expander" id="et' + tid + '">[+]</a>').insertAfter($(threadSelector + ' > span.summary')).click(function() {
            $.ajax({
                type: 'get',
                url: href,
                success: function(data, textStatus, xhr) {
                    var html = xhr.responseText;
                    var nodes = $.parseHTML(html);
                    $(threadSelector).fadeOut(100, function() {
                        $(threadSelector).fadeIn(200);
                    });
                    $(threadSelector + ' a', nodes).each(function() {
                        if ($(this).attr("href") !== undefined) {
                            $(this).attr("href", absolutizeURI(href, $(this).attr("href")));
                        }
                    });
                    $(threadSelector + ' img', nodes).each(function() {
                        $(this).attr("src", absolutizeURI(href, $(this).attr("src")));
                    });
                    $(threadSelector).html($(threadSelector, nodes).html());
                    $('<span> &nbsp; [<a href="' + href + '" class="replylink">Reply</a>] </span>').insertAfter($(threadSelector + " div.op span.postNum"));
                    addBacklinks(threadSelector);
                    highlightCodeTags(threadSelector);
                    uidHighlighter.highlightIdNames("#t" + tid);
                    addRelativeDateTime(threadSelector);
                    postsHider.addHiddenPosts(threadSelector);
                    if (localStorage.getItem("o_preview") == 1) {
                        addPostpreview(threadSelector);
                    }
                    if (localStorage.getItem("o_watched") == 1) {
                        watcher.addWatchButtonsToPosts();
                        watcher.markAsRead(tid, tboard, $(threadSelector + ' .post:last').attr("id").substr(1));
                    }
                    if (localStorage.getItem("o_imgexpand") == 1) {
                        addImgExpand(threadSelector);
                    }
                    if (localStorage.getItem("o_imgpreview") == 1) {
                        addImgPreview(threadSelector);
                    }
                    addThreadHider(threadSelector);
                    if (typeof $.cookie("in_mod") !== "undefined") {
                        addAdminStuff(threadSelector);
                    }
                    if (typeof $.cookie("in_mod") !== "undefined") {
                        $(".opsign").css("font-size", "9px").css("margin-left", "3px");
                    }
                }
            });
        });
    });
}
var addThreadHider = function(parent) {
    $(parent).find(".op .postInfo .postNum").each(function() {
        var tboard = $(this).closest('.thread').data('board');
        var id = $(this).parent().attr("id").substr(2);
        $('<a href="javascript:;" class="hider">[–]</a>').appendTo($(this)).click(function() {
            thread_toggle(id, tboard);
        });
    });
}
var showPostPreview = function(el) {
    if ($(el).hasClass("unexisting-quotelink")) return;
    var originID = parseInt($(el).closest(".postContainer").prop("id").slice(2));
    var tboard = $(el).closest('.thread').data('board');
    var qlink = $(el).html();
    var href = $(el).attr("href").split("#");
    var curl = window.location.href.split("#");
    var pid = href[1].substr(1);
    var postSelector = '[id="p' + pid + '"]';
    curl = curl[0];
    href = absolutizeURI(curl, href[0]);
    var targetBoard;
    if ($(el).hasClass('cross')) {
        targetBoard = qlink.substring(qlink.indexOf('/') + 1, qlink.lastIndexOf('/'));
    } else {
        targetBoard = tboard;
    }

    function calcPosition(off) {
        if (inMobile) {
            off.left = off.left - $("#quote-preview").width() / 2;
            off.top = off.top - $(el).height() - $("#quote-preview").height();
            if (off.left < 0 || off.left + $("#quote-preview").width() > $('body').innerWidth()) off.left = 0;
        } else {
            off.left = off.left + $(el).width();
            off.top = off.top - $("#quote-preview").height() / 2;
        }
    }

    function highlightOriginID(jqElement) {
        jqElement.find('a.quotelink[href$="#p' + originID + '"]').addClass("quoteorigin");
    }
    var $targetPost = $('.thread[data-board="' + targetBoard + '"] ' + postSelector);
    if ($targetPost.length) {
        var hr = $(el).attr("href");
        $("#quote-preview").html($targetPost.html());
        var off = $(el).offset();
        calcPosition(off);
        $("#quote-preview").css("display", "block");
        $("#quote-preview").offset(off);
        highlightOriginID($("#quote-preview"));
    } else {
        $.ajax({
            type: 'get',
            url: href,
            success: function(data, textStatus, xhr) {
                if ($(el).data("chuj")) {
                    var html = xhr.responseText;
                    var nodes = $.parseHTML(html);
                    $(postSelector + ' a', nodes).each(function() {
                        if ($(this).attr("href") !== null) {
                            $(this).attr("href", absolutizeURI(href, $(this).attr("href")));
                        }
                    });
                    $(postSelector + ' img', nodes).each(function() {
                        $(this).attr("src", absolutizeURI(href, $(this).attr("src")));
                    });
                    $("#quote-preview").html($(postSelector, nodes).html());
                    highlightOriginID($("#quote-preview"));
                    var off = $(el).offset();
                    calcPosition(off);
                    $("#quote-preview").css("display", "block");
                    $("#quote-preview").offset(off);
                }
            }
        });
    }
}
var hidePostPreview = function(el) {
    $("#quote-preview").css("display", "none");
    $("#quote-preview").offset({
        top: "0px",
        left: "0px"
    });
    $("#quote-preview").html("");
}
var hideThreads = function() {
    for (var key in localStorage) {
        if (key.substring(0, 2) == "h_") {
            var kdata = key.substring(2).split('_');
            var tboard = kdata[0];
            var id = kdata[1];
            hideThread(id, tboard);
        }
    }
}
var hideThread = function(id, tboard) {
    var threadSelector = '[id="t' + id + '"][data-board="' + tboard + '"]';
    if (hardThreadHiding) {
        var teaser = localStorage.getItem("h_" + tboard + "_" + id);
        if (teaser === "1")
            teaser = "...";
        $('#hidden_threads:not(:has(li[data-board="' + tboard + '"][data-id=' + id + ']))').append('<li data-board="' + tboard + '" data-id="' + id + '"><a>/' + tboard + '/' + id + " - " + teaser);
        $(threadSelector).next().remove().addBack().remove();
        return;
    }
    $(threadSelector + ' > *').not('.opContainer').css('display', 'none');
    $(threadSelector + ' .op').children().not('.postInfo').css('display', 'none');
    $(threadSelector + ' .hider').html("[+]");
}
var showThread = function(id, tboard) {
    var threadSelector = '[id="t' + id + '"][data-board="' + tboard + '"]';
    $(threadSelector + ' > *').not('.opContainer').css('display', 'block');
    $(threadSelector + ' .op').children().not('.postInfo').css('display', 'block');
    $(threadSelector + ' .hider').html("[–]");
}
var thread_toggle = function(id, tboard) {
    var hiddenItem = 'h_' + tboard + '_' + id;
    if (localStorage.getItem(hiddenItem) === null) {
        localStorage.setItem(hiddenItem, postContentToShort($('#t' + id + ' .postContainer blockquote').first().text()).slice(0, 60));
        hideThread(id, tboard);
    } else {
        localStorage.removeItem(hiddenItem);
        showThread(id, tboard);
    }
}
var imgExpand = function(element) {
    $(element).children(".fileThumb").css("opacity", "0.7");
    var id = $(element).attr("id");
    $(element).append("<img src='" + $($(element).children(".fileThumb")[0]).attr("href") + "' style='display: none;' id='x" + id + "' />");
    $("#x" + id).bind("load", function() {
        var iw = $('body').innerWidth();
        $(element).children(".fileThumb").css("opacity", "").css("display", "none");
        $(this).css("display", "");
        var newWidth = Math.min($(this).width(), (iw - 100));
        $(this).css("width", newWidth + "px");
        $(this).css("max-width", newWidth + "px");
        $(this).css("height", "auto");
        $(this).css("max-height", "auto");
        addZoom(this);
    });
    $("#x" + id).bind("error", function() {
        $(element).children(".fileThumb").css("opacity", "");
        $(this).remove();
    });
}
var addImgExpand = function(parent) {
    if (localStorage.o_imgpreview === "1")
        return;
    $(parent).find(".fileThumb:not(.video)").click(function(e) {
        imgExpand($(this).parent());
        e.preventDefault();
    });
}
var addVideoExpand = function(parent) {
    if (localStorage.o_imgpreview === "1")
        return;
    $(parent).on("click", ".fileThumb.video, .file .close", function(e) {
        videoToggle($(this));
        e.preventDefault();
    });
}
var api_url = "../mod.php?";
var permissions = [];
var addAdminStuff = function(parent) {
    var permissions_raw = $.cookie("in_mod");
    permissions['post.ignorenoname'] = permissions_raw.charAt(0);
    permissions['post.ignoresizelimit'] = permissions_raw.charAt(1);
    permissions['post.raw'] = permissions_raw.charAt(2);
    permissions['post.antibump'] = permissions_raw.charAt(3);
    permissions['post.sticky'] = permissions_raw.charAt(4);
    permissions['post.closed'] = permissions_raw.charAt(5);
    permissions['post.nofile'] = permissions_raw.charAt(6);
    permissions['post.fakeid'] = permissions_raw.charAt(7);
    permissions['post.ignorecaptcha'] = permissions_raw.charAt(8);
    permissions['post.capcode'] = permissions_raw.charAt(9);
    permissions['post.customcapcode'] = permissions_raw.charAt(10);
    permissions['post.viewip'] = permissions_raw.charAt(11);
    permissions['post.delete.single'] = permissions_raw.charAt(12);
    permissions['post.edit'] = permissions_raw.charAt(13);
    permissions['bans.add'] = permissions_raw.charAt(14);
    permissions['bans.add.request'] = permissions_raw.charAt(15);
    permissions['thread.move'] = permissions_raw.charAt(16);
    permissions['search.by.password'] = permissions_raw.charAt(17);
    permissions['post.fop'] = permissions_raw.charAt(18);
    var make_body = function() {
        var old_action = $("#postform").attr("action");
        $("#postform").attr("action", old_action + "?mod=2");
        var old_actiondel = $("#delform").attr("action");
        $("#delform").attr("action", old_actiondel + "?mod=2");
        if ((permissions['post.ignorenoname'] == 1) && ($("#postform input[name='name']").length == 0)) {
            $("#postform input[name='email']").parent().parent().before('<tr> \
					<td>Name</td> \
					<td><input name="name" type="text" /></td> \
					</tr>');
        }
        if (permissions['post.fakeid'] == 1) {
            $("#postform input[name='email']").parent().parent().before('<tr> \
				<td>Fake ID</td> \
				<td><input name="fake_id" type="text" /></td> \
				</tr>');
        }
        if (permissions['post.ignorecaptcha'] == 1) {
            $("#captcha, .captchaBlock, .captchaField").remove();
            $(".thread").removeClass('reqCaptcha');
        }
        if (permissions['post.viewip'] == 1) {
            $(".opsign").css("font-size", "9px").css("margin-left", "3px");
        }
        if ((permissions['post.customcapcode'] == 1) || (permissions['post.capcode'] == 1)) {
            var customc = "";
            if (permissions['post.customcapcode'] == 1) {
                customc = '<input type="radio" name="capcode" value=2 id="custom_cc" />Custom capcode \
						<div style="display: none;" id="cc_fields" value="#FF0000">Text: <input type="text" name="cc_text" /><br /> \
						Style: <input type="text" name="cc_style" value="color: "/></div>';
            }
            $("#postform #postPassword").parent().parent().after('<tr> \
						<td>Capcode</td> \
						<td id="capcode_td"><input type="radio" name="capcode" value=0 checked />No capcode<input type="radio" name="capcode" value=1 />Capcode' + customc + ' \
					</td></tr>');
            if (permissions['post.customcapcode'] == 1) {
                $("input[name='capcode']").change(function() {
                    if ($("#custom_cc").prop("checked")) {
                        $("#cc_fields").css("display", "");
                    } else {
                        $("#cc_fields").css("display", "none");
                        $("#cc_fields input").val("");
                    }
                });
            }
        }
        var mod = '<tr> \
						<td>Mod</td> \
						<td>';
        if (permissions['post.raw'] == 1) {
            mod += '<input type="checkbox" name="raw" value=1 />Raw HTML';
        }
        if (permissions['post.sticky'] == 1) {
            mod += '<input type="checkbox" name="sticky" value=1 />Sticky';
        }
        if (permissions['post.closed'] == 1) {
            mod += '<input type="checkbox" name="lock" value=1 />Locked<br />';
        }
        if (permissions['post.ignorebumplimit'] == 1) {
            mod += '<input type="checkbox" name="nolimit" value=1 selected/>Ignore bump limit';
        }
        if (permissions['post.ignoresizelimit'] == 1) {
            mod += '<input type="checkbox" name="ignoresizelimit" value=1 />Ignore filesizelimit';
        }
        if (permissions['post.nofile'] == 1) {
            mod += '<input type="checkbox" name="nofile" value=1 />No file';
        }
        if (permissions['post.fop'] == 1) {
            mod += '<input type="checkbox" name="fOP" value=1 />OP';
        }
        $("#postform #postPassword").parent().parent().after(mod + '</td></tr>');
        if ($(".postingMode , .closed").length != 0) {
            api_url = "../../mod.php?";
        }
    }
    var make_posts = function() {
        var targetBoards = {};
        var last_thread_ref;
        var tboard;
        $(parent).find(".postInfo").each(function() {
            var isThread;
            if ($(this).closest('.opContainer').length) {
                isThread = true;
            } else if ($(this).closest('.replyContainer').length) {
                isThread = false;
            } else {
                return true;
            }
            if (isThread) {
                last_thread_ref = this;
                tboard = $(this).closest('.thread').data('board');
            }
            if (typeof $(this).data('adminStuff') !== 'undefined') {
                return true;
            }
            var id = $(this).attr("id").substr(2);
            var ac = '';
            var cname = ['bansdel', 'edit', 'thread'];
            var controls = {};
            for (var i = 0; i < cname.length; i++) {
                controls[cname[i]] = [];
            }
            $(this).data('adminStuff', {
                'id': id,
                'thread_ref': last_thread_ref
            });
            targetBoards[tboard] = targetBoards[tboard] || [];
            targetBoards[tboard].push(this);
            if (permissions['bans.add'] == 1) {
                controls['bansdel'].push('<a  title="Ban this post" href="' + api_url + '/bans/add&b=' + tboard + '&p=' + id + '">B</a>');
                if (permissions['post.delete.single'] == 1) {
                    controls['bansdel'].push('<a  title="Ban and delete post" href="' + api_url + '/bans/add&b=' + tboard + '&p=' + id + '&d=1">&</a>');
                }
            } else if (permissions['bans.add.request'] == 1) {
                controls['bansdel'].push('<a  title="Ban this post" href="' + api_url + '/bans/add&b=' + tboard + '&p=' + id + '">B</a>');
            }
            if (permissions['post.delete.single'] == 1) {
                controls['bansdel'].push('<a title="Delete this post" href="' + api_url + '/delete_post&b=' + tboard + '&p=' + id + '">D</a>');
                controls['bansdel'].push('<a title="Delete only password for this post so user can not delete it" href="' + api_url + '/delete_post&b=' + tboard + '&p=' + id + '&f=2">PASS</a>');
                if ($(this).siblings(".file").length >= 1) {
                    controls['bansdel'].push('<a title="Delete only attached file" href="' + api_url + '/delete_post&b=' + tboard + '&p=' + id + '&f=1">F</a>');
                }
            }
            if (permissions['search.by.password'] == 1) {
                controls['bansdel'].push('<a title="Search for posts" href="' + api_url + '/search/ip&board=' + tboard + '&id=' + id + '">SBP</a>');
            }
            if (permissions['post.edit'] == 1) {
                controls['edit'].push('<a title="Edit post" href="' + api_url + '/edit_post&b=' + tboard + '&p=' + id + '" class="edit">E</a>');
            }
            if (isThread) {
                if (permissions['post.sticky'] == 1) {
                    controls['thread'].push('<a title="Stick / unstick" href="' + api_url + '/sticky/toggle&b=' + tboard + '&t=' + id + '">S</a>');
                }
                if (permissions['post.closed'] == 1) {
                    controls['thread'].push('<a title="Lock / unlock" href="' + api_url + '/locked/toggle&b=' + tboard + '&t=' + id + '">L</a>');
                }
                if (permissions['post.antibump'] == 1) {
                    controls['thread'].push('<a title="Enable / disable Antibump™" href="' + api_url + '/antibump/toggle&b=' + tboard + '&t=' + id + '">A</a>');
                }
                if (permissions['thread.move'] == 1) {
                    controls['thread'].push('<a title="Move thread" href="' + api_url + '/move_thread&b=' + tboard + '&t=' + id + '">MV</a>');
                }
            }
            for (var i = 0; i < cname.length; i++) {
                if (controls[cname[i]].length) {
                    ac += '[' + controls[cname[i]].join(' / ') + ']' + ((i != cname.length - 1) ? ' ' : '');
                }
            }
            $(this).children(".postNum").after(' <span class="adminControls">' + ac + '</span>');
        });
        $.each(targetBoards, function(currentBoard, newPostNodes) {
            $.ajax({
                type: "POST",
                url: api_url + "/api/admin_stuff",
                data: {
                    'board': currentBoard,
                    'posts': $.map(newPostNodes, function(el) {
                        return $(el).data('adminStuff')['id']
                    }).join()
                },
                dataType: 'json',
                error: function(jqXHR, textStatus, errorThrown) {},
                success: function(data, textStatus, xhr) {
                    var json = $.parseJSON(xhr.responseText);
                    if (!json.error) {
                        $.each(newPostNodes, function() {
                            $el = $(this);
                            var id = $el.data('adminStuff')['id'];
                            if (!json[id]) {
                                $el.children(".adminControls").html('<span style="color: red;">THIS POST DOES NOT EXIST!</span>');
                                return true;
                            }
                            if (json[id].sage == 1) {
                                $el.children(".postNum").after(' <span style="color: red;">[A]</span> ');
                            }
                            if (permissions['post.viewip'] == 1) {
                                var op_mark = '';
                                $el.data('adminStuff')['ip'] = json[id].ip;
                                if ($($el.data('adminStuff')['thread_ref']).data('adminStuff')['ip'] == json[id].ip) {
                                    op_mark = ' <b style="color: red;">OP</b>';
                                }
                                $el.children(".nameBlock").after(' <span class="posterIp">(<a href="http://whatismyipaddress.com/ip/' + json[id].ip + '" target="_blank">' + json[id].ip + '</a>)</span> [<a title="Get country" class="get-country" href="#" data-ip="' + json[id].ip + '">C</a>] [<a title="Notes and info about ip" href="' + api_url + '/info&ip=' + json[id].ip + '">N</a>]' + op_mark);
                            }
                        });
                    }
                }
            });
        });
        $("a").each(function() {
            var href = $(this).attr("href");
            if (href != null) {
                if (href.indexOf("delete_post&") != -1) {
                    var message;
                    switch (((href.match(/&f=(\d+)/)) ? parseInt(RegExp.$1, 10) : 0)) {
                        case 1:
                            message = 'Are you sure you want to delete a file attached to this post?';
                            break;
                        case 2:
                            message = 'Are you sure you want to delete a password used for this post?';
                            break;
                        default:
                            message = 'Are you sure you want to delete this post?';
                    }
                    $(this).attr("href", href.replace("delete_post", "delete_post/yes"));
                    $(this).click(function(event) {
                        return confirm(message);
                    });
                }
            }
        });
        $(".edit").click(adminInlineEdit);
        $(".postInfo").on("click", ".get-country", function() {
            var ip = $(this).data("ip");
            var self = $(this);
            $.ajax({
                url: "https://no-fun.allowed.org/geoip/" + ip,
                dataType: "jsonp",
                success: function(json) {
                    var reg = json.city ? ' (' + json.city + ')' : '';
                    self.text(json.country + reg + ' ' + json.isp);
                }
            });
            return false;
        });
    }
    if ($("body").hasClass("modPanel")) {
        return false;
    }
    if (parent == "body") {
        make_body();
    }
    make_posts();
}
var highlightCodeTags = function(parent) {
    $(parent).find("pre code").each(function(i, block) {
        hljs.highlightBlock(block);
    });
};
var fillFields = function(parent) {
    if (typeof $.cookie("mitsuba_name") !== "undefined") {
        $(parent).find("input[name='name']").val($.cookie("mitsuba_name"));
    }
    if (typeof $.cookie("mitsuba_email") !== "undefined") {
        $(parent).find("input[name='email']").val($.cookie("mitsuba_email"));
    }
    if (typeof $.cookie("mitsuba_fakeid") !== "undefined") {
        $(parent).find("input[name='fake_id']").val($.cookie("mitsuba_fakeid"));
    }
    if (typeof $.cookie("password") !== "undefined") {
        $(parent).find("input[name='pwd']").val($.cookie("password"));
    }
    $(parent).find("input[name='OPcb']").prop('checked', !!localStorage.getItem('OPchbx'));
}
var adminInlineEdit = function(event) {
    event.preventDefault();
    var element = this;
    var dataString = $(this).attr("href").split("/edit_post")[1];
    $.ajax({
        type: 'get',
        url: api_url + "/api/get_post" + dataString,
        success: function(data, textStatus, xhr) {
            var json = $.parseJSON(xhr.responseText);
            var block = $(element).parents("div.post").children("blockquote");
            var el_old = element.outerHTML;
            var old_html = $(block).html();
            $(block).css("display", "block");
            var raw = "";
            if (json.raw == 1) {
                raw = "checked='checked'";
            }
            $(block).html("<form action='' method='POST'><textarea rows='5' cols='50' id='edit_" + json.id + "'>" + json.comment + "</textarea><br /><input type='checkbox' " + raw + " value='1' id='raw_" + json.id + "' />Raw HTML<input type='submit' value='Update!' id='s_" + json.id + "' /><input type='submit' value='Cancel' id='cancel_" + json.id + "' /></form>");
            $(element).replaceWith("<b>E</b>");
            $("#cancel_" + json.id).click(function() {
                event.preventDefault();
                $(block).html(old_html);
            });
            $("#s_" + json.id).click(function(event) {
                event.preventDefault();
                $(this).attr("disabled", "disabled");
                var raw_n = 0;
                if ($("#raw_" + json.id).is(':checked')) {
                    raw_n = 1;
                }
                $.ajax({
                    type: 'post',
                    url: api_url + "/api/update_post" + dataString,
                    data: {
                        comment: $("#edit_" + json.id).val(),
                        raw: raw_n
                    },
                    success: function(data, textStatus, xhr) {
                        window.location.reload();
                    }
                });
            });
        }
    });
}
var addImgPreview = function(parent) {
    $(parent).find(".fileThumb:not(.video)").click(function(e) {
        imgPreview($(this).parent());
        e.preventDefault();
    });
};
var addVideoPreview = function(parent) {
    $(parent).on("click", ".fileThumb.video, .file .close", function(e) {
        videoPreview($(this));
        e.preventDefault();
    });
}
var imgPreviewUtils = {};
var insertImgPreviewWindow = function() {
    var scrollSpeed = 80;
    $("body").append('<div style="display:none" id="imagePreviewBg"></div><div id="imagePreview" style="display:none"><img></img><video id="player" controls autoplay loop style="display: none"></video></div>');
    var width, height;
    var greaterDim = "Width";
    var isVideo = false;
    var $imgPreview;
    var $imgPreviewWindow = $("#imagePreview");
    var imgPreviewWindow = $imgPreviewWindow[0];
    var $imgPreviewBg = $("#imagePreviewBg");
    var $player = $("#player");
    var moveMode = false;
    var windowUpdater;
    var windowUpdaterInterval = 1000 / 60;
    var borderThickness;
    var wndPosition = {
        "x": 0,
        "y": 0,
    };
    imgPreviewUtils.reset = function(imgWidth, imgHeight, video = false) {
        $imgPreviewWindow.find(video ? "video" : "img").show();
        $imgPreview = $imgPreviewWindow.find(video ? "video" : "img").show();
        isVideo = video;
        $imgPreviewWindow.show();
        $imgPreviewBg.show();
        borderThickness = parseInt($imgPreviewWindow.css("border-top-width")) || 0;
        var dims = {
            "imgWidth": imgWidth,
            "imgHeight": imgHeight
        };
        greaterDim = dims.imgWidth >= dims.imgHeight ? "Width" : "Height";
        if (dims.imgWidth >= document.documentElement.clientWidth) {
            dims.imgWidth = document.documentElement.clientWidth - 2 * borderThickness;
            dims.imgHeight = dims.imgWidth * imgHeight / imgWidth;
        }
        if (dims.imgHeight > document.documentElement.clientHeight) {
            dims.imgHeight = document.documentElement.clientHeight - 2 * borderThickness;
            dims.imgWidth = dims.imgHeight * imgWidth / imgHeight;
        }
        wndPosition.y = wndPosition.x = 0;
        width = dims.imgWidth;
        height = dims.imgHeight;
        $imgPreview.css({
            "width": dims.imgWidth,
            "height": dims.imgHeight
        });
        switchMoveMode(false);
        moveWindow(document.documentElement.clientWidth / 2 - dims.imgWidth / 2 - borderThickness, document.documentElement.clientHeight / 2 - dims.imgHeight / 2 - borderThickness);
    };

    function moveWindow(x, y, abs = false, force = true) {
        if (abs) {
            wndPosition.x = x;
            wndPosition.y = y;
        } else {
            wndPosition.x += x;
            wndPosition.y += y;
        }
        if (force) {
            imgPreviewWindow.style["margin-left"] = wndPosition.x + "px";
            imgPreviewWindow.style["margin-top"] = wndPosition.y + "px";
        }
    }

    function closeWindow() {
        $imgPreviewWindow.hide();
        $imgPreviewBg.hide();
        $imgPreviewWindow.find("img,video").hide().attr("src", "");
    }

    function switchMoveMode(state) {
        moveMode = state;
        $player[0].controls = !state;
        $imgPreviewWindow.css("cursor", state ? "all-scroll" : "auto");
        return;
        if (state) {
            windowUpdater = setInterval(function() {
                imgPreviewWindow.style["transform"] = "translate(" + wndPosition.x + ", " + wndPosition.y + ")";
            }, windowUpdaterInterval);
        } else {
            clearInterval(windowUpdater);
        }
    }

    function mousedown(e) {
        updateElOffset(e.offsetX, e.offsetY);
        e.preventDefault();
        switchMoveMode(true);
    }

    function mouseup(e) {
        e.preventDefault();
        switchMoveMode(false);
    }
    var eloffsetX, eloffsetY;

    function updateElOffset(x, y, rel = false) {
        if (rel) {
            eloffsetX += x;
            eloffsetY += y;
        } else {
            eloffsetX = x;
            eloffsetY = y;
        }
    }
    $imgPreviewWindow.bind("wheel", function(e) {
        e.preventDefault();
        var dir = e.originalEvent.deltaY > 0 ? -1 : 1;
        var oldWidth = width;
        var oldHeight = height;
        var increse = dir * (oldWidth > innerWidth ? oldWidth / innerWidth : 1) * scrollSpeed * (e.shiftKey ? 4 : 1);
        var newWidth = oldWidth + increse;
        var newHeight = oldHeight + increse * (oldHeight / oldWidth);
        if (dir === -1 && eval("new" + greaterDim) < 200) return;
        $imgPreview.css({
            "width": newWidth,
            "height": newHeight
        });
        width = newWidth;
        height = newHeight;
        moveWindow(-((newWidth - oldWidth) * (e.originalEvent.offsetX / oldWidth)), -((newHeight - oldHeight) * (e.originalEvent.offsetY / oldHeight)));
        updateElOffset(((newWidth - oldWidth) * (e.originalEvent.offsetX / oldWidth)), ((newHeight - oldHeight) * (e.originalEvent.offsetY / oldHeight)), true);
    }).mousedown(mousedown).mouseup(mouseup).dblclick(function(e) {
        closeWindow();
    });
    $imgPreviewWindow.mousemove(function(e) {
        if (moveMode) {
            moveWindow(e.clientX - eloffsetX - borderThickness, e.clientY - eloffsetY - borderThickness, true);
        } else if (isVideo && (e.buttons == 1) && (e.target.clientHeight - e.offsetY) > 50) {
            mousedown(e);
        }
    });
    var imgPreviewWindowId = $imgPreviewWindow.attr("id");
    $imgPreviewWindow.mouseleave(function(e) {
        if (true || e.relatedTarget !== null && e.relatedTarget.tagName === "HTML") {
            switchMoveMode(false);
        }
    });
    $imgPreviewBg.click(function(e) {
        closeWindow();
    });
    $("body").keydown(function(e) {
        if (e.keyCode == 27) {
            closeWindow();
        }
    });
};
var imgPreview = function(element) {
    var $imgPreview = $("#imagePreview img");
    if (!$imgPreview.length) {
        console.log("no img preview window");
        return false;
    }
    $imgPreview.attr("src", $(element).find(".fileThumb").attr("href"));
    var wh = $(element).find(".fileText")[0].childNodes[1].nodeValue.split(",")[1].split("x");
    wh[0] = parseInt(wh[0]);
    wh[1] = parseInt(wh[1]);
    imgPreviewUtils.reset(wh[0], wh[1]);
};
var videoPreview = function(element) {
    var $imgPreview = $("#imagePreview video");
    if (!$imgPreview.length) {
        console.log("no img preview window");
        return false;
    }
    $imgPreview.attr("src", $(element).attr("href"));
    var wh = $(element).parent().find(".fileText")[0].childNodes[1].nodeValue.split(",")[1].split("x");
    wh[0] = parseInt(wh[0]);
    wh[1] = parseInt(wh[1]);
    imgPreviewUtils.reset(wh[0], wh[1], true);
}
var videoToggle = function(element) {
    if (element.hasClass('close')) {
        element.parent().parent().find('.full-view').remove();
        element.parent().parent().find('.fileThumb.video').show();
        element.remove();
    } else {
        var filePath = element.attr('href'),
            thumbPath = element.find('video').attr('src');
        element.hide().after('<td><video src="' + filePath + '" class="full-view" autoplay loop controls></video><a href="#" class="close"></a></td>');
    }
}
var imgThumbnail = function(element) {
    $(element).siblings(".fileThumb").css("display", "");
    $(element).remove();
}
var addExpandAllImg = function() {
    if ($(".file").length >= 2) {
        var powiekszone, nigger;
        $(".post.op").append('<a id="expandAllImages" href="#">[Expand all images]</a>');
        $("#expandAllImages").click(function() {
            if (powiekszone) {
                $(".file > img").each(function() {
                    imgThumbnail($(this));
                });
                powiekszone = 0;
                $("#expandAllImages").text("[Expand all images]");
            } else {
                nigger = 1;
                $(".file").each(function() {
                    if (nigger) {
                        nigger--;
                        return 1;
                    }
                    imgExpand($(this));
                });
                powiekszone = 1;
                $("#expandAllImages").text("[Collapse all images]");
            }
            return false;
        });
    }
}
var targetImageWidth = 0;
var targetDiagonal = 0;
var targetDragging = false;
var addZoom = function(img) {
    $(img).mousedown(function(e) {
        if (e.button == 0) {
            targetImageWidth = $(this).width();
            var rc = e.target.getBoundingClientRect();
            var p = Math.pow;
            var dragSize = p(p(e.clientX - rc.left, 2) + p(e.clientY - rc.top, 2), .5);
            targetDiagonal = Math.round(dragSize);
            targetDragging = false;
            e.preventDefault();
        }
    });
    $(img).mousemove(function(e) {
        if (targetDiagonal) {
            var rc = e.target.getBoundingClientRect();
            var p = Math.pow;
            var dragSize = p(p(e.clientX - rc.left, 2) + p(e.clientY - rc.top, 2), .5);
            var newDiagonal = Math.round(dragSize);
            var oldDiagonal = targetDiagonal;
            var imageWidth = targetImageWidth;
            var newWidth = Math.max(250, newDiagonal / oldDiagonal * imageWidth) + 'px';
            $(this).css("width", newWidth);
            $(this).css("maxWidth", newWidth);
            $(this).css("maxHeight", "");
            $(this).css("height", "auto");
            targetDragging = true;
        }
    });
    $(img).mouseout(function(e) {
        targetDiagonal = 0;
    });
    $(img).mouseup(function(e) {
        if (targetDiagonal) {
            var rc = e.target.getBoundingClientRect();
            var p = Math.pow;
            var dragSize = p(p(e.clientX - rc.left, 2) + p(e.clientY - rc.top, 2), .5);
            var newDiagonal = Math.round(dragSize);
            var oldDiagonal = targetDiagonal;
            var imageWidth = targetImageWidth;
            var newWidth = Math.max(250, newDiagonal / oldDiagonal * imageWidth) + 'px';
            $(this).css("width", newWidth);
            $(this).css("maxWidth", newWidth);
        }
    });
    $(img).click(function(e) {
        targetDiagonal = 0;
        if (targetDragging) {
            targetDragging = false;
            e.preventDefault();
            return false;
        }
    });
    $(img).dblclick(function(e) {
        imgThumbnail(this);
    });
}
var changeTitleToFirstPost = function() {
    var tt = postContentToShort($(".postContainer:first-of-type blockquote").first().text());
    document.title = "/" + board + "/ - " + (tt.length === 0 ? "[empty]" : tt);
};
var canUserSee = function(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function dialogBox(title, message, buttons, fa_icon, callback) {
    fa_icon = fa_icon || 'fa-comment';
    var $msgNode = $('<div class="skandal-bg"><div class="skandalBox"><h2>' + title + '</h2><i class="fa ' + fa_icon + '"></i><p style="font-weight: bold;">' + message + '</p></div></div>');
    var $btnWrap = $('<div class="btn-wrap"></div>').appendTo($msgNode.children().first());
    $.each(buttons, function(i, e) {
        $('<button type="button">' + e + '</button>').appendTo($btnWrap);
    });
    var $box = $msgNode.children().first().draggable({
        opacity: 0.5
    });
    $msgNode.on("click", function(e) {
        if (e.target === this || e.target.nodeName.toLowerCase() === 'button') {
            var r = true;
            if ($.isFunction(callback)) {
                if (e.target === this) {
                    r = callback.call($box, -1);
                } else {
                    r = callback.call($box, $(e.target).index(), $(e.target));
                }
            }
            return r !== false && $(this).fadeOut(250, function() {
                $(this).remove();
            });
        }
    }).hide().appendTo(document.body).fadeIn(250).find('button:last').focus();
}
var ajaxErrorHandler = function(jqXHR, textStatus, errorThrown) {
    if (textStatus == "parsererror" && jqXHR.statusText == "OK") {
        dialogBox('Error!', 'An unexpected response was received from the server.', ['OK'], 'fa-bug');
    } else {
        dialogBox('Fatal error!', 'Something went wrong', ['OK', 'Info'], 'fa-bug', function(i, el) {
            if (i == 1) {
                el.prop('disabled', true);
                this.append('<code><b>Error type:</b> ' + textStatus + '<br><b>HTTP status:</b> (' + jqXHR.status + ') ' + (errorThrown || 'server is down or not reachable') + '<br></code>');
                return false;
            }
        });
    }
};
var serverDialogBox = function(data, fa_icon, callback) {
    nav = data.navigation || {
        'OK': {}
    };
    dialogBox(data.title, data.msg, $.map(nav, function(v, k) {
        return k
    }).sort(function(a, b) {
        return nav[a].order - nav[b].order
    }), (fa_icon || undefined), (callback || function(i, el) {
        if (i != -1 && 'href' in nav[el.text()]) {
            window.location.assign(nav[el.text()].href);
        }
    }));
}

function parseURI(url) {
    var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
    return (m ? {
        href: m[0] || '',
        protocol: m[1] || '',
        authority: m[2] || '',
        host: m[3] || '',
        hostname: m[4] || '',
        port: m[5] || '',
        pathname: m[6] || '',
        search: m[7] || '',
        hash: m[8] || ''
    } : null);
}

function absolutizeURI(base, href) {
    function removeDotSegments(input) {
        var output = [];
        input.replace(/^(\.\.?(\/|$))+/, '').replace(/\/(\.(\/|$))+/g, '/').replace(/\/\.\.$/, '/../').replace(/\/?[^\/]*/g, function(p) {
            if (p === '/..') {
                output.pop();
            } else {
                output.push(p);
            }
        });
        return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
    }
    href = parseURI(href || '');
    base = parseURI(base || '');
    return !href || !base ? null : (href.protocol || base.protocol) +
        (href.protocol || href.authority ? href.authority : base.authority) +
        removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
        (href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
        href.hash;
}
boardSettings = new BoardSettings(BoardSettings.LINK | BoardSettings.NOTIFY | BoardSettings.OVER);
$(document).ready(function() {
    if (localStorage.o_antiflood_cooldown_indicator === "1" && config.boarddata !== undefined && config.boarddata.type !== "overboard" && $.cookie("in_mod") === undefined) {
        if (localStorage.lastThreadCreatedTime === undefined || localStorage.lastPostCreatedTime === undefined) {
            localStorage.lastThreadCreatedTime = 0;
            localStorage.lastPostCreatedTime = 0;
        }
        var button_fast = $("#fastReplyButtons .ladda-button");
        var button_normal = $("#postForm .ladda-button");
        var initial_label_fast = button_fast.find(".ladda-label").first().html();
        var initial_label_normal = button_normal.find(".ladda-label").first().html();
        var button_normal_disabled = false;
        var button_fast_disabled = false;

        function clearButtonCounter(kind, button) {
            button.find(".ladda-label").html(kind ? initial_label_fast : initial_label_normal);
        }

        function updateButtonCounter(kind, button, seconds) {
            button.find(".ladda-label").html((kind ? initial_label_fast : initial_label_normal) + " (" + Math.round(seconds) + "s)");
        }

        function updateAntifloodCooldownIndicator() {
            var time_to_unlock_post = config.boarddata.time_between_posts - (Date.now() - parseInt(localStorage.lastPostCreatedTime)) / 1000;
            var time_to_unlock_thread = config.boarddata.time_between_threads - (Date.now() - parseInt(localStorage.lastThreadCreatedTime)) / 1000;
            if (time_to_unlock_post <= 0) {
                if (button_fast_disabled) {
                    $(button_fast).prop("disabled", false);
                    button_fast_disabled = false;
                    clearButtonCounter(1, button_fast);
                }
            } else {
                if (!button_fast_disabled) {
                    $(button_fast).prop("disabled", true);
                    button_fast_disabled = true;
                }
                updateButtonCounter(1, button_fast, time_to_unlock_post);
            }
            if (inThread ? (time_to_unlock_post <= 0) : (time_to_unlock_thread <= 0 && time_to_unlock_post <= 0)) {
                if (button_normal_disabled) {
                    clearButtonCounter(0, button_normal);
                    $(button_normal).prop("disabled", false);
                    button_normal_disabled = false;
                }
            } else {
                if (!button_normal_disabled) {
                    $(button_normal).prop("disabled", true);
                    button_normal_disabled = true;
                }
                updateButtonCounter(0, button_normal, Math.max(time_to_unlock_post, time_to_unlock_thread));
            }
        }
        updateAntifloodCooldownIndicator();
        setInterval(updateAntifloodCooldownIndicator, 1000);
    }
    if (window.location.toString().contains('-50')) {
        $('.quotePost').prev().each(function() {
            this.href = this.href.replace('.html', '-50.html');
        });
        var node = document.createElement('input');
        node.name = 'md';
        node.value = '50';
        node.type = 'hidden';
        document.getElementById("fastReplyWindow").children[0].children[0].appendChild(node);
    }
    if (location.hash != "") {
        location.hash = location.hash;
    }
    Ladda.stopAll();
    $("#postform, .fastform").submit(function(e) {
        e.preventDefault();
        e.stopPropagation();
        var curr_path = window.location.pathname.split(/#/)[0];
        var that = this;
        var $form = $(this);
        var fdata = new FormData(this);
        var l = Ladda.create(this.querySelector('.ladda-button'));
        fdata.append('format', 'json');
        l.start();

        function send() {
            $.ajax({
                type: "POST",
                url: that.action,
                data: fdata,
                dataType: 'json',
                processData: false,
                contentType: false,
                xhr: function() {
                    var $xhr = $.ajaxSettings.xhr();
                    if ($xhr.upload) {
                        $xhr.upload.addEventListener('progress', function(e) {
                            l.setProgress(e.loaded / e.total);
                        }, false);
                    }
                    return $xhr;
                },
                error: ajaxErrorHandler,
                success: function(data, textStatus, xhr) {
                    if (!data.statusCode) {
                        $form[0].reset();
                        $(':file').trigger("change");
                        fillFields(that);
                        localStorage.lastPostCreatedTime = Date.now();
                        if (fdata.get("resto") === null) {
                            localStorage.lastThreadCreatedTime = Date.now();
                        }
                        if (data.returnHref) {
                            var returnHref = data.returnHref.split(/#/);
                            if ((returnHref.length == 2) && (curr_path == returnHref[0])) {
                                updateThread(false, parseInt(data.postid, 10)).done(function() {
                                    try {
                                        var $myPost = $('#' + returnHref[1]).addClass('highlightPost');
                                        $('html,body').animate({
                                            scrollTop: $myPost.offset().top
                                        }, 'slow');
                                        if ($('#captcha').length) {
                                            reloadCaptcha();
                                        }
                                        var bdata = boardSettings.boardData(data.board);
                                        bdata.notifyID = data.postid;
                                        bdata.applyChanges();
                                        boardSettings.save();
                                    } catch (err) {
                                        window.location.assign(data.returnHref);
                                    }
                                });
                            } else {
                                if (localStorage.getItem("o_watched") == 1) {
                                    watcher.markAsRead(data.resto, data.board, data.postid);
                                }
                                window.location.assign(data.returnHref);
                            }
                        }
                    } else {
                        switch (parseInt(data.statusCode, 10)) {
                            case 498:
                                serverDialogBox(data, 'fa-warning', function(i) {
                                    if (i == -1) return false
                                });
                                break;
                            case 499:
                                serverDialogBox(data, 'fa-ban');
                                break;
                            default:
                                serverDialogBox(data, 'fa-exclamation-circle');
                        }
                    }
                }
            }).always(function() {
                l.stop();
            });
        }
        if (typeof CAPTCHA_SITEKEY !== 'undefined') {
            grecaptcha.execute(CAPTCHA_SITEKEY, {
                action: 'add_post'
            }).then(function(token) {
                fdata.append('captcha', token);
                send();
            })
        } else {
            send();
        }
    });
    (function($input) {
        def_label = $input.prev().html();
        $input.change(function() {
            var $targetFileButton = $(this).prev();
            try {
                var file = this.files[0];
                var name = file.name;
                var size = file.size;
                $targetFileButton.html(((name.length > 16) ? '...' + name.slice(-16) : name) + ' <span style="font-size:7pt;display:initial;">(' + size.fileSize() + ')</span>');
                if (name.toLowerCase().endsWith(".jpg") || name.toLowerCase().endsWith(".jpeg") || name.toLowerCase().endsWith(".png")) {
                    $(".watermark").show();
                } else {
                    $(".watermark").hide();
                }
            } catch (err) {
                $targetFileButton.html(def_label);
                $(".watermark").hide();
            }
        }).trigger("change");
    })($(':file'));
    $("#delform input[type=submit]").click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        var form = $(this).closest("form")[0];
        var fdata = new FormData(form);
        fdata.append('format', 'json');
        fdata.append(e.target.name, e.target.value);
        $.ajax({
            type: "POST",
            url: form.action,
            data: fdata,
            dataType: 'json',
            processData: false,
            contentType: false,
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                dialogBox('Error!', 'Unexpected response format', ["OK"], 'fa-bug');
            },
            success: function(data, textStatus, xhr) {
                if (data.actionType == "delete") {
                    dialogBox(data.title, data.msg, ["OK"], "fa-trash");
                    var realDeleted = JSON.parse(data.realDeleted);
                    $.each(realDeleted, function(key, val) {
                        $(".post#p" + val.id).addClass("postdeleted");
                    });
                } else {
                    dialogBox(data.title, data.msg, ["OK"], "fa-flag");
                }
            }
        });
    });
    (localStorage.o_alt_mobile == 1) && $("a#open, #menu").addClass("alt");
    (localStorage.o_alt_hires == 1) && $("#delform").addClass("hires");
    (localStorage.o_pinned == 0) && $("div#menu-wrapper").removeClass("pinned");
    if (inThread)
        changeTitleToFirstPost();
    addSettings();
    addStylechanger();
    addNotifications();
    addBacklinks("body");
    addThreadExpander("body");
    addThreadHider("body");
    hideThreads();
    highlightCodeTags("body");
    postsHider.addHiddenPosts("body");
    if (!inCatalog && config.bbcodes) {
        bbCodesStuff(config.bbcodes);
        if (config.boarddata.type !== "overboard")
            handleCountersInTextAreas();
    }
    fillFields("body");
    if (localStorage.getItem("o_imiona") == 1) {
        uidHighlighter.bindPosterUIDEvents();
        $("body .thread").each(function(i, el) {
            uidHighlighter.highlightIdNames("#" + el.id);
        });
    }
    if (localStorage.getItem("o_preview") == 1) {
        $("body").append('<div id="quote-preview" class="post preview" style="display: none; position: absolute; z-index:999;"></div>');
        addPostpreview("body");
    }
    if (localStorage.getItem("o_imgexpand") == 1) {
        addImgExpand("body");
        addVideoExpand("body");
    }
    if (localStorage.getItem("o_imgpreview") == 1) {
        insertImgPreviewWindow();
        addImgPreview("body");
        addVideoPreview("body");
    }
    if (localStorage.getItem("o_relativetime") == 1) {
        addRelativeDateTime("body");
        setInterval(function() {
            addRelativeDateTime(undefined, true);
        }, 1000 * 10);
        $("body").on("click", ".relativeDateTime", function(e) {
            var a = e.target.title;
            var b = e.target.innerHTML;
            e.target.innerHTML = a;
            e.target.title = b;
            if (e.target.dataset.timeintitle !== "1") {
                e.target.dataset.timeintitle = "1";
            } else {
                e.target.dataset.timeintitle = "0";
            }
        });
    }
    if (localStorage.getItem("o_fastreply") == 1) {
        addFastReply();
    }
    if (localStorage.getItem("o_watched") == 1) {
        watcher = new ThreadsWatcher();
    } else {
        toggle_buttons = document.getElementsByClassName("ico watcher");
        for (var i = toggle_buttons.length; i--;) {
            button = toggle_buttons[i]
            button.parentNode.removeChild(button)
        }
    }
    if ($(".postingMode").length == 0) {
        if (localStorage.getItem("o_loader") == 1) {
            addLoader();
        }
    } else {
        inThread = true;
        addThreadUpdater();
        if (localStorage.getItem("o_imgexpand") == 1) {
            addExpandAllImg();
        }
        addQuotelinks();
        $(".updateCheck").change(function() {
            localStorage.setItem('updtchbx', ($(this).prop('checked')) ? '1' : '');
        });
    }
    $("form input[name='OPcb']").change(function() {
        localStorage.setItem('OPchbx', ($(this).prop('checked')) ? '1' : '');
    });
    if (typeof $.cookie("in_mod") !== "undefined") {
        addAdminStuff("body");
    }
    var hash = window.location.href.split(/#/);
    if (hash[1] && hash[1].match(/q[0-9]+$/)) {
        var textarea = $("#postForm textarea[name='com']")[0];
        var textVal = $(textarea).val();
        $(textarea).focus().val("").val(textVal + '>>' + hash[1].match(/q([0-9]+)$/)[1] + '\n');
    }
});

function bbCodesStuff(bbtags) {
    $(document).ready(function() {
        if (!inCatalog) {
            var tareaNormal = $("[name='mainPostForm'] textarea[name='com']")[0];
            var tareaFastReply = $("[name='fastReplyForm'] textarea[name='com']")[0];
            var modifierKey = "LAlt";
            var tags = [];
            var overriteTags = [
                ["s", "s".toUpperCase().charCodeAt(), "<span>Spoiler</span>"],
                ["c", "c".toUpperCase().charCodeAt(), "<code>Code</code>", false],
                ["code", "c".toUpperCase().charCodeAt(), "<code>Code</code>"],
                ["spoiler", "s", "<span>Spoiler</span>", false]
            ];
            var loadBoardTags = function() {
                bbtags.forEach(function(a) {
                    var found = false;
                    overriteTags.forEach(function(b) {
                        if (a[0] == b[0]) {
                            found = true;
                            if (b[3] == true || b[3] == undefined) {
                                tags.push([b[0], b[1], b[2]]);
                            }
                        }
                    });
                    if (!found) {
                        tags.push([a[0], a[0].charAt(0).toUpperCase().charCodeAt(), a[1].replace("{param}", a[0].toUpperCase())]);
                    }
                });
                tags.sort(function(a, b) {
                    return $(a[2]).text().length - $(b[2]).text().length;
                });
            };
            var buildButtonsHtmlString = function(forFastReply) {
                var f = "";
                tags.forEach(function(a) {
                    f += "<button tabindex='-1' title='" + modifierKey + " + " + String.fromCharCode(a[1]).toUpperCase() + "' type='button' class='BBButton BBButton_" + a[0] + "'>" + a[2] + "</button>";
                });
                return f;
            };
            var putBBTag = function(tarea, bbtag) {
                var a = tarea.selectionStart;
                var b = tarea.selectionEnd;
                tarea.value = tarea.value.slice(0, a) + "[" + bbtag + "]" + tarea.value.slice(a, b) + "[/" + bbtag + "]" + tarea.value.slice(b);
                if (a != b) {
                    tarea.selectionStart = a;
                    tarea.selectionEnd = b + (2 * bbtag.length + 5);
                } else {
                    tarea.selectionStart = a + (bbtag.length + 2);
                    tarea.selectionEnd = tarea.selectionStart;
                }
            };
            var addGlobalHotKeys = function() {
                $("body").keydown(function(e) {
                    var active = document.activeElement;
                    if (e.altKey && !e.ctrlKey) {
                        if (active == tareaNormal || active == tareaFastReply) {
                            tags.forEach(function(a) {
                                if (e.keyCode == a[1]) {
                                    e.preventDefault();
                                    putBBTag(active, a[0]);
                                }
                            });
                        }
                    } else if (e.ctrlKey) {
                        if (e.keyCode == 13) {
                            e.preventDefault();
                            switch (active) {
                                case tareaNormal:
                                    $("[name='mainPostForm'] button.ladda-button").click();
                                    break;
                                case tareaFastReply:
                                    $("[name='fastReplyForm'] button.ladda-button").click();
                                    break;
                            }
                        }
                    } else {}
                });
            };
            var addButtons = function() {
                $(".BBButtons_normal").append(buildButtonsHtmlString(false));
                $(".BBButtons_fastreply").append(buildButtonsHtmlString(true));
                tags.forEach(function(a) {
                    $(".BBButtons_normal .BBButton_" + a[0]).click(function() {
                        putBBTag(tareaNormal, a[0]);
                        tareaNormal.focus();
                        $(tareaNormal).trigger("tareaValueChanged");
                    });
                    $(".BBButtons_fastreply .BBButton_" + a[0]).click(function() {
                        putBBTag(tareaFastReply, a[0]);
                        tareaFastReply.focus();
                        $(tareaFastReply).trigger("tareaValueChanged");
                    });
                });
            };
            var showTable = function() {
                var tab = document.getElementsByClassName("BBLabel")[0];
                if (tab != undefined)
                    tab.parentElement.style.display = "table-row";
            };
            showTable()
            loadBoardTags();
            addGlobalHotKeys();
            addButtons();
        }
    });
}
var cleanLocalStorage = function() {
    if (config.boarddata.type === "overboard" || inCatalog) return;
    var toSave = [];
    $.ajax({
        url: config.root_dir + board + "/catalog.html",
        success: function(data) {
            var parsed = $.parseHTML(data);
            $(".thread", parsed).each(function(i, el) {
                toSave.push(el.id.split("-")[1]);
            })
            $.each(localStorage, function(i, el) {
                if (strStartsWith(i, "h_" + board)) {
                    if (toSave.indexOf(i.split("_")[2]) === -1) {
                        localStorage.removeItem(i);
                        console.log("hidden thread removed");
                    }
                }
            });
            var parsedHiddenPosts = JSON.parse(localStorage.hiddenPosts);
            parsedHiddenPosts.forEach(function(v) {
                var hiddenPost = v.split("_");
                if (hiddenPost[0] !== board) {
                    return;
                }
                if (toSave.indexOf(hiddenPost[2]) === -1) {
                    parsedHiddenPosts = parsedHiddenPosts.remove(v);
                    localStorage.hiddenPosts = JSON.stringify(parsedHiddenPosts);
                    console.log("hidden post removed");
                }
            });
            console.log("localStorage cleaned");
        },
        complete: function() {
            localStorage.lastClean = Date.now();
        }
    });
}
if (localStorage.lastClean === undefined) {
    cleanLocalStorage();
} else {
    var now = Date.now();
    var then = parseInt(localStorage.lastClean);
    if (now - then >= 1000 * 60 * 60 * 24) {
        cleanLocalStorage();
    }
}
$("#postForm").ready(function() {
    if ($("#postForm").length) {
        var ins = (location.href.indexOf('res') > -1);
        var ls = 'hideform_' + ((ins) ? 'in' : 'out');
        var toggleForm = function(e) {
            if (e) {
                localStorage.setItem(ls, (localStorage.getItem(ls) === '1') ? '0' : '1');
            }
            if (localStorage.getItem(ls) === '1') {
                $('#hideform').html('Ukryj formularz');
                $('#postForm').show();
            } else {
                $('#hideform').html(((!ins) ? 'Utwórz temat' : 'Odpowiedz w temacie'));
                $('#postForm').hide();
            }
            return toggleForm;
        };
        $('<div id="hideformWrapper">[ <a id="hideform"></a> ]</div>').insertBefore('#postform');
        $('#hideform').click(toggleForm(0));
        $(".quotePost").click(function() {
            if (localStorage.getItem(ls) === '0')
                toggleForm(1);
        });
    }
});

function handleCountersInTextAreas() {
    var maxchars = parseInt(config.boarddata.maxchars);
    var counterNormal = $("#charsCounterNormal");
    var counterFastReply = $("#charsCounterFastReply");
    var tareaNormal = $("[name='mainPostForm'] textarea[name='com']");
    var tareaFastReply = $("[name='fastReplyForm'] textarea[name='com']");
    var triggerBoth = function() {
        tareaNormal.trigger("tareaValueChanged");
        tareaFastReply.trigger("tareaValueChanged");
    }
    if (!isNaN(maxchars)) {
        function updateCounter(counter, tarea) {
            var ile = maxchars - (tarea.value.length + (tarea.value.match(/\n/g) || []).length);
            if (ile >= -9999)
                counter.html(ile);
            else
                counter.html("-6mln");
            if (ile < 0)
                counter[0].style.color = "red";
            else counter[0].style.color = "";
        }
        tareaNormal.on('input propertychange paste tareaValueChanged', function() {
            updateCounter(counterNormal, this);
        });
        tareaFastReply.on('input propertychange paste tareaValueChanged', function() {
            updateCounter(counterFastReply, this);
        });
        $(".quotePost").click(function() {
            triggerBoth();
        });
        triggerBoth();
    }
    return {
        triggerBoth: triggerBoth
    };
}
if (localStorage.o_two_column_view === "1" && !inThread && !inCatalog) {
    $(function() {
        $("body").append("<style id='two_columns_view'></style>");
        $("#two_columns_view").html('.thread.thread.thread.thread {margin:5px 5px;float:left;width:calc(50% - 14px);clear:none;}#delform>.board>hr {clear:both;}#delform>.board>hr:nth-of-type(odd) {display:none;}');
    });
}
$(document).on('click', '.unexisting-quotelink', (e) => {
    e.preventDefault();
    dialogBox('Uwaga', 'Post nie istnieje', ["OK"], 'fa-info');
});
