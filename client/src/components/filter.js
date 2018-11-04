import React, { Component } from 'react';
import Select from 'react-select';


class Filter extends Component {

  constructor(props){
    super(props);
    this.state = {elements: [], selectedElements:[]};
    this.handleChanged = this.handleChanged.bind(this);
  }

  componentDidMount() {
    console.log(this.props.name);
    fetch(`/${this.props.name}`)
    .then(res => res.json())
    .then(elements => this.setState({ elements }));
  }

  handleChanged(selectedElements) {
    this.props.onChange(this.props.name, selectedElements);
  }

  render() {
    const options = this.state.elements.map(elem => {
      return {label:elem.name, value:elem.id};
    });
    return (
      <div className="FilterContainer">
        <h3 className="FilterTitle">{this.props.name}</h3>
        <Select
         isMulti = 'true'
         value={this.props.selected}
         onChange={this.handleChanged}
         options={options}
       />
      </div>
    );
  }
}

export default Filter;
