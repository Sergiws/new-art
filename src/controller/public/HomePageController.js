import { Activity } from "../../model/index.js";
import PageController from "../PageController.js";

class HomePageController extends PageController {
    constructor() {
        super('public/home-page')
    }

    renderPage() {
        return this.render(async (req, res) => {
            const activities = await Activity.findAll({
                order: [['id', 'DESC']],
                limit: 3
            });
            
            return {
                title: 'Home',
                activities
            }
        });
    }
}

export default new HomePageController();