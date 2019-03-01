import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toJS} from '../utils/immutableToJS'
import {fetchScriptsIfNeeded} from '../actions'
import {getScripts} from '../selectors'
import ScriptCard from './scriptCard'
import {Link} from 'react-router-dom'


class ScriptListContainer extends Component{
  componentDidMount(){
    console.log(this.context)
    this.props.fetchScripts()
  }

  render(){
    return (
      <div className="ScriptListContainer">
        { this.props.scripts && Object.keys(this.props.scripts).map((index) => (
          <Link key={index} to={`${index}/edit`}>
            <ScriptCard key={index} {...this.props.scripts[index]} onClick={this.props.onClick} />
          </Link>
        ))}
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return{
    scripts: getScripts(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchScripts: ()=> dispatch(fetchScriptsIfNeeded())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(ScriptListContainer))
