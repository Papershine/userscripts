// ==UserScript==
// @name        FITAN
// @namespace   https://github.com/paper1111/userscripts
// @version     0.1
// @description Script to feedback instantly to Natty
// @include     https://chat.stackoverflow.com/rooms/111347/sobotics
// @downloadURL https://github.com/SOBotics/Userscripts/blob/master/Natty/NattyReporter.user.js
// @author      paper1111
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
