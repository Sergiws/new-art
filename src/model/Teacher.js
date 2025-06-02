import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class Teacher extends Model {}

Teacher.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize: db,
  modelName: 'Teacher',
  tableName: 'teacher',
  timestamps: false
});

export default Teacher;
