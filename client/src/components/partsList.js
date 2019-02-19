import React from 'react'
import Part from './part'

const PartList = ({parts}) => (
  <div className="partsContanier">
  {parts.map((part,index)=>(
    <Part key={index} part={part}></Part>
  ))}
  </div>
)

export default PartList
