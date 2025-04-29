import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BoardService } from './application/service/board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { User } from '../../common/decorator/user.decorator';

@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createBoard(@Body() dto: CreateBoardDto, @User('memberId') memberId: number): Promise<void> {
        const { boardType } = dto;

        await this.boardService.createBoard(boardType, memberId);
    }
}
