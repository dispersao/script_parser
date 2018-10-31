import React, { Component } from 'react';
import './App.css';
import Screenplay from './components/screenplay';
import Filter from './components/filter';
import Button from 'react-bootstrap/lib/Button';



class App extends Component {

  constructor(){
    super();
    this.state = {characters: [], types: [], locations: [], submitEnabled: true, selectedFilters: null};
    this.handleFilterChanged = this.handleFilterChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScriptLoaded = this.handleScriptLoaded.bind(this);
  }

  handleFilterChanged(filtername, elements) {
    let ob = {submitEnabled: true};
    ob[filtername] = elements;
    this.setState(ob);
  }

  handleSubmit(){
    const selectedFilters = {
      characers: this.state.characters,
      types: this.state.types,
      locations: this.state.loactions
    };
    this.setState({selectedFilters: selectedFilters, submitEnabled:false});
  }

  handleScriptLoaded(){
    console.log('loaded!');
  }

  render() {
    const elements= ['characters', 'locations', 'types'];
    const elementViews = elements.map((el,idx) => {
      return <Filter name={el}
        key={idx}
        onChange={this.handleFilterChanged}
        selected={this.state[el]}/>
    });

    return (
      <div className="App">
        <section
          className="FiltersContainer">
          {elementViews}
          <Button
            className="Submit"
            disabled={!this.state.submitEnabled}
            onClick={this.handleSubmit}>
            Submit
          </Button>
        </section>
        <section className="ScriptContainer">
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
