import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserService } from './service/create-user.service';

@Controller('users')
export class UserController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async createUser(@UploadedFiles() files: Express.Multer.File[], @Body() dto: CreateUserDto): Promise<void> {
        await this.createUserService.createUser(dto, files);
    }
}
