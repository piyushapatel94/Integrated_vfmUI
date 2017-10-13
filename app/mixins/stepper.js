import Ember from 'ember';
var selectedvendor =[];
export default Ember.Mixin.create({
    vendorList: ["SupplierA", "SupplierB", "SupplierC", "SupplierD", "SupplierE"],
    // anchorList : ["ABC Enterprise", "SFS","Syntel Solutions","Jaguar","Honda"],
    selectedAnchor: null,
    selectedVendor: null,
    selectedvendor: [],
    //  selectedvendor :Ember.A(), 
    //selectvendor :null,
    vendoranchorlist: false,
    vendorregulator: false,
    PORaised: false,

    actions: {
      /*  chooseAnchor: function(anchorItem) {
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
        },*/
        chooseVendor: function(vendorItem) {
            selectedvendor = vendorItem,
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
        
        saveModel: function() {
            console.log("TODDO: called when all steps are completed");
        },
        nextStep: function() {
            var currentStep = this.get('currentStep');
            currentStep = currentStep + 1;
            this.set('currentStep', currentStep);
        },
        previousStep: function() {
            var currentStep = this.get('currentStep');
            currentStep = currentStep - 1;
            this.set('currentStep', currentStep);
        },
        submitselectvendorlist: function(selectvendor) {
            var selectvendor = selectvendor;
            console.log('selectvendor-------' + selectvendor);
            this.set('selectedvendor ', selectvendor);
            console.log("selectedvendor :" + selectvendor);
            this.set('vendoranchorlist', true);
            // console.log("vendoranchorlist"+vendoranchorlist);
            var currentStep = this.get('currentStep');
            if (currentStep != 3) {
                this.send('nextStep');
            }
        },
        approve: function() {
            console.log("this is approve button");
            this.set('modalmessage', " Approve the order successfully !!! , Click OK to go back to home");
            console.log("approved");
            this.toggleProperty('approveProperty');
        },
        closure: function() {
            this.toggleProperty('approveProperty');
        },
        particularVendor: function(myselectedvendor ,vendorList) {
            
          
            console.log("selectedVendorName -->>>>>>>>>--:" + myselectedvendor);
            console.log("abc");
            console.log("vendorList -",vendorList);
           // this.set('selectedVendor', selectedvendor);

            /*if (selectedVendorName === 'TCS') {
                console.log("if TCS  loop");
                this.set('vendorname', 'TCS');
                this.set('vendoremail', 'tcs@abc.com');
                this.set('vendorphone', 9595000095);
                this.set('vendorbank', 'ICICI Bank');
            } else if (selectedVendorName === 'Hexaware') {
                console.log("if Hexaware loop");
                this.set('vendorname', 'Hexaware');
                this.set('vendoremail', 'hex@abc.com');
                this.set('vendorphone', 9995111195);
                this.set('vendorbank', 'HDFC Bank');
            } else if (selectedVendorName === 'Syntex') {
                console.log("if Syntex loop");
                this.set('vendorname', 'Syntex');
                this.set('vendoremail', 'syntex@abc.com');
                this.set('vendorphone', 998888888);
                this.set('vendorbank', 'Dena Bank');
            } else if (selectedVendorName === 'Jaguar') {
                console.log("if Jaguar loop");
                this.set('vendorname', 'Jaguar');
                this.set('vendoremail', 'Jaguar@abc.com');
                this.set('vendorphone', 8500000001);
                this.set('vendorbank', 'SBI Bank');
            } else if (selectedVendorName === 'Honda') {
                console.log("if Honda loop");
                this.set('vendorname', 'Honda');
                this.set('vendoremail', 'honda@abc.com');
                this.set('vendorphone', 9995111195);
                this.set('vendorbank', 'Bank of India');
            }*/
            var currentStep = this.get('currentStep');
            console.log("currentStep:::"+currentStep);
            currentStep = currentStep + 1;
            this.set('currentStep', currentStep);

        },



    }
});