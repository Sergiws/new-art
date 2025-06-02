import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class ActivityType extends Model {}

ActivityType.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  typeName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    field: 'type_name'
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