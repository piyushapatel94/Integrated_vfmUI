import Ember from 'ember';
import CONFIG from 'vendorfin/config/environment';
export default Ember.Route.extend({
    model(){
        this.controllerFor('vendorhome2').set('showdalways',true);
        var mycontroller = this;
        return  $.ajax({
              url:CONFIG.GOURL+'/supplierIndex',
              type: 'GET',
              contentType: 'application/json',
              success: function(data) {
                   var message = data.message;
                   console.log("message :-----",message);
                  console.log("data--->>>", JSON.stringify(data));
                
                  mycontroller.controllerFor('vendorhome2').set("message",message);
                  //return message;
  
              },
              error: function(response) {
                  console.log('DEBUG: GET Enquiries Failed');
                  console.log("Error Message: ", data.message);
  
              }
  
          });
    }
});
