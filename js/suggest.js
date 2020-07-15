let pos = 0;
let count = 0;

function noenter(key) {
    if ($("#suggcontainer").is(":visible")) {
        if (key === 13 && pos !== 0) {
            choiceclick($(`#${pos}`));
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

document.onclick = function () {
    closechoices();
}

function suggest(key, query) {
    if (key === 38) {
        goPrev();
    } else if (key === 40) {
        goNext();
    } else if (key !== 13) {
        if (query.length >= 2) {
            query = query.toLowerCase();
            if (query === 'th' || query === 'the' || query === 'the ') {
                update('');
            } else {
                $.get('suggest.php', {"q": query}, update);
            }
        } else {
            update('');
        }
    }
}

function update(result) {
    let arr_keywords = [];
    let arr_searched = [];
    let arr = result.split('\r\n');

    count = arr.length;
    let count_keywords = 0;
    let count_searched = 0;
    for (let i = 0; i < count; i++) {
        if (i % 2 === 0) {
            arr_keywords[count_keywords] = arr[i];
            count_keywords++;
        } else {
            arr_searched[count_searched] = arr[i];
            count_searched++;
        }
    }

    if (arr_keywords.length > 10) {
        count = 10;
    } else {
        count = arr_keywords.length;
    }

    const suggdiv = $("#suggestions");
    const suggcont = $("#suggcontainer");

    if (arr_keywords[0].length > 0) {
        suggcont.show();
        suggdiv.html("");
        suggdiv.height(count * 20);

        for (let i = 1; i <= count; i++) {
            let novo = $("<div></div>");

            novo.attr("id", i);
            novo.height(14).css('padding', '3px');
            novo.mouseover(function () {
                select($(this), true);
            }).mouseout(function () {
                unselect($(this), true);
            }).click(function () {
                choiceclick($(this));
            });
            novo.val(arr_keywords[i - 1]);

            let stime;
            if (arr_searched[i - 1] === 1)
                stime = arr_searched[i - 1] + " Time";
            else
                stime = arr_searched[i - 1] + " Times";
            novo.html(`<table style='width: 100%; border: 0; background-color: transparent'><tr><td style='border:0; text-align: left'><strong>${arr_keywords[i - 1]}</strong></td><td style='border: 0; text-align: right'>${stime}</td></tr></table>`);

            suggdiv.append(novo);
        }
    } else {
        suggcont.hide();
        count = 0;
    }
}

function select(obj, mouse) {
    obj.css('background-color', '#3366cc').css('color', '#000000');
    if (mouse) {
        pos = obj.id;
        unselectAllOther(pos);
    }
}

function unselect(obj, mouse) {
    obj.css('background-color', '#ffffff').css('color', '#000000');
    if (mouse) {
        pos = 0;
    }
}

function goNext() {
    if (pos <= count && count > 0) {
        if ($(`#${pos}`)) {
            unselect($(`#${pos}`));
        }
        pos++;
        if ($(`#${pos}`)) {
            select($(`#${pos}`));
        } else {
            pos = 0;
        }
    }
}

function goPrev() {
    if (count > 0) {
        if (document.getElementById(pos)) {
            unselect(document.getElementById(pos));
            pos--;
            if (document.getElementById(pos)) {
                select(document.getElementById(pos));
            } else {
                pos = 0;
            }
        } else {
            pos = count;
            select(document.getElementById(count));
        }
    }
}

function choiceclick(obj) {
    const searchinput = $("#searchinput");
    searchinput.val(obj.val());
    count = 0;
    pos = 0;
    $("#suggcontainer").hide();
    searchinput.focus();
}

function closechoices() {
    const suggcont = $("#suggcontainer");
    if (suggcont.is(":visible")) {
        count = 0;
        pos = 0;
        suggcont.hide();
    }
}

function unselectAllOther(id) {
    for (let i = 1; i <= count; i++) {
        let selector = $(`#${i}`);
        if (i !== id) {
            selector.css('background-color', '#ffffff').css('color', '#000000');
        }
    }
}
