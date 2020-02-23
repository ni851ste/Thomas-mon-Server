const HOME = 'home';
const GAME = 'game';
const JARONTHEKID = 'jaronthekid';
const GAMEPICKER = 'gamepicker';
const TEST = 'test';

let websocket;

$(document).ready(function () {
    $('#top-nav-home').click(function () {
            websocket.send(HOME);
            topNavChangeActiveElement($(this));
        }
    );
    $('#top-nav-game').click(function () {
            websocket.send(GAME);
            topNavChangeActiveElement($(this));
            renderGamePage();
        }
    );
    $('#top-nav-jtk').click(function () {
            websocket.send(JARONTHEKID);
            topNavChangeActiveElement($(this));
        }
    );
    $('#top-nav-tgs').click(function () {
            websocket.send(GAMEPICKER);
            topNavChangeActiveElement($(this));
        }
    );
    $('#top-nav-test').click(function () {
            websocket.send(TEST);
            topNavChangeActiveElement($(this));
            appendAnotherChrishurt()
        }
    );
    console.log('Try to connect to websocket.');
    connectWebSocket();
});

function topNavChangeActiveElement(newActive) {
    $('.active').removeClass('active');
    newActive.addClass('active');
}

function renderGamePage() {
    $('#side-content').remove();
    $('#centered-scrollable-content')
        .empty()
        .css({'width': '960px'})
        .append(
            $('<div/>', {'class': 'scrollable-content'})
                .append(
                    $('<p>', {'text': 'GAME HEADER'})
                )
        ).append(
        $('<div/>', {'class': 'scrollable-content'})
            .append(
                $('<p>', {'text': 'GAME HEADER'})
            )
    );
}

function appendAnotherChrishurt() {
    console.log('Append Chrishurt');
    $('.side-content-block')
        .append(
            $('<img/>', {'src': '/assets/images/chrischi_gobnik.png', 'alt': 'Chrishi'})
        );
}

function handleMessage(json) {
    switch (String(json.controllerState)) {
        case "MOVE":
            break;

        default:
            alert("Unknown game status: " + String(json.board.state))
    }
}

function connectWebSocket() {
    websocket = new WebSocket('ws://localhost:9000/websocket');

    websocket.onopen = function (event) {
        //updateInfoText();
        //websocket.send('Websocket on open message. Hello there General Kenobi');
        console.log('Connected to Websocket');
    };

    websocket.onclose = function (event) {
        //alert
        console.log('Websocket closed!');
    };

    websocket.onerror = function (error) {
        console.log('Error in Websocket Occurred: ' + error);
    };

    websocket.onmessage = function (e) {
        if (typeof e.data === 'string') {
            console.log('MESSAGE: ' + e.data);
            //handleMessage(JSON.parse(e.data));
        }
    };
}