import { Controller, Post, Body } from '@nestjs/common';
import { BoardService } from './application/service/board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    async createBoard(@Body() dto: CreateBoardDto): Promise<{ message: string }> {
        const { boardType } = dto;

        await this.boardService.createBoard(boardType);

        return { message: `${boardType} 게시판 생성 완료` };
    }
}
