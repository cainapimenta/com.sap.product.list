sap.ui.define([

],  () => {
    "use strict";

    return {
        toUpperCase(sText, sPrice) {
            if(!sText) {
                return sText;
            }

            return `${sText.toUpperCase()} - R$ ${sPrice}`;
        },
        multiply(num) {
            if(!num) {
                return num;
            }

            return num;
        }
    }
})