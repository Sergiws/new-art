import AdminPageController from '../AdminPageController.js';
import {Teacher} from '../../model/index.js';

class TeacherListAdminPageController extends AdminPageController {
    constructor() {
        super('admin/teacher-list-admin-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const teachers = await Teacher.findAll();
            return {
                title: 'Administrar Profesores',
                teachers
            }
        });
    }
}

export default new TeacherListAdminPageController();