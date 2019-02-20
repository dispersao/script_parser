import React from 'react'
import FullSequencesList from './fullSequencesList'
import '../App.css'

const App = ({ match: { params } }) => {
  return (
    <div>
      <FullSequencesList />
    </div>
  )
}

export default App
