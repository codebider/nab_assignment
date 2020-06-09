module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    'Activity',
    {
      uuid: DataTypes.STRING,
      action: DataTypes.ENUM('searching', 'filtering', 'viewing'),
      payload: DataTypes.JSONB,
    },
    {},
  );
  Activity.associate = () => {
    // associations can be defined here
  };
  return Activity;
};
