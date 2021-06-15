import { Request, Response, NextFunction } from 'express';
import debug from 'debug';

import userService from '../services/user.service';

const log: debug.IDebugger = debug('app:users-controller');

class UserController {
    async listUsers(req: Request, res: Response) {
        // const users = await userService.list(100, 0);

        const users = userService.list(0, 0);
        res.status(200).send(users);
    }
}

export default new UserController();