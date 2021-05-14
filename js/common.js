/**
 * offers.php, details.php, forums.php, viewrequests.php
 * 提交按钮置disable
 * @returns {boolean}
 */
function postvalid() {
    $('#qr').prop('disabled', true);
    return true;
}

/**
 * forummanage.php等一系列管理页面
 * NP实现的一种下拉菜单
 * @param obj
 */
function dropmenu(obj) {
    $('#' + obj.id + 'list').slideToggle();
}

/**
 * forummanage.php等一系列管理页面
 * 确认删除
 */
function confirm_delete(id, note, addon) {
    if (confirm(note)) {
        self.location.href = '?action=del' + (addon ? '&' + addon : '') + '&id=' + id;
    }
}

/**
 * details.php
 * 显示文件列表
 * @param {string} torrentid
 */
function viewfilelist(torrentid) {
    const fileListSelector = $("#filelist");
    if (fileListSelector.html() === "") {
        $.get('viewfilelist.php', {"id": torrentid}, data => {
            fileListSelector.html(data);
        });
    }
    $("#showfl").hide();
    $("#hidefl").show();
    fileListSelector.show();
}

/**
 * details.php
 * 隐藏文件列表
 */
function hidefilelist() {
    $("#hidefl").hide();
    $("#showfl").show();
    $("#filelist").hide();
}

/**
 * details.php
 * 显示peers列表
 * @param torrentid
 */
function viewpeerlist(torrentid) {
    $.get('viewpeerlist.php', {"id": torrentid}, data => {
        $("#showpeer").hide();
        $("#hidepeer").show();
        $("#peercount").hide();
        $("#peerlist").html(data);
    });
}

/**
 * details.php
 * 隐藏peers列表
 */
function hidepeerlist() {
    $("#showpeer").show();
    $("#hidepeer").hide();
    $("#peercount").show();
    $("#peerlist").html("");
}

/**
 * 各个bbcode编辑器右侧的表情
 * 插入表请
 */
function SmileIT(smile, form, text) {
    let textarea = document.forms[form].elements[text];
    let textareaLength = textarea.value.length;
    let selectStart = textarea.selectionStart;
    textarea.focus();
    textarea.value = textarea.value.substr(0, textarea.selectionStart) + smile + textarea.value.substring(textarea.selectionStart, textareaLength);
    textarea.setSelectionRange(selectStart + smile.length, selectStart + smile.length);
}

/**
 * details.php
 * 说谢谢
 */
function saythanks(torrentid) {
    $.post('thanks.php', {"id": torrentid}, () => {
        $("#thanksbutton").html($("#thanksadded").html());
        $("#nothanks").html("");
        $("#addcuruser").html($("#curuser").html());
    });
}

/**
 * end_compose()
 * 论坛、短消息、公告等页面，「提交」按钮旁边的预览
 * 不是bbcode编辑器的预览
 */
function preview(obj) {
    $.post("preview.php", {"body": $("#body").val()}, (result) => {
        $("#previewouter").html(result);
        $("#previewouter").show();
        $("#editorouter").hide();
        $("#unpreviewbutton").show();
        $("#previewbutton").hide();
    })
}

/**
 * end_compose()
 * 点击preview后出现的返回按钮
 */
function unpreview(obj) {
    $("#previewouter").hide();
    $("#editorouter").show();
    $("#unpreviewbutton").hide();
    $("#previewbutton").show();
}

/**
 * 展开/收起公告/搜索箱/种子详情/NFO
 * @param id
 */
function klappe_news(id) {
    const klappText = $('#k' + id);
    const klappBild = $('#pic' + id);

    if (klappText.is(":hidden")) {
        klappText.show();
        klappBild.attr('class', 'minus');
    } else {
        klappText.hide();
        klappBild.attr('class', 'plus');
    }

    if (id === 'needseeding' || id === 'searchboxmain') {
        let hideframe = document.getElementById('hiddenframe');
        if (hideframe.src === 'hide.php?' + id + '=1') {
            hideframe.location.reload();
        } else {
            hideframe.src = 'hide.php?' + id + '=1';
        }
    }
}

/**
 * IMDb信息的展开/收起
 * @param id
 */
function klappe_ext(id) {
    const klappText = $('#k' + id);
    const klappBild = $('#pic' + id);
    const klappPoster = $('#poster' + id);
    if (klappText.is(":hidden")) {
        klappText.show();
        klappPoster.show();
        klappBild.attr('class', 'minus');
    } else {
        klappText.hide();
        klappPoster.hide();
        klappBild.attr('class', 'plus');
    }
}

/**
 * special区的历史遗留产物
 * 不知道以后会不会用，先留着8
 */
function disableother(select, target) {
    if (document.getElementById(select).value === 0)
        document.getElementById(target).disabled = false;
    else {
        document.getElementById(target).disabled = true;
        document.getElementById(select).disabled = false;
    }
}

/**
 * special区的历史遗留产物
 * 不知道以后会不会用，先留着8
 */
function disableother2(oricat, newcat) {
    if (document.getElementById("movecheck").checked === true) {
        document.getElementById(oricat).disabled = true;
        document.getElementById(newcat).disabled = false;
    } else {
        document.getElementById(oricat).disabled = false;
        document.getElementById(newcat).disabled = true;
    }
}

/**
 * 是否已使用快捷键提交表单
 * @type {boolean}
 */
let submitted = false;

/**
 * Ctrl+Enter提交表单，用于快速回复
 */
