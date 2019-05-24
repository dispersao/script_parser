module.exports = (sequelize, DataTypes) => {
  PartCharacter = sequelize.define('part_characters', {
},{
  timestamps: false
});

  return PartCharacter;
};
