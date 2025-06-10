import PageController from '../PageController.js';
import { Room } from '../../model/index.js';

class RoomListPageController extends PageController {
    constructor() {
        super('public/room-list-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            const rooms = await Room.findAll();

            return {
                title: 'Aulas',
                rooms
            }
        });
    }
}

export default new RoomListPageController();