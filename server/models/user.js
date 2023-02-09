"use strict";
const { Model, ENUM } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.Post = User.hasMany(models.Post, {
        as: "posts",
        foreignKey: "owner_id",
        defaultScope: {
          attributes: {
            exclude: ["password"],
          },
        },
      });
    }
    toJSON() {
      return {
        ...this.get(),
        role: undefined,
        password: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        email: undefined,
      };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: ENUM(["user", "admin"]),
        allowNull: false,
        defaultValue: "user",
      },
      biography: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
