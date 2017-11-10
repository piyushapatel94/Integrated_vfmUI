import Ember from 'ember';
import stepperMixin from '../mixins/stepper';

export default Ember.Controller.extend(stepperMixin, {

    isShowinginvoice:false,
    selectedVendor: null,
    vendornotchoosen: true,
    percentageComplete: 0,
    showDetails: false,
    currentStep: 0,
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

    columns: [{
            "propertyName": "sl",
            "title": "sl.",
            "className": "text-left"
        },
        {
            "propertyName": "ProgramName",
            "title": "Program",
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
            "routeName": "users.user"

        },
        {
            "propertyName": "status",
            "title": "Status",
            "className": "text-left"
        },
        {
            "title": "Detailings",
            "template": "custom/anchorprogram"
        }
    ],

    actions: {
        //this function for detail button on anchorhome
        anchorprogram: function(status,programid ,item) {
             var status = status;
            console.log("status --",status);
            var programid = programid;
            console.log("programid --",programid);
            this.set('programid',programid);
            var item = item ;
            console.log("item --",JSON.stringify(item));
            //var status = record.status;
            if (status === "program Initiated") {
               // this.set('currentStep', 1);
               this.transitionToRoute('anchorprogram');
            }  if (status === "Invoice raised") {
               this.set("showsteplist",true);
                this.transitionToRoute('anchorprogram', { queryParams: { steps: 'invoice' } });
            //this.set("isShowinginvoice",true);
            }


        },
        poupload: function() {
            this.set('modalmessage', " Purchase order uploaded successfully !!! , Click OK to go back to home")
            console.log("approved");
            this.toggleProperty('approveProperty');
            this.set('percentageComplete', 100);
        },

        //jump t appoval step
        payments: function() {

            this.set('selectvendor', false);
            var currentStep = this.get('currentStep');
            console.log("currentStep" + currentStep);
            currentStep = currentStep + 3;
            this.set('currentStep', currentStep);
            console.log("currentStep" + currentStep);

        }
       

    }
});