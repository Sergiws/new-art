import PageController from '../PageController.js';
import { ActivitySchedule, Room, Activity, Reservation } from '../../model/index.js';

const START_HOUR = 16;
const END_HOUR = 23;

class TimetablePageController extends PageController {
    constructor() {
        super('public/timetable-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const today = new Date(req.query.y, req.query.m - 1, req.query.d);
            const activities = await ActivitySchedule.findAll({
                where: { dayOfWeek: today.getDay() },
                include: [{ model: Activity, as: 'activity' }]
            });
            const todayDB = today.toISOString().split('T')[0];
            const reservations = await Reservation.findAll({ where: { day: todayDB } });
    
            const occupied = activities.concat(reservations);
    
            // Corrección: obtener rooms con await
            const rooms = await Room.findAll();
    
            // Corregir availability para que sea un objeto con roomId keys
            const availability = {};
            for (const room of rooms) {
                const table = [];
                for (let hour = START_HOUR; hour < END_HOUR; hour++) {
                    table.push(this.roomIsFree(hour, room, occupied));
                }
                availability[room.id] = table;
            }
    
            // Añadir campo 'name' para schedules según sea actividad o reserva
            const schedules = this.getSchedules(occupied).map(sch => ({
                ...sch,
                roomId: sch.roomId,
                startTime: sch.startTime || sch.hora_inicio || sch.start_time,
                endTime: sch.endTime || sch.hora_fin || sch.end_time,
                name: sch.activity?.name || sch.name || 'Clase'
            }));
    
            return {
                title: 'Horario',
                schedules,
                availability,
                date: today,
                rooms,
                isWeekend: [0, 6].includes(today.getDay())
            }
        });
    }    

    async getAvailability(occupied) {
        const availability = [];
        let table = [];
        const rooms = await Room.findAll();
        rooms.forEach(room => {
            table = [];
            for (let hour = START_HOUR; hour < END_HOUR; hour++) {
                table.push(this.roomIsFree(hour, room, occupied));
            }
            availability.push(table);
        });
        return availability;
    }

    roomIsFree(hour, room, occupied) {
        return !occupied.some(element => {
            if (element.roomId !== room.id) return false;

            const startHour = parseInt(element.startTime.split(':')[0], 10);
            const endHour = parseInt(element.endTime.split(':')[0], 10);
            const endMinute = parseInt(element.endTime.split(':')[1], 10);

            if (startHour === hour) return true;
            if (endHour === hour && endMinute !== 0) return true;
            if (hour > startHour && hour < endHour) return true;

            return false;
        });
    }

    getSchedules(occupied) {
        const schedules = [...occupied];
        let startHour, startMinute;
        let endHour, endMinute;

        for (const schedule of schedules) {
            [startHour, startMinute] = schedule.startTime.split(':').map(Number);
            [endHour, endMinute] = schedule.endTime.split(':').map(Number);

            const startInMinutes = startHour * 60 + startMinute;
            const endInMinutes = endHour * 60 + endMinute;

            schedule.top = (startInMinutes - START_HOUR * 60) * 2;
            schedule.height = (endInMinutes - startInMinutes) * 2;
            schedule.bottom = (END_HOUR * 60 - endInMinutes) * 2;
        }

        return schedules;
    }
}

export default new TimetablePageController();