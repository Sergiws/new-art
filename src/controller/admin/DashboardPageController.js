import AdminPageController from '../AdminPageController.js';

class DashboardPageController extends AdminPageController {
    constructor() {
        super('admin/dashboard');
    }

    renderPage() {
        return this.render(async (req, res) => {
            return {
                title: 'Panel de Administración'
            }
        });
    }
}

export default new DashboardPageController();