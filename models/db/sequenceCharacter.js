module.exports = (sequelize, DataTypes) => {
  sequenceCharacter = sequelize.define('sequence_characters', {
},{
  timestamps: false
});

  return sequenceCharacter;
};
