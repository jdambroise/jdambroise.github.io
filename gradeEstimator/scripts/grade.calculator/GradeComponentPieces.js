(function ($) {

GradeComponentPieces = GradeComponent.extend({
  init: function (conf) {
    this.resetState();
    this.update(conf);
  },

  // --------------------------------------------------------------------------

  calculate: function () {
    var overall_scored  = 0;
    var overall_total   = 0;

    for (var i = 0; i < this.pieces.length; i++) {
      this.pieces[i].calculate();

      if (this.pieces[i].scored >= 0 && this.pieces[i].total > 0) {
        overall_scored  += this.pieces[i].scored;
        overall_total   += this.pieces[i].total;
      }
    }

    if (overall_scored >= 0 && overall_total > 0) {
      this.percent = (overall_scored / overall_total) * 100;
    }
    else {
      this.percent = -1;
    }
  },

  // --------------------------------------------------------------------------

  displayIt: function (pieces_type) {
    var $pieces_section = $('#' + pieces_type);
    var $pieces_table   = $pieces_section.find('tbody');

    for (var i = 0; i < this.pieces.length; i++) {
      this.pieces[i].displayIt($pieces_table.find('tr[data-number=' + this.pieces[i].number + ']'));
    }

    $pieces_section.find('.grade-component-weight').val(displayNumber(this.weight * 100));
    $pieces_section.find('.overall-percentage-correct').text(displayNumber(this.percent, '%', '----'));
  },

  // --------------------------------------------------------------------------

  getPiece: function (number) {
    var found_piece = -1;

    for (var i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].number === number) {
        found_piece = this.pieces[i];
      }
    }

    return found_piece;
  },

  // --------------------------------------------------------------------------

  resetState: function () {
    this._super();

    this.pieces = [];
  },

  // --------------------------------------------------------------------------

  setupMarkup: function (pieces_type) {
    var $pieces_table = $('#' + pieces_type).find('tbody');

    for (var i = 0; i < this.pieces.length; i++) {
      this.pieces[i].setupMarkup($pieces_table);
    }
  },

  // --------------------------------------------------------------------------

  update: function (new_values) {
    new_values = new_values || {};

    this._super(new_values);

    var properties = ['pieces'];

    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
      if (typeof new_values[property] !== 'undefined') {
        this[property] = new_values[property];
      }
    }
  }
});

})(window.jQuery);
