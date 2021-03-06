module.exports = function (button, d) {
    var countries = require('../storage/countries.js'),
        currentDropdown;

    button.addEventListener('click', function (e) {
        if (currentDropdown) {
            currentDropdown.parentNode.removeChild(currentDropdown);
            currentDropdown = undefined;
            return;
        }

        var formGroup      = this.parentNode.parentNode,
            cddList        = d.createElement('ul'),
            countriesData  = countries.fetch(),
            countryDisplay = d.getElementById('country-display')
            phoneInput     = d.getElementById('phone');

        cddList.className = "countries-dropdown-list";

        for(var i = 0, keys = Object.keys(countriesData); i < keys.length; i++) {
            var country = countriesData[keys[i]],
                newLi   = d.createElement('li');
                liHtml  = '<span class="country-display" style="background-position: 0px ' + country.sprite_offset + 'px;"></span>';

            newLi.insertAdjacentHTML('beforeEnd', liHtml);
            newLi.addEventListener('click', (function (country) {
                return function () {
                    countryDisplay.style.backgroundPosition = "0px " + country.sprite_offset + "px";
                    phoneInput.value = country.code;
                    formGroup.removeChild(cddList);
                    currentDropdown = undefined;
                };
            })(country));
            cddList.appendChild(newLi);
        }
        formGroup.appendChild(cddList);
        currentDropdown = cddList;
    });
}