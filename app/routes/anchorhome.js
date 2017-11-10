import Ember from 'ember';
import CONFIG from 'vendorfin/config/environment';
export default Ember.Route.extend({
    model() {
        //var aController = this.controllerFor('anchorhome');

        this.controllerFor('anchorhome').set('approveProperty', false);
        this.controllerFor('anchorhome').set('showsteplist', false);
        //this.controllerFor('anchorhome').set('currentStep', 1);

        var data = [{
                "sl": "1",
                "ProgramName": "program1",
                "Supplier": "SupplierA",
                "programid": "9171",
                "status": "program Initiated",
                "action": ""
            },
            {
                "sl": "2",
                "ProgramName": "program2",
                "Supplier": "SupplierB",
                "programid": "9172",
                "status": "payment pending",
                "action": ""
            },

            {
                "sl": "2",
                "ProgramName": "program4",
                "Supplier": "SupplierB,SupplierD",
                "programid": "9174",
                "status": "Invoice approval",
                "action": ""
            }
        ]

       var mycontroller = this;
        return  $.ajax({
              url:CONFIG.GOURL+'/readIndex',
              type: 'GET',
              contentType: 'application/json',
              success: function(data) {
                   var message = data.message;
                   console.log("message :-----",message);
                  console.log("data--->>>", JSON.stringify(data));
                
                  mycontroller.controllerFor('anchorhome').set("message",message);
                  //return message;
  
              },
              error: function(response) {
                  console.log('DEBUG: GET Enquiries Failed');
                  console.log("Error Message: ", data.message);
  
              }
  
          });
        //return data;

    }
});