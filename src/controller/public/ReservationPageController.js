import { Reservation, Room } from '../../model/index.js';
import PageController from '../PageController.js';

class ReservationPageController extends PageController {
    constructor() {
        super('public/reservation-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const roomId = parseInt(req.body.room);
            const startTime = req.body.start;
            const endTime = req.body.end;
            const day = req.body.date;

            const room = await Room.findByPk(roomId);

            return {
                title: 'Reserva',
                room, startTime, endTime, day
            }
        });
    }

    handleSubmit() {
        return this.handle(async (req, res) => {
            const action = req.body.action;

            switch (action) {
                case 'show':
                    this.renderPage(req.body)(req, res);
                    break;
                case 'save':
                    console.log(req.body);
                    await this.saveReservation(req, res);
                    break;
            }
        });
    }

    async saveReservation(req, res) {
        const roomId = parseInt(req.body.roomId);
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const day = req.body.day;
        const requesterName = req.body.requesterName;
        const requesterEmail = req.body.requesterEmail;

        const reservation = await Reservation.create({ requesterName, requesterEmail, roomId, day, startTime, endTime, status: 'pending'});
        if(reservation){
            res.redirect('/success');
        }
    }
}

export default new ReservationPageController();