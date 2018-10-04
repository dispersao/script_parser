module.exports = (sequelize, DataTypes) => {
  const Sequence = sequelize.define('sequence', {
    content: DataTypes.TEXT,
  });

  Sequence.associate = (models) => {
    Sequence.belongsToMany(models.Character, {
      foreignKey: 'sequenceId',
      through: models.SequenceCharacter
    });

    Sequence.belongsTo(models.Location, {
      foreignKey: 'locationId',
    });

    Sequence.belongsTo(models.Type, {
      foreignKey: 'typeId',
    });
  };

  return Sequence;
};
