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

      let oDeviceModel = new JSONModel(Device);
      oDeviceModel.setDefaultBindingMode("OneWay");
      this.setModel(oDeviceModel, "device");
    }
  })
});