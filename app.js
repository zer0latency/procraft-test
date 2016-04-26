require("reset.css");
require("./css/style.css");

(function (d, w) {
    // Зависимости
    var suggestionList    = require('./js/suggestion-list.js' ),
        countriesDropdown = require('./js/countries-dropdown.js');

    var inputProfession         = d.getElementById('profession')
        countriesDropdownButton = d.getElementById('countries-dropdown');

    // Подсказки профессий
    suggestionList(inputProfession, d);

    // Дропдаун с флажками
    countriesDropdown(countriesDropdownButton, d);
})(document, window);