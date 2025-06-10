import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class Reservation extends Model { }

Reservation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  requesterName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'requester_name'
  },
  requesterEmail: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'requester_email'
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'room_id',
    references: { model: 'room', key: 'id' }
  },
  day: {
    type: DataTypes.DATE,
    allowNull: false
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
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  sequelize: db,
  modelName: 'Reservation',
  tableName: 'reservation',
  timestamps: false
});

export default Reservation;