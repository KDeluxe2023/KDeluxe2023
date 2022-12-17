{
    console.log(`[KDeluxe] Enhanced PostForm Loaded...`);
    let performance_timer = performance.now()

    if (document.getElementById('postform')) {
        let tarea = document.querySelector('#postForm textarea');

        // constrain file picker to permitted formats
        document.querySelector("input[name='upfile']").setAttribute("accept", ".jpg,.jpeg,.jfif,.pjpeg,.pjp,.gif,.mp3,.mp4,.png,.webm");

        // hide email field
        document.querySelector("#postForm tbody tr:nth-child(1)").style.display = "none";

        // stores posts on pontificate
        let pontyfikat = document.querySelector("ul.rules li:nth-child(4)").textContent;
        // remove useless info
        document.querySelector("#postform tr.rules").style.display = 'none';
        // store amount of czaks
        let czaksy = document.getElementById('counter').innerText;
        // calculate actual online
        let online = Math.round(czaksy / 2.5) + 1;
        // display that all
        const counterElement = document.getElementById('counter');
        const parentElement = counterElement.parentNode.parentNode;
        parentElement.innerHTML = `<h3 style="text-align:center">Online: ${online} anonów (${czaksy} czaksów) / ${pontyfikat}</h3>`;

        // add zalgo BBbutton
        document.querySelector("#postForm .BBButtons").innerHTML += `<button id="bbzalgo" tabindex="-1" type="button" class="BBButton BBButton_zalgo">Zalgo</button>`;

        $("#bbzalgo").click(function() {
            dialogBox("UWAGA", "Ta opcja nie była testowana i prawdopodobnie będzie skutkować auto-banem", ["Rozumiem"]);
            var Z = {
                chars: {
                    0: ["̍", "̎", "̄", "̅", "̿", "̑", "̆", "̐", "͒", "͗", "͑", "̇", "̈", "̊", "͂", "̓", "̈́", "͊", "͋", "͌", "̃", "̂", "̌", "͐", "̀", "́", "̋", "̏", "̒", "̓", "̔", "̽", "̉", "ͣ", "ͤ", "ͥ", "ͦ", "ͧ", "ͨ", "ͩ", "ͪ", "ͫ", "ͬ", "ͭ", "ͮ", "ͯ", "̾", "͛", "͆", "̚"],
                    1: ["̖", "̗", "̘", "̙", "̜", "̝", "̞", "̟", "̠", "̤", "̥", "̦", "̩", "̪", "̫", "̬", "̭", "̮", "̯", "̰", "̱", "̲", "̳", "̹", "̺", "̻", "̼", "ͅ", "͇", "͈", "͉", "͍", "͎", "͓", "͔", "͕", "͖", "͙", "͚", "̣"],
                    2: ["̕", "̛", "̀", "́", "͘", "̡", "̢", "̧", "̨", "̴", "̵", "̶", "͏", "͜", "͝", "͞", "͟", "͠", "͢", "̸", "̷", "͡", "҉"]
                },
                random: function(r) {
                    return 1 == r ? 0 : r ? Math.floor(Math.random() * r + 1) - 1 : Math.random()
                },
                generate: function(r) {
                    return r.split("").map((function(r) {
                        if (" " == r) return r;
                        for (var n = 0, a = Z.random(16); n < a; n++) {
                            var o = Z.random(3);
                            r += Z.chars[o][Z.random(Z.chars[o].length)]
                        }
                        return r
                    })).join("")
                }
            };
            String.prototype.replaceBetween = function(t, e, n) {
                return this.substring(0, t) + n + this.substring(e)
            };

            let selection_start = tarea[0].selectionStart;
            let selection_end = tarea[0].selectionEnd;
            let tarea_text = tarea.val();
            let selected_text = tarea_text.slice(selection_start, selection_end);

            console.log(`[KDeluxe] start: ${selection_start}, end: ${selection_end}, selected: ${selected_text}`);
            let zalgon = Z.generate(selected_text);
            let new_text = tarea_text.replaceBetween(selection_start, selection_end, zalgon);

            tarea.val(new_text);

            tarea.focus();
            $(tarea).trigger("tareaValueChanged");
        });

        // saga checkbox
        $("#nofile").parent().parent().append(`<label><input id="sagecheck" type="checkbox" name="sage" value="0">Sagunia</label>`);

        $("#sagecheck").change(function() {
            if (this.checked) {
                $(`#postForm input[name="email"]`).val("sage");
            } else {
                $(`#postForm input[name="email"]`).val("");
            }
        });

        // wordfilter helper
        const wordfilters = [
            ['#cwel', "KOMPROMITACJA CWELA"],
            ['#gimbo', 'xD'],
            ['#essa', 'ESSA!'],
            ['#tematdlauwagi', 'UWAGA!'],
            ['#papies', 'papież (emoji)'],
            ['#esesman', "bartoszewski (emoji)"],
            [`<rzygi>`, "rzyganie (emoji)"],
            [`<sex>`, "sex (emoji)"],
            [`<killer>`, "killer (emoji)"],
            ['[cool]', "cool (emoji)"],
            ['[czesc]', "cześć (emoji)"],
            ['#reeves', "CYBERPUNK 2077"],
            ['#wiesiek', "The Witcher 3: Wild Hunt"],
            ['#nowocioty', "STAROCIOTY PAMIĘTAJĄ"],
            ['#penis', 'pisiorek'],
            ['#wagina', 'cipuszka'],
            ['#m__b', 'niegroźny WYKOPEK wykryty'],
            ['#homoś', 'pedał'],
            ['#korwinkrulempolski', 'kongres nowej prawicy'],
            ['#korwin', 'KORWiN'],
            ['#1%', 'groźny LEWAK wykryty'],
            ['#mylittlefaggot', 'PRZYJAŹŃ JEST MAGIĄ'],
            ['#alezapierdala', 'ALE ZAPIERDALA'],
            ['#potrzebnainterwencja ', 'INTERWENCJA'],
            ['#sprawadlareportera ', 'Sprawa dla reportera'],
            ['#Lasoupeauxchoux ', 'kapuśniaczek'],
            ['/r/pcmasterrace', '/r/pcmasterrace'],
            ['#shrek', 'ORK']
        ].sort(function(a, b) {
            return a[1] > b[1] ? 1 : -1;
        });

        // insert new row into postform table
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>Wordfilter</td><td><select id="wordfilter_helper"></td>';
        document.querySelector('#postForm tbody tr').after(tr);

        // populate combobox
        Object.keys(wordfilters).forEach(function(index) {
            let text = wordfilters[index][1];
            let option = document.createElement('option');
            option.value = index;
            option.innerHTML = text;
            document.getElementById('wordfilter_helper').appendChild(option);
        });

        document.getElementById('wordfilter_helper').addEventListener('change', function() {
            let selected = this.value;
            let selected_filter_text = wordfilters[selected][0];
            console.log(`[KDeluxe] Inserted wordfilter: ${selected_filter_text}`);
            insertAtCaret(tarea, selected_filter_text);
        });

        // add margin to bbcode buttons
        $(".BBButton").css({
            "margin-right": "4px"
        });
        // add margin to elements
        $("#postForm td").css({
            "padding-bottom": "2px"
        });
        // enlarge send button
        $("#postForm .ladda-button").css({
            "transform": "scale(1.2)"
        });

        // add popout button to postform
        // get the post form, button and choina elements
        var postForm = document.getElementById('postform');
        var choina = document.getElementById('choina');

        // add toggle button
        let tbody = document.getElementById('postform').querySelector('tbody');
        tbody.innerHTML += '<tr><td>Popout</td><td class="ladda-td"><button id="detach_form" class="ladda-button" data-style="expand-right" data-size="xs" data-color="mint"><span class="laddaLabelConteiner"><span class="ladda-label">Odczep</span></span></button></td><tr/>';

        let button = document.querySelector("#detach_form");

        // make sure content fits the form and always stays on top
        postForm.style.zIndex = '999';
        postForm.style.height = '300px';

        // add an event listener to the button which will handle toggling
        button.addEventListener("click", function(e) {
            e.preventDefault();
            if (postForm.style.position == 'absolute') {
                button.innerText = "Odczep";
                // reattach the postform to its original position, show choina and remove blur from background
                postForm.style.position = '';
                postForm.style.position = 'static';
                choina.style.display = '';
                postForm.style.backdropFilter = "blur(0px)";
            } else {
                // detach the postform, hide choina and add blur to form
                button.innerText = "Przyczep";
                postForm.style.position = 'absolute';
                postForm.style.right = '1px';
                postForm.style.bottom = '5%';
                postForm.style.backdropFilter = "blur(5px)";
                choina.style.display = 'none';
            }
        });

        // add an event listener to the window to make the form move with the scroll
        window.addEventListener('scroll', function() {
            if (postForm.style.position == 'absolute')
                postForm.style.top = window.scrollY - 300 - 30 + (window.innerHeight * 0.95) + 'px';
        });

        // focus on post message textarea
        tarea.focus();
    }

    console.log(`[KDeluxe] [⏱️] Enhanced PostForm loaded in ${performance.now() - performance_timer}ms`);
}
