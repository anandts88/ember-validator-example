import Ember from 'ember';

const { Route, RSVP } = Ember;
const { Promise } = RSVP;

export default Route.extend({
  model() {
    return new Promise((resolve) => {
      $.getJSON('./json/date.json', (response) => {
        resolve(Ember.Object.create({
          validator: response
        }));
      });
    });
  }
});
