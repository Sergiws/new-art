import PageController from '../PageController.js';
import { Teacher } from '../../model/index.js';

class TeacherListPageController extends PageController {
    constructor() {
        super('public/teacher-list-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const teachers = await Teacher.findAll();

            return {
                title: 'Profesores',
                teachers
            }
        });
    }
}

export default new TeacherListPageController();