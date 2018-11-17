import React, { Component } from 'react';
import './App.css';
import Screenplay from './components/screenplay';
import Filter from './components/filter';
import Button from 'react-bootstrap/lib/Button';
import _ from 'lodash';


class App extends Component {

  constructor(){
    super();
    this.state = {
      filters: {
        characters: {ids:[], and:false, exclusive:false},
        types: {ids:[], and:false, exclusive:false},
        locations: {ids:[], and:false, exclusive:false}
      },
      submitEnabled: true,
      selectedFilters: null,
      isReducedView: false
    };

    this.handleFilterChanged = this.handleFilterChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScriptLoaded = this.handleScriptLoaded.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
  }

  handleFilterChanged(filtername, filterfield, value) {
    let ob = {submitEnabled: true, filters: this.state.filters};
    var newOb = {};
    newOb[filterfield] = value;
    ob.filters[filtername] = Object.assign(ob.filters[filtername], newOb);
    if(ob.filters[filtername]['exclusive'] && !ob.filters[filtername]['and']){
      ob.filters[filtername]['and'] = true;
    }
    this.setState(ob);
  }

  handleSubmit(){
    let filters =  _.cloneDeep(this.state.filters);

    _.each(filters, el => el['ids'] = el['ids'].map(e=>e.value));
    const selectedFilters = _.pickBy(filters, el => el.ids.length);

    if(Object.keys(selectedFilters).length === 0){
      selectedFilters.all=[true];
    }
    this.setState({selectedFilters: selectedFilters, submitEnabled:false});
  }

  handleReduce(event){
    this.setState({isReducedView: event.target.checked});
  }

  handleScriptLoaded(){
    this.setState({submitEnabled:true})
  }

  render() {
    const elementViews = Object.keys(this.state.filters).map((el,idx) => {
      return <Filter name={el}
        key={idx}
        onChange={this.handleFilterChanged}
        selected={this.state.filters[el]['ids']}
        andor={el === 'characters'}
        and={this.state.filters[el]['and']}
        exclusive={this.state.filters[el]['exclusive']}
        />
    });

    return (
      <div className="App row">
        <section
          className="FiltersContainer col-sm-3">
          {elementViews}

          <label className="btn btn-default">
            <input type="checkbox"
             onChange={this.handleReduce}
             checked={this.state.isReducedView}/>
             reduced
          </label>
          <Button
            className="Submit"
            disabled={!this.state.submitEnabled}
            onClick={this.handleSubmit}>
            Submit
          </Button>
        </section>
        <section className="ScriptContainer col-sm-9">
          <Screenplay
            filters={this.state.selectedFilters}
            onLoad={this.handleScriptLoaded}
            reducedView={this.state.isReducedView}>
          </Screenplay>
        </section>
      </div>
    );
  }
}

export default App;
