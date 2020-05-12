(function ($) {

OverallHomeworks = GradeComponentPieces.extend({
  init: function (conf) {
    this._super(conf);
  },

  // --------------------------------------------------------------------------

  displayIt: function () {
    this._super('homeworks');
  },

  // --------------------------------------------------------------------------

  getHomework: function (number) {
    return this.getPiece(number);
  },

  // --------------------------------------------------------------------------

  setupMarkup: function () {
    this._super('homeworks');
  }
});

})(window.jQuery);
