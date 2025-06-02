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
  requesterPhone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'requester_phone'
  },
  roomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'room_id',
    references: { model: 'room', key: 'id' }
  },
  startDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'start_datetime'
  },
  endDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'end_datetime'
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    allowNull: false,
    defaultValue: 'pending'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize: db,
  modelName: 'Reservation',
  tableName: 'reservation',
  timestamps: false
});

export default Reservation;