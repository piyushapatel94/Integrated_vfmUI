import Ember from 'ember';
import CONFIG from 'vendorfin/config/environment';
export default Ember.Route.extend({

    model() {
        return "welcome to another sample page";
    }
});