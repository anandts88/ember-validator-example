import Ember from 'ember';
import EmberValidator from 'ember-validator';

const { Route } = Ember;

export default Route.extend(EmberValidator, {
  model() {
    return Ember.Object.create({
      description: null
    });
  },

  actions: {
    submit() {
      const model = this.get('controller.model');
      const validations = {
        description: {
          if(model, property) {
            const value = model.get(property);
            return !Ember.isEmpty(value);
          },

          length: {
            minimum: 4,
            maximum: 20
          },

          pattern: {
            with: /^[a-zA-Z]*$/,
            message: 'Must contain only alphabet'
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
