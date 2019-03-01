import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ScriptView from '../components/scriptView'
import Home from '../components/home'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/new" component={ScriptView} />
        <Route exact={true} path="/:id/edit" component={ScriptView} />
        <Route exact={true} path="/:id" render={({match:{params}})=> (
          <h1> VIEW SCRIPT {params.id}</h1>
        )} />
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
