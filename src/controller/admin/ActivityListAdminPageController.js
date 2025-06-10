import AdminPageController from '../AdminPageController.js';
import {Activity} from '../../model/index.js';

class ActivityListAdminPageController extends AdminPageController {
    constructor() {
        super('admin/activity-list-admin-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const activities = await Activity.findAll();
            return {
                title: 'Administrar Profesores',
                activities
            }
        });
    }
}

export default new ActivityListAdminPageController();