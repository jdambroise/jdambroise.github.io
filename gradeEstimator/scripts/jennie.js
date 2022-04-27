(function ($) {

KEYS = {
  ENTER:  13,
  LEFT:   37,
  UP:     38,
  RIGHT:  39,
  DOWN:   40
};

MAX_NUM_HOMEWORKS = 1;
MAX_NUM_QUIZZES   = 1;
MAX_NUM_EXAMS     = 3;

var course_defaults;

switch ($.query.get('course')) {
  case 'complex':
    course_defaults = {
      HOMEWORK_TOTALS:  [],
      HOMEWORKS_WEIGHT: 0.5,
      QUIZ_TOTALS:      [],
      QUIZZES_WEIGHT:   0,
      EXAM_WEIGHTS:     [0.25, 0.25]
    };
    break;

  case 'real':
    course_defaults = {
      HOMEWORK_TOTALS:  [],
      HOMEWORKS_WEIGHT: 0.35,
      QUIZ_TOTALS:      [],
      QUIZZES_WEIGHT:   0.15,
      EXAM_WEIGHTS:     [0.25, 0.25]
    };
    break;

  case 'laode':
    course_defaults = {
      HOMEWORK_TOTALS:  [],
      HOMEWORKS_WEIGHT: 0.25,
      QUIZ_TOTALS:      [],
      QUIZZES_WEIGHT:   0.25,
      EXAM_WEIGHTS:     [0.25, 0.25]
    };
    break;

  case 'calc':
    course_defaults = {
      HOMEWORK_TOTALS:  [100],
      HOMEWORKS_WEIGHT: 0.15,
      QUIZ_TOTALS:      [800],
      QUIZZES_WEIGHT:   0.15,
      EXAM_WEIGHTS:     [0.20, 0.20, 0.30]
    };
    break;

  default:
    course_defaults = {
      HOMEWORK_TOTALS:  [],
      HOMEWORKS_WEIGHT: -1,
      QUIZ_TOTALS:      [],
      QUIZZES_WEIGHT:   -1,
      EXAM_WEIGHTS:     []
    };
}


// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------


displayNumber = function (number, suffix, default_display) {
  return (number >= 0 ? (Math.round(number * 100) / 100) + (suffix || 0) : (default_display || ''));
}


// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------


$(function () {
  var homeworks = [];

  for (var i = 0; i < MAX_NUM_HOMEWORKS; i++) {
    homeworks.push(new Homework({
      number: i,
      total:  course_defaults.HOMEWORK_TOTALS[i] || -1
    }));
  }

  var quizzes = [];

  for (var i = 0; i < MAX_NUM_QUIZZES; i++) {
    quizzes.push(new Quiz({
      number: i,
      total:  course_defaults.QUIZ_TOTALS[i] || -1
    }));
  }

  var exams = [];

  for (var i = 0; i < MAX_NUM_EXAMS; i++) {
    exams.push(new Exam({
      number: i,
      weight: course_defaults.EXAM_WEIGHTS[i] || -1
    }));
  }

  var grade_calculator = new GradeCalculator({
    overall_homeworks: new OverallHomeworks({
      pieces: homeworks,
      weight: course_defaults.HOMEWORKS_WEIGHT
    }),
    overall_quizzes: new OverallQuizzes({
      pieces: quizzes,
      weight: course_defaults.QUIZZES_WEIGHT
    }),
    exam_set: new ExamSet({
      exams: exams
    })
  });

  $('#homeworks')
    .on('input', '.grade-component-weight', function () {
      var weight_percent = parseInt($(this).val());
      grade_calculator.overall_homeworks.update({
        weight: (weight_percent !== NaN ? weight_percent / 100 : -1)
      });

      grade_calculator.calculate();
      grade_calculator.displayIt();
    })
    .on('input', 'tbody input[type=text]', function () {
      var $parent       = $(this).parent().parent();
      var this_homework = grade_calculator.overall_homeworks.getHomework(parseInt($parent.data('number')));

      this_homework.update({
        scored: parseInt($parent.find('.scored').val()),
        total:  parseInt($parent.find('.total').val())
      });

      grade_calculator.calculate();
      grade_calculator.displayIt();
    })
    .on('keydown', 'tbody input[type=text]', function (event) {
      var $parent           = $(this).parent().parent();
      var number            = parseInt($parent.data('number'));
      var property          = $(this).prop('class');
      var switching_tables  = false;
      var $table            = null;

      if (event.which === KEYS.UP || (event.which === KEYS.ENTER && event.shiftKey)) {
        if (number === 0) {
          $table = $('#exams').find('tbody tr[data-number=' + (MAX_NUM_EXAMS - 1) + '] .' + (property === 'scored' ? 'percent' : 'weight'));
          switching_tables = true;
        }
        number = (number + MAX_NUM_HOMEWORKS - 1) % MAX_NUM_HOMEWORKS;
      }
      else if (event.which === KEYS.DOWN || event.which === KEYS.ENTER) {
        if (number === MAX_NUM_HOMEWORKS - 1) {
          $table = $('#quizzes').find('tbody tr[data-number=0] .' + property);
          switching_tables = true;
        }
        number = (number + 1) % MAX_NUM_HOMEWORKS;
      }
      else if (event.which === KEYS.LEFT) {
        property = 'scored';
      }
      else if (event.which === KEYS.RIGHT) {
        property = 'total';
      }

      if (switching_tables) {
        $table.trigger('focus');
      }
      else {
        $parent.parent().find('tr[data-number=' + number + '] .' + property).trigger('focus');
      }
    });

  $('#quizzes')
    .on('input', '.grade-component-weight', function () {
      var weight_percent = parseInt($(this).val());
      grade_calculator.overall_quizzes.update({
        weight: (weight_percent !== NaN ? weight_percent / 100 : -1)
      });

      grade_calculator.calculate();
      grade_calculator.displayIt();
    })
    .on('input', 'tbody input[type=text]', function () {
      var $parent   = $(this).parent().parent();
      var this_quiz = grade_calculator.overall_quizzes.getQuiz(parseInt($parent.data('number')));

      this_quiz.update({
        scored: parseInt($parent.find('.scored').val()),
        total:  parseInt($parent.find('.total').val())
      });

      grade_calculator.calculate();
      grade_calculator.displayIt();
    })
    .on('keydown', 'tbody input[type=text]', function (event) {
      var $parent           = $(this).parent().parent();
      var number            = parseInt($parent.data('number'));
      var property          = $(this).prop('class');
      var switching_tables  = false;
      var $table            = null;

      if (event.which === KEYS.UP || (event.which === KEYS.ENTER && event.shiftKey)) {
        if (number === 0) {
          $table = $('#homeworks').find('tbody tr[data-number=' + (MAX_NUM_HOMEWORKS - 1) + '] .' + property);
          switching_tables = true;
        }
        number = (number + MAX_NUM_QUIZZES - 1) % MAX_NUM_QUIZZES;
      }
      else if (event.which === KEYS.DOWN || event.which === KEYS.ENTER) {
        if (number === MAX_NUM_QUIZZES - 1) {
          $('#exams').find('tbody tr[data-number=0] .' + (property === 'scored' ? 'percent' : 'weight')).trigger('focus');
          switching_tables = true;
        }
        number = (number + 1) % MAX_NUM_QUIZZES;
      }
      else if (event.which === KEYS.LEFT) {
        property = 'scored';
      }
      else if (event.which === KEYS.RIGHT) {
        property = 'total';
      }

      if (switching_tables) {
        $table.trigger('focus');
      }
      else {
        $parent.parent().find('tr[data-number=' + number + '] .' + property).trigger('focus');
      }
    });

  $('#exams')
    .on('input', 'tbody input[type=text]', function () {
      var $parent   = $(this).parent().parent();
      var this_exam = grade_calculator.exam_set.getExam(parseInt($parent.data('number')));

      var weight_percent = parseInt($parent.find('.weight').val());

      this_exam.update({
        percent: parseInt($parent.find('.percent').val()),
        weight:  (weight_percent !== NaN ? weight_percent / 100 : -1)
      });

      grade_calculator.calculate();
      grade_calculator.displayIt();
    })
    .on('keydown', 'tbody input[type=text]', function (event) {
      var $parent           = $(this).parent().parent();
      var number            = parseInt($parent.data('number'));
      var property          = $(this).prop('class');
      var switching_tables  = false;
      var $table            = null;

      if (event.which === KEYS.UP || (event.which === KEYS.ENTER && event.shiftKey)) {
        if (number === 0) {
          $table = $('#quizzes').find('tbody tr[data-number=' + (MAX_NUM_QUIZZES - 1) + '] .' + (property === 'percent' ? 'scored' : 'total'));
          switching_tables = true;
        }
        number = (number + MAX_NUM_EXAMS - 1) % MAX_NUM_EXAMS;
      }
      else if (event.which === KEYS.DOWN || event.which === KEYS.ENTER) {
        if (number === MAX_NUM_EXAMS - 1) {
          $('#homeworks').find('tbody tr[data-number=0] .' + (property === 'percent' ? 'scored' : 'total')).trigger('focus');
          switching_tables = true;
        }
        number = (number + 1) % MAX_NUM_EXAMS;
      }
      else if (event.which === KEYS.LEFT) {
        property = 'percent';
      }
      else if (event.which === KEYS.RIGHT) {
        property = 'weight';
      }

      if (switching_tables) {
        $table.trigger('focus');
      }
      else {
        $parent.parent().find('tr[data-number=' + number + '] .' + property).trigger('focus');
      }
    });
});

})(window.jQuery);
