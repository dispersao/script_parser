module.exports = (sequelize, DataTypes) => {
  const Part = sequelize.define('part', {
    content: DataTypes.TEXT,
    type: DataTypes.STRING,
    extra: DataTypes.STRING,
    index: DataTypes.INTEGER,
  },{
    timestamps: false
  });

  Part.associate = (models) => {

    Part.belongsToMany(models.Character, {
      foreignKey: 'partId',
      through: models.PartCharacter,
      // as: 'characters'
    });

    // Part.belongsTo(models.Sequence, {
    //   foreignKey: 'sequenceId',
    //   as: 'sequences'
    // });
  };

  Part.formatData = (val) => {
    let ob = Object.assign({}, val);
    delete ob['characters'];
    // delete ob['index'];
    return ob;
  }


  return Part;
};
