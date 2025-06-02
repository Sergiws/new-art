import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class StudentContact extends Model {}

StudentContact.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'student_id'
  },
  type: {
    type: DataTypes.ENUM('self', 'father', 'mother', 'guardian'),
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'full_name'
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'phone'
  }
}, {
  sequelize: db,
  modelName: 'StudentContact',
  tableName: 'student_contact',
  timestamps: false
});

export default StudentContact;
