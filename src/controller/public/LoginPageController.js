import PageController from "../PageController.js";

class LoginPageController extends PageController {
    constructor() {
        super('public/login-page');
    }

    renderPage() {
        return this.render(async (req, res) => {
            return {
                title: 'Login'
            }
        });
    }

    handleSubmit() {
        return this.handle(async (req, res) => {
            const { username, password } = req.body;

            // Simulación de usuario admin
            if (username === process.env.USER_NAME && password === process.env.USER_PASSWORD) {
                req.session.user = {
                    username,
                    isAdmin: true
                };
                return res.redirect('/admin');
            }

            res.render('public/login-page', { error: 'Credenciales inválidas' });
        });
    }
}

export default new LoginPageController();