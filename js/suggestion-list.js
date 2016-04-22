module.exports = function (rq, data) {
    var lis = [],
        ul = document.createElement('ul');

    ul.className = 'suggestions';

    for (var i = 0, len = data.length; i < len; i++) {
        var pos = data[i].indexOf(rq);

        // Пропускаем, если профессия не подходит
        if ( pos === -1 ) continue;

        // Добавляем LI, если подходит
        lis[i] = ul.appendChild(document.createElement('li'));
        lis[i].setAttribute('data', data[i]);
        lis[i].insertAdjacentHTML('beforeEnd',
            data[i].substring(0, pos) + '<strong>' + rq + '</strong>' + data[i].substring(pos+rq.length));

        ul.appendChild(lis[i]);
    }

    return ul;
}