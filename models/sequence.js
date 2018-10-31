module.exports = (sequelize, DataTypes) => {
  const Sequence = sequelize.define('sequence', {
    content: DataTypes.TEXT,
    isEnabled:  { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  },{
    timestamps: false
  });

  Sequence.associate = (models) => {
    Sequence.belongsToMany(models.Character, {
      foreignKey: 'sequenceId',
      through: models.SequenceCharacter
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
      // through: models.SequencePart
    });
  };

    Sequence.formatData = (val) =>  val;

  return Sequence;
};
