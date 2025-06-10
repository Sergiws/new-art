import AdminPageController from '../AdminPageController.js';
import { Room } from '../../model/index.js';

class RoomDetailAdminPageController extends AdminPageController {
    constructor() {
        super('admin/room-detail-admin-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const id = parseInt(req.query.id);

            if (id) {
                const room = await Room.findByPk(id);
                return {
                    title: 'Administrar Aula',
                    room
                }
            } else {
                return {
                    title: 'Crear Aula'
                }
            }
        });
    }

    handleSubmit() {
        return this.handle(async (req, res) => {
            const action = req.body.action;

            const id = parseInt(req.body.id);
            const name = req.body.name;
            const capacity = req.body.capacity;
            const description = req.body.description;
            const imageName = req.file?.filename || null;

            switch (action) {
                case 'save':
                    const newRoom = await Room.create({ name, capacity, description, imageName });

                    res.redirect(`/admin/aulas/aula?id=${newRoom.id}`)
                    break;
                case 'update':
                    const fieldsToUpdate = { name, capacity, description };
                    if(imageName) fieldsToUpdate.imageName = imageName;

                    const roomToUpdate = await Room.findByPk(id);
                    await roomToUpdate.update(fieldsToUpdate);

                    res.redirect(`/admin/aulas/aula?id=${id}`);
                    break;
                case 'delete':
                    const roomToDelete = await Room.findByPk(id);
                    await roomToDelete.destroy();

                    res.redirect('/admin/aulas');
                    break;
            }
        });
    }
}

export default new RoomDetailAdminPageController();