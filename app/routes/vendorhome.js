import Ember from 'ember';

export default Ember.Route.extend({
    actions:{
        uploadDoc:function (file) {
            // var mycontroller = this;
            console.log("entering upload FIR 3");
    var mycontroller = this;
             console.log(file)
       
          file.upload('http://192.168.0.11:3000/UploadDocs').then(function (response) {
            console.log(JSON.stringify(response));
            var url =response.body.url;
            console.log("url ::",JSON.stringify(url));
            mycontroller.controllerFor('vendorhome').set('url',url);
          
             mycontroller.controllerFor('vendorhome').set("approveProperty",true);
             mycontroller.controllerFor('vendorhome').set("modalmessage","file upload sucessfully. 1.. click on ok button");
           
            console.log("file upload sucessfully. 1..");
            //return image.save();
            
          }, function () {
            //image.rollback();
            console.log("file upload sucessfully...");
          });
          
        },
      
        },
    model(){
        var vendorController = this.controllerFor('vendorhome');

        //vendorController.set('approveProperty',false);
        vendorController.set('currentStep',1);
       
        var programid =  this.controllerFor('vendorhome2').get('programid' );        
        console.log('programid from vendorhome>>:' +programid);
        this.controllerFor('vendorhome').set('programid', programid);
    }
});
