sap.ui.define([], function() {
  'use strict';
  return { 
    formatPrice: function( currentNumber ){
      return parseInt(currentNumber);
    },
    toIcon: function( status ){
      if( status ){
        return 'sap-icon://status-positive';
      } else {
        return 'sap-icon://status-negative';
      }
    },
    dateFormatter: function( oDate ) {
      let secs = oDate.slice(6);
      secs = secs.substr(0, 13);
      var newDate = new Date();
      newDate.setTime(secs);
      return newDate.toUTCString().substr(0,25);
    }
  };
});