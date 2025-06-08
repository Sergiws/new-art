import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class ActivityType extends Model {}

ActivityType.init({
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize: db,
  modelName: 'ActivityType',
  tableName: 'activity_type',
  timestamps: false
});

export default ActivityType;