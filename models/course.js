"use strict";
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    // TODO: Configure nullability of time and materials
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      estimatedTime: DataTypes.STRING,
      materialsNeeded: DataTypes.STRING
    },
    {}
  );
  Course.associate = function(models) {
    // associations can be defined here
    Course.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };
  return Course;
};