function ctrlenter(event, formname, submitname) {
    if (submitted === false) {
        let keynum = event.keyCode ? event.keyCode : (event.which ? event.which : 0);

        if (event.ctrlKey && keynum === 13) {
            submitted = true;
            $(`#${formname}`).submit();
        }
    }
}

/**
 * 跳转第x页
 */
function gotothepage(page) {
    let url = window.location.href.replace(/#.*$/g, "");
    if (url.lastIndexOf("page") === -1) {
        if (url.lastIndexOf("?") === -1)
            window.location.href = url + "?page=" + page;
        else
            window.location.href = url + "&page=" + page;
    } else {
        window.location.href = url.replace(/page=\d+/g, `page=${page}`);
    }
}

/**
 * Alt+PgUp/Alt+PgDn快捷键
 * @param event
 */
function changepage(event) {
    let keynum = event.keyCode ? event.keyCode : (event.which ? event.which : 0);
    let altkey = navigator.userAgent.toLowerCase().indexOf('presto') !== -1 ? event.shiftKey : event.altKey;

    // currentpage和maxpage由pager方法中的js提供
    if (altkey && keynum === 33 && currentpage > 0) {
        gotothepage(currentpage - 1);
    } else if (altkey && keynum === 34 && currentpage < maxpage) {
        gotothepage(currentpage + 1);
    }
}

if (window.document.addEventListener) {
    window.addEventListener("keydown", changepage, false);
} else {
    window.attachEvent("onkeydown", changepage, false);
}

/**
 * 点击种子收藏图标
 * @param torrentid 种子ID
 * @param counter 在torrent table中类似于行号的一个东西
 */
function bookmark(torrentid, counter) {
    $.get('bookmark.php', {'torrentid': torrentid}, resp => {
        if (resp === "added") {
            $(`#bookmark${counter}`).html("<img class='bookmark' src='/pic/trans.gif' alt='Bookmarked' />");
        } else if (resp === 'deleted') {
            $(`#bookmark${counter}`).html("<img class='delbookmark' src='/pic/trans.gif' alt='Unbookmarked' />");
        }
    });
}


/**
 * 当前全选状态
 * @type {boolean}
 */
let checkFlag = false;

/**
 * 全选/全不选
 * @param field 传入form
 * @param checkall_name 「全选」这两个字
 * @param uncheckall_name 「全不选」这三个字
 * @returns {*}
 */
function check(field, checkall_name, uncheckall_name) {
    if (!checkFlag) {
        for (let i = 0; i < field.length; i++) {
            field[i].checked = true;
        }
        checkFlag = true;
        return uncheckall_name;
    } else {
        for (let i = 0; i < field.length; i++) {
            field[i].checked = false;
        }
        checkFlag = false;
        return checkall_name;
    }
}

/**
 * 搜索箱的全选
 */
function SetChecked(chkName, ctrlName, checkall_name, uncheckall_name, start, count) {
    let dml = document.forms['searchbox'];
    let len = dml.elements.length;
    let begin;
    let end;
    if (start === -1) {
        begin = 0;
        end = len;
    } else {
        begin = start;
        end = start + count;
    }
    let check_state;
    for (i = 0; i < len; i++) {
        if (dml.elements[i].name === ctrlName) {
            if (dml.elements[i].value === checkall_name) {
                dml.elements[i].value = uncheckall_name;
                check_state = 1;
            } else {
                dml.elements[i].value = checkall_name;
                check_state = 0;
            }
        }

    }
    for (i = begin; i < end; i++) {
        if (dml.elements[i].name.indexOf(chkName) !== -1) {
            dml.elements[i].checked = check_state;
        }
    }
}

/**
 * 趣味盒投票
 * @param funid 趣味盒ID
 * @param yourvote fun/dull
 */
function funvote(funid, yourvote) {
    $.get('fun.php', {"action": "vote", "id": funid, "yourvote": yourvote}, () => {
        $("#funvote").hide();
        $("#voteaccept").show();
    });
}

/**
 * userdetails.php
 * 获取torrentlist（发布、做种、下载、已完成、未完成）
 */
function getusertorrentlistajax(userid, type, blockid) {
    const block = $(`#${blockid}`);
    klappe_news(blockid.substr(1));
    if (block.html() === "加载中...") {
        $.get('getusertorrentlistajax.php', {"userid": userid, "type": type}, resp => {
            block.html(resp);
        });
    }
}

/**
 * 鼠标放在种子名上时显示外部信息
 */
function get_ext_info_ajax(blockid, url, cache, type) {
    const block = $(`#${blockid}`);
    if (block.html() === "") {
        $.get('getextinfoajax.php', {"url": url, "cache": cache, "type": type}, resp => {
            block.html(resp);
        });
    }
    return true;
}

/**
 * userdetails.php
 * 管理员删除用户之前的勾选
 * @param msg alert的话
 */
function checkdel(msg) {
    if ($("input[name=delenable]").prop("checked")) {
        document.deluser.submit.disabled = false;
        alert(msg);
    } else {
        document.deluser.submit.disabled = true;
    }
}

/**
 * mybonus.php中送魔力
 * 当select为0（自定义）时，禁用select，启用text
 */
function customgift() {
    const giftselect = $("#giftselect");
    if (giftselect.val() === '0') {
        giftselect.attr("disabled", true);
        $("#giftcustom").attr("disabled", false);
    }
}

/**
 * 送魔力确认
 * @param bonus 要送的魔力值
 * @returns {boolean}
 */
function confirmgive(bonus) {
    return confirm(`老板大气，确定要送出${bonus}魔力值吗？`);
}

/**
 * 种子送魔力
 * @param torrentid 种子ID
 * @param bonus 要送的魔力
 * @param bonus0 现有魔力
 */
function givebonus(torrentid, bonus, bonus0) {
    if (confirmgive(bonus)) {
        if (bonus <= bonus0) {
            $.post('givebonus.php', {"torrentid": torrentid, "bonus": bonus}, resp => {
                if (resp === "success") {
                    $(`#nothanksbonus`).html("");
                    $(`#addcuruserbonus`).after($("#curuserbonus").html() + `(${bonus.toFixed(1)}) `);
                    alert(`成功赠送${bonus}魔力值！`);
                } else {
                    alert("似乎赠送失败了，请刷新页面查看结果！");
                }
            });
        } else {
            alert(`你的魔力比${bonus}少哦，赚点再来吧！`);
        }
    }
}

/**
 * 论坛送魔力
 * @param postID 帖子ID
 * @param bonus 送出的魔力
 * @param bonus0 用户现有魔力
 */
function givebonus0(postID, bonus, bonus0) {
    if (confirmgive(bonus)) {
        if (bonus <= bonus0) {
            $.post('givebon.php', {"post_id": postID, "bonus": bonus}, resp => {
                if (resp === "success") {
                    $(`#nothanksbonus${postID}`).html("");
                    $(`#addcuruserbonus${postID}`).after($("#curuserbonus").html() + `(${bonus.toFixed(1)}) `);
                    alert(`成功赠送${bonus}魔力值！`);
                } else {
                    alert("似乎赠送失败了，请刷新页面查看结果！");
                }
            });
        } else {
            alert(`你的魔力比${bonus}少哦，赚点再来吧！`);
        }
    }
}

/**
 * uploaders.php
 * 显示未通过考核的发布员/所有发布员
 */
function filter_uploaders() {
    if ($("#show_not_pass").prop("checked")) {
        $("#outer").find("table > tbody > tr > td > table:nth-child(2) > tbody > tr").each(function () {
            var passed = $(this).children("td")[5];
            if (passed.innerText.search("否") === -1)
                $(this).css('display', 'none');
        });
    } else {
        $("#outer").find("table > tbody > tr > td > table:nth-child(2) > tbody > tr").each(function () {
            $(this).css('display', 'table-row');
        });
    }
}

function get_ptgen_endpoint() {
    const default_endpoint = "https://ptgen.tju.pt/"
    const deprecated_endpoint = ["https://ptgen.tju.network:11399/", "https://ptgen.tju.network:11499/", "https://ptgen.tju.network:11799/"]

    let endpoint = localStorage.getItem("PT_GEN_ENDPOINT");
    if (!endpoint || deprecated_endpoint.includes(endpoint)) {
        endpoint = default_endpoint
        localStorage.setItem("PT_GEN_ENDPOINT", default_endpoint);
    }
    if (endpoint.charAt(endpoint.length - 1) !== '/') {
        endpoint = endpoint + "/"
    }

    return endpoint
}

/**
 * 调用PT-Gen来填写简介
 */
function get_external_data() {
    const url = $("#external_url").val();

    if ($("#descr").val() && !confirm("辅助填写将删除已填写简介，是否继续？")) {
        return;
    }

    const endpoint = get_ptgen_endpoint()

    let external_api_base_url = endpoint + "infogen";
    let api_url = "";
    if (url.search("imdb.com") !== -1) {
        api_url = external_api_base_url + "?site=douban&sid=" + /tt(\d+)/i.exec(url)[0];
    } else {
        api_url = external_api_base_url + "?url=" + url;
    }
    $.get(api_url, function (data) {
        if (data.error !== null) {
            alert(data.error);
        } else {
            $("#descr").val(data.format);
            $("input[name='url'][type='text']").val(data.imdb_link);
        }
    });
}

/**
 * 在选择种子文件后将种子文件的文件名显示出来以便复制
 */
function get_torrent_name() {
    const file_jq = $("#torrent");
    let torrent_name = file_jq[0].files[0].name;
    let regex = /(.*)\.torrent/i;
    torrent_name = regex.exec(torrent_name);
    if (torrent_name === null) {
        alert("请选择种子(.torrent)文件！");
        file_jq.val("");
    }
    $("#torrent_name").text(torrent_name[1]);
}

/**
 * 显示修改PT-Gen节点的对话框
 */
function editAPIEndpoint() {
    let this_endpoint = localStorage.getItem("PT_GEN_ENDPOINT");
    let checked, selfEndpoint = "";
    switch (this_endpoint) {
        case "https://ptgen.tongyifan.workers.dev/":
            checked = 1;
            break;
        case "https://api.issacc.bid/":
            checked = 2;
            break;
        case "https://ptgen.tju.network:11399/":
        case "https://ptgen.tju.network:11499/":
        case "https://ptgen.tju.network:11799/":
        case "https://ptgen.tju.pt/":
        case null:
            checked = 0;
            break;
        default:
            checked = -1;
            selfEndpoint = this_endpoint;
    }

    Swal.fire({
        title: '修改PT-Gen节点',
        html: '<label><input type="radio" name="endpoint" value="https://ptgen.tju.pt/"' + (checked === 0 ? ' checked="checked"' : '') + '>国内节点（默认）</label>' +
            '<label><input type="radio" name="endpoint" value="https://ptgen.tongyifan.workers.dev/"' + (checked === 1 ? ' checked="checked"' : '') + '>Cloudflare节点</label>' +
            '<label><input type="radio" name="endpoint" value="https://api.issacc.bid/"' + (checked === 2 ? ' checked="checked"' : '') + '>AWS节点</label>' +
            '<br><label><input type="radio" name="endpoint" value="other"' + (checked === -1 ? ' checked="checked"' : '') + `>自定义节点 <input class="swal2-input" type="text" name="selfEndpoint" placeholder="https://example.org/" style="width: 50%" value="${selfEndpoint}"></label>`,
        icon: 'question',
        preConfirm: () => {
            return [
                $("input[name=endpoint]:checked").val(),
                $("input[name=selfEndpoint]").val()
            ];
        }
    }).then((result) => {
        let endpoint = "";
        if (result.value) {
            if (result.value[0] === 'other') {
                if (result.value[1]) {
                    endpoint = result.value[1];
                    const regex = new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/);
                    if (!regex.test(endpoint)) {
                        localStorage.setItem("PT_GEN_ENDPOINT", "https://ptgen.tju.pt/");
                        Swal.fire({
                            title: "错误的API地址",
                            text: "已自动设置为默认节点",
                            icon: "warning"
                        });
                        return;
                    }
                } else {
                    localStorage.setItem("PT_GEN_ENDPOINT", "https://ptgen.tju.pt/");
                    Swal.fire({
                        title: "未指定自定义节点地址",
                        text: "已自动设置为默认节点",
                        icon: "warning"
                    });
                    return;
                }
            } else {
                endpoint = result.value[0];
            }

            if (endpoint.charAt(endpoint.length - 1) !== '/') {
                endpoint = endpoint + "/";
            }

            localStorage.setItem("PT_GEN_ENDPOINT", endpoint);
            Swal.fire({title: "成功修改PT-Gen节点", html: `<span style='color: white'>${endpoint}</span>`, icon: "success"})
        }
    })
}

