import PageController from '../PageController.js';
import { Activity, ActivitySchedule, Room } from '../../model/index.js';

class ActivityDetailPageController extends PageController {
    constructor() {
        super('public/activity-detail-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const id = req.params.id;

            const activity = await Activity.findByPk(id, {
                include: [{
                    model: ActivitySchedule,
                    as: 'schedules',
                    include: [{
                        model: Room,
                        as: 'room'
                    }]
                }]
            });

            const rooms = await Room.findAll();
            return {
                title: activity.name,
                activity
            }
        });
    }
}

export default new ActivityDetailPageController();