//Define pagination
globalPagination = {}

//Define models 
modelListing = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZUI5_ASSORTMENT_SRV", {
    json: true,
    useBatch: false,
})

modelStores = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZUI5_ASSORTMENT_SRV", {
    json: true,
    useBatch: false,
})



sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */


    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("com.amt.assortmentmaintenancetool.controller.MainView", {
            onInit: function () {
                createListingTable();
                createStoresTable();
                renderPagination();

            },
            pressAssortmentItem: function (event) {
                MessageToast.show(event.getSource().getBindingContext().getProperty().Asort + " was pressed");
                let asort = event.getSource().getBindingContext().getProperty().Asort;
                
                readListing(event.getSource().getBindingContext().getProperty());
                readStores(asort);

            },

        });


    });


function refreshAssortment(params) {

    var table = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--AssortmentTable")
    if (table) {
        table.getModel().refresh()
    }

}






