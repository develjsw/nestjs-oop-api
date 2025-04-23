import { Injectable } from '@nestjs/common';
import { CreateUserCommand } from '../repository/command/create-user.command';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserService {
    constructor(private readonly createUserCommand: CreateUserCommand) {}

    async createUser(dto: CreateUserDto, files: Express.Multer.File[]): Promise<void> {
        //await this.createUserCommand.createUser();
    }
}
