import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from '../repository/command/create-user.command';

@Injectable()
export class CreateUserService {
    constructor(private readonly createUserCommand: CreateUserCommand) {}

    async createUser({}): Promise<void> {
        //await this.createUserCommand.createUser();
    }
}
