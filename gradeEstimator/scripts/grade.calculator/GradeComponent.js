(function ($) {

GradeComponent = Class.extend({
  init: function (conf) {
    this.resetState();
    this.update(conf);
  },

  // --------------------------------------------------------------------------

  resetState: function () {
    this.percent  = -1;
    this.weight   = -1;
  },

  // --------------------------------------------------------------------------

  update: function (new_values) {
    new_values = new_values || {};

    var properties = ['percent', 'weight'];

    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
      if (typeof new_values[property] !== 'undefined') {
        this[property] = new_values[property];
      }
    }

    if (this.weight !== NaN) {
      if (this.weight > 1) {
        this.weight = 1;
      }
    }
    else {
      this.weight = -1;
    }
  }
});

})(window.jQuery);
