import Student from './Student.js';
import StudentContact from './StudentContact.js';
import Activity from './Activity.js';
import ActivityType from './ActivityType.js';
import ActivitySchedule from './ActivitySchedule.js';
import Reservation from './Reservation.js';
import Room from './Room.js';
import Teacher from './Teacher.js';
import ActivityTeacher from './ActivityTeacher.js';

Student.hasMany(StudentContact, {
  foreignKey: 'studentId',
  as: 'contacts'
});
StudentContact.belongsTo(Student, {
  foreignKey: 'studentId',
  as: 'student'
});

Activity.belongsTo(ActivityType, {
  foreignKey: 'activityTypeId',
  as: 'activityType'
});
ActivityType.hasMany(Activity, {
  foreignKey: 'activityTypeId',
  as: 'activities'
});

ActivitySchedule.belongsTo(Activity, {
  foreignKey: 'activityId',
  as: 'activity'
});
Activity.hasMany(ActivitySchedule, {
  foreignKey: 'activityId',
  as: 'schedules'
});

Reservation.belongsTo(Student, {
  foreignKey: 'studentId',
  as: 'student'
});
Student.hasMany(Reservation, {
  foreignKey: 'studentId',
  as: 'reservations'
});

Reservation.belongsTo(ActivitySchedule, {
  foreignKey: 'activityScheduleId',
  as: 'activitySchedule'
});
ActivitySchedule.hasMany(Reservation, {
  foreignKey: 'activityScheduleId',
  as: 'reservations'
});

Reservation.belongsTo(Room, {
  foreignKey: 'roomId',
  as: 'room'
});
Room.hasMany(Reservation, {
  foreignKey: 'roomId',
  as: 'reservations'
});

Teacher.hasMany(ActivityTeacher, {
  foreignKey: 'teacherId',
  as: 'activityLinks'
});
ActivityTeacher.belongsTo(Teacher, {
  foreignKey: 'teacherId',
  as: 'teacher'
});

Activity.hasMany(ActivityTeacher, {
  foreignKey: 'activityId',
  as: 'teacherLinks'
});
ActivityTeacher.belongsTo(Activity, {
  foreignKey: 'activityId',
  as: 'activity'
});