
{
   let board_ele = document.querySelector("#tab-boardlink");
   board_ele.querySelector(`[data-short='4']`).remove();

    // determine if its night
    let date = new Date;
    let hour = date.getHours();

    if (!(hour >= 1 && hour <= 5)) {
        // hide /noc/ cause its not available
        board_ele.querySelector("[data-short='noc']").remove();
    }

    var div1 = document.getElementById('tab-boardlink');
    var div2 = div1.getElementsByClassName('group-options')[0];
    var newDiv = document.createElement('div');
    newDiv.classList.add('group');
    div1.insertBefore(newDiv, div2);

    function insert_new_boardlink(label, link) {
        var aTag = document.createElement('a');
        aTag.setAttribute('href', link);
        aTag.innerHTML = label;
        newDiv.appendChild(aTag);
    }

    insert_new_boardlink("test", "/test/");
    insert_new_boardlink("элита", "/элита/");
    insert_new_boardlink("wykop", "/wykop/");
}
