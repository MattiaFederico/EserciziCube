sap.ui.define([
  'sap/ui/core/mvc/Controller',
  'sap/ui/core/routing/History',
  'sap/ui/core/UIComponent'
], function(Controller, History, UIComponent) {
  'use strict';
  
  return Controller.extend("App.controller.BaseController", {
    getRouter: function() {
      return UIComponent.getRouterFor(this);
    },
    getModel: function( mName ) {
      return this.getOwnerComponent().getModel(mName);
    },
    setModel: function( oModel, mName ){
      return this.getView().setModel(oModel, mName);
    },
    onNavBack: function() {
      let oHistory = History.getInstance();
      let sHash = oHistory.getPreviousHash();
      if( sHash !== undefined ){
        window.history.go(-1);
      } else {
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo( "master" );
      }
    },
    onNavTo: function( sPage ) {
      let oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo( sPage );
    }
  });
});