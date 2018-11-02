import React, { Component } from 'react';
import './App.css';
import Screenplay from './components/screenplay';
import Filter from './components/filter';
import Button from 'react-bootstrap/lib/Button';



class App extends Component {

  constructor(){
    super();
    this.state = {filters: {characters: [], types: [], locations: []}, submitEnabled: true, selectedFilters: null};
    this.handleFilterChanged = this.handleFilterChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScriptLoaded = this.handleScriptLoaded.bind(this);
  }

  handleFilterChanged(filtername, elements) {
    let ob = {submitEnabled: true, filters: this.state.filters};
    ob.filters[filtername] = elements;
    this.setState(ob);
  }

  handleSubmit(){
    let selectedFilters = {};

    Object.keys(this.state.filters).reduce((selFil, key)=> {
      if(this.state.filters[key] && this.state.filters[key].length > 0){
        const filteredIds =  this.state.filters[key].map(el => el.value);
        selFil[key] = filteredIds;
      }
      return selFil;
    }, selectedFilters);

    this.setState({selectedFilters: selectedFilters, submitEnabled:false});
  }

  handleScriptLoaded(){
    console.log('loaded!');
  }

  render() {
    const elementViews = Object.keys(this.state.filters).map((el,idx) => {
      return <Filter name={el}
        key={idx}
        onChange={this.handleFilterChanged}
        selected={this.state.filters[el]}/>
    });

    return (
      <div className="App row">
        <section
          className="FiltersContainer col-sm-5">
          {elementViews}
          <Button
            className="Submit"
            disabled={!this.state.submitEnabled}
            onClick={this.handleSubmit}>
            Submit
          </Button>
        </section>
        <section className="ScriptContainer col-sm-8">
          <Screenplay
            filters={this.state.selectedFilters}
            onLoad={this.handleScriptLoaded}>
          </Screenplay>
        </section>
      </div>
    );
  }
}

export default App;
