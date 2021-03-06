var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    QuestionConstants = require('../constants/question_constants.js');


var QuestionStore = new Store(AppDispatcher);
var _questions = [];

var resetQuestions = function (questions) {
  _questions = questions.slice(0);
};

var resetQuestion = function (question) {
  _questions[question.id] = question;
};

var deleteQuestion = function (question) {
  var idx = _questions.indexOf(question);
  _questions.splice(idx, 1);
};

QuestionStore.all = function () {
  return _questions.slice(0);
};

QuestionStore.find = function (id) {
  var found;

  _questions.forEach(function (question) {
    if (question.id === id) {
      found = question;
    }
  });

  return found;
};

QuestionStore.__onDispatch = function (payload) {
    switch(payload.actionType) {
      case QuestionConstants.QUESTIONS_RECEIVED:
        resetQuestions(payload.questions);
        QuestionStore.__emitChange();
        break;

      case QuestionConstants.QUESTION_RECEIVED:
        resetQuestion(payload.question);
        QuestionStore.__emitChange();
        break;

      case QuestionConstants.QUESTION_DELETED:
        deleteQuestion(payload.question);
        QuestionStore.__emitChange();
        break;
    }
};


module.exports = QuestionStore;
