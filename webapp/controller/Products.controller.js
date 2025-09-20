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
        },

        onPressListItem(oEvent) {
            const oSource = oEvent.getSource();
            const oContext = oSource.getBindingContext();
            const productId = oContext.getProperty("ProductID");

            this.navTo('RouteProductDetail', {
                productId: productId
            });
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
        },

        i18nText(sKey, aText) {
            const component = this.getOwnerComponent();
            const i18nModel = component.getModel("i18n");
            const i18nBundle = i18nModel.getResourceBundle();
            const messageOnClick = i18nBundle.getText(sKey, aText);

            return messageOnClick;
        },
        navTo(route, params) {
            const oComponent = this.getOwnerComponent();
            const oRouter = oComponent.getRouter();

            oRouter.navTo(route, params);
        }
    });
});