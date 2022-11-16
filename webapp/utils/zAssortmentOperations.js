

function refreshAssortment() {

    getComponent("AssortmentTable").removeSelections();
    getComponent("AssortmentTable").getModel().refresh();
    filterListing();
    filterStores();
}



function deleteAssortments() {
    //get selected assormtents
    let message = "";

    let selectedAsortments = getComponent("AssortmentTable").getSelectedItems();
    if (selectedAsortments.length === 0) {
        return;
    } else if (selectedAsortments.length === 1) {
        message = "Slettemerke sortiment " +
            selectedAsortments[0].getBindingContext().getProperty().Asort + " " +
            selectedAsortments[0].getBindingContext().getProperty().Name1 + "?"
    } else {
        message = "Slettemerke " + selectedAsortments.length + " sortimenter?"
    }


    sap.m.MessageBox.show(
        message, {
        icon: sap.m.MessageBox.Icon.WARNING,
        title: "Bekreft slettemerking",
        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
        emphasizedAction: sap.m.MessageBox.NO,
        onClose: function (oAction) {
            if (oAction === sap.m.MessageBox.Action.YES) {

                // Set chosen assortments to deleted (update)
                //let url = "/assortmentSet";
                let payload = [];
                let url

                selectedAsortments.forEach(function (item) {
                    //  payload.push({ Asort: item.getBindingContext().getProperty().Asort });
                    // payload = {
                    //   Asort: item.getBindingContext().getProperty().Asort,
                    //}

                    payload.push({
                        Statu: "2",
                        Asort: item.getBindingContext().getProperty().Asort
                    });

                    url = "/assortmentSet('" + item.getBindingContext().getProperty().Asort + "')";

                });

                url = "/assortmentSet?&batch"


                getComponent("AssortmentTable").getModel().create(url, payload, {
                    success: function (oData, response) {


                        if (response.headers["sap-message"]) {
                            var hdrMessage = JSON.parse(response.headers["sap-message"]);


                            if (hdrMessage.severity === 'success') {
                                sap.m.MessageBox.success(
                                    hdrMessage.message
                                );
                            } else if (hdrMessage.severity === 'error') {
                                sap.m.MessageBox.error(
                                    hdrMessage.message
                                );
                            }
                        }

                    },
                    error: function (Error) {
                        sap.m.MessageBox.error(
                            "En feil oppsto: " + Error.message
                        );
                    }
                });


            }
        }
    }
    );





}


function createAssortment() {
    //check input

    if (!getComponent("InputAsort").getValue()) {
        sap.m.MessageToast.show("Sortiment er et obligatorisk felt");
        return;
    }

    if (getComponent("InputAsort").getValue().length > 10) {
        sap.m.MessageToast.show("Sortiment kan ikke ha mer enn 10 tegn");
        return;
    }


    if (!getComponent("InputName").getValue()) {
        sap.m.MessageToast.show("Beskrivelse er et obligatorisk felt");
        return;
    }




    if (getComponent("InputAsort").getValue().length > 40) {
        sap.m.MessageToast.show("Beskrivelse kan ikke ha mer enn 40 tegn");
        return;
    }




    if (!getComponent("selectAssordimval1").getSelectedKey()) {
        sap.m.MessageToast.show("Størrelse er et obligatorisk felt");
        return;
    }


    let url = "/assortmentSet"
    let payload = {
        Asort: getComponent("InputAsort").getValue().toUpperCase(),
        Name1: getComponent("InputName").getValue(),
        Assordimval1: getComponent("selectAssordimval1").getSelectedKey()
    }

    getComponent("AssortmentTable").getModel().create(url, payload, {
        success: function (response) {

            if (response.MessageType === 'E') {
                sap.m.MessageBox.error(
                    response.Message
                );
            } else {

                getComponent("InputName").setValue("");
                getComponent("InputAsort").setValue("");
                getComponent("selectAssordimval1").setSelectedKey("");

                sap.m.MessageToast.show(response.Message);
                getComponent("AssortmentTable").getModel().refresh();

                closeDialog("dialogCreateAssortment");

            }


        },
        error: function (Error) {
            sap.m.MessageBox.error(
                "En feil oppsto: " + Error.toString()
            );
        }
    });
}


