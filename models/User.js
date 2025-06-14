import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import connection from '../connection/connection.js';

class User extends Model {
  async validPassword(password) {
    return bcrypt.compare(password, this.pass);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail: true }
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize:connection,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        user.pass = await bcrypt.hash(user.pass, 10);
      }
    }
  }
);

export default User;