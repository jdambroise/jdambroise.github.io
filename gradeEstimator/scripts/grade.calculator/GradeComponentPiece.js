(function ($) {

GradeComponentPiece = Class.extend({
  init: function (conf) {
    this.resetState();
    this.update(conf);
  },

  // --------------------------------------------------------------------------

  calculate: function () {
    if (this.scored >= 0 && this.total > 0) {
      this.percent = (this.scored / this.total) * 100;
    }
    else {
      this.percent = -1;
    }
  },

  // --------------------------------------------------------------------------

  displayIt: function ($piece_row) {
    var default_display = '';

    if (this.scored >= 0 || this.total > 0) {
      default_display = '----';
    }

    $piece_row
      .find('.scored').val(displayNumber(this.scored)).end()
      .find('.total').val(displayNumber(this.total)).end()
      .find('.percent').text(displayNumber(this.percent, '%', default_display));
  },

  // --------------------------------------------------------------------------

  resetState: function () {
    this.number   = -1;
    this.percent  = -1;
    this.scored   = -1;
    this.total    = -1;
    this.markup   = '';
  },

  // --------------------------------------------------------------------------

  setupMarkup: function ($pieces_table) {
    $pieces_table.append(this.markup);
  },

  // --------------------------------------------------------------------------

  // Update the properties that need to be updated.
  update: function (new_values) {
    new_values = new_values || {};

    var properties = ['number', 'percent', 'scored', 'total'];

    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
      if (typeof new_values[property] !== 'undefined') {
        this[property] = new_values[property];
      }
    }

    if (this.scored === NaN) {
      this.scored = -1;
    }
    if (this.total === NaN) {
      this.total = -1;
    }

    this.markup = [
      '<tr data-number="' + this.number + '">',
        '<td class="number-display">' + (this.number + 1) + '</td>',
        '<td><input class="scored" type="text" value="" /></td>',
        '<td><input class="total" type="text" value="" /></td>',
        '<td class="percent-display"><span class="percent"></span></td>',
      '</tr>'
    ].join('\n');
  }
});

})(window.jQuery);
