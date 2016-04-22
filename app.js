require("./css/style.css");
require("lodash");

(function (d, w) {
    // Зависимости
    var professions          = require('./storage/professions.js'),
        renderSuggestionList = require('./js/suggestion-list.js');

    var suggestionList,
        inputProfession = d.getElementById('profession');

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
})(document, window);