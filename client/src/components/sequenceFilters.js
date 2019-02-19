import React from 'react'
import SequenceFilter from './sequenceFilter'

const SequenceFilters = (props)=>{
  return (
    <section className="FiltersContainer">
      <SequenceFilter name='characters'></SequenceFilter>
      <SequenceFilter name='types'></SequenceFilter>
      <SequenceFilter name='locations'></SequenceFilter>
    </section>
  )
}

export default SequenceFilters
