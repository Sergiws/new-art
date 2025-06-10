import PageController from '../PageController.js';

class CalendarPageController extends PageController {
    constructor() {
        super('public/calendar-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth(); // 0 = enero
            const firstDay = new Date(year, month, 1);
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            const days = [];
            const startDay = (firstDay.getDay() + 6) % 7; // Ajustar para que lunes sea 0

            // Relleno para cuadrícula
            for (let i = 0; i < startDay; i++) {
                days.push({ empty: true });
            }

            for (let d = 1; d <= daysInMonth; d++) {
                const date = new Date(year, month, d);
                const dayOfWeek = date.getDay(); // Domingo = 0, Sábado = 6
                const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                days.push({
                    day: d,
                    isPast,
                    isWeekend,
                    clickable: !isPast && !isWeekend,
                    link: (!isPast && !isWeekend) ? `/horario?d=${d}&m=${month + 1}&y=${year}` : null
                });
            }

            const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

            return {
                title: 'Calendario',
                calendar: {
                    year,
                    month,
                    monthName: monthNames[month],
                    days
                }
            };
        });
    }
}

export default new CalendarPageController();