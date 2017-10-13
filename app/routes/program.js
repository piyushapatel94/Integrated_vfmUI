import Ember from 'ember';
import stepperMixin from '../mixins/stepper';

export default Ember.Route.extend(stepperMixin,{
  
    model(){
      /*   var programController = this.controllerFor('program');
         programController.set('closureConfirmation',false);  */       
     
       //  var select =this.controllerFor('program').get('selectedAnchor');
     //    console.log("selectedAnchor :--",selectedAnchor); 
     this.controllerFor('program').set("isShowingModal",false);
     //this.controllerFor('program').set("selectedvendor",);
    }
});
