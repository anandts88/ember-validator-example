import Ember from 'ember';
import config from './config/environment';

const { Router } = Ember;

const AppRouter = Router.extend({
  location: config.locationType
});

AppRouter.map(function() {
  this.route('overview', {path: '/'});
  this.route('required');
  this.route('notrequired');
  this.route('boolean');
  this.route('contains');
  this.route('date');
  this.route('numeric');
  this.route('length');
  this.route('pattern');
  this.route('equals');
  this.route('email');
  this.route('zip');
  this.route('ssn');
  this.route('file');
  this.route('phone');
  this.route('custom');
});

export default AppRouter;