/**
 * 点击页脚的次数
 * @type {number}
 */
let debugModeTrigger = 0;

/**
 * 如果点击5次页脚，就显示sql日志
 */
function debugMode() {
    debugModeTrigger += 1;
    if (debugModeTrigger === 5) {
        const sqlDebugSelector = $("#sql_debug");
        if (sqlDebugSelector.length) {
            sqlDebugSelector.show();
        } else {
            alert("QAQ");
        }
    }
}

/**
 * 驳回注册请求
 * @param id
 */
function rejectSignup(id) {
    let checked = 0;
    Swal.fire({
        title: '驳回注册申请',
        input: 'textarea',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return '驳回理由不能为空！'
            }
        },
        html: '<label><input onclick="insertReason()" type="checkbox" name="reason" value="需要更多信息以确认你是教育网用户">需要更多信息以确认你是教育网用户</label><br>' +
            '<label><input onclick="insertReason()" type="checkbox" name="reason" value="在非教育网环境下注册，且未提供校园身份证明">在非教育网环境下注册，且未提供校园身份证明</label><br>' +
            '<label><input onclick="insertReason()" type="checkbox" name="reason" value="无法判断证件有效期信息">无法判断证件有效期信息</label><br>' +
            '<label><input onclick="insertReason()" type="checkbox" name="reason" value="证件未按要求使用纸条遮挡">证件未按要求使用纸条遮挡</label><br>' +
            '<label><input onclick="insertReason()" type="checkbox" name="reason" value="证件与所使用邮箱域不符">证件与所使用邮箱域不符</label><br>' +
            '<label><input onclick="insertReason()" type="checkbox" name="reason" value="注册IP地址与学校所在地不符">注册IP地址与学校所在地不符</label><br>' +
            '<label><input onclick="insertReason()" type="checkbox" name="reason" value="使用网络代理/VPN注册">使用网络代理/VPN注册</label><br>' +
            '<label><input onclick="insertReason()" type="checkbox" name="reason" value="自助邀请注册仅限在校生">自助邀请注册仅限在校生</label><br>',
        icon: 'question'
    }).then((result) => {
        if (result.value) {
            window.location.href = `verify_signup.php?id=${id}&action=reject&reason=${result.value}`;
        }
    })
}

