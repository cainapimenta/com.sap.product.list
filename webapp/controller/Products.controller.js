sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/alfa/products/list/model/formatter"
], (Controller, MessageToast, MessageBox, JSONModel, ODataModel, Filter, FilterOperator, formatter) => {
    "use strict";

    return Controller.extend("com.alfa.products.list.controller.Products", {
        formatter: formatter,

        onInit() {

            // const productList = this.byId('productListId');
            // productList.setBusy(true);

            // const oDataModel = new ODataModel('/V2/Northwind/Northwind.svc/');
            // oDataModel.read('/Products', {
            //     success: (oProducts) => {

            //         const aProducts = oProducts.results;
            //         const model = new JSONModel(aProducts);
            //         this.getView().setModel(model, "products");

            //         productList.setBusy(false);
            //     },
            //     error: (ex) => {
            //         productList.setBusy(false);

            //         MessageBox.error(ex.message, {
            //             title: "Erro na requisição"
            //         });
            //     }
            // });
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
        },
        onSearch(oEvent) {
            const aFilters = [];
            
            const oSource = oEvent.getSource();
            const value = oSource.getValue();

            if (value) {
                const productNameFilter = new Filter({
                    path: "ProductName",
                    operator: FilterOperator.Contains,
                    value1: value
                });

                aFilters.push(productNameFilter);
            }

            const productList = this.byId('productListId');
            const bindItems = productList.getBinding('items');
            bindItems.filter(aFilters);
        }
    });
});