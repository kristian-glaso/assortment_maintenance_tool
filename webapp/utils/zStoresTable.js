function createStoresTable() {


    //create table 
    let oTable = new sap.m.Table("StoresTable", {
        headerText: "",
        fixedLayout: false,
        growing: true
    })

    //create colums 
    let oColumn;
    let columDefinition = [
        {
            "name": "key",
            "text": "",
            "visible": false
        },
        {
            "name": "Asort",
            "text": "Sortiment",
            "visible": true
        },

        {
            "name": "Locnr",
            "text": "Butikk",
            "visible": true
        },
        {
            "name": "Vkorg",
            "text": "Salgsorg.",
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
            "name": "Ernam",
            "text": "Opprettet av",
            "visible": true
        },
        {
            "name": "Aenam",
            "text": "Endret av",
            "visible": true
        }

    ]

    columDefinition.forEach(function (col) {
        oColumn = new sap.m.Column("colStores_" + col.name, {
            visible: col.visible,
            header: new sap.m.Text({
                text: col.text,
                wrapping: false
            })
        });
        oTable.addColumn(oColumn);
    });



    //place table 
    sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--vboxStores").addItem(oTable);


}


function readStores(asort) {

    const tableId = "StoresTable";

    let table = sap.ui.getCore().getElementById(tableId)

    if (!table) {
        return;
    }

    let url = "/storesSet"
    //  url = "/assortmentSet('" + asort + "')/listing"

    let parameters = ["$filter=Asort eq '" + asort + "'"];

    modelStores.oData = []; //empty model

    modelStores.read(url, {
        urlParameters: parameters,
        success: function (oData) {
            var oTable = sap.ui.getCore().getElementById(tableId)
            oTable.removeAllItems()

            oData.results.forEach(function (item) {

                item.Datbi = new Date(item.Datbi).toLocaleDateString();
                item.Datab = new Date(item.Datab).toLocaleDateString();

               
                item.Aedat = new Date(item.Aedat).toLocaleDateString();
                let changedBy = "";
                if (item.Aenam){
                    changedBy = item.Aenam + " (" + item.Aenam + ")" 
                }

                let key = item.Asort + '_' +
                    item.Lfdnr;



                //create cells
                var oCell = [];

                oCell.push(new sap.m.Text({
                    text: key
                }))

                oCell.push(new sap.m.Text({
                    text: item.Asort,
                    wrapping: false
                }))

                oCell.push(new sap.m.Text({
                    text: item.Locnr + " " + item.Name1,
                    wrapping: false
                }))
                oCell.push(new sap.m.Text({
                    text: item.Vkorg
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
                    text: item.Ernam ,
                    wrapping: false
                }))
                oCell.push(new sap.m.Text({
                    text: changedBy ,
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

            //console.table(oData.results)


        }.bind(this),
        error: function (oData) { console.log(oData); }

    });

}