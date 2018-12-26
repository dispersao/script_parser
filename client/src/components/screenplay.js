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
      if(nextProps.filters.sequences[0] === 'all'){

        const filters = this.getfiltersQuery(nextProps.filters);
        this.setState({'sequences': [], loading: true});

        fetch(`/sequences?${filters}`)
        .then(res => res.json())
        .then(sequences => {
          this.setState({ 'sequences': sequences, loading: false });
          this.props.onLoad();
        });
      } else if(nextProps.filters.sequences[0].indexOf('script') >=0){
        this.resetSequences()
        .then(result => {
          this.setState({sequences: [], currentSequence: null});
          this.startScript(nextProps.filters)
        })
      }
    }
  }

  resetSequences(){
    return fetch(`/sequences`,{
      method: 'POST',
      body: JSON.stringify({'hasPlayed':false}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  startScript(filters){
    if(this.state.currentSequence){
      filters.characters = filters.characters || {};
      filters.characters.and = true;
      filters.characters.exclusive = true;
      let characters = this.state.currentSequence.parts.map(p => {
        return p.characters.map(c => c.id);
      });
      characters = [].concat(...characters);
      characters = [...new Set(characters)];
      filters.characters.ids = characters;
      filters.locations = filters.locations || {};
      filters.locations.ids = [this.state.currentSequence.location.id];
      filters.locations.exclusive = true;
    }
    let filts = this.getfiltersQuery(filters);
    filts+= '&count=1&order=rand';

    fetch(`/sequences?${filts}`)
    .then(res => res.json())
    .then(sequence => {
      this.setState({ 'sequences': this.state.sequences.concat(sequence) , loading: false });
      this.setState({'currentSequence': sequence});
      return fetch(`/sequences/${sequence.id}`,{
        method: 'POST',
        body: JSON.stringify({'hasPlayed':true}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    })
    .then((sequence) => {
      if(this.state.sequences.length < this.props.scriptLength){
        this.startScript(this.props.filters);
      } else {
        this.props.onLoad();
      }
    });
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
