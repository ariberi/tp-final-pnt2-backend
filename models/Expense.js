import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection/connection.js';
import User from './User.js';
import Category from './Category.js';

class Expense extends Model {}

Expense.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: { min: 0 }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses'
  }
);


export default Expense;