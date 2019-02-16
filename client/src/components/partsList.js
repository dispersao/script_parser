import React from 'react'
import Part from '../containers/partContainer'

const PartList = ({parts}) => (
  <div className="partsContanier">
  {parts.map((val,index)=>(
    <Part key={index} partId={val}></Part>
  ))}
  </div>
)

export default PartList
