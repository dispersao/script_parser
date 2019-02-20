module.exports = (sequelize, DataTypes) => {
  const ScriptSequence = sequelize.define('script_sequence', {
    index:  { type: DataTypes.INTEGER, allowNull: false, defaultValue: false },
  });

  ScriptSequence.associate = (models) => {
    ScriptSequence.belongsTo(models.Sequence, {

    });

    ScriptSequence.belongsTo(models.Script, {
    
    });

  };

  return ScriptSequence;
};
