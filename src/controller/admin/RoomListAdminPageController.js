import AdminPageController from "../AdminPageController.js";
import {Room} from '../../model/index.js';

class RoomListAdminPageController extends AdminPageController {
    constructor() {
        super('admin/room-list-admin-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const rooms = await Room.findAll();
            return {
                title: 'Administrar Aulas',
                rooms
            }
        });
    }
}

export default new RoomListAdminPageController();