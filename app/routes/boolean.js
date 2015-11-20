import Ember from 'ember';
import EmberValidator from 'ember-validator';

const { Route } = Ember;

export default Route.extend(EmberValidator, {
  model() {
    return Ember.Object.create({
      isAccept: false
    });
  },

  actions: {
    submit() {
      const model = this.get('controller.model');
      const validations = {
        isAccept: {
          boolean: {
            required: true,
            messages: {
              required: 'Please accept terms'
            }
          }
        }
      };

      model.set('validationResult', null);
      this.validateMap({ model, validations }).then(() => {
        alert('Valid');
      }).catch((validationResult) => {
        model.set('validationResult', validationResult);
      });
    }
  }
});
