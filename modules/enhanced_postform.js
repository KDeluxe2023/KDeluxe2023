{
    console.log(`[KDeluxe] Enhanced PostForm Loaded...`);
    let performance_timer = performance.now()
    
    if ($('#postform').length) {
        let tarea = $('#postform textarea');

        // constrain file picker to permitted formats
        $("input[name='upfile']").attr("accept", ".jpg,.jpeg,.jfif,.pjpeg,.pjp,.gif,.mp3,.mp4,.png,.webm");

        // hide email field
        $("#postForm tbody tr:first").hide();

        // stores posts on pontificate
        let pontyfikat = $("ul.rules li:nth-child(4)").text();
        // remove useless info
        $("tr.rules").hide();
        // store amount of czaks
        let czaksy = document.getElementById('counter').innerText;
        // calculate actual online
        let online = Math.round(czaksy / 2.5) + 1;
        // display that all
        $("ul.rules").replaceWith(`<h3 style="text-align:center">Online: ${online} anonów (${czaksy} czaksów) / ${pontyfikat}</h3>`);

        // add zalgo BBbutton
        $("#postForm .BBButtons").append(`<button id="bbzalgo" tabindex="-1" type="button" class="BBButton BBButton_zalgo">Zalgo</button>`)

        $("#bbzalgo").click(function() {
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
        var wordfilters = [
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
            ['/r/pcmasterrace', '/r/pcmasterrace'],
            ['#shrek', 'ORK']
        ];

        // insert new row into postform table
        $('#postForm tbody tr').eq(3).after('<tr><td>Wordfilter</td><td><select id="wordfilter_helper"></td></tr>');

        // populate combobox
        $.each(wordfilters, function(index, text) {
            $('#wordfilter_helper').append($('<option></option>').val(index).html($(this)[1]))
        });

        $.fn.extend({insertAtCaret:function(t){return this.each((function(){if(document.selection)this.focus(),document.selection.createRange().text=t,this.focus();else if(this.selectionStart||"0"==this.selectionStart){var e=this.selectionStart,s=this.selectionEnd,i=this.scrollTop;this.value=this.value.substring(0,e)+t+this.value.substring(s,this.value.length),this.focus(),this.selectionStart=e+t.length,this.selectionEnd=e+t.length,this.scrollTop=i}else this.value+=t,this.focus()})),this}});
        $('#wordfilter_helper').on('change', function() {
            let selected = this.value;
            tarea.insertAtCaret(wordfilters[selected][0]);
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
    }
  
    console.log(`[KDeluxe] [⏱️] Enhanced PostForm loaded in ${performance.now() - performance_timer}ms`);
}
