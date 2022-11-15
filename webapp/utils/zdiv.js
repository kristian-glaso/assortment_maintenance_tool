function openDialog(dialogName){

    let dialogId = "container-com.amt.assortmentmaintenancetool---MainView--" +  dialogName;
    let oDialog = sap.ui.getCore().getElementById(dialogId)
    if (!oDialog){
        return
    }

    oDialog.open();

}


function closeDialog(dialogName){

    let dialogId = "container-com.amt.assortmentmaintenancetool---MainView--" +  dialogName;
    let oDialog = sap.ui.getCore().getElementById(dialogId)
    if (!oDialog){
        return
    }

    oDialog.close();

}


function getComponent(name){

return sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--" + name);

}

function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9]*$/.test(str);
  }
