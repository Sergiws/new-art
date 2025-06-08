import { DataTypes, Model } from 'sequelize';
import fs from 'fs';
import path from 'path';
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
        allowNull: false
    },
    imageName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'image_name'
    }
}, {
    sequelize: db,
    modelName: 'Room',
    tableName: 'room',
    timestamps: false
});

Room.addHook('beforeUpdate', async (room, options) => {
    if (room.changed('imageName')) {
        try {
            const previousImageName = room.previous('imageName');
            const imagePath = path.join(process.cwd(), 'src', 'public', 'uploads', previousImageName);
            await fs.promises.unlink(imagePath);
        } catch (error) {
            console.error('Error removing previous image:', error);
        }
    }
});

Room.addHook('afterDestroy', (room, options) => {
    const imagePath = path.join(process.cwd(), 'src', 'public', 'uploads', room.imageName);
    fs.unlink(imagePath, (error) => {
        if (error) {
            console.error('Error removing image: ', error);
        }
    });
});

export default Room;