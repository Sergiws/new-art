import AdminPageController from '../AdminPageController.js';
import { Teacher } from '../../model/index.js';

class TeacherDetailAdminPageController extends AdminPageController {
    constructor() {
        super('admin/teacher-detail-admin-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const id = parseInt(req.query.id);

            if (id) {
                const teacher = await Teacher.findByPk(id);
                return {
                    title: 'Editar Profesor',
                    teacher
                }
            } else {
                return {
                    title: 'Añadir Profesor'
                }
            }
        });
    }

    handleSubmit() {
        return this.handle(async (req, res) => {
            const action = req.body.action;
            
            const id = parseInt(req.body.id);
            const fullName = req.body.fullName;
            const email = req.body.email;
            const phone = req.body.phone;
            const bio = req.body.bio;
            const imageName = req.file?.filename || null;

            switch(action) {
                case 'save':
                    const newTeacher = await Teacher.create({ fullName, email, phone, bio, imageName });

                    res.redirect(`/admin/profesores/profesor?id=${newTeacher.id}`);
                    break;
                case 'update':
                    const fieldsToUpdate = {fullName, email, phone, bio };
                    if(imageName) fieldsToUpdate.imageName = imageName;

                    const teacherToUpdate = await Teacher.findByPk(id);
                    await teacherToUpdate.update(fieldsToUpdate);

                    res.redirect(`/admin/profesores/profesor?id=${id}`);
                    break;
                case 'delete':
                    const teacherToDelete = await Teacher.findByPk(id);
                    await teacherToDelete.destroy();
                    
                    res.redirect('/admin/profesores');
                    break;
            }
        });
    }
}

export default new TeacherDetailAdminPageController();