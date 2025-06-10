import { DataTypes, Model } from 'sequelize';
import fs from 'fs';
import path from 'path';
import db from '../config/db.js';

class Teacher extends Model { }

Teacher.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'full_name'
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
  },
  imageName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'image_name'
  }
}, {
  sequelize: db,
  modelName: 'Teacher',
  tableName: 'teacher',
  timestamps: false
});

Teacher.addHook('beforeUpdate', async (teacher, options) => {
  if (teacher.changed('imageName')) {
      try {
          const previousImageName = teacher.previous('imageName');
          const imagePath = path.join(process.cwd(), 'src', 'public', 'uploads', previousImageName);
          await fs.promises.unlink(imagePath);
      } catch (error) {
          console.error('Error removing previous image:', error);
      }
  }
});

Teacher.addHook('afterDestroy', (teacher, options) => {
  const imagePath = path.join(process.cwd(), 'src', 'public', 'uploads', teacher.imageName);
  fs.unlink(imagePath, (error) => {
      if (error) {
          console.error('Error removing image: ', error);
      }
  });
});

export default Teacher;
