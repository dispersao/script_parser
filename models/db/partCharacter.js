module.exports = (sequelize, DataTypes) => {
  PartCharacter = sequelize.define('part_character', {
},{
  timestamps: false
});

  return PartCharacter;
};
