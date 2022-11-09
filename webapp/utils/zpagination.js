
function renderPagination(assortment) {

    if (assortment) {
        //set global data
        globalPagination.listing.items = parseInt(assortment.ArticlesCount);


        //pages
        globalPagination.listing.pages = parseInt(globalPagination.listing.items / globalPagination.listing.top);
        //add a page for the rest?
        if (globalPagination.listing.items % globalPagination.listing.top !== 0) {
            globalPagination.listing.pages++;
        }

    } else {
        //reset 
        globalPagination = {
            listing: {
                top: 100,
                skip: 0,
                pages: 0,
                items: 0,
                currentPage: 0,
            },
            stores: {
                top: 100,
                skip: 0,
                pages: 0,
                items: 0,
                currentPage: 0,
            }
        }
    }


    hboxListingPagination = sap.ui.getCore().getElementById("container-com.amt.assortmentmaintenancetool---MainView--HboxListingPagination")
    hboxListingPagination.destroyItems();

    hboxListingPagination.addItem(new sap.m.Label({
        text: "Viser side",
    }))


    hboxListingPagination.addItem(new sap.m.Button("ButtonListingPrev", {
        text: '<', press: function () {
            alert("pressed prev");
        },
        enabled: false
    }))



    hboxListingPagination.addItem(new sap.m.Input("InputListingPage", {
        value: globalPagination.listing.currentPage,
        width: "5rem",
        enabled: ((globalPagination.listing.pages < 0) ? true : false)
    }))

    hboxListingPagination.addItem(new sap.m.Label({
        text: "av",
    }))

    hboxListingPagination.addItem(new sap.m.Link({
        text: globalPagination.listing.pages    
    }))




    hboxListingPagination.addItem(new sap.m.Button("ButtonListingNext", {
        text: '>', press: function () {
            alert("pressed next");
        },
        enabled: true
    }))
}



