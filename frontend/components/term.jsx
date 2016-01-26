var React = require('react');

var Term = React.createClass({


  render: function () {
    var usage;
    if (this.props.usage.length > 0){
      usage = <p className="usage">{this.props.usage}</p>;
    } else {
      usage = "";
    }
    return (<article className="term">
      <a href={"terms/" + this.props.id}>
        <h2>{this.props.term}</h2>
      </a>
      <p className="definition">
        {this.props.definition}
      </p>
      {usage}
    </article>
  );
  }
});

module.exports = Term;
