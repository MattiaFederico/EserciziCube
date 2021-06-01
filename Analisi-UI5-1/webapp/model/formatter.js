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
    }
  };
});