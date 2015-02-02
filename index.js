/* jshint node: true */
'use strict';

module.exports = {
  name: 'sa-modal',
  included: function(app) {
      this._super.included(app);
      app.import('vendor/styles.css');
    }
};
