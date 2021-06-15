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
      let supplierPath = this.checkMissingID( supplierID );
      this.getView().bindElement({
        path: "/Suppliers/" + supplierPath,
        model: "Suppliers"
      });
      debugger;
      this.chartInitializer();
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
    },
    chartInitializer: function() {
      let bindingContext = this.getView().getBindingContext("Suppliers");
      let key = bindingContext.getModel().getBindings()[7].getValue();
      debugger;
      let chart = this.byId("radialChart");
      switch (key) {
        case 'USA':
          chart.setPercentage(95);
        break;
        case 'UK':
          chart.setPercentage(10);
        break;
        case 'Canada':
          chart.setPercentage(50);
        break;
        case 'Germany':
          chart.setPercentage(75);
        break;
      }
    },
    checkMissingID: function( supplierID ) {
      let aSuppliers = this.getView().getModel("Suppliers").getData().Suppliers;
      let missing = [];
      let count = 1;
      let supplierPath = 0;
      aSuppliers.forEach( obj => {
        if( count !== obj.ProductID ){
          missing.push(count);
          count = obj.ProductID;
        }
        count++;
      });

      /*
        Stavo cercando un modo per eseguire dinamicamente un controllo sull' ID
        mancante per modificare supplierPath correttamente ad ogni salto di ID
        es: (SupplierPath: 3, ProductID: 4)
      */

      if( missing[0] < supplierID ){
        supplierPath = ( supplierID - 2 );
      } else {
        supplierPath = ( supplierID - 1 );
      }
      return supplierPath;
    }
  })
})
