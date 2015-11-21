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
        { name: 'contains' },
        { name: 'date' },
        { name: 'numeric' },
        { name: 'length' },
        { name: 'pattern' },
        { name: 'equals' },
        { name: 'email' },
        { name: 'zip' },
        { name: 'ssn' },
        { name: 'file' }
      ])
    }
  ])
});
