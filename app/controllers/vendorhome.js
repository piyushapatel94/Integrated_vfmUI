import Ember from 'ember';
import stepperMixin from '../mixins/stepper';
import CONFIG from 'vendorfin/config/environment';
export default Ember.Controller.extend(stepperMixin, {
    anchorList: ["ManufacturerA", "ManufacturerB", "ManufacturerC", "ManufacturerD", "ManufacturerE"],
    anchorName: null,
    anchorEmail: null,
    anchorPhone: null,
    anchorBank: null,
    selectedAnchor: false,
    actions: {
        //jump t appoval step
        paymentapproval: function() {

            this.set('selectedAnchor', false);
            var currentStep = this.get('currentStep');
            currentStep = currentStep + 3;
            this.set('currentStep', currentStep);
        },
        //approve paymet
        approvePayment: function() {
            this.set('modalmessage', " Payment Approved !!");
            this.toggleProperty('approveProperty');
        },
        invoiceupload: function() {
            var anchorName =this.get('anchorName');
            console.log("anchorName",anchorName);
            var programid =this.get('programid');
            console.log("programid---from vendorhome",programid);
            let{formdate,   
                totalamount,
                anchorbank,
                productquantity
             }=this.getProperties('formdate','totalamount','anchorbank','productquantity')

             var dataString = {  
                "programid":programid,
                    "status":"Invoice raised",
                    "InvolvedParties":"supplier",
                    "transactionString":{
                        "updatedBy":"supplier",
                        "anchorName": anchorName,
                        "totalamount": totalamount,
                        
                        "anchorbank":anchorbank,
                        "formdate":formdate,
                        "productquantity":productquantity,
                        "status":"Invoice raised",
                    }
                };
                console.log(JSON.stringify(dataString));
                    var mycontroller = this;

                    return $.ajax({
                    url: CONFIG.GOURL+'/updateProgram',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(dataString),
                    success: function(response) {
                        var message = response.message;
                    console.log("message" + JSON.stringify(response));
                    mycontroller.toggleProperty('isShowPOPup');
                    //mycontroller.set('modalmessage', " Invoice uploaded successfully !!! , Click OK to go back to home")
                    //mycontroller.set('percentageComplete', 100);
                    },      
                    error: function(response) {
                    console.log('DEBUG: GET Enquiries Failed');
                    console.log("Error Message: ", response.message);
                    
                    }

                    });       
            
            this.set('percentageComplete', 100);
        },
        toggleModal: function(usertype) {
            this.toggleProperty('approveProperty');
        },
        gotohome: function() {
            var currentStep = this.get('currentStep');
            //currentStep = currentStep -1;
            if (currentStep === 6) {
                currentStep = currentStep - 3;
            }
            this.set('currentStep', currentStep);
            this.toggleProperty('approveProperty');
            this.toggleProperty('selectedAnchor');
            //this.transitionToRoute('vendorhome')
        },
        SelectAnchor: function(chooseanchor) {
            var chooseanchor = chooseanchor;
            console.log("chooseanchor :" + chooseanchor);
            if (chooseanchor === 'ManufacturerA') {
                this.set('anchorName', 'ManufacturerA');
                //this.set('anchorEmail', 'ManufacturerA@xx.com');
                //this.set('anchorPhone', 9990001111);
                //this.set('anchorBank', 'RBL');
            } else if (chooseanchor === 'ManufacturerB') {
                this.set('anchorName', 'ManufacturerB');
                //this.set('anchorEmail', 'ManufacturerB@xx.com');
                //this.set('anchorPhone', 9990001111);
                //this.set('anchorBank', 'RBL');
            } else if (chooseanchor === 'ManufacturerC') {
                this.set('anchorName', 'ManufacturerC');
                //this.set('anchorEmail', 'ManufacturerC@xx.com');
                //this.set('anchorPhone', 9990001155);
                //this.set('anchorBank', 'RBL');
            } else if (chooseanchor === 'ManufacturerD') {
                this.set('anchorName', 'ManufacturerD');
                //this.set('anchorEmail', 'ManufacturerD@xx.com');
                //this.set('anchorPhone', 9990001144);
                //this.set('anchorBank', 'RBL');
            } else if (chooseanchor === 'ManufacturerE') {
                this.set('anchorName', 'ManufacturerE');
                //this.set('anchorEmail', 'ManufacturerE@xx.com');
                //this.set('anchorPhone', 9990001177);
                //this.set('anchorBank', 'RBL');
            }
            var currentStep = this.get('currentStep');
            console.log("currentStep",currentStep);
            if (currentStep != 4 && currentStep != 7) {
                this.send('nextStep');

            }
        },
        gotobackhome:function(){
            this.set("isShowPOPup",false);
            this.transitionToRoute("vendorhome2");
        }
    }
});