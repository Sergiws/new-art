import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class Activity extends Model {}

Activity.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  activityTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'activity_type_id',
    references: {
      model: 'activity_type',
      key: 'id'
    }
  }
}, {
  sequelize: db,
  modelName: 'Activity',
  tableName: 'activity',
  timestamps: false
});

export default Activity;