/**
 * 驳回注册时的对话框中，当点击checkbox时将已选择的理由写入textarea
 */
function insertReason() {
    let reasons = [];
    $("input[name=reason]:checked").each((index, value) => {
        reasons.push($(value).val());
    })

    $(".swal2-textarea").val(reasons.join("；"));
}

/**
 * 显示购买优惠的对话框
 * @param tid 种子ID
 * @param size 种子大小
 * @param ttl 种子存活时间（天）
 */
function buySticky(tid, size, ttl) {
    function parseDate(date, cost) {
        let remain_hour = Math.ceil((new Date(date).getTime() + 48 * 60 * 60 * 1000 - new Date().getTime()) / (60 * 60 * 1000));
        let cannotCancel = remain_hour > 42 ? "(保护期)" : `(+${(cost / 2).toFixed(1)})`;

        return `剩余时间${remain_hour}小时${cannotCancel}`;
    }

    let options = {default: "请选择"};
    $.getJSON("buy_sticky.php", data => {
        for (const [sticky_id, sticky_data] of Object.entries(data.data['1'])) {
            options[`sold_1_${sticky_id}`] = `一级置顶-种子${sticky_data['tid']}-${parseDate(sticky_data['start_date'], sticky_data['cost'])}`;
        }
        for (let i = 0; i < 5 - Object.keys(data.data['1']).length; i++) {
            options["available_1_-" + i] = "一级置顶-空闲";
        }
        for (const [sticky_id, sticky_data] of Object.entries(data.data['3'])) {
            options[`sold_3_${sticky_id}`] = `三级置顶-种子${sticky_data['tid']}-${parseDate(sticky_data['start_date'], sticky_data['cost'])}`;
        }
        for (let j = 0; j < 2 - Object.keys(data.data['3']).length; j++) {
            options["available_3_-" + j] = "三级置顶-空闲";
        }

        Swal.fire({
            title: '购买竞价置顶',
            icon: "question",
            html: "<b>预估消耗魔力值：<span id='buyStickyBonus'>0</span></b>",
            onRender: () => {
                $("select.swal2-select").on('change', function () {
                    let selectedData = this.value.split("_");
                    if (selectedData.length === 3) {
                        let A = selectedData[1] === "3" ? 50000 : 5000;
                        let torrentSize = size / (1024 * 1024 * 1024); // GB
                        let B1Part, B2Part, B3Part;
                        if (torrentSize <= 50) {
                            B1Part = torrentSize;
                            B2Part = 0;
                            B3Part = 0;
                        } else if (torrentSize <= 100) {
                            B1Part = 50;
                            B2Part = torrentSize - 50;
                            B3Part = 0;
                        } else {
                            B1Part = 50;
                            B2Part = 50;
                            B3Part = torrentSize - 100;
                        }
                        let B1 = ttl >= 30 ? 100 : 200;
                        let B2 = ttl >= 30 ? 500 : 750;
                        let B3 = ttl >= 30 ? 750 : 1000;
                        let C = selectedData[0] === 'available' ? 0 : data.data[selectedData[1]][selectedData[2]]['cost'] / 2;
                        let cost = (A + B1 * B1Part + B2 * B2Part + B3 * B3Part + C).toFixed(1);
                        $("#buyStickyBonus").text(cost);
                    } else {
                        $("#buyStickyBonus").text(0);
                    }
                });
            },
            input: 'select',
            inputOptions: options,
            showCancelButton: true,
            confirmButtonText: '购买',
            cancelButtonText: "取消",
            showLoaderOnConfirm: true,
            footer: "<a href='/forums.php?action=viewtopic&topicid=16705' target='_blank'>查看竞价置顶计算规则</a>"
        }).then((result) => {
            let selectedData = result.value.split("_");
            if (selectedData.length !== 3) {
                Swal.fire({
                    title: "错误",
                    text: "未选择置顶栏位或选择出错",
                    icon: "error"
                })
            } else {
                $.post("buy_sticky.php", {
                    torrent_id: tid,
                    type: selectedData[1],
                    replaced_sticky_id: selectedData[2]
                }, (data) => {
                    if (data.success) {
                        Swal.fire({
                            title: "成功",
                            text: data.msg,
                            icon: "success"
                        })
                    } else {
                        Swal.fire({
                            title: "错误",
                            text: data.msg,
                            icon: "error"
                        })
                    }
                })
            }

        })
    })
}

