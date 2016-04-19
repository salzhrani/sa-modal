import Ember from 'ember';
import ModalComponent from './sa-modal';

export default Ember.Component.extend({

  classNames: ['sa-modal-trigger'],

  attributeBindings: [
    'aria-label',
    'disabled',
    'type'
  ],

  /**
   * We don't want triggers as the target for form submits from focused fields.
   */

  type: 'button',

  /**
   * We aren't using a tagName because we want these to always be
   * buttons. Maybe when web components land for real we can inherit
   * from HTMLButtonElement and get <sa-modal-trigger> :D
   *
   * If you change the tagName you must add tabindex and implement keyboard events
   * like a button.
   *
   * @property tagName
   * @private
   */

  tagName: 'button',

  /**
   * Finds the modal this element controls. If a trigger is a child of
   * the modal, you do not need to specify a "controls" attribute.
   *
   * @method findModal
   * @private
   */

  findModal: Ember.on('willInsertElement', function() {
    var parent = findParent(this);
    if (parent) {
      // we don't care about "controls" if we are child
      this.set('modal', parent);
      parent.registerTrigger(this);
    } else {
      // later so that DOM order doesn't matter
      Ember.run.schedule('afterRender', this, function() {
        this.set('modal', Ember.View.views[this.get('controls')]);
      });
    }
  }),

  /**
   * Shows or hides the associated modal.
   *
   * @method toggleModalVisibility
   * @private
   */

  toggleModalVisibility: Ember.on('click', function(event) {
    this.sendAction('on-toggle', this);
    // don't focus if it was a mouse click, cause that's ugly
    var wasMouse = event.clientX && event.clientY;
    this.get('modal').toggleVisibility(this, {focus: !wasMouse});
  }),

  /**
   * When a modal closes it will return focus to the trigger that opened
   * it, keeping the user's focus position.
   *
   * @method focus
   * @public
   */

  focus: function() {
    this.$()[0].focus();
  }

});

function findParent(trigger) {
  var parent = trigger.get('parentView');
  if (!parent) { return false; }
  if (parent instanceof ModalComponent) { return parent; }
  return findParent(parent);
}
