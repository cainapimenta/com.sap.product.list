sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
], (Controller, History, JSONModel) => {
    "use strict";

    return Controller.extend("com.alfa.products.list.controller.ProductDetail", {

        onInit() {
            const oComponent = this.getOwnerComponent();
            const oRouter = oComponent.getRouter();
            
            const oRouteDetail = oRouter.getRoute("RouteProductDetail");
            oRouteDetail.attachPatternMatched(this.onObjectMatched, this);
        },

        onObjectMatched(oEvent) {
            const oArgs = oEvent.getParameter("arguments");
            const sProductId = oArgs.productId;

            if(!sProductId) {
                console.log('error');
            }

            const oProductModel = new JSONModel({
                ProductID: sProductId
            });
            
            this.getView().setModel(oProductModel, "detail");
        },

        navBack() {
            const oHistory = History.getInstance();
            const sPreviusHash = oHistory.getPreviousHash();

            if (sPreviusHash !== undefined) {
                window.history.go(-1);
            } else {
                const oComponent = this.getOwnerComponent();
                const oRouter = oComponent.getRouter();

                oRouter.navTo("RouteProducts");
            }
        }
    });
});