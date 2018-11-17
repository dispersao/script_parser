import React, { Component } from 'react';
import Select from 'react-select';


class Filter extends Component {

  constructor(props){
    super(props);
    this.state = {elements: [], selectedElements:[]};
    this.handleIdsChanged = this.handleIdsChanged.bind(this);
    this.handleExclusivesChanged = this.handleExclusivesChanged.bind(this);
    this.handleAndOrChanged = this.handleAndOrChanged.bind(this);
  }

  componentDidMount() {
    fetch(`/${this.props.name}`)
    .then(res => res.json())
    .then(elements => this.setState({ elements }));
  }

  handleIdsChanged(selectedElements) {
    this.props.onChange(this.props.name, 'ids', selectedElements);
  }

  handleAndOrChanged(ev){
    if(this.props.andor){
      this.props.onChange(this.props.name, 'and', ev.currentTarget.value === 'and');
    }
  }

  handleExclusivesChanged(ev){
    this.props.onChange(this.props.name, 'exclusive', ev.currentTarget.checked);
  }

  render() {
    const options = this.state.elements.map(elem => {
      return {label:elem.name, value:elem.id};
    });

    let extra;
    if(this.props.selected && this.props.selected.length){
      extra = (
        <div className="btn-group">
          {this.props.andor &&
            <span>
              <label className="btn btn-default">
                <input type="radio" name="andor" id="or" value="or" checked ={!this.props.and} onChange={this.handleAndOrChanged}/>
                ||
              </label>
              <label className="btn btn-default">
                <input type="radio" name="andor" id="and" value="and" checked ={this.props.and} onChange={this.handleAndOrChanged}/>
                &&
              </label>
            </span>
          }
          <label className="btn btn-default">
            <input type="checkbox" name="exclusive" id="exclusive" value="true" checked ={this.props.exclusive} onChange={this.handleExclusivesChanged}/>
            exclusive
          </label>
        </div>
      )
    }

    return (
      <div className="FilterContainer">
        <h3 className="FilterTitle">{this.props.name}</h3>
        <Select
         isMulti = 'true'
         value={this.props.selected}
         onChange={this.handleIdsChanged}
         options={options}
       />
       {extra}
      </div>
    );
  }
}

export default Filter;
