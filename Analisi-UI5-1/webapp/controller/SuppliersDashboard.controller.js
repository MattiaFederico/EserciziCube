sap.ui.define([
  'App/controller/BaseController'
], function( BaseController ) {
  'use strict';
  
  BaseController.extend( "App.controller.SuppliersDashboard" , {
    onInit: function() {
      let oRouter = this.getRouter();
      oRouter.getRoute("suppliersDashboard").attachPatternMatched(this._onObjectMatched, this)
    },
    _onObjectMatched: function( oControlEvent ) {
      let supplierID = oControlEvent.getParameter("arguments").SupplierID;
      let supplierPath = ( supplierID - 1);
      this.getView().bindElement({
        path: "/Suppliers/" + supplierPath,
        model: "Suppliers"
      });
    },
    showMore: function( sParameter ) {
      let oList = this.byId("details").getAggregation("items");
      if( sParameter === "contact" ){
        for( let key in oList ){
          if( key < 3 ){
            this.byId(oList[key].sId).setVisible(true)
          } else {
            this.byId(oList[key].sId).setVisible(false)
          }
        }
      } else if( sParameter === "address" ){
        for( let key in oList ){
          if( key >= 3 ){
            this.byId(oList[key].sId).setVisible(true)
          } else {
            this.byId(oList[key].sId).setVisible(false)
          }
        }
      }
    }
  })

})
