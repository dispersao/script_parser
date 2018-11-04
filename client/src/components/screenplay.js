import React, { Component } from 'react';


class Screenplay extends Component {

  constructor(props){
    super(props);
    this.state = {sequences: [], loading:false, filters:{}};
  }

  componentDidMount() {
    console.log('Screenplay: componentmounting');
  }
  componentWillUpdate() {
    console.log("Screenplay: componentWillUpdate");
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.filters && JSON.stringify(nextProps.filters) !== JSON.stringify(this.props.filters)){

      const filters = this.getfiltersQuery(nextProps.filters);
      console.log(nextProps, filters);
      this.setState({'sequences': [], loading: true});

      fetch(`/sequences?${filters}`)
      .then(res => res.json())
      .then(sequences => {
        this.setState({ 'sequences': sequences, loading: false });
        this.props.onLoad();
      });
    }
  }

  getfiltersQuery(filters){
    const mapedFilters = Object.keys(filters).map(key => {
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
