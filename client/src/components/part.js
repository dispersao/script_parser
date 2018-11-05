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

    let charactersList = this.props.characters.map((chara,idx)=>{
      return <span key={idx} className="label label-default m5">{chara.name}</span>
    });
    return (
      <div className="partContainer">
        {partHeader && partHeader.length > 0 &&
          <h4 className="partHeader">{partHeader}</h4>
        }
        <div className={classes}>{this.props.content}</div>
        {charactersList.length > 0 && !this.props.reducedView &&
          <div className="charactersList light">
              <span className="m5">personagens:</span>
              {charactersList}
          </div>
        }
      </div>
    )
  }
}

export default Part;
