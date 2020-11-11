     /// <reference path="https://code.jquery.com/jquery-2.1.3.min.js" />
/// <reference path="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js" />
/// <reference path="https://cdn.jsdelivr.net/transparency/0.9.14/transparency.min.js" />

var kanas = ['A', 'I', 'U', 'E', 'O', 'KA', 'KI', 'KU', 'KE', 'KO', 'SA', 'SHI', 'SU', 'SE', 'SO', 'TA', 'CHI', 'TSU', 'TE', 'TO', 'NA', 'NI', 'NU',
    'NE', 'NO', 'HA', 'HI', 'FU', 'HE', 'HO', 'MA', 'MI', 'MU', 'ME', 'MO', 'YA', 'YU', 'YO', 'RA', 'RI', 'RU', 'RE', 'RO', 'WA', 'WI', 'WE', 'WO', 'N'];

var curAns = getKana();
var hk = 'hiragana';

function hirakata(which) {
    if (hk == which) {
        return;
    }
    $('.hk').html(which);
    if (which == 'hiragana') {
        $('#katakana').removeClass('active');
        $('#hiragana').addClass('active');
    }
    else {
        $('#hiragana').removeClass('active');
        $('#katakana').addClass('active');
    }
    hk = which;
    nextKana();
}

function guess(ans) {
    var txt = $(ans).html();
    if (txt == curAns) {
        $('#answer').addClass('correct')
        nextKana();
    }
    else {
        $(ans).addClass('disabled');
        $('#answer').addClass('wrong')
            .removeClass('transitioning');
        setTimeout(clearFeedback, 360);
    }
}

function nextKana() {
    $('.ans-btn').removeClass('disabled');
    curAns = getKana();
    newButtons(10);
    $('#kana-img').addClass('leaving transitioning');
    setTimeout(endLeaving, 200);
    $('#answer').removeClass('transitioning');
    $('#answer-panel').addClass('invis');
}

function getKana() {
    return kanas[Math.floor(Math.random() * kanas.length)]
}

function newButtons(number) {
    var answers = kanas.slice(0);
    answers.sort(function () { return Math.random() - 0.5; });
    answers = answers.slice(0, number);
    if ($.inArray(curAns, answers) == -1) {
        var i = Math.floor(Math.random() * number);
        answers[i] = curAns;
    }
    var ansObjs = [];
    for (var i = 0; i < number; i++) {
        var item = { 'ans-btn': answers[i] }
        ansObjs.push(item);
    }
    $('#answer-panel').render(ansObjs);
}

function endLeaving() {
    $('#kana-img').attr('src', `${hk}/${curAns}.png`)
        .removeClass('transitioning leaving')
        .addClass('entering')
        .one('load', beginEntering);
    $('#answer').addClass('transitioning');
}

function beginEntering() {
    $('#kana-img').removeClass('entering')
        .addClass('transitioning');
    $('#answer-panel').removeClass('invis');
    clearFeedback();
}

function clearFeedback() {
    $('#answer').removeClass('correct wrong')
        .addClass('transitioning');
}

$(document).ready(function () {
    nextKana();
});