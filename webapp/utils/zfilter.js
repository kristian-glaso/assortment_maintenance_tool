function filterAssortment() {
    
    

    //free text search
    let freeText = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--searchFieldAssortment").getValue();
    
    let oTable = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--AssortmentTable");
    if (!oTable) {
        return;
    }

     //todo - combobox
    
    // Multiple Filters using OR
    var binding = oTable.getBinding("items");
    
    var filter = new sap.ui.model.Filter({
        filters: [
            new sap.ui.model.Filter("Asort", "Contains", freeText),
            new sap.ui.model.Filter("Name1", "Contains", freeText)
        ],
        and: false
    })
    binding.filter([filter]);


}