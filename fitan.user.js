// ==UserScript==
// @name        FITAN
// @namespace   tag:hilarylau12342@gmail.com,2017-11-19:fitan
// @description Script to feedback instantly to Natty
// @include     https://chat.stackoverflow.com/rooms/111347/sobotics
// ==/UserScript==

var nattyMsg = document.querySelectAll('.user-container,.user-6817005,.monolouge');
[].forEach.call(nodeList, function(msgs) {
    if(msgs.className.indexOf('messages') > -1 && msgs.nodeName == 'div') {
        [].forEach.call(nodeList.childNodes, function(msg) {
            if(msg.className.indexOf('message') > -1 && msg.nodeName == 'div') {
                [].forEach.call(msg.childNodes, function(content) {
                    if(content.className.indexOf('content') > -1 && msg.nodeName == 'div') {
                        var dogElm = document.createElement('a');
                        dogElm.appendChild(document.createTextNode('🐶'));
                        content.parentNode.insertBefore(dogElm, content);
                    }
                });
            }
        });
    }
});
