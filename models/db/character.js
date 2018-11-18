module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('character', {
    name: DataTypes.STRING,
  },{
    timestamps: false
  });

  Character.associate = (models) => {
    Character.belongsToMany(models.Sequence, {
      foreignKey: 'characterId',
      through: models.SequenceCharacter,
      as: 'sequences'
    });
  };

  Character.associate = (models) => {
    Character.belongsToMany(models.Part, {
      foreignKey: 'characterId',
      through: models.PartCharacter,
      as: 'parts'
    });
  };

  Character.formatData = (str) => new Object({name :str})


  return Character;
};
