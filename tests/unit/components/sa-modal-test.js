import {
  moduleForComponent,
  test
} from 'ember-qunit';
import Ember from 'ember';
import Initializer from 'sa-modal/initializers/tappable';
Initializer.initialize();
moduleForComponent('sa-modal', 'SaModalComponent', {
  // specify the other units that are required for this test
  needs: ['component:sa-modal-title', 'component:sa-modal-trigger']
});

test('it renders', function(assert) {
  assert.expect(21);

  var modal = this.subject({});
  assert.equal(modal._state, 'preRender');
  this.render();
  assert.equal(modal._state, 'inDOM');
  assert.equal(modal.$().attr('aria-hidden'), 'true');
  assert.equal(modal.$().attr('role'), 'dialog');
  assert.equal(modal.$().attr('tabindex'), '0');

  // opening a modal using open()
  Ember.run(function(){
    modal.open();
    Ember.run.scheduleOnce('afterRender', null, function(){
      find('sa-modal sa-modal-main', modal.$());
      Ember.run.scheduleOnce('afterRender', null, function(){
        find('button.sa-modal-trigger', modal.$());
        find('sa-modal-title', modal.$());
        assert.equal($('sa-modal-title').text(), 'Modal Content');
        assert.equal(modal.get('after-open'), 'true');
      });
    });
  });

  // closing a modal using close()
  Ember.run(function(){
    modal.close();
    assert.equal(modal.get('isOpen'), false);
    assert.equal(modal.get('after-open'), null);
    Ember.run.scheduleOnce('afterRender', null, function(){
      assert.equal(modal.$('button.sa-modal-trigger').length, 0);
      assert.equal(modal.$('sa-modal-title').length, 0);
    });
  });

  // opening a modal using open-when
  Ember.run(function(){
    modal.set('open-when', true);
    Ember.run.scheduleOnce('afterRender', null, function(){
      find('sa-modal sa-modal-main', modal.$());
      Ember.run.scheduleOnce('afterRender', null, function(){
        find('button.sa-modal-trigger', modal.$());
        find('sa-modal-title', modal.$());
        assert.equal($('sa-modal-title').text(), 'Modal Content');
        assert.equal(modal.get('after-open'), 'true');
      });
    });
  });

  // closing a modal using close()
  Ember.run(function(){
    modal.set('close-when', true);
    assert.equal(modal.get('isOpen'), false);
    assert.equal(modal.get('after-open'), null);
    Ember.run.scheduleOnce('afterRender', null, function(){
      assert.equal(modal.$('button.sa-modal-trigger').length, 0);
      assert.equal(modal.$('sa-modal-title').length, 0);
    });
  });

  // closes when clicking outside
  Ember.run(function(){
    modal.open();
    Ember.run.scheduleOnce('afterRender', null, function(){
      modal.$().trigger('click');
      Ember.run.scheduleOnce('afterRender', null, function(){
        assert.equal(modal.$('button.sa-modal-trigger').length, 0);
        assert.equal(modal.$('sa-modal-title').length, 0);
      });
    });
  });

  // closes when clicking the trigger
  Ember.run(function(){
    modal.open();
    Ember.run.scheduleOnce('afterRender', null, function(){
      modal.$('.sa-modal-trigger').trigger('click');
      Ember.run.scheduleOnce('afterRender', null, function(){
        assert.equal(modal.$('button.sa-modal-trigger').length, 0);
        assert.equal(modal.$('sa-modal-title').length, 0);
      });
    });
  });
});
