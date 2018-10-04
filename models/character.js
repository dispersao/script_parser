module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('character', {
    name: DataTypes.STRING,
  });

  Character.associate = (models) => {
    Character.belongsToMany(models.Sequence, {
      foreignKey: 'characterId',
      through: models.SequenceCharacter
    });
  };

  Character.formatDataForStorage = (arr) => {
    return arr.map(str => new Object({name:str}))
  };

  return Character;
};
