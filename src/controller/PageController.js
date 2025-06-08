export default class PageController {
    constructor(pageName) {
        this.pageName = pageName;
    }

    render(dataCallback = async () => { }) {
        return async (req, res) => {
            try {
                const data = await dataCallback(req, res);
                res.render(this.pageName, {
                    ...data
                });
            } catch (error) {
                console.error(`Error rendering ${this.pageName}:`, error);
                res.status(500).send('Error interno del servidor');
            }
        };
    }

    handle(actionCallback = async () => { }) {
        return async (req, res) => {
            try {
                await actionCallback(req, res);
            } catch (error) {
                console.error(`Error processing ${this.pageName}:`, error) 
            }
        };
    }
}
