function check_avatar(image, langfolder) {
    var tempimage = new Image();
    tempimage.src = image.src;
    var displayheight = image.height;
    var tempwidth = tempimage.width;
    var tempheight = tempimage.height;
    if (tempwidth > 250 || tempheight > 250 || displayheight > 250) {
        image.src = 'pic/forum_pic/' + langfolder + '/avatartoobig.png';
    }
}

function Scale(image, max_width, max_height) { // From http://pt.antsoul.com
    var tempimage = new Image();
    image.className = '';
    tempimage.className = '';
    image.style.zoom = '100%';
    $(image).css({
        maxWidth: max_width + 'px'
    });
    if (max_height !== 0)
        $(image).css({
            maxHeight: max_height + 'px'
        });
}

function Preview(image) { // From http://pt.antsoul.com
    let src;
    if (typeof (image) === 'string') {
        src = image;
    } else {
        src = image.src;
    }

    const boxSelector = $('#lightbox');
    boxSelector.css({
        "zoom": "100%"
    });
    boxSelector.html(`<img id='wrapDiv' src='${src}' alt="preview image">`);
    boxSelector.on("wheel", bbimg)
    $('#curtain').fadeIn();
    boxSelector.fadeIn();
    dragimg();
}

function findPosition(oElement) {
    if (typeof (oElement.offsetParent) != 'undefined') {
        for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
            posX += oElement.offsetLeft;
            posY += oElement.offsetTop;
        }
        return [posX, posY];
    } else {
        return [oElement.x, oElement.y];
    }
}

function Return() {
    // $('lightbox').style.display = "none";
    // $('curtain').style.display = "none";
    // $('lightbox').innerHTML = "";
    $('#curtain').fadeOut();
    $('#lightbox').fadeOut();
    // $('#lightbox').html("");
}

function bbimg() { // From http://pt.antsoul.com
    var zoom = parseInt(this.style.zoom, 10) || 100;

    if (zoom <= 10)
        zoom = 100;
    zoom += event.wheelDelta / 12;
    if (zoom > 10 && zoom < 500)
        this.style.zoom = zoom + '%';
    return false;
}

function dragimg() { // From http://pt.antsoul.com
    $('#lightbox img')
        .wrap(
            "<div id='wrapDiv' style='position:relative;top:0px;left:0px;visibility: visible;'></div>");
    $('#wrapDiv img').css({
        "cursor": "move"
    });
    $("#wrapDiv").unbind();
    var _move = false;
    var _x, _y;
    $("#lightbox img")
        .bind(
            "mousedown",
            function (e) {
                _move = true;
                if (!document.all) {
                    _x = e.pageX - parseInt($("#wrapDiv").css("left"));
                    _y = e.pageY - parseInt($("#wrapDiv").css("top"));
                } else {
                    var pagex = e.clientX
                        + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft
                            : document.body.scrollLeft);
                    var pagey = e.clientY
                        + (document.documentElement.scrollTop ? document.documentElement.scrollTop
                            : document.body.scrollTop);
                    _x = pagex - parseInt($("#wrapDiv").css("left"));
                    _y = pagey - parseInt($("#wrapDiv").css("top"));
                }
            });
    $("#lightbox").bind("mouseup", function (e) {
        _move = false;

    });

    $("#wrapDiv img").bind("click", function (e) {
        return false;
    });

    $("#lightbox")
        .bind(
            "mousemove",
            function (e) {
                if (_move) {
                    if (!document.all) {
                        var pagex = e.pageX;
                        var pagey = e.pageY;
                    } else {
                        var pagex = e.clientX
                            + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft
                                : document.body.scrollLeft);
                        var pagey = e.clientY
                            + (document.documentElement.scrollTop ? document.documentElement.scrollTop
                                : document.body.scrollTop);
                    }
                    var x = pagex - _x;
                    var y = pagey - _y;
                    $("#wrapDiv").css("top", y);
                    $("#wrapDiv").css("left", x);
                }
            });
}
