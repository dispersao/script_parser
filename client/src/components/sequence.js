import React, { Component } from 'react';
import Part from './part';

class Sequence extends Component {

  render() {
    const parts = this.props.parts.map((part,idx) =>{
      return (
        <Part key={idx}
        characters={part.characters}
        content={part.content}
        extra={part.extra}
        type={part.type}></Part>
      )
    });
    return (
      <div className="SequenceContainer">
        <h3 className="SequenceTitle">{this.props.type.name} - {this.props.location.name} <span className="light">#{this.props.id}</span></h3>
        <div className="partsContanier">
          {parts}
        </div>
      </div>
    );
  }
}

export default Sequence;
