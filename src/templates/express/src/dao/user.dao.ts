import debug from 'debug';
import { getConnection, getRepository, Repository } from 'typeorm';

import { CreateUserDto, PatchUserDto, PutUserDto } from '../dto/user.dto';
import { User } from '../model/user.model';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UserDao {
    userRepository: any;
    
    constructor() {
        log('Created new instance of UserDao');
    }
    
    addUser(payload: CreateUserDto): Promise<User> {
        this.userRepository = getConnection().getRepository(User);
        const user = new User();
        return this.userRepository.save({...payload});
    }

    getUsers(): Promise<Array<User>> {
        return this.userRepository.find();
    }

    async getUserById(userId: number): Promise<User | null> {
        const user = await this.userRepository.findOne({ id: userId });
        if (!user) return null;
        return user;
    }
}

export default new UserDao();