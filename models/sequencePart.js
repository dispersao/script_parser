module.exports = (sequelize, DataTypes) => {
  SequencePart = sequelize.define('sequence_part', {
    // index: DataTypes.INTEGER
},{
  timestamps: false
});

  return SequencePart;
};
