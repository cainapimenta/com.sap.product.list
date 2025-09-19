sap.ui.define([

], () => {
    "use strict";

    return {
        toUpperCase(sText, sPrice) {
            if (!sText) {
                return sText;
            }

            return `${sText.toUpperCase()} - R$ ${sPrice}`;
        },
        multiply(num) {
            if (!num) {
                return num;
            }

            return num;
        },

        priceStatus(sUnitPrice) {
            if (!sUnitPrice) {
                return sUnitPrice;
            }

            const nUnitPrice = Number(sUnitPrice);

            if (sUnitPrice <= 20) {
                return "Success";
            }
            else if (nUnitPrice > 20 && nUnitPrice < 50) {
                return "Warning"
            } else {
                return "Error";
            }
        }
    }
})