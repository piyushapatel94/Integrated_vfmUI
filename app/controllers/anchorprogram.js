import Ember from 'ember';
import stepperMixin from '../mixins/stepper';
var  selectedvendor =[];
export default Ember.Controller.extend(stepperMixin, {
    vendorList: ["SupplierA", "SupplierB", "SupplierC", "SupplierD", "SupplierE"],
    queryParams: ['steps'],
    step: null,
    anchornotchoosen: true,
    vendornotchoosen: true,
    percentageComplete: 0,
    currentStep: 0,
    vendorname: null,
    vendoremail: null,
    vendorphone: null,
    vendorbank: null,
    //selectedVendor: null,
    watchanchorstep: function() {
        var step = this.get('steps');
        if (step === 'invoice') {
            console.log(step)
            this.set('currentStep', 3);
            this.set('percentageComplete', 60);
        }
        if (step === 'po') {
            console.log(step)
            this.set('currentStep', 0);
            this.set('percentageComplete', 10);
        }
    }.observes('steps'),

    actions: {
        
       
        //This fuction is for 'next' button.This is fuctonality used when bank will intiate the program and send vendor list to anchor
        particularVendor: function(selectedVendorName) {
            
            /* selectedvendor =this.get('selectedvendor');
            console.log('selectedvendor :',selectedvendor);
            console.log("selectedVendorName --------:" + selectedvendor);*/
            console.log("selectedVendorName ----"+selectedVendorName);
           // this.set("selectedVendorName",selectedVendorName);
           // this.set('selectedVendor', selectedvendor);

            if (selectedVendorName === 'SupplierA') {
               
                this.set('vendorname', 'SupplierA');
               //this.set('vendoremail', 'tcs@abc.com');
                //this.set('vendorphone', 9595000095);
                //this.set('vendorbank', 'ICICI Bank');
            } else if (selectedVendorName === 'SupplierB') {
                console.log("if Hexaware loop");
                this.set('vendorname', 'SupplierB');
             //   this.set('vendoremail', 'hex@abc.com');
               // this.set('vendorphone', 9995111195);
               // this.set('vendorbank', 'HDFC Bank');
            } else if (selectedVendorName === 'SupplierC') {
                console.log("if Syntex loop");
                this.set('vendorname', 'SupplierC');
                //this.set('vendoremail', 'syntex@abc.com');
                //this.set('vendorphone', 998888888);
                //this.set('vendorbank', 'Dena Bank');
            } else if (selectedVendorName === 'SupplierD') {
                
                this.set('vendorname', 'SupplierD');
                //this.set('vendoremail', 'Jaguar@abc.com');
                //this.set('vendorphone', 8500000001);
                //this.set('vendorbank', 'SBI Bank');
            } else if (selectedVendorName === 'SupplierE') {
                
                this.set('vendorname', 'SupplierE');
                //this.set('vendoremail', 'honda@abc.com');
               // this.set('vendorphone', 9995111195);
                //this.set('vendorbank', 'Bank of India');
            }
            var currentStep = this.get('currentStep');
            console.log("currentStep:::"+currentStep);
            currentStep = currentStep + 1;
            this.set('currentStep', currentStep);

        },

        poupload: function() {

            var vendorname =this.get('vendorname');
            console.log("vendorname",vendorname);
            var programid =this.get('programid');
            console.log("programid---from anchorprogram",programid);
            var url = this.get('url');

            let{formdate,
                vendoremail,
                vendorphone,
                vendorbank,
                productquantity
             }=this.getProperties('formdate','vendoremail','vendorphone','vendorbank','productquantity')

             var dataString = {  
                "programid":programid,
                    "status":"Po raised",
                    "InvolvedParties":"manufacturer",
                    "transactionString":{
                        "updatedBy":"manufacturer",
                        "url":url,
                        "vendorname": vendorname,
                        "vendorphone": vendorphone,
                        "vendoremail":vendoremail,
                        "vendorbank":vendorbank,
                        "formdate":formdate,
                        "productquantity":productquantity,
                        "status":"Po raised",
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
                    mycontroller.set('modalmessage', " Purchase order uploaded successfully !!! , Click OK to go back to home")
                    mycontroller.set('percentageComplete', 60);
                    },      
                    error: function(response) {
                    console.log('DEBUG: GET Enquiries Failed');
                    console.log("Error Message: ", response.message);
                    
                    }

                    });            
        },
        gotohome: function() {

            this.toggleProperty('approveProperty');


        },
        approve:function(){
            var programid =this.get('programid');
            console.log("programid---from anchorprogram",programid);
            let{formdate,
                anchorname,
                invoiceno,
                totalamount
             }=this.getProperties('formdate','anchorname','invoiceno','totalamount')

             var dataString = {  
                "programid":programid,
                    "status":"Invoice approved",
                    "InvolvedParties":"manufacturer",
                    "transactionString":{
                        "updatedBy":"manufacturer",
                       "anchorname": anchorname,
                        "invoiceno":invoiceno,
                        "totalamount":totalamount,
                        "formdate":formdate,  
                        "status":"Invoice approved",
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
                    mycontroller.set('modalmessage', "Invoice approved successfully !!! , Click OK to go back to home")
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