function readMasterData() {


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