const ROLL = "r";
const QUIT = "q";
const END_TURN = "e";
const GET_JSON = "json";

let websocket;

$(document).ready(function () {
    console.log("Try to connect to websocket.")
    connectWebSocket();
});

function update(parse) {

}

function connectWebSocket() {
    websocket = new WebSocket("ws://localhost:9000/websocket");

    websocket.onopen = function (event) {
        //updateInfoText();
        websocket.send("Websocket on open message. Hello there General Kenobi");
        console.log("Connected to Websocket");
    };

    websocket.onclose = function (event) {
        //alert
        console.log("Websocket closed!");
    };

    websocket.onerror = function (error) {
        console.log('Error in Websocket Occurred: ' + error);
    };

    websocket.onmessage = function (e) {
        if (typeof e.data === "string") {
            //update(JSON.parse(e.data));
            console.log("MESSAGE: " + e.data);
        }
    };
}