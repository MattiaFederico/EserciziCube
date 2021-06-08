sap.ui.define([
  'App/controller/BaseController',
  'App/model/formatter',
  'sap/ui/model/Sorter',
  'sap/ui/model/Filter',
  'sap/ui/model/FilterOperator',
  "sap/m/Dialog",
  "sap/m/DialogType"
], function( BaseController, formatter, Sorter, Filter, FilterOperator, Dialog, DialogType ) {
  'use strict';

  var stateChange = true;

  BaseController.extend( "App.controller.Anagrafica" , {
    formatter: formatter,
    searchProduct: function( oControlEvent ) {
      let oTable = this.getView().byId("prodotti");
      if( oControlEvent !== undefined ){
        let oFitler = new Filter({
          path: "ProductName",
          operator: FilterOperator.Contains,
          value1: oControlEvent.getParameter("value")
        });
        oTable.getBinding("items").filter(oFitler);
      } else {
        let oFitler = new Filter({
          path: "ProductName",
          operator: FilterOperator.Contains,
          value1: ""
        });
        oTable.getBinding("items").filter(oFitler);
      }
    },
    clearInput: function() {
      let oInput = this.byId("search");
      if( oInput !== undefined ){
        oInput.setValue("");
        this.searchProduct();
      }      
    },
    sortById: function() {
      let oSorter = new Sorter({
        path: "ProductID", 
        descending: stateChange,
        group: false
      });  
    
      var oTable = this.byId("prodotti");
    
      oTable.getBinding("items").sort(oSorter);
      stateChange = !stateChange;
    },
    openDialog: function( evt ) {
      let oView = this.getView();
      let item = evt.getSource().getBindingContext("products").getObject();

      if (!this.pDialog) {
				this.pDialog = new Dialog({
          type: DialogType.Message,
          content: new sap.m.Text({
            id: 'msg'
          }),
          endButton: new sap.m.Button({
            text: "Chiudi",
            press: function() {
              this.pDialog.close();
            }.bind(this)
          })
        });
      }

      oView.addDependent(this.pDialog);

      if( item.Discontinued ){
        this.pDialog.setProperty("title", "Success"); 
        this.pDialog.setProperty("icon", "sap-icon://message-success");
        this.pDialog.getContent()[0].setProperty( "text", "Prodotto non più disponibile");
      } else {
        this.pDialog.setProperty("title", "Error");
        this.pDialog.setProperty("icon", "sap-icon://message-error");
        this.pDialog.getContent()[0].setProperty( "text", "Prodotto disponibile");
      }
      this.pDialog.open();
    },
    toDetails: function( oControlEvent ) {
      let itemPath = oControlEvent.getSource().getBindingContext("products").getPath();
			let item = this.getModel("products").getProperty(itemPath);
      let itemID = item.ProductID;
      
			let oRouter = this.getRouter();
      if( this.checkForMissingId(itemID) ){
        oRouter.navTo("productDetails", { ProductID: itemID });
      } else {
        sap.m.MessageToast.show("Nessun fornitore associato");
      }
    },
    checkForMissingId: function( itemID ) {
      let suppliersArray = this.getModel("Suppliers").getData().Suppliers;
      let productsArray = this.getModel("Products").getData().Products[itemID - 1];
      let validator = false;
      suppliersArray.forEach( obj => {
        if( obj.ProductID === productsArray.ProductID ){
          validator = true;
        }
      })
      return validator;
    }
  });
});