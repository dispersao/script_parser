module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('location', {
    name: DataTypes.STRING,
  },{
    timestamps: false
  });

  Location.associate = (models) => {
    // Location.hasMany(models.Sequence);
  };

  Location.formatDataForStorage = (arr) => {
    return arr.map(str => new Object({name:str}))
  };

  Location.formatData = (str) => new Object({name :str})

  return Location;
};
