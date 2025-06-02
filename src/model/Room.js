import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class Room extends Model { }

Room.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize: db,
    modelName: 'Room',
    tableName: 'room',
    timestamps: false
});

export default Room;