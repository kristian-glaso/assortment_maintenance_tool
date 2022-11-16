/* global masterData:true */
var masterData = "";
var filter = "";



//Define models 
modelAssortment = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/SAP/ZUI5_ASSORTMENT_SRV", {
    json: true,
    useBatch: false,
})



/* global zmasterdata:true */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],


    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */


    function (Controller, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("com.amt.assortmentmaintenancetool.controller.MainView", {
            onInit: function () {
                masterData = new cl_masterdata();
                masterData.read();

                filter = new cl_filter();
            },
            getComponent: function (name) {
                return sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--" + name);
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

                MessageToast.show("hei");

                this.getComponent("buttonDeleteAssortment").setEnabled(false);

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

                if (this.getComponent("AssortmentTable").getSelectedItems().length > 0) {
                    this.getComponent("buttonDeleteAssortment").setEnabled(true);
                }



                //Read data for depended tables
                this.filterListing();
                this.filterStores();
            },
            filterAssortment: function () {

                //free text search
                //let freeText = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--searchFieldAssortment").getValue();
                let sfilter;
                let filters = [];
                let comboBoxKna1 = this.getComponent("comboBoxKna1");
                let comboBoxAssordimval1 = this.getComponent("comboBoxAssordimval1");
                let searchFieldAssortment = this.getComponent("searchFieldAssortment");
                let table = this.getComponent("AssortmentTable");
                table.removeSelections();


                let binding = table.getBinding("items");
                if (!binding) {
                    return;
                }

                if (comboBoxKna1.getSelectedKeys().length > 0) {
                    for (let i = 0; i < comboBoxKna1.getSelectedKeys().length; i++) {
                        filters.push(new sap.ui.model.Filter("Locnr", "EQ", comboBoxKna1.getSelectedKeys()[i]));
                    }
                }

                if (comboBoxAssordimval1.getSelectedKeys().length > 0) {
                    for (let i = 0; i < comboBoxAssordimval1.getSelectedKeys().length; i++) {
                        filters.push(new sap.ui.model.Filter("Assordimval1", "EQ", comboBoxAssordimval1.getSelectedKeys()[i]));
                    }
                }

                if (searchFieldAssortment.getValue()) {
                    filters.push(new sap.ui.model.Filter("Asort", "Contains", searchFieldAssortment.getValue()));
                }

                binding.filter(filters);
                this.filterListing();
                this.filterStores();
            },
            filterListing: function () {
                let filters = [];

                let oTable = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--ListingTable");
                if (!oTable) {
                    return;
                }

                // Multiple Filters using OR
                var binding = oTable.getBinding("items");



                if (this.getComponent("AssortmentTable").getSelectedItems().length === 0) {
                    binding.filter([]);
                    return;
                }

                this.getComponent("AssortmentTable").getSelectedItems().forEach(function (selItem) {
                    filters.push(new sap.ui.model.Filter("Filia", "EQ", selItem.getBindingContext().getProperty().Asort));
                });

                var filter = new sap.ui.model.Filter({
                    filters: filters,
                    and: false
                })

                binding.filter(filter)

            },
            filterStores: function () {
                let filters = [];

                let oTable = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--StoresTable");
                if (!oTable) {
                    return;
                }

                // Multiple Filters using OR
                var binding = oTable.getBinding("items");



                if (this.getComponent("AssortmentTable").getSelectedItems().length === 0) {
                    binding.filter([]);
                    return;
                }

                this.getComponent("AssortmentTable").getSelectedItems().forEach(function (selItem) {
                    filters.push(new sap.ui.model.Filter("Asort", "EQ", selItem.getBindingContext().getProperty().Asort));
                });

                var filter = new sap.ui.model.Filter({
                    filters: filters,
                    and: false
                })

                binding.filter(filter)
            }
        });
    });







class cl_filter {

    constructor() {



    }
    getComponent(name) {

    }
    assortment() {

    }

    listing() {

    }

    stores() {



    }

}





class cl_masterdata {
    constructor() {

    }
    read() {



        return;

        ///sap/opu/odata/SAP/
        let modelMasterData = new sap.ui.model.odata.v2.ODataModel("ZUI5_ASSORTMENT_SRV", {
            json: true,
            useBatch: false,
        })

        let url = "/kna1Set"


        //  url = "/assortmentSet('" + asort + "')/listing"

        let parameters = [];

        modelMasterData.oData = []; //empty model

        modelMasterData.read(url, {
            urlParameters: parameters,
            success: function (oData) {
                let comboBox = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--comboBoxKna1")
                comboBox.destroyItems();

                oData.results.forEach(function (item) {
                    comboBox.addItem(new sap.ui.core.Item({ key: item.Kunnr, text: item.Kunnr + " " + item.Name1 }));
                });

            }.bind(this),
            error: function (oData) { console.log(oData); }

        });

        url = "/wrfst_dimvaltSet"
        modelMasterData.read(url, {
            urlParameters: parameters,
            success: function (oData) {
                let comboBox = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--comboBoxAssordimval1");
                let selectAssordimval1 = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--selectAssordimval1");
                comboBox.destroyItems();
                selectAssordimval1.destroyItems();

                oData.results.forEach(function (item) {

                    if (item.Assordim === '1') {
                        comboBox.addItem(new sap.ui.core.Item({ key: item.Assordimval, text: item.Assordimval + " " + item.Vtext }));

                        selectAssordimval1.addItem(new sap.ui.core.Item({ key: item.Assordimval, text: item.Assordimval + " " + item.Vtext }));
                    }

                });

            }.bind(this),
            error: function (oData) { console.log(oData); }

        });

    }
}







