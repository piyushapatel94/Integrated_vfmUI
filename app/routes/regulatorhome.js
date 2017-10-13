import Ember from 'ember';

export default Ember.Route.extend({

    model() {
        this.controllerFor('regulatorhome').set('approveProperty', false);
       var programid= this.controllerFor('regulatorhome').get('programid');
       console.log("programid --",programid);
        var data = [{
                "sl": "1",
                "Supplier": "SupplierA",
                "Manufacturer": "ManufacturerA",
                "programid": "9171",
                "status": "program Initiated",
                "action": "",
                "action": ""
            },
            {
                "sl": "2",
                "Supplier": "SupplierB",
                "Manufacturer": "ManufacturerA",
                "programid": "9172",
                "status": "payment pending",
                "action": "",
                "action": ""
            },
            {
                "sl": "3",
                "Supplier": "SupplierC",
                "Manufacturer": "ManufacturerA",
                "programid": "9173",
                "status": "payment pending",
                "action": "",
                "action": ""
            },
            {
                "sl": "4",
                "Supplier": "SupplierD",
                "Manufacturer": "ManufacturerB",
                "programid": "9174",
                "status": "Invoice approval",
                "action": "",
                "action": ""
            },
            {
                "sl": "5",
                "Supplier": "SupplierE",
                "Manufacturer": "new ventures",
                "programid": "9175",
                "status": "payment pending",
                "action": "",
                "action": ""
            },
            {
                "sl": "6",
                "Supplier": "SupplierA",
                "Manufacturer": "ManufacturerB",
                "programid": "9176",
                "status": "PO raised",
                "action": "",
                "action": ""
            },
            {
                "sl": "7",
                "Supplier": "SupplierB",
                "Manufacturer": "ManufacturerB",
                "programid": "9177",
                "status": "Payment Approved",
                "action": "",
                "action": ""
            }
        ]
        var mycontroller = this;
        Ember.$.ajax({
            url:'http://192.168.0.11:3000/bankIndex',
            type: 'GET',
            contentType: 'application/json',
            success: function(data) {
                 var message = data.message;
                 console.log("message :-----",message);
                console.log("data--->>>", JSON.stringify(data));
              
                mycontroller.controllerFor('regulatorhome').set("message",message);
                //return message;

            },
            error: function(data) {
                console.log('DEBUG: GET Enquiries Failed');
                console.log("Error Message: ", data.message);

            }

        });

         $.ajax({
            url:'http://192.168.0.11:3000/readProgram',
            type: 'GET',
            contentType: 'application/json',
            headers:{
                'authorization':programid
            },
            success: function(data) {
                 var message = data.message;
                 console.log(JSON.stringify(message));
             //   console.log("data--->>>", JSON.stringify(data));
              
               //mycontroller.controllerFor('regulatorhome').set("message",message);
                //return message;

            },
            error: function(data) {
                console.log('DEBUG: GET Enquiries Failed');
                console.log("Error Message: ", data.message);

            }

        });


      // return data;
    }
});