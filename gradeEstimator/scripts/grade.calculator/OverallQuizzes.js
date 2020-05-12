(function ($) {

OverallQuizzes = GradeComponentPieces.extend({
  init: function (conf) {
    this._super(conf);
  },

  // --------------------------------------------------------------------------

  displayIt: function () {
    this._super('quizzes');
  },

  // --------------------------------------------------------------------------

  getQuiz: function (number) {
    return this.getPiece(number);
  },

  // --------------------------------------------------------------------------

  setupMarkup: function () {
    this._super('quizzes');
  }
});

})(window.jQuery);
