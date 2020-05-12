(function ($) {

GradeCalculator = Class.extend({
  init: function (conf) {
    this.resetState();
    this.update(conf);
    this.setupMarkup();
    this.displayIt();
  },

  // --------------------------------------------------------------------------

  calculate: function () {
    this.overall_homeworks.calculate();
    this.overall_quizzes.calculate();

    var overall_homeworks_score = 0;
    var overall_quizzes_score   = 0;
    var exams_score             = this.exam_set.calculate();

    if (this.overall_homeworks.percent >= 0 && this.overall_homeworks.weight >= 0) {
      overall_homeworks_score = this.overall_homeworks.percent * this.overall_homeworks.weight;
    }
    if (this.overall_quizzes.percent >= 0 && this.overall_quizzes.weight >= 0) {
      overall_quizzes_score = this.overall_quizzes.percent * this.overall_quizzes.weight;
    }

    if (overall_homeworks_score >= 0 && overall_quizzes_score >= 0 && exams_score >= 0) {
      this.final_score = overall_homeworks_score + overall_quizzes_score + exams_score;
    }
    else {
      this.final_score = -1;
    }
  },

  // --------------------------------------------------------------------------

  displayIt: function () {
    this.overall_homeworks.displayIt();
    this.overall_quizzes.displayIt();
    this.exam_set.displayIt();

    $('#grade').find('.final-score').text(displayNumber(this.final_score, '%', '----'));
  },

  // --------------------------------------------------------------------------

  resetState: function () {
    this.overall_homeworks  = null;
    this.overall_quizzes    = null;
    this.exam_set           = null;
    this.final_score        = -1;
  },

  // --------------------------------------------------------------------------

  setupMarkup: function () {
    this.overall_homeworks.setupMarkup();
    this.overall_quizzes.setupMarkup();
    this.exam_set.setupMarkup();
  },

  // --------------------------------------------------------------------------

  update: function (new_values) {
    new_values = new_values || {};

    var properties = ['overall_homeworks', 'overall_quizzes', 'exam_set', 'final_score'];

    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
      if (typeof new_values[property] !== 'undefined') {
        this[property] = new_values[property];
      }
    }
  }
});

})(window.jQuery);
