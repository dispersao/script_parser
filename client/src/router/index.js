import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from '../components/app'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact={true} path="/" render={() => (
          <h1>HOME</h1>
        )} />
        <Route exact={true} path="/new" component={App} />
        <Route exact={true} path="/:id/edit" render={({match:{params}})=> (
          <h1> EDIT SCRIPT {params.id}</h1>
        )} />
      </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