/**
 * 显示校外IPv4访问警告
 */
function showTJUIPNotice() {
    if (getCookie("tjuip_notice_ignore") !== "1") {
        Swal.fire({
            title: "天津大学校外IPv4访问",
            icon: "warning",
            html: "<p style='text-align: left; text-indent: 2em'>您正在使用天津大学校外IPv4访问本站且未正确配置「离校模式」，这将导致您无法从tracker获得IPv4 Peers。</p>" +
                "<p style='text-align: left; text-indent: 2em'>如果您来自<span style='color: blue'>其他高校</span>，并且校园网同样按流量计费，请将本站IPv6地址写入系统hosts文件中，强制通过IPv6网络访问本站，<a href='forums.php?action=viewtopic&topicid=15457&page=p181275#pid181275' target='_blank' class='faqlink'>hosts写入方法请点击这里查看</a>。</p>" +
                "<p style='text-align: left; text-indent: 2em'>如果您处于<span style='color: red'>非按量计费的IPv4环境</span>，请参考<a class='faqlink' target='_blank' href='forums.php?action=viewtopic&forumid=15&topicid=15457'>天津大学校外IPv4下载设置步骤</a>对帐号和客户端进行配置。</p>",
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: "7天内不再提醒",
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                let d = new Date();
                d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
                document.cookie = `tjuip_notice_ignore=1; expires=${d.toGMTString()}`;
            }
        })
    }
}

/**
 * 获取指定Cookie
 * @param cookieName
 * @returns {string}
 */
function getCookie(cookieName) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(`${cookieName}=`) === 0) {
            return c.substring(`${cookieName}=`.length, c.length);
        }
    }
    return "";
}

/**
 * 通用获取种子信息填写框的方法
 * @param url 要调用的url
 * @param obj 要写入的dom id
 */
function getInfo(url, obj) {
    const selector = $(`#${obj}`);
    selector.html("<option>loading...</option>");
    $.get(url, resp => {
        selector.html(resp);
    });
}

/**
 * 普通发布，选择类别后调出的填写框
 * @param obj
 * @param selectid
 */
function getcategory(obj, selectid) {
    const catid = $(`#${selectid}`).val();
    getInfo(`showcategorydetail.php?catid=${catid}`, obj);
}

/**
 * 在通过候选后，在发布页选择候选后调出种子信息填写框
 * @param obj
 * @param selectid
 */
function getuploadinfo(obj, selectid) {
    const offerid = $(`#${selectid}`).val();
    getInfo(`catdetail_offertotorrent.php?offerid=${offerid}`, obj);
}

/**
 * 在edit页面（offer和torrent）打开时显示种子信息填写框
 */
function getEditInfo() {
    const id = getQueryString("id");
    if (id) {
        if ($("#editclass").length) {
            getInfo(`catdetail_editoffers.php?offerid=${id}&ref=${Math.random()}`, "class1");
        } else {
            getInfo(`catdetail_edittorrents.php?torid=${id}&ref=${Math.random()}`, "class1");
        }
    }
}

