var ApiActions = require('../actions/api_actions.js');


var ApiUtil = {
  fetchAllQuestions: function () {
    $.ajax({
      url: '/api/questions',
      success: function (questions) {
        ApiActions.receiveAllQuestions(questions);
      }
    });
  },

  fetchSingleQuestion: function (id) {
    $.ajax({
      url: '/api/questions/' + id,
      success: function (question) {
        ApiActions.receiveSingleQuestion(question);
      }
    });
  },

  createQuestion: function (question) {
    $.ajax({
      url: '/api/questions',
      type: 'POST',
      data: {question: question},
      success: function (question) {
        ApiActions.receiveSingleQuestion(question);
      }
    });
  },

  editQuestion: function (question) {
    $.ajax({
      url: 'api/questions/' + question.id,
      type: 'PUT',
      data: {question: question},
      success: function (question) {
        ApiActions.receiveSingleQuestion(question);
      }
    });
  },

  destroyQuestion: function (id) {
    $.ajax({
      url: 'api/questions/' + id,
      type: 'DELETE',
      success: function (question) {
        ApiActions.deleteSingleQuestion(question);
      }
    });
  }
}



module.exports = ApiUtil;
