var renderSuggestionList = function (rq, data) {
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
};

module.exports = function (inputElement, d) {
    var professions = require('../storage/professions.js'),
        suggestionList,
        prevValue = '';

    inputElement.addEventListener('keyup', function () {
        if (inputElement.value === prevValue) {
            return true;
        }
        prevValue = inputElement.value;
        suggestionList && this.parentNode.removeChild(suggestionList);
        suggestionList = renderSuggestionList(inputElement.value, professions.fetch());
        suggestionList = this.parentNode.appendChild(suggestionList);

        suggestionList.addEventListener('click', function (e) {
            var target = e.target;

            if (target.localName === 'strong') {
                target = target.parentNode;
            }

            inputElement.value = target.getAttribute('data');

            suggestionList.parentNode.removeChild(suggestionList);
            suggestionList = undefined;
        });
    });
};