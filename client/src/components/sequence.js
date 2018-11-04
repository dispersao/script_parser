import React, { Component } from 'react';

class Sequence extends Component {

  render() {
    return (
      <div className="SequenceContainer">
        <h3 className="SequenceTitle">{this.props.type.name} - {this.props.location.name} #{this.props.id}</h3>
      </div>
    );
  }
}

export default Sequence;
