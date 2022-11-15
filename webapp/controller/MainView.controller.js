
//Define models 
modelAssortment = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZUI5_ASSORTMENT_SRV", {
    json: true,
    useBatch: false,
})


modelMasterData = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZUI5_ASSORTMENT_SRV", {
    json: true,
    useBatch: false,
})




sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */


    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("com.amt.assortmentmaintenancetool.controller.MainView", {
            onInit: function () {
                //createListingTable();
                //createStoresTable();
                //renderPagination();
                readMasterData();

                getComponent("SettingsdialogAssortment").open()

            },
            pressAssortmentItem: function (event) {
                MessageToast.show(event.getSource().getBindingContext().getProperty().Asort + " was pressed");
                let asort = event.getSource().getBindingContext().getProperty().Asort;


                //clean up model (clear stores and listing)                
                let odata = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--StoresTable").getModel().oData;
                console.log("Size of model: " + Object.keys(odata).length)
                Object.keys(odata).forEach(function (object) {
                    if (object.includes("assortmentListingSet") || object.includes("storesSet")) {
                        //delete
                        delete odata[object];
                    }

                });
                console.log("Size of model: " + Object.keys(odata).length)
                filterListing();
                filterStores();
            },
            assortmentSelectionChange: function () {

                getComponent("buttonDeleteAssortment").setEnabled(false);

                //clean up model (clear stores and listing)                
                let odata = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--StoresTable").getModel().oData;
                console.log("Size of model: " + Object.keys(odata).length)
                Object.keys(odata).forEach(function (object) {
                    if (object.includes("assortmentListingSet") || object.includes("storesSet")) {
                        //delete
                        delete odata[object];
                    }

                });
                console.log("Size of model: " + Object.keys(odata).length)


                //Set selected assortments in global data
                let selectedItems = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--AssortmentTable").getSelectedItems();

                if (getComponent("AssortmentTable").getSelectedItems().length > 0) {
                    getComponent("buttonDeleteAssortment").setEnabled(true);
                }



                //Read data for depended tables
                filterListing();
                filterStores();


            }

        });


    });








