sap.ui.define([
  'App/controller/BaseController',
  'sap/ui/model/json/JSONModel',
  'App/model/formatter',
  'sap/ui/model/Sorter',
  'sap/ui/model/Filter',
  'sap/ui/model/FilterOperator'
], function( BaseController, JSONModel, formatter, Sorter, Filter, FilterOperator ) {
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
    }
  });
});