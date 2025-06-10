import { DataTypes, Model } from 'sequelize';
import fs from 'fs';
import path from 'path';
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
  imageName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'image_name'
  },
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'teacher_id',
    references: {
      model: 'teacher',
      key: 'id'
    }
  }
}, {
  sequelize: db,
  modelName: 'Activity',
  tableName: 'activity',
  timestamps: false
});

Activity.addHook('beforeUpdate', async (activity, options) => {
  if (activity.changed('imageName')) {
      try {
          const previousImageName = activity.previous('imageName');
          const imagePath = path.join(process.cwd(), 'src', 'public', 'uploads', previousImageName);
          await fs.promises.unlink(imagePath);
      } catch (error) {
          console.error('Error removing previous image:', error);
      }
  }
});

Activity.addHook('afterDestroy', (activity, options) => {
  const imagePath = path.join(process.cwd(), 'src', 'public', 'uploads', activity.imageName);
  fs.unlink(imagePath, (error) => {
      if (error) {
          console.error('Error removing image: ', error);
      }
  });
});

export default Activity;