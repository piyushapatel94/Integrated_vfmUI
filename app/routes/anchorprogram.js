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
            mycontroller.controllerFor('anchorprogram').set('url',url);
          //  alert("Document uploaded sucessfully!!!!");
             // this.toggleProperty('isShowingModalphoto');
             mycontroller.controllerFor('anchorprogram').set("approveProperty",true);
             mycontroller.controllerFor('anchorprogram').set("modalmessage","file upload sucessfully. 1.. click on ok button");
            console.log("saviing file...");
            console.log("file upload sucessfully. 1..");
            //return image.save();
            
          }, function () {
            //image.rollback();
            console.log("file upload sucessfully...");
          });
          
        },
      
        },
model(){
    var aController = this.controllerFor('anchorprogram');

        aController.set('approveProperty',false);
       
       var programid =  this.controllerFor('anchorhome').get('programid' );        
       console.log('programid from po:' +programid);
       this.controllerFor('anchorprogram').set('programid', programid);

       var showsteplist = this.controllerFor('anchorhome').get('showsteplist' ); 
       console.log('showsteplist from po:' +showsteplist);
       this.controllerFor('anchorprogram').set('showsteplist', showsteplist);

}
});
