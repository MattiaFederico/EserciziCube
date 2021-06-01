sap.ui.define([
  'App/controller/BaseController',
  'sap/ui/model/json/JSONModel',
  'App/model/formatter'
], function( BaseController, JSONModel, formatter ) {
  'use strict';
  
  BaseController.extend( "App.controller.Anagrafica" , {
    formatter: formatter,
    onInit: function(){
      let oData = this.getOwnerComponent().getModel("Products");
      let oModel = new JSONModel(oData);
      this.getView().setModel(oModel);
    }
  });
});