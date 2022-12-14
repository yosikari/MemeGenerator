'use strict'

function getRandomId() {
    var id = ''
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);

    for (var i = 0; i < array.length; i++) {
        id += array[i]
    }
    return +id.slice(0, 5)
}