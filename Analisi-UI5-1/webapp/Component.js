sap.ui.define([
  'sap/ui/core/UIComponent',
  'sap/ui/Device',
  'sap/ui/model/json/JSONModel'
], function(UIComponent, Device, JSONModel) {
  'use strict';
  
  return UIComponent.extend( "App.Component" ,{
    metadata: {
      manifest: "json"
    },
    init: function() {
      UIComponent.prototype.init.apply(this, []);
      this.getRouter().initialize();

      let oModel = new JSONModel("./model/Products.json");
      this.setModel(oModel, "Products");

      let suppliersModel = new JSONModel("./model/Suppliers.json")
      this.setModel(suppliersModel, "Suppliers");

      let meetingsModel = new JSONModel("./model/Meetups.json")
      this.setModel(meetingsModel, "Meetings");

      let oDeviceModel = new JSONModel(Device);
      oDeviceModel.setDefaultBindingMode("OneWay");
      this.setModel(oDeviceModel, "device");
    }
  })
});