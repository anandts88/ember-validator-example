import Ember from 'ember';
import { scroll } from 'ember-validator-example/utils/utility';

const { Route } = Ember;

export default Route.extend({
  actions: {
    willTransition() {
      scroll();
    }
  }
});
