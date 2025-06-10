import { Reservation, Room } from "../../model/index.js";
import AdminPageController from '../AdminPageController.js';

class ReservationListAdminPageController extends AdminPageController {
    constructor() {
        super('admin/reservation-list-admin-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const reservations = await Reservation.findAll({
                order: [['id','desc']],
                include: {
                    model: Room,
                    as: 'room'
                }
            });

            return {
                title: 'Gestionar reservas',
                reservations
            }
        });
    }
}

export default new ReservationListAdminPageController();