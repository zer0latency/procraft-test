require("lodash");
require("./css/style.css");

(function (d, w) {
    // Зависимости
    var professions          = require('./storage/professions.js'),
        countries            = require('./storage/countries.js'  ),
        renderSuggestionList = require('./js/suggestion-list.js' );

    var suggestionList,
        inputProfession = d.getElementById('profession');

    // Автодополнение профессий
    inputProfession.addEventListener('keyup', _.debounce(function () {
        suggestionList && this.parentNode.removeChild(suggestionList);
        suggestionList = renderSuggestionList(inputProfession.value, professions.fetch());
        suggestionList = this.parentNode.appendChild(suggestionList);

        suggestionList.addEventListener('click', function (e) {
            var target = e.target;

            if (target.localName === 'strong') {
                target = target.parentNode;
            }

            inputProfession.value = target.getAttribute('data');

            suggestionList.parentNode.removeChild(suggestionList);
            suggestionList = undefined;
        });
    }, 100));

    // Выбор страны

})(document, window);