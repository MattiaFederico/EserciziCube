sap.ui.define([
  'App/controller/BaseController',
  'sap/ui/model/json/JSONModel'
], function( BaseController ) {
  'use strict';
  
  BaseController.extend( "App.controller.MeetingDetails" , {
    onInit: function() {
      let oRouter = this.getRouter();
      oRouter.getRoute("meetingDetails").attachPatternMatched(this._onObjectMatched, this)
    },
    _onObjectMatched: function( oControlEvent ) {
      let meetupID = oControlEvent.getParameter("arguments").MeetupID;
      let meetupPath = ( meetupID - 1);
      this.getView().bindElement({
        path: "/" + meetupPath,
        model: "Meetings"
      });
		},
    toSuppliers: function() {
      let meetupID = parseInt(this.getView().getBindingContext("Meetings").sPath.substr(1,2)) + 1;

      if( this.checkForMissingId(meetupID) ){
        let oRouter = this.getRouter();
        oRouter.navTo("suppliersDashboard", { SupplierID: meetupID });
      } else {
        sap.m.MessageToast.show("Nessun meet per il fornitore");
      }
    },
    checkForMissingId: function( itemID ) {
      let suppliersArray = this.getModel("Suppliers").getData().Suppliers;
      let meetingsArray = this.getModel("Meetings").getData()[itemID - 1];
      let validator = false;
      suppliersArray.forEach( obj => {
        if( obj.ProductID === meetingsArray.MeetupID ){
          validator = true;
        }
      })
      return validator;
    }
  });
});