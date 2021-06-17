sap.ui.define([
  'App/controller/BaseController',
  'App/model/formatter',
  'sap/ui/model/Sorter',
  'sap/ui/model/Filter',
  'sap/ui/model/FilterOperator',
], function( BaseController, formatter, Sorter, Filter, FilterOperator ) {
  'use strict';
  
  BaseController.extend( "App.controller.Meeting" , {
    formatter: formatter,
    stateChange: true,
    sortById: function() {
      let oSorter = new Sorter({
        path: "MeetupID", 
        descending: this.stateChange,
        group: false
      });  
    
      let oList = this.byId("meeting");
      oList.getBinding("items").sort(oSorter);
      this.stateChange = !this.stateChange;
    },
    filterList: function( oControlEvent ) {
      let filtersObj = new Filter({
        filters: [ new Filter({
          path: "Title",
          operator: FilterOperator.Contains,
          value1: oControlEvent.getParameter("newValue"),
          }), new Filter({
            path: "Description",
            operator: FilterOperator.Contains,
            value1: oControlEvent.getParameter("newValue"),
          })
        ],
        or: true
      });

      let oList = this.byId("meeting");
      oList.getBinding("items").filter(filtersObj);
    },
    navToDetails: function( oControlEvent ) {
      let itemPath = oControlEvent.getSource().getBindingContext("Meetings").getPath();
			let item = this.getModel("Meetings").getProperty(itemPath);
      let itemID = item.MeetupID;
      
			let oRouter = this.getRouter();
      oRouter.navTo("meetingDetails", { MeetupID: itemID });
    }
  });
});