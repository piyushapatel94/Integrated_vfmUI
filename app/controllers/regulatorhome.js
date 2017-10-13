import Ember from 'ember';
import CONFIG from 'vendorfin/config/environment';
export default Ember.Controller.extend({
    vendorregulator: false,
    programInitiate: false,
    paymentPending: false,
    PORaised: false,
    paymentapproved: false,
    Invoiceapprove: false,
    columns: [{
            "propertyName": "sl",
            "title": "sl.",
            "className": "text-left",
            // "routeName": "sample"
        },
        {
            "propertyName": "Manufacturer",
            "title": "Manufacturer",
            "className": "text-left"
        },
        {
            "propertyName": "Supplier",
            "title": "Supplier",
            "className": "text-left"
        },
        {
            "propertyName": "programid",
            "title": "Program ID",
            "className": "text-left"
        },
        {
            "propertyName": "status",
            "title": "Status",
            "className": "text-left"
        },
        {
            "title": "Detailings",
            "template": "custom/programid"
        },
        {
            "title": "Close",
            "template": "custom/close"
        }
    ],

    actions: {
        createprogram: function() {

            this.transitionToRoute('program', { queryParams: { step: 'init' } });
            console.log("in create ");
            
        },
        closeProgram: function() {
            this.transitionToRoute('program', { queryParams: { step: 'close' } });
        },
        detailprogram: function(status,programid) {
           
            console.log(status);
            console.log(programid);
            var programid =programid;
            this.set('programid',programid);
            if (status === "program Initiated") {
                this.set("programInitiate", true);
            } else if (status === "payment pending") {
                this.set("paymentPending", true);
                this.transitionToRoute('initaitepayment');
            } else if (status === "PO raised") {
                this.set("PORaised", true);
            } else if (status === "payment recieved") {
                this.set("paymentapproved", true);
            } else if (status === "Invoice approved") {
                this.set("Invoiceapprove", true)
            }

        },
        closure: function() {
            console.log("asa");
            this.toggleProperty('approveProperty');
        },
        gotohome: function() {
            // this.transitionToRoute('regulatorhome');
            window.location.reload(true);
        },
        okgotohome:function(){
            this.set('approveProperty',false);
            this.set('toggleModal',false);
        },
        toinititaepayment:function(){
            var programid =this.get('programid');
            console.log("programid---from anchorprogram",programid);
            let{
                totalamount
             }=this.getProperties('totalamount');

             var dataString = {  
                "programid":programid,
                    "status":"payment initiated",
                    "InvolvedParties":"bank",
                    "transactionString":{
                        "updatedBy":"bank",
                       "totalamount":totalamount,
                       "status":"payment initiated",
                    }
                };
                console.log(JSON.stringify(dataString));
                    var mycontroller = this;

                    return $.ajax({
                    url:'http://192.168.0.11:3000/updateProgram',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(dataString),
                    success: function(response) {
                        var message = response.message;
                    console.log("message" + JSON.stringify(response));
                    mycontroller.toggleProperty('approveProperty');
                    mycontroller.set('modalmessage', "Payment Initiated successfully !!! , Click OK to go back to home")
                    mycontroller.set('percentageComplete', 100);
                    },      
                    error: function(response) {
                    console.log('DEBUG: GET Enquiries Failed');
                    console.log("Error Message: ", response.message);
                    
                    }

                    });     
        }




    }
});