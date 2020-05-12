(function ($) {

ExamSet = Class.extend({
  init: function (conf) {
    this.resetState();
    this.update(conf);
  },

  // --------------------------------------------------------------------------

  calculate: function () {
    var exams_score = 0;

    for (var i = 0; i < this.exams.length; i++) {
      if (this.exams[i].percent >= 0 && this.exams[i].weight >= 0) {
        exams_score += this.exams[i].percent * this.exams[i].weight;
      }
    }

    return exams_score;
  },

  // --------------------------------------------------------------------------

  displayIt: function () {
    var $exams_table = $('#exams').find('tbody');

    for (var i = 0; i < this.exams.length; i++) {
      this.exams[i].displayIt($exams_table.find('tr[data-number=' + this.exams[i].number + ']'));
    }
  },

  // --------------------------------------------------------------------------

  getExam: function (number) {
    var found_exam = -1;

    for (var i = 0; i < this.exams.length; i++) {
      if (this.exams[i].number === number) {
        found_exam = this.exams[i];
      }
    }

    return found_exam;
  },

  // --------------------------------------------------------------------------

  resetState: function () {
    this.exams = [];
  },

  // --------------------------------------------------------------------------

  setupMarkup: function () {
    var $exams_table = $('#exams').find('tbody');

    for (var i = 0; i < this.exams.length; i++) {
      this.exams[i].setupMarkup($exams_table);
    }
  },

  // --------------------------------------------------------------------------

  update: function (new_values) {
    new_values = new_values || {};

    var properties = ['exams'];

    for (var i = 0; i < properties.length; i++) {
      var property = properties[i];
      if (typeof new_values[property] !== 'undefined') {
        this[property] = new_values[property];
      }
    }
  }
});

})(window.jQuery);