/**
 * 添加显示修改种子的onload listener
 */
if ($.inArray(location.pathname, ["/edit.php", "/upsimilartorrent.php"]) !== -1 ||
    (location.pathname === "/offers.php" && getQueryString("edit_offer"))) {
    window.addEventListener("load", getEditInfo);
}

/**
 * 抄来的获取param的function
 * @param {string} name 所需的param
 */
function getQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**
 * 选择checkbox后更新文本框中数据的方法
 * @param textid 文本框id
 */
function getcheckboxvalue(textid) {
    const textSelector = $(`#${textid}`);
    let checkedItems = [];
    $(`input[type=checkbox][id*="${textid}"]:checked`).each(function () {
        checkedItems.push($(this).val());
    });
    textSelector.val(checkedItems.join("/"));
}

/**
 * 选择radio后更新文本框中数据的方法
 * @param textid 文本框id
 */
function getradiovalue(textid) {
    const textSelector = $(`#${textid}`);
    textSelector.val($(`input[type=radio][id*="${textid}"]:checked`).val());
}

/**
 * 一个简陋的validator
 * todo: 用validator.js重写
 * @param selectid
 * @returns {boolean}
 */
function validate(selectid) {
    var catid = document.getElementById(selectid).value;

    if (catid == 401) {
        var cname = document.getElementsByName("cname")[0].value;
        var ename = document.getElementsByName("ename")[0].value;
        var issuedate = document.getElementsByName("issuedate")[0].value;
        var language = document.getElementById("language").value;
        var format = document.getElementById("format").value;
        var subsinfo = document.getElementsByName("subsinfo")[0].value;
        var district = document.getElementById("district").value;

        if (cname == "" || ename == "" || issuedate == "" || language == "" || format == "" || subsinfo == 0 || district == "") {
            alert("missing data!");
            return false;
        }
    }
    if (catid == 402) {
        var cname = document.getElementsByName("cname")[0].value;
        var language = document.getElementById("language").value;
        var specificcat = document.getElementById("specificcat").value;
        if (cname == "" || language == "" || specificcat == "") {
            alert("missing data!");
            return false;
        }
    }
    if (catid == 405) {
        var cname = document.getElementsByName("cname")[0].value;
        var ename = document.getElementsByName("ename")[0].value;
        var specificcat = document.getElementById("specificcat").value;
        var format = document.getElementById("format").value;
        var substeam = document.getElementsByName("substeam")[0].value;
        if (ename == "" || specificcat == "" || format == "" || substeam == "") {
            alert("missing data!");
            return false;
        }
    }
    if (catid == 406) {
        var hqname = document.getElementsByName("hqname")[0].value;
        var artist = document.getElementsByName("artist")[0].value;
        var format = document.getElementById("format").value;
        if (hqname == "" || artist == "" || format == "") {
            alert("missing data!");
            return false;
        }
    }
    if (catid == 407) {
        var cname = document.getElementsByName("cname")[0].value;
        var specificcat = document.getElementById("specificcat").value;
        var format = document.getElementById("format").value;
        if (cname == "" || specificcat == "" || format == "") {
            alert("missing data!");
            return false;
        }
    }
    if (catid == 409) {
        var cname = document.getElementsByName("cname")[0].value;
        var platform = document.getElementById("platform").value;
        var format = document.getElementById("format").value;
        if (cname == "" || platform == "" || format == "") {
            alert("missing data!");
            return false;
        }
    }
    if (catid == 410) {
        var cname = document.getElementsByName("cname")[0].value;
        var specificcat = document.getElementById("specificcat").value;
        if (cname == "" || specificcat == "") {
            alert("missing data!");
            return false;
        }
    }
    if (catid == 411) {
        var cname = document.getElementsByName("cname")[0].value;
        var subsinfo = document.getElementsByName("subsinfo")[0].value;
        var specificcat = document.getElementById("specificcat").value;
        if (cname == "" || subsinfo == 0 || specificcat == "") {
            alert("missing data!");
            return false;
        }
    }
    if (catid == 412) {
        var cname = document.getElementsByName("cname")[0].value;
        var ename = document.getElementsByName("ename")[0].value;
        var language = document.getElementById("language").value;
        var subsinfo = document.getElementsByName("subsinfo")[0].value;
        var district = document.getElementById("district").value;

        if (cname == "" || ename == "" || language == "" || subsinfo == 0 || district == "") {
            alert("missing data!");
            return false;
        }
    }
}

/**
 * 在页面加载后设置iframe高度（attachment.php的高度）
 */
function adjustIframeHeight(element) {
    let iframeWin = element.contentWindow || element.contentDocument.parentWindow;
    if (iframeWin.document.body) {
        element.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
    }
}

/**
 * 显示更多表情（不是很想用之前的emotion.js了，点一次800+的requests）
 * @param form
 * @param text
 */
function showMoreSmilies(form, text) {
    window.open(`moresmilies.php?form=${form}&text=${text}`, "mywin", "height=500,width=500,resizable=no,scrollbars=yes");
}

/**
 * Lazyload
 */
window.addEventListener('load', function () {
    new LazyLoad({
        elements_selector: "*[data-src]"
    });
});

/**
 * QQ群加群
 */
function joinGroup() {
    const groups = [155707364, 838391326]
    const group = groups[Math.round(Math.random())]

    Swal.fire({
        title: "加入QQ群",
        html: `欢迎加入QQ群 <b>${group}</b> ，请将用户名完整写于验证消息中<br>` +
            "注意：验证消息请仅填写用户名，不要添加任何其他文字，否则将影响机器人自动通过",
        imageUrl: `/pic/qq_join_group/${group}.png`,
        width: "44rem"
    })
}

