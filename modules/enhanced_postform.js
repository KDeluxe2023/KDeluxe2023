{
    console.log(`[KDeluxe] Enhanced PostForm Loaded...`);
    let performance_timer = performance.now()

    if (document.getElementById('postForm')) {
        let tarea = document.querySelector('#postForm textarea');

        // constrain file picker to permitted formats
        document.querySelector("input[name='upfile']").setAttribute("accept", ".jpg,.jpeg,.jfif,.pjpeg,.pjp,.gif,.mp3,.mp4,.png,.webm");

        // hide email field
        document.querySelector("#postForm tbody tr:nth-child(1)").style.display = "none";

        // store posts per pontificate
        let pontyfikat = document.querySelector("ul.rules li:nth-child(4)").textContent;
        // remove text with useless info
        document.querySelector("#postform tr.rules").style.display = 'none';
        // store amount of czaks
        let czaksy = document.getElementById('counter').innerText;
        // calculate actual online
        let online = Math.round(czaksy / 2.5) + 1;
        // display that all
        const counterElement = document.getElementById('counter');
        const parentElement = counterElement.parentNode.parentNode;

        const fragment = document.createDocumentFragment();
        const h3 = document.createElement('h3');
        h3.style.textAlign = 'center';
        h3.textContent = `Online: ${online} anonów (${czaksy} czaksów) / ${pontyfikat}`;
        fragment.appendChild(h3);
        parentElement.replaceChildren(fragment);

        // add zalgo BBbutton
        if (localStorage.o_kdeluxe_enhanced_postform_zalgo == 1) {

            // Get the element with the class "BBButtons"
            const buttons = document.querySelector("#postForm .BBButtons");

            // Create the button element
            const button = document.createElement("button");

            // Set the button's attributes
            button.id = "bbzalgo";
            button.tabIndex = "-1";
            button.type = "button";
            button.className = "BBButton BBButton_zalgo";
            button.textContent = "Zalgo";

            // Append the button to the element with the class "BBButtons"
            buttons.appendChild(button);

            // attach event to zalgo button
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

                let selection_start = tarea.selectionStart;
                let selection_end = tarea.selectionEnd;
                let tarea_text = tarea.value;
                let selected_text = tarea_text.slice(selection_start, selection_end);

                console.log(`[KDeluxe] start: ${selection_start}, end: ${selection_end}, selected: ${selected_text}`);
                let zalgon = Z.generate(selected_text);
                let new_text = tarea_text.replaceBetween(selection_start, selection_end, zalgon);

                tarea.value = new_text;

                tarea.focus();
                tarea.dispatchEvent(new Event("tareaValueChanged"));
            });
        }

        // saga checkbox
        const sageCheck = `<label><input id="sagecheck" type="checkbox" name="sage" value="0">Sagunia</label>`;
        $("#nofile").parent().parent().append(sageCheck);

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
        document.querySelector('#postForm tbody tr:nth-child(4)').after(tr);


        // populate combobox
        Object.keys(wordfilters).forEach(function(index) {
            let text = wordfilters[index][1];
            let option = document.createElement('option');
            option.value = index;
            option.innerHTML = text;
            document.getElementById('wordfilter_helper').appendChild(option);
        });

        function InsertAtCaret(newText, el = document.activeElement) {
            const [start, end] = [el.selectionStart, el.selectionEnd];
            el.setRangeText(newText, start, end, 'select');
        }

        document.getElementById('wordfilter_helper').addEventListener('change', function() {
            let selected = this.value;
            let selected_filter_text = wordfilters[selected][0];
            console.log(`[KDeluxe] Inserted wordfilter: ${selected_filter_text}`);
            InsertAtCaret(selected_filter_text, tarea);
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

        // unbind keycapture events
        if (localStorage.o_kdeluxe_enhanced_postform_unbind == 1)
            $("body").unbind('keydown');
        
        // add popout button to postform
        if (localStorage.o_kdeluxe_enhanced_postform_popout == 1) {
            // get the post form, button and choina elements
            var postForm = document.getElementById('postform');
            var choina = document.getElementById('choina');

            // add toggle button

            // get the tbody element of the post form
            const tbody = postForm.querySelector('tbody');

            // create the toggle button
            const dettach_button = document.createElement('button');
            dettach_button.id = 'detach_form';
            dettach_button.className = 'ladda-button';
            dettach_button.dataset.style = 'expand-right';
            dettach_button.dataset.size = 'xs';
            dettach_button.dataset.color = 'mint';
            dettach_button.innerHTML = '<span class="laddaLabelConteiner"><span class="ladda-label">Odczep</span></span>';

            // create the row for the toggle button
            const row = document.createElement('tr');
            const labelCell = document.createElement('td');
            labelCell.textContent = 'Popout';
            const buttonCell = document.createElement('td');
            buttonCell.className = 'ladda-td';
            buttonCell.appendChild(dettach_button);
            row.appendChild(labelCell);
            row.appendChild(buttonCell);

            // add the row to the tbody element
            tbody.appendChild(row);

            // make sure content fits the form and always stays on top
            postForm.style.zIndex = '999';
            postForm.style.height = '300px';

            // add an event listener to the button which will handle toggling
            dettach_button.addEventListener("click", function(e) {
                e.preventDefault();
                if (postForm.style.position == 'absolute') {
                    dettach_button.innerText = "Odczep";
                    // reattach the postform to its original position, show choina and remove blur from background
                    postForm.style.position = '';
                    postForm.style.position = 'static';
                    choina.style.display = '';
                    postForm.style.backdropFilter = "blur(0px)";
                } else {
                    // detach the postform, hide choina and add blur to form
                    dettach_button.innerText = "Przyczep";
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
        }
    }

    console.log(`[KDeluxe] [⏱️] Enhanced PostForm loaded in ${performance.now() - performance_timer}ms`);
}
