var React = require('react'),
    QuestionActions = require('../actions/question_actions.js'),
    History = require('react-router').History,
    LinkedStateMixin = require('react-addons-linked-state-mixin');



var QuestionForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  blankForm: {
    title: '',
    body: ' ',
    author_id: null,
    modal: false
  },

  getInitialState: function () {
    return this.blankForm;
  },

  populateForm: function () {
    this.setState({
      title: this.props.question.title,
      body: this.props.question.body,
      author_id: this.props.question.author_id
    });
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var question = Object.assign({}, this.props.question, this.state);

    if (this.props.new) {
      QuestionActions.createQuestion(question);
      this.setState(this.blankForm);
    } else if (!this.props.new) {
      QuestionActions.editQuestion(question);
    }
  },

  changeModal: function () {
    var change = this.state.modal ? false : true
    this.setState({modal: change})
  },

  componentDidMount: function () {
    if (!this.props.new) {this.populateForm();}
  },


  render: function () {
    var modal = this.state.modal ? true : false
    var prompt;
    var submit;


    if (this.props.new) {
      prompt = "Ask Question"
      submit = 'Ask Your Question!';
    } else {
      prompt = "Edit Question"
      submit = 'Update Question!';
    }

    if (!modal) {
      return(
        <div onClick={this.changeModal}>
          {prompt}
        </div>
      )

    } else {

      return (
        <span>
          {prompt}
          <br/>
          <div className='modal-screen' onClick={this.changeModal}/>
          <div className='modal-content'>
            <form onSubmit={this.handleSubmit}>

              <div>
                <input
                  type='hidden'
                  id="question_author_id"
                  valueLink={this.linkState('author_id')}
                  />
              </div>

              <div>
                <label htmlFor='question_title'>Enter Question:</label>
                <input
                  type='text'
                  id='question_title'
                  valueLink={this.linkState('title')}
                  />
              </div>


              <div>
                <label htmlFor='question_body'>Enter Details:</label>
                <input
                  type='text'
                  id='question_body'
                  valueLink={this.linkState('body')}
                  />
              </div>

              <input type='submit' className='btn' value={submit}/>
            </form>
          </div>
        </span>
      );
    }
  }
});



module.exports = QuestionForm;