/**
 * 论坛加收藏/取消收藏
 * @param tid 帖子ID
 * @param action 行为
 * @param changeButtonStatus true: 修改按钮的文字 false: 刷新页面
 * @returns {boolean}
 */
function topic_bookmark(tid, action, changeButtonStatus = true) {
    function _onclose() {
        if (changeButtonStatus) {
            $("#topic_bookmark")
                .val(changeButtonText)
                .attr("onclick", `topic_bookmark(${tid}, '${changeButtonAction}')`)
        } else {
            location.reload()
        }
    }

    if (!["add", "delete"].includes(action)) {
        return false
    }
    const actionText = action === "delete" ? "取消收藏" : "收藏本帖"
    const changeButtonText = action === "delete" ? "收藏本帖" : "取消收藏"
    const changeButtonAction = action === "delete" ? "add" : "delete"
    $.post("marked_topic.php", {
        action: action,
        topicid: tid
    }).then(resp => {
        if (resp === "OK") {
            Swal.fire({
                title: actionText + "成功",
                icon: "success",
                footer: "<a href='/marked_topic.php' target='_blank'>查看已收藏的主题</a>",
                onClose: _onclose
            })
        } else {
            Swal.fire({
                title: actionText + "失败",
                icon: "error",
                footer: "<a href='/marked_topic.php' target='_blank'>查看已收藏的主题</a>",
                onClose: _onclose
            })
        }
    })
}

/**
 * 兑奖
 */
function app_redeem() {
    const code_selector = $("input[name='reward_code']")

    const code = code_selector.val()
    if (code.length !== 6) {
        Swal.fire({
            icon: "error",
            title: "错误",
            text: "输入的兑换码有误！",
            footer: "小知识：兑换码为6位英文+数字组合而成的"
        })
        return
    }

    $.post("reward_code.php", {code: code, action: "redeem"}).then(res => {
        if (res.status < 0) {
            Swal.fire({
                icon: "error",
                title: "错误",
                text: res.msg,
                onClose: () => {
                    location.reload()
                }
            })
        } else {
            Swal.fire({
                icon: "success",
                title: "成功",
                text: res.msg,
                onClose: () => {
                    location.reload()
                }
            })
        }
    })
}

/**
 * 创建新的兑换码活动
 */
function create_reward_event() {
    Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2']
    }).queue([
        {
            title: "活动名称",
            input: "text",
        },
        {
            title: "过期时间",
            text: "Y-m-d H:i:s，如2010-10-02 18:09:05",
            input: "text"
        }
    ]).then((result) => {
        if (result.value) {
            $.post("reward_code.php", {
                action: "create_event",
                event_name: result.value[0],
                expired_at: result.value[1]
            }).then(res => {
                Swal.fire(
                    "创建成功",
                    `活动ID为${res.data}`,
                    "success"
                )
            })
        }
    })
}

/**
 * 生成兑换码
 */
function create_reward_code() {
    $.get("reward_code.php", {action: "get_events"}).then(res => {
        Swal.mixin({
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3', '4']
        }).queue([
            {
                title: "选择一个活动",
                input: "select",
                inputOptions: res.data
            },
            {
                title: "奖励类型",
                input: "radio",
                inputOptions: {
                    'seedbonus': "魔力值",
                    'invites': "永久邀请"
                }
            },
            {
                title: "奖励数量",
                input: "number"
            },
            {
                title: "生成兑换码数量",
                input: "number"
            }
        ]).then((result) => {
            if (result.value) {
                $.post("reward_code.php", {
                    action: "generate_code",
                    event_id: result.value[0],
                    reward_item: result.value[1],
                    reward_num: result.value[2],
                    gen_num: result.value[3]
                }).then(res => {
                    Swal.fire({
                        icon: "success",
                        title: "生成成功",
                        html: `<a class='faqlink' id='click_to_copy' onclick='return false' data-clipboard-text='${res.data.join("\n")}'>点此复制兑换码</a>`,
                        onRender: () => {
                            var clipboard = new ClipboardJS("#click_to_copy");
                            clipboard.on("success", function (e) {
                                alert("复制成功")
                            })
                            clipboard.on('error', function (e) {
                                prompt("复制失败，请手动复制：", e.text)
                            })
                        },
                        onClose: () => {
                            location.reload()
                        }
                    })
                })
            }
        })
    })
}

/**
 * 加载外部信息，如豆瓣/IMDb
 * 本部分借鉴了Ourbits的前端实现，感谢！
 */
