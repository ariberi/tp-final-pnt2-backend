import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection/connection.js';

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories'
  }
);

export default Category;