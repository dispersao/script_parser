import React from 'react'
import { connect } from 'react-redux'
import FullSequencesListContainer from './containers/fullSequencesListContainer'
import './App.css'

const App = () => {
  return (
    <div>
      <FullSequencesListContainer />
    </div>
  )
}

export default connect()(App)
