import { Reservation, Room } from '../../model/index.js';
import AdminPageController from '../AdminPageController.js';
import { Op } from 'sequelize';

class ReservationDetailAdminPageController extends AdminPageController {
    constructor() {
        super('admin/reservation-detail-admin-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const id = parseInt(req.query.id);

            const reservation = await Reservation.findByPk(id, {
                include: {
                    model: Room,
                    as: 'room'
                }
            });

            return {
                title: 'Gestionar Reserva',
                reservation
            }
        });
    }

    handleSubmit() {
        return this.handle(async (req, res) => {
            const id = parseInt(req.body.id);
            const status = req.body.status;

            const reservationToUpdate = await Reservation.findByPk(id);
            await reservationToUpdate.update({ status });

            if (status === 'accepted') {
                const { day, startTime, endTime, roomId } = reservationToUpdate;

                await Reservation.update(
                    { status: 'rejected' },
                    {
                        where: {
                            id: { [Op.ne]: id }, // Excluir la actual
                            roomId,
                            day,
                            status: 'pending',
                            [Op.or]: [
                                {
                                    startTime: {
                                        [Op.between]: [startTime, endTime]
                                    }
                                },
                                {
                                    endTime: {
                                        [Op.between]: [startTime, endTime]
                                    }
                                },
                                {
                                    [Op.and]: [
                                        { startTime: { [Op.lte]: startTime } },
                                        { endTime: { [Op.gte]: endTime } }
                                    ]
                                }
                            ]
                        }
                    }
                );
            }

            res.redirect(`/admin/reservas/reserva?id=${reservationToUpdate.id}`);
        });
    }
}

export default new ReservationDetailAdminPageController();