module.exports = (sequelize, DataTypes) => {
  const Script = sequelize.define('script', {
    name:  { type: DataTypes.STRING },
    author:  { type: DataTypes.STRING }
  });

  Script.associate = (models) => {
    Script.hasMany(models.ScriptSequence, {
      as: 'scriptSequences'
    });

  };

    Script.formatData = (val) =>  val;

  return Script;
};
