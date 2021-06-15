sap.ui.define(['sap/ui/core/library'], function ( library ) {
	"use strict";

	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit : function (sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
    },
    numberStock: function( sValue, sUnit ){
      if( sUnit === "G"){
        sValue /= 1000;
      }
      if( sValue <= 1 ){
        return library.ValueState.Error
      } else if ( sValue > 1 && sValue <= 20 ){
        return library.ValueState.Warning
      } else {
        return library.ValueState.Success
      }
    }

	};

});