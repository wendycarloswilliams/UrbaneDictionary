var React = require('react');
var TermStore = require('../stores/term');
var TermListItem = require('./term_list_item');
var TermList = require('./term_list');
var UserApiUtil = require('./../util/user_api_util');
var UserStore = require('./../stores/user_store');

var Author = React.createClass({

    getInitialState: function () {
      var id = this.props.params.id;
      return { user: {username: ""}, terms: []};
      // return null;
    },

    componentDidMount: function () {
      var id = parseInt(this.props.params.id);
      this.user_listener = UserStore.addListener(this._onChange);
      UserApiUtil.fetchUser(id);
    },

    componentWillUnmount: function () {
      this.user_listener.remove();
    },

    _onChange: function () {
      var id = parseInt(this.props.params.id);
      var userTerms = UserStore.getAuthorTerms();
      this.setState({ user: userTerms.user, terms: userTerms.terms });
    },

    render: function () {
      console.log(this.state);
      return (<div className="author-terms group">

          {this.state.terms.map (function (term){
            return (<TermListItem
              term={term}
              key={term.id}
              user={this.state.user}
              />
            );
          }.bind(this))
        }
      </div>
    );
  }
});

module.exports = Author;
