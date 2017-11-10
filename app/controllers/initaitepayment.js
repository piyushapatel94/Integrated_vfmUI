import Ember from 'ember';
import stepperMixin from '../mixins/stepper';

export default Ember.Controller.extend(stepperMixin,{

//this controller for initiate the payment from bank
    actions:{
        initiate: function(){
            console.log("initiate paymets");
            this.set('modalmessage', " Payment Initiated Successfully !!! , Click OK to go back to home");
            this.toggleProperty('approveProperty'); 
        },
        gotohome:function(){
            console.log("in closebutton --------->>>>>> ");
            this.set("ISshowPaymentInitiate",false);
            this.set("closeprogram",false); 
            this.transitionToRoute('regulatorhome');
        }
    }

});