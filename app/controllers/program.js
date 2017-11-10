import Ember from 'ember';
import stepperMixin from '../mixins/stepper';
import CONFIG from 'vendorfin/config/environment';
var selectedAnchor;
var  selectedvendor =[];
export default Ember.Controller.extend(stepperMixin, {
    queryParams: ['step'],
    step: null,
    anchornotchoosen: true,
    vendornotchoosen: true,
    percentageComplete: 0,
    currentStep: 0,
    watchstep: function() {
        var step = this.get('step');
        if (step === 'close') {
            this.set('currentStep', 8);
            this.set('percentageComplete', 0);
        }
        if (step === 'init') {
            this.set('currentStep', 0);
            this.set('percentageComplete', 0);
        }
    }.observes('step'),

    alist: [{
        "name": "ABC Pvt ltd"
    }, {}],
    anchorList: ["ManufaturerA", "ManufaturerB", "ManufaturerC", "ManufaturerD", "ManufaturerE"],
   // vendorList: ["SupplierA", "SupplierB", "SupplierC", "SupplierD", "SupplierE"],

    actions: {
        chooseAnchor: function(anchorItem) {
            selectedAnchor =anchorItem;
            console.log("----------in program cntr",anchorItem);
            this.set('selectedAnchor', anchorItem);
            this.set('anchornotchoosen', false);
            this.set('vendorregulator', true);
            //console.log("vendorregulator:"+vendorregulator);      
            this.set('percentageComplete', 30);
            var currentStep = this.get('currentStep');
            //  this.send('nextStep');
            if (currentStep != 4 && currentStep != 7) {
                this.send('nextStep');
            }
        },
        chooseVendor: function(vendorItem) {
            selectedvendor = vendorItem,
            console.log("vendorItem-----",vendorItem);
            this.set('selectedVendor', selectedvendor);
            this.this.modelFor('program').set('selectedVendor', vendorItem);
            this.send('selectedVendor', vendorItem);
            this.set('vendornotchoosen', false);
            this.set('percentageComplete', 60);
            var currentStep = this.get('currentStep');
            if (currentStep != 3) {
                this.send('nextStep');
            }
        },
        closure: function() {
            this.toggleProperty('closureConfirmation');
            this.set('percentageComplete', 100);
        },
        gotohome: function() {
            this.transitionToRoute('regulatorhome');
        },
        toggleModal: function(usertype) {
            console.log("usertype---",usertype);
            var selectedAnchor =this.get('selectedAnchor');
            console.log('selectedAnchor111111---- :',selectedAnchor);
            var selectedvendor =this.get('selectedvendor');
            console.log('selectedvendor :',selectedvendor);
            var selectedvendor1 =selectedvendor.toString();
            console.log('selectedvendor1-- :',selectedvendor1);
            var programobj = {
                "status":"program Initiated",
                "InvolvedParties":selectedAnchor,
                "transactionString":{
                    "updatedBy":"banker",
                    "selectedAnchor":selectedAnchor,
                   "selectedvendor":selectedvendor1,
                    "status":"program Initiated"
                }
            };

         
                console.log(JSON.stringify(programobj));
                var mycontroller = this;
    
                     $.ajax({
                    url:  CONFIG.GOURL+'/createProgram',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(programobj),
                    success: function(response) {
                    var message = response.message;
                    console.log("message" + message);
                    
                    mycontroller.toggleProperty('isShowingModal');
                    // mycontroller.transitionToRoute('userhome')
                     //mycontroller.transitionToRoute('home');
    
                    },      
                        error: function(response) {
                       console.log('DEBUG: GET Enquiries Failed');
                       console.log("Error Message: ", response.message);
                       
                }
                    
                    });


            //this.toggleProperty('isShowingModal');
            this.set('percentageComplete', 100);
        }
    }



});