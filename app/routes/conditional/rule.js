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
          length: {
            minimum: 4,
            maximum: 20
          },

          pattern: {
            if(model, property) {
              const value = model.get(property);
              return value.length >= 4 && value.length <= 20;
            },
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
