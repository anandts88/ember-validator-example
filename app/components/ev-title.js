import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  mobile: __device.mobile
});
