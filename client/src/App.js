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
    this.handleGetScript = this.handleGetScript.bind(this);
    this.handleScriptLoaded = this.handleScriptLoaded.bind(this);
    this.handleReduce = this.handleReduce.bind(this);
  }

  handleFilterChanged(filtername, filterfield, value) {
    let ob = {submitEnabled: true, filters: this.state.filters};
    var newOb = {};
    newOb[filterfield] = value;
    ob.filters[filtername] = Object.assign(ob.filters[filtername], newOb);

    this.setState(ob);
  }

  handleSubmit(){
    const selectedFilters = this.getSelectedFilters('all');
    this.setState({selectedFilters: selectedFilters, submitEnabled:false});
  }

  handleGetScript(){
    const selectedFilters = this.getSelectedFilters(`script:${Math.random()}`);
    this.setState({selectedFilters: selectedFilters, submitEnabled:false});
  }
  getSelectedFilters(sequences){
    let filters =  _.cloneDeep(this.state.filters);

    _.each(filters, el => el['ids'] = el['ids'].map(e=>e.value));
    const selectedFilters = _.pickBy(filters, el => el.ids.length);
    selectedFilters.sequences=[sequences];

    return selectedFilters;
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

    const scriptDisabled = Object.keys(this.state.filters).some(el=> {
      return this.state.filters[el]['ids'].length
    });

    return (
      <div className="App">
        <section
          className="FiltersContainer">
          {elementViews}
        </section>
        <section className="FiltersContainer">
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
            Sequence List
          </Button>
          <Button
            className="Submit"
            disabled={!this.state.submitEnabled || scriptDisabled}
            onClick={this.handleGetScript}>
            Generate Random Screenplay
          </Button>
        </section>
        <section className="ScriptContainer">
          <Screenplay
            filters={this.state.selectedFilters}
            onLoad={this.handleScriptLoaded}
            scriptLength = {30}
            reducedView={this.state.isReducedView}>
          </Screenplay>
        </section>
      </div>
    );
  }
}

export default App;
