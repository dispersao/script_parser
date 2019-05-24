module.exports = (sequelize, DataTypes) => {
  SequencePart = sequelize.define('sequence_parts', {
    // index: DataTypes.INTEGER
},{
  timestamps: false
});

  return SequencePart;
};
