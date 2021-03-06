var React = require('react'),
    QuestionForm = require('./questions/questionForm.jsx'),
    QuestionStore = require('../stores/question.js'),
    QuestionActions = require('../actions/question_actions.js'),
    About = require('../constants/about.jsx'),
    TagStore = require('../stores/tag.js'),
    TagActions = require('../actions/tag_actions.js'),
    Link = require('react-router').Link,
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    Fuse = require('fuse.js');


var NavBar = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      questions: QuestionStore.all(),
      searchInput: "",
      allTags: TagStore.all()
    };
  },

  _onChange: function () {
    this.setState({
      questions: QuestionStore.all(),
      allTags: TagStore.all()
    });
  },

  clearSearch: function () {
    this.setState({searchInput: ""});
  },

  componentDidMount: function () {
    this.searchListener = QuestionStore.addListener(this._onChange);
    this.tagListener = TagStore.addListener(this._onChange);
    QuestionActions.fetchQuestions();
  },

  componentWillUnmount: function () {
    this.searchListener.remove();
    this.tagListener.remove();
  },

  search: function () {
    var questions = this.state.questions,
        questionTitles = [];
        
    if (questions.length > 0) {
      questions.map(function (question) {
        questionTitles.push(question.title);
      });
    }

    var options = {
      caseSensitive: false,
      includeScore: false,
      shouldSort: true,
      threshold: 0.5,
      keys: ['title']
    };


    var fuse = new Fuse(questionTitles, options);
    if (fuse.search(this.state.searchInput).length > 0) {
      var searchResults = {};
      fuse.search(this.state.searchInput).forEach(function (result) {
        searchResults[result] = fuse.list[result];
      });
      return searchResults;
    } else {
     return false;
    }

  },


  render : function () {
    var searchResults = <div></div>,
        searchList = "search-list",
        url;

    if (this.search()) {
      searchList += "reveal";
      var userResults = this.search();
      searchResults = Object.keys(userResults).map(function (questionId, idx) {
        url = '/question/' + (parseInt(questionId) + 1);
        return <div key={idx}>
          <div className="search-result" key={idx}>
            <Link to={url} key={idx}>{userResults[parseInt(questionId)]}</Link>
          </div>
          <br></br>
        </div>;
      });
    }

    return (

      <div className="nav-bar">

        <QuestionForm
          tags={this.state.allTags}
          className="question-form"
          id="new"
          new={true}/>

        <About/>

        <div className="search-bar">
          <h2 id="tagline">asdf</h2>

          <form onSubmit={this.handleSubmit}>
            <div className="search-parameter">
              <input
                type="text"
                placeholder="I want to explore..."
                valueLink={this.linkState('searchInput')} />
            </div>
          </form>

          <div onClick={this.clearSearch} className={"search-list" + searchList}>
            {searchResults}
          </div>

        </div>

        <hr id='nav-line'/>
      </div>


    );

  }
});



module.exports = NavBar;
