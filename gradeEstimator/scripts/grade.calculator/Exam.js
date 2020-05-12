(function ($) {

Exam = GradeComponent.extend({
  init: function (conf) {
    this.resetState();
    this.update(conf);
  },

  // --------------------------------------------------------------------------

  displayIt: function ($piece_row) {
    $piece_row
      .find('.percent').val(displayNumber(this.percent)).end()
      .find('.weight').val(displayNumber(this.weight * 100));
  },

  // --------------------------------------------------------------------------

  resetState: function () {
    this._super();

    this.number = -1;
  },

  // --------------------------------------------------------------------------

  setupMarkup: function ($exams_table) {
    $exams_table.append(this.markup);
  },

  // --------------------------------------------------------------------------

  update: function (new_values) {
    new_values = new_values || {};

    this._super(new_values);

    var properties = ['number'];

    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
      if (typeof new_values[property] !== 'undefined') {
        this[property] = new_values[property];
      }
    }

    this.markup = [
      '<tr data-number="' + this.number + '">',
        '<td class="number-display">' + (this.number + 1) + '</td>',
        '<td><input class="percent" type="text" value="" /></td>',
        '<td><input class="weight" type="text" value="" /></td>',
      '</tr>'
    ].join('\n');
  }
});

})(window.jQuery);
