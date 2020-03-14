/**
 * This file contains the View class for the menu. It will be responsible for creating html elements in the Menu.html file.
 * It is not ideal, but each html block of elements will be defined as a string. In the string there will be some inline js to fill * in the data.
 * @file MenuDynamicView.js
 * @author Alessandra
 */
class MenuDynamicView {
    constructor() {
        this.root = $('#rootMenu')[0];
    }

    /**
     * Creates a card, starting from a template in the form of a string
     * 
     * @param {MenuItemClass} m an instance of the MenuItemClass class. I use the getters defined in the class to access all the
     * attributes I need in this function to build the template for the card
     * @returns {String} a string with the newly populated card
     */
    createItemCard(m) {
        let cardTemplate = `
            <div id="${m._getId()}" class="menu-card">
                <div class="menu-card-content">
                    <div class="menu-card-title">
                        <h3 id=card-title>${m._getName()}</h3>
                    </div>
                    <div class="menu-card-category">
                        <h4 id="card-category">${m._getCategory()}</h4>
                    </div>
                    <div class="menu-card-strength"><span id="card-strength">${m._getAlcoholStrength()}%</span></div>
                    <div class="menu-card-allergies">`;

        // If the product has specific characteristics, a string with an unordered list + list items will be concatenated to the cardTemplate one
        if (m._getSpecialProperties().length > 0) {
            let allergies = m._getSpecialProperties();
            let allergyString = `<ul class="menu-special-list">`

            allergies.forEach(a => {
                switch (a) {
                    case "o":
                        allergyString += `<li class="menu-special-item"><img src="/Images/Organic-512.png" alt="organic"></li>`;
                        break;

                    case "g":
                        allergyString += `<li class="menu-special-item"><img src="/Images/Gluten_free-512.png" alt="gluten free"></li>`;
                        break;

                    case "l":
                        allergyString += `<li class="menu-special-item"><img src="/Images/Dairy_free-512.png" alt="lactose free"></li>`;
                        break;

                    // case "k":
                    //     allergyString += `<li class="menu-special-item"><img src="/Images/Dairy_free-512.png" alt="lactose free"></li>`;
                    //     break;
                }
            });

            allergyString += `</ul></div>`;
            cardTemplate += allergyString;
        }

        cardTemplate += `
                    <div class="menu-card-volume"><p>${m._getVolumeMl()}ml</p></div>
                    <div class="menu-card-price"><p>${m._getPriceWithVat()}:-</p></div>
                    <div class="menu-card-type"><p>${m._getBeverageType()}</p></div>
                </div>
            </div>`

        return cardTemplate;

    }

    // Utility View methods
    // loadHtml(fileName) {
    //     $.get(fileName, html => {
    //         return html;
    //     });
    // }

    // htmlToElements(html) {
    //     var template = document.createElement('template');
    //     template.innerHTML = html;
    //     return template.content.childNodes;
    // }

    // createElement(tag, text, classes) {
    //     const newElem = $(tag, { text: text });
    //     return newElem;
    // }

    /**
     * Appends new element in the #menuRoot div
     * @param {String} element string containing the html of the DOM element to be inserted in the #menuRoot div
     */
    append(element) {
        $(this.root).append(element)
    }
}

export default MenuDynamicView;