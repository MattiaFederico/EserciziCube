sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"../model/formatter"
], function (BaseController, JSONModel, History, formatter) {
	"use strict";

	return BaseController.extend("products.products.controller.Object", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit : function () {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var iOriginalBusyDelay,
				oViewModel = new JSONModel({
					busy : true,
					delay : 0
				});

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			// Store original busy indicator delay, so it can be restored later on
			iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();
			this.setModel(oViewModel, "objectView");
			this.getOwnerComponent().getModel().metadataLoaded().then(function () {
					// Restore original busy indicator delay for the object view
					oViewModel.setProperty("/delay", iOriginalBusyDelay);
				}
      );
     
      //Local data model
      let data = {
        ProductID: "HT-",
        TypeCode: "PR",
        TaxTarifCode: 1,
        Category: "Notebooks",
        Name: "",
        Description: "",
        SupplierID: "0100000046",
        SupplierName: "SAP",
        CurrencyCode: "EUR",
        MeasureUnit: "EA"
      };

      let dataModel = new JSONModel(data);
      this.setModel(dataModel, "formData");
		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */


		/**
		 * Event handler  for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack : function() {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true);
			}
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched : function (oEvent) {
			var sObjectId =  oEvent.getParameter("arguments").objectId;
			this.getModel().metadataLoaded().then( function() {
				var sObjectPath = this.getModel().createKey("ProductSet", {
					ProductID :  sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView : function (sObjectPath) {
			var oViewModel = this.getModel("objectView"),
				oDataModel = this.getModel();

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oDataModel.metadataLoaded().then(function () {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
							oViewModel.setProperty("/busy", true);
						});
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange : function () {
			var oView = this.getView(),
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound"); 
				return;
			}

			var oResourceBundle = this.getResourceBundle(),
				oObject = oView.getBindingContext().getObject(),
				sObjectId = oObject.ProductID,
        sObjectName = oObject.ProductID;

			oViewModel.setProperty("/busy", false);

			oViewModel.setProperty("/shareSendEmailSubject",
			oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			oViewModel.setProperty("/shareSendEmailMessage",
			oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
    },

    formatProductID: function( oControlEvent ) {
      let currentValue = oControlEvent.getParameter("value");
      let prefix = currentValue.substr(0,3);
      if( prefix !== "HT-" ){
        sap.m.MessageToast.show("Il Product ID deve contenere il prefisso HT-");
        this.byId("productID").setValue("HT-");
      } else {
        let subfix = currentValue.substr(3,7);
        let regex = /^[0-9]*$/;
        if( subfix.length !== 4 ){
          this.byId("productID").setValue(prefix + subfix.slice(0,4));
          this.byId("checkID").setEnabled(false);
        } else if( !subfix.match(regex) ){
          this.byId("productID").setValue(prefix);
          sap.m.MessageToast.show("Il Product ID deve essere di tipo numerico");
          this.byId("checkID").setEnabled(false);
        } else {
          this.byId("checkID").setEnabled(true);
        }
      }
    },

    checkProductID: function() {
      let productID = this.byId("productID").getValue();
      this.getModel().read("/ProductSet('" + productID + "')", {
        success: () => {
          sap.m.MessageToast.show("Prodotto già esistente");
        },
        error: () => {
          this.byId("saveData").setEnabled(true);
        }
      })
    },
    
    saveFormData: function() {
      let oDataModel = this.getOwnerComponent().getModel();
      let oFormData = this.getView().getModel("formData").getData();
      if( oFormData.Name && oFormData.Description ){
        debugger;
        let token = oDataModel.getSecurityToken();
        oDataModel.create("/ProductSet", oFormData, {
          headers: {
            "X-CSRF-Token": token
          },
          success: function( oData, oResponse ) {
          
          },
          error: function( oResponse ) {
          
          }
        });
      } else {
        sap.m.MessageToast.show("Compilare tutti i campi");
      }
    }
	});

});