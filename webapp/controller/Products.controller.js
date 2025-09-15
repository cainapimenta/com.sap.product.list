sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, MessageBox, JSONModel) => {
    "use strict";

    return Controller.extend("com.alfa.products.list.controller.Products", {
        onInit() {
            // Simulando backend
            // GET /frutas
            const frutas = [
                {
                    id: 1,
                    name: "Banana",
                    quantity: 20
                },
                {
                    id: 2,
                    name: "Maça",
                    quantity: 18
                },
                {
                    id: 2,
                    name: "Kiwi",
                    quantity: 2
                }
            ];

            const model = new JSONModel(frutas);
            this.getView().setModel(model, 'frutas');
        },

        onPressListItem() {
            MessageToast.show('teste');
        },
        onPressErrorListItem() {
            MessageBox.error('Erro, você precisa revisar.',
                {
                    title: 'Erro no produto'
                }
            )
        }
    });
});