import { DataTypes, Model } from 'sequelize';
import db from '../config/db.js';

class ActivityTeacher extends Model { }

ActivityTeacher.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    activityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'activity_id',
        references: { model: 'activity', key: 'id' }
    },
    teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'teacher_id',
        references: { model: 'teacher', key: 'id' }
    }
}, {
    sequelize: db,
    modelName: 'ActivityTeacher',
    tableName: 'activity_teacher',
    timestamps: false
});

export default ActivityTeacher;