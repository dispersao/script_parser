import { schema } from 'normalizr';

// Define a users schema
const characterSchema = new schema.Entity('characters');

const locationSchema = new schema.Entity('locations');

const typeSchema = new schema.Entity('types');

// Define your comments schema
const partSchema = new schema.Entity('parts', {
  characters: [characterSchema]
});

// Define your article
const sequenceSchema = new schema.Entity('sequences', {
  location: locationSchema,
  type: typeSchema,
  parts: [partSchema]
});

const sequencesListSchema = [sequenceSchema]

export { characterSchema, locationSchema, typeSchema, partSchema, sequenceSchema, sequencesListSchema };
