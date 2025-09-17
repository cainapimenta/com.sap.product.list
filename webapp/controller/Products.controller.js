sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel"
], (Controller, MessageToast, MessageBox, JSONModel, ODataModel) => {
    "use strict";

    return Controller.extend("com.alfa.products.list.controller.Products", {
        onInit() {

            const productList = this.byId('productListId');
            productList.setBusy(true);

            const oDataModel = new ODataModel('/V2/Northwind/Northwind.svc/');
            oDataModel.read('/Products', {
                success: (oProducts) => {
                    console.log(oProducts);

                    const aProducts = oProducts.results;
                    const model = new JSONModel(aProducts);
                    this.getView().setModel(model, "products");

                    productList.setBusy(false);
                },
                error: (ex) => {
                    productList.setBusy(false);

                    MessageBox.error(ex.message, {
                        title: "Erro na requisição"
                    });
                }
            });


            // // Simulando backend
            // // GET /frutas
            // const frutas = [
            //     {
            //         id: 1,
            //         name: "Banana",
            //         quantity: 20
            //     },
            //     {
            //         id: 2,
            //         name: "Maça",
            //         quantity: 18
            //     },
            //     {
            //         id: 2,
            //         name: "Kiwi",
            //         quantity: 2
            //     }
            // ];

            // const model = new JSONModel(frutas);
            // this.getView().setModel(model, 'frutas');
        },

        onPressListItem(oEvent) {
            const oSource = oEvent.getSource();
            const titleItem = oSource.getTitle();

            const oComponent = this.getOwnerComponent();
            const i18nModel = oComponent.getModel('i18n');
            const i18nBundle = i18nModel.getResourceBundle();
            const msg = i18nBundle.getText('messageOnClick', [titleItem])

            MessageToast.show(msg);
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