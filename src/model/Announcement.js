import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class Announcement extends Model { }

Announcement.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'published_at',
        defaultValue: DataTypes.NOW
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'is_active',
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'Announcement',
    tableName: 'announcement',
    timestamps: false
});

export default Announcement;