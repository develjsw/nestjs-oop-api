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
        const { userName } = dto;

        // TODO : 파일 생성

        // TODO : 생성 후 createUser 메서드에 profile_file_name, profile_file_path 전달

        await this.createUserService.createUser({});
    }
}
