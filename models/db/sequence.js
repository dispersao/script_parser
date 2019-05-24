module.exports = (sequelize, DataTypes) => {
  const Sequence = sequelize.define('sequences', {
    // isEnabled:  { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    isPlaying:  { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    hasPlayed:  { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    sceneNumber: { type: DataTypes.STRING, allowNull: false, defaultValue: 0}
  },{
    timestamps: false
  });

  Sequence.associate = (models) => {
    Sequence.belongsToMany(models.Character, {
      // foreignKey: 'sequenceId',
      through: models.SequenceCharacter,
    });

    Sequence.belongsTo(models.Location, {
      // foreignKey: 'locationId',
      // as: 'location'
    });

    Sequence.belongsTo(models.Type, {
      // foreignKey: 'typeId',
      // as: 'type'
    });

    Sequence.hasMany(models.Part, {
      // foreignKey: 'sequenceId',
      // as: 'parts'
    });
  };

    Sequence.formatData = (val) =>  val;

  return Sequence;
};
