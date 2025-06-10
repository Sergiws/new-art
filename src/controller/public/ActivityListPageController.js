import PageController from '../PageController.js';
import { Activity } from '../../model/index.js';

class ActivityListPageController extends PageController {
    constructor() {
        super('public/activity-list-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const activities = await Activity.findAll();
            return {
                title: 'Actividades',
                activities
            }
        });
    }
}

export default new ActivityListPageController();