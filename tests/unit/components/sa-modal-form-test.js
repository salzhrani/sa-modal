import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import Initializer from 'sa-modal/initializers/tappable';
Initializer.initialize();
moduleForComponent('sa-modal-form', 'Modal Form', {
  needs : ['component:sa-modal-title', 'component:sa-modal-trigger']
});
test('renders', function(){
  expect(6);
  var form = this.subject({
    layout: Ember.Handlebars.compile('form content here <button type="submit"></button>')
  });
  equal(form._state, 'preRender');
  this.append();
  equal(form._state, 'inDOM');
  // has proper class name
  ok(form.$().hasClass('sa-modal-form'));
  // shows layout
  equal(form.$().text().trim(), 'form content here');
  // closes when submit button is clicked
  Ember.run(function(){
    form.open();
    Ember.run.scheduleOnce('afterRender', this, function(){
      equal(form.$().attr('is-open'), 'true');
      form.$('button').trigger('click');
      Ember.run.scheduleOnce('afterRender', this, function(){
        equal(form.$().attr('is-open'), undefined);
      });
    });
  });
});
