import express from 'express';

import { CommonRoutesConfig } from '../common/config/routes.config';
import UserController from '../controller/user.controller';

export class UsersRoutes extends CommonRoutesConfig {
    
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route('/users')
            .get(UserController.listUsers)
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send(`Post to users`);
            });

        return this.app;
    }
}
