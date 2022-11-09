function createListingTable() {

    //create table 
    let oTable = new sap.m.Table("ListingTable", {
        headerText: "",
        fixedLayout: false,
        //growing: true,
        //growingScrollToLoad: true,
        //growingThreshold: 20
    });


    //Create toolbar 
    let oToolbar = new sap.m.OverflowToolbar("ListingToolbar", {

    });

    oToolbar.addContent(new sap.m.ObjectNumber("ObjectNumberArticlesCount", { number: 0, unit: "artikler" }))
   
   
    



    oTable.setHeaderToolbar(oToolbar);

    //create colums 
    let oColumn;
    let columDefinition = [
        {
            "name": "key",
            "text": "",
            "visible": false
        },
        {
            "name": "Filia",
            "text": "Sortiment",
            "visible": true
        },

        {
            "name": "Artnr",
            "text": "Artikkel",
            "visible": true
        },
        {
            "name": "Maktx",
            "text": "Tekst",
            "visible": true
        },
        {
            "name": "Vrkme",
            "text": "UoM",
            "visible": true
        },
        {
            "name": "Datab",
            "text": "Fra-dato",
            "visible": true
        },
        {
            "name": "Datbi",
            "text": "Til-dato",
            "visible": true
        },

        {
            "name": "Matkl",
            "text": "CGM",
            "visible": true
        },
        {
            "name": "Mstae",
            "text": "Artikkelstatus",
            "visible": true
        }

    ]

    columDefinition.forEach(function (col) {
        oColumn = new sap.m.Column("col_" + col.name, {
            visible: col.visible,
            header: new sap.m.Text({
                text: col.text,
                wrapping: false
            })
        });
        oTable.addColumn(oColumn);
    });



    //place table 
    sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--vboxListing").addItem(oTable);




}


function readListing(assortment) {

    renderPagination(assortment);

    const tableId = "ListingTable";

    let table = sap.ui.getCore().getElementById(tableId)

    if (!table) {
        return;
    }

    //set Number of articles

    sap.ui.getCore().getElementById("ObjectNumberArticlesCount").setNumber(assortment.ArticlesCount);





    let url = "/assortmentListingSet"
    //  url = "/assortmentSet('" + asort + "')/listing"

    let parameters = [];

    parameters.push("$filter=Filia eq '" + assortment.Asort + "'");
    parameters.push("$top=100");

    modelListing.oData = []; //empty model

    modelListing.read(url, {
        urlParameters: parameters,
        success: function (oData) {
            var oTable = sap.ui.getCore().getElementById(tableId)
            oTable.removeAllItems()

            oData.results.forEach(function (item) {

                item.Datbi = new Date(item.Datbi).toLocaleDateString();
                item.Datab = new Date(item.Datab).toLocaleDateString();

                let key = item.Filia + '_' +
                    item.Artnr + '_' +
                    item.Vrkme + '_' +
                    item.Datbi + '_' +
                    item.Lfdnr;



                //create cells
                var oCell = [];

                oCell.push(new sap.m.Text({
                    text: key
                }))

                oCell.push(new sap.m.Text({
                    text: item.Filia,
                    wrapping: false
                }))



                oCell.push(new sap.m.Text({
                    text: item.Artnr,
                    wrapping: false
                }))
                oCell.push(new sap.m.Text({
                    text: item.Maktx
                }))
                oCell.push(new sap.m.Text({
                    text: item.Vrkme,
                    wrapping: false
                }))
                oCell.push(new sap.m.Text({
                    text: item.Datab,
                    wrapping: false
                }))
                oCell.push(new sap.m.Text({
                    text: item.Datbi,
                    wrapping: false
                }))
                oCell.push(new sap.m.Text({
                    text: item.Matkl + ' ' + item.Wgbez60
                }))
                oCell.push(new sap.m.Text({
                    text: item.Mstea,
                    wrapping: false
                }))




                var aColList = new sap.m.ColumnListItem({
                    cells: oCell,
                    type: "Active",
                    press: function (oEvent) {
                        debugger;
                    }
                });


                oTable.addItem(aColList)

            });

            // console.table(oData.results)


        }.bind(this),
        error: function (oData) { console.log(oData); }

    });

}