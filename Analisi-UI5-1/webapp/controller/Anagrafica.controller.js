sap.ui.define([
  'App/controller/BaseController',
  'sap/ui/model/json/JSONModel',
  'App/model/formatter',
  'sap/ui/model/Sorter',
  'sap/ui/model/Filter',
  'sap/ui/model/FilterOperator',
  "sap/m/Dialog"
], function( BaseController, JSONModel, formatter, Sorter, Filter, FilterOperator, Dialog ) {
  'use strict';

  var stateChange = true;

  BaseController.extend( "App.controller.Anagrafica" , {
    formatter: formatter,
    onInit: function(){
      let oModel = new JSONModel("./model/Products.json");
      this.getView().setModel(oModel, "Products");
    },
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
        this.pDialog.setBindingContext(item, "item");
      }

      oView.addDependent(this.pDialog);

      if( item.Discontinued ){
        this.pDialog.setProperty("title", "Success"); 
        this.pDialog.setProperty("icon", "sap-icon://message-success");
        sap.ui.getCore().byId("msg").setText( "Prodotto non più disponibile");
      } else {
        this.pDialog.setProperty("title", "Error");
        this.pDialog.setProperty("icon", "sap-icon://message-error");
        sap.ui.getCore().byId("msg").setText("Prodotto disponibile");
      }
      this.pDialog.open();
    }
  });
});