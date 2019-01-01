import React, { Component } from 'react';
import Part from './part';
import _ from 'lodash';

class Sequence extends Component {

  render() {
    let parts = _.sortBy(this.props.parts, ['index']);
    parts = parts.map((part,idx) =>{
      return (
        <Part key={idx}
        characters={part.characters}
        content={part.content}
        extra={part.extra}
        type={part.type}
        reducedView={this.props.reducedView}
        ></Part>
      )
    });
    let clas= "SequenceContainer";
    let charactersList;
    if(this.props.reducedView){
      clas += " reduced";
      charactersList = _.chain(this.props.parts)
                          .map(part => part.characters)
                          .flatten()
                          .uniqBy('name')
                          .map((chara, idx)=> {
                            return <span key={idx} className="label label-default m5">{chara.name}</span>
                          })
                          .value();
    }

    return (
      <div className={clas}>
        <h3 className="SequenceTitle">{this.props.type.name} - {this.props.location.name} <span className="light">#{this.props.id}</span></h3>

        {charactersList && charactersList.length > 0 &&
          <div className="charactersList light">
            {charactersList}
          </div>
        }
        <div className="partsContanier">
          {parts}
        </div>
      </div>
    );
  }
}

export default Sequence;
