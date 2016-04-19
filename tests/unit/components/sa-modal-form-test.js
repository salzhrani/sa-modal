import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import Initializer from 'sa-modal/initializers/tappable';
import hbs from 'htmlbars-inline-precompile';

Initializer.initialize();
moduleForComponent('sa-modal-form', 'Modal Form', {
  needs : ['component:sa-modal-title', 'component:sa-modal-trigger'],
  unit: true
});

test('renders', function(assert) {
  assert.expect(6);
  var form = this.subject({
    layout: hbs`form content here <button type="submit"></button>`
  });

  assert.equal(form._state, 'preRender');
  this.render();
  assert.equal(form._state, 'inDOM');
  // has proper class name
  assert.ok(form.$().hasClass('sa-modal-form'));
  // shows layout
  assert.equal(form.$().text().trim(), 'form content here');
  // closes when submit button is clicked
  Ember.run(function(){
    form.open();
    Ember.run.scheduleOnce('afterRender', this, function(){
      assert.equal(form.$().attr('is-open'), 'true');
      form.$('button').trigger('click');
      Ember.run.scheduleOnce('afterRender', this, function(){
        assert.equal(form.$().attr('is-open'), undefined);
      });
    });
  });
});
