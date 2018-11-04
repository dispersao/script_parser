import React, { Component } from 'react';

class Part extends Component {

  render()  {
    let partHeader = "";
    if(this.props.type === 'dialogue'){
      partHeader += this.props.characters[0].name;
      if(this.props.extra){
        partHeader += ` ${this.props.extra}`;
      }
    }
    let classes = "partContent";
    if(this.props.type === 'observation'){
      classes += " light";
    }
    return (
      <div className="partContainer">
        {partHeader && partHeader.length > 0 &&
          <h4 className="partHeader">{partHeader}</h4>
        }
        <div className={classes}>{this.props.content}</div>
      </div>
    )
  }
}

export default Part;
