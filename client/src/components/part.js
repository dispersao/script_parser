import React from 'react';

const Part = ({type, extra, characters, content}) => {
  let partHeader = '';
  if(type === 'dialogue'){
    partHeader += characters[0]
  }
  if(extra){
    partHeader += ` ${extra}`
  }

  let classes = "partContent";
  if(type === 'observation'){
    classes += " light";
  }

  return (
    <div className="partContainer">
      {partHeader && partHeader.length > 0 &&
        <h4 className="partHeader">{partHeader}</h4>
      }
      <div className={classes}>{content}</div>
    </div>
  )
}

export default Part;
