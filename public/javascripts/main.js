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
    /*
    $('#top-nav-game').click(function () {
            websocket.send(GAME);
            topNavChangeActiveElement($(this));
            unRenderCurrentPage();
            renderGamePage();
        }
    );
     */
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
                .append($('<button>', {'type': 'button', 'id': 'add-chr-btn', 'class': 'own-button-big'})
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
    $('#centered-scrollable-content').remove();
    $('#centered-content')
        .empty()
        .append($('<div>', {'id': 'tgs-game-picker'})
            .append($('<h1>', {'text': 'TGS Game Picker'}))
            .append($('<div>', {'id': 'tgs-frame'})
                .append($('<div>', {'id': 'tgs-game-picker-frame'})
                    .append($('<div>', {'id': 'tgs-game-left'})
                        .append($('<h1>').text('left'))
                        .append($('<input>',
                            {'id': 'tgs-add-game-field', 'type': 'text', 'placeholder': 'Add Game Here'}))
                        .append($('<button>', {'id': 'tgs-add-game-button', 'class': 'own-button'})
                            .text('Add Game')
                            .click(function () {
                                tgsAddRandomGameFromTextField();
                            })))
                    .append($('<div>', {'id': 'tgs-game-middle'})
                        .append($('<button>', {'id': 'tgs-roll-games', 'class': 'own-button-big'})
                            .text('Roll')
                            .click(function () {
                                tgsRollRandomGames();
                            }))
                        .append($('<div>', {'id': 'tgs-random-game-counter-div'})
                            .append($('<button>', {'id': 'tgs-random-game-minus', 'class': 'own-button'})
                                .text('-')
                                .click(function () {
                                    tgsRollRandomGameCountMinus();
                                }))
                            .append($('<div>', {'id': 'tgs-random-game-counter'}).text('1'))
                            .append($('<button>', {'id': 'tgs-random-game-plus', 'class': 'own-button'})
                                .text('+')
                                .click(function () {
                                    tgsRollRandomGameCountPlus();
                                }))
                        ))
                    .append($('<div>', {'id': 'tgs-game-right'})
                        .append($('<h1>').text('right')))
                )
            ));

    tgsAddGameToLeftPage('TEST GAME 1');
    tgsAddGameToLeftPage('TEST GAME 2');
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
    $('#tgs-game-picker').remove();
    $('#centered-content').append(
        $('<div>', {'id': 'centered-scrollable-content'})).append(
        $('<div/>', {'id': 'side-content'})
    );
}

function topNavChangeActiveElement(newActive) {
    $('.active').removeClass('active');
    newActive.addClass('active');
}

function appendAnotherChrishurt() {
    console.log('Append Chrishurt');
    $('.side-content-block')
        .append(
            $('<img/>', {'src': '/assets/images/chrischi_gobnik.png', 'alt': 'Chrishi'})
        );
}

function tgsRollRandomGameCountPlus() {
    let currentElement = $('#tgs-random-game-counter');
    let counter = parseInt(currentElement.text());
    if (counter < 15) {
        currentElement.text(++counter);
    }
}

function tgsRollRandomGameCountMinus() {
    let currentElement = $('#tgs-random-game-counter');
    let counter = parseInt(currentElement.text());
    if (counter > 1) {
        currentElement.text(--counter);
    }
}

function tgsAddRandomGameFromTextField() {
    let currentEle = $('#tgs-add-game-field');
    let value = currentEle.val();
    tgsAddGameToLeftPage(value);
    currentEle.val('');
}

function tgsAddGameToLeftPage(value) {
    if (value) {
        $('#tgs-game-left').append($('<div>', {'class': 'random-game'}).text(value));
    }
}

function tgsAddGameToRightPage(value) {
    if (value) {
        $('#tgs-game-right').append($('<div>', {'class': 'rolled-game'}).text(value));
    }
}

function tgsRollRandomGames() {
    let counter = parseInt($('#tgs-random-game-counter').text());
    let randomGames = $('.random-game');

    if (counter <= randomGames.length) {
        for (let i = 0; i < counter; i++) {
            console.log(randomGames[i]);

            let usedElement = randomGames[i];
            tgsAddGameToRightPage($(usedElement).text());
            usedElement.remove();
        }


    }
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
        //alert('Websocket closed!');
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