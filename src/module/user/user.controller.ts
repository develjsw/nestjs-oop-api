import {
    BadRequestException,
    Body,
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserService } from './service/create-user.service';

@Controller('users')
export class UserController {
    constructor(private readonly createUserService: CreateUserService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async createUser(@UploadedFiles() files: Express.Multer.File[], @Body() dto: CreateUserDto): Promise<void> {
        if (!files.length) {
            throw new BadRequestException('파일이 존재하지 않습니다.');
        }

        await this.createUserService.createUser(dto, files);
    }
}
