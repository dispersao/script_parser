import { Map } from 'immutable';
import { createSelector } from 'reselect';

// Select entities from state
const getResult = state => state.sequenceData.get('result');
const getSequences = state => state.sequenceData.getIn(['entities', 'sequences'])
const getParts = state => state.sequenceData.getIn(['entities', 'parts'])
const getCharacters = state => state.sequenceData.getIn(['entities', 'characters'])
const getLocations = state => state.sequenceData.getIn(['entities', 'locations'])
const getTypes = state => state.sequenceData.getIn(['entities', 'types'])
// Select filter from state
const getSequenceFilters = state => state.sequenceFilters;
const getEntryItems = (state, name) => state.sequenceData.getIn(['entities', name])

const getSequenceCharacters = (sequence, parts) => {
  let chars = sequence.get('parts').map(pid => parts.get(pid.toString()).get('characters'))
  chars = chars.flatMap(c => c.valueSeq().toArray())
  return chars.toSet().toList()
}

const memoizedCharacters = createSelector(
  getSequenceCharacters,
  chars => chars
)

const getFilteredSequences = createSelector(
  getResult,
  getSequences,
  getParts,
  getCharacters,
  getLocations,
  getTypes,
  getSequenceFilters,
  ( result, sequences, parts, characters, locations, types, filters) => {
    if (!result || result.size === 0) return null;

    return (
      result
        .filter((seqId) => {
          const sequence = sequences.get(seqId.toString())

          return filters.keySeq().toArray().every( filterName => {
            let field;
            switch(filterName){
              case 'characters':
                field = getSequenceCharacters(sequence, parts)
                break
              case 'locations':
                field = [sequence.get('location')]
                break
              case 'types':
                field = [sequence.get('type')]
                break
            }
            return field && filterField(filters.get(filterName), field)
          })
        })
        .map((seqId) => {
          const sequence = sequences.get(seqId.toString());
          const seqResultItemMap = Map({
            id: sequence.get('id'),
            type: types.get(sequence.get('type').toString()),
            location: locations.get(sequence.get('location').toString()),
            characters: memoizedCharacters(sequence, parts).map(charId => characters.get(charId.toString())),
            parts: sequence.get('parts').map(partId => {
              let p = parts.get(partId.toString())
              let caracters = p.get('characters').map(charId => characters.get(charId.toString()))
              return p.set('characters', caracters)
            })
          });
          return seqResultItemMap;
        })
      );
  },
);

const filterField =  (filter, field) => {
  const filterIds = filter.get('ids')
  if(!filterIds.size) return true

  let shouldInclude = true
  if(filter.get('and')){
    shouldInclude = filterIds.every(id => field.includes(id))
  } else {
    shouldInclude = filterIds.some(id => field.includes(id))
  }
  if(filter.get('exclusive')){
    shouldInclude = !shouldInclude
  }
  return shouldInclude
}

export { getCharacters, getLocations, getParts, getFilteredSequences, getSequenceFilters, getEntryItems };
