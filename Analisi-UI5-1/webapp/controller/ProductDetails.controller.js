sap.ui.define([
  'App/controller/BaseController',
  'sap/ui/model/json/JSONModel'
], function( BaseController ) {
  'use strict';
  
  BaseController.extend( "App.controller.ProductDetails" , {
    onInit: function() {
      let oRouter = this.getRouter();
      oRouter.getRoute("productDetails").attachPatternMatched(this._onObjectMatched, this)
    },
    _onObjectMatched: function( oControlEvent ) {
      let productID = oControlEvent.getParameter("arguments").ProductID;
      let productPath = ( productID - 1);
      this.getView().bindElement({
        path: "/Products/" + productPath,
        model: "Products"
      });

      let supplierArray = this.getView().getModel("Suppliers").getData().Suppliers;
      let form = this.byId("form");
      
      supplierArray.forEach( obj => {
        if( productID == obj.ProductID ){
          form.destroyContent();
          for( let prop in obj ){
            form.addContent(
              new sap.m.Label({
                text: prop
              })
            );
            form.addContent(
              new sap.m.Input({
                value: obj[prop],
                enabled: "{Products>Discontinued}"
              })
            );
          }
        }
      })
		},
    
  });
});