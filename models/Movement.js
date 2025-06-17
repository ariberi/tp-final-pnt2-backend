import { DataTypes, Model } from 'sequelize';
import connection from '../connection/connection.js';

class Movement extends Model {}

Movement.init(
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
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
    },
    {
        sequelize:connection,
        modelName: 'Movement',
        tableName: 'expenses'
    },
);


export default Movement;