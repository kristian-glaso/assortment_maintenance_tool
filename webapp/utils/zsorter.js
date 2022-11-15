function sortTable(event, field) {

    let oTable = event.getSource().getParent().getParent();
    let sortingCol = event.getSource().getParent();

    // Ascending or Descending?

    let sortDesc = false; //default


    //go trough all coloumns

    oTable.getColumns().forEach(function (col) {

        if (col.sId === sortingCol.sId) {
            let SortIndicator = sortingCol.getSortIndicator();

            if (SortIndicator === 'None' || SortIndicator == 'Descending') {
                sortingCol.setSortIndicator("Ascending");
            } else {
                sortingCol.setSortIndicator("Descending");
                sortDesc = true;
            }



        } else {
            col.setSortIndicator("None");
        }

    });







    //sort table
    oTable.getBinding("items").sort(new sap.ui.model.Sorter(field, sortDesc));

    //set col icon
    event.getSource().getParent();

}