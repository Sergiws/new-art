import PageController from '../PageController.js';
import AdminPageController from "../AdminPageController.js";
import {Room} from '../../model/index.js';

class RoomListAdminPageController extends PageController {
    constructor() {
        super('admin/room-list-page');
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