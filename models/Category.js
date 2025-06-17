import { DataTypes, Model } from 'sequelize';
import connection from '../connection/connection.js';

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

        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },
    {
        sequelize:connection,
        modelName: 'Category',
        tableName: 'categories',
        indexes: [
            {
                unique: true,
                fields: ['name', 'userId']
            }
        ]
    }
);

export default Category;