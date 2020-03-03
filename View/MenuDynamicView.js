class MenuDynamicView {
    constructor() {
        this.root = $('#rootMenu')[0];
        this.card = $.parseHTML("<div>hello</div>");
    }

    createElement(tag, text, classes) {
        const newElem = $(tag, {text: text});
        return newElem;
    }

    append(element) {
       element.appendTo(this.root);
    }

    // Method that creates a box with the information of a single menu item
    createItemCard(id, name, category, beverageType, volumeMl, alcoholStrength, organic, glutenFree, lactoseFree, kosher, red, white, priceWithVat) {
        
    }
}