import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'nav',

  menus: Ember.A([
    { name: 'Overview', route: 'overview' },
    {
      name: 'Validators',
      submenus: Ember.A([
        { name: 'required' },
        { name: 'notrequired' },
        { name: 'boolean' },
        { name: 'equals' },
        { name: 'contains' },
        { name: 'length' },
        { name: 'date' },
        { name: 'numeric' },
        { name: 'pattern' },
        { name: 'email' },
        { name: 'phone' },
        { name: 'zip' },
        { name: 'ssn' },
        { name: 'file' },
        { name: 'custom' }
      ])
    }
  ])
});
