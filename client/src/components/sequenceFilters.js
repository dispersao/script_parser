import React from 'react'
import SequenceFilterContainer from '../containers/SequenceFilterContainer'

const SequenceFilters = (props)=>{
  return (
    <section className="FiltersContainer">
      <SequenceFilterContainer name='characters'></SequenceFilterContainer>
      <SequenceFilterContainer name='types'></SequenceFilterContainer>
      <SequenceFilterContainer name='locations'></SequenceFilterContainer>
    </section>
  )
}

export default SequenceFilters
