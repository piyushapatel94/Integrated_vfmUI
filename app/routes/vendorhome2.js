import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        var mycontroller = this;
        return  $.ajax({
              url:'http://192.168.0.11:3000/supplierIndex',
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
