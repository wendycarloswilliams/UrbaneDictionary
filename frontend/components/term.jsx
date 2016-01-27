var React = require('react');
var TermStore = require('../stores/term');
var History = require('react-router').History;

var Term = React.createClass({

  mixins: [History],

  getInitialState: function () {

    var id = this.getId();
    var term = TermStore.findById(id);
    return {term: term};
  },

  componentWillMount: function () {
    var id = this.getId();
    TermStore.addListener(this._onChange);
    ApiUtil.fetchSingleTerm(id);
  },

  getId: function () {
    var id = typeof this.props.params !== "undefined" ? this.props.params.id : this.props.id;
    id = parseInt(id);
    return id;
  },

  _onChange: function () {
    var id = this.getId();
    // var term = TermStore.findById(id);
    // this.setState({term: TermStore.findById(id)});
  },

  showTerm: function (e) {
    e.preventDefault();
    this.history.pushState(this.state, '/terms/' + this.props.id);
  },

  showUserTerms: function (e) {
    e.preventDefault();
    this.history.pushState(this.state, '/users/' + this.state.term.user_id);
  },

  componentWillReceiveProps: function () {
    var id = parseInt(this.props.id);
    // this.setState({term: TermStore.find_by_id(id)});
  },

  render: function () {
    var months = ["January", "February", "March", "April", "May",
      "June", "July", "August", "September", "October", "November", "December"];
    var usage;
    var date = new Date(this.state.term.created_at);
    var shortMonth = months[date.getMonth()].slice(0,3);
    var dateString = shortMonth + " " + date.getDate();
    if (typeof this.state.term.usage !== "undefined" && this.state.term.usage.length > 0){
      usage = <p className="usage">{this.state.term.usage}</p>;
    } else {
      usage = "";
    }
    return (
      <article className="term">
        <strong className="date">{dateString}</strong>
        <a href="#" onClick={this.showTerm}>
          <h2>{this.state.term.term}</h2>
        </a>
        <p className="definition">
          {this.state.term.definition}
        </p>
        {usage}
        <p className="author">
          by <a href="#" onClick={this.showUserTerms}>  {this.state.term.user.username}
          </a>
          {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
        </p>
      </article>
    );
  }
});

module.exports = Term;
