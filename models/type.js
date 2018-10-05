module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('type', {
    name: DataTypes.STRING,
  },{
    timestamps: false
  });

  Type.associate = (models) => {
    Type.hasMany(models.Sequence);
  }

  Type.formatDataForStorage = (arr) => {
    return arr.map(str => new Object({name:str}))
  };

  Type.formatData = (str) => new Object({name :str})



  return Type;
};
