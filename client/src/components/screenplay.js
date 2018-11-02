import React, { Component } from 'react';


class Screenplay extends Component {

  constructor(props){
    super(props);
    this.state = {sequences: [], loading:false};
  }

  componentDidMount() {
    console.log('componentmounting');
  }
  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.filters && JSON.stringify(nextProps) !== JSON.stringify(this.props.filters)){
      console.log(nextProps);
      const filters = this.getfiltersQuery(nextProps.filters);
      this.setState({'sequences': [], loading: true});

      fetch(`/sequences?${filters}`)
      .then(res => res.json())
      .then(sequences => {
        console.log(sequences);
        this.setState({ 'sequences': sequences, loading: false });
      });
    }
  }

  getfiltersQuery(filters){
    const mapedFilters = Object.keys(filters).map(key => {
      console.log(filters);
      return `${key}=${filters[key].join(",")}`;
    });
    return mapedFilters.join("&");
  }

  render() {

    return (
      <div className="ScreenplayContainer">
        <div className="Screenplay">
        {JSON.stringify(this.state.sequences)}
        </div>
      </div>
    );
  }
}

export default Screenplay;
