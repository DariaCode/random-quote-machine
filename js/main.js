

var currentQuote = '';
var currentAuthor = '';
let quotesData;
var colors = ['#008BEB', '#674891', '#008A8C', '#BC52AF', '#665496'];
var chamColorsHead = ['#57F565', '#FF7F5B', '#FFA6FF', '#93BCFF', '#0BE8C0'];
var chamColorsBody1 = ['#00C336', '#FF5F41', '#E10BE8', '#719FFF', '#00CFD5'];
var chamColorsBody2 = ['#009300', '#FF3E28', '#A000AB', '#4A84FF', '#00B3DE'];
var chamColorsBody3 = ['#006500', '#E80B0D', '#600071', '#0B6AE8', '#0094D6'];

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function openURL(url) {
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getQuotes() {
    return $.ajax({
        headers: {
            Accept: "application/json"
        },
        url: 'https://gist.githubusercontent.com/DariaCode/56e597d391258733ff1a9699c06140c7/raw/14999f3110ab85e9d9af857a281a5163a02f573e/quotes.json',
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === 'string') {
                quotesData = JSON.parse(jsonQuotes);
            }
        }
    });
}


function getRandomQuote() {
    return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

function getQuote() {
    let randomQuote = getRandomQuote();

    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;
    $('#text').text(randomQuote.quote);
    $('#author').text(randomQuote.author);
    var color = Math.floor(Math.random() * colors.length);
    $("html body").css({
        backgroundColor: colors[color],
        color: colors[color]
    });
    $(".button").css({
        backgroundColor: colors[color]
    });
    $(".cham-head").css({
        backgroundColor: chamColorsHead[color]
    });
    $(".cham-body-1").css({
        backgroundColor: chamColorsBody1[color]
    });
    $(".cham-body-2").css({
        backgroundColor: chamColorsBody2[color]
    });
    $(".cham-body-3").css({
        backgroundColor: chamColorsBody3[color]
    });

    if (inIframe()) {
        $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));

        $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
    }


}

$(document).ready(function () {
    getQuotes().then(() => {
        getQuote();
    });
    $('#new-quote').on('click', getQuote);

    $('#tweet-quote').on('click', function () {
        if (!inIframe()) {
            openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        }
    });

    $('#tumblr-quote').on('click', function () {
        if (!inIframe()) {
            openURL('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' + encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
        }
    });
});