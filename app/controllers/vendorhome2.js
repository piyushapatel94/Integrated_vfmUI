import Ember from 'ember';
import stepperMixin from '../mixins/stepper';

export default Ember.Controller.extend(stepperMixin, {
    actions:{
        vendorprogram:function(status,programid){
            var programid =programid
            this.set("programid",programid);
            console.log("programid--",programid);
            console.log("status--",status);
            if(status === 'Po raised'){
                this.transitionToRoute('vendorhome');
            }if(status === 'Invoice raised'){
                this.toggleProperty('isShowingModal');  
            }if(status === 'payment initiated'){
                this.set('showRxpayment',true);
            }
           
        },
        paymentrecieved:function(){
            var programid = this.get('programid');
            console.log("programid--",programid);
            
            let{formdate,   
                totalamount,
                
               anchorname
             }=this.getProperties('formdate','totalamount','anchorname');

             var dataString = {  
                "programid":programid,
                    "status":"payment recieved",
                    "InvolvedParties":"supplier",
                    "transactionString":{
                        "updatedBy":"supplier",
                        "anchorName": anchorname,
                        "totalamount": totalamount,
                        "anchorname":anchorname,
                        
                        "formdate":formdate,
                       
                        "status":"payment recieved",
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
                    mycontroller.set('showRxpayment',false);
                    mycontroller.set('modalmessage', " Invoice uploaded successfully !!! , Click OK to go back to home")
                    mycontroller.set('percentageComplete', 60);
                    },      
                    error: function(response) {
                    console.log('DEBUG: GET Enquiries Failed');
                    console.log("Error Message: ", response.message);
                    
                    }

                    });       
        }
    }
});