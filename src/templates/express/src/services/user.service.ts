import userDao from '../dao/user.dao';
import { Crud } from '../common/interface/crud.interface';
import { CreateUserDto, PatchUserDto, PutUserDto } from '../dto/user.dto';
import { User } from '../model/user.model';

class UserService  {

    list(limit: number, page: number): Promise<Array<User>> {
        return userDao.getUsers();
    };

    create(payload: CreateUserDto): Promise<User> {
        return userDao.addUser(payload);
    };
}

export default new UserService();