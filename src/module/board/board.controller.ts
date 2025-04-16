import { Controller, Post, Body } from '@nestjs/common';
import { BoardService } from './application/service/board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    async createBoard(@Body() dto: CreateBoardDto): Promise<void> {
        const { boardType } = dto;

        await this.boardService.createBoard(boardType);
    }
}
