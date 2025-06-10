import Activity from './Activity.js';
import ActivitySchedule from './ActivitySchedule.js';
import Reservation from './Reservation.js';
import Room from './Room.js';
import Teacher from './Teacher.js';

ActivitySchedule.belongsTo(Activity, {
  foreignKey: 'activityId',
  as: 'activity'
});
Activity.hasMany(ActivitySchedule, {
  foreignKey: 'activityId',
  as: 'schedules'
});

ActivitySchedule.belongsTo(Room, {
  foreignKey: 'roomId',
  as: 'room'
});
Room.hasMany(ActivitySchedule, {
  foreignKey: 'roomId',
  as: 'schedules'
});

Reservation.belongsTo(Room, {
  foreignKey: 'roomId',
  as: 'room'
});
Room.hasMany(Reservation, {
  foreignKey: 'roomId',
  as: 'reservations'
});

Teacher.hasMany(Activity, {
  foreignKey: 'teacherId',
  as: 'activityLinks'
});
Activity.belongsTo(Teacher, {
  foreignKey: 'teacherId',
  as: 'teacher'
});