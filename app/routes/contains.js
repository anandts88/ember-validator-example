import Ember from 'ember';
import EmberValidator from 'ember-validator';

const { Route, RSVP } = Ember;
const { Promise } = RSVP;

export default Route.extend(EmberValidator, {
  model() {
    return new Promise((resolve) => {
      $.getJSON('./json/contains.json', (response) => {
        resolve(Ember.Object.create({
          validator: response,
          isAccept: false
        }));
      });
    });
  }
});