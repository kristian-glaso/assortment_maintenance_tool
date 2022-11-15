function filterAssortment() {

    //free text search
    //let freeText = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--searchFieldAssortment").getValue();
    let sfilter;
    let filters = [];
    let comboBoxKna1 = getComponent("comboBoxKna1");
    let comboBoxAssordimval1 = getComponent("comboBoxAssordimval1");
    let searchFieldAssortment = getComponent("searchFieldAssortment");
    let table = getComponent("AssortmentTable");
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
    filterListing();
    filterStores();

}


function filterListing() {

    let filters = [];



    oTable = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--ListingTable");
    if (!oTable) {
        return;
    }

    // Multiple Filters using OR
    var binding = oTable.getBinding("items");



    if (getComponent("AssortmentTable").getSelectedItems().length === 0) {
        binding.filter([]);
        return;
    }

    getComponent("AssortmentTable").getSelectedItems().forEach(function (selItem) {
        filters.push(new sap.ui.model.Filter("Filia", "EQ", selItem.getBindingContext().getProperty().Asort));
    });

    var filter = new sap.ui.model.Filter({
        filters: filters,
        and: false
    })

    binding.filter(filter)

}

function filterStores() {


    let filters = [];



    oTable = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--StoresTable");
    if (!oTable) {
        return;
    }

    // Multiple Filters using OR
    var binding = oTable.getBinding("items");



    if (getComponent("AssortmentTable").getSelectedItems().length === 0) {
        binding.filter([]);
        return;
    }

    getComponent("AssortmentTable").getSelectedItems().forEach(function (selItem) {
        filters.push(new sap.ui.model.Filter("Asort", "EQ", selItem.getBindingContext().getProperty().Asort));
    });

    var filter = new sap.ui.model.Filter({
        filters: filters,
        and: false
    })

    binding.filter(filter)


}