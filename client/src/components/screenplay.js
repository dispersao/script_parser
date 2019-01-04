import React, { Component } from 'react';
import Sequence from './sequence';


class Screenplay extends Component {

  constructor(props){
    super(props);
    this.state = {sequences: [], loading:false, filters:{}};
    this.onSequenceFetched = this.onSequenceFetched.bind(this);
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

        const filters = this.queryFiltersFormatted(nextProps.filters);
        this.setState({'sequences': [], loading: true});

        fetch(`/api/sequences?${filters}`)
        .then(res => res.json())
        .then(sequences => {
          this.setState({ 'sequences': sequences, loading: false });
          this.props.onLoad();
        });
      } else if(nextProps.filters.sequences[0].indexOf('script') >=0){
        this.setSequencePlayed(false)
        .then(result => {
          this.setState({sequences: [], currentSequence: null});
          this.startScript(nextProps.filters)
        }, (err)=>{
          console.log(err);
        });
      }
    }
  }

  startScript(filters){
    let modifiedFilters = filters;
    if(this.state.currentSequence){
      modifiedFilters = this.nextSequenceFilters(modifiedFilters);
    }
    modifiedFilters = Object.assign(modifiedFilters, {count:1, order:'rand'});

    let queryString = this.queryFiltersFormatted(modifiedFilters );
    let [url, params] = this.getRequest('get', `?${queryString}`);

    fetch(url, params)
    .then(res => res.json())
    .then((sequence)=>{
      return this.onSequenceFetched(sequence);
    }, (err)=>{
      console.log(err);
    })
    .then((sequence) => {
      return this.onSequenceSettedAsPlayed(sequence);
    }, (err)=>{
      console.log(err);
    });
  }

  nextSequenceFilters(filters){
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
    return filters;
  }

  onSequenceSettedAsPlayed(sequence){
    if(this.state.sequences.length < this.props.scriptLength){
      this.startScript(this.props.filters);
    } else {
      this.props.onLoad();
    }
  }

  queryFiltersFormatted(filters, extra){
    delete filters["sequences"];

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
      } else {
        filterStr+=`${key}=${filters[key]}`;
      }
      return filterStr;
    });
    return mapedFilters.filter(Boolean).join("&");
  }

  onSequenceFetched(sequence) {
    const sequences = this.state.sequences.concat(sequence);
    this.setState({
        sequences: sequences,
        loading: false,
        currentSequence: sequence
      });
    return this.setSequencePlayed(true, sequence);
  }

  setSequencePlayed(hasPlayed, sequence){
    const complement = sequence ? `/${sequence.id}` : '';
    const [url, params] = this.getRequest('post', complement, {'hasPlayed':hasPlayed});
    return fetch(url, params);
  }

  getRequest(method, complement, body){
    const url = `/api/sequences${complement}`;
    const params = {
      method: method.toUpperCase(),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    if(body){
      params.body = JSON.stringify(body);
    }
    return [url, params];
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
