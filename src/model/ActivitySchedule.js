import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class ActivitySchedule extends Model {}

ActivitySchedule.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  activityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'activity_id',
    references: {
      model: 'activity',
      key: 'id'
    }
  },
  dayOfWeek: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'day_of_week',
    validate: {
      min: 0,
      max: 6
    }
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'start_time'
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'end_time'
  }
}, {
  sequelize: db,
  modelName: 'ActivitySchedule',
  tableName: 'activity_schedule',
  timestamps: false
});

export default ActivitySchedule;