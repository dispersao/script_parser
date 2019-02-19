import React from 'react';

const Part = ({part}) => {
  let partHeader = '';
  if(part.get('type') === 'dialogue'){
    partHeader += part.get('characters').first().get('name')
  }
  if(part.get('extra')){
    partHeader += ` ${part.get('extra')}`
  }

  let classes = "partContent";
  if(part.get('type') === 'observation'){
    classes += " light";
  }

  return (
    <div className="partContainer">
      {partHeader && partHeader.length > 0 &&
        <h4 className="partHeader">{partHeader}</h4>
      }
      <div className={classes}>{part.get('content')}</div>
    </div>
  )
}

export default Part
