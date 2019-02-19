import React from 'react'
import { connect } from 'react-redux'
import FullSequencesList from './components/fullSequencesList'
import './App.css'

const App = () => {
  return (
    <div>
      <FullSequencesList />
    </div>
  )
}

export default connect()(App)
