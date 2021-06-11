sap.ui.define([
  'App/controller/BaseController',
  "sap/ui/core/Fragment"
], function( BaseController, Fragment ) {
  'use strict';
  
  BaseController.extend( "App.controller.Suppliers" , {
    onInit: function() {

    },
    _getDialog : function () {
      let oView = this.getView();
      if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
          name: "App.view.fragment.SuppliersDialog",
          controller: this
				}).then(function (oDialog) {
					oView.addDependent(oDialog);
					return oDialog;
				});
			}
    },
    onDialogOpen: function() {
      this._getDialog();
      this.pDialog.then((oDialog) => {
        oDialog.open();
      });
    },
    onDialogClose: function() {
      this.byId("suppliersDialog").close();
    },
    onSubmit: function( oEvent ) {
      let inputValue = parseInt(oEvent.getParameter("value"));
      if( this.idChecker( inputValue ) ){
        //Codice futuro
      } else {
        sap.m.MessageToast.show("Nessun fornitore associato");
      }
    },
    liveChange: function( oEvent ) {
      let regex = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
      if( oEvent.getParameter("value").match(regex) ){
        oEvent.getSource().setValue("");
      }
    },
    idChecker: function(inputValue) {
      let aSuppliers = this.getView().getModel("Suppliers").getData().Suppliers;
      let validator = false;
      aSuppliers.forEach( obj => {
        if( inputValue === obj.SupplierID ){
          validator = true;
        }
      });
      return validator;
    },
    onSupplierSelect: function( oEvent ) {
      //Codice futuro
      let itemID = parseInt(oEvent.getSource().getProperty("number"));
      let input = this.byId("suppliersInput");
      input.setValue(itemID);
      this.onDialogClose();
    }
  });
});