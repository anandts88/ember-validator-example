import Ember from 'ember';
import EmberValidator from 'ember-validator';

const { Route } = Ember;

export default Route.extend(EmberValidator, {
  validations: {
    userName: {
      required: true,
      length: {
        minimum: 4,
        maximum: 15
      }
    },

    password: {
      required: true,
      length: {
        minimum: 4,
        maximum: 15
      },
      pattern: {
        hasAlphabet: true,
        hasUpperCase: true,
        hasLowerCase: true,
        hasNumber: true,
        hasNoSpace: true
      }
    }
  },

  model() {
    const model = Ember.Object.create({
      userName: null,
      password: null
    });

    const validations = this.get('validations');

    this.computedValidateMap({
      model,
      validations
    });

    return model;
  },

  actions: {
    submit() {
      const model = this.get('controller.model');
      const validations = this.get('validations');

      model.set('validationResult', null);
      this.validateMap({ model, validations }).then(() => {
        alert('Valid');
      }).catch((validationResult) => {
        model.set('validationResult', validationResult);
      });
    }
  }
});
