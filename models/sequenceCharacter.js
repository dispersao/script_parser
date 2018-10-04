module.exports = (sequelize, DataTypes) => {
  sequenceCharacter = sequelize.define('sequence_character', {
  speaks: DataTypes.BOOLEAN
});

  return sequenceCharacter;
};
