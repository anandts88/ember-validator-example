import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

const {
  modulePrefix,
  podModulePrefix,
  pageLoader
} = config;

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix,
  podModulePrefix,
  Resolver,
  ready() {
    Ember.$(pageLoader).remove();
  }
});

loadInitializers(App, modulePrefix);

export default App;
