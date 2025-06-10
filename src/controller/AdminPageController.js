import PageController from './PageController.js';

export default class AdminPageController extends PageController {
    constructor(pageName) {
        super(pageName);
    }

    verifySession(req, res) {
        if (req.session && req.session.user && req.session.user.isAdmin) {
            return true;
        }
        return false;
    }

    render(dataCallback = async () => ({})) {
        return async (req, res, next) => {
            try {
                if (!this.verifySession(req, res)) {
                    return res.redirect('/login');
                }
                const data = await dataCallback(req, res);
                res.render(this.pageName, {
                    ...data,
                    page: this.pageName,
                    user: req.session.user
                });
            } catch (error) {
                console.error(`Error en admin ${this.pageName}:`, error);
                res.status(500).send('Error interno del servidor');
            }
        };
    }

    handle(actionCallback = async () => { }) {
        return async (req, res) => {
            try {
                if (!this.verifySession(req, res)) {
                    return res.redirect('/login');
                }
                await actionCallback(req, res);
            } catch (error) {
                console.error(`Error processing ${this.pageName}:`, error);
                res.status(500).send('Error interno del servidor');
            }
        };
    }    
}