import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'sa-modal-title',

  attributeBindings: ['aria-hidden'],

  /**
   * Tells the screenreader not to read this element. The modal has its
   * 'aria-labelledby' set to the id of this element so it would be redundant.
   *
   * @property aria-hidden
   */

  'aria-hidden': 'true',

  /**
   * @method registerTitle
   * @private
   */

  registerWithModal: Ember.on('willInsertElement', function() {
    this.get('parentView').registerTitle(this);
  })

});
