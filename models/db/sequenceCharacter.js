module.exports = (sequelize, DataTypes) => {
  sequenceCharacter = sequelize.define('sequence_character', {
},{
  timestamps: false
});

  return sequenceCharacter;
};
