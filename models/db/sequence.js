module.exports = (sequelize, DataTypes) => {
  const Sequence = sequelize.define('sequence', {
    // isEnabled:  { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    isPlaying:  { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    hasPlayed:  { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },{
    timestamps: false
  });

  Sequence.associate = (models) => {
    Sequence.belongsToMany(models.Character, {
      foreignKey: 'sequenceId',
      through: models.SequenceCharacter,
    });

    Sequence.belongsTo(models.Location, {
      foreignKey: 'locationId',
      as: 'location'
    });

    Sequence.belongsTo(models.Type, {
      foreignKey: 'typeId',
      as: 'type'
    });

    Sequence.hasMany(models.Part, {
      foreignKey: 'sequenceId',
      as: 'parts'
      // through: models.SequencePart
    });
  };

    Sequence.formatData = (val) =>  val;

  return Sequence;
};
