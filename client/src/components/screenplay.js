import React, { Component } from 'react';
import Sequence from './sequence';


class Screenplay extends Component {

  constructor(props){
    super(props);
    this.state = {sequences: [], loading:false, filters:{}};
  }

  componentDidMount() {
    // console.log('Screenplay: componentmounting');
  }
  componentWillUpdate() {
    // console.log("Screenplay: componentWillUpdate");
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.filters && JSON.stringify(nextProps.filters) !== JSON.stringify(this.props.filters)){

      const filters = this.getfiltersQuery(nextProps.filters);
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
      let filterStr = '';

      if(filters[key]['ids']){
        filterStr = `filter[${key}][ids]=${filters[key]['ids'].join(',')}`;
      }
      if(filters[key]['exclusive']){
        filterStr+=`&filter[${key}][exclusive]=1`;
      }
      if(filters[key]['and']){
        filterStr+=`&filter[${key}][and]=1`
      }
      return filterStr;
    });
    return mapedFilters.filter(Boolean).join("&");
  }

  render() {
    const seqsRendered = this.state.sequences.map((sequence, idx)=>{
      return (
        <Sequence key={idx}
        id={sequence.id}
        type={sequence.type}
        location={sequence.location}
        parts={sequence.parts}
        reducedView={this.props.reducedView}>
        </Sequence>
      )
    });

    return (
      <div className="ScreenplayContainer">
        <div className="Screenplay">
          {seqsRendered}
        </div>
      </div>
    );
  }
}

export default Screenplay;
