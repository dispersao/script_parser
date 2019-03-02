import React, { useState } from 'react'
import {connect} from 'react-redux'
import {toJS} from '../utils/immutableToJS'
import {InputGroup, FormControl, Button} from 'react-bootstrap'
import {fetchScriptsIfNeeded, fetchSequencesifNeeded} from '../actions'


const ScriptName = ({name, id, saveName}) => {
  const [edit, setEdit] = useState(false)

  return (
      <div className="ScriptName">
        { edit &&
          <InputGroup className="mb-3">
            <FormControl
             placeholder="Script's name"
             aria-label="Script's name"
             aria-describedby="basic-addon2"
             defaultValue={name}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                onClick={()=>{
                  setEdit(false)
                  saveName('lalala')
                }}>
              Save</Button>
              <Button
                variant="outline-secondary"
                onClick={()=>setEdit(false)}>
                  Cancel
                </Button>
            </InputGroup.Append>
            </InputGroup>
        }
        {!edit &&
          <h3 onClick={()=> setEdit(true)}>{name}</h3>
        }
      </div>
  )
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = (dispatch, ownProps) => ({

})



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(ScriptName))
