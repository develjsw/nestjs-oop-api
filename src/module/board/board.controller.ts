import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BoardService } from './application/service/board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from '../../common/auth/decorator/user.decorator';
import { JwtAccessGuard } from '../../common/auth/guard/jwt-access.guard';

@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @UseGuards(JwtAccessGuard)
    @Post()
    async createBoard(@Body() dto: CreateBoardDto, @User('memberId') memberId: number): Promise<void> {
        const { boardType } = dto;

        await this.boardService.createBoard(boardType, memberId);
    }
}
