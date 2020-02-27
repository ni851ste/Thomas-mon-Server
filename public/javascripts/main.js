const HOME = 'home';
const GAME = 'game';
const JARONTHEKID = 'jaronthekid';
const GAMEPICKER = 'gamepicker';
const TEST = 'test';
const ADD_CHR = 'addChr';
const RM_CHR = 'rmChr';

let websocket;
let currentPage;

$(document).ready(function () {
    $('#top-nav-home').click(function () {
            websocket.send(HOME);
            topNavChangeActiveElement($(this));
            unRenderCurrentPage();
            renderHomePage();
        }
    );
    $('#top-nav-game').click(function () {
            websocket.send(GAME);
            topNavChangeActiveElement($(this));
            unRenderCurrentPage();
            renderGamePage();
        }
    );
    /*
    $('#top-nav-jtk').click(function () {
            websocket.send(JARONTHEKID);
            topNavChangeActiveElement($(this));
        }
    );
     */
    $('#top-nav-tgs').click(function () {
            websocket.send(GAMEPICKER);
            topNavChangeActiveElement($(this));
            unRenderCurrentPage();
            renderTgsGamePickerPage();
        }
    );
    renderHomePage();
    console.log('Try to connect to websocket.');
    connectWebSocket();
});

function topNavChangeActiveElement(newActive) {
    $('.active').removeClass('active');
    newActive.addClass('active');
}

function renderHomePage() {
    currentPage = 'home';
    $('#centered-scrollable-content')
        .append($('<div/>', {'class': 'scrollable-content'})
            .append($('<h1>').text('Home'))
            .append($('<h2>').text('Welcome to JaronTheKids grave after TGS 1!'))
            .append($('<p>').append($('<b>').text('Subscribe to Jaron the Kid!')))
            .append($('<p>').append($('<a>', {
                'href': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'target': '_blank'
            })
                .text('EZ Clap')))
            .append($('<p>').append($('<a>',
                {
                    'href': 'https://docs.google.com/spreadsheets/d/1iYtbbdUjsZiCCtWr0G4_1lI8AxB-6bfLSVwn7rvgUsQ/edit#gid=0',
                    'target': '_blank'
                })
                .text('The Grand Slam'))))
        .append($('<div>', {'class': 'scrollable-content'})
            .append($('<h1>').text('1'))
            .append($('<p>').text(content))
        )
        .append($('<div>', {'class': 'scrollable-content'})
            .append($('<h1>').text('2'))
            .append($('<p>').text(content))
        )
        .append($('<div>', {'class': 'scrollable-content'})
            .append($('<h1>').text('3'))
            .append($('<p>').text(content))
        )
        .append($('<div>', {'class': 'scrollable-content'})
            .append($('<h1>').text('4'))
            .append($('<p>').text(content))
        );

    $('#side-content')
        .append($('<div>', {'class': 'side-content-block'})
            .append($('<p>').text('This is the side content'))
            .append($('<p>')
                .append($('<button>', {'type': 'button', 'id': 'add-chr-btn'})
                    .text('ADD CHRISHURT')
                    .click(function () {
                        websocket.send(ADD_CHR);
                        appendAnotherChrishurt()
                    })))
            .append($('<img>', {'src': '/assets/images/chrischi_gobnik.png', 'alt': 'Chrishi'}))
        );
}

function renderGamePage() {
    currentPage = 'game';
    $('#side-content').remove();
    $('#centered-scrollable-content')
        .empty()
        .css({'width': '960px'})
        .append(
            $('<div/>', {'class': 'scrollable-content'})
                .append($('<h1>', {'text': 'GAME HEADER'})
                )
        );
}

function renderTgsGamePickerPage() {
    currentPage = 'tgs-game-picker';
    $('#side-content').remove();
    $('#centered-scrollable-content')
        .empty()
        .css({'width': '960px'})
        .append($('<div/>', {'class': 'scrollable-content'})
            .append($('<h1>', {'text': 'TGS Game Picker'}))
            .append($('<div>', {'id': 'tgs-frame'})
                .append($('<p>').text('BUTTONS HERE'))
                .append($('<div>', {'id': 'tgs-game-picker-frame'})
                    .append($('<div>', {'id': 'tgs-game-left'})
                        .append($('<h2>').text('left'))
                        .append($('<div>', { 'id': 'test-game1', 'class': 'random-game'}).text('TEST GAME 1'))
                        .append($('<div>', { 'id': 'test-game2', 'class': 'random-game'}).text('TEST GAME 2'))
                        .append($('<div>', { 'id': 'test-game3', 'class': 'random-game'}).text('TEST GAME 3'))
                        .append($('<div>', { 'id': 'test-game4', 'class': 'random-game'}).text('TEST GAME 4'))

                    )
                    .append($('<div>', {'id': 'tgs-game-middle'}).text('middle'))
                    .append($('<div>', {'id': 'tgs-game-right'}).text('right'))
                ))
        );
}

function unRenderCurrentPage() {
    console.log('Unrendered page: ' + currentPage);
    switch (currentPage) {
        case "home":
            unRenderHomePage();
            break;
        case "game":
            unRenderGamePage();
            break;
        case "tgs-game-picker":
            unRenderTgsGamePickerPage();
            break;
    }
}

function unRenderHomePage() {
    $('#centered-scrollable-content').empty();
    $('#side-content').empty();
}

function unRenderGamePage() {
    $('#centered-scrollable-content')
        .removeAttr('style')
        .empty();
    $('#centered-content').append(
        $('<div/>', {'id': 'side-content'})
    );
}

function unRenderTgsGamePickerPage() {
    $('#centered-scrollable-content')
        .removeAttr('style')
        .empty();
    $('#centered-content').append(
        $('<div/>', {'id': 'side-content'})
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


const content = 'This is a post content';