function load_external_data() {
    const ptgenEndpoint = get_ptgen_endpoint()
    let doubanSelector = $("#kdouban")
    if (doubanSelector.length > 0) {
        const doubanId = doubanSelector.attr("data-douban-id")
        const doubanUrl = `https://movie.douban.com/subject/${doubanId}/`
        let doubanData = localStorage.getItem(`douban_data_${doubanId}`)
        if (doubanData) {
            buildDoubanDiv(JSON.parse(doubanData), doubanSelector)
        } else {
            $.getJSON(ptgenEndpoint + "infogen", {
                site: "douban",
                sid: doubanId
            }, data => {
                if (data.success !== false) {
                    localStorage.setItem(`douban_data_${doubanId}`, JSON.stringify(data))
                    buildDoubanDiv(data, doubanSelector)
                } else {
                    doubanSelector.html(`获取豆瓣信息错误：<a href="${doubanUrl}" target="_blank">豆瓣ID ${doubanId}</a>，错误：${data.error}`)
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                doubanSelector.html(`获取豆瓣信息失败：<a href="${doubanUrl}" target="_blank">豆瓣ID ${doubanId}</a>，错误：${textStatus}`)
            })
        }
    }

    let imdbSelector = $("#kimdb")
    if (imdbSelector.length > 0) {
        const imdbId = imdbSelector.attr("data-imdb-id")
        const imdbUrl = `https://www.imdb.com/title/${imdbId}/`
        let imdbData = localStorage.getItem(`imdb_data_${imdbId}`)
        if (imdbData) {
            buildIMDbDiv(JSON.parse(imdbData), imdbSelector)
        } else {
            $.getJSON(ptgenEndpoint + "infogen", {
                site: "imdb",
                sid: imdbId
            }, data => {
                if (data.success !== false) {
                    localStorage.setItem(`imdb_data_${imdbId}`, JSON.stringify(data))
                    buildIMDbDiv(data, imdbSelector)
                } else {
                    imdbSelector.html(`获取IMDb信息错误：<a href="${imdbUrl}" target="_blank">IMDb ID ${imdbId}</a>，错误：${data.error}`)
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                imdbSelector.html(`获取IMDb信息失败：<a href="${imdbUrl}" target="_blank">IMDb ID ${imdbId}</a>，错误：${textStatus}`)
            })
        }
    }
}

/**
 * 加载豆瓣信息的div
 * @param data PTGEN数据
 * @param containerSelector
 */
function buildDoubanDiv(data, containerSelector) {
    let poster = data.poster.replace('img3', 'img1')
    let new_format = data.format.replace(/\[img].+?\[\/?img]/, '')
        .trim()
        .replace(/\n/ig, '<br>')

    $(`<div style='margin-bottom: 10px'><img src="pic/douban.png" style='display: inline-block;vertical-align: middle;width: 16px;' alt="douban_icon">
<a href='${data.douban_link}' target='_blank' style='display: inline-block;margin: 0 5px;'><b><u>${data.chinese_title || ""} ${data.foreign_title}</u></b></a><span style='color: darkcyan;font-family: Arial;'>(${data.year})</span><span style='display: inline-block;margin: 0 5px 0 10px;'>${data.douban_rating_average || 0}/10</span><span style='color: darkcyan;font-family: Arial;'>(${data.douban_votes.toLocaleString()})</span></div>`).insertBefore(containerSelector)

    containerSelector.html(`<div id='doubaninfo'>
<div class="doubannew" style="padding:5px;float:left;"><a target="blank" href="${data.douban_link}"><img width='210' src="${poster}" alt="douban poster"></a></div>
<div class="doubannew2" style="float: left;border-left: 1px dashed;  padding:5px;max-width:70%;">
<div class='doubaninfo'>${new_format}</div>
</div></div>`)

    let movienameSelector = $("#moviename")
    if (movienameSelector.length > 0 && movienameSelector.val() === "") {
        movienameSelector.val(data.chinese_title || data.foreign_title)
    }
}

/**
 * 加载IMDb信息的div
 * @param data PTGEN数据
 * @param containerSelector
 */
function buildIMDbDiv(data, containerSelector) {
    let poster = data.poster || "/pic/imdb_pic/nophoto.gif"
    let new_format = data.format.replace(/\[img].+?\[\/?img]/, '')
        .trim()
        .replace(/\n/ig, '<br>')

    $(`<div style='margin-bottom: 10px'><img src="pic/imdb.png" style='display: inline-block;vertical-align: middle;width: 16px;' alt="imdb_icon">
<a href='${data.imdb_link}' target='_blank' style='display: inline-block;margin: 0 5px;'><b><u>${data.name || ""}</u></b></a><span style='color: darkcyan;font-family: Arial;'>(${data.year})</span><span style='display: inline-block;margin: 0 5px 0 10px;'>${data.imdb_rating_average || 0}/10</span><span style='color: darkcyan;font-family: Arial;'>(${data.imdb_votes.toLocaleString()})</span></div>`).insertBefore(containerSelector)

    containerSelector.html(`<div id='imdbinfo'>
<div class="imdbnew" style="padding:5px;float:left;"><a target="blank" href="${data.imdb_link}"><img width='210' src="${poster}" alt="imdb poster"></a></div>
<div class="imdbnew2" style="float: left;border-left: 1px dashed;  padding:5px;max-width:70%;">
<div class='imdbinfo'>${new_format}</div>
</div></div>`)

    if ($("#kdouban").length === 0) {  // 没有豆瓣则使用IMDb的英文名来填写字幕区的名字
        let movienameSelector = $("#moviename")
        if (movienameSelector.length > 0 && movienameSelector.val() === "") {
            movienameSelector.val(data.name || "")
        }
    }
}

window.addEventListener('load', function () {
    load_external_data()
});

/**
 * 升级确认框，用于classes.php
 * @param classToGo 将要升级至的等级ID
 * @param className 将要升级至的等级名称
 * @param cost 升级所需的魔力值
 */
function levelUp(classToGo, className, cost) {
    Swal.fire({
        title: "升级",
        text: `你将消耗${cost}个魔力值以升级至${className}`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "确认",
        cancelButtonText: "取消",
    }).then((result) => {
        if (result.isConfirmed) {
            let thisForm = $(`<form action="/classes.php" method="post"><input type="hidden" name="class" value="${classToGo}" /></form>`);
            $("body").append(thisForm);
            thisForm.submit();
        }
    })
}
