// ==UserScript==
// @name        FITAN
// @namespace   https://github.com/paper1111/userscripts
// @version     0.2
// @description Script to feedback instantly to Natty
// @include     https://chat.stackoverflow.com/rooms/111347/sobotics
// @grant       GM.xmlHttpRequest
// @grant       GM_xmlhttpRequest
// @author      paper1111
// @require     https://greasemonkey.github.io/gm4-polyfill/gm4-polyfill.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @downloadURL https://github.com/paper1111/userscripts/blob/master/fitan.user.js
// ==/UserScript==

function FITAN() {
    const ready = CHAT.Hub.roomReady;
    CHAT.Hub.roomReady = {
        fire: function(...args) {
            ready.fire(...args);

            function eventHandler(event) {
                if(event.room_id !== CHAT.CURRENT_ROOM_ID || event.event_type !== 1 || event.user_id !== 6817005) 
                    return;

                const content = document.createElement('div');
                content.innerHTML = event.content;

                if(!/^\[ Natty/.test(content.textContent.trim())) 
                    return;

                function send(message) {
                    $.ajax({
                        'type': 'POST',
                        'url': `/chats/${CHAT.CURRENT_ROOM_ID}/messages/new`,
                        'data': fkey({text: message}),
                        'dataType': 'json'
                    });
                }

                function clickHandler(message) {
                    return function(event) {
                        event.preventDefault();

                        // TODO: Add popup
                    };
                }

                function createLink(message) {
                    const node = document.createElement('a');
                    node.href = "#";
                    node.textContent = message;
                    node.addEventListener('click', clickHandler(`:${event.message_id} ${message}`), false);
                    return node;
                }

                setTimeout(() => {
                    const message = document.querySelector(`#message-${event.message_id} .content`);

                    const wrap = document.createElement('span');
                    wrap.appendChild(document.createTextNode(' [ '));
                    wrap.appendChild(createLink('🐶'));
                    wrap.appendChild(document.createTextNode(' ] '));
                    message.insertBefore(wrap, message.firstChild);
                }, 0);
            }

            function handleLoadedEvents(handler) {
                [...(document.querySelectorAll('.user-container') || [])].forEach(container => {
                    [...(container.querySelectorAll('.message') || [])].forEach(message => handler({
                        room_id: CHAT.CURRENT_ROOM_ID,
                        event_type: 1,
                        user_id: +(container.className.match(/user-(\d+)/) || [])[1],
                        message_id: +(message.id.match(/message-(\d+)/) || [])[1],
                        content: message.querySelector('.content').innerHTML
                    }));
                });
            }
            
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = `
            .fitan-modal { display: none; 
                position: fixed; 
                z-index: 1; 
                left: 0; 
                top: 0; 
                width: 100%; 
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.4);
            }
            .fitan-modal-content {
                background-color: #fff;
                margin: 15% auto;
                padding: 20px;
                width: 80%;
            }
            .close {
                background-color: #1e90ff;
                color: #fff;
                float: right;
                font-size: 28px;
                font-weight: bold;
            }
            .tp {
                color: #fff;
                background-color: #adff2f
                font-size: 28px;
            }
            `;
            document.body.appendChild(css);
            CHAT.addEventHandlerHook(eventHandler);
            handleLoadedEvents(eventHandler);
        }
    };
}

const script = document.createElement('script');
script.textContent = `(${ FITAN.toString() })();`;
console.log(script.textContent);
document.body.appendChild(script);
